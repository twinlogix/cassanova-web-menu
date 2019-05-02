import {HostListener, Injectable} from '@angular/core';
import { Location } from '@angular/common';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageStatusService {

  private disabled = false;
  private dialog;

  constructor(private location: Location, private router: Router) {

    router.events.pipe(
     filter(
       (event: NavigationStart) => {
         return(event instanceof NavigationStart);
       }
     )
   ).subscribe((event: NavigationStart) => {
     if (event.restoredState && this.dialog !== undefined) { this.dialog.close(); }
   });
 }

  setDisable(disable: boolean) { this.disabled = disable; }

  isDisabled(): boolean { return this.disabled; }

  addDialog(dialog): void { this.dialog = dialog; }

  removeDialog(): void { this.dialog = undefined; }

  isCategoryPage() { return !this.location.path().endsWith('/categories'); }
}
