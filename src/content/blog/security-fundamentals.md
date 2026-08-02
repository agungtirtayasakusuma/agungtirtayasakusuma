---
title: "Security Fundamentals: Mengamankan Perangkat, ACL, dan Layer 2 Defense"
description: "Penerapan standar keamanan jaringan enterprise: password control, Standard & Extended ACL, DHCP Snooping, AAA, hingga WLAN WPA2."
pubDate: 2026-07-31
tags: ["security", "acl", "port-security", "wlan"]
---

Keamanan adalah aspek yang tidak bisa ditawar. Domain **Security Fundamentals** membekali kita cara membentengi infrastruktur dari ancaman internal maupun eksternal.

### Device Access Control & Access Control Lists (ACL)
Langkah awal pengamanan dimulai dari manajemen akses perangkat menggunakan *local password*. Untuk memfilter lalu lintas data, kita menerapkan **Access Control List (ACL)**:
* **Standard ACL:** Memfilter paket berdasarkan IP *Source* (sumber) saja.
* **Extended ACL:** Memfilter secara spesifik berdasarkan IP sumber, IP tujuan, protokol (TCP/UDP), hingga port layanan tertentu.

### Layer 2 Security & AAA Concepts
Menangkis ancaman dari dalam jaringan lokal dengan fitur **Port Security** dan **DHCP Snooping** untuk mencegah serangan server DHCP palsu (*rogue DHCP*). Kita juga membandingkan konsep kerangka kerja keamanan **AAA (Authentication, Authorization, and Accounting)** serta mengonfigurasi **WLAN via GUI menggunakan WPA2 PSK**.