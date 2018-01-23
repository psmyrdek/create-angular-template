const normalizeFormat = require('./normalizeFormat')
const defaultOptions = require('./defaultOptions')
const transformNode = require('./transformNode')
const {parseFragment, serialize} = require('parse5')

/**
 * Transforms AngularJS template (string) into one matching Angular syntax.
 *
 * @param {string} template - AngularJS template
 * @param {Object} [options={}] - Transformation options
 * @param {string} [options.stripTagPrefix = 'data'] - Strip prefixes from tags
 * @param {string} [options.aliasForThis = '$ctrl'] - Strip reference to 'this'
 * @param {string} [options.format = 'html'] - Template format.
 * @param {boolean} [options.bindToCurlyBraces = false] - Transform ng-bind into curly braces binding
 * @param {string[]} [options.classListToRemove = ['ng-hide']] - List of class names to remove from element
 *
 * @returns {string} - Transformed template
 */
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
