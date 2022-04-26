# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0]

### Breaking changes

- Module restructured. Most `::systemd_journal_remote` parameters from 0.1.0
moved to `::systemd_journal_remote::remote`

### Fixed

- Flags such as `--merge` and `--system` are only used when explicitly true
- `/var/log/journal/remote/` permissions for CentOS 7 and Debian 9
- `-D` and `-u` options incorrectly formatted

### Added

- `systemd_journal_remote::upload` class for `systemd-journal-upload`
management
- `systemd_journal_remote::gatewayd` class for `systemd-journal-gatewayd`
management
- AlmaLinux and Rocky Linux support added
- Additional spec and acceptance tests

### Changed

- Abstract data type name changes
- Unnecessary abstract data types removed
- Local variables now used in private classes
