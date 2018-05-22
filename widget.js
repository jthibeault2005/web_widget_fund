(function() {
/****** Local Variables ******/
var jQuery;
var jGauge;
var titleW = "Makerspace Fundraiser";
var opts_gauge = {
  angle: -0.2, // The span of the gauge arc
  lineWidth: 0.2, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6F6EA0',   // Colors
  colorStop: '#C0C0DB',    // just experiment with them
  strokeColor: '#EEEEEE',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  //Advanced Option
  //staticLabels and staticZones need to be changed in such a way to have their
  // value match.  These are used to create colors and labels around the gauge.
  staticLabels: {
    font: "8px sans-serif",
    labels: [1000, 1500, 2200, 2600, 3000],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
  staticZones: [
    {strokeStyle: "rgb(255,0,0)", min: 0, max: 1000, height: 1.2},
    {strokeStyle: "rgb(200,100,0)", min: 1000, max: 1500, height: 1.2},
    {strokeStyle: "rgb(150,150,0)", min: 1500, max: 2200, height: 1.2},
    {strokeStyle: "rgb(100,200,0)", min: 2200, max: 2600, height: 1.2},
    {strokeStyle: "rgb(0,255,0)", min: 2600, max: 3000, height: 1.2}
  ],
};

/****** Load jGauge ******/
if (window.jGauge === undefined) {
  var script_j = document.createElement('script');
  script_j.setAttribute("type","text/javascript");
  script_j.setAttribute("src","http://bernii.github.io/gauge.js/dist/gauge.min.js");
  // Try to find the head, otherwise default to the documentElement
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_j);
} else {
  // The jGauge version on the window is the one we want to use
  jGauge = window.jGauge;
}
/****** Load jQuery ******/
//http://alexmarandon.com/articles/web_widget_jquery/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
  var script_tag = document.createElement('script');
  script_tag.setAttribute("type","text/javascript");
  script_tag.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          // Restore $ and window.jQuery to their previous values and store the
          // new jQuery in our local jQuery variable
          jQuery = window.jQuery.noConflict(true);
          // Call our main function
          main();
        }
      };
    } else { // Other browsers
      script_tag.onload = function() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        // Call our main function
        main();
      };
    }
  // Try to find the head, otherwise default to the documentElement
  (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
  // The jQuery version on the window is the one we want to use
  jQuery = window.jQuery;
  main();
}

/****** Initialize the Gauge ******/
//Set up the gauge and create the cascade of ids and elements.
function initjGauge() {
  //Create elements to implement through the div in the webpage.
  // This div has the id of "widget-container"
  var canv = document.createElement('canvas');
  var spa = document.createElement('span');
  var hone = document.createElement('H1');
  //honetext is the Headline in the widget
  var honetext = document.createTextNode(titleW);
  var getDIV = document.getElementById("widget-container");
  //Create ids for the newly created elements.
  hone.setAttribute("id","gauge-header");
  hone.setAttribute("align","center");
  hone.appendChild(honetext); 
  canv.setAttribute("id","widget-canvas-container");
  spa.setAttribute("id","gauge-value");
  //CSS styling for the newly created elements.
  getDIV.style.marginBottom = "10px";
  getDIV.style.border = "2px solid black";
  getDIV.style.borderRadius = "25px";
  getDIV.style.padding = "25px";
  getDIV.style.width = "250px";
  getDIV.style.height = "auto";
  hone.style.font = "bold 20px arial,serif";
  hone.style.width = "auto";
  canv.style.width = "250px";
  canv.style.height = "140px";
  spa.style.color = "blue";
  spa.style.font = "bold 20px arial,serif";
  //Display borders for Diagnostics
  //hone.style.border = "2px solid black";
  //canv.style.border = "2px solid black";
  //spa.style.border = "2px solid black";
  //Append the newly created elements to the div element,
  // which resides in the two lines on the webpage.
  getDIV.appendChild(hone);
  getDIV.appendChild(canv);
  getDIV.appendChild(spa);
  //These variables will be the gauge that will be contained by the
  // canvas element.  This will also be where the long list of settings
  // in opts_gauge are loaded.
  var canvtarget = document.getElementById('widget-canvas-container'); // your canvas element
  var gauge = new Gauge(canvtarget).setOptions(opts_gauge); // create sexy gauge!
  //This sets the values and parameters that will be displayed on the gauge.
  gauge.maxValue = 3000;
  gauge.setMinValue(0);
  gauge.animationSpeed = 32;
  gauge.set(1250);
  //This creates the label and places it in the span element based on the
  // id "gauge-value"
  var textRenderer = new TextRenderer(document.getElementById("gauge-value"));
  textRenderer.render = function(g){
    this.el.innerHTML = "$" + (g.displayedValue).toFixed(2);
  };
  gauge.setTextField(textRenderer);
  //Return the gauge element so it can be modified after it's been initiated.
  return gauge;
};

/****** Our main function ******/
function main() { 
  /****** jQuery 1.4.2 ******/
  jQuery(document).ready(function($) { 
    /****** My code ******/
    var jG = initjGauge();
    jG.set(2556.44);

    /****** Server Callback ******/
    //https://stackoverflow.com/questions/6809053/simple-jquery-php-and-jsonp-example
    var w_url = "http://blindpirate.org/misc_scripts/widget_cash.php?callback=?"
    $.getJSON(w_url, 'yesno=yes', function(f) {
      jG.set(f.funds);
    });
    /****** PHP on Server ******/
    //<?php
    //$fname = $_GET['yesno'];
    //if($fname=='yes') {
    //  echo $_GET['callback'] . '(' . "{'funds' : '2599.55'}" . ')';
    //}
    //?>
  });
}
})(); // We call our anonymous function immediately
