import { Component } from '@angular/core';
import { MessageTemplateComponent } from '../message-template/message-template.component';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends MessageTemplateComponent{
  title = "Pagina non trovata";
}
