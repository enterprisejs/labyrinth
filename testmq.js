/*var amqp = require('amqp');
var amqp_hacks = require('./amqp-hacks');

var test = {path: '/foo',controller: 'bar', action: 'index'};
var conn = amqp.createConnection({ host: 'localhost' });
conn.on('ready',function() {
  console.log("CONNEKT");
//  var exchange = conn.exchange('blatto');
  conn.publish("core-route",{method: "route.register",params: {path: "/foo", controller: "foo", action: "index"}, id: 'fake_1'});
  conn.publish("core-route",{method: "route.register",params: {path: "/foo", method: "POST", controller: "foo", action: "save"}, id: 'fake_2'});
  conn.publish("core-route",{method: "route.register",params: {path: "/bar", controller: "bar", action: "index"}, id: 'fake_2'});
  amqp_hacks.safeEndConnection(conn);
})*/

var airport = require('airport');
var air = airport('localhost',9090);

var up = air.connect('core');
  console.log("PREUP");
up(function(remote) {
  if (!remote) console.error('resource timed out')
  remote.onRouteCreate(function(r) {
    console.log("REMOTE ROUTE CREATED " + JSON.stringify(r));
  })
  console.log("OH");
  console.log(JSON.stringify(remote.getRoutes()));
  remote.getRoutes(function(r) { console.log(JSON.stringify(r)) })
  remote.addRoute({path: "/foo", controller: "foo", action: "index"});
  remote.addRoute({path: "/fzo", controller: "fzo", action: "index"});
  remote.addRoute({path: "/feo", controller: "feo", action: "index"});
  remote.addRoute({path: "/fwo", controller: "fwo", action: "index"});
  remote.removeRoute('fzo');
  console.log(JSON.stringify(remote.getRoutes()));
  remote.getRoutes(function(r) { console.log(JSON.stringify(r)) })
  console.log("NO");
})
