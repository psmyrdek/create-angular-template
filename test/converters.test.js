const { readFileSync } = require('fs');
const { join } = require('path');
const { transformTemplate } = require('../index');

test('It should be possible to transform pug template', () => {

    const template = readFileSync(join(__dirname, './cases/pug/base.pug'), "utf8");

    const transformResult = transformTemplate(template, {
        format: 'pug'
    });

    const expectedResult = readFileSync(join(__dirname, './cases/pug/result.html'), "utf8");

    expect(transformResult).toEqual(expectedResult);

});

test('It should throw in case of unknown format', () => {

    const template = '## This is markdown';

    expect(() => {
        transformTemplate(template, {
            format: 'md'
        })
    }).toThrow();

});