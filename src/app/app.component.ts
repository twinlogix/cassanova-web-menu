import { Component, OnInit } from '@angular/core';
import { PageStatusService, PageType } from './services/page-status.service';
import { TokenService } from "@services/token.service"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cassanova-web-menu';
  private tokenSub : Observable<any>;
  
  constructor(private token: TokenService ){ }
  
  //TODO: remove this method, substitute with guard
  ngOnInit(): void {
    this.tokenSub = this.token.loadToken();
  }
}
