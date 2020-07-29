import {Component, OnInit} from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '@app/classes/Product';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private productSub : Observable<Product[]>;

  constructor(private productService : ProductService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    const id : string = this.route.snapshot.paramMap.get("id");
    this.productSub = this.productService.getProducts({ids : [id]}).pipe(
      map(res => res.map(prod => this.prepareProduct(prod)))
    );
  }

  private prepareProduct(prod : Product) : Product {
    let res = prod;
    res.descriptionExtended = res.descriptionExtended ?? "Nessuna descrizione disponibile."
    return res;
  }

}