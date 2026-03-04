require 'spec_helper'

# rubocop:disable Layout/FirstArrayElementIndentation
describe 'systemd_journal_remote::gatewayd' do
  context 'supported operating systems' do
    on_supported_os.each do |os, facts|
      context "on #{os}" do
        let(:facts) { facts }

        # Catalogue compilation
        it { is_expected.to compile.with_all_deps }

        # Classes
        it { is_expected.to create_class('systemd_journal_remote') }
        it { is_expected.to create_class('systemd_journal_remote::gatewayd') }
        it {
          is_expected.to contain_class('systemd_journal_remote::gatewayd::config')
            .that_comes_before('Class[systemd_journal_remote::gatewayd::service]')
        }
        it { is_expected.to create_class('systemd_journal_remote::gatewayd::config') }
        it { is_expected.to create_class('systemd_journal_remote::gatewayd::service') }

        # Service
        it { is_expected.to create_service('systemd-journal-gatewayd') }
        it { is_expected.to create_service('systemd-journal-gatewayd').with_ensure('running') }
        it { is_expected.to create_service('systemd-journal-gatewayd').with_enable(true) }

        # Service dropin file
        it { is_expected.to contain_systemd__dropin_file('systemd_journal_remote-gatewayd_dropin') }
        it {
          is_expected.to contain_file('/etc/systemd/system/systemd-journal-gatewayd.service.d/service-override.conf')
        }

        context 'when adding all command flags' do
          let(:params) do
            {
              command_flags: {
                'cert'      => '/tmp/cert',
                'key'       => '/tmp/key',
                'trust'     => '/tmp/trust',
                'system'    => true,
                'user'      => true,
                'merge'     => true,
                'D'         => '/tmp/D',
                'directory' => '/tmp/directory',
                'file'      => '*',
              }
            }
          end

          # args/flags/options ordered
          command_flags = [
            ' ',
            '--cert=/tmp/cert',
            '--key=/tmp/key',
            '--trust=/tmp/trust',
            '--directory=/tmp/directory',
            '--file=*',
            '-D /tmp/D',
            '--system',
            '--user',
            '--merge',
          ].join(' ')

          it {
            is_expected.to compile.with_all_deps
            verify_contents(catalogue, '/etc/systemd/system/systemd-journal-gatewayd.service.d/service-override.conf', [
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
            verify_contents(catalogue, '/etc/systemd/system/systemd-journal-gatewayd.service.d/service-override.conf', [
              '  --cert=/tmp/cert -D /tmp/D --merge',
            ])
          }
        end
      end
    end
  end
end
