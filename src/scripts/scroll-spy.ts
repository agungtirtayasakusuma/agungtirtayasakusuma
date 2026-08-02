// src/scripts/scroll-spy.ts
//
// Single source of truth for "which interface is live right now".
// Broadcasts to every registered target, so the header logo, the sidebar
// menu, the top nav and the footer status line all stay in lockstep.
//
// Target hooks (any number of each, anywhere in the document):
//   [data-iface-digit]   -> "3"
//   [data-iface-name]    -> "FastEthernet0/3"
//   [data-iface-status]  -> "FastEthernet0/3 — up, line protocol is up"
//   [data-spy-link]      -> gets [data-active] + aria-current
//
// Fully typed. Passes `astro check` under astro/tsconfigs/strictest.

import { interfaceName, statusLine } from '../config';

export interface ScrollSpyOptions {
  /**
   * Where the activation line sits within the visible area below the header,
   * as a fraction. 0.3 ≈ "active once the section reaches 30% down".
   */
  activationRatio?: number;
}

interface SpySection {
  el: HTMLElement;
  id: string;
  iface: number;
}

export type Cleanup = () => void;

export function initScrollSpy(options: ScrollSpyOptions = {}): Cleanup | undefined {
  const activationRatio = options.activationRatio ?? 0.3;

  const root = document.documentElement;
  if (root.dataset['scrollSpyReady'] === 'true') return undefined;

  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  const sections: SpySection[] = nodes.map((el) => ({
    el,
    id: el.id,
    iface: Number.parseInt(el.dataset['iface'] ?? '0', 10) || 0,
  }));

  const first = sections[0];
  const last = sections[sections.length - 1];
  if (!first || !last) return undefined;

  root.dataset['scrollSpyReady'] = 'true';

  const digitTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-iface-digit]'));
  const nameTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-iface-name]'));
  const statusTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-iface-status]'));
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-spy-link]'));
  const header = document.querySelector<HTMLElement>('#site-header');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let currentId = '';
  let frame = 0;

  /**
   * Which section owns the activation line.
   *
   * Geometric rather than "highest intersectionRatio": a section taller than
   * the viewport can never reach a 30% ratio, so a pure threshold test would
   * skip it. The observer below decides *when* to recompute, never *what* wins.
   */
  function resolveActive(): SpySection {
    const headerH = header ? header.offsetHeight : 0;
    const line = headerH + (window.innerHeight - headerH) * activationRatio;

    if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) return last;

    let active: SpySection = first;
    for (const section of sections) {
      if (section.el.getBoundingClientRect().top <= line) active = section;
      else break; // DOM order — the first miss ends the scan
    }
    return active;
  }

  function apply(): void {
    const active = resolveActive();
    if (active.id === currentId) return;
    currentId = active.id;

    const digit = String(active.iface);
    const name = interfaceName(active.iface);
    const status = statusLine(active.iface);

    for (const el of digitTargets) el.textContent = digit;
    for (const el of nameTargets) el.textContent = name;
    for (const el of statusTargets) {
      el.textContent = status;
      // Lets the footer LED / tooltip react without extra bookkeeping.
      el.setAttribute('data-iface', digit);
    }

    for (const link of links) {
      const isActive = link.dataset['spyLink'] === active.id;
      link.toggleAttribute('data-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }

    const desiredHash = active === first ? '' : `#${active.id}`;
    if (window.location.hash !== desiredHash) {
      const url = `${window.location.pathname}${window.location.search}${desiredHash}`;
      // replaceState — pushState would stack one entry per section and make
      // the back button useless.
      window.history.replaceState(window.history.state, '', url);
    }
  }

  function schedule(): void {
    if (frame !== 0) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      apply();
    });
  }

  const observer = new IntersectionObserver(schedule, {
    threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
  });
  for (const section of sections) observer.observe(section.el);

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });

  // Menu clicks handled here so behaviour is identical with or without
  // <ClientRouter />, and so focus follows for keyboard users.
  function onLinkClick(event: MouseEvent): void {
    const link = event.currentTarget as HTMLAnchorElement;
    const id = link.dataset['spyLink'];
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return; // deep page — let the browser follow the href

    event.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion.matches ? 'auto' : 'smooth',
      block: 'start',
    });

    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  for (const link of links) link.addEventListener('click', onLinkClick);

  apply();

  const cleanup: Cleanup = () => {
    observer.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    for (const link of links) link.removeEventListener('click', onLinkClick);
    if (frame !== 0) window.cancelAnimationFrame(frame);
    delete root.dataset['scrollSpyReady'];
  };

  return cleanup;
}
