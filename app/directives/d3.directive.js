var app = angular.module('store');

	app.directive('d3Directive',function(){ //Lineas y rectangulos
		
		function link(scope, element, attr){
			var mobile = false;
			if(screen.width<720){
				mobile = true;
			}

			var createGraphFunction = function(datos,containerSVG){

				var data = datos;
				var container = containerSVG;
				var w;
				var h;
				var canvasW; //size of canvas al crear "g"
				var canvasH;

				/*if(containerSVG === frentes){
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
				}else*/ if(containerSVG === candidatos){
					ajusteYtexto = 0.15;
					ajusteYfoto = 0.089;
					ajusteYrect = 0.25;
					ajusteYcirc = 0.53;
					ajusteRcirc = 6;
					ajusteXtexto = 48;
					w = 1000;
					h = 500;
					if(mobile === true){
						canvasW = 1000;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 425;
					}
					ajusteHFotos = 45;
					ajusteWFotos = 45;
					tamTexto = 17;
				}else if(containerSVG === candidatosPost){
					ajusteYtexto = 0.15;
					ajusteYfoto = 0.089;
					ajusteYrect = 0.25;
					ajusteYcirc = 0.53;
					ajusteRcirc = 6;
					ajusteXtexto = 48;
					w = 1000;
					h = 500;
					if(mobile === true){
						canvasW = 1000;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 425;
					}
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
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 600;
					}
					tamTexto = 15;
					ajusteHFotos = 38;
					ajusteWFotos = 38;
				}else if(containerSVG === candPasopost){
					w = 1000;
					h = 700;
					ajusteYtexto = 0.1;
					ajusteYfoto = 0.063;
					ajusteYrect = 0.16;
					ajusteYcirc = 0.50;
					ajusteRcirc = 5;
					ajusteXtexto = 42;
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 600;
					}
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
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 600;
					}
					tamTexto = 15;
					ajusteHFotos = 32;
					ajusteWFotos = 32;
				}else if(containerSVG === gralCABA){
					w = 1000;
					h = 350;
					ajusteYtexto = 0.19;
					ajusteYfoto = 0.13;
					ajusteYrect = 0.15;
					ajusteYcirc = 0.53;
					ajusteRcirc = 5;
					ajusteXtexto = 42;
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 350;
					}
					tamTexto = 16;
					ajusteHFotos = 32;
					ajusteWFotos = 32;
				}else if(containerSVG === ballotageCABA){
					w = 1000;
					h = 350;
					ajusteYtexto = 0.45;
					ajusteYfoto = 0.13;
					ajusteYrect = 0.15;
					ajusteYcirc = 0.50;
					ajusteRcirc = 5;
					ajusteXtexto = 27;
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 320;
					}
					tamTexto = 16;
					ajusteHFotos = 85;
					ajusteWFotos = 85;
				}else if(containerSVG === pasoProv){
					w = 1000;
					h = 600;
					ajusteYtexto = 0.125;
					ajusteYfoto = 0.08;
					ajusteYrect = 0.25;
					ajusteYcirc = 0.53;
					ajusteRcirc = 5;
					ajusteXtexto = 42;
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 500;
					}
					tamTexto = 14;
					ajusteHFotos = 38;
					ajusteWFotos = 38;
				}else if(containerSVG === pasoProvPost){
					w = 1000;
					h = 380;
					ajusteYtexto = 0.18;
					ajusteYfoto = 0.12;
					ajusteYrect = 0.205;
					ajusteYcirc = 0.53;
					ajusteRcirc = 6;
					ajusteXtexto = 44;
					if(mobile === true){
						canvasW = 930;
						canvasH = 700;						
					}else{
						canvasW = 730;
						canvasH = 380;
					}
					tamTexto = 14;
					ajusteHFotos = 38;
					ajusteWFotos = 38;
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
				
				
				/*----------------------------------------Funciones de transformación --------------------------------*/
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
						//return comienzoHorGraf + por*sepEntre10/10 + (Math.abs(limInf)*sepEntre10/10)/2;
						return comienzoHorGraf + por*sepEntre10/10;
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
				    .attr("height",function(){
			            	if(containerSVG===ballotageCABA){
			            		return 85;
			            	}else{
			            		return 30;
			            	}
			            }
			        )
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
					    .attr("style",function(d,i){

					    	if(d.cand === "Rodríguez Saa"){
					    		return "font-size:"+12+"px;"
					    	}else{
					    		return "font-size:"+tamTexto+"px;"
					    	}

						})
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
			            .attr("x", function(d,i){
			            	if(containerSVG===ballotageCABA){
			            		return "18px";
			            	}else{
			            		return 0;
			            	}
			            })
			            .attr("y", function(d,i){
			            	return i*0.75*h/data.length+h*ajusteYfoto;
			            })
			            .attr("width", ajusteWFotos)
			            .attr("height", ajusteHFotos)
			            .attr("class","logosCuadros")
			            .attr("id",function(d,i){
			            	return d.cand;
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
					/*if(container===frentes){
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
					}*/

					/*--------------------------------------  CREO SLIDERS ------------------------------------------*/

					var sliderCandPASO = new dhtmlXSlider({parent: "sliderCandPASO", size: 700, min:-8, max:0,step:1});
					var sliderCandPASOpost = new dhtmlXSlider({parent: "sliderCandPASOpost", size: 700, min:-2, max:0,step:1});
					/*discontinued*///var sliderFrentes = new dhtmlXSlider({parent: "sliderFrentes", size: 700, min:-8, max:0,step:1});
					var sliderCandidatos = new dhtmlXSlider({parent: "sliderCandidatos", size: 700, min:-9, max:0,step:1});
					var sliderCandidatosPost = new dhtmlXSlider({parent: "sliderCandidatosPost", size: 700, min:0, max:0,step:1});
					var sliderPasoCABA = new dhtmlXSlider({parent: "sliderPasoCABA", size: 700, min:-1, max:0,step:1});
					var sliderGralCABA = new dhtmlXSlider({parent: "sliderGralCABA", size: 700, min:-2, max:0,step:1});
					var sliderBallotageCABA = new dhtmlXSlider({parent: "sliderBallotageCABA", size: 700, min:0, max:0,step:1});
					var sliderPasoProv = new dhtmlXSlider({parent: "sliderPasoProv", size: 700, min:-3, max:0,step:1});
					//var sliderPasoProvPost = new dhtmlXSlider({parent: "sliderPasoProvPost", size: 700, min:0, max:0,step:1});

					var updateSlider = function(slider){

						scope.$apply(function(){
							if(slider === sliderCandPASO){
								scope.numeroSlider.mesPASO = -slider.getValue();
							}if(slider === sliderCandPASOpost){
								scope.numeroSlider.mesPASOpost = -slider.getValue();
							}else if(slider === sliderCandidatos) {
								scope.numeroSlider.mesPV = -slider.getValue();								
							}else if(slider === sliderCandidatosPost) {
								scope.numeroSlider.mesPV = -slider.getValue();								
							}else /*if(slider === sliderFrentes) {
								scope.numeroSlider.mesFrentes = -slider.getValue();								
							}else */if(slider === sliderPasoCABA) {
								scope.numeroSlider.mesPasoCABA = -slider.getValue();								
							}else if(slider === sliderGralCABA) {
								scope.numeroSlider.mesGralCABA = -slider.getValue();								
							}else if(slider === sliderBallotageCABA) {
								scope.numeroSlider.mesBallotageCABA = -slider.getValue();								
							}else if(slider === sliderPasoProv) {
								scope.numeroSlider.mesPasoProv = -slider.getValue();								
							}/*else if(slider === sliderPasoProvPost) {
								scope.numeroSlider.mesPasoProvPost = -slider.getValue();								
							}*/
						});
						

						switch(scope.numeroSlider.mesPASO){
					    	case 0:
					    		scope.mesSliderPASO = "Junio";
					    		break;
					    	case 1:
					    		scope.mesSliderPASO = "Mayo";
					    		break;
					    	case 2:
					    		scope.mesSliderPASO = "Abril";
					    		break;
					    	case 3:
					    		scope.mesSliderPASO = "Marzo";
					    		break;
					    	case 4:
					    		scope.mesSliderPASO = "Febrero";
					    		break;
					    	case 5:
					    		scope.mesSliderPASO = "Enero";
					    		break;					    	
					    	case 6:
					    		scope.mesSliderPASO = "Diciembre";
					    		break;					    	
					    	case 7:
					    		scope.mesSliderPASO = "Noviembre";
					    		break;					    	
					    	case 8:
					    		scope.mesSliderPASO = "Octubre";
					    		break;
					    	default:
					    		scope.mesSliderPASO = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesPASOpost){
					    	case 0:
					    		scope.mesSliderPASOpost = "Agosto";
					    		break;					    	
					    	case 1:
					    		scope.mesSliderPASOpost = "Julio";
					    		break;					    	
					    	case 2:
					    		scope.mesSliderPASOpost = "Junio";
					    		break;
					    	default:
					    		scope.mesSliderPASOpost = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesPV){
					    	case 0:
					    		scope.mesSliderPV = "Julio";
					    		break;
					    	case 1:
					    		scope.mesSliderPV = "Junio";
					    		break;
					    	case 2:
					    		scope.mesSliderPV = "Mayo";
					    		break;
					    	case 3:
					    		scope.mesSliderPV = "Abril";
					    		break;
					    	case 4:
					    		scope.mesSliderPV = "Marzo";
					    		break;
					    	case 5:
					    		scope.mesSliderPV = "Febrero";
					    		break;					    	
					    	case 6:
					    		scope.mesSliderPV = "Enero";
					    		break;					    	
					    	case 7:
					    		scope.mesSliderPV = "Diciembre";
					    		break;					    	
					    	case 8:
					    		scope.mesSliderPV = "Noviembre";
					    		break;					    	
					    	case 9:
					    		scope.mesSliderPV = "Octubre";
					    		break;
					    	default:
					    		scope.mesSliderPV = "Nada";
					    		break;
						}						
						switch(scope.numeroSlider.mesPVpost){
					    	case 0:
					    		scope.mesSliderPV = "Agosto";
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
					    		scope.mesSliderPasoCABA = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesGralCABA){
					    	case 0:
					    		scope.mesSliderGralCABA = "Julio";
					    		break;						    	
					    	case 1:
					    		scope.mesSliderGralCABA = "Junio";
					    		break;						    	
					    	case 2:
					    		scope.mesSliderGralCABA = "Mayo";
					    		break;							    	
					    	case 3:
					    		scope.mesSliderGralCABA = "Abril";
					    		break;					    	
					    	default:
					    		scope.mesSliderGralCABA = "Nada";
					    		break;
						}						

						switch(scope.numeroSlider.mesBallotageCABA){
					    	case 0:
					    		scope.mesSliderGralCABA = "Julio";
					    		break;						    					    	
					    	default:
					    		scope.mesSliderGralCABA = "Nada";
					    		break;
						}
						switch(scope.numeroSlider.mesPasoProv){
					    	case 0:
					    		scope.mesSliderPasoProv = "Agosto";
					    		break;
					    	case 1:
					    		scope.mesSliderPasoProv = "Julio";
					    		break;
					    	case 2:
					    		scope.mesSliderPasoProv = "Junio";
					    		break;						    	
					    	case 3:
					    		scope.mesSliderPasoProv = "Mayo";
					    		break;					    	
					    	default:
					    		scope.mesSliderPasoProv = "Nada";
					    		break;
						}						

						/*switch(scope.numeroSlider.mesPasoProvPost){
					    	case 0:
					    		scope.mesSliderPasoProv = "Agosto";
					    		break;			    	
					    	default:
					    		scope.mesSliderPasoProv = "Nada";
					    		break;
						}*/

					}
					
					sliderCandPASO.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoCandPASO').html(scope.mesSliderPASO);
						scope.updateGraph(pydCandPaso,scope.candPaso)
						
					});						
					sliderCandPASOpost.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoCandPASOpost').html(scope.mesSliderPASOpost);
						scope.updateGraph(pydCandPasopost,scope.candPasopost)
						
					});					
					/*sliderFrentes.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoFrentes').html(scope.mesSliderFrentes);
						scope.updateGraph(pydFrentes,scope.frentes)
					});			*/		
					sliderCandidatos.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoCandidatos').html(scope.mesSliderPV);
						scope.updateGraph(promydesvs,scope.candidatos)
					});							
					sliderCandidatosPost.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoCandidatosPost').html(scope.mesSliderPVpost);
						scope.updateGraph(promydesvsPost,scope.candidatosPost)
					});					
					sliderPasoCABA.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoPasoCABA').html(scope.mesSliderPasoCABA);
						scope.updateGraph(promydesvPasoCABA,scope.pasoCABA)
					});					

					sliderGralCABA.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoGralCABA').html(scope.mesSliderGralCABA);
						scope.updateGraph(promydesvGralCABA,scope.gralCABA)
					});						

					sliderBallotageCABA.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoBallotageCABA').html(scope.mesSliderBallotageCABA);
						scope.updateGraph(promydesvBallotageCABA,scope.ballotageCABA)
					});					

					sliderPasoProv.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoPasoProv').html(scope.mesSliderPasoProv);
						scope.updateGraph(promydesvPasoProv,scope.pasoProv)
					});					
					/*sliderPasoProvPost.attachEvent("onChange", function(){
						updateSlider(this);
						$('#textoPasoProvPost').html(scope.mesSliderPasoProvPost);
						scope.updateGraph(promydesvPasoProvPost,scope.pasoProvPost)
					});*/


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

						/*if(containerSVG === scope.frentes){
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
						}else */
						if(containerSVG === scope.candidatos){
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
						}else if(containerSVG === scope.candidatosPost){
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
							mesCorresponde = scope.numeroSlider.mesPVpost;
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
						}else if(containerSVG === scope.candPasopost){
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
							mesCorresponde = scope.numeroSlider.mesPASOpost;
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
						}else if(containerSVG === scope.gralCABA){
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
							mesCorresponde = scope.numeroSlider.mesGralCABA;
						}else if(containerSVG === scope.ballotageCABA){
							w = 1000;
							h = 700;
							ajusteYtexto = 0.1;
							ajusteYfoto = 0.065;
							ajusteYrect = 0.15;
							ajusteYcirc = 47.6;
							ajusteRcirc = 5;
							ajusteXtexto = 12;
							canvasW = 720;
							canvasH = 250;
							comienzoVertGraf = 63.5;
							mesCorresponde = scope.numeroSlider.mesBallotageCABA;
						}else if(containerSVG === scope.pasoProv){
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
							mesCorresponde = scope.numeroSlider.mesPasoProv;
						}else if(containerSVG === scope.pasoProvPost){
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
							mesCorresponde = scope.numeroSlider.mesPasoProvPost;
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
						}else if(containerSVG === scope.candidatosPost){

							ajusteYcirc = 54;
							ajusteRcirc = 6;
							comienzoVertGraf = 68;
							data = scope.dataPVpost;
						}else if(containerSVG === scope.candPaso){
							ajusteYcirc = 47.6;
							ajusteRcirc = 4;
							comienzoVertGraf = 63.5;
							data = scope.dataPASO;
							console.log("Data es: " + data);

						}else if(containerSVG === scope.candPasopost){
							ajusteYcirc = 47.6;
							ajusteRcirc = 4;
							comienzoVertGraf = 63.5;
							data = scope.dataPASOpost;
							console.log("Data es: " + data);
							caba = true;
						}else if(containerSVG === scope.pasoCABA){
							ajusteYcirc = 37.5;
							ajusteRcirc = 4;
							comienzoVertGraf = 60;
							data = scope.dataPasoCABA;
							console.log("Data es: " + data);
							caba = true;
						}else if(containerSVG === scope.gralCABA){
							ajusteYcirc = 44;
							ajusteRcirc = 4;
							comienzoVertGraf = 62.5;
							data = scope.dataGralCABA;
							console.log("Data es: " + data);
							caba = true; //VARIABLE PARA AGREGAR RESULTADOS EN ROJO
						}else if(containerSVG === scope.ballotageCABA){
							ajusteYcirc = 132;
							ajusteRcirc = 4;
							comienzoVertGraf = 103.5;
							data = scope.dataBallotageCABA;
							console.log("Data es: " + data);
							caba = true; //VARIABLE PARA AGREGAR RESULTADOS EN ROJO
						}else if(containerSVG === scope.pasoProv){
							ajusteYcirc = 57;
							ajusteRcirc = 4;
							comienzoVertGraf = 69;
							data = scope.dataPasoProv;
							console.log("Data es: " + data);
							caba = true; //VARIABLE PARA AGREGAR RESULTADOS EN ROJO
						}else if(containerSVG === scope.pasoProvPost){
							ajusteYcirc = 57;
							ajusteRcirc = 4;
							comienzoVertGraf = 69;
							data = scope.dataPasoProvPost;
							console.log("Data es: " + data);
							//caba = true; //VARIABLE PARA AGREGAR RESULTADOS EN ROJO
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

							scope.fichaTec = true;
							scope.fichaTecIndex = index;

					}

					scope.removeCirculosEncuestas = function(containerSVG){
						var container = containerSVG;

						container.selectAll(".circProm")
							.transition()
							.style("opacity",0)
							.duration(300);

						container.selectAll(".circProm").remove();

						scope.emptyEncuestas = false;
						scope.fichaTec = false;
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
 							}else if(cand_i === 'Larreta'){
 								var posXNSNC = parseFloat(posX);
 								return posXNSNC-200;
 							}else{
 								return posX-10;
 							}

 						})     
 						.attr("y", function(){
 							if(cand_i === 'NS/NC'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC-130;
 							}else if(cand_i === 'Larreta'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC+50;
 							}else{
 								return posY;
 							}

 						})
					    .attr("height", function(d,i){

					    	if(cand_i === 'Altamira' || cand_i === 'Otros' || cand_i === 'NS/NC' || cand_i === 'FAUNEN'  ){
					    		return 300;
					    	}else{
					    		return 300;
					    	}

					    })
					    .attr("width", 360);

					  textTooltip


					    .attr("height", 150)
					    .attr("width", 50)
					    .text(function(){
					    	if(cand_i === 'Otros'){
					    		return "Otros candidatos obtendrán entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y obtienen un promedio de "+promTooltip+"% de los votos.";
					    	}else if (cand_i === 'NS/NC'){
					    		return "Los indecisos oscilan entre "+lowerLimTooltip.toFixed(2)+"% y "+upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y tienen un promedio de "+promTooltip+"%.";
					    	}else if (containerSVG===ballotageCABA){
					    		return cand_i+" obtendrá entre "+2*lowerLimTooltip.toFixed(2)+"% y "+2*upperLimTooltip.toFixed(2)+"% de los votos con un 95% de probabilidad y obtiene un promedio de "+2*promTooltip+"% de los votos.";
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
 								
 							}else if(cand_i === 'Larreta'){
 								posXNSNC = parseFloat(posX)-200;
 								posNSNCVar = true;
 								return posXNSNC-200;
 								
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
 							}else if(cand_i === 'Larreta'){
 								var posYNSNC = parseFloat(posY);
 								return posYNSNC+70;
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
					  }else if(cand_i === 'Larreta'){
					  	posicionX = posXNSNC2+10;
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

						if(containerSVG === ballotageCABA){
							axisScale = d3.scale.linear()
						         .domain([0, 100])
							     .range([0, 0.58*w]); //58% del ancho total, orginialmente era 580px de 1000px
							     //.attr("class","stag");
						}

						//Create the Axis
						var xAxis = d3.svg.axis()
		                   		.scale(axisScale)
		                   		.tickFormat(function(d) { return d + "%"; });;


						//Create an SVG group Element for the Axis elements and call the xAxis function

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
					//var frentes = d3.selectAll("#svggrafico2");
					//createGraphFunction(scope.datosTotalesFrentes,frentes);					

					var candPaso = d3.selectAll("#svggraficoCandPASO");
					createGraphFunction(scope.datosCandPaso,candPaso);					

					var candPasopost = d3.selectAll("#svggraficoCandPASOpost");
					createGraphFunction(scope.datosCandPasopost,candPasopost);

					var candidatos = d3.selectAll("#svggrafico1");
					createGraphFunction(scope.datosTotales,candidatos);					

					var candidatosPost = d3.selectAll("#svggraficoPVpost");
					createGraphFunction(scope.datosTotalesPost,candidatosPost);					

					var pasoCABA = d3.selectAll("#svggraficoPasoCABA");
					createGraphFunction(scope.datosPasoCABA,pasoCABA);										

					var gralCABA = d3.selectAll("#svggraficoGralCABA");
					createGraphFunction(scope.datosGralCABA,gralCABA);					

					var ballotageCABA = d3.selectAll("#svggraficoBallotageCABA");
					createGraphFunction(scope.datosBallotageCABA,ballotageCABA);

					var pasoProv = d3.selectAll("#svggraficoPasoProv");
					createGraphFunction(scope.datosPasoProv,pasoProv);						

					var pasoProvPost = d3.selectAll("#svggraficoPasoProvPost");
					createGraphFunction(scope.datosPasoProvPost,pasoProvPost);	
			        
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