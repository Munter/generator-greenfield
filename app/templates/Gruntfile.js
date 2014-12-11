// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    require('jit-grunt')(grunt); // Load grunt tasks automatically
    require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times

    grunt.initConfig({
        yeoman: {
            app: 'app',
            dist: 'dist',
            test: 'test',

            // Browser support, used for autoprefixing and backwards compatible hack enabling
            // Syntax documentation: https://github.com/ai/autoprefixer#browsers
            browsers: [
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
                'Opera 12.1'
            ]
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.dist %>'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>',
                '<%%= yeoman.test %>'
            ]
        },

        // Development server configuration, see https://github.com/Munter/grunt-livestyle#full-configuration-example
        livestyle: {
            root: '<%%= yeoman.app %>',
            browsers: '<%%= yeoman.browsers %>'
        },

        // Production build system configuration, see https://github.com/Munter/grunt-reduce#configuration
        reduce: {
            root: '<%%= yeoman.app %>',
            outRoot: '<%%= yeoman.dist %>',
            browsers: '<%%= yeoman.browsers %>',

            // minimatch patterns of files to include as base assets
            // Dependencies of these will be automatically populated
            // Paths are relative to reduce.root
            include: [
                '*.html',
                '**/.htaccess',
                '*.txt',
                '*.ico'
            ]
        }
    });

    grunt.registerTask('lint', [
        'newer:jshint'
    ]);

    grunt.registerTask('serve', [
        'livestyle'
    ]);

    grunt.registerTask('test', [
        'jshint'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'reduce'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};
