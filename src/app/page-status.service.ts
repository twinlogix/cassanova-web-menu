import {HostListener, Injectable} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageStatusService {

  public CATEGORIES = 'categories';
  public SEARCH = 'search';
  public ERROR = 'error';
  public SALESPOINT = 'salespoint';


  private disabled = false;
  private dialog;



  constructor(private location: Location, private router: Router, private route: ActivatedRoute) {

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
    const url = this.getUrl();
    let correct = true;
    switch (page) {
      case this.CATEGORIES:
        correct = (url.length === 4 && url[3].localeCompare(this.CATEGORIES) === 0);
        break;
      case this.SEARCH:
        correct = (url.length === 4 && url[3].localeCompare(this.SEARCH) === 0);
        break;
      case this.ERROR:
        correct = (url.length === 2 && url[1].localeCompare(this.ERROR) === 0);
        break;
      case this.SALESPOINT:
        correct = (url.length === 3 && url[2].localeCompare(this.SALESPOINT) === 0);
    }
    return correct;
  }

  checkCorrectSp() {
    if (this.getUrl().length < 2) { // Missing sp, redirect to 'error'
      this.goToPage(this.ERROR);
    }
  }

  getSp() {
    this.checkCorrectSp();
    return this.getUrl()[1];
  }

  getId() {
    this.checkHasId();
    return this.getUrl()[2];
  }

  goToPage(page: string) {
    switch (page) {
      case this.SALESPOINT:
        this.router.navigateByUrl(this.getSp() + '/' + this.SALESPOINT);
        break;

      case this.ERROR:
        this.router.navigateByUrl(this.ERROR);
        break;

      default :
        this.router.navigateByUrl(this.ERROR);
        break;
    }
  }

  private checkHasId() {
    if (this.getUrl().length < 3) { this.goToPage(this.SALESPOINT); }
  }

  private getUrl() {
    return this.location.path().split('/');
  }
}
