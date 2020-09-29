import { CassaWebRequest } from './QueryParams';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export abstract class FetchService<T> {
    abstract getData(params : CassaWebRequest) : Observable<Array<T>>
}