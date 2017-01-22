/* Class for game objects */

// Alias
var TextureCache = PIXI.utils.TextureCache;

// Object cache
var object_cache = [];

function GameObject(name) {

  // graphics objects
  PIXI.Container.call(this);

  this.event_handlers = {};
  /* Event handlers must return a description of events to bubble up or falsey.
   *
   * See update comment for event descriptions.
   *
   * Handlers must follow this signature:
   *   `handle_<event_name>(object, arguments)`
   *
   * `object` is the GameObject that has emitted the event.
   * `arguments` is an array of arguments for the event.
   *
   * The handler will be run with `this` bound to the handling object
   * (usually the parent of the emitting object)
   *
   * If a handler returns additional events, their emitter will be set to the
   * handling object, not the original emitter.  If the original emitter is
   * needed by this 'bubbled' event, it should be included in the
   * argument array.
  */

  this.type_string = 'GameObject';

  this.name = name || 'Unnamed ' + this.type_string;

  this.repr = function GameObject___repr__() {
    return this.name;
  };

  this.stringify = function GameObject_stringify() {
    return this.type_string + "(" + this.__repr__() + ")";
  };

  this.move_to = function GameObject_moveTo(x, y) {
    y = y || null;

    this.x = x;
    this.y = y;
  };

  function add_events_to_queue(events, object, queue) {
    for (var event_name in events) {
      queue[event_name] = queue[event_name] || {};
      queue[event_name][object] = events[event_name];
    }

    return queue;
  }

  function update_child(child, timedelta, queue) {
    if (child.update) {
      var events = child.update_all(timedelta);
      if (events && events.length) {
        return add_events_to_queue(events, child, queue);
      }
    }
    return queue;
  }

  // engine methods
  /* update should return event descriptions or falsey */
  this.update = function GameObject_update(timedelta) {
    return false;
  };

  /*
   * Always update child objects first, and then this object.
   * update methods must return a description of events they are emitting
   * If there are no events to emit, return falsey.
   *
   * Event descriptions are objects.  Keys are the event name
   * (e.g. 'log', 'die', 'move_right'), and the value should be a list of
   * arguments. (e.g. {"log": ["Hello, I am a log entry"]}).
   *
   * See the Event Handlers comment for how these are handled.
   *
   * If a handler for an event does not exist, all events of that type will be
   * 'bubbled' up to this object's parent.  The top-level GameObject (game)
   * cannot handle an event, it will be discarded, unless strict mode is on.
   * If strict mode is on, then an error will be raised.
   */
  this.update_all = function GameObject_update_all(timedelta) {
    var new_events = [];
    var child_events = null;
    var other_events = [];

    // update children
    for (var i in this.children) {
      update_child(this.children[i], timedelta, new_events);
    }

    for (var event_name in new_events) {
      var args_by_child = new_events[event_name];

      // handle locally if possible, otherwise bubble up
      var handler = this.event_handlers[event_name];
      if (handler) {
        for (var child in args_by_child) {
          var args = args_by_child[child];
          var raised_events = handler.apply(this, child, args);
          if(raised_events) {
            add_events_to_queue(raised_events, this, other_events);
          }
        }
      } else {
        other_events[event_name] = args_by_child;
      }
    }

    new_events = this.update(timedelta);
    return add_events_to_queue(new_events, this, other_events);
  };

  this.delete = function GameObject_delete() {
    this.parent.remove_object(this);
  };

  // Input handlers
  this.interactive = false;
}
GameObject.prototype = Object.create(PIXI.Container.prototype);

GameObject.__cache__ = object_cache;

module.exports = GameObject;
