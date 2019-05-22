import { Component } from '@angular/core';
import {PageStatusService} from './page-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cassanova-web-menu';

  constructor(private page: PageStatusService) { }

  private isPage(page: string): boolean { return this.page.isPage(page); }
}
