import { Component } from '@angular/core';
import { MessageTemplateComponent } from '../message-template/message-template.component';

@Component({
  selector: 'app-auth-failed',
  templateUrl: './auth-failed.component.html',
  styleUrls: ['./auth-failed.component.css']
})
export class AuthFailedComponent extends MessageTemplateComponent {
  title = "Autenticazione fallita";
  content = "Controlla se l'indirizzo è quello fornitoti o contatta il manager"
}
