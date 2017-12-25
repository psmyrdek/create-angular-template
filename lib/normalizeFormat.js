const {toHtml} = require('./converters/index')

const normalizeFormat = (template, options) => {
    let resultTemplate = template
    if (options.format !== 'html') {
        resultTemplate = toHtml(template, options)
    }
    return resultTemplate
}

module.exports = normalizeFormat
