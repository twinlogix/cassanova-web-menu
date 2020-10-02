import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalesPointService} from '@services/sales-point.service';
import { Observable } from 'rxjs/internal/Observable';
import { SalesPoint } from '@classes/SalesPoint';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sales-point',
  templateUrl: './sales-point.component.html',
  styleUrls: ['./sales-point.component.scss']
})
export class SalesPointComponent implements OnInit {

  public salesPointSub : Observable<SalesPoint[]>;

  constructor(
    private salesPointService: SalesPointService,
    private route : ActivatedRoute
  ) {}

  ngOnInit() { 
    this.salesPointSub = this.getSalesPoint();
  }

  getAddress(sp : SalesPoint) : string {
    let address = '';
    const street = sp.street ?? '';
    let city = sp.city ?? '';
    const country = sp.country ?? '';
    city = city + (city !== '' && country !== '' ? ' - ' : '') + country;
    address = street;
    if (city !== '') {
      address = address + (street !== '' ? ' ( ' : '') + city + (street !== '' ? ' )' : '');
    }
    return address;
  }

  private getSalesPoint(): Observable<SalesPoint[]> {
    return this.salesPointService.getData({hasActiveLicense : true}).pipe(
      map(res => res.map(sp => this.prepareItem(sp)))
    );
  }

  private prepareItem(sp : SalesPoint) : SalesPoint {
    const defaultImageUrl : string = '/assets/default.png';
    let res = sp;
    if(!res.img) {
      res.img = defaultImageUrl;
    }
    return res;
  }
}
