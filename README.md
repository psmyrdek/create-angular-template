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

```
const { transformTemplate } = require('create-angular-template');
const angularTemplate = transformTemplate(template, options);
```

## Supported transformations

### Syntax changes:

Based on [AngularJS to Angular Quick Reference CheatSheet](https://angular.io/guide/ajs-quick-reference)

* `ng-click` -> `(click)`
* `ng-submit` -> `(ngSubmit)`
* `ng-hide` -> `[hidden]`
* `ng-class` -> `[ngClass]`
* `ng-show` -> `[hidden] with negation`
* `ng-if` -> `*ngIf`
* `ng-repeat="item in items` -> `*ngFor="let item of items"`

### Additional options:

Strip prefixes:
* `data-ng-if` -> `*ngIf`

Remove 'alias for this' - ($ctrl, vm, etc.):
* `ng-hide="$ctrl.isHidden"` -> `[hidden]="isHidden"`

## Supported formats

* html
* pug
* jade