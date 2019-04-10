import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/internal/operators/catchError';
import {HttpUtils} from './HttpUtils';
import {retry} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';

const requestUrl = HttpUtils.TOKEN_HOSTNAME + '/apikey/token';
const body = {
  apiKey: 'ebf79958-415e-4333-b746-7b3375802fa7'
};

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // httpBasicOptions;
  private token: string;

  constructor(private http: HttpClient) {}

  /*
 getOptions(): Observable<any> {
    if (this.httpBasicOptions !== undefined && this.httpBasicOptions !== null) {
      console.log('From field');
      return of(this.httpBasicOptions);
    } else {
      console.log('From http');
      const result = this.http.post(requestUrl, JSON.stringify(body), HttpUtils.TOKEN_HTTP_OPTIONS).pipe(
        retry(3),
        // @ts-ignore
        map((response) => this.createOptions(response.access_token)), // Create 'httpOptions' using the token as 'Authorization'
        catchError(this.handleError('token', [])) // then handle the error
      );
      result.subscribe((response) => this.httpBasicOptions = response ); // Save the response into 'httpBasicOptions'
      return result;
    }
  }
  */

  loadToken(): Observable<any> {
    return this.http.post(requestUrl, JSON.stringify(body), HttpUtils.TOKEN_HTTP_OPTIONS).pipe(
      retry(3),
      tap(response => {
        // @ts-ignore
        this.token = response.access_token;
        setInterval(() => this.updateToken(this), 360000); // Update token every 1 hour
      }),
      catchError(HttpUtils.handleError('token', [])) // then handle the error
    );
  }

  getToken(): string { return this.token; }

  private updateToken(reference) {
    reference.http.post(requestUrl, JSON.stringify(body), HttpUtils.TOKEN_HTTP_OPTIONS).pipe(
     retry(3),
     catchError(HttpUtils.handleError('update token', [])
     )).subscribe(
      response => {
        // @ts-ignore
        reference.token = response.access_token;
        console.log(`Token updated: ${reference.token}`); // TODO remove token updated log
      }
    );
  }

  /*
 private createOptions(token: string): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Version': '1.0.0',
        Authorization: 'Bearer' + token
      })
    };
 }
 */
}
