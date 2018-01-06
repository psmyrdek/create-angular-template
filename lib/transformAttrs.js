const {attrTransformations} = require('./transformations')
const stripTagPrefix = (name, stripTagPrefixParam) => name.replace(`${stripTagPrefixParam}-`, '')

const transformAttr = (attr, transformOptions) => {

    attr.name = stripTagPrefix(attr.name, transformOptions.stripTagPrefix)

    const regExp = transformOptions.aliasForThis.startsWith('$')
        ? new RegExp(`\\${transformOptions.aliasForThis}\\.`, 'g')
        : new RegExp(`${transformOptions.aliasForThis}\\.`, 'g')

    attr.value = attr.value.replace(regExp, '')

    return attrTransformations[attr.name]
        ? attrTransformations[attr.name](attr, transformOptions)
        : attr
}

const isValid = attr => {
    if (attr.name === 'class' && attr.value === '') {
        return false
    }
    return true
}

const transformAttrs = (attrs, transformOptions) => attrs
    .map(attr => transformAttr(attr, transformOptions))
    .filter(isValid)

module.exports = transformAttrs
