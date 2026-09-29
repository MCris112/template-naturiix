import { AfterViewInit, Component, ElementRef, OnDestroy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap, prefersReducedMotion } from '../../core/animations/gsap';

/** Background header shared by the inner pages (about, blog, contact...) */
@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  template: `
    <header class="relative flex min-h-[52svh] items-end overflow-hidden bg-primary-950 pt-28 pb-14">
      <div data-bg class="absolute inset-0 -top-[10%] h-[120%] bg-cover bg-center"
        [style.background-image]="'url(' + image() + ')'"></div>
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30"></div>

      <div class="relative z-2 container">
        <nav data-item class="mb-3 text-sm text-primary-200" aria-label="Ruta">
          <a routerLink="/" class="hover:text-white">Inicio</a>
          <span class="mx-1">/</span>
          <span class="text-accent-200">{{ title() }}</span>
        </nav>
        <h1 data-item class="text-5xl font-bold text-white md:text-7xl">{{ title() }}</h1>
        @if (subtitle()) {
          <p data-item class="mt-4 max-w-xl text-lg text-primary-200">{{ subtitle() }}</p>
        }
        <span data-line class="mt-6 block h-1 w-24 origin-left bg-accent"></span>
      </div>
    </header>
  `,
})
export class PageHeroComponent implements AfterViewInit, OnDestroy {
  title = input.required<string>();
  subtitle = input('');
  image = input('/assets/images/bg_products.jpg');

  private ctx?: gsap.Context;

  constructor(private element: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (prefersReducedMotion()) return;

    const el = this.element.nativeElement;
    this.ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-bg]', { scale: 1.15, duration: 1.6, ease: 'power2.out' })
        .from('[data-item]', { y: 30, opacity: 0, stagger: 0.1, duration: 0.7 }, 0.2)
        .from('[data-line]', { scaleX: 0, duration: 0.7 }, '-=0.3');

      // Slow parallax while scrolling past the header
      gsap.to('[data-bg]', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
