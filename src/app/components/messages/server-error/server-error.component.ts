import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {

  private title = "Errore di servizio";
  private content = "Si è verificato un errore con il server, riprova fra un po'";

}
