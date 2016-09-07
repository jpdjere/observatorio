var app = angular.module('store');

	app.controller('StoreController', ["$scope",function($scope,$window){
		this.ratings = ratings;
		this.encuestasPASO = encuestasPASO;
		this.encuestasPASOpost = encuestasPASOpost;
		this.encuestasPV = encuestasPV;
		this.encuestasPVpost = encuestasPVpost;
		this.encuestasPasoCABA = encuestasPasoCABA;
		this.encuestasGralCABA = encuestasGralCABA;
		this.encuestasBallotageCABA = encuestasBallotageCABA;
		this.encuestasPasoProv = encuestasPasoProv;
		this.encuestasPasoProvPost = encuestasPasoProvPost;

		$scope.difs = diferencias;
		$scope.difsPost = diferenciasPost;
		//this.listaCand =  listaCandSer1;


 
		$scope.margins = [0,10,20,30,40,50,60];

		$scope.datosTotalesPost = promydesvsPost[0];
		$scope.datosTotales = promydesvs[0];

		$scope.datosTotalesFrentes = pydFrentes[0];
		
		$scope.datosCandPaso = pydCandPaso[0];
		$scope.datosCandPasopost = pydCandPasopost[0];
		
		$scope.datosPasoCABA = promydesvPasoCABA[0];
		$scope.datosGralCABA = promydesvGralCABA[0];		
		$scope.datosBallotageCABA = promydesvBallotageCABA[0];

		$scope.datosPasoProv = promydesvPasoProv[0];
		$scope.datosPasoProvPost = promydesvPasoProvPost[0];
		//$scope.datosGralProv = promydesvGralProv[0];

		$scope.data = promydesvs[0];



		/*-------VARIABLE POST-------*/
		$scope.izqPost = [true,true,true,true,true,true,true];
		$scope.izqIndexPost;
		$scope.derPost = [true,true,true,true,true,true,true];
		$scope.derIndexPost;

		$scope.tempPost;
		$scope.texto_underGraphPost;
		$scope.trustedHtmlPost;
		$scope.ventajaPost = "s0";
		$scope.text4text_underGraphPost;

		$scope.compDifPost;

		/*-------VARIABLE PRE-------*/
		$scope.izq = [true,true,true,true,true,true,true];
		$scope.izqIndex;
		$scope.der = [true,true,true,true,true,true,true];
		$scope.derIndex;

		$scope.temp;
		$scope.texto_underGraph;
		$scope.trustedHtml;
		$scope.ventaja = "s0";
		$scope.text4text_underGraph;

		$scope.compDif;




		$scope.emptyEncuestas = false;
		$scope.fichaTec = false;
		$scope.fichaTecIndex;

		$scope.dataDonutVE = {};

		//Contenedores de graficos
		$scope.frentes = d3.select("#svggrafico2");
		$scope.candPaso = d3.select("#svggraficoCandPASO");
		$scope.candPasopost = d3.select("#svggraficoCandPASOpost");
		$scope.candidatos = d3.select("#svggrafico1");
		$scope.candidatosPost = d3.select("#svggraficoPVpost");
		$scope.pasoCABA = d3.select("#svggraficoPasoCABA");
		$scope.gralCABA = d3.select("#svggraficoGralCABA");		
		$scope.ballotageCABA = d3.select("#svggraficoBallotageCABA");		
		$scope.pasoProv = d3.select("#svggraficoPasoProv");
		$scope.pasoProvPost = d3.select("#svggraficoPasoProvPost");
		//$scope.gralProv = d3.select("#svggraficoGralProv");
		
		//Data del Slider
		$scope.mesSliderPASO;
		$scope.mesSliderPASOpost;
		$scope.mesSliderPV;
		$scope.mesSliderPVPost;
		$scope.mesSliderFrentes;
		$scope.mesSliderPasoCABA;
		$scope.mesSliderBallotageCABA;
		$scope.mesSliderGralCABA;
		$scope.mesSliderPasoProv;
		$scope.mesSliderPasoProvPost;
		//$scope.mesSliderGralProv;

		$scope.numeroSlider = {mesPASO:0,mesPASOpost:0,mesPV:0,mesPVpost:0,mesFrentes:0,mesPasoCABA:0,mesGralCABA:0,mesBallotageCABA:0,mesPasoProv:0,mesPasoProvPost:0};

		//Data de encuestas
		$scope.dataPASO = dataPASO;
		$scope.dataPASOpost = dataPASOpost;
		$scope.dataPV = dataPV;
		$scope.dataPVpost = dataPVpost;
		$scope.dataPasoCABA = dataPasoCABA;
		$scope.dataGralCABA = dataGralCABA;
		$scope.dataBallotageCABA = dataBallotageCABA;
		$scope.dataPasoProv = dataPasoProv;
		$scope.dataPasoProvPost = dataPasoProvPost;

		

		$scope.mobMenuOn = false;
		$scope.devTest = false;
		$scope.diferenciasPrePaso = false;

        $scope.menuChange = function(){
          $scope.mobMenuOn = true;
        }

        $scope.selectMobileOption = function(){
        	$scope.mobMenuOn = false;
        }        

        $scope.devtestChange = function(){
        	$scope.devTest = true;
        }        

        $scope.difPrePasoChange = function(){
        	$scope.diferenciasPrePaso = !$scope.diferenciasPrePaso;
        }

	}]);