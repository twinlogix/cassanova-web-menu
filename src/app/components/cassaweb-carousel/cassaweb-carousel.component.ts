import { Component, Input, OnInit } from '@angular/core';

interface Slide {
  imageUrl : string
}

//Currently it does not work as a carousel and only displays one image

@Component({
  selector: 'app-cassaweb-carousel',
  templateUrl: './cassaweb-carousel.component.html',
  styleUrls: ['./cassaweb-carousel.component.css']
})
export class CassawebCarouselComponent implements OnInit {

  @Input()
  private slides : Slide[];

  constructor() { }

  ngOnInit(): void {
  }

}
