/* 
https://www.codeproject.com/Articles/81355/Chapter-Creating-Web-Widget-with-HTML-CSS-and-Ja
functionn WidgetCallback(JSONobject) 
{
  var wHelloWorld = JSONobject[0];
  var wHTML = "";
  wHTML += (‘<center><div id=""MyWidget"">’);
  wHTML += (‘<img border=""0"" width="0" height="0" src=""’" />’);
  wHTML += (‘<a target=""_blank"" href=""’" style="text-decoration: none; ">’);
  wHTML += ( wTitle + ‘ ‘ + wHelloWorld.text + ‘</a>’);
  wHTML += (‘</div></center>’);
  document.getElementById(‘myFirstWidget’).innerHTML = wHTML;
document.write(wHTML);
}
*/

/*
var dt = new Date();
document.write(dt.toDateString());
function myDate() {
document.write(dt.toDateString());
}
*/

/*
http://alexmarandon.com/articles/web_widget_jquery/
var foo = "Hello World!";
document.write("<p>Before our anonymous function foo means '" + foo + '".</p>');

(function() {
    // The following code will be enclosed within an anonymous function
    var foo = "Goodbye World!";
    document.write("<p>Inside our anonymous function foo means '" + foo + '".</p>');
})(); // We call our anonymous function immediately

document.write("<p>After our anonymous function foo means '" + foo + '".</p>');
*/

/*
http://alexmarandon.com/articles/web_widget_jquery/
*/
(function() {
// Localize jQuery variable
var jQuery;

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
    });
}
})(); // We call our anonymous function immediately
