# JJV Errors (jjve) [![Build Status](https://travis-ci.org/silas/jjve.png?branch=master)](https://travis-ci.org/silas/jjve)

This is a library to render [JJV][jjv] validation output.

## Usage

``` javascript
var jjv = require('jjv');
var jjve = require('jjve');

var env = jjv();
var je = jjve(env);

var schema = {
  type: 'object',
  properties: { ok: { type: 'boolean' } },
};

var data = { ok: 1 };

var result = env.validate(schema, data);

if (result) {
  var errors = je(schema, data, result);
  console.log(JSON.stringify(errors, null, 4));
}
```

Output

``` json
[
    {
        "code": "INVALID_TYPE",
        "message": "Invalid type: integer should be boolean",
        "data": 1,
        "path": "$.ok"
    }
]
```

## License

This work is licensed under the MIT License (see the LICENSE file).

Error messages derived from [z-schema][z-schema] (see the NOTICE file).

[jjv]: https://github.com/acornejo/jjv
[z-schema]: https://github.com/zaggino/z-schema
