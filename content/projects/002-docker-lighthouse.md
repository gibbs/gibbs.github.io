---
title: Lighthouse Docker Image
description: >-
    An open source Lighthouse Docker image with the Chromium web browser.
summary: >-
    A frequently updated Docker image providing Google Lighthouse audits 
    and reporting using open source packages.
anchor: Docker Lighthouse
uri: docker-lighthouse
image:
    src: images/projects/docker.png
    caption: Docker logo graphic.
tags:
    - docker
    - lighthouse
project:
    repository: https://github.com/gibbs/docker-lighthouse
    dockerhub: https://hub.docker.com/r/genv/lighthouse
date: "2021-05-08"
jsonld:
    datePublished: "2021-05-08"
    dateCreated: "2021-05-08"
    dateModified: "2021-05-08"
    sameAs:
        - https://github.com/gibbs/docker-lighthouse
        - https://hub.docker.com/r/genv/lighthouse
---

# Docker Lighthouse

![Build Status](https://github.com/Gibbs/docker-lighthouse/actions/workflows/build.yml/badge.svg)

A Docker image of the latest 
[Lighthouse](https://developers.google.com/web/tools/lighthouse) builds. This 
image is focused on being entirely open source by being built on Debian and 
using the Chromium web browser with open fonts.

This image is useful for parsing and automating the generation of Lighthouse 
reports.

1. [Generate a HTML Report](#goto-generate-a-html-report)
2. [Lighthouse Score in JSON](#goto-lighthouse-score-in-json)
3. [JSON Reports](#goto-json-reports)
4. [Multiple Reports](#goto-multiple-reports)
5. [Generating Host Reports](#goto-generating-host-reports)
6. [All Options](#goto-all-options)

[View on Docker Hub]({{ project.dockerhub }}){.button .button--image .button--docker}
[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

## Usage

Get the latest Lighthouse image:

```bash
docker run genv/lighthouse:latest --version
```

Or a specific version from 8.0.0 onwards:

```bash
docker run genv/lighthouse:8.5.0 --version
```

Running Lighthouse requires runtime privileges to be passed to Docker. This can
be done by passing `--cap-add=SYS_ADMIN` for each command.

### Generate a HTML Report

Reports are generated in the container under `/home/lighthouse/reports/`. Using
a volume, reports can be written to the host's current working directory with:

```bash
docker run --cap-add=SYS_ADMIN -v "$(pwd):/home/lighthouse/reports/" genv/lighthouse:latest https://example.com/
```

### Lighthouse Score in JSON

Reports can be returned in JSON. Combined with a tool like jq you can get only
the scores with:

```bash
docker run --cap-add=SYS_ADMIN genv/lighthouse https://example.com/ --output=json | jq "[.categories[] | {title: .title, score: .score }]"
```

This will return something similar to:

```json
[
  {
    "title": "Performance",
    "score": 1
  },
  {
    "title": "Accessibility",
    "score": 0.92
  },
  {
    "title": "Best Practices",
    "score": 1
  },
  {
    "title": "SEO",
    "score": 0.91
  },
  {
    "title": "PWA",
    "score": 0.3
  }
]
```

### JSON Reports

Using stdout with a volume, you can save full JSON reports;

```bash
docker run --cap-add=SYS_ADMIN genv/lighthouse https://example.com/ --output=json --output-path=stdout > $(date +%s)_report.json
```

### Multiple Reports

Reports can be generated in HTML, CSV and JSON. To create multiple reports,
set the `--output` flag and use a volume in the current working directory:

```bash
docker run -v "$(pwd):/home/lighthouse/reports/" --cap-add=SYS_ADMIN genv/lighthouse https://example.com/ --output=csv,json,html
```

### Generating Host Reports

To create a report for the host machine running in port 8080 (172.17.0.1 is 
typically the IP on Linux hosts);

```bash
docker run --cap-add=SYS_ADMIN -v "$(pwd):/home/lighthouse/reports/" genv/lighthouse:latest http://172.17.0.1:8080/
```

Alternatively, a wildcard DNS service like [nip.io](https://nip.io/) should work
for testing other sites within your local network.

### All Options

For a full list of options available:

```bash
docker run genv/lighthouse --help
```
