---
archived: true
title: Text-based location (address) bar Ubuntu Lucid Lynx
description: >-
    Three different ways to work around the new Nautilus location bar
summary: >-
    Three different ways to work around the new Nautilus location bar
anchor: Text-based location (address) bar Ubuntu Lucid Lynx
uri: text-based-location-address-bar-ubuntu-lucid-lynx
heading: Text-based location (address) bar Ubuntu Lucid Lynx
tags:
    - ubuntu
    - nautilus
date: "2010-05-03"
jsonld:
    headline: >-
        The latest installment of GNOME (that comes with Ubuntu Lucid Lynx) 
        doesn't have the pencil icon to toggle the location bar mode. Here's 
        three different ways to work around that by using shortcuts or making 
        permanent changes to Nautilus.
    datePublished: "2010-05-03"
    dateCreated: "2010-05-03"
    dateModified: "2010-05-03"
---

One of the first things I noticed when using the latest GNOME GUI on Ubuntu 
Lucid Lynx was that there was no button to change the location bar from 
button based to text based.

In older version you had a “pencil” icon in Nautilus that allowed you to switch 
back freely but it’s now been removed. Unfortunately there is no standard 
method of reverting to the pencil icon.

There are two ways you can. To instantly toggle between button-mode and 
text-mode use ==CTRL+L==.

If, like me, you never use button mode you can set the location to text mode 
permenantly via the gconf editor. The easiest way to do this is to 
==ALT+F2==, type in `gconf-editor` and hit Run.

In the configuration editor go to `apps > nautilus > preferences` then tick 
(check) **always_use_location_entry**. With that checked you’ll permenantly 
have the text based location bar.

You can also use `/` to open up a fresh (empty) location bar.
