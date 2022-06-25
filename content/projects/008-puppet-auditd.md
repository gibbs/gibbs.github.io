---
title: Audit Daemon Puppet Module
description: >-
    Puppet module for managing auditd on Debian and Ubuntu
summary: >-
    A Puppet module for managing the audit daemon and auditd rules on Debian
    and Ubuntu.
anchor: Puppet auditd Module
uri: puppet-auditd
heading: Puppet Module for auditd
image:
    src: images/projects/puppet.png
    caption: Puppet logo graphic.
tags:
    - puppet
    - auditd
project:
    repository: https://github.com/gibbs/puppet-auditd
date: "2022-03-10"
jsonld:
    datePublished: "2022-03-10"
    dateCreated: "2022-03-10"
    dateModified: "2022-06-16"
    sameAs:
        - https://github.com/gibbs/puppet-auditd
        - https://forge.puppet.com/modules/genv/auditd
---

# Puppet Module for auditd

[![Build Status](https://img.shields.io/github/workflow/status/gibbs/puppet-auditd/CI?style=flat-square)](https://github.com/gibbs/puppet-auditd/actions?query=workflow%3ACI)
[![Release](https://img.shields.io/github/workflow/status/gibbs/puppet-auditd/Release?label=release&style=flat-square)](https://github.com/gibbs/puppet-auditd/actions?query=workflow%3ARelease)
[![Puppet Forge](https://img.shields.io/puppetforge/v/genv/auditd.svg?maxAge=2592000&style=flat-square)](https://forge.puppet.com/genv/auditd)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-auditd.svg?style=flat-square)](https://github.com/gibbs/puppet-auditd/blob/master/LICENSE)

A Puppet module for managing and configuring the Linux Audit Daemon `auditd` on 
Debian and RedHat family distros.

- [Example Usage](#goto-example-usage)
  - [Daemon Configuration](#goto-daemon-configuration)
  - [Rules](#goto-rules)
  - [Plugins](#goto-plugins)
  - [Dispatcher](#goto-dispatcher)
- [Default Configuration](#goto-default-configuration)
- [Changelog](#goto-change-log)
- [Reference](#goto-reference)

[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

## Example Usage

### Daemon Configuration

The `config` parameter is used to configure `auditd.conf`.

```puppet
class { 'auditd':
  config => {
    local_events => 'yes',
    write_logs   => 'yes',
    log_format   => 'RAW',
    flush         => 'INCREMENTAL_ASYNC',
    freq         => 50,
  }
}
```

By default the values shipped with the Debian and Ubuntu packages are used.

### Rules

The `auditd::rules` parameter can be used to pass a hash of rules to the 
defined type.

Alternatively, the `auditd::rule` defined type can be used in a manifest.

```puppet [g1:Class]
class { 'auditd':
  rules => {
    non_root_mounting => {
      content => '-a always,exit -F arch=b64 -S mount -F auid>=1000 -F auid!=4294967295 -k mounts',
    },
    non_root_mounting_32 => {
      content => '-a always,exit -F arch=b32 -S mount -F auid>=1000 -F auid!=4294967295 -k mounts',
    }
  }
}
```

```puppet [g1:Define]
auditd::rule { 'unauthorised_file_access':
  content => '-a always,exit -F arch=b64 -S creat -S open -S openat -S truncate -S ftruncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access',
  order   => 10,
}

auditd::rule { '-w /var/log/tallylog -p wa -k logins': }
```

```yaml [g1:Hiera]
auditd::rules:
  sudoers_changes:
    content: '-w /etc/sudoers -p wa -k scope'
  sudoersd_changes:
    content: '-w /etc/sudoers.d/ -p wa -k scope'
  file_deletions:
    content: '-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete'
  file_deletions_32:
    content: '-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete'
```

### Plugins

Plugins are managed usig the `auditd::plugin` type.

```puppet [g2:Manifest Example]
auditd::plugin { 'clickhouse':
  active    => 'yes',
  direction => 'out',
  path      => '/usr/libexec/auditd-plugin-clickhouse',
  type      => 'always',
  args      => '/etc/audit/auditd-clickhouse.conf',
  format    => 'string',
}
```

```yaml [g2:Hiera Example]
auditd:
  plugins:
    clickhouse:
      active: 'yes'
      direction: 'out'
      path: /usr/libexec/auditd-plugin-clickhouse
      args: /etc/audit/auditd-clickhouse.conf
```

### Dispatcher

In modern versions of auditd (>= 3) audisp can be configured in `/etc/audit`.
Older versions can use `auditd::audisp`.

```puppet [g3:Manifest]
class { 'auditd::audisp':
  config => {
    q_depth     => 250,
    name_format => 'hostname',
  },
}
```

```yaml [g3:Hiera]
auditd::audisp::config:
  q_depth: 250
  overflow_action: syslog
  priority_boost: 4
  max_restarts: 10
  name_format: hostname
  plugin_dir: /etc/audisp/plugins.d/
```

## Default Configuration

```yaml [g1:Common]
!!!include(puppet-auditd/data/common.yaml)!!!
```

```yaml [g1:AlmaLinux 8]
!!!include(puppet-auditd/data/AlmaLinux-8.yaml)!!!
```

```yaml [g1:CentOS 7]
!!!include(puppet-auditd/data/CentOS-7.yaml)!!!
```

```yaml [g1:Debian 10]
!!!include(puppet-auditd/data/Debian-10.yaml)!!!
```

```yaml [g1:Debian 11]
!!!include(puppet-auditd/data/Debian-11.yaml)!!!
```

```yaml [g1:RedHat 7]
!!!include(puppet-auditd/data/RedHat-7.yaml)!!!
```

```yaml [g1:RedHat 8]
!!!include(puppet-auditd/data/RedHat-8.yaml)!!!
```

```yaml [g1:Rocky 8]
!!!include(puppet-auditd/data/Rocky-8.yaml)!!!
```

```yaml [g1:Scientific 7]
!!!include(puppet-auditd/data/Scientific-7.yaml)!!!
```

```yaml [g1:Ubuntu 1804]
!!!include(puppet-auditd/data/Ubuntu-18.04.yaml)!!!
```

```yaml [g1:Ubuntu 2004]
!!!include(puppet-auditd/data/Ubuntu-20.04.yaml)!!!
```

```yaml [g1:Ubuntu 2204]
!!!include(puppet-auditd/data/Ubuntu-22.04.yaml)!!!
```

<div class="puppet--changelog">

!!!include(puppet-auditd/CHANGELOG.md)!!!

</div>
<div class="puppet--reference">

!!!include(puppet-auditd/REFERENCE.md)!!!

</div>
