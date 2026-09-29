import { Component, ElementRef, OnDestroy, afterRenderEffect, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';
import { PageHeroComponent } from '../../components/page-hero/page-hero';
import { gsap, prefersReducedMotion } from '../../core/animations/gsap';
import { RevealDirective } from '../../core/directives/reveal';
import { findProduct } from '../product/product.utils';
import { testimonials } from './testimonial.data';

@Component({
  selector: 'testimonials-page',
  templateUrl: 'testimonials.page.html',
  imports: [RouterLink, PageHeroComponent, FooterComponent, RevealDirective],
})
export class TestimonialsPage implements OnDestroy {
  private slide = viewChild<ElementRef<HTMLElement>>('slide');

  testimonials = testimonials;
  current = signal(0);
  stars = [1, 2, 3, 4, 5];

  private timer = setInterval(() => this.go(1), 6000);
  private firstRender = true;

  constructor() {
    // Crossfade the featured testimonial whenever it changes
    afterRenderEffect(() => {
      this.current();
      const slide = this.slide()?.nativeElement;
      if (!slide || prefersReducedMotion()) return;
      if (this.firstRender) {
        this.firstRender = false;
        return;
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(slide.querySelector('[data-slide-image]'), { x: -40, opacity: 0, rotate: -6 }, { x: 0, opacity: 1, rotate: 0, duration: 0.7 })
        .fromTo(slide.querySelectorAll('[data-slide-item]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 }, '<0.1');
    });
  }

  product(slug: string) {
    return findProduct(slug);
  }

  go(step: number) {
    const total = this.testimonials.length;
    this.current.update((i) => (i + step + total) % total);
  }

  pick(index: number) {
    this.current.set(index);
    this.restart();
  }

  /** Clicking manually resets the autoplay countdown */
  restart() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.go(1), 6000);
  }

  initials(name: string) {
    return name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
