const pug = require('pug');

const pugConverter = (template, options) => {
    return pug.render(template, {
        pretty: true
    });
};

module.exports = pugConverter;