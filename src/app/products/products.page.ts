import {
  Component,
  ElementRef,
  OnDestroy,
  afterRenderEffect,
  computed,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditComponent } from '../../components/credit/credit';
import { gsap, prefersReducedMotion } from '../../core/animations/gsap';
import { PricePipe } from '../product/price.pipe';
import { Product, ProductPresentation } from '../product/product.types';
import { getVariations, presentationLabels, searchProducts } from '../product/product.utils';

@Component({
  selector: 'products-page',
  templateUrl: 'products.page.html',
  imports: [RouterLink, PricePipe, CreditComponent],
  host: {
    '(document:keydown)': 'onKey($event)',
    '(window:resize)': 'layout(true)',
  },
})
export class ProductsPage implements OnDestroy {
  // bound from the query params (?q=...&tipo=...)
  q = input<string | undefined>('');
  tipo = input<ProductPresentation | undefined>();

  private viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private track = viewChild<ElementRef<HTMLElement>>('track');
  private card = viewChild<ElementRef<HTMLElement>>('card');

  filters: { label: string; value: ProductPresentation | null }[] = [
    { label: 'Todos', value: null },
    { label: presentationLabels.capsules, value: 'capsules' },
    { label: presentationLabels.powder, value: 'powder' },
  ];

  list = computed(() => searchProducts(this.q() ?? '', this.tipo()));

  /** Starts on the second product, like the original site, and resets when the list changes */
  selected = linkedSignal(() => Math.min(1, this.list().length - 1));
  selectedProduct = computed(() => this.list().at(this.selected()));

  opened = signal<Product | null>(null);

  private renderedList?: Product[];
  private pointerX = 0;

  constructor() {
    // Move the carousel whenever the selection or the list changes
    afterRenderEffect(() => {
      const list = this.list();
      this.selected();

      const isNewList = list !== this.renderedList;
      this.renderedList = list;
      this.layout(isNewList);
      if (isNewList) this.animateItemsIn();
    });

    // Animate the info card in when it opens
    afterRenderEffect(() => {
      const card = this.card()?.nativeElement;
      if (!card || !this.opened()) return;

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('[data-card-backdrop]', { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(card, { y: 60, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5 }, '<')
        .from(card.querySelector('[data-card-image]'), { x: -40, opacity: 0, duration: 0.6 }, '-=0.25')
        .from(card.querySelectorAll('[data-card-item]'), { y: 20, opacity: 0, stagger: 0.07, duration: 0.45 }, '<');
    });
  }

  /** Centers the selected product and scales the rest down */
  layout(instant = false) {
    const viewport = this.viewport()?.nativeElement;
    const track = this.track()?.nativeElement;
    if (!viewport || !track || !track.children.length) return;

    const items = Array.from(track.children) as HTMLElement[];
    const itemWidth = items[0].offsetWidth;
    const index = this.selected();
    const x = viewport.offsetWidth / 2 - (index * itemWidth + itemWidth / 2);
    const duration = instant || prefersReducedMotion() ? 0 : 0.8;

    gsap.to(track, { x, duration, ease: 'power3.out', overwrite: true });

    items.forEach((item, i) => {
      const distance = Math.abs(i - index);
      gsap.to(item.firstElementChild, {
        scale: distance === 0 ? 1 : distance === 1 ? 0.78 : 0.62,
        opacity: distance === 0 ? 1 : distance === 1 ? 0.55 : 0.3,
        filter: distance === 0 ? 'blur(0px)' : 'blur(1.5px)',
        duration,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  }

  private animateItemsIn() {
    const track = this.track()?.nativeElement;
    if (!track || prefersReducedMotion()) return;

    gsap.from(track.children, { y: 80, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out' });
    gsap.from('[data-products-controls]', { y: 30, opacity: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' });
  }

  select(index: number, product: Product) {
    if (index === this.selected()) this.open(product);
    else this.selected.set(index);
  }

  move(step: number) {
    const next = this.selected() + step;
    if (next >= 0 && next < this.list().length) this.selected.set(next);
  }

  open(product?: Product) {
    if (product) this.opened.set(product);
  }

  close() {
    const card = this.card()?.nativeElement;
    if (!card) return;

    gsap
      .timeline({ defaults: { ease: 'power2.in' }, onComplete: () => this.opened.set(null) })
      .to(card, { y: 40, scale: 0.96, opacity: 0, duration: 0.3 })
      .to('[data-card-backdrop]', { opacity: 0, duration: 0.25 }, '<');
  }

  // Swipe support on touch devices
  onPointerDown(e: PointerEvent) {
    this.pointerX = e.clientX;
  }

  onPointerUp(e: PointerEvent) {
    const delta = e.clientX - this.pointerX;
    if (Math.abs(delta) > 50) this.move(delta < 0 ? 1 : -1);
  }

  onKey(e: KeyboardEvent) {
    if (this.opened()) {
      if (e.key === 'Escape') this.close();
      return;
    }
    if (e.key === 'ArrowRight') this.move(1);
    if (e.key === 'ArrowLeft') this.move(-1);
  }

  firstVariation(product: Product) {
    return getVariations(product)[0];
  }

  hasManyVariations(product: Product) {
    return getVariations(product).length > 1;
  }

  ngOnDestroy() {
    const track = this.track()?.nativeElement;
    if (track) gsap.killTweensOf([track, ...Array.from(track.children)]);
  }
}
