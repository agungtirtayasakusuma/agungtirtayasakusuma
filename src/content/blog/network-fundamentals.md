---
title: "Deep Dive Network Fundamentals: OSI Model, Subnetting IPv4/IPv6, hingga Cisco IOS"
description: "Rangkuman lengkap domain Network Fundamentals CCNA 200-301: arsitektur jaringan, enkapsulasi, kalkulasi subnetting, hingga konfigurasi awal perangkat."
pubDate: 2026-07-27
tags: ["networking", "ipv4", "ipv6", "subnetting", "cisco-ios"]
---

Fondasi adalah segalanya. Sebelum masuk ke routing atau keamanan yang rumit, pemahaman matang di ranah **Network Fundamentals** adalah kunci utama seorang Network Engineer. Berdasarkan materi pelatihan di ID-Networkers, berikut rangkuman poin-poin krusial yang gua pelajari:

### Arsitektur Jaringan, OSI & TCP/IP, serta Transport Layer
Kita membedah bagaimana data dikemas melalui proses enkapsulasi dari *Application layer* turun ke *Physical layer* menggunakan model OSI atau TCP/IP. Di *Transport layer*, kita membedakan dua protokol utama:
* **TCP (Transmission Control Protocol):** Berorientasi koneksi (*connection-oriented*), menggunakan *three-way handshake*, menjamin pengiriman data tanpa ada yang hilang (*reliable*).
* **UDP (User Datagram Protocol):** Tanpa koneksi (*connectionless*), tidak ada jaminan keandalan, namun super cepat karena minim overhead (cocok untuk streaming atau VoIP).

### Pengalamatan IP & Seni Subnetting (IPv4 & IPv6)
Bagian paling menantang sekaligus seru adalah kalkulasi **IPv4 addressing dan subnetting**, membedakan IP publik dengan IP *private*, serta menentukan *network ID*, *broadcast address*, dan range host yang valid. 

Selain itu, transisi ke **IPv6** juga dipelajari secara mendalam: mulai dari pemahaman *prefix length*, jenis-jenis alamat IPv6 (*Global Unicast, Link-Local, Unique Local, Multicast*), hingga mekanisme *Neighbor Discovery*.

### Arsitektur Topologi & Konfigurasi Awal Cisco IOS
Kita juga mempelajari berbagai desain *network topology architecture* (hierarchical network design: Access, Distribution, Core). Sebagai praktik pertama, kita masuk ke CLI perangkat Cisco menggunakan kabel konsol untuk melakukan **Cisco IOS initial configuration**:
* Mengatur *hostname*, enkripsi password (`enable secret`), dan pengamanan console/vty lines.
* Membuat banner motd dan menyimpan konfigurasi (`write memory`).