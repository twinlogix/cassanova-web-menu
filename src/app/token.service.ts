import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';
import {retry} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs/internal/observable/of';
import {HttpUtilsService} from './http-utils.service';
import {PageStatusService} from './page-status.service';
/*
const body = {
   apiKey: '065c79c6-0486-42c9-a86c-c948b45811d9'
  // apiKey: 'ebf79958-415e-4333-b746-7b3375802fa7'
};
*/
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;
  private apiKey: string;
  private requestUrl = `${this.httpUtils.getHostname()}/apikey/token`;

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService, private page: PageStatusService) {}


  loadToken(): Observable<any> {
    const apiKey = this.page.getSp();
    if (this.token === undefined || this.apiKey.localeCompare(apiKey) !== 0) { // Load token
      console.log('Loading token'); // TODO remove log
      this.apiKey = apiKey;
      return this.http.post(this.requestUrl, JSON.stringify(this.getBody()), this.httpUtils.getTokenHttpOptions()).pipe(
        retry(3),
        tap(response => {
          // @ts-ignore
          this.token = response.access_token;
          setInterval(() => this.updateToken(this), 3600000); // Update token every hour
        }),
        catchError(this.httpUtils.handleError('token', [])) // then handle the error
      );
    } else { // Token yet loaded
      console.log('Token yet present'); // TODO remove log
      return of(true);
    }
  }

  getToken(): string { return this.token; }

  private updateToken(reference) {
    reference.http.post(this.requestUrl, JSON.stringify(this.getBody()), this.httpUtils.getTokenHttpOptions()).pipe(
     retry(3),
     catchError(this.httpUtils.handleError('update token', [])
     )).subscribe(
      response => {
        // @ts-ignore
        reference.token = response.access_token;
        console.log(`Token updated: ${reference.token}`); // TODO remove log
      }
    );
  }

  private getBody(): any {
    return {
      apiKey: this.apiKey
    };
  }
}
