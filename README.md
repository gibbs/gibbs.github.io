# dangibbs.uk

![Tests](https://github.com/gibbs/gibbs.github.io/actions/workflows/test.yml/badge.svg)
![Deploy](https://github.com/gibbs/gibbs.github.io/actions/workflows/deploy.yml/badge.svg)
![Version](https://img.shields.io/github/package-json/v/gibbs/gibbs.github.io)
![Size](https://img.shields.io/github/repo-size/gibbs/gibbs.github.io)

Personal website built with Astro and Prismic.

## Build

```bash
npm run build
```

## Develop

```bash
npm run dev
```

## Docker Environments

Service dependencies can be run locally with `compose-dev.yaml`

```bash
docker compose -f compose-dev.yaml up -d
```

## Testing

```bash
npm run test:e2e
npm run test:unit
```

## Submodule Updates

Submodules are used for including documentation, references and
changelogs from other repositories.

```bash
git submodule update --recursive --remote
```
