import {Component, OnInit} from '@angular/core';
import {Product} from '../Product';
import {MatDialog} from '@angular/material';
import {PageStatusService} from '../page-status.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {TokenService} from '../token.service';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {SearchProductsService} from '../search-products.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {SalesPointService} from '../sales-point.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  results: Product[] = [];
  description: string;
  private info = []; // [0] Number results;
  private stopLoad = false; // Manage loading request
  private loading = false; // Manage Spinner
  private searchTerms = new Subject<string>();


  constructor(
    private searchProductsService: SearchProductsService,
    public dialog: MatDialog,
    private page: PageStatusService,
    private scroll: VirtualScrollService,
    private salesPointService: SalesPointService,
    private token: TokenService // Load token here, instead of in product service, in order to allow load data on reloading products' page
  ) { }

  ngOnInit() {
    this.token.loadToken().subscribe(() => {
      this.salesPointService.loadSalesPoint().subscribe(() => {
        this.page.setSalePointName(this.salesPointService.getSalePointName());
        const observable = this.searchTerms.pipe(
          // wait 300ms after each keystroke before considering the term
          debounceTime(300),

          // ignore new term if same as previous term
          distinctUntilChanged(),
        );
        observable.subscribe(() => {
          this.results = [];
          this.stopLoad = false;
          this.info[0] = 0;
          this.searchProductsService.getProducts(this.description, 0, this.scroll.getLimitShowSearch(), this.results);
          this.searchProductsService.getProductCount().subscribe(productCount => {
            console.log(this.info);
            this.info = productCount;
          });
        });
      });
    });
  }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  private loadMore() {
    if (this.page.isDisabled()) { return; }
    this.loading = true; // Add Spinner
    if (this.results.length + this.scroll.getLimitShowSearch() >= Number.parseInt(this.info[0])) { this.stopLoad = true; } // Stop load more
    // Load products
    this.searchProductsService.getProducts(this.description, this.results.length, this.scroll.getLimitShowSearch(), this.results).subscribe(() => {
      this.results = [... this.results]; // Update Products
      this.loading = false; // Remove Spinner
    });
  }

   openDetail(product: Product): void {
    if (this.page.isDisabled()) { return; }
    const dialogRef = this.dialog.open(ProductDetailComponent, { data: product }); // Open Dialog
    this.page.setDisable(true); // Disable all page (not Dialog)
    dialogRef.afterClosed().subscribe(() =>  {
      this.page.setDisable(false); // Enable Page, after dialog closing
      this.page.removeDialog(); // Remove dialog ref, in page status
    });
    this.page.addDialog(dialogRef);
  }

   checkLoad(index: number) {
    if (!this.stopLoad && this.scroll.checkLoadSearch(index, this.results.length)) { this.loadMore(); }
  }

}
