const pug = require('pug')

const pugConverter = template => {
    const rendered = pug.render(template, {
        pretty: true
    })
    return rendered
}

module.exports = pugConverter
