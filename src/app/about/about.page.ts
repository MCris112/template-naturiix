import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';
import { PageHeroComponent } from '../../components/page-hero/page-hero';
import { CountUpDirective } from '../../core/directives/count-up';
import { RevealDirective } from '../../core/directives/reveal';

type Service = { icon: string; title: string; text: string };
type Stat = { value: number; suffix: string; label: string };

@Component({
  selector: 'about-page',
  templateUrl: 'about.page.html',
  imports: [RouterLink, PageHeroComponent, FooterComponent, RevealDirective, CountUpDirective],
})
export class AboutPage {
  stats: Stat[] = [
    { value: 12, suffix: '+', label: 'Productos naturales' },
    { value: 2500, suffix: '+', label: 'Clientes felices' },
    { value: 5, suffix: '', label: 'Años de experiencia' },
    { value: 24, suffix: 'h', label: 'Envíos a todo el país' },
  ];

  services: Service[] = [
    { icon: 'bx-pulse', title: 'Chequeo preventivo', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.' },
    { icon: 'bx-file', title: 'Lectura de resultados', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    { icon: 'bx-conversation', title: 'Asesoría de salud', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
    { icon: 'bx-leaf', title: 'Recomendación natural', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.' },
    { icon: 'bx-id-card', title: 'Afiliación gratuita', text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.' },
    { icon: 'bx-package', title: 'Delivery nacional', text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.' },
  ];
}
