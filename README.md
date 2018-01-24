# Create Angular Template

[![Greenkeeper badge](https://badges.greenkeeper.io/psmyrdek/create-angular-template.svg)](https://greenkeeper.io/)
[![Build - Master](https://travis-ci.org/psmyrdek/create-angular-template.svg?branch=master)](https://travis-ci.org/psmyrdek/create-angular-template)
[![Coverage Status](https://coveralls.io/repos/github/psmyrdek/create-angular-template/badge.svg?branch=master)](https://coveralls.io/github/psmyrdek/create-angular-template?branch=master)
[![Latest version](https://img.shields.io/npm/v/create-angular-template.svg)]()

Transform AngularJS templates into Angular syntax. Currently supports Angular 5.x.

## How it works

Before:

```
<div>
    <p ng-if="vm.showDetails">Some details</p>
    <ul>
        <li ng-repeat="item in vm.items"></li>
    </ul>
</div>
```

After:

```
<div>
    <p *ngIf="showDetails">Some details</p>
    <ul>
        <li *ngFor="let item of items"></li>
    </ul>
</div>
```

## Usage

### Installation

Install `create-angular-template` as typical npm package:

`npm install create-angular-template`

### Basic usage:

```
const { transformTemplate } = require('create-angular-template');
const angularTemplate = transformTemplate(template, options);
```

* template (string) - AngularJS template
* options (object) - configure transformation process

### Options:

* `stripTagPrefix` (string) - used to strip prefixes like `data-ng-if` *(default: `data`)*
* `aliasForThis` (string) - used in AngularJS to define scope of given variable *(default: `$ctrl`)*
* `format` (string) - format of input template *(default: `html`, supported: html | pug | jade)*
* `bindToCurlyBraces` (boolean) - transform ng-bind to curly braces binding *(default: `false`)*
* `classListToRemove` (array) - array of classes which should be removed from elements *(default: `['ng-hide']`)*

## Supported transformations

### Syntax changes:

Based on [AngularJS to Angular Quick Reference CheatSheet](https://angular.io/guide/ajs-quick-reference)

* `ng-click` -> `(click)`
* `ng-submit` -> `(ngSubmit)`
* `ng-model` -> `[(ngModel)]`
* `ng-if` -> `*ngIf`
* `ng-switch` -> `[ngSwitch]`
* `ng-switch-when` -> `*ngSwitchCase`
* `ng-switch-default` -> `*ngSwitchDefault`
* `ng-class` -> `[ngClass]`
* `ng-hide` -> `[hidden]`
* `ng-show` -> `[hidden] with negation`
* `ng-bind` -> `[innerText]` (by default), or `{{ }}` (option `bindToCurlyBraces` set to `true`)
* `ng-bind-html` -> `[innerHTML]`
* `ng-hide` -> `[hidden]`
* `ng-repeat="item in items"` -> `*ngFor="let item of items"`
* `ng-href` -> `[href]`
* `ng-src` -> `[src]`

### Extras:

Prefixes cleanup:
* `data-ng-if` -> `*ngIf`
* `x-ng-hide` -> `[hidden]`

'Alias for this' cleanup - ($ctrl, vm, etc.):
* `ng-hide="$ctrl.isHidden"` -> `[hidden]="isHidden"`

### Would you like to see CLI here? Check Up!:

[ng-up](https://www.npmjs.com/package/ng-up) - Angular Upgrade Toolkit
