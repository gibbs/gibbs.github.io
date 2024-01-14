---
title: Default APT sources.list
description: >-
    APT data sources.list files for current Debian and Ubuntu releases.
summary: >-
    A list of default APT data sources for Debian and Ubuntu releases.
anchor: APT Sources
uri: apt-sources
tags:
    - dns
date: "2022-06-19"
jsonld:
    datePublished: "2022-06-19"
    dateCreated: "2022-06-19"
    dateModified: "2024-01-14"
    operatingSystem: Web
    applicationCategory: DeveloperApplication
---

# APT Sources

A list of default APT data sources distributed in `sources.list` by Debian and 
Ubuntu cloud images.

## Debian

```yaml [debian:12 Bookworm]
!!!include(apt-sources/debian-bookworm.list)!!!
```

```yaml [debian:11 Bullseye]
!!!include(apt-sources/debian-bullseye.list)!!!
```

```yaml [debian:10 Buster]
!!!include(apt-sources/debian-buster.list)!!!
```

```yaml [debian:9 Stretch]
!!!include(apt-sources/debian-stretch.list)!!!
```

## Ubuntu

```apacheconf [ubuntu:2204 Jammy Jellyfish]
!!!include(apt-sources/ubuntu-jammy.list)!!!
```

```yaml [ubuntu:2004 Focal Fossa]
!!!include(apt-sources/ubuntu-focal.list)!!!
```

```yaml [ubuntu:1804 Bionic Beaver]
!!!include(apt-sources/ubuntu-bionic.list)!!!
```

```yaml [ubuntu:1604 Xenial Xerus]
!!!include(apt-sources/ubuntu-xenial.list)!!!
```

Files available at [github.com/gibbs/apt-sources][1].

[1]: https://github.com/gibbs/apt-sources/tree/master/sources
