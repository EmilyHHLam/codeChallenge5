var myApp = angular.module('myApp', []);

myApp.controller('ControllerOne', ['$scope', 'DataService', function($scope, DataService ) {
    console.log('controller 1');
    $scope.postData = DataService.postData;
}]);

myApp.controller('ControllerTwo', ['$scope', 'DataService', function($scope, DataService) {
  console.log('controller 2');
  DataService.getData();
  $scope.messageList= DataService.messageObject;
  console.log('data=' + DataService.messageObject);

}]);
myApp.factory('DataService', ['$http', function($http){
    // var messageObject = {
    //   messages : []
    // };
    messageObject = [];
    var message = {
      name: '',
      message: ''
    };

    function postData(message){
      console.log('message =' + message);
        $http.post('/messages', message).then(function(response){
          getData();
        });
    }

    function getData(){
      $http.get('/messages').then(function(response){
          messageObject.length= 0;
          messageObject.push(response.data);
          console.log('message ' + response.data);
      });
    }
    return {
      messageObject : messageObject,
      getData  : getData,
      postData : postData
    };
}]);
