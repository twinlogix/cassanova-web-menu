import {Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '@app/classes/Product';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { StockService } from '@app/services/stock.service';
import { Stock } from '@classes/Stock'
import { ROUTE_PARAMS } from '@app/enums/route-params';
import {Channel} from "@classes/QueryParams";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private HIDE_BUY_OPTIONS : boolean = true;
  public productSub  : Observable<Product[]>;
  private quantitySub : Observable<number[]>;
  private selectedQuantity : number = 1;
  private idSp : number;
  //Due to permission restrictions to some accounts (apiKeys), some stores are not allowed to access the Stock server.
  //Use this variable to hide all stock information in the template
  private unauthorized : boolean = false;
  constructor(private productService : ProductService,
              private stockService   : StockService,
              private route          : ActivatedRoute) { }

  ngOnInit() {
    this.idSp = Number.parseInt(this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_SP));
    const idProd : string = this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_PROD);
    this.productSub = this.productService.getData({
      ids : [idProd],
      enabledForChannels: [Channel.SELF_ORDER]
    }).pipe(
      map(res => res.map(prod => this.prepareProduct(prod)))
    );
    this.quantitySub = this.stockService.getStock({idProduct: [idProd]}, this.idSp).pipe(
      tap(res => this.unauthorized = res.toString() === this.stockService.UNAUTHORIZED_MESSAGE),
      map(res => res.length > 0 && res[0].quantity ? Array.from(Array(res[0].quantity), (_, i) => i + 1) : []),
    )
  }

  private prepareProduct(prod : Product) : Product {
    const defaultImageUrl : string = '/assets/default.png';
    let res = prod;
    res.images = res.images ?? [{imageUrl : defaultImageUrl}]

    for (const price of res.prices) {
      if (!price.hasOwnProperty('idSalesMode')) {
        if (price.hasOwnProperty('idSalesPoint')) {
          if (price.idSalesPoint == this.idSp) {
            res.basePrice = price;
            break;
          }
        } else {
          res.basePrice = price;
        }
      }
    }
    console.log("price:" + res.basePrice)

    return res;
  }

}
