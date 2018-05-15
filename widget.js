(function() {
// Localize jQuery variable
var jQuery;

/******* jGuage *******/
var jGauge = document.createElement('script');
jGauge.setAttribute("type","text/javascript");
jGauge.setAttribute("src","http://bernii.github.io/gauge.js/dist/gauge.min.js");
document.getElementsByTagName("head")[0].appendChild(jGauge);
//
/*
var canv = document.createElement('canvas');
canv.setAttribute("id","widget-canvas-container");
document.getElementById("widget-container").appendChild(canv);
var opts = {
  angle: 0.15, // The span of the gauge arc
  lineWidth: 0.44, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.6, // // Relative to gauge radius
    strokeWidth: 0.035, // The thickness
    color: '#000000' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
};
var canvtarget = document.getElementById('widget-canvas-container'); // your canvas element
var gauge = new Gauge(canvtarget).setOptions(opts); // create sexy gauge!
gauge.maxValue = 3000; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 32; // set animation speed (32 is default value)
gauge.set(1250); // set actual value
*/

/*
http://alexmarandon.com/articles/web_widget_jquery/
*/
/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
  var script_tag = document.createElement('script');
  script_tag.setAttribute("type","text/javascript");
  script_tag.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
      if (this.readyState == 'complete' || this.readyState == 'loaded') {
        scriptLoadHandler();
      }
    };
} else { // Other browsers
  script_tag.onload = scriptLoadHandler;
}
// Try to find the head, otherwise default to the documentElement
(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
  // The jQuery version on the window is the one we want to use
  jQuery = window.jQuery;
  main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
  // Restore $ and window.jQuery to their previous values and store the
  // new jQuery in our local jQuery variable
  jQuery = window.jQuery.noConflict(true);
  // Call our main function
  main(); 
}

/******** Our main function ********/
function main() { 
  jQuery(document).ready(function($) { 
    // We can use jQuery 1.4.2 here
    /******* Load CSS *******/
    var css_link = $("<link>", { 
      rel: "stylesheet", 
      type: "text/css", 
      href: "style.css" 
    });
    css_link.appendTo('head');          

    /******* Load HTML *******/
    var jsonp_url = "http://al.smeuh.org/cgi-bin/webwidget_tutorial.py?callback=?";

    $.getJSON(jsonp_url, function(data) {
      $('#widget-container').html("This data comes from another server: " + data.html);
    });
    /****** My code ******/
  });
}
})(); // We call our anonymous function immediately
