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
  $http.get("https://api.deckbrew.com/mtg/cards?name="+$scope.search)
    .success(function(response){
      $scope.cards = response;
    });}
})

.controller('ScoreController', function($scope, $stateParams, $ionicActionSheet, $ionicPopup){

  $scope.players = [
        {name:"Jace Beleren", life:20, infect:0},
        {name:"Ajani", life:20, infect:0}
  ];

  $scope.changeLP = function(index,hit){
    $scope.players[index].life += hit;
    if($scope.players[index].life < 0) $scope.players[index].life = 0;
  }

  $scope.resetLP = function(index){
    $scope.players[index].life = 20;
  }

  $scope.changeI = function(index,hit){
    $scope.players[index].infect += hit;
    if($scope.players[index].infect < 0) $scope.players[index].infect = 0;
    if($scope.players[index].infect > 10) $scope.players[index].infect = 10;
  }

  $scope.resetI = function(index){
    $scope.players[index].infect = 0;
  }

  $scope.showOptions = function(){
    var MatchOptions = $ionicActionSheet.show({
      buttons:[
        {text: 'One X One'}
      ],
      titleText: 'Change Match Type',
      cancelText: 'Cancel',
      cancel: function() {

      },
      buttonClicked: function(index){
        return true;
      }
    });
  }

 $scope.editNamePopup = function(index) {

   var popup = $ionicPopup.alert({
     title: 'Change Name',
     scope: $scope,
     template: '<input ng-model="players['+index+'].name">'
   });
 };


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

  $scope.goToScore = function(){
    window.location = "#/score";
  }
})

.controller('CardController', function($scope,  $http, $stateParams){

	$scope.cardId = $stateParams.id;
	requestById();

	function requestById() {
	  	$http.get("https://api.deckbrew.com/mtg/cards/"+$scope.cardId)
	    .success(function(response){
	      $scope.card = response;
        //console.log(response);
    });}

	$scope.goToSearch = function(){
  	window.location = "#/search";
  }

  $scope.goToMenu = function(){
    window.location = "#/menu";
  }
});