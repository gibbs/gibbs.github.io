---
archived: true
title: Finding Missing Fonts in GIMP (XCF)
description: >-
    A look at finding missing fonts in GIMP XCF files.
summary: >-
    How to find a missing font in a GIMP XCF file.
anchor: Finding Missing Fonts in GIMP (XCF)
uri: finding-missing-fonts-in-gimp-xcf
heading: Finding Missing Fonts in GIMP (XCF)
tags: [gimp]
date: "2011-08-04"
jsonld:
    headline: >-
        How to find a missing font in a GIMP XCF file.
    datePublished: "2011-08-04"
    dateCreated: "2011-08-04"
    dateModified: "2011-08-04"
---

Have you ever opened up an XCF in GIMP to find that the original font used 
was missing? As far as I can tell GIMP doesn’t give any indication as to the 
font name. The font name itself is stored inside the XCF file as plain text 
though so you can open the XCF and find it.

## Text Editor / Hex Editor

An easy, but not very elegant, method is to open up the file in a text 
editor (such as Kate or Notepad++) or a hex editor. From there you can shift 
through and do a search for 'font'.

## Terminal

There are plenty of ways to do this via a terminal but this is probably the 
easiest:

```bash
grep -aPo 'font "(.*?)"' thefile.xcf
```

To find fonts in multiple XCF files just add a wildcard:

```bash
grep -aPo 'font "(.*?)"' *.xcf
```

Of course you can get creative and recursively search inside a directory, 
return only unique matches etc:

```bash
grep -aPor -m 1 'font "(.*?)"' *.xcf
```

All three commands will output the actual font names and the file they are in.

If anyone knows a more elegant method that can be done inside GIMP itself feel 
free to share in the comments below (although personally the terminal method 
works fine for me and likely much more flexible).
