import {HostListener, Injectable} from '@angular/core';
import { Location } from '@angular/common';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageStatusService {

  public CATEGORIES = 'categories';
  public SEARCH = 'search';
  public ERROR = 'error';


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

  isPage(page: string): boolean {
    const url = this.location.path().split('/');
    return url.length === 2 && url[1].startsWith(page);
  }
}
