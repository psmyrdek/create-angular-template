const basicRules = [
    {
        pattern: /ng-click/g,
        replacement: '(click)'
    },
    {
        pattern: /ng-submit/g,
        replacement: '(ngSubmit)'
    },
    {
        pattern: /ng-class/g, 
        replacement: '[ngClass]'
    },
    {
        pattern: /ng-hide/g, 
        replacement: '[hidden]'
    },
    {
        pattern: /ng-show="/g, 
        replacement: '[hidden]="!'
    },
    {
        pattern: /ng-model/g, 
        replacement: '[(ngModel)]'
    },
    {
        pattern: /ng-switch=/g, 
        replacement: '[ngSwitch]='
    },
    {
        pattern: /ng-switch-when/g, 
        replacement: '*ngSwitchCase'
    },
    {
        pattern: /ng-switch-default/g, 
        replacement: '*ngSwitchDefault'
    },
    {
        pattern: /ng-if/g, 
        replacement: '*ngIf'
    },
    {
        pattern: /(ng-repeat=")([A-Za-z]+)( in )/g, 
        replacement: '*ngFor="let $2 of '
    },
    {
        pattern: /ng-bind-html/g, 
        replacement: '[innerHTML]'
    },
]

const additionalRules = {
    stripTagPrefix: {
        pattern: / data-/g,
        replacement: ' '
    },
    aliasForThis: {
        pattern: /\$ctrl\./g,
        replacement: ''
    },
    ngBind: {
        pattern: /ng-bind/g, 
        replacement: '[innerText]'
    },
    ngBindCurlyBraces: {
        pattern: /(<.+?(?=[\s]ng-bind))( )?(ng-bind=")(:: ?)?(.+?)(")(.+?(?=<\/))?(<\/[\w]+>)/g,
        replacement: '$1$7{{ $5 }}$8'
    }
}

module.exports = {
    basicRules,
    additionalRules
}