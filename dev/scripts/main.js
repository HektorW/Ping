
window.onerror = function(er, f, l) {
  window.alert(er + '\n' + f +', ' + l);
};

require.config({
  shim: {
    socketio: {
      exports: 'io'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }
  },

  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    text: '../bower_components/requirejs-text/text',
    templates: '../templates',
    socketio: '/socket.io/socket.io.js'
  }
});

require([
  'app'
], function(App) {

  App.init();

});

