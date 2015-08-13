# Introduction #

Per default, `parallax-js` uses a linear translation function for horizontal, and/or vertical movement. It is possible to override that translation function by an user-defined one.


# Ease Function signature #

The signature of the translation (or: ease function) is

```
function(elapsedSeconds, step);
```

`elapsedSeconds` - The overall elapsed seconds since scroller was started

`step` - The step is the value in `data-xi` resp. `data-yi` and is the distance to be moved in certain time frame. Together, with `elapsedSeconds` it results in velocity.

# Implementation Example #


## Default linear translation ##

The default ease function is a very simple linear translation, as product of passed time and the configured distance. The result is the movement velocity in pixels per second.

```
function(elapsedSeconds, step){ return elapsedSeconds * step; }
```

## Example sine translation ##
```
function sinEaseFunc(elapsedSeconds, step){                                  
                    return Math.floor(Math.sin(elapsedSeconds)*step);
                }
```

# Override default translation #

`parallax-js` supports for each layer both an x- and an y-axis ease function.
To override the default linear ease function you can pass the new function(s) as arguments, when calling `parallax()`.
It is passed as an array of objects with the following parameters:

```
{ 
   xf : func, // x-Axis ease function
   yf : func  // y-Axis ease function
}
```

Each element is assigned to one layer according the order added to the `ul`-list

```
$(function() {
    $(".scroller").parallax([
        { xf : func, yf : func }, // assigned to layer 0
        { xf : func, yf : func }, // assigned to layer 1
        ... 
     ]);
}

```



The following exmple applies a circular translation for the first layer (most 'distant') of the parallax.

**Complete Example**
```
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>PARALLAX SCROLLER</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="application/javascript"> </script>
        <script src="http://parallax-js.googlecode.com/svn/tags/3/js/jquery.parallax.min.js" type="application/javascript"> </script>
        
        <script type="application/javascript">
            
            function sinEaseFunc(elapsedSeconds, step){                                    
                    return Math.floor(Math.sin(elapsedSeconds)*step);
                }
                
            function cosEaseFunc(elapsedSeconds, step){                                    
                    return Math.floor(Math.cos(elapsedSeconds)*step);
                }
            
         
            $(function() {
                $(".scroller").parallax([
                    { xf : sinEaseFunc , yf : cosEaseFunc } // applies for layer 0
                ]);
        });
        </script>
        
    </head>
    <body>
        <div class="content">Content</div>
        <ul class="scroller data-fps='30'>
            <li data-img='img/layer0.jpg' data-width='549px' data-height='168px' data-xi='15' data-yi='15' data-repeat="repeat"></li>
            <li data-img='img/layer1.png' data-width='549px' data-height='168px' data-xi='12' data-yi='4' data-repeat="repeat"></li>
            <li data-img='img/layer2.png' data-width='549px' data-height='168px' data-yi='-10' data-repeat="repeat-y"></li>
            <li data-img='img/layer3.png' data-width='549px' data-height='168px' data-repeat="no-repeat"></li>
        </ul>
        
    </body>
```
