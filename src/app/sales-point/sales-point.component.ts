import {AfterViewInit, Component, OnInit} from '@angular/core';
import {VirtualScrollService} from '../virtual-scroll.service';
import {SalesPointService} from '../sales-point.service';
import {PageStatusService} from '../page-status.service';
import {SalePoint} from '../SalePoint';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../token.service';
import {AppComponent} from '../app.component';


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
  ) { this.sp = this.page.getSp(); }

  ngOnInit() { this.token.loadToken().subscribe(() => {
    this.page.resetSalePointName();
    this.getSalesPoint();
  }); }

  getSalesPoint(): void {
    this.salesPointService.loadSalesPoint();
    this.salesPointService.getSalesPoints().subscribe( salesPoints =>  this.salesPoints = salesPoints );
  }

}
