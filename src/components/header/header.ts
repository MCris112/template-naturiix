import { AfterViewInit, Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { gsap } from '../../core/animations/gsap';
import { SOCIAL_HANDLE, SOCIAL_LINKS, whatsappLink } from '../../core/contact';
import { CreditComponent } from '../credit/credit';
import { SearchComponent } from '../search/search';

type MenuItem = {
  label: string;
  route: string;
  soon?: boolean;
};

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  imports: [RouterLink, RouterLinkActive, FormsModule, SearchComponent, CreditComponent],
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'close(); closeSearch()',
  },
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);

  private overlay = viewChild.required<ElementRef<HTMLElement>>('overlay');
  private panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  whatsapp = whatsappLink();
  socials = SOCIAL_LINKS;
  socialHandle = SOCIAL_HANDLE;

  isOpen$ = signal(false);
  isScrolled$ = signal(false);
  searchOpen$ = signal(false);
  query = signal('');

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
    .subscribe(() => {
      this.close();
      this.closeSearch(true);
    });

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

  /** First click opens the field, next ones search (or close it when empty) */
  onSearchButton() {
    if (!this.searchOpen$()) {
      this.searchOpen$.set(true);
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 150);
      return;
    }
    if (this.query().trim()) this.submitSearch();
    else this.closeSearch();
  }

  submitSearch() {
    const q = this.query().trim();
    if (!q) return;
    this.router.navigate(['/productos'], { queryParams: { q } });
  }

  closeSearch(clear = false) {
    this.searchOpen$.set(false);
    if (clear) this.query.set('');
  }

  /** Collapse when focus leaves the search and nothing was typed */
  onSearchBlur(event: FocusEvent) {
    const form = event.currentTarget as HTMLElement;
    if (!form.contains(event.relatedTarget as Node) && !this.query().trim()) this.closeSearch();
  }

  onScroll() {
    this.isScrolled$.set(window.scrollY > 40);
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
    this.timeline?.kill();
  }
}
