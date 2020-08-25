import { Component } from '@angular/core';
import { Product } from '@classes/Product';
import { Observable } from 'rxjs';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Category } from '@app/classes/Category';
import { CategoryService } from '@app/services/category.service';
import { ProductsRequest } from '@classes/QueryParams'
import { InfiniteScrollableComponent } from '../infinite-scrollable/infinite-scrollable.component';
import { ParamsEnum } from '@classes/SearchQueryStringParams'
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { ROUTE_PARAMS } from '@app/enums/route-params';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent extends InfiniteScrollableComponent<Product> {

  public categoriesSub : Observable<Category[]>;
  private idLockedCategory : string;
  private productName : string = "";
  private productDescription : string = "";
  private idSp : number;
  private idCategory : string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    super(productService, prepareProduct, filterProducts)
  }

  ngOnInit() {
    this.idSp = parseInt(this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_SP));
    this.idLockedCategory =  this.route.snapshot.queryParamMap.get(ParamsEnum.CATEGORY);
    if(this.idLockedCategory) {
      this.idCategory = this.idLockedCategory;
    }
    this.setQuery(this.prepareQuery());
    this.getItems();
    this.categoriesSub = this.categoryService.getData({idsSalesPoint : [this.idSp], start : 0, limit : 100});  //TODO: remove magic number 100
  }

  private onSubmit(): void {
    this.setQuery(this.prepareQuery());
    this.getItems(true);
  }

  private prepareQuery() : ProductsRequest {
    let query : ProductsRequest = {idsSalesPoint : [this.idSp]};
    if (this.idCategory) {
      query.idsCategory = [this.idCategory];
    }
    return query;
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

function filterProducts(products: Product[]): Product[] {  
  return products.filter(p => p.description.toLowerCase().includes(this.productName) &&
                              checkDescr(p.descriptionExtended, this.productDescription));
}

function checkDescr(descr : string, filterDescr : string) : boolean {
  const d : string = descr ?? "";
  return d.toLocaleLowerCase().includes(filterDescr);
};