---
title: Ansible Update MOTD Role
description: >-
    An Ansible role to manage the dynamic MOTD scripts in Ubuntu and Debian
    distributions.
summary: >-
    An Ansible role to manage the dynamic MOTD scripts in Ubuntu and Debian
    distributions.
anchor: Ansible Update MOTD Role
uri: ansible-update-motd-role
image:
    src: images/projects/ansible.png
    caption: Ansible logo banner.
tags:
    - ansible
    - linux
project:
    repository: https://github.com/gibbs/ansible-role-update-motd
date: "2021-07-13"
jsonld:
    datePublished: "2021-07-13"
    dateCreated: "2021-07-13"
    dateModified: "2022-03-04"
    sameAs:
        - https://github.com/gibbs/ansible-role-update-motd
        - https://galaxy.ansible.com/gibbs/update_motd
---

# Ansible Update MOTD Role

![Build](https://github.com/gibbs/ansible-role-update-motd/actions/workflows/test.yml/badge.svg)
[![Ansible Role](https://img.shields.io/badge/Ansible%20Role-gibbs.update__motd-blue.svg)](https://galaxy.ansible.com/gibbs/update_motd)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

An Ansible role for managing the dynamic MOTD scripts on Debian 9, 10, 11 
and Ubuntu 14.04, 16.04, 18.04 and 20.04.

[Source available on GitHub]({{ project.repository }}){.button .button--github}

## Example Usage

The following example disables MOTD scripts by removing their execute bit.

```yaml
- hosts: all
  roles:
    - gibbs.update_motd
  vars:
    update_motd_disable_scripts:
      - 88-esm-announce
      - 91-release-upgrade
      - 91-contract-ua-esm-status
```

## Default Variables

```yaml
# When true the /etc/motd will be removed if it exists
update_motd_remove_motd_directory: false

# Manage the MOTD package and service (Ubuntu only)
update_motd_package_name: "update-motd"
update_motd_package_state: present
update_motd_service_state: start
update_motd_service_enabled: true

# The Ubuntu Landscape package state (Ubuntu only)
update_motd_landscape_state: present

# Disable the "motd" service if it exists
update_motd_disable_motd_service: true

# An array of scripts in /etc/update-motd.d/ to disable
update_motd_disable_scripts:
  - 98-cloudguest
```

## MOTD scripts

A list of dynamic MOTD scripts usually shipped with Debian and Ubuntu:

<table>
<thead>
<tr>
<th scope="col">Filename</th>
<th scope="col">Releases</th>
</tr>
</thead>
<tbody>
<tr>
<td><mark>00-header</mark></td>
<td>Ubuntu 14, 16, 18, 20</td>
</tr>
<tr>
<td><mark>10-help-text</mark></td>
<td>Ubuntu 14, 16, 18, 20</td>
</tr>
<tr>
<td><mark>10-uname</mark></td>
<td>Debian 9, 10, 11</td>
</tr>
<tr>
<td><mark>50-landscape-sysinfo</mark></td>
<td>Ubuntu 14, 18, 20</td>
</tr>
<tr>
<td><mark>50-motd-news</mark></td>
<td>Ubuntu 16, 18, 20</td>
</tr>
<tr>
<td><mark>85-fwupd</mark></td>
<td>Ubuntu 20</td>
</tr>
<tr>
<td><mark>88-esm-announce</mark></td>
<td>Ubuntu 16, 18, 20</td>
</tr>
<tr>
<td><mark>90-updates-available</mark></td>
<td>Ubuntu 14, 16, 18</td>
</tr>
<tr>
<td><mark>91-contract-ua-esm-status</mark></td>
<td>Ubuntu 16, 18, 20</td>
</tr>
<tr>
<td><mark>91-release-upgrade</mark></td>
<td>Ubuntu 14, 16, 18, 20</td>
</tr>
<tr>
<td><mark>92-unattended-upgrades</mark></td>
<td>Ubuntu 16, 18, 20</td>
</tr>
<tr>
<td><mark>95-hwe-eol</mark></td>
<td>Ubuntu 14, 18, 20</td>
</tr>
<tr>
<td><mark>97-overlayroot</mark></td>
<td>Ubuntu 14, 16, 18, 20</td>
</tr>
<tr>
<td><mark>98-cloudguest</mark></td>
<td>Ubuntu 14</td>
</tr>
<tr>
<td><mark>98-fsck-at-reboot</mark></td>
<td>Ubuntu 14, 16, 18, 20</td>
</tr>
<tr>
<td><mark>98-reboot-required</mark></td>
<td>Ubuntu 14, 16, 18, 20</td>
</tr>
</tbody>
</table>
