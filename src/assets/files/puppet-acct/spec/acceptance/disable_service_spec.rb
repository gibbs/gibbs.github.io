require 'spec_helper_acceptance'

describe 'disable service' do
  pp = <<-MANIFEST
    class { 'acct':
      service_enable => false,
      service_ensure => 'stopped',
    }
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end

  if ['redhat'].include? os[:family]
    describe service('psacct') do
      it { is_expected.not_to be_enabled }
      it { is_expected.not_to be_running }
    end
  end

  if ['debian', 'ubuntu'].include? os[:family]
    describe service('acct') do
      it { is_expected.not_to be_enabled }
      it { is_expected.not_to be_running }
    end
  end
end
