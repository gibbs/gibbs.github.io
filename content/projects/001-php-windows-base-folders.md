---
title: PHP Windows Base Directory Library
description: >-
    PHP library to get various Microsoft Windows runtime folder paths.
summary: >-
    A PHP 7.4+ library to get common runtime environment variable paths for 
    Microsoft Windows environments.
anchor: Windows Base Directory
uri: php-windows-base-folders
heading: 'PHP Library: Windows Base Directory'
image:
    src: images/projects/php.png
    caption: PHP logo graphic.
tags:
    - php
    - windows
project:
    repository: https://github.com/gibbs/php-windows-base-dir
date: "2021-04-18"
jsonld:
    datePublished: "2021-04-18"
    dateCreated: "2021-11-18"
    dateModified: "2022-11-05"
    sameAs:
        - https://github.com/gibbs/php-windows-base-dir
        - https://packagist.org/packages/gibbs/php-windows-base-dir
badges:
    - text: Test Status
      src: https://github.com/gibbs/php-windows-base-dir/actions/workflows/test.yml/badge.svg
      url: https://github.com/gibbs/php-windows-base-dir/actions/
---

A small PHP library for accessing Windows directory paths.

1. [Example Usage](#goto-example-usage)
2. [Installation](#goto-installation)
3. [API](#goto-api)

[Source available on GitHub]({{ project.repository }}){.button .button--image .button--github}

## Installation

Install the package with [Composer][composer]:

```bash
composer require gibbs/php-windows-base-dir
```

## Example Usage

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

[composer]: <https://getcomposer.org/> "Composer dependency manager for PHP"
