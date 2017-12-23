const { transformTemplate } = require('../lib/index');

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