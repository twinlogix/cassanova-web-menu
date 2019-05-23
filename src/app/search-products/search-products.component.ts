import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../Product';
import {MatDialog} from '@angular/material';
import {PageStatusService} from '../page-status.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {TokenService} from '../token.service';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {SearchProductsService} from '../search-products.service';
import {Subject} from 'rxjs';
import {debounceTime, last, share} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {SalesPointService} from '../sales-point.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  results: Product[] = [];
  description: string;
  private info = []; // [0] Number results;
  private stopLoad = false; // Manage loading request
  private loading = false; // Manage Spinner
  private searchTerms = new Subject<string>();
  // private lastReq = null;

  // Subscriptions
  private tokenSub = null;
  private salesPointSub = null;
  private searchSub = null;
  private searchProductSub = null;


  constructor(
    private searchProductsService: SearchProductsService,
    public dialog: MatDialog,
    public page: PageStatusService,
    public scroll: VirtualScrollService, // Used in HTML
    private salesPointService: SalesPointService,
    private token: TokenService // Load token here, instead of in product service, in order to allow load data on reloading products' page
  ) { }

  ngOnInit() {
    this.tokenSub = this.token.loadToken().subscribe(() => {
      this.salesPointSub = this.salesPointService.loadSalesPoint().subscribe(() => {
        this.page.setSalePointName(this.salesPointService.getSalePointName());
        if (this.searchSub !== null) { this.searchSub.unsubscribe(); }
        const obs = this.searchTerms.pipe(
          // wait 300ms after each keystroke before considering the term
          debounceTime(300),

          // ignore new term if same as previous term
          distinctUntilChanged(),
          share()
        );
        this.searchSub = obs.subscribe(() => {
          this.results = [];
          this.stopLoad = false;
          this.info[0] = 0;
          this.searchProductsService.getProducts(this.description, 0, this.scroll.getLimitShowSearch(), this.results).subscribe(result => {
            this.results = [... this.results];
          });
          if (this.searchProductSub !== null) { this.searchProductSub.unsubscribe(); }
          this.searchProductSub = this.searchProductsService.getProductCount().subscribe(productCount => this.info = productCount);
        });
      });
    });
  }


  public search(term: string): void { this.searchTerms.next(term); }

  private loadMore() {
    if (this.page.isDisabled()) { return; }
    this.loading = true; // Add Spinner
    if (this.results.length + this.scroll.getLimitShowSearch() >= Number.parseInt(this.info[0])) { this.stopLoad = true; } // Stop load more
    // Load products
    if (this.searchProductSub !== null) { this.searchProductSub.unsubscribe(); }
    this.searchProductSub = this.searchProductsService.getProducts(this.description, this.results.length, this.scroll.getLimitShowSearch(), this.results).subscribe(() => {
      this.results = [... this.results]; // Update Products
      this.loading = false; // Remove Spinner
    });
  }

   public openDetail(product: Product): void {
    if (this.page.isDisabled()) { return; }
    const dialogRef = this.dialog.open(ProductDetailComponent, { data: product }); // Open Dialog
    this.page.setDisable(true); // Disable all page (not Dialog)
    dialogRef.afterClosed().subscribe(() =>  {
      this.page.setDisable(false); // Enable Page, after dialog closing
      this.page.removeDialog(); // Remove dialog ref, in page status
    });
    this.page.addDialog(dialogRef);
  }

   public checkLoad(index: number) {
     if (!this.loading && !this.stopLoad && this.scroll.checkLoadSearch(index, this.results.length)) { this.loadMore(); }
  }

  ngOnDestroy(): void {
    if (this.tokenSub !== null) { this.tokenSub.unsubscribe(); }
    if (this.salesPointSub !== null) { this.salesPointSub.unsubscribe(); }
    if (this.searchProductSub !== null) { this.searchProductSub.unsubscribe(); }
    if (this.searchSub !== null) { this.searchSub.unsubscribe(); }
  }
}
