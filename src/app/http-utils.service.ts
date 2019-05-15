import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Route, Router} from '@angular/router';

const LOAD_LIMIT = 10;
const HOSTNAME = 'https://cassanova-api-staging.herokuapp.com';
const TOKEN_HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': '*'
  })
};
const BASIC_HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Version': '1.0.0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor(private router: Router) { }
  getLoadLimit(): number { return LOAD_LIMIT; }
  getHostname(): string { return HOSTNAME; }
  getTokenHttpOptions(): any  { return TOKEN_HTTP_OPTIONS; }
  getHttpOptions(): any { return BASIC_HTTP_OPTIONS; }

  handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.router.navigateByUrl('errore');
      return of(result as T);
    };
  }
}
