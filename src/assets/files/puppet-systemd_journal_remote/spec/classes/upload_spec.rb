require 'spec_helper'

# rubocop:disable Layout/FirstArrayElementIndentation
describe 'systemd_journal_remote::upload' do
  context 'supported operating systems' do
    on_supported_os.each do |os, facts|
      context "on #{os}" do
        let(:facts) { facts }

        distro = facts[:os]['distro']['id'] + facts[:os]['distro']['release']['major']

        # Catalogue compilation
        it { is_expected.to compile.with_all_deps }

        # Classes
        it { is_expected.to create_class('systemd_journal_remote') }
        it { is_expected.to create_class('systemd_journal_remote::upload') }
        it {
          is_expected.to contain_class('systemd_journal_remote::upload::config')
            .that_comes_before('Class[systemd_journal_remote::upload::service]')
        }
        it { is_expected.to create_class('systemd_journal_remote::upload::config') }
        it { is_expected.to create_class('systemd_journal_remote::upload::service') }

        # Service
        it { is_expected.to create_service('systemd-journal-upload') }
        it { is_expected.to create_service('systemd-journal-upload').with_ensure('running') }
        it { is_expected.to create_service('systemd-journal-upload').with_enable(true) }

        # Service dropin file
        it { is_expected.to contain_systemd__dropin_file('systemd_journal_remote-upload_dropin') }
        it {
          is_expected.to contain_file('/etc/systemd/system/systemd-journal-upload.service.d/service-override.conf')
          verify_contents(catalogue, '/etc/systemd/system/systemd-journal-upload.service.d/service-override.conf', [
            '  --save-state=/var/lib/systemd/journal-upload/state --url=http://0.0.0.0:19532  ',
          ])
        }

        # Default state file
        describe 'manages default state file', if: ['CentOS7', 'Debian9'].include?(distro) do
          it {
            is_expected.to contain_file('/var/lib/systemd/journal-upload/state').with(
              'ensure': 'file',
              'owner':  'systemd-journal-upload',
              'group':  'systemd-journal-upload',
              'mode':   '0600',
            )
          }
        end

        context 'when adding documented journal-upload.conf options' do
          options_fixture = {
            'URL'                    => 'http://localhost',
            'ServerKeyFile'          => '/tmp/server-key-file.pem',
            'ServerCertificateFile'  => '/tmp/server-cert-file.pem',
            'TrustedCertificateFile' => '/tmp/server-ca-file.pem',
            'NetworkTimeoutSec'      => '60',
          }

          let(:params) do
            {
              options: options_fixture
            }
          end

          it { is_expected.to compile.with_all_deps }

          options_fixture.each do |key, value|
            it {
              is_expected.to contain_ini_setting("systemd_journal_remote-journal_upload_#{key}").with(
                path:    '/etc/systemd/journal-upload.conf',
                section: 'Upload',
                notify:  'Service[systemd-journal-upload]',
                value:   value,
              )
            }
          end
        end

        context 'when adding undocumented journal-upload.conf options' do
          let(:params) do
            {
              options: {
                'UnknownKey' => 'yes',
              }
            }
          end

          it { is_expected.not_to compile.with_all_deps }
        end

        context 'when adding all command flags' do
          let(:params) do
            {
              command_flags: {
                'u'            => 'http://localhost:19532',
                'url'          => 'http://localhost:19532',
                'system'       => true,
                'user'         => true,
                'merge'        => true,
                'D'            => '/tmp/D',
                'directory'    => '/tmp/directory',
                'file'         => '*',
                'cursor'       => 's2',
                'after-cursor' => 's1',
                'save-state'   => '/tmp/state',
                'follow'       => true,
                'key'          => '/tmp/key',
                'cert'         => '/tmp/cert',
                'trust'        => '/tmp/trust',
              }
            }
          end

          # args/flags/options ordered
          command_flags = [
            ' ',
            '--url=http://localhost:19532',
            '--directory=/tmp/directory',
            '--file=*',
            '--cursor=s2',
            '--after-cursor=s1',
            '--save-state=/tmp/state',
            '--follow=true',
            '--key=/tmp/key',
            '--cert=/tmp/cert',
            '--trust=/tmp/trust',
            '-u http://localhost:19532',
            '-D /tmp/D',
            '--system',
            '--user',
            '--merge',
          ].join(' ')

          it {
            is_expected.to compile.with_all_deps
            verify_contents(catalogue, '/etc/systemd/system/systemd-journal-upload.service.d/service-override.conf', [
              command_flags,
            ])
          }
        end

        context 'false options supplied should not exist' do
          let(:params) do
            {
              command_flags: {
                'cert'      => '/tmp/cert',
                'system'    => false,
                'user'      => false,
                'merge'     => true,
                'D'         => '/tmp/D',
              }
            }
          end

          it {
            is_expected.to compile.with_all_deps
            verify_contents(catalogue, '/etc/systemd/system/systemd-journal-upload.service.d/service-override.conf', [
              '  --cert=/tmp/cert -D /tmp/D --merge',
            ])
          }
        end
      end
    end
  end
end
