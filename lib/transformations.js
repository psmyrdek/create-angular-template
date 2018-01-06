const attrTransformations = {
    class: (attr, transformOptions) => Object.assign({}, attr, {
        value: attr.value
            .split(' ')
            .filter(c => !transformOptions.classListToRemove.includes(c))
            .join(' ')
    }),
    'ng-click': attr => Object.assign({}, attr, {
        name: '(click)'
    }),
    'ng-submit': attr => Object.assign({}, attr, {
        name: '(ngSubmit)'
    }),
    'ng-class': attr => Object.assign({}, attr, {
        name: '[ngClass]'
    }),
    'ng-hide': attr => Object.assign({}, attr, {
        name: '[hidden]'
    }),
    'ng-model': attr => Object.assign({}, attr, {
        name: '[(ngModel)]'
    }),
    'ng-switch': attr => Object.assign({}, attr, {
        name: '[ngSwitch]'
    }),
    'ng-switch-when': attr => Object.assign({}, attr, {
        name: '*ngSwitchCase'
    }),
    'ng-switch-default': attr => Object.assign({}, attr, {
        name: '*ngSwitchDefault'
    }),
    'ng-if': attr => Object.assign({}, attr, {
        name: '*ngIf'
    }),
    'ng-bind-html': attr => Object.assign({}, attr, {
        name: '[innerHTML]'
    }),
    'ng-repeat': attr => Object.assign({}, attr, {
        name: '*ngFor',
        value: attr.value.replace(/([A-Za-z]+)( in )/g, 'let $1 of ')
    }),
    'ng-show': attr => Object.assign({}, attr, {
        name: '[hidden]',
        value: `!${attr.value}`
    }),
    'ng-bind': (attr, transformOptions) => Object.assign({}, attr, {
        name: transformOptions.bindToCurlyBraces ? 'ng-bind' : '[innerText]'
    }),
    'ng-href': attr => Object.assign({}, attr, {
        name: '[href]',
        value: attr.value.replace(/({{ ?)(.+?(?= ?}}))( ?}})/g, '$2')
    }),
    'ng-src': attr => Object.assign({}, attr, {
        name: '[src]',
        value: attr.value.replace(/({{ ?)(.+?(?= ?}}))( ?}})/g, '$2')
    })
}

const nodeTransformations = {
    bindToCurlyBraces: node => {
        const ngBindAttr = node.attrs.find(a => a.name === 'ng-bind')
        if (ngBindAttr) {
            node.attrs = node.attrs.filter(a => a.name !== 'ng-bind')
            node.childNodes = [{
                nodeName: '#text',
                value: `{{ ${ngBindAttr.value.replace(/:: ?/g, '')} }}`
            }]
        }
    }
}

module.exports = {
    attrTransformations,
    nodeTransformations
}
