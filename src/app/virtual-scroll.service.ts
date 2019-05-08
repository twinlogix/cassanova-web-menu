import {HostListener, Injectable} from '@angular/core';
import {fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirtualScrollService {

  private limitShow = 6;
  private itemShow = 5;
  public itemSize;
  public viewPortSize;

  constructor() {
    this.updateScreenSize(window.innerHeight, window.innerWidth);
    // @ts-ignore
    fromEvent(window, 'resize').subscribe(window => this.updateScreenSize(window.currentTarget.innerHeight, window.currentTarget.innerWidth));
  }

  getLimitShow(): number { return this.limitShow; }
  checkLoad(index: number, lenght: number): boolean { return index + this.itemShow === lenght; }



  private updateScreenSize(height: number, width: number) {
    if (width < 600) { // For phones
      this.itemSize = height * 16 / 100;
    } else { this.itemSize = height * 14 / 100; }
    this.viewPortSize = {
      height: this.itemShow * this.itemSize + 'px',
      'min-heihgt': '100%'
    };
  }
}
