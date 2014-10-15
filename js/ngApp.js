/**
 *
 * @author Filipe Bezerra
 * @version 1.0
 *
 **/
var portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller('IndexController', function($scope){
    $scope.pageData = {
        title : "Portfolio de Filipe Bezerra",
        header : "Portfolio de Filipe Bezerra"
    };

});