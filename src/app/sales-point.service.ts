import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {HttpUtilsService} from './http-utils.service';
import {Observable, of} from 'rxjs';
import {catchError, share} from 'rxjs/operators';
import {SalePoint} from './SalePoint';
import {PageStatusService} from './page-status.service';
import {tap} from 'rxjs/internal/operators/tap';

const NOT_LOADING = 0;
const LOAD_START = 1;
const LOAD_FINISH = 2;

@Injectable({
  providedIn: 'root'
})
export class SalesPointService {

  private salesPointMap: Map<number, SalePoint> = new Map();
  private salesPoint: SalePoint[] = [];
  private requestUrl = `${this.httpUtils.getHostname()}/salespoint`;
  private loading: number;
  private subscription;

  constructor(private token: TokenService,
              private http: HttpClient,
              private httpUtils: HttpUtilsService,
              private page: PageStatusService) {
    this.loading = NOT_LOADING;
  }

  // Return all the categories
  public getSalesPoints(): Observable<SalePoint[]> { return of(this.salesPoint); }

  public loadSalesPoint(): Observable<any> {
    if (this.loading === LOAD_FINISH) { // SalesPoint yet loaded
      return of(true);
    } else if (this.loading === LOAD_START) { // SalesPoint loading
      return this.subscription;
    }
    // Load SalesPoint
    this.loading = LOAD_START;

    // console.log('Loading sales point'); // TODO log
    this.subscription = this.http.get(this.requestUrl, this.httpUtils.getHttpOptions()).pipe(
        catchError(this.httpUtils.handleError('sales point loading', [])),
        share(),
        tap( response => {
          // @ts-ignore
          const salesPoint = response.salesPoint;
          // @ts-ignore
          const totalCount = response.totalCount;

          for (const salePoint of salesPoint) {
            let address = '';
            const street = salePoint.hasOwnProperty('street') ? salePoint.street : '';
            let city = salePoint.hasOwnProperty('city') ? salePoint.city : '';
            const country = salePoint.hasOwnProperty('country') ? salePoint.country : '';
            city = city + (city !== '' && country !== '' ? ' - ' : '') + country;
            address = street;
            if (city !== '') {
              address = address + (street !== '' ? ' ( ' : '') + city + (street !== '' ? ' )' : '');
            }
            const salePointItem = new SalePoint(salePoint.id, salePoint.name, address);
            this.salesPoint.push(salePointItem);
            this.salesPointMap.set(salePoint.id, salePointItem);
          }
          this.loading = LOAD_FINISH;
        })
      );
    return this.subscription;
  }
  // SalesPoint must be yet loaded
  public checkIdSalesExist() {
    if (!this.salesPointMap.has(Number.parseInt(this.page.getId()))) { // If SalesPoint doesn't exist, navigate to salesPoint page
      this.page.goToPage(this.page.SALESPOINT);
    }
  }

  public getSalePointName() {
    this.checkIdSalesExist();
    return this.salesPointMap.get(Number.parseInt(this.page.getId())).name;
  }
}
