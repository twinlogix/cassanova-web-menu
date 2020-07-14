import { Component, OnInit } from '@angular/core';
import { PageType, PageStatusService } from '@app/services/page-status.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CategoryService } from '@app/services/category.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private pageType : PageType;
  private PageType = PageType;
  private idSp : string;
  private barTitle : Observable<string>;
  constructor(private pageInfo : PageStatusService,
              private route : ActivatedRoute,
              private categories : CategoryService) { }
  
  ngOnInit(): void {
    this.pageType = this.pageInfo.getpageType();
    this.idSp = this.route.snapshot.paramMap.get("idSp");
    switch (this.pageType) {
      case PageType.SALESPOINT:
        this.barTitle = of("Punti vendita");
        break;
      case PageType.CATEGORIES:
        this.barTitle = of("Categorie");
        break;
      case PageType.PRODUCTS:
        const catId : string = this.route.snapshot.paramMap.get("id");
        //The category id is unknown when the navigation is still pending. The page is also refreshed when the authentication ends, so this check prevents
        //querying the server two times
        if(catId) {
          this.barTitle = this.categories.getCategories({ids : [catId]}).pipe(
            map(res => res[0].description)
          );
        }
        break;
      default:

        break;
    }
  }

}
