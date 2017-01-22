var GameState = require('./game_library/game_state.js');

var all_states = {};

function LoadingAssetsState(game) {
  GameState.call(this, game);

  this.name = 'loading_assets';

  this.event_handlers = {};

  this.loading_started = false;
  this.loading_done = false;

  this.update =  function LoadingAssets_update(timedelta) {
    if (!this.loading_started) {
      game.log('Loading assets...');

      var that = this;
      var done_loading = function () {
        that.loading_done = true;
      };

      // Define Textures and Atlases to load here
      var textures = [];
      var texture_atlases = [];

      PIXI.loader.add(textures)
                 .add(texture_atlases)
                 .load(done_loading);
      this.loading_started = true;
    } else if (this.loading_done){
      game.log('done loading assets!');
      this.game.transition('initializing');
    } else {
      game.log('still loading...');
    }
  };
}
LoadingAssetsState.prototype = Object.create(GameState.prototype);
all_states.loading_assets = LoadingAssetsState;

function InitializingState(game) {
  GameState.call(this, game);

  this.name = 'initializing';

  this.event_handlers = {};

  this.update = function InitializingState_update(timedelta) {
    // start!
    game.log('Welcome to Spirit Tactics');
    game.transition('main');
  };
}
InitializingState.prototype = Object.create(GameState.prototype);
all_states.initializing = InitializingState;

function MainState(game) {
  GameState.call(this, game);

  this.name = 'main';

  function handle_log(object, args) {
    game.log(args.message);
  }

  this.event_handlers = {
    'log': handle_log,
  };

  this.update = function MainState_update(timedelta) {
  };

  game.log('entering main loop');
}
MainState.prototype = Object.create(GameState.prototype);
all_states.main = MainState;

all_states.__initial__ = 'loading_assets';

module.exports = all_states;
