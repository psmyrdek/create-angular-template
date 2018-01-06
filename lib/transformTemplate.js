const normalizeFormat = require('./normalizeFormat')
const defaultOptions = require('./defaultOptions')
const transformNode = require('./transformNode')
const {parseFragment, serialize} = require('parse5')

const transformTemplate = (template, options = {}) => {

    let resultTemplate = template
    const transformOptions = Object.assign({}, defaultOptions, options)

    resultTemplate = normalizeFormat(resultTemplate, transformOptions)

    const documentFragment = parseFragment(resultTemplate)
    const transformedFragment = transformNode(documentFragment, transformOptions)

    resultTemplate = serialize(transformedFragment)

    return resultTemplate
}

module.exports = transformTemplate
