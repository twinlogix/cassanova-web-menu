import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper'

interface Slide {
  imageUrl : string
}

@Component({
  selector: 'app-cassaweb-carousel',
  templateUrl: './cassaweb-carousel.component.html',
  styleUrls: ['./cassaweb-carousel.component.css']
})
export class CassawebCarouselComponent {

  @Input()
  private slides : Slide[];

  private config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    //autoHeight: true,
    //allowTouchMove: true,
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: true
    // },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // loop: true
  };

  constructor() { }

}
