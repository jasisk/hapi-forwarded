'use strict';
var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var Plugin = require('../');
var Wreck = require('wreck');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;


function createServer(cb) {
  var server = Hapi.createServer('127.0.0.1', 0);

  server.pack.register(Plugin, function (err) {

    expect(err).to.not.exist();

    server.route({path: '/', method: 'GET', handler: function (request, reply) {
      reply(request.info.remoteAddress);
    }});

    server.start(function (err) {

      expect(err).to.not.exist();
      cb(server);
    });
  });
}


describe('Plugin', function () {

  it('should work correctly without x-forwarded-for', function (done) {

    createServer(function (server) {

      Wreck.get(server.info.uri, function (err, res, payload) {

        server.stop();
        expect(err).to.not.exist();
        expect(payload).to.equal(server.info.host);
        done();
      });
    });
  });


  it('should work correctly with x-forwarded-for', function (done) {
    var headers;

    headers = {
      'x-forwarded-for': '8.8.8.8'
    };

    createServer(function (server) {

      Wreck.get(server.info.uri, {headers: headers}, function (err, res, payload) {

        server.stop();
        expect(err).to.not.exist();
        expect(payload).to.equal(headers['x-forwarded-for']);
        done();
      });
    });
  });


  it('should ignore an empty x-forwarded-for', function (done) {
    var headers;

    headers = {
      'x-forwarded-for': ' '
    };

    createServer(function (server) {

      Wreck.get(server.info.uri, {headers: headers}, function (err, res, payload) {

        server.stop();
        expect(err).to.not.exist();
        expect(payload).to.equal(server.info.host);
        done();
      });
    });
  });
});
