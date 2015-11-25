function next(chain, ...params) {
  var nextFn   = chain[0];
  var newChain = Object.assign(chain.slice(1, chain.length), {next});

  return nextFn(newChain, ...params);
}

export default function filter(actualFn) {
  var chain = [actualFn];

  function run(...params) {
    return next(chain, ...params);
  }

  var self = Object.assign(run, {
    addFilter(filterFn) {
      chain.unshift(filterFn);
      return self;
    }
  });

  return self;
}
