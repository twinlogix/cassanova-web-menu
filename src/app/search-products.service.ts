import {Injectable, OnDestroy} from '@angular/core';
import {Product} from './Product';
import {HttpClient} from '@angular/common/http';
import {HttpUtilsService} from './http-utils.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {PageStatusService} from './page-status.service';
import {SalesPointService} from './sales-point.service';

const defaultImageUrl = '/assets/default.png';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService implements OnDestroy {

  private info: string[] = []; // [0] Number products
  private requestUrl;
  private idSalesPoint;

  // Subscription
  private searchProductSub = null;

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private page: PageStatusService,
              private salesPoint: SalesPointService) {}

  getProducts(description: string, start: number, limit: number, result: Product[] ): Observable<any> {
      return this.loadProducts(description, start, limit, result);
  }

  loadProducts(description: string, start: number, limit: number, result: Product[]): Observable<any> {
    this.salesPoint.checkIdSalesExist();
    this.idSalesPoint = this.page.getId();
    this.updateRequestUrl(description, start, limit); // Create request url
    console.log(`Loading products from ${start} to ${start + limit}`); // TODO remove log
    const res = this.http.get(this.requestUrl, this.httpUtils.getHttpOptions());
    this.searchProductSub = res.pipe(
      catchError(this.httpUtils.handleError('products loading', [])
      )).subscribe(response => {
      // @ts-ignore
      const products = response.products;
      // @ts-ignore
      const totalCount = response.totalCount;
      this.info[0] = totalCount;
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
        result.push(productItem); // Add product to result
      }
    });
    return res;
  }

  getProductCount(): Observable<string[]> { return of(this.info); }

  private updateRequestUrl(description: string, start: number, limit: number): void {
    this.requestUrl = `${this.httpUtils.getHostname()}/products?start=${start}&limit=${limit}&description="${description}"&idsSalesPoint=[${this.idSalesPoint}]`;
  }

  ngOnDestroy() {
    if (this.searchProductSub !== null) { this.searchProductSub.unsubscribe(); }
  }
}
