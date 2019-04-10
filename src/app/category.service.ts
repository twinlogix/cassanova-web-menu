import { Injectable } from '@angular/core';
import { Category } from './Category';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {TokenService} from './token.service';
import {HttpUtils} from './HttpUtils';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {load} from '@angular/core/src/render3';

const idSalePoint = 1194;
const loadLimit = 10;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CATEGORY: Category[] = [];
  private start = 0;
  private requestUrl = HttpUtils.HOSTNAME + `/categories?start=${this.start}&limit=${this.start + loadLimit}&idsSalesPoint=[${idSalePoint}]`;

  constructor(private token: TokenService, private http: HttpClient) {
    this.token.loadToken().subscribe(response => this.loadCategories());
  }

  // Return all the categories
  getCategories(): Observable<Category[]> {
    return of(this.CATEGORY);
  }

  private loadCategories(): void {
    console.log(`Loading from ${this.start} to ${this.start + loadLimit}`);
    this.http.get(this.requestUrl, HttpUtils.BASIC_HTTP_OPTIONS).pipe(
      retry(3),
      catchError(HttpUtils.handleError('categories loading', [])
      )).subscribe(response => {
      // @ts-ignore
      const categories = response.categories;
      // @ts-ignore
      const totalCount = response.totalCount;
      this.incrementStart(categories.length);
      console.log(`${this.start} category loaded of ${totalCount}`);
      for (const i in categories) {
        const category = categories[i];
        if (category.hasOwnProperty('idSalesPoint')) { // Add only idSalePoint's categories
          this.CATEGORY.push(new Category(category.id, category.description, '/assets/hamburger.jpg'));
        }
      }

      if (this.start >= totalCount) {
        console.log('All category have been loaded');
        this.resetStart();
        this.updateRequestUrl();
      } else {
        this.updateRequestUrl();
        this.loadCategories();
      }
    });
  }

  private updateRequestUrl(): void {
    this.requestUrl = HttpUtils.HOSTNAME + `/categories?start=${this.start}&limit=${this.start + loadLimit}&idsSalesPoint=[${idSalePoint}]`;
  }

  private resetStart(): void {
    this.start = 0;
  }

  private incrementStart(increment: number): void {
    this.start += increment;
  }
}
