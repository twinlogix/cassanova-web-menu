import {Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '@app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '@app/classes/Product';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { StockService } from '@app/services/stock.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy{

  private productSub  : Observable<Product[]>;
  private quantitySub : Observable<number[]>;
  private selectedQuantity : number = 1;
  constructor(private productService : ProductService,
              private stockService   : StockService,
              private route          : ActivatedRoute) { }

  //TODO: vedi se riesci a gestire meglio overflow di body
  ngOnDestroy(): void {
    document.body.classList.replace("overflow-visible", "overflow-hidden");
  }

  ngOnInit() {
    document.body.classList.replace("overflow-hidden", "overflow-visible");
    const idSp : number = Number.parseInt(this.route.snapshot.paramMap.get("idSp"));
    const idProd : string = this.route.snapshot.paramMap.get("id");
    this.productSub = this.productService.getProducts({ids : [idProd]}).pipe(
      map(res => res.map(prod => this.prepareProduct(prod)))
    );
    this.quantitySub = this.stockService.getStock({idProduct: [idProd]}, idSp).pipe(
      map(res => Array.from(Array(res[0].quantity), (_, i) => i + 1))
    )
  }

  private prepareProduct(prod : Product) : Product {
    let res = prod;
    res.descriptionExtended = res.descriptionExtended ?? "Nessuna descrizione disponibile."
    return res;
  }

}