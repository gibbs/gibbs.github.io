---
title: login.defs Puppet Module
description: >-
    Puppet module for managing and configuring login.defs
summary: >-
    A Puppet module that manages site-specific configuration for the shadow 
    password suite.
anchor: Puppet login.defs Module
uri: puppet-login-defs
image:
    src: images/projects/puppet-login-defs.png
    caption: Puppet login.defs graphic.
tags:
    - puppet
    - shadow
project:
    repository: https://github.com/gibbs/puppet-login_defs
date: "2022-03-01"
jsonld:
    datePublished: "2022-03-01"
    dateCreated: "2022-03-01"
    dateModified: "2022-03-01"
    sameAs:
        - https://github.com/gibbs/puppet-login_defs
        - https://forge.puppet.com/modules/genv/login_defs
---

# Puppet Module for login.defs

A Puppet module for managing and configuring `/etc/login.defs` on CentOS,
Debian, RedHat, Ubuntu, Rocky and AlmaLinux.

[![Build Status](https://github.com/gibbs/puppet-login_defs/workflows/CI/badge.svg)](https://github.com/gibbs/puppet-login_defs/actions?query=workflow%3ACI)
[![Release](https://github.com/gibbs/puppet-login_defs/workflows/Release/badge.svg)](https://github.com/gibbs/puppet-login_defs/actions?query=workflow%3ARelease)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-login_defs.svg)](LICENSE)

[Source available on GitHub]({{ project.repository }}){.button .button--github}

## Example Usage

Include the class and explicitly define the ownership:

```puppet
class { 'login_defs':
  owner => 0,
  group => 0,
  mode  => '0644',
}
```

This will manage `/etc/login.defs` using the default configuration supplied by
supported distributions.

Example Hiera configuration using rules commonly referred to in CIS benchmarks:

```yaml
login_defs::options:
  UID_MIN:
    value: 1000
    comment: Min/max values for automatic uid selection in useradd

  UMASK:
    value: '022'

  PASS_MAX_DAYS:
    value: 60
    comment: |-
      Password aging controls:

      	PASS_MAX_DAYS	Maximum number of days a password may be used.
      	PASS_MIN_DAYS	Minimum number of days allowed between password changes.
      	PASS_WARN_AGE	Number of days warning given before a password expires.
  PASS_MIN_DAYS:
    value: 1
  PASS_WARN_AGE:
    value: 14

  USERGROUPS_ENAB:
    value: 'yes'
    comment: |-
      Enable setting of the umask group bits to be the same as owner bits
      (examples: 022 -> 002, 077 -> 007) for non-root users, if the uid is
      the same as gid, and username is the same as the primary group name.

      If set to yes, userdel will remove the user's group if it contains no
      more members, and useradd will create by default a group with the name
      of the user.
```

## Reference

#### Classes

* [`login_defs`](#login_defs): Manage the configuration control definitions for the login package

#### Data types

* [`Login_Defs::Option`](#login_defsoption): login.defs option

## Classes

### `login_defs` { #login_defs }

Manage the configuration control definitions for the login package

#### Parameters

The following parameters are available in the `login_defs` class:

* [`options`](#options)
* [`package_ensure`](#package_ensure)
* [`package_manage`](#package_manage)
* [`package_name`](#package_name)
* [`owner`](#owner)
* [`group`](#group)
* [`mode`](#mode)

##### ==options== { #options }

Data type: `Hash[String, Login_Defs::Option]`

A hash of options to configure /etc/login.defs

Default value: ``undef``

##### ==package_ensure== { #package_ensure }

Data type: `String`

The login/shadow util package state to use when using $package_manage

Default value: `'installed'`

##### ==package_manage== { #package_manage }

Data type: `Boolean`

Set to true to manage the login/shadow utility package

Default value: ``false``

#####  ==package_name== { #package_name }

Data type: `String[1]`

The package name to use when managing the login/shadow utility package

Default value: ``undef``

##### ==owner== { #owner }

Data type: `Variant[String[1], Integer]`

The owner to set on /etc/login.defs

Default value: `'root'`

##### ==group== { #group }

Data type: `Variant[String[1], Integer]`

The group to set on /etc/login.defs

Default value: `0`

##### ==mode== { #mode }

Data type: `String[3,4]`

The mode to set on /etc/login.defs

Default value: `'0644'`

## Data types

### ==Login_Defs::Option== { #login_defsoption }

login.defs option

Alias of

```puppet
Struct[{
    Optional['comment'] => String,
    Optional['enabled'] => Boolean,
    'value'             => Variant[String, Integer],
  }]
```
