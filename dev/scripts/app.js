define([
  'socketio',
  'jquery',
  'underscore',
  'text!templates/ping.html',
  'text!templates/stats.html'
], function(io, $, _, pingTemplate, statsTemplate) {

  var App = {
    status: 'disconnected',
    users: 0,
    ping_value: 0,

    socket: null,

    pingTemplate: _.template(pingTemplate),
    statsTemplate: _.template(statsTemplate),

    init: function() {
      this.$stats = $('#stats');
      this.$content = $('#content');

      this.initSocket();

      this.renderStats();
      this.renderPing();

      this.ping();

      setInterval(function() {
        App.renderStats();
      }, 1000);
    },

    initSocket: function() {
      var socket = io.connect();

      socket.on('connect', function() {
        App.status = 'connected';
        App.renderStats();
      });
      socket.on('disconnect', function() {
        App.status = 'disconnected';
        App.users = 0;
        App.renderStats();
      });

      socket.on('stats', function(data) {
        App.users = data.users;
        App.renderStats();
      });

      socket.on('ping_response', function(data) {
        App.pingResponse(data);
      });

      this.socket = socket;
    },

    ping: function() {
      this.ping_time = performance.now();
      this.socket.emit('ping_request', {
        id: this.ping_time
      });
    },
    pingResponse: function(data) {
      if(data.id === this.ping_time) {
        this.ping_value = performance.now() - this.ping_time;
        this.renderPing();  
      }

      

      // Schedule new ping
      setTimeout(function() {
        App.ping();
      }, 1000);
    },

    renderStats: function() {

      this.$stats.html(this.statsTemplate({
        status: this.status,
        users: this.users,
        datetime: Date.now()
      }));

    },

    renderPing: function() {
      this.$content.html(this.pingTemplate({
        ping: this.ping_value
      }));
    }
  };


  // #Debug
  window.App = App;

  return App;
});