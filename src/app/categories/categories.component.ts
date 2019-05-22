import {Component, OnDestroy, OnInit} from '@angular/core';
import { Category } from '../Category';
import {CategoryService} from '../category.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {PageStatusService} from '../page-status.service';
import {TokenService} from '../token.service';
import {SalesPointService} from '../sales-point.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  // Subscriptions
  private tokenSub = null;
  private salesPointSub = null;
  private categorySub = null;

  constructor(
    private categoryService: CategoryService,
    private scroll: VirtualScrollService, /* Used in HTML */
    private page: PageStatusService,
    private token: TokenService,
    private salesPointService: SalesPointService
  ) {}

  ngOnInit() { this.getCategories(); }

  getCategories(): void {
    this.tokenSub = this.token.loadToken().subscribe(() => {
      this.salesPointSub = this.salesPointService.loadSalesPoint().subscribe(() => {
        this.page.setSalePointName(this.salesPointService.getSalePointName());
        this.categorySub = this.categoryService.getCategories().subscribe( categories =>  this.categories = categories );
      });
    });
  }

  ngOnDestroy(): void {
    /*
    console.lo
    if (this.tokenSub !== null) { this.tokenSub.unsubscribe(); }
    if (this.salesPointSub !== null) { this.salesPointSub.unsubscribe(); }
    if (this.categorySub !== null) { this.categorySub.unsubscribe(); }
    */
  }
}
