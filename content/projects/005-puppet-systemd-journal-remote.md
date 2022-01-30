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
    sameAs:
        - https://github.com/gibbs/puppet-systemd_journal_remote
        - https://forge.puppet.com/modules/genv/systemd_journal_remote
---

# Puppet Module for systemd journal remote

A Puppet module for managing the `systemd-journal-remote`, 
`systemd-journal-upload` and `systemd-journal-gatewayd` services on CentOS,
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

## Reference

### Classes

#### Public Classes

* [`systemd_journal_remote`](#systemd_journal_remote): This module manages and configures the systemd journal remote package
* [`systemd_journal_remote::gatewayd`](#systemd_journal_remotegatewayd): This class manages and configures the `systemd-journal-gatewayd` service
* [`systemd_journal_remote::remote`](#systemd_journal_remoteremote): This module manages and configures the systemd journal remote package
* [`systemd_journal_remote::upload`](#systemd_journal_remoteupload): This class manages and configures the systemd journal upload service

#### Private Classes

* `systemd_journal_remote::gatewayd::config`: This class configures the systemd-journal-gatewayd unit override
* `systemd_journal_remote::gatewayd::service`: This class manages the systemd-journal-gatewayd service
* `systemd_journal_remote::remote::config`: This class configures the [Remote] section of journal-remote.conf
* `systemd_journal_remote::remote::service`: This class manages the systemd-journal-remote service
* `systemd_journal_remote::upload::config`: This class configures the [Upload] section of journal-upload.conf
* `systemd_journal_remote::upload::service`: This class manages the systemd-journal-upload service

### Data types

* [`Systemd_Journal_Remote::Gatewayd_Flags`](#systemd_journal_remotegatewayd_flags): Matches systemd gatewayd options in `man systemd-journal-gatewayd`
* [`Systemd_Journal_Remote::Remote_Flags`](#systemd_journal_remoteremote_flags): Matches systemd remote options in `man systemd-journal-remote`
* [`Systemd_Journal_Remote::Remote_Options`](#systemd_journal_remoteremote_options): Matches systemd remote options in `man journal-remote.conf`
* [`Systemd_Journal_Remote::Upload_Flags`](#systemd_journal_remoteupload_flags): Matches systemd upload options in `man systemd-journal-upload`
* [`Systemd_Journal_Remote::Upload_Options`](#systemd_journal_remoteupload_options): Matches systemd upload options in `man journal-upload.conf`

## Classes

### `systemd_journal_remote` { #systemd_journal_remote }

This module manages and configures the systemd journal remote package

#### Parameters

The following parameters are available in the `systemd_journal_remote` class:

* [`manage_package`](#manage_package)
* [`package_name`](#package_name)
* [`package_ensure`](#package_ensure)

##### `manage_package` { #manage_package }

Data type: `Boolean`

Manage the `systemd-journal-remote` package installation

Default value: ``true``

##### `package_name` { #package_name }

Data type: `String`

The `systemd-journal-remote` package name to use

Default value: `'systemd-journal-remote'`

##### `package_ensure` { #package_ensure }

Data type: `Enum['latest', 'absent', 'present']`

The `systemd-journal-remote` package state

Default value: `present`

### `systemd_journal_remote::gatewayd` { #systemd_journal_remotegatewayd }

This class manages and configures the `systemd-journal-gatewayd` service

#### Parameters

The following parameters are available in the `systemd_journal_remote::gatewayd` class:

* [`command_path`](#gatewayd_command_path)
* [`command_flags`](#gatewayd_command_flags)
* [`manage_service`](#gatewayd_manage_service)
* [`service_enable`](#gatewayd_service_enable)
* [`service_name`](#gatewayd_service_name)
* [`service_ensure`](#gatewayd_service_ensure)

##### `command_path` { #gatewayd_command_path }

Data type: `Stdlib::Absolutepath`

The service ExecStart command path

Default value: `'/usr/lib/systemd/systemd-journal-gatewayd'`

##### `command_flags` { #gatewayd_command_flags }

Data type: `Systemd_Journal_Remote::Gatewayd_Flags`

The service ExecStart command flags to use

Default value: `{}`

##### `manage_service` { #gatewayd_manage_service }

Data type: `Boolean`

Manage the journal-gatewayd service

Default value: ``true``

##### `service_enable` { #gatewayd_service_enable }

Data type: `Boolean`

Enable the journal-gatewayd service

Default value: ``true``

##### `service_name` { #gatewayd_service_name }

Data type: `String`

The journal-gatewayd service name

Default value: `'systemd-journal-gatewayd'`

##### `service_ensure` { #gatewayd_service_ensure }

Data type: `Stdlib::Ensure::Service`



Default value: `running`

### `systemd_journal_remote::remote` { #systemd_journal_remoteremote }

This module manages and configures the systemd journal remote package

#### Parameters

The following parameters are available in the `systemd_journal_remote::remote` class:

* [`command_path`](#remote_command_path)
* [`command_flags`](#remote_command_flags)
* [`manage_output`](#remote_manage_output)
* [`manage_service`](#remote_manage_service)
* [`service_enable`](#remote_service_enable)
* [`service_ensure`](#remote_service_ensure)
* [`service_name`](#remote_service_name)
* [`options`](#remote_options)

##### `command_path` { #remote_command_path }

Data type: `Stdlib::Absolutepath`

The service ExecStart command path

Default value: `'/usr/lib/systemd/systemd-journal-remote'`

##### `command_flags` { #remote_command_flags }

Data type: `Systemd_Journal_Remote::Remote_Flags`

The service ExecStart command flags to use

Default value: `{}`

##### `manage_output` { #remote_manage_output }

Data type: `Boolean`

Manage the creation of the default output paths (/var/log/journal/remote/)

Default value: ``false``

##### `manage_service` { #remote_manage_service }

Data type: `Boolean`

Manage the `systemd-journal-remote` service

Default value: ``true``

##### `service_enable` { #remote_service_enable }

Data type: `Boolean`

Enable the journal-remote service

Default value: ``true``

##### `service_ensure` { #remote_service_ensure }

Data type: `Stdlib::Ensure::Service`

Ensure the journal-remote service state

Default value: `running`

##### `service_name` { #remote_service_name }

Data type: `String`

The journal-remote service name

Default value: `'systemd-journal-remote'`

##### `options` { #remote_options }

Data type: `Optional[Systemd_Journal_Remote::Remote_Options]`

Config hash to configure the [Remote] options in `journal-remote.conf`

Default value: `{}`

### `systemd_journal_remote::upload` { #systemd_journal_remoteupload }

This class manages and configures the systemd journal upload service

#### Parameters

The following parameters are available in the `systemd_journal_remote::upload` class:

* [`command_path`](#upload_command_path)
* [`command_flags`](#upload_command_flags)
* [`manage_service`](#upload_manage_service)
* [`service_enable`](#upload_service_enable)
* [`service_ensure`](#upload_service_ensure)
* [`service_name`](#upload_service_name)
* [`options`](#upload_options)
* [`manage_state`](#upload_manage_state)

##### `command_path` { #upload_command_path }

Data type: `Stdlib::Absolutepath`

The service ExecStart command path

Default value: `'/usr/lib/systemd/systemd-journal-upload'`

##### `command_flags` { #upload_command_flags }

Data type: `Systemd_Journal_Remote::Upload_Flags`

The service ExecStart command flags to use

Default value: `{}`

##### `manage_service` { #upload_manage_service }

Data type: `Boolean`

Manage the journal-upload service

Default value: ``true``

##### `service_enable` { #upload_service_enable }

Data type: `Boolean`

Enable the journal-upload service

Default value: ``true``

##### `service_ensure` { #upload_service_ensure }

Data type: `Stdlib::Ensure::Service`

Ensure the journal-upload state

Default value: `running`

##### `service_name` { #upload_service_name }

Data type: `String`

The journal-upload service name

Default value: `'systemd-journal-upload'`

##### `options` { #upload_options }

Data type: `Optional[Systemd_Journal_Remote::Upload_Options]`

Config hash to configure the [Upload] options in journal-upload.conf

Default value: `{}`

##### `manage_state` { #upload_manage_state }

Data type: `Boolean`



Default value: ``false``

## Data types

### `Systemd_Journal_Remote::Gatewayd_Flags` { #systemd_journal_remotegatewayd_flags }

Matches systemd gatewayd options in `man systemd-journal-gatewayd`

Alias of

```puppet
Struct[{
    Optional['cert']         => Stdlib::Unixpath,
    Optional['key']          => Stdlib::Unixpath,
    Optional['trust']        => Variant[Stdlib::Unixpath, Enum['all']],
    Optional['system']       => Variant[Boolean, Enum['true', 'false']],
    Optional['user']         => Variant[Boolean, Enum['true', 'false']],
    Optional['merge']        => Variant[Boolean, Enum['true', 'false']],
    Optional['D']            => Stdlib::Unixpath,
    Optional['directory']    => Stdlib::Unixpath,
    Optional['file']         => String,
  }]
```

### `Systemd_Journal_Remote::Remote_Flags` { #systemd_journal_remoteremote_flags }

Matches systemd remote options in `man systemd-journal-remote`

Alias of

```puppet
Struct[{
    Optional['url']          => Variant[Stdlib::HTTPUrl, Stdlib::HTTPSUrl],
    Optional['getter']       => String,
    Optional['listen-raw']   => String,
    Optional['listen-http']  => Variant[String, Integer[-3, -1]],
    Optional['listen-https'] => Variant[String, Integer[-3, -1]],
    Optional['key']          => Stdlib::Unixpath,
    Optional['cert']         => Stdlib::Unixpath,
    Optional['trust']        => Variant[Stdlib::Unixpath, Enum['all']],
    Optional['gnutls-log']   => String,
    Optional['output']       => Stdlib::Unixpath,
    Optional['gnutls-log']   => String,
    Optional['split-mode']   => Enum['none','host'],
    Optional['compress']     => Enum['yes','no'],
    Optional['seal']         => Enum['yes','no'],
  }]
```

### `Systemd_Journal_Remote::Remote_Options` { #systemd_journal_remoteremote_options }

Matches systemd remote options in `man journal-remote.conf`

Alias of

```puppet
Struct[{
    Optional['Seal']                   => Enum['yes','no'],
    Optional['SplitMode']              => Enum['host','none'],
    Optional['ServerKeyFile']          => Stdlib::Absolutepath,
    Optional['ServerCertificateFile']  => Stdlib::Absolutepath,
    Optional['TrustedCertificateFile'] => Variant[Stdlib::Absolutepath, Enum['all']],
  }]
```

### `Systemd_Journal_Remote::Upload_Flags` { #systemd_journal_remoteupload_flags }

Matches systemd upload options in `man systemd-journal-upload`

Alias of

```puppet
Struct[{
    Optional['u']            => Variant[Stdlib::Host, Stdlib::HTTPUrl, Stdlib::HTTPSUrl],
    Optional['url']          => Variant[Stdlib::Host, Stdlib::HTTPUrl, Stdlib::HTTPSUrl],
    Optional['system']       => Variant[Boolean, Enum['true', 'false']],
    Optional['user']         => Variant[Boolean, Enum['true', 'false']],
    Optional['merge']        => Variant[Boolean, Enum['true', 'false']],
    Optional['D']            => Stdlib::Unixpath,
    Optional['directory']    => Stdlib::Unixpath,
    Optional['file']         => String,
    Optional['cursor']       => String,
    Optional['after-cursor'] => String,
    Optional['save-state']   => Stdlib::Unixpath,
    Optional['follow']       => Boolean,
    Optional['key']          => Variant[Enum['-'], Stdlib::Unixpath],
    Optional['cert']         => Variant[Enum['-'], Stdlib::Unixpath],
    Optional['trust']        => Variant[Enum['-', 'all'], Stdlib::Unixpath],
  }]
```

### `Systemd_Journal_Remote::Upload_Options` { #systemd_journal_remoteupload_options }

Matches systemd upload options in `man journal-upload.conf`

Alias of

```puppet
Struct[{
    Optional['URL']                    => Variant[Stdlib::HTTPUrl, Stdlib::HTTPSUrl],
    Optional['ServerKeyFile']          => Stdlib::Absolutepath,
    Optional['ServerCertificateFile']  => Stdlib::Absolutepath,
    Optional['TrustedCertificateFile'] => Stdlib::Absolutepath,
    Optional['NetworkTimeoutSec']      => Variant[Integer, String],
  }]
```
