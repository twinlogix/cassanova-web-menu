import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

interface Slide {
  imageUrl : string
}

@Component({
  selector: 'app-cassaweb-carousel',
  templateUrl: './cassaweb-carousel.component.html',
  styleUrls: ['./cassaweb-carousel.component.scss']
})
export class CassawebCarouselComponent {

  @Input()
  public slides : Slide[];
  private slidesPerView: number = 1;
  private autoplayDelayMs: number = 8000;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: this.slidesPerView,
    keyboard: true,
    mousewheel: false,
    navigation: true,
    spaceBetween: 0,
    
    pagination : {
      el: '.swiper-pagination',
      clickable: true,
      hideOnClick: false,
    },
    autoplay : {
      delay: this.autoplayDelayMs,
      disableOnInteraction: true
    }
  }

  constructor() { }

}
