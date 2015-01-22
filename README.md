# hapi-forwarded

[![Build Status](https://travis-ci.org/jasisk/hapi-forwarded.svg)](https://travis-ci.org/jasisk/hapi-forwarded)

A [Hapi v7.5.3](/hapijs/hapi/tree/v7.5.3/) to trust `x-forwarded-for`

### Example

``` js
var Forwarded = require('hapi-forwarded');
server.pack.register(Forwarded, function (err) {
  server.start();
  // request.info.remoteAddress will be replaced with
  // the last address in the `x-forwarded-for` header
});
```
