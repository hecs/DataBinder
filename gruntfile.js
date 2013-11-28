module.exports = function(grunt) {

	  // Project configuration.
	grunt.initConfig({
		uglify: {
		files: {
			src: 'DataBinder.js',
			dest: 'DataBinder.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['uglify']);
}