require 'spec_helper'

# rubocop:disable Layout/FirstHashElementIndentation
describe 'acct' do
  context 'supported operating systems' do
    on_supported_os.each do |os, facts|
      package_name = (facts[:os]['family'] == 'RedHat') ? 'psacct' : 'acct'

      context "on #{os}" do
        let(:facts) { facts }

        it { is_expected.to compile.with_all_deps }
        it { is_expected.to create_class('acct') }
        it { is_expected.to create_class('acct::package') }
        it { is_expected.to create_class('acct::config') }
        it { is_expected.to create_class('acct::service') }

        it {
          is_expected.to contain_package(package_name).with({
            ensure: 'installed'
          })
        }

        it { is_expected.to contain_file('/etc/default/acct') }

        it {
          is_expected.to contain_service(package_name).with({
            ensure: 'running',
            enable: 'true'
          })
        }

        context 'unmanaged service' do
          let(:params) do
            {
              service_manage: false
            }
          end

          it { is_expected.to compile }
          it { is_expected.not_to contain_service(package_name) }
        end

        context 'unmanaged defaults' do
          let(:params) do
            {
              manage_defaults: false
            }
          end

          it { is_expected.to compile }
          it { is_expected.not_to contain_file('/etc/default/acct') }
        end
      end
    end
  end
end
