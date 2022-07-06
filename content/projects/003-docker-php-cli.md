---
title: Docker Multi PHP CLI
description: >-
    A minimal PHP CLI Docker image for local development and CI/CD pipelines.
summary: >-
    A small PHP CLI Docker image useful for build pipelines and local 
    testing. Based on Debian and frequently updated for PHP 5.6, 7.0, 7.1, 7.2, 
    7.3, 7.4, 8.0 and 8.1.
anchor: Docker PHP CLI
uri: docker-php-cli
heading: 'Docker: PHP CLI'
image:
    src: images/projects/docker.png
    caption: Docker logo graphic.
tags:
    - docker
    - php
project:
    repository: https://github.com/gibbs/docker-php-cli
    dockerhub: https://hub.docker.com/r/genv/php-cli
date: "2021-11-20"
jsonld:
    datePublished: "2021-07-06"
    dateCreated: "2021-07-06"
    dateModified: "2021-07-06"
    sameAs:
        - https://hub.docker.com/r/genv/php-cli
        - https://github.com/gibbs/docker-php-cli
badges:
    - text: Build Status
      src: https://github.com/gibbs/docker-php-cli/actions/workflows/build.yml/badge.svg
      url: https://github.com/Gibbs/docker-php-cli/actions
---

The `genv/php-cli` Docker images contain multiple PHP CLI versions that can
be used for local testing, development and CI/CD pipelines. These images are 
intended to be minimal with a small footprint and are typically between ~55 MB 
and ~70 MB in size.

Images are frequently built on various Debian releases to provide all major 
releases and security updates after 5.6. Old, unsupported, PHP versions are 
still provided, allowing work to be performed on legacy codebases and old 
library versions. Tags are available for PHP versions 5.6, 7.0, 7.1, 7.2, 7.3, 
7.4, 8.0 and 8.1 with the Composer package manager being included in all 
releases.

1. [Getting Started](#goto-getting-started)
2. [Execute Files](#goto-execute-files)
3. [Using Composer](#goto-using-composer)
4. [Updating Images](#goto-updating-images)
5. [Github Workflow Example](#goto-github-workflow-example)
6. [BitBucket Pipelines Example](#goto-bitbucket-pipelines-example)

[View on Docker Hub]({{ project.dockerhub }}){.button .button--image .button--docker}
[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

## Example Usage

### Getting Started

The quickest way to run the CLI is to print the version. To check with PHP 5.6;

```bash
docker run genv/php-cli:5.6 --version
```

This will return the CLI version and build date:

> PHP 5.6.40-0+deb8u12 (cli) (built: Jun 28 2020 09:37:30)

A list of modules available can be displayed with;

```bash
docker run genv/php-cli:5.6 -m
```

Run code directly;

```bash
docker run genv/php-cli:5.6 -r 'print_r(new DateTime);'
```

### Execute Files

To execute a file, you will need to use a docker volume. PHP will execute scripts
in the container path `/data/` by default.

Use the current working directory and execute a PHP script from a relative path:

```bash
# Create a PHP file in the current working directory
echo '<?php print_r(get_defined_constants());' > ./test.php

# Run the created file
docker run -v "$(pwd):/data/" genv/php-cli:5.6 test.php
```

Alternatively provide an absolute path to `/data/test.php`:

```bash
docker run -v "$(pwd):/data/" genv/php-cli:5.6 /data/test.php
```

### Using Composer

Using Composer via Docker can allow you to install packages locked in upstream
for a PHP version you don't have installed. This is useful if you need to run or 
test against older or newer versions.

```bash
docker run genv/php-cli:5.6 /usr/local/bin/composer --version
```

Alternatively you can set the Docker entrypoint to composer with:

```bash
docker run --entrypoint=composer genv/php-cli:5.6 --version
```

To install Composer packages in a project using 7.1, which reached its End of 
Life on the 1st of December 2019;

```bash
docker run genv/php-cli:7.1 /usr/local/bin/composer install
```

Init Composer with Docker in PHP 8.0 with interactive mode;

```bash
docker run -it --entrypoint=composer -v "$(pwd):/data/" genv/php-cli:8.0 init
```

### Updating Images

Images are built periodically and manually triggered when releases are 
announced by the PHP development team. Pulling the tag should update the image:

```bash
# Get the current version
docker run genv/php-cli:8.0 -v

# Pull the latest image
docker image pull genv/php-cli:8.0
```

> PHP 8.0.12 (cli) (built: Oct 22 2021 12:37:40) ( NTS )

Becomes;

> PHP 8.0.13 (cli) (built: Nov 19 2021 06:41:58) ( NTS )


### Github Workflow Example

The following workflow example will;

- Run on merge requests to the `main` branch
- Install Composer packages with PHP 8.0
- Run PHPUnit against all test files in the repositories `test` directory

{% raw %}
```yaml
# .github/workflows/example.yml
name: Tests

on:
  pull_request:
    branches:
      - 'main'

jobs:
  test:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
      - uses: addnab/docker-run-action@v3
        with:
          image: genv/php-cli:8.0
          options: -v ${{ github.workspace }}:/data/
          run: |
            /usr/local/bin/composer install
            vendor/bin/phpunit test/
```
{% endraw %}

### BitBucket Pipelines Example

The following pipeline will;

- Run on commits to the `main` branch
- Install Composer packages with PHP 7.2
- Run PHPUnit against all test files in the repositories `test` directory

```yaml
image: node:12.20

pipelines:
  branches:
    master:
      name: PHPUnit Tests
      image: genv/php-cli:7.2
      caches:
        - docker
      services:
        - docker
      script:
         - docker run -v "$BITBUCKET_CLONE_DIR:/data/" --entrypoint composer genv/php-cli:7.2 install
         - docker run -v "$BITBUCKET_CLONE_DIR:/data/" genv/php-cli:7.2 /data/test/
```
