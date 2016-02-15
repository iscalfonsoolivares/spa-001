// An example configuration file.
// https://raw.github.com/angular/protractor/master/example/conf.js
exports.config = {
  framework: 'jasmine',
  
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  
  // Spec patterns are relative to the current working directly when
  // protractor is called.
  // uncomment this when use without gulp
  // specs: ['example_spec.js'],  

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};