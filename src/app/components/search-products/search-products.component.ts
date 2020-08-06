import { Component } from '@angular/core';
import { Product } from '@classes/Product';
import { Observable } from 'rxjs';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Category } from '@app/classes/Category';
import { CategoryService } from '@app/services/category.service';
import { ProductsRequest } from '@classes/QueryParams'
import { InfiniteScrollableComponent } from '../infinite-scrollable/infinite-scrollable.component';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent extends InfiniteScrollableComponent<Product> {

  private categoriesSub : Observable<Category[]>;
  private productName : string = "";
  private productDescription : string = "";
  private productCategory : string = undefined;
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
    this.idSp = parseInt(this.route.snapshot.paramMap.get('idSp'));
    this.idCategory = this.route.snapshot.paramMap.get("idCat");
    const query : ProductsRequest = {idsSalesPoint : [this.idSp]}
    if(this.idCategory) {
      query.idsCategory = [this.idCategory];
    }
    this.setQuery(query);
    this.getItems();
    this.categoriesSub = this.categoryService.getData({idsSalesPoint : [this.idSp], start : 0, limit : 100});  //TODO: remove magic number 100
  }

  private onSubmit(): void {
    const query : ProductsRequest = {
      idsSalesPoint : [this.idSp], 
      idsCategory : [this.idCategory ?? this.productCategory],
      start : 0, 
      limit : 100
    }
    this.setQuery(query)
    this.getItems(true);
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