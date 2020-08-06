import { Component } from '@angular/core';
import { MessageTemplateComponent } from '../message-template/message-template.component';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent extends MessageTemplateComponent {

  title = "Errore di servizio";
  content = "Si è verificato un errore con il server, riprova fra un po'";

}
