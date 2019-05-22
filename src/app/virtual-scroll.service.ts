import {Injectable} from '@angular/core';
import {fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualScrollService {

  private limitShow = 6;
  private itemShow = 5;
  private limitShowSearch = 5;
  private itemShowSearch = 4;
  public itemSize;
  public viewPortSize;
  public viewPortSizeSearch;

  constructor() {
    this.updateScreenSize(window.innerHeight, window.innerWidth);
    // @ts-ignore
    fromEvent(window, 'resize').subscribe(window => this.updateScreenSize(window.currentTarget.innerHeight, window.currentTarget.innerWidth));
  }

  getLimitShow(): number { return this.limitShow; }
  checkLoad(index: number, lenght: number): boolean { return index + this.itemShow === lenght; }

  getLimitShowSearch(): number { return this.limitShowSearch; }
  checkLoadSearch(index: number, lenght: number): boolean { return index + this.itemShowSearch === lenght; }


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
}
