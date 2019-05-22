import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { Category } from '../Category';
import {CategoryService} from '../category.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {ActivatedRoute} from '@angular/router';
import {PageStatusService} from '../page-status.service';
import {TokenService} from '../token.service';
import {SalesPointService} from '../sales-point.service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private scroll: VirtualScrollService, /* Used in HTML */
    private page: PageStatusService,
    private token: TokenService,
    private salesPointService: SalesPointService
  ) {}

  ngOnInit() { this.getCategories(); }

  getCategories(): void {
    this.token.loadToken().subscribe(() => {
      this.salesPointService.loadSalesPoint().subscribe(() => {
        this.page.setSalePointName(this.salesPointService.getSalePointName());
        this.categoryService.getCategories().subscribe( categories =>  this.categories = categories );
      });
    });
  }
}
