import {Injectable, OnDestroy} from '@angular/core';
import { Category } from './Category';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HttpUtilsService} from './http-utils.service';
import {SalesPointService} from './sales-point.service';
import {PageStatusService} from './page-status.service';

const defaultImageUrl = '/assets/default.png';
@Injectable({
  providedIn: 'root'
})
export class CategoryService  implements  OnDestroy {

  private categories: Category[] = [];
  private start = 0;
  private requestUrl;
  private idSalePoint = null;

  // Subscription
  private categorySub = null;

  constructor(private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private salesPoints: SalesPointService,
              private page: PageStatusService) {}

  // Return all the categories
  getCategories(): Observable<Category[]> {

    this.salesPoints.checkIdSalesExist();
    const id = this.page.getId();
    if (this.idSalePoint === null) { // First request
      this.loadNewCategory(id);
    } else if (id.toLocaleString().localeCompare(this.idSalePoint.toLocaleString()) !== 0) { // New sales point
      this.loadNewCategory(id);
    }
    return of(this.categories);
  }

  private loadCategories(): void {
    console.log(`Loading categories from ${this.start} to ${this.start + this.httpUtils.getLoadLimit()}`); // TODO remove log
    this.categorySub = this.http.get(this.requestUrl, this.httpUtils.getHttpOptions()).pipe(
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
    this.requestUrl = `${this.httpUtils.getHostname()}/categories?start=${this.start}&limit=${this.httpUtils.getLoadLimit()}&idsSalesPoint=[${this.idSalePoint}]`;
  }

  private resetStart(): void { this.start = 0; }

  private incrementStart(increment: number): void { this.start += increment; }

  private loadNewCategory(id) {
      this.categories = []; // Remove previous reference
      this.idSalePoint = id;
      this.start = 0;
      this.updateRequestUrl();
      this.loadCategories();
  }

  ngOnDestroy(): void {
    if (this.categorySub !== null) { this.categorySub.unsubscribe(); }
  }
}
