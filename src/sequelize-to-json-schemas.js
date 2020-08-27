// https://github.com/alt3/sequelize-to-json-schemas#usage
// https://gist.github.com/bravo-kernel/947281f59405fc63d997c73d1a8c7d3c
const {
  JsonSchemaManager,
  // JsonSchema7Strategy, // This is an older alternative to OpenApi3Strategy.
  OpenApi3Strategy
} = require('@alt3/sequelize-to-json-schemas');

module.exports = function init(app) {
  const jsonSchemaManager = new JsonSchemaManager({
    baseUri: '/',
    absolutePaths: true,
    secureSchemaUri: true,
    disableComments: false,
    associations: true
  });

  const openApi3Strategy = new OpenApi3Strategy();

  app.set('jsonSchemaManager', jsonSchemaManager);
  app.set('openApi3Strategy', openApi3Strategy);
};