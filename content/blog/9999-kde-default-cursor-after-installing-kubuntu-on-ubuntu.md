---
archived: true
title: KDE Default Cursor After Installing Kubuntu on Ubuntu
description: >-
    How to change the cursor theme back to default after installing Kubuntu
    from Ubuntu.
summary: >-
    How to change the cursor theme back to default after installing Kubuntu 
    from Ubuntu.
anchor: KDE Default Cursor After Installing Kubuntu on Ubuntu
uri: kde-default-cursor-after-installing-kubuntu-on-ubuntu
heading: KDE Default Cursor After Installing Kubuntu on Ubuntu
tags:
    - ubuntu
    - kde
date: "2010-01-17"
jsonld:
    headline: >-
        How to change the cursor theme back to default after installing Kubuntu 
        from Ubuntu.
    datePublished: "2010-01-17"
    dateCreated: "2010-01-17"
    dateModified: "2010-01-17"
---

When you install Kubuntu from inside Ubuntu KDE will automatically overwrite 
the default (Ubuntu) cursor theme. If you use GDM a lot you’ll probably want to 
revert back.

## KDE and GDM cursors on Ubuntu

This will require you to restart GDM which will log you out so finish what 
you’re doing. Then fire up the terminal 
==Applications > Accessories > Terminal== and enter the following command:

```bash
sudo update-alternatives --config x-cursor-theme
```

The default Ubuntu cursor theme is `DMZ-White/cursor.theme` (typically listed 
as `/usr/share/icons/DMZ-White/cursor.theme`)

Enter the selection number to the left and hit Enter.

Now you’ll need to restart GDM for it to take effect. Via the terminal enter:

```bash
sudo /etc/init.d/gdm restart
```

You will be logged out and the once GDM starts again you should have the 
default cursor theme back.
