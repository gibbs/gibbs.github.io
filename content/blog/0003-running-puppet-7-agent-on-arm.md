---
title: Running Puppet 7 Agent on ARM
description: >-
    How to run the Puppet 7 (open source) agent on the armhf/armv7 architecture
    using Raspberry Pi OS
summary: >-
    A few tricks to get the Puppet 7 open source agent running on Raspberry Pi 
    OS (armhf/armv7).
anchor: Running Puppet 7 on ARM
uri: running-puppet-7-agent-on-arm
heading: Running Puppet 7 on Raspberry Pi OS (armhf/armv7)
# image:
#     src: images/blog/puppet-pi.png
#     caption: puppet 7 raspberry pi
tags:
    - puppet
    - arm
date: "2022-02-22"
jsonld:
    headline: "Running the Puppet 7 agent on Raspberry Pi OS (armhf/armv7)"
    datePublished: "2022-02-22"
    dateCreated: "2022-02-22"
    dateModified: "2022-11-05"
---

The Puppet open source repositories for Debian are not currently packaged
with a `puppet-agent` for ARM architectures. If you need to run a specific 
Puppet agent version (>=6) you can manually set up the agent and run it with
Ruby.

- [Installing the Puppet Agent via Ruby](#goto-installing-the-puppet-agent-via-ruby)
- [Initial Configuration](#goto-initial-configuration)
- [Set the System Facts](#goto-set-the-system-facts)

## Installing the Puppet Agent via Ruby

Install Ruby 2.7.2 with [rvm][rvm-install] or an equivalent 
environment manager:

```bash
rvm install 2.7.2
rvm use 2.7.2
```

Install the `puppet` and `facter` gems:

```bash
gem install puppet facter
```

If your codebase uses Augeas you will likely receive the error 
==Error: Could not find a suitable provider for augeas==. Install the 
development library and ruby wrapper with:

```bash
apt-get install libaugeas-dev
gem install ruby-augeas
```

## Initial Configuration

Create an initial directory structure for Puppet/Facter:

```bash
mkdir -p /etc/puppetlabs/puppet/ /etc/puppetlabs/facter/facts.d/
```

Add a minimal Puppet configuration file:

```bash
cat <<EOF > /etc/puppetlabs/puppet/puppet.conf
[main]
server = puppetserver.example.local
environment = production
EOF
```

## Set the System Facts

The distro and ARM architecture are unlikely to be supported by Puppet
(including any forge modules you may be using). Running Puppet now can
result in errors such as:

==Warning: Found multiple default providers for service: init, systemd; using init==

If the distro you are using is part of a well-supported family, you can 
manually set the OS facts. In the following example the OS is set to Debian
under `/etc/puppetlabs/facter/facts.d/os.yaml`:

```yaml
operatingsystem: Debian # Raspbian
os:
  architecture: armv7l
  distro:
    codename: buster
    description: "Raspbian GNU/Linux 10 (buster)"
    id: "Debian" # "Raspbian"
    release:
      full: '10.11'
      major: '10'
      minor: '11'
  family: "Debian"
  hardware: armv7l
  name: "Debian" # "Raspbian"
  release:
    full: '10.11'
    major: '10'
    minor: '11'
  selinux:
    enabled: false
```

OS facts resolved by facter can be queried with:

```bash
facter operatingsystem os
```

[rvm-install]: <https://rvm.io/rvm/install> "Installing RVM"
