// src/scripts/scroll-spy.ts
//
// Single source of truth for "which interface is live right now".
// Broadcasts to every registered target, so the header logo, sidebar menu,
// top nav, footer status line and the browser tab title stay in lockstep.

import { sections as sectionConfig, site, interfaceName, statusLine } from '../config';

export interface ScrollSpyOptions {
  activationRatio?: number;
  updateTitle?: boolean; // Diubah default-nya jadi false agar judul tab tetap statis
  titleBase?: string;
  titleDebounceMs?: number;
}

interface SpySection {
  el: HTMLElement;
  id: string;
  iface: number;
  label: string;
}

export type Cleanup = () => void;

export function initScrollSpy(options: ScrollSpyOptions = {}): Cleanup | undefined {
  const root = document.documentElement;
  if (root.dataset['scrollSpyReady'] === 'true') return undefined;

  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
  if (!nodes.length) return undefined;

  const activationRatio = options.activationRatio ?? 0.3;
  const updateTitle = options.updateTitle ?? false; // <-- KUNCI UTAMA: Default false agar judul tab konstan
  const titleBase = options.titleBase ?? site.author;
  const titleDebounceMs = options.titleDebounceMs ?? 180;

  const sections: SpySection[] = nodes.map((el) => {
    const meta = sectionConfig.find((s) => s.id === el.id);
    return {
      el,
      id: el.id,
      iface: Number.parseInt(el.dataset['iface'] ?? '0', 10) || 0,
      label: el.dataset['label'] ?? meta?.label ?? '',
    };
  });

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
  const initialTitle = document.title;

  let currentId = '';
  let frame = 0;
  let titleTimer = 0;

  function resolveActive(): SpySection {
    const headerH = header ? header.offsetHeight : 0;
    const line = headerH + (window.innerHeight - headerH) * activationRatio;

    if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) return last;

    let active: SpySection = first;
    for (const section of sections) {
      if (section.el.getBoundingClientRect().top <= line) active = section;
      else break;
    }
    return active;
  }

  function queueTitle(label: string): void {
    if (!updateTitle) return;
    if (titleTimer !== 0) window.clearTimeout(titleTimer);

    titleTimer = window.setTimeout(() => {
      titleTimer = 0;
      const next = label === '' ? initialTitle : `${titleBase} — ${label}`;
      if (document.title !== next) document.title = next;
    }, titleDebounceMs);
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
      el.setAttribute('data-iface', digit);
    }

    for (const link of links) {
      const isActive = link.dataset['spyLink'] === active.id;
      link.toggleAttribute('data-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }

    queueTitle(active.label);

    const desiredHash = active === first ? '' : `#${active.id}`;
    if (window.location.hash !== desiredHash) {
      const url = `${window.location.pathname}${window.location.search}${desiredHash}`;
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

  function onLinkClick(event: MouseEvent): void {
    const link = event.currentTarget as HTMLAnchorElement;
    const id = link.dataset['spyLink'];
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

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
    if (titleTimer !== 0) window.clearTimeout(titleTimer);

    document.title = initialTitle;
    delete root.dataset['scrollSpyReady'];
  };

  return cleanup;
}