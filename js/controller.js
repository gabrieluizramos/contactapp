var app = angular.module('ContactAPP', []);
app.controller('ContactCTRL', function($scope) {
	$scope.nome="ContactAPP";

	$scope.menu0="Início";
	$scope.menu1="Nova Agenda";
	$scope.menu2="Agenda Já Existente";
	$scope.menu3="Como Utilizar";
	$scope.menu4="Localização";
	$scope.menu5="Sobre";

	$scope.btn1="Cadastrar";
	$scope.btn2="Prosseguir";
	$scope.btn3="Confirmar";
	$scope.btn4="Cadastrar";
	$scope.btn5="Apagar";

	$scope.submenu1="Cadastrar Contatos";
	$scope.submenu2="Consultar Contatos";
	$scope.submenu3="Atualizar Contatos";
	$scope.submenu4="Apagar Contatos";

	$scope.desenvolvedor =[ 
	{nome:"Gabriel Ramos, "},
	{nome:"Nícolas Moura, "},
	{nome:"Gabriel Izaguirre, "},
	{nome:"Camila Santos, "},
	{nome:"Ana Clara, "},	
	{nome:"Nathália Pires"}];

});
