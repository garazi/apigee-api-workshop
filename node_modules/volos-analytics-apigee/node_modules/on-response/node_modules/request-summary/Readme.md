# request-summary

  Summarize an [express](https://github.com/visionmedia/express) request.

## Example

```js
var summary = require('request-summary');

var app = express();
app.get(function (req, res, next) {
    var request = summary(req, res);
    console.log('Bytes received: ' + request.size);
    next();
});
```

## API

### summary(req, res)
    
  Return an object summarizing a `req`.

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