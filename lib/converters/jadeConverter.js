const jade = require('jade');

const jadeConverter = (template, options) => {
    return jade.render(template, {
        pretty: true
    });
};

module.exports = jadeConverter;