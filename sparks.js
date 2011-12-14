/**
 * A super-simple particle generator for Raphael
 * @author: Dylan Pyle
 */

/*jslint devel: true, browser: true, sloppy: true, plusplus: true, maxerr: 50, indent: 2 */

/** Array Remove - By John Resig (MIT Licensed) */
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/** A particle object */
var Particle = function (x, y, paper) {
  // Particle color & radius
  this.color = '#ffecd7';
  this.color = 'rgb(' + Math.floor(Math.random()*155+100) + ',' + Math.floor(Math.random()*155+100) + ',' + Math.floor(Math.random()*155+100) + ')'; 
  this.radius = 1.5;
  // Gravity if desired; added to y-velocity
  this.gravity = 1;
  // Drag factor; value should be between 0 and 1
  this.drag = 0.9;
  // Max lifespan (in timer loops) of a particle
  this.lifespan = 100;

  this.x = x;
  this.y = y;
  this.velX = (Math.random() * 10) - 5;
  this.velY = (Math.random() * 10) - 5;
  this.life = 0;
  this.raphaelEl = paper.circle(this.x, this.y, this.radius);
  this.raphaelEl.attr({
    'stroke-width': 0,
    'fill': this.color
  });
};

Particle.prototype = {
  update: function () {
    this.life++;
    /** If we've lived long enough, kill particle */
    if (this.life > this.lifespan) {
      this.destroy();
      return false;
    } else {
      this.velX *= this.drag;
      this.velY *= this.drag;
      this.velY += this.gravity;
      this.x += this.velX;
      this.y += this.velY;
      this.raphaelEl.attr({
        'cx': this.x,
        'cy': this.y
      });
      return true;
    }
  },
  destroy: function () {
    this.raphaelEl.remove();
  }
};

/**
 * Particle generator
 * @param canvasEl The Raphael paper to draw particles upon
 */
var ParticleGenerator = function (paper) {
  this.paper = paper;
  this.particles = [];

  /** Maximum visible particles */
  this.maxParticles = 60;

  /** Starting position */
  this.xPos = 0;
  this.yPos = 0;

  /** Timer placeholder */
  this.timer = null;

  /** Whether or not to generate particles */
  this.generating = false;
};

ParticleGenerator.prototype = {
  /** Start particle generation (i.e. cut begins) */
  start: function () {
    console.log("Started!");
    console.log(this);
    this.generating = true;
    if (!this.timer) {
      this.timer = setInterval(function(){this.loop();}.bind(this), 1000 / 20);
    }

  },

  /** Stop particle generation (i.e. cut ends) */
  stop: function () {
    this.generating = false;
  },

  /**
   * Create some particles
   * @param n Number of particles to generate
   */
  createParticles: function (n) {
    var i, p;
    for (i = 0; i < n; i++) {
      p = new Particle(this.xPos, this.yPos, this.paper);
      this.particles.push(p);
    }
  },

  /** Loop through particles, update positions */
  loop: function () {
    var i;

    if (this.generating) {
      this.createParticles(4);
    }

    for (i = 0; i < this.particles.length; i++) {
      if (!this.particles[i].update()) { // Particle is dead
        this.particles.remove(i);
      }
    }

    while (this.particles.length > this.maxParticles) {
      this.particles.shift().destroy();
    }

    if (this.particles.length === 0) {
      this.timer = null;
    }

  },

  /** Update Particle spawn position */
  updatePosition: function (x, y) {
    this.xPos = x;
    this.yPos = y;
  }
};

