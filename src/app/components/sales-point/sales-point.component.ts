import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalesPointService} from '@services/sales-point.service';
import { Observable } from 'rxjs/internal/Observable';
import { SalesPoint } from '@classes/SalesPoint';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-point',
  templateUrl: './sales-point.component.html',
  styleUrls: ['./sales-point.component.scss']
})
export class SalesPointComponent implements OnInit {

  // Subscriptions
  private salesPointSub : Observable<SalesPoint[]>;

  constructor(
    private salesPointService: SalesPointService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() { 
    this.salesPointSub = this.getSalesPoint();
  }

  //TODO:
  //getAddres(SalesPoint) method: call this from the html to format the address
  //
  // Obviously, you'll have to modify this:
  //
  // for (const salePoint of salesPoint) {
  //   let address = '';
  //   const street = salePoint.hasOwnProperty('street') ? salePoint.street : '';
  //   let city = salePoint.hasOwnProperty('city') ? salePoint.city : '';
  //   const country = salePoint.hasOwnProperty('country') ? salePoint.country : '';
  //   city = city + (city !== '' && country !== '' ? ' - ' : '') + country;
  //   address = street;
  //   if (city !== '') {
  //     address = address + (street !== '' ? ' ( ' : '') + city + (street !== '' ? ' )' : '');
  //   }
  //   const salePointItem = new SalesPoint(salePoint.id, salePoint.name, address);
  //   this.salesPoint.push(salePointItem);
  //     this.salesPointMap.set(salePoint.id, salePointItem);
  //   }
  //   this.loading = LOAD_FINISH;
  // })


  private getSalesPoint(): Observable<SalesPoint[]> {
    return this.salesPointService.getSalesPoints();
  }
}
