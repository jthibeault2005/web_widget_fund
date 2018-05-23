# web_widget_fund

## Purpose
widget.js is setup to be a self-contained widget which is implemented with two lines of html code (probably in the index.html).  This widget loads a gauge that measures the funds one is raising.

## gauge.js
The gauge code is provided by:
[gauge.js by Bernii](http://bernii.github.io/gauge.js/)

## How to implement
1. Load these two lines into the html code (the page that will display the widget):
```
<script src="widget.js" type="text/javascript"></script>
<div id="widget-container"></div>
```
2. Place the widget.js file in the directory defined by the src attribute in the script element.
3. Update this section of code in widget.js to contact the correct server so the widget has the correct funds raised.
```
var w_url = "http://blindpirate.org/misc_scripts/widget_cash.php?callback=?"
```
4. To change the title within the widget you should change this line:
```
var titleW = "Makerspace Fundraiser";
```
5. To change tick values and their corresponding colors you should change these lines within the gauge_opts variable:
```
staticLabels: {
  labels: [1000, 1500],
},
staticZones: [
  {strokeStyle: "rgb(255,0,0)", min: 0, max: 1000, height: 1.2},
  {strokeStyle: "rgb(200,100,0)", min: 1000, max: 1500, height: 1.2},
],
```

<!--
This project was for Manchester Makerspace in Manchester, NH.
May 10-22, 2018

git add .
git commit -m "Working widget container Just need to add calls to server backend"
git remote add origin https://github.com/jthibeault2005/web_widget_fund.git
git push origin master

#https://gist.github.com/hofmannsven/6814451
#Add and commit in one step: 
#  git commit -am "Message"
#Update all changes: 
#  git add -u
#Show remote: 
#  git remote
#Show remote details: 
#  git remote -v
#
#Branches Explained:
#  https://www.atlassian.com/git/tutorials/using-branches
#
#Using Git overall and remote functions:
#  http://dont-be-afraid-to-commit.readthedocs.io/en/latest/git/commandlinegit.html
-->
