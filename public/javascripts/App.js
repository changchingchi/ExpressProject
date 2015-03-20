angular.module('nameApp',['ngRoute'])

.controller('ContactListCtrl',function($scope, $http){

  var refresh = function(){
    $http.get('/contactlist').success(function(response){
      console.log('client received response from server');
      $scope.contactlist = response;

    });
  }

refresh();

  //Data binding and allow contactlist to be use in View. 
    $scope.addContact = function(){
      console.log($scope.contact);
     $http.post('/contactlist',$scope.contact).success(function(response){
      $scope.contact="";
      refresh();

     });
    };

    $scope.removeContact = function(id){
      console.log("id: "+ id);
      $http.delete('/contactlist/' + id);
      refresh();
    };

    $scope.editContact = function(id){
      console.log("edit id: "+ id);
      $http.get('/contactlist/' +id).success(function(response){
        console.log(response);
        $scope.contact = response;
      })
    };
    $scope.updateContact = function(){
      console.log("udpate id: "+ $scope.contact._id);  
      $http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(function(){
        refresh();
      })
      
    }

    $scope.deselect = function(){
      $scope.contact = "";
    }

})