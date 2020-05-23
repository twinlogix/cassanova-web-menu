import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product} from '@classes/Product';
import { MatDialog } from '@angular/material/dialog';
import { VirtualScrollService} from '../../virtual-scroll.service';
import { Observable, Subscription} from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { ProductService } from '@app/services/product.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Category } from '@app/classes/Category';
import { CategoryService } from '@app/services/category.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

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
    public scroll: VirtualScrollService, // Used in HTML
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
    this.resultsSub = this.getProducts(this.idSp);
    this.categoriesSub = this.categoryService.getCategories([this.idSp], 0, 100);
  }

  private getProducts(idSp : number, idCategory?: string, start?: number, limit?: number): Observable<Product[]> {
    const defaultImageUrl : string = '/assets/default.png';
    return this.productService.getProducts([idSp], [idCategory], 0, limit).pipe(
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
    this.resultsSub = this.getProducts(this.idSp, this.productCategory, 0, 100);
  }

  private filterProducts(products: Product[]): Product[] {
    return products.filter(p => p.description.toLocaleLowerCase().includes(this.productName) &&
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
