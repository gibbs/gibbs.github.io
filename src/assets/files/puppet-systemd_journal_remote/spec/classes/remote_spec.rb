require 'spec_helper'

# rubocop:disable Layout/FirstArrayElementIndentation
describe 'systemd_journal_remote::remote' do
  context 'supported operating systems' do
    on_supported_os.each do |os, facts|
      context "on #{os}" do
        let(:facts) { facts }

        distro = facts[:os]['distro']['id'] + facts[:os]['distro']['release']['major']

        # Catalogue compilation
        it { is_expected.to compile.with_all_deps }

        # Classes
        it { is_expected.to create_class('systemd_journal_remote') }
        it { is_expected.to create_class('systemd_journal_remote::remote') }
        it {
          is_expected.to contain_class('systemd_journal_remote::remote::config')
            .that_comes_before('Class[systemd_journal_remote::remote::service]')
        }
        it { is_expected.to create_class('systemd_journal_remote::remote::config') }
        it { is_expected.to create_class('systemd_journal_remote::remote::service') }

        # Service
        it { is_expected.to create_service('systemd-journal-remote') }
        it { is_expected.to create_service('systemd-journal-remote').with_ensure('running') }
        it { is_expected.to create_service('systemd-journal-remote').with_enable(true) }

        # Service dropin file
        it { is_expected.to contain_systemd__dropin_file('systemd_journal_remote-remote_dropin') }
        it {
          is_expected.to contain_file('/etc/systemd/system/systemd-journal-remote.service.d/service-override.conf')
          verify_contents(catalogue, '/etc/systemd/system/systemd-journal-remote.service.d/service-override.conf', [
            '  --listen-http=-3 \\',
            '  --output=/var/log/journal/remote/',
          ])
        }

        # Output
        describe 'manages output', if: ['CentOS7', 'RedHatEnterpriseServer7', 'Debian9'].include?(distro) do
          it {
            is_expected.to contain_file('/var/log/journal/').with(
              'ensure': 'directory',
              'owner':  '0',
              'group':  'systemd-journal',
            )
          }

          it {
            is_expected.to contain_file('/var/log/journal/remote/').with(
              'ensure': 'directory',
              'owner':  'systemd-journal-remote',
              'group':  'systemd-journal-remote',
            )
          }
        end

        context 'when adding documented journal-remote.conf options' do
          options_fixture = {
            'Seal'                   => 'yes',
            'SplitMode'              => 'host',
            'ServerKeyFile'          => '/tmp/server-key-file.pem',
            'ServerCertificateFile'  => '/tmp/server-cert-file.pem',
            'TrustedCertificateFile' => '/tmp/server-ca-file.pem',
          }

          let(:params) do
            {
              options: options_fixture
            }
          end

          options_fixture.each do |key, value|
            it {
              is_expected.to contain_ini_setting("systemd_journal_remote-journal_remote_#{key}").with(
                path:    '/etc/systemd/journal-remote.conf',
                section: 'Remote',
                notify:  'Service[systemd-journal-remote]',
                value:   value,
              )
            }
          end

          it { is_expected.to compile.with_all_deps }
        end

        context 'when adding undocumented journal-remote.conf options' do
          let(:params) do
            {
              options: {
                'UnknownKey' => 'yes',
              }
            }
          end

          it { is_expected.not_to compile.with_all_deps }
        end
      end
    end
  end
end
