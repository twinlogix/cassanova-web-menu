import { Component, OnInit } from '@angular/core';
import {PageStatusService} from '@services/page-status.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public page: PageStatusService) { }

  ngOnInit() {
  }

}
