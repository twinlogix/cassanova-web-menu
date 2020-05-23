import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '@classes/Product';
import {MatDialog} from '@angular/material';
import {PageStatusService} from '@services/page-status.service';
import {VirtualScrollService} from '../../virtual-scroll.service';
import {TokenService} from '@services/token.service';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {SearchProductsService} from '@services/search-products.service';
import {Subject, Observable} from 'rxjs';
import {debounceTime, last, share} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {SalesPointService} from '@services/sales-point.service';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  // Subscriptions
  private productSub : Observable<Product[]>

  constructor(
    public dialog: MatDialog,
    public scroll: VirtualScrollService, // Used in HTML
    private productService: ProductService
  ) { }

  ngOnInit() {
    // this.productSub = this.productService.getProducts()
  }

  public openDetail(product: Product): void {
    // if (this.page.isDisabled()) { return; }
    // const dialogRef = this.dialog.open(ProductDetailComponent, { data: product }); // Open Dialog
    // this.page.setDisable(true); // Disable all page (not Dialog)
    // dialogRef.afterClosed().subscribe(() =>  {
    //   this.page.setDisable(false); // Enable Page, after dialog closing
    //   this.page.removeDialog(); // Remove dialog ref, in page status
    // });
    // this.page.addDialog(dialogRef);
  }

  ngOnDestroy(): void {
  }
}
