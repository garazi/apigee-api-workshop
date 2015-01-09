# response-summary

  Summarize an [express](https://github.com/visionmedia/express) response.

## Example

```js
var summary = require('response-summary');

var app = express();
app.get(function (req, res, next) {
  var response = summary(req, res);
  console.log('bytes sent: ' + response.size);
  next();
});
```

## API

### summary(req, res)
    
  Return an object summarizing a response.

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