# APT sources.list

Default general purpose `/etc/apt/sources.list` files taken from Debian/Ubuntu
cloud images. See the `sources` directory.

## Versions

| Distribution | Version | Codename |
| ------------ | ------- | -------- |
| Debian       | 12      | bookworm |
| Debian       | 11      | bullseye |
| Debian       | 10      | buster   |
| Debian       | 9       | stretch  |
| Ubuntu       | 22.04   | jammy    |
| Ubuntu       | 20.04   | focal    |
| Ubuntu       | 18.04   | bionic   |
| Ubuntu       | 16.04   | xenial   |

## Generate Sources

```bash
# Update boxes
vagrant box update

# Start VMs
vagrant up
vagrant up <codename>

# Copy sources.list
vagrant provision --provision-with shell
vagrant provision <codename> --provision-with shell

# Stop VMs
vagrant halt
vagrant halt <codename>

# Destroy VMs
vagrant destroy -f
vagrant destroy -f <codename>
```
