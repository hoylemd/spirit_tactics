/* Class for game objects */

// Alias
var TextureCache = PIXI.utils.TextureCache;

// Object cache
var object_cache = [];

function GameObject(name) {
  this.name = name || "Unnamed GameObject";

  // graphics objects
  PIXI.Container.call(this);

  this.events = {};
  this.event_handlers = {};

  this.type_string = 'GameObject';

  function GameObject_moveTo(x, y) {
    y = y || null;

    this.x = x;
    this.y = y;
  }
  GameObject_updatePosition.call(this, column, row);

  this.stringify = function GameObject_stringify() {
    return this.type_string + ' at ' + this.positionString();
  };

  this.positionString = function GameObject_positionString() {
    return '(' + this.column + ', ' + this.row + ')';
  };

  this.updatePosition = GameObject_updatePosition;
  // engine methods
  this.update = function GameObject_update(timedelta) {

    // update children
    var events = null;
    var new_events = [];
    for (var i in this.children) {
      if (this.children[i].update) {
        events = this.children[i].update(timedelta);
      }

      for (var event in events) {
        // handle locally if possible, otherwise, add object to parameters and add to own events
        if (this.event_handlers[event]) {
          this.event_handlers[event](events[event]);
        } else {
          if (this.events[event]) {
            this.events[event].push(events[event]);
          } else {
            this.events[event] = [events[event]];
          }
        }
      }
    }

    var events_to_bubble = this.events;
    this.events = {};
    return events_to_bubble;
  };

  // Input handlers
  this.interactive = false;
}
GameObject.prototype = Object.create(PIXI.Container.prototype);

GameObject.__cache__ = object_cache;

module.exports = GameObject;
