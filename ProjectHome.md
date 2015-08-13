This project is about a tiny jQuery extension/plugin for a retro-style parallax scroller.

The scroller provides the follwing features:

  * self containing (only .js is needed)
  * easy to use
  * overwrite default translation functions
  * as many layers as the client endures
  * good performance


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

To get the latest version just point to the highest number in the tags directory, e.g.

`http://parallax-js.googlecode.com/svn/tags/3/js/jquery.parallax.min.js`