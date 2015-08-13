# Prerequisites #

`parallax-js` is a jQuery plugin, so you need to include a current version of jQuery either.
Additionally, you need images for your layers. It is recommended to use PNG, due to its alpha channel support. JPG is only useful for the farest layer (lowest z-Index).


# Version #

For parallax-js a very simple and transparent versioning scheme is used. The higher the tag number, the newer the version.

Example:

`http://parallax-js.googlecode.com/svn/tags/2/js/jquery.parallax.min.js`


# Quick Start #

To mount a parallax you need at least one layer. The more layers you use, the better the depth effect, but also comes with higher resource demands.


_Example:_

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>PARALLAX SCROLLER</title>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="application/javascript"> </script>
        <script src="http://parallax-js.googlecode.com/svn/tags/2/js/jquery.parallax.min.js" type="application/javascript"> </script>
        <script type="application/javascript">          
            $(function() {
                $(".scroller").parallax();
            });
        </script>
        
    </head>
    <body>
        <ul class="scroller" data-fps='30'>
            <li data-img='img/layer1.jpg' data-width='549px' data-height='168px' data-xi='6' data-repeat="repeat"></li>
            <li data-img='img/layer2.png' data-width='549px' data-height='168px' data-xi='12' data-yi='4' data-repeat="repeat"></li>
            <li data-img='img/layer3.png' data-width='549px' data-height='168px' data-yi='-10' data-repeat="repeat-y"></li>
            <li data-img='img/overlay.png' data-width='549px' data-height='168px' data-repeat="no-repeat"></li>
        </ul>
    </body>
</html>
```

## Quick Parameter Explanation ##

`.ul[data-fps]` : Frames per second from 0.0 up to 60.0

`.li[data-img]` : The images url used for this layer. PNGs is the recommended format due to its alpha channel support.

`.li[data-width]` : The layers width in pixel.

`.li[data-height]` : The layers height in pixel.

`.li[data-xi]` : The layers horizontal (along x-Axis) translation distance. This can also be considered as movement speed. While using the default linear translation, it is measured in pixel per second. Negative values are possible

`.li[data-yi]` : The layers vertical (along y-Axis) translation.

`.li[data-repeat]` : Defines if, and how the image shall be repeated. Behaves like the CSS property `background-repeat`. Possible values are `no-repeat`, `repeat-x`, `repeat-y`, and `repeat`