const pugConverter = require('./pugConverter')
const jadeConverter = require('./jadeConverter')

const toHtml = function (template, options) {

    const suportedFormats = {
        pug: pugConverter,
        jade: jadeConverter
    }

    if (suportedFormats[options.format]) {
        const convertFunc = suportedFormats[options.format]
        return convertFunc(template)
    }

    throw new Error(`Converting from ${options.format} is not yet supported!`)
}

module.exports = {toHtml}
