#!/usr/bin/env bash

source /etc/os-release || exit 1

DISTRO=$(echo "${ID}" | awk '{print tolower($0)}')
SOURCE_PATH="/vagrant/sources/${DISTRO}-${VERSION_CODENAME}.list"

sudo cp -f /etc/apt/sources.list "${SOURCE_PATH}"
