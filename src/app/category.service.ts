import { Injectable } from '@angular/core';
import { Category } from './Category';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {TokenService} from './token.service';
import {HttpUtils} from './HttpUtils';
import {HttpClient} from '@angular/common/http';

const idSalePoint = 1194;
const requestUrl = HttpUtils.HOSTNAME + '/categories?start=0&limit=100'; // &idsSalesPoint=' + '[' + idSalePoint + ']' ;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CATEGORY: Category[] = [
    { id: '1', name: 'Panini', imageUrl: '/assets/hamburger.jpg' },
    { id: '2', name: 'Pizza', imageUrl: '/' },
    { id: '3', name: 'Primi Piatti', imageUrl: '/'}
  ];

  constructor(private token: TokenService, private http: HttpClient) {
    this.token.loadToken().subscribe(response => this.loadCategories());
  }

  // Return all the categories
  getCategories(): Observable<Category[]> {
    return of(this.CATEGORY);
  }

  private loadCategories(): void {
    this.http.get(requestUrl, HttpUtils.BASIC_HTTP_OPTIONS).subscribe(response => {
      console.log(response);
    });
  }
}
