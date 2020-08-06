import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent{

  @Input()
  protected disableNavBar : boolean;
  @Input()
  protected title: string;
  @Input()
  protected content: string;

}
