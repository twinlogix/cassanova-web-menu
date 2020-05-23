import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs/internal/observable/of';
import {HttpUtilsService} from './http-utils.service';
import {PageStatusService} from './page-status.service';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements OnDestroy {

  private token: string;
  private apiKey: string;
  private requestUrl = `${this.httpUtils.getHostname()}/apikey/token`;

  // Subscription
  private tokenSub = null;

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private page: PageStatusService) {}


  public loadToken(): Observable<any> {
    this.apiKey = 'ebf79958-415e-4333-b746-7b3375802fa7'//apiKey;
    if (this.token === undefined /*|| this.apiKey.localeCompare(apiKey) !== 0*/) { // Load token
      console.log('Loading token'); // TODO log
      return this.http.post(this.requestUrl, JSON.stringify(this.getBody()), this.httpUtils.getTokenHttpOptions()).pipe(
        tap(response => {
          // @ts-ignore
          this.token = response.access_token;
          setInterval(() => this.updateToken(this), 3600000); // Update token every hour
        }),
        catchError(this.httpUtils.handleError('token', [])), // then handle the error
        share()
      );
    } else { // Token yet loaded
      // console.log('Token yet present'); // TODO log
      return of(true);
    }
  }

  public getToken(): string { return this.token; }

  private updateToken(reference) {
    this.tokenSub = reference.http.post(this.requestUrl, JSON.stringify(this.getBody()), this.httpUtils.getTokenHttpOptions()).pipe(
     catchError(this.httpUtils.handleError('update token', [])
     )).subscribe(
      response => {
        // @ts-ignore
        reference.token = response.access_token;
        // console.log(`Token updated: ${reference.token}`); // TODO log
      }
    );
  }

  private getBody(): any {
    return {
      apiKey: this.apiKey
    };
  }

  ngOnDestroy(): void {
    if (this.tokenSub !== null) { this.tokenSub.unsubscribe(); }
  }
}
