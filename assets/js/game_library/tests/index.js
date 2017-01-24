var expect = require("chai").expect;
var utils = require("../utils.js");

describe("is_numeric", function() {
  it("identifies non-numbers", function() {
    expect(utils.is_numeric('hello')).to.equal(false);
    expect(utils.is_numeric('')).to.equal(false);
    expect(utils.is_numeric({})).to.equal(false);
    expect(utils.is_numeric(null)).to.equal(false);
    expect(utils.is_numeric(undefined)).to.equal(false);
    expect(utils.is_numeric([])).to.equal(false);
    expect(utils.is_numeric(5 / 0)).to.equal(false);
  });

  it("identifies numbers", function() {
    expect(utils.is_numeric(0)).to.equal(true);
    expect(utils.is_numeric(-5)).to.equal(true);
    expect(utils.is_numeric(723.65)).to.equal(true);
  });
});
