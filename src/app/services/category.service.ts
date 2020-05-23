import {Injectable, OnDestroy} from '@angular/core';
import { Category } from '@classes/Category';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, share, map} from 'rxjs/operators';
import {HttpUtilsService} from '@services/http-utils.service';
import {SalesPointService} from './sales-point.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private salesPoints: SalesPointService) {}

  // Return all the categories
  public getCategories(idSp : number[], start? : number, limit? : number): Observable<Category[]> {
    //caching?
    return this.loadCategories(idSp, start, limit);
  }

  private loadCategories(idSp : number[], start? : number, limit? : number): Observable<Category[]> {
    const request = this.httpUtils.getCategoriesRequestURL({idsSalesPoint : idSp, start : start, limit : limit})
    return this.http.get<[Category[], number]>(request.base, request.options).pipe(
        map(res => res["categories"]),
        catchError(this.httpUtils.handleError('categories loading', [])),
      );
  }
}
