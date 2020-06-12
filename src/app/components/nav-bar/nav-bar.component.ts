import { Component, OnInit } from '@angular/core';
import { PageType, PageStatusService } from '@app/services/page-status.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
              private route : ActivatedRoute) { }
  
  ngOnInit(): void {
    this.pageType = this.pageInfo.getpageType();
    this.idSp = this.route.snapshot.paramMap.get("idSp");
  }

}
