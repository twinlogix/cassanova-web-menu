import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Product } from '../Product';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {PageStatusService} from '../page-status.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {TokenService} from '../token.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private categoryId: string;
  private categoryName: string[] = []; // [0] State, [1] Category Name, [2] Number products
  private stopLoad = false;
  private loading = false;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private page: PageStatusService,
    private scroll: VirtualScrollService,
    private token: TokenService /* Load token here, instead of in product service, in order to allow load data on reloading products' page */
  ) { }

  ngOnInit() { this.token.loadToken().subscribe( () => this.getProducts()); }

  private getProducts(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts(this.categoryId, this.products.length, this.scroll.getLimitShow(), this.products);
    this.productService.getCategoryName(this.categoryId).subscribe(categoryName => this.categoryName = categoryName);
  }

  private checkLoadEnded(): boolean {
    return     this.categoryName.length // Loaded start
            && this.categoryName[0] === ProductService.LOAD_ENDED; // Loaded end
  }

  private checkLoadMore(): boolean {
    return     !this.stopLoad // Last requested not launched yet
            && this.products.length > 0 // Some products have been loaded
            && this.categoryName.length > 1 // Category name and total count of products loaded
            && this.products.length !== Number.parseInt(this.categoryName[2]); // Check if all products have been loaded (Usefull if total count of products is less then limitShow
  }

  private loadMore() {
    if (this.page.isDisabled()) { return; }
    this.loading = true;
    if (this.products.length + this.scroll.getLimitShow() >= Number.parseInt(this.categoryName[2])) { this.stopLoad = true; } // Stop (remove load more)
    this.productService.getProducts(this.categoryId, this.products.length, this.scroll.getLimitShow(), this.products).subscribe(() => {
      this.products = [... this.products];
      this.loading = false;
    });
  }

  openDetail(product: Product): void {
    if (this.page.isDisabled()) { return; }
    const dialogRef = this.dialog.open(ProductDetailComponent, { data: product });
    this.page.setDisable(true);
    dialogRef.afterClosed().subscribe(() =>  this.page.setDisable(false));
  }

  private checkLoad(index: number) {
    if (this.scroll.checkLoad(index, this.products.length)) {this.loadMore(); }
  }
}
