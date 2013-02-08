//coremq provides amqp connection
var emitter = new (require('events').EventEmitter)();
var core = require('./core');
var amqp = require('amqp');

commands = {};

exports.registerCommand = function(name,command) {
  commands[name] = command;
}


exports.startServer = function(host) {
  host = host || 'localhost'
  var connection = amqp.createConnection({ host: host });

  connection.on('ready', function() {
    connection.queue('core-route',function(q) {
      console.log("READY");
      q.subscribe(function(msg) {
      console.log("hit");
        if(msg.method && commands[msg.method]) {
          var f = msg.method;
          f.call(msg.params);
        }
        else if(msg.method == 'route.register') {
          console.log("REG");
          console.log("params=" + JSON.stringify(msg.params));
          console.log(msg.toString('utf-8'));
        }
        else {
          console.log(msg.toString('utf-8'));
        }
      })
    })
  })
}
