'use strict';

describe('The main view: greeting', function () {
  it('should greet the the named user', function(){
    browser.get("http://localhost:3000/#/");
    element(by.id("user")).getText().then(function(text){
      //console.log(text);
    });
  });
});

describe('The main view: title', function(){
  it('should have a title', function(){
    var title = browser.getTitle();
    expect(title).toEqual('starterAngularBabel');
    //console.log(title);
  });
});

describe('The reusable intc assets in the main view', function(){
  it('should have at least 3 reusable intc assets', function(){
    browser.get("http://localhost:3000/#/");

    var countOpenAssets = element.all(by.repeater('asset in vm.openAssets')).count();
    expect(countOpenAssets).toBeGreaterThan(5);

  });

});
