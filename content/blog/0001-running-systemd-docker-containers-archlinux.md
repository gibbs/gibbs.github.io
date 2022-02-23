---
title: How to run systemd Docker containers in Arch Linux
description: >-
    Changing the systemd default hierarchy to run systemd init containers on 
    Arch Linux.
summary: >-
    Run Docker containers using the systemd init system on hosts running 
    Arch Linux.
anchor: Running systemd Docker containers in Arch Linux
uri: running-systemd-docker-containers-archlinux
heading: How to run systemd Docker containers in Arch Linux
image:
    src: images/blog/systemd-arch-docker.png
    caption: systemd docker
tags:
    - arch linux
    - docker
    - systemd
    - tips
date: "2021-12-21"
jsonld:
    headline: "How to run systemd Docker containers in Arch Linux"
    datePublished: "2021-12-21"
    dateCreated: "2021-12-21"
    dateModified: "2021-12-21"
---

Docker engine [20.10.6](https://docs.docker.com/engine/release-notes/#20106)
recently moved its cgroup v2 support out of experimental, but it does not 
support *hybrid* hierarchies. Most modern systemd packages for Linux 
distributions are compiled and shipped with the hybrid hierarchy which is a 
systemd recommended default.

You can view your host systemd environment with:

```bash
systemctl show -all | grep default-hierarchy
```

If the default hierarchy is listed as hybrid `default-hierarchy=hybrid` there
will likely be issues (regardless of read/write permissions) when running 
systemd as an init system inside a Docker container.

## Example

Running the following `litmusimage/ubuntu` container fails to start.

```bash
docker run -it --privileged --volume /sys/fs/cgroup:/sys/fs/cgroup:ro --tmpfs /tmp:exec litmusimage/ubuntu:20.04
```

Example init errors returned:

```bash
Failed to create /init.scope control group: Read-only file system
Failed to allocate manager object: Read-only file system
[!!!!!!] Failed to allocate manager object.
Exiting PID 1...
```

## Workaround

Disable the hybrid hierarchy by setting the kernel parameter 
`systemd.unified_cgroup_hierarchy=0` from your bootloader or during kernel 
compilation.

## GRUB Example

Kernel parameters can be set in GRUB 2 by appending the `GRUB_CMDLINE_LINUX` 
or `GRUB_CMDLINE_LINUX_DEFAULT` options.

```ini
# /etc/default/grub
GRUB_CMDLINE_LINUX_DEFAULT=""
GRUB_CMDLINE_LINUX="quiet systemd.unified_cgroup_hierarchy=0"
```

Regenerate the GRUB configuration with:

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```
