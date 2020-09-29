import { Component, OnInit } from '@angular/core';
import { PageType, PageStatusService } from '@app/services/page-status.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CategoryService } from '@app/services/category.service';
import { ProductService } from '@app/services/product.service';
import { ParamsEnum, SearchQueryString } from '@app/classes/SearchQueryStringParams';
import { SalesPointService } from '@app/services/sales-point.service';
import { ROUTE_PARAMS } from '@app/enums/route-params';

enum LogoDim {
    BIG,
    SMALL
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private backLogoLoaded : boolean = false;
  private titleLogoLoaded : boolean = false;
  public pageType : PageType;
  public PageType = PageType;
  private barTitle : Observable<string>;
  private backRoute : string;
  private backIcon : Observable<string>;
  private backLabel : string;
  private searchLabel : string;
  private searchRoute : string;
  private searchParams : SearchQueryString = null;

  constructor(private pageInfo : PageStatusService,
              private route : ActivatedRoute,
              private salesPointService : SalesPointService,
              private categoriesService : CategoryService,
              private productsService : ProductService) { }
  
  ngOnInit(): void {
    this.pageType = this.pageInfo.getpageType();
    const key : string = this.route.snapshot.paramMap.get(ROUTE_PARAMS.API_KEY);
    //The page is refreshed when the authentication ends, so this check prevents
    //querying the server two times and potential errors due to the fact that the page is not yet fully loaded
    if(key) {
      switch (this.pageType) {
        case PageType.SALESPOINT:
          const defaultTitle = "Punti Vendita"
          this.barTitle = this.getLogo(defaultTitle, LogoDim.BIG).pipe(tap(res => this.titleLogoLoaded = res !== defaultTitle))
          break;
        case PageType.CATEGORIES:
          const defaultIcon = "store";
          this.backIcon = this.getLogo(defaultIcon, LogoDim.SMALL).pipe(tap(res => this.backLogoLoaded = res !== defaultIcon)).pipe(
            tap(res => {
              //Initialize the rest of the components here so that the bar elements are all loaded at once
              this.barTitle = of("Categorie");
              this.backRoute = "../../salespoint";
              this.backLabel = "Torna ai punti vendita";
              this.searchLabel = "Vai alla pagina di ricerca";
              this.searchRoute = "../search";
            })
          )
          break;
        case PageType.PRODUCTS:
          const idCat : string = this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_CAT);
          this.barTitle = this.categoriesService.getData({ids : [idCat]}).pipe(
            map(res => res.length > 0 ? res[0].description : "  "),
            tap(res => {
              //Initialize the rest of the components here so that the bar elements are all loaded at once
              this.backRoute = "..";
              this.backLabel = "Torna alla categoria";
              this.backIcon = of("keyboard_arrow_left");
              this.searchParams = { cat : idCat }
              this.searchLabel = "Vai alla pagina di ricerca";
              this.searchRoute = "../../search"
            })
          );
          break;
        case PageType.SEARCH:
          this.barTitle = of("Cerca");
          this.backIcon = of("keyboard_arrow_left");
          this.backLabel = "Torna indietro";
          const cat = this.route.snapshot.queryParamMap.get(ParamsEnum.CATEGORY)
          if(cat) {
            this.backRoute = `../categories/${cat}`
          } else {
            this.backRoute = "../categories"
          }
          break;
        case PageType.PRODUCT_DETAIL:
          {
            const prodId : string = this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_PROD);
            this.backRoute = "../";
            this.backLabel = "Torna alla lista prodotti";
            this.backIcon = of("keyboard_arrow_left");
            this.barTitle = this.productsService.getData({ids : [prodId]}).pipe(
              map(res => res.length > 0 ? res[0].description : "  ")
            );
          }
          break;
        default:
          break;
      }
    }
  }

  private getLogo(defaultValue : string, logoDim : LogoDim) : Observable<string> {
    return this.salesPointService.getData().pipe(
      map(res => res[0]),
      map(res => logoDim === LogoDim.BIG ? res.logoBig ?? defaultValue : res.logoSmall ?? defaultValue)
    )
  }

}
