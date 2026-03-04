# @summary GNU Accounting Utilities
#
# @param defaults
#   acct defaults configuration
#
# @param manage_defaults
#   Manage the acct defaults file (/etc/default/acct)
#
# @param package_name
#   The package name
#
# @param package_ensure
#   The package ensure state
#
# @param package_manage
#   If the package should be managed
#
# @param service_enable
#   The service enable state
#
# @param service_name
#   The service name to use
#
# @param service_ensure
#   The service ensure state
#
# @param service_manage
#   If the auditd service should be managed
#
class acct (
  Acct::Defaults $defaults,
  Boolean $manage_defaults,
  String[1] $package_name,
  String $package_ensure,
  Boolean $package_manage,
  Boolean $service_enable,
  String[1] $service_name,
  Enum['stopped', 'running'] $service_ensure,
  Boolean $service_manage,
) {
  contain acct::package
  contain acct::config
  contain acct::service

  Class['acct::package']
  -> Class['acct::config']
  -> Class['acct::service']
}
