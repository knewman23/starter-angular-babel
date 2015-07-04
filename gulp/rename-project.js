var gulp = require('gulp');
var $ = {
	replace: require('gulp-replace')
};
var chalk = require('chalk');
var args = require('minimist')(process.argv);
var _ = require('lodash');

var config = require('./config');
var paths = config.paths;


function hasUpperCase(str) {
	return str.toLowerCase() !== str;
}

function renameProject() {
	if (!args.name && !args.n) {
		console.error(chalk.red('You must specify a new name for the project.') + '\n\nUsage:\n    gulp rename-project --name [name]\n    gulp rename-project -n [name]');
		return;
	}

	var oldProjectName = config.projectName;
	var newProjectName = args.name || args.n;

	var oldProjectNameKebab = _.kebabCase(oldProjectName);
	var newProjectNameKebab = _.kebabCase(newProjectName);

	var oldProjectNameCamel = _.camelCase(oldProjectName);
	var newProjectNameCamel = _.camelCase(newProjectName);

	var oldProjectNamePascal = _.capitalize(oldProjectNameCamel);
	var newProjectNamePascal = _.capitalize(newProjectNameCamel);

	if(hasUpperCase(newProjectName)) {
		console.info(chalk.yellow('The project name you provided has been converted to its kebab-case equivalent: ' + chalk.green.bold(newProjectNameKebab) + '.'));
	}

	// if name is unchanged, do nothing
	if(oldProjectName === newProjectNameKebab) {
		console.warn(chalk.yellow('Project name will remain unchanged, as the provided name is the same as the current name.'));
		done();
		return;
	}

	console.log('Changing project name from ' + chalk.gray.bold(oldProjectName) + ' to ' + chalk.green.bold(newProjectNameKebab) + '.');

	// files get renamed using `newProjectName` regardless of kebab-case or camelCase
	return gulp.src([
			'**/*',
			'!**/*.{jpg,jpeg,tiff,gif,png,ico}',
			'!bower_components/**/*',
			'!node_modules/**/*',
			'!.git/**/*',
			'!.idea/**/*',
			'!' + paths.dist + '/**/*',
			'!' + paths.tmp + '/**/*'
		])
		.pipe($.replace(oldProjectNamePascal, newProjectNamePascal))
		.pipe($.replace(oldProjectNameCamel, newProjectNameCamel))
		.pipe($.replace(oldProjectNameKebab, newProjectNameKebab))
		.pipe(gulp.dest('.'));
}

gulp.task('rename-project', renameProject);
