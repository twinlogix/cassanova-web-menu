import { Component } from '@angular/core';
import { Product } from '@classes/Product';
import { ProductService } from '@services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from '@app/classes/QueryParams';
import { InfiniteScrollableComponent } from '../infinite-scrollable/infinite-scrollable.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends InfiniteScrollableComponent<Product> {
//Possibile implementazione a mano di virtual scrolling: ascolta evento ridimensionamento finestra e basati sul layout per definire quanti elementi vuoi nel buffer

constructor(
  private productService: ProductService,
  private route: ActivatedRoute,
  public router: Router
  ) {
    super(productService, prepareProduct)
  }

  ngOnInit() {
    const start : number = 0;
    const limit : number = 15;
    const categoryId : string = this.route.snapshot.paramMap.get('id');
    const idSp : number = parseInt(this.route.snapshot.paramMap.get('idSp'));
    const query = {
       idsSalesPoint: [idSp],
       idsCategory: [categoryId],
       enabledForChannels: [Channel.SELF_ORDER],
       start : start,
       limit : limit
    }
    this.setQuery(query);
    this.getItems();
  }
}

function prepareProduct(prod : Product) : Product {
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