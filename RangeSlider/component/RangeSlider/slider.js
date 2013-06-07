//RangeSlider Component
//SPEC INDIA


var SliderComponent = BaseComponent.extend({
	  slider:undefined,
	  	
	update: function(){
		var myself=this;
		myself.slider = $("#" + myself.htmlObject);
    myself.slider.empty();

    //Component Interface 
    var style='style="width:'+myself.swidth+'px;height:'+myself.sheight+'px;';
    var tooltip = '<div class="tooltip"><div class="tooltip-inner"><span class="slvalue"></span></div><div class="tooltip-arrow"></div></div>';
    var div='<br /><br /><div id="slider-range" '+style+'"></div>';
    	          
    $(div).appendTo(myself.slider);
    
    //Slider Implementation
		$("#slider-range" ).slider({
			range: true,
			min:myself.minLimit ,
			max: myself.maxLimit,
			values: [myself.initialValues[0],myself.initialValues[1]],
			orientation:myself.orientation,
			step:myself.interval,
			slide:function (event,ui){
				if(ui.values[ 0 ]>=100 || ui.values[ 1 ]>=100) $(".tooltip").css('margin-left','-1.4em');
				else if(ui.values[ 0 ]<100 || ui.values[ 1 ]<100)	$(".tooltip").css('margin-left','-1.2em');
				
				//Global Variables
				window[myself.slminvr]=ui.values[ 0 ];
			  window[myself.slmaxvr]=ui.values[ 1 ];	
			  
				$(".slvalue").each(function(i) {
					if(i==0) $(this).text(ui.values[ 0 ]);
					else 	$(this).text(ui.values[ 1 ]);
				});   
			}
		});
		
		window[myself.slminvr]=$( "#slider-range" ).slider( "values", 0 );
		window[myself.slmaxvr]=$( "#slider-range" ).slider( "values", 1 );
		
		$('.ui-slider-handle').html(tooltip);	
		
		$('.tooltip-inner').css('background-color',rgb2hex($('.ui-state-default').css('background-color')));
		
		$('.tooltip-arrow').css('border-top','5px solid '+rgb2hex($('.ui-state-default').css('background-color')));
		
		$('.slvalue').each(function(i) {
			if(i==0) $(this).text($( "#slider-range" ).slider( "values", 0 ));
			else 	$(this).text($( "#slider-range" ).slider( "values", 1 ));
		});
	}
});	

//This function is used to convert RGB value to Hex value.

function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2).toUpperCase() +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2).toUpperCase() +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2).toUpperCase();
 }