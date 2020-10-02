import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpUtilsService} from './http-utils.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SalesPoint} from '@classes/SalesPoint';
import { FetchService } from '@app/classes/FetchService';
import {CassaWebRequest, CategoriesRequest, SalesPointRequest} from '@app/classes/QueryParams';

@Injectable({
  providedIn: 'root'
})
export class SalesPointService {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService) {}

  getData(params : SalesPointRequest): Observable<SalesPoint[]> {
    //caching?
    return this.loadSalesPoint(params);
  }

  private loadSalesPoint(params : SalesPointRequest): Observable<SalesPoint[]> {
    const requestUrl = this.httpUtils.getSalesPointRequestURL(params);
    return this.http.get<[SalesPoint[], number]>(requestUrl.base, requestUrl.options).pipe(
      map( res => res["salesPoint"]),
      catchError(this.httpUtils.handleError('sales point loading', [])));
  }
}
