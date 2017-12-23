const { toHtml } = require('./converters/index');

const defaults = {
    stripTagPrefix: 'data',
    aliasForThis: '$ctrl',
    format: 'html'
};

const transformTemplate = (template, options = {}) => {

    const transformOptions = Object.assign(defaults, options);

    let resultTemplate = template;

    if (transformOptions.format !== 'html') {
        resultTemplate = toHtml(template, transformOptions);
    }

    const aliasForThisRegExp = new RegExp(`${transformOptions.aliasForThis}\.`, 'g');
    resultTemplate = resultTemplate.replace(aliasForThisRegExp, '');

    const prefixRegExp = new RegExp(` ${transformOptions.stripTagPrefix}-`, 'g');
    resultTemplate = resultTemplate.replace(prefixRegExp, ' ');

    return resultTemplate
        .replace(/ng-click/g, '(click)')
        .replace(/ng-submit/g, '(ngSubmit)')
        .replace(/ng-hide/g, '[hidden]')
        .replace(/ng-class/g, '[ngClass]')
        .replace(/ng-show="/g, '[hidden]="!')
        .replace(/ng-if/g, '*ngIf')
        .replace(/(ng-repeat=")([A-Za-z]+)( in )/g, '*ngFor="let $2 of ')

};

module.exports = transformTemplate;