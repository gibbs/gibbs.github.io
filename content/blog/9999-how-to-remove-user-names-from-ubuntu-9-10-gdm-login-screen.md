---
archived: true
title: Remove Usernames from Ubuntu GDM Login Screen
description: >-
    How to Remove User Names from Ubuntu (9.10+) GDM Login Screen
summary: >-
    If you have lots of users on your Linux system, or are looking for added 
    local security, you might want to remove the user list from the GDM login 
    screen.
anchor: Removing User Names from Ubuntu (9.10+) GDM Login Screen
uri: how-to-remove-user-names-from-ubuntu-9-10-gdm-login-screen
heading: How to Remove User Names from Ubuntu (9.10+) GDM Login Screen
tags: [ubuntu]
date: "2010-10-25"
jsonld:
    headline: >-
        If you have lots of users on your Linux system, or are looking for added 
        local security, you might want to remove the user list from the GDM 
        login screen.
    datePublished: "2010-10-25"
    dateCreated: "2010-10-25"
    dateModified: "2010-10-25"
---

If you have lots of users on your Linux system, or are looking for added local 
security, you might want to remove the user list from the GDM login screen.

GDM has, for a while now, has defaulted to showing usernames at the login 
screen. Instead of actually typing your username you just click it then enter 
the password – very similar to some Windows login screens.

However not everybody wants their usernames shown. To access a computer you 
typically need a username and password. If someone is physically at your 
machine they’re already half way to gaining access if they know your username. 
A lot of Linux systems typically have multiple separate users for FTP, HTTP, 
MySQL etc so the login screen can also get very cluttered.

### Disable usernames from login screen via the terminal

Reverting to the old login screen is easy. One method is to fire up the 
terminal and use:

```bash
sudo -u gdm gconftool-2 --set --type boolean /apps/gdm/simple-greeter/disable_user_list true
```

### Enable usernames from login screen

It can be enabled again by setting it false:

```bash
sudo -u gdm gconftool-2 --set --type boolean /apps/gdm/simple-greeter/disable_user_list false
```

Alternatively (for Ubuntu 10.04+) you can go to 
==System > Preferences > Login Screen== and uncheck Show list of users. You 
will need to unlock it first to make changes.

That’s it. The next time you login you should have to enter your username 
manually as well as your password.
