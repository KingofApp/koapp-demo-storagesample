(function() {
  'use strict';

  angular
    .module('storagesample', [])
    .controller('storagesampleController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', 'storageService', '$location'];

  function loadFunction($scope, structureService, storageService, $location) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'storagesample');

    //** BUG CON LOS KOA-ITEM TRAYENDO MAS KOA-ITEMS YA QUE PASAN A SER ANDROID-ITEMS, PROBLEMA EN MODULO TIPO CHAT?

    populateList();
    specificItem("test");

    $scope.save = function() {
      //Insert Data to storageService
      storageService.set($scope.storage.name, "Data"+$scope.storage.name).then(function(e) {
        if(e){
          populateList();
          specificItem("test");
          console.log("[V] Storage successful");
        }else {
          console.log("[V] Storage error");
        }

      });
    }
    function populateList() {
      storageService.getAll().then(function(data) {
        $scope.list = data;
      });
    }

    function specificItem(key) {
      storageService.get(key).then(function(data) {
        $scope.specific = data;
      });
    }
  }

}());
