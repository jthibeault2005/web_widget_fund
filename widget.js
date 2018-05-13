/*
http://alexmarandon.com/articles/web_widget_jquery/
*/
(function() {
// Localize jQuery variable
var jQuery;

/******* jGuage *******/
var jGauge;
var script_gauge = document.createElement('script');

script_gauge.setAttribute("type","text/javascript");
script_gauge.setAttribute("src","http://bernii.github.io/gauge.js/dist/gauge.min.js");

//var element = document.getElementById("widget-container").appendChild(script_gauge);
//var element = document.getElementById("widget-container");
//element.innerHTML = script_gauge;
/******* jGuage *******/

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
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
  });
}
})(); // We call our anonymous function immediately
