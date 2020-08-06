import {Injectable, OnDestroy} from '@angular/core';
import { Category } from '@classes/Category';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {HttpUtilsService} from '@services/http-utils.service';
import {SalesPointService} from './sales-point.service';
import {CategoriesRequest, CassaWebRequest} from '@classes/QueryParams';
import {FetchService} from '@classes/FetchService';
@Injectable({
  providedIn: 'root'
})
export class CategoryService implements FetchService<Category> {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private salesPoints: SalesPointService) {}

  getData(params: CategoriesRequest): Observable<Category[]> {
    //Caching?
    return this.loadCategories(params);
  }

  private loadCategories(params : CategoriesRequest): Observable<Category[]> {
    const request = this.httpUtils.getCategoriesRequestURL(params)
    return this.http.get<[Category[], number]>(request.base, request.options).pipe(
        map(res => res["categories"]),
        catchError(this.httpUtils.handleError('categories loading', []))
      );
  }
}
