import {Injectable} from '@angular/core';
import { Product } from '../classes/Product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';
import { ProductsRequest } from '@classes/QueryParams'
// const defaultImageUrl = '/assets/default.png';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}

  public getProducts(params : ProductsRequest): Observable<Product[]> {
    //caching?
    return this.loadProducts(params);
  }

  public loadProducts(params : ProductsRequest): Observable<Product[]> {
    const request = this.httpUtils.getProductsRequestURL(params);
    const res = this.http.get<[Product[], number]>(request.base, request.options).pipe(
      map(res => res["products"]),
      catchError(this.httpUtils.handleError('products loading', [])),

    );
    return res;
  }

}
