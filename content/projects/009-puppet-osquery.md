---
title: Puppet Module for osquery
description: >-
    Puppet module for installing osquery and managing osqueryd on Linux
summary: >-
    A Puppet module for installing and managing osquery on different Linux
    flavours.
anchor: Puppet osquery Module
uri: puppet-osquery
image:
    src: images/projects/puppet.png
    caption: Puppet graphic
tags:
    - puppet
    - osquery
project:
    repository: https://github.com/gibbs/puppet-osquery
date: "2022-03-18"
jsonld:
    datePublished: "2022-03-18"
    dateCreated: "2022-03-18"
    dateModified: "2022-03-18"
    sameAs:
        - https://github.com/gibbs/puppet-osquery
        - https://forge.puppet.com/modules/genv/osquery
---

# Puppet Module for osquery

A minimal Puppet module for installing and managing the `osquery` service.

[![Build Status](https://github.com/gibbs/puppet-osquery/workflows/CI/badge.svg)](https://github.com/gibbs/puppet-osquery/actions?query=workflow%3ACI)
[![Release](https://github.com/gibbs/puppet-auditd/workflows/Release/badge.svg)](https://github.com/gibbs/puppet-osquery/actions?query=workflow%3ARelease)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-osquery.svg)](LICENSE)

Supported Linux flavours include;

- Debian 10, 11
- Ubuntu 18.04, 20.04
- CentOS 7
- AlmaLinux 8.5
- Rocky Linux 8.5
- RedHat 8
- Scientific Linux 6, 7

[Source available on GitHub]({{ project.repository }}){.button .button--github}

## Example Usage

Most parameters are automatically set for each package manager (APT/RPM). The
`settings` parameter accepts any hash which is saved as JSON to 
`/etc/osquery/osquery.conf`.

Manifest example:

```puppet
class { 'osquery':
  settings   => {
    options   => {
      config_plugin   => 'filesystem',
      host_identifier => 'hostname',
      disable_logging => false,
      logger_plugin   => 'syslog',
      worker_threads  => '1',
    },
    discover => [
      'SELECT pid FROM processes WHERE name = \'foobar\';',
      'SELECT 1 FROM users WHERE username like \'www%\';',
    ],
  }
}
```

JSON result:

```json
{
  "options": {
    "config_plugin": "filesystem",
    "host_identifier": "hostname",
    "disable_logging": false,
    "logger_plugin": "syslog",
    "worker_threads": "1"
  },
  "discover": [
    "SELECT pid FROM processes WHERE name = 'foobar';",
    "SELECT 1 FROM users WHERE username like 'www%';"
  ]
}
```

Hiera example:

```yaml
osquery::settings:
  options:
    config_plugin: filesystem
    logger_plugin: syslog
    host_identifier: uuid
  discover:
    - "SELECT pid FROM processes WHERE name = 'foobar';"
    - "SELECT 1 FROM users WHERE username like 'www%';"
  schedule:
    foobar:
      query: SELECT foo, bar, pid FROM foobar_table;
      interval: 600
  packs:
    shard: 10
    external_pack: /path/to/external_pack.conf
    queries:
      suid_bins:
        query: SELECT * FROM suid_bins;
        interval: 3600
```

JSON result:

```json
{
  "options": {
    "config_plugin": "filesystem",
    "host_identifier": "uuid",
    "disable_logging": false,
    "logger_plugin": "syslog",
    "worker_threads": "4"
  },
  "discover": [
    "SELECT pid FROM processes WHERE name = 'foobar';",
    "SELECT 1 FROM users WHERE username like 'www%';"
  ],
  "schedule": {
    "foobar": {
      "query": "SELECT foo, bar, pid FROM foobar_table;",
      "interval": 600
    }
  },
  "packs": {
    "shard": 10,
    "external_pack": "/path/to/external_pack.conf",
    "queries": {
      "suid_bins": {
        "query": "SELECT * FROM suid_bins;",
        "interval": 3600
      }
    }
  }
}
```

## Reference

### Classes

#### Public Classes

* [`osquery`](#osquery): osquery

#### Private Classes

* `osquery::config`: osquery configuration
* `osquery::package`: osquery package management
* `osquery::service`: osquery service management

## Classes

### `osquery` { #osquery }

osquery

#### Parameters

The following parameters are available in the `osquery` class:

* [`config_path`](#config_path)
* [`config_owner`](#config_owner)
* [`config_group`](#config_group)
* [`package_name`](#package_name)
* [`package_ensure`](#package_ensure)
* [`service_name`](#service_name)
* [`service_enable`](#service_enable)
* [`service_ensure`](#service_ensure)
* [`manage_repo`](#manage_repo)
* [`repo_url`](#repo_url)
* [`repo_key_id`](#repo_key_id)
* [`repo_key_server`](#repo_key_server)
* [`settings`](#settings)

##### ==config_path== { #config_path }

Data type: `Stdlib::AbsolutePath`

The absolute path to the osquery configuration file

Default value: `'/etc/osquery/osquery.conf'`

##### ==config_owner== { #config_owner }

Data type: `Variant[Integer[0], String[1]]`

The owner to set on the osquery configuration file

Default value: `0`

##### ==config_group== { #config_group }

Data type: `Variant[Integer[0], String[1]]`

The group to set on the osquery configuration file

Default value: `0`

##### ==package_name== { #package_name }

Data type: `String[1]`

The osquery package name

Default value: `'osquery'`

##### ==package_ensure== { #package_ensure }

Data type: `String`

The osquery package ensure state

Default value: `'installed'`

##### ==service_name== { #service_name }

Data type: `String[1]`

The osquery service name

Default value: `'osqueryd'`

##### ==service_enable== { #service_enable }

Data type: `Boolean`

The osquery service enable state

Default value: ``true``

##### ==service_ensure== { #service_ensure }

Data type: `Stdlib::Ensure::Service`

The osquery service ensure state

Default value: `'running'`

##### ==manage_repo== { #manage_repo }

Data type: `Boolean`

Set to true to manage the osquery repository

Default value: ``true``

##### ==repo_url== { #repo_url }

Data type: `String`

The osquery repository URL to use

Default value: ``undef``

##### ==repo_key_id== { #repo_key_id }

Data type: `Optional[String]`

The osquery repository GPG key id (apt)

Default value: ``undef``

##### ==repo_key_server== { #repo_key_server }

Data type: `Optional[String]`

The osquery GPG key server (apt) or GPG URL (yum)

Default value: ``undef``

##### ==settings== { #settings }

Data type: `Hash`

A hash of settings to set in the osquery configuration file

Default value: `{}`
