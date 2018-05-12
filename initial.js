(function() {
var jQuery;

 if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.7.1') {
   var script_tag = document.createElement('script');
   script_tag.setAttribute("type","text/javascript");
   script_tag.setAttribute("src",
       "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
   if (script_tag.readyState) {
     script_tag.onreadystatechange = function () { // For old versions of IE
         if (this.readyState == 'complete' || this.readyState == 'loaded') {
             scriptLoadHandler();
         }
     };
   } else { // Other browsers
     script_tag.onload = scriptLoadHandler;
   }
   (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);    
 } else {    
   jQuery = window.jQuery;
   main(); //our main JS functionality
 }

 function scriptLoadHandler() {
   jQuery = window.jQuery.noConflict(true);

   main(); //our main JS functionality
 }

function main() {     
   jQuery(document).ready(function($) {
     
     //setup vars
     var homeURL = 'http://mywebsite.com/';
     
     var css_link = $("<link>", { 
       rel: "stylesheet", 
       type: "text/css", 
       href: baseURL + "widgets/style.css" 
     });

    var $container = $('#mywebsite-container');

    //inject CSS required for widget
    css_link.appendTo('head');

     //an initial JSON request for data
     $.getJSON(homeURL + 'widgets/initial.json?callback=?', function(response) {
       $container.append(response.html);
       $container.find('input[type="text"]').each(function(idx, el) {
         $(el).val($(el).data('label'));
       });
       
       $container.find('input[type="button"]').click(function(e) {
         e.preventDefault();
         
         var itemType = $(this).parent().parents('div:first').attr('id');
         fetchItem(itemType, 1)
       });
     }, 'html');
     

     //Create delegates for click events. 
     //Different actions for different items.
     $container.delegate('.pagination a', 'click', function(e) {
       e.preventDefault();
       
       var itemType = $(this).parent().parent().parent().attr('id');
       var page     = $(this).text();
       fetchItem(itemType, page);
     });
     
     $container.delegate('.custom-tabs a', 'click', function(e) {
       e.preventDefault();
       
       $('.custom-tabs').find('.custom-selected').removeClass('custom-selected');
       $('.custom-content').hide();
       $('.custom-content:eq(' + $(this).index('.custom-tabs a') + ')').show();
       $(this).parent().addClass('custom-selected');
     });
     
     //custom function to fetch appropriate data and replace existing HTML with response.
     function fetchItem(id, page) {
       var $form = $('#' + id).find('form');
       var endpoint = id.replace(/custom-/, '');
       var json = { 
         'name' : $form.find('.name').val(),
         'location' : $form.find('.location').val(),
         'page' : page,
         'per_page' : 5
       }

       $.getJSON(homeURL + endpoint + '.json?callback=?', json, function(response) {
         $form.hide();
         $('#' + id).find('.custom-results').replaceWith(response.html);
       });
     }
   });
}

})();
