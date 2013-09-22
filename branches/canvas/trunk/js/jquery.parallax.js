// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


function LayerModifier(config){
    var that = this;
    
    this.pos = 0;
    this.step = 0;
    this.bias = 0;
    this.ease = function(millies, stp){ return Math.floor((millies* stp)/1000); }
    
    if(config!==undefined){
        this.step = config.step !== undefined ? config.step : this.step;        
        this.ease = config.ease !== undefined ? config.ease : this.ease; 
        this.bias = config.bias !== undefined ? config.bias : this.bias; 
    }
        
    this.update = function(elapsedMillies){        
        if(that.ease != null){
            that.pos = that.ease(elapsedMillies, that.step);
        }
        that.pos += that.bias;
    }    
}

function Layer(config){    
    var el= null;
    var x = null;
    var y = null; 
    
    this.update = function(elapsedSeconds){
        x.update(elapsedSeconds);
        y.update(elapsedSeconds);
        var pos = x.pos + 'px ' + y.pos + 'px';          
        el.css('background-position', pos);
    }    
    
    
    
    configure = function (config){
        el = config.element;
    
        var pos = el.css('background-position');        
        var spos=pos.split(" ");        
        xpos = parseInt(spos[0].substr(0, spos[0].length-2));
        ypos = parseInt(spos[1].substr(0, spos[1].length-2));
    
        x = new LayerModifier(config.xlayer);
        x.pos = xpos;
    
        y = new LayerModifier(config.ylayer);
        y.pos = ypos;
                
    }
    
    configure(config);    
}


function ParallaxScroller(config) {
    
    var that = this;    
    var layers = [];
    var lastTimestamp = 0;
    var ifps = 1000/60;
    var elapsedMillies=0;
    
    this.addLayer = function(layer){
        layers.push(layer);    
    }
        
    this.start = function() {
        requestAnimationFrame(update);
    }
    
    this.render=function(elapsedMillies){        
        for(var i=0; i<layers.length; ++i){
            layers[i].update(elapsedMillies);
        }        
    }
    
    function update(timestamp){
        var deltaMs = timestamp-lastTimestamp;
        
        if(deltaMs>=ifps){
            elapsedMillies+=deltaMs;
            that.render(elapsedMillies);
            lastTimestamp = timestamp;            
        }                
        requestAnimationFrame(update);
    }

    function initialize(config){        
        if(config !== undefined){            
            ifps = config.fps !== undefined ? 1000/config.fps : 1000/60;            
        }
        lastTimestamp=new Date().getTime();
    
    }    
    
    initialize(config);
};

(function($){
$.fn.parallax = function(config){
        this.each( function() {
            var api = new ParallaxScrollerAPI(config);
            api.applyParallax(this);
        });
};
})(jQuery);

function ParallaxScrollerAPI(config){

    this.applyParallax = function(target){
        this.setupCss(target, config);
        this.setupParallax(target, config);
        
    }
    
    this.setupCss = function(target, config){        
        var ul = $(target);
        
        ul.css({"list-style-type":"none"});
        
        ul.children().each( function(index){
            var li = $(this);
            
            li.css({
                "position":"absolute",
                "background-attachment": "fixed",
                "background-image" : "url('" + li.attr('data-img') + "')",
                "background-repeat": li.attr('data-repeat'),
                "height" : li.attr('data-height'),
                "width" : li.attr('data-width'),
                "z-index" : index
            })
         
        });        
    } 
    
    this.setupParallax = function(target, config){
        var ul = $(target);
        var dfps = ul.attr('data-fps');
        var ps = new ParallaxScroller({ fps : (dfps !== undefined ?  dfps : 60) });
        
        ul.children().each( function(index){
            var li = $(this);
            var lcfg = config !== undefined ? config[index] : undefined;
            var rect = this.getBoundingClientRect();
            
            ps.addLayer( new Layer({
                element : li,
                xlayer : new LayerModifier({
                    step : li.attr('data-xi'),
                    bias : rect.left,
                    ease : lcfg !== undefined ? lcfg.xf : undefined
                }),
                ylayer : new LayerModifier({
                    step : li.attr('data-yi'),
                    bias : rect.top,
                    ease : lcfg !== undefined ? lcfg.yf : undefined
                })
            }) );
        
        });
        
        ps.start();
    }
};
