---
title: Building Ruby Against OpenSSL 1.1 on Arch Linux
description: >-
    How to build Ruby 2.4 on Arch Linux with RVM.
summary: >-
    Example of building Ruby >= 2.4.x against OpenSSL 1.1 in Arch Linux with 
    RVM.
anchor: Building Ruby with OpenSSL 1.1 in Arch Linux
uri: building-ruby-old-openssl-arch
heading: Build Ruby with OpenSSL 1.1 in Arch via RVM
image:
    src: images/blog/systemd-arch-docker.png
    caption: ruby arch
tags:
    - ruby
    - arch linux
    - rvm
date: "2023-05-21"
jsonld:
    headline: "How to build older Ruby versions in Arch Linux"
    datePublished: "2023-05-21"
    dateCreated: "2023-05-21"
    dateModified: "2023-05-21"
---

Example for compiling Ruby versions dependent on OpenSSL 1.1 via 
[RVM][rvm].

Ruby 2.4.x - 2.7.x require OpenSSL 1.1 which has been superseded
on most operating systems.


## Ruby >= 2.4.x (OpenSSL 1.1)

Install the OpenSSL 1.1 dependency:

```bash
pacman -Sy openssl-1.1
```

Build with RVM:

```bash
CFLAGS+=" -I/usr/include/openssl-1.1" \
LDFLAGS+=" -L/usr/lib/openssl-1.1 -lssl" \
PKG_CONFIG_PATH=/usr/lib/openssl-1.1/pkgconfig \
rvm install 2.7.7
```

[rvm]: <https://rvm.io/> "Ruby Version Manager (RVM)"
