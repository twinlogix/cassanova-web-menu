import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';

const limitShow = 10;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private categoryId: string;
  private categoryName: string[] = []; // [0] State, [1] Category Name, [2] Number products
  private stopLoad = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { this.getProducts(); }

  private getProducts(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts(this.categoryId, this.products.length, limitShow, this.products);
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
    if (this.products.length + limitShow >= Number.parseInt(this.categoryName[2])) { this.stopLoad = true; } // Stop (remove load more)
    this.productService.getProducts(this.categoryId, this.products.length, limitShow, this.products);
  }

  private changeImageIndex(product: Product, index: number) { product.imageIndex += index; }
}
