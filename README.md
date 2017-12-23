# Create Angular Template

Transform AngularJS templates into Angular syntax

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
        <li *ngFor="item in items"></li>
    </ul>
</div>
```

## Supported transformations

### Syntax changes:

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