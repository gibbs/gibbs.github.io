---
title: PHP Windows Base Directory Library
description: >-
    PHP library to get various Microsoft Windows runtime folder paths.
summary: >-
    A PHP 7.4+ library to get common runtime environment variable paths for 
    Microsoft Windows environments.
anchor: Windows Base Directory
uri: php-windows-base-folders
image:
    src: assets/images/projects/php-windows-base-folders.png
    caption: PHP and Windows logos.
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
    sameAs:
        - https://github.com/gibbs/php-windows-base-dir
        - https://packagist.org/packages/gibbs/php-windows-base-dir
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

Using the Composer autoloader, print all available paths:

```php
// Path to the Composer autoloader
require __DIR__ . '/vendor/autoload.php';

// Get all paths
$paths = (new WindowsBaseDir\Wbd)->getAllEnvironmentPaths();

// Print
print_r($paths);
```

## API

<div class="table">
  <table>
    <thead>
      <tr>
        <th scope="col">Visibility</th>
        <th scope="col">Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>public</td>
        <td>
          <strong>getAllEnvironmentPaths()</strong> : <em>array</em>
          <br>
          <em>An array of all paths with the envvar as key</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getAllPaths()</strong> : <em>array</em>
          <br>
          <em>An array of all paths with underscore delimited key names</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getAllUsersProfilePath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getAppDataPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getComSpecPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getCommonProgramFilesPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getCommonProgramFilesX86Path()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getDriverDataPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getEnvironment()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getHomeDrive()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getHomeDrivePath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getHomePath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getLocalAppDataPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getLogonServerPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getOneDrivePath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getPathExt()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getProgramDataPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getProgramFilesPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getProgramFilesX86Path()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getPublicPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getSystemDrivePath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getSystemRootPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getTempPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getUserDomain()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getUserDomainRoaminProfile()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getUserProfilePath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getUsername()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>getWindirPath()</strong> : <em>string/null</em>
        </td>
      </tr>
      <tr>
        <td>public</td>
        <td>
          <strong>isWindowsEnvironment()</strong> : <em>bool</em>
          <br>
          <em>Determine if the current runtime environment is Windows</em>
        </td>
      </tr>
    </tbody>
  </table>
</div>
