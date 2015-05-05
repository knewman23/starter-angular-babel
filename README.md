# starter-angular-babel
Want to build a single-page application using [Angular][angular] and ES6/ES2015? Then this starter is for you!

starter-angular-babel follows the fractal hierarchy approach [recommended by Google for AngularJS applications][google-recommendations].



## What was this starter built with?
starter-angular-babel was built by running [generator-gulp-angular][generator-gulp-angular] with the following choices:
- [Babel][babel] for using ES6/ES2015
- [Angular 1.3][angular]
- [angular-bootstrap][angular-bootstrap] for jQuery-free UI components
- [Angular UI router][ui-router]
- [node-sass][node-sass] for fast [libsass][libsass]-based CSS pre-processing



## Does it matter where I put my files?
Yes - to benefit from the fractal approach, you will need to separate your application into pages and components. Each top-level folder under the `src` directory has a purpose.
- `components`: Any component shared between more than one page/component should live here in its own folder. Feel free to nest components if it makes sense (e.g. component1 dependent on another component2, and component2 is only used by component1)
- `pages`: Every page gets its own folder here. As with components, feel free to nest other pages or components in a page folder if it makes sense.
- `services`, `filters`: Other shared files should be split up according to type in the `src` folder at the same level as the `pages` and `components` folders. If a file of any type is only used by one thing, then it is not shared and should be co-located with that thing.

These are just conventions that have worked well for me - feel free to tweak them.



## How do I write Angular 1.x in ES6?
This project comes with example controllers, directives, and services, so you can get a feel for how you could write them.

You don't have to use classes - you can continue to use the same functions you did before, and just use the module loader and whatever ES6 goodness you want (e.g. generators). Classes work well for Angular 1.x controllers and services, and not so well for other things. See [this article][exploring-es6-angular] for some examples and explanation.



## How do I use this for a project?
`git clone` this repository and do a project-wide replace of the string 'starterAngularBabel'.



## Debugging is different - where are my source files?
You can still debug as usual in devtools - you just need to open up the webpack tree in your debugger to see your source files. This is achieved by using sourcemaps.

You'll also notice that you can see your source SCSS files in the debugger too. This is also thanks to sourcemaps. Pretty cool!



## Changelog
To see how this starter has evolved over time, read the [Changelog](CHANGELOG.md).



## TODO
- sourcemaps in production? (will require a refactor, as dev scripts.js/styles.js tasks are not used in build.js, so build.js can't currently see the source, as it builds from what is already in .tmp folder)
- in the gulp build task, handle image references in dependencies better (don't change the folder structure, just bring them in with their existing structure?) 
- move to gulp 4.0 once it gets released



# License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)


[generator-gulp-angular]: https://github.com/Swiip/generator-gulp-angular
[angular-bootstrap]: https://github.com/angular-ui/bootstrap
[angular]: https://github.com/angular/angular.js
[ui-router]: https://github.com/angular-ui/ui-router
[babel]: http://babeljs.io/
[node-sass]: https://github.com/sass/node-sass
[libsass]: https://github.com/hcatlin/libsass
[exploring-es6-angular]: http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x
[google-recommendations]: http://goo.gl/DQtY4y
