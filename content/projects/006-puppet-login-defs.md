---
title: login.defs Puppet Module
description: >-
    Puppet module for managing and configuring login.defs
summary: >-
    A Puppet module that manages site-specific configuration for the shadow 
    password suite.
anchor: Puppet login.defs Module
uri: puppet-login-defs
heading: 'Puppet Module for login.defs'
image:
    src: images/projects/puppet.png
    caption: Puppet logo graphic.
tags:
    - puppet
    - shadow
project:
    repository: https://github.com/gibbs/puppet-login_defs
date: "2022-03-01"
jsonld:
    datePublished: "2022-03-01"
    dateCreated: "2022-03-01"
    dateModified: "2022-04-26"
    sameAs:
        - https://github.com/gibbs/puppet-login_defs
        - https://forge.puppet.com/modules/genv/login_defs
badges:
    - text: Build Status
      src: https://img.shields.io/github/workflow/status/gibbs/puppet-login_defs/CI?style=flat-square
      url: https://github.com/gibbs/puppet-login_defs/actions?query=workflow%3ACI
    - text: Release
      src: https://img.shields.io/github/workflow/status/gibbs/puppet-login_defs/Release?label=release&style=flat-square
      url: https://github.com/gibbs/puppet-login_defs/actions?query=workflow%3ARelease
    - text: Puppet Forge
      src: https://img.shields.io/puppetforge/v/genv/login_defs.svg?maxAge=2592000&style=flat-square
      url: https://forge.puppet.com/genv/login_defs
    - text: Apache-2 License
      src: https://img.shields.io/github/license/gibbs/puppet-login_defs.svg?style=flat-square
      url: https://github.com/gibbs/puppet-login_defs/blob/master/LICENSE
---

A Puppet module for managing and configuring `/etc/login.defs` on CentOS,
Debian, RedHat, Ubuntu, Rocky and AlmaLinux.

- [Example Usage](#goto-example-usage)
- [Default Configuration](#goto-default-configuration)
- [Changelog](#goto-changelog)
- [Reference](#goto-reference)

[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

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

## Default Configuration

```yaml [g1:Common]
!!!include(puppet-login_defs/data/common.yaml)!!!
```

```yaml [g1:Debian Family]
!!!include(puppet-login_defs/data/Debian.yaml)!!!
```

```yaml [g1:Debian 10]
!!!include(puppet-login_defs/data/Debian-10.yaml)!!!
```

```yaml [g1:Debian 10]
!!!include(puppet-login_defs/data/Debian-11.yaml)!!!
```

```yaml [g1:Ubuntu 1804]
!!!include(puppet-login_defs/data/Ubuntu-18.04.yaml)!!!
```

```yaml [g1:Ubuntu 2004]
!!!include(puppet-login_defs/data/Ubuntu-20.04.yaml)!!!
```

```yaml [g1:RedHat Family]
!!!include(puppet-login_defs/data/RedHat.yaml)!!!
```

```yaml [g1:CentOS 7]
!!!include(puppet-login_defs/data/CentOS-7.yaml)!!!
```

<div class="puppet--changelog">

!!!include(puppet-login_defs/CHANGELOG.md)!!!

</div>
<div class="puppet--reference">

!!!include(puppet-login_defs/REFERENCE.md)!!!

</div>

