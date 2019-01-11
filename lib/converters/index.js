const pugConverter = require('./pugConverter')

const toHtml = function (template, options) {

    const suportedFormats = {
        pug: pugConverter
    }

    if (suportedFormats[options.format]) {
        const convertFunc = suportedFormats[options.format]
        return convertFunc(template)
    }

    throw new Error(`Converting from ${options.format} is not yet supported!`)
}

module.exports = {toHtml}
