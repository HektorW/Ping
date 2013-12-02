"use strict";

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    app: {
      dev: 'dev',
      dist: 'dist'
    },

    watch: {
      options: {
        nospawn: false
      },
      styles: {
        files: ['<%= app.dev %>/styles/*.less'],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.dev %>/*.html',
          '<%= app.dev %>/scripts/*.js',
          '<%= app.dev %>/styles/*.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // hostname: '192.168.0.192'
        hostname: null
      },
      livereload: {
        options: {
          // open: true,
          base: '<%= app.dev %>'
        }
      }/*,
      test: {
        options: {
          base: [
            'test',
            '<%= app.dev %>'
          ]
        }
      }*/
    },

    // mocha: {
    //   all: {
    //     options: {
    //       run: true,
    //       urls: [ 'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html' ]
    //     }
    //   }
    // },

    less: {
      options: {
        files: [
        ]
      },
      dev: {
        files: {
          '<%= app.dev %>/styles/main.css': '<%= app.dev %>/styles/*.less',
        }
      },
      dist: {
        files: {
          '<%= app.dist %>/styles/main.css': '<%= app.dev %>/styles/*.less',
        }
      }
    },

    autoprefixer: {
      options: {
      },
      dev: {
        src: '<%= app.dev %>/styles/main.css'
      },
      dist: {
        src: '<%= app.dist %>/styles/main.css'
      }
    },

    clean: {
      dev: {
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= app.dist %>'
          ]
        }]
      }
    }
  });

  // grunt.registerTask('test', [
  //   'connect:test',
  //   'mocha'
  // ]);

  grunt.registerTask('server', [
    'less:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev', [
    'less:dev',
    'autoprefixer:dev'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'less:dist',
    'autoprefixer:dist'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);
};