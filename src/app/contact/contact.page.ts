import { Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer';
import { PageHeroComponent } from '../../components/page-hero/page-hero';
import { gsap, prefersReducedMotion } from '../../core/animations/gsap';
import { CONTACT, SOCIAL_LINKS, formatPhone, mailLink, whatsappLink } from '../../core/contact';
import { RevealDirective } from '../../core/directives/reveal';

type ContactInfo = { icon: string; title: string; value: string; href?: string };
type Faq = { question: string; answer: string };

@Component({
  selector: 'contact-page',
  templateUrl: 'contact.page.html',
  imports: [ReactiveFormsModule, PageHeroComponent, FooterComponent, RevealDirective],
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private formEl = viewChild<ElementRef<HTMLElement>>('formEl');
  private success = viewChild<ElementRef<HTMLElement>>('success');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.pattern(/^[+\d\s-]{6,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  socials = SOCIAL_LINKS;

  status = signal<'idle' | 'sending' | 'sent'>('idle');
  openFaq = signal<number | null>(0);

  info: ContactInfo[] = [
    { icon: 'bxl-whatsapp', title: 'WhatsApp', value: formatPhone(), href: whatsappLink('Hola, me gustaría recibir información.') },
    { icon: 'bx-envelope', title: 'Correo', value: CONTACT.email, href: mailLink('Consulta desde la web') },
    { icon: 'bx-map', title: 'Dirección', value: 'Av. Lorem Ipsum 123, Lima' },
    { icon: 'bx-time-five', title: 'Horario', value: 'Lun - Sáb · 9:00 a 19:00' },
  ];

  faqs: Faq[] = [
    { question: '¿Hacen envíos a todo el país?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
    { question: '¿Cuáles son los métodos de pago?', answer: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.' },
    { question: '¿Los productos son 100% naturales?', answer: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.' },
    { question: '¿Puedo recibir asesoría antes de comprar?', answer: 'Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis.' },
  ];

  constructor() {
    // Pop the success message in once the form is "sent"
    afterRenderEffect(() => {
      const el = this.success()?.nativeElement;
      if (!el || prefersReducedMotion()) return;

      gsap
        .timeline({ defaults: { ease: 'back.out(1.7)' } })
        .from(el, { scale: 0.9, opacity: 0, duration: 0.5 })
        .from(el.querySelector('[data-check]'), { scale: 0, rotate: -90, duration: 0.6 }, '-=0.2');
    });
  }

  invalid(field: keyof typeof this.form.controls) {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const el = this.formEl()?.nativeElement;
      if (el && !prefersReducedMotion()) {
        gsap.fromTo(el, { x: -10 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
      return;
    }

    // Frontend only: simulate sending the message
    this.status.set('sending');
    setTimeout(() => {
      this.status.set('sent');
      this.form.reset();
    }, 1200);
  }

  reset() {
    this.status.set('idle');
  }

  toggleFaq(index: number, answer: HTMLElement) {
    const opening = this.openFaq() !== index;
    this.openFaq.set(opening ? index : null);

    if (prefersReducedMotion()) return;
    if (opening) gsap.fromTo(answer, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
  }
}
