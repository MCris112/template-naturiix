import { AfterViewInit, Directive, ElementRef, OnDestroy, input } from '@angular/core';
import { gsap, prefersReducedMotion } from '../animations/gsap';

type RevealFrom = 'up' | 'left' | 'right' | 'fade';

/**
 * Animates the element in when it scrolls into view.
 * `<div reveal>` or `<div reveal="left" [revealDelay]="0.2">`
 * `[revealStagger]` animates the direct children one after another instead.
 */
@Directive({ selector: '[reveal]' })
export class RevealDirective implements AfterViewInit, OnDestroy {
  reveal = input<RevealFrom | ''>('up');
  revealDelay = input(0);
  revealStagger = input(0);

  private tween?: gsap.core.Tween;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (prefersReducedMotion()) return;

    const el = this.element.nativeElement;
    const from = this.reveal() || 'up';
    const targets = this.revealStagger() ? Array.from(el.children) : el;

    // CSS transitions (e.g. tailwind `transition-all` on hover cards) fight GSAP over
    // opacity/transform and leave elements stuck invisible, so pause them while revealing
    gsap.set(targets, { transition: 'none' });

    this.tween = gsap.from(targets, {
      opacity: 0,
      y: from === 'up' ? 40 : 0,
      x: from === 'left' ? -50 : from === 'right' ? 50 : 0,
      duration: 0.8,
      delay: this.revealDelay(),
      stagger: this.revealStagger(),
      ease: 'power3.out',
      clearProps: 'transform,opacity,transition',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }

  ngOnDestroy(): void {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }
}
