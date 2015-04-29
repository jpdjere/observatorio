	app.controller('StoreController', ["$scope",function($scope,$window){
		this.ratings = ratings;
		this.encuestasPASO = encuestasPASO;
		this.encuestasPasoCABA = encuestasPasoCABA;
		this.encuestasPV = encuestasPV;
		$scope.difs = diferencias;
		//this.listaCand =  listaCandSer1;


 
		$scope.margins = [0,10,20,30,40,50,60];

		$scope.datosTotales = promydesvs[0];

		$scope.datosTotalesFrentes = pydFrentes[0];
		
		$scope.datosCandPaso = pydCandPaso[0];
		
		$scope.datosPasoCABA = promydesvPasoCABA[0];

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
		
		//Data del Slider
		$scope.mesSliderPASO;
		$scope.mesSliderPV;
		$scope.mesSliderFrentes;
		$scope.mesSliderPasoCABA;

		$scope.numeroSlider = {mesPASO:0,mesPV:0,mesFrentes:0,mesPasoCABA:0};

		//Data de encuestas
		$scope.dataPASO = dataPASO;
		$scope.dataPV = dataPV;
		$scope.dataPasoCABA = dataPasoCABA;


	}]);