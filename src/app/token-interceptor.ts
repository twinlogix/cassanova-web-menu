import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${request.method.toLocaleUpperCase()} request to: ${request.url}`); // TODO remove log
    const tokenValue = this.token.getToken();
    if (tokenValue === undefined) { return next.handle(request); } // Token request, authorization not available (and not necessary)
    request = request.clone({ // Add authorization in headers
      setHeaders: {
        Authorization: `Bearer ${tokenValue}`
      }
    });
    return next.handle(request);
  }
}
