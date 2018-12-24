Array.prototype.and = function() {
  return this.reduce((old, value) => Boolean(old && value), true);
};

Array.prototype.or = function() {
  return this.reduce((old, value) => Boolean(old || value), false);
};
