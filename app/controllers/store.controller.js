var app = angular.module('store');

	app.controller('StoreController', ["$scope",function($scope,$window){
		this.ratings = ratings;
		this.encuestasPASO = encuestasPASO;
		this.encuestasPV = encuestasPV;
		this.encuestasPasoCABA = encuestasPasoCABA;
		this.encuestasGralCABA = encuestasGralCABA;
		this.encuestasPasoProv = encuestasPasoProv;
		$scope.difs = diferencias;
		//this.listaCand =  listaCandSer1;


 
		$scope.margins = [0,10,20,30,40,50,60];

		$scope.datosTotales = promydesvs[0];

		$scope.datosTotalesFrentes = pydFrentes[0];
		
		$scope.datosCandPaso = pydCandPaso[0];
		
		$scope.datosPasoCABA = promydesvPasoCABA[0];
		$scope.datosGralCABA = promydesvGralCABA[0];		
		$scope.datosPasoProv = promydesvPasoProv[0];
		//$scope.datosGralProv = promydesvGralProv[0];

		$scope.data = promydesvs[0];


		$scope.compDif;
		$scope.izq = [true,true,true,true,true,true,true];
		$scope.izqIndex;
		$scope.der = [true,true,true,true,true,true,true];
		$scope.derIndex;
		$scope.temp;
		$scope.texto_underGraph;
		$scope.trustedHtml;
		$scope.ventaja = "s0";
		$scope.text4text_underGraph;
		$scope.emptyEncuestas = false;

		$scope.dataDonutVE = {};

		//Contenedores de graficos
		$scope.frentes = d3.select("#svggrafico2");
		$scope.candPaso = d3.select("#svggraficoCandPASO");
		$scope.candidatos = d3.select("#svggrafico1");
		$scope.pasoCABA = d3.select("#svggraficoPasoCABA");
		$scope.gralCABA = d3.select("#svggraficoGralCABA");		
		$scope.pasoProv = d3.select("#svggraficoPasoProv");
		//$scope.gralProv = d3.select("#svggraficoGralProv");
		
		//Data del Slider
		$scope.mesSliderPASO;
		$scope.mesSliderPV;
		$scope.mesSliderFrentes;
		$scope.mesSliderPasoCABA;
		$scope.mesSliderGralCABA;
		$scope.mesSliderPasoProv;
		//$scope.mesSliderGralProv;

		$scope.numeroSlider = {mesPASO:0,mesPV:0,mesFrentes:0,mesPasoCABA:0,mesGralCABA:0,mesPasoProv:0};

		//Data de encuestas
		$scope.dataPASO = dataPASO;
		$scope.dataPV = dataPV;
		$scope.dataPasoCABA = dataPasoCABA;
		$scope.dataGralCABA = dataGralCABA;
		$scope.dataPasoProv = dataPasoProv;

		

		$scope.mobMenuOn = false;

        $scope.menuChange = function(){
          $scope.mobMenuOn = true;
        }

        $scope.selectMobileOption = function(){
        	$scope.mobMenuOn = false;
        }

	}]);