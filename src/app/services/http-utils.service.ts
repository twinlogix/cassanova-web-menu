import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {CategoriesRequest, ProductsRequest, SalesPointRequest, StockRequest} from "@classes/QueryParams"
import {MIN_LIMIT, MAX_LIMIT, DEFAULT_LIMIT} from "@classes/QueryParams"

const TOKEN_HTTP_HEADERS = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': '*'
  })
};
const BASIC_HTTP_HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'X-Version': '1.0.0'
});
 
export interface QueryUrl {
  base: string,
  options?: { headers?: HttpHeaders, params?: HttpParams} 
}

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(private router: Router) { }
  getHostname(): string { return environment.hostname; }
  getTokenHttpOptions(): any  { return TOKEN_HTTP_HEADERS; }

  public getSalesPointRequestURL(query : SalesPointRequest) : QueryUrl {
    return {base : `${environment.hostname}/salespoint`, options : {headers : BASIC_HTTP_HEADERS, params : this.getParams(query)}};
  }

  public getCategoriesRequestURL(query : CategoriesRequest) : QueryUrl {
    return {base : `${environment.hostname}/categories?`, options : { headers : BASIC_HTTP_HEADERS, params : this.getParams(query)}};
  }

  public getProductsRequestURL(query : ProductsRequest) : QueryUrl {
    return {base : `${environment.hostname}/products?`, options : { headers : BASIC_HTTP_HEADERS, params : this.getParams(query)}};
  }

  public getStocksRequestURL(query : StockRequest, idSalesPoint : number) : QueryUrl {
    return {base : `${environment.hostname}/stocks/${idSalesPoint}?`, options : { headers : BASIC_HTTP_HEADERS, params : this.getParams(query)}};
  }

  public handleError<T>(operation = 'operation', result : T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public handleErrorErrCode(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<number> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(error.status);
    };
  }

  private getParams(queryParams : CategoriesRequest | ProductsRequest | SalesPointRequest) : HttpParams {
    let params = new HttpParams();
    
    //Checking (and adding) mandatory parameters
    if(!Object.keys(queryParams).find(k => k === "start")){
      params = params.append("start", "0");
    } else {
      let start = queryParams.start ?? 0;
      if(start < 0) {
        console.log("WARNING HttpRequest: 'start' parameter provided was < 0");
        start = 0;
      }
      params = params.append("start", start.toString());
    }

    if(!Object.keys(queryParams).find(k => k === "limit")){
      params = params.append("limit", MIN_LIMIT.toString());
    } else {
      let limit = queryParams.limit ?? DEFAULT_LIMIT;
      if(limit < MIN_LIMIT) {
        console.log(`WARNING HttpRequest: 'limit' parameter provided was < ${MIN_LIMIT}`);
        limit = MIN_LIMIT;
      } else if(limit > MAX_LIMIT) {
        console.log(`WARNING HttpRequest: 'limit' parameter provided was > ${MAX_LIMIT}`);
        limit = MAX_LIMIT;
      }
      params = params.append("limit", limit.toString());
    }

    Object.keys(queryParams)
          .filter(k => k !== "start" && k !== "limit")
          .forEach(k => {
            if(Array.isArray(queryParams[k])) {
              let arr : any[] = queryParams[k].filter(e => e !== null && e !== undefined);
              if(arr.length > 0) {
                let val : string;
                if(typeof arr[0] === "string") {
                  val = arr.map(s => `"${s}"`).join(",");
                } else if(typeof arr[0] === "number") {
                  val = arr.filter(n => !Number.isNaN(n)).join(",")
                }
                params = params.append(k, `[${val}]`);
              }
            } else {
              let param = queryParams[k];
              if(typeof param === "string") {
                param = `"${param}"`;
              }
              params = params.append(k, param);
            }
          });
    return params;
  }
}
