require 'spec_helper_acceptance'

describe 'include the systemd_journal_system::upload class' do
  pp = <<-MANIFEST
    include ::systemd_journal_remote::upload
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end

  describe service('systemd-journal-upload') do
    it { is_expected.to be_enabled }
    it { is_expected.to be_running }
  end

  describe file('/etc/systemd/system/systemd-journal-upload.service.d/service-override.conf') do
    it { is_expected.to be_file }
  end
end
