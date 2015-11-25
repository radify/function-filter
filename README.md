<div id="badges" align="center">
<a href="https://npmjs.org/package/function-filter">
  <img src="https://img.shields.io/npm/v/function-filter.svg?style=flat-square" alt="NPM Version">
</a>
<a href="https://github.com/radify/function-filter/blob/master/LICENSE">
  <img src="https://img.shields.io/npm/l/function-filter.svg?style=flat-square" alt="License">
</a>
<a href="https://david-dm.org/radify/function-filter">
  <img src="https://img.shields.io/david/radify/function-filter.svg?style=flat-square" alt="Dependency Status">
</a>
<a href="https://travis-ci.org/radify/function-filter">
  <img src="https://img.shields.io/travis/radify/function-filter.svg?style=flat-square" alt="Build Status">
</a>
<a href="https://codeclimate.com/github/radify/function-filter">
  <img src="https://img.shields.io/codeclimate/github/radify/function-filter.svg?style=flat-square" alt="Code Quality">
</a>
<a href="https://codeclimate.com/github/radify/function-filter/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/radify/function-filter.svg?style=flat-square" alt="Test Coverage">
</a>
</div>

# function-filter

## Simple AOP using filterable function wrappers

### What is function-filter?

function-filter is an efficient and lightweight way to allow logic to be
extended across different concerns of your application. By wrapping a function
in a filter, it is possible to dynamically intercept and optionally modify
parameter and return values to the underlying function.

In addition, filters can call alternative logic, or nothing at all, depending
on the use case.

Some examples of why you may want to do this include:

- Logging the parameters passed to a critical function before it is called, and
  the returned value afterwards.
- Mutating queries to a database resource, to enforce security constraints.
- Mutating query results, to redact private information.
- Memoizing expensive functions based on their input parameters.

### Installation

`npm install function-filter`

### Usage

Usage under ES5 and ES6 is essentially the same:

ES5:
```js
var filter = require('function-filter').default;
var myFn = filter(function(chain, argA, argB) {
	console.log(argA, argB);
});

myFn("Hello", "World!");
// Hello World!

myFn.addFilter(function(chain, argA, argB) {
	console.log("Originally called with:", argA, argB);
	return chain.next(chain, "Goodbye", argB);
});

myFn("Hello", "World!");
// Originally called with Hello World!
// Goodbye World!
```

ES6:
```js
import filter from 'function-filter';
const myFn = filter((chain, argA, argB) => {
	console.log(argA, argB);
});

myFn("Hello", "World!");
// Hello World!

myFn.addFilter((chain, argA, argB) => {
	console.log("Originally called with:", argA, argB);
	return chain.next(chain, "Goodbye", argB);
});

myFn("Hello", "World!");
// Originally called with Hello World!
// Goodbye World!
```

### Changelog

This project adheres to [Semantic Versioning](http://semver.org/). For a list
of detailed changes, please refer to [CHANGELOG.md](CHANGELOG.md).

### Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md).

### Prior Art

This implementation is heavily inspired by [li3](http://li3.me)'s
[filter](http://li3.me/docs/manual/common-tasks/basic-filters.md) system.

### License

function-filter is released under the [BSD 3-clause “New” License](LICENSE).
