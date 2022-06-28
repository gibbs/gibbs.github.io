---
archived: true
title: Insecure Directory Error in Postgres
description: >-
    PostgreSQL Insecure directory in $ENV{PATH} error.
summary: >-
    PostgreSQL Insecure directory in $ENV{PATH} error.
anchor: PostgreSQL Insecure directory in $ENV{PATH} error
uri: insecure-directory-in-envpath-while-running-with-t-switch-at-usrbinpg_ctlcluster
heading: Insecure directory in $ENV{PATH} while running with -T switch at /usr/bin/pg_ctlcluster
tags: [ubuntu, postgresql]
date: "2010-09-04"
jsonld:
    headline: >-
        PostgreSQL Insecure directory in $ENV{PATH} error
    datePublished: "2010-09-04"
    dateCreated: "2010-09-04"
    dateModified: "2010-09-04"
---

I received this error with PostgreSQL when using APT on Ubuntu Server 10.04. 
I still don’t know what triggered it (most likely permission related) but 
here’s an a quick cleanup.

Exact error output:

```bash
Preparing to replace postgresql-8.4 8.4.3-1 (using .../postgresql-8.4_8.4.3-1_amd64.deb) ...
 * Stopping PostgreSQL 8.4 database server
 * Insecure directory in $ENV{PATH} while running with -T switch at /usr/bin/pg_ctlcluster line 63.
                                                                                                                                                                                                      [fail]
invoke-rc.d: initscript postgresql-8.4, action "stop" failed.
dpkg: warning: old pre-removal script returned error exit status 9
dpkg - trying script from the new package instead ...
 * Stopping PostgreSQL 8.4 database server
 * Insecure directory in $ENV{PATH} while running with -T switch at /usr/bin/pg_ctlcluster line 63.
                                                                                                                                                                                                      [fail]
invoke-rc.d: initscript postgresql-8.4, action "stop" failed.
dpkg: error processing /var/cache/apt/archives/postgresql-8.4_8.4.3-1_amd64.deb (--unpack):
 subprocess new pre-removal script returned error exit status 9
 * Starting PostgreSQL 8.4 database server
 * Insecure directory in $ENV{PATH} while running with -T switch at /usr/bin/pg_ctlcluster line 63.
                                                                                                                                                                                                      [fail]
invoke-rc.d: initscript postgresql-8.4, action "start" failed.
dpkg: error while cleaning up:
 subprocess installed post-installation script returned error exit status 9
Errors were encountered while processing:
 /var/cache/apt/archives/postgresql-8.4_8.4.3-1_amd64.deb
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

To clean this up remove the postmaster and reset the group and general 
permissions.

```bash
sudo rm /var/lib/postgresql/8.4/main/postmaster.pid
sudo chown postgres:postgres /etc/postgresql/8.4/main/environment
sudo chmod u+rw,g+rw /etc/postgresql/8.4/main/environment
```
