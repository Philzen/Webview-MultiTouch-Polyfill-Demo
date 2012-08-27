WKTouch
=======================================

A JavaScript plugin for touch-capable devices, enabling multi-touch drag, scale and rotate on HTML elements.

Basic Usage
---------------------------------------

Include the main JavaScript file in the header of your HTML document:

	<script type="text/javascript" src="WKTouch.js" ></script>

Add the following rules to your CSS stylesheet:

	.touch {
    		-webkit-user-select: none;
    		-webkit-tap-highlight-color: rgba(0,0,0,0);
    		-webkit-text-size-adjust: none;
   		 -webkit-touch-callout: none; 
	}

	#element1 {
    		position: absolute;
    		left: 10px;
    		top: 10px;
    		height:120px; 
    		width:120px;
    		background-color: blue;
	}

Add a class name and id to your html element:

	<div class="touch" id="element1"></div>

Create a new instance of the plugin, making sure to pass it the id of your html element:

	<script type="text/javascript"> 
	window.onload = function() {                     
    		var element1 = new WKTouch('element1').init();       
	};
	</script>

You can also define optional parameters:

	var element1 = new WKTouch(
		'element1', {
		'dragable':true,
		'scalable':false,
		'rotatable': true,
    		'opacity':false
	}).init();

License information
---------------------------------------
 
Copyright (c) 2009-2011 Alex Gibson

http://miniapps.co.uk/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction except as noted below, including without limitation the rights to use, copy, modify, merge, publish, distribute, and/or sublicense, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
