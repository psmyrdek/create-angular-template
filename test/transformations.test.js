const { transformTemplate } = require('../index');

test('It should strip data- prefix from all attributes by default', () => {

    const template = `
        <div data-ng-click="vm.test()">
            <div data-ng-if="vm.allowed"></div>
        </div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div (click)="vm.test()">
            <div *ngIf="vm.allowed"></div>
        </div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should strip x- prefix from all attributes if given prefix passed', () => {

    const template = `
        <div x-ng-click="vm.test()">
            <div x-ng-if="vm.allowed"></div>
        </div>
    `;

    const transformResult = transformTemplate(template, { stripTagPrefix: 'x' });

    const expectedResult = `
        <div (click)="vm.test()">
            <div *ngIf="vm.allowed"></div>
        </div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-hide to hidden property', () => {

    const template = `
        <div ng-hide="vm.shouldBeHidden"></div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div [hidden]="vm.shouldBeHidden"></div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-hide to hidden property and remove class attribute', () => {

    const template = `
        <div ng-hide="vm.shouldBeHidden" class="ng-hide"></div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div [hidden]="vm.shouldBeHidden"></div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-hide to hidden property and keep class attribute', () => {

    const template1 = `<div ng-hide="vm.hide" class="ng-hide test test-2"></div>`;
    const template2 = `<div ng-hide="vm.hide" class="test ng-hide test-2"></div>`;
    const template3 = `<div ng-hide="vm.hide" class="test test-2 ng-hide"></div>`;

    const transformResult1 = transformTemplate(template1);
    const transformResult2 = transformTemplate(template2);
    const transformResult3 = transformTemplate(template3);

    const result1 = `<div [hidden]="vm.hide" class="test test-2"></div>`;
    const result2 = `<div [hidden]="vm.hide" class="test test-2"></div>`;
    const result3 = `<div [hidden]="vm.hide" class="test test-2"></div>`;

    expect(transformResult1).toEqual(result1);
    expect(transformResult2).toEqual(result2);
    expect(transformResult3).toEqual(result3);

});

test('It should convert ng-show to hidden with negation', () => {

    const template = `
        <div ng-show="vm.showDropdown"></div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div [hidden]="!vm.showDropdown"></div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-repeat to *ngFor', () => {

    const template = `
        <li ng-repeat="item in vm.items"></li>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <li *ngFor="let item of vm.items"></li>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-class to ngClass property', () => {

    const template = `
        <div ng-class="{'is-active': vm.isActive}"></div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div [ngClass]="{'is-active': vm.isActive}"></div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should replace alias for this - controllerAs, ctrl, vm, etc', () => {

    const template = `
        <div ng-class="{'is-active': vm.isActive}">
            <ul>
                <li ng-repeat="item in vm.items">
                    <p ng-if="vm.showDetails">{{ item.details }}</p>
                </li>
            </ul>
        </div>
    `;

    const transformResult = transformTemplate(template, {
        aliasForThis: 'vm'
    });

    const expectedResult = `
        <div [ngClass]="{'is-active': isActive}">
            <ul>
                <li *ngFor="let item of items">
                    <p *ngIf="showDetails">{{ item.details }}</p>
                </li>
            </ul>
        </div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should remove $ctrl as default alias for this', () => {

    const template = `
        <div ng-click="$ctrl.test()">
            <div ng-if="$ctrl.isAllowed"></div>
        </div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div (click)="test()">
            <div *ngIf="isAllowed"></div>
        </div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-model to [(ng-model)]', () => {

    const template = `
        <input type="text" ng-model="$ctrl.profileName">
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <input type="text" [(ngModel)]="profileName">
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-switch to [ngSwitch]', () => {

    const template = `
        <div ng-switch="$ctrl.shouldShowModal">
            <p ng-switch-when="true">
                Modal visible
            </p>
            <p ng-switch-when="false">
                Modal hidden
            </p>
            <p ng-switch-default>
                Default option
            </p>
        </div>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <div [ngSwitch]="shouldShowModal">
            <p *ngSwitchCase="true">
                Modal visible
            </p>
            <p *ngSwitchCase="false">
                Modal hidden
            </p>
            <p *ngSwitchDefault="">
                Default option
            </p>
        </div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-bind-html to [innerHTML]', () => {

    const template = `
        <span ng-bind-html="$ctrl.myValue" class="styled-span"></span>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <span [innerHTML]="myValue" class="styled-span"></span>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-bind to [innerText]', () => {

    const template = `
        <span ng-bind="$ctrl.myValue" class="styled-span"></span>
    `;

    const transformResult = transformTemplate(template);

    const expectedResult = `
        <span [innerText]="myValue" class="styled-span"></span>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-bind to curly braces', () => {

    const template = `
        <span ng-bind="$ctrl.myValue" class="styled-span"></span>
    `;

    const transformResult = transformTemplate(template, {
        bindToCurlyBraces: true
    });

    const expectedResult = `
        <span class="styled-span">{{ myValue }}</span>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-bind with filter to curly braces', () => {

    const template = `
        <span class="styled-span" ng-bind=":: 'binding' | myPipe"></span>
    `;

    const transformResult = transformTemplate(template, {
        bindToCurlyBraces: true
    });

    const expectedResult = `
        <span class="styled-span">{{ 'binding' | myPipe }}</span>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-bind in anchor to curly braces', () => {

    const template = `
        <a class="class-one class-two" href="www.github.com" ng-bind=":: 'translationKey' | i18n"></a>
    `;

    const transformResult = transformTemplate(template, {
        bindToCurlyBraces: true
    });

    const expectedResult = `
        <a class="class-one class-two" href="www.github.com">{{ 'translationKey' | i18n }}</a>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-bind in button to curly braces', () => {

    const template = `
        <button type="button" ng-bind="$ctrl.buttonLabel" ng-click="$ctrl.clickMe()"></button>
    `;

    const transformResult = transformTemplate(template, {
        bindToCurlyBraces: true
    });

    const expectedResult = `
        <button type="button" (click)="clickMe()">{{ buttonLabel }}</button>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should remove classes based on parameter', () => {

    const template = `
        <div class="one two three"></div>
    `;

    const transformResult = transformTemplate(template, {
        classListToRemove: ['two', 'three']
    });

    const expectedResult = `
        <div class="one"></div>
    `;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-href to [href]', () => {

    const template = `<a ng-href="{{ $ctrl.linkToMyProfile }}">My Profile</a>`;

    const transformResult = transformTemplate(template);

    const expectedResult = `<a [href]="linkToMyProfile">My Profile</a>`;

    expect(transformResult).toEqual(expectedResult);

});

test('It should convert ng-src to [src]', () => {

    const template = `<img ng-src="{{ $ctrl.myImageUrl }}">`;

    const transformResult = transformTemplate(template);

    const expectedResult = `<img [src]="myImageUrl">`;

    expect(transformResult).toEqual(expectedResult);

});