/*******************************
* Service
* EventService
*
********************************/

module.exports = function (app) {

  app.factory('EventService', ["$http", function($http) {

      return {

        /*******************************
        * data getters
        ********************************/
        getMeetings() {
          let data = []
          $http({
            url: 'http://localhost:3000/mock/meetings.json',
            method: 'GET'
          }).then(function(response){
            console.log("meeting", response.data);
            angular.copy(response.data, data);
          })
          return data;
        },

        getOpportunities() {
          let data = []
          $http({
            url: 'http://localhost:3000/mock/opportunities.json',
            method: 'GET'
          }).then(function(response){
            console.log("opp", response.data);
            angular.copy(response.data, data);
          })
          return data
        },

        getTasks() {
          let data = []
          $http({
            url: 'http://localhost:3000/mock/tasks.json',
            method: 'GET'
          }).then(function(response){
            console.log("task", response.data);
            angular.copy(response.data, data);
          })
          return data
        },

        getQuotes() {
          let data = []
          $http({
            url: 'http://localhost:3000/mock/quotes.json',
            method: 'GET'
          }).then(function(response){
            console.log("quote", response.data);
            angular.copy(response.data, data);
          })
          return data
        },

        getCurrentDate() {
          let dadate = new Date()
          console.log("date:", dadate);
          return dadate;
        },

      };
  }]);


};
