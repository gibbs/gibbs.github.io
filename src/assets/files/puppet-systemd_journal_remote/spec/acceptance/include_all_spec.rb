require 'spec_helper_acceptance'

describe 'include all classes' do
  pp = <<-MANIFEST
    include ::systemd_journal_remote::gatewayd
    include ::systemd_journal_remote::remote
    include ::systemd_journal_remote::upload
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end

  # Remote
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

  # Gateway
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

  # Upload
  describe service('systemd-journal-upload') do
    it { is_expected.to be_enabled }
    it { is_expected.to be_running }
  end

  describe file('/etc/systemd/system/systemd-journal-upload.service.d/service-override.conf') do
    it { is_expected.to be_file }
  end
end
