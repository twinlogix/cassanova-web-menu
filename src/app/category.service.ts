import { Injectable } from '@angular/core';
import { Category } from './Category';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';
import {ActivatedRoute, Router} from '@angular/router';

 // const idSalePoint = 333;
// const idSalePoint = 311;
const defaultImageUrl = '/assets/default.png';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];
  private start = 0;
  private requestUrl;
  private idSalePoint;

  constructor(private token: TokenService, private http: HttpClient, private httpUtils: HttpUtilsService, private route: ActivatedRoute, private router: Router) {
    const params = this.route.snapshot.queryParams;
    if (!params.hasOwnProperty('sp')) { /* Missing sp query param */
      router.navigateByUrl('error');
    } else {
      this.idSalePoint = params.hasOwnProperty('id') ? params.id : undefined;
      this.requestUrl = this.idSalePoint !== undefined ?
        `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}&idsSalesPoint=[${this.idSalePoint}]` :
        `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}`;
      this.token.loadToken(params.sp).subscribe(() => this.loadCategories());
    }
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
      for (const category of categories) {
        const imageUrl = category.hasOwnProperty('imageUrl') ? category.imageUrl : defaultImageUrl;
        this.categories.push(new Category(category.id, category.description, imageUrl));
      }
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
    this.requestUrl = this.idSalePoint !== undefined ?
      `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}&idsSalesPoint=[${this.idSalePoint}]` :
      `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}`;
  }

  private resetStart(): void { this.start = 0; }

  private incrementStart(increment: number): void { this.start += increment; }
}
