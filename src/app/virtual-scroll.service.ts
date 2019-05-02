import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VirtualScrollService {

  private scrHeight;
  private scrWidth;
  private limitShow = 5;
  private itemShow = 4;
  private itemSize = 120;

  constructor() {
    this.getScreenSize();
    this.updateParameter();
  }

  getLimitShow(): number { return this.limitShow; }
  getItemSize(): number { return this.itemSize; }
  getViewportStyle(): any { return {
    height: this.itemShow * this.itemSize + 'px',
    'min-heihgt': '100%'
    };
  }
  checkLoad(index: number, lenght: number): boolean { return index + this.itemShow === lenght; }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrHeight, this.scrWidth);
  }

  private updateParameter() {
    this.itemShow = Math.ceil((this.scrHeight - 200) / this.itemSize);
    this.limitShow = this.itemShow + 1;
    console.log('Show ' + this.itemShow);
    console.log('Load ' + this.limitShow);
  }
}
