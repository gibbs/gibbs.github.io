---
title: PHP Windows Base Directory Library
description: A PHP library to get various Microsoft Windows runtime folder paths.
anchor: Windows Base Directory
uri: php-windows-base-folders
image: assets/images/project-php-windows-base-folders.png
tags:
    - php
    - windows
project:
    repository: https://github.com/gibbs/php-windows-base-dir
date: "2021-04-18"
jsonld:
    datePublished: "2021-04-18"
    dateCreated: "2021-11-18"
    dateModified: "2021-11-18"
---

# PHP Library: Windows Base Directory

![Test Status](https://github.com/gibbs/php-windows-base-dir/actions/workflows/test.yml/badge.svg)

A small PHP library for accessing Windows directory paths.

1. [Example Usage](#goto-example-usage)
2. [API](#goto-api)

[Source available on GitHub]({{ project.repository }}){.button .button--github}

## Example Usage

Install the package via the Composer package manager:

```bash
composer require gibbs/php-windows-base-dir
```

Using the Composer autoloader print all available paths:

```php
<?php
// Path to the Composer autoloader
require __DIR__ . '/vendor/autoload.php';

// Get all paths
$paths = (new WindowsBaseDir\Wbd)->getAllEnvironmentPaths();

// Print
print_r($paths);
```

## API

| Visibility | Function |
|:-----------|:---------|
| public | <strong>getAllEnvironmentPaths()</strong> : <em>array</em><br /><em>An array of all paths with the envvar as key</em> |
| public | <strong>getAllPaths()</strong> : <em>array</em><br /><em>An array of all paths with underscore delimited key names</em> |
| public | <strong>getAllUsersProfilePath()</strong> : <em>string/null</em> |
| public | <strong>getAppDataPath()</strong> : <em>string/null</em> |
| public | <strong>getComSpecPath()</strong> : <em>string/null</em> |
| public | <strong>getCommonProgramFilesPath()</strong> : <em>string/null</em> |
| public | <strong>getCommonProgramFilesX86Path()</strong> : <em>string/null</em> |
| public | <strong>getDriverDataPath()</strong> : <em>string/null</em> |
| public | <strong>getEnvironment()</strong> : <em>string/null</em> |
| public | <strong>getHomeDrive()</strong> : <em>string/null</em> |
| public | <strong>getHomeDrivePath()</strong> : <em>string/null</em> |
| public | <strong>getHomePath()</strong> : <em>string/null</em> |
| public | <strong>getLocalAppDataPath()</strong> : <em>string/null</em> |
| public | <strong>getLogonServerPath()</strong> : <em>string/null</em> |
| public | <strong>getOneDrivePath()</strong> : <em>string/null</em> |
| public | <strong>getPath()</strong> : <em>string/null</em> |
| public | <strong>getPathExt()</strong> : <em>string/null</em> |
| public | <strong>getProgramDataPath()</strong> : <em>string/null</em> |
| public | <strong>getProgramFilesPath()</strong> : <em>string/null</em> |
| public | <strong>getProgramFilesX86Path()</strong> : <em>string/null</em> |
| public | <strong>getPublicPath()</strong> : <em>string/null</em> |
| public | <strong>getSystemDrivePath()</strong> : <em>string/null</em> |
| public | <strong>getSystemRootPath()</strong> : <em>string/null</em> |
| public | <strong>getTempPath()</strong> : <em>string/null</em> |
| public | <strong>getUserDomain()</strong> : <em>string/null</em> |
| public | <strong>getUserDomainRoaminProfile()</strong> : <em>string/null</em> |
| public | <strong>getUserProfilePath()</strong> : <em>string/null</em> |
| public | <strong>getUsername()</strong> : <em>string/null</em> |
| public | <strong>getWindirPath()</strong> : <em>string/null</em> |
| public | <strong>isWindowsEnvironment()</strong> : <em>bool</em><br /><em>Determine if the current runtime environment is Windows</em> |
