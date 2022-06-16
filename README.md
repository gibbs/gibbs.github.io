# dangibbs.uk

![Build](https://github.com/gibbs/gibbs.github.io/actions/workflows/deploy.yml/badge.svg)
![Tests](https://github.com/gibbs/gibbs.github.io/actions/workflows/test.yml/badge.svg)
![Version](https://img.shields.io/github/package-json/v/gibbs/gibbs.github.io)
![Size](https://img.shields.io/github/repo-size/gibbs/gibbs.github.io)

Personal static website repository built with 
[Eleventy](https://github.com/11ty/eleventy).

## Build

Production builds are committed to the `gh-pages` branch by the `deploy` 
workflow. This is triggered on push and pull requests to the `master` 
branch.

To build locally to the `docs` directory use:

```bash
npm run build
```

## Develop

Run the 11ty web server:

```bash
npm run serve
```

## Lint

Lint javascript, website frontmatter and YAML files:

```bash
npm run lint

# Individually
npm run lint:frontmatter
npm run lint:js
npm run lint:yaml
```

## Test

Run the full test suite:

```bash
npm run test

# Individually
npm run test:acceptance
npm run test:e2e
```

For a full list of commands use `npm run`
