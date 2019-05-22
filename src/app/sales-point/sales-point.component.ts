import {Component, OnInit} from '@angular/core';
import {VirtualScrollService} from '../virtual-scroll.service';
import {SalesPointService} from '../sales-point.service';
import {PageStatusService} from '../page-status.service';
import {SalePoint} from '../SalePoint';
import {TokenService} from '../token.service';

@Component({
  selector: 'app-sales-point',
  templateUrl: './sales-point.component.html',
  styleUrls: ['./sales-point.component.scss']
})
export class SalesPointComponent implements OnInit {

  salesPoints: SalePoint[] = [];

  constructor(
    private salesPointService: SalesPointService,
    private scroll: VirtualScrollService,
    public page: PageStatusService,
    private token: TokenService
  ) {}

  ngOnInit() { this.token.loadToken().subscribe(() => {
    this.page.resetSalePointName();
    this.getSalesPoint();
  }); }

  private getSalesPoint(): void {
    this.salesPointService.loadSalesPoint();
    this.salesPointService.getSalesPoints().subscribe( salesPoints =>  this.salesPoints = salesPoints );
  }

}
