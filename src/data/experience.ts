// src/data/experience.ts
export interface Experience {
  role: string;
  company: string;
  type?: string;          // Contract · Internship
  start: string;
  end: string;            
  duration: string;       // Durasi spesifik (misal: '2 thn 1 bln')
  location?: string;
  highlights: string[];
  skills?: string[];
}

export const experience: Experience[] = [
  {
    role: 'IT Support',
    company: 'Avenir Tour & Travel',
    type: 'Contract',
    start: 'Jul 2024',
    end: 'Jul 2026',
    duration: '2 thn 1 bln',
    location: 'West Java, Indonesia',
    highlights: [
      'Administered MikroTik RouterOS (NAT, DHCP, Firewall Filter, IP addressing, Simple Queue QoS) to keep connectivity reliable for ~24 users across a three-floor office.',
      'Redesigned the wireless network, replacing Wi-Fi extenders with a centralized MikroTik-managed setup on three ASUS access points under a single SSID for stronger, seamless coverage.',
      'Diagnosed and resolved LAN, Wi-Fi, DHCP, DNS, printer, and ISP connectivity issues to keep business operations stable.',
      'Provisioned Windows 10/11 laptops end to end — OS install, user accounts, email, printer setup, and network access.',
      'Installed and maintained IP CCTV, printers, scanners, and other office devices, with preventive maintenance and routine data backups.',
    ],
    skills: ['Computer Networking', 'Network Administration','Network Troubleshooting','TCP/IP','MikroTik RouterOS','Dynamic Host Configuration Protocol (DHCP)','Firewalls','Wireless Networking','LAN-WAN'],
  },
  {
    role: 'Video Editor',
    company: 'Avenir Tour & Travel',
    type: 'Contract',
    start: 'Nov 2022',
    end: 'Jun 2024',
    duration: '1 thn 8 bln',
    location: 'West Java, Indonesia',
    highlights: [
      'Edited promotional and short-form videos in CapCut for Instagram Reels, TikTok, and YouTube Shorts.',
      'Produced promotional, travel-journey, travel-experience, and trending content.',
      'Turned tour-leader footage into polished social content with subtitles, transitions, and music.',
      'Supported the marketing team on digital campaigns and tour-package promotions.',
    ],
    skills: ['CapCut', 'Video Editing','Video Production','Digital Marketing'],
  },
  {
    role: 'Administrative Intern',
    company: 'Avenir Tour & Travel',
    type: 'Internship',
    start: 'Aug 2022',
    end: 'Oct 2022',
    duration: '3 bln',
    location: 'Indonesia',
    highlights: [
      'Handled administrative documents and prepared official letters professionally.',
      'Performed accurate data entry supporting daily office operations.',
      'Managed office supplies and stationery inventory to keep workflows smooth.',
      'Organized and archived company documents for easy retrieval.',
    ],
    skills: ['Organization', 'Microsoft Office', 'Data Entry', 'Administration', 'Documentation'],
  },
];