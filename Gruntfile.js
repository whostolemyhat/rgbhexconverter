'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: 'app', // path to app files,
        build: 'app/build',
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                spawn: false
            },

            watchsass: {
                files: [
                    '<%= app %>/sass/**/*.scss',
                ],
                tasks: ['sass:dev']
            },

            js: {
                files: [
                    '<%= app %>/js/**/*.js'
                ],
                tasks: ['jshint', 'browserify'],
            },


            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app %>/*.html',
                    '<%= app %>/js/**/*.js',
                    '<%= app %>/css/*.css',
                    '<%= app %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    '<%= build %>/css/main.css': '<%= app %>/sass/main.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    lineNumbers: false
                },
                files: {
                    '<%= build %>/css/main.css': '<%= app %>/sass/main.scss'
                }
            }
        },

        clean: [ '<%= build %>/' ],

        tag: {
            banner: '/* <%= pkg.name %> */\n' +
                    '/* v<%= pkg.version %> */\n' +
                    '/* <%= pkg.author %> */\n' +
                    '/* Last updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },

        uglify: {
            options: {
                banner: '<%= tag.banner %>'
            },
            dist: {
                src: ['<%= build %>/js/app.js'],
                dest: '<%= build %>/js/app.min.js'
            }
        },

        jshint: {
            options: {
                // carry on even if there's warnings ie Warn only
                force: true,
                jshintrc: '.jshintrc',
                reporter: require('jshint-summary')
            },
            all: [
                '<%= app %>/js/*.js'
            ]
        },

        browserify: {
            dist: {
                options: {
                    transform: [['babelify', { 'stage': 0} ]]
                },
                files: {
                    '<%= build %>/js/app.js' : '<%= app %>/js/main.js'
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost',
            },
            livereload: {
                options: {
                    base: ['<%= app %>']
                }
            }
        }
    });

    grunt.registerTask('default', ['connect:livereload', 'browserify', 'sass:dev', 'watch']);
    grunt.registerTask('build', ['jshint', 'uglify', 'sass:prod']);
};
