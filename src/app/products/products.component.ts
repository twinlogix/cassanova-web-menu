import {Component, OnInit} from '@angular/core';
import { Product } from '../Product';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {PageStatusService} from '../page-status.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {TokenService} from '../token.service';
import {SalesPointService} from '../sales-point.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categoryName: string[] = []; // [0] State, [1] Category Name, [2] Number products
  private categoryId: string;
  private stopLoad = false; // Manage loading request
  private loading = false; // Manage Spinner


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
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
        this.getProducts();
      });
    });
  }

  private getProducts(): void {
    this.salesPointService.checkIdSalesExist();
    if (!this.route.snapshot.paramMap.has('id')) { this.page.goToPage(this.page.ERROR); }
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts(this.categoryId, this.products.length, this.scroll.getLimitShow(), this.products);
    this.productService.getCategoryName(this.categoryId).subscribe(categoryName => this.categoryName = categoryName);
  }

   checkLoadEnded(): boolean {
    return     this.categoryName.length // Load start
            && this.categoryName[0] === ProductService.LOAD_ENDED; // Load end
  }

   private loadMore() {
    if (this.page.isDisabled()) { return; }
    this.loading = true; // Add Spinner
    if (this.products.length + this.scroll.getLimitShow() >= Number.parseInt(this.categoryName[2])) { this.stopLoad = true; } // Stop load more
    // Load products
    this.productService.getProducts(this.categoryId, this.products.length, this.scroll.getLimitShow(), this.products).subscribe(() => {
      this.products = [... this.products]; // Update Products
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
    if (!this.stopLoad && this.scroll.checkLoad(index, this.products.length)) {this.loadMore(); }
  }
}
