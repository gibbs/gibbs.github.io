# acct

[![Build Status](https://github.com/gibbs/puppet-acct/workflows/CI/badge.svg)](https://github.com/gibbs/puppet-acct/actions?query=workflow%3ACI)
[![Release](https://github.com/gibbs/puppet-acct/workflows/Release/badge.svg)](https://github.com/gibbs/puppet-acct/actions?query=workflow%3ARelease)
[![Puppet Forge](https://img.shields.io/puppetforge/v/genv/acct.svg?maxAge=2592000?style=plastic)](https://forge.puppet.com/genv/acct)
[![Apache-2 License](https://img.shields.io/github/license/gibbs/puppet-acct.svg)](LICENSE)

Install, configure and manage the GNU Accounting Utilities.

## Usage

Include the `acct` class to install the `acct` or `psacct` package with default
configuration:

```puppet
include acct
```
