swoop
=====

Slide around html elements to build hypercard-style UI widgets.

example
=======

[View the example.](http://substack.net/projects/swoop-example/)

Map all the slides to html elements, in this case using yarnify:

``` js
var swoop = require('swoop');
var domready = require('domready');
var yarn = require('./yarn');

domready(function () {
    var sw = swoop({
        foo : yarn('foo.html'),
        bar : yarn('bar.html'),
        baz : yarn('baz.html'),
        beep : yarn('beep.html'),
        boop : yarn('boop.html'),
        end : yarn('end.html')
    });
    sw.size(800, 600);
    sw.appendTo(document.body);
    sw.show('foo');
});
```
Write some html files like this `slides/beep.html` file.
Everywhere you put a `class="link"` with a hash href turns into a special link
that advances to the slide name.

``` html
<h1>beep</h1>

<h2>ROBOTS?</h2>

<div>[
  <a class="link" href="#boop">Y</a>
  /
  <a class="link" href="#end">N</a>
]</div>
```

Bundle it all up:

```
$ yarnify knit slides/ -o yarn.js
$ browserify entry.js -o bundle.js
```

Drop down an `index.html` file:

``` html
<html>
<head>
  <script src="bundle.js"></script>
</head>
<body></body>
</html>
```

And enjoy!

methods
=======

``` js
var swoop = require('swoop');
```

var sw = swoop(slides)
----------------------

Create a new swoop object `sw` from an optional hash `slides` mapping slide
names to html elements.

sw.addSlide(name, element)
--------------------------

Add a slide with `name` as an html `element`.

sw.show(name)
-------------

Show the slide `name`, hiding the previous slide.

sw.appendTo(element)
--------------------

Append the swoop ui to the target `element`.

sw.size(width, height)
----------------------

Set the size of the slide viewer element.

install
=======

With [npm](http://npmjs.org) do:

```
npm install swoop
```

license
=======

MIT
