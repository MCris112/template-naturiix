import { environment } from '../environments/environment';

/** Contact data shown across the site, configured in `src/environments` */
export const CONTACT = {
  phone: environment.app.phone,
  email: environment.app.email,
};

export type SocialLink = { label: string; icon: string; url: string };

/** Social profiles shown wherever the template lists social media */
export const SOCIAL_HANDLE: string = environment.app.social.handle;
export const SOCIAL_LINKS: SocialLink[] = environment.app.social.links;

/** "+51915350295" -> "+51 915 350 295" */
export function formatPhone(phone = CONTACT.phone): string {
  const digits = phone.replace(/\D/g, '');
  const local = digits.slice(-9).replace(/(\d{3})(?=\d)/g, '$1 ');
  const country = digits.slice(0, -9);
  return country ? `+${country} ${local}` : local;
}

/** WhatsApp chat with the store's number, optionally with a pre-filled message */
export function whatsappLink(text?: string): string {
  const number = CONTACT.phone.replace(/\D/g, '');
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export function mailLink(subject?: string): string {
  return `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}
