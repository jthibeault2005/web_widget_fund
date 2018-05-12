document.write(‘<link rel=""stylesheet"" type=""text/css"" href=""style." />’);
document.write(‘<script type=""text/javascript"" src=""widget.js""></script>
var myElement = document.getElementById(‘myFirstWidget’);
var jscode = document.createElement("script");
jscode.setAttribute(‘type’, ‘text/javascript’);
jscode.setAttribute("src", ‘data.js’);
document.getElementById(‘myFirstWidget’).appendChild(jscode);
