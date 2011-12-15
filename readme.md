# raphael-sparks
An über-simple particle generator for [Raphael.js](http://raphaeljs.com). 
Very much a work in progress. Some goals include:

* Becoming a Raphael plugin rather than just a stand-alone script
* Fixing *all the bugs*. There are some.

Oh, also, it's really tiny. Currently <2kb compressed.

## Usage
```
// Initialize
var sparks = new Sparks(paper);

// Move particle generator
sparks.move(200, 200);

// Start making new particles (e.g. on mousedown)
sparks.start();

// Stop making new particles
sparks.stop();
```

## Settings
Sparks has a few settings, such as:

* color: Particle color
* radius: Particle radius
* gravity: Particle gravity (around 1 is nice; 0 is no gravity)
* drag: Acceleration (value from 0 to 1, around 0.9 is nice)
* lifespan: How many cycles before the particles disappear. Default is 200.

Configure them as follows:

```
var sparks = new Sparks(paper);
sparks.settings.color = '#eee';
sparks.settings.radius = 3;
sparks.move(150, 150);
sparks.start();
```