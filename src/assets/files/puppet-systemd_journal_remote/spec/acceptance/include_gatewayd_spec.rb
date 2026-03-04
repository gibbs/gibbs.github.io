require 'spec_helper_acceptance'

describe 'include the systemd_journal_system::gatewayd class' do
  # @note: Almalinux and Rocky Linux images missing ss utility
  if os[:family] == 'redhat'
    apply_manifest(%(
      package { 'iproute':
        ensure => installed,
      }
    ), catch_failures: true)
  end

  pp = <<-MANIFEST
    include ::systemd_journal_remote::gatewayd
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end

  describe service('systemd-journal-gatewayd') do
    it { is_expected.to be_enabled }
    it { is_expected.to be_running }
  end

  describe port(19_531) do
    it { is_expected.to be_listening }
  end

  describe file('/etc/systemd/system/systemd-journal-gatewayd.service.d/service-override.conf') do
    it { is_expected.to be_file }
  end

  describe command('curl -s -o /dev/null -w "%{http_code}" -H"Accept: application/vnd.fdo.journal" http://localhost:19531/machine') do
    its(:stdout) { is_expected.to match(%r{200}) }
  end
end
