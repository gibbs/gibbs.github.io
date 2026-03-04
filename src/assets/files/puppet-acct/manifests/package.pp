# @summary package management
#
# @api private
#
class acct::package {
  assert_private()

  if $acct::package_manage {
    package { $acct::package_name:
      ensure => $acct::package_ensure,
    }
  }
}
