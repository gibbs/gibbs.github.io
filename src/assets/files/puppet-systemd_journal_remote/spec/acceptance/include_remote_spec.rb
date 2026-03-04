require 'spec_helper_acceptance'

describe 'include the systemd_journal_system::remote class' do
  # @note: Almalinux and Rocky Linux images missing ss utility
  if os[:family] == 'redhat'
    apply_manifest(%(
      package { 'iproute':
        ensure => installed,
      }
    ), catch_failures: true)
  end

  pp = <<-MANIFEST
    include ::systemd_journal_remote::remote
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end

  describe service('systemd-journal-remote') do
    it { is_expected.to be_enabled }
    it { is_expected.to be_running }
  end

  describe port(19_532) do
    it { is_expected.to be_listening }
  end

  describe file('/etc/systemd/system/systemd-journal-remote.service.d/service-override.conf') do
    it { is_expected.to be_file }
  end
end
