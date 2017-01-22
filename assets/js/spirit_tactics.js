var Game = require('./game_library/game.js');
var GridElement= require('./game_library/grid_element.js');
var game_states = require('./states.js');

function SpiritTacticsGame() {
  // game-specific dimensions

  this.BACKGROUND_COLOUR = 0x999999;

  this.width = 800;
  this.height = 600;

  this.cheats = {};

  Game.call(this, game_states);

  this.reset = function SpiritTacticsGame_reset() {
    Game.prototype.reset.apply(this);
  };
}
SpiritTacticsGame.prototype = Object.create(Game.prototype);

module.exports = SpiritTacticsGame;
