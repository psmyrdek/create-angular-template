const {applyBasicRules, applyOptionalRule} = require('./applyRules')
const {additionalRules} = require('./rules')
const normalizeFormat = require('./normalizeFormat')
const defaultOptions = require('./defaultOptions')

const transformTemplate = (template, options = {}) => {

    let resultTemplate = template
    const transformOptions = Object.assign({}, defaultOptions, options)

    resultTemplate = normalizeFormat(resultTemplate, transformOptions)

    resultTemplate = applyOptionalRule(resultTemplate, 'aliasForThis', transformOptions, template => {
        return template.replace(new RegExp(`${transformOptions.aliasForThis}\\.`, 'g'), '')
    });

    resultTemplate = applyOptionalRule(resultTemplate, 'stripTagPrefix', transformOptions, template => {
        return template.replace(new RegExp(` ${transformOptions.stripTagPrefix}-`, 'g'), ' ')
    });

    resultTemplate = applyBasicRules(resultTemplate)
        
    if (transformOptions.bindToCurlyBraces) {
        resultTemplate = resultTemplate
            .replace(additionalRules.ngBindCurlyBraces.pattern, additionalRules.ngBindCurlyBraces.replacement)
    } else {
        resultTemplate = resultTemplate
            .replace(additionalRules.ngBind.pattern, additionalRules.ngBind.replacement)
    }
    
    return resultTemplate
}

module.exports = transformTemplate
