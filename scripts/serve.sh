#!/usr/bin/env bash

# Provision
scripts/provision.sh

# Serve
SCRIPTY_PARALLEL=true scripts/serve/assets &
scripts/serve/build
SCRIPTY_PARALLEL=true scripts/serve/watch
