import {Component, OnDestroy, OnInit} from '@angular/core';
import { Product } from '@classes/Product';
import {ProductService} from '@services/product.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {VirtualScrollService} from '../../virtual-scroll.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private productsSub : Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public scroll: VirtualScrollService, // Used in HTML
  ) { }

  ngOnInit() {
    this.productsSub = this.getProducts();
  }

  private getProducts(): Observable<Product[]> {
    const defaultImageUrl : string = '/assets/default.png';
    const categoryId : string = this.route.snapshot.paramMap.get('id');
    const idSp : number = parseInt(this.route.snapshot.paramMap.get('idSp'));
    return this.productService.getProducts([idSp], [categoryId], 0, this.scroll.getLimitShow()).pipe(
      tap(prods => {
        for(let p of prods) {
          if(!p.images) {
            p.images = [{imageUrl : defaultImageUrl}];
          }
          if(p.images.length == 0) {
            p.images.push({imageUrl : defaultImageUrl});
          }
        }
      })
    );
  }

  // private loadMore() {
  //   if (this.page.isDisabled()) { return; }
  //   this.loading = true; // Add Spinner
  //   if (this.products.length + this.scroll.getLimitShow() >= Number.parseInt(this.categoryName[2])) { this.stopLoad = true; } // Stop load more
  //   // Load products
  //   if (this.productSub !== null) { this.productSub.unsubscribe(); }
  //   this.productSub = this.productService.getProducts(this.categoryId, this.products.length, this.scroll.getLimitShow(), this.products).subscribe(() => {
  //     this.products = [... this.products]; // Update Products
  //     this.loading = false; // Remove Spinner
  //   });
  // }

   public openDetail(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, { data: product }); // Open Dialog
    // this.page.setDisable(true); // Disable all page (not Dialog)
    dialogRef.afterClosed().subscribe(() =>  {
      // this.page.setDisable(false); // Enable Page, after dialog closing
      // this.page.removeDialog(); // Remove dialog ref, in page status
    });
    // this.page.addDialog(dialogRef);
  }

}
