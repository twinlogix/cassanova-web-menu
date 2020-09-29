import {Injectable} from '@angular/core';
import { Product } from '../classes/Product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';
import { ProductsRequest, CassaWebRequest } from '@classes/QueryParams'
import { FetchService } from '@app/classes/FetchService';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements FetchService<Product>{

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}

  getData(params: ProductsRequest): Observable<Product[]> {
    //caching?
    return this.loadProducts(params);
  }

  private loadProducts(params : ProductsRequest): Observable<Product[]> {
    const request = this.httpUtils.getProductsRequestURL(params);
    const res = this.http.get<[Product[], number]>(request.base, request.options).pipe(
      map(res => res["products"]),
      catchError(this.httpUtils.handleError('products loading', []))
    );
    return res;
  }

}
