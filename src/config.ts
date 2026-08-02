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
 * The five scroll-spy sections, each mapped to a physical interface.
 * `match` is the archive/detail route that still belongs to this section, so a
 * deep page like /blog/vlan-notes resolves to f0/3 in the header and footer.
 */
export const sections = [
  { id: 'home',     label: 'Home',     iface: 1, match: null },
  { id: 'projects', label: 'Projects', iface: 2, match: '/projects' },
  { id: 'journal',  label: 'Journal',  iface: 3, match: '/blog' },
  { id: 'about',    label: 'About',    iface: 4, match: '/about' },
  { id: 'contact',  label: 'Contact',  iface: 5, match: '/contact' },
] as const;

export type Section = (typeof sections)[number];

/* ── Interface naming ──────────────────────────────────────────────
   Isomorphic on purpose: the Astro frontmatter renders the SSR value
   and scroll-spy.ts imports the same functions to update it live.
   One definition, so the two can never drift. */

export function interfaceName(iface: number): string {
  return `FastEthernet0/${iface}`;
}

export function statusLine(iface: number): string {
  return iface === 0
    ? `${interfaceName(0)} — administratively down`
    : `${interfaceName(iface)} — up, line protocol is up`;
}

export function sectionHref(id: string): string {
  return id === 'home' ? '/' : `/#${id}`;
}

function normalize(pathname: string): string {
  const p = pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

export function getActiveSectionId(pathname: string): string {
  const path = normalize(pathname);
  if (path === '/') return 'home';
  const hit = sections.find(
    (s) => s.match !== null && (path === s.match || path.startsWith(`${s.match}/`))
  );
  return hit ? hit.id : '';
}

export function getInterfaceIndex(pathname: string): number {
  const id = getActiveSectionId(pathname);
  const hit = sections.find((s) => s.id === id);
  return hit ? hit.iface : 0;
}

export function getInterfaceLabel(pathname: string): string {
  return statusLine(getInterfaceIndex(pathname));
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
