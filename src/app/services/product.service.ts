import {Injectable} from '@angular/core';
import { Product } from '../classes/Product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';

// const defaultImageUrl = '/assets/default.png';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {}

  public getProducts(idsSp : number[], categoryIds: string[], start?: number, limit?: number): Observable<Product[]> {
    //caching?
    return this.loadProducts(idsSp, categoryIds, start, limit);
  }

  public loadProducts(idsSp : number[], idsCategory: string[], start?: number, limit?: number): Observable<Product[]> {
    const request = this.httpUtils.getProductsRequestURL({idsCategory : idsCategory, idsSalesPoint : idsSp, start : start, limit : limit});
    const res = this.http.get<[Product[], number]>(request.base, request.options).pipe(
      map(res => res["products"]),
      catchError(this.httpUtils.handleError('products loading', [])),

    );
    return res;
  }

}
