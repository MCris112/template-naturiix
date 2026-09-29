import { AfterViewInit, Directive, ElementRef, OnDestroy, input } from '@angular/core';
import { gsap, prefersReducedMotion } from '../animations/gsap';

/** Counts from 0 to the given number when the element scrolls into view: `<span [countUp]="2500"></span>` */
@Directive({ selector: '[countUp]' })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  countUp = input.required<number>();

  private tween?: gsap.core.Tween;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    const el = this.element.nativeElement;
    const format = (n: number) => Math.round(n).toLocaleString('es-PE');

    if (prefersReducedMotion()) {
      el.textContent = format(this.countUp());
      return;
    }

    const counter = { value: 0 };
    el.textContent = '0';
    this.tween = gsap.to(counter, {
      value: this.countUp(),
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = format(counter.value)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  }

  ngOnDestroy() {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }
}
