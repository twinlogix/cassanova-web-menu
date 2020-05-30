import {Injectable} from '@angular/core';
import { Location } from '@angular/common';

export enum PageType {
  CATEGORIES = 'categories',
  PRODUCTS = 'products',
  SEARCH = 'search',
  ERROR = 'error',
  SALESPOINT = 'salespoint',
  OTHER = 'other'
}

@Injectable({
  providedIn: 'root'
})
export class PageStatusService {

  constructor(private location: Location) {}

  public getpageType(): PageType {
    const url : string[] = this.getTokenizedUrl();
    if(url.length === 2 && url[1] === PageType.CATEGORIES) {
      return PageType.CATEGORIES;
    }
    if(url.length === 3) {
      return PageType.PRODUCTS;
    }
    if(url.length === 2 && url[1] === PageType.SEARCH) {
      return PageType.SEARCH
    }
    if(url.length === 1 && url[0] === PageType.ERROR) {
      return PageType.ERROR;
    }
    if(url.length === 1 && url[0] === PageType.SALESPOINT) {
      return PageType.SALESPOINT;
    }
    return PageType.OTHER;
  }

  getTokenizedUrl() : string[] {
    return this.location.path().split("/").filter(token => token !== "");
  }

}
