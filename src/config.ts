// src/config.ts
export const site = {
  title: 'Portofolio',
  author: 'Agung Tirtayasa Kusuma',
  role: 'Network Engineer',
  tagline: 'Learning by building. Improving one network at a time.',
  cv: '/cv.pdf',
  description:
    'Cisco labs, networking projects, and technical documentation focused on routing, switching, network services, and network security',
};

/**
 * Each route owns an interface index, like ports on a router chassis.
 * f0/0 is intentionally reserved as the "unassigned" port (404 / unknown routes).
 * Add a route here and the logo, nav and status line all update together.
 */
export const navLinks = [
  { label: 'Home',     href: '/',         iface: 1 },
  { label: 'Projects', href: '/projects', iface: 2 },
  { label: 'Journal',  href: '/blog',     iface: 3 },
  { label: 'About',    href: '/about',    iface: 4 },
  { label: 'Contact',  href: '/contact',  iface: 5 },
] as const;

export type NavLink = (typeof navLinks)[number];

/** Strip trailing slashes so `/projects/` and `/projects` behave identically. */
function normalize(pathname: string): string {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** True when `href` is the section the current pathname belongs to. */
export function isActivePath(pathname: string, href: string): boolean {
  const path = normalize(pathname);
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

/**
 * Resolve the interface index for the current route.
 * Nested routes inherit their section: /blog/vlan-notes -> 3.
 * Longest href wins, so future nested sections resolve correctly.
 */
export function getInterfaceIndex(pathname: string): number {
  const match = [...navLinks]
    .sort((a, b) => b.href.length - a.href.length)
    .find((link) => isActivePath(pathname, link.href));
  return match?.iface ?? 0;
}

/** Human label for tooltips / aria, in IOS syntax. */
export function getInterfaceLabel(pathname: string): string {
  const i = getInterfaceIndex(pathname);
  return i === 0
    ? 'FastEthernet0/0 — administratively down'
    : `FastEthernet0/${i} — up, line protocol is up`;
}

export const socials = [
  { label: 'GitHub',    href: 'https://github.com/agungtirtayasakusuma' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/agungtirtayasakusuma' },
  { label: 'Instagram', href: 'https://www.instagram.com/visualoftirtayasa' },
  { label: 'X',         href: 'https://x.com/0xargovesta' },
];

export const contact = {
  email: 'agungtirtayasakusumaa@gmail.com',
  location: 'Bekasi, West Java, Indonesia',
  web3formsKey: '70f98aa4-7396-4eb6-8712-7308d20a0970',
};
