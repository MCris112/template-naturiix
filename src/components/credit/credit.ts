import { Component, computed, input } from '@angular/core';
import { AUTHOR, CreditPlacement, authorUrl } from '../../core/credits';

/** "Diseño y desarrollo por Darkredgm" link, tracked per placement */
@Component({
  selector: 'app-credit',
  template: `
    <a [href]="url()" target="_blank" rel="noopener" title="Visitar {{ author.name }}"
      class="group inline-flex items-center gap-1.5 text-xs transition-colors"
      [class]="tone() === 'light' ? 'text-white/70 hover:text-white' : 'text-neutral-500 hover:text-accent'">
      Diseño y desarrollo por
      <strong class="font-bold underline decoration-accent-400 decoration-2 underline-offset-4 transition-all group-hover:decoration-accent-200">
        {{ author.name }}
      </strong>
      <i class="bx bx-link-external transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
    </a>
  `,
})
export class CreditComponent {
  placement = input.required<CreditPlacement>();
  tone = input<'light' | 'dark'>('light');

  author = AUTHOR;
  url = computed(() => authorUrl(this.placement()));
}
