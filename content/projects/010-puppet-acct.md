---
title: Puppet Module for acct and psacct
description: >-
    Puppet module for installing and managing the GNU Accounting Utilities
summary: >-
    A Puppet module for installing and managing the GNU Accounting Utilities.
anchor: Puppet acct Module
uri: puppet-acct
heading: Puppet Module for acct
image:
    src: images/projects/puppet.png
    caption: Puppet logo graphic.
tags:
    - puppet
    - acct
    - psacct
project:
    repository: https://github.com/gibbs/puppet-acct
date: "2022-07-31"
jsonld:
    datePublished: "2022-07-31"
    dateCreated: "2022-07-31"
    dateModified: "2022-11-24"
    sameAs:
        - https://github.com/gibbs/puppet-acct
        - https://forge.puppet.com/modules/genv/acct
badges:
    - text: Build Status
      src: https://github.com/gibbs/puppet-acct/workflows/CI/badge.svg
      url: https://github.com/gibbs/puppet-acct/actions?query=workflow%3ACI
    - text: Release
      src: https://github.com/gibbs/puppet-acct/workflows/Release/badge.svg
      url: https://github.com/gibbs/puppet-acct/actions?query=workflow%3ARelease
    - text: Puppet Forge
      src: https://img.shields.io/puppetforge/v/genv/acct.svg?maxAge=2592000?style=plastic
      url: https://forge.puppet.com/genv/acct
    - text: MIT License
      src: https://img.shields.io/github/license/gibbs/puppet-acct.svg
      url: https://github.com/gibbs/puppet-acct/blob/master/LICENSE
---

A minimal Puppet module for installing and managing the GNU accounting utilities.

- [Example Usage](#goto-example-usage)
- [Default Configuration](#goto-default-configuration)
- [Changelog](#goto-change-log)
- [Reference](#goto-reference)

[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

## Example Usage

Manifest example:

```puppet
include acct
```

Hiera example:

```yaml
acct::defaults:
  enable: true
  logging: 30

acct::manage_defaults: true
acct::service_enable: true
acct::service_ensure: running
acct::service_manage: true
```

## Default Configuration

```yaml [g1:Common]
!!!include(puppet-acct/data/common.yaml)!!!
```

```yaml [g1:Debian Family]
!!!include(puppet-acct/data/Debian.yaml)!!!
```

```yaml [g1:RedHat Family]
!!!include(puppet-acct/data/RedHat.yaml)!!!
```

<div class="puppet--changelog">

!!!include(puppet-acct/CHANGELOG.md)!!!

</div>
<div class="puppet--reference">

!!!include(puppet-acct/REFERENCE.md)!!!

</div>
