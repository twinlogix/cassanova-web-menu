import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpUtilsService} from './http-utils.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SalesPoint} from '@classes/SalesPoint';

@Injectable({
  providedIn: 'root'
})
export class SalesPointService {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService) {}

  public getSalesPoints(): Observable<SalesPoint[]> {
    //caching?
    return this.loadSalesPoint(); 
  }

  private loadSalesPoint(): Observable<SalesPoint[]> {
    const requestUrl = this.httpUtils.getSalesPointRequestURL();
    return this.http.get<[SalesPoint[], number]>(requestUrl.base, requestUrl.options).pipe(
      map( res => res["salesPoint"]),
      catchError(this.httpUtils.handleError('sales point loading', [])));
  }
}
