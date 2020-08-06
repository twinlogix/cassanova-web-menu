import { CassaWebRequest } from './QueryParams';
import { Observable } from 'rxjs';

export interface FetchService<T> {
    getData(params : CassaWebRequest) : Observable<Array<T>>
}