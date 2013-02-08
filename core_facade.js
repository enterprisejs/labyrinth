var core = require('./core');

var airport = require('airport');
var air = airport('localhost',9090);

var core_dnode = air(function(remote,conn) {
  this.onRouteCreate = core.onRouteCreate;
  this.onRouteDelete = core.onRouteDelete;
  this.addRoute = core.addRoute;
  this.getRoutes = function(cb) { if(cb) { cb( core.getRoutes() ) }; return core.getRoutes(); };
  this.removeRoute = core.removeRoute;
})

var restart = function() {
  try {
    core_dnode.listen('core');
  }
  catch(e) {
    console.error("ERROR: " + e)
    console.error("RESTARTING");
    restart();
  }
}
restart();



