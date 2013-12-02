
var express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    path = require('path');



var app = express(),
    app_root = path.join(__dirname, '../dev'),
    app_port = 4711;

app.configure(function() {

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.static(app_root));

  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));

});

var server = http.createServer(app);

var io = socketio.listen(server);
io.set('log level', 1);
io.connected_users = 0;

io.on('connection', function(socket) {
  ++io.connected_users;

  io.broadcastInclusive(socket, 'stats', { users: io.connected_users });

  socket.on('disconnect', function() {
    --io.connected_users;
    socket.broadcast.emit('stats', { users: io.connected_users });
  });

  socket.on('ping_request', function(data) {
    socket.emit('ping_response', {id: data.id});
  });

});

io.broadcastInclusive = function(socket, msg, data) {
  socket.broadcast.emit(msg, data);
  socket.emit(msg, data);
};

server.listen(app_port);