module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    autoWatch : true,   
    files: [
      'public/assets/libs/angular/angular.js',
      'public/assets/libs/angular-route/angular-route.js',
      'public/assets/libs/angular-mocks/angular-mocks.js',
      'scripts/**/*.js',
      'scripts/**/*.spec.js'
    ]
  });
};