const {basicRules, additionalRules} = require('./rules')

const applyBasicRules = template => {
    let resultTemplate = template
    for (const rule of basicRules) {
        resultTemplate = resultTemplate.replace(rule.pattern, rule.replacement)
    }
    return resultTemplate
}

const applyOptionalRule = (template, ruleName, options, customTransformation) => {
    let resultTemplate = template
    if (options[ruleName]) {
        resultTemplate = customTransformation(resultTemplate)
    } else {
        resultTemplate = resultTemplate
            .replace(additionalRules[ruleName].pattern, additionalRules[ruleName].replacement)
    }
    return resultTemplate
}

module.exports = {
    applyBasicRules,
    applyOptionalRule
}
