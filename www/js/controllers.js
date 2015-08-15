angular.module('app.controllers',[])

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

  function requestByName() {
  $http.get("http://api.mtgapi.com/v1/card/name/"+$scope.search)
    .success(function(response){
      $scope.cards = response;
    });}


})

.controller('CardController', function($scope,  $http, $stateParams){

	$scope.cardId = $stateParams.id;
	requestById();

	function requestById() {
	  	$http.get("http://api.mtgapi.com/v1/card/id/"+$scope.cardId)
	    .success(function(response){
	      $scope.card = response;
	      window.alert(card.name);
    });}

	$scope.goToSearch = function(id){
  		window.location = "#/search";
  	}
});