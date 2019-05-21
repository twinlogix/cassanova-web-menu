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

  constructor(private page: PageStatusService, private route: ActivatedRoute) {}

  private isPage(page: string): boolean { return this.page.isPage(page); }
}
