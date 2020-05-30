import { Injectable } from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {CategoriesRequest, ProductsRequest} from "@classes/QueryParams"

const LOAD_LIMIT_MAX = 100;
const LOAD_LIMIT_MINIMUM = 1;
const LOAD_LIMIT_DEFAULT = 10;

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

  public getCategoriesRequestURL(query : CategoriesRequest) : QueryUrl {
    return {base : `${environment.hostname}/categories?`, options : { headers : BASIC_HTTP_HEADERS, params : this.getParams(query)}};
  }

  public getSalesPointRequestURL() : QueryUrl {
    return {base : `${environment.hostname}/salespoint`, options : {headers : BASIC_HTTP_HEADERS}};
  }

  public getProductsRequestURL(query : ProductsRequest) : QueryUrl {
    return {base : `${environment.hostname}/products?`, options : { headers : BASIC_HTTP_HEADERS, params : this.getParams(query)}};
  }

  public handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.router.navigateByUrl("error");
      return of(result as T);
    };
  }

  private getParams(queryParams : CategoriesRequest | ProductsRequest) : HttpParams {
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
      params = params.append("limit", LOAD_LIMIT_DEFAULT.toString());
    } else {
      let limit = queryParams.limit ?? LOAD_LIMIT_DEFAULT;
      if(limit < LOAD_LIMIT_MINIMUM) {
        console.log(`WARNING HttpRequest: 'limit' parameter provided was < ${LOAD_LIMIT_MINIMUM}`);
        limit = LOAD_LIMIT_MINIMUM;
      } else if(limit > LOAD_LIMIT_MAX) {
        console.log(`WARNING HttpRequest: 'limit' parameter provided was > ${LOAD_LIMIT_MAX}`);
        limit = LOAD_LIMIT_MAX;
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
