require 'spec_helper_acceptance'

describe 'include class' do
  pp = <<-MANIFEST
    include 'acct'
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end

  describe file('/etc/default/acct') do
    it { is_expected.to exist }
    it { is_expected.to be_file }
  end

  if ['redhat'].include? os[:family]
    describe service('psacct') do
      it { is_expected.to be_enabled }
      it { is_expected.to be_running }
    end
  end

  if ['debian', 'ubuntu'].include? os[:family]
    describe service('acct') do
      it { is_expected.to be_enabled }
      it { is_expected.to be_running }
    end
  end
end
