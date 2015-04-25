'use strict';

class Vec2 {
  constructor(x, y) {
    this.name = 'Polygon';
    this.x = x;
    this.y = y;
  }
    
  __addAssign(b) {
    this.x += b.x;
    this.y += b.y;
  }
}

var a = new Vec2(300, 400),
    b = new Vec2(150, 200);

var overload = require('../lib/overload');

overload(function(a, b) {
    a += b;

    console.log(a.x, a.b);
})(a, b);