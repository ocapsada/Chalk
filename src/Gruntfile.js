module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                includePaths: [
                    'bower_components/foundation/scss',
                    'bower_components/animate-sass',
                    'bower_components/datatables/media/css',
                    'bower_components/font-awesome/scss',
                    'bower_components/AmaranJS/dist/css',
                    'bower_components/select2/',
                ],
                imagePath: '/foundation'
            },
            build: {
                options: {
                    outputStyle: 'compressed',
                    imagePath: '/images'
                },
                files: {
                    '../build/css/chalk-default.css': 'scss/app.scss',
                    '../build/css/chalk-blue.css': 'scss/app-blue.scss',
                    '../build/css/chalk-slime.css': 'scss/app-slime.scss'
                }
            }
        },
        
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass:build']
            },
            js: {
                files: ['js/*/**/*.js'],
                tasks: ['babel', 'concat']
            },
            copy: {
                files: ['locales/**', 'fonts/**', 'images/**', 'background.js', 'window.html'],
                tasks: ['copy']
            }
        },
        
        babel: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    '../babel/class/Timer.js': '../babel/class/Timer.js'
                }
            }
        },

        copy: {
            babel: {
                expand: true,
                cwd: 'js',
                src: ['class/*.js'],
                dest: '../babel/'
            },
            build: {
                expand: true,
                src: [
                    'fonts/**',
                    'images/**',
                    'icons/**',
                    'locales/**',
                    'background.js',
                    'manifest.json',
                    'window.html'
                ],
                dest: '../build'
            },
            awesome: {
                expand: true,
                cwd: 'bower_components/font-awesome/fonts',
                src: ['*'],
                dest: '../build/fonts/font-awesome/',
                
            }
        },

        clean: {
            options: {
                force: true,
            },
            build: {
                src: ['../build/**', '../babel/**']
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: [
                    'bower_components/foundation/js/vendor/jquery.js',
                    'bower_components/foundation/js/vendor/placeholder.js',
                    'bower_components/foundation/js/vendor/jquery.cookie.js',
                    'bower_components/foundation/js/vendor/fastclick.js',
                    'bower_components/foundation/js/foundation.min.js',
                    'bower_components/datatables/media/js/jquery.dataTables.js',
                    'bower_components/datatables/media/js/dataTables.foundation.js',
                    'bower_components/AmaranJS/dist/js/jquery.amaran.js',
                    'bower_components/i18next/i18next.js',
                    'bower_components/dijon/dist/dijon.js',
                    'bower_components/jquery.rest/dist/1/jquery.rest.js',
                    'bower_components/Ashe/ashe.js',
                    'bower_components/Ashe/ashe-modifiers.js',
                    'bower_components/select2/dist/js/select2.full.min.js',

                    '../babel/class/Timer.js',

                    'js/app.js',
                    'js/dijon/config.js',

                    'js/dijon/controllers/**/*.js',
                    'js/dijon/services/**/*.js',
                    'js/dijon/models/**/*.js',
                    'js/dijon/views/**/*.js',
                    'js/dijon/utils/**/*.js',
                    'js/dijon/app.js'
                ],
                dest: '../build/js/chalk.js'
            }
        },

        jshint: {
            build: [
                '../babel/class/Timer.js',

                'js/app.js',
                'js/dijon/config.js',

                'js/dijon/controllers/**/*.js',
                'js/dijon/services/**/*.js',
                'js/dijon/models/**/*.js',
                'js/dijon/views/**/*.js',
                'js/dijon/utils/**/*.js',
                'js/dijon/app.js'
            ]
        },

        uglify: {
            build: {
                files: {
                    '../build/js/chalk.js': ['../build/js/chalk.js']
                }
            }
        },

        compress: {
            release: {
                options: {
                    archive: function(){
                        var pack = grunt.file.readJSON('package.json')
                        return '../dist/'+pack.name+'-'+pack.version+'.zip';
                    },
                    mode: 'zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '../build',
                        src: ['**'],
                        dest: 'build'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['clean', 'sass:build', 'jshint', 'copy:babel', 'babel', 'concat', 'copy:build', 'copy:awesome', 'watch']);
    grunt.registerTask('release', ['clean', 'sass:build', 'jshint', 'copy:babel', 'babel', 'concat', 'uglify', 'copy:build', 'copy:awesome', 'compress:release', 'clean']);
};