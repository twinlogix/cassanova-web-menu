import {Component, OnInit} from '@angular/core';
import { Product } from '@classes/Product';
import {ProductService} from '@services/product.service';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel, ProductsRequest } from '@app/classes/QueryParams';

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
    const categoryId : string = this.route.snapshot.paramMap.get('id');
    const idSp : number = parseInt(this.route.snapshot.paramMap.get('idSp'));
    const query : ProductsRequest = {
      idsSalesPoint: [idSp],
      idsCategory: [categoryId],
      enabledForChannels: [Channel.MOBILE_COMMERCE],
      start: 0,
      limit : 6/*TEMP*/
    }

    return this.productService.getProducts(query).pipe(
      map(res => res.map(prod => this.prepareProduct(prod)))
    );
  }

  private prepareProduct(prod : Product) : Product {
    const defaultImageUrl : string = '/assets/default.png';
    let res = prod;
    if(!res.images) {
      res.images = [{imageUrl : defaultImageUrl}];
    }
    if(res.images.length == 0) {
      res.images.push({imageUrl : defaultImageUrl});
    }
    return res;
  }

}
