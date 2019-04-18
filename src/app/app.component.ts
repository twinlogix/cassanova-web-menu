import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {PageStatusService} from './page-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cassanova-web-menu';

  constructor(
    private location: Location,
    private page: PageStatusService
  ) {}

  checkPosition() { return !this.location.path().endsWith('/categories'); }
}
