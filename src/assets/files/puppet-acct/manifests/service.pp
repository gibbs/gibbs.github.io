# @summary service management
#
# @api private
#
class acct::service {
  assert_private()

  if $acct::service_manage {
    service { $acct::service_name:
      ensure => $acct::service_ensure,
      enable => $acct::service_enable,
    }
  }
}
