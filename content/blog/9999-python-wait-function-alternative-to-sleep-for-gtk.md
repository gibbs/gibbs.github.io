---
archived: true
title: Python Wait Function – Alternative to Sleep for GTK
description: >-
    A quick wait function that replaces the sleep function for PyGTK.
summary: >-
    A quick wait function that replaces the sleep function for PyGTK.
anchor: Python Wait Function – Alternative to Sleep for GTK
uri: python-wait-function-alternative-to-sleep-for-gtk
heading: Python Wait Function – Alternative to Sleep for GTK
tags: [python, pygtk, gtk]
date: "2010-09-16"
jsonld:
    headline: >-
        A quick wait function that replaces the sleep function. It runs 
        through a loop for the specified amount of time doing nothing. This 
        stops hanging and unresponsive interfaces for things such as GTK.
    datePublished: "2010-09-16"
    dateCreated: "2010-09-16"
    dateModified: "2010-09-16"
---

I hate sleep functions. In GTK, for example, they lock the UI making it 
unusable and even make some systems think that the program is hanging 
(which in essence it is). Here is a quick “wait” function written in Python.

As I was waiting for something to install I came up with this idea and quickly 
decided to write it. Instead of sleeping it runs an unproductive while loop. 
This has so far stopped programs and UI such as GTK locking up.

### GTK Example

```python
def wait(time_lapse):
	time_start = time.time()
	time_end = (time_start + time_lapse)

	while time_end > time.time():
		while gtk.events_pending():
			gtk.main_iteration()
```
