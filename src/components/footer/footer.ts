import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-accent-800 text-white">
      <div class="container flex flex-col items-center justify-between gap-8 py-10 md:flex-row">
        <a routerLink="/" aria-label="Ir al inicio">
          <img src="/logo_white.png" alt="Naturiix" class="w-40">
        </a>

        <nav class="flex flex-wrap justify-center gap-6 text-sm">
          <a routerLink="/" class="transition hover:text-accent-200">Inicio</a>
          <a routerLink="/productos" class="transition hover:text-accent-200">Productos</a>
          <a routerLink="/quienes-somos" class="transition hover:text-accent-200">Nosotros</a>
          <a routerLink="/testimonios" class="transition hover:text-accent-200">Testimonios</a>
          <a routerLink="/blog" class="transition hover:text-accent-200">Blog</a>
          <a routerLink="/contacto" class="transition hover:text-accent-200">Contacto</a>
        </nav>
      </div>

      <div class="container flex flex-col items-center gap-4 border-t border-accent-400/40 py-6">
        <div class="flex gap-4 text-3xl">
          <a href="#" aria-label="Facebook" class="transition hover:-translate-y-1 hover:text-accent-200"><i class="bx bxl-facebook-square"></i></a>
          <a href="#" aria-label="Instagram" class="transition hover:-translate-y-1 hover:text-accent-200"><i class="bx bxl-instagram"></i></a>
          <a href="#" aria-label="WhatsApp" class="transition hover:-translate-y-1 hover:text-accent-200"><i class="bx bxl-whatsapp"></i></a>
        </div>
        <p class="text-xs text-accent-200">© {{ year }} Naturiix · Plantilla de demostración</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
