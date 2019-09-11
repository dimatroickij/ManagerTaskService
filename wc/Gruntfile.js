
module.exports = function(grunt) {
	grunt.initConfig({
		/* clean */
		clean: {
			options: {
				force: true
			},
			dist: [
				'dist/dev/**/*'
			],
			dev: {
				src: '../target/classes/static/client/**/*'
			},
			dist_prod: {
				src: [
					'dist/prod/**/*.less',
					'dist/prod/**/*.txt'
				],
				expand: true,
				dot: true
			}
		},
		/* clean empty dirs (in dist/prod) */
		cleanempty: {
			prod: {
				src: ['dist/prod/**/*']
			}
		},
		/* copy */
		copy: {
			options: {
				// NOTE: this is option from forked version of grunt-contrib-copy (see https://github.com/gruntjs/grunt-contrib-copy/pull/96)
				forceOverwrite: true,
				force: true
			},
			lib2dev: {
				src: '**/*.*',
				expand: true,
				dot: true,
				cwd: 'node_modules/@croc/webclient/src',
				dest: '../target/classes/static/client'
			},
			src2dev: {
				src: '**/*.*',
				expand: true,
				dot: true,
				cwd: 'src',
				dest: '../target/classes/static/client'
			},
			dist: {
				options: {
					exclude_ts: false
				},
				files: [{
					src: '**/*.*',
					filter: function(filepath) {
						if (grunt.task.current.data.options.exclude_ts) {
							// '!**/*.ts', '!**/*.map'
							return !filepath.endsWith(".ts") && !filepath.endsWith(".js.map");
						}
						return true;
					},
					expand: true,
					dot: true,
					cwd: 'node_modules/@croc/webclient/src',
					dest: 'dist/dev'
				}, {
					src: '**/*.*',
					filter: function(filepath) {
						if (grunt.task.current.data.options.exclude_ts) {
							// '!**/*.ts', '!**/*.map'
							return !filepath.endsWith(".ts") && !filepath.endsWith(".js.map");
						}
						return true;
					},
					expand: true,
					dot: true,
					cwd: 'src',
					dest: 'dist/dev'
				}/*, {	// See https://dev.rnd.croc.ru/webclient/docs/latest/docs/css-styles-and-less.html
					src: '.variables-override.less',
					dot: true,
					dest: 'dist/dev/lib/ui/styles/.variables-override.less'
				}*/]
			},
			"dist-dev2dev": {
				cwd: 'dist/dev',
				src: '**/*.*',
				expand: true,
				dot: true,
				dest: '../target/classes/static/client'
			},
			"dist-prod2dev": {
				cwd: 'dist/prod',
				src: '**/*.*',
				expand: true,
				dot: true,
				dest: '../target/classes/static/client'
			}
		},
		concat: {
			options: {
				process: function(src, filepath) {
					return 'var require = ' + src + ';';
				}
			}
		},
		/* watch: track files modifications and run other tasks */
		watch: {
			app: {
				files: 'src/**/*.*',
				tasks: ['copy:src2dev'],
				options: {
					spawn: false,
					event: ['added', 'changed']
				}
			},
			lib: {
				files: 'node_modules/@croc/webclient/src/**/*.*',
				tasks: ['copy:lib2dev'],
				options: {
					spawn: false,
					event: ['added', 'changed']
				}
			}
		},
		
		less: {
			app: {
				src: ['src/app/**/*.less'],
				expand: true,
				rename: function(dest, src) { return dest + src.replace('.less', '.css'); },
				dest: ''
			},
			dist: {
				src: [
					'dist/dev/lib/**/*.less',
					'dist/dev/modules/**/*.less'
				],
				expand: true,
				rename: function(dest, src) { return dest + src.replace('.less', '.css'); },
				dest: ''
			}
		},
		
		rjs: {
			dist: {
				options: {
					input: 'dist/dev',
					output: 'dist/prod',
					requireConfigFile: 'require.config.json',
					requireConfigOutput: {
						paths: {
							handlebars: "vendor/handlebars/handlebars.runtime"
						}
					},
					dirs: [{
						combine: false,
						name: 'shim'
					}],					
					genericCssUrl: 'app/ui/styles/generic.css', // see your main.config.json `styles` section
					optimizeJs: 'uglify2', // 'none', 'uglify2',
					optimizeCss: 'standard',
					requireConfig: {
						wrapShim: true // wrap non-AMD modules inside define callback, it's important for Fancytree
						/* options for uglifyJS:
						uglify: {
							output: {
								quote_keys: true,
								keep_quoted_props: true,
								screw_ie8: false
							},
							compress: {
								screw_ie8: false
							}
						},*/
					},
					generateSourceMaps: true,
					bundledLocale: 'ru',
					keepBuildDir: false,
					preserveLicenseComments: true,
					layerOverrides: {
						"main": {
							optimizeJs: "none"
						},
						"report-main": {
							optimizeJs: "none"
						}
					}
				}
			}
		},
		 
		// install grunt-shell and run npm-scripts from Grunt:
		shell: {
			typescript: {
				command: "npm run tsc"
			}
		}
	});
	// It's optimization for `watch` task - copy only changed files
	var changedFiles = Object.create(null);
	var onChange = grunt.util._.debounce(function(target) {
		var srcFiles = Object.keys(changedFiles);
		var tasks = grunt.config('watch.' + target + ".tasks");
		if (tasks.length !== 1 ||
			tasks[0].indexOf('copy:') !== 0) {
			return;
		}
		var copyTask = tasks[0].replace(":", ".");
		var data = grunt.config(copyTask);
		//grunt.log.writeln('Before: ' + JSON.stringify(data) );
		var srcFilesResult = [];
		if (data.cwd) {
			srcFiles.forEach(function (filepath) {
				if (filepath.indexOf(data.cwd) > -1) {
					grunt.log.write('Rebasing ' + filepath.cyan + ' -> ');
					filepath = filepath.slice((data.cwd + '/').length);
					srcFilesResult.push(filepath);
					grunt.log.writeln(filepath.cyan);
				}
			});
		}
		if (srcFilesResult.length) {
			grunt.config(copyTask + '.src', srcFilesResult);
		}
		changedFiles = Object.create(null);
	}, 200);
	grunt.event.on('watch', function(action, filepath, target) {
		changedFiles[filepath.replace(/\\/g, '/')] = action;
		onChange(target);
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Aliases:
	grunt.registerTask('dev', ['copy:lib2dev', 'copy:src2dev']);

	grunt.registerTask('build', function (target, target2) {
		var tasks = [
			'less:app',
			'shell:typescript', 
			'clean:dist',
			'copy:dist'
			// If you need to rebuild WebClient's LESS then uncomment 'less:dist' task:
			/*, 'less:dist'*/
		];

		grunt.task.run(tasks);
		if (target === 'dist' && target2 === 'prod' ||
			target === 'prod') {
			// executing `grunt build:dist:prod` or `grunt build:prod`
			// build prod version in dist/prod folder:
			grunt.config.set('copy.dist.options.exclude_ts', true);
			grunt.task.run(['rjs:dist', 'clean:dist_prod', 'cleanempty:prod']);
			if (target === 'prod') {
				grunt.task.run(['clean:dev', 'copy:dist-prod2dev']);
			}
		} else {
			// executing `grunt build:dist` or `grunt build`
			if (!target) {
				grunt.task.run(['clean:dev', 'copy:dist-dev2dev']);
			}
		}
	});

	// Default task
	grunt.registerTask('default', ['dev']);
};
