import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product} from '@classes/Product';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription} from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Category } from '@app/classes/Category';
import { CategoryService } from '@app/services/category.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import {ProductsRequest} from '@classes/QueryParams'

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit, OnDestroy {

  // Subscriptions
  private resultsSub : Observable<Product[]>;
  private categoriesSub : Observable<Category[]>;
  private routerSub : Subscription;

  private disabled : boolean = false;
  private productName : string = "";
  private productDescription : string = "";
  private productCategory : string = undefined;
  private idSp : number;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if(this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.idSp = parseInt(this.route.snapshot.paramMap.get('idSp'));
    this.resultsSub = this.getProducts({idsSalesPoint : [this.idSp]});
    this.categoriesSub = this.categoryService.getCategories({idsSalesPoint : [this.idSp], start : 0, limit : 100});  //TODO: remove magic number 100
  }

  private getProducts(params : ProductsRequest): Observable<Product[]> {
    const defaultImageUrl : string = '/assets/default.png';
    return this.productService.getProducts(params).pipe(
      map(p => this.filterProducts(p)),
      tap(prods => {
        for(let p of prods) {
          if(!p.images) {
            p.images = [{imageUrl : defaultImageUrl}];
          }
          if(p.images.length == 0) {
            p.images.push({imageUrl : defaultImageUrl});
          }
        }
      }),
    );
  }

  private onSubmit(): void {
    this.resultsSub = this.getProducts({ idsSalesPoint : [this.idSp], 
                                         idsCategory : [this.productCategory],
                                         start : 0, 
                                         limit : 100}); //TODO: remove magic number 100
  }

  private filterProducts(products: Product[]): Product[] {
    return products.filter(p => p.description.toLowerCase().includes(this.productName) &&
                                this.checkDescr(p.descriptionExtended, this.productDescription));
  }

  private checkDescr(descr : string, filterDescr : string) : boolean {
    const d : string = descr ?? "";
    return d.toLocaleLowerCase().includes(filterDescr);
  }

  private openDetail(product: Product): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, { data: product }); // Open Dialog
    this.disabled = true;
    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationStart)
    ).subscribe(e => dialogRef.close());

    dialogRef.afterClosed().subscribe(() =>  {
      this.disabled = false;
    });
  }
}
