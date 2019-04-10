import {HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

export class HttpUtils {
  static HOSTNAME = 'https://api.cassanova.com';
  static TOKEN_HOSTNAME = 'https://cassanova-api-staging.herokuapp.com';
  static TRY_HOSTNAME = 'http://192.168.178.106:9000';
  static TOKEN_HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': '*'
    })
  };
  static BASIC_HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Version': '1.0.0'
    })
  };
  static handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
