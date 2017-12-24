# Create Angular Template

Transform AngularJS templates into Angular syntax. Currently supports Angular 5.1.x.

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
* `format` (string) - format of input template *(default: `html`)*
* `bindToCurlyBraces` (boolean) - transform ng-bind to curly braces binding *(default: `false`)*

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

### Additional options:

Strip prefixes:
* `data-ng-if` -> `*ngIf`

Remove 'alias for this' - ($ctrl, vm, etc.):
* `ng-hide="$ctrl.isHidden"` -> `[hidden]="isHidden"`

## Supported formats

* html
* pug
* jade