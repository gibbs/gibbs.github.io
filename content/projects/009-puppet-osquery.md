---
title: Puppet Module for osquery
description: >-
    Puppet module for installing osquery and managing osqueryd on Linux
summary: >-
    A Puppet module for installing and managing osquery on different Linux
    flavours.
anchor: Puppet osquery Module
uri: puppet-osquery
heading: Puppet Module for osquery
image:
    src: images/projects/puppet.png
    caption: Puppet logo graphic.
tags:
    - puppet
    - osquery
project:
    repository: https://github.com/gibbs/puppet-osquery
date: "2022-03-18"
jsonld:
    datePublished: "2022-03-18"
    dateCreated: "2022-03-18"
    dateModified: "2022-04-26"
    sameAs:
        - https://github.com/gibbs/puppet-osquery
        - https://forge.puppet.com/modules/genv/osquery
---

# Puppet Module for osquery

[![Build Status](https://img.shields.io/github/workflow/status/gibbs/puppet-osquery/CI?style=flat-square)](https://github.com/gibbs/puppet-osquery/actions?query=workflow%3ACI)
[![Release](https://img.shields.io/github/workflow/status/gibbs/puppet-osquery/Release?label=release&style=flat-square)](https://github.com/gibbs/puppet-osquery/actions?query=workflow%3ARelease)
[![Puppet Forge](https://img.shields.io/puppetforge/v/genv/osquery.svg?maxAge=2592000&style=flat-square)](https://forge.puppet.com/genv/osquery)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-osquery.svg?style=flat-square)](https://github.com/gibbs/puppet-osquery/blob/master/LICENSE)

A minimal Puppet module for installing and managing the `osquery` service.

- [Example Usage](#goto-example-usage)
- [Default Configuration](#goto-default-configuration)
- [Changelog](#goto-changelog)
- [Reference](#goto-reference)

[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

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

## Default Configuration

```yaml [g1:Common]
!!!include(puppet-osquery/data/common.yaml)!!!
```

```yaml [g1:Debian Family]
!!!include(puppet-osquery/data/Debian.yaml)!!!
```

```yaml [g1:RedHat Family]
!!!include(puppet-osquery/data/RedHat.yaml)!!!
```

<div class="puppet--changelog">

!!!include(puppet-osquery/CHANGELOG.md)!!!

</div>
<div class="puppet--reference">

!!!include(puppet-osquery/REFERENCE.md)!!!

</div>

