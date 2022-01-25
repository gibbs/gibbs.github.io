---
title: systemd Journal Remote Puppet Module
description: >-
    Puppet module for managing the systemd journal remote service.
summary: >-
    A Puppet module for managing the remote journal service of systemd allowing
    active and passive journal events over the network.
anchor: Puppet systemd journal remote Module
uri: puppet-systemd-journal-remote
image:
    src: assets/images/projects/puppet-systemd-journal-remote.png
    caption: Puppet systemd journal remote graphic.
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
    dateModified: "2022-01-25"
---

# Puppet Module for systemd journal remote

A Puppet module for managing the `systemd-journal-remote` service on CentOS,
Debian, RedHat, Ubuntu and ArchLinux.

[![Build Status](https://github.com/gibbs/puppet-systemd_journal_remote/workflows/CI/badge.svg)](https://github.com/gibbs/puppet-systemd_journal_remote/actions?query=workflow%3ACI)
[![Release](https://github.com/gibbs/puppet-systemd_journal_remote/workflows/Release/badge.svg)](https://github.com/gibbs/puppet-systemd_journal_remote/actions?query=workflow%3ARelease)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-systemd_journal_remote.svg)](LICENSE)

[Source available on GitHub]({{ project.repository }}){.button .button--github}

## Example Usage

The following example listens passively for journal events over HTTPS using 
Puppet certificates.

```puppet
user { 'systemd-journal-remote':
  groups     => ['puppet'],
  membership => 'minimum',
}

class { '::systemd_journal_remote':
  command_flags  => {
    'compress'     => 'yes',
    'output'       => '/var/log/journal/remote/',
    'listen-https' => sprintf('%<host>s:%<port>d', {
      'host' => '0.0.0.0',
      'port' => 19532,
    }),
  },
  options       => {
    'SplitMode'             => 'host',
    'ServerKeyFile'         => "/etc/puppetlabs/puppet/ssl/private_keys/${trusted['certname']}.pem",
    'ServerCertificateFile'  => "/etc/puppetlabs/puppet/ssl/certs/${trusted['certname']}.pem",
    'TrustedCertificateFile' => '/etc/puppetlabs/puppet/ssl/certs/ca.pem',
  }
}
```

See [data types](#goto-data-types-1) for the available options.

## Reference

### Table of Contents

### Classes

#### Public Classes

* [`systemd_journal_remote`](#systemd_journal_remote): This module manages and configures the systemd journal remote package

#### Private Classes

* `systemd_journal_remote::config`: This class configures the [Remote] section of journal-remote.conf
* `systemd_journal_remote::install`: This class installs the systemd-journal-remote package state
* `systemd_journal_remote::service`: This class manages the systemd-journal-remote service

### Data types

* [`Systemd_journal_remote::CommandFlags`](#systemd_journal_remotecommandflags): Matches systemd remote options
* [`Systemd_journal_remote::RemoteOptions`](#systemd_journal_remoteremoteoptions): Matches systemd remote options

## Classes

### `systemd_journal_remote` { #systemd_journal_remote }

This module manages and configures the systemd journal remote package

#### Parameters

The following parameters are available in the `systemd_journal_remote` class:

* [`command_path`](#command_path)
* [`command_flags`](#command_flags)
* [`manage_output`](#manage_output)
* [`manage_package`](#manage_package)
* [`manage_service`](#manage_service)
* [`package_name`](#package_name)
* [`package_ensure`](#package_ensure)
* [`service_ensure`](#service_ensure)
* [`service_name`](#service_name)
* [`options`](#options)
* [`service_enable`](#service_enable)

##### `command_path` { #command_path }

Data type: `Stdlib::Absolutepath`

The systemd-journal-remote systemd command path

Default value: `'/usr/lib/systemd/systemd-journal-remote'`

##### `command_flags` { #command_flags }

Data type: `Systemd_journal_remote::CommandFlags`

The systemd-journal-remote ExecStart command flags to use in service file

Default value: `{}`

##### `manage_output` { #manage_output }

Data type: `Boolean`

Manage the default output paths (/var/log/journal/remote/)

Default value: ``false``

##### `manage_package` { #manage_package }

Data type: `Boolean`

Manage the package installation

Default value: ``true``

##### `manage_service` { #manage_service }

Data type: `Boolean`

Manage the systemd-journal-remote service

Default value: ``true``

##### `package_name` { #package_name }

Data type: `String`

The systemd-journal-remote package name to use

Default value: `'systemd-journal-remote'`

##### `package_ensure` { #package_ensure }

Data type: `Enum['latest', 'absent', 'present']`

Ensure the systemd-journal-remote package state

Default value: `present`

##### `service_ensure` { #service_ensure }

Data type: `Stdlib::Ensure::Service`

Ensure the systemd-journal-remote state

Default value: `running`

##### `service_name` { #service_name }

Data type: `String`

The systemd-journal-remote service name

Default value: `'systemd-journal-remote'`

##### `options` { #options }

Data type: `Optional[Systemd_journal_remote::RemoteOptions]`

Config hash to configure the [Remote] options in journal-remote.conf

Default value: `{}`

##### `service_enable` { #service_enable }

Data type: `Boolean`



Default value: ``true``

## Data types

### `Systemd_journal_remote::CommandFlags` { #systemd_journal_remotecommandflags }

Matches systemd remote options

Alias of

```puppet
Struct[{
    Optional['url']          => Variant[Stdlib::HTTPUrl,Stdlib::HTTPSUrl,Systemd::JournaldSettings::Ensure],
    Optional['getter']       => Variant[String,Systemd::JournaldSettings::Ensure],
    Optional['listen-raw']   => Variant[String,Systemd::JournaldSettings::Ensure],
    Optional['listen-http']  => Variant[String,Integer[-3, -1],Systemd::JournaldSettings::Ensure],
    Optional['listen-https'] => Variant[String,Integer[-3, -1],Systemd::JournaldSettings::Ensure],
    Optional['key']          => Variant[Stdlib::Unixpath,Systemd::JournaldSettings::Ensure],
    Optional['cert']         => Variant[Stdlib::Unixpath,Systemd::JournaldSettings::Ensure],
    Optional['trust']        => Variant[Stdlib::Unixpath,Enum['all'],Systemd::JournaldSettings::Ensure],
    Optional['gnutls-log']   => Variant[String,Systemd::JournaldSettings::Ensure],
    Optional['output']       => Variant[Stdlib::Unixpath,Systemd::JournaldSettings::Ensure],
    Optional['gnutls-log']   => Variant[String,Systemd::JournaldSettings::Ensure],
    Optional['split-mode']   => Variant[Enum['none','host'],Systemd::JournaldSettings::Ensure],
    Optional['compress']     => Variant[Enum['yes','no'],Systemd::JournaldSettings::Ensure],
    Optional['seal']         => Variant[Enum['yes','no'],Systemd::JournaldSettings::Ensure],
  }]
```

### `Systemd_journal_remote::RemoteOptions` { #systemd_journal_remoteremoteoptions }

Matches systemd remote options

Alias of

```puppet
Struct[{
    Optional['Seal']                   => Variant[Enum['yes','no'],Systemd::JournaldSettings::Ensure],
    Optional['SplitMode']              => Variant[Enum['host','none'],Systemd::JournaldSettings::Ensure],
    Optional['ServerKeyFile']          => Variant[Stdlib::Absolutepath,Systemd::JournaldSettings::Ensure],
    Optional['ServerCertificateFile']  => Variant[Stdlib::Absolutepath,Systemd::JournaldSettings::Ensure],
    Optional['TrustedCertificateFile'] => Variant[Stdlib::Absolutepath,Enum['all'],Systemd::JournaldSettings::Ensure],
  }]
```

