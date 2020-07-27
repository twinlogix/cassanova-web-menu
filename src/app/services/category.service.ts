import {Injectable, OnDestroy} from '@angular/core';
import { Category } from '@classes/Category';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {HttpUtilsService} from '@services/http-utils.service';
import {SalesPointService} from './sales-point.service';
import {CategoriesRequest} from '@classes/QueryParams'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private salesPoints: SalesPointService) {}

  // Return all the categories
  public getCategories(params : CategoriesRequest): Observable<Category[]> {
    //caching?
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
