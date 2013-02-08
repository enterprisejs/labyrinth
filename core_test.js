var core = require('./core');

var rt1 = {path: '/foo/:x/bar/:y', controller: 'blah' };
var rt2 = {path: '/blat/:x', controller: 'blat' };
var rt3 = {path: '/bar', controller: 'blam' };

core.onRouteCreate(function(rt) {
  console.log("NEW ROUTE " + rt.path + " - " + rt.controller);
  console.log(JSON.stringify(core.getRoutes()))
})

core.onRouteDelete(function(rd) {
  console.log("DELETED " + rd);
  console.log(JSON.stringify(core.getRoutes()))
})

core.addRoute(rt1);
core.addRoute(rt2);
core.addRoute(rt3);
core.removeRoute(rt1);
core.removeRoute(rt1);
core.removeRoute(rt2);

console.log(JSON.stringify(core.getRoutes()))
