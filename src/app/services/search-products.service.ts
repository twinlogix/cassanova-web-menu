import {Injectable} from '@angular/core';
import {Product} from '@classes/Product';
import {HttpClient} from '@angular/common/http';
import {HttpUtilsService} from './http-utils.service';
import {Observable, of} from 'rxjs';
import {catchError, share} from 'rxjs/operators';
import {PageStatusService} from './page-status.service';
import {SalesPointService} from './sales-point.service';
import {tap} from 'rxjs/internal/operators/tap';

const defaultImageUrl = '/assets/default.png';

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  private info: string[] = []; // [0] Number products
  private requestUrl;
  private idSalesPoint;

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private page: PageStatusService,
              private salesPoint: SalesPointService) {}

  public getProducts(description: string, start: number, limit: number, result: Product[] ): Observable<any> {
      return this.loadProducts(description, start, limit, result);
  }

  public loadProducts(description: string, start: number, limit: number, result: Product[]): Observable<any> {
    // this.salesPoint.checkIdSalesExist();
    // this.idSalesPoint = this.page.getId();
    // this.updateRequestUrl(description, start, limit); // Create request url
    // // console.log(`Loading products from ${start} to ${start + limit}`); // TODO log
    // const res = this.http.get(this.requestUrl, this.httpUtils.getHttpOptions()).pipe(
    //     catchError(this.httpUtils.handleError('products loading', [])),
    //     share(),
    //     tap(response => {
    //   // @ts-ignore
    //   const products = response.products;
    //   // @ts-ignore
    //   const totalCount = response.totalCount;
    //   this.info[0] = totalCount;
    //   // console.log(`${start + products.length} products loaded of ${totalCount}`); // TODO log
    //   for (const product of products) {
    //     const descriptionLong = product.hasOwnProperty('descriptionExtended') ? product.descriptionExtended : '';
    //     const images: string[] = [];
    //     if (product.hasOwnProperty('images')) {
    //       for (const image of product.images) {
    //         // @ts-ignore
    //         images.push(image.imageUrl);
    //       }
    //     } else { images.push(defaultImageUrl); }
    //     const productItem = new Product(product.id, product.description, descriptionLong, product.prices[0].value, images);
    //     result.push(productItem); // Add product to result
    //   }
    // }));
    // return res;
    return of([]);
  }

  public getProductCount(): Observable<string[]> { return of(this.info); }

  private updateRequestUrl(description: string, start: number, limit: number): void {
    this.requestUrl = `${this.httpUtils.getHostname()}/products?start=${start}&limit=${limit}&description="${description}"&idsSalesPoint=[${this.idSalesPoint}]`;
  }

}
