'use strict';

/* ngInject */
function userService() {

  function getCurrentUser() {
    return Math.random() > 0.5 ? 'Joe Angular' : 'Sally Babel';
  }



  return {
    getCurrentUser: getCurrentUser
  };
}

export default userService;
