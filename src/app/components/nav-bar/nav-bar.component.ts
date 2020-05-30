import { Component, OnInit } from '@angular/core';
import { PageType, PageStatusService } from '@app/services/page-status.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private pageType : PageType;
  private PageType = PageType;
  private idSp : string;

  constructor(private pageInfo : PageStatusService,
              private router : Router) 
  { 
    this.pageType = pageInfo.getpageType();
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.pageType = pageInfo.getpageType();
      if(this.pageType !== PageType.SALESPOINT) {
        this.idSp = pageInfo.getTokenizedUrl()[1];
      }
    });
  }

  ngOnInit(): void {
  }

}
