---
title: systemd Journal Remote Puppet Module
description: >-
    Puppet module for managing the systemd journal remote service.
summary: >-
    A Puppet module for managing the remote journal service of systemd allowing
    active and passive journal events over the network.
anchor: Puppet systemd journal remote Module
uri: puppet-systemd-journal-remote
heading: 'Puppet Module for systemd journal remote'
image:
    src: images/projects/puppet.png
    caption: Puppet logo graphic.
tags:
    - puppet
    - systemd
    - journal
    - journald
project:
    repository: https://github.com/gibbs/puppet-systemd_journal_remote
date: "2022-01-25"
jsonld:
    datePublished: "2022-01-25"
    dateCreated: "2022-01-25"
    dateModified: "2022-04-26"
    sameAs:
        - https://github.com/gibbs/puppet-systemd_journal_remote
        - https://forge.puppet.com/modules/genv/systemd_journal_remote
badges:
    - text: Build Status
      src: https://img.shields.io/github/workflow/status/gibbs/puppet-systemd_journal_remote/CI?style=flat-square
      url: https://github.com/gibbs/puppet-systemd_journal_remote/actions?query=workflow%3ACI
    - text: Release
      src: https://img.shields.io/github/workflow/status/gibbs/puppet-systemd_journal_remote/Release?label=release&style=flat-square
      url: https://github.com/gibbs/puppet-systemd_journal_remote/actions?query=workflow%3ARelease
    - text: Puppet Forge
      src: https://img.shields.io/puppetforge/v/genv/systemd_journal_remote.svg?maxAge=2592000&style=flat-square
      url: https://forge.puppet.com/genv/systemd_journal_remote
    - text: Apache-2 License
      src: https://img.shields.io/github/license/gibbs/puppet-systemd_journal_remote.svg?style=flat-square
      url: https://github.com/gibbs/puppet-systemd_journal_remote/
---

A Puppet module for managing the `systemd-journal-remote`, 
`systemd-journal-upload` and `systemd-journal-gatewayd` services on CentOS,
Debian, RedHat, Ubuntu and ArchLinux.

- [Example Usage](#goto-example-usage)
- [Default Configuration](#goto-default-configuration)
- [Changelog](#goto-change-log)
- [Reference](#goto-reference)

[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

## Example Usage

The following example listens passively for journal events over HTTPS using 
Puppet certificates.

```puppet
user { 'systemd-journal-remote':
  groups     => ['puppet'],
  membership => 'minimum',
}

class { '::systemd_journal_remote::remote':
  command_flags => {
    'listen-https' => '0.0.0.0:19532',
    'compress'     => 'yes',
    'output'       => '/var/log/journal/remote/',
  },
  options       => {
    'SplitMode'              => 'host',
    'ServerKeyFile'          => "/etc/puppetlabs/puppet/ssl/private_keys/${trusted['certname']}.pem",
    'ServerCertificateFile'  => "/etc/puppetlabs/puppet/ssl/certs/${trusted['certname']}.pem",
    'TrustedCertificateFile' => '/etc/puppetlabs/puppet/ssl/certs/ca.pem',
  }
}
```

See [data types](#goto-data-types-1) for the available options.

## Default Configuration

```yaml [g1:Common]
!!!include(puppet-systemd_journal_remote/data/common.yaml)!!!
```

```yaml [g1:ArchLinux]
!!!include(puppet-systemd_journal_remote/data/Archlinux.yaml)!!!
```

```yaml [g1:Debian]
!!!include(puppet-systemd_journal_remote/data/Debian.yaml)!!!
```

```yaml [g1:Debian 9]
!!!include(puppet-systemd_journal_remote/data/Debian-9.yaml)!!!
```

```yaml [g1:Ubuntu]
!!!include(puppet-systemd_journal_remote/data/Ubuntu.yaml)!!!
```

```yaml [g1:Ubuntu 2004]
!!!include(puppet-systemd_journal_remote/data/Ubuntu-20.04.yaml)!!!
```

```yaml [g1:CentOS 7]
!!!include(puppet-systemd_journal_remote/data/CentOS-7.yaml)!!!
```

<div class="puppet--changelog">

!!!include(puppet-systemd_journal_remote/CHANGELOG.md)!!!

</div>
<div class="puppet--reference">

!!!include(puppet-systemd_journal_remote/REFERENCE.md)!!!

</div>
