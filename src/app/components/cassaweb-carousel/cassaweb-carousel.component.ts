import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

interface Slide {
  imageUrl : string
}

//Currently it does not work as a carousel and only displays one image

@Component({
  selector: 'app-cassaweb-carousel',
  templateUrl: './cassaweb-carousel.component.html',
  styleUrls: ['./cassaweb-carousel.component.scss']
})
export class CassawebCarouselComponent implements OnInit {

  @Input()
  private slides : Slide[];

  private config: SwiperConfigInterface = {
    // a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    pagination: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
