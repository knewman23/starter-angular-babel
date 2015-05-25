'use strict';

angular.module('starterAngularBabel', [
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
]);

import './config';
import './services/user.factory';
import './home/assets.factory';
import './home/home.controller';
import './bundledAsset/bundledAsset.directive';
