import { Component } from '@angular/core';
import {PageStatusService} from './page-status.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cassanova-web-menu';
  sp: string;
  id: string;

  constructor(private page: PageStatusService, private route: ActivatedRoute) {
    route.queryParams.subscribe(e => {
      if (e.hasOwnProperty('sp')) {
        this.sp = e.sp;
        this.id = e.hasOwnProperty('id') ? e.id : undefined;
      }
    });
  }

  private isPage(page: string): boolean { return this.page.isPage(page); }
}
