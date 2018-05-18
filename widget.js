(function() {
/****** Local Variables ******/
var jQuery;
var jGauge;
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
  staticLabels: {
    font: "8px sans-serif",  // Specifies font
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
function initjGauge() {
  var canv = document.createElement('canvas');
  var spa = document.createElement('span');
  var getDIV = document.getElementById("widget-container");
  canv.setAttribute("id","widget-canvas-container");
  spa.setAttribute("id","gauge-value");
  //spa.setAttribute("style","text-align:center");
  getDIV.appendChild(canv);
  getDIV.appendChild(spa);
  //
  var canvtarget = document.getElementById('widget-canvas-container'); // your canvas element
  var gauge = new Gauge(canvtarget).setOptions(opts_gauge); // create sexy gauge!
  gauge.maxValue = 3000; // set max gauge value
  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  gauge.set(1250); // set actual value
  //
  var textRenderer = new TextRenderer(document.getElementById("gauge-value"));
  textRenderer.render = function(g){
    this.el.innerHTML = "$" + (g.displayedValue).toFixed(2);
  };
  gauge.setTextField(textRenderer);
  //
  return gauge;
};

/****** Our main function ******/
function main() { 
  jQuery(document).ready(function($) { 
    // We can use jQuery 1.4.2 here
    /****** Load CSS ******/
    var css_link = $("<link>", { 
      rel: "stylesheet", 
      type: "text/css", 
      href: "style.css" 
    });
    css_link.appendTo('head');          

    /****** Load HTML ******/
    //var jsonp_url = "http://al.smeuh.org/cgi-bin/webwidget_tutorial.py?callback=?";
    //
    //$.getJSON(jsonp_url, function(data) {
    //  $('#widget-container').html("This data comes from another server: " + data.html);
    //});
  });
  /****** My code ******/
  var jG = initjGauge();
}
})(); // We call our anonymous function immediately
