const {toHtml} = require('./converters/index')

const normalizeFormat = (template, options) => {
    if (options.format !== 'html') {
        template = toHtml(template, options)
    }
    return template
}

module.exports = normalizeFormat;