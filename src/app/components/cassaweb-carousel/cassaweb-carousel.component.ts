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
  private slidesPerView: number = 1;
  private autoplayDelayMs: number = 6000;

  private config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: this.slidesPerView,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    pagination: true,
    autoplay : {
      delay: this.autoplayDelayMs,
      disableOnInteraction: true
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
