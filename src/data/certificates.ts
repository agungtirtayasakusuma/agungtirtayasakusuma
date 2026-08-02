// src/data/certificates.ts
export interface Certificate {
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  url?: string;           // Link "Show credential"
  skills?: string[];
}

export const certificates: Certificate[] = [
  {
    name: 'CCNA 200-301 Enterprise',
    issuer: 'ID-Networkers (IDN.ID)',
    issued: 'Jul 2026',
    credentialId: 'CERT0686523406',
    url: '', // Isi link kalau ada
    skills: ['Cisco Networking', 'Computer Networking','Routing','LAN Switching','TCP/IP','VLAN','IPv4','IPv6','Static Routing','Open Shortest Path First (OSPF)','Network Address Translation (NAT)','Dynamic Host Configuration Protocol (DHCP)','Domain Name System (DNS)','Secure Shell (SSH)','Cisco Access Control List','Spanning Tree Protocol','Etherchannel','Port Security','Network Automation'],
  },
  {
    name: 'CCNA Foundations – Networking Basics and Cisco IOS Essentials',
    issuer: 'Packt',
    issued: 'Oct 2025',
    credentialId: 'JIJJU7HUBMZG',
    url: 'https://www.coursera.org/account/accomplishments/verify/JIJJU7HUBMZG', // Contoh link Coursera / verifikasi
    skills: ['Command-Line Interface', 'Network Routing','Networking Hardware','Network Troubleshooting','Network Planning And Design','Computer Networking','Configuration Management','OSI Models','Network Administration','General Networking','Network Architecture','TCP/IP'],
  },
  {
    name: 'Dasar-Dasar Dukungan Teknis',
    issuer: 'Google',
    issued: 'Sep 2025',
    credentialId: '6A672EOOQWNI',
    url: 'https://www.coursera.org/account/accomplishments/verify/6A672EOOQWNI', // Contoh link Google/Coursera
    skills: ['Microsoft Windows', 'Linux','Technical Communication','Hardware Troubleshooting','Customer Support','Software Installation','Computer Networking','Technical Support','System Software','Computer Hardware','Technical Documentation','Computer Literacy'],
  },
];