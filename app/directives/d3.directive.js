	app.directive('d3Directive',function(){ //Lineas y rectangulos
		
		function link(scope, element, attr){

			var createGraphFunction = function(datos,containerSVG){

				var data = datos;
				var container = containerSVG;
				var w;
				var h;
				var canvasW; //size of canvas al crear "g"
				var canvasH;

				if(containerSVG === frentes){
					ajusteYtexto = 0.15;
					ajusteYfoto = 0.09;
					ajusteYrect = 0.22;
					ajusteYcirc = 0.55;
					ajusteRcirc = 5;
					ajusteXtexto = 48;
					w = 1000;
					h = 500;
					canvasW = 730;
					canvasH = 425;
					ajusteHFotos = 45;
					ajusteWFotos = 45;
					tamTexto = 17;
				}else if(containerSVG === candidatos){
					ajusteYtexto = 0.15;
					ajusteYfoto = 0.089;
					ajusteYrect = 0.25;
					ajusteYcirc = 0.53;
					ajusteRcirc = 6;
					ajusteXtexto = 48;
					w = 1000;
					h = 500;
					canvasW = 730;
					canvasH = 425;
					ajusteHFotos = 45;
					ajusteWFotos = 45;
					tamTexto = 17;
				}else if(containerSVG === candPaso){
					w = 1000;
					h = 700;
					ajusteYtexto = 0.1;
					ajusteYfoto = 0.063;
					ajusteYrect = 0.16;
					ajusteYcirc = 0.50;
					ajusteRcirc = 5;
					ajusteXtexto = 42;
					canvasW = 730;
					canvasH = 600;
					tamTexto = 15;
					ajusteHFotos = 38;
					ajusteWFotos = 38;
				}else if(containerSVG === pasoCABA){
					w = 1000;
					h = 700;
					ajusteYtexto = 0.095;
					ajusteYfoto = 0.063;
					ajusteYrect = 0.10;
					ajusteYcirc = 0.53;
					ajusteRcirc = 5;
					ajusteXtexto = 42;
					canvasW = 730;
					canvasH = 600;
					tamTexto = 15;
					ajusteHFotos = 32;
					ajusteWFotos = 32;
				}

				var barPadding = 1;
				//var x1cuadroDer = 0;
				var x1cuadroDer = 0.3*w;
				var sepEntre10 = 96.6666; //Separación entre líneas vert de graf en px
				var sepEntre10 = 116.4; //Separación entre líneas vert de graf en px
				var comienzoHorGraf = 120; //En px, distancia horiz del 0% del grafico
				var comienzoVertGraf = 40; //En px, distancia vert del comienzo grafico

				var internaPartido = false;
				var pieGraph = false;
				
				
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
				container.attr('width',canvasW).attr('height',canvasH)
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
						//console.log(tempObj);
					  	mouseoverTooltip();
					  
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
					.on("mousemove", function(d,i){
						cand_i = d.cand;
						prom_i = d.prom;
						desv_i = d.desv;
						var tempObj = d3.select(this);
						mousemoveTooltip(tempObj, cand_i, prom_i, desv_i);
						}
					);

					/*------------------------------------CIRCULOS PROMEDIO----------------------------------------*/
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
						});
 					
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
					    .attr("x", ajusteXtexto)				    
					    .attr("y", function(d,i){
					    	return i*0.75*h/data.length+h*ajusteYtexto; //1er: Comienzo de cuadro; 2do: 75% de h dividido la cant de datos, por ; 3er: ajuste
					    })
					    .attr("class","stag-book")
					    .attr("style","font-size:"+tamTexto+"px;")
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
			            .attr("x", 0)
			            .attr("y", function(d,i){
			            	return i*0.75*h/data.length+h*ajusteYfoto;
			            })
			            .attr("width", ajusteWFotos)
			            .attr("height", ajusteHFotos)
			            .attr("class","logosCuadros")
			            .attr("id",function(d,i){
			            	return d.cand;
			            })
			            .on("click",function(d,i){
			            	var partido = d.cand;
			            	var tempObjPart = d3.select(this);
			            	if(containerSVG === frentes){
			            	
								if(internaPartido === false){ //Caso Inicial

									showInternas(partido,tempObjPart);
									scope.dataDonutVE = loadDataForDonut(partido);
				            		console.log("1: " +scope.dataDonutVE[0]);
				            		console.log("1: " +scope.dataDonutVE[1]);
				            		console.log("1: " +scope.dataDonutVE[2]);
				            		console.log(typeof scope.dataDonutVE);
				            		createDonutChart(partido,tempObjPart);

								}else if(internaPartido === partido){ //al volver a hacer click en el escudo del q ta seleccionado, internaPartido es FALSE 
									
									//hideInternas(partido,tempObjPart);
									//internaPartido = false;	
									//$('#donut-chart').html('');

									//FUNCIONES MUDADAS AL HACER CLICK EN LA CRUZ divCruz.on("click")

			            		}else if(internaPartido !== partido){ //
			            			internaPartido = partido; //pongo el partido que corresponde y cargo las funciones
									scope.dataDonutVE = loadDataForDonut(partido);
				            		console.log("Vino la data? VE-----> " + scope.dataDonutVE);
				            		createDonutChart(partido,tempObjPart);
			            		}
			            	}
			            })
					
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
					var groupTooltip = container.append("g").style("opacity", 1e-6).attr("id","tooltip-rects");

					var rectTooltip = groupTooltip.append("rect")
						.attr("class", "tooltip2");

					var textTooltip = groupTooltip.append("text");


					/*--------------------------------------PANEL INTERNAS ----------------------------------------*/
					if(container===frentes){
						var groupInternaPanel = container.append("g").style("opacity", 1e-6).attr("id","groupInternaPanel");
						var internaPanel = groupInternaPanel.append("rect")
							.attr("class", "tooltip2");

						internaPanel

						.attr("width",583)
						.attr("height",375)
						.attr("x",119)
						.attr("y",40);

						var donutChart = groupInternaPanel
							.append("g")
							.attr("id","donut-chart")
							.attr("width",583)
							.attr("height",375)
							.attr("transform", "translate(" + (810) / 2 + "," + (490) / 2 + ")");

						var etiquetasInternas = d3.select('.graphWrapper').insert('div','.exp_underBarGraph')
							.attr("class","etiquetasInternas stag")			
							.attr("width",450)
							.attr("height",100);

						var divCruz = d3.select('.graphWrapper').insert('div','.exp_underBarGraph')
							.attr("class","divCruz")			
							.attr("id","divCruz");

						var iconCruz = divCruz.append("img")
							.attr("id","icono")
							.attr("width","30px")
							.attr("src","images/cross.png");

						divCruz.on("click", function(d,i) {
							hideInternas();
							internaPartido = false;
							$('#donut-chart').html('');	
						});
					}

					/*--------------------------------------  CREO 3 SLIDERS ------------------------------------------*/

					var sliderCandPASO = new dhtmlXSlider({parent: "sliderCandPASO", size: 700, min:-6, max:0,step:1});
					var sliderFrentes = new dhtmlXSlider({parent: "sliderFrentes", size: 700, min:-6, max:0,step:1});
					var sliderCandidatos = new dhtmlXSlider({parent: "sliderCandidatos", size: 700, min:-6, max:0,step:1});
					var sliderPasoCABA = new dhtmlXSlider({parent: "sliderPasoCABA", size: 700, min:-1, max:0,step:1});

					var updateSlider = function(slider){

						scope.$apply(function(){
							if(slider === sliderCandPASO){
								scope.numeroSlider.mesPASO = -slider.getValue();
							}else if(slider === sliderCandidatos) {
								scope.numeroSlider.mesPV = -slider.getValue();								
							}else if(slider === sliderFrentes) {
								scope.numeroSlider.mesFrentes = -slider.getValue();								
							}else if(slider === sliderPasoCABA) {
								scope.numeroSlider.mesPasoCABA = -slider.getValue();								
							}
						});
						

						switch(scope.numeroSlider.mesPASO){
					    	case 0:
					    		scope.mesSliderPASO = "Abril";
					    		break;
					    	case 1:
					    		scope.mesSliderPASO = "Marzo";
					    		break;
					    	case 2:
					    		scope.mesSliderPASO = "Febrero";
					    		break;
					    	case 3:
					    		scope.mesSliderPASO = "Enero";
					    		break;
					    	case 4:
					    		scope.mesSliderPASO = "Diciembre";
					    		break;
					    	case 5:
					    		scope.mesSliderPASO = "Noviembre";
					    		break;					    	
					    	case 6:
					    		scope.mesSliderPASO = "Octubre";
					    		break;
					    	default:
					    		scope.mesSliderPASO = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesPV){
					    	case 0:
					    		scope.mesSliderPV = "Abril";
					    		break;
					    	case 1:
					    		scope.mesSliderPV = "Marzo";
					    		break;
					    	case 2:
					    		scope.mesSliderPV = "Febrero";
					    		break;
					    	case 3:
					    		scope.mesSliderPV = "Enero";
					    		break;
					    	case 4:
					    		scope.mesSliderPV = "Diciembre";
					    		break;
					    	case 5:
					    		scope.mesSliderPV = "Noviembre";
					    		break;					    	
					    	case 6:
					    		scope.mesSliderPV = "Octubre";
					    		break;
					    	default:
					    		scope.mesSliderPV = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesFrentes){
					    	case 0:
					    		scope.mesSliderFrentes = "Abril";
					    		break;
					    	case 1:
					    		scope.mesSliderFrentes = "Marzo";
					    		break;
					    	case 2:
					    		scope.mesSliderFrentes = "Febrero";
					    		break;
					    	case 3:
					    		scope.mesSliderFrentes = "Enero";
					    		break;
					    	case 4:
					    		scope.mesSliderFrentes = "Diciembre";
					    		break;
					    	case 5:
					    		scope.mesSliderFrentes = "Noviembre";
					    		break;						    	
					    	case 6:
					    		scope.mesSliderFrentes = "Octubre";
					    		break;
					    	default:
					    		scope.mesSliderFrentes = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesPasoCABA){
					    	case 0:
					    		scope.mesSliderPasoCABA = "Abril";
					    		break;					    	
					    	case 1:
					    		scope.mesSliderPasoCABA = "Marzo";
					    		break;
					    	default:
					    		scope.mesSliderFrentes = "Nada";
					    		break;
						}

					}
					
					sliderCandPASO.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoCandPASO').html(scope.mesSliderPASO);
						scope.updateGraph(pydCandPaso,scope.candPaso)
						
					});					
					sliderFrentes.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoFrentes').html(scope.mesSliderFrentes);
						scope.updateGraph(pydFrentes,scope.frentes)
					});					
					sliderCandidatos.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoCandidatos').html(scope.mesSliderPV);
						scope.updateGraph(promydesvs,scope.candidatos)
					});					
					sliderPasoCABA.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoPasoCABA').html(scope.mesSliderPasoCABA);
						scope.updateGraph(promydesvPasoCABA,scope.pasoCABA)
					});


					/*--------------------------------------  DONUT CHART ------------------------------------------*/
					function createColorsScales(partido){

					}

					function showInternas(partido, objetoClick){
						
	
						groupInternaPanel.transition()
						  .duration(350)
						  .style("opacity", 1);
						  internaPartido = objetoClick.attr("id");
						  console.log("2 PASO: showInterna: -------->"+ internaPartido);
						$("#divCruz").css("display","block");

					}					

					function hideInternas(partido, objetoClick){
						
						console.log(" PASO OPC: showInterna (segundo IF, si intPar = Par al hacer click: -------->"+ internaPartido);
						groupInternaPanel.transition()
						  .duration(350)
						  .style("opacity", 1e-6);
						$("#divCruz").css("display","none");
						    					

					}

					scope.updateGraph = function(datos,containerSVG){

						//alert(scope.mesGraph.mes);
						var data = datos;
						var container = containerSVG;
						var numMes;
						console.log(scope.mesSlider);

						if(containerSVG === scope.frentes){
							ajusteYtexto = 0.14;
							ajusteYfoto = 0.065;
							ajusteYrect = 0.22;
							ajusteYcirc = 54;
							ajusteRcirc = 5;
							ajusteXtexto = 48;
							w = 1000;
							h = 500;
							canvasW = 720;
							canvasH = 425;
							comienzoVertGraf = 67;
							mesCorresponde = scope.numeroSlider.mesFrentes;
						}else if(containerSVG === scope.candidatos){
							ajusteYtexto = 0.15;
							ajusteYfoto = 0.075;
							ajusteYrect = 0.25;
							ajusteYcirc = 54;
							ajusteRcirc = 6;
							ajusteXtexto = 48;
							w = 1000;
							h = 500;
							canvasW = 720;
							canvasH = 425;
							comienzoVertGraf = 68;
							mesCorresponde = scope.numeroSlider.mesPV;
						}else if(containerSVG === scope.candPaso){
							w = 1000;
							h = 700;
							ajusteYtexto = 0.1;
							ajusteYfoto = 0.065;
							ajusteYrect = 0.15;
							ajusteYcirc = 47.6;
							ajusteRcirc = 5;
							ajusteXtexto = 12;
							canvasW = 720;
							canvasH = 1000;
							comienzoVertGraf = 63.5;
							mesCorresponde = scope.numeroSlider.mesPASO;
						}else if(containerSVG === scope.pasoCABA){
							w = 1000;
							h = 700;
							ajusteYtexto = 0.1;
							ajusteYfoto = 0.065;
							ajusteYrect = 0.15;
							ajusteYcirc = 47.6;
							ajusteRcirc = 5;
							ajusteXtexto = 12;
							canvasW = 720;
							canvasH = 1000;
							comienzoVertGraf = 63.5;
							mesCorresponde = scope.numeroSlider.mesPasoCABA;
						}


						container.selectAll("rect")
							.data(data[mesCorresponde])
							.transition()
					  		.attr("width", function(d){
								return transTopxAncho(4*d.desv,d.prom-2*d.desv); //Tiene un ancho de 4 DSTD, ajuste de funcion resto 390
							})			    									// Si el limite inferior es menor a 0 hay que restar lo q esta por debajo de 0 arriba
							.attr("x", function(d){
								return transTopx(d.prom-2*d.desv);
							})
							.duration(1000);

						container.selectAll("circle")
							.data(data[mesCorresponde])
							.transition()
							.attr("cx",function(d){
								return transTopxAnchoCirculos(d.prom,d.prom-2*d.desv);
							})
							.duration(1000);

					};

					scope.createCirculosEncuestas = function(containerSVG, index){

						var container = containerSVG;
						var data;
						var caba = false;
						if(containerSVG === scope.frentes){

							ajusteYcirc = 54;
							ajusteRcirc = 5;
							comienzoVertGraf = 67;
							data = scope.dataPASO;
						}else if(containerSVG === scope.candidatos){

							ajusteYcirc = 54;
							ajusteRcirc = 6;
							comienzoVertGraf = 68;
							data = scope.dataPV;
						}else if(containerSVG === scope.candPaso){
							ajusteYcirc = 47.6;
							ajusteRcirc = 4;
							comienzoVertGraf = 63.5;
							data = scope.dataPASO;
							console.log("Data es: " + data);
						}else if(containerSVG === scope.pasoCABA){
							ajusteYcirc = 37.5;
							ajusteRcirc = 4;
							comienzoVertGraf = 60;
							data = scope.dataPasoCABA;
							console.log("Data es: " + data);
							caba = true;
						}

						console.log(index);

						container.append("g")//.attr("transform","translate(0,-50)")
							.selectAll("circle")
							.data(data[index])
							.enter()
							.append("circle")
							.attr("r", ajusteRcirc)
							.attr("stroke",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "none";
								}
							})
							.attr("stroke-width","2")
							.attr("fill",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "none";
								}
							})
							.attr("class","circProm")
							.attr("cx",function(d){
								return transTopxAnchoCirculos(d);
							})
							.attr("cy",function(d,i){
								return comienzoVertGraf+i*ajusteYcirc;
							});

						container.selectAll(".circProm")
							.transition()
							.attr("stroke",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "grey";
								}
							})
							.attr("stroke-width","2")
							.attr("fill",function(d,i){
								if(caba === true && index === 0){
									return "red";
								}else{
									return "black";

								}
							})
							.duration(300);

							console.log("Data1: "+data[0][0]);
							console.log("Data2: "+data[0][1]);
							if(data[index][0] === 0 && data[index][1] === 0){
								scope.emptyEncuestas = true;
							}else{
								scope.emptyEncuestas = false;
							}


					}

					scope.removeCirculosEncuestas = function(containerSVG){
						var container = containerSVG;

						container.selectAll(".circProm")
							.transition()
							.style("opacity",0)
							.duration(300);

						container.selectAll(".circProm").remove();

						scope.emptyEncuestas = false;
					}

					function loadDataForDonut(partido){
						var donutDataINT = new Array();
						var donutDataTotal = new Array();
						var donutDataNombres = new Array();

						var donutDataFULL = new Array();

						
						console.log("3 PASO: loadDataForDonut (dsIgual): -------->"+ internaPartido);

						if(partido === 'FR'){
							for(i=0;i<1;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							console.log("Data interna ----> : " +donutDataFULL);
							return donutDataFULL;
						
						}else if(partido === 'FPV'){
							for(i=1;i<6;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							console.log("Data interna ----> : " +donutDataFULL);
							
							return donutDataFULL;
						

						}else if(partido === 'PRO'){
							for(i=6;i<9;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						

						}else if(partido === 'FAUNEN'){
							for(i=9;i<12;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						
						}else if(partido === 'PJ'){
							for(i=12;i<13;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						

						}else if(partido === 'FIT'){
							for(i=13;i<14;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						
						}else if(partido === 'Otros'){
							for(i=14;i<15;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						
						}else if(partido === 'NS/NC'){
							for(i=15;i<16;i++){
								donutDataINT.push(interna[0][i].interna);
								donutDataTotal.push(interna[0][i].total);
								donutDataNombres.push(interna[0][i].cand);
							}
							console.log("Data interna ----> : " +donutDataFULL);
							donutDataFULL.push(donutDataINT);
							donutDataFULL.push(donutDataTotal);
							donutDataFULL.push(donutDataNombres);
							return donutDataFULL;
						};

					}

					var createDonutChart = function(partido,tempObj){

						if(pieGraph !== false){
							console.log(pieGraph);
							$('#texto').remove();
							pieGraph.remove();
						}
						

						donutChart
						.append("g").attr("id","texto")
						.append("text")
						.attr("class","stag")
						.attr("x",-210)
						.attr("y",-170)
						.text("Colocá el mouse sobre el gráfico para ver los candidatos");


						var radius = Math.min(500, 600) / 2;

						var color = createColorsScales(partido);			

						var pie = d3.layout.pie()
						    .sort(null);

						var arc = d3.svg.arc()
						    .innerRadius(radius - 140)
						    .outerRadius(radius - 105);

						//console.log("Justo antes: "+scope.dataDonutVE);

						pieGraph = donutChart.append("g").attr("id","pie-graph");			

						var path = pieGraph.selectAll("path")
						    .data(pie(scope.dataDonutVE[0]))
						  .enter().append("path")
						    .attr("fill", function(d, i) { return color(i); })
						    .attr("d", arc);/*
						    .transition().duration(500)
							.attrTween('d', function(d) {
							     var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
							     return function(t) {
							         d.endAngle = i(t);
							       return arc(d);
							     }
							});*/

						path.on('mouseover', function(d,i) {

							var candidatoTooltip;                          
							var totalTooltip;                          

				            /*-----------------ESCONDO TODAS LAS FOTOS INTERNAS-----------------*/


				            switch (i) {
							    case 0:
							    	if(partido==='FPV'){
							    		candidatoTooltip = '  Daniel  <br />Scioli';
							    		totalTooltip = interna[0][1].total;
							    		
							    	}else if(partido==='FR'){
							    		candidatoTooltip = 'Sergio <br /> Massa';
							    		totalTooltip = interna[0][0].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='PRO'){
							    		candidatoTooltip = 'Mauricio Macri';
							    		totalTooltip = interna[0][6].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='FAUNEN'){
							    		candidatoTooltip = 'Julio  <br />Cobos';
							    		totalTooltip = interna[0][10].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='FIT'){
							    		candidatoTooltip = 'Jorge Altamira';
							    		totalTooltip = interna[0][13].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='PJ'){
							    		candidatoTooltip = 'José M.  <br />De la Sota';
							    		totalTooltip = interna[0][12].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='Otros'){
							    		candidatoTooltip = 'Otros';
							    		totalTooltip = interna[0][14].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='NS/NC'){
							    		candidatoTooltip = 'NS/NC';
							    		totalTooltip = interna[0][15].total;
							    		$('#fotoInt0').css("display","block");
							    	};
							        
							        break;
							    case 1:
							    	if(partido==='FPV'){
							    		candidatoTooltip = 'Florencio Randazzo';
							    		totalTooltip = interna[0][2].total;
							    		$('#fotoInt1').css("display","block");
							    	}else if(partido==='PRO'){
							    		candidatoTooltip = 'Elisa <br />Carrió';
							    		totalTooltip = interna[0][7].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='FAUNEN'){
							    		candidatoTooltip = 'Hermes Binner';
							    		totalTooltip = interna[0][11].total;
							    		$('#fotoInt0').css("display","block");
							    	}							    	
							        break;
							    case 2:
							    	if(partido==='FPV'){
							    		candidatoTooltip = 'Sergio Urribarri';
							    		totalTooltip = interna[0][3].total;
							    		$('#fotoInt1').css("display","block");
							    	}else if(partido==='FAUNEN'){
							    		candidatoTooltip = 'Otros <br /> FAUNEN';
							    		totalTooltip = interna[0][12].total;
							    		$('#fotoInt0').css("display","block");
							    	}else if(partido==='PRO'){
							    		candidatoTooltip = 'Ernesto <br /> Sanz';
							    		totalTooltip = interna[0][9].total;
							    		$('#fotoInt0').css("display","block");
							    	}	
							        
							        break;
							    case 3:
							        if(partido==='FPV'){
							    		candidatoTooltip = 'Julían Domínguez';
							    		totalTooltip = interna[0][4].total;
							    		$('#fotoInt1').css("display","block");
							    	}
							        break;
							    case 4:
							        if(partido==='FPV'){
							    		candidatoTooltip = 'Otros  <br />FPV';
							    		$('#fotoInt1').css("display","block");
							    	}
							        break;
							    case 5:
							        
							        break;
							    case 6:
							        
							        break;
							}

				            etiquetasInternas.html(
				            	
				            	"<div style=\"font-size:25px;margin-bottom:8px\"><center>"+candidatoTooltip+"</center></div>"+
				            	"<div style=\"font-size:17px;margin-bottom:4px\"><center>Sobre interna de "+partido+": "+(d.data*100).toFixed(2) + '%</center></div>'+
				            	"<div style=\"font-size:17px;\"><center>Sobre el total de PASO: "+(totalTooltip*100).toFixed(2) + '%</center></div>'
				            	
				            	
				            	);
				            etiquetasInternas.style('display', 'block');                         
				          });

						path.on('mouseout', function() {
	          				etiquetasInternas.style('display', 'none');
	          				/*for(i=0;i<16;i++){
				            	$('#fotoInt'+i).hide();
				            }*/
	         			});



						/*if(partido !== internaPartido){ //al hacer click en otro, se selecciona el nuevo partido
							internaPartido = partido;
						}*/
	         			
					}


					/*--------------------------------  FUNCIONES DE TOOLTIPS, ETC ----------------------------------*/

					function mouseoverTooltip() {
						
					  groupTooltip.transition()
					    .duration(200)
					    .style("opacity", 1);					  

					};

					function mousemoveTooltip(position, cand_i, prom_i, desv_i) {

						var positionTemp = position;
						var posX = parseInt(positionTemp.attr("x"))+parseInt(positionTemp.attr("width"))+20;
						var posY = parseInt(positionTemp.attr("y"));
						
						var lowerLimTooltip  = parseFloat(prom_i)-2*parseFloat(desv_i);
						var upperLimTooltip  = parseFloat(prom_i)+2*parseFloat(desv_i);
						var promTooltip = prom_i.toFixed(2);
						var posXNSNC;
						var posNSNCVar;

						if(lowerLimTooltip < 0){ //Correción para negativos

							lowerLimTooltip = 0;

						}

					  rectTooltip
					      
					    .attr("x",function(){
 							if(cand_i === 'NS/NC'){
 								var posXNSNC = parseFloat(posX);
 								return posXNSNC-120;
 							}else{
 								return posX-10;
 							}

 						})     
 						.attr("y", function(){
 							if(cand_i === 'NS/NC'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC-130;
 							}else{
 								return posY;
 							}

 						})
					    .attr("height", function(d,i){

					    	if(cand_i === 'Altamira' || cand_i === 'Otros' || cand_i === 'NS/NC' || cand_i === 'FAUNEN'  ){
					    		return 100;
					    	}else{
					    		return 100;
					    	}

					    })
					    .attr("width", 160);

					  textTooltip


					    .attr("height", 150)
					    .attr("width", 50)
					    .text(function(){
					    	if(cand_i === 'Otros'){
					    		return "Otros candidatos obtendrán entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y obtienen un promedio de "+promTooltip+"% de los votos.";
					    	}else if (cand_i === 'NS/NC'){
					    		return "Los indecisos oscilan entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y tienen un promedio de "+promTooltip+"%.";
					    	}else{
					    		return cand_i+" obtendrá entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y obtiene un promedio de "+promTooltip+"% de los votos.";
					    	}
					    })
					    .attr("class","textoTooltip")
					    .attr("x", function(){
 							if(cand_i === 'NS/NC'){
 								posXNSNC = parseFloat(posX);
 								posNSNCVar = true;
 								return posXNSNC;
 								
 							}else{
 								/*var posNSNCVar = false;
 								var posX2= posX-20;
 								return posX2;*/ 								
 								posX2 = parseFloat(posX);
 								posNSNCVar = false;
 								return posX2-30;

 							}

 						})     
					    .call(wrap,145,posX,posXNSNC,cand_i)
					    .attr("y", function(){
 							if(cand_i === 'NS/NC'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC-110;
 							}else{
 								return posY+20;
 							} 							
 						});

					}



					function mouseoutTooltip() {
					  groupTooltip.transition()
					    .duration(200)
					    .style("opacity", 1e-6);
					}

					function wrap(text, width, posX, posXNSNC2, cand_i) {  //Al llamarla, el primer argumento (la selección) esta implicto, cuentan a partir de ahi
					  if(cand_i === 'NS/NC'){
					  	posicionX = posXNSNC2-110;
					  }else{
					  	posicionX = posX;
					  }
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
					        tspan = text.text(null).append("tspan").attr("x",posicionX).attr("y", y).attr("dy", dy+ "em");
					    while (word = words.pop()) {
					      line.push(word);
					      tspan.text(line.join(" "));
					      if (tspan.node().getComputedTextLength() > width) {
					        line.pop();
					        tspan.text(line.join(" "));
					        line = [word];
					        tspan = text.append("tspan").attr("x", posicionX).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
					      }
					    }
					  });
					}

					function createColorsScales(partido){
						switch (partido) {
						    case 'FPV':
								var color = d3.scale.ordinal()
								    .domain([0,1,2,3,4])
								    .range(["#082568","rgba(13, 49, 132,0.94)","#365BB0","#5777C0","#ADC6FF"]);/*"#ADC6FF"*/
								return color;
						    case 'FR':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgba(237, 21, 21, 0.94)"]);
								return color;
						    case 'PRO':
								var color = d3.scale.ordinal()
								    .domain([0,1])
								    .range(["rgb(226, 226, 36)","rgb(231, 168, 32)","#C4B633"]);
								return color;
						    case 'FAUNEN':
								var color = d3.scale.ordinal()
								    .domain([0,1,2,3])
								    .range(["#540033","#720045","#A7166E","#B33983"]);
								return color;
						    case 'FIT':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgb(173, 3, 3)"]);
								return color;
						    case 'PJ':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgb(58, 140, 54)"]);
								return color;
						    case 'Otros':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgb(0, 0, 0)"]);
								return color;    
						    case 'NS/NC':
								var color = d3.scale.ordinal()
								    .domain([0])
								    .range(["rgba(0, 0, 0, 0.38)"]);
								return color;
						}

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
		                   		.scale(axisScale)
		                   		.tickFormat(function(d) { return d + "%"; });;


						//Create an SVG group Element for the Axis elements and call the xAxis function
						if(container===frentes)
						var xAxisGroup = svgContainer.append("g")
									.attr("transform", "translate(120,15)")
									.attr("class", "stag-light")
		                            .call(xAxis)
		                            .append("text")
									    .attr("transform", "translate(-10,-5)")
										.attr("y", 6)
									    .attr("dy", ".71em")
									    //.style("text-anchor", "end")
									    .attr("class", "stag")
									    .style("font-size", "12px");
									    //.text("Hacé click en los logos para ver las internas");
						else{
						var xAxisGroup = svgContainer.append("g")
									.attr("transform", "translate(120,15)")
									.attr("class", "stag-light")
		                            .call(xAxis)
		                            .append("text")
									    .attr("transform", "translate(-10,-5)")
										.attr("y", 6)
									    .attr("dy", ".71em")
									    .style("text-anchor", "end")
									    .attr("class", "stag");
									    //.text("Hacé click en los logos para ver las internas")
									    //.call(wrap,145,150,150);							
						}



					var fotos = [0];
					
					var imgs = d3.select("#svgtitulo").attr("width",990).attr("height",90)
		            .selectAll("image").data(fotos);
					/*
					imgs
						.enter()
					    .append("svg:image")
			            .attr("xlink:href", "images/logo.gif")
			            .attr("x", "20")
			            .attr("y", "10")
			            .attr("width", "60")
			            .attr("height", "60");
					*/
					}

					/*-----------------Corro las dos funciones con los datos y containers que corresponden ---------------*/
					var frentes = d3.select("#svggrafico2");
					createGraphFunction(scope.datosTotalesFrentes,frentes);					

					var candPaso = d3.select("#svggraficoCandPASO");
					createGraphFunction(scope.datosCandPaso,candPaso);

					var candidatos = d3.select("#svggrafico1");
					createGraphFunction(scope.datosTotales,candidatos);					

					var pasoCABA = d3.select("#svggraficoPasoCABA");
					createGraphFunction(scope.datosPasoCABA,pasoCABA);
			        
			        /*-----------------Creo titulo-------------------------------------------------------- ---------------*/
			        var fotos = [0];
			        d3.select("#svgtitulo").selectAll("texto").data(fotos)
			        	.enter()
						.append("text")
					    .attr("x", "23")				    
					    .attr("y", "70")
					    .attr("class","titulo")
					    .text("Observatorio");			        

					d3.select("#svgtitulo").selectAll("texto").data(fotos)
			        	.enter()
						.append("text")
					    .attr("x", "508")				    
					    .attr("y", "70")
					    .attr("class","titulo2")
					    .text("de encuestas");

					}

		return {
			link:link, //fijarse que aca estoy mandando la fcon de arriba
			restrict:'E'
			//scope: {data: '='}
			
		}

	});