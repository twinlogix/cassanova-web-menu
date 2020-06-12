import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent{

  @Input() title: string;
  @Input() content: string;

}
