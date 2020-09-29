import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpUtilsService } from './http-utils.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Stock } from '@app/classes/Stock';
import { StockRequest } from '@app/classes/QueryParams';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService) {}

  private _UNAUTHORIZED_MESSAGE : string = "unauthorized";

  public get UNAUTHORIZED_MESSAGE() : string {
    return this._UNAUTHORIZED_MESSAGE;
  }

  public getStock(params : StockRequest, idSalesPoint : number): Observable<Stock[]> {
    //caching?
    return this.loadStock(params, idSalesPoint); 
  }

  private loadStock(params : StockRequest, idSalesPoint : number): Observable<Stock[]> {
    const requestUrl = this.httpUtils.getStocksRequestURL(params, idSalesPoint);
    return this.http.get<[Stock[], number]>(requestUrl.base, requestUrl.options).pipe(
      map(res => res["stocks"]),
      catchError(this.httpUtils.handleError('stocks loading', this._UNAUTHORIZED_MESSAGE))
    );
  }
}
