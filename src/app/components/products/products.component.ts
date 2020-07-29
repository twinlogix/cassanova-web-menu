import {Component, OnDestroy, OnInit} from '@angular/core';
import { Product } from '@classes/Product';
import {ProductService} from '@services/product.service';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {ProductDetailComponent} from '../product-detail/product-detail.component';
import { Observable, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private productsSub : Observable<Product[]>;
  private disabled : boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.productsSub = this.getProducts();
  }

  private getProducts(): Observable<Product[]> {
    const defaultImageUrl : string = '/assets/default.png';
    const categoryId : string = this.route.snapshot.paramMap.get('id');
    const idSp : number = parseInt(this.route.snapshot.paramMap.get('idSp'));
    return this.productService.getProducts({idsSalesPoint : [idSp], idsCategory : [categoryId], start : 0, limit : 6/*this.scroll.getLimitShow()*/}).pipe(
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

}
