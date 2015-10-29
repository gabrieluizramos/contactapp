var app = angular.module('angularAPP', []);
app.controller('angularCtrl', function($scope) {
	$scope.nome= "Gabriel";
	$scope.sobrenome= "Ramos";
	$scope.quantidade= 1;
	$scope.preco= 2;

	$scope.nomes=[
	{nome:'ContactAPP',cidade:'Santos'},
	{nome:'Gabriel Ramos',cidade:'São Vicente'},
	{nome:'IFSP',cidade:'Cubatão'}]
	
});
