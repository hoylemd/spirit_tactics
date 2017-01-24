function test_module(name, path) {
  describe(name, function () {
    console.log('path: ' + path);
    require(path);
  });
}

describe('Game Library', function () {
  describe('utils', function() {
    require('./utils.js');
  });
});
