"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    /*******************************
    * CONTROLLER
    * Home
    *
    ********************************/

    module.exports = function (app) {

      app.controller('WidgetEventController', ["$scope", "EventService", function ($scope, EventService) {

        /*******************************
        * Service calls
        ********************************/

        $scope.meetings = EventService.getMeetings();
        $scope.meetingDates = $scope.meetings;

        $scope.opportunities = EventService.getOpportunities();
        $scope.opportunityDates = $scope.opportunities;

        $scope.quotes = EventService.getQuotes();
        $scope.quoteDates = $scope.quotes;

        $scope.tasks = EventService.getTasks();
        $scope.taskDates = $scope.tasks;

        $scope.currentDate = EventService.getCurrentDate();
        $scope.dateName = ["start_date", "expected_close", "expiration_date", "due_date"];

        /*******************************
        * sort all function (grabs all dates)
        ********************************/
        $scope.sortAll = function () {
          $scope.meetingDates = $scope.meetings;
          $scope.opportunityDates = $scope.opportunities;
          $scope.quoteDates = $scope.quotes;
          $scope.taskDates = $scope.tasks;
        };
        /*******************************
        * sort function
        * @param sortType = (int) hard coded in widget-event.html based on sorting button (today, week, month)
        ********************************/
        $scope.sort = function (sortType) {
          // calls function that adds days to current date (ie. today's date + 7 days = 9/10/16)
          var sortDate = $scope.addDays($scope.currentDate, sortType);

          // calls function that filters dates based on sortDate (ex. 9/10/16)
          //
          // (ie. [9/1/16, 10/10/16] >>> [9/1/16] <= sortDate // so only it would be returned)
          //
          $scope.meetingDates = $scope.filterDates($scope.dateName[0], sortDate, $scope.meetings);
          $scope.opportunityDates = $scope.filterDates($scope.dateName[1], sortDate, $scope.opportunities);
          $scope.quoteDates = $scope.filterDates($scope.dateName[2], sortDate, $scope.quotes);
          $scope.taskDates = $scope.filterDates($scope.dateName[3], sortDate, $scope.tasks);
        };

        /*******************************
        * add days to current date // TODO: move to filter
        * @param date = (anything Date() constructor) current date
        * @param days = number of day to add
        ********************************/
        $scope.addDays = function (date, days) {
          var result = new Date(date);
          result.setDate(result.getDate() + days);
          return result;
        };

        /*******************************
        * filter category dates // TODO: move to filter
        * @param dateName = (str) each category had a different name for date so i put this in so I could map a new array.
        * @param sortDate = (date obj) returned from $scope.addDays function
        * @param cat = (function, returns array of objects) category which calls Service function to stay updated
        ********************************/
        $scope.filterDates = function (dateName, sortDate, cat) {
          var dates = cat.map(function (cat) {
            return cat[dateName];
          }).filter(function (date) {
            return new Date(date) <= sortDate;
          });
          return dates;
        };
      }]);
    };
  }, {}], 2: [function (require, module, exports) {
    /*******************************
    * Upcoming Events APP
    * Created by: Caleb Bodtorf
    * Date: 8-24-2016
    ********************************/

    (function () {

      var app = angular.module('UpEventApp', ['ngRoute']);

      //router
      app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'widget-event.html', controller: 'WidgetEventController'
        }).otherwise({
          redirectTo: '/'
        });
      }]);

      app.run(function () {
        $(document).foundation();
      });

      // Services
      require('./services/widget-event-service')(app);

      // Controllers
      require('./controllers/widget-event-controller')(app);
    })();
  }, { "./controllers/widget-event-controller": 1, "./services/widget-event-service": 3 }], 3: [function (require, module, exports) {
    /*******************************
    * Service
    * EventService
    *
    ********************************/

    module.exports = function (app) {

      app.factory('EventService', ["$http", function ($http) {

        return {

          /*******************************
          * data getters
          ********************************/

          getMeetings: function getMeetings() {
            var data = [];
            $http({
              url: 'http://localhost:3000/mock/meetings.json',
              method: 'GET'
            }).then(function (response) {
              console.log("meeting", response.data);
              angular.copy(response.data, data);
            });
            return data;
          },
          getOpportunities: function getOpportunities() {
            var data = [];
            $http({
              url: 'http://localhost:3000/mock/opportunities.json',
              method: 'GET'
            }).then(function (response) {
              console.log("opp", response.data);
              angular.copy(response.data, data);
            });
            return data;
          },
          getTasks: function getTasks() {
            var data = [];
            $http({
              url: 'http://localhost:3000/mock/tasks.json',
              method: 'GET'
            }).then(function (response) {
              console.log("task", response.data);
              angular.copy(response.data, data);
            });
            return data;
          },
          getQuotes: function getQuotes() {
            var data = [];
            $http({
              url: 'http://localhost:3000/mock/quotes.json',
              method: 'GET'
            }).then(function (response) {
              console.log("quote", response.data);
              angular.copy(response.data, data);
            });
            return data;
          },
          getCurrentDate: function getCurrentDate() {
            var dadate = new Date();
            console.log("date:", dadate);
            return dadate;
          }
        };
      }]);
    };
  }, {}] }, {}, [2]);