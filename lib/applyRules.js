const {basicRules,additionalRules} = require('./rules')

const applyBasicRules = template => {
    for (let rule of basicRules) {
        template = template.replace(rule.pattern, rule.replacement)
    }
    return template
}

const applyOptionalRule = (template, ruleName, options, customTransformation) => {
    if (options[ruleName]) {
        template = customTransformation(template)
    } else {
        template = template
            .replace(additionalRules[ruleName].pattern, additionalRules[ruleName].replacement)
    }
    return template
}

module.exports = {
    applyBasicRules,
    applyOptionalRule
}