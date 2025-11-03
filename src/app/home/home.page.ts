import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SwiperDirective } from '../../core/directives/swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
    selector: 'home-page',
    templateUrl: 'home.page.html',
    imports: [
        SwiperDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage implements OnInit {

    config: SwiperOptions|any = {
         slidesPerView: 4,          // show 4 items at once
        spaceBetween: 20,          // adjust spacing if needed
        loop: true,                // infinite loop
        freeMode: true,            // allow smooth free scrolling
        speed: 5000,               // higher = slower continuous scroll
        autoplay: {
            delay: 1,                // no pause, keeps moving
            disableOnInteraction: false,
        },
        freeModeMomentum: false,   // prevent snapping
    }

    config2: SwiperOptions | any = {
  slidesPerView: 4,          // show 4 items at once
  spaceBetween: 20,          // adjust spacing if needed
  loop: true,                 // infinite loop
  freeMode: true,             // allow smooth free scrolling
  speed: 5000,                // higher = slower continuous scroll
  autoplay: {
    delay: 1,                 // no pause, keeps moving
    disableOnInteraction: false,
    reverseDirection: true,   // 👈 this flips the direction
  },
  freeModeMomentum: false,    // prevent snapping
};

    products: string[] = [
        "/assets/images/product/camu_camu_small.png",
        "/assets/images/product/collagen_small.png",
        "/assets/images/product/moringa_small.png",
        "/assets/images/product/gastry_bye_small.png",
        "/assets/images/product/fem_ease_small.png",
        "/assets/images/product/vigora_vita_small.png",
    ]
    
    products2: string[] = [
        "/assets/images/product/camu_camu_powder_small.png",
        "/assets/images/product/collagen_small.png",
        "/assets/images/product/moringa_small.png",
        "/assets/images/product/gastry_bye_small.png",
        "/assets/images/product/fem_ease_small.png",
        "/assets/images/product/vigora_vita_small.png",
    ]
    constructor() { }

    ngOnInit() { }
}