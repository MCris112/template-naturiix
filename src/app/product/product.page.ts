import {
  Component,
  ElementRef,
  OnDestroy,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';
import { ScrollTrigger, gsap, prefersReducedMotion } from '../../core/animations/gsap';
import { RevealDirective } from '../../core/directives/reveal';
import { PricePipe } from './price.pipe';
import { ProductVariation } from './product.types';
import { findProduct, getVariations, presentationLabels, similarProducts } from './product.utils';

type Section = { id: string; title: string };

@Component({
  selector: 'product-page',
  templateUrl: 'product.page.html',
  imports: [RouterLink, PricePipe, RevealDirective, FooterComponent],
})
export class ProductPage implements OnDestroy {
  private router = inject(Router);

  // bound from the route: /productos/:slug
  slug = input.required<string>();

  private hero = viewChild<ElementRef<HTMLElement>>('hero');
  private image = viewChild<ElementRef<HTMLElement>>('image');
  private price = viewChild<ElementRef<HTMLElement>>('price');

  product = computed(() => findProduct(this.slug()));
  variations = computed(() => {
    const product = this.product();
    return product ? getVariations(product) : [];
  });
  variation = linkedSignal<ProductVariation | undefined>(() => this.variations()[0]);
  similar = computed(() => {
    const product = this.product();
    return product ? similarProducts(product) : [];
  });

  labels = presentationLabels;

  sections: Section[] = [
    { id: 'que-es', title: '¿Qué es?' },
    { id: 'contenido', title: 'Contenido' },
    { id: 'para-que-sirve', title: '¿Para qué sirve?' },
    { id: 'tener-en-cuenta', title: 'Tener en cuenta' },
    { id: 'presentacion', title: 'Presentación' },
  ];
  activeSection = signal(this.sections[0].id);

  orderLink = computed(() => {
    const product = this.product();
    const variation = this.variation();
    if (!product || !variation) return '#';

    const text = `Hola, deseo comprar ${product.name} (${this.labels[variation.attributes.presentation]} - ${variation.attributes.size}) que vi en su sitio web.`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  });

  shared = signal(false);

  private ctx?: gsap.Context;
  private spies: ScrollTrigger[] = [];
  private animatedVariation?: ProductVariation;

  constructor() {
    effect(() => {
      if (!this.product()) this.router.navigate(['/productos']);
    });

    // Intro + scroll effects every time a (new) product is shown
    afterRenderEffect(() => {
      const hero = this.hero()?.nativeElement;
      this.product();
      if (!hero) return;

      untracked(() => this.setupAnimations(hero));
    });

    // Small swap animation when switching between variations
    afterRenderEffect(() => {
      const variation = this.variation();
      if (!this.animatedVariation || this.animatedVariation === variation || prefersReducedMotion()) {
        this.animatedVariation = variation;
        return;
      }
      this.animatedVariation = variation;

      gsap.fromTo(this.image()!.nativeElement, { opacity: 0, scale: 0.9, rotate: -4 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.6)' });
      gsap.fromTo(this.price()!.nativeElement, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' });
    });
  }

  private setupAnimations(hero: HTMLElement) {
    this.ctx?.revert();
    this.spies.forEach((s) => s.kill());
    this.animatedVariation = this.variation();

    this.ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero="card"]', { y: 80, opacity: 0, duration: 0.8 })
          .from('[data-hero="image"]', { x: -60, opacity: 0, rotate: -6, duration: 0.9 }, '-=0.5')
          .from('[data-hero="item"]', { y: 24, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.6');

        // Gentle parallax on the product while scrolling past the hero
        gsap.to('[data-hero="image"]', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, hero);

    // Highlight the side menu entry of the section being read
    this.spies = this.sections.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => self.isActive && this.activeSection.set(id),
      }),
    );
    ScrollTrigger.refresh();
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  async share() {
    const url = window.location.href;
    const title = this.product()?.name;

    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }

    await navigator.clipboard?.writeText(url);
    this.shared.set(true);
    setTimeout(() => this.shared.set(false), 2000);
  }

  ngOnDestroy() {
    this.ctx?.revert();
    this.spies.forEach((s) => s.kill());
  }
}
