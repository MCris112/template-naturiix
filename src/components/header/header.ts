import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { gsap } from '../../core/animations/gsap';
import { SearchComponent } from '../search/search';

type MenuItem = {
  label: string;
  route: string;
  soon?: boolean;
};

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  imports: [RouterLink, RouterLinkActive, SearchComponent],
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'close()',
  },
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);

  private overlay = viewChild.required<ElementRef<HTMLElement>>('overlay');
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  isOpen$ = signal(false);
  isScrolled$ = signal(false);

  private url$ = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split('?')[0]),
    ),
    { initialValue: this.router.url },
  );

  isHome = () => this.url$() === '/';

  menu: MenuItem[] = [
    { label: 'Inicio', route: '/' },
    { label: 'Nuestros productos', route: '/productos' },
    { label: '¿Quiénes somos?', route: '/quienes-somos' },
    { label: 'Testimonios', route: '/testimonios' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contacto', route: '/contacto' },
  ];

  private timeline?: gsap.core.Timeline;
  private navSub = this.router.events
    .pipe(filter((e) => e instanceof NavigationEnd))
    .subscribe(() => this.close());

  ngAfterViewInit() {
    const panel = this.panel().nativeElement;

    this.timeline = gsap
      .timeline({ paused: true, defaults: { ease: 'power3.out' } })
      .fromTo(this.overlay().nativeElement, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
      .fromTo(panel, { xPercent: 100, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.5 }, '<')
      .from(panel.querySelectorAll('[data-menu-item]'), { x: 40, opacity: 0, stagger: 0.06, duration: 0.4 }, '-=0.25');

    this.onScroll();
  }

  open() {
    this.isOpen$.set(true);
    document.body.style.overflow = 'hidden';
    this.timeline?.timeScale(1).play();
  }

  close() {
    if (!this.isOpen$()) return;
    this.isOpen$.set(false);
    document.body.style.overflow = '';
    this.timeline?.timeScale(1.6).reverse();
  }

  onScroll() {
    this.isScrolled$.set(window.scrollY > 40);
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
    this.timeline?.kill();
  }
}
