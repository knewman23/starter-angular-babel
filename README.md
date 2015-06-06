[![Dependency Status][david-devdeps-image]][david-devdeps-url]

# starter-angular-babel
Want to build a single-page application using [Angular][angular] and ES6/ES2015? Then this starter is for you!

starter-angular-babel follows the fractal hierarchy approach [recommended by Google for AngularJS applications][google-recommendations]. This approach plays nicely with the Folders-by-Feature approach [advocated by John Papa in his style guide][papa-folders-by-feature].



## Quickstart
Using this starter repo for a new project is simple.
1. Clone this repo
  ```
  git clone https://github.com/vbud/starter-angular-babel.git
  ```
2. Do a project-wide rename of 'starter-angular-babel' and 'starterAngularBabel' to the name of your project.
3. Install dependencies.
  ```
  bower install && npm install
  ```
4. Serve the project. The scaffolded home page open up in a browser tab.
  ```
  gulp serve
  ```

That's it!



## What was this starter built with?
starter-angular-babel was built by running [generator-gulp-angular][generator-gulp-angular] with the following choices:
- [Babel][babel] for using ES6/ES2015
- [Angular 1.3][angular]
- [angular-bootstrap][angular-bootstrap] for jQuery-free UI components
- [Angular UI router][ui-router]
- [node-sass][node-sass] for fast [libsass][libsass]-based CSS pre-processing



## How do I write Angular 1.x in ES6?
This project comes with example controllers, directives, and services, so you can get a feel for how you could write them. Note that ES6 classes really only work well for Angular 1.x controllers and services, and not so well for other things. See [this article][exploring-es6-angular] for some more examples and explanation.



## How do I use this for a project?
`git clone` this repository and do a project-wide replace of the string 'starterAngularBabel'.



## Where are my source JavaScript files in by browser's dev tools?
Debugging JavaScript is different since Babel transpiles everything. Luckily you can still debug as usual in devtools - you just need to open up the webpack tree in your debugger to see your source JavaScript files. This is achieved by using sourcemaps.



## Changelog
To see how this starter has evolved over time, read the [Changelog](CHANGELOG.md).



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
[papa-folders-by-feature]: https://github.com/johnpapa/angular-styleguide#folders-by-feature-structure
[david-devdeps-image]: https://david-dm.org/vbud/starter-angular-babel/dev-status.svg
[david-devdeps-url]: https://david-dm.org/vbud/starter-angular-babel#info=devDependencies
