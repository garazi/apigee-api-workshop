var jjv = require('jjv');
var jjve = require('./jjve');

var env = jjv();
var je = jjve(env);

var schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    str: { type: 'string' },
    deep: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          hello: {
            type: 'integer',
          }
        },
        patternProperties: {
          'ab.*': {
            type: 'string',
          }
        }
      }
    }
  },
};

var data = {
  str: 123,
  ok: true,
  deep: [
    { hello: 'abc' },
    { abc: 123 }
  ],
};

var result = env.validate(schema, data);

if (result) {
  var errors = je(schema, data, result);

  console.log('SCHEMA');
  console.log(JSON.stringify(schema, null, 4));

  console.log('DATA');
  console.log(JSON.stringify(data, null, 4));

  console.log('VALIDATION');
  console.log(JSON.stringify(result.validation, null, 4));

  console.log('ERRORS');
  console.log(JSON.stringify(errors, null, 4));
}
