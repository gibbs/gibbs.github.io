require 'spec_helper'

describe 'systemd_journal_remote' do
  context 'supported operating systems' do
    on_supported_os.each do |os, facts|
      context "on #{os}" do
        let(:facts) { facts }

        distro = facts[:os]['distro']['id'] + facts[:os]['distro']['release']['major']

        # Catalogue compilation
        it { is_expected.to compile.with_all_deps }

        # Classes
        it { is_expected.to create_class('systemd_journal_remote') }
        it { is_expected.to contain_class('systemd_journal_remote') }

        # Package
        if ['CentOS7', 'RedHatEnterpriseServer7'].include?(distro)
          it {
            is_expected.to contain_package('systemd-journal-gateway').with(
              ensure: 'present',
            )
          }
        elsif distro != 'Archrolling'
          it {
            is_expected.to contain_package('systemd-journal-remote').with(
              ensure: 'present',
            )
          }
        end
      end
    end
  end
end
