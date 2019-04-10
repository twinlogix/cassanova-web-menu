import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private products: Product[];
  private categoryId: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { this.getProducts(); }

  getProducts(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts(this.categoryId).subscribe(products => this.products = products);
  }
}
