var expect = require("chai").expect;
var utils = require("../utils.js");
var is_numeric = utils.is_numeric;

describe("is_numeric", function() {
  it("identifies non-numbers", function() {
    expect(is_numeric('hello')).to.equal(false);
    expect(is_numeric('')).to.equal(false);
    expect(is_numeric({})).to.equal(false);
    expect(is_numeric(null)).to.equal(false);
    expect(is_numeric(undefined)).to.equal(false);
    expect(is_numeric([])).to.equal(false);
    expect(is_numeric(5 / 0)).to.equal(false);
  });

  it("identifies numbers", function() {
    expect(is_numeric(0)).to.equal(true);
    expect(is_numeric(-5)).to.equal(true);
    expect(is_numeric(723.65)).to.equal(true);
  });
});
