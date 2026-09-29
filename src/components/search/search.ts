import { Component, inject, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()" role="search"
      class="group flex w-full border-2 border-accent bg-white transition-shadow duration-300 focus-within:shadow-[0_0_0_4px_rgb(200_92_217/0.35)]">
      <input type="search" name="q" [(ngModel)]="query" placeholder="Buscar productos..." autocomplete="off"
        aria-label="Buscar productos"
        class="min-w-0 flex-1 bg-transparent px-3 py-2 text-accent-900 placeholder:text-accent-300 outline-none">
      <button type="submit" aria-label="Buscar"
        class="flex w-11 shrink-0 items-center justify-center bg-accent text-xl text-white transition-colors hover:bg-accent-900">
        <i class="bx bx-search-alt-2 transition-transform duration-300 group-focus-within:scale-110"></i>
      </button>
    </form>
  `,
  host: { class: 'block' },
})
export class SearchComponent {
  private router = inject(Router);

  value = input('');
  query = linkedSignal(() => this.value());

  submit() {
    const q = this.query().trim();
    this.router.navigate(['/productos'], { queryParams: q ? { q } : {} });
  }
}
