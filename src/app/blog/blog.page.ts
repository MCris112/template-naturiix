import { Component, ElementRef, afterRenderEffect, computed, input, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';
import { PageHeroComponent } from '../../components/page-hero/page-hero';
import { gsap, prefersReducedMotion } from '../../core/animations/gsap';
import { whatsappLink } from '../../core/contact';
import { RevealDirective } from '../../core/directives/reveal';
import { findProduct } from '../product/product.utils';
import { BlogCategory, BlogPost, blogPosts } from './blog.data';

@Component({
  selector: 'blog-page',
  templateUrl: 'blog.page.html',
  imports: [RouterLink, FormsModule, PageHeroComponent, FooterComponent, RevealDirective],
})
export class BlogPage {
  // bound from the query params (?categoria=...&etiqueta=...)
  categoria = input<BlogCategory | undefined>();
  etiqueta = input<string | undefined>();

  private list = viewChild<ElementRef<HTMLElement>>('list');

  categories = [...new Set(blogPosts.map((p) => p.category))];
  tags = [...new Set(blogPosts.flatMap((p) => p.tags))].sort();

  posts = computed(() =>
    blogPosts.filter(
      (p) =>
        (!this.categoria() || p.category === this.categoria()) &&
        (!this.etiqueta() || p.tags.includes(this.etiqueta()!)),
    ),
  );

  covers: Record<BlogPost['cover'], string> = {
    green: 'from-primary-600 to-primary-900',
    purple: 'from-accent-600 to-accent-950',
    amber: 'from-amber-500 to-orange-800',
    teal: 'from-teal-500 to-cyan-900',
  };

  email = signal('');
  subscribed = signal(false);

  private initialPosts = this.posts();

  constructor() {
    // Re-animate the list when a filter changes (the first render uses the reveal directive)
    afterRenderEffect(() => {
      const posts = this.posts();
      const list = this.list()?.nativeElement;
      if (!list || posts === this.initialPosts || prefersReducedMotion()) return;

      gsap.fromTo(list.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' });
    });
  }

  product(slug: string) {
    return findProduct(slug);
  }

  orderLink(post: BlogPost) {
    return whatsappLink(`Hola, deseo comprar ${this.product(post.productSlug)?.name} que vi en su blog.`);
  }

  shareLink(network: 'facebook' | 'whatsapp' | 'mail', post: BlogPost) {
    const url = encodeURIComponent(`${location.origin}/productos/${post.productSlug}`);
    const title = encodeURIComponent(post.title);

    if (network === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (network === 'whatsapp') return `https://wa.me/?text=${title}%20${url}`;
    return `mailto:?subject=${title}&body=${url}`;
  }

  subscribe() {
    if (!this.email().includes('@')) return;
    this.subscribed.set(true);
    this.email.set('');
  }
}
