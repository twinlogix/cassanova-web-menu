import { Component, OnInit } from '@angular/core';
import { PageType, PageStatusService } from '@app/services/page-status.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
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
  private backRoute : string;
  private backIcon : string;
  private backLabel : string;
  private searchLabel : string;
  private searchRoute : string;

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
        this.backRoute = "/salespoint";
        this.backLabel = "Torna ai punti vendita";
        this.backIcon = "store";
        this.searchLabel = "Vai alla pagina di ricerca";
        this.searchRoute = "search";
        break;
      case PageType.PRODUCTS:
        const idCat : string = this.route.snapshot.paramMap.get("id");
        //The category id is unknown when the navigation is still pending. The page is also refreshed when the authentication ends, so this check prevents
        //querying the server two times
        if(idCat) {
          this.backRoute = "..";
          this.backLabel = "Torna alla categoria";
          this.backIcon = "keyboard_arrow_left";
          this.barTitle = this.categoriesService.getData({ids : [idCat]}).pipe(
            map(res => res.length > 0 ? res[0].description : "")
          );
          this.searchLabel = "Vai alla pagina di ricerca";
          this.searchRoute = "search";
        }
        break;
      case PageType.SEARCH:
        this.barTitle = of("Cerca");
        this.backIcon = "keyboard_arrow_left";
        this.backLabel = "Torna indietro";
        this.backRoute = "../"
        break;
      case PageType.PRODUCT_DETAIL:
        {
          const prodId : string = this.route.snapshot.paramMap.get("id");
          if(prodId) {
            this.backRoute = "../..";
            this.backLabel = "Torna alla lista prodotti";
            this.backIcon = "keyboard_arrow_left";
            this.barTitle = this.productsService.getData({ids : [prodId]}).pipe(
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
