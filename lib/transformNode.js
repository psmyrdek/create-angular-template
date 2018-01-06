const transformAttrs = require('./transformAttrs')
const {nodeTransformations} = require('./transformations')

const transformNode = (node, transformOptions) => {

    if (node.attrs) {
        node.attrs = transformAttrs(node.attrs, transformOptions)

        if (transformOptions.bindToCurlyBraces) {
            nodeTransformations.bindToCurlyBraces(node)
        }
    }

    if (node.childNodes) {
        for (const childNode of node.childNodes) {
            transformNode(childNode, transformOptions)
        }
    }
    return node
}

module.exports = transformNode
