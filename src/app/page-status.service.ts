import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PageStatusService {

  private disabled = false;
  constructor(private location: Location) { }

  setDisable(disable: boolean) { this.disabled = disable; }

  isDisabled(): boolean { return this.disabled; }

  isCategoryPage() { return !this.location.path().endsWith('/categories'); }
}
