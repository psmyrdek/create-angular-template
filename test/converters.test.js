const { readFileSync } = require('fs');
const { join } = require('path');
const { transformTemplate } = require('../lib/index');

test('It should be possible to transform pug template', () => {

    const template = readFileSync(join(__dirname, './cases/pug/base.pug'), "utf8");

    const transformResult = transformTemplate(template, {
        format: 'pug'
    });

    const expectedResult = readFileSync(join(__dirname, './cases/pug/result.html'), "utf8");

    expect(transformResult).toEqual(expectedResult);

});

test('It should be possible to transform jade template', () => {

    const template = readFileSync(join(__dirname, './cases/jade/base.jade'), "utf8");

    const transformResult = transformTemplate(template, {
        format: 'jade'
    });

    const expectedResult = readFileSync(join(__dirname, './cases/jade/result.html'), "utf8");

    expect(transformResult).toEqual(expectedResult);

});