---
archived: >-
    This post is old and archived. The method shown stopped working a long 
    time ago!
title: GNOME 3 Shell YouTube Search Provider
description: >-
    YouTube search provider support example for GNOME 3
summary: >-
    YouTube search support for GNOME 3
anchor: GNOME 3 Shell YouTube Search Provider 
uri: gnome-3-youtube-search-provider
heading: GNOME 3 YouTube Search Provider
tags:
    - gnome
date: "2011-04-22"
jsonld:
    headline: >-
        YouTube search support for GNOME 3
    datePublished: "2011-04-22"
    dateCreated: "2011-04-22"
    dateModified: "2011-04-22"
---

[This XML file](/apps/gnome/youtube.xml) adds a search button for YouTube in 
GNOME 3.

To install you need to download the 
[YouTube XML file](/apps/gnome/youtube.xml), move it to 
`/usr/share/gnome-shell/search_providers/` and restart the gnome shell.

This can be done easily via the terminal with:

```bash
wget https://dangibbs.uk/apps/gnome/youtube.xml
sudo mv youtube.xml /usr/share/gnome-shell/search_providers/
```

Finally you need to restart the gnome shell by using ==ALT+F2== and entering 
`restart`.

## How to search in Gnome 3

If you aren’t familiar with how to search using Gnome 3 then here’s a 
brief overview. First of all you need to enter the ==Activities Overview== by 
either moving your mouse cursor to the top left of the screen, clicking 
==Activities== in the top left of the screen or by using the special key.

Once you are in “Activites mode” you can start typing your search query 
straight away. At the bottom of the screen are buttons of search providers 
you can use which, by default, includes Google and Wikipedia. If the default 
search provider, which is highlighted, is what you want to use you can just 
hit enter instead of clicking a button.
