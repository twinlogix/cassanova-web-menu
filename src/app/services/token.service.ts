import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, VirtualTimeScheduler} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs/internal/observable/of';
import {HttpUtilsService} from './http-utils.service';
import {PageStatusService} from './page-status.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;
  private lastApiKey: string;
  private lastDate: number = Date.now();
  private requestUrl : string = `${this.httpUtils.getHostname()}/apikey/token`;
  private tokenValidityMs : number = 0;
  private OK_CODE : number = 200;
  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private page: PageStatusService) {}

  public loadToken(): Observable<number> {
    const currApiKey = 'ebf79958-415e-4333-b746-7b3375802fa7'//apiKey;
    const currDate = Date.now();
    if (this.token === undefined || this.lastApiKey.localeCompare(currApiKey) !== 0 || currDate - this.lastDate >= this.tokenValidityMs) { // Load token
      return this.http.post(this.requestUrl, JSON.stringify(this.getBody(currApiKey)), this.httpUtils.getTokenHttpOptions()).pipe(
        tap(response => {
          this.tokenValidityMs = response["expires_in"] * 1000; //Seconds to Ms
          this.token = response["access_token"];
          this.lastApiKey = currApiKey;
          this.lastDate = currDate;
        }),
        map(res => this.OK_CODE),
        catchError(this.httpUtils.handleErrorErrCode('token')), // then handle the error
      );
    } else {
      return of(this.OK_CODE);
    }
  }

  public getToken(): string { return this.token; }

  private getBody(apiKey : string): any {
    return {
      apiKey: apiKey
    };
  }

}
