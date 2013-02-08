var emitter = new (require('events').EventEmitter)();
var db = require('dirty')('core.db');



exports.onRouteCreate = function (callback) {
  emitter.on('route-create',callback);
};

exports.onRouteDelete = function (callback) {
  emitter.on('route-delete',callback);
};
exports.addRoute = function (route) {
  var rs = db.get('routes');
  rs = rs || [];
  rs.push(route);
  db.set('routes',rs);
  emitter.emit('route-create',route);
};

exports.getRoutes = function() {
  var rs = db.get('routes') || [];
  return rs;
}

exports.removeRoute = function(route) {
  if(!route) { 
    return; 
  }

  var route_test_path = route.path || route;

  var rs = db.get('routes');
  //var rs = storage.getItem('routes') || []; //todo - keep cached
  rs = rs || [];

  var ct = rs.filter(function(element) {
    return element.path && (element.path == route_test_path);
  }).length;


  rs = rs.filter(function(element) {
    return element.path && (element.path != route_test_path);
  });

  db.set('routes',rs);
  if(ct) {
    emitter.emit('route-delete',route_test_path);
  }
};
