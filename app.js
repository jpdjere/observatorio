(function(){
	var app = angular.module('store',['ngSanitize']);


	/*app.factory('service', function(){
		var sharedService = {};

		sharedService.listaCandSer1 = [{"cand":"Sergio Massa","fotos":"images/massa_bajav2.png"},
										{"cand":"Daniel Scioli","fotos":"images/scioli_baja.png"},
										{"cand":"Mauricio Macri","fotos":"images/macri_baja.png"},
										{"cand":"Julio Cobos","fotos":"images/cobos_baja.png"},
										{"cand":"Jorge Altamira","fotos":"images/altamira_bajav2.png"},
										{"cand":"Otros","fotos":"images/otros_baja.png"},
										{"cand":"NS/NC","fotos":"images/nsnc_baja.png"}];


		return sharedService;

	});*/

	app.controller('StoreController', ["$scope",function($scope,$window){
		this.ratings = ratings;
		this.encuestas = encuestas;
		$scope.difs = diferencias;
		//this.listaCand =  listaCandSer1;


 
		$scope.margins = [0,10,20,30,40,50,60];

		$scope.datosTotales = promydesvs[0];

		$scope.datosTotalesFrentes = pydFrentes[0];
		

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



	}]);

	app.filter('percentage', ['$filter', function ($filter) {
  		return function (input, decimals) {
   			return $filter('number')(input * 100, 2) + '%';
  		};
	}]);

	app.controller('TabsController', ["$scope",function($scope,$window) {
        this.tab = 3;

        this.isSet = function(checkTab) {
          return this.tab === checkTab;
        };

        this.setTab = function(activeTab) {
          this.tab = activeTab;
        };

      }]);

	app.directive("hoverCand", function(){
		return function (scope, element, attrs){
			element.bind("mouseenter", function(){
				element.addClass("hoverCand");
			});
			element.bind("mouseleave", function(){
				element.removeClass("hoverCand");
			});
		}
	})		

	app.directive('ratingsDirective',function(){ //Para meter HTML
		return{

			restrict:'E',
			templateUrl:"ratings-directive.html"
		}
	});	

	app.directive('encuestasDirective',function(){ //Para meter HTML
		return{

			restrict:'E',
			templateUrl:"encuestas.html"
		}
	});



	app.directive('difsDirective',['$sce',function($sce){ //Para meter HTML$

		return{

			restrict:'E',
			controller: function($scope,$http,$sce){

				$scope.dataGraf = []; //Contienen objetos que contienen MES y DATO, 
				$scope.diferenciasGraf = [];
				$scope.check = [];
				
				$scope.createGraph = function(){

					var myFormatters = d3.locale({
					  "decimal": ".",
					  "thousands": ",",
					  "grouping": [3],
					  "currency": ["$", ""],
					  "dateTime": "%a %b %e %X %Y",
					  "date": "%m/%d/%Y",
					  "time": "%H:%M:%S",
					  "periods": ["AM", "PM"],
					  "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					  "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
					  "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
					  "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
					});
					

					d3.time.format = myFormatters.timeFormat;

					var arrData = $scope.dataGraf;
					/*var arrData = [
					    ["2012-1",200],
					    ["2012-2", 300], 
					    ["2012-3", 150]];
					    */
					     
					var margin = {top: 20, right: 20, bottom: 30, left: 50},
					    width = 960 - margin.left - margin.right,
					    height = 500 - margin.top - margin.bottom;

					var parseDate = d3.time.format("%Y-%m-%d").parse;
					//var parseDate = myFormatters.timeFormat("d-m-Y").parse;

					var x = d3.time.scale()
					    .range([0, 350])

					var y = d3.scale.linear()
					    .range([250, 0]);

					var xAxis = d3.svg.axis()
					    .scale(x)
					    .orient("bottom")
					    //.tickFormat(myFormatters.timeFormat("%e-%b"))
					    .tickFormat(myFormatters.timeFormat("%b"))
					    //.ticks(fechas.length)
					    .ticks(5)
					    //.tickFormat(d3.time.format("%e-%B"));

					var yAxis = d3.svg.axis()
					    .scale(y)
					    .orient("left")
					    .tickFormat(function(d) { 
					    	var prob = d*100; 
					    	var prob2=prob.toFixed(2); 
					    	return prob2 + "%"; 
					    });

					var line;
					var dataTemp = arrData.map(function(d) {
					    return {
					       date: parseDate(d.date),
					       close: d.diferencia
					    };
					 		    

					});

					var line = d3.svg.line()
						    .x(function(d) { return x(d.date); })
						    .y(function(d) { return y(d.close); })
						    .interpolate("linear");

					d3.select("#container").html('');
					var svg = d3.select("#container").append("svg")
					    .attr("width", "100%")
					    .attr("height", "100%")
					  .append("g")
					    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					
					var limiteFechaInf=d3.min(dataTemp, function(d) { return d.date; });
					var limiteFechaSup=d3.max(dataTemp, function(d) { return d.date; });					

					var limitePorcInf=d3.min(dataTemp, function(d) { return d.close; });
					var limitePorcSup=d3.max(dataTemp, function(d) { return d.close; });

					limiteFechaInf.setDate(limiteFechaInf.getDate() - 5);
					limiteFechaSup.setDate(limiteFechaSup.getDate() +15);

					var diferencia_limites = limitePorcSup - limitePorcInf;
					if(diferencia_limites<0.01){
						limitePorcInf=limitePorcInf-0.001;
						limitePorcSup=limitePorcSup+0.001;					
					}else{
						limitePorcInf=limitePorcInf-0.01;
						limitePorcSup=limitePorcSup+0.01;
					}

					/*console.log("------------------------------------");
					console.log("Minimo:" +limiteFechaInf);
					console.log("Maximo:" +limiteFechaSup);
					*/
					
					x.domain([limiteFechaInf,limiteFechaSup]);
					y.domain([limitePorcInf,limitePorcSup]);
					//x.domain([d3.min(dataTemp, function(d) { return d.date; })-1, d3.max(dataTemp, function(d) { return d.date; })+1]);
					//y.domain(d3.extent(dataTemp, function(d) { return d.close; }));

					svg.append("g")
					    .attr("class", "x axis")
					    .attr("transform", "translate(0," + 250 + ")")
					    .call(xAxis);

					svg.append("g")
					    .attr("class", "y axis")
					    .call(yAxis)
					  .append("text")
					    .attr("transform", "rotate(-90)")
					    .attr("y", 6)
					    .attr("dy", ".71em")
					    .style("text-anchor", "end")
					    .style("font-family", "stag")
					    .text("Probabilidad (%)");

					var path = svg.append("path")
					    .datum(dataTemp)
					    .attr("class", "line")
					    .attr("d", line(dataTemp))

					var totalLength = path.node().getTotalLength()-30;
					console.log("Path Length----->" +path.node().getTotalLength());

					path.attr("stroke-dasharray", totalLength + " " + totalLength)
						.attr("stroke-dashoffset", totalLength)
						.transition()
						  .duration(550)
						  .ease("linear")
						  .attr("stroke-dashoffset", 0);
     				 
 					svg.on("click", function(){
				      path      
				        .transition()
				        .duration(550)
				        .ease("linear")
				        .attr("stroke-dashoffset", totalLength);
				    })	
 				}

				$scope.createCompDif = function(){

					if($scope.izqIndex === 0 && $scope.derIndex === 1){//Massa-Scioli
						$scope.compDif = 0;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					} 
					if($scope.izqIndex === 1 && $scope.derIndex === 0){//Scioli-Massa
						$scope.compDif = 6;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}


					if($scope.izqIndex === 0 && $scope.derIndex === 2){//Massa-Macri
						$scope.compDif = 1;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					} 
					if($scope.izqIndex === 2 && $scope.derIndex === 0){//Macri-Massa
						$scope.compDif = 7;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}


					if($scope.izqIndex === 1 && $scope.derIndex === 2){//Scioli-Macri
						$scope.compDif = 2;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					} 
					if($scope.izqIndex === 2 && $scope.derIndex === 1){//Macri-Scioli
						$scope.compDif = 8;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}


					if($scope.izqIndex === 0 && $scope.derIndex === 3){//Massa-Cobos
						$scope.compDif = 3;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					} 
					if($scope.izqIndex === 3 && $scope.derIndex === 0){//Cobos-Massa
						$scope.compDif = 9;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}


					if($scope.izqIndex === 1 && $scope.derIndex === 3){//Scioli-Cobos
						$scope.compDif = 4;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					} 
					if($scope.izqIndex === 3 && $scope.derIndex === 1){//Cobos-Scioli
						$scope.compDif = 10;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}

					if($scope.izqIndex === 2 && $scope.derIndex === 3) {//Macri-Cobos
						$scope.compDif = 5;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 3 && $scope.derIndex === 2){//Cobos-Macri
						$scope.compDif = 11;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}
					/*---------------------------ALTMIRA VS TODOS---------------------*/
					/*---------------------------ALTMIRA VS TODOS---------------------*/
					/*---------------------------ALTMIRA VS TODOS---------------------*/
					/*---------------------------ALTMIRA VS TODOS---------------------*/
					/*---------------------------ALTMIRA VS TODOS---------------------*/
					/*---------------------------ALTMIRA VS TODOS---------------------*/
					if($scope.izqIndex === 0 && $scope.derIndex === 4) {//Massa-Altamira
						$scope.compDif = 12;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 4 && $scope.derIndex === 0){//Altamira-Massa
						$scope.compDif = 16;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}						
					if($scope.izqIndex === 1 && $scope.derIndex === 4) {//Scioli-Altamira
						$scope.compDif = 13;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 4 && $scope.derIndex === 1){//Altamira-Scioli
						$scope.compDif = 17;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}							
					if($scope.izqIndex === 2 && $scope.derIndex === 4) {//Macri-Altamira
						$scope.compDif = 14;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 4 && $scope.derIndex === 2){//Altamira-Macri
						$scope.compDif = 18;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}							
					if($scope.izqIndex === 3 && $scope.derIndex === 4) {//Cobos-Altamira
						$scope.compDif = 15;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 4 && $scope.derIndex === 3){//Altamira-Cobos
						$scope.compDif = 19;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}					
					/*-------------------------------OTROS Y NSNC-------------------------*/
					/*-------------------------------OTROS Y NSNC-------------------------*/
					/*-------------------------------OTROS Y NSNC-------------------------*/
					/*-------------------------------OTROS Y NSNC-------------------------*/
					if($scope.izqIndex === 0 && $scope.derIndex === 5) {//Massa-Otros
						$scope.compDif = 20;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 5 && $scope.derIndex === 0){//Otros-Massa
						$scope.compDif = 29;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}
					if($scope.izqIndex === 0 && $scope.derIndex === 6) {//Massa-NSNC
						$scope.compDif = 21;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 5 && $scope.derIndex === 6){//NSNC-Massa
						$scope.compDif = 30;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}


					if($scope.izqIndex === 1 && $scope.derIndex === 5) {//Scioli-Otros
						$scope.compDif = 22;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 5 && $scope.derIndex === 1){//Otros-Scioli
						$scope.compDif = 31;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}
					if($scope.izqIndex === 1 && $scope.derIndex === 6) {//Scioli-NSNC
						$scope.compDif = 23;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 6 && $scope.derIndex === 1){//NSNC-Scioli
						$scope.compDif = 32;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}


					if($scope.izqIndex === 2 && $scope.derIndex === 5) {//Macri-Otros
						$scope.compDif = 24;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 5 && $scope.derIndex === 2){//Otros-Macri
						$scope.compDif = 33;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}					
					if($scope.izqIndex === 2 && $scope.derIndex === 6) {//Macri-NSNC
						$scope.compDif = 25;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 6 && $scope.derIndex === 2){//NSNC-Macri
						$scope.compDif = 34;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}

					if($scope.izqIndex === 3 && $scope.derIndex === 5) {//Cobos-Otros
						$scope.compDif = 26;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 5 && $scope.derIndex === 3){//Otros-Cobos
						$scope.compDif = 35;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}					
					if($scope.izqIndex === 3 && $scope.derIndex === 6) {//Cobos-NSNC
						$scope.compDif = 27;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 6 && $scope.derIndex === 3){//NSNC-Cobos
						$scope.compDif = 36;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}					


					if($scope.izqIndex === 5 && $scope.derIndex === 6) {//Otros-NSNC
						$scope.compDif = 28;
						$scope.temp = "{{difs[0][compDif]."+$scope.ventaja+" | percentage}}";
					}
					if($scope.izqIndex === 6 && $scope.derIndex === 5){//NSNC-Otros
						$scope.compDif = 37;
						$scope.temp = '{{difs[0][compDif].'+$scope.ventaja+' | percentage}}';
					}





					var checkIzq = 0;
					var checkDer = 0;
					for(var i = 0; i<6; i++){
						if($scope.izq[i] === true){
							
							checkIzq++;
						}
						if($scope.der[i] === true){		
							
							checkDer++;
						}
					}

					if(checkIzq === 6 || checkDer === 6){
						//Si no están los dos lados seleccionados, borra temp
						$scope.temp = ' ';
						$scope.dataGraf.length = 0;
						$scope.diferenciasGraf.length = 0;

					}else{
						//Si están los dos seleccionados, carga la data para el gráfico

						this.compDiftemp = $scope.compDif;
						$scope.dataGraf.length = 0;
						$scope.diferenciasGraf.length = 0;

						function Par(date,diferencia) //objecto Par constructor
						{
							this.date=date;
							this.diferencia=diferencia;
						}

						function createData(mes){
							
							tuva = $scope.dataGraf.push(new Par(fechas[mes],$scope.diferenciasGraf[mes]));
							/*console.log("------------------");
							console.log($scope.dataGraf[0]);
							console.log($scope.dataGraf[0].date);
							console.log($scope.dataGraf[0].diferencia);*/
							
						}

						

						if($scope.ventaja === 's0'){
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s0);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s0
							   	);
							   	$scope.text4text_underGraph = " ganarle a "
							}
						}else if ($scope.ventaja === 's3'){				
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s3);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s3
							   	);
							   	$scope.text4text_underGraph = " sacarle 3 puntos a "
							}
						}else if ($scope.ventaja === 's5'){							
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s5);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s5
							   	);
							   	$scope.text4text_underGraph = " sacarle 5 puntos a "
							}
						}else if ($scope.ventaja === 's10'){						
							for(var i = diferencias.length-1; i>=0; i--){
								console.log("compDiftemp: "+this.compDiftemp);
								console.log(diferencias[i][this.compDiftemp].s10);
							    $scope.diferenciasGraf.push(
							   		diferencias[i][this.compDiftemp].s10
							   	);
							   	$scope.text4text_underGraph = " sacarle 10 puntos a "
							}
						}
					

						for(var i = 0; i<diferencias.length;i++){
							createData(i);
						}

						$scope.createGraph();

						/*--------------------Creo el texto que va bajo el gráfico --------------------------*/
						$scope.texto_underGraph = " "+$scope.datosTotales[$scope.izqIndex].nombComp+ " tiene "+$scope.temp+" de probabilidad de " + $scope.text4text_underGraph+ $scope.datosTotales[$scope.derIndex].nombComp + " en la elección general";
				

					} //ciera else
				} //cierra funcion



				$scope.cambiovalorizq = function(index){
					$scope.izqIndex = index;
					for(var i=0;i<$scope.data.length;i++){
						if(i === index){
							$scope.izq[index] = !$scope.izq[index];																
						}else{
							$scope.izq[i] = true;
						}
						if($scope.der[index] === false){
							$scope.der[index] = !$scope.der[index];	
						}		
					}
					$scope.createCompDif();

				}		
				$scope.cambiovalorder = function(index){
					$scope.derIndex = index;
					for(var i=0;i<$scope.data.length;i++){
						if(i === index){
							$scope.der[index] = !$scope.der[index];
						}else{

							$scope.der[i] = true;
						}
						if($scope.izq[index] === false){
							$scope.izq[index] = !$scope.izq[index];	
						}	
					}
					$scope.createCompDif();

				}

			},
			templateUrl:"difs-directive.html"
		}
	}]);

	app.directive('compile', ['$compile', function ($compile) {
	    return function(scope, element, attrs) {
	        scope.$watch(
	            function(scope) {
	                // watch the 'compile' expression for changes
	                return scope.$eval(attrs.compile);
	            },
	            function(value) {
	                // when the 'compile' expression changes
	                // assign it into the current DOM
	                element.html(value);

	                // compile the new DOM and link it to the current
	                // scope.
	                // NOTE: we only compile .childNodes so that
	                // we don't get into infinite loop compiling ourselves
	                $compile(element.contents())(scope);
	            }
	        );
	    };
	}])




	app.directive('d3Directive',function(){ //Lineas y rectangulos
		
		function link(scope, element, attr){

			var createGraphFunction = function(datos,containerSVG){

				var data = datos;
				var container = containerSVG;
				if(containerSVG === frentes){
					ajusteYtexto = 0.14;
					ajusteYfoto = 0.065;
					ajusteYrect = 0.22;
					ajusteYcirc = 0.55;
					ajusteRcirc = 5;
				}else{
					ajusteYtexto = 0.15;
					ajusteYfoto = 0.075;
					ajusteYrect = 0.25;
					ajusteYcirc = 0.53;
					ajusteRcirc = 6;
				}

				var w = 1000;
				var h = 500;
				var barPadding = 1;
				//var x1cuadroDer = 0;
				var x1cuadroDer = 0.3*w;
				var sepEntre10 = 96.6666; //Separación entre líneas vert de graf en px
				var sepEntre10 = 116.4; //Separación entre líneas vert de graf en px
				var comienzoHorGraf = 120; //En px, distancia horiz del 0% del grafico
				var comienzoVertGraf = 40; //En px, distancia vert del comienzo grafico
				
				/*----------------------------------------Funciones de transformacion --------------------------------*/
				var transTopx = function(por){
					var res = comienzoHorGraf+por*sepEntre10/10; //regla de 3, si el 10% es sepEntre10 (96,66px) cuanto es Res
					if(res>comienzoHorGraf){
						return res;
					}else{return comienzoHorGraf};
				};
				var transTopxAncho = function(por,limInf){
					var res = por*sepEntre10/10;
					if(limInf<0){
						var res2 = res - Math.abs(limInf)*sepEntre10/10;
						return res2;
					}else{
						return res;
					};
				};					

				var transTopxAnchoCirculos = function(por,limInf){
					//var res = comienzoHorGraf + por*sepEntre10/10;
					if(limInf<0){
						return comienzoHorGraf + por*sepEntre10/10 + (Math.abs(limInf)*sepEntre10/10)/2;
					}else{
						return comienzoHorGraf + por*sepEntre10/10;
					};
				};				
				
				/*----------------------------------------Creacion de Canvas y RECTANGULOS DE AREA --------------------------------*/
				container.attr('width',720).attr('height',600)
				.append("g")
				.selectAll("rect")
					.data(data)
					.enter()
				    .append("rect")
				    .attr("height",30)
				    .attr("width", function(d){
				    	return transTopxAncho(4*d.desv,d.prom-2*d.desv); //Tiene un ancho de 4 DSTD, ajuste de funcion resto 390
				    })			    									// Si el limite inferior es menor a 0 hay que restar lo q esta por debajo de 0 arriba
				    .attr("y", function(d,i){
				    	return comienzoVertGraf+(0.75*h/data.length)*(i+ajusteYrect);}) //Factor comun 
				    	//1er: Comienzo de cuadro; 2do: 75% de h dividido la cant de datos, por ; 3er: ajuste

				    .attr("x", function(d){
				    	return transTopx(d.prom-2*d.desv);
				    })


				    .classed("rectNorm",true)
					.on("mouseover", function() {
						var tempObj = d3.select(this);
						console.log(tempObj);
					  	mouseoverTooltip(tempObj);
					  
					  d3.select(this)
					    
					    .classed("rectNorm", false ) 
					    .classed("rectHover", true );
					})					
					.on("mouseout", function() {
					  mouseoutTooltip();
					  d3.select(this)
					   
					    .classed("rectNorm", true ) 
					    .classed("rectHover", false ); 
					})
					.on("mousemove", function(){
						var tempObj = d3.select(this);
						mousemoveTooltip(tempObj)
						}
					);

					/*-----------------------CIRCULOS PROMEDIO-------------------------*/
					container.append("g")//.attr("transform","translate(0,-50)")
						.selectAll("circle")
						.data(data)
						.enter()
						.append("circle")
						.attr("r", ajusteRcirc)
						.attr("stroke","black")
						.attr("stroke-width","2")
						.attr("fill","white")
						.attr("cx",function(d){
							return transTopxAnchoCirculos(d.prom,d.prom-2*d.desv);
						})
						.attr("cy",function(d,i){
							return comienzoVertGraf+(0.75*h/data.length)*(i+ajusteYcirc);
						})
 					
 					/*----------------------------------------LINEAS HORIZONTALES --------------------------------*/	
 						var qLineasHoriz = new Array(data.length+1);
	 				container.append("g")
	 					.selectAll("line")
						.data(qLineasHoriz)	
						.enter()
					    .append("line")
					    .attr("x1",0)
					    .attr("y1",function(d,i){
					    	return 40+i*0.75*h/data.length;
					    })
					    .attr("x2",702)
					    .attr("y2",function(d,i){
					    	return 40+i*0.75*h/data.length;
					    })
					    .classed("lineashor",true);

					/*----------------------------------------NOMBRE DE CANDIDATOS --------------------------------*/
					container.append("g")
						.selectAll("text2")
						.data(data)	
						.enter()
					    .append("text")
					    .attr("x", 48)				    
					    .attr("y", function(d,i){
					    	return i*0.75*h/data.length+h*ajusteYtexto; //1er: Comienzo de cuadro; 2do: 75% de h dividido la cant de datos, por ; 3er: ajuste
					    })
					    .attr("class","stag-book")
					    .attr("style","font-size:17px")
					    .text(function(d){
					    	return d.cand;
					    });

					/*----------------------------------------FOTOS DE CANDIDATOS --------------------------------*/
					container.append("g") 
		            .selectAll("image").data(data)
						.enter()
					    .append("svg:image")
			            .attr("xlink:href", function(d,i){
			            	return ""+d.fotos+"";
			            })
			            .attr("x", -8)
			            .attr("y", function(d,i){
			            	return i*0.75*h/data.length+h*ajusteYfoto;
			            })
			            .attr("width", "60")
			            .attr("height", "60");

			        /*----------------------------------------LINEAS VERTICALES --------------------------------*/
			 		container.append("g") 
			 			.selectAll("line2")
						.data([1,2,3,4,5,6])	
						.enter()
					    .append("line")
					    .attr("y1",comienzoVertGraf)
					    .attr("x1",function(d,i){
					    	return comienzoHorGraf+i*sepEntre10;

					    })
					    .attr("y2",function(d,i){
					    	return comienzoVertGraf+(h*0.75);
					    })
					    .attr("x2",function(d,i){
					    	return comienzoHorGraf+i*sepEntre10;
					    })
					    .style("stroke","rgba(96, 96, 108, 0.94)")
					    .style("stroke-width",1)
					    .style("stroke-dasharray","2,2");

					/*--------------------------------------RECTANGULO TOOLTIP--------------------------------------*/
					var groupTooltip = container.append("g").style("opacity", 1e-6);

					var rectTooltip = groupTooltip.append("rect")
						.attr("class", "tooltip2");

					var textTooltip = groupTooltip.append("text");

					function mouseoverTooltip() {
						
					  groupTooltip.transition()
					    .duration(200)
					    .style("opacity", 1);					  

					}

					function mousemoveTooltip(position) {

					var positionTemp = position;
					var posX = parseInt(positionTemp.attr("x"))+parseInt(positionTemp.attr("width"))+20;
					var posY = parseInt(positionTemp.attr("y"));

					  rectTooltip
					      
					    .attr("x", posX)     
 						.attr("y", posY)
					    .attr("height", 150)
					    .attr("width", 150);

					  textTooltip


					    .attr("height", 150)
					    .attr("width", 50)
					    .text("Lorem ipsum loirr otrto pusis meo losldo gilton lados iundres tiruti")
					    .attr("class","textoTooltip")
					    .call(wrap,150,posX+10)
					    .attr("x", posX+20)     
 						.attr("y", posY+20);



					}

					function mouseoutTooltip() {
					  groupTooltip.transition()
					    .duration(200)
					    .style("opacity", 1e-6);
					}

					function wrap(text, width, posX) {  //Al llamarla, el primer argumento (la selección) esta implicto, cuentan a partir de ahi
					  text.each(function() {
					    var text = d3.select(this),
					        words = text.text().split(/\s+/).reverse(),
					        word,
					        line = [],
					        lineNumber = 0,
					        lineHeight = 1.1, // ems
					        y = text.attr("y"),
					        //dy = parseFloat(text.attr("dy")),
					        dy = 0,
					        tspan = text.text(null).append("tspan").attr("x",posX).attr("y", y).attr("dy", dy+ "em");
					    while (word = words.pop()) {
					      line.push(word);
					      tspan.text(line.join(" "));
					      if (tspan.node().getComputedTextLength() > width) {
					        line.pop();
					        tspan.text(line.join(" "));
					        line = [word];
					        tspan = text.append("tspan").attr("x", posX).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					      }
					    }
					  });
					}

					    /*----------------------------------------       EJE      --------------------------------*/
						//Create the SVG Viewport
		 				var svgContainer = container;

						//Create the Scale we will use for the Axis
						var axisScale = d3.scale.linear()
						         .domain([0, 50])
							     .range([0, 0.58*w]); //58% del ancho total, orginialmente era 580px de 1000px
							     //.attr("class","stag");

						//Create the Axis
						var xAxis = d3.svg.axis()
		                   		.scale(axisScale);


						//Create an SVG group Element for the Axis elements and call the xAxis function
						var xAxisGroup = svgContainer.append("g")
									.attr("transform", "translate(120,15)")
									.attr("class", "stag-light")
		                            .call(xAxis)
		                            .append("text")
									    .attr("transform", "translate(-10,-5)")
									    .attr("y", 6)
									    .attr("dy", ".71em")
									    .style("text-anchor", "end")
									    .attr("class", "stag")
									    .text("Porcentaje (%)");



					var fotos = [0];
					var imgs = d3.select("#svgtitulo").attr("width",972).attr("height",90)
		            .selectAll("image").data(fotos);
					imgs
						.enter()
					    .append("svg:image")
			            .attr("xlink:href", "images/logo.gif")
			            .attr("x", "20")
			            .attr("y", "10")
			            .attr("width", "60")
			            .attr("height", "60");
				
					}

					/*-----------------Corro las dos funciones con los datos y containers que corresponden ---------------*/
					var frentes = d3.select("#svggrafico2");
					createGraphFunction(scope.datosTotalesFrentes,frentes);

					var candidatos = d3.select("#svggrafico1");
					createGraphFunction(scope.datosTotales,candidatos);
			        
			        /*-----------------Creo titulo-------------------------------------------------------- ---------------*/
			        var fotos = [0];
			        d3.select("#svgtitulo").selectAll("texto").data(fotos)
			        	.enter()
						.append("text")
					    .attr("x", "90")				    
					    .attr("y", "65")
					    .attr("class","titulo")
					    .text("Observatorio de Encuestas");

					}

		return {
			link:link, //fijarse que aca estoy mandando la fcon de arriba
			restrict:'E'
			//scope: {data: '='}
			
		}

	});

	
})();



