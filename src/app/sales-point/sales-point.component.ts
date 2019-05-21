import { Component, OnInit } from '@angular/core';
import {VirtualScrollService} from '../virtual-scroll.service';
import {SalesPointService} from '../sales-point.service';
import {PageStatusService} from '../page-status.service';
import {SalePoint} from '../SalePoint';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../token.service';


@Component({
  selector: 'app-sales-point',
  templateUrl: './sales-point.component.html',
  styleUrls: ['./sales-point.component.scss']
})
export class SalesPointComponent implements OnInit {

  private salesPoints: SalePoint[] = [];
  private sp;

  constructor(
    private salesPointService: SalesPointService,
    private scroll: VirtualScrollService,
    private page: PageStatusService,
    private route: ActivatedRoute,
    private token: TokenService
  ) {
    route.queryParams.subscribe(e => {
      if (e.hasOwnProperty('sp')) {
        this.sp = e.sp;
      }
    });
  }

  ngOnInit() { this.token.loadToken().subscribe(() => {
    this.getSalesPoint();
  }); }

  getSalesPoint(): void {
    this.salesPointService.loadSalesPoint();
    this.salesPointService.getSalesPoints().subscribe( salesPoints =>  this.salesPoints = salesPoints );
  }

}
