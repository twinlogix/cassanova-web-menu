import {Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '@app/classes/Product';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { StockService } from '@app/services/stock.service';
import { Stock } from '@classes/Stock'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private productSub  : Observable<Product[]>;
  private quantitySub : Observable<number[]>;
  private selectedQuantity : number = 1;
  //Due to permission restrictions to some accounts (apiKeys), some stores are not allowed to access the Stock server.
  //Use this variable to hide all stock information in the template
  private unauthorized : boolean = false;
  constructor(private productService : ProductService,
              private stockService   : StockService,
              private route          : ActivatedRoute) { }

  ngOnInit() {
    const idSp : number = Number.parseInt(this.route.snapshot.paramMap.get("idSp"));
    const idProd : string = this.route.snapshot.paramMap.get("id");
    this.productSub = this.productService.getData({ids : [idProd]}).pipe(
      map(res => res.map(prod => this.prepareProduct(prod)))
    );
    this.quantitySub = this.stockService.getStock({idProduct: [idProd]}, idSp).pipe(
      tap(res => this.unauthorized = res.toString() === this.stockService.UNAUTHORIZED_MESSAGE),
      map(res => res.length > 0 && res[0].quantity ? Array.from(Array(res[0].quantity), (_, i) => i + 1) : []),
    )
  }

  private prepareProduct(prod : Product) : Product {
    let res = prod;
    res.descriptionExtended = res.descriptionExtended ?? "Nessuna descrizione disponibile."
    return res;
  }

}