require 'spec_helper_acceptance'

describe 'include the systemd_journal_remote class' do
  pp = <<-MANIFEST
    include ::systemd_journal_remote
  MANIFEST

  it 'applies idempotently' do
    idempotent_apply(pp)
  end
end
