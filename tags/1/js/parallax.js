function LayerModifier(config){
    var that = this;
    
    this.pos = 0.0;
    this.step = 0;
    this.ease = function(secs, stp){ return secs * stp };
    
    if(config!==undefined){
        this.step = config.step !== undefined ? config.step : this.step;        
        this.ease = config.ease !== undefined ? config.ease : this.ease; 
    }
        
    this.update = function(elapsedSeconds){        
        if(that.ease != null){
            that.pos = that.ease(elapsedSeconds, that.step);
        }
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
        el = $(config.selector);
    
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
    
    this.addLayer = function(layer){
        layers.push(layer);    
    }
        
    this.start = function() {
        requestAnimationFrame(update);
    }
    
    this.render=function(elapsedSeconds){        
        for(var i=0; i<layers.length; ++i){
            layers[i].update(elapsedSeconds);
        }        
    }
    
    function update(timestamp){
        var timeout = lastTimestamp==0 ? true : timestamp-lastTimestamp>=ifps;
        
        if(timeout){
            that.render(timestamp/1000);
            lastTimestamp = timestamp;        
        }                
        requestAnimationFrame(update);
    }

    function initialize(config){        
        if(config !== undefined){            
            ifps = config.fps !== undefined ? 1000/config.fps : 1000/60;            
        }
        
    
    }    
    
    initialize(config);
};





