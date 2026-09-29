import { AfterViewInit, Component, ElementRef, OnDestroy, viewChild, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditComponent } from '../../components/credit/credit';
import { SearchComponent } from '../../components/search/search';
import { gsap } from '../../core/animations/gsap';
import { products } from '../product/product.data';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  imports: [RouterLink, SearchComponent, CreditComponent],
})
export class HomePage implements AfterViewInit, OnDestroy {
  private hero = viewChild.required<ElementRef<HTMLElement>>('hero');
  private tracks = viewChildren<ElementRef<HTMLElement>>('track');

  // Split the catalog into the two sliding columns
  columns = [
    products.filter((_, i) => i % 2 === 0),
    products.filter((_, i) => i % 2 === 1),
  ];

  private ctx?: gsap.Context;
  private mm?: gsap.MatchMedia;
  private loops: gsap.core.Tween[] = [];

  ngAfterViewInit() {
    const hero = this.hero().nativeElement;

    this.ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-intro="tagline"]', { y: 20, opacity: 0, duration: 0.6 })
        .from('[data-intro="logo"]', { scale: 0.85, opacity: 0, filter: 'blur(8px)', duration: 0.9 }, '-=0.3')
        .from('[data-intro="item"]', { y: 24, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
        .from('[data-intro="column"]', { y: 80, opacity: 0, stagger: 0.15, duration: 1 }, 0.3);
    }, hero);

    // Infinite columns: vertical on desktop, horizontal rows on mobile.
    // Each track renders its list twice, so moving 50% loops seamlessly.
    this.mm = gsap.matchMedia();
    this.mm.add(
      {
        desktop: '(min-width: 768px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { desktop, reduce } = context.conditions!;
        if (reduce) return;

        const axis = desktop ? 'yPercent' : 'xPercent';
        this.loops = this.tracks().map((track, i) => {
          const reverse = i % 2 === 1;
          return gsap.fromTo(
            track.nativeElement,
            { [axis]: reverse ? -50 : 0 },
            { [axis]: reverse ? 0 : -50, duration: desktop ? 45 : 30, ease: 'none', repeat: -1 },
          );
        });
      },
    );
  }

  /** Smoothly slows a column down while hovering, like the original site */
  setSpeed(index: number, timeScale: number) {
    const loop = this.loops[index];
    if (loop) gsap.to(loop, { timeScale, duration: 0.6, ease: 'power2.out' });
  }

  ngOnDestroy() {
    this.ctx?.revert();
    this.mm?.revert();
  }
}
