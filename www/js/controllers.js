angular.module('app.controllers', [])
.controller('SearchController', function($scope,  $http){
  var pendingTask;

  $scope.updateSearch = function(){
    setTimeout(function(){ requestByName(); }, 250);
  };
  
  if($scope.search === undefined) {
    $scope.search = "Pacifism";
    requestByName();
  }
  
  $scope.goToCard = function(id){
  	window.location = "#/card/"+id;
  }

  $scope.goToMenu = function(){
    window.location = "#/menu";
  }

  function requestByName() {
  $http.get("http://api.mtgapi.com/v1/card/name/"+$scope.search)
    .success(function(response){
      $scope.cards = response;
    });}
})

.controller('TransitionController', function($scope, $stateParams){
  $scope.goToSearch = function(){
    window.location = "#/search";
  }

  $scope.goToMenu = function(){
    window.location = "#/menu";
  }

  $scope.goToMatchManager = function(){
    window.location = "#/matchManager";
  }
})

.controller('CardController', function($scope,  $http, $stateParams){

	$scope.cardId = $stateParams.id;
	requestById();

	function requestById() {
	  	$http.get("http://api.mtgapi.com/v1/card/id/"+$scope.cardId)
	    .success(function(response){
	      $scope.card = response[0];
        console.log(response);
    });}

	$scope.goToSearch = function(){
  	window.location = "#/search";
  }

  $scope.goToMenu = function(){
    window.location = "#/menu";
  }
});