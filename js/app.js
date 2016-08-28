/*******************************
* Upcoming Events APP
* Created by: Caleb Bodtorf
* Date: 8-24-2016
********************************/

(function() {


  let app = angular.module('UpEventApp', ['ngRoute']);

  //router
  app.config(['$routeProvider', function($routeProvider) {
     $routeProvider

     .when('/', {
        templateUrl: 'widget-event.html', controller: 'WidgetEventController'
     })

     .otherwise({
        redirectTo: '/'
     });

  }]);

  app.run(function(){
    $(document).foundation()
  })

  // Services
  require('./services/widget-event-service')(app);

  // Controllers
  require('./controllers/widget-event-controller')(app);




})();
