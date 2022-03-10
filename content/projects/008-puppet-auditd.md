---
title: Audit Daemon Puppet Module
description: >-
    Puppet module for managing auditd on Debian and Ubuntu
summary: >-
    A Puppet module for managing the audit daemon and auditd rules on Debian
    and Ubuntu.
anchor: Puppet auditd Module
uri: puppet-auditd
image:
    src: images/projects/puppet.png
    caption: Puppet graphic
tags:
    - puppet
    - auditd
project:
    repository: https://github.com/gibbs/puppet-auditd
date: "2022-03-01"
jsonld:
    datePublished: "2022-03-10"
    dateCreated: "2022-03-10"
    dateModified: "2022-03-10"
    sameAs:
        - https://github.com/gibbs/puppet-auditd
        - https://forge.puppet.com/modules/genv/auditd
---

# Puppet Module for auditd

A Puppet module for managing and configuring `auditd` on Debian and Ubuntu.

[![Build Status](https://github.com/gibbs/puppet-auditd/workflows/CI/badge.svg)](https://github.com/gibbs/puppet-auditd/actions?query=workflow%3ACI)
[![Release](https://github.com/gibbs/puppet-auditd/workflows/Release/badge.svg)](https://github.com/gibbs/puppet-auditd/actions?query=workflow%3ARelease)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-auditd.svg)](LICENSE)

[Source available on GitHub]({{ project.repository }}){.button .button--github}

## Daemon Configuration

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

## Rules

The `auditd::rules` parameter can be used to pass a hash of rules to the 
defined type.

```puppet
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

Alternatively, the `auditd::rule` defined type can be used in a manifest.

```puppet
auditd::rule { 'unauthorised_file_access':
  content => '-a always,exit -F arch=b64 -S creat -S open -S openat -S truncate -S ftruncate -F exit=-EACCES -F auid>=1000 -F auid!=4294967295 -k access',
  order   => 10,
}

auditd::rule { '-w /var/log/tallylog -p wa -k logins': }
```

A better approach could be to use Hiera:

```yaml
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

## Reference

### Classes

#### Public Classes

* [`auditd`](#auditd): audit daemon

#### Private Classes

* `auditd::config`: auditd configuration
* `auditd::package`: auditd package management
* `auditd::service`: auditd service management

### Defined types

* [`auditd::rule`](#auditdrule): Creates auditd rules

### Data types

* [`Auditd::Conf`](#auditdconf): auditd.conf configuration file parameters
* [`Auditd::Rules`](#auditdrules): auditd rule parameters

## Classes

### `auditd` { #auditd }

audit daemon

#### Parameters

The following parameters are available in the `auditd` class:

* [`package_name`](#package_name)
* [`package_ensure`](#package_ensure)
* [`service_enable`](#service_enable)
* [`service_name`](#service_name)
* [`rules`](#rules)
* [`rules_file`](#rules_file)
* [`config`](#config)
* [`buffer_size`](#buffer_size)
* [`failure_mode`](#failure_mode)
* [`immutable`](#immutable)
* [`syslog_output`](#syslog_output)
* [`service_ensure`](#service_ensure)

##### ==package_name== { #package_name }

Data type: `String[1]`

The package name to use

Default value: `'auditd'`

##### ==package_ensure== { #package_ensure }

Data type: `String`

The package state to set

Default value: `'installed'`

##### ==service_enable== { #service_enable }

Data type: `Boolean`

The service enable state

Default value: ``true``

##### ==service_name== { #service_name }

Data type: `String[1]`

The service name to use

Default value: `'auditd'`

##### ==rules== { #rules }

Data type: `Optional[Hash[String, Auditd::Rules]]`

Hash of auditd rules to set

Default value: `{}`

##### ==rules_file== { #rules_file }

Data type: `Stdlib::Absolutepath`

The rules file to use

Default value: `'/etc/audit/rules.d/audit.rules'`

##### ==config== { #config }

Data type: `Auditd::Conf`

auditd.conf configuration hash

Default value: `{}`

##### ==buffer_size== { #buffer_size }

Data type: `Integer`

The buffer size to use

Default value: `8192`

##### ==failure_mode== { #failure_mode }

Data type: `Integer`

The failure mode (defaults to printing failure message)

Default value: `1`

##### ==immutable== { #immutable }

Data type: `Boolean`

Make the configuration immutable

Default value: `false`

##### ==syslog_output== { #syslog_output }

Data type: `Boolean`

Enable syslog output

Default value: `true`

##### ==service_ensure== { #service_ensure }

Data type: `Stdlib::Ensure::Service`



Default value: `'running'`

## Defined types

### `auditd::rule` { #auditdrule }

Creates auditd rules

#### Parameters

The following parameters are available in the `auditd::rule` defined type:

* [`content`](#rule_content)
* [`order`](#order)

##### ==content== { #rule_content }

Data type: `String`

The rule content

Default value: `''`

##### ==order== { #order }

Data type: `Integer[1, 100]`

The rule priority order (between 1 and 100)

Default value: `10`

## Data types

### `Auditd::Conf` { #auditdconf }

auditd.conf configuration file parameters

Alias of

```puppet
Struct[{
    Optional['local_events']            => Enum['yes', 'no'],
    Optional['log_file']                => Stdlib::Absolutepath,
    Optional['write_logs']              => Enum['yes', 'no'],
    Optional['log_format']              => Enum[
      'raw', 'RAW',
      'enriched', 'ENRICHED',
    ],
    Optional['log_group']               => Variant[Integer, String[1]],
    Optional['priority_boost']          => Integer[0],
    Optional['flush']                   => Enum[
      'none', 'NONE',
      'incremental', 'INCREMENTAL',
      'incremental_async', 'INCREMENTAL_ASYNC',
      'data', 'DATA',
      'sync', 'SYNC',
    ],
    Optional['freq']                    => Integer[0],
    Optional['dispatcher']              => String,
    Optional['disp_qos']                => Enum[
      'lossy', 'LOSSY',
      'lossless', 'LOSSLESS'
    ],
    Optional['num_logs']                => Integer[0, 999],
    Optional['name_format']             => Enum[
      'none', 'NONE',
      'hostname', 'HOSTNAME',
      'fqd', 'FQD',
      'numeric', 'NUMERIC',
      'user', 'USER',
    ],
    Optional['name']                    => String,
    Optional['max_log_file']            => Integer,
    Optional['max_log_file_action']     => Enum[
      'ignore', 'IGNORE',
      'syslog', 'SYSLOG',
      'suspend', 'SUSPEND',
      'rotate', 'ROTATE',
      'keep_logs', 'KEEP_LOGS',
    ],
    Optional['verify_email']            => Enum['yes', 'no'],
    Optional['action_mail_acct']        => Variant[String, Stdlib::Email],
    Optional['space_left']              => Integer,
    Optional['space_left_action']       => Enum[
      'ignore', 'IGNORE',
      'syslog', 'SYSLOG',
      'rotate', 'ROTATE',
      'email', 'EMAIL',
      'exec', 'EXEC',
      'suspend', 'SUSPEND',
      'single', 'SINGLE',
      'halt', 'HALT',
    ],
    Optional['admin_space_left']        => Variant[Integer, String],
    Optional['admin_space_left_action'] => Enum[
      'ignore', 'IGNORE',
      'syslog', 'SYSLOG',
      'rotate', 'ROTATE',
      'email', 'EMAIL',
      'exec', 'EXEC',
      'suspend', 'SUSPEND',
      'single', 'SINGLE',
      'halt', 'HALT',
    ],
    Optional['disk_full_action']        => Enum[
      'ignore', 'IGNORE',
      'syslog', 'SYSLOG',
      'rotate', 'ROTATE',
      'exec', 'EXEC',
      'suspend', 'SUSPEND',
      'single', 'SINGLE',
      'halt', 'HALT',
    ],
    Optional['disk_error_action']       => Enum[
      'ignore', 'IGNORE',
      'syslog', 'SYSLOG',
      'exec', 'EXEC',
      'suspend', 'SUSPEND',
      'single', 'SINGLE',
      'halt', 'HALT',
    ],
    Optional['tcp_listen_port']         => Integer[1,65535],
    Optional['tcp_listen_queue']        => Integer,
    Optional['tcp_max_per_addr']        => Integer[1,1024],
    Optional['use_libwrap']             => Enum['yes', 'no'],
    Optional['tcp_client_ports']        => Variant[Integer, String],
    Optional['tcp_client_max_idle']     => Integer,
    Optional['transport']               => Enum['tcp', 'TCP', 'krb5', 'KRB5'],
    Optional['enable_krb5']             => Enum['yes', 'no'],
    Optional['krb5_principal']          => String,
    Optional['krb5_key_file']           => Stdlib::Absolutepath,
    Optional['distribute_network']      => Enum['yes', 'no'],
    Optional['q_depth']                 => Integer,
    Optional['overflow_action']         => Enum[
      'ignore', 'IGNORE',
      'syslog', 'SYSLOG',
      'suspend', 'SUSPEND',
      'single', 'SINGLE',
      'halt', 'HALT',
    ],
    Optional['max_restarts']            => Integer[0],
    Optional['plugin_dir']              => Stdlib::Absolutepath,
    Optional['end_of_event_timeout']    => Integer[0],
  }]
```

### `Auditd::Rules` { #auditdrules }

auditd rule parameters

Alias of

```puppet
Struct[{
    Optional['content'] => String,
    Optional['order']   => Integer[1, 99],
  }]
```
