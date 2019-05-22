import {Injectable, OnDestroy} from '@angular/core';
import { Product } from './Product';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';
import {ActivatedRoute} from '@angular/router';
import {PageStatusService} from './page-status.service';

const defaultImageUrl = '/assets/default.png';
@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  static LOAD_ENDED = 'ended';
  static LOAD_STARTED = 'started';

  private products: Map<string, Product[]> = new Map();
  private categoriesState: Map<string, string[]> = new Map(); // [0] State, [1] Category Name, [2] Number products
  private requestUrl;
  private idSalePoint;

  // Subscription
  private productSub = null;

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private route: ActivatedRoute, private page: PageStatusService) {
    const params = this.route.snapshot.queryParams;
    this.idSalePoint = params.hasOwnProperty('id') ? params.id : null;
  }

  getProducts(categoryId: string, start: number, limit: number, result: Product[] ): Observable<any> {
    const id = this.page.getId();
    if (this.idSalePoint !== null && id.toLocaleString().localeCompare(this.idSalePoint.toLocaleString()) !== 0) { // New sales point
      this.products = new Map();
      this.categoriesState = new Map();
    }
    this.idSalePoint = id;
    if (this.checkYetLoaded(categoryId, start, limit)) { // Check if you need to launch an http GET request
      console.log('Category\'s products yet present'); // TODO remove log
      const productsLength = this.products.get(categoryId).length;
      const end = start + limit  < productsLength ? start + limit : productsLength; // Index of last product to take
      if (start < productsLength) { for (const product of this.products.get(categoryId).slice(start, end)) { result.push(product); } } // Return the products requested
      return of(true);
    } else { // An http GET request must be launched
      console.log('Loading products'); // TODO remove log
      if (!this.products.has(categoryId)) { this.products.set(categoryId, []); } // Create category's products entry, if not present
      if (!this.categoriesState.has(categoryId)) { this.categoriesState.set(categoryId, [ProductService.LOAD_STARTED]); } // Create category's state entry, if not present (categoriesState[0])
      return this.loadProducts(categoryId, start, limit, result);
    }
  }

  loadProducts(idCategory: string, start: number, limit: number, result: Product[]): Observable<any> {
    this.updateRequestUrl(idCategory, start, limit); // Create request url
    console.log(`Loading products from ${start} to ${start + limit}`); // TODO remove log
    const res = this.http.get(this.requestUrl, this.httpUtils.getHttpOptions());
    this.productSub = res.pipe(
      catchError(this.httpUtils.handleError('products loading', [])
      )).subscribe(response => {
      // @ts-ignore
        const products = response.products;
      // @ts-ignore
        const totalCount = response.totalCount;
        if (products.length && this.categoriesState.get(idCategory).length === 1) { // First request for this category
        const categoryState = this.categoriesState.get(idCategory);
        categoryState.push(products[0].category.description);  // Added category name (categoriesState[1])
        categoryState.push(totalCount); // Added number of category's product (categoriesState[2])
      }
        console.log(`${start + products.length} products loaded of ${totalCount}`); // TODO remove log
        for (const product of products) {
          console.log(product); // TODO remove log
          const descriptionLong = product.hasOwnProperty('descriptionExtended') ? product.descriptionExtended : '';
          const images: string[] = [];
          if (product.hasOwnProperty('images')) {
            for (const image of product.images) {
              // @ts-ignore
              images.push(image.imageUrl);
            }
          } else { images.push(defaultImageUrl); }
          const productItem = new Product(product.id, product.description, descriptionLong, product.prices[0].value, images);
          this.products.get(idCategory).push(productItem); // Save product into categories' products map
          result.push(productItem); // Add product to result
        }

        if (start + limit >= totalCount) { // All products have been loaded
          console.log('All products have been loaded'); // TODO remove log
          this.categoriesState.get(idCategory)[0] = ProductService.LOAD_ENDED; // Load ended (categoriesState[0])
        }
    });
    return res;
  }

  getCategoryName(categoryId: string): Observable<string[]> { return of(this.categoriesState.get(categoryId)); }

  private updateRequestUrl(idCategory: string, start: number, limit: number): void {
    this.requestUrl = `${this.httpUtils.getHostname()}/products?start=${start}&limit=${limit}&idsCategory=["${idCategory}"]&idsSalesPoint=[${this.idSalePoint}]`;
  }


  private checkYetLoaded(categoryId: string, start: number, limit: number): boolean {
    if (this.products.has(categoryId)) { // Check if this category has been requested yet
      if (this.categoriesState.get(categoryId)[0] === ProductService.LOAD_ENDED) {
        return true;
      } // All category's products has been loaded
      const products = this.products.get(categoryId);
      return products.length >= start + limit; // True if all the products to return have been requested yet, false otherwise
    }
    return false; // Product's must be requested
  }

  ngOnDestroy(): void {
    if (this.productSub !== null) { this.productSub.unsubscribe(); }
  }
}
