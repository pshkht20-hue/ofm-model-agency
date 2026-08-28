import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Register GSAP plugins once per app lifecycle */
export function registerGsapPlugins() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  // Mobile Chrome fires resize when the address bar hides/shows mid-scroll;
  // without this flag every such resize triggers a full ScrollTrigger.refresh()
  // (whole-page forced layout) right in the middle of scrolling.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };
