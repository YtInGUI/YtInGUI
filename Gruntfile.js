module.exports = function(grunt) {
    // 自动加载 grunt 任务
    require('load-grunt-tasks')(grunt);

    // 统计 grunt 任务耗时
    require('time-grunt')(grunt);

    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: '_dist/img' // 优化后的图片保存位置
                }]
            }
        },
        autoprefixer: {
            options: {
                diff: false,
                browsers: ['ios 5', 'android 2.3']
            },

            // prefix all files
            multiple_files: {
                expand: true,
                src: ['css/*.css', 'css/**/*.css']
            }
        },
        sass: {
            dist: {
                expand: true,
                flatten: true,
                cwd: 'sass',
                src: ['**/*.scss'],
                dest: 'css/',
                ext: '.css'
            }
            
        },
        cssmin: {
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['**/*.css'],
                dest: '_dist/css/'
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'js',
                    src: '**/*.js',
                    dest: '_dist/js/',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: 'lib/',
                    src: '**/*.js',
                    dest: '_dist/lib/'
                }]
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js', '!js/YtInG.js'],
            options: {
                // 允许多行字符拼接, 在 *.tpl 中常用
                "multistr": true,
                // 允许使用类似这种表达式 $.isFunction( fn ) && fn();
                "expr": true,
                // 允许使用类似这种函数  new Function("obj","return 123")
                "evil": true
            }
        },
        concat: {
            zepto: {
                src: [
                    'lib/zeptojs/zepto.js',
                    'lib/zeptojs/event.js',
                    'lib/zeptojs/touch.js', 
                    'lib/zeptojs/ajax.js',
                    'lib/zeptojs/ie.js',
                    'lib/zeptojs/form.js'
                ],
                dest: 'lib/zepto.min.js'
            },
            js: {
                src: [
                    'js/core/core.js',
                    'js/component/*.js'
                ],
                dest: 'js/YtInG.js'
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: '_dist',
                src: '**/*',
                dest: '<%=pkg.version%>'
            },
            dist: {
                expand: true,
                cwd: '_dist',
                src: ['font/**/*','img/*.{png,jpg,jpeg}',
                'css/basic.css','css/YtInG.css',
                'js/YtInG.js','lib/zepto.min.js'],
                dest: 'dist'
            }
        },
        includereplace: {
            html: {
                expand: true,
                cwd: 'demo/src',
                src: ['*.html'],
                dest: 'demo/'

            },
            qrcode: {
                expand: true,
                cwd: 'qrcode/src',
                src:['*.html'],
                dest:'qrcode/'
            }
        },
        // project: {
        //     html: {
        //         expand: true,
        //         cwd: 'qrcode/src',
        //         src:['*.html'],
        //         dest:'qrcode/'
        //     }
        // },
        jsdoc: {
            doc: {
                src: ['js/**/*.js', '!js/baymax.js'],
                options: {
                    destination: 'jsdoc'
                }
            }
        },
        watch: {
            demo: {
                files: [
                    'demo/**/*.html'
                ],
                tasks: ['includereplace']
            },

            qrcode: {
                files: [
                    'qrcode/**/*.html'
                ],
                tasks: ['includereplace']
            },
            css: {
                files: [
                    'sass/**/*.scss'
                ],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['js/**/*.js', '!js/YtInG.js'],
                tasks: ['concat:js', 'jsdoc']
            }
        }
    });

    // 默认任务
    grunt.registerTask('default', [
        'sass',
        'autoprefixer',
        'cssmin',
        'imagemin',

        'concat:zepto',
        'concat:js',
        'uglify',
        'copy',
        'includereplace',
        'watch'
    ]);
    grunt.registerTask('deploy', [
        'sass',
        'autoprefixer',
        'cssmin',
        'imagemin',

        'concat:zepto',
        'concat:js',
        'uglify',
        'copy',
        'includereplace',
    ]);
    // 根据 docs 的代码片段生成 demo 到 demo/*.html
    grunt.registerTask('demo', ['includereplace']);
};
