import { Component } from '@angular/core';
import { NavigationDetectionService } from '@services/navigation-detection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public navigationDet : NavigationDetectionService) {}

  title = 'cassanova-web-menu';
}
