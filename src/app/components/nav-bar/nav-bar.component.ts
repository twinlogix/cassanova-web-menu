import { Component, OnInit } from '@angular/core';
import { PageType, PageStatusService } from '@app/services/page-status.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CategoryService } from '@app/services/category.service';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private pageType : PageType;
  private PageType = PageType;
  private barTitle : Observable<string>;
  private returnRoute : string;
  private icon : string;
  private label : string;

  constructor(private pageInfo : PageStatusService,
              private route : ActivatedRoute,
              private categoriesService : CategoryService,
              private productsService : ProductService) { }
  
  ngOnInit(): void {
    this.pageType = this.pageInfo.getpageType();
    switch (this.pageType) {
      case PageType.SALESPOINT:
        this.barTitle = of("Punti vendita");
        break;
      case PageType.CATEGORIES:
        this.barTitle = of("Categorie");
        this.returnRoute = "/salespoint";
        this.label = "Torna ai punti vendita";
        this.icon = "store";
        break;
      case PageType.PRODUCTS:
        const idCat : string = this.route.snapshot.paramMap.get("id");
        //The category id is unknown when the navigation is still pending. The page is also refreshed when the authentication ends, so this check prevents
        //querying the server two times
        if(idCat) {
          this.returnRoute = "..";
          this.label = "Torna alla categoria";
          this.icon = "keyboard_arrow_left";
          this.barTitle = this.categoriesService.getCategories({ids : [idCat]}).pipe(
            map(res => res.length > 0 ? res[0].description : "")
          );
        }
        break;
      case PageType.PRODUCT_DETAIL:
        {
          const prodId : string = this.route.snapshot.paramMap.get("id");
          if(prodId) {
            this.returnRoute = "../..";
            this.label = "Torna alla lista prodotti";
            this.icon = "keyboard_arrow_left";
            this.barTitle = this.productsService.getProducts({ids : [prodId]}).pipe(
              map(res => res.length > 0 ? res[0].description : "")
            );
          }
        }
        break;
      default:

        break;
    }
  }

}
