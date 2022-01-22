---
archived: true
title: MODX Manager Preview Logouts and Varnish
description: >-
    Varnish rule to prevent caching Manager requests
summary: >-
    Varnish rule to prevent caching Manager requests
anchor: MODX Manager Preview Logouts and Varnish
uri: modx-manager-preview-logouts-and-varnish
heading: MODX Manager Preview Logouts and Varnish
tags:
    - modx
    - varnish
date: "2012-02-11"
jsonld:
    headline: >-
        Varnish rule to prevent caching Manager requests
    datePublished: "2012-02-11"
    dateCreated: "2012-02-11"
    dateModified: "2012-02-11"
---

If you using MODX in a server environment that runs Varnish you may 
experience weird logging out issues, in particular when using the “preview” 
feature from the manager.

This is due to cookie conflicts resulting in MODX forcing a logout and can 
easily be resolved by adding a rule to prevent caching Manager requests under 
`vcl_recv` VCL.

```
sub vcl_recv {
    ...
    # MODX Manager
    if (req.url ~ "^/manager/") {
        return(pass);
    }
    ...
}
```
