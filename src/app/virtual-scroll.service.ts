import {Injectable, OnDestroy} from '@angular/core';
import {fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualScrollService implements  OnDestroy {

  private limitShow = 6;
  private itemShow = 5;
  private limitShowSearch = 5;
  private itemShowSearch = 4;
  public itemSize;
  public viewPortSize;
  public viewPortSizeSearch;

  // Subscription
  private resizeSub = null;

  constructor() {
    this.updateScreenSize(window.innerHeight, window.innerWidth);
    // @ts-ignore
    this.resizeSub = fromEvent(window, 'resize').subscribe(window => this.updateScreenSize(window.currentTarget.innerHeight, window.currentTarget.innerWidth));
  }

  public getLimitShow(): number { return this.limitShow; }
  public checkLoad(index: number, lenght: number): boolean { return index + this.itemShow === lenght; }

  public getLimitShowSearch(): number { return this.limitShowSearch; }
  public checkLoadSearch(index: number, lenght: number): boolean { return index + this.itemShowSearch === lenght; }


  private updateScreenSize(height: number, width: number) {
    let widthView = '76.5vw';
    if (width < 600) { // For phones
      this.itemSize = height * 16 / 100;
      widthView = '97.5vw';
    } else { this.itemSize = height * 14 / 100; }
    this.viewPortSize = {
      height: this.itemShow * this.itemSize + 'px',
      'min-heihgt': '100%',
      width: widthView
    };
    this.viewPortSizeSearch = {
      height: this.itemShowSearch * this.itemSize + 'px',
      'min-heihgt': '100%',
      width: widthView
    };
  }

  ngOnDestroy(): void {
    if (this.resizeSub !== null) { this.resizeSub.unsubscribe(); }
  }
}
