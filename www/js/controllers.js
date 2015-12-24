angular.module('app.controllers', ['ngSanitize'])

  .controller('SearchController', function ($scope, $http) {
    var pendingTask;

    $scope.updateSearch = function () {
      setTimeout(function () {
        requestByName();
      }, 250);
    };

    if ($scope.search === undefined) {
      $scope.search = "Pacifism";
      requestByName();
    }

    $scope.goToCard = function (id) {
      window.location = "#/card/" + id;
    }

    $scope.goToMenu = function () {
      window.location = "#/menu";
    }

    function requestByName() {
      $http.get("https://api.deckbrew.com/mtg/cards?name=" + $scope.search)
        .success(function (response) {
          $scope.cards = response;
        });
    }
  })

.controller('ScoreController', function ($scope, $stateParams, $ionicActionSheet, $ionicPopup) {
  var DEFAULT_PLAYERS_NAME = [
    'Kiora', 'Gideon', 'Jace', 'Ajani', 'Chandra', 'Bolas', 'Sorin'
  ];
  var defaultPlayers = [
    {
      name: "Jace Beleren",
      life: 20,
      infect: 0
    },
    {
      name: "Ajani",
      life: 20,
      infect: 0
    }
  ];

  $scope.players = window.localStorage['Players'] ? JSON.parse(window.localStorage['MTGPlayer']) : defaultPlayers;

  storePlayers = function () {
    window.localStorage['Players'] = JSON.stringify($scope.players);
  }

  $scope.deletePlayer = function (index) {
    $scope.players.splice(index, 1);
    storePlayers();

  }

  $scope.addPlayer = function () {
    var index = DEFAULT_PLAYERS_NAME[(Number(Math.random() * DEFAULT_PLAYERS_NAME.length)) | 0];
    var player = {
      name: index,
      life: 20,
      infect: 0
    }
    $scope.players.push(player);
    storePlayers();
  }

  $scope.changeLP = function (index, hit) {
    $scope.players[index].life += hit;
    if ($scope.players[index].life < 0) $scope.players[index].life = 0;
    storePlayers();
  }

  $scope.resetLP = function (index) {
    $scope.players[index].life = 20;
    storePlayers();
  }

  $scope.changeI = function (index, hit) {
    $scope.players[index].infect += hit;
    if ($scope.players[index].infect < 0) $scope.players[index].infect = 0;
    if ($scope.players[index].infect > 10) $scope.players[index].infect = 10;
    storePlayers();
  }

  $scope.resetI = function (index) {
    $scope.players[index].infect = 0;
    storePlayers();
  }

  $scope.showOptions = function () {
    var MatchOptions = $ionicActionSheet.show({
      buttons: [
        {
          text: 'One X One'
        }
      ],
      titleText: 'Change Match Type',
      cancelText: 'Cancel',
      cancel: function () {

      },
      buttonClicked: function (index) {
        return true;
      }
    });
  }

  $scope.editNamePopup = function (index) {

    var popup = $ionicPopup.alert({
      title: 'Change Name',
      scope: $scope,
      template: '<input ng-model="players[' + index + '].name">'
    });

    storePlayers();
  };


})


.controller('TransitionController', function ($scope, $stateParams) {
  $scope.goToSearch = function () {
    window.location = "#/search";
  }

  $scope.goToMenu = function () {
    window.location = "#/menu";
  }

  $scope.goToMatchManager = function () {
    window.location = "#/matchManager";
  }

  $scope.goToScore = function () {
    window.location = "#/score";
  }
})

.controller('CardController', function ($scope, $http, $stateParams) {

  $scope.cardId = $stateParams.id;
  requestById();

  function requestById() {
    $http.get("https://api.deckbrew.com/mtg/cards/" + $scope.cardId)
      .success(function (response) {
        $scope.card = response;

        //Spliting mana cost string
        $scope.card.cost = $scope.card.cost.split(/[{}]/).filter(function (e) {
          return e;
        });

        for(mana in $scope.card.cost){
          $scope.card.cost[mana] = $scope.card.cost[mana].replace("/","");
        }
         $scope.card.text = $scope.card.text.replace(/(?:\r\n|\r|\n)/g, '<br />');
         $scope.card.text = $scope.card.text.replace(/{(.*?)}/g,
          function replacer(match){
            match = match.replace("{","").replace("}","");

            return "<img src=\"http://gatherer.wizards.com/Handlers/Image.ashx?size=small&type=symbol&name="+match.replace("/","")+"\"/>"
          }
          );
      });
  }

  $scope.goToSearch = function () {
    window.location = "#/search";
  }

  $scope.goToMenu = function () {
    window.location = "#/menu";
  }
});