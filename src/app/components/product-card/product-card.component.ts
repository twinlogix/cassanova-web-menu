import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/classes/Product';
import { ActivatedRoute } from '@angular/router';
import { ROUTE_PARAMS } from '@app/enums/route-params';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  
  @Input() product : Product;
  redirectRoute : string;
  private apiKey : string;
  private idSp : string;

  ngOnInit(): void {
    this.apiKey = this.route.snapshot.paramMap.get(ROUTE_PARAMS.API_KEY);
    this.idSp = this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_SP);
    this.redirectRoute = `${this.apiKey}//${this.idSp}//categories//${this.product.idCategory}//${this.product.id}`;
  }

  constructor(private route : ActivatedRoute) {}

}
