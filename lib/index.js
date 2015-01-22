'use strict';
var Forwarded = require('forwarded');

exports.register = function register(plugin, options, next) {

  plugin.ext('onRequest', function onRequest(request, reply) {
    var address;
  
    address = Forwarded(request.raw.req).pop();

    if (address.trim() !== '') {
      request.info.remoteAddress = address;
    } 

    reply();
  });

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
