import { Injectable } from '@angular/core';

const limitShow = 5;
const itemShow = 4;
const itemSize = 100;
const viewportStyle = {
  height: itemShow * itemSize + 'px',
  'min-height': '100%'
};
@Injectable({
  providedIn: 'root'
})
export class VirtualScrollService {

  constructor() { }

  getLimitShow(): number { return limitShow; }
  getItemSize(): number { return itemSize; }
  getViewportStyle(): any { return viewportStyle; }
  checkLoad(index: number, lenght: number): boolean { return index + itemShow === lenght; }

}
