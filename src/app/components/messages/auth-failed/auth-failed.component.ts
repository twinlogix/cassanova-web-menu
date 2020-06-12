import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-failed',
  templateUrl: './auth-failed.component.html',
  styleUrls: ['./auth-failed.component.css']
})
export class AuthFailedComponent {
  private title = "Autenticazione fallita";
  private content = "Controlla se l'indirizzo è quello fornitoti o contatta il manager"
}
