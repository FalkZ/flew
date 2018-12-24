const map = function(f) {
  if (Array.isArray(this)) {
    return Array.prototype.map(f);
  } else {
    const ret = {};
    Object.keys(this).forEach((key, index) => {
      const value = this[key];
      ret[key] = f(value, key, index);
    });
    return ret;
  }
};

const mapToArray = function(f) {
  if (Array.isArray(this)) {
    return Array.prototype.map(f);
  } else {
    const ret = [];
    Object.keys(this).forEach((key, index) => {
      const value = this[key];
      ret[index] = f(value, key, index);
    });
    return ret;
  }
};

const forEach = function(f) {
  if (Array.isArray(this)) {
    return Array.prototype.forEach(f);
  } else {
    Object.keys(this).forEach((key, index) => {
      const value = this[key];
      f(value, key, index);
    });
  }
};

Object.prototype.mapToArray = mapToArray;
Object.prototype.mapObj = map;
Object.prototype.forEachObj = forEach;
