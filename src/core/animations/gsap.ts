import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

export { gsap, ScrollTrigger };
