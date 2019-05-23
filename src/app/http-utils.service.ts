import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {PageStatusService} from './page-status.service';

const LOAD_LIMIT = 10;
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

  constructor(private router: Router, private page: PageStatusService) { }
  getLoadLimit(): number { return LOAD_LIMIT; }
  getHostname(): string { return environment.hostname; }
  getTokenHttpOptions(): any  { return TOKEN_HTTP_OPTIONS; }
  getHttpOptions(): any { return BASIC_HTTP_OPTIONS; }

  public handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.page.goToPage(this.page.ERROR);
      return of(result as T);
    };
  }
}
