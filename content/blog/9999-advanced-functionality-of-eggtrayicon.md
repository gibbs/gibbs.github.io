---
archived: true
title: PyGTK Tutorial – Advanced functionality of EggTrayIcon
description: >-
    Advanced functionality of EggTrayIcon in Python.
summary: >-
    Advanced functionality of EggTrayIcon in Python.
anchor: PyGTK Tutorial – Advanced functionality of EggTrayIcon
uri: advanced-functionality-of-eggtrayicon
heading: PyGTK Tutorial – Advanced functionality of EggTrayIcon
tags:
    - python
    - pygtk
    - gtk
date: "2011-03-31"
jsonld:
    headline: >-
        Advanced functionality of EggTrayIcon in Python.
    datePublished: "2011-03-31"
    dateCreated: "2011-03-31"
    dateModified: "2011-03-31"
---

EggTrayIcon provides a StatusIcon style widget with advanced functionality. 
It is displayed in the Notification Area / Taskbar of the desktop and can be 
used to position widgets such as Buttons.

## Example

```python
#! /usr/bin/python

import gtk
try:
    import egg.trayicon
except:
    print "You need to install the python-eggtrayicon package"

class EggTrayIcon:
    def __init__(self):
        self.tray = egg.trayicon.TrayIcon("TrayIcon")

        eventbox = gtk.EventBox()
        image = gtk.Image()
        image.set_from_stock(gtk.STOCK_HOME, gtk.ICON_SIZE_SMALL_TOOLBAR)

        eventbox.connect("button-press-event", self.icon_clicked)

        eventbox.add(image)
        self.tray.add(eventbox)
        self.tray.show_all()

    def icon_clicked(self, widget, event):
        if event.button == 3:
            menu = gtk.Menu()
            menuitem_about = gtk.MenuItem("About")
            menuitem_exit = gtk.MenuItem("Exit")
            menu.append(menuitem_about)
            menu.append(menuitem_exit)
            menuitem_about.connect("activate", self.aboutdialog)
            menuitem_exit.connect("activate", lambda w: gtk.main_quit())
            menu.show_all()
            menu.popup(None, None, None, event.button, event.time, self.tray)

    def aboutdialog(self, widget):
        aboutdialog = gtk.AboutDialog()
        aboutdialog.set_name("EggTrayIcon")
        aboutdialog.set_version("1.0")

        aboutdialog.run()
        aboutdialog.destroy()

EggTrayIcon()
gtk.main()
```
