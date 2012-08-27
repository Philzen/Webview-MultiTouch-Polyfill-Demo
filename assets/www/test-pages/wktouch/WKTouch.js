/*
 * 
 * Find more about this plugin by visiting
 * http://miniapps.co.uk/
 *
 * Copyright (c) 2010 Alex Gibson, http://miniapps.co.uk/
 * Released under MIT license 
 * http://miniapps.co.uk/license/
 * 
 */

(function() {

	function WKTouch(node, options) {

		this.node = typeof node == 'object' ? node : document.getElementById(node);

		this.options = {
			dragable : true,
			scalable : true,
			rotatable : true,
			opacity : true
		};
    
		// User defined options
		if (typeof options == 'object') {
			for (var i in options) {
				if(options.hasOwnProperty(i)) {
					this.options[i] = options[i];
				}
			}
		}
		
		//detect support for Webkit CSS 3d transforms
		this.supportsWebkit3dTransform = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
	}

	//static property to store the zIndex for an element
	WKTouch.zIndexCount = 1;

	WKTouch.prototype.init = function () {
          
    	this.rotation = 0; //default rotation in degrees
    	this.scale = 1.0; //default scale value
    	this.gesture = false; //flags a 2 touch gesture
    	this.node.addEventListener('touchstart', this, false);
	};

	WKTouch.prototype.touchstart = function (e) {
	
		e.preventDefault();
    
    	//bring item to the front
    	this.node.style.zIndex = WKTouch.zIndexCount++;    
    	this.node.addEventListener('touchmove', this, false);
    	this.node.addEventListener('touchend', this, false);
    	this.node.addEventListener('touchcancel', this, false);
    
    	if (this.options.opacity) {
        	this.node.style.opacity = '0.5';
    	}
	};
        
	WKTouch.prototype.touchmove = function (e) {

    	e.preventDefault();
    	
    	var myTransform = "",
    		x1 = 0,
        	y1 = 0,
        	x2 = 0,
        	y2 = 0,
        	curX = 0,
        	curY = 0;
    
    	//drag event
    	if ((e.targetTouches.length === 1) && (this.options.dragable)) {
    
    		//get drag point
        	curX = e.targetTouches[0].pageX - (this.node.offsetLeft + (this.node.offsetWidth / 2));
        	curY = e.targetTouches[0].pageY - (this.node.offsetTop + (this.node.offsetHeight / 2));
        		
        	//translate drag
        	if (this.supportsWebkit3dTransform) {
        		myTransform += 'translate3d(' + curX + 'px,' + curY + 'px, 0)';
        		
        	} else {
        		myTransform += 'translate(' + curX + 'px,' + curY + 'px)';
        	}
        	
        	//persist scale and rotate values from previous gesture
        	if (this.options.scalable) {
            	myTransform += "scale(" + (this.scale) + ")";
        	} 
        
        	if (this.options.rotatable) {
            	myTransform += "rotate(" + ((this.rotation) % 360) + "deg)";
        	}
    	}
    	else if ((e.targetTouches.length === 2) && ((this.options.scalable) || (this.options.rotatable))) {
    
        	//gesture event
        	this.gesture = true;
        	
        	//get middle point between two touches for drag
        	x1 = e.targetTouches[0].pageX - (this.node.offsetLeft + (this.node.offsetWidth / 2));
        	y1 = e.targetTouches[0].pageY - (this.node.offsetTop + (this.node.offsetHeight / 2));
        	x2 = e.targetTouches[1].pageX - (this.node.offsetLeft + (this.node.offsetWidth / 2));
        	y2 = e.targetTouches[1].pageY - (this.node.offsetTop + (this.node.offsetHeight / 2));
        	curX = (x1 + x2) / 2,
        	curY = (y1 + y2) / 2;
        	
        	//translate drag
        	if (this.supportsWebkit3dTransform) {
        		myTransform += 'translate3d(' + curX + 'px,' + curY + 'px, 0)';
        		
        	} else {
        	    myTransform += 'translate(' + curX + 'px,' + curY + 'px)';
        	}
        	
        	//scale and rotate
        	if (this.options.scalable) {
            	myTransform += "scale(" + (this.scale * e.scale) + ")";
        	} 
        
        	if (this.options.rotatable) {
            	myTransform += "rotate(" + ((this.rotation + e.rotation) % 360) + "deg)";
        	}
    	}
    	this.node.style.webkitTransform = this.node.style.MozTransform = this.node.style.msTransform = this.node.style.OTransform = this.node.style.transform = myTransform;
	};
        
	WKTouch.prototype.touchend = function (e) {

    	e.preventDefault();
     
    	this.node.removeEventListener('touchmove', this, false);
    	this.node.removeEventListener('touchend', this, false);
    	this.node.removeEventListener('touchcancel', this, false);

        //store scale and rotate values on gesture end    
    	if (this.gesture) {
        	this.scale *= e.scale;
        	this.rotation = (this.rotation + e.rotation) % 360;
        	this.gesture = false;
    	} 
    	
    	if (this.options.opacity) {
        	this.node.style.opacity = '1';
    	}  
	};

	WKTouch.prototype.touchcancel = function (e) {

    	e.preventDefault();
    
    	this.node.removeEventListener('touchmove', this, false);
    	this.node.removeEventListener('touchend', this, false);
    	this.node.removeEventListener('touchcancel', this, false);
    
    	//store scale and rotate values on gesture end 
    	if (this.gesture) {
        	this.scale *= e.scale;
        	this.rotation = (this.rotation + e.rotation) % 360;
        	this.gesture = false;
    	} 
    
    	//set opacity
    	if (this.options.opacity) {
        	this.node.style.opacity = '1';
    	}   
	};

	//event handler
	WKTouch.prototype.handleEvent = function (e) {

		if (typeof(this[e.type]) === 'function' ) {
			return this[e.type](e);
		}
	};
	
	//public function
	window.WKTouch = WKTouch;
	
})();