const jade = require('jade')

const jadeConverter = template => {
    const rendered = jade.render(template, {
        pretty: true
    })
    return rendered
}

module.exports = jadeConverter
