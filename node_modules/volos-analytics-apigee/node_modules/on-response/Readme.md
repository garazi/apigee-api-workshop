# on-response

  Call back when an [express](https://github.com/visionmedia/express) request is finished. 

## Example

```js
var onResponse = require('on-response');

app.use(function (req, res, next) {
  var start = Date.now();
  onResponse(req, res, function (err) {
    var duration = Date.now() - start;
    console.log('request duration: ' + duration);
  });
  next();
});
```

The callback function returns a [request](https://github.com/segmentio/request-summary) and [response](https://github.com/segmentio/response-summary) summary for logging purposes:

```js
var onResponse = require('on-response');

app.use(function (req, res, next) {
  onResponse(req, res, function (err, summary) {
    console.log('request size: ' + summary.request.size);
    console.log('response size: ' + summary.response.size);
  });
  next();
});
```

## API

### onResponse(req, res, callback)

  Call back when the request is finished.

## License

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```