---
title: Overriding Puppet Resources
description: >-
    Overriding Puppet resources using resource collectors
summary: >-
    Examples of overriding Puppet resources using resource collectors.
anchor: Overriding Puppet Resources
uri: overriding-puppet-resources
heading: Overriding Puppet Resources
# image:
#     src: images/blog/puppet-pi.png
#     caption: puppet 7 raspberry pi
tags: [puppet]
date: "2022-03-18"
jsonld:
    headline: "Overriding Puppet Resources"
    datePublished: "2022-03-18"
    dateCreated: "2022-03-18"
    dateModified: "2022-03-18"
---

Puppet 
[resource collectors](https://puppet.com/docs/puppet/7/lang_collectors.html)
can be used to override resources. Although it should be used sparingly, this 
feature is incredibly useful if you need to change a resource declared in a 
module or want to conditionally set attribute values.

Example overwriting a managed resource:

```puppet
File<|title == '/etc/some/config'|> {
  ensure  => file,
  owner   => 0,
  content => 'Some content',
}
```

Example to conditionally set attribute values:

```puppet
case $facts[os][family] {
  'Debian': {
    Service<|title == 'systemd-timesyncd'|> {
      ensure => stopped,
    }
  }
  'RedHat': {
    Service<|title == 'systemd-timesyncd'|> {
      ensure => running,
    }
  }
}

service { 'systemd-timesyncd':
  enable => true,
}
```
