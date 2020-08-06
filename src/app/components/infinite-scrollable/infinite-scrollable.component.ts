import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CassaWebRequest, DEFAULT_START, DEFAULT_LIMIT } from '@app/classes/QueryParams';
import { FetchService } from '@app/classes/FetchService';

@Component({
  template: 'THIS SHOULD NOT BE SEEN'
})
export abstract class InfiniteScrollableComponent<T> implements OnDestroy {

  private end : boolean = false;
  private subs : Subscription = new Subscription();
  private query : CassaWebRequest;
  protected items : T[] = []; 
  protected fetching : boolean = true;

  constructor(private fetchService : FetchService<T>, private itemProcessFunc ?: (prod : T) => T, private collectionProcessFunc ?: (arr : T[]) => T[]) { }

  protected setQuery(query : CassaWebRequest) {
    query.limit = query.limit ?? DEFAULT_LIMIT;
    query.start = query.start ?? DEFAULT_START;
    this.query = query;
  }

  protected getItems(refresh : boolean = false) {
    if(!this.query) {
      throw("You must initialize the query first")
    }

    if(refresh) {
      this.end = false;
    }

    if(this.end) {
      return;
    }

   this.subs.add(this.fetchService.getData(this.query).subscribe(
      res => {
        if(this.collectionProcessFunc) {
          res = this.collectionProcessFunc(res);
        }
        this.query.start += res.length;
        if(this.itemProcessFunc) {
          res = res.map(prod => this.itemProcessFunc(prod));
        }
        this.items = !refresh ? this.items.concat(res) : res;
        this.fetching = false;
        if(res.length < this.query.limit) {
          this.end = true;
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onScrollDown (ev) {
    this.getItems();
  }
}
