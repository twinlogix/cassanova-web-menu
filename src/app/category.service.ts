import { Injectable } from '@angular/core';
import { Category } from './Category';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';

 const idSalePoint = 333;
// const idSalePoint = 311;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];
  private start = 0;
  private requestUrl = `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}&idsSalesPoint=[${idSalePoint}]`;

  constructor(private token: TokenService, private http: HttpClient, private httpUtils: HttpUtilsService) {
    this.token.loadToken().subscribe(() => this.loadCategories());
  }

  // Return all the categories
  getCategories(): Observable<Category[]> { return of(this.categories); }

  private loadCategories(): void {
    console.log(`Loading categories from ${this.start} to ${this.start + this.httpUtils.getLoadLimit()}`); // TODO remove log
    this.http.get(this.requestUrl, this.httpUtils.getHttpOptions()).pipe(
      retry(3),
      catchError(this.httpUtils.handleError('categories loading', [])
      )).subscribe(response => {
      // @ts-ignore
      const categories = response.categories;
      // @ts-ignore
      const totalCount = response.totalCount;
      this.incrementStart(categories.length);
      console.log(`${this.start} category loaded of ${totalCount}`); // TODO remove log
      for (const category of categories) { this.categories.push(new Category(category.id, category.description, '/assets/hamburger.jpg')); } // TODO load category image
      if (this.start >= totalCount) { // All categories has been loaded
        console.log('All category have been loaded'); // TODO remove log
        this.resetStart();
        this.updateRequestUrl();
      } else { // Continue to load categories
        this.updateRequestUrl();
        this.loadCategories();
      }
    });
  }

  private updateRequestUrl(): void {
    this.requestUrl = `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}&idsSalesPoint=[${idSalePoint}]`;
  }

  private resetStart(): void { this.start = 0; }

  private incrementStart(increment: number): void { this.start += increment; }
}
