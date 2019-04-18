import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStatusService {

  private disabled = false;
  constructor() { }

  setDisable(disable: boolean) {
    this.disabled = disable;
  }

  isDisabled(): boolean {
    return this.disabled;
  }
}
