/*******************************
* CONTROLLER
* Home
*
********************************/

module.exports = function (app) {

    app.controller('WidgetEventController', ["$scope", "EventService", function($scope, EventService) {


        /*******************************
        * Service calls
        ********************************/

        $scope.meetings = EventService.getMeetings()
        $scope.meetingDates = $scope.meetings

        $scope.opportunities = EventService.getOpportunities()
        $scope.opportunityDates = $scope.opportunities

        $scope.quotes = EventService.getQuotes()
        $scope.quoteDates = $scope.quotes

        $scope.tasks = EventService.getTasks()
        $scope.taskDates = $scope.tasks

        $scope.currentDate = EventService.getCurrentDate()
        $scope.dateName = ["start_date","expected_close","expiration_date","due_date"]

        /*******************************
        * sort all function (grabs all dates)
        ********************************/
        $scope.sortAll = function () {
          $scope.meetingDates = $scope.meetings
          $scope.opportunityDates = $scope.opportunities
          $scope.quoteDates = $scope.quotes
          $scope.taskDates = $scope.tasks
        }
        /*******************************
        * sort function
        * @param sortType = (int) hard coded in widget-event.html based on sorting button (today, week, month)
        ********************************/
        $scope.sort = function (sortType) {
          // calls function that adds days to current date (ie. today's date + 7 days = 9/10/16)
          let sortDate = $scope.addDays($scope.currentDate, sortType)

          // calls function that filters dates based on sortDate (ex. 9/10/16)
          //
          // (ie. [9/1/16, 10/10/16] >>> [9/1/16] <= sortDate // so only it would be returned)
          //
          $scope.meetingDates = $scope.filterDates($scope.dateName[0], sortDate, $scope.meetings)
          $scope.opportunityDates = $scope.filterDates($scope.dateName[1], sortDate, $scope.opportunities)
          $scope.quoteDates = $scope.filterDates($scope.dateName[2], sortDate, $scope.quotes)
          $scope.taskDates = $scope.filterDates($scope.dateName[3], sortDate, $scope.tasks)
        }

        /*******************************
        * add days to current date // TODO: move to filter
        * @param date = (anything Date() constructor) current date
        * @param days = number of day to add
        ********************************/
        $scope.addDays = function (date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        /*******************************
        * filter category dates // TODO: move to filter
        * @param dateName = (str) each category had a different name for date so i put this in so I could map a new array.
        * @param sortDate = (date obj) returned from $scope.addDays function
        * @param cat = (function, returns array of objects) category which calls Service function to stay updated
        ********************************/
         $scope.filterDates = function (dateName, sortDate, cat) {
            let dates = cat.map(function(cat){
              return cat[dateName]
            }).filter(function(date){
              return new Date(date) <= sortDate;
            })
            return dates
        }




    }]);


};
