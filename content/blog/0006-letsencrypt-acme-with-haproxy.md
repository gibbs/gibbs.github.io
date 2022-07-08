---
title: Let's Encrypt Standalone ACME with HAProxy
description: >-
    Using Let's Encrypt standalone mode with HAProxy to issue and renew 
    certificates.
summary: >-
    Using HAProxy to route Let's Encrypt HTTP challenges in standalone mode.
anchor: Let's Encrypt ACME with HAProxy
uri: letsencrypt-acme-with-haproxy
heading: Let's Encrypt Standalone ACME with HAProxy
# image:
#     src: images/blog/puppet-pi.png
#     caption: puppet 7 raspberry pi
tags:
    - haproxy
    - letsencrypt
date: "2022-04-11"
jsonld:
    headline: "Let's Encrypt ACME with HAProxy"
    datePublished: "2022-04-11"
    dateCreated: "2022-04-11"
    dateModified: "2022-07-08"
---

HAProxy can be used to flexibly manage multiple Let's Encrypt certificates. This
 is useful when reverse proxying microservices without the need for a web server
 or exposing `certbot` publicly.

- [Challenge ACL](#goto-challenge-acl)
- [HAProxy Deploy Hook](#goto-ha-proxy-deploy-hook)
- [Certbot Example](#goto-certbot-example)

## Challenge ACL

The following example creates an ACME challenge ACL that is excluded from an 
example HTTPS redirect and routes `/.well-known/acme-challenge/` requests to a 
`certbot` backend.

```nginx [g1:Frontend]
frontend default
  bind 0.0.0.0:443 ssl crt /etc/ssl/haproxy/
  bind 0.0.0.0:80
  mode http

  # Redirect non-ACME challenges to HTTPS
  http-request redirect scheme https code 301 if !{ ssl_fc } !is_acme_challenge
  http-request set-header X-Forwarded-Proto "https"
  http-request set-header X-Forwarded-Port "443"

  # HSTS header
  http-response set-header Strict-Transport-Security max-age=63072000

  # ACME challenge ACL
  acl is_acme_challenge path_beg /.well-known/acme-challenge/

  # ACME challenge backend
  use_backend certbot if is_acme_challenge
```

```nginx [g1:Backend]
backend certbot
  mode http
  server local 127.0.0.1:10081
```

## HAProxy Deploy Hook

If the certificate is intended to be used by HAProxy itself, a deploy hook can
be used with `certbot` to create a compatible PEM file.

```bash
# /opt/certbot/example.tld.sh
cat /etc/letsencrypt/live/example.tld/fullchain.pem /etc/letsencrypt/live/example.tld/privkey.pem | tee /etc/ssl/haproxy/example.tld.pem
```

## Certbot Example

Using standalone mode, the following will listen on `127.0.0.1:10081` for HTTP
challenges. HTTP requests to `/.well-known/acme-challenge/` will be routed to
the `certbot` backend by HAProxy.

```bash
#!/bin/sh
certbot -a standalone \
    --cert-name 'example.tld' -d 'example.tld' \
    --deploy-hook "/opt/certbot/example.tld.sh" \
    --http-01-address 127.0.0.1 --http-01-port 10081 --preferred-challenges http-01 \
    --keep-until-expiring --text --agree-tos --non-interactive certonly \
    --rsa-key-size 4096 \
    && (systemctl restart haproxy)
```
