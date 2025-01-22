/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js":
/*!******************************************************************************!*\
  !*** ../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var _require = __webpack_require__(/*! ./internal/errors */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/errors.js"),
  _require$codes = _require.codes,
  ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
  ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/assert/assertion_error.js");
var _require2 = __webpack_require__(/*! util/ */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js"),
  inspect = _require2.inspect;
var _require$types = (__webpack_require__(/*! util/ */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js").types),
  isPromise = _require$types.isPromise,
  isRegExp = _require$types.isRegExp;
var objectAssign = __webpack_require__(/*! object.assign/polyfill */ "../node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/polyfill.js")();
var objectIs = __webpack_require__(/*! object-is/polyfill */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js")();
var RegExpPrototypeTest = __webpack_require__(/*! call-bind/callBound */ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/callBound.js")('RegExp.prototype.test');
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;
function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/util/comparisons.js");
  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
}

// Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex
var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];
var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};
var warned = false;

// The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {};

// All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;
  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }
    if (argsLen === 2) operator = '!=';
  }
  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };
  if (message !== undefined) {
    errArgs.message = message;
  }
  var err = new AssertionError(errArgs);
  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;

// The AssertionError is defined in internal/error.
assert.AssertionError = AssertionError;
function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }
    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  innerOk.apply(void 0, [ok, args.length].concat(args));
}
assert.ok = ok;

// The equality assertion tests shallow, coercive equality with ==.
/* eslint-disable no-restricted-properties */
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
};

// The non-equality assertion tests for whether two objects are not
// equal with !=.
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
};

// The equivalence assertion tests a deep equality relation.
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
};

// The non-equivalence assertion tests for any deep inequality.
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};
var Comparison = /*#__PURE__*/_createClass(function Comparison(obj, keys, actual) {
  var _this = this;
  _classCallCheck(this, Comparison);
  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
});
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
    // assert.doesNotThrow does not accept objects.
    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    }

    // Handle primitives properly.
    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }
    var keys = Object.keys(expected);
    // Special handle errors to make sure the name and the message are compared
    // as well.
    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }
    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
        return;
      }
      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  }
  // Guard instanceof against arrow functions as they don't have a prototype.
  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.

  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.

  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;
    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn();
      // Fail in case no promise is returned.
      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }
    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }
    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }
    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';
    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }
    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }
  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;
  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }
  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};
assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};
assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};
assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';
    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }
    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    });

    // Make sure we actually have a stack trace!
    var origStack = err.stack;
    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift();
      // Filter all frames existing in err.stack.
      var tmp1 = newErr.stack.split('\n');
      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);
        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }
      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }
    throw newErr;
  }
};

// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a871df3dfb8ea663ef5e1f8f62701ec51384ecb
function internalMatch(string, regexp, message, fn, fnName) {
  if (!isRegExp(regexp)) {
    throw new ERR_INVALID_ARG_TYPE('regexp', 'RegExp', regexp);
  }
  var match = fnName === 'match';
  if (typeof string !== 'string' || RegExpPrototypeTest(regexp, string) !== match) {
    if (message instanceof Error) {
      throw message;
    }
    var generatedMessage = !message;

    // 'The input was expected to not match the regular expression ' +
    message = message || (typeof string !== 'string' ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? 'The input did not match the regular expression ' : 'The input was expected to not match the regular expression ') + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
    var err = new AssertionError({
      actual: string,
      expected: regexp,
      message: message,
      operator: fnName,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match, 'match');
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch, 'doesNotMatch');
};

// Expose a strict only variant of assert
function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  innerOk.apply(void 0, [strict, args.length].concat(args));
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/assert/assertion_error.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/assert/assertion_error.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(/*! util/ */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js"),
  inspect = _require.inspect;
var _require2 = __webpack_require__(/*! ../errors */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/errors.js"),
  ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    str += str;
    count--;
  }
  str += str.substring(0, maxCount - str.length);
  return str;
}
var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
};

// Comparing short primitives should just show === / !== instead of using the
// diff.
var kMaxShortLength = 10;
function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}
function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}
function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = '';

  // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.
  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  }

  // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.
  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length;
    // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.
    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        }
        // Ignore the first characters.
        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  }

  // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).
  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];
  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }
    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }
  var maxLines = Math.max(actualLines.length, expectedLines.length);
  // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n');

    // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.
    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);
      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }
    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }
  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }
  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }
  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;
    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the expected line to the cache.
      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++;
      // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the actual line to the result.
      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++;
      // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i];
      // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.
      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine);
      // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //
      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }
      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        // Mark the current line as the last diverging one.
        lastPos = i;
        // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2;
        // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = '';
        // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.
        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    }
    // Inspected object to big (Show ~20 rows max)
    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }
  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}
var AssertionError = /*#__PURE__*/function (_Error, _inspect$custom) {
  _inherits(AssertionError, _Error);
  var _super = _createSuper(AssertionError);
  function AssertionError(options) {
    var _this;
    _classCallCheck(this, AssertionError);
    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }
    var message = options.message,
      operator = options.operator,
      stackStartFn = options.stackStartFn;
    var actual = options.actual,
      expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      _this = _super.call(this, String(message));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      }
      // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.
      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _super.call(this, createErrDiff(actual, expected, operator));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n');

        // In case "actual" is an object, it should not be reference equal.
        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        }

        // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.
        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);
          while (res.length > 27) {
            res.pop();
          }
        }

        // Only print a single input.
        if (res.length === 1) {
          _this = _super.call(this, "".concat(base, " ").concat(res[0]));
        } else {
          _this = _super.call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n"));
        }
      } else {
        var _res = inspectValue(actual);
        var other = '';
        var knownOperators = kReadableOperator[operator];
        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));
          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }
          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }
          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }
        _this = _super.call(this, "".concat(_res).concat(other));
      }
    }
    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;
    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    }
    // Create error message including the error code in the name.
    _this.stack;
    // Reset the name.
    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }
  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: _inspect$custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);
  return AssertionError;
}( /*#__PURE__*/_wrapNativeSuper(Error), inspect.custom);
module.exports = AssertionError;

/***/ }),

/***/ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/errors.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/errors.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */
/* eslint node-core/alphabetize-errors: "error" */
/* eslint node-core/prefer-util-format-errors: "error" */



// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var codes = {};

// Lazy loaded
var assert;
var util;
function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /*#__PURE__*/function (_Base) {
    _inherits(NodeError, _Base);
    var _super = _createSuper(NodeError);
    function NodeError(arg1, arg2, arg3) {
      var _this;
      _classCallCheck(this, NodeError);
      _this = _super.call(this, getMessage(arg1, arg2, arg3));
      _this.code = code;
      return _this;
    }
    return _createClass(NodeError);
  }(Base);
  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string");

  // determiner: 'must be' or 'must not be'
  var determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }
  var msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  // TODO(BridgeAR): Improve the output by showing `null` and similar.
  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js");
  var inspected = util.inspect(value);
  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }
  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;
  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }
  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });
  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;
    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;
    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }
  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/util/comparisons.js":
/*!*************************************************************************************************!*\
  !*** ../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/internal/util/comparisons.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var regexFlagsSupported = /a/g.flags !== undefined;
var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};
var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/index.js");
function uncurryThis(f) {
  return f.call.bind(f);
}
var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);
var _require$types = (__webpack_require__(/*! util/ */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js").types),
  isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
  isArrayBufferView = _require$types.isArrayBufferView,
  isDate = _require$types.isDate,
  isMap = _require$types.isMap,
  isRegExp = _require$types.isRegExp,
  isSet = _require$types.isSet,
  isNativeError = _require$types.isNativeError,
  isBoxedPrimitive = _require$types.isBoxedPrimitive,
  isNumberObject = _require$types.isNumberObject,
  isStringObject = _require$types.isStringObject,
  isBooleanObject = _require$types.isBooleanObject,
  isBigIntObject = _require$types.isBigIntObject,
  isSymbolObject = _require$types.isSymbolObject,
  isFloat32Array = _require$types.isFloat32Array,
  isFloat64Array = _require$types.isFloat64Array;
function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
}

// Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3;

// Check if they have the same source and flags
function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}
function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }
  return true;
}
function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }
  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }
  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
}

// Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.

function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  }

  // Check more closely if val1 and val2 are equal.
  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }
    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }
    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }
      return false;
    }
    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }
  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);
  if (val1Tag !== val2Tag) {
    return false;
  }
  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }
    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  }
  // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.
  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }
  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (_keys.length !== _keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }
  return keyCheck(val1, val2, strict, memos, kNoIterator);
}
function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  var i = 0;
  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }
  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      var count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];
        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      var symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }
  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }
  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}
function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];
    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }
  return false;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').
function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;
    case 'object':
      // Only pass in null as object!
      return undefined;
    case 'symbol':
      return false;
    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through
    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }
  }
  return true;
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}
function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = b.get(altValue);
  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }
  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}
function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);
  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i];
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false;

      // Fast path to detect missing string, symbol, undefined and null values.
      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }
      if (set === null) {
        set = new Set();
      }
      set.add(val);
    }
  }
  if (set !== null) {
    var bValues = arrayFromSet(b);
    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i];
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];
    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }
  return false;
}
function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);
  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
      key = _aEntries$i[0],
      item1 = _aEntries$i[1];
    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);
      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false;
        // Fast path to detect missing string, symbol, undefined and null
        // keys.
        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      }
    }
  }
  if (set !== null) {
    var bEntries = arrayFromMap(b);
    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
        _key = _bEntries$_i[0],
        item = _bEntries$_i[1];
      if (_typeof(_key) === 'object' && _key !== null) {
        if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;
  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          var key = keysA[i];
          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    var _key2 = keys[i];
    if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
      return false;
    }
  }
  return true;
}
function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}
function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}
module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/actualApply.js":
/*!***************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/actualApply.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");

var $apply = __webpack_require__(/*! ./functionApply */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionApply.js");
var $call = __webpack_require__(/*! ./functionCall */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionCall.js");
var $reflectApply = __webpack_require__(/*! ./reflectApply */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/reflectApply.js");

/** @type {import('./actualApply')} */
module.exports = $reflectApply || bind.call($call, $apply);


/***/ }),

/***/ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/applyBind.js":
/*!*************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/applyBind.js ***!
  \*************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
var $apply = __webpack_require__(/*! ./functionApply */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionApply.js");
var actualApply = __webpack_require__(/*! ./actualApply */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/actualApply.js");

/** @type {import('./applyBind')} */
module.exports = function applyBind() {
	return actualApply(bind, $apply, arguments);
};


/***/ }),

/***/ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionApply.js":
/*!*****************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionApply.js ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./functionApply')} */
module.exports = Function.prototype.apply;


/***/ }),

/***/ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionCall.js":
/*!****************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionCall.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./functionCall')} */
module.exports = Function.prototype.call;


/***/ }),

/***/ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/index.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/index.js ***!
  \*********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");

var $call = __webpack_require__(/*! ./functionCall */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionCall.js");
var $actualApply = __webpack_require__(/*! ./actualApply */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/actualApply.js");

/** @type {import('.')} */
module.exports = function callBindBasic(args) {
	if (args.length < 1 || typeof args[0] !== 'function') {
		throw new $TypeError('a function is required');
	}
	return $actualApply(bind, $call, args);
};


/***/ }),

/***/ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/reflectApply.js":
/*!****************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/reflectApply.js ***!
  \****************************************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./reflectApply')} */
module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;


/***/ }),

/***/ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/callBound.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/callBound.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var setFunctionLength = __webpack_require__(/*! set-function-length */ "../node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js");

var $defineProperty = __webpack_require__(/*! es-define-property */ "../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");

var callBindBasic = __webpack_require__(/*! call-bind-apply-helpers */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/index.js");
var applyBind = __webpack_require__(/*! call-bind-apply-helpers/applyBind */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/applyBind.js");

module.exports = function callBind(originalFunction) {
	var func = callBindBasic(arguments);
	var adjustedLength = originalFunction.length - (arguments.length - 1);
	return setFunctionLength(
		func,
		1 + (adjustedLength > 0 ? adjustedLength : 0),
		true
	);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js");

var callBindBasic = __webpack_require__(/*! call-bind-apply-helpers */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/index.js");

/** @type {(thisArg: string, searchString: string, position?: number) => number} */
var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

/** @type {import('.')} */
module.exports = function callBoundIntrinsic(name, allowMissing) {
	// eslint-disable-next-line no-extra-parens
	var intrinsic = /** @type {Parameters<typeof callBindBasic>[0][0]} */ (GetIntrinsic(name, !!allowMissing));
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBindBasic([intrinsic]);
	}
	return intrinsic;
};


/***/ }),

/***/ "../node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");

var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");

var gopd = __webpack_require__(/*! gopd */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ "../node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = __webpack_require__(/*! define-data-property */ "../node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js");

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = __webpack_require__(/*! has-property-descriptors */ "../node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js")();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "../node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind-apply-helpers */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/index.js");
var gOPD = __webpack_require__(/*! gopd */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");

var hasProtoAccessor;
try {
	// eslint-disable-next-line no-extra-parens, no-proto
	hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
} catch (e) {
	if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
		throw e;
	}
}

// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;

/** @type {import('./get')} */
module.exports = desc && typeof desc.get === 'function'
	? callBind([desc.get])
	: typeof $getPrototypeOf === 'function'
		? /** @type {import('./get')} */ function getDunder(value) {
			// eslint-disable-next-line eqeqeq
			return $getPrototypeOf(value == null ? value : $Object(value));
		}
		: false;


/***/ }),

/***/ "../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js ***!
  \***********************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js":
/*!****************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js":
/*!***************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js":
/*!******************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js ***!
  \******************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js":
/*!****************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),

/***/ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js":
/*!***************************************************************************!*\
  !*** ../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),

/***/ "../node_modules/.pnpm/es-object-atoms@1.0.0/node_modules/es-object-atoms/index.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/es-object-atoms@1.0.0/node_modules/es-object-atoms/index.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Object;


/***/ }),

/***/ "../node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js":
/*!***************************************************************************!*\
  !*** ../node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js ***!
  \**********************************************************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "../node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Object = __webpack_require__(/*! es-object-atoms */ "../node_modules/.pnpm/es-object-atoms@1.0.0/node_modules/es-object-atoms/index.js");

var $Error = __webpack_require__(/*! es-errors */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js");
var $EvalError = __webpack_require__(/*! es-errors/eval */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js");
var $RangeError = __webpack_require__(/*! es-errors/range */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js");
var $ReferenceError = __webpack_require__(/*! es-errors/ref */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js");
var $SyntaxError = __webpack_require__(/*! es-errors/syntax */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js");
var $TypeError = __webpack_require__(/*! es-errors/type */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
var $URIError = __webpack_require__(/*! es-errors/uri */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js");

var abs = __webpack_require__(/*! math-intrinsics/abs */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js");
var floor = __webpack_require__(/*! math-intrinsics/floor */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js");
var max = __webpack_require__(/*! math-intrinsics/max */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js");
var min = __webpack_require__(/*! math-intrinsics/min */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js");
var pow = __webpack_require__(/*! math-intrinsics/pow */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js");
var round = __webpack_require__(/*! math-intrinsics/round */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js");
var sign = __webpack_require__(/*! math-intrinsics/sign */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js");

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = __webpack_require__(/*! gopd */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");
var $defineProperty = __webpack_require__(/*! es-define-property */ "../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js")();

var getProto = __webpack_require__(/*! get-proto */ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js");
var $ObjectGPO = __webpack_require__(/*! get-proto/Object.getPrototypeOf */ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js");
var $ReflectGPO = __webpack_require__(/*! get-proto/Reflect.getPrototypeOf */ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js");

var $apply = __webpack_require__(/*! call-bind-apply-helpers/functionApply */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionApply.js");
var $call = __webpack_require__(/*! call-bind-apply-helpers/functionCall */ "../node_modules/.pnpm/call-bind-apply-helpers@1.0.1/node_modules/call-bind-apply-helpers/functionCall.js");

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': $Object,
	'%Object.getOwnPropertyDescriptor%': $gOPD,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,

	'%Function.prototype.call%': $call,
	'%Function.prototype.apply%': $apply,
	'%Object.defineProperty%': $defineProperty,
	'%Object.getPrototypeOf%': $ObjectGPO,
	'%Math.abs%': abs,
	'%Math.floor%': floor,
	'%Math.max%': max,
	'%Math.min%': min,
	'%Math.pow%': pow,
	'%Math.round%': round,
	'%Math.sign%': sign,
	'%Reflect.getPrototypeOf%': $ReflectGPO
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! hasown */ "../node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js":
/*!*********************************************************************************************!*\
  !*** ../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $Object = __webpack_require__(/*! es-object-atoms */ "../node_modules/.pnpm/es-object-atoms@1.0.0/node_modules/es-object-atoms/index.js");

/** @type {import('./Object.getPrototypeOf')} */
module.exports = $Object.getPrototypeOf || null;


/***/ }),

/***/ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js ***!
  \**********************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./Reflect.getPrototypeOf')} */
module.exports = (typeof Reflect !== 'undefined' && Reflect.getPrototypeOf) || null;


/***/ }),

/***/ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reflectGetProto = __webpack_require__(/*! ./Reflect.getPrototypeOf */ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js");
var originalGetProto = __webpack_require__(/*! ./Object.getPrototypeOf */ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js");

var getDunderProto = __webpack_require__(/*! dunder-proto/get */ "../node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js");

/** @type {import('.')} */
module.exports = reflectGetProto
	? function getProto(O) {
		// @ts-expect-error TS can't narrow inside a closure, for some reason
		return reflectGetProto(O);
	}
	: originalGetProto
		? function getProto(O) {
			if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
				throw new TypeError('getProto: not an object');
			}
			// @ts-expect-error TS can't narrow inside a closure, for some reason
			return originalGetProto(O);
		}
		: getDunderProto
			? function getProto(O) {
				// @ts-expect-error TS can't narrow inside a closure, for some reason
				return getDunderProto(O);
			}
			: null;


/***/ }),

/***/ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js":
/*!******************************************************************!*\
  !*** ../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./gOPD')} */
module.exports = Object.getOwnPropertyDescriptor;


/***/ }),

/***/ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/** @type {import('.')} */
var $gOPD = __webpack_require__(/*! ./gOPD */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js");

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "../node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(/*! es-define-property */ "../node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js");

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js");

/** @type {import('.')} */
module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./shams')} */
/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	/** @type {{ [k in symbol]?: unknown }} */
	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js");

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "../node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js":
/*!***********************************************************************!*\
  !*** ../node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(/*! function-bind */ "../node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js");

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ }),

/***/ "../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js ***!
  \**************************************************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "../node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bound */ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js");

var $toString = callBound('Object.prototype.toString');

/** @type {import('.')} */
var isStandardArguments = function isArguments(value) {
	if (
		hasToStringTag
		&& value
		&& typeof value === 'object'
		&& Symbol.toStringTag in value
	) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

/** @type {import('.')} */
var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null
		&& typeof value === 'object'
		&& 'length' in value
		&& typeof value.length === 'number'
		&& value.length >= 0
		&& $toString(value) !== '[object Array]'
		&& 'callee' in value
		&& $toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

/** @type {import('.')} */
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/is-callable@1.2.7/node_modules/is-callable/index.js ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "../node_modules/.pnpm/is-generator-function@1.1.0/node_modules/is-generator-function/index.js":
/*!*****************************************************************************************************!*\
  !*** ../node_modules/.pnpm/is-generator-function@1.1.0/node_modules/is-generator-function/index.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js");
var safeRegexTest = __webpack_require__(/*! safe-regex-test */ "../node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js");
var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
var getProto = __webpack_require__(/*! get-proto */ "../node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js");

var toStr = callBound('Object.prototype.toString');
var fnToStr = callBound('Function.prototype.toString');

var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
/** @type {undefined | false | null | GeneratorFunctionConstructor} */
var GeneratorFunction;

/** @type {import('.')} */
module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex(fnToStr(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc
			// eslint-disable-next-line no-extra-parens
			? /** @type {GeneratorFunctionConstructor} */ (getProto(generatorFunc))
			: false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js":
/*!********************************************************************************!*\
  !*** ../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/index.js":
/*!***********************************************************************!*\
  !*** ../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/index.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "../node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js":
/*!**************************************************************************!*\
  !*** ../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/shim.js":
/*!**********************************************************************!*\
  !*** ../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/shim.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "../node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../node_modules/.pnpm/is-nan@1.3.2/node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "../node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js":
/*!***************************************************************************!*\
  !*** ../node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js");
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();
var hasOwn = __webpack_require__(/*! hasown */ "../node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js");
var gOPD = __webpack_require__(/*! gopd */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");

/** @type {import('.')} */
var fn;

if (hasToStringTag) {
	/** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */
	var $exec = callBound('RegExp.prototype.exec');
	/** @type {object} */
	var isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	/** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */
	var badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}

	/** @type {import('.')} */
	// @ts-expect-error TS can't figure out that the $exec call always throws
	// eslint-disable-next-line consistent-return
	fn = function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {NonNullable<typeof gOPD>} */ (gOPD)(/** @type {{ lastIndex?: unknown }} */ (value), 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			// eslint-disable-next-line no-extra-parens
			$exec(value, /** @type {string} */ (/** @type {unknown} */ (badStringifier)));
		} catch (e) {
			return e === isRegexMarker;
		}
	};
} else {
	/** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */
	var $toString = callBound('Object.prototype.toString');
	/** @const @type {'[object RegExp]'} */
	var regexClass = '[object RegExp]';

	/** @type {import('.')} */
	fn = function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};
}

module.exports = fn;


/***/ }),

/***/ "../node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var whichTypedArray = __webpack_require__(/*! which-typed-array */ "../node_modules/.pnpm/which-typed-array@1.1.18/node_modules/which-typed-array/index.js");

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./abs')} */
module.exports = Math.abs;


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./floor')} */
module.exports = Math.floor;


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./isNaN')} */
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./max')} */
module.exports = Math.max;


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./min')} */
module.exports = Math.min;


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./pow')} */
module.exports = Math.pow;


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('./round')} */
module.exports = Math.round;


/***/ }),

/***/ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $isNaN = __webpack_require__(/*! ./isNaN */ "../node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js");

/** @type {import('./sign')} */
module.exports = function sign(number) {
	if ($isNaN(number) || number === 0) {
		return number;
	}
	return number < 0 ? -1 : +1;
};


/***/ }),

/***/ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/implementation.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/implementation.js ***!
  \**************************************************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "../node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js":
/*!********************************************************************************!*\
  !*** ../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/shim.js":
/*!****************************************************************************!*\
  !*** ../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/shim.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "../node_modules/.pnpm/object-is@1.1.6/node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "../node_modules/.pnpm/define-properties@1.2.1/node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/isArguments.js ***!
  \***************************************************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "../node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/implementation.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/implementation.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(/*! object-keys */ "../node_modules/.pnpm/object-keys@1.1.1/node_modules/object-keys/index.js");
var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "../node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js")();
var callBound = __webpack_require__(/*! call-bound */ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js");
var $Object = __webpack_require__(/*! es-object-atoms */ "../node_modules/.pnpm/es-object-atoms@1.0.0/node_modules/es-object-atoms/index.js");
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? $Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = $Object(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = $Object(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && ($Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};


/***/ }),

/***/ "../node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/polyfill.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/polyfill.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "../node_modules/.pnpm/object.assign@4.1.7/node_modules/object.assign/implementation.js");

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/bbox.js":
/*!************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/bbox.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// The Bounding Box object

function derive(v0, v1, v2, v3, t) {
    return Math.pow(1 - t, 3) * v0 +
        3 * Math.pow(1 - t, 2) * t * v1 +
        3 * (1 - t) * Math.pow(t, 2) * v2 +
        Math.pow(t, 3) * v3;
}
/**
 * A bounding box is an enclosing box that describes the smallest measure within which all the points lie.
 * It is used to calculate the bounding box of a glyph or text path.
 *
 * On initialization, x1/y1/x2/y2 will be NaN. Check if the bounding box is empty using `isEmpty()`.
 *
 * @exports opentype.BoundingBox
 * @class
 * @constructor
 */
function BoundingBox() {
    this.x1 = Number.NaN;
    this.y1 = Number.NaN;
    this.x2 = Number.NaN;
    this.y2 = Number.NaN;
}

/**
 * Returns true if the bounding box is empty, that is, no points have been added to the box yet.
 */
BoundingBox.prototype.isEmpty = function() {
    return isNaN(this.x1) || isNaN(this.y1) || isNaN(this.x2) || isNaN(this.y2);
};

/**
 * Add the point to the bounding box.
 * The x1/y1/x2/y2 coordinates of the bounding box will now encompass the given point.
 * @param {number} x - The X coordinate of the point.
 * @param {number} y - The Y coordinate of the point.
 */
BoundingBox.prototype.addPoint = function(x, y) {
    if (typeof x === 'number') {
        if (isNaN(this.x1) || isNaN(this.x2)) {
            this.x1 = x;
            this.x2 = x;
        }
        if (x < this.x1) {
            this.x1 = x;
        }
        if (x > this.x2) {
            this.x2 = x;
        }
    }
    if (typeof y === 'number') {
        if (isNaN(this.y1) || isNaN(this.y2)) {
            this.y1 = y;
            this.y2 = y;
        }
        if (y < this.y1) {
            this.y1 = y;
        }
        if (y > this.y2) {
            this.y2 = y;
        }
    }
};

/**
 * Add a X coordinate to the bounding box.
 * This extends the bounding box to include the X coordinate.
 * This function is used internally inside of addBezier.
 * @param {number} x - The X coordinate of the point.
 */
BoundingBox.prototype.addX = function(x) {
    this.addPoint(x, null);
};

/**
 * Add a Y coordinate to the bounding box.
 * This extends the bounding box to include the Y coordinate.
 * This function is used internally inside of addBezier.
 * @param {number} y - The Y coordinate of the point.
 */
BoundingBox.prototype.addY = function(y) {
    this.addPoint(null, y);
};

/**
 * Add a Bézier curve to the bounding box.
 * This extends the bounding box to include the entire Bézier.
 * @param {number} x0 - The starting X coordinate.
 * @param {number} y0 - The starting Y coordinate.
 * @param {number} x1 - The X coordinate of the first control point.
 * @param {number} y1 - The Y coordinate of the first control point.
 * @param {number} x2 - The X coordinate of the second control point.
 * @param {number} y2 - The Y coordinate of the second control point.
 * @param {number} x - The ending X coordinate.
 * @param {number} y - The ending Y coordinate.
 */
BoundingBox.prototype.addBezier = function(x0, y0, x1, y1, x2, y2, x, y) {
    // This code is based on http://nishiohirokazu.blogspot.com/2009/06/how-to-calculate-bezier-curves-bounding.html
    // and https://github.com/icons8/svg-path-bounding-box

    const p0 = [x0, y0];
    const p1 = [x1, y1];
    const p2 = [x2, y2];
    const p3 = [x, y];

    this.addPoint(x0, y0);
    this.addPoint(x, y);

    for (let i = 0; i <= 1; i++) {
        const b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
        const a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
        const c = 3 * p1[i] - 3 * p0[i];

        if (a === 0) {
            if (b === 0) continue;
            const t = -c / b;
            if (0 < t && t < 1) {
                if (i === 0) this.addX(derive(p0[i], p1[i], p2[i], p3[i], t));
                if (i === 1) this.addY(derive(p0[i], p1[i], p2[i], p3[i], t));
            }
            continue;
        }

        const b2ac = Math.pow(b, 2) - 4 * c * a;
        if (b2ac < 0) continue;
        const t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
        if (0 < t1 && t1 < 1) {
            if (i === 0) this.addX(derive(p0[i], p1[i], p2[i], p3[i], t1));
            if (i === 1) this.addY(derive(p0[i], p1[i], p2[i], p3[i], t1));
        }
        const t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
        if (0 < t2 && t2 < 1) {
            if (i === 0) this.addX(derive(p0[i], p1[i], p2[i], p3[i], t2));
            if (i === 1) this.addY(derive(p0[i], p1[i], p2[i], p3[i], t2));
        }
    }
};

/**
 * Add a quadratic curve to the bounding box.
 * This extends the bounding box to include the entire quadratic curve.
 * @param {number} x0 - The starting X coordinate.
 * @param {number} y0 - The starting Y coordinate.
 * @param {number} x1 - The X coordinate of the control point.
 * @param {number} y1 - The Y coordinate of the control point.
 * @param {number} x - The ending X coordinate.
 * @param {number} y - The ending Y coordinate.
 */
BoundingBox.prototype.addQuad = function(x0, y0, x1, y1, x, y) {
    const cp1x = x0 + 2 / 3 * (x1 - x0);
    const cp1y = y0 + 2 / 3 * (y1 - y0);
    const cp2x = cp1x + 1 / 3 * (x - x0);
    const cp2y = cp1y + 1 / 3 * (y - y0);
    this.addBezier(x0, y0, cp1x, cp1y, cp2x, cp2y, x, y);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoundingBox);


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argument: () => (/* binding */ argument),
/* harmony export */   assert: () => (/* binding */ argument),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fail: () => (/* binding */ fail)
/* harmony export */ });
// Run-time checking of preconditions.

function fail(message) {
    throw new Error(message);
}

// Precondition function that checks if the given predicate is true.
// If not, it will throw an error.
function argument(predicate, message) {
    if (!predicate) {
        fail(message);
    }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ fail, argument, assert: argument });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/draw.js":
/*!************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/draw.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Drawing utility functions.

// Draw a line on the given context from point `x1,y1` to point `x2,y2`.
function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ line });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/encoding.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/encoding.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CffEncoding: () => (/* binding */ CffEncoding),
/* harmony export */   CmapEncoding: () => (/* binding */ CmapEncoding),
/* harmony export */   DefaultEncoding: () => (/* binding */ DefaultEncoding),
/* harmony export */   GlyphNames: () => (/* binding */ GlyphNames),
/* harmony export */   addGlyphNames: () => (/* binding */ addGlyphNames),
/* harmony export */   cffExpertEncoding: () => (/* binding */ cffExpertEncoding),
/* harmony export */   cffStandardEncoding: () => (/* binding */ cffStandardEncoding),
/* harmony export */   cffStandardStrings: () => (/* binding */ cffStandardStrings),
/* harmony export */   standardNames: () => (/* binding */ standardNames)
/* harmony export */ });
// Glyph encoding

const cffStandardStrings = [
    '.notdef', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
    'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
    'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
    'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
    'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', 'exclamdown', 'cent', 'sterling',
    'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle', 'quotedblleft', 'guillemotleft',
    'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'endash', 'dagger', 'daggerdbl', 'periodcentered', 'paragraph',
    'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright', 'guillemotright', 'ellipsis', 'perthousand',
    'questiondown', 'grave', 'acute', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'dieresis', 'ring',
    'cedilla', 'hungarumlaut', 'ogonek', 'caron', 'emdash', 'AE', 'ordfeminine', 'Lslash', 'Oslash', 'OE',
    'ordmasculine', 'ae', 'dotlessi', 'lslash', 'oslash', 'oe', 'germandbls', 'onesuperior', 'logicalnot', 'mu',
    'trademark', 'Eth', 'onehalf', 'plusminus', 'Thorn', 'onequarter', 'divide', 'brokenbar', 'degree', 'thorn',
    'threequarters', 'twosuperior', 'registered', 'minus', 'eth', 'multiply', 'threesuperior', 'copyright',
    'Aacute', 'Acircumflex', 'Adieresis', 'Agrave', 'Aring', 'Atilde', 'Ccedilla', 'Eacute', 'Ecircumflex',
    'Edieresis', 'Egrave', 'Iacute', 'Icircumflex', 'Idieresis', 'Igrave', 'Ntilde', 'Oacute', 'Ocircumflex',
    'Odieresis', 'Ograve', 'Otilde', 'Scaron', 'Uacute', 'Ucircumflex', 'Udieresis', 'Ugrave', 'Yacute',
    'Ydieresis', 'Zcaron', 'aacute', 'acircumflex', 'adieresis', 'agrave', 'aring', 'atilde', 'ccedilla', 'eacute',
    'ecircumflex', 'edieresis', 'egrave', 'iacute', 'icircumflex', 'idieresis', 'igrave', 'ntilde', 'oacute',
    'ocircumflex', 'odieresis', 'ograve', 'otilde', 'scaron', 'uacute', 'ucircumflex', 'udieresis', 'ugrave',
    'yacute', 'ydieresis', 'zcaron', 'exclamsmall', 'Hungarumlautsmall', 'dollaroldstyle', 'dollarsuperior',
    'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', '266 ff', 'onedotenleader',
    'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle', 'fouroldstyle', 'fiveoldstyle', 'sixoldstyle',
    'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'commasuperior', 'threequartersemdash', 'periodsuperior',
    'questionsmall', 'asuperior', 'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', 'isuperior', 'lsuperior',
    'msuperior', 'nsuperior', 'osuperior', 'rsuperior', 'ssuperior', 'tsuperior', 'ff', 'ffi', 'ffl',
    'parenleftinferior', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
    'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
    'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
    'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', 'exclamdownsmall',
    'centoldstyle', 'Lslashsmall', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall', 'Brevesmall', 'Caronsmall',
    'Dotaccentsmall', 'Macronsmall', 'figuredash', 'hypheninferior', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds',
    'zerosuperior', 'foursuperior', 'fivesuperior', 'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior',
    'zeroinferior', 'oneinferior', 'twoinferior', 'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior',
    'seveninferior', 'eightinferior', 'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior',
    'commainferior', 'Agravesmall', 'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall',
    'Aringsmall', 'AEsmall', 'Ccedillasmall', 'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall',
    'Igravesmall', 'Iacutesmall', 'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall',
    'Oacutesmall', 'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall',
    'Uacutesmall', 'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall', '001.000',
    '001.001', '001.002', '001.003', 'Black', 'Bold', 'Book', 'Light', 'Medium', 'Regular', 'Roman', 'Semibold'];

const cffStandardEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent', 'ampersand', 'quoteright',
    'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash', 'zero', 'one', 'two',
    'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less', 'equal', 'greater',
    'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright', 'asciicircum', 'underscore',
    'quoteleft', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'exclamdown', 'cent', 'sterling', 'fraction', 'yen', 'florin', 'section', 'currency', 'quotesingle',
    'quotedblleft', 'guillemotleft', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', '', 'endash', 'dagger',
    'daggerdbl', 'periodcentered', '', 'paragraph', 'bullet', 'quotesinglbase', 'quotedblbase', 'quotedblright',
    'guillemotright', 'ellipsis', 'perthousand', '', 'questiondown', '', 'grave', 'acute', 'circumflex', 'tilde',
    'macron', 'breve', 'dotaccent', 'dieresis', '', 'ring', 'cedilla', '', 'hungarumlaut', 'ogonek', 'caron',
    'emdash', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'AE', '', 'ordfeminine', '', '', '',
    '', 'Lslash', 'Oslash', 'OE', 'ordmasculine', '', '', '', '', '', 'ae', '', '', '', 'dotlessi', '', '',
    'lslash', 'oslash', 'oe', 'germandbls'];

const cffExpertEncoding = [
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', 'space', 'exclamsmall', 'Hungarumlautsmall', '', 'dollaroldstyle', 'dollarsuperior',
    'ampersandsmall', 'Acutesmall', 'parenleftsuperior', 'parenrightsuperior', 'twodotenleader', 'onedotenleader',
    'comma', 'hyphen', 'period', 'fraction', 'zerooldstyle', 'oneoldstyle', 'twooldstyle', 'threeoldstyle',
    'fouroldstyle', 'fiveoldstyle', 'sixoldstyle', 'sevenoldstyle', 'eightoldstyle', 'nineoldstyle', 'colon',
    'semicolon', 'commasuperior', 'threequartersemdash', 'periodsuperior', 'questionsmall', '', 'asuperior',
    'bsuperior', 'centsuperior', 'dsuperior', 'esuperior', '', '', 'isuperior', '', '', 'lsuperior', 'msuperior',
    'nsuperior', 'osuperior', '', '', 'rsuperior', 'ssuperior', 'tsuperior', '', 'ff', 'fi', 'fl', 'ffi', 'ffl',
    'parenleftinferior', '', 'parenrightinferior', 'Circumflexsmall', 'hyphensuperior', 'Gravesmall', 'Asmall',
    'Bsmall', 'Csmall', 'Dsmall', 'Esmall', 'Fsmall', 'Gsmall', 'Hsmall', 'Ismall', 'Jsmall', 'Ksmall', 'Lsmall',
    'Msmall', 'Nsmall', 'Osmall', 'Psmall', 'Qsmall', 'Rsmall', 'Ssmall', 'Tsmall', 'Usmall', 'Vsmall', 'Wsmall',
    'Xsmall', 'Ysmall', 'Zsmall', 'colonmonetary', 'onefitted', 'rupiah', 'Tildesmall', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'exclamdownsmall', 'centoldstyle', 'Lslashsmall', '', '', 'Scaronsmall', 'Zcaronsmall', 'Dieresissmall',
    'Brevesmall', 'Caronsmall', '', 'Dotaccentsmall', '', '', 'Macronsmall', '', '', 'figuredash', 'hypheninferior',
    '', '', 'Ogoneksmall', 'Ringsmall', 'Cedillasmall', '', '', '', 'onequarter', 'onehalf', 'threequarters',
    'questiondownsmall', 'oneeighth', 'threeeighths', 'fiveeighths', 'seveneighths', 'onethird', 'twothirds', '',
    '', 'zerosuperior', 'onesuperior', 'twosuperior', 'threesuperior', 'foursuperior', 'fivesuperior',
    'sixsuperior', 'sevensuperior', 'eightsuperior', 'ninesuperior', 'zeroinferior', 'oneinferior', 'twoinferior',
    'threeinferior', 'fourinferior', 'fiveinferior', 'sixinferior', 'seveninferior', 'eightinferior',
    'nineinferior', 'centinferior', 'dollarinferior', 'periodinferior', 'commainferior', 'Agravesmall',
    'Aacutesmall', 'Acircumflexsmall', 'Atildesmall', 'Adieresissmall', 'Aringsmall', 'AEsmall', 'Ccedillasmall',
    'Egravesmall', 'Eacutesmall', 'Ecircumflexsmall', 'Edieresissmall', 'Igravesmall', 'Iacutesmall',
    'Icircumflexsmall', 'Idieresissmall', 'Ethsmall', 'Ntildesmall', 'Ogravesmall', 'Oacutesmall',
    'Ocircumflexsmall', 'Otildesmall', 'Odieresissmall', 'OEsmall', 'Oslashsmall', 'Ugravesmall', 'Uacutesmall',
    'Ucircumflexsmall', 'Udieresissmall', 'Yacutesmall', 'Thornsmall', 'Ydieresissmall'];

const standardNames = [
    '.notdef', '.null', 'nonmarkingreturn', 'space', 'exclam', 'quotedbl', 'numbersign', 'dollar', 'percent',
    'ampersand', 'quotesingle', 'parenleft', 'parenright', 'asterisk', 'plus', 'comma', 'hyphen', 'period', 'slash',
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'colon', 'semicolon', 'less',
    'equal', 'greater', 'question', 'at', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'bracketleft', 'backslash', 'bracketright',
    'asciicircum', 'underscore', 'grave', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'braceleft', 'bar', 'braceright', 'asciitilde',
    'Adieresis', 'Aring', 'Ccedilla', 'Eacute', 'Ntilde', 'Odieresis', 'Udieresis', 'aacute', 'agrave',
    'acircumflex', 'adieresis', 'atilde', 'aring', 'ccedilla', 'eacute', 'egrave', 'ecircumflex', 'edieresis',
    'iacute', 'igrave', 'icircumflex', 'idieresis', 'ntilde', 'oacute', 'ograve', 'ocircumflex', 'odieresis',
    'otilde', 'uacute', 'ugrave', 'ucircumflex', 'udieresis', 'dagger', 'degree', 'cent', 'sterling', 'section',
    'bullet', 'paragraph', 'germandbls', 'registered', 'copyright', 'trademark', 'acute', 'dieresis', 'notequal',
    'AE', 'Oslash', 'infinity', 'plusminus', 'lessequal', 'greaterequal', 'yen', 'mu', 'partialdiff', 'summation',
    'product', 'pi', 'integral', 'ordfeminine', 'ordmasculine', 'Omega', 'ae', 'oslash', 'questiondown',
    'exclamdown', 'logicalnot', 'radical', 'florin', 'approxequal', 'Delta', 'guillemotleft', 'guillemotright',
    'ellipsis', 'nonbreakingspace', 'Agrave', 'Atilde', 'Otilde', 'OE', 'oe', 'endash', 'emdash', 'quotedblleft',
    'quotedblright', 'quoteleft', 'quoteright', 'divide', 'lozenge', 'ydieresis', 'Ydieresis', 'fraction',
    'currency', 'guilsinglleft', 'guilsinglright', 'fi', 'fl', 'daggerdbl', 'periodcentered', 'quotesinglbase',
    'quotedblbase', 'perthousand', 'Acircumflex', 'Ecircumflex', 'Aacute', 'Edieresis', 'Egrave', 'Iacute',
    'Icircumflex', 'Idieresis', 'Igrave', 'Oacute', 'Ocircumflex', 'apple', 'Ograve', 'Uacute', 'Ucircumflex',
    'Ugrave', 'dotlessi', 'circumflex', 'tilde', 'macron', 'breve', 'dotaccent', 'ring', 'cedilla', 'hungarumlaut',
    'ogonek', 'caron', 'Lslash', 'lslash', 'Scaron', 'scaron', 'Zcaron', 'zcaron', 'brokenbar', 'Eth', 'eth',
    'Yacute', 'yacute', 'Thorn', 'thorn', 'minus', 'multiply', 'onesuperior', 'twosuperior', 'threesuperior',
    'onehalf', 'onequarter', 'threequarters', 'franc', 'Gbreve', 'gbreve', 'Idotaccent', 'Scedilla', 'scedilla',
    'Cacute', 'cacute', 'Ccaron', 'ccaron', 'dcroat'];

/**
 * This is the encoding used for fonts created from scratch.
 * It loops through all glyphs and finds the appropriate unicode value.
 * Since it's linear time, other encodings will be faster.
 * @exports opentype.DefaultEncoding
 * @class
 * @constructor
 * @param {opentype.Font}
 */
function DefaultEncoding(font) {
    this.font = font;
}

DefaultEncoding.prototype.charToGlyphIndex = function(c) {
    const code = c.charCodeAt(0);
    const glyphs = this.font.glyphs;
    if (glyphs) {
        for (let i = 0; i < glyphs.length; i += 1) {
            const glyph = glyphs.get(i);
            for (let j = 0; j < glyph.unicodes.length; j += 1) {
                if (glyph.unicodes[j] === code) {
                    return i;
                }
            }
        }
    }
    return null;
};

/**
 * @exports opentype.CmapEncoding
 * @class
 * @constructor
 * @param {Object} cmap - a object with the cmap encoded data
 */
function CmapEncoding(cmap) {
    this.cmap = cmap;
}

/**
 * @param  {string} c - the character
 * @return {number} The glyph index.
 */
CmapEncoding.prototype.charToGlyphIndex = function(c) {
    return this.cmap.glyphIndexMap[c.charCodeAt(0)] || 0;
};

/**
 * @exports opentype.CffEncoding
 * @class
 * @constructor
 * @param {string} encoding - The encoding
 * @param {Array} charset - The character set.
 */
function CffEncoding(encoding, charset) {
    this.encoding = encoding;
    this.charset = charset;
}

/**
 * @param  {string} s - The character
 * @return {number} The index.
 */
CffEncoding.prototype.charToGlyphIndex = function(s) {
    const code = s.charCodeAt(0);
    const charName = this.encoding[code];
    return this.charset.indexOf(charName);
};

/**
 * @exports opentype.GlyphNames
 * @class
 * @constructor
 * @param {Object} post
 */
function GlyphNames(post) {
    switch (post.version) {
        case 1:
            this.names = standardNames.slice();
            break;
        case 2:
            this.names = new Array(post.numberOfGlyphs);
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                if (post.glyphNameIndex[i] < standardNames.length) {
                    this.names[i] = standardNames[post.glyphNameIndex[i]];
                } else {
                    this.names[i] = post.names[post.glyphNameIndex[i] - standardNames.length];
                }
            }

            break;
        case 2.5:
            this.names = new Array(post.numberOfGlyphs);
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                this.names[i] = standardNames[i + post.glyphNameIndex[i]];
            }

            break;
        case 3:
            this.names = [];
            break;
        default:
            this.names = [];
            break;
    }
}

/**
 * Gets the index of a glyph by name.
 * @param  {string} name - The glyph name
 * @return {number} The index
 */
GlyphNames.prototype.nameToGlyphIndex = function(name) {
    return this.names.indexOf(name);
};

/**
 * @param  {number} gid
 * @return {string}
 */
GlyphNames.prototype.glyphIndexToName = function(gid) {
    return this.names[gid];
};

/**
 * @alias opentype.addGlyphNames
 * @param {opentype.Font}
 */
function addGlyphNames(font) {
    let glyph;
    const glyphIndexMap = font.tables.cmap.glyphIndexMap;
    const charCodes = Object.keys(glyphIndexMap);

    for (let i = 0; i < charCodes.length; i += 1) {
        const c = charCodes[i];
        const glyphIndex = glyphIndexMap[c];
        glyph = font.glyphs.get(glyphIndex);
        glyph.addUnicode(parseInt(c));
    }

    for (let i = 0; i < font.glyphs.length; i += 1) {
        glyph = font.glyphs.get(i);
        if (font.cffEncoding) {
            if (font.isCIDFont) {
                glyph.name = 'gid' + i;
            } else {
                glyph.name = font.cffEncoding.charset[i];
            }
        } else if (font.glyphNames.names) {
            glyph.name = font.glyphNames.glyphIndexToName(i);
        }
    }
}




/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/font.js":
/*!************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/font.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js");
/* harmony import */ var _tables_sfnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tables/sfnt */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/sfnt.js");
/* harmony import */ var _encoding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./encoding */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/encoding.js");
/* harmony import */ var _glyphset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glyphset */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyphset.js");
/* harmony import */ var _substitution__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./substitution */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/substitution.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/util.js");
/* harmony import */ var _hintingtt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hintingtt */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/hintingtt.js");
// The Font object









/**
 * @typedef FontOptions
 * @type Object
 * @property {Boolean} empty - whether to create a new empty font
 * @property {string} familyName
 * @property {string} styleName
 * @property {string=} fullName
 * @property {string=} postScriptName
 * @property {string=} designer
 * @property {string=} designerURL
 * @property {string=} manufacturer
 * @property {string=} manufacturerURL
 * @property {string=} license
 * @property {string=} licenseURL
 * @property {string=} version
 * @property {string=} description
 * @property {string=} copyright
 * @property {string=} trademark
 * @property {Number} unitsPerEm
 * @property {Number} ascender
 * @property {Number} descender
 * @property {Number} createdTimestamp
 * @property {string=} weightClass
 * @property {string=} widthClass
 * @property {string=} fsSelection
 */

/**
 * A Font represents a loaded OpenType font file.
 * It contains a set of glyphs and methods to draw text on a drawing context,
 * or to get a path representing the text.
 * @exports opentype.Font
 * @class
 * @param {FontOptions}
 * @constructor
 */
function Font(options) {
    options = options || {};

    if (!options.empty) {
        // Check that we've provided the minimum set of names.
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.checkArgument)(options.familyName, 'When creating a new Font object, familyName is required.');
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.checkArgument)(options.styleName, 'When creating a new Font object, styleName is required.');
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.checkArgument)(options.unitsPerEm, 'When creating a new Font object, unitsPerEm is required.');
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.checkArgument)(options.ascender, 'When creating a new Font object, ascender is required.');
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.checkArgument)(options.descender, 'When creating a new Font object, descender is required.');
        (0,_util__WEBPACK_IMPORTED_MODULE_5__.checkArgument)(options.descender < 0, 'Descender should be negative (e.g. -512).');

        // OS X will complain if the names are empty, so we put a single space everywhere by default.
        this.names = {
            fontFamily: {en: options.familyName || ' '},
            fontSubfamily: {en: options.styleName || ' '},
            fullName: {en: options.fullName || options.familyName + ' ' + options.styleName},
            postScriptName: {en: options.postScriptName || options.familyName + options.styleName},
            designer: {en: options.designer || ' '},
            designerURL: {en: options.designerURL || ' '},
            manufacturer: {en: options.manufacturer || ' '},
            manufacturerURL: {en: options.manufacturerURL || ' '},
            license: {en: options.license || ' '},
            licenseURL: {en: options.licenseURL || ' '},
            version: {en: options.version || 'Version 0.1'},
            description: {en: options.description || ' '},
            copyright: {en: options.copyright || ' '},
            trademark: {en: options.trademark || ' '}
        };
        this.unitsPerEm = options.unitsPerEm || 1000;
        this.ascender = options.ascender;
        this.descender = options.descender;
        this.createdTimestamp = options.createdTimestamp;
        this.tables = { os2: {
            usWeightClass: options.weightClass || this.usWeightClasses.MEDIUM,
            usWidthClass: options.widthClass || this.usWidthClasses.MEDIUM,
            fsSelection: options.fsSelection || this.fsSelectionValues.REGULAR
        } };
    }

    this.supported = true; // Deprecated: parseBuffer will throw an error if font is not supported.
    this.glyphs = new _glyphset__WEBPACK_IMPORTED_MODULE_3__["default"].GlyphSet(this, options.glyphs || []);
    this.encoding = new _encoding__WEBPACK_IMPORTED_MODULE_2__.DefaultEncoding(this);
    this.substitution = new _substitution__WEBPACK_IMPORTED_MODULE_4__["default"](this);
    this.tables = this.tables || {};

    Object.defineProperty(this, 'hinting', {
        get: function() {
            if (this._hinting) return this._hinting;
            if (this.outlinesFormat === 'truetype') {
                return (this._hinting = new _hintingtt__WEBPACK_IMPORTED_MODULE_6__["default"](this));
            }
        }
    });
}

/**
 * Check if the font has a glyph for the given character.
 * @param  {string}
 * @return {Boolean}
 */
Font.prototype.hasChar = function(c) {
    return this.encoding.charToGlyphIndex(c) !== null;
};

/**
 * Convert the given character to a single glyph index.
 * Note that this function assumes that there is a one-to-one mapping between
 * the given character and a glyph; for complex scripts this might not be the case.
 * @param  {string}
 * @return {Number}
 */
Font.prototype.charToGlyphIndex = function(s) {
    return this.encoding.charToGlyphIndex(s);
};

/**
 * Convert the given character to a single Glyph object.
 * Note that this function assumes that there is a one-to-one mapping between
 * the given character and a glyph; for complex scripts this might not be the case.
 * @param  {string}
 * @return {opentype.Glyph}
 */
Font.prototype.charToGlyph = function(c) {
    const glyphIndex = this.charToGlyphIndex(c);
    let glyph = this.glyphs.get(glyphIndex);
    if (!glyph) {
        // .notdef
        glyph = this.glyphs.get(0);
    }

    return glyph;
};

/**
 * Convert the given text to a list of Glyph objects.
 * Note that there is no strict one-to-one mapping between characters and
 * glyphs, so the list of returned glyphs can be larger or smaller than the
 * length of the given string.
 * @param  {string}
 * @param  {GlyphRenderOptions} [options]
 * @return {opentype.Glyph[]}
 */
Font.prototype.stringToGlyphs = function(s, options) {
    options = options || this.defaultRenderOptions;
    // Get glyph indexes
    const indexes = [];
    for (let i = 0; i < s.length; i += 1) {
        const c = s[i];
        indexes.push(this.charToGlyphIndex(c));
    }
    let length = indexes.length;

    // Apply substitutions on glyph indexes
    if (options.features) {
        const script = options.script || this.substitution.getDefaultScriptName();
        let manyToOne = [];
        if (options.features.liga) manyToOne = manyToOne.concat(this.substitution.getFeature('liga', script, options.language));
        if (options.features.rlig) manyToOne = manyToOne.concat(this.substitution.getFeature('rlig', script, options.language));
        for (let i = 0; i < length; i += 1) {
            for (let j = 0; j < manyToOne.length; j++) {
                const ligature = manyToOne[j];
                const components = ligature.sub;
                const compCount = components.length;
                let k = 0;
                while (k < compCount && components[k] === indexes[i + k]) k++;
                if (k === compCount) {
                    indexes.splice(i, compCount, ligature.by);
                    length = length - compCount + 1;
                }
            }
        }
    }

    // convert glyph indexes to glyph objects
    const glyphs = new Array(length);
    const notdef = this.glyphs.get(0);
    for (let i = 0; i < length; i += 1) {
        glyphs[i] = this.glyphs.get(indexes[i]) || notdef;
    }
    return glyphs;
};

/**
 * @param  {string}
 * @return {Number}
 */
Font.prototype.nameToGlyphIndex = function(name) {
    return this.glyphNames.nameToGlyphIndex(name);
};

/**
 * @param  {string}
 * @return {opentype.Glyph}
 */
Font.prototype.nameToGlyph = function(name) {
    const glyphIndex = this.nameToGlyphIndex(name);
    let glyph = this.glyphs.get(glyphIndex);
    if (!glyph) {
        // .notdef
        glyph = this.glyphs.get(0);
    }

    return glyph;
};

/**
 * @param  {Number}
 * @return {String}
 */
Font.prototype.glyphIndexToName = function(gid) {
    if (!this.glyphNames.glyphIndexToName) {
        return '';
    }

    return this.glyphNames.glyphIndexToName(gid);
};

/**
 * Retrieve the value of the kerning pair between the left glyph (or its index)
 * and the right glyph (or its index). If no kerning pair is found, return 0.
 * The kerning value gets added to the advance width when calculating the spacing
 * between glyphs.
 * @param  {opentype.Glyph} leftGlyph
 * @param  {opentype.Glyph} rightGlyph
 * @return {Number}
 */
Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
    leftGlyph = leftGlyph.index || leftGlyph;
    rightGlyph = rightGlyph.index || rightGlyph;
    const gposKerning = this.getGposKerningValue;
    return gposKerning ? gposKerning(leftGlyph, rightGlyph) :
        (this.kerningPairs[leftGlyph + ',' + rightGlyph] || 0);
};

/**
 * @typedef GlyphRenderOptions
 * @type Object
 * @property {string} [script] - script used to determine which features to apply. By default, 'DFLT' or 'latn' is used.
 *                               See https://www.microsoft.com/typography/otspec/scripttags.htm
 * @property {string} [language='dflt'] - language system used to determine which features to apply.
 *                                        See https://www.microsoft.com/typography/developers/opentype/languagetags.aspx
 * @property {boolean} [kerning=true] - whether to include kerning values
 * @property {object} [features] - OpenType Layout feature tags. Used to enable or disable the features of the given script/language system.
 *                                 See https://www.microsoft.com/typography/otspec/featuretags.htm
 */
Font.prototype.defaultRenderOptions = {
    kerning: true,
    features: {
        liga: true,
        rlig: true
    }
};

/**
 * Helper function that invokes the given callback for each glyph in the given text.
 * The callback gets `(glyph, x, y, fontSize, options)`.* @param  {string} text
 * @param {string} text - The text to apply.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {GlyphRenderOptions=} options
 * @param  {Function} callback
 */
Font.prototype.forEachGlyph = function(text, x, y, fontSize, options, callback) {
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 72;
    options = options || this.defaultRenderOptions;
    const fontScale = 1 / this.unitsPerEm * fontSize;
    const glyphs = this.stringToGlyphs(text, options);
    for (let i = 0; i < glyphs.length; i += 1) {
        const glyph = glyphs[i];
        callback.call(this, glyph, x, y, fontSize, options);
        if (glyph.advanceWidth) {
            x += glyph.advanceWidth * fontScale;
        }

        if (options.kerning && i < glyphs.length - 1) {
            const kerningValue = this.getKerningValue(glyph, glyphs[i + 1]);
            x += kerningValue * fontScale;
        }

        if (options.letterSpacing) {
            x += options.letterSpacing * fontSize;
        } else if (options.tracking) {
            x += (options.tracking / 1000) * fontSize;
        }
    }
    return x;
};

/**
 * Create a Path object that represents the given text.
 * @param  {string} text - The text to create.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {GlyphRenderOptions=} options
 * @return {opentype.Path}
 */
Font.prototype.getPath = function(text, x, y, fontSize, options) {
    const fullPath = new _path__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        const glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
        fullPath.extend(glyphPath);
    });
    return fullPath;
};

/**
 * Create an array of Path objects that represent the glyphs of a given text.
 * @param  {string} text - The text to create.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {GlyphRenderOptions=} options
 * @return {opentype.Path[]}
 */
Font.prototype.getPaths = function(text, x, y, fontSize, options) {
    const glyphPaths = [];
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        const glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
        glyphPaths.push(glyphPath);
    });

    return glyphPaths;
};

/**
 * Returns the advance width of a text.
 *
 * This is something different than Path.getBoundingBox() as for example a
 * suffixed whitespace increases the advanceWidth but not the bounding box
 * or an overhanging letter like a calligraphic 'f' might have a quite larger
 * bounding box than its advance width.
 *
 * This corresponds to canvas2dContext.measureText(text).width
 *
 * @param  {string} text - The text to create.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {GlyphRenderOptions=} options
 * @return advance width
 */
Font.prototype.getAdvanceWidth = function(text, fontSize, options) {
    return this.forEachGlyph(text, 0, 0, fontSize, options, function() {});
};

/**
 * Draw the text on the given drawing context.
 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
 * @param  {string} text - The text to create.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {GlyphRenderOptions=} options
 */
Font.prototype.draw = function(ctx, text, x, y, fontSize, options) {
    this.getPath(text, x, y, fontSize, options).draw(ctx);
};

/**
 * Draw the points of all glyphs in the text.
 * On-curve points will be drawn in blue, off-curve points will be drawn in red.
 * @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
 * @param {string} text - The text to create.
 * @param {number} [x=0] - Horizontal position of the beginning of the text.
 * @param {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param {GlyphRenderOptions=} options
 */
Font.prototype.drawPoints = function(ctx, text, x, y, fontSize, options) {
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        glyph.drawPoints(ctx, gX, gY, gFontSize);
    });
};

/**
 * Draw lines indicating important font measurements for all glyphs in the text.
 * Black lines indicate the origin of the coordinate system (point 0,0).
 * Blue lines indicate the glyph bounding box.
 * Green line indicates the advance width of the glyph.
 * @param {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
 * @param {string} text - The text to create.
 * @param {number} [x=0] - Horizontal position of the beginning of the text.
 * @param {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param {GlyphRenderOptions=} options
 */
Font.prototype.drawMetrics = function(ctx, text, x, y, fontSize, options) {
    this.forEachGlyph(text, x, y, fontSize, options, function(glyph, gX, gY, gFontSize) {
        glyph.drawMetrics(ctx, gX, gY, gFontSize);
    });
};

/**
 * @param  {string}
 * @return {string}
 */
Font.prototype.getEnglishName = function(name) {
    const translations = this.names[name];
    if (translations) {
        return translations.en;
    }
};

/**
 * Validate
 */
Font.prototype.validate = function() {
    const warnings = [];
    const _this = this;

    function assert(predicate, message) {
        if (!predicate) {
            warnings.push(message);
        }
    }

    function assertNamePresent(name) {
        const englishName = _this.getEnglishName(name);
        assert(englishName && englishName.trim().length > 0,
               'No English ' + name + ' specified.');
    }

    // Identification information
    assertNamePresent('fontFamily');
    assertNamePresent('weightName');
    assertNamePresent('manufacturer');
    assertNamePresent('copyright');
    assertNamePresent('version');

    // Dimension information
    assert(this.unitsPerEm > 0, 'No unitsPerEm specified.');
};

/**
 * Convert the font object to a SFNT data structure.
 * This structure contains all the necessary tables and metadata to create a binary OTF file.
 * @return {opentype.Table}
 */
Font.prototype.toTables = function() {
    return _tables_sfnt__WEBPACK_IMPORTED_MODULE_1__["default"].fontToTable(this);
};
/**
 * @deprecated Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.
 */
Font.prototype.toBuffer = function() {
    console.warn('Font.toBuffer is deprecated. Use Font.toArrayBuffer instead.');
    return this.toArrayBuffer();
};
/**
 * Converts a `opentype.Font` into an `ArrayBuffer`
 * @return {ArrayBuffer}
 */
Font.prototype.toArrayBuffer = function() {
    const sfntTable = this.toTables();
    const bytes = sfntTable.encode();
    const buffer = new ArrayBuffer(bytes.length);
    const intArray = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
        intArray[i] = bytes[i];
    }

    return buffer;
};

/**
 * Initiate a download of the OpenType font.
 */
Font.prototype.download = function(fileName) {
    const familyName = this.getEnglishName('fontFamily');
    const styleName = this.getEnglishName('fontSubfamily');
    fileName = fileName || familyName.replace(/\s/g, '') + '-' + styleName + '.otf';
    const arrayBuffer = this.toArrayBuffer();

    if ((0,_util__WEBPACK_IMPORTED_MODULE_5__.isBrowser)()) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.TEMPORARY, arrayBuffer.byteLength, function(fs) {
            fs.root.getFile(fileName, {create: true}, function(fileEntry) {
                fileEntry.createWriter(function(writer) {
                    const dataView = new DataView(arrayBuffer);
                    const blob = new Blob([dataView], {type: 'font/opentype'});
                    writer.write(blob);

                    writer.addEventListener('writeend', function() {
                        // Navigating to the file will download it.
                        location.href = fileEntry.toURL();
                    }, false);
                });
            });
        },
        function(err) {
            throw new Error(err.name + ': ' + err.message);
        });
    } else {
        const fs = __webpack_require__(/*! fs */ "?5e0b");
        const buffer = (0,_util__WEBPACK_IMPORTED_MODULE_5__.arrayBufferToNodeBuffer)(arrayBuffer);
        fs.writeFileSync(fileName, buffer);
    }
};
/**
 * @private
 */
Font.prototype.fsSelectionValues = {
    ITALIC:              0x001, //1
    UNDERSCORE:          0x002, //2
    NEGATIVE:            0x004, //4
    OUTLINED:            0x008, //8
    STRIKEOUT:           0x010, //16
    BOLD:                0x020, //32
    REGULAR:             0x040, //64
    USER_TYPO_METRICS:   0x080, //128
    WWS:                 0x100, //256
    OBLIQUE:             0x200  //512
};

/**
 * @private
 */
Font.prototype.usWidthClasses = {
    ULTRA_CONDENSED: 1,
    EXTRA_CONDENSED: 2,
    CONDENSED: 3,
    SEMI_CONDENSED: 4,
    MEDIUM: 5,
    SEMI_EXPANDED: 6,
    EXPANDED: 7,
    EXTRA_EXPANDED: 8,
    ULTRA_EXPANDED: 9
};

/**
 * @private
 */
Font.prototype.usWeightClasses = {
    THIN: 100,
    EXTRA_LIGHT: 200,
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMI_BOLD: 600,
    BOLD: 700,
    EXTRA_BOLD: 800,
    BLACK:    900
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Font);


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyph.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyph.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/draw.js");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js");
/* harmony import */ var _tables_glyf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tables/glyf */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/glyf.js");
// The Glyph object






function getPathDefinition(glyph, path) {
    let _path = path || {commands: []};
    return {
        configurable: true,

        get: function() {
            if (typeof _path === 'function') {
                _path = _path();
            }

            return _path;
        },

        set: function(p) {
            _path = p;
        }
    };
}
/**
 * @typedef GlyphOptions
 * @type Object
 * @property {string} [name] - The glyph name
 * @property {number} [unicode]
 * @property {Array} [unicodes]
 * @property {number} [xMin]
 * @property {number} [yMin]
 * @property {number} [xMax]
 * @property {number} [yMax]
 * @property {number} [advanceWidth]
 */

// A Glyph is an individual mark that often corresponds to a character.
// Some glyphs, such as ligatures, are a combination of many characters.
// Glyphs are the basic building blocks of a font.
//
// The `Glyph` class contains utility methods for drawing the path and its points.
/**
 * @exports opentype.Glyph
 * @class
 * @param {GlyphOptions}
 * @constructor
 */
function Glyph(options) {
    // By putting all the code on a prototype function (which is only declared once)
    // we reduce the memory requirements for larger fonts by some 2%
    this.bindConstructorValues(options);
}

/**
 * @param  {GlyphOptions}
 */
Glyph.prototype.bindConstructorValues = function(options) {
    this.index = options.index || 0;

    // These three values cannot be deferred for memory optimization:
    this.name = options.name || null;
    this.unicode = options.unicode || undefined;
    this.unicodes = options.unicodes || options.unicode !== undefined ? [options.unicode] : [];

    // But by binding these values only when necessary, we reduce can
    // the memory requirements by almost 3% for larger fonts.
    if (options.xMin) {
        this.xMin = options.xMin;
    }

    if (options.yMin) {
        this.yMin = options.yMin;
    }

    if (options.xMax) {
        this.xMax = options.xMax;
    }

    if (options.yMax) {
        this.yMax = options.yMax;
    }

    if (options.advanceWidth) {
        this.advanceWidth = options.advanceWidth;
    }

    // The path for a glyph is the most memory intensive, and is bound as a value
    // with a getter/setter to ensure we actually do path parsing only once the
    // path is actually needed by anything.
    Object.defineProperty(this, 'path', getPathDefinition(this, options.path));
};

/**
 * @param {number}
 */
Glyph.prototype.addUnicode = function(unicode) {
    if (this.unicodes.length === 0) {
        this.unicode = unicode;
    }

    this.unicodes.push(unicode);
};

/**
 * Calculate the minimum bounding box for this glyph.
 * @return {opentype.BoundingBox}
 */
Glyph.prototype.getBoundingBox = function() {
    return this.path.getBoundingBox();
};

/**
 * Convert the glyph to a Path we can draw on a drawing context.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {Object=} options - xScale, yScale to stretch the glyph.
 * @param  {opentype.Font} if hinting is to be used, the font
 * @return {opentype.Path}
 */
Glyph.prototype.getPath = function(x, y, fontSize, options, font) {
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 72;
    let commands;
    let hPoints;
    if (!options) options = { };
    let xScale = options.xScale;
    let yScale = options.yScale;

    if (options.hinting && font && font.hinting) {
        // in case of hinting, the hinting engine takes care
        // of scaling the points (not the path) before hinting.
        hPoints = this.path && font.hinting.exec(this, fontSize);
        // in case the hinting engine failed hPoints is undefined
        // and thus reverts to plain rending
    }

    if (hPoints) {
        commands = _tables_glyf__WEBPACK_IMPORTED_MODULE_3__["default"].getPath(hPoints).commands;
        x = Math.round(x);
        y = Math.round(y);
        // TODO in case of hinting xyScaling is not yet supported
        xScale = yScale = 1;
    } else {
        commands = this.path.commands;
        const scale = 1 / this.path.unitsPerEm * fontSize;
        if (xScale === undefined) xScale = scale;
        if (yScale === undefined) yScale = scale;
    }

    const p = new _path__WEBPACK_IMPORTED_MODULE_2__["default"]();
    for (let i = 0; i < commands.length; i += 1) {
        const cmd = commands[i];
        if (cmd.type === 'M') {
            p.moveTo(x + (cmd.x * xScale), y + (-cmd.y * yScale));
        } else if (cmd.type === 'L') {
            p.lineTo(x + (cmd.x * xScale), y + (-cmd.y * yScale));
        } else if (cmd.type === 'Q') {
            p.quadraticCurveTo(x + (cmd.x1 * xScale), y + (-cmd.y1 * yScale),
                               x + (cmd.x * xScale), y + (-cmd.y * yScale));
        } else if (cmd.type === 'C') {
            p.curveTo(x + (cmd.x1 * xScale), y + (-cmd.y1 * yScale),
                      x + (cmd.x2 * xScale), y + (-cmd.y2 * yScale),
                      x + (cmd.x * xScale), y + (-cmd.y * yScale));
        } else if (cmd.type === 'Z') {
            p.closePath();
        }
    }

    return p;
};

/**
 * Split the glyph into contours.
 * This function is here for backwards compatibility, and to
 * provide raw access to the TrueType glyph outlines.
 * @return {Array}
 */
Glyph.prototype.getContours = function() {
    if (this.points === undefined) {
        return [];
    }

    const contours = [];
    let currentContour = [];
    for (let i = 0; i < this.points.length; i += 1) {
        const pt = this.points[i];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
            contours.push(currentContour);
            currentContour = [];
        }
    }

    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(currentContour.length === 0, 'There are still points left in the current contour.');
    return contours;
};

/**
 * Calculate the xMin/yMin/xMax/yMax/lsb/rsb for a Glyph.
 * @return {Object}
 */
Glyph.prototype.getMetrics = function() {
    const commands = this.path.commands;
    const xCoords = [];
    const yCoords = [];
    for (let i = 0; i < commands.length; i += 1) {
        const cmd = commands[i];
        if (cmd.type !== 'Z') {
            xCoords.push(cmd.x);
            yCoords.push(cmd.y);
        }

        if (cmd.type === 'Q' || cmd.type === 'C') {
            xCoords.push(cmd.x1);
            yCoords.push(cmd.y1);
        }

        if (cmd.type === 'C') {
            xCoords.push(cmd.x2);
            yCoords.push(cmd.y2);
        }
    }

    const metrics = {
        xMin: Math.min.apply(null, xCoords),
        yMin: Math.min.apply(null, yCoords),
        xMax: Math.max.apply(null, xCoords),
        yMax: Math.max.apply(null, yCoords),
        leftSideBearing: this.leftSideBearing
    };

    if (!isFinite(metrics.xMin)) {
        metrics.xMin = 0;
    }

    if (!isFinite(metrics.xMax)) {
        metrics.xMax = this.advanceWidth;
    }

    if (!isFinite(metrics.yMin)) {
        metrics.yMin = 0;
    }

    if (!isFinite(metrics.yMax)) {
        metrics.yMax = 0;
    }

    metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
    return metrics;
};

/**
 * Draw the glyph on the given context.
 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 * @param  {Object=} options - xScale, yScale to stretch the glyph.
 */
Glyph.prototype.draw = function(ctx, x, y, fontSize, options) {
    this.getPath(x, y, fontSize, options).draw(ctx);
};

/**
 * Draw the points of the glyph.
 * On-curve points will be drawn in blue, off-curve points will be drawn in red.
 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 */
Glyph.prototype.drawPoints = function(ctx, x, y, fontSize) {
    function drawCircles(l, x, y, scale) {
        const PI_SQ = Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j < l.length; j += 1) {
            ctx.moveTo(x + (l[j].x * scale), y + (l[j].y * scale));
            ctx.arc(x + (l[j].x * scale), y + (l[j].y * scale), 2, 0, PI_SQ, false);
        }

        ctx.closePath();
        ctx.fill();
    }

    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 24;
    const scale = 1 / this.path.unitsPerEm * fontSize;

    const blueCircles = [];
    const redCircles = [];
    const path = this.path;
    for (let i = 0; i < path.commands.length; i += 1) {
        const cmd = path.commands[i];
        if (cmd.x !== undefined) {
            blueCircles.push({x: cmd.x, y: -cmd.y});
        }

        if (cmd.x1 !== undefined) {
            redCircles.push({x: cmd.x1, y: -cmd.y1});
        }

        if (cmd.x2 !== undefined) {
            redCircles.push({x: cmd.x2, y: -cmd.y2});
        }
    }

    ctx.fillStyle = 'blue';
    drawCircles(blueCircles, x, y, scale);
    ctx.fillStyle = 'red';
    drawCircles(redCircles, x, y, scale);
};

/**
 * Draw lines indicating important font measurements.
 * Black lines indicate the origin of the coordinate system (point 0,0).
 * Blue lines indicate the glyph bounding box.
 * Green line indicates the advance width of the glyph.
 * @param  {CanvasRenderingContext2D} ctx - A 2D drawing context, like Canvas.
 * @param  {number} [x=0] - Horizontal position of the beginning of the text.
 * @param  {number} [y=0] - Vertical position of the *baseline* of the text.
 * @param  {number} [fontSize=72] - Font size in pixels. We scale the glyph units by `1 / unitsPerEm * fontSize`.
 */
Glyph.prototype.drawMetrics = function(ctx, x, y, fontSize) {
    let scale;
    x = x !== undefined ? x : 0;
    y = y !== undefined ? y : 0;
    fontSize = fontSize !== undefined ? fontSize : 24;
    scale = 1 / this.path.unitsPerEm * fontSize;
    ctx.lineWidth = 1;

    // Draw the origin
    ctx.strokeStyle = 'black';
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, x, -10000, x, 10000);
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, -10000, y, 10000, y);

    // This code is here due to memory optimization: by not using
    // defaults in the constructor, we save a notable amount of memory.
    const xMin = this.xMin || 0;
    let yMin = this.yMin || 0;
    const xMax = this.xMax || 0;
    let yMax = this.yMax || 0;
    const advanceWidth = this.advanceWidth || 0;

    // Draw the glyph box
    ctx.strokeStyle = 'blue';
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, x + (xMin * scale), -10000, x + (xMin * scale), 10000);
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, x + (xMax * scale), -10000, x + (xMax * scale), 10000);
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, -10000, y + (-yMin * scale), 10000, y + (-yMin * scale));
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, -10000, y + (-yMax * scale), 10000, y + (-yMax * scale));

    // Draw the advance width
    ctx.strokeStyle = 'green';
    _draw__WEBPACK_IMPORTED_MODULE_1__["default"].line(ctx, x + (advanceWidth * scale), -10000, x + (advanceWidth * scale), 10000);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Glyph);


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyphset.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyphset.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _glyph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glyph */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyph.js");
// The GlyphSet object



// Define a property on the glyph that depends on the path being loaded.
function defineDependentProperty(glyph, externalName, internalName) {
    Object.defineProperty(glyph, externalName, {
        get: function() {
            // Request the path property to make sure the path is loaded.
            glyph.path; // jshint ignore:line
            return glyph[internalName];
        },
        set: function(newValue) {
            glyph[internalName] = newValue;
        },
        enumerable: true,
        configurable: true
    });
}

/**
 * A GlyphSet represents all glyphs available in the font, but modelled using
 * a deferred glyph loader, for retrieving glyphs only once they are absolutely
 * necessary, to keep the memory footprint down.
 * @exports opentype.GlyphSet
 * @class
 * @param {opentype.Font}
 * @param {Array}
 */
function GlyphSet(font, glyphs) {
    this.font = font;
    this.glyphs = {};
    if (Array.isArray(glyphs)) {
        for (let i = 0; i < glyphs.length; i++) {
            this.glyphs[i] = glyphs[i];
        }
    }

    this.length = (glyphs && glyphs.length) || 0;
}

/**
 * @param  {number} index
 * @return {opentype.Glyph}
 */
GlyphSet.prototype.get = function(index) {
    if (typeof this.glyphs[index] === 'function') {
        this.glyphs[index] = this.glyphs[index]();
    }

    return this.glyphs[index];
};

/**
 * @param  {number} index
 * @param  {Object}
 */
GlyphSet.prototype.push = function(index, loader) {
    this.glyphs[index] = loader;
    this.length++;
};

/**
 * @alias opentype.glyphLoader
 * @param  {opentype.Font} font
 * @param  {number} index
 * @return {opentype.Glyph}
 */
function glyphLoader(font, index) {
    return new _glyph__WEBPACK_IMPORTED_MODULE_0__["default"]({index: index, font: font});
}

/**
 * Generate a stub glyph that can be filled with all metadata *except*
 * the "points" and "path" properties, which must be loaded only once
 * the glyph's path is actually requested for text shaping.
 * @alias opentype.ttfGlyphLoader
 * @param  {opentype.Font} font
 * @param  {number} index
 * @param  {Function} parseGlyph
 * @param  {Object} data
 * @param  {number} position
 * @param  {Function} buildPath
 * @return {opentype.Glyph}
 */
function ttfGlyphLoader(font, index, parseGlyph, data, position, buildPath) {
    return function() {
        const glyph = new _glyph__WEBPACK_IMPORTED_MODULE_0__["default"]({index: index, font: font});

        glyph.path = function() {
            parseGlyph(glyph, data, position);
            const path = buildPath(font.glyphs, glyph);
            path.unitsPerEm = font.unitsPerEm;
            return path;
        };

        defineDependentProperty(glyph, 'xMin', '_xMin');
        defineDependentProperty(glyph, 'xMax', '_xMax');
        defineDependentProperty(glyph, 'yMin', '_yMin');
        defineDependentProperty(glyph, 'yMax', '_yMax');

        return glyph;
    };
}
/**
 * @alias opentype.cffGlyphLoader
 * @param  {opentype.Font} font
 * @param  {number} index
 * @param  {Function} parseCFFCharstring
 * @param  {string} charstring
 * @return {opentype.Glyph}
 */
function cffGlyphLoader(font, index, parseCFFCharstring, charstring) {
    return function() {
        const glyph = new _glyph__WEBPACK_IMPORTED_MODULE_0__["default"]({index: index, font: font});

        glyph.path = function() {
            const path = parseCFFCharstring(font, glyph, charstring);
            path.unitsPerEm = font.unitsPerEm;
            return path;
        };

        return glyph;
    };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ GlyphSet, glyphLoader, ttfGlyphLoader, cffGlyphLoader });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/hintingtt.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/hintingtt.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* A TrueType font hinting interpreter.
*
* (c) 2017 Axel Kittenberger
*
* This interpreter has been implemented according to this documentation:
* https://developer.apple.com/fonts/TrueType-Reference-Manual/RM05/Chap5.html
*
* According to the documentation F24DOT6 values are used for pixels.
* That means calculation is 1/64 pixel accurate and uses integer operations.
* However, Javascript has floating point operations by default and only
* those are available. One could make a case to simulate the 1/64 accuracy
* exactly by truncating after every division operation
* (for example with << 0) to get pixel exactly results as other TrueType
* implementations. It may make sense since some fonts are pixel optimized
* by hand using DELTAP instructions. The current implementation doesn't
* and rather uses full floating point precision.
*
* xScale, yScale and rotation is currently ignored.
*
* A few non-trivial instructions are missing as I didn't encounter yet
* a font that used them to test a possible implementation.
*
* Some fonts seem to use undocumented features regarding the twilight zone.
* Only some of them are implemented as they were encountered.
*
* The exports.DEBUG statements are removed on the minified distribution file.
*/


let instructionTable;
let exec;
let execGlyph;
let execComponent;

/*
* Creates a hinting object.
*
* There ought to be exactly one
* for each truetype font that is used for hinting.
*/
function Hinting(font) {
    // the font this hinting object is for
    this.font = font;

    // cached states
    this._fpgmState  =
    this._prepState  =
        undefined;

    // errorState
    // 0 ... all okay
    // 1 ... had an error in a glyf,
    //       continue working but stop spamming
    //       the console
    // 2 ... error at prep, stop hinting at this ppem
    // 3 ... error at fpeg, stop hinting for this font at all
    this._errorState = 0;
}

/*
* Not rounding.
*/
function roundOff(v) {
    return v;
}

/*
* Rounding to grid.
*/
function roundToGrid(v) {
    //Rounding in TT is supposed to "symmetrical around zero"
    return Math.sign(v) * Math.round(Math.abs(v));
}

/*
* Rounding to double grid.
*/
function roundToDoubleGrid(v) {
    return Math.sign(v) * Math.round(Math.abs(v * 2)) / 2;
}

/*
* Rounding to half grid.
*/
function roundToHalfGrid(v) {
    return Math.sign(v) * (Math.round(Math.abs(v) + 0.5) - 0.5);
}

/*
* Rounding to up to grid.
*/
function roundUpToGrid(v) {
    return Math.sign(v) * Math.ceil(Math.abs(v));
}

/*
* Rounding to down to grid.
*/
function roundDownToGrid(v) {
    return Math.sign(v) * Math.floor(Math.abs(v));
}

/*
* Super rounding.
*/
const roundSuper = function (v) {
    const period = this.srPeriod;
    let phase = this.srPhase;
    const threshold = this.srThreshold;
    let sign = 1;

    if (v < 0) {
        v = -v;
        sign = -1;
    }

    v += threshold - phase;

    v = Math.trunc(v / period) * period;

    v += phase;

    // according to http://xgridfit.sourceforge.net/round.html
    if (sign > 0 && v < 0) return phase;
    if (sign < 0 && v > 0) return -phase;

    return v * sign;
};

/*
* Unit vector of x-axis.
*/
const xUnitVector = {
    x: 1,

    y: 0,

    axis: 'x',

    // Gets the projected distance between two points.
    // o1/o2 ... if true, respective original position is used.
    distance: function (p1, p2, o1, o2) {
        return (o1 ? p1.xo : p1.x) - (o2 ? p2.xo : p2.x);
    },

    // Moves point p so the moved position has the same relative
    // position to the moved positions of rp1 and rp2 than the
    // original positions had.
    //
    // See APPENDIX on INTERPOLATE at the bottom of this file.
    interpolate: function (p, rp1, rp2, pv) {
        let do1;
        let do2;
        let doa1;
        let doa2;
        let dm1;
        let dm2;
        let dt;

        if (!pv || pv === this) {
            do1 = p.xo - rp1.xo;
            do2 = p.xo - rp2.xo;
            dm1 = rp1.x - rp1.xo;
            dm2 = rp2.x - rp2.xo;
            doa1 = Math.abs(do1);
            doa2 = Math.abs(do2);
            dt = doa1 + doa2;

            if (dt === 0) {
                p.x = p.xo + (dm1 + dm2) / 2;
                return;
            }

            p.x = p.xo + (dm1 * doa2 + dm2 * doa1) / dt;
            return;
        }

        do1 = pv.distance(p, rp1, true, true);
        do2 = pv.distance(p, rp2, true, true);
        dm1 = pv.distance(rp1, rp1, false, true);
        dm2 = pv.distance(rp2, rp2, false, true);
        doa1 = Math.abs(do1);
        doa2 = Math.abs(do2);
        dt = doa1 + doa2;

        if (dt === 0) {
            xUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
            return;
        }

        xUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
    },

    // Slope of line normal to this
    normalSlope: Number.NEGATIVE_INFINITY,

    // Sets the point 'p' relative to point 'rp'
    // by the distance 'd'.
    //
    // See APPENDIX on SETRELATIVE at the bottom of this file.
    //
    // p   ... point to set
    // rp  ... reference point
    // d   ... distance on projection vector
    // pv  ... projection vector (undefined = this)
    // org ... if true, uses the original position of rp as reference.
    setRelative: function (p, rp, d, pv, org) {
        if (!pv || pv === this) {
            p.x = (org ? rp.xo : rp.x) + d;
            return;
        }

        const rpx = org ? rp.xo : rp.x;
        const rpy = org ? rp.yo : rp.y;
        const rpdx = rpx + d * pv.x;
        const rpdy = rpy + d * pv.y;

        p.x = rpdx + (p.y - rpdy) / pv.normalSlope;
    },

    // Slope of vector line.
    slope: 0,

    // Touches the point p.
    touch: function (p) {
        p.xTouched = true;
    },

    // Tests if a point p is touched.
    touched: function (p) {
        return p.xTouched;
    },

    // Untouches the point p.
    untouch: function (p) {
        p.xTouched = false;
    }
};

/*
* Unit vector of y-axis.
*/
const yUnitVector = {
    x: 0,

    y: 1,

    axis: 'y',

    // Gets the projected distance between two points.
    // o1/o2 ... if true, respective original position is used.
    distance: function (p1, p2, o1, o2) {
        return (o1 ? p1.yo : p1.y) - (o2 ? p2.yo : p2.y);
    },

    // Moves point p so the moved position has the same relative
    // position to the moved positions of rp1 and rp2 than the
    // original positions had.
    //
    // See APPENDIX on INTERPOLATE at the bottom of this file.
    interpolate: function (p, rp1, rp2, pv) {
        let do1;
        let do2;
        let doa1;
        let doa2;
        let dm1;
        let dm2;
        let dt;

        if (!pv || pv === this) {
            do1 = p.yo - rp1.yo;
            do2 = p.yo - rp2.yo;
            dm1 = rp1.y - rp1.yo;
            dm2 = rp2.y - rp2.yo;
            doa1 = Math.abs(do1);
            doa2 = Math.abs(do2);
            dt = doa1 + doa2;

            if (dt === 0) {
                p.y = p.yo + (dm1 + dm2) / 2;
                return;
            }

            p.y = p.yo + (dm1 * doa2 + dm2 * doa1) / dt;
            return;
        }

        do1 = pv.distance(p, rp1, true, true);
        do2 = pv.distance(p, rp2, true, true);
        dm1 = pv.distance(rp1, rp1, false, true);
        dm2 = pv.distance(rp2, rp2, false, true);
        doa1 = Math.abs(do1);
        doa2 = Math.abs(do2);
        dt = doa1 + doa2;

        if (dt === 0) {
            yUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
            return;
        }

        yUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
    },

    // Slope of line normal to this.
    normalSlope: 0,

    // Sets the point 'p' relative to point 'rp'
    // by the distance 'd'
    //
    // See APPENDIX on SETRELATIVE at the bottom of this file.
    //
    // p   ... point to set
    // rp  ... reference point
    // d   ... distance on projection vector
    // pv  ... projection vector (undefined = this)
    // org ... if true, uses the original position of rp as reference.
    setRelative: function (p, rp, d, pv, org) {
        if (!pv || pv === this) {
            p.y = (org ? rp.yo : rp.y) + d;
            return;
        }

        const rpx = org ? rp.xo : rp.x;
        const rpy = org ? rp.yo : rp.y;
        const rpdx = rpx + d * pv.x;
        const rpdy = rpy + d * pv.y;

        p.y = rpdy + pv.normalSlope * (p.x - rpdx);
    },

    // Slope of vector line.
    slope: Number.POSITIVE_INFINITY,

    // Touches the point p.
    touch: function (p) {
        p.yTouched = true;
    },

    // Tests if a point p is touched.
    touched: function (p) {
        return p.yTouched;
    },

    // Untouches the point p.
    untouch: function (p) {
        p.yTouched = false;
    }
};

Object.freeze(xUnitVector);
Object.freeze(yUnitVector);

/*
* Creates a unit vector that is not x- or y-axis.
*/
function UnitVector(x, y) {
    this.x = x;
    this.y = y;
    this.axis = undefined;
    this.slope = y / x;
    this.normalSlope = -x / y;
    Object.freeze(this);
}

/*
* Gets the projected distance between two points.
* o1/o2 ... if true, respective original position is used.
*/
UnitVector.prototype.distance = function(p1, p2, o1, o2) {
    return (
        this.x * xUnitVector.distance(p1, p2, o1, o2) +
        this.y * yUnitVector.distance(p1, p2, o1, o2)
    );
};

/*
* Moves point p so the moved position has the same relative
* position to the moved positions of rp1 and rp2 than the
* original positions had.
*
* See APPENDIX on INTERPOLATE at the bottom of this file.
*/
UnitVector.prototype.interpolate = function(p, rp1, rp2, pv) {
    let dm1;
    let dm2;
    let do1;
    let do2;
    let doa1;
    let doa2;
    let dt;

    do1 = pv.distance(p, rp1, true, true);
    do2 = pv.distance(p, rp2, true, true);
    dm1 = pv.distance(rp1, rp1, false, true);
    dm2 = pv.distance(rp2, rp2, false, true);
    doa1 = Math.abs(do1);
    doa2 = Math.abs(do2);
    dt = doa1 + doa2;

    if (dt === 0) {
        this.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
        return;
    }

    this.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
};

/*
* Sets the point 'p' relative to point 'rp'
* by the distance 'd'
*
* See APPENDIX on SETRELATIVE at the bottom of this file.
*
* p   ...  point to set
* rp  ... reference point
* d   ... distance on projection vector
* pv  ... projection vector (undefined = this)
* org ... if true, uses the original position of rp as reference.
*/
UnitVector.prototype.setRelative = function(p, rp, d, pv, org) {
    pv = pv || this;

    const rpx = org ? rp.xo : rp.x;
    const rpy = org ? rp.yo : rp.y;
    const rpdx = rpx + d * pv.x;
    const rpdy = rpy + d * pv.y;

    const pvns = pv.normalSlope;
    const fvs = this.slope;

    const px = p.x;
    const py = p.y;

    p.x = (fvs * px - pvns * rpdx + rpdy - py) / (fvs - pvns);
    p.y = fvs * (p.x - px) + py;
};

/*
* Touches the point p.
*/
UnitVector.prototype.touch = function(p) {
    p.xTouched = true;
    p.yTouched = true;
};

/*
* Returns a unit vector with x/y coordinates.
*/
function getUnitVector(x, y) {
    const d = Math.sqrt(x * x + y * y);

    x /= d;
    y /= d;

    if (x === 1 && y === 0) return xUnitVector;
    else if (x === 0 && y === 1) return yUnitVector;
    else return new UnitVector(x, y);
}

/*
* Creates a point in the hinting engine.
*/
function HPoint(
    x,
    y,
    lastPointOfContour,
    onCurve
) {
    this.x = this.xo = Math.round(x * 64) / 64; // hinted x value and original x-value
    this.y = this.yo = Math.round(y * 64) / 64; // hinted y value and original y-value

    this.lastPointOfContour = lastPointOfContour;
    this.onCurve = onCurve;
    this.prevPointOnContour = undefined;
    this.nextPointOnContour = undefined;
    this.xTouched = false;
    this.yTouched = false;

    Object.preventExtensions(this);
}

/*
* Returns the next touched point on the contour.
*
* v  ... unit vector to test touch axis.
*/
HPoint.prototype.nextTouched = function(v) {
    let p = this.nextPointOnContour;

    while (!v.touched(p) && p !== this) p = p.nextPointOnContour;

    return p;
};

/*
* Returns the previous touched point on the contour
*
* v  ... unit vector to test touch axis.
*/
HPoint.prototype.prevTouched = function(v) {
    let p = this.prevPointOnContour;

    while (!v.touched(p) && p !== this) p = p.prevPointOnContour;

    return p;
};

/*
* The zero point.
*/
const HPZero = Object.freeze(new HPoint(0, 0));

/*
* The default state of the interpreter.
*
* Note: Freezing the defaultState and then deriving from it
* makes the V8 Javascript engine going awkward,
* so this is avoided, albeit the defaultState shouldn't
* ever change.
*/
const defaultState = {
    cvCutIn: 17 / 16,    // control value cut in
    deltaBase: 9,
    deltaShift: 0.125,
    loop: 1,             // loops some instructions
    minDis: 1,           // minimum distance
    autoFlip: true
};

/*
* The current state of the interpreter.
*
* env  ... 'fpgm' or 'prep' or 'glyf'
* prog ... the program
*/
function State(env, prog) {
    this.env = env;
    this.stack = [];
    this.prog = prog;

    switch (env) {
        case 'glyf' :
            this.zp0 = this.zp1 = this.zp2 = 1;
            this.rp0 = this.rp1 = this.rp2 = 0;
            /* fall through */
        case 'prep' :
            this.fv = this.pv = this.dpv = xUnitVector;
            this.round = roundToGrid;
    }
}

/*
* Executes a glyph program.
*
* This does the hinting for each glyph.
*
* Returns an array of moved points.
*
* glyph: the glyph to hint
* ppem: the size the glyph is rendered for
*/
Hinting.prototype.exec = function(glyph, ppem) {
    if (typeof ppem !== 'number') {
        throw new Error('Point size is not a number!');
    }

    // Received a fatal error, don't do any hinting anymore.
    if (this._errorState > 2) return;

    const font = this.font;
    let prepState = this._prepState;

    if (!prepState || prepState.ppem !== ppem) {
        let fpgmState = this._fpgmState;

        if (!fpgmState) {
            // Executes the fpgm state.
            // This is used by fonts to define functions.
            State.prototype = defaultState;

            fpgmState =
            this._fpgmState =
                new State('fpgm', font.tables.fpgm);

            fpgmState.funcs = [ ];
            fpgmState.font = font;

            if (exports.DEBUG) {
                console.log('---EXEC FPGM---');
                fpgmState.step = -1;
            }

            try {
                exec(fpgmState);
            } catch (e) {
                console.log('Hinting error in FPGM:' + e);
                this._errorState = 3;
                return;
            }
        }

        // Executes the prep program for this ppem setting.
        // This is used by fonts to set cvt values
        // depending on to be rendered font size.

        State.prototype = fpgmState;
        prepState =
        this._prepState =
            new State('prep', font.tables.prep);

        prepState.ppem = ppem;

        // Creates a copy of the cvt table
        // and scales it to the current ppem setting.
        const oCvt = font.tables.cvt;
        if (oCvt) {
            const cvt = prepState.cvt = new Array(oCvt.length);
            const scale = ppem / font.unitsPerEm;
            for (let c = 0; c < oCvt.length; c++) {
                cvt[c] = oCvt[c] * scale;
            }
        } else {
            prepState.cvt = [];
        }

        if (exports.DEBUG) {
            console.log('---EXEC PREP---');
            prepState.step = -1;
        }

        try {
            exec(prepState);
        } catch (e) {
            if (this._errorState < 2) {
                console.log('Hinting error in PREP:' + e);
            }
            this._errorState = 2;
        }
    }

    if (this._errorState > 1) return;

    try {
        return execGlyph(glyph, prepState);
    } catch (e) {
        if (this._errorState < 1) {
            console.log('Hinting error:' + e);
            console.log('Note: further hinting errors are silenced');
        }
        this._errorState = 1;
        return undefined;
    }
};

/*
* Executes the hinting program for a glyph.
*/
execGlyph = function(glyph, prepState) {
    // original point positions
    const xScale = prepState.ppem / prepState.font.unitsPerEm;
    const yScale = xScale;
    let components = glyph.components;
    let contours;
    let gZone;
    let state;

    State.prototype = prepState;
    if (!components) {
        state = new State('glyf', glyph.instructions);
        if (exports.DEBUG) {
            console.log('---EXEC GLYPH---');
            state.step = -1;
        }
        execComponent(glyph, state, xScale, yScale);
        gZone = state.gZone;
    } else {
        const font = prepState.font;
        gZone = [];
        contours = [];
        for (let i = 0; i < components.length; i++) {
            const c = components[i];
            const cg = font.glyphs.get(c.glyphIndex);

            state = new State('glyf', cg.instructions);

            if (exports.DEBUG) {
                console.log('---EXEC COMP ' + i + '---');
                state.step = -1;
            }

            execComponent(cg, state, xScale, yScale);
            // appends the computed points to the result array
            // post processes the component points
            const dx = Math.round(c.dx * xScale);
            const dy = Math.round(c.dy * yScale);
            const gz = state.gZone;
            const cc = state.contours;
            for (let pi = 0; pi < gz.length; pi++) {
                const p = gz[pi];
                p.xTouched = p.yTouched = false;
                p.xo = p.x = p.x + dx;
                p.yo = p.y = p.y + dy;
            }

            const gLen = gZone.length;
            gZone.push.apply(gZone, gz);
            for (let j = 0; j < cc.length; j++) {
                contours.push(cc[j] + gLen);
            }
        }

        if (glyph.instructions && !state.inhibitGridFit) {
            // the composite has instructions on its own
            state = new State('glyf', glyph.instructions);

            state.gZone = state.z0 = state.z1 = state.z2 = gZone;

            state.contours = contours;

            // note: HPZero cannot be used here, since
            //       the point might be modified
            gZone.push(
                new HPoint(0, 0),
                new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
            );

            if (exports.DEBUG) {
                console.log('---EXEC COMPOSITE---');
                state.step = -1;
            }

            exec(state);

            gZone.length -= 2;
        }
    }

    return gZone;
};

/*
* Executes the hinting program for a component of a multi-component glyph
* or of the glyph itself by a non-component glyph.
*/
execComponent = function(glyph, state, xScale, yScale)
{
    const points = glyph.points || [];
    const pLen = points.length;
    const gZone = state.gZone = state.z0 = state.z1 = state.z2 = [];
    const contours = state.contours = [];

    // Scales the original points and
    // makes copies for the hinted points.
    let cp; // current point
    for (let i = 0; i < pLen; i++) {
        cp = points[i];

        gZone[i] = new HPoint(
            cp.x * xScale,
            cp.y * yScale,
            cp.lastPointOfContour,
            cp.onCurve
        );
    }

    // Chain links the contours.
    let sp; // start point
    let np; // next point

    for (let i = 0; i < pLen; i++) {
        cp = gZone[i];

        if (!sp) {
            sp = cp;
            contours.push(i);
        }

        if (cp.lastPointOfContour) {
            cp.nextPointOnContour = sp;
            sp.prevPointOnContour = cp;
            sp = undefined;
        } else {
            np = gZone[i + 1];
            cp.nextPointOnContour = np;
            np.prevPointOnContour = cp;
        }
    }

    if (state.inhibitGridFit) return;

    gZone.push(
        new HPoint(0, 0),
        new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
    );

    exec(state);

    // Removes the extra points.
    gZone.length -= 2;

    if (exports.DEBUG) {
        console.log('FINISHED GLYPH', state.stack);
        for (let i = 0; i < pLen; i++) {
            console.log(i, gZone[i].x, gZone[i].y);
        }
    }
};

/*
* Executes the program loaded in state.
*/
exec = function(state) {
    let prog = state.prog;

    if (!prog) return;

    const pLen = prog.length;
    let ins;

    for (state.ip = 0; state.ip < pLen; state.ip++) {
        if (exports.DEBUG) state.step++;
        ins = instructionTable[prog[state.ip]];

        if (!ins) {
            throw new Error(
                'unknown instruction: 0x' +
                Number(prog[state.ip]).toString(16)
            );
        }

        ins(state);

        // very extensive debugging for each step
        /*
        if (exports.DEBUG) {
            var da;
            if (state.gZone) {
                da = [];
                for (let i = 0; i < state.gZone.length; i++)
                {
                    da.push(i + ' ' +
                        state.gZone[i].x * 64 + ' ' +
                        state.gZone[i].y * 64 + ' ' +
                        (state.gZone[i].xTouched ? 'x' : '') +
                        (state.gZone[i].yTouched ? 'y' : '')
                    );
                }
                console.log('GZ', da);
            }

            if (state.tZone) {
                da = [];
                for (let i = 0; i < state.tZone.length; i++) {
                    da.push(i + ' ' +
                        state.tZone[i].x * 64 + ' ' +
                        state.tZone[i].y * 64 + ' ' +
                        (state.tZone[i].xTouched ? 'x' : '') +
                        (state.tZone[i].yTouched ? 'y' : '')
                    );
                }
                console.log('TZ', da);
            }

            if (state.stack.length > 10) {
                console.log(
                    state.stack.length,
                    '...', state.stack.slice(state.stack.length - 10)
                );
            } else {
                console.log(state.stack.length, state.stack);
            }
        }
        */
    }
};

/*
* Initializes the twilight zone.
*
* This is only done if a SZPx instruction
* refers to the twilight zone.
*/
function initTZone(state)
{
    const tZone = state.tZone = new Array(state.gZone.length);

    // no idea if this is actually correct...
    for (let i = 0; i < tZone.length; i++)
    {
        tZone[i] = new HPoint(0, 0);
    }
}

/*
* Skips the instruction pointer ahead over an IF/ELSE block.
* handleElse .. if true breaks on matching ELSE
*/
function skip(state, handleElse)
{
    const prog = state.prog;
    let ip = state.ip;
    let nesting = 1;
    let ins;

    do {
        ins = prog[++ip];
        if (ins === 0x58) // IF
            nesting++;
        else if (ins === 0x59) // EIF
            nesting--;
        else if (ins === 0x40) // NPUSHB
            ip += prog[ip + 1] + 1;
        else if (ins === 0x41) // NPUSHW
            ip += 2 * prog[ip + 1] + 1;
        else if (ins >= 0xB0 && ins <= 0xB7) // PUSHB
            ip += ins - 0xB0 + 1;
        else if (ins >= 0xB8 && ins <= 0xBF) // PUSHW
            ip += (ins - 0xB8 + 1) * 2;
        else if (handleElse && nesting === 1 && ins === 0x1B) // ELSE
            break;
    } while (nesting > 0);

    state.ip = ip;
}

/*----------------------------------------------------------*
*          And then a lot of instructions...                *
*----------------------------------------------------------*/

// SVTCA[a] Set freedom and projection Vectors To Coordinate Axis
// 0x00-0x01
function SVTCA(v, state) {
    if (exports.DEBUG) console.log(state.step, 'SVTCA[' + v.axis + ']');

    state.fv = state.pv = state.dpv = v;
}

// SPVTCA[a] Set Projection Vector to Coordinate Axis
// 0x02-0x03
function SPVTCA(v, state) {
    if (exports.DEBUG) console.log(state.step, 'SPVTCA[' + v.axis + ']');

    state.pv = state.dpv = v;
}

// SFVTCA[a] Set Freedom Vector to Coordinate Axis
// 0x04-0x05
function SFVTCA(v, state) {
    if (exports.DEBUG) console.log(state.step, 'SFVTCA[' + v.axis + ']');

    state.fv = v;
}

// SPVTL[a] Set Projection Vector To Line
// 0x06-0x07
function SPVTL(a, state) {
    const stack = state.stack;
    const p2i = stack.pop();
    const p1i = stack.pop();
    const p2 = state.z2[p2i];
    const p1 = state.z1[p1i];

    if (exports.DEBUG) console.log('SPVTL[' + a + ']', p2i, p1i);

    let dx;
    let dy;

    if (!a) {
        dx = p1.x - p2.x;
        dy = p1.y - p2.y;
    } else {
        dx = p2.y - p1.y;
        dy = p1.x - p2.x;
    }

    state.pv = state.dpv = getUnitVector(dx, dy);
}

// SFVTL[a] Set Freedom Vector To Line
// 0x08-0x09
function SFVTL(a, state) {
    const stack = state.stack;
    const p2i = stack.pop();
    const p1i = stack.pop();
    const p2 = state.z2[p2i];
    const p1 = state.z1[p1i];

    if (exports.DEBUG) console.log('SFVTL[' + a + ']', p2i, p1i);

    let dx;
    let dy;

    if (!a) {
        dx = p1.x - p2.x;
        dy = p1.y - p2.y;
    } else {
        dx = p2.y - p1.y;
        dy = p1.x - p2.x;
    }

    state.fv = getUnitVector(dx, dy);
}

// SPVFS[] Set Projection Vector From Stack
// 0x0A
function SPVFS(state) {
    const stack = state.stack;
    const y = stack.pop();
    const x = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SPVFS[]', y, x);

    state.pv = state.dpv = getUnitVector(x, y);
}

// SFVFS[] Set Freedom Vector From Stack
// 0x0B
function SFVFS(state) {
    const stack = state.stack;
    const y = stack.pop();
    const x = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SPVFS[]', y, x);

    state.fv = getUnitVector(x, y);
}

// GPV[] Get Projection Vector
// 0x0C
function GPV(state) {
    const stack = state.stack;
    const pv = state.pv;

    if (exports.DEBUG) console.log(state.step, 'GPV[]');

    stack.push(pv.x * 0x4000);
    stack.push(pv.y * 0x4000);
}

// GFV[] Get Freedom Vector
// 0x0C
function GFV(state) {
    const stack = state.stack;
    const fv = state.fv;

    if (exports.DEBUG) console.log(state.step, 'GFV[]');

    stack.push(fv.x * 0x4000);
    stack.push(fv.y * 0x4000);
}

// SFVTPV[] Set Freedom Vector To Projection Vector
// 0x0E
function SFVTPV(state) {
    state.fv = state.pv;

    if (exports.DEBUG) console.log(state.step, 'SFVTPV[]');
}

// ISECT[] moves point p to the InterSECTion of two lines
// 0x0F
function ISECT(state)
{
    const stack = state.stack;
    const pa0i = stack.pop();
    const pa1i = stack.pop();
    const pb0i = stack.pop();
    const pb1i = stack.pop();
    const pi = stack.pop();
    const z0 = state.z0;
    const z1 = state.z1;
    const pa0 = z0[pa0i];
    const pa1 = z0[pa1i];
    const pb0 = z1[pb0i];
    const pb1 = z1[pb1i];
    const p = state.z2[pi];

    if (exports.DEBUG) console.log('ISECT[], ', pa0i, pa1i, pb0i, pb1i, pi);

    // math from
    // en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line

    const x1 = pa0.x;
    const y1 = pa0.y;
    const x2 = pa1.x;
    const y2 = pa1.y;
    const x3 = pb0.x;
    const y3 = pb0.y;
    const x4 = pb1.x;
    const y4 = pb1.y;

    const div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const f1 = x1 * y2 - y1 * x2;
    const f2 = x3 * y4 - y3 * x4;

    p.x = (f1 * (x3 - x4) - f2 * (x1 - x2)) / div;
    p.y = (f1 * (y3 - y4) - f2 * (y1 - y2)) / div;
}

// SRP0[] Set Reference Point 0
// 0x10
function SRP0(state) {
    state.rp0 = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SRP0[]', state.rp0);
}

// SRP1[] Set Reference Point 1
// 0x11
function SRP1(state) {
    state.rp1 = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SRP1[]', state.rp1);
}

// SRP1[] Set Reference Point 2
// 0x12
function SRP2(state) {
    state.rp2 = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SRP2[]', state.rp2);
}

// SZP0[] Set Zone Pointer 0
// 0x13
function SZP0(state) {
    const n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SZP0[]', n);

    state.zp0 = n;

    switch (n) {
        case 0:
            if (!state.tZone) initTZone(state);
            state.z0 = state.tZone;
            break;
        case 1 :
            state.z0 = state.gZone;
            break;
        default :
            throw new Error('Invalid zone pointer');
    }
}

// SZP1[] Set Zone Pointer 1
// 0x14
function SZP1(state) {
    const n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SZP1[]', n);

    state.zp1 = n;

    switch (n) {
        case 0:
            if (!state.tZone) initTZone(state);
            state.z1 = state.tZone;
            break;
        case 1 :
            state.z1 = state.gZone;
            break;
        default :
            throw new Error('Invalid zone pointer');
    }
}

// SZP2[] Set Zone Pointer 2
// 0x15
function SZP2(state) {
    const n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SZP2[]', n);

    state.zp2 = n;

    switch (n) {
        case 0:
            if (!state.tZone) initTZone(state);
            state.z2 = state.tZone;
            break;
        case 1 :
            state.z2 = state.gZone;
            break;
        default :
            throw new Error('Invalid zone pointer');
    }
}

// SZPS[] Set Zone PointerS
// 0x16
function SZPS(state) {
    const n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SZPS[]', n);

    state.zp0 = state.zp1 = state.zp2 = n;

    switch (n) {
        case 0:
            if (!state.tZone) initTZone(state);
            state.z0 = state.z1 = state.z2 = state.tZone;
            break;
        case 1 :
            state.z0 = state.z1 = state.z2 = state.gZone;
            break;
        default :
            throw new Error('Invalid zone pointer');
    }
}

// SLOOP[] Set LOOP variable
// 0x17
function SLOOP(state) {
    state.loop = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SLOOP[]', state.loop);
}

// RTG[] Round To Grid
// 0x18
function RTG(state) {
    if (exports.DEBUG) console.log(state.step, 'RTG[]');

    state.round = roundToGrid;
}

// RTHG[] Round To Half Grid
// 0x19
function RTHG(state) {
    if (exports.DEBUG) console.log(state.step, 'RTHG[]');

    state.round = roundToHalfGrid;
}

// SMD[] Set Minimum Distance
// 0x1A
function SMD(state) {
    const d = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SMD[]', d);

    state.minDis = d / 0x40;
}

// ELSE[] ELSE clause
// 0x1B
function ELSE(state) {
    // This instruction has been reached by executing a then branch
    // so it just skips ahead until matching EIF.
    //
    // In case the IF was negative the IF[] instruction already
    // skipped forward over the ELSE[]

    if (exports.DEBUG) console.log(state.step, 'ELSE[]');

    skip(state, false);
}

// JMPR[] JuMP Relative
// 0x1C
function JMPR(state) {
    const o = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'JMPR[]', o);

    // A jump by 1 would do nothing.
    state.ip += o - 1;
}

// SCVTCI[] Set Control Value Table Cut-In
// 0x1D
function SCVTCI(state) {
    const n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SCVTCI[]', n);

    state.cvCutIn = n / 0x40;
}

// DUP[] DUPlicate top stack element
// 0x20
function DUP(state) {
    const stack = state.stack;

    if (exports.DEBUG) console.log(state.step, 'DUP[]');

    stack.push(stack[stack.length - 1]);
}

// POP[] POP top stack element
// 0x21
function POP(state) {
    if (exports.DEBUG) console.log(state.step, 'POP[]');

    state.stack.pop();
}

// CLEAR[] CLEAR the stack
// 0x22
function CLEAR(state) {
    if (exports.DEBUG) console.log(state.step, 'CLEAR[]');

    state.stack.length = 0;
}

// SWAP[] SWAP the top two elements on the stack
// 0x23
function SWAP(state) {
    const stack = state.stack;

    const a = stack.pop();
    const b = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SWAP[]');

    stack.push(a);
    stack.push(b);
}

// DEPTH[] DEPTH of the stack
// 0x24
function DEPTH(state) {
    const stack = state.stack;

    if (exports.DEBUG) console.log(state.step, 'DEPTH[]');

    stack.push(stack.length);
}

// LOOPCALL[] LOOPCALL function
// 0x2A
function LOOPCALL(state) {
    const stack = state.stack;
    const fn = stack.pop();
    const c = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'LOOPCALL[]', fn, c);

    // saves callers program
    const cip = state.ip;
    const cprog = state.prog;

    state.prog = state.funcs[fn];

    // executes the function
    for (let i = 0; i < c; i++) {
        exec(state);

        if (exports.DEBUG) console.log(
            ++state.step,
            i + 1 < c ? 'next loopcall' : 'done loopcall',
            i
        );
    }

    // restores the callers program
    state.ip = cip;
    state.prog = cprog;
}

// CALL[] CALL function
// 0x2B
function CALL(state) {
    const fn = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'CALL[]', fn);

    // saves callers program
    const cip = state.ip;
    const cprog = state.prog;

    state.prog = state.funcs[fn];

    // executes the function
    exec(state);

    // restores the callers program
    state.ip = cip;
    state.prog = cprog;

    if (exports.DEBUG) console.log(++state.step, 'returning from', fn);
}

// CINDEX[] Copy the INDEXed element to the top of the stack
// 0x25
function CINDEX(state) {
    const stack = state.stack;
    const k = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'CINDEX[]', k);

    // In case of k == 1, it copies the last element after popping
    // thus stack.length - k.
    stack.push(stack[stack.length - k]);
}

// MINDEX[] Move the INDEXed element to the top of the stack
// 0x26
function MINDEX(state) {
    const stack = state.stack;
    const k = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'MINDEX[]', k);

    stack.push(stack.splice(stack.length - k, 1)[0]);
}

// FDEF[] Function DEFinition
// 0x2C
function FDEF(state) {
    if (state.env !== 'fpgm') throw new Error('FDEF not allowed here');
    const stack = state.stack;
    const prog = state.prog;
    let ip = state.ip;

    const fn = stack.pop();
    const ipBegin = ip;

    if (exports.DEBUG) console.log(state.step, 'FDEF[]', fn);

    while (prog[++ip] !== 0x2D);

    state.ip = ip;
    state.funcs[fn] = prog.slice(ipBegin + 1, ip);
}

// MDAP[a] Move Direct Absolute Point
// 0x2E-0x2F
function MDAP(round, state) {
    const pi = state.stack.pop();
    const p = state.z0[pi];
    const fv = state.fv;
    const pv = state.pv;

    if (exports.DEBUG) console.log(state.step, 'MDAP[' + round + ']', pi);

    let d = pv.distance(p, HPZero);

    if (round) d = state.round(d);

    fv.setRelative(p, HPZero, d, pv);
    fv.touch(p);

    state.rp0 = state.rp1 = pi;
}

// IUP[a] Interpolate Untouched Points through the outline
// 0x30
function IUP(v, state) {
    const z2 = state.z2;
    const pLen = z2.length - 2;
    let cp;
    let pp;
    let np;

    if (exports.DEBUG) console.log(state.step, 'IUP[' + v.axis + ']');

    for (let i = 0; i < pLen; i++) {
        cp = z2[i]; // current point

        // if this point has been touched go on
        if (v.touched(cp)) continue;

        pp = cp.prevTouched(v);

        // no point on the contour has been touched?
        if (pp === cp) continue;

        np = cp.nextTouched(v);

        if (pp === np) {
            // only one point on the contour has been touched
            // so simply moves the point like that

            v.setRelative(cp, cp, v.distance(pp, pp, false, true), v, true);
        }

        v.interpolate(cp, pp, np, v);
    }
}

// SHP[] SHift Point using reference point
// 0x32-0x33
function SHP(a, state) {
    const stack = state.stack;
    const rpi = a ? state.rp1 : state.rp2;
    const rp = (a ? state.z0 : state.z1)[rpi];
    const fv = state.fv;
    const pv = state.pv;
    let loop = state.loop;
    const z2 = state.z2;

    while (loop--)
    {
        const pi = stack.pop();
        const p = z2[pi];

        const d = pv.distance(rp, rp, false, true);
        fv.setRelative(p, p, d, pv);
        fv.touch(p);

        if (exports.DEBUG) {
            console.log(
                state.step,
                (state.loop > 1 ?
                   'loop ' + (state.loop - loop) + ': ' :
                   ''
                ) +
                'SHP[' + (a ? 'rp1' : 'rp2') + ']', pi
            );
        }
    }

    state.loop = 1;
}

// SHC[] SHift Contour using reference point
// 0x36-0x37
function SHC(a, state) {
    const stack = state.stack;
    const rpi = a ? state.rp1 : state.rp2;
    const rp = (a ? state.z0 : state.z1)[rpi];
    const fv = state.fv;
    const pv = state.pv;
    const ci = stack.pop();
    const sp = state.z2[state.contours[ci]];
    let p = sp;

    if (exports.DEBUG) console.log(state.step, 'SHC[' + a + ']', ci);

    const d = pv.distance(rp, rp, false, true);

    do {
        if (p !== rp) fv.setRelative(p, p, d, pv);
        p = p.nextPointOnContour;
    } while (p !== sp);
}

// SHZ[] SHift Zone using reference point
// 0x36-0x37
function SHZ(a, state) {
    const stack = state.stack;
    const rpi = a ? state.rp1 : state.rp2;
    const rp = (a ? state.z0 : state.z1)[rpi];
    const fv = state.fv;
    const pv = state.pv;

    const e = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SHZ[' + a + ']', e);

    let z;
    switch (e) {
        case 0 : z = state.tZone; break;
        case 1 : z = state.gZone; break;
        default : throw new Error('Invalid zone');
    }

    let p;
    const d = pv.distance(rp, rp, false, true);
    const pLen = z.length - 2;
    for (let i = 0; i < pLen; i++)
    {
        p = z[i];
        if (p !== rp) fv.setRelative(p, p, d, pv);
    }
}

// SHPIX[] SHift point by a PIXel amount
// 0x38
function SHPIX(state) {
    const stack = state.stack;
    let loop = state.loop;
    const fv = state.fv;
    const d = stack.pop() / 0x40;
    const z2 = state.z2;

    while (loop--) {
        const pi = stack.pop();
        const p = z2[pi];

        if (exports.DEBUG) {
            console.log(
                state.step,
                (state.loop > 1 ? 'loop ' + (state.loop - loop) + ': ' : '') +
                'SHPIX[]', pi, d
            );
        }

        fv.setRelative(p, p, d);
        fv.touch(p);
    }

    state.loop = 1;
}

// IP[] Interpolate Point
// 0x39
function IP(state) {
    const stack = state.stack;
    const rp1i = state.rp1;
    const rp2i = state.rp2;
    let loop = state.loop;
    const rp1 = state.z0[rp1i];
    const rp2 = state.z1[rp2i];
    const fv = state.fv;
    const pv = state.dpv;
    const z2 = state.z2;

    while (loop--) {
        const pi = stack.pop();
        const p = z2[pi];

        if (exports.DEBUG) {
            console.log(
                state.step,
                (state.loop > 1 ? 'loop ' + (state.loop - loop) + ': ' : '') +
                'IP[]', pi, rp1i, '<->', rp2i
            );
        }

        fv.interpolate(p, rp1, rp2, pv);

        fv.touch(p);
    }

    state.loop = 1;
}

// MSIRP[a] Move Stack Indirect Relative Point
// 0x3A-0x3B
function MSIRP(a, state) {
    const stack = state.stack;
    const d = stack.pop() / 64;
    const pi = stack.pop();
    const p = state.z1[pi];
    const rp0 = state.z0[state.rp0];
    const fv = state.fv;
    const pv = state.pv;

    fv.setRelative(p, rp0, d, pv);
    fv.touch(p);

    if (exports.DEBUG) console.log(state.step, 'MSIRP[' + a + ']', d, pi);

    state.rp1 = state.rp0;
    state.rp2 = pi;
    if (a) state.rp0 = pi;
}

// ALIGNRP[] Align to reference point.
// 0x3C
function ALIGNRP(state) {
    const stack = state.stack;
    const rp0i = state.rp0;
    const rp0 = state.z0[rp0i];
    let loop = state.loop;
    const fv = state.fv;
    const pv = state.pv;
    const z1 = state.z1;

    while (loop--) {
        const pi = stack.pop();
        const p = z1[pi];

        if (exports.DEBUG) {
            console.log(
                state.step,
                (state.loop > 1 ? 'loop ' + (state.loop - loop) + ': ' : '') +
                'ALIGNRP[]', pi
            );
        }

        fv.setRelative(p, rp0, 0, pv);
        fv.touch(p);
    }

    state.loop = 1;
}

// RTG[] Round To Double Grid
// 0x3D
function RTDG(state) {
    if (exports.DEBUG) console.log(state.step, 'RTDG[]');

    state.round = roundToDoubleGrid;
}

// MIAP[a] Move Indirect Absolute Point
// 0x3E-0x3F
function MIAP(round, state) {
    const stack = state.stack;
    const n = stack.pop();
    const pi = stack.pop();
    const p = state.z0[pi];
    const fv = state.fv;
    const pv = state.pv;
    let cv = state.cvt[n];

    // TODO cvtcutin should be considered here
    if (round) cv = state.round(cv);

    if (exports.DEBUG) {
        console.log(
            state.step,
            'MIAP[' + round + ']',
            n, '(', cv, ')', pi
        );
    }

    fv.setRelative(p, HPZero, cv, pv);

    if (state.zp0 === 0) {
        p.xo = p.x;
        p.yo = p.y;
    }

    fv.touch(p);

    state.rp0 = state.rp1 = pi;
}

// NPUSB[] PUSH N Bytes
// 0x40
function NPUSHB(state) {
    const prog = state.prog;
    let ip = state.ip;
    const stack = state.stack;

    const n = prog[++ip];

    if (exports.DEBUG) console.log(state.step, 'NPUSHB[]', n);

    for (let i = 0; i < n; i++) stack.push(prog[++ip]);

    state.ip = ip;
}

// NPUSHW[] PUSH N Words
// 0x41
function NPUSHW(state) {
    let ip = state.ip;
    const prog = state.prog;
    const stack = state.stack;
    const n = prog[++ip];

    if (exports.DEBUG) console.log(state.step, 'NPUSHW[]', n);

    for (let i = 0; i < n; i++) {
        let w = (prog[++ip] << 8) | prog[++ip];
        if (w & 0x8000) w = -((w ^ 0xffff) + 1);
        stack.push(w);
    }

    state.ip = ip;
}

// WS[] Write Store
// 0x42
function WS(state) {
    const stack = state.stack;
    let store = state.store;

    if (!store) store = state.store = [];

    const v = stack.pop();
    const l = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'WS', v, l);

    store[l] = v;
}

// RS[] Read Store
// 0x43
function RS(state) {
    const stack = state.stack;
    const store = state.store;

    const l = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'RS', l);

    const v = (store && store[l]) || 0;

    stack.push(v);
}

// WCVTP[] Write Control Value Table in Pixel units
// 0x44
function WCVTP(state) {
    const stack = state.stack;

    const v = stack.pop();
    const l = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'WCVTP', v, l);

    state.cvt[l] = v / 0x40;
}

// RCVT[] Read Control Value Table entry
// 0x45
function RCVT(state) {
    const stack = state.stack;
    const cvte = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'RCVT', cvte);

    stack.push(state.cvt[cvte] * 0x40);
}

// GC[] Get Coordinate projected onto the projection vector
// 0x46-0x47
function GC(a, state) {
    const stack = state.stack;
    const pi = stack.pop();
    const p = state.z2[pi];

    if (exports.DEBUG) console.log(state.step, 'GC[' + a + ']', pi);

    stack.push(state.dpv.distance(p, HPZero, a, false) * 0x40);
}

// MD[a] Measure Distance
// 0x49-0x4A
function MD(a, state) {
    const stack = state.stack;
    const pi2 = stack.pop();
    const pi1 = stack.pop();
    const p2 = state.z1[pi2];
    const p1 = state.z0[pi1];
    const d = state.dpv.distance(p1, p2, a, a);

    if (exports.DEBUG) console.log(state.step, 'MD[' + a + ']', pi2, pi1, '->', d);

    state.stack.push(Math.round(d * 64));
}

// MPPEM[] Measure Pixels Per EM
// 0x4B
function MPPEM(state) {
    if (exports.DEBUG) console.log(state.step, 'MPPEM[]');
    state.stack.push(state.ppem);
}

// FLIPON[] set the auto FLIP Boolean to ON
// 0x4D
function FLIPON(state) {
    if (exports.DEBUG) console.log(state.step, 'FLIPON[]');
    state.autoFlip = true;
}

// LT[] Less Than
// 0x50
function LT(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'LT[]', e2, e1);

    stack.push(e1 < e2 ? 1 : 0);
}

// LTEQ[] Less Than or EQual
// 0x53
function LTEQ(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'LTEQ[]', e2, e1);

    stack.push(e1 <= e2 ? 1 : 0);
}

// GTEQ[] Greater Than
// 0x52
function GT(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'GT[]', e2, e1);

    stack.push(e1 > e2 ? 1 : 0);
}

// GTEQ[] Greater Than or EQual
// 0x53
function GTEQ(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'GTEQ[]', e2, e1);

    stack.push(e1 >= e2 ? 1 : 0);
}

// EQ[] EQual
// 0x54
function EQ(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'EQ[]', e2, e1);

    stack.push(e2 === e1 ? 1 : 0);
}

// NEQ[] Not EQual
// 0x55
function NEQ(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'NEQ[]', e2, e1);

    stack.push(e2 !== e1 ? 1 : 0);
}

// ODD[] ODD
// 0x56
function ODD(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'ODD[]', n);

    stack.push(Math.trunc(n) % 2 ? 1 : 0);
}

// EVEN[] EVEN
// 0x57
function EVEN(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'EVEN[]', n);

    stack.push(Math.trunc(n) % 2 ? 0 : 1);
}

// IF[] IF test
// 0x58
function IF(state) {
    let test = state.stack.pop();
    let ins;

    if (exports.DEBUG) console.log(state.step, 'IF[]', test);

    // if test is true it just continues
    // if not the ip is skipped until matching ELSE or EIF
    if (!test) {
        skip(state, true);

        if (exports.DEBUG) console.log(state.step, ins === 0x1B ? 'ELSE[]' : 'EIF[]');
    }
}

// EIF[] End IF
// 0x59
function EIF(state) {
    // this can be reached normally when
    // executing an else branch.
    // -> just ignore it

    if (exports.DEBUG) console.log(state.step, 'EIF[]');
}

// AND[] logical AND
// 0x5A
function AND(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'AND[]', e2, e1);

    stack.push(e2 && e1 ? 1 : 0);
}

// OR[] logical OR
// 0x5B
function OR(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'OR[]', e2, e1);

    stack.push(e2 || e1 ? 1 : 0);
}

// NOT[] logical NOT
// 0x5C
function NOT(state) {
    const stack = state.stack;
    const e = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'NOT[]', e);

    stack.push(e ? 0 : 1);
}

// DELTAP1[] DELTA exception P1
// DELTAP2[] DELTA exception P2
// DELTAP3[] DELTA exception P3
// 0x5D, 0x71, 0x72
function DELTAP123(b, state) {
    const stack = state.stack;
    const n = stack.pop();
    const fv = state.fv;
    const pv = state.pv;
    const ppem = state.ppem;
    const base = state.deltaBase + (b - 1) * 16;
    const ds = state.deltaShift;
    const z0 = state.z0;

    if (exports.DEBUG) console.log(state.step, 'DELTAP[' + b + ']', n, stack);

    for (let i = 0; i < n; i++)
    {
        const pi = stack.pop();
        const arg = stack.pop();
        const appem = base + ((arg & 0xF0) >> 4);
        if (appem !== ppem) continue;

        let mag = (arg & 0x0F) - 8;
        if (mag >= 0) mag++;
        if (exports.DEBUG) console.log(state.step, 'DELTAPFIX', pi, 'by', mag * ds);

        const p = z0[pi];
        fv.setRelative(p, p, mag * ds, pv);
    }
}

// SDB[] Set Delta Base in the graphics state
// 0x5E
function SDB(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SDB[]', n);

    state.deltaBase = n;
}

// SDS[] Set Delta Shift in the graphics state
// 0x5F
function SDS(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SDS[]', n);

    state.deltaShift = Math.pow(0.5, n);
}

// ADD[] ADD
// 0x60
function ADD(state) {
    const stack = state.stack;
    const n2 = stack.pop();
    const n1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'ADD[]', n2, n1);

    stack.push(n1 + n2);
}

// SUB[] SUB
// 0x61
function SUB(state) {
    const stack = state.stack;
    const n2 = stack.pop();
    const n1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SUB[]', n2, n1);

    stack.push(n1 - n2);
}

// DIV[] DIV
// 0x62
function DIV(state) {
    const stack = state.stack;
    const n2 = stack.pop();
    const n1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'DIV[]', n2, n1);

    stack.push(n1 * 64 / n2);
}

// MUL[] MUL
// 0x63
function MUL(state) {
    const stack = state.stack;
    const n2 = stack.pop();
    const n1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'MUL[]', n2, n1);

    stack.push(n1 * n2 / 64);
}

// ABS[] ABSolute value
// 0x64
function ABS(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'ABS[]', n);

    stack.push(Math.abs(n));
}

// NEG[] NEGate
// 0x65
function NEG(state) {
    const stack = state.stack;
    let n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'NEG[]', n);

    stack.push(-n);
}

// FLOOR[] FLOOR
// 0x66
function FLOOR(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'FLOOR[]', n);

    stack.push(Math.floor(n / 0x40) * 0x40);
}

// CEILING[] CEILING
// 0x67
function CEILING(state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'CEILING[]', n);

    stack.push(Math.ceil(n / 0x40) * 0x40);
}

// ROUND[ab] ROUND value
// 0x68-0x6B
function ROUND(dt, state) {
    const stack = state.stack;
    const n = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'ROUND[]');

    stack.push(state.round(n / 0x40) * 0x40);
}

// WCVTF[] Write Control Value Table in Funits
// 0x70
function WCVTF(state) {
    const stack = state.stack;
    const v = stack.pop();
    const l = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'WCVTF[]', v, l);

    state.cvt[l] = v * state.ppem / state.font.unitsPerEm;
}

// DELTAC1[] DELTA exception C1
// DELTAC2[] DELTA exception C2
// DELTAC3[] DELTA exception C3
// 0x73, 0x74, 0x75
function DELTAC123(b, state) {
    const stack = state.stack;
    const n = stack.pop();
    const ppem = state.ppem;
    const base = state.deltaBase + (b - 1) * 16;
    const ds = state.deltaShift;

    if (exports.DEBUG) console.log(state.step, 'DELTAC[' + b + ']', n, stack);

    for (let i = 0; i < n; i++) {
        const c = stack.pop();
        const arg = stack.pop();
        const appem = base + ((arg & 0xF0) >> 4);
        if (appem !== ppem) continue;

        let mag = (arg & 0x0F) - 8;
        if (mag >= 0) mag++;

        const delta = mag * ds;

        if (exports.DEBUG) console.log(state.step, 'DELTACFIX', c, 'by', delta);

        state.cvt[c] += delta;
    }
}

// SROUND[] Super ROUND
// 0x76
function SROUND(state) {
    let n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'SROUND[]', n);

    state.round = roundSuper;

    let period;

    switch (n & 0xC0) {
        case 0x00:
            period = 0.5;
            break;
        case 0x40:
            period = 1;
            break;
        case 0x80:
            period = 2;
            break;
        default:
            throw new Error('invalid SROUND value');
    }

    state.srPeriod = period;

    switch (n & 0x30) {
        case 0x00:
            state.srPhase = 0;
            break;
        case 0x10:
            state.srPhase = 0.25 * period;
            break;
        case 0x20:
            state.srPhase = 0.5  * period;
            break;
        case 0x30:
            state.srPhase = 0.75 * period;
            break;
        default: throw new Error('invalid SROUND value');
    }

    n &= 0x0F;

    if (n === 0) state.srThreshold = 0;
    else state.srThreshold = (n / 8 - 0.5) * period;
}

// S45ROUND[] Super ROUND 45 degrees
// 0x77
function S45ROUND(state) {
    let n = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'S45ROUND[]', n);

    state.round = roundSuper;

    let period;

    switch (n & 0xC0) {
        case 0x00:
            period = Math.sqrt(2) / 2;
            break;
        case 0x40:
            period = Math.sqrt(2);
            break;
        case 0x80:
            period = 2 * Math.sqrt(2);
            break;
        default:
            throw new Error('invalid S45ROUND value');
    }

    state.srPeriod = period;

    switch (n & 0x30) {
        case 0x00:
            state.srPhase = 0;
            break;
        case 0x10:
            state.srPhase = 0.25 * period;
            break;
        case 0x20:
            state.srPhase = 0.5  * period;
            break;
        case 0x30:
            state.srPhase = 0.75 * period;
            break;
        default:
            throw new Error('invalid S45ROUND value');
    }

    n &= 0x0F;

    if (n === 0) state.srThreshold = 0;
    else state.srThreshold = (n / 8 - 0.5) * period;
}

// ROFF[] Round Off
// 0x7A
function ROFF(state) {
    if (exports.DEBUG) console.log(state.step, 'ROFF[]');

    state.round = roundOff;
}

// RUTG[] Round Up To Grid
// 0x7C
function RUTG(state) {
    if (exports.DEBUG) console.log(state.step, 'RUTG[]');

    state.round = roundUpToGrid;
}

// RDTG[] Round Down To Grid
// 0x7D
function RDTG(state) {
    if (exports.DEBUG) console.log(state.step, 'RDTG[]');

    state.round = roundDownToGrid;
}

// SCANCTRL[] SCAN conversion ConTRoL
// 0x85
function SCANCTRL(state) {
    const n = state.stack.pop();

    // ignored by opentype.js

    if (exports.DEBUG) console.log(state.step, 'SCANCTRL[]', n);
}

// SDPVTL[a] Set Dual Projection Vector To Line
// 0x86-0x87
function SDPVTL(a, state) {
    const stack = state.stack;
    const p2i = stack.pop();
    const p1i = stack.pop();
    const p2 = state.z2[p2i];
    const p1 = state.z1[p1i];

    if (exports.DEBUG) console.log('SDPVTL[' + a + ']', p2i, p1i);

    let dx;
    let dy;

    if (!a) {
        dx = p1.x - p2.x;
        dy = p1.y - p2.y;
    } else {
        dx = p2.y - p1.y;
        dy = p1.x - p2.x;
    }

    state.dpv = getUnitVector(dx, dy);
}

// GETINFO[] GET INFOrmation
// 0x88
function GETINFO(state) {
    const stack = state.stack;
    const sel = stack.pop();
    let r = 0;

    if (exports.DEBUG) console.log(state.step, 'GETINFO[]', sel);

    // v35 as in no subpixel hinting
    if (sel & 0x01) r = 35;

    // TODO rotation and stretch currently not supported
    // and thus those GETINFO are always 0.

    // opentype.js is always gray scaling
    if (sel & 0x20) r |= 0x1000;

    stack.push(r);
}

// ROLL[] ROLL the top three stack elements
// 0x8A
function ROLL(state) {
    const stack = state.stack;
    const a = stack.pop();
    const b = stack.pop();
    const c = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'ROLL[]');

    stack.push(b);
    stack.push(a);
    stack.push(c);
}

// MAX[] MAXimum of top two stack elements
// 0x8B
function MAX(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'MAX[]', e2, e1);

    stack.push(Math.max(e1, e2));
}

// MIN[] MINimum of top two stack elements
// 0x8C
function MIN(state) {
    const stack = state.stack;
    const e2 = stack.pop();
    const e1 = stack.pop();

    if (exports.DEBUG) console.log(state.step, 'MIN[]', e2, e1);

    stack.push(Math.min(e1, e2));
}

// SCANTYPE[] SCANTYPE
// 0x8D
function SCANTYPE(state) {
    const n = state.stack.pop();
    // ignored by opentype.js
    if (exports.DEBUG) console.log(state.step, 'SCANTYPE[]', n);
}

// INSTCTRL[] INSTCTRL
// 0x8D
function INSTCTRL(state) {
    const s = state.stack.pop();
    let v = state.stack.pop();

    if (exports.DEBUG) console.log(state.step, 'INSTCTRL[]', s, v);

    switch (s) {
        case 1 : state.inhibitGridFit = !!v; return;
        case 2 : state.ignoreCvt = !!v; return;
        default: throw new Error('invalid INSTCTRL[] selector');
    }
}

// PUSHB[abc] PUSH Bytes
// 0xB0-0xB7
function PUSHB(n, state) {
    const stack = state.stack;
    const prog = state.prog;
    let ip = state.ip;

    if (exports.DEBUG) console.log(state.step, 'PUSHB[' + n + ']');

    for (let i = 0; i < n; i++) stack.push(prog[++ip]);

    state.ip = ip;
}

// PUSHW[abc] PUSH Words
// 0xB8-0xBF
function PUSHW(n, state) {
    let ip = state.ip;
    const prog = state.prog;
    const stack = state.stack;

    if (exports.DEBUG) console.log(state.ip, 'PUSHW[' + n + ']');

    for (let i = 0; i < n; i++) {
        let w = (prog[++ip] << 8) | prog[++ip];
        if (w & 0x8000) w = -((w ^ 0xffff) + 1);
        stack.push(w);
    }

    state.ip = ip;
}

// MDRP[abcde] Move Direct Relative Point
// 0xD0-0xEF
// (if indirect is 0)
//
// and
//
// MIRP[abcde] Move Indirect Relative Point
// 0xE0-0xFF
// (if indirect is 1)

function MDRP_MIRP(indirect, setRp0, keepD, ro, dt, state) {
    const stack = state.stack;
    const cvte = indirect && stack.pop();
    const pi = stack.pop();
    const rp0i = state.rp0;
    const rp = state.z0[rp0i];
    const p = state.z1[pi];

    const md = state.minDis;
    const fv = state.fv;
    const pv = state.dpv;
    let od; // original distance
    let d; // moving distance
    let sign; // sign of distance
    let cv;

    d = od = pv.distance(p, rp, true, true);
    sign = d >= 0 ? 1 : -1; // Math.sign would be 0 in case of 0

    // TODO consider autoFlip
    d = Math.abs(d);

    if (indirect) {
        cv = state.cvt[cvte];

        if (ro && Math.abs(d - cv) < state.cvCutIn) d = cv;
    }

    if (keepD && d < md) d = md;

    if (ro) d = state.round(d);

    fv.setRelative(p, rp, sign * d, pv);
    fv.touch(p);

    if (exports.DEBUG) {
        console.log(
            state.step,
            (indirect ? 'MIRP[' : 'MDRP[') +
            (setRp0 ? 'M' : 'm') +
            (keepD ? '>' : '_') +
            (ro ? 'R' : '_') +
            (dt === 0 ? 'Gr' : (dt === 1 ? 'Bl' : (dt === 2 ? 'Wh' : ''))) +
            ']',
            indirect ?
                cvte + '(' + state.cvt[cvte] + ',' +  cv + ')' :
                '',
            pi,
            '(d =', od, '->', sign * d, ')'
        );
    }

    state.rp1 = state.rp0;
    state.rp2 = pi;
    if (setRp0) state.rp0 = pi;
}

/*
* The instruction table.
*/
instructionTable = [
    /* 0x00 */ SVTCA.bind(undefined, yUnitVector),
    /* 0x01 */ SVTCA.bind(undefined, xUnitVector),
    /* 0x02 */ SPVTCA.bind(undefined, yUnitVector),
    /* 0x03 */ SPVTCA.bind(undefined, xUnitVector),
    /* 0x04 */ SFVTCA.bind(undefined, yUnitVector),
    /* 0x05 */ SFVTCA.bind(undefined, xUnitVector),
    /* 0x06 */ SPVTL.bind(undefined, 0),
    /* 0x07 */ SPVTL.bind(undefined, 1),
    /* 0x08 */ SFVTL.bind(undefined, 0),
    /* 0x09 */ SFVTL.bind(undefined, 1),
    /* 0x0A */ SPVFS,
    /* 0x0B */ SFVFS,
    /* 0x0C */ GPV,
    /* 0x0D */ GFV,
    /* 0x0E */ SFVTPV,
    /* 0x0F */ ISECT,
    /* 0x10 */ SRP0,
    /* 0x11 */ SRP1,
    /* 0x12 */ SRP2,
    /* 0x13 */ SZP0,
    /* 0x14 */ SZP1,
    /* 0x15 */ SZP2,
    /* 0x16 */ SZPS,
    /* 0x17 */ SLOOP,
    /* 0x18 */ RTG,
    /* 0x19 */ RTHG,
    /* 0x1A */ SMD,
    /* 0x1B */ ELSE,
    /* 0x1C */ JMPR,
    /* 0x1D */ SCVTCI,
    /* 0x1E */ undefined,   // TODO SSWCI
    /* 0x1F */ undefined,   // TODO SSW
    /* 0x20 */ DUP,
    /* 0x21 */ POP,
    /* 0x22 */ CLEAR,
    /* 0x23 */ SWAP,
    /* 0x24 */ DEPTH,
    /* 0x25 */ CINDEX,
    /* 0x26 */ MINDEX,
    /* 0x27 */ undefined,   // TODO ALIGNPTS
    /* 0x28 */ undefined,
    /* 0x29 */ undefined,   // TODO UTP
    /* 0x2A */ LOOPCALL,
    /* 0x2B */ CALL,
    /* 0x2C */ FDEF,
    /* 0x2D */ undefined,   // ENDF (eaten by FDEF)
    /* 0x2E */ MDAP.bind(undefined, 0),
    /* 0x2F */ MDAP.bind(undefined, 1),
    /* 0x30 */ IUP.bind(undefined, yUnitVector),
    /* 0x31 */ IUP.bind(undefined, xUnitVector),
    /* 0x32 */ SHP.bind(undefined, 0),
    /* 0x33 */ SHP.bind(undefined, 1),
    /* 0x34 */ SHC.bind(undefined, 0),
    /* 0x35 */ SHC.bind(undefined, 1),
    /* 0x36 */ SHZ.bind(undefined, 0),
    /* 0x37 */ SHZ.bind(undefined, 1),
    /* 0x38 */ SHPIX,
    /* 0x39 */ IP,
    /* 0x3A */ MSIRP.bind(undefined, 0),
    /* 0x3B */ MSIRP.bind(undefined, 1),
    /* 0x3C */ ALIGNRP,
    /* 0x3D */ RTDG,
    /* 0x3E */ MIAP.bind(undefined, 0),
    /* 0x3F */ MIAP.bind(undefined, 1),
    /* 0x40 */ NPUSHB,
    /* 0x41 */ NPUSHW,
    /* 0x42 */ WS,
    /* 0x43 */ RS,
    /* 0x44 */ WCVTP,
    /* 0x45 */ RCVT,
    /* 0x46 */ GC.bind(undefined, 0),
    /* 0x47 */ GC.bind(undefined, 1),
    /* 0x48 */ undefined,   // TODO SCFS
    /* 0x49 */ MD.bind(undefined, 0),
    /* 0x4A */ MD.bind(undefined, 1),
    /* 0x4B */ MPPEM,
    /* 0x4C */ undefined,   // TODO MPS
    /* 0x4D */ FLIPON,
    /* 0x4E */ undefined,   // TODO FLIPOFF
    /* 0x4F */ undefined,   // TODO DEBUG
    /* 0x50 */ LT,
    /* 0x51 */ LTEQ,
    /* 0x52 */ GT,
    /* 0x53 */ GTEQ,
    /* 0x54 */ EQ,
    /* 0x55 */ NEQ,
    /* 0x56 */ ODD,
    /* 0x57 */ EVEN,
    /* 0x58 */ IF,
    /* 0x59 */ EIF,
    /* 0x5A */ AND,
    /* 0x5B */ OR,
    /* 0x5C */ NOT,
    /* 0x5D */ DELTAP123.bind(undefined, 1),
    /* 0x5E */ SDB,
    /* 0x5F */ SDS,
    /* 0x60 */ ADD,
    /* 0x61 */ SUB,
    /* 0x62 */ DIV,
    /* 0x63 */ MUL,
    /* 0x64 */ ABS,
    /* 0x65 */ NEG,
    /* 0x66 */ FLOOR,
    /* 0x67 */ CEILING,
    /* 0x68 */ ROUND.bind(undefined, 0),
    /* 0x69 */ ROUND.bind(undefined, 1),
    /* 0x6A */ ROUND.bind(undefined, 2),
    /* 0x6B */ ROUND.bind(undefined, 3),
    /* 0x6C */ undefined,   // TODO NROUND[ab]
    /* 0x6D */ undefined,   // TODO NROUND[ab]
    /* 0x6E */ undefined,   // TODO NROUND[ab]
    /* 0x6F */ undefined,   // TODO NROUND[ab]
    /* 0x70 */ WCVTF,
    /* 0x71 */ DELTAP123.bind(undefined, 2),
    /* 0x72 */ DELTAP123.bind(undefined, 3),
    /* 0x73 */ DELTAC123.bind(undefined, 1),
    /* 0x74 */ DELTAC123.bind(undefined, 2),
    /* 0x75 */ DELTAC123.bind(undefined, 3),
    /* 0x76 */ SROUND,
    /* 0x77 */ S45ROUND,
    /* 0x78 */ undefined,   // TODO JROT[]
    /* 0x79 */ undefined,   // TODO JROF[]
    /* 0x7A */ ROFF,
    /* 0x7B */ undefined,
    /* 0x7C */ RUTG,
    /* 0x7D */ RDTG,
    /* 0x7E */ POP, // actually SANGW, supposed to do only a pop though
    /* 0x7F */ POP, // actually AA, supposed to do only a pop though
    /* 0x80 */ undefined,   // TODO FLIPPT
    /* 0x81 */ undefined,   // TODO FLIPRGON
    /* 0x82 */ undefined,   // TODO FLIPRGOFF
    /* 0x83 */ undefined,
    /* 0x84 */ undefined,
    /* 0x85 */ SCANCTRL,
    /* 0x86 */ SDPVTL.bind(undefined, 0),
    /* 0x87 */ SDPVTL.bind(undefined, 1),
    /* 0x88 */ GETINFO,
    /* 0x89 */ undefined,   // TODO IDEF
    /* 0x8A */ ROLL,
    /* 0x8B */ MAX,
    /* 0x8C */ MIN,
    /* 0x8D */ SCANTYPE,
    /* 0x8E */ INSTCTRL,
    /* 0x8F */ undefined,
    /* 0x90 */ undefined,
    /* 0x91 */ undefined,
    /* 0x92 */ undefined,
    /* 0x93 */ undefined,
    /* 0x94 */ undefined,
    /* 0x95 */ undefined,
    /* 0x96 */ undefined,
    /* 0x97 */ undefined,
    /* 0x98 */ undefined,
    /* 0x99 */ undefined,
    /* 0x9A */ undefined,
    /* 0x9B */ undefined,
    /* 0x9C */ undefined,
    /* 0x9D */ undefined,
    /* 0x9E */ undefined,
    /* 0x9F */ undefined,
    /* 0xA0 */ undefined,
    /* 0xA1 */ undefined,
    /* 0xA2 */ undefined,
    /* 0xA3 */ undefined,
    /* 0xA4 */ undefined,
    /* 0xA5 */ undefined,
    /* 0xA6 */ undefined,
    /* 0xA7 */ undefined,
    /* 0xA8 */ undefined,
    /* 0xA9 */ undefined,
    /* 0xAA */ undefined,
    /* 0xAB */ undefined,
    /* 0xAC */ undefined,
    /* 0xAD */ undefined,
    /* 0xAE */ undefined,
    /* 0xAF */ undefined,
    /* 0xB0 */ PUSHB.bind(undefined, 1),
    /* 0xB1 */ PUSHB.bind(undefined, 2),
    /* 0xB2 */ PUSHB.bind(undefined, 3),
    /* 0xB3 */ PUSHB.bind(undefined, 4),
    /* 0xB4 */ PUSHB.bind(undefined, 5),
    /* 0xB5 */ PUSHB.bind(undefined, 6),
    /* 0xB6 */ PUSHB.bind(undefined, 7),
    /* 0xB7 */ PUSHB.bind(undefined, 8),
    /* 0xB8 */ PUSHW.bind(undefined, 1),
    /* 0xB9 */ PUSHW.bind(undefined, 2),
    /* 0xBA */ PUSHW.bind(undefined, 3),
    /* 0xBB */ PUSHW.bind(undefined, 4),
    /* 0xBC */ PUSHW.bind(undefined, 5),
    /* 0xBD */ PUSHW.bind(undefined, 6),
    /* 0xBE */ PUSHW.bind(undefined, 7),
    /* 0xBF */ PUSHW.bind(undefined, 8),
    /* 0xC0 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 0, 0),
    /* 0xC1 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 0, 1),
    /* 0xC2 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 0, 2),
    /* 0xC3 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 0, 3),
    /* 0xC4 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 1, 0),
    /* 0xC5 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 1, 1),
    /* 0xC6 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 1, 2),
    /* 0xC7 */ MDRP_MIRP.bind(undefined, 0, 0, 0, 1, 3),
    /* 0xC8 */ MDRP_MIRP.bind(undefined, 0, 0, 1, 0, 0),
    /* 0xC9 */ MDRP_MIRP.bind(undefined, 0, 0, 1, 0, 1),
    /* 0xCA */ MDRP_MIRP.bind(undefined, 0, 0, 1, 0, 2),
    /* 0xCB */ MDRP_MIRP.bind(undefined, 0, 0, 1, 0, 3),
    /* 0xCC */ MDRP_MIRP.bind(undefined, 0, 0, 1, 1, 0),
    /* 0xCD */ MDRP_MIRP.bind(undefined, 0, 0, 1, 1, 1),
    /* 0xCE */ MDRP_MIRP.bind(undefined, 0, 0, 1, 1, 2),
    /* 0xCF */ MDRP_MIRP.bind(undefined, 0, 0, 1, 1, 3),
    /* 0xD0 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 0, 0),
    /* 0xD1 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 0, 1),
    /* 0xD2 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 0, 2),
    /* 0xD3 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 0, 3),
    /* 0xD4 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 1, 0),
    /* 0xD5 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 1, 1),
    /* 0xD6 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 1, 2),
    /* 0xD7 */ MDRP_MIRP.bind(undefined, 0, 1, 0, 1, 3),
    /* 0xD8 */ MDRP_MIRP.bind(undefined, 0, 1, 1, 0, 0),
    /* 0xD9 */ MDRP_MIRP.bind(undefined, 0, 1, 1, 0, 1),
    /* 0xDA */ MDRP_MIRP.bind(undefined, 0, 1, 1, 0, 2),
    /* 0xDB */ MDRP_MIRP.bind(undefined, 0, 1, 1, 0, 3),
    /* 0xDC */ MDRP_MIRP.bind(undefined, 0, 1, 1, 1, 0),
    /* 0xDD */ MDRP_MIRP.bind(undefined, 0, 1, 1, 1, 1),
    /* 0xDE */ MDRP_MIRP.bind(undefined, 0, 1, 1, 1, 2),
    /* 0xDF */ MDRP_MIRP.bind(undefined, 0, 1, 1, 1, 3),
    /* 0xE0 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 0, 0),
    /* 0xE1 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 0, 1),
    /* 0xE2 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 0, 2),
    /* 0xE3 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 0, 3),
    /* 0xE4 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 1, 0),
    /* 0xE5 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 1, 1),
    /* 0xE6 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 1, 2),
    /* 0xE7 */ MDRP_MIRP.bind(undefined, 1, 0, 0, 1, 3),
    /* 0xE8 */ MDRP_MIRP.bind(undefined, 1, 0, 1, 0, 0),
    /* 0xE9 */ MDRP_MIRP.bind(undefined, 1, 0, 1, 0, 1),
    /* 0xEA */ MDRP_MIRP.bind(undefined, 1, 0, 1, 0, 2),
    /* 0xEB */ MDRP_MIRP.bind(undefined, 1, 0, 1, 0, 3),
    /* 0xEC */ MDRP_MIRP.bind(undefined, 1, 0, 1, 1, 0),
    /* 0xED */ MDRP_MIRP.bind(undefined, 1, 0, 1, 1, 1),
    /* 0xEE */ MDRP_MIRP.bind(undefined, 1, 0, 1, 1, 2),
    /* 0xEF */ MDRP_MIRP.bind(undefined, 1, 0, 1, 1, 3),
    /* 0xF0 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 0, 0),
    /* 0xF1 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 0, 1),
    /* 0xF2 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 0, 2),
    /* 0xF3 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 0, 3),
    /* 0xF4 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 1, 0),
    /* 0xF5 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 1, 1),
    /* 0xF6 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 1, 2),
    /* 0xF7 */ MDRP_MIRP.bind(undefined, 1, 1, 0, 1, 3),
    /* 0xF8 */ MDRP_MIRP.bind(undefined, 1, 1, 1, 0, 0),
    /* 0xF9 */ MDRP_MIRP.bind(undefined, 1, 1, 1, 0, 1),
    /* 0xFA */ MDRP_MIRP.bind(undefined, 1, 1, 1, 0, 2),
    /* 0xFB */ MDRP_MIRP.bind(undefined, 1, 1, 1, 0, 3),
    /* 0xFC */ MDRP_MIRP.bind(undefined, 1, 1, 1, 1, 0),
    /* 0xFD */ MDRP_MIRP.bind(undefined, 1, 1, 1, 1, 1),
    /* 0xFE */ MDRP_MIRP.bind(undefined, 1, 1, 1, 1, 2),
    /* 0xFF */ MDRP_MIRP.bind(undefined, 1, 1, 1, 1, 3)
];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hinting);

/*****************************
  Mathematical Considerations
******************************

fv ... refers to freedom vector
pv ... refers to projection vector
rp ... refers to reference point
p  ... refers to to point being operated on
d  ... refers to distance

SETRELATIVE:
============

case freedom vector == x-axis:
------------------------------

                        (pv)
                     .-'
              rpd .-'
               .-*
          d .-'90°'
         .-'       '
      .-'           '
   *-'               ' b
  rp                  '
                       '
                        '
            p *----------*-------------- (fv)
                          pm

  rpdx = rpx + d * pv.x
  rpdy = rpy + d * pv.y

  equation of line b

   y - rpdy = pvns * (x- rpdx)

   y = p.y

   x = rpdx + ( p.y - rpdy ) / pvns


case freedom vector == y-axis:
------------------------------

    * pm
    |\
    | \
    |  \
    |   \
    |    \
    |     \
    |      \
    |       \
    |        \
    |         \ b
    |          \
    |           \
    |            \    .-' (pv)
    |         90° \.-'
    |           .-'* rpd
    |        .-'
    *     *-'  d
    p     rp

  rpdx = rpx + d * pv.x
  rpdy = rpy + d * pv.y

  equation of line b:
           pvns ... normal slope to pv

   y - rpdy = pvns * (x - rpdx)

   x = p.x

   y = rpdy +  pvns * (p.x - rpdx)



generic case:
-------------


                              .'(fv)
                            .'
                          .* pm
                        .' !
                      .'    .
                    .'      !
                  .'         . b
                .'           !
               *              .
              p               !
                         90°   .    ... (pv)
                           ...-*-'''
                  ...---'''    rpd
         ...---'''   d
   *--'''
  rp

    rpdx = rpx + d * pv.x
    rpdy = rpy + d * pv.y

 equation of line b:
    pvns... normal slope to pv

    y - rpdy = pvns * (x - rpdx)

 equation of freedom vector line:
    fvs ... slope of freedom vector (=fy/fx)

    y - py = fvs * (x - px)


  on pm both equations are true for same x/y

    y - rpdy = pvns * (x - rpdx)

    y - py = fvs * (x - px)

  form to y and set equal:

    pvns * (x - rpdx) + rpdy = fvs * (x - px) + py

  expand:

    pvns * x - pvns * rpdx + rpdy = fvs * x - fvs * px + py

  switch:

    fvs * x - fvs * px + py = pvns * x - pvns * rpdx + rpdy

  solve for x:

    fvs * x - pvns * x = fvs * px - pvns * rpdx - py + rpdy



          fvs * px - pvns * rpdx + rpdy - py
    x =  -----------------------------------
                 fvs - pvns

  and:

    y = fvs * (x - px) + py



INTERPOLATE:
============

Examples of point interpolation.

The weight of the movement of the reference point gets bigger
the further the other reference point is away, thus the safest
option (that is avoiding 0/0 divisions) is to weight the
original distance of the other point by the sum of both distances.

If the sum of both distances is 0, then move the point by the
arithmetic average of the movement of both reference points.




           (+6)
    rp1o *---->*rp1
         .     .                          (+12)
         .     .                  rp2o *---------->* rp2
         .     .                       .           .
         .     .                       .           .
         .    10          20           .           .
         |.........|...................|           .
               .   .                               .
               .   . (+8)                          .
                po *------>*p                      .
               .           .                       .
               .    12     .          24           .
               |...........|.......................|
                                  36


-------



           (+10)
    rp1o *-------->*rp1
         .         .                      (-10)
         .         .              rp2 *<---------* rpo2
         .         .                   .         .
         .         .                   .         .
         .    10   .          30       .         .
         |.........|.............................|
                   .                   .
                   . (+5)              .
                po *--->* p            .
                   .    .              .
                   .    .   20         .
                   |....|..............|
                     5        15


-------


           (+10)
    rp1o *-------->*rp1
         .         .
         .         .
    rp2o *-------->*rp2


                               (+10)
                          po *-------->* p

-------


           (+10)
    rp1o *-------->*rp1
         .         .
         .         .(+30)
    rp2o *---------------------------->*rp2


                                        (+25)
                          po *----------------------->* p



vim: set ts=4 sw=4 expandtab:
*****/


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/layout.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/layout.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
// The Layout object is the prototype of Substitution objects, and provides
// utility methods to manipulate common layout tables (GPOS, GSUB, GDEF...)



function searchTag(arr, tag) {
    /* jshint bitwise: false */
    let imin = 0;
    let imax = arr.length - 1;
    while (imin <= imax) {
        const imid = (imin + imax) >>> 1;
        const val = arr[imid].tag;
        if (val === tag) {
            return imid;
        } else if (val < tag) {
            imin = imid + 1;
        } else { imax = imid - 1; }
    }
    // Not found: return -1-insertion point
    return -imin - 1;
}

function binSearch(arr, value) {
    /* jshint bitwise: false */
    let imin = 0;
    let imax = arr.length - 1;
    while (imin <= imax) {
        const imid = (imin + imax) >>> 1;
        const val = arr[imid];
        if (val === value) {
            return imid;
        } else if (val < value) {
            imin = imid + 1;
        } else { imax = imid - 1; }
    }
    // Not found: return -1-insertion point
    return -imin - 1;
}

/**
 * @exports opentype.Layout
 * @class
 */
function Layout(font, tableName) {
    this.font = font;
    this.tableName = tableName;
}

Layout.prototype = {

    /**
     * Binary search an object by "tag" property
     * @instance
     * @function searchTag
     * @memberof opentype.Layout
     * @param  {Array} arr
     * @param  {string} tag
     * @return {number}
     */
    searchTag: searchTag,

    /**
     * Binary search in a list of numbers
     * @instance
     * @function binSearch
     * @memberof opentype.Layout
     * @param  {Array} arr
     * @param  {number} value
     * @return {number}
     */
    binSearch: binSearch,

    /**
     * Get or create the Layout table (GSUB, GPOS etc).
     * @param  {boolean} create - Whether to create a new one.
     * @return {Object} The GSUB or GPOS table.
     */
    getTable: function(create) {
        let layout = this.font.tables[this.tableName];
        if (!layout && create) {
            layout = this.font.tables[this.tableName] = this.createDefaultTable();
        }
        return layout;
    },

    /**
     * Returns all scripts in the substitution table.
     * @instance
     * @return {Array}
     */
    getScriptNames: function() {
        let layout = this.getTable();
        if (!layout) { return []; }
        return layout.scripts.map(function(script) {
            return script.tag;
        });
    },

    /**
     * Returns the best bet for a script name.
     * Returns 'DFLT' if it exists.
     * If not, returns 'latn' if it exists.
     * If neither exist, returns undefined.
     */
    getDefaultScriptName: function() {
        let layout = this.getTable();
        if (!layout) { return; }
        let hasLatn = false;
        for (let i = 0; i < layout.scripts.length; i++) {
            const name = layout.scripts[i].tag;
            if (name === 'DFLT') return name;
            if (name === 'latn') hasLatn = true;
        }
        if (hasLatn) return 'latn';
    },

    /**
     * Returns all LangSysRecords in the given script.
     * @instance
     * @param {string} [script='DFLT']
     * @param {boolean} create - forces the creation of this script table if it doesn't exist.
     * @return {Object} An object with tag and script properties.
     */
    getScriptTable: function(script, create) {
        const layout = this.getTable(create);
        if (layout) {
            script = script || 'DFLT';
            const scripts = layout.scripts;
            const pos = searchTag(layout.scripts, script);
            if (pos >= 0) {
                return scripts[pos].script;
            } else if (create) {
                const scr = {
                    tag: script,
                    script: {
                        defaultLangSys: {reserved: 0, reqFeatureIndex: 0xffff, featureIndexes: []},
                        langSysRecords: []
                    }
                };
                scripts.splice(-1 - pos, 0, scr);
                return scr.script;
            }
        }
    },

    /**
     * Returns a language system table
     * @instance
     * @param {string} [script='DFLT']
     * @param {string} [language='dlft']
     * @param {boolean} create - forces the creation of this langSysTable if it doesn't exist.
     * @return {Object}
     */
    getLangSysTable: function(script, language, create) {
        const scriptTable = this.getScriptTable(script, create);
        if (scriptTable) {
            if (!language || language === 'dflt' || language === 'DFLT') {
                return scriptTable.defaultLangSys;
            }
            const pos = searchTag(scriptTable.langSysRecords, language);
            if (pos >= 0) {
                return scriptTable.langSysRecords[pos].langSys;
            } else if (create) {
                const langSysRecord = {
                    tag: language,
                    langSys: {reserved: 0, reqFeatureIndex: 0xffff, featureIndexes: []}
                };
                scriptTable.langSysRecords.splice(-1 - pos, 0, langSysRecord);
                return langSysRecord.langSys;
            }
        }
    },

    /**
     * Get a specific feature table.
     * @instance
     * @param {string} [script='DFLT']
     * @param {string} [language='dlft']
     * @param {string} feature - One of the codes listed at https://www.microsoft.com/typography/OTSPEC/featurelist.htm
     * @param {boolean} create - forces the creation of the feature table if it doesn't exist.
     * @return {Object}
     */
    getFeatureTable: function(script, language, feature, create) {
        const langSysTable = this.getLangSysTable(script, language, create);
        if (langSysTable) {
            let featureRecord;
            const featIndexes = langSysTable.featureIndexes;
            const allFeatures = this.font.tables[this.tableName].features;
            // The FeatureIndex array of indices is in arbitrary order,
            // even if allFeatures is sorted alphabetically by feature tag.
            for (let i = 0; i < featIndexes.length; i++) {
                featureRecord = allFeatures[featIndexes[i]];
                if (featureRecord.tag === feature) {
                    return featureRecord.feature;
                }
            }
            if (create) {
                const index = allFeatures.length;
                // Automatic ordering of features would require to shift feature indexes in the script list.
                _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(index === 0 || feature >= allFeatures[index - 1].tag, 'Features must be added in alphabetical order.');
                featureRecord = {
                    tag: feature,
                    feature: { params: 0, lookupListIndexes: [] }
                };
                allFeatures.push(featureRecord);
                featIndexes.push(index);
                return featureRecord.feature;
            }
        }
    },

    /**
     * Get the lookup tables of a given type for a script/language/feature.
     * @instance
     * @param {string} [script='DFLT']
     * @param {string} [language='dlft']
     * @param {string} feature - 4-letter feature code
     * @param {number} lookupType - 1 to 8
     * @param {boolean} create - forces the creation of the lookup table if it doesn't exist, with no subtables.
     * @return {Object[]}
     */
    getLookupTables: function(script, language, feature, lookupType, create) {
        const featureTable = this.getFeatureTable(script, language, feature, create);
        const tables = [];
        if (featureTable) {
            let lookupTable;
            const lookupListIndexes = featureTable.lookupListIndexes;
            const allLookups = this.font.tables[this.tableName].lookups;
            // lookupListIndexes are in no particular order, so use naive search.
            for (let i = 0; i < lookupListIndexes.length; i++) {
                lookupTable = allLookups[lookupListIndexes[i]];
                if (lookupTable.lookupType === lookupType) {
                    tables.push(lookupTable);
                }
            }
            if (tables.length === 0 && create) {
                lookupTable = {
                    lookupType: lookupType,
                    lookupFlag: 0,
                    subtables: [],
                    markFilteringSet: undefined
                };
                const index = allLookups.length;
                allLookups.push(lookupTable);
                lookupListIndexes.push(index);
                return [lookupTable];
            }
        }
        return tables;
    },

    /**
     * Returns the list of glyph indexes of a coverage table.
     * Format 1: the list is stored raw
     * Format 2: compact list as range records.
     * @instance
     * @param  {Object} coverageTable
     * @return {Array}
     */
    expandCoverage: function(coverageTable) {
        if (coverageTable.format === 1) {
            return coverageTable.glyphs;
        } else {
            const glyphs = [];
            const ranges = coverageTable.ranges;
            for (let i = 0; i < ranges.length; i++) {
                const range = ranges[i];
                const start = range.start;
                const end = range.end;
                for (let j = start; j <= end; j++) {
                    glyphs.push(j);
                }
            }
            return glyphs;
        }
    }

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/opentype.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/opentype.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoundingBox: () => (/* reexport safe */ _bbox__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Font: () => (/* reexport safe */ _font__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Glyph: () => (/* reexport safe */ _glyph__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Path: () => (/* reexport safe */ _path__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   _parse: () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   load: () => (/* binding */ load),
/* harmony export */   loadSync: () => (/* binding */ loadSync),
/* harmony export */   parse: () => (/* binding */ parseBuffer)
/* harmony export */ });
/* harmony import */ var tiny_inflate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-inflate */ "../node_modules/.pnpm/tiny-inflate@1.0.3/node_modules/tiny-inflate/index.js");
/* harmony import */ var tiny_inflate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tiny_inflate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _font__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./font */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/font.js");
/* harmony import */ var _glyph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glyph */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyph.js");
/* harmony import */ var _encoding__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./encoding */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/encoding.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _bbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bbox */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/bbox.js");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./path */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/util.js");
/* harmony import */ var _tables_cmap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tables/cmap */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cmap.js");
/* harmony import */ var _tables_cff__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tables/cff */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cff.js");
/* harmony import */ var _tables_fvar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tables/fvar */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/fvar.js");
/* harmony import */ var _tables_glyf__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tables/glyf */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/glyf.js");
/* harmony import */ var _tables_gpos__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tables/gpos */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gpos.js");
/* harmony import */ var _tables_gsub__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tables/gsub */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gsub.js");
/* harmony import */ var _tables_head__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tables/head */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/head.js");
/* harmony import */ var _tables_hhea__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tables/hhea */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hhea.js");
/* harmony import */ var _tables_hmtx__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./tables/hmtx */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hmtx.js");
/* harmony import */ var _tables_kern__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./tables/kern */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/kern.js");
/* harmony import */ var _tables_ltag__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./tables/ltag */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/ltag.js");
/* harmony import */ var _tables_loca__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./tables/loca */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/loca.js");
/* harmony import */ var _tables_maxp__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./tables/maxp */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/maxp.js");
/* harmony import */ var _tables_name__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tables/name */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/name.js");
/* harmony import */ var _tables_os2__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./tables/os2 */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/os2.js");
/* harmony import */ var _tables_post__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./tables/post */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/post.js");
/* harmony import */ var _tables_meta__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./tables/meta */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/meta.js");
// opentype.js
// https://github.com/nodebox/opentype.js
// (c) 2015 Frederik De Bleser
// opentype.js may be freely distributed under the MIT license.

/* global DataView, Uint8Array, XMLHttpRequest  */



























/**
 * The opentype library.
 * @namespace opentype
 */

// File loaders /////////////////////////////////////////////////////////
/**
 * Loads a font from a file. The callback throws an error message as the first parameter if it fails
 * and the font as an ArrayBuffer in the second parameter if it succeeds.
 * @param  {string} path - The path of the file
 * @param  {Function} callback - The function to call when the font load completes
 */
function loadFromFile(path, callback) {
    const fs = __webpack_require__(/*! fs */ "?5e0b");
    fs.readFile(path, function(err, buffer) {
        if (err) {
            return callback(err.message);
        }

        callback(null, (0,_util__WEBPACK_IMPORTED_MODULE_7__.nodeBufferToArrayBuffer)(buffer));
    });
}
/**
 * Loads a font from a URL. The callback throws an error message as the first parameter if it fails
 * and the font as an ArrayBuffer in the second parameter if it succeeds.
 * @param  {string} url - The URL of the font file.
 * @param  {Function} callback - The function to call when the font load completes
 */
function loadFromUrl(url, callback) {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        if (request.status !== 200) {
            return callback('Font could not be loaded: ' + request.statusText);
        }

        return callback(null, request.response);
    };

    request.onerror = function () {
        callback('Font could not be loaded');
    };

    request.send();
}

// Table Directory Entries //////////////////////////////////////////////
/**
 * Parses OpenType table entries.
 * @param  {DataView}
 * @param  {Number}
 * @return {Object[]}
 */
function parseOpenTypeTableEntries(data, numTables) {
    const tableEntries = [];
    let p = 12;
    for (let i = 0; i < numTables; i += 1) {
        const tag = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getTag(data, p);
        const checksum = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getULong(data, p + 4);
        const offset = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getULong(data, p + 8);
        const length = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getULong(data, p + 12);
        tableEntries.push({tag: tag, checksum: checksum, offset: offset, length: length, compression: false});
        p += 16;
    }

    return tableEntries;
}

/**
 * Parses WOFF table entries.
 * @param  {DataView}
 * @param  {Number}
 * @return {Object[]}
 */
function parseWOFFTableEntries(data, numTables) {
    const tableEntries = [];
    let p = 44; // offset to the first table directory entry.
    for (let i = 0; i < numTables; i += 1) {
        const tag = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getTag(data, p);
        const offset = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getULong(data, p + 4);
        const compLength = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getULong(data, p + 8);
        const origLength = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getULong(data, p + 12);
        let compression;
        if (compLength < origLength) {
            compression = 'WOFF';
        } else {
            compression = false;
        }

        tableEntries.push({tag: tag, offset: offset, compression: compression,
            compressedLength: compLength, length: origLength});
        p += 20;
    }

    return tableEntries;
}

/**
 * @typedef TableData
 * @type Object
 * @property {DataView} data - The DataView
 * @property {number} offset - The data offset.
 */

/**
 * @param  {DataView}
 * @param  {Object}
 * @return {TableData}
 */
function uncompressTable(data, tableEntry) {
    if (tableEntry.compression === 'WOFF') {
        const inBuffer = new Uint8Array(data.buffer, tableEntry.offset + 2, tableEntry.compressedLength - 2);
        const outBuffer = new Uint8Array(tableEntry.length);
        tiny_inflate__WEBPACK_IMPORTED_MODULE_0___default()(inBuffer, outBuffer);
        if (outBuffer.byteLength !== tableEntry.length) {
            throw new Error('Decompression error: ' + tableEntry.tag + ' decompressed length doesn\'t match recorded length');
        }

        const view = new DataView(outBuffer.buffer, 0);
        return {data: view, offset: 0};
    } else {
        return {data: data, offset: tableEntry.offset};
    }
}

// Public API ///////////////////////////////////////////////////////////

/**
 * Parse the OpenType file data (as an ArrayBuffer) and return a Font object.
 * Throws an error if the font could not be parsed.
 * @param  {ArrayBuffer}
 * @return {opentype.Font}
 */
function parseBuffer(buffer) {
    let indexToLocFormat;
    let ltagTable;

    // Since the constructor can also be called to create new fonts from scratch, we indicate this
    // should be an empty font that we'll fill with our own data.
    const font = new _font__WEBPACK_IMPORTED_MODULE_1__["default"]({empty: true});

    // OpenType fonts use big endian byte ordering.
    // We can't rely on typed array view types, because they operate with the endianness of the host computer.
    // Instead we use DataViews where we can specify endianness.
    const data = new DataView(buffer, 0);
    let numTables;
    let tableEntries = [];
    const signature = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getTag(data, 0);
    if (signature === String.fromCharCode(0, 1, 0, 0) || signature === 'true' || signature === 'typ1') {
        font.outlinesFormat = 'truetype';
        numTables = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getUShort(data, 4);
        tableEntries = parseOpenTypeTableEntries(data, numTables);
    } else if (signature === 'OTTO') {
        font.outlinesFormat = 'cff';
        numTables = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getUShort(data, 4);
        tableEntries = parseOpenTypeTableEntries(data, numTables);
    } else if (signature === 'wOFF') {
        const flavor = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getTag(data, 4);
        if (flavor === String.fromCharCode(0, 1, 0, 0)) {
            font.outlinesFormat = 'truetype';
        } else if (flavor === 'OTTO') {
            font.outlinesFormat = 'cff';
        } else {
            throw new Error('Unsupported OpenType flavor ' + signature);
        }

        numTables = _parse__WEBPACK_IMPORTED_MODULE_4__["default"].getUShort(data, 12);
        tableEntries = parseWOFFTableEntries(data, numTables);
    } else {
        throw new Error('Unsupported OpenType signature ' + signature);
    }

    let cffTableEntry;
    let fvarTableEntry;
    let glyfTableEntry;
    let gposTableEntry;
    let gsubTableEntry;
    let hmtxTableEntry;
    let kernTableEntry;
    let locaTableEntry;
    let nameTableEntry;
    let metaTableEntry;
    let p;

    for (let i = 0; i < numTables; i += 1) {
        const tableEntry = tableEntries[i];
        let table;
        switch (tableEntry.tag) {
            case 'cmap':
                table = uncompressTable(data, tableEntry);
                font.tables.cmap = _tables_cmap__WEBPACK_IMPORTED_MODULE_8__["default"].parse(table.data, table.offset);
                font.encoding = new _encoding__WEBPACK_IMPORTED_MODULE_3__.CmapEncoding(font.tables.cmap);
                break;
            case 'cvt ' :
                table = uncompressTable(data, tableEntry);
                p = new _parse__WEBPACK_IMPORTED_MODULE_4__["default"].Parser(table.data, table.offset);
                font.tables.cvt = p.parseShortList(tableEntry.length / 2);
                break;
            case 'fvar':
                fvarTableEntry = tableEntry;
                break;
            case 'fpgm' :
                table = uncompressTable(data, tableEntry);
                p = new _parse__WEBPACK_IMPORTED_MODULE_4__["default"].Parser(table.data, table.offset);
                font.tables.fpgm = p.parseByteList(tableEntry.length);
                break;
            case 'head':
                table = uncompressTable(data, tableEntry);
                font.tables.head = _tables_head__WEBPACK_IMPORTED_MODULE_14__["default"].parse(table.data, table.offset);
                font.unitsPerEm = font.tables.head.unitsPerEm;
                indexToLocFormat = font.tables.head.indexToLocFormat;
                break;
            case 'hhea':
                table = uncompressTable(data, tableEntry);
                font.tables.hhea = _tables_hhea__WEBPACK_IMPORTED_MODULE_15__["default"].parse(table.data, table.offset);
                font.ascender = font.tables.hhea.ascender;
                font.descender = font.tables.hhea.descender;
                font.numberOfHMetrics = font.tables.hhea.numberOfHMetrics;
                break;
            case 'hmtx':
                hmtxTableEntry = tableEntry;
                break;
            case 'ltag':
                table = uncompressTable(data, tableEntry);
                ltagTable = _tables_ltag__WEBPACK_IMPORTED_MODULE_18__["default"].parse(table.data, table.offset);
                break;
            case 'maxp':
                table = uncompressTable(data, tableEntry);
                font.tables.maxp = _tables_maxp__WEBPACK_IMPORTED_MODULE_20__["default"].parse(table.data, table.offset);
                font.numGlyphs = font.tables.maxp.numGlyphs;
                break;
            case 'name':
                nameTableEntry = tableEntry;
                break;
            case 'OS/2':
                table = uncompressTable(data, tableEntry);
                font.tables.os2 = _tables_os2__WEBPACK_IMPORTED_MODULE_22__["default"].parse(table.data, table.offset);
                break;
            case 'post':
                table = uncompressTable(data, tableEntry);
                font.tables.post = _tables_post__WEBPACK_IMPORTED_MODULE_23__["default"].parse(table.data, table.offset);
                font.glyphNames = new _encoding__WEBPACK_IMPORTED_MODULE_3__.GlyphNames(font.tables.post);
                break;
            case 'prep' :
                table = uncompressTable(data, tableEntry);
                p = new _parse__WEBPACK_IMPORTED_MODULE_4__["default"].Parser(table.data, table.offset);
                font.tables.prep = p.parseByteList(tableEntry.length);
                break;
            case 'glyf':
                glyfTableEntry = tableEntry;
                break;
            case 'loca':
                locaTableEntry = tableEntry;
                break;
            case 'CFF ':
                cffTableEntry = tableEntry;
                break;
            case 'kern':
                kernTableEntry = tableEntry;
                break;
            case 'GPOS':
                gposTableEntry = tableEntry;
                break;
            case 'GSUB':
                gsubTableEntry = tableEntry;
                break;
            case 'meta':
                metaTableEntry = tableEntry;
                break;
        }
    }

    const nameTable = uncompressTable(data, nameTableEntry);
    font.tables.name = _tables_name__WEBPACK_IMPORTED_MODULE_21__["default"].parse(nameTable.data, nameTable.offset, ltagTable);
    font.names = font.tables.name;

    if (glyfTableEntry && locaTableEntry) {
        const shortVersion = indexToLocFormat === 0;
        const locaTable = uncompressTable(data, locaTableEntry);
        const locaOffsets = _tables_loca__WEBPACK_IMPORTED_MODULE_19__["default"].parse(locaTable.data, locaTable.offset, font.numGlyphs, shortVersion);
        const glyfTable = uncompressTable(data, glyfTableEntry);
        font.glyphs = _tables_glyf__WEBPACK_IMPORTED_MODULE_11__["default"].parse(glyfTable.data, glyfTable.offset, locaOffsets, font);
    } else if (cffTableEntry) {
        const cffTable = uncompressTable(data, cffTableEntry);
        _tables_cff__WEBPACK_IMPORTED_MODULE_9__["default"].parse(cffTable.data, cffTable.offset, font);
    } else {
        throw new Error('Font doesn\'t contain TrueType or CFF outlines.');
    }

    const hmtxTable = uncompressTable(data, hmtxTableEntry);
    _tables_hmtx__WEBPACK_IMPORTED_MODULE_16__["default"].parse(hmtxTable.data, hmtxTable.offset, font.numberOfHMetrics, font.numGlyphs, font.glyphs);
    (0,_encoding__WEBPACK_IMPORTED_MODULE_3__.addGlyphNames)(font);

    if (kernTableEntry) {
        const kernTable = uncompressTable(data, kernTableEntry);
        font.kerningPairs = _tables_kern__WEBPACK_IMPORTED_MODULE_17__["default"].parse(kernTable.data, kernTable.offset);
    } else {
        font.kerningPairs = {};
    }

    if (gposTableEntry) {
        const gposTable = uncompressTable(data, gposTableEntry);
        _tables_gpos__WEBPACK_IMPORTED_MODULE_12__["default"].parse(gposTable.data, gposTable.offset, font);
    }

    if (gsubTableEntry) {
        const gsubTable = uncompressTable(data, gsubTableEntry);
        font.tables.gsub = _tables_gsub__WEBPACK_IMPORTED_MODULE_13__["default"].parse(gsubTable.data, gsubTable.offset);
    }

    if (fvarTableEntry) {
        const fvarTable = uncompressTable(data, fvarTableEntry);
        font.tables.fvar = _tables_fvar__WEBPACK_IMPORTED_MODULE_10__["default"].parse(fvarTable.data, fvarTable.offset, font.names);
    }

    if (metaTableEntry) {
        const metaTable = uncompressTable(data, metaTableEntry);
        font.tables.meta = _tables_meta__WEBPACK_IMPORTED_MODULE_24__["default"].parse(metaTable.data, metaTable.offset);
        font.metas = font.tables.meta;
    }

    return font;
}

/**
 * Asynchronously load the font from a URL or a filesystem. When done, call the callback
 * with two arguments `(err, font)`. The `err` will be null on success,
 * the `font` is a Font object.
 * We use the node.js callback convention so that
 * opentype.js can integrate with frameworks like async.js.
 * @alias opentype.load
 * @param  {string} url - The URL of the font to load.
 * @param  {Function} callback - The callback.
 */
function load(url, callback) {
    const isNode = typeof window === 'undefined';
    const loadFn = isNode ? loadFromFile : loadFromUrl;
    loadFn(url, function(err, arrayBuffer) {
        if (err) {
            return callback(err);
        }
        let font;
        try {
            font = parseBuffer(arrayBuffer);
        } catch (e) {
            return callback(e, null);
        }
        return callback(null, font);
    });
}

/**
 * Synchronously load the font from a URL or file.
 * When done, returns the font object or throws an error.
 * @alias opentype.loadSync
 * @param  {string} url - The URL of the font to load.
 * @return {opentype.Font}
 */
function loadSync(url) {
    const fs = __webpack_require__(/*! fs */ "?5e0b");
    const buffer = fs.readFileSync(url);
    return parseBuffer((0,_util__WEBPACK_IMPORTED_MODULE_7__.nodeBufferToArrayBuffer)(buffer));
}




/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Parser: () => (/* binding */ Parser),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
// Parsing utility functions



// Retrieve an unsigned byte from the DataView.
function getByte(dataView, offset) {
    return dataView.getUint8(offset);
}

// Retrieve an unsigned 16-bit short from the DataView.
// The value is stored in big endian.
function getUShort(dataView, offset) {
    return dataView.getUint16(offset, false);
}

// Retrieve a signed 16-bit short from the DataView.
// The value is stored in big endian.
function getShort(dataView, offset) {
    return dataView.getInt16(offset, false);
}

// Retrieve an unsigned 32-bit long from the DataView.
// The value is stored in big endian.
function getULong(dataView, offset) {
    return dataView.getUint32(offset, false);
}

// Retrieve a 32-bit signed fixed-point number (16.16) from the DataView.
// The value is stored in big endian.
function getFixed(dataView, offset) {
    const decimal = dataView.getInt16(offset, false);
    const fraction = dataView.getUint16(offset + 2, false);
    return decimal + fraction / 65535;
}

// Retrieve a 4-character tag from the DataView.
// Tags are used to identify tables.
function getTag(dataView, offset) {
    let tag = '';
    for (let i = offset; i < offset + 4; i += 1) {
        tag += String.fromCharCode(dataView.getInt8(i));
    }

    return tag;
}

// Retrieve an offset from the DataView.
// Offsets are 1 to 4 bytes in length, depending on the offSize argument.
function getOffset(dataView, offset, offSize) {
    let v = 0;
    for (let i = 0; i < offSize; i += 1) {
        v <<= 8;
        v += dataView.getUint8(offset + i);
    }

    return v;
}

// Retrieve a number of bytes from start offset to the end offset from the DataView.
function getBytes(dataView, startOffset, endOffset) {
    const bytes = [];
    for (let i = startOffset; i < endOffset; i += 1) {
        bytes.push(dataView.getUint8(i));
    }

    return bytes;
}

// Convert the list of bytes to a string.
function bytesToString(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i += 1) {
        s += String.fromCharCode(bytes[i]);
    }

    return s;
}

const typeOffsets = {
    byte: 1,
    uShort: 2,
    short: 2,
    uLong: 4,
    fixed: 4,
    longDateTime: 8,
    tag: 4
};

// A stateful parser that changes the offset whenever a value is retrieved.
// The data is a DataView.
function Parser(data, offset) {
    this.data = data;
    this.offset = offset;
    this.relativeOffset = 0;
}

Parser.prototype.parseByte = function() {
    const v = this.data.getUint8(this.offset + this.relativeOffset);
    this.relativeOffset += 1;
    return v;
};

Parser.prototype.parseChar = function() {
    const v = this.data.getInt8(this.offset + this.relativeOffset);
    this.relativeOffset += 1;
    return v;
};

Parser.prototype.parseCard8 = Parser.prototype.parseByte;

Parser.prototype.parseUShort = function() {
    const v = this.data.getUint16(this.offset + this.relativeOffset);
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
Parser.prototype.parseSID = Parser.prototype.parseUShort;
Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;

Parser.prototype.parseShort = function() {
    const v = this.data.getInt16(this.offset + this.relativeOffset);
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseF2Dot14 = function() {
    const v = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
    this.relativeOffset += 2;
    return v;
};

Parser.prototype.parseULong = function() {
    const v = getULong(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v;
};

Parser.prototype.parseFixed = function() {
    const v = getFixed(this.data, this.offset + this.relativeOffset);
    this.relativeOffset += 4;
    return v;
};

Parser.prototype.parseString = function(length) {
    const dataView = this.data;
    const offset = this.offset + this.relativeOffset;
    let string = '';
    this.relativeOffset += length;
    for (let i = 0; i < length; i++) {
        string += String.fromCharCode(dataView.getUint8(offset + i));
    }

    return string;
};

Parser.prototype.parseTag = function() {
    return this.parseString(4);
};

// LONGDATETIME is a 64-bit integer.
// JavaScript and unix timestamps traditionally use 32 bits, so we
// only take the last 32 bits.
// + Since until 2038 those bits will be filled by zeros we can ignore them.
Parser.prototype.parseLongDateTime = function() {
    let v = getULong(this.data, this.offset + this.relativeOffset + 4);
    // Subtract seconds between 01/01/1904 and 01/01/1970
    // to convert Apple Mac timestamp to Standard Unix timestamp
    v -= 2082844800;
    this.relativeOffset += 8;
    return v;
};

Parser.prototype.parseVersion = function() {
    const major = getUShort(this.data, this.offset + this.relativeOffset);

    // How to interpret the minor version is very vague in the spec. 0x5000 is 5, 0x1000 is 1
    // This returns the correct number if minor = 0xN000 where N is 0-9
    const minor = getUShort(this.data, this.offset + this.relativeOffset + 2);
    this.relativeOffset += 4;
    return major + minor / 0x1000 / 10;
};

Parser.prototype.skip = function(type, amount) {
    if (amount === undefined) {
        amount = 1;
    }

    this.relativeOffset += typeOffsets[type] * amount;
};

///// Parsing lists and records ///////////////////////////////

// Parse a list of 16 bit unsigned integers. The length of the list can be read on the stream
// or provided as an argument.
Parser.prototype.parseOffset16List =
Parser.prototype.parseUShortList = function(count) {
    if (count === undefined) { count = this.parseUShort(); }
    const offsets = new Array(count);
    const dataView = this.data;
    let offset = this.offset + this.relativeOffset;
    for (let i = 0; i < count; i++) {
        offsets[i] = dataView.getUint16(offset);
        offset += 2;
    }

    this.relativeOffset += count * 2;
    return offsets;
};

// Parses a list of 16 bit signed integers.
Parser.prototype.parseShortList = function(count) {
    const list = new Array(count);
    const dataView = this.data;
    let offset = this.offset + this.relativeOffset;
    for (let i = 0; i < count; i++) {
        list[i] = dataView.getInt16(offset);
        offset += 2;
    }

    this.relativeOffset += count * 2;
    return list;
};

// Parses a list of bytes.
Parser.prototype.parseByteList = function(count) {
    const list = new Array(count);
    const dataView = this.data;
    let offset = this.offset + this.relativeOffset;
    for (let i = 0; i < count; i++) {
        list[i] = dataView.getUint8(offset++);
    }

    this.relativeOffset += count;
    return list;
};

/**
 * Parse a list of items.
 * Record count is optional, if omitted it is read from the stream.
 * itemCallback is one of the Parser methods.
 */
Parser.prototype.parseList = function(count, itemCallback) {
    if (!itemCallback) {
        itemCallback = count;
        count = this.parseUShort();
    }
    const list = new Array(count);
    for (let i = 0; i < count; i++) {
        list[i] = itemCallback.call(this);
    }
    return list;
};

/**
 * Parse a list of records.
 * Record count is optional, if omitted it is read from the stream.
 * Example of recordDescription: { sequenceIndex: Parser.uShort, lookupListIndex: Parser.uShort }
 */
Parser.prototype.parseRecordList = function(count, recordDescription) {
    // If the count argument is absent, read it in the stream.
    if (!recordDescription) {
        recordDescription = count;
        count = this.parseUShort();
    }
    const records = new Array(count);
    const fields = Object.keys(recordDescription);
    for (let i = 0; i < count; i++) {
        const rec = {};
        for (let j = 0; j < fields.length; j++) {
            const fieldName = fields[j];
            const fieldType = recordDescription[fieldName];
            rec[fieldName] = fieldType.call(this);
        }
        records[i] = rec;
    }
    return records;
};

// Parse a data structure into an object
// Example of description: { sequenceIndex: Parser.uShort, lookupListIndex: Parser.uShort }
Parser.prototype.parseStruct = function(description) {
    if (typeof description === 'function') {
        return description.call(this);
    } else {
        const fields = Object.keys(description);
        const struct = {};
        for (let j = 0; j < fields.length; j++) {
            const fieldName = fields[j];
            const fieldType = description[fieldName];
            struct[fieldName] = fieldType.call(this);
        }
        return struct;
    }
};

Parser.prototype.parsePointer = function(description) {
    const structOffset = this.parseOffset16();
    if (structOffset > 0) {                         // NULL offset => return undefined
        return new Parser(this.data, this.offset + structOffset).parseStruct(description);
    }
    return undefined;
};

/**
 * Parse a list of offsets to lists of 16-bit integers,
 * or a list of offsets to lists of offsets to any kind of items.
 * If itemCallback is not provided, a list of list of UShort is assumed.
 * If provided, itemCallback is called on each item and must parse the item.
 * See examples in tables/gsub.js
 */
Parser.prototype.parseListOfLists = function(itemCallback) {
    const offsets = this.parseOffset16List();
    const count = offsets.length;
    const relativeOffset = this.relativeOffset;
    const list = new Array(count);
    for (let i = 0; i < count; i++) {
        const start = offsets[i];
        if (start === 0) {                  // NULL offset
            list[i] = undefined;            // Add i as owned property to list. Convenient with assert.
            continue;
        }
        this.relativeOffset = start;
        if (itemCallback) {
            const subOffsets = this.parseOffset16List();
            const subList = new Array(subOffsets.length);
            for (let j = 0; j < subOffsets.length; j++) {
                this.relativeOffset = start + subOffsets[j];
                subList[j] = itemCallback.call(this);
            }
            list[i] = subList;
        } else {
            list[i] = this.parseUShortList();
        }
    }
    this.relativeOffset = relativeOffset;
    return list;
};

///// Complex tables parsing //////////////////////////////////

// Parse a coverage table in a GSUB, GPOS or GDEF table.
// https://www.microsoft.com/typography/OTSPEC/chapter2.htm
// parser.offset must point to the start of the table containing the coverage.
Parser.prototype.parseCoverage = function() {
    const startOffset = this.offset + this.relativeOffset;
    const format = this.parseUShort();
    const count = this.parseUShort();
    if (format === 1) {
        return {
            format: 1,
            glyphs: this.parseUShortList(count)
        };
    } else if (format === 2) {
        const ranges = new Array(count);
        for (let i = 0; i < count; i++) {
            ranges[i] = {
                start: this.parseUShort(),
                end: this.parseUShort(),
                index: this.parseUShort()
            };
        }
        return {
            format: 2,
            ranges: ranges
        };
    }
    throw new Error('0x' + startOffset.toString(16) + ': Coverage format must be 1 or 2.');
};

// Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
// https://www.microsoft.com/typography/OTSPEC/chapter2.htm
Parser.prototype.parseClassDef = function() {
    const startOffset = this.offset + this.relativeOffset;
    const format = this.parseUShort();
    if (format === 1) {
        return {
            format: 1,
            startGlyph: this.parseUShort(),
            classes: this.parseUShortList()
        };
    } else if (format === 2) {
        return {
            format: 2,
            ranges: this.parseRecordList({
                start: Parser.uShort,
                end: Parser.uShort,
                classId: Parser.uShort
            })
        };
    }
    throw new Error('0x' + startOffset.toString(16) + ': ClassDef format must be 1 or 2.');
};

///// Static methods ///////////////////////////////////
// These convenience methods can be used as callbacks and should be called with "this" context set to a Parser instance.

Parser.list = function(count, itemCallback) {
    return function() {
        return this.parseList(count, itemCallback);
    };
};

Parser.recordList = function(count, recordDescription) {
    return function() {
        return this.parseRecordList(count, recordDescription);
    };
};

Parser.pointer = function(description) {
    return function() {
        return this.parsePointer(description);
    };
};

Parser.tag = Parser.prototype.parseTag;
Parser.byte = Parser.prototype.parseByte;
Parser.uShort = Parser.offset16 = Parser.prototype.parseUShort;
Parser.uShortList = Parser.prototype.parseUShortList;
Parser.struct = Parser.prototype.parseStruct;
Parser.coverage = Parser.prototype.parseCoverage;
Parser.classDef = Parser.prototype.parseClassDef;

///// Script, Feature, Lookup lists ///////////////////////////////////////////////
// https://www.microsoft.com/typography/OTSPEC/chapter2.htm

const langSysTable = {
    reserved: Parser.uShort,
    reqFeatureIndex: Parser.uShort,
    featureIndexes: Parser.uShortList
};

Parser.prototype.parseScriptList = function() {
    return this.parsePointer(Parser.recordList({
        tag: Parser.tag,
        script: Parser.pointer({
            defaultLangSys: Parser.pointer(langSysTable),
            langSysRecords: Parser.recordList({
                tag: Parser.tag,
                langSys: Parser.pointer(langSysTable)
            })
        })
    }));
};

Parser.prototype.parseFeatureList = function() {
    return this.parsePointer(Parser.recordList({
        tag: Parser.tag,
        feature: Parser.pointer({
            featureParams: Parser.offset16,
            lookupListIndexes: Parser.uShortList
        })
    }));
};

Parser.prototype.parseLookupList = function(lookupTableParsers) {
    return this.parsePointer(Parser.list(Parser.pointer(function() {
        const lookupType = this.parseUShort();
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(1 <= lookupType && lookupType <= 8, 'GSUB lookup type ' + lookupType + ' unknown.');
        const lookupFlag = this.parseUShort();
        const useMarkFilteringSet = lookupFlag & 0x10;
        return {
            lookupType: lookupType,
            lookupFlag: lookupFlag,
            subtables: this.parseList(Parser.pointer(lookupTableParsers[lookupType])),
            markFilteringSet: useMarkFilteringSet ? this.parseUShort() : undefined
        };
    })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    getByte,
    getCard8: getByte,
    getUShort,
    getCard16: getUShort,
    getShort,
    getULong,
    getFixed,
    getTag,
    getOffset,
    getBytes,
    bytesToString,
    Parser,
});




/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js":
/*!************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/bbox.js");
// Geometric objects



/**
 * A bézier path containing a set of path commands similar to a SVG path.
 * Paths can be drawn on a context using `draw`.
 * @exports opentype.Path
 * @class
 * @constructor
 */
function Path() {
    this.commands = [];
    this.fill = 'black';
    this.stroke = null;
    this.strokeWidth = 1;
}

/**
 * @param  {number} x
 * @param  {number} y
 */
Path.prototype.moveTo = function(x, y) {
    this.commands.push({
        type: 'M',
        x: x,
        y: y
    });
};

/**
 * @param  {number} x
 * @param  {number} y
 */
Path.prototype.lineTo = function(x, y) {
    this.commands.push({
        type: 'L',
        x: x,
        y: y
    });
};

/**
 * Draws cubic curve
 * @function
 * curveTo
 * @memberof opentype.Path.prototype
 * @param  {number} x1 - x of control 1
 * @param  {number} y1 - y of control 1
 * @param  {number} x2 - x of control 2
 * @param  {number} y2 - y of control 2
 * @param  {number} x - x of path point
 * @param  {number} y - y of path point
 */

/**
 * Draws cubic curve
 * @function
 * bezierCurveTo
 * @memberof opentype.Path.prototype
 * @param  {number} x1 - x of control 1
 * @param  {number} y1 - y of control 1
 * @param  {number} x2 - x of control 2
 * @param  {number} y2 - y of control 2
 * @param  {number} x - x of path point
 * @param  {number} y - y of path point
 * @see curveTo
 */
Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x2, y2, x, y) {
    this.commands.push({
        type: 'C',
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x: x,
        y: y
    });
};

/**
 * Draws quadratic curve
 * @function
 * quadraticCurveTo
 * @memberof opentype.Path.prototype
 * @param  {number} x1 - x of control
 * @param  {number} y1 - y of control
 * @param  {number} x - x of path point
 * @param  {number} y - y of path point
 */

/**
 * Draws quadratic curve
 * @function
 * quadTo
 * @memberof opentype.Path.prototype
 * @param  {number} x1 - x of control
 * @param  {number} y1 - y of control
 * @param  {number} x - x of path point
 * @param  {number} y - y of path point
 */
Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x, y) {
    this.commands.push({
        type: 'Q',
        x1: x1,
        y1: y1,
        x: x,
        y: y
    });
};

/**
 * Closes the path
 * @function closePath
 * @memberof opentype.Path.prototype
 */

/**
 * Close the path
 * @function close
 * @memberof opentype.Path.prototype
 */
Path.prototype.close = Path.prototype.closePath = function() {
    this.commands.push({
        type: 'Z'
    });
};

/**
 * Add the given path or list of commands to the commands of this path.
 * @param  {Array} pathOrCommands - another opentype.Path, an opentype.BoundingBox, or an array of commands.
 */
Path.prototype.extend = function(pathOrCommands) {
    if (pathOrCommands.commands) {
        pathOrCommands = pathOrCommands.commands;
    } else if (pathOrCommands instanceof _bbox__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        const box = pathOrCommands;
        this.moveTo(box.x1, box.y1);
        this.lineTo(box.x2, box.y1);
        this.lineTo(box.x2, box.y2);
        this.lineTo(box.x1, box.y2);
        this.close();
        return;
    }

    Array.prototype.push.apply(this.commands, pathOrCommands);
};

/**
 * Calculate the bounding box of the path.
 * @returns {opentype.BoundingBox}
 */
Path.prototype.getBoundingBox = function() {
    const box = new _bbox__WEBPACK_IMPORTED_MODULE_0__["default"]();

    let startX = 0;
    let startY = 0;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i < this.commands.length; i++) {
        const cmd = this.commands[i];
        switch (cmd.type) {
            case 'M':
                box.addPoint(cmd.x, cmd.y);
                startX = prevX = cmd.x;
                startY = prevY = cmd.y;
                break;
            case 'L':
                box.addPoint(cmd.x, cmd.y);
                prevX = cmd.x;
                prevY = cmd.y;
                break;
            case 'Q':
                box.addQuad(prevX, prevY, cmd.x1, cmd.y1, cmd.x, cmd.y);
                prevX = cmd.x;
                prevY = cmd.y;
                break;
            case 'C':
                box.addBezier(prevX, prevY, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
                prevX = cmd.x;
                prevY = cmd.y;
                break;
            case 'Z':
                prevX = startX;
                prevY = startY;
                break;
            default:
                throw new Error('Unexpected path command ' + cmd.type);
        }
    }
    if (box.isEmpty()) {
        box.addPoint(0, 0);
    }
    return box;
};

/**
 * Draw the path to a 2D context.
 * @param {CanvasRenderingContext2D} ctx - A 2D drawing context.
 */
Path.prototype.draw = function(ctx) {
    ctx.beginPath();
    for (let i = 0; i < this.commands.length; i += 1) {
        const cmd = this.commands[i];
        if (cmd.type === 'M') {
            ctx.moveTo(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            ctx.lineTo(cmd.x, cmd.y);
        } else if (cmd.type === 'C') {
            ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            ctx.closePath();
        }
    }

    if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
    }

    if (this.stroke) {
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();
    }
};

/**
 * Convert the Path to a string of path data instructions
 * See http://www.w3.org/TR/SVG/paths.html#PathData
 * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
 * @return {string}
 */
Path.prototype.toPathData = function(decimalPlaces) {
    decimalPlaces = decimalPlaces !== undefined ? decimalPlaces : 2;

    function floatToString(v) {
        if (Math.round(v) === v) {
            return '' + Math.round(v);
        } else {
            return v.toFixed(decimalPlaces);
        }
    }

    function packValues() {
        let s = '';
        for (let i = 0; i < arguments.length; i += 1) {
            const v = arguments[i];
            if (v >= 0 && i > 0) {
                s += ' ';
            }

            s += floatToString(v);
        }

        return s;
    }

    let d = '';
    for (let i = 0; i < this.commands.length; i += 1) {
        const cmd = this.commands[i];
        if (cmd.type === 'M') {
            d += 'M' + packValues(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            d += 'L' + packValues(cmd.x, cmd.y);
        } else if (cmd.type === 'C') {
            d += 'C' + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === 'Q') {
            d += 'Q' + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === 'Z') {
            d += 'Z';
        }
    }

    return d;
};

/**
 * Convert the path to an SVG <path> element, as a string.
 * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
 * @return {string}
 */
Path.prototype.toSVG = function(decimalPlaces) {
    let svg = '<path d="';
    svg += this.toPathData(decimalPlaces);
    svg += '"';
    if (this.fill && this.fill !== 'black') {
        if (this.fill === null) {
            svg += ' fill="none"';
        } else {
            svg += ' fill="' + this.fill + '"';
        }
    }

    if (this.stroke) {
        svg += ' stroke="' + this.stroke + '" stroke-width="' + this.strokeWidth + '"';
    }

    svg += '/>';
    return svg;
};

/**
 * Convert the path to a DOM element.
 * @param  {number} [decimalPlaces=2] - The amount of decimal places for floating-point values
 * @return {SVGPathElement}
 */
Path.prototype.toDOMElement = function(decimalPlaces) {
    const temporaryPath = this.toPathData(decimalPlaces);
    const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    newPath.setAttribute('d', temporaryPath);

    return newPath;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Path);


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/substitution.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/substitution.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/layout.js");
// The Substitution object provides utility methods to manipulate
// the GSUB substitution table.




/**
 * @exports opentype.Substitution
 * @class
 * @extends opentype.Layout
 * @param {opentype.Font}
 * @constructor
 */
function Substitution(font) {
    _layout__WEBPACK_IMPORTED_MODULE_1__["default"].call(this, font, 'gsub');
}

// Check if 2 arrays of primitives are equal.
function arraysEqual(ar1, ar2) {
    const n = ar1.length;
    if (n !== ar2.length) { return false; }
    for (let i = 0; i < n; i++) {
        if (ar1[i] !== ar2[i]) { return false; }
    }
    return true;
}

// Find the first subtable of a lookup table in a particular format.
function getSubstFormat(lookupTable, format, defaultSubtable) {
    const subtables = lookupTable.subtables;
    for (let i = 0; i < subtables.length; i++) {
        const subtable = subtables[i];
        if (subtable.substFormat === format) {
            return subtable;
        }
    }
    if (defaultSubtable) {
        subtables.push(defaultSubtable);
        return defaultSubtable;
    }
    return undefined;
}

Substitution.prototype = _layout__WEBPACK_IMPORTED_MODULE_1__["default"].prototype;

/**
 * Create a default GSUB table.
 * @return {Object} gsub - The GSUB table.
 */
Substitution.prototype.createDefaultTable = function() {
    // Generate a default empty GSUB table with just a DFLT script and dflt lang sys.
    return {
        version: 1,
        scripts: [{
            tag: 'DFLT',
            script: {
                defaultLangSys: { reserved: 0, reqFeatureIndex: 0xffff, featureIndexes: [] },
                langSysRecords: []
            }
        }],
        features: [],
        lookups: []
    };
};

/**
 * List all single substitutions (lookup type 1) for a given script, language, and feature.
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 * @param {string} feature - 4-character feature name ('aalt', 'salt', 'ss01'...)
 * @return {Array} substitutions - The list of substitutions.
 */
Substitution.prototype.getSingle = function(feature, script, language) {
    const substitutions = [];
    const lookupTables = this.getLookupTables(script, language, feature, 1);
    for (let idx = 0; idx < lookupTables.length; idx++) {
        const subtables = lookupTables[idx].subtables;
        for (let i = 0; i < subtables.length; i++) {
            const subtable = subtables[i];
            const glyphs = this.expandCoverage(subtable.coverage);
            let j;
            if (subtable.substFormat === 1) {
                const delta = subtable.deltaGlyphId;
                for (j = 0; j < glyphs.length; j++) {
                    const glyph = glyphs[j];
                    substitutions.push({ sub: glyph, by: glyph + delta });
                }
            } else {
                const substitute = subtable.substitute;
                for (j = 0; j < glyphs.length; j++) {
                    substitutions.push({ sub: glyphs[j], by: substitute[j] });
                }
            }
        }
    }
    return substitutions;
};

/**
 * List all alternates (lookup type 3) for a given script, language, and feature.
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 * @param {string} feature - 4-character feature name ('aalt', 'salt'...)
 * @return {Array} alternates - The list of alternates
 */
Substitution.prototype.getAlternates = function(feature, script, language) {
    const alternates = [];
    const lookupTables = this.getLookupTables(script, language, feature, 3);
    for (let idx = 0; idx < lookupTables.length; idx++) {
        const subtables = lookupTables[idx].subtables;
        for (let i = 0; i < subtables.length; i++) {
            const subtable = subtables[i];
            const glyphs = this.expandCoverage(subtable.coverage);
            const alternateSets = subtable.alternateSets;
            for (let j = 0; j < glyphs.length; j++) {
                alternates.push({ sub: glyphs[j], by: alternateSets[j] });
            }
        }
    }
    return alternates;
};

/**
 * List all ligatures (lookup type 4) for a given script, language, and feature.
 * The result is an array of ligature objects like { sub: [ids], by: id }
 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 * @return {Array} ligatures - The list of ligatures.
 */
Substitution.prototype.getLigatures = function(feature, script, language) {
    const ligatures = [];
    const lookupTables = this.getLookupTables(script, language, feature, 4);
    for (let idx = 0; idx < lookupTables.length; idx++) {
        const subtables = lookupTables[idx].subtables;
        for (let i = 0; i < subtables.length; i++) {
            const subtable = subtables[i];
            const glyphs = this.expandCoverage(subtable.coverage);
            const ligatureSets = subtable.ligatureSets;
            for (let j = 0; j < glyphs.length; j++) {
                const startGlyph = glyphs[j];
                const ligSet = ligatureSets[j];
                for (let k = 0; k < ligSet.length; k++) {
                    const lig = ligSet[k];
                    ligatures.push({
                        sub: [startGlyph].concat(lig.components),
                        by: lig.ligGlyph
                    });
                }
            }
        }
    }
    return ligatures;
};

/**
 * Add or modify a single substitution (lookup type 1)
 * Format 2, more flexible, is always used.
 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
 * @param {Object} substitution - { sub: id, delta: number } for format 1 or { sub: id, by: id } for format 2.
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 */
Substitution.prototype.addSingle = function(feature, substitution, script, language) {
    const lookupTable = this.getLookupTables(script, language, feature, 1, true)[0];
    const subtable = getSubstFormat(lookupTable, 2, {                // lookup type 1 subtable, format 2, coverage format 1
        substFormat: 2,
        coverage: {format: 1, glyphs: []},
        substitute: []
    });
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(subtable.coverage.format === 1, 'Ligature: unable to modify coverage table format ' + subtable.coverage.format);
    const coverageGlyph = substitution.sub;
    let pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
    if (pos < 0) {
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.substitute.splice(pos, 0, 0);
    }
    subtable.substitute[pos] = substitution.by;
};

/**
 * Add or modify an alternate substitution (lookup type 1)
 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
 * @param {Object} substitution - { sub: id, by: [ids] }
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 */
Substitution.prototype.addAlternate = function(feature, substitution, script, language) {
    const lookupTable = this.getLookupTables(script, language, feature, 3, true)[0];
    const subtable = getSubstFormat(lookupTable, 1, {                // lookup type 3 subtable, format 1, coverage format 1
        substFormat: 1,
        coverage: {format: 1, glyphs: []},
        alternateSets: []
    });
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(subtable.coverage.format === 1, 'Ligature: unable to modify coverage table format ' + subtable.coverage.format);
    const coverageGlyph = substitution.sub;
    let pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
    if (pos < 0) {
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.alternateSets.splice(pos, 0, 0);
    }
    subtable.alternateSets[pos] = substitution.by;
};

/**
 * Add a ligature (lookup type 4)
 * Ligatures with more components must be stored ahead of those with fewer components in order to be found
 * @param {string} feature - 4-letter feature name ('liga', 'rlig', 'dlig'...)
 * @param {Object} ligature - { sub: [ids], by: id }
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 */
Substitution.prototype.addLigature = function(feature, ligature, script, language) {
    const lookupTable = this.getLookupTables(script, language, feature, 4, true)[0];
    let subtable = lookupTable.subtables[0];
    if (!subtable) {
        subtable = {                // lookup type 4 subtable, format 1, coverage format 1
            substFormat: 1,
            coverage: { format: 1, glyphs: [] },
            ligatureSets: []
        };
        lookupTable.subtables[0] = subtable;
    }
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(subtable.coverage.format === 1, 'Ligature: unable to modify coverage table format ' + subtable.coverage.format);
    const coverageGlyph = ligature.sub[0];
    const ligComponents = ligature.sub.slice(1);
    const ligatureTable = {
        ligGlyph: ligature.by,
        components: ligComponents
    };
    let pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
    if (pos >= 0) {
        // ligatureSet already exists
        const ligatureSet = subtable.ligatureSets[pos];
        for (let i = 0; i < ligatureSet.length; i++) {
            // If ligature already exists, return.
            if (arraysEqual(ligatureSet[i].components, ligComponents)) {
                return;
            }
        }
        // ligature does not exist: add it.
        ligatureSet.push(ligatureTable);
    } else {
        // Create a new ligatureSet and add coverage for the first glyph.
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.ligatureSets.splice(pos, 0, [ligatureTable]);
    }
};

/**
 * List all feature data for a given script and language.
 * @param {string} feature - 4-letter feature name
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 * @return {Array} substitutions - The list of substitutions.
 */
Substitution.prototype.getFeature = function(feature, script, language) {
    if (/ss\d\d/.test(feature)) {               // ss01 - ss20
        return this.getSingle(feature, script, language);
    }
    switch (feature) {
        case 'aalt':
        case 'salt':
            return this.getSingle(feature, script, language)
                    .concat(this.getAlternates(feature, script, language));
        case 'dlig':
        case 'liga':
        case 'rlig': return this.getLigatures(feature, script, language);
    }
    return undefined;
};

/**
 * Add a substitution to a feature for a given script and language.
 * @param {string} feature - 4-letter feature name
 * @param {Object} sub - the substitution to add (an object like { sub: id or [ids], by: id or [ids] })
 * @param {string} [script='DFLT']
 * @param {string} [language='dflt']
 */
Substitution.prototype.add = function(feature, sub, script, language) {
    if (/ss\d\d/.test(feature)) {               // ss01 - ss20
        return this.addSingle(feature, sub, script, language);
    }
    switch (feature) {
        case 'aalt':
        case 'salt':
            if (typeof sub.by === 'number') {
                return this.addSingle(feature, sub, script, language);
            }
            return this.addAlternate(feature, sub, script, language);
        case 'dlig':
        case 'liga':
        case 'rlig':
            return this.addLigature(feature, sub, script, language);
    }
    return undefined;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Substitution);


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/types.js");
// Table metadata




/**
 * @exports opentype.Table
 * @class
 * @param {string} tableName
 * @param {Array} fields
 * @param {Object} options
 * @constructor
 */
function Table(tableName, fields, options) {
    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];
        this[field.name] = field.value;
    }

    this.tableName = tableName;
    this.fields = fields;
    if (options) {
        const optionKeys = Object.keys(options);
        for (let i = 0; i < optionKeys.length; i += 1) {
            const k = optionKeys[i];
            const v = options[k];
            if (this[k] !== undefined) {
                this[k] = v;
            }
        }
    }
}

/**
 * Encodes the table and returns an array of bytes
 * @return {Array}
 */
Table.prototype.encode = function() {
    return _types__WEBPACK_IMPORTED_MODULE_1__.encode.TABLE(this);
};

/**
 * Get the size of the table.
 * @return {number}
 */
Table.prototype.sizeOf = function() {
    return _types__WEBPACK_IMPORTED_MODULE_1__.sizeOf.TABLE(this);
};

/**
 * @private
 */
function ushortList(itemName, list, count) {
    if (count === undefined) {
        count = list.length;
    }
    const fields = new Array(list.length + 1);
    fields[0] = {name: itemName + 'Count', type: 'USHORT', value: count};
    for (let i = 0; i < list.length; i++) {
        fields[i + 1] = {name: itemName + i, type: 'USHORT', value: list[i]};
    }
    return fields;
}

/**
 * @private
 */
function tableList(itemName, records, itemCallback) {
    const count = records.length;
    const fields = new Array(count + 1);
    fields[0] = {name: itemName + 'Count', type: 'USHORT', value: count};
    for (let i = 0; i < count; i++) {
        fields[i + 1] = {name: itemName + i, type: 'TABLE', value: itemCallback(records[i], i)};
    }
    return fields;
}

/**
 * @private
 */
function recordList(itemName, records, itemCallback) {
    const count = records.length;
    let fields = [];
    fields[0] = {name: itemName + 'Count', type: 'USHORT', value: count};
    for (let i = 0; i < count; i++) {
        fields = fields.concat(itemCallback(records[i], i));
    }
    return fields;
}

// Common Layout Tables

/**
 * @exports opentype.Coverage
 * @class
 * @param {opentype.Table}
 * @constructor
 * @extends opentype.Table
 */
function Coverage(coverageTable) {
    if (coverageTable.format === 1) {
        Table.call(this, 'coverageTable',
            [{name: 'coverageFormat', type: 'USHORT', value: 1}]
            .concat(ushortList('glyph', coverageTable.glyphs))
        );
    } else {
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(false, 'Can\'t create coverage table format 2 yet.');
    }
}
Coverage.prototype = Object.create(Table.prototype);
Coverage.prototype.constructor = Coverage;

function ScriptList(scriptListTable) {
    Table.call(this, 'scriptListTable',
        recordList('scriptRecord', scriptListTable, function(scriptRecord, i) {
            const script = scriptRecord.script;
            let defaultLangSys = script.defaultLangSys;
            _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(!!defaultLangSys, 'Unable to write GSUB: script ' + scriptRecord.tag + ' has no default language system.');
            return [
                {name: 'scriptTag' + i, type: 'TAG', value: scriptRecord.tag},
                {name: 'script' + i, type: 'TABLE', value: new Table('scriptTable', [
                    {name: 'defaultLangSys', type: 'TABLE', value: new Table('defaultLangSys', [
                        {name: 'lookupOrder', type: 'USHORT', value: 0},
                        {name: 'reqFeatureIndex', type: 'USHORT', value: defaultLangSys.reqFeatureIndex}]
                        .concat(ushortList('featureIndex', defaultLangSys.featureIndexes)))}
                    ].concat(recordList('langSys', script.langSysRecords, function(langSysRecord, i) {
                        const langSys = langSysRecord.langSys;
                        return [
                            {name: 'langSysTag' + i, type: 'TAG', value: langSysRecord.tag},
                            {name: 'langSys' + i, type: 'TABLE', value: new Table('langSys', [
                                {name: 'lookupOrder', type: 'USHORT', value: 0},
                                {name: 'reqFeatureIndex', type: 'USHORT', value: langSys.reqFeatureIndex}
                                ].concat(ushortList('featureIndex', langSys.featureIndexes)))}
                        ];
                    })))}
            ];
        })
    );
}
ScriptList.prototype = Object.create(Table.prototype);
ScriptList.prototype.constructor = ScriptList;

/**
 * @exports opentype.FeatureList
 * @class
 * @param {opentype.Table}
 * @constructor
 * @extends opentype.Table
 */
function FeatureList(featureListTable) {
    Table.call(this, 'featureListTable',
        recordList('featureRecord', featureListTable, function(featureRecord, i) {
            const feature = featureRecord.feature;
            return [
                {name: 'featureTag' + i, type: 'TAG', value: featureRecord.tag},
                {name: 'feature' + i, type: 'TABLE', value: new Table('featureTable', [
                    {name: 'featureParams', type: 'USHORT', value: feature.featureParams},
                    ].concat(ushortList('lookupListIndex', feature.lookupListIndexes)))}
            ];
        })
    );
}
FeatureList.prototype = Object.create(Table.prototype);
FeatureList.prototype.constructor = FeatureList;

/**
 * @exports opentype.LookupList
 * @class
 * @param {opentype.Table}
 * @param {Object}
 * @constructor
 * @extends opentype.Table
 */
function LookupList(lookupListTable, subtableMakers) {
    Table.call(this, 'lookupListTable', tableList('lookup', lookupListTable, function(lookupTable) {
        let subtableCallback = subtableMakers[lookupTable.lookupType];
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(!!subtableCallback, 'Unable to write GSUB lookup type ' + lookupTable.lookupType + ' tables.');
        return new Table('lookupTable', [
            {name: 'lookupType', type: 'USHORT', value: lookupTable.lookupType},
            {name: 'lookupFlag', type: 'USHORT', value: lookupTable.lookupFlag}
        ].concat(tableList('subtable', lookupTable.subtables, subtableCallback)));
    }));
}
LookupList.prototype = Object.create(Table.prototype);
LookupList.prototype.constructor = LookupList;

// Record = same as Table, but inlined (a Table has an offset and its data is further in the stream)
// Don't use offsets inside Records (probable bug), only in Tables.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    Table,
    Record: Table,
    Coverage,
    ScriptList,
    FeatureList,
    LookupList,
    ushortList,
    tableList,
    recordList,
});


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cff.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cff.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../encoding */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/encoding.js");
/* harmony import */ var _glyphset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glyphset */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyphset.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../path */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `CFF` table contains the glyph outlines in PostScript format.
// https://www.microsoft.com/typography/OTSPEC/cff.htm
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/cff.pdf
// http://download.microsoft.com/download/8/0/1/801a191c-029d-4af3-9642-555f6fe514ee/type2.pdf







// Custom equals function that can also check lists.
function equals(a, b) {
    if (a === b) {
        return true;
    } else if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }

        for (let i = 0; i < a.length; i += 1) {
            if (!equals(a[i], b[i])) {
                return false;
            }
        }

        return true;
    } else {
        return false;
    }
}

// Subroutines are encoded using the negative half of the number space.
// See type 2 chapter 4.7 "Subroutine operators".
function calcCFFSubroutineBias(subrs) {
    let bias;
    if (subrs.length < 1240) {
        bias = 107;
    } else if (subrs.length < 33900) {
        bias = 1131;
    } else {
        bias = 32768;
    }

    return bias;
}

// Parse a `CFF` INDEX array.
// An index array consists of a list of offsets, then a list of objects at those offsets.
function parseCFFIndex(data, start, conversionFn) {
    const offsets = [];
    const objects = [];
    const count = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getCard16(data, start);
    let objectOffset;
    let endOffset;
    if (count !== 0) {
        const offsetSize = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getByte(data, start + 2);
        objectOffset = start + ((count + 1) * offsetSize) + 2;
        let pos = start + 3;
        for (let i = 0; i < count + 1; i += 1) {
            offsets.push(_parse__WEBPACK_IMPORTED_MODULE_2__["default"].getOffset(data, pos, offsetSize));
            pos += offsetSize;
        }

        // The total size of the index array is 4 header bytes + the value of the last offset.
        endOffset = objectOffset + offsets[count];
    } else {
        endOffset = start + 2;
    }

    for (let i = 0; i < offsets.length - 1; i += 1) {
        let value = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
        if (conversionFn) {
            value = conversionFn(value);
        }

        objects.push(value);
    }

    return {objects: objects, startOffset: start, endOffset: endOffset};
}

// Parse a `CFF` DICT real value.
function parseFloatOperand(parser) {
    let s = '';
    const eof = 15;
    const lookup = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'E', 'E-', null, '-'];
    while (true) {
        const b = parser.parseByte();
        const n1 = b >> 4;
        const n2 = b & 15;

        if (n1 === eof) {
            break;
        }

        s += lookup[n1];

        if (n2 === eof) {
            break;
        }

        s += lookup[n2];
    }

    return parseFloat(s);
}

// Parse a `CFF` DICT operand.
function parseOperand(parser, b0) {
    let b1;
    let b2;
    let b3;
    let b4;
    if (b0 === 28) {
        b1 = parser.parseByte();
        b2 = parser.parseByte();
        return b1 << 8 | b2;
    }

    if (b0 === 29) {
        b1 = parser.parseByte();
        b2 = parser.parseByte();
        b3 = parser.parseByte();
        b4 = parser.parseByte();
        return b1 << 24 | b2 << 16 | b3 << 8 | b4;
    }

    if (b0 === 30) {
        return parseFloatOperand(parser);
    }

    if (b0 >= 32 && b0 <= 246) {
        return b0 - 139;
    }

    if (b0 >= 247 && b0 <= 250) {
        b1 = parser.parseByte();
        return (b0 - 247) * 256 + b1 + 108;
    }

    if (b0 >= 251 && b0 <= 254) {
        b1 = parser.parseByte();
        return -(b0 - 251) * 256 - b1 - 108;
    }

    throw new Error('Invalid b0 ' + b0);
}

// Convert the entries returned by `parseDict` to a proper dictionary.
// If a value is a list of one, it is unpacked.
function entriesToObject(entries) {
    const o = {};
    for (let i = 0; i < entries.length; i += 1) {
        const key = entries[i][0];
        const values = entries[i][1];
        let value;
        if (values.length === 1) {
            value = values[0];
        } else {
            value = values;
        }

        if (o.hasOwnProperty(key) && !isNaN(o[key])) {
            throw new Error('Object ' + o + ' already has key ' + key);
        }

        o[key] = value;
    }

    return o;
}

// Parse a `CFF` DICT object.
// A dictionary contains key-value pairs in a compact tokenized format.
function parseCFFDict(data, start, size) {
    start = start !== undefined ? start : 0;
    const parser = new _parse__WEBPACK_IMPORTED_MODULE_2__["default"].Parser(data, start);
    const entries = [];
    let operands = [];
    size = size !== undefined ? size : data.length;

    while (parser.relativeOffset < size) {
        let op = parser.parseByte();

        // The first byte for each dict item distinguishes between operator (key) and operand (value).
        // Values <= 21 are operators.
        if (op <= 21) {
            // Two-byte operators have an initial escape byte of 12.
            if (op === 12) {
                op = 1200 + parser.parseByte();
            }

            entries.push([op, operands]);
            operands = [];
        } else {
            // Since the operands (values) come before the operators (keys), we store all operands in a list
            // until we encounter an operator.
            operands.push(parseOperand(parser, op));
        }
    }

    return entriesToObject(entries);
}

// Given a String Index (SID), return the value of the string.
// Strings below index 392 are standard CFF strings and are not encoded in the font.
function getCFFString(strings, index) {
    if (index <= 390) {
        index = _encoding__WEBPACK_IMPORTED_MODULE_0__.cffStandardStrings[index];
    } else {
        index = strings[index - 391];
    }

    return index;
}

// Interpret a dictionary and return a new dictionary with readable keys and values for missing entries.
// This function takes `meta` which is a list of objects containing `operand`, `name` and `default`.
function interpretDict(dict, meta, strings) {
    const newDict = {};
    let value;

    // Because we also want to include missing values, we start out from the meta list
    // and lookup values in the dict.
    for (let i = 0; i < meta.length; i += 1) {
        const m = meta[i];

        if (Array.isArray(m.type)) {
            const values = [];
            values.length = m.type.length;
            for (let j = 0; j < m.type.length; j++) {
                value = dict[m.op] !== undefined ? dict[m.op][j] : undefined;
                if (value === undefined) {
                    value = m.value !== undefined && m.value[j] !== undefined ? m.value[j] : null;
                }
                if (m.type[j] === 'SID') {
                    value = getCFFString(strings, value);
                }
                values[j] = value;
            }
            newDict[m.name] = values;
        } else {
            value = dict[m.op];
            if (value === undefined) {
                value = m.value !== undefined ? m.value : null;
            }

            if (m.type === 'SID') {
                value = getCFFString(strings, value);
            }
            newDict[m.name] = value;
        }
    }

    return newDict;
}

// Parse the CFF header.
function parseCFFHeader(data, start) {
    const header = {};
    header.formatMajor = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getCard8(data, start);
    header.formatMinor = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getCard8(data, start + 1);
    header.size = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getCard8(data, start + 2);
    header.offsetSize = _parse__WEBPACK_IMPORTED_MODULE_2__["default"].getCard8(data, start + 3);
    header.startOffset = start;
    header.endOffset = start + 4;
    return header;
}

const TOP_DICT_META = [
    {name: 'version', op: 0, type: 'SID'},
    {name: 'notice', op: 1, type: 'SID'},
    {name: 'copyright', op: 1200, type: 'SID'},
    {name: 'fullName', op: 2, type: 'SID'},
    {name: 'familyName', op: 3, type: 'SID'},
    {name: 'weight', op: 4, type: 'SID'},
    {name: 'isFixedPitch', op: 1201, type: 'number', value: 0},
    {name: 'italicAngle', op: 1202, type: 'number', value: 0},
    {name: 'underlinePosition', op: 1203, type: 'number', value: -100},
    {name: 'underlineThickness', op: 1204, type: 'number', value: 50},
    {name: 'paintType', op: 1205, type: 'number', value: 0},
    {name: 'charstringType', op: 1206, type: 'number', value: 2},
    {
        name: 'fontMatrix',
        op: 1207,
        type: ['real', 'real', 'real', 'real', 'real', 'real'],
        value: [0.001, 0, 0, 0.001, 0, 0]
    },
    {name: 'uniqueId', op: 13, type: 'number'},
    {name: 'fontBBox', op: 5, type: ['number', 'number', 'number', 'number'], value: [0, 0, 0, 0]},
    {name: 'strokeWidth', op: 1208, type: 'number', value: 0},
    {name: 'xuid', op: 14, type: [], value: null},
    {name: 'charset', op: 15, type: 'offset', value: 0},
    {name: 'encoding', op: 16, type: 'offset', value: 0},
    {name: 'charStrings', op: 17, type: 'offset', value: 0},
    {name: 'private', op: 18, type: ['number', 'offset'], value: [0, 0]},
    {name: 'ros', op: 1230, type: ['SID', 'SID', 'number']},
    {name: 'cidFontVersion', op: 1231, type: 'number', value: 0},
    {name: 'cidFontRevision', op: 1232, type: 'number', value: 0},
    {name: 'cidFontType', op: 1233, type: 'number', value: 0},
    {name: 'cidCount', op: 1234, type: 'number', value: 8720},
    {name: 'uidBase', op: 1235, type: 'number'},
    {name: 'fdArray', op: 1236, type: 'offset'},
    {name: 'fdSelect', op: 1237, type: 'offset'},
    {name: 'fontName', op: 1238, type: 'SID'}
];

const PRIVATE_DICT_META = [
    {name: 'subrs', op: 19, type: 'offset', value: 0},
    {name: 'defaultWidthX', op: 20, type: 'number', value: 0},
    {name: 'nominalWidthX', op: 21, type: 'number', value: 0}
];

// Parse the CFF top dictionary. A CFF table can contain multiple fonts, each with their own top dictionary.
// The top dictionary contains the essential metadata for the font, together with the private dictionary.
function parseCFFTopDict(data, strings) {
    const dict = parseCFFDict(data, 0, data.byteLength);
    return interpretDict(dict, TOP_DICT_META, strings);
}

// Parse the CFF private dictionary. We don't fully parse out all the values, only the ones we need.
function parseCFFPrivateDict(data, start, size, strings) {
    const dict = parseCFFDict(data, start, size);
    return interpretDict(dict, PRIVATE_DICT_META, strings);
}

// Returns a list of "Top DICT"s found using an INDEX list.
// Used to read both the usual high-level Top DICTs and also the FDArray
// discovered inside CID-keyed fonts.  When a Top DICT has a reference to
// a Private DICT that is read and saved into the Top DICT.
//
// In addition to the expected/optional values as outlined in TOP_DICT_META
// the following values might be saved into the Top DICT.
//
//    _subrs []        array of local CFF subroutines from Private DICT
//    _subrsBias       bias value computed from number of subroutines
//                      (see calcCFFSubroutineBias() and parseCFFCharstring())
//    _defaultWidthX   default widths for CFF characters
//    _nominalWidthX   bias added to width embedded within glyph description
//
//    _privateDict     saved copy of parsed Private DICT from Top DICT
function gatherCFFTopDicts(data, start, cffIndex, strings) {
    const topDictArray = [];
    for (let iTopDict = 0; iTopDict < cffIndex.length; iTopDict += 1) {
        const topDictData = new DataView(new Uint8Array(cffIndex[iTopDict]).buffer);
        const topDict = parseCFFTopDict(topDictData, strings);
        topDict._subrs = [];
        topDict._subrsBias = 0;
        const privateSize = topDict.private[0];
        const privateOffset = topDict.private[1];
        if (privateSize !== 0 && privateOffset !== 0) {
            const privateDict = parseCFFPrivateDict(data, privateOffset + start, privateSize, strings);
            topDict._defaultWidthX = privateDict.defaultWidthX;
            topDict._nominalWidthX = privateDict.nominalWidthX;
            if (privateDict.subrs !== 0) {
                const subrOffset = privateOffset + privateDict.subrs;
                const subrIndex = parseCFFIndex(data, subrOffset + start);
                topDict._subrs = subrIndex.objects;
                topDict._subrsBias = calcCFFSubroutineBias(topDict._subrs);
            }
            topDict._privateDict = privateDict;
        }
        topDictArray.push(topDict);
    }
    return topDictArray;
}

// Parse the CFF charset table, which contains internal names for all the glyphs.
// This function will return a list of glyph names.
// See Adobe TN #5176 chapter 13, "Charsets".
function parseCFFCharset(data, start, nGlyphs, strings) {
    let sid;
    let count;
    const parser = new _parse__WEBPACK_IMPORTED_MODULE_2__["default"].Parser(data, start);

    // The .notdef glyph is not included, so subtract 1.
    nGlyphs -= 1;
    const charset = ['.notdef'];

    const format = parser.parseCard8();
    if (format === 0) {
        for (let i = 0; i < nGlyphs; i += 1) {
            sid = parser.parseSID();
            charset.push(getCFFString(strings, sid));
        }
    } else if (format === 1) {
        while (charset.length <= nGlyphs) {
            sid = parser.parseSID();
            count = parser.parseCard8();
            for (let i = 0; i <= count; i += 1) {
                charset.push(getCFFString(strings, sid));
                sid += 1;
            }
        }
    } else if (format === 2) {
        while (charset.length <= nGlyphs) {
            sid = parser.parseSID();
            count = parser.parseCard16();
            for (let i = 0; i <= count; i += 1) {
                charset.push(getCFFString(strings, sid));
                sid += 1;
            }
        }
    } else {
        throw new Error('Unknown charset format ' + format);
    }

    return charset;
}

// Parse the CFF encoding data. Only one encoding can be specified per font.
// See Adobe TN #5176 chapter 12, "Encodings".
function parseCFFEncoding(data, start, charset) {
    let code;
    const enc = {};
    const parser = new _parse__WEBPACK_IMPORTED_MODULE_2__["default"].Parser(data, start);
    const format = parser.parseCard8();
    if (format === 0) {
        const nCodes = parser.parseCard8();
        for (let i = 0; i < nCodes; i += 1) {
            code = parser.parseCard8();
            enc[code] = i;
        }
    } else if (format === 1) {
        const nRanges = parser.parseCard8();
        code = 1;
        for (let i = 0; i < nRanges; i += 1) {
            const first = parser.parseCard8();
            const nLeft = parser.parseCard8();
            for (let j = first; j <= first + nLeft; j += 1) {
                enc[j] = code;
                code += 1;
            }
        }
    } else {
        throw new Error('Unknown encoding format ' + format);
    }

    return new _encoding__WEBPACK_IMPORTED_MODULE_0__.CffEncoding(enc, charset);
}

// Take in charstring code and return a Glyph object.
// The encoding is described in the Type 2 Charstring Format
// https://www.microsoft.com/typography/OTSPEC/charstr2.htm
function parseCFFCharstring(font, glyph, code) {
    let c1x;
    let c1y;
    let c2x;
    let c2y;
    const p = new _path__WEBPACK_IMPORTED_MODULE_3__["default"]();
    const stack = [];
    let nStems = 0;
    let haveWidth = false;
    let open = false;
    let x = 0;
    let y = 0;
    let subrs;
    let subrsBias;
    let defaultWidthX;
    let nominalWidthX;
    if (font.isCIDFont) {
        const fdIndex = font.tables.cff.topDict._fdSelect[glyph.index];
        const fdDict = font.tables.cff.topDict._fdArray[fdIndex];
        subrs = fdDict._subrs;
        subrsBias = fdDict._subrsBias;
        defaultWidthX = fdDict._defaultWidthX;
        nominalWidthX = fdDict._nominalWidthX;
    } else {
        subrs = font.tables.cff.topDict._subrs;
        subrsBias = font.tables.cff.topDict._subrsBias;
        defaultWidthX = font.tables.cff.topDict._defaultWidthX;
        nominalWidthX = font.tables.cff.topDict._nominalWidthX;
    }
    let width = defaultWidthX;

    function newContour(x, y) {
        if (open) {
            p.closePath();
        }

        p.moveTo(x, y);
        open = true;
    }

    function parseStems() {
        let hasWidthArg;

        // The number of stem operators on the stack is always even.
        // If the value is uneven, that means a width is specified.
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
            width = stack.shift() + nominalWidthX;
        }

        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
    }

    function parse(code) {
        let b1;
        let b2;
        let b3;
        let b4;
        let codeIndex;
        let subrCode;
        let jpx;
        let jpy;
        let c3x;
        let c3y;
        let c4x;
        let c4y;

        let i = 0;
        while (i < code.length) {
            let v = code[i];
            i += 1;
            switch (v) {
                case 1: // hstem
                    parseStems();
                    break;
                case 3: // vstem
                    parseStems();
                    break;
                case 4: // vmoveto
                    if (stack.length > 1 && !haveWidth) {
                        width = stack.shift() + nominalWidthX;
                        haveWidth = true;
                    }

                    y += stack.pop();
                    newContour(x, y);
                    break;
                case 5: // rlineto
                    while (stack.length > 0) {
                        x += stack.shift();
                        y += stack.shift();
                        p.lineTo(x, y);
                    }

                    break;
                case 6: // hlineto
                    while (stack.length > 0) {
                        x += stack.shift();
                        p.lineTo(x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        y += stack.shift();
                        p.lineTo(x, y);
                    }

                    break;
                case 7: // vlineto
                    while (stack.length > 0) {
                        y += stack.shift();
                        p.lineTo(x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        x += stack.shift();
                        p.lineTo(x, y);
                    }

                    break;
                case 8: // rrcurveto
                    while (stack.length > 0) {
                        c1x = x + stack.shift();
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + stack.shift();
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 10: // callsubr
                    codeIndex = stack.pop() + subrsBias;
                    subrCode = subrs[codeIndex];
                    if (subrCode) {
                        parse(subrCode);
                    }

                    break;
                case 11: // return
                    return;
                case 12: // flex operators
                    v = code[i];
                    i += 1;
                    switch (v) {
                        case 35: // flex
                            // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 dx6 dy6 fd flex (12 35) |-
                            c1x = x   + stack.shift();    // dx1
                            c1y = y   + stack.shift();    // dy1
                            c2x = c1x + stack.shift();    // dx2
                            c2y = c1y + stack.shift();    // dy2
                            jpx = c2x + stack.shift();    // dx3
                            jpy = c2y + stack.shift();    // dy3
                            c3x = jpx + stack.shift();    // dx4
                            c3y = jpy + stack.shift();    // dy4
                            c4x = c3x + stack.shift();    // dx5
                            c4y = c3y + stack.shift();    // dy5
                            x = c4x   + stack.shift();    // dx6
                            y = c4y   + stack.shift();    // dy6
                            stack.shift();                // flex depth
                            p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                            p.curveTo(c3x, c3y, c4x, c4y, x, y);
                            break;
                        case 34: // hflex
                            // |- dx1 dx2 dy2 dx3 dx4 dx5 dx6 hflex (12 34) |-
                            c1x = x   + stack.shift();    // dx1
                            c1y = y;                      // dy1
                            c2x = c1x + stack.shift();    // dx2
                            c2y = c1y + stack.shift();    // dy2
                            jpx = c2x + stack.shift();    // dx3
                            jpy = c2y;                    // dy3
                            c3x = jpx + stack.shift();    // dx4
                            c3y = c2y;                    // dy4
                            c4x = c3x + stack.shift();    // dx5
                            c4y = y;                      // dy5
                            x = c4x + stack.shift();      // dx6
                            p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                            p.curveTo(c3x, c3y, c4x, c4y, x, y);
                            break;
                        case 36: // hflex1
                            // |- dx1 dy1 dx2 dy2 dx3 dx4 dx5 dy5 dx6 hflex1 (12 36) |-
                            c1x = x   + stack.shift();    // dx1
                            c1y = y   + stack.shift();    // dy1
                            c2x = c1x + stack.shift();    // dx2
                            c2y = c1y + stack.shift();    // dy2
                            jpx = c2x + stack.shift();    // dx3
                            jpy = c2y;                    // dy3
                            c3x = jpx + stack.shift();    // dx4
                            c3y = c2y;                    // dy4
                            c4x = c3x + stack.shift();    // dx5
                            c4y = c3y + stack.shift();    // dy5
                            x = c4x + stack.shift();      // dx6
                            p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                            p.curveTo(c3x, c3y, c4x, c4y, x, y);
                            break;
                        case 37: // flex1
                            // |- dx1 dy1 dx2 dy2 dx3 dy3 dx4 dy4 dx5 dy5 d6 flex1 (12 37) |-
                            c1x = x   + stack.shift();    // dx1
                            c1y = y   + stack.shift();    // dy1
                            c2x = c1x + stack.shift();    // dx2
                            c2y = c1y + stack.shift();    // dy2
                            jpx = c2x + stack.shift();    // dx3
                            jpy = c2y + stack.shift();    // dy3
                            c3x = jpx + stack.shift();    // dx4
                            c3y = jpy + stack.shift();    // dy4
                            c4x = c3x + stack.shift();    // dx5
                            c4y = c3y + stack.shift();    // dy5
                            if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
                                x = c4x + stack.shift();
                            } else {
                                y = c4y + stack.shift();
                            }

                            p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
                            p.curveTo(c3x, c3y, c4x, c4y, x, y);
                            break;
                        default:
                            console.log('Glyph ' + glyph.index + ': unknown operator ' + 1200 + v);
                            stack.length = 0;
                    }
                    break;
                case 14: // endchar
                    if (stack.length > 0 && !haveWidth) {
                        width = stack.shift() + nominalWidthX;
                        haveWidth = true;
                    }

                    if (open) {
                        p.closePath();
                        open = false;
                    }

                    break;
                case 18: // hstemhm
                    parseStems();
                    break;
                case 19: // hintmask
                case 20: // cntrmask
                    parseStems();
                    i += (nStems + 7) >> 3;
                    break;
                case 21: // rmoveto
                    if (stack.length > 2 && !haveWidth) {
                        width = stack.shift() + nominalWidthX;
                        haveWidth = true;
                    }

                    y += stack.pop();
                    x += stack.pop();
                    newContour(x, y);
                    break;
                case 22: // hmoveto
                    if (stack.length > 1 && !haveWidth) {
                        width = stack.shift() + nominalWidthX;
                        haveWidth = true;
                    }

                    x += stack.pop();
                    newContour(x, y);
                    break;
                case 23: // vstemhm
                    parseStems();
                    break;
                case 24: // rcurveline
                    while (stack.length > 2) {
                        c1x = x + stack.shift();
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + stack.shift();
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    x += stack.shift();
                    y += stack.shift();
                    p.lineTo(x, y);
                    break;
                case 25: // rlinecurve
                    while (stack.length > 6) {
                        x += stack.shift();
                        y += stack.shift();
                        p.lineTo(x, y);
                    }

                    c1x = x + stack.shift();
                    c1y = y + stack.shift();
                    c2x = c1x + stack.shift();
                    c2y = c1y + stack.shift();
                    x = c2x + stack.shift();
                    y = c2y + stack.shift();
                    p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    break;
                case 26: // vvcurveto
                    if (stack.length % 2) {
                        x += stack.shift();
                    }

                    while (stack.length > 0) {
                        c1x = x;
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x;
                        y = c2y + stack.shift();
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 27: // hhcurveto
                    if (stack.length % 2) {
                        y += stack.shift();
                    }

                    while (stack.length > 0) {
                        c1x = x + stack.shift();
                        c1y = y;
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y;
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 28: // shortint
                    b1 = code[i];
                    b2 = code[i + 1];
                    stack.push(((b1 << 24) | (b2 << 16)) >> 16);
                    i += 2;
                    break;
                case 29: // callgsubr
                    codeIndex = stack.pop() + font.gsubrsBias;
                    subrCode = font.gsubrs[codeIndex];
                    if (subrCode) {
                        parse(subrCode);
                    }

                    break;
                case 30: // vhcurveto
                    while (stack.length > 0) {
                        c1x = x;
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        c1x = x + stack.shift();
                        c1y = y;
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        y = c2y + stack.shift();
                        x = c2x + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                case 31: // hvcurveto
                    while (stack.length > 0) {
                        c1x = x + stack.shift();
                        c1y = y;
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        y = c2y + stack.shift();
                        x = c2x + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                        if (stack.length === 0) {
                            break;
                        }

                        c1x = x;
                        c1y = y + stack.shift();
                        c2x = c1x + stack.shift();
                        c2y = c1y + stack.shift();
                        x = c2x + stack.shift();
                        y = c2y + (stack.length === 1 ? stack.shift() : 0);
                        p.curveTo(c1x, c1y, c2x, c2y, x, y);
                    }

                    break;
                default:
                    if (v < 32) {
                        console.log('Glyph ' + glyph.index + ': unknown operator ' + v);
                    } else if (v < 247) {
                        stack.push(v - 139);
                    } else if (v < 251) {
                        b1 = code[i];
                        i += 1;
                        stack.push((v - 247) * 256 + b1 + 108);
                    } else if (v < 255) {
                        b1 = code[i];
                        i += 1;
                        stack.push(-(v - 251) * 256 - b1 - 108);
                    } else {
                        b1 = code[i];
                        b2 = code[i + 1];
                        b3 = code[i + 2];
                        b4 = code[i + 3];
                        i += 4;
                        stack.push(((b1 << 24) | (b2 << 16) | (b3 << 8) | b4) / 65536);
                    }
            }
        }
    }

    parse(code);

    glyph.advanceWidth = width;
    return p;
}

function parseCFFFDSelect(data, start, nGlyphs, fdArrayCount) {
    const fdSelect = [];
    let fdIndex;
    const parser = new _parse__WEBPACK_IMPORTED_MODULE_2__["default"].Parser(data, start);
    const format = parser.parseCard8();
    if (format === 0) {
        // Simple list of nGlyphs elements
        for (let iGid = 0; iGid < nGlyphs; iGid++) {
            fdIndex = parser.parseCard8();
            if (fdIndex >= fdArrayCount) {
                throw new Error('CFF table CID Font FDSelect has bad FD index value ' + fdIndex + ' (FD count ' + fdArrayCount + ')');
            }
            fdSelect.push(fdIndex);
        }
    } else if (format === 3) {
        // Ranges
        const nRanges = parser.parseCard16();
        let first = parser.parseCard16();
        if (first !== 0) {
            throw new Error('CFF Table CID Font FDSelect format 3 range has bad initial GID ' + first);
        }
        let next;
        for (let iRange = 0; iRange < nRanges; iRange++) {
            fdIndex = parser.parseCard8();
            next = parser.parseCard16();
            if (fdIndex >= fdArrayCount) {
                throw new Error('CFF table CID Font FDSelect has bad FD index value ' + fdIndex + ' (FD count ' + fdArrayCount + ')');
            }
            if (next > nGlyphs) {
                throw new Error('CFF Table CID Font FDSelect format 3 range has bad GID ' + next);
            }
            for (; first < next; first++) {
                fdSelect.push(fdIndex);
            }
            first = next;
        }
        if (next !== nGlyphs) {
            throw new Error('CFF Table CID Font FDSelect format 3 range has bad final GID ' + next);
        }
    } else {
        throw new Error('CFF Table CID Font FDSelect table has unsupported format ' + format);
    }
    return fdSelect;
}

// Parse the `CFF` table, which contains the glyph outlines in PostScript format.
function parseCFFTable(data, start, font) {
    font.tables.cff = {};
    const header = parseCFFHeader(data, start);
    const nameIndex = parseCFFIndex(data, header.endOffset, _parse__WEBPACK_IMPORTED_MODULE_2__["default"].bytesToString);
    const topDictIndex = parseCFFIndex(data, nameIndex.endOffset);
    const stringIndex = parseCFFIndex(data, topDictIndex.endOffset, _parse__WEBPACK_IMPORTED_MODULE_2__["default"].bytesToString);
    const globalSubrIndex = parseCFFIndex(data, stringIndex.endOffset);
    font.gsubrs = globalSubrIndex.objects;
    font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);

    const topDictArray = gatherCFFTopDicts(data, start, topDictIndex.objects, stringIndex.objects);
    if (topDictArray.length !== 1) {
        throw new Error('CFF table has too many fonts in \'FontSet\' - count of fonts NameIndex.length = ' + topDictArray.length);
    }

    const topDict = topDictArray[0];
    font.tables.cff.topDict = topDict;

    if (topDict._privateDict) {
        font.defaultWidthX = topDict._privateDict.defaultWidthX;
        font.nominalWidthX = topDict._privateDict.nominalWidthX;
    }

    if (topDict.ros[0] !== undefined && topDict.ros[1] !== undefined) {
        font.isCIDFont = true;
    }

    if (font.isCIDFont) {
        let fdArrayOffset = topDict.fdArray;
        let fdSelectOffset = topDict.fdSelect;
        if (fdArrayOffset === 0 || fdSelectOffset === 0) {
            throw new Error('Font is marked as a CID font, but FDArray and/or FDSelect information is missing');
        }
        fdArrayOffset += start;
        const fdArrayIndex = parseCFFIndex(data, fdArrayOffset);
        const fdArray = gatherCFFTopDicts(data, start, fdArrayIndex.objects, stringIndex.objects);
        topDict._fdArray = fdArray;
        fdSelectOffset += start;
        topDict._fdSelect = parseCFFFDSelect(data, fdSelectOffset, font.numGlyphs, fdArray.length);
    }

    const privateDictOffset = start + topDict.private[1];
    const privateDict = parseCFFPrivateDict(data, privateDictOffset, topDict.private[0], stringIndex.objects);
    font.defaultWidthX = privateDict.defaultWidthX;
    font.nominalWidthX = privateDict.nominalWidthX;

    if (privateDict.subrs !== 0) {
        const subrOffset = privateDictOffset + privateDict.subrs;
        const subrIndex = parseCFFIndex(data, subrOffset);
        font.subrs = subrIndex.objects;
        font.subrsBias = calcCFFSubroutineBias(font.subrs);
    } else {
        font.subrs = [];
        font.subrsBias = 0;
    }

    // Offsets in the top dict are relative to the beginning of the CFF data, so add the CFF start offset.
    const charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
    font.nGlyphs = charStringsIndex.objects.length;

    const charset = parseCFFCharset(data, start + topDict.charset, font.nGlyphs, stringIndex.objects);
    if (topDict.encoding === 0) { // Standard encoding
        font.cffEncoding = new _encoding__WEBPACK_IMPORTED_MODULE_0__.CffEncoding(_encoding__WEBPACK_IMPORTED_MODULE_0__.cffStandardEncoding, charset);
    } else if (topDict.encoding === 1) { // Expert encoding
        font.cffEncoding = new _encoding__WEBPACK_IMPORTED_MODULE_0__.CffEncoding(_encoding__WEBPACK_IMPORTED_MODULE_0__.cffExpertEncoding, charset);
    } else {
        font.cffEncoding = parseCFFEncoding(data, start + topDict.encoding, charset);
    }

    // Prefer the CMAP encoding to the CFF encoding.
    font.encoding = font.encoding || font.cffEncoding;

    font.glyphs = new _glyphset__WEBPACK_IMPORTED_MODULE_1__["default"].GlyphSet(font);
    for (let i = 0; i < font.nGlyphs; i += 1) {
        const charString = charStringsIndex.objects[i];
        font.glyphs.push(i, _glyphset__WEBPACK_IMPORTED_MODULE_1__["default"].cffGlyphLoader(font, i, parseCFFCharstring, charString));
    }
}

// Convert a string to a String ID (SID).
// The list of strings is modified in place.
function encodeString(s, strings) {
    let sid;

    // Is the string in the CFF standard strings?
    let i = _encoding__WEBPACK_IMPORTED_MODULE_0__.cffStandardStrings.indexOf(s);
    if (i >= 0) {
        sid = i;
    }

    // Is the string already in the string index?
    i = strings.indexOf(s);
    if (i >= 0) {
        sid = i + _encoding__WEBPACK_IMPORTED_MODULE_0__.cffStandardStrings.length;
    } else {
        sid = _encoding__WEBPACK_IMPORTED_MODULE_0__.cffStandardStrings.length + strings.length;
        strings.push(s);
    }

    return sid;
}

function makeHeader() {
    return new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Header', [
        {name: 'major', type: 'Card8', value: 1},
        {name: 'minor', type: 'Card8', value: 0},
        {name: 'hdrSize', type: 'Card8', value: 4},
        {name: 'major', type: 'Card8', value: 1}
    ]);
}

function makeNameIndex(fontNames) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Name INDEX', [
        {name: 'names', type: 'INDEX', value: []}
    ]);
    t.names = [];
    for (let i = 0; i < fontNames.length; i += 1) {
        t.names.push({name: 'name_' + i, type: 'NAME', value: fontNames[i]});
    }

    return t;
}

// Given a dictionary's metadata, create a DICT structure.
function makeDict(meta, attrs, strings) {
    const m = {};
    for (let i = 0; i < meta.length; i += 1) {
        const entry = meta[i];
        let value = attrs[entry.name];
        if (value !== undefined && !equals(value, entry.value)) {
            if (entry.type === 'SID') {
                value = encodeString(value, strings);
            }

            m[entry.op] = {name: entry.name, type: entry.type, value: value};
        }
    }

    return m;
}

// The Top DICT houses the global font attributes.
function makeTopDict(attrs, strings) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Top DICT', [
        {name: 'dict', type: 'DICT', value: {}}
    ]);
    t.dict = makeDict(TOP_DICT_META, attrs, strings);
    return t;
}

function makeTopDictIndex(topDict) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Top DICT INDEX', [
        {name: 'topDicts', type: 'INDEX', value: []}
    ]);
    t.topDicts = [{name: 'topDict_0', type: 'TABLE', value: topDict}];
    return t;
}

function makeStringIndex(strings) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('String INDEX', [
        {name: 'strings', type: 'INDEX', value: []}
    ]);
    t.strings = [];
    for (let i = 0; i < strings.length; i += 1) {
        t.strings.push({name: 'string_' + i, type: 'STRING', value: strings[i]});
    }

    return t;
}

function makeGlobalSubrIndex() {
    // Currently we don't use subroutines.
    return new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Global Subr INDEX', [
        {name: 'subrs', type: 'INDEX', value: []}
    ]);
}

function makeCharsets(glyphNames, strings) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Charsets', [
        {name: 'format', type: 'Card8', value: 0}
    ]);
    for (let i = 0; i < glyphNames.length; i += 1) {
        const glyphName = glyphNames[i];
        const glyphSID = encodeString(glyphName, strings);
        t.fields.push({name: 'glyph_' + i, type: 'SID', value: glyphSID});
    }

    return t;
}

function glyphToOps(glyph) {
    const ops = [];
    const path = glyph.path;
    ops.push({name: 'width', type: 'NUMBER', value: glyph.advanceWidth});
    let x = 0;
    let y = 0;
    for (let i = 0; i < path.commands.length; i += 1) {
        let dx;
        let dy;
        let cmd = path.commands[i];
        if (cmd.type === 'Q') {
            // CFF only supports bézier curves, so convert the quad to a bézier.
            const _13 = 1 / 3;
            const _23 = 2 / 3;

            // We're going to create a new command so we don't change the original path.
            cmd = {
                type: 'C',
                x: cmd.x,
                y: cmd.y,
                x1: _13 * x + _23 * cmd.x1,
                y1: _13 * y + _23 * cmd.y1,
                x2: _13 * cmd.x + _23 * cmd.x1,
                y2: _13 * cmd.y + _23 * cmd.y1
            };
        }

        if (cmd.type === 'M') {
            dx = Math.round(cmd.x - x);
            dy = Math.round(cmd.y - y);
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rmoveto', type: 'OP', value: 21});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        } else if (cmd.type === 'L') {
            dx = Math.round(cmd.x - x);
            dy = Math.round(cmd.y - y);
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rlineto', type: 'OP', value: 5});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        } else if (cmd.type === 'C') {
            const dx1 = Math.round(cmd.x1 - x);
            const dy1 = Math.round(cmd.y1 - y);
            const dx2 = Math.round(cmd.x2 - cmd.x1);
            const dy2 = Math.round(cmd.y2 - cmd.y1);
            dx = Math.round(cmd.x - cmd.x2);
            dy = Math.round(cmd.y - cmd.y2);
            ops.push({name: 'dx1', type: 'NUMBER', value: dx1});
            ops.push({name: 'dy1', type: 'NUMBER', value: dy1});
            ops.push({name: 'dx2', type: 'NUMBER', value: dx2});
            ops.push({name: 'dy2', type: 'NUMBER', value: dy2});
            ops.push({name: 'dx', type: 'NUMBER', value: dx});
            ops.push({name: 'dy', type: 'NUMBER', value: dy});
            ops.push({name: 'rrcurveto', type: 'OP', value: 8});
            x = Math.round(cmd.x);
            y = Math.round(cmd.y);
        }

        // Contours are closed automatically.
    }

    ops.push({name: 'endchar', type: 'OP', value: 14});
    return ops;
}

function makeCharStringsIndex(glyphs) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('CharStrings INDEX', [
        {name: 'charStrings', type: 'INDEX', value: []}
    ]);

    for (let i = 0; i < glyphs.length; i += 1) {
        const glyph = glyphs.get(i);
        const ops = glyphToOps(glyph);
        t.charStrings.push({name: glyph.name, type: 'CHARSTRING', value: ops});
    }

    return t;
}

function makePrivateDict(attrs, strings) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Record('Private DICT', [
        {name: 'dict', type: 'DICT', value: {}}
    ]);
    t.dict = makeDict(PRIVATE_DICT_META, attrs, strings);
    return t;
}

function makeCFFTable(glyphs, options) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_4__["default"].Table('CFF ', [
        {name: 'header', type: 'RECORD'},
        {name: 'nameIndex', type: 'RECORD'},
        {name: 'topDictIndex', type: 'RECORD'},
        {name: 'stringIndex', type: 'RECORD'},
        {name: 'globalSubrIndex', type: 'RECORD'},
        {name: 'charsets', type: 'RECORD'},
        {name: 'charStringsIndex', type: 'RECORD'},
        {name: 'privateDict', type: 'RECORD'}
    ]);

    const fontScale = 1 / options.unitsPerEm;
    // We use non-zero values for the offsets so that the DICT encodes them.
    // This is important because the size of the Top DICT plays a role in offset calculation,
    // and the size shouldn't change after we've written correct offsets.
    const attrs = {
        version: options.version,
        fullName: options.fullName,
        familyName: options.familyName,
        weight: options.weightName,
        fontBBox: options.fontBBox || [0, 0, 0, 0],
        fontMatrix: [fontScale, 0, 0, fontScale, 0, 0],
        charset: 999,
        encoding: 0,
        charStrings: 999,
        private: [0, 999]
    };

    const privateAttrs = {};

    const glyphNames = [];
    let glyph;

    // Skip first glyph (.notdef)
    for (let i = 1; i < glyphs.length; i += 1) {
        glyph = glyphs.get(i);
        glyphNames.push(glyph.name);
    }

    const strings = [];

    t.header = makeHeader();
    t.nameIndex = makeNameIndex([options.postScriptName]);
    let topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);
    t.globalSubrIndex = makeGlobalSubrIndex();
    t.charsets = makeCharsets(glyphNames, strings);
    t.charStringsIndex = makeCharStringsIndex(glyphs);
    t.privateDict = makePrivateDict(privateAttrs, strings);

    // Needs to come at the end, to encode all custom strings used in the font.
    t.stringIndex = makeStringIndex(strings);

    const startOffset = t.header.sizeOf() +
        t.nameIndex.sizeOf() +
        t.topDictIndex.sizeOf() +
        t.stringIndex.sizeOf() +
        t.globalSubrIndex.sizeOf();
    attrs.charset = startOffset;

    // We use the CFF standard encoding; proper encoding will be handled in cmap.
    attrs.encoding = 0;
    attrs.charStrings = attrs.charset + t.charsets.sizeOf();
    attrs.private[1] = attrs.charStrings + t.charStringsIndex.sizeOf();

    // Recreate the Top DICT INDEX with the correct offsets.
    topDict = makeTopDict(attrs, strings);
    t.topDictIndex = makeTopDictIndex(topDict);

    return t;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseCFFTable, make: makeCFFTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cmap.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cmap.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `cmap` table stores the mappings from characters to glyphs.
// https://www.microsoft.com/typography/OTSPEC/cmap.htm





function parseCmapTableFormat12(cmap, p) {
    //Skip reserved.
    p.parseUShort();

    // Length in bytes of the sub-tables.
    cmap.length = p.parseULong();
    cmap.language = p.parseULong();

    let groupCount;
    cmap.groupCount = groupCount = p.parseULong();
    cmap.glyphIndexMap = {};

    for (let i = 0; i < groupCount; i += 1) {
        const startCharCode = p.parseULong();
        const endCharCode = p.parseULong();
        let startGlyphId = p.parseULong();

        for (let c = startCharCode; c <= endCharCode; c += 1) {
            cmap.glyphIndexMap[c] = startGlyphId;
            startGlyphId++;
        }
    }
}

function parseCmapTableFormat4(cmap, p, data, start, offset) {
    // Length in bytes of the sub-tables.
    cmap.length = p.parseUShort();
    cmap.language = p.parseUShort();

    // segCount is stored x 2.
    let segCount;
    cmap.segCount = segCount = p.parseUShort() >> 1;

    // Skip searchRange, entrySelector, rangeShift.
    p.skip('uShort', 3);

    // The "unrolled" mapping from character codes to glyph indices.
    cmap.glyphIndexMap = {};
    const endCountParser = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start + offset + 14);
    const startCountParser = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start + offset + 16 + segCount * 2);
    const idDeltaParser = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start + offset + 16 + segCount * 4);
    const idRangeOffsetParser = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start + offset + 16 + segCount * 6);
    let glyphIndexOffset = start + offset + 16 + segCount * 8;
    for (let i = 0; i < segCount - 1; i += 1) {
        let glyphIndex;
        const endCount = endCountParser.parseUShort();
        const startCount = startCountParser.parseUShort();
        const idDelta = idDeltaParser.parseShort();
        const idRangeOffset = idRangeOffsetParser.parseUShort();
        for (let c = startCount; c <= endCount; c += 1) {
            if (idRangeOffset !== 0) {
                // The idRangeOffset is relative to the current position in the idRangeOffset array.
                // Take the current offset in the idRangeOffset array.
                glyphIndexOffset = (idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2);

                // Add the value of the idRangeOffset, which will move us into the glyphIndex array.
                glyphIndexOffset += idRangeOffset;

                // Then add the character index of the current segment, multiplied by 2 for USHORTs.
                glyphIndexOffset += (c - startCount) * 2;
                glyphIndex = _parse__WEBPACK_IMPORTED_MODULE_1__["default"].getUShort(data, glyphIndexOffset);
                if (glyphIndex !== 0) {
                    glyphIndex = (glyphIndex + idDelta) & 0xFFFF;
                }
            } else {
                glyphIndex = (c + idDelta) & 0xFFFF;
            }

            cmap.glyphIndexMap[c] = glyphIndex;
        }
    }
}

// Parse the `cmap` table. This table stores the mappings from characters to glyphs.
// There are many available formats, but we only support the Windows format 4 and 12.
// This function returns a `CmapEncoding` object or null if no supported format could be found.
function parseCmapTable(data, start) {
    const cmap = {};
    cmap.version = _parse__WEBPACK_IMPORTED_MODULE_1__["default"].getUShort(data, start);
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(cmap.version === 0, 'cmap table version should be 0.');

    // The cmap table can contain many sub-tables, each with their own format.
    // We're only interested in a "platform 3" table. This is a Windows format.
    cmap.numTables = _parse__WEBPACK_IMPORTED_MODULE_1__["default"].getUShort(data, start + 2);
    let offset = -1;
    for (let i = cmap.numTables - 1; i >= 0; i -= 1) {
        const platformId = _parse__WEBPACK_IMPORTED_MODULE_1__["default"].getUShort(data, start + 4 + (i * 8));
        const encodingId = _parse__WEBPACK_IMPORTED_MODULE_1__["default"].getUShort(data, start + 4 + (i * 8) + 2);
        if (platformId === 3 && (encodingId === 0 || encodingId === 1 || encodingId === 10)) {
            offset = _parse__WEBPACK_IMPORTED_MODULE_1__["default"].getULong(data, start + 4 + (i * 8) + 4);
            break;
        }
    }

    if (offset === -1) {
        // There is no cmap table in the font that we support.
        throw new Error('No valid cmap sub-tables found.');
    }

    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start + offset);
    cmap.format = p.parseUShort();

    if (cmap.format === 12) {
        parseCmapTableFormat12(cmap, p);
    } else if (cmap.format === 4) {
        parseCmapTableFormat4(cmap, p, data, start, offset);
    } else {
        throw new Error('Only format 4 and 12 cmap tables are supported (found format ' + cmap.format + ').');
    }

    return cmap;
}

function addSegment(t, code, glyphIndex) {
    t.segments.push({
        end: code,
        start: code,
        delta: -(code - glyphIndex),
        offset: 0
    });
}

function addTerminatorSegment(t) {
    t.segments.push({
        end: 0xFFFF,
        start: 0xFFFF,
        delta: 1,
        offset: 0
    });
}

function makeCmapTable(glyphs) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('cmap', [
        {name: 'version', type: 'USHORT', value: 0},
        {name: 'numTables', type: 'USHORT', value: 1},
        {name: 'platformID', type: 'USHORT', value: 3},
        {name: 'encodingID', type: 'USHORT', value: 1},
        {name: 'offset', type: 'ULONG', value: 12},
        {name: 'format', type: 'USHORT', value: 4},
        {name: 'length', type: 'USHORT', value: 0},
        {name: 'language', type: 'USHORT', value: 0},
        {name: 'segCountX2', type: 'USHORT', value: 0},
        {name: 'searchRange', type: 'USHORT', value: 0},
        {name: 'entrySelector', type: 'USHORT', value: 0},
        {name: 'rangeShift', type: 'USHORT', value: 0}
    ]);

    t.segments = [];
    for (let i = 0; i < glyphs.length; i += 1) {
        const glyph = glyphs.get(i);
        for (let j = 0; j < glyph.unicodes.length; j += 1) {
            addSegment(t, glyph.unicodes[j], i);
        }

        t.segments = t.segments.sort(function(a, b) {
            return a.start - b.start;
        });
    }

    addTerminatorSegment(t);

    let segCount;
    segCount = t.segments.length;
    t.segCountX2 = segCount * 2;
    t.searchRange = Math.pow(2, Math.floor(Math.log(segCount) / Math.log(2))) * 2;
    t.entrySelector = Math.log(t.searchRange / 2) / Math.log(2);
    t.rangeShift = t.segCountX2 - t.searchRange;

    // Set up parallel segment arrays.
    let endCounts = [];
    let startCounts = [];
    let idDeltas = [];
    let idRangeOffsets = [];
    let glyphIds = [];

    for (let i = 0; i < segCount; i += 1) {
        const segment = t.segments[i];
        endCounts = endCounts.concat({name: 'end_' + i, type: 'USHORT', value: segment.end});
        startCounts = startCounts.concat({name: 'start_' + i, type: 'USHORT', value: segment.start});
        idDeltas = idDeltas.concat({name: 'idDelta_' + i, type: 'SHORT', value: segment.delta});
        idRangeOffsets = idRangeOffsets.concat({name: 'idRangeOffset_' + i, type: 'USHORT', value: segment.offset});
        if (segment.glyphId !== undefined) {
            glyphIds = glyphIds.concat({name: 'glyph_' + i, type: 'USHORT', value: segment.glyphId});
        }
    }

    t.fields = t.fields.concat(endCounts);
    t.fields.push({name: 'reservedPad', type: 'USHORT', value: 0});
    t.fields = t.fields.concat(startCounts);
    t.fields = t.fields.concat(idDeltas);
    t.fields = t.fields.concat(idRangeOffsets);
    t.fields = t.fields.concat(glyphIds);

    t.length = 14 + // Subtable header
        endCounts.length * 2 +
        2 + // reservedPad
        startCounts.length * 2 +
        idDeltas.length * 2 +
        idRangeOffsets.length * 2 +
        glyphIds.length * 2;

    return t;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseCmapTable, make: makeCmapTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/fvar.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/fvar.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `fvar` table stores font variation axes and instances.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6fvar.html





function addName(name, names) {
    const nameString = JSON.stringify(name);
    let nameID = 256;
    for (let nameKey in names) {
        let n = parseInt(nameKey);
        if (!n || n < 256) {
            continue;
        }

        if (JSON.stringify(names[nameKey]) === nameString) {
            return n;
        }

        if (nameID <= n) {
            nameID = n + 1;
        }
    }

    names[nameID] = name;
    return nameID;
}

function makeFvarAxis(n, axis, names) {
    const nameID = addName(axis.name, names);
    return [
        {name: 'tag_' + n, type: 'TAG', value: axis.tag},
        {name: 'minValue_' + n, type: 'FIXED', value: axis.minValue << 16},
        {name: 'defaultValue_' + n, type: 'FIXED', value: axis.defaultValue << 16},
        {name: 'maxValue_' + n, type: 'FIXED', value: axis.maxValue << 16},
        {name: 'flags_' + n, type: 'USHORT', value: 0},
        {name: 'nameID_' + n, type: 'USHORT', value: nameID}
    ];
}

function parseFvarAxis(data, start, names) {
    const axis = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    axis.tag = p.parseTag();
    axis.minValue = p.parseFixed();
    axis.defaultValue = p.parseFixed();
    axis.maxValue = p.parseFixed();
    p.skip('uShort', 1);  // reserved for flags; no values defined
    axis.name = names[p.parseUShort()] || {};
    return axis;
}

function makeFvarInstance(n, inst, axes, names) {
    const nameID = addName(inst.name, names);
    const fields = [
        {name: 'nameID_' + n, type: 'USHORT', value: nameID},
        {name: 'flags_' + n, type: 'USHORT', value: 0}
    ];

    for (let i = 0; i < axes.length; ++i) {
        const axisTag = axes[i].tag;
        fields.push({
            name: 'axis_' + n + ' ' + axisTag,
            type: 'FIXED',
            value: inst.coordinates[axisTag] << 16
        });
    }

    return fields;
}

function parseFvarInstance(data, start, axes, names) {
    const inst = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    inst.name = names[p.parseUShort()] || {};
    p.skip('uShort', 1);  // reserved for flags; no values defined

    inst.coordinates = {};
    for (let i = 0; i < axes.length; ++i) {
        inst.coordinates[axes[i].tag] = p.parseFixed();
    }

    return inst;
}

function makeFvarTable(fvar, names) {
    const result = new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('fvar', [
        {name: 'version', type: 'ULONG', value: 0x10000},
        {name: 'offsetToData', type: 'USHORT', value: 0},
        {name: 'countSizePairs', type: 'USHORT', value: 2},
        {name: 'axisCount', type: 'USHORT', value: fvar.axes.length},
        {name: 'axisSize', type: 'USHORT', value: 20},
        {name: 'instanceCount', type: 'USHORT', value: fvar.instances.length},
        {name: 'instanceSize', type: 'USHORT', value: 4 + fvar.axes.length * 4}
    ]);
    result.offsetToData = result.sizeOf();

    for (let i = 0; i < fvar.axes.length; i++) {
        result.fields = result.fields.concat(makeFvarAxis(i, fvar.axes[i], names));
    }

    for (let j = 0; j < fvar.instances.length; j++) {
        result.fields = result.fields.concat(makeFvarInstance(j, fvar.instances[j], fvar.axes, names));
    }

    return result;
}

function parseFvarTable(data, start, names) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const tableVersion = p.parseULong();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(tableVersion === 0x00010000, 'Unsupported fvar table version.');
    const offsetToData = p.parseOffset16();
    // Skip countSizePairs.
    p.skip('uShort', 1);
    const axisCount = p.parseUShort();
    const axisSize = p.parseUShort();
    const instanceCount = p.parseUShort();
    const instanceSize = p.parseUShort();

    const axes = [];
    for (let i = 0; i < axisCount; i++) {
        axes.push(parseFvarAxis(data, start + offsetToData + i * axisSize, names));
    }

    const instances = [];
    const instanceStart = start + offsetToData + axisCount * axisSize;
    for (let j = 0; j < instanceCount; j++) {
        instances.push(parseFvarInstance(data, instanceStart + j * instanceSize, axes, names));
    }

    return {axes: axes, instances: instances};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ make: makeFvarTable, parse: parseFvarTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/glyf.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/glyf.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _glyphset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../glyphset */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/glyphset.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../path */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/path.js");
// The `glyf` table describes the glyphs in TrueType outline format.
// http://www.microsoft.com/typography/otspec/glyf.htm






// Parse the coordinate data for a glyph.
function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
    let v;
    if ((flag & shortVectorBitMask) > 0) {
        // The coordinate is 1 byte long.
        v = p.parseByte();
        // The `same` bit is re-used for short values to signify the sign of the value.
        if ((flag & sameBitMask) === 0) {
            v = -v;
        }

        v = previousValue + v;
    } else {
        //  The coordinate is 2 bytes long.
        // If the `same` bit is set, the coordinate is the same as the previous coordinate.
        if ((flag & sameBitMask) > 0) {
            v = previousValue;
        } else {
            // Parse the coordinate as a signed 16-bit delta value.
            v = previousValue + p.parseShort();
        }
    }

    return v;
}

// Parse a TrueType glyph.
function parseGlyph(glyph, data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_2__["default"].Parser(data, start);
    glyph.numberOfContours = p.parseShort();
    glyph._xMin = p.parseShort();
    glyph._yMin = p.parseShort();
    glyph._xMax = p.parseShort();
    glyph._yMax = p.parseShort();
    let flags;
    let flag;

    if (glyph.numberOfContours > 0) {
        // This glyph is not a composite.
        const endPointIndices = glyph.endPointIndices = [];
        for (let i = 0; i < glyph.numberOfContours; i += 1) {
            endPointIndices.push(p.parseUShort());
        }

        glyph.instructionLength = p.parseUShort();
        glyph.instructions = [];
        for (let i = 0; i < glyph.instructionLength; i += 1) {
            glyph.instructions.push(p.parseByte());
        }

        const numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
        flags = [];
        for (let i = 0; i < numberOfCoordinates; i += 1) {
            flag = p.parseByte();
            flags.push(flag);
            // If bit 3 is set, we repeat this flag n times, where n is the next byte.
            if ((flag & 8) > 0) {
                const repeatCount = p.parseByte();
                for (let j = 0; j < repeatCount; j += 1) {
                    flags.push(flag);
                    i += 1;
                }
            }
        }

        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(flags.length === numberOfCoordinates, 'Bad flags.');

        if (endPointIndices.length > 0) {
            const points = [];
            let point;
            // X/Y coordinates are relative to the previous point, except for the first point which is relative to 0,0.
            if (numberOfCoordinates > 0) {
                for (let i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = {};
                    point.onCurve = !!(flag & 1);
                    point.lastPointOfContour = endPointIndices.indexOf(i) >= 0;
                    points.push(point);
                }

                let px = 0;
                for (let i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = points[i];
                    point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
                    px = point.x;
                }

                let py = 0;
                for (let i = 0; i < numberOfCoordinates; i += 1) {
                    flag = flags[i];
                    point = points[i];
                    point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
                    py = point.y;
                }
            }

            glyph.points = points;
        } else {
            glyph.points = [];
        }
    } else if (glyph.numberOfContours === 0) {
        glyph.points = [];
    } else {
        glyph.isComposite = true;
        glyph.points = [];
        glyph.components = [];
        let moreComponents = true;
        while (moreComponents) {
            flags = p.parseUShort();
            const component = {
                glyphIndex: p.parseUShort(),
                xScale: 1,
                scale01: 0,
                scale10: 0,
                yScale: 1,
                dx: 0,
                dy: 0
            };
            if ((flags & 1) > 0) {
                // The arguments are words
                if ((flags & 2) > 0) {
                    // values are offset
                    component.dx = p.parseShort();
                    component.dy = p.parseShort();
                } else {
                    // values are matched points
                    component.matchedPoints = [p.parseUShort(), p.parseUShort()];
                }

            } else {
                // The arguments are bytes
                if ((flags & 2) > 0) {
                    // values are offset
                    component.dx = p.parseChar();
                    component.dy = p.parseChar();
                } else {
                    // values are matched points
                    component.matchedPoints = [p.parseByte(), p.parseByte()];
                }
            }

            if ((flags & 8) > 0) {
                // We have a scale
                component.xScale = component.yScale = p.parseF2Dot14();
            } else if ((flags & 64) > 0) {
                // We have an X / Y scale
                component.xScale = p.parseF2Dot14();
                component.yScale = p.parseF2Dot14();
            } else if ((flags & 128) > 0) {
                // We have a 2x2 transformation
                component.xScale = p.parseF2Dot14();
                component.scale01 = p.parseF2Dot14();
                component.scale10 = p.parseF2Dot14();
                component.yScale = p.parseF2Dot14();
            }

            glyph.components.push(component);
            moreComponents = !!(flags & 32);
        }
        if (flags & 0x100) {
            // We have instructions
            glyph.instructionLength = p.parseUShort();
            glyph.instructions = [];
            for (let i = 0; i < glyph.instructionLength; i += 1) {
                glyph.instructions.push(p.parseByte());
            }
        }
    }
}

// Transform an array of points and return a new array.
function transformPoints(points, transform) {
    const newPoints = [];
    for (let i = 0; i < points.length; i += 1) {
        const pt = points[i];
        const newPt = {
            x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
            y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
            onCurve: pt.onCurve,
            lastPointOfContour: pt.lastPointOfContour
        };
        newPoints.push(newPt);
    }

    return newPoints;
}

function getContours(points) {
    const contours = [];
    let currentContour = [];
    for (let i = 0; i < points.length; i += 1) {
        const pt = points[i];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
            contours.push(currentContour);
            currentContour = [];
        }
    }

    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(currentContour.length === 0, 'There are still points left in the current contour.');
    return contours;
}

// Convert the TrueType glyph outline to a Path.
function getPath(points) {
    const p = new _path__WEBPACK_IMPORTED_MODULE_3__["default"]();
    if (!points) {
        return p;
    }

    const contours = getContours(points);

    for (let contourIndex = 0; contourIndex < contours.length; ++contourIndex) {
        const contour = contours[contourIndex];

        let prev = null;
        let curr = contour[contour.length - 1];
        let next = contour[0];

        if (curr.onCurve) {
            p.moveTo(curr.x, curr.y);
        } else {
            if (next.onCurve) {
                p.moveTo(next.x, next.y);
            } else {
                // If both first and last points are off-curve, start at their middle.
                const start = {x: (curr.x + next.x) * 0.5, y: (curr.y + next.y) * 0.5};
                p.moveTo(start.x, start.y);
            }
        }

        for (let i = 0; i < contour.length; ++i) {
            prev = curr;
            curr = next;
            next = contour[(i + 1) % contour.length];

            if (curr.onCurve) {
                // This is a straight line.
                p.lineTo(curr.x, curr.y);
            } else {
                let prev2 = prev;
                let next2 = next;

                if (!prev.onCurve) {
                    prev2 = { x: (curr.x + prev.x) * 0.5, y: (curr.y + prev.y) * 0.5 };
                    p.lineTo(prev2.x, prev2.y);
                }

                if (!next.onCurve) {
                    next2 = { x: (curr.x + next.x) * 0.5, y: (curr.y + next.y) * 0.5 };
                }

                p.lineTo(prev2.x, prev2.y);
                p.quadraticCurveTo(curr.x, curr.y, next2.x, next2.y);
            }
        }

        p.closePath();
    }
    return p;
}

function buildPath(glyphs, glyph) {
    if (glyph.isComposite) {
        for (let j = 0; j < glyph.components.length; j += 1) {
            const component = glyph.components[j];
            const componentGlyph = glyphs.get(component.glyphIndex);
            // Force the ttfGlyphLoader to parse the glyph.
            componentGlyph.getPath();
            if (componentGlyph.points) {
                let transformedPoints;
                if (component.matchedPoints === undefined) {
                    // component positioned by offset
                    transformedPoints = transformPoints(componentGlyph.points, component);
                } else {
                    // component positioned by matched points
                    if ((component.matchedPoints[0] > glyph.points.length - 1) ||
                        (component.matchedPoints[1] > componentGlyph.points.length - 1)) {
                        throw Error('Matched points out of range in ' + glyph.name);
                    }
                    const firstPt = glyph.points[component.matchedPoints[0]];
                    let secondPt = componentGlyph.points[component.matchedPoints[1]];
                    const transform = {
                        xScale: component.xScale, scale01: component.scale01,
                        scale10: component.scale10, yScale: component.yScale,
                        dx: 0, dy: 0
                    };
                    secondPt = transformPoints([secondPt], transform)[0];
                    transform.dx = firstPt.x - secondPt.x;
                    transform.dy = firstPt.y - secondPt.y;
                    transformedPoints = transformPoints(componentGlyph.points, transform);
                }
                glyph.points = glyph.points.concat(transformedPoints);
            }
        }
    }

    return getPath(glyph.points);
}

// Parse all the glyphs according to the offsets from the `loca` table.
function parseGlyfTable(data, start, loca, font) {
    const glyphs = new _glyphset__WEBPACK_IMPORTED_MODULE_1__["default"].GlyphSet(font);

    // The last element of the loca table is invalid.
    for (let i = 0; i < loca.length - 1; i += 1) {
        const offset = loca[i];
        const nextOffset = loca[i + 1];
        if (offset !== nextOffset) {
            glyphs.push(i, _glyphset__WEBPACK_IMPORTED_MODULE_1__["default"].ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
        } else {
            glyphs.push(i, _glyphset__WEBPACK_IMPORTED_MODULE_1__["default"].glyphLoader(font, i));
        }
    }

    return glyphs;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ getPath, parse: parseGlyfTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gpos.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gpos.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
// The `GPOS` table contains kerning pairs, among other things.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm




// Parse ScriptList and FeatureList tables of GPOS, GSUB, GDEF, BASE, JSTF tables.
// These lists are unused by now, this function is just the basis for a real parsing.
function parseTaggedListTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const n = p.parseUShort();
    const list = [];
    for (let i = 0; i < n; i++) {
        list[p.parseTag()] = { offset: p.parseUShort() };
    }

    return list;
}

// Parse a coverage table in a GSUB, GPOS or GDEF table.
// Format 1 is a simple list of glyph ids,
// Format 2 is a list of ranges. It is expanded in a list of glyphs, maybe not the best idea.
function parseCoverageTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const format = p.parseUShort();
    let count = p.parseUShort();
    if (format === 1) {
        return p.parseUShortList(count);
    } else if (format === 2) {
        const coverage = [];
        for (; count--;) {
            const begin = p.parseUShort();
            const end = p.parseUShort();
            let index = p.parseUShort();
            for (let i = begin; i <= end; i++) {
                coverage[index++] = i;
            }
        }

        return coverage;
    }
}

// Parse a Class Definition Table in a GSUB, GPOS or GDEF table.
// Returns a function that gets a class value from a glyph ID.
function parseClassDefTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const format = p.parseUShort();
    if (format === 1) {
        // Format 1 specifies a range of consecutive glyph indices, one class per glyph ID.
        const startGlyph = p.parseUShort();
        const glyphCount = p.parseUShort();
        const classes = p.parseUShortList(glyphCount);
        return function(glyphID) {
            return classes[glyphID - startGlyph] || 0;
        };
    } else if (format === 2) {
        // Format 2 defines multiple groups of glyph indices that belong to the same class.
        const rangeCount = p.parseUShort();
        const startGlyphs = [];
        const endGlyphs = [];
        const classValues = [];
        for (let i = 0; i < rangeCount; i++) {
            startGlyphs[i] = p.parseUShort();
            endGlyphs[i] = p.parseUShort();
            classValues[i] = p.parseUShort();
        }

        return function(glyphID) {
            let l = 0;
            let r = startGlyphs.length - 1;
            while (l < r) {
                const c = (l + r + 1) >> 1;
                if (glyphID < startGlyphs[c]) {
                    r = c - 1;
                } else {
                    l = c;
                }
            }

            if (startGlyphs[l] <= glyphID && glyphID <= endGlyphs[l]) {
                return classValues[l] || 0;
            }

            return 0;
        };
    }
}

// Parse a pair adjustment positioning subtable, format 1 or format 2
// The subtable is returned in the form of a lookup function.
function parsePairPosSubTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    // This part is common to format 1 and format 2 subtables
    const format = p.parseUShort();
    const coverageOffset = p.parseUShort();
    const coverage = parseCoverageTable(data, start + coverageOffset);
    // valueFormat 4: XAdvance only, 1: XPlacement only, 0: no ValueRecord for second glyph
    // Only valueFormat1=4 and valueFormat2=0 is supported.
    const valueFormat1 = p.parseUShort();
    const valueFormat2 = p.parseUShort();
    let value1;
    let value2;
    if (valueFormat1 !== 4 || valueFormat2 !== 0) return;
    const sharedPairSets = {};
    if (format === 1) {
        // Pair Positioning Adjustment: Format 1
        const pairSetCount = p.parseUShort();
        const pairSet = [];
        // Array of offsets to PairSet tables-from beginning of PairPos subtable-ordered by Coverage Index
        const pairSetOffsets = p.parseOffset16List(pairSetCount);
        for (let firstGlyph = 0; firstGlyph < pairSetCount; firstGlyph++) {
            const pairSetOffset = pairSetOffsets[firstGlyph];
            let sharedPairSet = sharedPairSets[pairSetOffset];
            if (!sharedPairSet) {
                // Parse a pairset table in a pair adjustment subtable format 1
                sharedPairSet = {};
                p.relativeOffset = pairSetOffset;
                let pairValueCount = p.parseUShort();
                for (; pairValueCount--;) {
                    const secondGlyph = p.parseUShort();
                    if (valueFormat1) value1 = p.parseShort();
                    if (valueFormat2) value2 = p.parseShort();
                    // We only support valueFormat1 = 4 and valueFormat2 = 0,
                    // so value1 is the XAdvance and value2 is empty.
                    sharedPairSet[secondGlyph] = value1;
                }
            }

            pairSet[coverage[firstGlyph]] = sharedPairSet;
        }

        return function(leftGlyph, rightGlyph) {
            const pairs = pairSet[leftGlyph];
            if (pairs) return pairs[rightGlyph];
        };
    } else if (format === 2) {
        // Pair Positioning Adjustment: Format 2
        const classDef1Offset = p.parseUShort();
        const classDef2Offset = p.parseUShort();
        const class1Count = p.parseUShort();
        const class2Count = p.parseUShort();
        const getClass1 = parseClassDefTable(data, start + classDef1Offset);
        const getClass2 = parseClassDefTable(data, start + classDef2Offset);

        // Parse kerning values by class pair.
        const kerningMatrix = [];
        for (let i = 0; i < class1Count; i++) {
            const kerningRow = kerningMatrix[i] = [];
            for (let j = 0; j < class2Count; j++) {
                if (valueFormat1) value1 = p.parseShort();
                if (valueFormat2) value2 = p.parseShort();
                // We only support valueFormat1 = 4 and valueFormat2 = 0,
                // so value1 is the XAdvance and value2 is empty.
                kerningRow[j] = value1;
            }
        }

        // Convert coverage list to a hash
        const covered = {};
        for (let i = 0; i < coverage.length; i++) {
            covered[coverage[i]] = 1;
        }

        // Get the kerning value for a specific glyph pair.
        return function(leftGlyph, rightGlyph) {
            if (!covered[leftGlyph]) return;
            const class1 = getClass1(leftGlyph);
            const class2 = getClass2(rightGlyph);
            const kerningRow = kerningMatrix[class1];

            if (kerningRow) {
                return kerningRow[class2];
            }
        };
    }
}

// Parse a LookupTable (present in of GPOS, GSUB, GDEF, BASE, JSTF tables).
function parseLookupTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const lookupType = p.parseUShort();
    const lookupFlag = p.parseUShort();
    const useMarkFilteringSet = lookupFlag & 0x10;
    const subTableCount = p.parseUShort();
    const subTableOffsets = p.parseOffset16List(subTableCount);
    const table = {
        lookupType: lookupType,
        lookupFlag: lookupFlag,
        markFilteringSet: useMarkFilteringSet ? p.parseUShort() : -1
    };
    // LookupType 2, Pair adjustment
    if (lookupType === 2) {
        const subtables = [];
        for (let i = 0; i < subTableCount; i++) {
            const pairPosSubTable = parsePairPosSubTable(data, start + subTableOffsets[i]);
            if (pairPosSubTable) subtables.push(pairPosSubTable);
        }
        // Return a function which finds the kerning values in the subtables.
        table.getKerningValue = function(leftGlyph, rightGlyph) {
            for (let i = subtables.length; i--;) {
                const value = subtables[i](leftGlyph, rightGlyph);
                if (value !== undefined) return value;
            }

            return 0;
        };
    }

    return table;
}

// Parse the `GPOS` table which contains, among other things, kerning pairs.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm
function parseGposTable(data, start, font) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const tableVersion = p.parseFixed();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(tableVersion === 1, 'Unsupported GPOS table version.');

    // ScriptList and FeatureList - ignored for now
    parseTaggedListTable(data, start + p.parseUShort());
    // 'kern' is the feature we are looking for.
    parseTaggedListTable(data, start + p.parseUShort());

    // LookupList
    const lookupListOffset = p.parseUShort();
    p.relativeOffset = lookupListOffset;
    const lookupCount = p.parseUShort();
    const lookupTableOffsets = p.parseOffset16List(lookupCount);
    const lookupListAbsoluteOffset = start + lookupListOffset;
    for (let i = 0; i < lookupCount; i++) {
        const table = parseLookupTable(data, lookupListAbsoluteOffset + lookupTableOffsets[i]);
        if (table.lookupType === 2 && !font.getGposKerningValue) font.getGposKerningValue = table.getKerningValue;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseGposTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gsub.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gsub.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `GSUB` table contains ligatures, among other things.
// https://www.microsoft.com/typography/OTSPEC/gsub.htm





const subtableParsers = new Array(9);         // subtableParsers[0] is unused

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#SS
subtableParsers[1] = function parseLookup1() {
    const start = this.offset + this.relativeOffset;
    const substFormat = this.parseUShort();
    if (substFormat === 1) {
        return {
            substFormat: 1,
            coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
            deltaGlyphId: this.parseUShort()
        };
    } else if (substFormat === 2) {
        return {
            substFormat: 2,
            coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
            substitute: this.parseOffset16List()
        };
    }
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(false, '0x' + start.toString(16) + ': lookup type 1 format must be 1 or 2.');
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#MS
subtableParsers[2] = function parseLookup2() {
    const substFormat = this.parseUShort();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(substFormat === 1, 'GSUB Multiple Substitution Subtable identifier-format must be 1');
    return {
        substFormat: substFormat,
        coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
        sequences: this.parseListOfLists()
    };
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#AS
subtableParsers[3] = function parseLookup3() {
    const substFormat = this.parseUShort();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(substFormat === 1, 'GSUB Alternate Substitution Subtable identifier-format must be 1');
    return {
        substFormat: substFormat,
        coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
        alternateSets: this.parseListOfLists()
    };
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#LS
subtableParsers[4] = function parseLookup4() {
    const substFormat = this.parseUShort();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(substFormat === 1, 'GSUB ligature table identifier-format must be 1');
    return {
        substFormat: substFormat,
        coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
        ligatureSets: this.parseListOfLists(function() {
            return {
                ligGlyph: this.parseUShort(),
                components: this.parseUShortList(this.parseUShort() - 1)
            };
        })
    };
};

const lookupRecordDesc = {
    sequenceIndex: _parse__WEBPACK_IMPORTED_MODULE_1__.Parser.uShort,
    lookupListIndex: _parse__WEBPACK_IMPORTED_MODULE_1__.Parser.uShort
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#CSF
subtableParsers[5] = function parseLookup5() {
    const start = this.offset + this.relativeOffset;
    const substFormat = this.parseUShort();

    if (substFormat === 1) {
        return {
            substFormat: substFormat,
            coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
            ruleSets: this.parseListOfLists(function() {
                const glyphCount = this.parseUShort();
                const substCount = this.parseUShort();
                return {
                    input: this.parseUShortList(glyphCount - 1),
                    lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
                };
            })
        };
    } else if (substFormat === 2) {
        return {
            substFormat: substFormat,
            coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
            classDef: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.classDef),
            classSets: this.parseListOfLists(function() {
                const glyphCount = this.parseUShort();
                const substCount = this.parseUShort();
                return {
                    classes: this.parseUShortList(glyphCount - 1),
                    lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
                };
            })
        };
    } else if (substFormat === 3) {
        const glyphCount = this.parseUShort();
        const substCount = this.parseUShort();
        return {
            substFormat: substFormat,
            coverages: this.parseList(glyphCount, _parse__WEBPACK_IMPORTED_MODULE_1__.Parser.pointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage)),
            lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
        };
    }
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(false, '0x' + start.toString(16) + ': lookup type 5 format must be 1, 2 or 3.');
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#CC
subtableParsers[6] = function parseLookup6() {
    const start = this.offset + this.relativeOffset;
    const substFormat = this.parseUShort();
    if (substFormat === 1) {
        return {
            substFormat: 1,
            coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
            chainRuleSets: this.parseListOfLists(function() {
                return {
                    backtrack: this.parseUShortList(),
                    input: this.parseUShortList(this.parseShort() - 1),
                    lookahead: this.parseUShortList(),
                    lookupRecords: this.parseRecordList(lookupRecordDesc)
                };
            })
        };
    } else if (substFormat === 2) {
        return {
            substFormat: 2,
            coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
            backtrackClassDef: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.classDef),
            inputClassDef: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.classDef),
            lookaheadClassDef: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.classDef),
            chainClassSet: this.parseListOfLists(function() {
                return {
                    backtrack: this.parseUShortList(),
                    input: this.parseUShortList(this.parseShort() - 1),
                    lookahead: this.parseUShortList(),
                    lookupRecords: this.parseRecordList(lookupRecordDesc)
                };
            })
        };
    } else if (substFormat === 3) {
        return {
            substFormat: 3,
            backtrackCoverage: this.parseList(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.pointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage)),
            inputCoverage: this.parseList(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.pointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage)),
            lookaheadCoverage: this.parseList(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.pointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage)),
            lookupRecords: this.parseRecordList(lookupRecordDesc)
        };
    }
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(false, '0x' + start.toString(16) + ': lookup type 6 format must be 1, 2 or 3.');
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#ES
subtableParsers[7] = function parseLookup7() {
    // Extension Substitution subtable
    const substFormat = this.parseUShort();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(substFormat === 1, 'GSUB Extension Substitution subtable identifier-format must be 1');
    const extensionLookupType = this.parseUShort();
    const extensionParser = new _parse__WEBPACK_IMPORTED_MODULE_1__.Parser(this.data, this.offset + this.parseULong());
    return {
        substFormat: 1,
        lookupType: extensionLookupType,
        extension: subtableParsers[extensionLookupType].call(extensionParser)
    };
};

// https://www.microsoft.com/typography/OTSPEC/GSUB.htm#RCCS
subtableParsers[8] = function parseLookup8() {
    const substFormat = this.parseUShort();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(substFormat === 1, 'GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1');
    return {
        substFormat: substFormat,
        coverage: this.parsePointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage),
        backtrackCoverage: this.parseList(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.pointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage)),
        lookaheadCoverage: this.parseList(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.pointer(_parse__WEBPACK_IMPORTED_MODULE_1__.Parser.coverage)),
        substitutes: this.parseUShortList()
    };
};

// https://www.microsoft.com/typography/OTSPEC/gsub.htm
function parseGsubTable(data, start) {
    start = start || 0;
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__.Parser(data, start);
    const tableVersion = p.parseVersion();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(tableVersion === 1, 'Unsupported GSUB table version.');
    return {
        version: tableVersion,
        scripts: p.parseScriptList(),
        features: p.parseFeatureList(),
        lookups: p.parseLookupList(subtableParsers)
    };
}

// GSUB Writing //////////////////////////////////////////////
const subtableMakers = new Array(9);

subtableMakers[1] = function makeLookup1(subtable) {
    if (subtable.substFormat === 1) {
        return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('substitutionTable', [
            {name: 'substFormat', type: 'USHORT', value: 1},
            {name: 'coverage', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Coverage(subtable.coverage)},
            {name: 'deltaGlyphID', type: 'USHORT', value: subtable.deltaGlyphId}
        ]);
    } else {
        return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('substitutionTable', [
            {name: 'substFormat', type: 'USHORT', value: 2},
            {name: 'coverage', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Coverage(subtable.coverage)}
        ].concat(_table__WEBPACK_IMPORTED_MODULE_2__["default"].ushortList('substitute', subtable.substitute)));
    }
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].fail('Lookup type 1 substFormat must be 1 or 2.');
};

subtableMakers[3] = function makeLookup3(subtable) {
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(subtable.substFormat === 1, 'Lookup type 3 substFormat must be 1.');
    return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('substitutionTable', [
        {name: 'substFormat', type: 'USHORT', value: 1},
        {name: 'coverage', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Coverage(subtable.coverage)}
    ].concat(_table__WEBPACK_IMPORTED_MODULE_2__["default"].tableList('altSet', subtable.alternateSets, function(alternateSet) {
        return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('alternateSetTable', _table__WEBPACK_IMPORTED_MODULE_2__["default"].ushortList('alternate', alternateSet));
    })));
};

subtableMakers[4] = function makeLookup4(subtable) {
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].assert(subtable.substFormat === 1, 'Lookup type 4 substFormat must be 1.');
    return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('substitutionTable', [
        {name: 'substFormat', type: 'USHORT', value: 1},
        {name: 'coverage', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Coverage(subtable.coverage)}
    ].concat(_table__WEBPACK_IMPORTED_MODULE_2__["default"].tableList('ligSet', subtable.ligatureSets, function(ligatureSet) {
        return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('ligatureSetTable', _table__WEBPACK_IMPORTED_MODULE_2__["default"].tableList('ligature', ligatureSet, function(ligature) {
            return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('ligatureTable',
                [{name: 'ligGlyph', type: 'USHORT', value: ligature.ligGlyph}]
                .concat(_table__WEBPACK_IMPORTED_MODULE_2__["default"].ushortList('component', ligature.components, ligature.components.length + 1))
            );
        }));
    })));
};

function makeGsubTable(gsub) {
    return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('GSUB', [
        {name: 'version', type: 'ULONG', value: 0x10000},
        {name: 'scripts', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].ScriptList(gsub.scripts)},
        {name: 'features', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].FeatureList(gsub.features)},
        {name: 'lookups', type: 'TABLE', value: new _table__WEBPACK_IMPORTED_MODULE_2__["default"].LookupList(gsub.lookups, subtableMakers)}
    ]);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseGsubTable, make: makeGsubTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/head.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/head.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `head` table contains global information about the font.
// https://www.microsoft.com/typography/OTSPEC/head.htm





// Parse the header `head` table
function parseHeadTable(data, start) {
    const head = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    head.version = p.parseVersion();
    head.fontRevision = Math.round(p.parseFixed() * 1000) / 1000;
    head.checkSumAdjustment = p.parseULong();
    head.magicNumber = p.parseULong();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(head.magicNumber === 0x5F0F3CF5, 'Font header has wrong magic number.');
    head.flags = p.parseUShort();
    head.unitsPerEm = p.parseUShort();
    head.created = p.parseLongDateTime();
    head.modified = p.parseLongDateTime();
    head.xMin = p.parseShort();
    head.yMin = p.parseShort();
    head.xMax = p.parseShort();
    head.yMax = p.parseShort();
    head.macStyle = p.parseUShort();
    head.lowestRecPPEM = p.parseUShort();
    head.fontDirectionHint = p.parseShort();
    head.indexToLocFormat = p.parseShort();
    head.glyphDataFormat = p.parseShort();
    return head;
}

function makeHeadTable(options) {
    // Apple Mac timestamp epoch is 01/01/1904 not 01/01/1970
    const timestamp = Math.round(new Date().getTime() / 1000) + 2082844800;
    let createdTimestamp = timestamp;

    if (options.createdTimestamp) {
        createdTimestamp = options.createdTimestamp + 2082844800;
    }

    return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('head', [
        {name: 'version', type: 'FIXED', value: 0x00010000},
        {name: 'fontRevision', type: 'FIXED', value: 0x00010000},
        {name: 'checkSumAdjustment', type: 'ULONG', value: 0},
        {name: 'magicNumber', type: 'ULONG', value: 0x5F0F3CF5},
        {name: 'flags', type: 'USHORT', value: 0},
        {name: 'unitsPerEm', type: 'USHORT', value: 1000},
        {name: 'created', type: 'LONGDATETIME', value: createdTimestamp},
        {name: 'modified', type: 'LONGDATETIME', value: timestamp},
        {name: 'xMin', type: 'SHORT', value: 0},
        {name: 'yMin', type: 'SHORT', value: 0},
        {name: 'xMax', type: 'SHORT', value: 0},
        {name: 'yMax', type: 'SHORT', value: 0},
        {name: 'macStyle', type: 'USHORT', value: 0},
        {name: 'lowestRecPPEM', type: 'USHORT', value: 0},
        {name: 'fontDirectionHint', type: 'SHORT', value: 2},
        {name: 'indexToLocFormat', type: 'SHORT', value: 0},
        {name: 'glyphDataFormat', type: 'SHORT', value: 0}
    ], options);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseHeadTable, make: makeHeadTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hhea.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hhea.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `hhea` table contains information for horizontal layout.
// https://www.microsoft.com/typography/OTSPEC/hhea.htm




// Parse the horizontal header `hhea` table
function parseHheaTable(data, start) {
    const hhea = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_0__["default"].Parser(data, start);
    hhea.version = p.parseVersion();
    hhea.ascender = p.parseShort();
    hhea.descender = p.parseShort();
    hhea.lineGap = p.parseShort();
    hhea.advanceWidthMax = p.parseUShort();
    hhea.minLeftSideBearing = p.parseShort();
    hhea.minRightSideBearing = p.parseShort();
    hhea.xMaxExtent = p.parseShort();
    hhea.caretSlopeRise = p.parseShort();
    hhea.caretSlopeRun = p.parseShort();
    hhea.caretOffset = p.parseShort();
    p.relativeOffset += 8;
    hhea.metricDataFormat = p.parseShort();
    hhea.numberOfHMetrics = p.parseUShort();
    return hhea;
}

function makeHheaTable(options) {
    return new _table__WEBPACK_IMPORTED_MODULE_1__["default"].Table('hhea', [
        {name: 'version', type: 'FIXED', value: 0x00010000},
        {name: 'ascender', type: 'FWORD', value: 0},
        {name: 'descender', type: 'FWORD', value: 0},
        {name: 'lineGap', type: 'FWORD', value: 0},
        {name: 'advanceWidthMax', type: 'UFWORD', value: 0},
        {name: 'minLeftSideBearing', type: 'FWORD', value: 0},
        {name: 'minRightSideBearing', type: 'FWORD', value: 0},
        {name: 'xMaxExtent', type: 'FWORD', value: 0},
        {name: 'caretSlopeRise', type: 'SHORT', value: 1},
        {name: 'caretSlopeRun', type: 'SHORT', value: 0},
        {name: 'caretOffset', type: 'SHORT', value: 0},
        {name: 'reserved1', type: 'SHORT', value: 0},
        {name: 'reserved2', type: 'SHORT', value: 0},
        {name: 'reserved3', type: 'SHORT', value: 0},
        {name: 'reserved4', type: 'SHORT', value: 0},
        {name: 'metricDataFormat', type: 'SHORT', value: 0},
        {name: 'numberOfHMetrics', type: 'USHORT', value: 0}
    ], options);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseHheaTable, make: makeHheaTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hmtx.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hmtx.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `hmtx` table contains the horizontal metrics for all glyphs.
// https://www.microsoft.com/typography/OTSPEC/hmtx.htm




// Parse the `hmtx` table, which contains the horizontal metrics for all glyphs.
// This function augments the glyph array, adding the advanceWidth and leftSideBearing to each glyph.
function parseHmtxTable(data, start, numMetrics, numGlyphs, glyphs) {
    let advanceWidth;
    let leftSideBearing;
    const p = new _parse__WEBPACK_IMPORTED_MODULE_0__["default"].Parser(data, start);
    for (let i = 0; i < numGlyphs; i += 1) {
        // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
        if (i < numMetrics) {
            advanceWidth = p.parseUShort();
            leftSideBearing = p.parseShort();
        }

        const glyph = glyphs.get(i);
        glyph.advanceWidth = advanceWidth;
        glyph.leftSideBearing = leftSideBearing;
    }
}

function makeHmtxTable(glyphs) {
    const t = new _table__WEBPACK_IMPORTED_MODULE_1__["default"].Table('hmtx', []);
    for (let i = 0; i < glyphs.length; i += 1) {
        const glyph = glyphs.get(i);
        const advanceWidth = glyph.advanceWidth || 0;
        const leftSideBearing = glyph.leftSideBearing || 0;
        t.fields.push({name: 'advanceWidth_' + i, type: 'USHORT', value: advanceWidth});
        t.fields.push({name: 'leftSideBearing_' + i, type: 'SHORT', value: leftSideBearing});
    }

    return t;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseHmtxTable, make: makeHmtxTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/kern.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/kern.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
// The `kern` table contains kerning pairs.
// Note that some fonts use the GPOS OpenType layout table to specify kerning.
// https://www.microsoft.com/typography/OTSPEC/kern.htm




function parseWindowsKernTable(p) {
    const pairs = {};
    // Skip nTables.
    p.skip('uShort');
    const subtableVersion = p.parseUShort();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(subtableVersion === 0, 'Unsupported kern sub-table version.');
    // Skip subtableLength, subtableCoverage
    p.skip('uShort', 2);
    const nPairs = p.parseUShort();
    // Skip searchRange, entrySelector, rangeShift.
    p.skip('uShort', 3);
    for (let i = 0; i < nPairs; i += 1) {
        const leftIndex = p.parseUShort();
        const rightIndex = p.parseUShort();
        const value = p.parseShort();
        pairs[leftIndex + ',' + rightIndex] = value;
    }
    return pairs;
}

function parseMacKernTable(p) {
    const pairs = {};
    // The Mac kern table stores the version as a fixed (32 bits) but we only loaded the first 16 bits.
    // Skip the rest.
    p.skip('uShort');
    const nTables = p.parseULong();
    //check.argument(nTables === 1, 'Only 1 subtable is supported (got ' + nTables + ').');
    if (nTables > 1) {
        console.warn('Only the first kern subtable is supported.');
    }
    p.skip('uLong');
    const coverage = p.parseUShort();
    const subtableVersion = coverage & 0xFF;
    p.skip('uShort');
    if (subtableVersion === 0) {
        const nPairs = p.parseUShort();
        // Skip searchRange, entrySelector, rangeShift.
        p.skip('uShort', 3);
        for (let i = 0; i < nPairs; i += 1) {
            const leftIndex = p.parseUShort();
            const rightIndex = p.parseUShort();
            const value = p.parseShort();
            pairs[leftIndex + ',' + rightIndex] = value;
        }
    }
    return pairs;
}

// Parse the `kern` table which contains kerning pairs.
function parseKernTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const tableVersion = p.parseUShort();
    if (tableVersion === 0) {
        return parseWindowsKernTable(p);
    } else if (tableVersion === 1) {
        return parseMacKernTable(p);
    } else {
        throw new Error('Unsupported kern table version (' + tableVersion + ').');
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseKernTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/loca.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/loca.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
// The `loca` table stores the offsets to the locations of the glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/loca.htm



// Parse the `loca` table. This table stores the offsets to the locations of the glyphs in the font,
// relative to the beginning of the glyphData table.
// The number of glyphs stored in the `loca` table is specified in the `maxp` table (under numGlyphs)
// The loca table has two versions: a short version where offsets are stored as uShorts, and a long
// version where offsets are stored as uLongs. The `head` table specifies which version to use
// (under indexToLocFormat).
function parseLocaTable(data, start, numGlyphs, shortVersion) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_0__["default"].Parser(data, start);
    const parseFn = shortVersion ? p.parseUShort : p.parseULong;
    // There is an extra entry after the last index element to compute the length of the last glyph.
    // That's why we use numGlyphs + 1.
    const glyphOffsets = [];
    for (let i = 0; i < numGlyphs + 1; i += 1) {
        let glyphOffset = parseFn.call(p);
        if (shortVersion) {
            // The short table version stores the actual offset divided by 2.
            glyphOffset *= 2;
        }

        glyphOffsets.push(glyphOffset);
    }

    return glyphOffsets;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseLocaTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/ltag.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/ltag.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `ltag` table stores IETF BCP-47 language tags. It allows supporting
// languages for which TrueType does not assign a numeric code.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6ltag.html
// http://www.w3.org/International/articles/language-tags/
// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry





function makeLtagTable(tags) {
    const result = new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('ltag', [
        {name: 'version', type: 'ULONG', value: 1},
        {name: 'flags', type: 'ULONG', value: 0},
        {name: 'numTags', type: 'ULONG', value: tags.length}
    ]);

    let stringPool = '';
    const stringPoolOffset = 12 + tags.length * 4;
    for (let i = 0; i < tags.length; ++i) {
        let pos = stringPool.indexOf(tags[i]);
        if (pos < 0) {
            pos = stringPool.length;
            stringPool += tags[i];
        }

        result.fields.push({name: 'offset ' + i, type: 'USHORT', value: stringPoolOffset + pos});
        result.fields.push({name: 'length ' + i, type: 'USHORT', value: tags[i].length});
    }

    result.fields.push({name: 'stringPool', type: 'CHARARRAY', value: stringPool});
    return result;
}

function parseLtagTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const tableVersion = p.parseULong();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(tableVersion === 1, 'Unsupported ltag table version.');
    // The 'ltag' specification does not define any flags; skip the field.
    p.skip('uLong', 1);
    const numTags = p.parseULong();

    const tags = [];
    for (let i = 0; i < numTags; i++) {
        let tag = '';
        const offset = start + p.parseUShort();
        const length = p.parseUShort();
        for (let j = offset; j < offset + length; ++j) {
            tag += String.fromCharCode(data.getInt8(j));
        }

        tags.push(tag);
    }

    return tags;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ make: makeLtagTable, parse: parseLtagTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/maxp.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/maxp.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `maxp` table establishes the memory requirements for the font.
// We need it just to get the number of glyphs in the font.
// https://www.microsoft.com/typography/OTSPEC/maxp.htm




// Parse the maximum profile `maxp` table.
function parseMaxpTable(data, start) {
    const maxp = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_0__["default"].Parser(data, start);
    maxp.version = p.parseVersion();
    maxp.numGlyphs = p.parseUShort();
    if (maxp.version === 1.0) {
        maxp.maxPoints = p.parseUShort();
        maxp.maxContours = p.parseUShort();
        maxp.maxCompositePoints = p.parseUShort();
        maxp.maxCompositeContours = p.parseUShort();
        maxp.maxZones = p.parseUShort();
        maxp.maxTwilightPoints = p.parseUShort();
        maxp.maxStorage = p.parseUShort();
        maxp.maxFunctionDefs = p.parseUShort();
        maxp.maxInstructionDefs = p.parseUShort();
        maxp.maxStackElements = p.parseUShort();
        maxp.maxSizeOfInstructions = p.parseUShort();
        maxp.maxComponentElements = p.parseUShort();
        maxp.maxComponentDepth = p.parseUShort();
    }

    return maxp;
}

function makeMaxpTable(numGlyphs) {
    return new _table__WEBPACK_IMPORTED_MODULE_1__["default"].Table('maxp', [
        {name: 'version', type: 'FIXED', value: 0x00005000},
        {name: 'numGlyphs', type: 'USHORT', value: numGlyphs}
    ]);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseMaxpTable, make: makeMaxpTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/meta.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/meta.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/types.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `GPOS` table contains kerning pairs, among other things.
// https://www.microsoft.com/typography/OTSPEC/gpos.htm






// Parse the metadata `meta` table.
// https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6meta.html
function parseMetaTable(data, start) {
    const p = new _parse__WEBPACK_IMPORTED_MODULE_2__["default"].Parser(data, start);
    const tableVersion = p.parseULong();
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(tableVersion === 1, 'Unsupported META table version.');
    p.parseULong(); // flags - currently unused and set to 0
    p.parseULong(); // tableOffset
    const numDataMaps = p.parseULong();

    const tags = {};
    for (let i = 0; i < numDataMaps; i++) {
        const tag = p.parseTag();
        const dataOffset = p.parseULong();
        const dataLength = p.parseULong();
        const text = _types__WEBPACK_IMPORTED_MODULE_1__.decode.UTF8(data, start + dataOffset, dataLength);

        tags[tag] = text;
    }
    return tags;
}

function makeMetaTable(tags) {
    const numTags = Object.keys(tags).length;
    let stringPool = '';
    const stringPoolOffset = 16 + numTags * 12;

    const result = new _table__WEBPACK_IMPORTED_MODULE_3__["default"].Table('meta', [
        {name: 'version', type: 'ULONG', value: 1},
        {name: 'flags', type: 'ULONG', value: 0},
        {name: 'offset', type: 'ULONG', value: stringPoolOffset},
        {name: 'numTags', type: 'ULONG', value: numTags}
    ]);

    for (let tag in tags) {
        const pos = stringPool.length;
        stringPool += tags[tag];

        result.fields.push({name: 'tag ' + tag, type: 'TAG', value: tag});
        result.fields.push({name: 'offset ' + tag, type: 'ULONG', value: stringPoolOffset + pos});
        result.fields.push({name: 'length ' + tag, type: 'ULONG', value: tags[tag].length});
    }

    result.fields.push({name: 'stringPool', type: 'CHARARRAY', value: stringPool});

    return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseMetaTable, make: makeMetaTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/name.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/name.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/types.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `name` naming table.
// https://www.microsoft.com/typography/OTSPEC/name.htm





// NameIDs for the name table.
const nameTableNames = [
    'copyright',              // 0
    'fontFamily',             // 1
    'fontSubfamily',          // 2
    'uniqueID',               // 3
    'fullName',               // 4
    'version',                // 5
    'postScriptName',         // 6
    'trademark',              // 7
    'manufacturer',           // 8
    'designer',               // 9
    'description',            // 10
    'manufacturerURL',        // 11
    'designerURL',            // 12
    'license',                // 13
    'licenseURL',             // 14
    'reserved',               // 15
    'preferredFamily',        // 16
    'preferredSubfamily',     // 17
    'compatibleFullName',     // 18
    'sampleText',             // 19
    'postScriptFindFontName', // 20
    'wwsFamily',              // 21
    'wwsSubfamily'            // 22
];

const macLanguages = {
    0: 'en',
    1: 'fr',
    2: 'de',
    3: 'it',
    4: 'nl',
    5: 'sv',
    6: 'es',
    7: 'da',
    8: 'pt',
    9: 'no',
    10: 'he',
    11: 'ja',
    12: 'ar',
    13: 'fi',
    14: 'el',
    15: 'is',
    16: 'mt',
    17: 'tr',
    18: 'hr',
    19: 'zh-Hant',
    20: 'ur',
    21: 'hi',
    22: 'th',
    23: 'ko',
    24: 'lt',
    25: 'pl',
    26: 'hu',
    27: 'es',
    28: 'lv',
    29: 'se',
    30: 'fo',
    31: 'fa',
    32: 'ru',
    33: 'zh',
    34: 'nl-BE',
    35: 'ga',
    36: 'sq',
    37: 'ro',
    38: 'cz',
    39: 'sk',
    40: 'si',
    41: 'yi',
    42: 'sr',
    43: 'mk',
    44: 'bg',
    45: 'uk',
    46: 'be',
    47: 'uz',
    48: 'kk',
    49: 'az-Cyrl',
    50: 'az-Arab',
    51: 'hy',
    52: 'ka',
    53: 'mo',
    54: 'ky',
    55: 'tg',
    56: 'tk',
    57: 'mn-CN',
    58: 'mn',
    59: 'ps',
    60: 'ks',
    61: 'ku',
    62: 'sd',
    63: 'bo',
    64: 'ne',
    65: 'sa',
    66: 'mr',
    67: 'bn',
    68: 'as',
    69: 'gu',
    70: 'pa',
    71: 'or',
    72: 'ml',
    73: 'kn',
    74: 'ta',
    75: 'te',
    76: 'si',
    77: 'my',
    78: 'km',
    79: 'lo',
    80: 'vi',
    81: 'id',
    82: 'tl',
    83: 'ms',
    84: 'ms-Arab',
    85: 'am',
    86: 'ti',
    87: 'om',
    88: 'so',
    89: 'sw',
    90: 'rw',
    91: 'rn',
    92: 'ny',
    93: 'mg',
    94: 'eo',
    128: 'cy',
    129: 'eu',
    130: 'ca',
    131: 'la',
    132: 'qu',
    133: 'gn',
    134: 'ay',
    135: 'tt',
    136: 'ug',
    137: 'dz',
    138: 'jv',
    139: 'su',
    140: 'gl',
    141: 'af',
    142: 'br',
    143: 'iu',
    144: 'gd',
    145: 'gv',
    146: 'ga',
    147: 'to',
    148: 'el-polyton',
    149: 'kl',
    150: 'az',
    151: 'nn'
};

// MacOS language ID → MacOS script ID
//
// Note that the script ID is not sufficient to determine what encoding
// to use in TrueType files. For some languages, MacOS used a modification
// of a mainstream script. For example, an Icelandic name would be stored
// with smRoman in the TrueType naming table, but the actual encoding
// is a special Icelandic version of the normal Macintosh Roman encoding.
// As another example, Inuktitut uses an 8-bit encoding for Canadian Aboriginal
// Syllables but MacOS had run out of available script codes, so this was
// done as a (pretty radical) "modification" of Ethiopic.
//
// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
const macLanguageToScript = {
    0: 0,  // langEnglish → smRoman
    1: 0,  // langFrench → smRoman
    2: 0,  // langGerman → smRoman
    3: 0,  // langItalian → smRoman
    4: 0,  // langDutch → smRoman
    5: 0,  // langSwedish → smRoman
    6: 0,  // langSpanish → smRoman
    7: 0,  // langDanish → smRoman
    8: 0,  // langPortuguese → smRoman
    9: 0,  // langNorwegian → smRoman
    10: 5,  // langHebrew → smHebrew
    11: 1,  // langJapanese → smJapanese
    12: 4,  // langArabic → smArabic
    13: 0,  // langFinnish → smRoman
    14: 6,  // langGreek → smGreek
    15: 0,  // langIcelandic → smRoman (modified)
    16: 0,  // langMaltese → smRoman
    17: 0,  // langTurkish → smRoman (modified)
    18: 0,  // langCroatian → smRoman (modified)
    19: 2,  // langTradChinese → smTradChinese
    20: 4,  // langUrdu → smArabic
    21: 9,  // langHindi → smDevanagari
    22: 21,  // langThai → smThai
    23: 3,  // langKorean → smKorean
    24: 29,  // langLithuanian → smCentralEuroRoman
    25: 29,  // langPolish → smCentralEuroRoman
    26: 29,  // langHungarian → smCentralEuroRoman
    27: 29,  // langEstonian → smCentralEuroRoman
    28: 29,  // langLatvian → smCentralEuroRoman
    29: 0,  // langSami → smRoman
    30: 0,  // langFaroese → smRoman (modified)
    31: 4,  // langFarsi → smArabic (modified)
    32: 7,  // langRussian → smCyrillic
    33: 25,  // langSimpChinese → smSimpChinese
    34: 0,  // langFlemish → smRoman
    35: 0,  // langIrishGaelic → smRoman (modified)
    36: 0,  // langAlbanian → smRoman
    37: 0,  // langRomanian → smRoman (modified)
    38: 29,  // langCzech → smCentralEuroRoman
    39: 29,  // langSlovak → smCentralEuroRoman
    40: 0,  // langSlovenian → smRoman (modified)
    41: 5,  // langYiddish → smHebrew
    42: 7,  // langSerbian → smCyrillic
    43: 7,  // langMacedonian → smCyrillic
    44: 7,  // langBulgarian → smCyrillic
    45: 7,  // langUkrainian → smCyrillic (modified)
    46: 7,  // langByelorussian → smCyrillic
    47: 7,  // langUzbek → smCyrillic
    48: 7,  // langKazakh → smCyrillic
    49: 7,  // langAzerbaijani → smCyrillic
    50: 4,  // langAzerbaijanAr → smArabic
    51: 24,  // langArmenian → smArmenian
    52: 23,  // langGeorgian → smGeorgian
    53: 7,  // langMoldavian → smCyrillic
    54: 7,  // langKirghiz → smCyrillic
    55: 7,  // langTajiki → smCyrillic
    56: 7,  // langTurkmen → smCyrillic
    57: 27,  // langMongolian → smMongolian
    58: 7,  // langMongolianCyr → smCyrillic
    59: 4,  // langPashto → smArabic
    60: 4,  // langKurdish → smArabic
    61: 4,  // langKashmiri → smArabic
    62: 4,  // langSindhi → smArabic
    63: 26,  // langTibetan → smTibetan
    64: 9,  // langNepali → smDevanagari
    65: 9,  // langSanskrit → smDevanagari
    66: 9,  // langMarathi → smDevanagari
    67: 13,  // langBengali → smBengali
    68: 13,  // langAssamese → smBengali
    69: 11,  // langGujarati → smGujarati
    70: 10,  // langPunjabi → smGurmukhi
    71: 12,  // langOriya → smOriya
    72: 17,  // langMalayalam → smMalayalam
    73: 16,  // langKannada → smKannada
    74: 14,  // langTamil → smTamil
    75: 15,  // langTelugu → smTelugu
    76: 18,  // langSinhalese → smSinhalese
    77: 19,  // langBurmese → smBurmese
    78: 20,  // langKhmer → smKhmer
    79: 22,  // langLao → smLao
    80: 30,  // langVietnamese → smVietnamese
    81: 0,  // langIndonesian → smRoman
    82: 0,  // langTagalog → smRoman
    83: 0,  // langMalayRoman → smRoman
    84: 4,  // langMalayArabic → smArabic
    85: 28,  // langAmharic → smEthiopic
    86: 28,  // langTigrinya → smEthiopic
    87: 28,  // langOromo → smEthiopic
    88: 0,  // langSomali → smRoman
    89: 0,  // langSwahili → smRoman
    90: 0,  // langKinyarwanda → smRoman
    91: 0,  // langRundi → smRoman
    92: 0,  // langNyanja → smRoman
    93: 0,  // langMalagasy → smRoman
    94: 0,  // langEsperanto → smRoman
    128: 0,  // langWelsh → smRoman (modified)
    129: 0,  // langBasque → smRoman
    130: 0,  // langCatalan → smRoman
    131: 0,  // langLatin → smRoman
    132: 0,  // langQuechua → smRoman
    133: 0,  // langGuarani → smRoman
    134: 0,  // langAymara → smRoman
    135: 7,  // langTatar → smCyrillic
    136: 4,  // langUighur → smArabic
    137: 26,  // langDzongkha → smTibetan
    138: 0,  // langJavaneseRom → smRoman
    139: 0,  // langSundaneseRom → smRoman
    140: 0,  // langGalician → smRoman
    141: 0,  // langAfrikaans → smRoman
    142: 0,  // langBreton → smRoman (modified)
    143: 28,  // langInuktitut → smEthiopic (modified)
    144: 0,  // langScottishGaelic → smRoman (modified)
    145: 0,  // langManxGaelic → smRoman (modified)
    146: 0,  // langIrishGaelicScript → smRoman (modified)
    147: 0,  // langTongan → smRoman
    148: 6,  // langGreekAncient → smRoman
    149: 0,  // langGreenlandic → smRoman
    150: 0,  // langAzerbaijanRoman → smRoman
    151: 0   // langNynorsk → smRoman
};

// While Microsoft indicates a region/country for all its language
// IDs, we omit the region code if it's equal to the "most likely
// region subtag" according to Unicode CLDR. For scripts, we omit
// the subtag if it is equal to the Suppress-Script entry in the
// IANA language subtag registry for IETF BCP 47.
//
// For example, Microsoft states that its language code 0x041A is
// Croatian in Croatia. We transform this to the BCP 47 language code 'hr'
// and not 'hr-HR' because Croatia is the default country for Croatian,
// according to Unicode CLDR. As another example, Microsoft states
// that 0x101A is Croatian (Latin) in Bosnia-Herzegovina. We transform
// this to 'hr-BA' and not 'hr-Latn-BA' because Latin is the default script
// for the Croatian language, according to IANA.
//
// http://www.unicode.org/cldr/charts/latest/supplemental/likely_subtags.html
// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
const windowsLanguages = {
    0x0436: 'af',
    0x041C: 'sq',
    0x0484: 'gsw',
    0x045E: 'am',
    0x1401: 'ar-DZ',
    0x3C01: 'ar-BH',
    0x0C01: 'ar',
    0x0801: 'ar-IQ',
    0x2C01: 'ar-JO',
    0x3401: 'ar-KW',
    0x3001: 'ar-LB',
    0x1001: 'ar-LY',
    0x1801: 'ary',
    0x2001: 'ar-OM',
    0x4001: 'ar-QA',
    0x0401: 'ar-SA',
    0x2801: 'ar-SY',
    0x1C01: 'aeb',
    0x3801: 'ar-AE',
    0x2401: 'ar-YE',
    0x042B: 'hy',
    0x044D: 'as',
    0x082C: 'az-Cyrl',
    0x042C: 'az',
    0x046D: 'ba',
    0x042D: 'eu',
    0x0423: 'be',
    0x0845: 'bn',
    0x0445: 'bn-IN',
    0x201A: 'bs-Cyrl',
    0x141A: 'bs',
    0x047E: 'br',
    0x0402: 'bg',
    0x0403: 'ca',
    0x0C04: 'zh-HK',
    0x1404: 'zh-MO',
    0x0804: 'zh',
    0x1004: 'zh-SG',
    0x0404: 'zh-TW',
    0x0483: 'co',
    0x041A: 'hr',
    0x101A: 'hr-BA',
    0x0405: 'cs',
    0x0406: 'da',
    0x048C: 'prs',
    0x0465: 'dv',
    0x0813: 'nl-BE',
    0x0413: 'nl',
    0x0C09: 'en-AU',
    0x2809: 'en-BZ',
    0x1009: 'en-CA',
    0x2409: 'en-029',
    0x4009: 'en-IN',
    0x1809: 'en-IE',
    0x2009: 'en-JM',
    0x4409: 'en-MY',
    0x1409: 'en-NZ',
    0x3409: 'en-PH',
    0x4809: 'en-SG',
    0x1C09: 'en-ZA',
    0x2C09: 'en-TT',
    0x0809: 'en-GB',
    0x0409: 'en',
    0x3009: 'en-ZW',
    0x0425: 'et',
    0x0438: 'fo',
    0x0464: 'fil',
    0x040B: 'fi',
    0x080C: 'fr-BE',
    0x0C0C: 'fr-CA',
    0x040C: 'fr',
    0x140C: 'fr-LU',
    0x180C: 'fr-MC',
    0x100C: 'fr-CH',
    0x0462: 'fy',
    0x0456: 'gl',
    0x0437: 'ka',
    0x0C07: 'de-AT',
    0x0407: 'de',
    0x1407: 'de-LI',
    0x1007: 'de-LU',
    0x0807: 'de-CH',
    0x0408: 'el',
    0x046F: 'kl',
    0x0447: 'gu',
    0x0468: 'ha',
    0x040D: 'he',
    0x0439: 'hi',
    0x040E: 'hu',
    0x040F: 'is',
    0x0470: 'ig',
    0x0421: 'id',
    0x045D: 'iu',
    0x085D: 'iu-Latn',
    0x083C: 'ga',
    0x0434: 'xh',
    0x0435: 'zu',
    0x0410: 'it',
    0x0810: 'it-CH',
    0x0411: 'ja',
    0x044B: 'kn',
    0x043F: 'kk',
    0x0453: 'km',
    0x0486: 'quc',
    0x0487: 'rw',
    0x0441: 'sw',
    0x0457: 'kok',
    0x0412: 'ko',
    0x0440: 'ky',
    0x0454: 'lo',
    0x0426: 'lv',
    0x0427: 'lt',
    0x082E: 'dsb',
    0x046E: 'lb',
    0x042F: 'mk',
    0x083E: 'ms-BN',
    0x043E: 'ms',
    0x044C: 'ml',
    0x043A: 'mt',
    0x0481: 'mi',
    0x047A: 'arn',
    0x044E: 'mr',
    0x047C: 'moh',
    0x0450: 'mn',
    0x0850: 'mn-CN',
    0x0461: 'ne',
    0x0414: 'nb',
    0x0814: 'nn',
    0x0482: 'oc',
    0x0448: 'or',
    0x0463: 'ps',
    0x0415: 'pl',
    0x0416: 'pt',
    0x0816: 'pt-PT',
    0x0446: 'pa',
    0x046B: 'qu-BO',
    0x086B: 'qu-EC',
    0x0C6B: 'qu',
    0x0418: 'ro',
    0x0417: 'rm',
    0x0419: 'ru',
    0x243B: 'smn',
    0x103B: 'smj-NO',
    0x143B: 'smj',
    0x0C3B: 'se-FI',
    0x043B: 'se',
    0x083B: 'se-SE',
    0x203B: 'sms',
    0x183B: 'sma-NO',
    0x1C3B: 'sms',
    0x044F: 'sa',
    0x1C1A: 'sr-Cyrl-BA',
    0x0C1A: 'sr',
    0x181A: 'sr-Latn-BA',
    0x081A: 'sr-Latn',
    0x046C: 'nso',
    0x0432: 'tn',
    0x045B: 'si',
    0x041B: 'sk',
    0x0424: 'sl',
    0x2C0A: 'es-AR',
    0x400A: 'es-BO',
    0x340A: 'es-CL',
    0x240A: 'es-CO',
    0x140A: 'es-CR',
    0x1C0A: 'es-DO',
    0x300A: 'es-EC',
    0x440A: 'es-SV',
    0x100A: 'es-GT',
    0x480A: 'es-HN',
    0x080A: 'es-MX',
    0x4C0A: 'es-NI',
    0x180A: 'es-PA',
    0x3C0A: 'es-PY',
    0x280A: 'es-PE',
    0x500A: 'es-PR',

    // Microsoft has defined two different language codes for
    // “Spanish with modern sorting” and “Spanish with traditional
    // sorting”. This makes sense for collation APIs, and it would be
    // possible to express this in BCP 47 language tags via Unicode
    // extensions (eg., es-u-co-trad is Spanish with traditional
    // sorting). However, for storing names in fonts, the distinction
    // does not make sense, so we give “es” in both cases.
    0x0C0A: 'es',
    0x040A: 'es',

    0x540A: 'es-US',
    0x380A: 'es-UY',
    0x200A: 'es-VE',
    0x081D: 'sv-FI',
    0x041D: 'sv',
    0x045A: 'syr',
    0x0428: 'tg',
    0x085F: 'tzm',
    0x0449: 'ta',
    0x0444: 'tt',
    0x044A: 'te',
    0x041E: 'th',
    0x0451: 'bo',
    0x041F: 'tr',
    0x0442: 'tk',
    0x0480: 'ug',
    0x0422: 'uk',
    0x042E: 'hsb',
    0x0420: 'ur',
    0x0843: 'uz-Cyrl',
    0x0443: 'uz',
    0x042A: 'vi',
    0x0452: 'cy',
    0x0488: 'wo',
    0x0485: 'sah',
    0x0478: 'ii',
    0x046A: 'yo'
};

// Returns a IETF BCP 47 language code, for example 'zh-Hant'
// for 'Chinese in the traditional script'.
function getLanguageCode(platformID, languageID, ltag) {
    switch (platformID) {
        case 0:  // Unicode
            if (languageID === 0xFFFF) {
                return 'und';
            } else if (ltag) {
                return ltag[languageID];
            }

            break;

        case 1:  // Macintosh
            return macLanguages[languageID];

        case 3:  // Windows
            return windowsLanguages[languageID];
    }

    return undefined;
}

const utf16 = 'utf-16';

// MacOS script ID → encoding. This table stores the default case,
// which can be overridden by macLanguageEncodings.
const macScriptEncodings = {
    0: 'macintosh',           // smRoman
    1: 'x-mac-japanese',      // smJapanese
    2: 'x-mac-chinesetrad',   // smTradChinese
    3: 'x-mac-korean',        // smKorean
    6: 'x-mac-greek',         // smGreek
    7: 'x-mac-cyrillic',      // smCyrillic
    9: 'x-mac-devanagai',     // smDevanagari
    10: 'x-mac-gurmukhi',     // smGurmukhi
    11: 'x-mac-gujarati',     // smGujarati
    12: 'x-mac-oriya',        // smOriya
    13: 'x-mac-bengali',      // smBengali
    14: 'x-mac-tamil',        // smTamil
    15: 'x-mac-telugu',       // smTelugu
    16: 'x-mac-kannada',      // smKannada
    17: 'x-mac-malayalam',    // smMalayalam
    18: 'x-mac-sinhalese',    // smSinhalese
    19: 'x-mac-burmese',      // smBurmese
    20: 'x-mac-khmer',        // smKhmer
    21: 'x-mac-thai',         // smThai
    22: 'x-mac-lao',          // smLao
    23: 'x-mac-georgian',     // smGeorgian
    24: 'x-mac-armenian',     // smArmenian
    25: 'x-mac-chinesesimp',  // smSimpChinese
    26: 'x-mac-tibetan',      // smTibetan
    27: 'x-mac-mongolian',    // smMongolian
    28: 'x-mac-ethiopic',     // smEthiopic
    29: 'x-mac-ce',           // smCentralEuroRoman
    30: 'x-mac-vietnamese',   // smVietnamese
    31: 'x-mac-extarabic'     // smExtArabic
};

// MacOS language ID → encoding. This table stores the exceptional
// cases, which override macScriptEncodings. For writing MacOS naming
// tables, we need to emit a MacOS script ID. Therefore, we cannot
// merge macScriptEncodings into macLanguageEncodings.
//
// http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/Readme.txt
const macLanguageEncodings = {
    15: 'x-mac-icelandic',    // langIcelandic
    17: 'x-mac-turkish',      // langTurkish
    18: 'x-mac-croatian',     // langCroatian
    24: 'x-mac-ce',           // langLithuanian
    25: 'x-mac-ce',           // langPolish
    26: 'x-mac-ce',           // langHungarian
    27: 'x-mac-ce',           // langEstonian
    28: 'x-mac-ce',           // langLatvian
    30: 'x-mac-icelandic',    // langFaroese
    37: 'x-mac-romanian',     // langRomanian
    38: 'x-mac-ce',           // langCzech
    39: 'x-mac-ce',           // langSlovak
    40: 'x-mac-ce',           // langSlovenian
    143: 'x-mac-inuit',       // langInuktitut
    146: 'x-mac-gaelic'       // langIrishGaelicScript
};

function getEncoding(platformID, encodingID, languageID) {
    switch (platformID) {
        case 0:  // Unicode
            return utf16;

        case 1:  // Apple Macintosh
            return macLanguageEncodings[languageID] || macScriptEncodings[encodingID];

        case 3:  // Microsoft Windows
            if (encodingID === 1 || encodingID === 10) {
                return utf16;
            }

            break;
    }

    return undefined;
}

// Parse the naming `name` table.
// FIXME: Format 1 additional fields are not supported yet.
// ltag is the content of the `ltag' table, such as ['en', 'zh-Hans', 'de-CH-1904'].
function parseNameTable(data, start, ltag) {
    const name = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    const format = p.parseUShort();
    const count = p.parseUShort();
    const stringOffset = p.offset + p.parseUShort();
    for (let i = 0; i < count; i++) {
        const platformID = p.parseUShort();
        const encodingID = p.parseUShort();
        const languageID = p.parseUShort();
        const nameID = p.parseUShort();
        const property = nameTableNames[nameID] || nameID;
        const byteLength = p.parseUShort();
        const offset = p.parseUShort();
        const language = getLanguageCode(platformID, languageID, ltag);
        const encoding = getEncoding(platformID, encodingID, languageID);
        if (encoding !== undefined && language !== undefined) {
            let text;
            if (encoding === utf16) {
                text = _types__WEBPACK_IMPORTED_MODULE_0__.decode.UTF16(data, stringOffset + offset, byteLength);
            } else {
                text = _types__WEBPACK_IMPORTED_MODULE_0__.decode.MACSTRING(data, stringOffset + offset, byteLength, encoding);
            }

            if (text) {
                let translations = name[property];
                if (translations === undefined) {
                    translations = name[property] = {};
                }

                translations[language] = text;
            }
        }
    }

    let langTagCount = 0;
    if (format === 1) {
        // FIXME: Also handle Microsoft's 'name' table 1.
        langTagCount = p.parseUShort();
    }

    return name;
}

// {23: 'foo'} → {'foo': 23}
// ['bar', 'baz'] → {'bar': 0, 'baz': 1}
function reverseDict(dict) {
    const result = {};
    for (let key in dict) {
        result[dict[key]] = parseInt(key);
    }

    return result;
}

function makeNameRecord(platformID, encodingID, languageID, nameID, length, offset) {
    return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Record('NameRecord', [
        {name: 'platformID', type: 'USHORT', value: platformID},
        {name: 'encodingID', type: 'USHORT', value: encodingID},
        {name: 'languageID', type: 'USHORT', value: languageID},
        {name: 'nameID', type: 'USHORT', value: nameID},
        {name: 'length', type: 'USHORT', value: length},
        {name: 'offset', type: 'USHORT', value: offset}
    ]);
}

// Finds the position of needle in haystack, or -1 if not there.
// Like String.indexOf(), but for arrays.
function findSubArray(needle, haystack) {
    const needleLength = needle.length;
    const limit = haystack.length - needleLength + 1;

    loop:
    for (let pos = 0; pos < limit; pos++) {
        for (; pos < limit; pos++) {
            for (let k = 0; k < needleLength; k++) {
                if (haystack[pos + k] !== needle[k]) {
                    continue loop;
                }
            }

            return pos;
        }
    }

    return -1;
}

function addStringToPool(s, pool) {
    let offset = findSubArray(s, pool);
    if (offset < 0) {
        offset = pool.length;
        let i = 0;
        const len = s.length;
        for (; i < len; ++i) {
            pool.push(s[i]);
        }

    }

    return offset;
}

function makeNameTable(names, ltag) {
    let nameID;
    const nameIDs = [];

    const namesWithNumericKeys = {};
    const nameTableIds = reverseDict(nameTableNames);
    for (let key in names) {
        let id = nameTableIds[key];
        if (id === undefined) {
            id = key;
        }

        nameID = parseInt(id);

        if (isNaN(nameID)) {
            throw new Error('Name table entry "' + key + '" does not exist, see nameTableNames for complete list.');
        }

        namesWithNumericKeys[nameID] = names[key];
        nameIDs.push(nameID);
    }

    const macLanguageIds = reverseDict(macLanguages);
    const windowsLanguageIds = reverseDict(windowsLanguages);

    const nameRecords = [];
    const stringPool = [];

    for (let i = 0; i < nameIDs.length; i++) {
        nameID = nameIDs[i];
        const translations = namesWithNumericKeys[nameID];
        for (let lang in translations) {
            const text = translations[lang];

            // For MacOS, we try to emit the name in the form that was introduced
            // in the initial version of the TrueType spec (in the late 1980s).
            // However, this can fail for various reasons: the requested BCP 47
            // language code might not have an old-style Mac equivalent;
            // we might not have a codec for the needed character encoding;
            // or the name might contain characters that cannot be expressed
            // in the old-style Macintosh encoding. In case of failure, we emit
            // the name in a more modern fashion (Unicode encoding with BCP 47
            // language tags) that is recognized by MacOS 10.5, released in 2009.
            // If fonts were only read by operating systems, we could simply
            // emit all names in the modern form; this would be much easier.
            // However, there are many applications and libraries that read
            // 'name' tables directly, and these will usually only recognize
            // the ancient form (silently skipping the unrecognized names).
            let macPlatform = 1;  // Macintosh
            let macLanguage = macLanguageIds[lang];
            let macScript = macLanguageToScript[macLanguage];
            const macEncoding = getEncoding(macPlatform, macScript, macLanguage);
            let macName = _types__WEBPACK_IMPORTED_MODULE_0__.encode.MACSTRING(text, macEncoding);
            if (macName === undefined) {
                macPlatform = 0;  // Unicode
                macLanguage = ltag.indexOf(lang);
                if (macLanguage < 0) {
                    macLanguage = ltag.length;
                    ltag.push(lang);
                }

                macScript = 4;  // Unicode 2.0 and later
                macName = _types__WEBPACK_IMPORTED_MODULE_0__.encode.UTF16(text);
            }

            const macNameOffset = addStringToPool(macName, stringPool);
            nameRecords.push(makeNameRecord(macPlatform, macScript, macLanguage,
                                            nameID, macName.length, macNameOffset));

            const winLanguage = windowsLanguageIds[lang];
            if (winLanguage !== undefined) {
                const winName = _types__WEBPACK_IMPORTED_MODULE_0__.encode.UTF16(text);
                const winNameOffset = addStringToPool(winName, stringPool);
                nameRecords.push(makeNameRecord(3, 1, winLanguage,
                                                nameID, winName.length, winNameOffset));
            }
        }
    }

    nameRecords.sort(function(a, b) {
        return ((a.platformID - b.platformID) ||
                (a.encodingID - b.encodingID) ||
                (a.languageID - b.languageID) ||
                (a.nameID - b.nameID));
    });

    const t = new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('name', [
        {name: 'format', type: 'USHORT', value: 0},
        {name: 'count', type: 'USHORT', value: nameRecords.length},
        {name: 'stringOffset', type: 'USHORT', value: 6 + nameRecords.length * 12}
    ]);

    for (let r = 0; r < nameRecords.length; r++) {
        t.fields.push({name: 'record_' + r, type: 'RECORD', value: nameRecords[r]});
    }

    t.fields.push({name: 'strings', type: 'LITERAL', value: stringPool});
    return t;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseNameTable, make: makeNameTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/os2.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/os2.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `OS/2` table contains metrics required in OpenType fonts.
// https://www.microsoft.com/typography/OTSPEC/os2.htm




const unicodeRanges = [
    {begin: 0x0000, end: 0x007F}, // Basic Latin
    {begin: 0x0080, end: 0x00FF}, // Latin-1 Supplement
    {begin: 0x0100, end: 0x017F}, // Latin Extended-A
    {begin: 0x0180, end: 0x024F}, // Latin Extended-B
    {begin: 0x0250, end: 0x02AF}, // IPA Extensions
    {begin: 0x02B0, end: 0x02FF}, // Spacing Modifier Letters
    {begin: 0x0300, end: 0x036F}, // Combining Diacritical Marks
    {begin: 0x0370, end: 0x03FF}, // Greek and Coptic
    {begin: 0x2C80, end: 0x2CFF}, // Coptic
    {begin: 0x0400, end: 0x04FF}, // Cyrillic
    {begin: 0x0530, end: 0x058F}, // Armenian
    {begin: 0x0590, end: 0x05FF}, // Hebrew
    {begin: 0xA500, end: 0xA63F}, // Vai
    {begin: 0x0600, end: 0x06FF}, // Arabic
    {begin: 0x07C0, end: 0x07FF}, // NKo
    {begin: 0x0900, end: 0x097F}, // Devanagari
    {begin: 0x0980, end: 0x09FF}, // Bengali
    {begin: 0x0A00, end: 0x0A7F}, // Gurmukhi
    {begin: 0x0A80, end: 0x0AFF}, // Gujarati
    {begin: 0x0B00, end: 0x0B7F}, // Oriya
    {begin: 0x0B80, end: 0x0BFF}, // Tamil
    {begin: 0x0C00, end: 0x0C7F}, // Telugu
    {begin: 0x0C80, end: 0x0CFF}, // Kannada
    {begin: 0x0D00, end: 0x0D7F}, // Malayalam
    {begin: 0x0E00, end: 0x0E7F}, // Thai
    {begin: 0x0E80, end: 0x0EFF}, // Lao
    {begin: 0x10A0, end: 0x10FF}, // Georgian
    {begin: 0x1B00, end: 0x1B7F}, // Balinese
    {begin: 0x1100, end: 0x11FF}, // Hangul Jamo
    {begin: 0x1E00, end: 0x1EFF}, // Latin Extended Additional
    {begin: 0x1F00, end: 0x1FFF}, // Greek Extended
    {begin: 0x2000, end: 0x206F}, // General Punctuation
    {begin: 0x2070, end: 0x209F}, // Superscripts And Subscripts
    {begin: 0x20A0, end: 0x20CF}, // Currency Symbol
    {begin: 0x20D0, end: 0x20FF}, // Combining Diacritical Marks For Symbols
    {begin: 0x2100, end: 0x214F}, // Letterlike Symbols
    {begin: 0x2150, end: 0x218F}, // Number Forms
    {begin: 0x2190, end: 0x21FF}, // Arrows
    {begin: 0x2200, end: 0x22FF}, // Mathematical Operators
    {begin: 0x2300, end: 0x23FF}, // Miscellaneous Technical
    {begin: 0x2400, end: 0x243F}, // Control Pictures
    {begin: 0x2440, end: 0x245F}, // Optical Character Recognition
    {begin: 0x2460, end: 0x24FF}, // Enclosed Alphanumerics
    {begin: 0x2500, end: 0x257F}, // Box Drawing
    {begin: 0x2580, end: 0x259F}, // Block Elements
    {begin: 0x25A0, end: 0x25FF}, // Geometric Shapes
    {begin: 0x2600, end: 0x26FF}, // Miscellaneous Symbols
    {begin: 0x2700, end: 0x27BF}, // Dingbats
    {begin: 0x3000, end: 0x303F}, // CJK Symbols And Punctuation
    {begin: 0x3040, end: 0x309F}, // Hiragana
    {begin: 0x30A0, end: 0x30FF}, // Katakana
    {begin: 0x3100, end: 0x312F}, // Bopomofo
    {begin: 0x3130, end: 0x318F}, // Hangul Compatibility Jamo
    {begin: 0xA840, end: 0xA87F}, // Phags-pa
    {begin: 0x3200, end: 0x32FF}, // Enclosed CJK Letters And Months
    {begin: 0x3300, end: 0x33FF}, // CJK Compatibility
    {begin: 0xAC00, end: 0xD7AF}, // Hangul Syllables
    {begin: 0xD800, end: 0xDFFF}, // Non-Plane 0 *
    {begin: 0x10900, end: 0x1091F}, // Phoenicia
    {begin: 0x4E00, end: 0x9FFF}, // CJK Unified Ideographs
    {begin: 0xE000, end: 0xF8FF}, // Private Use Area (plane 0)
    {begin: 0x31C0, end: 0x31EF}, // CJK Strokes
    {begin: 0xFB00, end: 0xFB4F}, // Alphabetic Presentation Forms
    {begin: 0xFB50, end: 0xFDFF}, // Arabic Presentation Forms-A
    {begin: 0xFE20, end: 0xFE2F}, // Combining Half Marks
    {begin: 0xFE10, end: 0xFE1F}, // Vertical Forms
    {begin: 0xFE50, end: 0xFE6F}, // Small Form Variants
    {begin: 0xFE70, end: 0xFEFF}, // Arabic Presentation Forms-B
    {begin: 0xFF00, end: 0xFFEF}, // Halfwidth And Fullwidth Forms
    {begin: 0xFFF0, end: 0xFFFF}, // Specials
    {begin: 0x0F00, end: 0x0FFF}, // Tibetan
    {begin: 0x0700, end: 0x074F}, // Syriac
    {begin: 0x0780, end: 0x07BF}, // Thaana
    {begin: 0x0D80, end: 0x0DFF}, // Sinhala
    {begin: 0x1000, end: 0x109F}, // Myanmar
    {begin: 0x1200, end: 0x137F}, // Ethiopic
    {begin: 0x13A0, end: 0x13FF}, // Cherokee
    {begin: 0x1400, end: 0x167F}, // Unified Canadian Aboriginal Syllabics
    {begin: 0x1680, end: 0x169F}, // Ogham
    {begin: 0x16A0, end: 0x16FF}, // Runic
    {begin: 0x1780, end: 0x17FF}, // Khmer
    {begin: 0x1800, end: 0x18AF}, // Mongolian
    {begin: 0x2800, end: 0x28FF}, // Braille Patterns
    {begin: 0xA000, end: 0xA48F}, // Yi Syllables
    {begin: 0x1700, end: 0x171F}, // Tagalog
    {begin: 0x10300, end: 0x1032F}, // Old Italic
    {begin: 0x10330, end: 0x1034F}, // Gothic
    {begin: 0x10400, end: 0x1044F}, // Deseret
    {begin: 0x1D000, end: 0x1D0FF}, // Byzantine Musical Symbols
    {begin: 0x1D400, end: 0x1D7FF}, // Mathematical Alphanumeric Symbols
    {begin: 0xFF000, end: 0xFFFFD}, // Private Use (plane 15)
    {begin: 0xFE00, end: 0xFE0F}, // Variation Selectors
    {begin: 0xE0000, end: 0xE007F}, // Tags
    {begin: 0x1900, end: 0x194F}, // Limbu
    {begin: 0x1950, end: 0x197F}, // Tai Le
    {begin: 0x1980, end: 0x19DF}, // New Tai Lue
    {begin: 0x1A00, end: 0x1A1F}, // Buginese
    {begin: 0x2C00, end: 0x2C5F}, // Glagolitic
    {begin: 0x2D30, end: 0x2D7F}, // Tifinagh
    {begin: 0x4DC0, end: 0x4DFF}, // Yijing Hexagram Symbols
    {begin: 0xA800, end: 0xA82F}, // Syloti Nagri
    {begin: 0x10000, end: 0x1007F}, // Linear B Syllabary
    {begin: 0x10140, end: 0x1018F}, // Ancient Greek Numbers
    {begin: 0x10380, end: 0x1039F}, // Ugaritic
    {begin: 0x103A0, end: 0x103DF}, // Old Persian
    {begin: 0x10450, end: 0x1047F}, // Shavian
    {begin: 0x10480, end: 0x104AF}, // Osmanya
    {begin: 0x10800, end: 0x1083F}, // Cypriot Syllabary
    {begin: 0x10A00, end: 0x10A5F}, // Kharoshthi
    {begin: 0x1D300, end: 0x1D35F}, // Tai Xuan Jing Symbols
    {begin: 0x12000, end: 0x123FF}, // Cuneiform
    {begin: 0x1D360, end: 0x1D37F}, // Counting Rod Numerals
    {begin: 0x1B80, end: 0x1BBF}, // Sundanese
    {begin: 0x1C00, end: 0x1C4F}, // Lepcha
    {begin: 0x1C50, end: 0x1C7F}, // Ol Chiki
    {begin: 0xA880, end: 0xA8DF}, // Saurashtra
    {begin: 0xA900, end: 0xA92F}, // Kayah Li
    {begin: 0xA930, end: 0xA95F}, // Rejang
    {begin: 0xAA00, end: 0xAA5F}, // Cham
    {begin: 0x10190, end: 0x101CF}, // Ancient Symbols
    {begin: 0x101D0, end: 0x101FF}, // Phaistos Disc
    {begin: 0x102A0, end: 0x102DF}, // Carian
    {begin: 0x1F030, end: 0x1F09F}  // Domino Tiles
];

function getUnicodeRange(unicode) {
    for (let i = 0; i < unicodeRanges.length; i += 1) {
        const range = unicodeRanges[i];
        if (unicode >= range.begin && unicode < range.end) {
            return i;
        }
    }

    return -1;
}

// Parse the OS/2 and Windows metrics `OS/2` table
function parseOS2Table(data, start) {
    const os2 = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_0__["default"].Parser(data, start);
    os2.version = p.parseUShort();
    os2.xAvgCharWidth = p.parseShort();
    os2.usWeightClass = p.parseUShort();
    os2.usWidthClass = p.parseUShort();
    os2.fsType = p.parseUShort();
    os2.ySubscriptXSize = p.parseShort();
    os2.ySubscriptYSize = p.parseShort();
    os2.ySubscriptXOffset = p.parseShort();
    os2.ySubscriptYOffset = p.parseShort();
    os2.ySuperscriptXSize = p.parseShort();
    os2.ySuperscriptYSize = p.parseShort();
    os2.ySuperscriptXOffset = p.parseShort();
    os2.ySuperscriptYOffset = p.parseShort();
    os2.yStrikeoutSize = p.parseShort();
    os2.yStrikeoutPosition = p.parseShort();
    os2.sFamilyClass = p.parseShort();
    os2.panose = [];
    for (let i = 0; i < 10; i++) {
        os2.panose[i] = p.parseByte();
    }

    os2.ulUnicodeRange1 = p.parseULong();
    os2.ulUnicodeRange2 = p.parseULong();
    os2.ulUnicodeRange3 = p.parseULong();
    os2.ulUnicodeRange4 = p.parseULong();
    os2.achVendID = String.fromCharCode(p.parseByte(), p.parseByte(), p.parseByte(), p.parseByte());
    os2.fsSelection = p.parseUShort();
    os2.usFirstCharIndex = p.parseUShort();
    os2.usLastCharIndex = p.parseUShort();
    os2.sTypoAscender = p.parseShort();
    os2.sTypoDescender = p.parseShort();
    os2.sTypoLineGap = p.parseShort();
    os2.usWinAscent = p.parseUShort();
    os2.usWinDescent = p.parseUShort();
    if (os2.version >= 1) {
        os2.ulCodePageRange1 = p.parseULong();
        os2.ulCodePageRange2 = p.parseULong();
    }

    if (os2.version >= 2) {
        os2.sxHeight = p.parseShort();
        os2.sCapHeight = p.parseShort();
        os2.usDefaultChar = p.parseUShort();
        os2.usBreakChar = p.parseUShort();
        os2.usMaxContent = p.parseUShort();
    }

    return os2;
}

function makeOS2Table(options) {
    return new _table__WEBPACK_IMPORTED_MODULE_1__["default"].Table('OS/2', [
        {name: 'version', type: 'USHORT', value: 0x0003},
        {name: 'xAvgCharWidth', type: 'SHORT', value: 0},
        {name: 'usWeightClass', type: 'USHORT', value: 0},
        {name: 'usWidthClass', type: 'USHORT', value: 0},
        {name: 'fsType', type: 'USHORT', value: 0},
        {name: 'ySubscriptXSize', type: 'SHORT', value: 650},
        {name: 'ySubscriptYSize', type: 'SHORT', value: 699},
        {name: 'ySubscriptXOffset', type: 'SHORT', value: 0},
        {name: 'ySubscriptYOffset', type: 'SHORT', value: 140},
        {name: 'ySuperscriptXSize', type: 'SHORT', value: 650},
        {name: 'ySuperscriptYSize', type: 'SHORT', value: 699},
        {name: 'ySuperscriptXOffset', type: 'SHORT', value: 0},
        {name: 'ySuperscriptYOffset', type: 'SHORT', value: 479},
        {name: 'yStrikeoutSize', type: 'SHORT', value: 49},
        {name: 'yStrikeoutPosition', type: 'SHORT', value: 258},
        {name: 'sFamilyClass', type: 'SHORT', value: 0},
        {name: 'bFamilyType', type: 'BYTE', value: 0},
        {name: 'bSerifStyle', type: 'BYTE', value: 0},
        {name: 'bWeight', type: 'BYTE', value: 0},
        {name: 'bProportion', type: 'BYTE', value: 0},
        {name: 'bContrast', type: 'BYTE', value: 0},
        {name: 'bStrokeVariation', type: 'BYTE', value: 0},
        {name: 'bArmStyle', type: 'BYTE', value: 0},
        {name: 'bLetterform', type: 'BYTE', value: 0},
        {name: 'bMidline', type: 'BYTE', value: 0},
        {name: 'bXHeight', type: 'BYTE', value: 0},
        {name: 'ulUnicodeRange1', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange2', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange3', type: 'ULONG', value: 0},
        {name: 'ulUnicodeRange4', type: 'ULONG', value: 0},
        {name: 'achVendID', type: 'CHARARRAY', value: 'XXXX'},
        {name: 'fsSelection', type: 'USHORT', value: 0},
        {name: 'usFirstCharIndex', type: 'USHORT', value: 0},
        {name: 'usLastCharIndex', type: 'USHORT', value: 0},
        {name: 'sTypoAscender', type: 'SHORT', value: 0},
        {name: 'sTypoDescender', type: 'SHORT', value: 0},
        {name: 'sTypoLineGap', type: 'SHORT', value: 0},
        {name: 'usWinAscent', type: 'USHORT', value: 0},
        {name: 'usWinDescent', type: 'USHORT', value: 0},
        {name: 'ulCodePageRange1', type: 'ULONG', value: 0},
        {name: 'ulCodePageRange2', type: 'ULONG', value: 0},
        {name: 'sxHeight', type: 'SHORT', value: 0},
        {name: 'sCapHeight', type: 'SHORT', value: 0},
        {name: 'usDefaultChar', type: 'USHORT', value: 0},
        {name: 'usBreakChar', type: 'USHORT', value: 0},
        {name: 'usMaxContext', type: 'USHORT', value: 0}
    ], options);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parseOS2Table, make: makeOS2Table, unicodeRanges, getUnicodeRange });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/post.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/post.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../encoding */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/encoding.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../parse */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/parse.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
// The `post` table stores additional PostScript information, such as glyph names.
// https://www.microsoft.com/typography/OTSPEC/post.htm





// Parse the PostScript `post` table
function parsePostTable(data, start) {
    const post = {};
    const p = new _parse__WEBPACK_IMPORTED_MODULE_1__["default"].Parser(data, start);
    post.version = p.parseVersion();
    post.italicAngle = p.parseFixed();
    post.underlinePosition = p.parseShort();
    post.underlineThickness = p.parseShort();
    post.isFixedPitch = p.parseULong();
    post.minMemType42 = p.parseULong();
    post.maxMemType42 = p.parseULong();
    post.minMemType1 = p.parseULong();
    post.maxMemType1 = p.parseULong();
    switch (post.version) {
        case 1:
            post.names = _encoding__WEBPACK_IMPORTED_MODULE_0__.standardNames.slice();
            break;
        case 2:
            post.numberOfGlyphs = p.parseUShort();
            post.glyphNameIndex = new Array(post.numberOfGlyphs);
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                post.glyphNameIndex[i] = p.parseUShort();
            }

            post.names = [];
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                if (post.glyphNameIndex[i] >= _encoding__WEBPACK_IMPORTED_MODULE_0__.standardNames.length) {
                    const nameLength = p.parseChar();
                    post.names.push(p.parseString(nameLength));
                }
            }

            break;
        case 2.5:
            post.numberOfGlyphs = p.parseUShort();
            post.offset = new Array(post.numberOfGlyphs);
            for (let i = 0; i < post.numberOfGlyphs; i++) {
                post.offset[i] = p.parseChar();
            }

            break;
    }
    return post;
}

function makePostTable() {
    return new _table__WEBPACK_IMPORTED_MODULE_2__["default"].Table('post', [
        {name: 'version', type: 'FIXED', value: 0x00030000},
        {name: 'italicAngle', type: 'FIXED', value: 0},
        {name: 'underlinePosition', type: 'FWORD', value: 0},
        {name: 'underlineThickness', type: 'FWORD', value: 0},
        {name: 'isFixedPitch', type: 'ULONG', value: 0},
        {name: 'minMemType42', type: 'ULONG', value: 0},
        {name: 'maxMemType42', type: 'ULONG', value: 0},
        {name: 'minMemType1', type: 'ULONG', value: 0},
        {name: 'maxMemType1', type: 'ULONG', value: 0}
    ]);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ parse: parsePostTable, make: makePostTable });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/sfnt.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/sfnt.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../table */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/table.js");
/* harmony import */ var _cmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cmap */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cmap.js");
/* harmony import */ var _cff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cff */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/cff.js");
/* harmony import */ var _head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./head */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/head.js");
/* harmony import */ var _hhea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hhea */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hhea.js");
/* harmony import */ var _hmtx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hmtx */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/hmtx.js");
/* harmony import */ var _ltag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ltag */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/ltag.js");
/* harmony import */ var _maxp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./maxp */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/maxp.js");
/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./name */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/name.js");
/* harmony import */ var _os2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./os2 */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/os2.js");
/* harmony import */ var _post__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./post */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/post.js");
/* harmony import */ var _gsub__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./gsub */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/gsub.js");
/* harmony import */ var _meta__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./meta */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/tables/meta.js");
// The `sfnt` wrapper provides organization for the tables in the font.
// It is the top-level data structure in a font.
// https://www.microsoft.com/typography/OTSPEC/otff.htm
// Recommendations for creating OpenType Fonts:
// http://www.microsoft.com/typography/otspec140/recom.htm

















function log2(v) {
    return Math.log(v) / Math.log(2) | 0;
}

function computeCheckSum(bytes) {
    while (bytes.length % 4 !== 0) {
        bytes.push(0);
    }

    let sum = 0;
    for (let i = 0; i < bytes.length; i += 4) {
        sum += (bytes[i] << 24) +
            (bytes[i + 1] << 16) +
            (bytes[i + 2] << 8) +
            (bytes[i + 3]);
    }

    sum %= Math.pow(2, 32);
    return sum;
}

function makeTableRecord(tag, checkSum, offset, length) {
    return new _table__WEBPACK_IMPORTED_MODULE_1__["default"].Record('Table Record', [
        {name: 'tag', type: 'TAG', value: tag !== undefined ? tag : ''},
        {name: 'checkSum', type: 'ULONG', value: checkSum !== undefined ? checkSum : 0},
        {name: 'offset', type: 'ULONG', value: offset !== undefined ? offset : 0},
        {name: 'length', type: 'ULONG', value: length !== undefined ? length : 0}
    ]);
}

function makeSfntTable(tables) {
    const sfnt = new _table__WEBPACK_IMPORTED_MODULE_1__["default"].Table('sfnt', [
        {name: 'version', type: 'TAG', value: 'OTTO'},
        {name: 'numTables', type: 'USHORT', value: 0},
        {name: 'searchRange', type: 'USHORT', value: 0},
        {name: 'entrySelector', type: 'USHORT', value: 0},
        {name: 'rangeShift', type: 'USHORT', value: 0}
    ]);
    sfnt.tables = tables;
    sfnt.numTables = tables.length;
    const highestPowerOf2 = Math.pow(2, log2(sfnt.numTables));
    sfnt.searchRange = 16 * highestPowerOf2;
    sfnt.entrySelector = log2(highestPowerOf2);
    sfnt.rangeShift = sfnt.numTables * 16 - sfnt.searchRange;

    const recordFields = [];
    const tableFields = [];

    let offset = sfnt.sizeOf() + (makeTableRecord().sizeOf() * sfnt.numTables);
    while (offset % 4 !== 0) {
        offset += 1;
        tableFields.push({name: 'padding', type: 'BYTE', value: 0});
    }

    for (let i = 0; i < tables.length; i += 1) {
        const t = tables[i];
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(t.tableName.length === 4, 'Table name' + t.tableName + ' is invalid.');
        const tableLength = t.sizeOf();
        const tableRecord = makeTableRecord(t.tableName, computeCheckSum(t.encode()), offset, tableLength);
        recordFields.push({name: tableRecord.tag + ' Table Record', type: 'RECORD', value: tableRecord});
        tableFields.push({name: t.tableName + ' table', type: 'RECORD', value: t});
        offset += tableLength;
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(!isNaN(offset), 'Something went wrong calculating the offset.');
        while (offset % 4 !== 0) {
            offset += 1;
            tableFields.push({name: 'padding', type: 'BYTE', value: 0});
        }
    }

    // Table records need to be sorted alphabetically.
    recordFields.sort(function(r1, r2) {
        if (r1.value.tag > r2.value.tag) {
            return 1;
        } else {
            return -1;
        }
    });

    sfnt.fields = sfnt.fields.concat(recordFields);
    sfnt.fields = sfnt.fields.concat(tableFields);
    return sfnt;
}

// Get the metrics for a character. If the string has more than one character
// this function returns metrics for the first available character.
// You can provide optional fallback metrics if no characters are available.
function metricsForChar(font, chars, notFoundMetrics) {
    for (let i = 0; i < chars.length; i += 1) {
        const glyphIndex = font.charToGlyphIndex(chars[i]);
        if (glyphIndex > 0) {
            const glyph = font.glyphs.get(glyphIndex);
            return glyph.getMetrics();
        }
    }

    return notFoundMetrics;
}

function average(vs) {
    let sum = 0;
    for (let i = 0; i < vs.length; i += 1) {
        sum += vs[i];
    }

    return sum / vs.length;
}

// Convert the font object to a SFNT data structure.
// This structure contains all the necessary tables and metadata to create a binary OTF file.
function fontToSfntTable(font) {
    const xMins = [];
    const yMins = [];
    const xMaxs = [];
    const yMaxs = [];
    const advanceWidths = [];
    const leftSideBearings = [];
    const rightSideBearings = [];
    let firstCharIndex;
    let lastCharIndex = 0;
    let ulUnicodeRange1 = 0;
    let ulUnicodeRange2 = 0;
    let ulUnicodeRange3 = 0;
    let ulUnicodeRange4 = 0;

    for (let i = 0; i < font.glyphs.length; i += 1) {
        const glyph = font.glyphs.get(i);
        const unicode = glyph.unicode | 0;

        if (isNaN(glyph.advanceWidth)) {
            throw new Error('Glyph ' + glyph.name + ' (' + i + '): advanceWidth is not a number.');
        }

        if (firstCharIndex > unicode || firstCharIndex === undefined) {
            // ignore .notdef char
            if (unicode > 0) {
                firstCharIndex = unicode;
            }
        }

        if (lastCharIndex < unicode) {
            lastCharIndex = unicode;
        }

        const position = _os2__WEBPACK_IMPORTED_MODULE_10__["default"].getUnicodeRange(unicode);
        if (position < 32) {
            ulUnicodeRange1 |= 1 << position;
        } else if (position < 64) {
            ulUnicodeRange2 |= 1 << position - 32;
        } else if (position < 96) {
            ulUnicodeRange3 |= 1 << position - 64;
        } else if (position < 123) {
            ulUnicodeRange4 |= 1 << position - 96;
        } else {
            throw new Error('Unicode ranges bits > 123 are reserved for internal usage');
        }
        // Skip non-important characters.
        if (glyph.name === '.notdef') continue;
        const metrics = glyph.getMetrics();
        xMins.push(metrics.xMin);
        yMins.push(metrics.yMin);
        xMaxs.push(metrics.xMax);
        yMaxs.push(metrics.yMax);
        leftSideBearings.push(metrics.leftSideBearing);
        rightSideBearings.push(metrics.rightSideBearing);
        advanceWidths.push(glyph.advanceWidth);
    }

    const globals = {
        xMin: Math.min.apply(null, xMins),
        yMin: Math.min.apply(null, yMins),
        xMax: Math.max.apply(null, xMaxs),
        yMax: Math.max.apply(null, yMaxs),
        advanceWidthMax: Math.max.apply(null, advanceWidths),
        advanceWidthAvg: average(advanceWidths),
        minLeftSideBearing: Math.min.apply(null, leftSideBearings),
        maxLeftSideBearing: Math.max.apply(null, leftSideBearings),
        minRightSideBearing: Math.min.apply(null, rightSideBearings)
    };
    globals.ascender = font.ascender;
    globals.descender = font.descender;

    const headTable = _head__WEBPACK_IMPORTED_MODULE_4__["default"].make({
        flags: 3, // 00000011 (baseline for font at y=0; left sidebearing point at x=0)
        unitsPerEm: font.unitsPerEm,
        xMin: globals.xMin,
        yMin: globals.yMin,
        xMax: globals.xMax,
        yMax: globals.yMax,
        lowestRecPPEM: 3,
        createdTimestamp: font.createdTimestamp
    });

    const hheaTable = _hhea__WEBPACK_IMPORTED_MODULE_5__["default"].make({
        ascender: globals.ascender,
        descender: globals.descender,
        advanceWidthMax: globals.advanceWidthMax,
        minLeftSideBearing: globals.minLeftSideBearing,
        minRightSideBearing: globals.minRightSideBearing,
        xMaxExtent: globals.maxLeftSideBearing + (globals.xMax - globals.xMin),
        numberOfHMetrics: font.glyphs.length
    });

    const maxpTable = _maxp__WEBPACK_IMPORTED_MODULE_8__["default"].make(font.glyphs.length);

    const os2Table = _os2__WEBPACK_IMPORTED_MODULE_10__["default"].make({
        xAvgCharWidth: Math.round(globals.advanceWidthAvg),
        usWeightClass: font.tables.os2.usWeightClass,
        usWidthClass: font.tables.os2.usWidthClass,
        usFirstCharIndex: firstCharIndex,
        usLastCharIndex: lastCharIndex,
        ulUnicodeRange1: ulUnicodeRange1,
        ulUnicodeRange2: ulUnicodeRange2,
        ulUnicodeRange3: ulUnicodeRange3,
        ulUnicodeRange4: ulUnicodeRange4,
        fsSelection: font.tables.os2.fsSelection, // REGULAR
        // See http://typophile.com/node/13081 for more info on vertical metrics.
        // We get metrics for typical characters (such as "x" for xHeight).
        // We provide some fallback characters if characters are unavailable: their
        // ordering was chosen experimentally.
        sTypoAscender: globals.ascender,
        sTypoDescender: globals.descender,
        sTypoLineGap: 0,
        usWinAscent: globals.yMax,
        usWinDescent: Math.abs(globals.yMin),
        ulCodePageRange1: 1, // FIXME: hard-code Latin 1 support for now
        sxHeight: metricsForChar(font, 'xyvw', {yMax: Math.round(globals.ascender / 2)}).yMax,
        sCapHeight: metricsForChar(font, 'HIKLEFJMNTZBDPRAGOQSUVWXY', globals).yMax,
        usDefaultChar: font.hasChar(' ') ? 32 : 0, // Use space as the default character, if available.
        usBreakChar: font.hasChar(' ') ? 32 : 0 // Use space as the break character, if available.
    });

    const hmtxTable = _hmtx__WEBPACK_IMPORTED_MODULE_6__["default"].make(font.glyphs);
    const cmapTable = _cmap__WEBPACK_IMPORTED_MODULE_2__["default"].make(font.glyphs);

    const englishFamilyName = font.getEnglishName('fontFamily');
    const englishStyleName = font.getEnglishName('fontSubfamily');
    const englishFullName = englishFamilyName + ' ' + englishStyleName;
    let postScriptName = font.getEnglishName('postScriptName');
    if (!postScriptName) {
        postScriptName = englishFamilyName.replace(/\s/g, '') + '-' + englishStyleName;
    }

    const names = {};
    for (let n in font.names) {
        names[n] = font.names[n];
    }

    if (!names.uniqueID) {
        names.uniqueID = {en: font.getEnglishName('manufacturer') + ':' + englishFullName};
    }

    if (!names.postScriptName) {
        names.postScriptName = {en: postScriptName};
    }

    if (!names.preferredFamily) {
        names.preferredFamily = font.names.fontFamily;
    }

    if (!names.preferredSubfamily) {
        names.preferredSubfamily = font.names.fontSubfamily;
    }

    const languageTags = [];
    const nameTable = _name__WEBPACK_IMPORTED_MODULE_9__["default"].make(names, languageTags);
    const ltagTable = (languageTags.length > 0 ? _ltag__WEBPACK_IMPORTED_MODULE_7__["default"].make(languageTags) : undefined);

    const postTable = _post__WEBPACK_IMPORTED_MODULE_11__["default"].make();
    const cffTable = _cff__WEBPACK_IMPORTED_MODULE_3__["default"].make(font.glyphs, {
        version: font.getEnglishName('version'),
        fullName: englishFullName,
        familyName: englishFamilyName,
        weightName: englishStyleName,
        postScriptName: postScriptName,
        unitsPerEm: font.unitsPerEm,
        fontBBox: [0, globals.yMin, globals.ascender, globals.advanceWidthMax]
    });

    const metaTable = (font.metas && Object.keys(font.metas).length > 0) ? _meta__WEBPACK_IMPORTED_MODULE_13__["default"].make(font.metas) : undefined;

    // The order does not matter because makeSfntTable() will sort them.
    const tables = [headTable, hheaTable, maxpTable, os2Table, nameTable, cmapTable, postTable, cffTable, hmtxTable];
    if (ltagTable) {
        tables.push(ltagTable);
    }
    // Optional tables
    if (font.tables.gsub) {
        tables.push(_gsub__WEBPACK_IMPORTED_MODULE_12__["default"].make(font.tables.gsub));
    }
    if (metaTable) {
        tables.push(metaTable);
    }

    const sfntTable = makeSfntTable(tables);

    // Compute the font's checkSum and store it in head.checkSumAdjustment.
    const bytes = sfntTable.encode();
    const checkSum = computeCheckSum(bytes);
    const tableFields = sfntTable.fields;
    let checkSumAdjusted = false;
    for (let i = 0; i < tableFields.length; i += 1) {
        if (tableFields[i].name === 'head table') {
            tableFields[i].value.checkSumAdjustment = 0xB1B0AFBA - checkSum;
            checkSumAdjusted = true;
            break;
        }
    }

    if (!checkSumAdjusted) {
        throw new Error('Could not find head table with checkSum to adjust.');
    }

    return sfntTable;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ make: makeSfntTable, fontToTable: fontToSfntTable, computeCheckSum });


/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/types.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/types.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   sizeOf: () => (/* binding */ sizeOf)
/* harmony export */ });
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/check.js");
// Data types used in the OpenType font file.
// All OpenType fonts use Motorola-style byte ordering (Big Endian)



const LIMIT16 = 32768; // The limit at which a 16-bit number switches signs == 2^15
const LIMIT32 = 2147483648; // The limit at which a 32-bit number switches signs == 2 ^ 31

/**
 * @exports opentype.decode
 * @class
 */
const decode = {};
/**
 * @exports opentype.encode
 * @class
 */
const encode = {};
/**
 * @exports opentype.sizeOf
 * @class
 */
const sizeOf = {};

// Return a function that always returns the same value.
function constant(v) {
    return function() {
        return v;
    };
}

// OpenType data types //////////////////////////////////////////////////////

/**
 * Convert an 8-bit unsigned integer to a list of 1 byte.
 * @param {number}
 * @returns {Array}
 */
encode.BYTE = function(v) {
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(v >= 0 && v <= 255, 'Byte value should be between 0 and 255.');
    return [v];
};
/**
 * @constant
 * @type {number}
 */
sizeOf.BYTE = constant(1);

/**
 * Convert a 8-bit signed integer to a list of 1 byte.
 * @param {string}
 * @returns {Array}
 */
encode.CHAR = function(v) {
    return [v.charCodeAt(0)];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.CHAR = constant(1);

/**
 * Convert an ASCII string to a list of bytes.
 * @param {string}
 * @returns {Array}
 */
encode.CHARARRAY = function(v) {
    const b = [];
    for (let i = 0; i < v.length; i += 1) {
        b[i] = v.charCodeAt(i);
    }

    return b;
};

/**
 * @param {Array}
 * @returns {number}
 */
sizeOf.CHARARRAY = function(v) {
    return v.length;
};

/**
 * Convert a 16-bit unsigned integer to a list of 2 bytes.
 * @param {number}
 * @returns {Array}
 */
encode.USHORT = function(v) {
    return [(v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.USHORT = constant(2);

/**
 * Convert a 16-bit signed integer to a list of 2 bytes.
 * @param {number}
 * @returns {Array}
 */
encode.SHORT = function(v) {
    // Two's complement
    if (v >= LIMIT16) {
        v = -(2 * LIMIT16 - v);
    }

    return [(v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.SHORT = constant(2);

/**
 * Convert a 24-bit unsigned integer to a list of 3 bytes.
 * @param {number}
 * @returns {Array}
 */
encode.UINT24 = function(v) {
    return [(v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.UINT24 = constant(3);

/**
 * Convert a 32-bit unsigned integer to a list of 4 bytes.
 * @param {number}
 * @returns {Array}
 */
encode.ULONG = function(v) {
    return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.ULONG = constant(4);

/**
 * Convert a 32-bit unsigned integer to a list of 4 bytes.
 * @param {number}
 * @returns {Array}
 */
encode.LONG = function(v) {
    // Two's complement
    if (v >= LIMIT32) {
        v = -(2 * LIMIT32 - v);
    }

    return [(v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.LONG = constant(4);

encode.FIXED = encode.ULONG;
sizeOf.FIXED = sizeOf.ULONG;

encode.FWORD = encode.SHORT;
sizeOf.FWORD = sizeOf.SHORT;

encode.UFWORD = encode.USHORT;
sizeOf.UFWORD = sizeOf.USHORT;

/**
 * Convert a 32-bit Apple Mac timestamp integer to a list of 8 bytes, 64-bit timestamp.
 * @param {number}
 * @returns {Array}
 */
encode.LONGDATETIME = function(v) {
    return [0, 0, 0, 0, (v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.LONGDATETIME = constant(8);

/**
 * Convert a 4-char tag to a list of 4 bytes.
 * @param {string}
 * @returns {Array}
 */
encode.TAG = function(v) {
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(v.length === 4, 'Tag should be exactly 4 ASCII characters.');
    return [v.charCodeAt(0),
            v.charCodeAt(1),
            v.charCodeAt(2),
            v.charCodeAt(3)];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.TAG = constant(4);

// CFF data types ///////////////////////////////////////////////////////////

encode.Card8 = encode.BYTE;
sizeOf.Card8 = sizeOf.BYTE;

encode.Card16 = encode.USHORT;
sizeOf.Card16 = sizeOf.USHORT;

encode.OffSize = encode.BYTE;
sizeOf.OffSize = sizeOf.BYTE;

encode.SID = encode.USHORT;
sizeOf.SID = sizeOf.USHORT;

// Convert a numeric operand or charstring number to a variable-size list of bytes.
/**
 * Convert a numeric operand or charstring number to a variable-size list of bytes.
 * @param {number}
 * @returns {Array}
 */
encode.NUMBER = function(v) {
    if (v >= -107 && v <= 107) {
        return [v + 139];
    } else if (v >= 108 && v <= 1131) {
        v = v - 108;
        return [(v >> 8) + 247, v & 0xFF];
    } else if (v >= -1131 && v <= -108) {
        v = -v - 108;
        return [(v >> 8) + 251, v & 0xFF];
    } else if (v >= -32768 && v <= 32767) {
        return encode.NUMBER16(v);
    } else {
        return encode.NUMBER32(v);
    }
};

/**
 * @param {number}
 * @returns {number}
 */
sizeOf.NUMBER = function(v) {
    return encode.NUMBER(v).length;
};

/**
 * Convert a signed number between -32768 and +32767 to a three-byte value.
 * This ensures we always use three bytes, but is not the most compact format.
 * @param {number}
 * @returns {Array}
 */
encode.NUMBER16 = function(v) {
    return [28, (v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.NUMBER16 = constant(3);

/**
 * Convert a signed number between -(2^31) and +(2^31-1) to a five-byte value.
 * This is useful if you want to be sure you always use four bytes,
 * at the expense of wasting a few bytes for smaller numbers.
 * @param {number}
 * @returns {Array}
 */
encode.NUMBER32 = function(v) {
    return [29, (v >> 24) & 0xFF, (v >> 16) & 0xFF, (v >> 8) & 0xFF, v & 0xFF];
};

/**
 * @constant
 * @type {number}
 */
sizeOf.NUMBER32 = constant(5);

/**
 * @param {number}
 * @returns {Array}
 */
encode.REAL = function(v) {
    let value = v.toString();

    // Some numbers use an epsilon to encode the value. (e.g. JavaScript will store 0.0000001 as 1e-7)
    // This code converts it back to a number without the epsilon.
    const m = /\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(value);
    if (m) {
        const epsilon = parseFloat('1e' + ((m[2] ? +m[2] : 0) + m[1].length));
        value = (Math.round(v * epsilon) / epsilon).toString();
    }

    let nibbles = '';
    for (let i = 0, ii = value.length; i < ii; i += 1) {
        const c = value[i];
        if (c === 'e') {
            nibbles += value[++i] === '-' ? 'c' : 'b';
        } else if (c === '.') {
            nibbles += 'a';
        } else if (c === '-') {
            nibbles += 'e';
        } else {
            nibbles += c;
        }
    }

    nibbles += (nibbles.length & 1) ? 'f' : 'ff';
    const out = [30];
    for (let i = 0, ii = nibbles.length; i < ii; i += 2) {
        out.push(parseInt(nibbles.substr(i, 2), 16));
    }

    return out;
};

/**
 * @param {number}
 * @returns {number}
 */
sizeOf.REAL = function(v) {
    return encode.REAL(v).length;
};

encode.NAME = encode.CHARARRAY;
sizeOf.NAME = sizeOf.CHARARRAY;

encode.STRING = encode.CHARARRAY;
sizeOf.STRING = sizeOf.CHARARRAY;

/**
 * @param {DataView} data
 * @param {number} offset
 * @param {number} numBytes
 * @returns {string}
 */
decode.UTF8 = function(data, offset, numBytes) {
    const codePoints = [];
    const numChars = numBytes;
    for (let j = 0; j < numChars; j++, offset += 1) {
        codePoints[j] = data.getUint8(offset);
    }

    return String.fromCharCode.apply(null, codePoints);
};

/**
 * @param {DataView} data
 * @param {number} offset
 * @param {number} numBytes
 * @returns {string}
 */
decode.UTF16 = function(data, offset, numBytes) {
    const codePoints = [];
    const numChars = numBytes / 2;
    for (let j = 0; j < numChars; j++, offset += 2) {
        codePoints[j] = data.getUint16(offset);
    }

    return String.fromCharCode.apply(null, codePoints);
};

/**
 * Convert a JavaScript string to UTF16-BE.
 * @param {string}
 * @returns {Array}
 */
encode.UTF16 = function(v) {
    const b = [];
    for (let i = 0; i < v.length; i += 1) {
        const codepoint = v.charCodeAt(i);
        b[b.length] = (codepoint >> 8) & 0xFF;
        b[b.length] = codepoint & 0xFF;
    }

    return b;
};

/**
 * @param {string}
 * @returns {number}
 */
sizeOf.UTF16 = function(v) {
    return v.length * 2;
};

// Data for converting old eight-bit Macintosh encodings to Unicode.
// This representation is optimized for decoding; encoding is slower
// and needs more memory. The assumption is that all opentype.js users
// want to open fonts, but saving a font will be comparatively rare
// so it can be more expensive. Keyed by IANA character set name.
//
// Python script for generating these strings:
//
//     s = u''.join([chr(c).decode('mac_greek') for c in range(128, 256)])
//     print(s.encode('utf-8'))
/**
 * @private
 */
const eightBitMacEncodings = {
    'x-mac-croatian':  // Python: 'mac_croatian'
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø' +
    '¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊©⁄€‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ',
    'x-mac-cyrillic':  // Python: 'mac_cyrillic'
    'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњ' +
    'јЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю',
    'x-mac-gaelic': // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/GAELIC.TXT
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØḂ±≤≥ḃĊċḊḋḞḟĠġṀæø' +
    'ṁṖṗɼƒſṠ«»… ÀÃÕŒœ–—“”‘’ṡẛÿŸṪ€‹›Ŷŷṫ·Ỳỳ⁊ÂÊÁËÈÍÎÏÌÓÔ♣ÒÚÛÙıÝýŴŵẄẅẀẁẂẃ',
    'x-mac-greek':  // Python: 'mac_greek'
    'Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦€ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩ' +
    'άΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ\u00AD',
    'x-mac-icelandic':  // Python: 'mac_iceland'
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
    '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
    'x-mac-inuit': // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/INUIT.TXT
    'ᐃᐄᐅᐆᐊᐋᐱᐲᐳᐴᐸᐹᑉᑎᑏᑐᑑᑕᑖᑦᑭᑮᑯᑰᑲᑳᒃᒋᒌᒍᒎᒐᒑ°ᒡᒥᒦ•¶ᒧ®©™ᒨᒪᒫᒻᓂᓃᓄᓅᓇᓈᓐᓯᓰᓱᓲᓴᓵᔅᓕᓖᓗ' +
    'ᓘᓚᓛᓪᔨᔩᔪᔫᔭ… ᔮᔾᕕᕖᕗ–—“”‘’ᕘᕙᕚᕝᕆᕇᕈᕉᕋᕌᕐᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᙱᙲᙳᙴᙵᙶᖖᖠᖡᖢᖣᖤᖥᖦᕼŁł',
    'x-mac-ce':  // Python: 'mac_latin2'
    'ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅ' +
    'ņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ',
    macintosh:  // Python: 'mac_roman'
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
    '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
    'x-mac-romanian':  // Python: 'mac_romanian'
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂȘ∞±≤≥¥µ∂∑∏π∫ªºΩăș' +
    '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›Țț‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ',
    'x-mac-turkish':  // Python: 'mac_turkish'
    'ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø' +
    '¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙˆ˜¯˘˙˚¸˝˛ˇ'
};

/**
 * Decodes an old-style Macintosh string. Returns either a Unicode JavaScript
 * string, or 'undefined' if the encoding is unsupported. For example, we do
 * not support Chinese, Japanese or Korean because these would need large
 * mapping tables.
 * @param {DataView} dataView
 * @param {number} offset
 * @param {number} dataLength
 * @param {string} encoding
 * @returns {string}
 */
decode.MACSTRING = function(dataView, offset, dataLength, encoding) {
    const table = eightBitMacEncodings[encoding];
    if (table === undefined) {
        return undefined;
    }

    let result = '';
    for (let i = 0; i < dataLength; i++) {
        const c = dataView.getUint8(offset + i);
        // In all eight-bit Mac encodings, the characters 0x00..0x7F are
        // mapped to U+0000..U+007F; we only need to look up the others.
        if (c <= 0x7F) {
            result += String.fromCharCode(c);
        } else {
            result += table[c & 0x7F];
        }
    }

    return result;
};

// Helper function for encode.MACSTRING. Returns a dictionary for mapping
// Unicode character codes to their 8-bit MacOS equivalent. This table
// is not exactly a super cheap data structure, but we do not care because
// encoding Macintosh strings is only rarely needed in typical applications.
const macEncodingTableCache = typeof WeakMap === 'function' && new WeakMap();
let macEncodingCacheKeys;
const getMacEncodingTable = function (encoding) {
    // Since we use encoding as a cache key for WeakMap, it has to be
    // a String object and not a literal. And at least on NodeJS 2.10.1,
    // WeakMap requires that the same String instance is passed for cache hits.
    if (!macEncodingCacheKeys) {
        macEncodingCacheKeys = {};
        for (let e in eightBitMacEncodings) {
            /*jshint -W053 */  // Suppress "Do not use String as a constructor."
            macEncodingCacheKeys[e] = new String(e);
        }
    }

    const cacheKey = macEncodingCacheKeys[encoding];
    if (cacheKey === undefined) {
        return undefined;
    }

    // We can't do "if (cache.has(key)) {return cache.get(key)}" here:
    // since garbage collection may run at any time, it could also kick in
    // between the calls to cache.has() and cache.get(). In that case,
    // we would return 'undefined' even though we do support the encoding.
    if (macEncodingTableCache) {
        const cachedTable = macEncodingTableCache.get(cacheKey);
        if (cachedTable !== undefined) {
            return cachedTable;
        }
    }

    const decodingTable = eightBitMacEncodings[encoding];
    if (decodingTable === undefined) {
        return undefined;
    }

    const encodingTable = {};
    for (let i = 0; i < decodingTable.length; i++) {
        encodingTable[decodingTable.charCodeAt(i)] = i + 0x80;
    }

    if (macEncodingTableCache) {
        macEncodingTableCache.set(cacheKey, encodingTable);
    }

    return encodingTable;
};

/**
 * Encodes an old-style Macintosh string. Returns a byte array upon success.
 * If the requested encoding is unsupported, or if the input string contains
 * a character that cannot be expressed in the encoding, the function returns
 * 'undefined'.
 * @param {string} str
 * @param {string} encoding
 * @returns {Array}
 */
encode.MACSTRING = function(str, encoding) {
    const table = getMacEncodingTable(encoding);
    if (table === undefined) {
        return undefined;
    }

    const result = [];
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);

        // In all eight-bit Mac encodings, the characters 0x00..0x7F are
        // mapped to U+0000..U+007F; we only need to look up the others.
        if (c >= 0x80) {
            c = table[c];
            if (c === undefined) {
                // str contains a Unicode character that cannot be encoded
                // in the requested encoding.
                return undefined;
            }
        }
        result[i] = c;
        // result.push(c);
    }

    return result;
};

/**
 * @param {string} str
 * @param {string} encoding
 * @returns {number}
 */
sizeOf.MACSTRING = function(str, encoding) {
    const b = encode.MACSTRING(str, encoding);
    if (b !== undefined) {
        return b.length;
    } else {
        return 0;
    }
};

// Helper for encode.VARDELTAS
function isByteEncodable(value) {
    return value >= -128 && value <= 127;
}

// Helper for encode.VARDELTAS
function encodeVarDeltaRunAsZeroes(deltas, pos, result) {
    let runLength = 0;
    const numDeltas = deltas.length;
    while (pos < numDeltas && runLength < 64 && deltas[pos] === 0) {
        ++pos;
        ++runLength;
    }
    result.push(0x80 | (runLength - 1));
    return pos;
}

// Helper for encode.VARDELTAS
function encodeVarDeltaRunAsBytes(deltas, offset, result) {
    let runLength = 0;
    const numDeltas = deltas.length;
    let pos = offset;
    while (pos < numDeltas && runLength < 64) {
        const value = deltas[pos];
        if (!isByteEncodable(value)) {
            break;
        }

        // Within a byte-encoded run of deltas, a single zero is best
        // stored literally as 0x00 value. However, if we have two or
        // more zeroes in a sequence, it is better to start a new run.
        // Fore example, the sequence of deltas [15, 15, 0, 15, 15]
        // becomes 6 bytes (04 0F 0F 00 0F 0F) when storing the zero
        // within the current run, but 7 bytes (01 0F 0F 80 01 0F 0F)
        // when starting a new run.
        if (value === 0 && pos + 1 < numDeltas && deltas[pos + 1] === 0) {
            break;
        }

        ++pos;
        ++runLength;
    }
    result.push(runLength - 1);
    for (let i = offset; i < pos; ++i) {
        result.push((deltas[i] + 256) & 0xff);
    }
    return pos;
}

// Helper for encode.VARDELTAS
function encodeVarDeltaRunAsWords(deltas, offset, result) {
    let runLength = 0;
    const numDeltas = deltas.length;
    let pos = offset;
    while (pos < numDeltas && runLength < 64) {
        const value = deltas[pos];

        // Within a word-encoded run of deltas, it is easiest to start
        // a new run (with a different encoding) whenever we encounter
        // a zero value. For example, the sequence [0x6666, 0, 0x7777]
        // needs 7 bytes when storing the zero inside the current run
        // (42 66 66 00 00 77 77), and equally 7 bytes when starting a
        // new run (40 66 66 80 40 77 77).
        if (value === 0) {
            break;
        }

        // Within a word-encoded run of deltas, a single value in the
        // range (-128..127) should be encoded within the current run
        // because it is more compact. For example, the sequence
        // [0x6666, 2, 0x7777] becomes 7 bytes when storing the value
        // literally (42 66 66 00 02 77 77), but 8 bytes when starting
        // a new run (40 66 66 00 02 40 77 77).
        if (isByteEncodable(value) && pos + 1 < numDeltas && isByteEncodable(deltas[pos + 1])) {
            break;
        }

        ++pos;
        ++runLength;
    }
    result.push(0x40 | (runLength - 1));
    for (let i = offset; i < pos; ++i) {
        const val = deltas[i];
        result.push(((val + 0x10000) >> 8) & 0xff, (val + 0x100) & 0xff);
    }
    return pos;
}

/**
 * Encode a list of variation adjustment deltas.
 *
 * Variation adjustment deltas are used in ‘gvar’ and ‘cvar’ tables.
 * They indicate how points (in ‘gvar’) or values (in ‘cvar’) get adjusted
 * when generating instances of variation fonts.
 *
 * @see https://www.microsoft.com/typography/otspec/gvar.htm
 * @see https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6gvar.html
 * @param {Array}
 * @return {Array}
 */
encode.VARDELTAS = function(deltas) {
    let pos = 0;
    const result = [];
    while (pos < deltas.length) {
        const value = deltas[pos];
        if (value === 0) {
            pos = encodeVarDeltaRunAsZeroes(deltas, pos, result);
        } else if (value >= -128 && value <= 127) {
            pos = encodeVarDeltaRunAsBytes(deltas, pos, result);
        } else {
            pos = encodeVarDeltaRunAsWords(deltas, pos, result);
        }
    }
    return result;
};

// Convert a list of values to a CFF INDEX structure.
// The values should be objects containing name / type / value.
/**
 * @param {Array} l
 * @returns {Array}
 */
encode.INDEX = function(l) {
    //var offset, offsets, offsetEncoder, encodedOffsets, encodedOffset, data,
    //    i, v;
    // Because we have to know which data type to use to encode the offsets,
    // we have to go through the values twice: once to encode the data and
    // calculate the offsets, then again to encode the offsets using the fitting data type.
    let offset = 1; // First offset is always 1.
    const offsets = [offset];
    const data = [];
    for (let i = 0; i < l.length; i += 1) {
        const v = encode.OBJECT(l[i]);
        Array.prototype.push.apply(data, v);
        offset += v.length;
        offsets.push(offset);
    }

    if (data.length === 0) {
        return [0, 0];
    }

    const encodedOffsets = [];
    const offSize = (1 + Math.floor(Math.log(offset) / Math.log(2)) / 8) | 0;
    const offsetEncoder = [undefined, encode.BYTE, encode.USHORT, encode.UINT24, encode.ULONG][offSize];
    for (let i = 0; i < offsets.length; i += 1) {
        const encodedOffset = offsetEncoder(offsets[i]);
        Array.prototype.push.apply(encodedOffsets, encodedOffset);
    }

    return Array.prototype.concat(encode.Card16(l.length),
                           encode.OffSize(offSize),
                           encodedOffsets,
                           data);
};

/**
 * @param {Array}
 * @returns {number}
 */
sizeOf.INDEX = function(v) {
    return encode.INDEX(v).length;
};

/**
 * Convert an object to a CFF DICT structure.
 * The keys should be numeric.
 * The values should be objects containing name / type / value.
 * @param {Object} m
 * @returns {Array}
 */
encode.DICT = function(m) {
    let d = [];
    const keys = Object.keys(m);
    const length = keys.length;

    for (let i = 0; i < length; i += 1) {
        // Object.keys() return string keys, but our keys are always numeric.
        const k = parseInt(keys[i], 0);
        const v = m[k];
        // Value comes before the key.
        d = d.concat(encode.OPERAND(v.value, v.type));
        d = d.concat(encode.OPERATOR(k));
    }

    return d;
};

/**
 * @param {Object}
 * @returns {number}
 */
sizeOf.DICT = function(m) {
    return encode.DICT(m).length;
};

/**
 * @param {number}
 * @returns {Array}
 */
encode.OPERATOR = function(v) {
    if (v < 1200) {
        return [v];
    } else {
        return [12, v - 1200];
    }
};

/**
 * @param {Array} v
 * @param {string}
 * @returns {Array}
 */
encode.OPERAND = function(v, type) {
    let d = [];
    if (Array.isArray(type)) {
        for (let i = 0; i < type.length; i += 1) {
            _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(v.length === type.length, 'Not enough arguments given for type' + type);
            d = d.concat(encode.OPERAND(v[i], type[i]));
        }
    } else {
        if (type === 'SID') {
            d = d.concat(encode.NUMBER(v));
        } else if (type === 'offset') {
            // We make it easy for ourselves and always encode offsets as
            // 4 bytes. This makes offset calculation for the top dict easier.
            d = d.concat(encode.NUMBER32(v));
        } else if (type === 'number') {
            d = d.concat(encode.NUMBER(v));
        } else if (type === 'real') {
            d = d.concat(encode.REAL(v));
        } else {
            throw new Error('Unknown operand type ' + type);
            // FIXME Add support for booleans
        }
    }

    return d;
};

encode.OP = encode.BYTE;
sizeOf.OP = sizeOf.BYTE;

// memoize charstring encoding using WeakMap if available
const wmm = typeof WeakMap === 'function' && new WeakMap();

/**
 * Convert a list of CharString operations to bytes.
 * @param {Array}
 * @returns {Array}
 */
encode.CHARSTRING = function(ops) {
    // See encode.MACSTRING for why we don't do "if (wmm && wmm.has(ops))".
    if (wmm) {
        const cachedValue = wmm.get(ops);
        if (cachedValue !== undefined) {
            return cachedValue;
        }
    }

    let d = [];
    const length = ops.length;

    for (let i = 0; i < length; i += 1) {
        const op = ops[i];
        d = d.concat(encode[op.type](op.value));
    }

    if (wmm) {
        wmm.set(ops, d);
    }

    return d;
};

/**
 * @param {Array}
 * @returns {number}
 */
sizeOf.CHARSTRING = function(ops) {
    return encode.CHARSTRING(ops).length;
};

// Utility functions ////////////////////////////////////////////////////////

/**
 * Convert an object containing name / type / value to bytes.
 * @param {Object}
 * @returns {Array}
 */
encode.OBJECT = function(v) {
    const encodingFunction = encode[v.type];
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(encodingFunction !== undefined, 'No encoding function for type ' + v.type);
    return encodingFunction(v.value);
};

/**
 * @param {Object}
 * @returns {number}
 */
sizeOf.OBJECT = function(v) {
    const sizeOfFunction = sizeOf[v.type];
    _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(sizeOfFunction !== undefined, 'No sizeOf function for type ' + v.type);
    return sizeOfFunction(v.value);
};

/**
 * Convert a table object to bytes.
 * A table contains a list of fields containing the metadata (name, type and default value).
 * The table itself has the field values set as attributes.
 * @param {opentype.Table}
 * @returns {Array}
 */
encode.TABLE = function(table) {
    let d = [];
    const length = table.fields.length;
    const subtables = [];
    const subtableOffsets = [];

    for (let i = 0; i < length; i += 1) {
        const field = table.fields[i];
        const encodingFunction = encode[field.type];
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(encodingFunction !== undefined, 'No encoding function for field type ' + field.type + ' (' + field.name + ')');
        let value = table[field.name];
        if (value === undefined) {
            value = field.value;
        }

        const bytes = encodingFunction(value);

        if (field.type === 'TABLE') {
            subtableOffsets.push(d.length);
            d = d.concat([0, 0]);
            subtables.push(bytes);
        } else {
            d = d.concat(bytes);
        }
    }

    for (let i = 0; i < subtables.length; i += 1) {
        const o = subtableOffsets[i];
        const offset = d.length;
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(offset < 65536, 'Table ' + table.tableName + ' too big.');
        d[o] = offset >> 8;
        d[o + 1] = offset & 0xff;
        d = d.concat(subtables[i]);
    }

    return d;
};

/**
 * @param {opentype.Table}
 * @returns {number}
 */
sizeOf.TABLE = function(table) {
    let numBytes = 0;
    const length = table.fields.length;

    for (let i = 0; i < length; i += 1) {
        const field = table.fields[i];
        const sizeOfFunction = sizeOf[field.type];
        _check__WEBPACK_IMPORTED_MODULE_0__["default"].argument(sizeOfFunction !== undefined, 'No sizeOf function for field type ' + field.type + ' (' + field.name + ')');
        let value = table[field.name];
        if (value === undefined) {
            value = field.value;
        }

        numBytes += sizeOfFunction(value);

        // Subtables take 2 more bytes for offsets.
        if (field.type === 'TABLE') {
            numBytes += 2;
        }
    }

    return numBytes;
};

encode.RECORD = encode.TABLE;
sizeOf.RECORD = sizeOf.TABLE;

// Merge in a list of bytes.
encode.LITERAL = function(v) {
    return v;
};

sizeOf.LITERAL = function(v) {
    return v.length;
};




/***/ }),

/***/ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/util.js":
/*!************************************************************************************!*\
  !*** ../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/util.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayBufferToNodeBuffer: () => (/* binding */ arrayBufferToNodeBuffer),
/* harmony export */   checkArgument: () => (/* binding */ checkArgument),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   nodeBufferToArrayBuffer: () => (/* binding */ nodeBufferToArrayBuffer)
/* harmony export */ });
function isBrowser() {
    return typeof window !== 'undefined';
}

function isNode() {
    return typeof window === 'undefined';
}

function nodeBufferToArrayBuffer(buffer) {
    const ab = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }

    return ab;
}

function arrayBufferToNodeBuffer(ab) {
    const buffer = new Buffer(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }

    return buffer;
}

function checkArgument(expression, message) {
    if (!expression) {
        throw message;
    }
}




/***/ }),

/***/ "../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js ***!
  \*****************************************************************************************/
/***/ ((module) => {

"use strict";
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),

/***/ "../node_modules/.pnpm/possible-typed-array-names@1.0.0/node_modules/possible-typed-array-names/index.js":
/*!***************************************************************************************************************!*\
  !*** ../node_modules/.pnpm/possible-typed-array-names@1.0.0/node_modules/possible-typed-array-names/index.js ***!
  \***************************************************************************************************************/
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = [
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];


/***/ }),

/***/ "../node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/.pnpm/safe-regex-test@1.1.0/node_modules/safe-regex-test/index.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBound = __webpack_require__(/*! call-bound */ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js");
var isRegex = __webpack_require__(/*! is-regex */ "../node_modules/.pnpm/is-regex@1.2.1/node_modules/is-regex/index.js");

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = __webpack_require__(/*! es-errors/type */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");

/** @type {import('.')} */
module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};


/***/ }),

/***/ "../node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js":
/*!*************************************************************************************************!*\
  !*** ../node_modules/.pnpm/set-function-length@1.2.2/node_modules/set-function-length/index.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "../node_modules/.pnpm/get-intrinsic@1.2.7/node_modules/get-intrinsic/index.js");
var define = __webpack_require__(/*! define-data-property */ "../node_modules/.pnpm/define-data-property@1.1.4/node_modules/define-data-property/index.js");
var hasDescriptors = __webpack_require__(/*! has-property-descriptors */ "../node_modules/.pnpm/has-property-descriptors@1.0.2/node_modules/has-property-descriptors/index.js")();
var gOPD = __webpack_require__(/*! gopd */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");

var $TypeError = __webpack_require__(/*! es-errors/type */ "../node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js");
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ }),

/***/ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/index.js":
/*!*********************************************************************************!*\
  !*** ../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/index.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/index.js");


/***/ }),

/***/ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/ch-to-path.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/ch-to-path.js ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const assert = __webpack_require__(/*! assert */ "../node_modules/.pnpm/assert@2.1.0/node_modules/assert/build/assert.js");

function rndPathCmd(cmd) {
	const r = (Math.random() * 0.2) - 0.1;

	switch (cmd.type) {
		case 'M': case 'L':
			cmd.x += r;
			cmd.y += r;
			break;
		case 'Q': case 'C':
			cmd.x += r;
			cmd.y += r;
			cmd.x1 += r;
			cmd.y1 += r;
			break;
		default:
			// Close path cmd
			break;
	}

	return cmd;
}

module.exports = function (text, opts) {
	const ch = text[0];
	assert(ch, 'expect a string');

	const fontSize = opts.fontSize;
	const fontScale = fontSize / opts.font.unitsPerEm;

	const glyph = opts.font.charToGlyph(ch);
	const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
	const left = opts.x - (width / 2);

	const height = (opts.ascender + opts.descender) * fontScale;
	const top = opts.y + (height / 2);
	const path = glyph.getPath(left, top, fontSize);
	// Randomize path commands
	path.commands.forEach(rndPathCmd);

	const pathData = path.toPathData();

	return pathData;
};


/***/ }),

/***/ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/char-preset.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/char-preset.js ***!
  \*******************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


/***/ }),

/***/ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/index.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/index.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const chToPath = __webpack_require__(/*! ./ch-to-path */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/ch-to-path.js");
const random = __webpack_require__(/*! ./random */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/random.js");
const optionMngr = __webpack_require__(/*! ./option-manager */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/option-manager.js");

const opts = optionMngr.options;

const getLineNoise = function (width, height, options) {
	const hasColor = options.color;
	const noiseLines = [];
	const min = options.inverse ? 7 : 1;
	const max = options.inverse ? 15 : 9;
	let i = -1;

	while (++i < options.noise) {
		const start = `${random.int(1, 21)} ${random.int(1, height - 1)}`;
		const end = `${random.int(width - 21, width - 1)} ${random.int(1, height - 1)}`;
		const mid1 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${random.int(1, height - 1)}`;
		const mid2 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${random.int(1, height - 1)}`;
		const color = hasColor ? random.color() : random.greyColor(min, max);
		noiseLines.push(`<path d="M${start} C${mid1},${mid2},${end}" stroke="${color}" fill="none"/>`);
	}

	return noiseLines;
};

const getText = function (text, width, height, options) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	const min = options.inverse ? 10 : 0;
	const max = options.inverse ? 14 : 4;
	let i = -1;
	const out = [];

	while (++i < len) {
		const x = spacing * (i + 1);
		const y = height / 2;
		const charPath = chToPath(text[i], Object.assign({x, y}, options));

		const color = options.color ?
			random.color(options.background) : random.greyColor(min, max);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out;
};

const createCaptcha = function (text, options) {
	text = text || random.captchaText();
	options = Object.assign({}, opts, options);
	const width = options.width;
	const height = options.height;
	const bg = options.background;
	if (bg) {
		options.color = true;
	}

	const bgRect = bg ?
		`<rect width="100%" height="100%" fill="${bg}"/>` : '';
	const paths =
		[].concat(getLineNoise(width, height, options))
			.concat(getText(text, width, height, options))
			.sort(() => Math.random() - 0.5)
			.join('');
	const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0,0,${width},${height}">`;
	const xml = `${start}${bgRect}${paths}</svg>`;

	return xml;
};

const create = function (options) {
	const text = random.captchaText(options);
	const data = createCaptcha(text, options);

	return {text, data};
};

const createMathExpr = function (options) {
	const expr = random.mathExpr(options.mathMin, options.mathMax, options.mathOperator);
	const text = expr.text;
	const data = createCaptcha(expr.equation, options);

	return {text, data};
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
module.exports.create = create;
module.exports.createMathExpr = createMathExpr;
module.exports.options = opts;
module.exports.loadFont = optionMngr.loadFont;


/***/ }),

/***/ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/option-manager.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/option-manager.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var __dirname = "/";

const path = __webpack_require__(/*! path */ "../node_modules/.pnpm/path-browserify@1.0.1/node_modules/path-browserify/index.js");
const opentype = __webpack_require__(/*! opentype.js */ "../node_modules/.pnpm/opentype.js@0.7.3/node_modules/opentype.js/src/opentype.js");
const charPreset = __webpack_require__(/*! ./char-preset */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/char-preset.js");

const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
const font = opentype.loadSync(fontPath);
const ascender = font.ascender;
const descender = font.descender;

const options = {
	width: 150,
	height: 50,
	noise: 1,
	color: false,
	background: '',
	size: 4,
	ignoreChars: '',
	fontSize: 56,
	charPreset, font, ascender, descender
};

const loadFont = filepath => {
	const font = opentype.loadSync(filepath);
	options.font = font;
	options.ascender = font.ascender;
	options.descender = font.descender;
};

module.exports = {
	options, loadFont
};


/***/ }),

/***/ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/random.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/random.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const opts = (__webpack_require__(/*! ./option-manager */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/lib/option-manager.js").options);

const randomInt = function (min, max) {
	return Math.round(min + (Math.random() * (max - min)));
};

const stripCharsFromString = function (string, chars) {
	return string.split('').filter(char => chars.indexOf(char) === -1);
};

exports.int = randomInt;

exports.greyColor = function (min, max) {
	min = min || 1;
	max = max || 9;
	const int = randomInt(min, max).toString(16);

	return `#${int}${int}${int}`;
};

exports.captchaText = function (options) {
	if (typeof options === 'number') {
		options = {size: options};
	}
	options = options || {};

	const size = options.size || 4;
	const ignoreChars = options.ignoreChars || '';
	let i = -1;
	let out = '';
	let chars = options.charPreset || opts.charPreset;

	if (ignoreChars) {
		chars = stripCharsFromString(chars, ignoreChars);
	}

	const len = chars.length - 1;

	while (++i < size) {
		out += chars[randomInt(0, len)];
	}

	return out;
};

const mathExprPlus = function(leftNumber, rightNumber){
	const text = (leftNumber + rightNumber).toString();
	const equation = leftNumber + '+' + rightNumber;
	return {text, equation}
}

const mathExprMinus = function(leftNumber, rightNumber){
	const text = (leftNumber - rightNumber).toString();
	const equation = leftNumber + '-' + rightNumber;
	return {text, equation}
}

/**
 * Creates a simple math expression using either the + or - operator
 * @param {number} [min] - The min value of the math expression defaults to 1
 * @param {number} [max] - The max value of the math expression defaults to 9
 * @param {string} [operator] - The operator(s) to use
 * @returns {{equation: string, text: string}}
 */
exports.mathExpr = function (min, max, operator) {
	min = min || 1;
	max = max || 9;
	operator = operator || '+';
	const left = randomInt(min, max);
	const right = randomInt(min, max);
	switch(operator){
		case '+':
			return mathExprPlus(left, right)
		case '-':
			return mathExprMinus(left, right)
		default:
			return (randomInt(1, 2) % 2) ? mathExprPlus(left, right) : mathExprMinus(left, right);
	}
};

// https://github.com/jquery/jquery-color/blob/master/jquery.color.js#L432
// The idea here is generate color in hsl first and convert that to rgb color
exports.color = function (bgColor) {
	// Random 24 colors
	// or based on step
	const hue = randomInt(0, 24) / 24;

	const saturation = randomInt(60, 80) / 100;
	const bgLightness = bgColor ? getLightness(bgColor) : 1.0;
	let minLightness;
	let maxLightness;
	if (bgLightness >= 0.5) {
		minLightness = Math.round(bgLightness * 100) - 45;
		maxLightness = Math.round(bgLightness * 100) - 25;
	} else {
		minLightness = Math.round(bgLightness * 100) + 25;
		maxLightness = Math.round(bgLightness * 100) + 45;
	}
	const lightness = randomInt(minLightness, maxLightness) / 100;

	const q = lightness < 0.5 ?
		lightness * (lightness + saturation) :
		lightness + saturation - (lightness * saturation);
	const p = (2 * lightness) - q;

	const r = Math.floor(hue2rgb(p, q, hue + (1 / 3)) * 255);
	const g = Math.floor(hue2rgb(p, q, hue) * 255);
	const b = Math.floor(hue2rgb(p, q, hue - (1 / 3)) * 255);
	/* eslint-disable no-mixed-operators */
	const c = ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1);

	return '#' + c;
};

function getLightness(rgbColor) {
	if (rgbColor[0] !== '#') {
		return 1.0; // Invalid color ?
	}
	rgbColor = rgbColor.slice(1);
	if (rgbColor.length === 3) {
		rgbColor = rgbColor[0] + rgbColor[0] +
			rgbColor[1] + rgbColor[1] + rgbColor[2] + rgbColor[2];
	}

	const hexColor = parseInt(rgbColor, 16);
	const r = hexColor >> 16;
	const g = hexColor >> 8 & 255;
	const b = hexColor & 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	return (max + min) / (2 * 255);
}

function hue2rgb(p, q, h) {
	h = (h + 1) % 1;
	if (h * 6 < 1) {
		return p + (q - p) * h * 6;
	}
	if (h * 2 < 1) {
		return q;
	}
	if (h * 3 < 2) {
		return p + (q - p) * ((2 / 3) - h) * 6;
	}
	return p;
}


/***/ }),

/***/ "../node_modules/.pnpm/tiny-inflate@1.0.3/node_modules/tiny-inflate/index.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/.pnpm/tiny-inflate@1.0.3/node_modules/tiny-inflate/index.js ***!
  \***********************************************************************************/
/***/ ((module) => {

var TINF_OK = 0;
var TINF_DATA_ERROR = -3;

function Tree() {
  this.table = new Uint16Array(16);   /* table of code length counts */
  this.trans = new Uint16Array(288);  /* code -> symbol translation table */
}

function Data(source, dest) {
  this.source = source;
  this.sourceIndex = 0;
  this.tag = 0;
  this.bitcount = 0;
  
  this.dest = dest;
  this.destLen = 0;
  
  this.ltree = new Tree();  /* dynamic length/symbol tree */
  this.dtree = new Tree();  /* dynamic distance tree */
}

/* --------------------------------------------------- *
 * -- uninitialized global data (static structures) -- *
 * --------------------------------------------------- */

var sltree = new Tree();
var sdtree = new Tree();

/* extra bits and base tables for length codes */
var length_bits = new Uint8Array(30);
var length_base = new Uint16Array(30);

/* extra bits and base tables for distance codes */
var dist_bits = new Uint8Array(30);
var dist_base = new Uint16Array(30);

/* special ordering of code length codes */
var clcidx = new Uint8Array([
  16, 17, 18, 0, 8, 7, 9, 6,
  10, 5, 11, 4, 12, 3, 13, 2,
  14, 1, 15
]);

/* used by tinf_decode_trees, avoids allocations every call */
var code_tree = new Tree();
var lengths = new Uint8Array(288 + 32);

/* ----------------------- *
 * -- utility functions -- *
 * ----------------------- */

/* build extra bits and base tables */
function tinf_build_bits_base(bits, base, delta, first) {
  var i, sum;

  /* build bits table */
  for (i = 0; i < delta; ++i) bits[i] = 0;
  for (i = 0; i < 30 - delta; ++i) bits[i + delta] = i / delta | 0;

  /* build base table */
  for (sum = first, i = 0; i < 30; ++i) {
    base[i] = sum;
    sum += 1 << bits[i];
  }
}

/* build the fixed huffman trees */
function tinf_build_fixed_trees(lt, dt) {
  var i;

  /* build fixed length tree */
  for (i = 0; i < 7; ++i) lt.table[i] = 0;

  lt.table[7] = 24;
  lt.table[8] = 152;
  lt.table[9] = 112;

  for (i = 0; i < 24; ++i) lt.trans[i] = 256 + i;
  for (i = 0; i < 144; ++i) lt.trans[24 + i] = i;
  for (i = 0; i < 8; ++i) lt.trans[24 + 144 + i] = 280 + i;
  for (i = 0; i < 112; ++i) lt.trans[24 + 144 + 8 + i] = 144 + i;

  /* build fixed distance tree */
  for (i = 0; i < 5; ++i) dt.table[i] = 0;

  dt.table[5] = 32;

  for (i = 0; i < 32; ++i) dt.trans[i] = i;
}

/* given an array of code lengths, build a tree */
var offs = new Uint16Array(16);

function tinf_build_tree(t, lengths, off, num) {
  var i, sum;

  /* clear code length count table */
  for (i = 0; i < 16; ++i) t.table[i] = 0;

  /* scan symbol lengths, and sum code length counts */
  for (i = 0; i < num; ++i) t.table[lengths[off + i]]++;

  t.table[0] = 0;

  /* compute offset table for distribution sort */
  for (sum = 0, i = 0; i < 16; ++i) {
    offs[i] = sum;
    sum += t.table[i];
  }

  /* create code->symbol translation table (symbols sorted by code) */
  for (i = 0; i < num; ++i) {
    if (lengths[off + i]) t.trans[offs[lengths[off + i]]++] = i;
  }
}

/* ---------------------- *
 * -- decode functions -- *
 * ---------------------- */

/* get one bit from source stream */
function tinf_getbit(d) {
  /* check if tag is empty */
  if (!d.bitcount--) {
    /* load next tag */
    d.tag = d.source[d.sourceIndex++];
    d.bitcount = 7;
  }

  /* shift bit out of tag */
  var bit = d.tag & 1;
  d.tag >>>= 1;

  return bit;
}

/* read a num bit value from a stream and add base */
function tinf_read_bits(d, num, base) {
  if (!num)
    return base;

  while (d.bitcount < 24) {
    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
    d.bitcount += 8;
  }

  var val = d.tag & (0xffff >>> (16 - num));
  d.tag >>>= num;
  d.bitcount -= num;
  return val + base;
}

/* given a data stream and a tree, decode a symbol */
function tinf_decode_symbol(d, t) {
  while (d.bitcount < 24) {
    d.tag |= d.source[d.sourceIndex++] << d.bitcount;
    d.bitcount += 8;
  }
  
  var sum = 0, cur = 0, len = 0;
  var tag = d.tag;

  /* get more bits while code value is above sum */
  do {
    cur = 2 * cur + (tag & 1);
    tag >>>= 1;
    ++len;

    sum += t.table[len];
    cur -= t.table[len];
  } while (cur >= 0);
  
  d.tag = tag;
  d.bitcount -= len;

  return t.trans[sum + cur];
}

/* given a data stream, decode dynamic trees from it */
function tinf_decode_trees(d, lt, dt) {
  var hlit, hdist, hclen;
  var i, num, length;

  /* get 5 bits HLIT (257-286) */
  hlit = tinf_read_bits(d, 5, 257);

  /* get 5 bits HDIST (1-32) */
  hdist = tinf_read_bits(d, 5, 1);

  /* get 4 bits HCLEN (4-19) */
  hclen = tinf_read_bits(d, 4, 4);

  for (i = 0; i < 19; ++i) lengths[i] = 0;

  /* read code lengths for code length alphabet */
  for (i = 0; i < hclen; ++i) {
    /* get 3 bits code length (0-7) */
    var clen = tinf_read_bits(d, 3, 0);
    lengths[clcidx[i]] = clen;
  }

  /* build code length tree */
  tinf_build_tree(code_tree, lengths, 0, 19);

  /* decode code lengths for the dynamic trees */
  for (num = 0; num < hlit + hdist;) {
    var sym = tinf_decode_symbol(d, code_tree);

    switch (sym) {
      case 16:
        /* copy previous code length 3-6 times (read 2 bits) */
        var prev = lengths[num - 1];
        for (length = tinf_read_bits(d, 2, 3); length; --length) {
          lengths[num++] = prev;
        }
        break;
      case 17:
        /* repeat code length 0 for 3-10 times (read 3 bits) */
        for (length = tinf_read_bits(d, 3, 3); length; --length) {
          lengths[num++] = 0;
        }
        break;
      case 18:
        /* repeat code length 0 for 11-138 times (read 7 bits) */
        for (length = tinf_read_bits(d, 7, 11); length; --length) {
          lengths[num++] = 0;
        }
        break;
      default:
        /* values 0-15 represent the actual code lengths */
        lengths[num++] = sym;
        break;
    }
  }

  /* build dynamic trees */
  tinf_build_tree(lt, lengths, 0, hlit);
  tinf_build_tree(dt, lengths, hlit, hdist);
}

/* ----------------------------- *
 * -- block inflate functions -- *
 * ----------------------------- */

/* given a stream and two trees, inflate a block of data */
function tinf_inflate_block_data(d, lt, dt) {
  while (1) {
    var sym = tinf_decode_symbol(d, lt);

    /* check for end of block */
    if (sym === 256) {
      return TINF_OK;
    }

    if (sym < 256) {
      d.dest[d.destLen++] = sym;
    } else {
      var length, dist, offs;
      var i;

      sym -= 257;

      /* possibly get more bits from length code */
      length = tinf_read_bits(d, length_bits[sym], length_base[sym]);

      dist = tinf_decode_symbol(d, dt);

      /* possibly get more bits from distance code */
      offs = d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);

      /* copy match */
      for (i = offs; i < offs + length; ++i) {
        d.dest[d.destLen++] = d.dest[i];
      }
    }
  }
}

/* inflate an uncompressed block of data */
function tinf_inflate_uncompressed_block(d) {
  var length, invlength;
  var i;
  
  /* unread from bitbuffer */
  while (d.bitcount > 8) {
    d.sourceIndex--;
    d.bitcount -= 8;
  }

  /* get length */
  length = d.source[d.sourceIndex + 1];
  length = 256 * length + d.source[d.sourceIndex];

  /* get one's complement of length */
  invlength = d.source[d.sourceIndex + 3];
  invlength = 256 * invlength + d.source[d.sourceIndex + 2];

  /* check length */
  if (length !== (~invlength & 0x0000ffff))
    return TINF_DATA_ERROR;

  d.sourceIndex += 4;

  /* copy block */
  for (i = length; i; --i)
    d.dest[d.destLen++] = d.source[d.sourceIndex++];

  /* make sure we start next block on a byte boundary */
  d.bitcount = 0;

  return TINF_OK;
}

/* inflate stream from source to dest */
function tinf_uncompress(source, dest) {
  var d = new Data(source, dest);
  var bfinal, btype, res;

  do {
    /* read final block flag */
    bfinal = tinf_getbit(d);

    /* read block type (2 bits) */
    btype = tinf_read_bits(d, 2, 0);

    /* decompress block */
    switch (btype) {
      case 0:
        /* decompress uncompressed block */
        res = tinf_inflate_uncompressed_block(d);
        break;
      case 1:
        /* decompress block with fixed huffman trees */
        res = tinf_inflate_block_data(d, sltree, sdtree);
        break;
      case 2:
        /* decompress block with dynamic huffman trees */
        tinf_decode_trees(d, d.ltree, d.dtree);
        res = tinf_inflate_block_data(d, d.ltree, d.dtree);
        break;
      default:
        res = TINF_DATA_ERROR;
    }

    if (res !== TINF_OK)
      throw new Error('Data error');

  } while (!bfinal);

  if (d.destLen < d.dest.length) {
    if (typeof d.dest.slice === 'function')
      return d.dest.slice(0, d.destLen);
    else
      return d.dest.subarray(0, d.destLen);
  }
  
  return d.dest;
}

/* -------------------- *
 * -- initialization -- *
 * -------------------- */

/* build fixed huffman trees */
tinf_build_fixed_trees(sltree, sdtree);

/* build extra bits and base tables */
tinf_build_bits_base(length_bits, length_base, 4, 3);
tinf_build_bits_base(dist_bits, dist_base, 2, 1);

/* fix a special case */
length_bits[28] = 0;
length_base[28] = 258;

module.exports = tinf_uncompress;


/***/ }),

/***/ "../node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js":
/*!****************************************************************************!*\
  !*** ../node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "../node_modules/.pnpm/is-arguments@1.2.0/node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "../node_modules/.pnpm/is-generator-function@1.1.0/node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "../node_modules/.pnpm/which-typed-array@1.1.18/node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "../node_modules/.pnpm/is-typed-array@1.1.15/node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js":
/*!*******************************************************************!*\
  !*** ../node_modules/.pnpm/util@0.12.5/node_modules/util/util.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "../node_modules/.pnpm/util@0.12.5/node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "../node_modules/.pnpm/inherits@2.0.4/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "../node_modules/.pnpm/which-typed-array@1.1.18/node_modules/which-typed-array/index.js":
/*!**********************************************************************************************!*\
  !*** ../node_modules/.pnpm/which-typed-array@1.1.18/node_modules/which-typed-array/index.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "../node_modules/.pnpm/for-each@0.3.3/node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "../node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js");
var callBind = __webpack_require__(/*! call-bind */ "../node_modules/.pnpm/call-bind@1.0.8/node_modules/call-bind/index.js");
var callBound = __webpack_require__(/*! call-bound */ "../node_modules/.pnpm/call-bound@1.0.3/node_modules/call-bound/index.js");
var gOPD = __webpack_require__(/*! gopd */ "../node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js");

/** @type {(O: object) => string} */
var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "../node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {(receiver: import('.').TypedArray) => string | typeof Uint8Array.prototype.slice.call | typeof Uint8Array.prototype.set.call} Getter */
/** @type {{ [k in `\$${import('.').TypedArrayName}`]?: Getter } & { __proto__: null }} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(fn);
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		// eslint-disable-next-line no-extra-parens
		/** @type {Record<`\$${TypedArrayName}`, Getter>} */ /** @type {any} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
				// @ts-expect-error TODO: fix
					if ('$' + getter(value) === typedArray) {
						found = $slice(typedArray, 1);
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		// eslint-disable-next-line no-extra-parens
		/** @type {Record<`\$${TypedArrayName}`, Getter>} */ /** @type {any} */ (cache),
		/** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error TODO: fix
					getter(value);
					found = $slice(name, 1);
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ }),

/***/ "node:crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "?5e0b":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "../node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/.pnpm/available-typed-arrays@1.0.7/node_modules/available-typed-arrays/index.js ***!
  \*******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = __webpack_require__(/*! possible-typed-array-names */ "../node_modules/.pnpm/possible-typed-array-names@1.0.0/node_modules/possible-typed-array-names/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./src/js/captchaTest.js":
/*!*******************************!*\
  !*** ./src/js/captchaTest.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateCaptcha_gif: () => (/* binding */ generateCaptcha_gif),
/* harmony export */   generateCaptcha_svg: () => (/* binding */ generateCaptcha_svg)
/* harmony export */ });
/* harmony import */ var svg_captcha__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg-captcha */ "../node_modules/.pnpm/svg-captcha@1.4.0/node_modules/svg-captcha/index.js");
/* harmony import */ var captcha_gif__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! captcha.gif */ "../node_modules/.pnpm/captcha.gif@1.0.11/node_modules/captcha.gif/dist/index.mjs");
// import fs from 'fs'
// import path from 'path'

// Doesn't work ? i think
// import Captcha from '@haileybot/captcha-generator'

// let captcha = new Captcha()
// captcha.PNGStream.pipe(fs.createWriteStream(path.join(__dirname,`${captcha.value}.png`)))
// captcha.JPEGStream.pipe(fs.createWriteStream(path.join(__dirname,`${captcha.value}.jpeg`)))



function generateCaptcha_svg() {
  var captcha = svg_captcha__WEBPACK_IMPORTED_MODULE_0__.create();
  console.log(captcha.data);
  console.log(captcha.text);
  return captcha;
}
var captcha2 = new captcha_gif__WEBPACK_IMPORTED_MODULE_1__.Captcha({
  "filter": true,
  "blur": true
});
function generateCaptcha_gif() {
  var _captcha2$generate = captcha2.generate(),
    token = _captcha2$generate.token,
    buffer = _captcha2$generate.buffer;
  var captchaImgBase64 = buffer.toString('base64');
  // fs.writeFileSync('./captchaoutput.gif',buffer);   
  return {
    token: token,
    captchaImgBase64: captchaImgBase64
  };
}


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _captchaTest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./captchaTest.js */ "./src/js/captchaTest.js");

console.log('bundle.js script init');

/***/ }),

/***/ "../node_modules/.pnpm/captcha.gif@1.0.11/node_modules/captcha.gif/dist/index.mjs":
/*!****************************************************************************************!*\
  !*** ../node_modules/.pnpm/captcha.gif@1.0.11/node_modules/captcha.gif/dist/index.mjs ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Captcha: () => (/* binding */ Captcha)
/* harmony export */ });
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:crypto */ "node:crypto");


var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/Colors.ts
var colors = [
  // Black 500 #000000
  `GIF89a\xC8\0F\0\x83\0\0















\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Red 500 #F44336
  `GIF89a\xC8\0F\0\x83\0\0
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xF4C6
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Pink 500 #E91E63
  `GIF89a\xC8\0F\0\x83\0\0
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xE9c
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Purple 500 #9C27B0
  `GIF89a\xC8\0F\0\x83\0\0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\x9C'\xB0
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Deep Purple 500 #673AB7
  `GIF89a\xC8\0F\0\x83\0\0
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
g:\xB7
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Indigo 500 #3F51B5
  `GIF89a\xC8\0F\0\x83\0\0
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
?Q\xB5
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Blue 500 #2196F3
  `GIF89a\xC8\0F\0\x83\0\0
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
!\x96\xF3
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Light Blue 500 #03A9F4
  `GIF89a\xC8\0F\0\x83\0\0
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xA9\xF4
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Cyan 500 #00BCD4
  `GIF89a\xC8\0F\0\x83\0\0
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\0\xBC\xD4
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Teal 500 #009688
  `GIF89a\xC8\0F\0\x83\0\0
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\0\x96\x88
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Green 500 #4CAF50
  `GIF89a\xC8\0F\0\x83\0\0
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
L\xAFP
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Light Green 500 #8BC34A
  `GIF89a\xC8\0F\0\x83\0\0
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\x8B\xC3J
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Lime 500 #CDDC39
  `GIF89a\xC8\0F\0\x83\0\0
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xCD\xDC9
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Yellow 500 #FFEB3B
  `GIF89a\xC8\0F\0\x83\0\0
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xEB;
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Amber 500 #FFC107
  `GIF89a\xC8\0F\0\x83\0\0
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xC1\x07
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Orange 500 #FF9800
  `GIF89a\xC8\0F\0\x83\0\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\x98\0
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Deep Orange 500 #FF5722
  `GIF89a\xC8\0F\0\x83\0\0
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFFW"
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`,
  // Brown 500 #795548
  `GIF89a\xC8\0F\0\x83\0\0
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
yUH
\xFF\xFF\xFF,\0\0\0\0\xC8\0F\0\0`
];

// src/lib/Font.ts
var lt0 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -4,
  11,
  7,
  5,
  3,
  1,
  0,
  0,
  0,
  1,
  3,
  7,
  13,
  -100,
  -2,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -1,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  9,
  11,
  9,
  3,
  0,
  0,
  0,
  0,
  13,
  -100,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -5,
  3,
  0,
  0,
  0,
  7,
  -100,
  5,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -5,
  9,
  0,
  0,
  0,
  1,
  -100,
  7,
  0,
  0,
  0,
  0,
  1,
  13,
  -6,
  13,
  0,
  0,
  0,
  0,
  -100,
  -1,
  9,
  1,
  0,
  5,
  13,
  -8,
  0,
  0,
  0,
  0,
  13,
  -100,
  -14,
  0,
  0,
  0,
  0,
  11,
  -100,
  -14,
  0,
  0,
  0,
  0,
  11,
  -100,
  -14,
  0,
  0,
  0,
  0,
  11,
  -100,
  -12,
  13,
  5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -8,
  13,
  9,
  5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  13,
  7,
  3,
  1,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  5,
  9,
  13,
  -2,
  0,
  0,
  0,
  0,
  11,
  -100,
  -1,
  13,
  1,
  0,
  0,
  0,
  0,
  7,
  -6,
  0,
  0,
  0,
  0,
  11,
  -100,
  13,
  1,
  0,
  0,
  0,
  0,
  13,
  -7,
  0,
  0,
  0,
  0,
  11,
  -100,
  5,
  0,
  0,
  0,
  0,
  5,
  -8,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  0,
  11,
  -8,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  0,
  13,
  -7,
  13,
  0,
  0,
  0,
  0,
  11,
  -100,
  1,
  0,
  0,
  0,
  0,
  -7,
  9,
  0,
  0,
  0,
  0,
  0,
  9,
  -3,
  9,
  -100,
  5,
  0,
  0,
  0,
  0,
  3,
  13,
  -3,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  13,
  3,
  5,
  -100,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  1,
  11,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -1,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -3,
  9,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  7,
  3,
  0,
  0,
  0,
  3,
  7,
  13,
  -5,
  9,
  0,
  1,
  3,
  9,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt1 = [
  -100,
  -100,
  -4,
  13,
  5,
  0,
  3,
  -100,
  -3,
  11,
  1,
  0,
  0,
  0,
  7,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -2,
  5,
  0,
  0,
  0,
  0,
  5,
  -100,
  -3,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  3,
  13,
  9,
  5,
  3,
  1,
  0,
  0,
  1,
  3,
  5,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  -2,
  13,
  11,
  9,
  5,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  1,
  -8,
  13,
  1,
  0,
  0,
  0,
  5,
  -100,
  -3,
  3,
  0,
  0,
  0,
  5,
  -9,
  13,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  9,
  -10,
  7,
  0,
  0,
  0,
  5,
  -100,
  -3,
  1,
  0,
  0,
  0,
  11,
  -10,
  13,
  0,
  0,
  0,
  0,
  -100,
  -3,
  3,
  0,
  0,
  0,
  11,
  -11,
  3,
  0,
  0,
  0,
  11,
  -100,
  -3,
  1,
  0,
  0,
  0,
  11,
  -11,
  7,
  0,
  0,
  0,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  9,
  0,
  0,
  0,
  3,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  11,
  0,
  0,
  0,
  1,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  11,
  0,
  0,
  0,
  1,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  9,
  0,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  7,
  0,
  0,
  0,
  3,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  3,
  0,
  0,
  0,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -10,
  9,
  0,
  0,
  0,
  3,
  -100,
  -3,
  0,
  0,
  0,
  0,
  9,
  -10,
  3,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  3,
  -9,
  11,
  0,
  0,
  0,
  5,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  0,
  9,
  -7,
  11,
  1,
  0,
  0,
  3,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  13,
  -2,
  13,
  9,
  3,
  0,
  0,
  0,
  3,
  13,
  -100,
  -2,
  13,
  0,
  0,
  5,
  13,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -3,
  9,
  11,
  -4,
  7,
  3,
  1,
  0,
  0,
  1,
  5,
  9,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt2 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -6,
  13,
  7,
  3,
  1,
  0,
  0,
  1,
  3,
  7,
  13,
  -100,
  -5,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  -100,
  -3,
  13,
  3,
  0,
  0,
  0,
  5,
  13,
  13,
  7,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -2,
  13,
  1,
  0,
  0,
  0,
  9,
  -4,
  7,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -1,
  13,
  1,
  0,
  0,
  0,
  9,
  -6,
  5,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -1,
  5,
  0,
  0,
  0,
  3,
  -8,
  1,
  0,
  0,
  0,
  3,
  -100,
  13,
  0,
  0,
  0,
  0,
  11,
  -8,
  13,
  3,
  0,
  3,
  -100,
  7,
  0,
  0,
  0,
  1,
  -100,
  5,
  0,
  0,
  0,
  5,
  -100,
  3,
  0,
  0,
  0,
  9,
  -100,
  1,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  9,
  -100,
  1,
  0,
  0,
  0,
  5,
  -100,
  5,
  0,
  0,
  0,
  0,
  13,
  -100,
  11,
  0,
  0,
  0,
  0,
  7,
  -100,
  -1,
  3,
  0,
  0,
  0,
  0,
  13,
  -100,
  -1,
  11,
  0,
  0,
  0,
  0,
  3,
  -12,
  9,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  3,
  13,
  -8,
  9,
  1,
  3,
  -100,
  -3,
  5,
  0,
  0,
  0,
  0,
  1,
  9,
  -5,
  9,
  3,
  0,
  0,
  11,
  -100,
  -4,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  13,
  -100,
  -7,
  11,
  7,
  3,
  1,
  0,
  1,
  3,
  7,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt3 = [
  -100,
  -100,
  -100,
  -100,
  -18,
  11,
  3,
  0,
  -100,
  -16,
  13,
  3,
  0,
  0,
  0,
  -100,
  -14,
  9,
  3,
  0,
  0,
  0,
  0,
  0,
  -100,
  -13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  -13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  -13,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  -15,
  13,
  5,
  0,
  0,
  0,
  0,
  -100,
  -17,
  1,
  0,
  0,
  0,
  -100,
  -17,
  3,
  0,
  0,
  0,
  -100,
  -17,
  1,
  0,
  0,
  0,
  -100,
  -17,
  0,
  0,
  0,
  0,
  -100,
  -16,
  13,
  0,
  0,
  0,
  0,
  -100,
  -16,
  13,
  0,
  0,
  0,
  0,
  -100,
  -6,
  11,
  5,
  3,
  1,
  0,
  0,
  1,
  5,
  9,
  13,
  13,
  0,
  0,
  0,
  0,
  -100,
  -4,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  0,
  0,
  0,
  0,
  -100,
  -3,
  13,
  1,
  0,
  0,
  0,
  0,
  5,
  11,
  -1,
  13,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  -2,
  13,
  1,
  0,
  0,
  0,
  0,
  7,
  -6,
  11,
  0,
  0,
  0,
  0,
  0,
  -100,
  -2,
  3,
  0,
  0,
  0,
  0,
  9,
  -8,
  11,
  0,
  0,
  0,
  0,
  -100,
  -1,
  9,
  0,
  0,
  0,
  0,
  7,
  -9,
  11,
  0,
  0,
  0,
  0,
  -100,
  -1,
  1,
  0,
  0,
  0,
  0,
  13,
  -9,
  11,
  0,
  0,
  0,
  0,
  -100,
  11,
  0,
  0,
  0,
  0,
  3,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  5,
  0,
  0,
  0,
  0,
  13,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  3,
  0,
  0,
  0,
  3,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  0,
  0,
  0,
  0,
  7,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  0,
  0,
  0,
  0,
  11,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  0,
  0,
  0,
  0,
  11,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  0,
  0,
  0,
  0,
  11,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  1,
  0,
  0,
  0,
  9,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  3,
  0,
  0,
  0,
  7,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  7,
  0,
  0,
  0,
  3,
  -11,
  11,
  0,
  0,
  0,
  0,
  -100,
  13,
  0,
  0,
  0,
  0,
  13,
  -10,
  13,
  0,
  0,
  0,
  0,
  -100,
  -1,
  3,
  0,
  0,
  0,
  5,
  -11,
  0,
  0,
  0,
  0,
  -100,
  -1,
  13,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  -100,
  -2,
  7,
  0,
  0,
  0,
  1,
  13,
  -8,
  13,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  5,
  0,
  0,
  0,
  1,
  11,
  -7,
  5,
  0,
  0,
  0,
  0,
  9,
  -100,
  -4,
  5,
  0,
  0,
  0,
  0,
  3,
  9,
  13,
  -1,
  13,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -5,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -7,
  9,
  3,
  1,
  0,
  0,
  3,
  7,
  13,
  -1,
  11,
  1,
  0,
  1,
  5,
  7,
  11,
  -100,
  -18,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt4 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -7,
  13,
  5,
  1,
  1,
  0,
  1,
  3,
  9,
  13,
  -100,
  -6,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -4,
  11,
  1,
  0,
  0,
  3,
  11,
  -1,
  13,
  7,
  1,
  0,
  0,
  0,
  9,
  -100,
  -3,
  9,
  0,
  0,
  0,
  1,
  13,
  -5,
  3,
  0,
  0,
  1,
  -100,
  -2,
  9,
  0,
  0,
  0,
  0,
  13,
  -6,
  11,
  0,
  0,
  0,
  9,
  -100,
  -1,
  13,
  0,
  0,
  0,
  0,
  9,
  -8,
  0,
  0,
  0,
  1,
  -100,
  -1,
  5,
  0,
  0,
  0,
  0,
  13,
  -8,
  3,
  0,
  0,
  0,
  11,
  -100,
  -1,
  0,
  0,
  0,
  0,
  0,
  -8,
  13,
  1,
  0,
  0,
  0,
  5,
  -100,
  9,
  0,
  0,
  0,
  0,
  0,
  3,
  11,
  -4,
  13,
  11,
  1,
  0,
  0,
  0,
  0,
  1,
  -100,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  1,
  0,
  0,
  0,
  1,
  13,
  -100,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  11,
  -100,
  1,
  0,
  0,
  0,
  9,
  -100,
  3,
  0,
  0,
  0,
  7,
  -100,
  7,
  0,
  0,
  0,
  5,
  -100,
  13,
  0,
  0,
  0,
  0,
  11,
  -100,
  -1,
  5,
  0,
  0,
  0,
  1,
  13,
  -100,
  -1,
  13,
  1,
  0,
  0,
  0,
  1,
  13,
  -10,
  13,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  1,
  13,
  -8,
  13,
  1,
  1,
  -100,
  -3,
  11,
  0,
  0,
  0,
  0,
  0,
  7,
  13,
  -4,
  11,
  7,
  0,
  0,
  9,
  -100,
  -4,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  7,
  -100,
  -5,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  9,
  -100,
  -7,
  13,
  7,
  3,
  0,
  0,
  0,
  1,
  5,
  9,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt5 = [
  -100,
  -100,
  -100,
  -100,
  -9,
  13,
  9,
  3,
  1,
  0,
  1,
  5,
  13,
  -100,
  -8,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -7,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -6,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -5,
  13,
  0,
  0,
  3,
  13,
  9,
  1,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  9,
  0,
  0,
  13,
  -2,
  13,
  5,
  0,
  1,
  9,
  -100,
  -5,
  5,
  0,
  0,
  -100,
  -5,
  1,
  0,
  1,
  -100,
  -5,
  1,
  0,
  0,
  -100,
  -5,
  0,
  0,
  0,
  -100,
  -5,
  0,
  0,
  0,
  13,
  -100,
  -5,
  0,
  0,
  0,
  9,
  -100,
  -5,
  0,
  0,
  0,
  7,
  -100,
  -5,
  0,
  0,
  0,
  5,
  -100,
  -3,
  13,
  7,
  0,
  0,
  0,
  0,
  9,
  -1,
  13,
  11,
  13,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -1,
  11,
  13,
  -1,
  7,
  0,
  0,
  0,
  0,
  5,
  -1,
  13,
  11,
  13,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  0,
  0,
  0,
  0,
  7,
  -100,
  -3,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  7,
  13,
  -100,
  -1,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -100,
  -1,
  7,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  7,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt6 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -7,
  11,
  7,
  3,
  1,
  0,
  0,
  1,
  3,
  7,
  13,
  -4,
  13,
  7,
  5,
  7,
  11,
  -100,
  -5,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  -100,
  -4,
  9,
  0,
  0,
  0,
  5,
  13,
  -1,
  13,
  9,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -3,
  11,
  0,
  0,
  0,
  5,
  -6,
  5,
  0,
  0,
  0,
  0,
  0,
  11,
  13,
  9,
  3,
  0,
  9,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  13,
  -7,
  1,
  0,
  0,
  0,
  0,
  13,
  -100,
  -2,
  1,
  0,
  0,
  0,
  7,
  -8,
  7,
  0,
  0,
  0,
  0,
  7,
  -100,
  -2,
  0,
  0,
  0,
  0,
  9,
  -8,
  11,
  0,
  0,
  0,
  0,
  3,
  -100,
  -2,
  0,
  0,
  0,
  0,
  11,
  -9,
  0,
  0,
  0,
  0,
  1,
  -100,
  -2,
  0,
  0,
  0,
  0,
  11,
  -9,
  0,
  0,
  0,
  0,
  0,
  -100,
  -2,
  0,
  0,
  0,
  0,
  9,
  -8,
  13,
  0,
  0,
  0,
  0,
  1,
  -100,
  -2,
  3,
  0,
  0,
  0,
  5,
  -8,
  9,
  0,
  0,
  0,
  0,
  7,
  -100,
  -2,
  13,
  1,
  0,
  0,
  0,
  13,
  -7,
  5,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  11,
  0,
  0,
  0,
  3,
  13,
  -5,
  7,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  7,
  0,
  0,
  0,
  1,
  9,
  13,
  -1,
  13,
  7,
  0,
  0,
  0,
  1,
  11,
  -100,
  -4,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  -100,
  -4,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  5,
  9,
  -100,
  -2,
  13,
  5,
  0,
  11,
  -100,
  -1,
  13,
  1,
  0,
  0,
  -100,
  -1,
  3,
  0,
  0,
  0,
  1,
  7,
  13,
  -100,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  7,
  9,
  11,
  13,
  -100,
  -1,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  5,
  11,
  -100,
  -2,
  11,
  7,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -100,
  -4,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  9,
  1,
  0,
  3,
  9,
  13,
  13,
  11,
  7,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -1,
  7,
  1,
  0,
  0,
  9,
  -8,
  11,
  7,
  3,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  9,
  0,
  0,
  0,
  3,
  -13,
  11,
  1,
  0,
  0,
  1,
  -100,
  1,
  0,
  0,
  0,
  9,
  -15,
  0,
  0,
  0,
  -100,
  0,
  0,
  0,
  0,
  9,
  -14,
  13,
  0,
  0,
  1,
  -100,
  3,
  0,
  0,
  0,
  1,
  -14,
  7,
  0,
  0,
  5,
  -100,
  11,
  0,
  0,
  0,
  0,
  5,
  -12,
  11,
  0,
  0,
  0,
  13,
  -100,
  -1,
  11,
  1,
  0,
  0,
  0,
  1,
  7,
  11,
  13,
  -1,
  13,
  13,
  11,
  9,
  5,
  3,
  1,
  0,
  0,
  3,
  13,
  -100,
  -3,
  9,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  9,
  -100,
  -6,
  9,
  7,
  3,
  1,
  1,
  0,
  0,
  1,
  1,
  3,
  7,
  11,
  -100,
  -101
];
var lt7 = [
  -100,
  -100,
  -100,
  -100,
  -4,
  13,
  7,
  1,
  9,
  -100,
  -2,
  13,
  7,
  0,
  0,
  0,
  3,
  -100,
  -1,
  7,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  13,
  7,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  5,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -5,
  11,
  5,
  1,
  0,
  1,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -3,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -2,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  11,
  3,
  0,
  5,
  11,
  -1,
  13,
  9,
  1,
  0,
  0,
  0,
  3,
  -100,
  -3,
  0,
  0,
  0,
  0,
  3,
  0,
  1,
  11,
  -6,
  1,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  0,
  5,
  -8,
  11,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -10,
  0,
  0,
  0,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  7,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -10,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -10,
  0,
  0,
  0,
  9,
  -100,
  -3,
  0,
  0,
  0,
  0,
  -11,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  1,
  -11,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  1,
  -11,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  3,
  -11,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  3,
  -11,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  3,
  -11,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  3,
  -10,
  13,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  1,
  -10,
  13,
  0,
  0,
  0,
  11,
  -100,
  -2,
  9,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  5,
  -100,
  -1,
  7,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  -7,
  13,
  3,
  0,
  0,
  0,
  0,
  7,
  -100,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt8 = [
  -100,
  -100,
  -100,
  -100,
  -3,
  5,
  1,
  0,
  3,
  11,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  1,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -2,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -2,
  5,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  7,
  0,
  0,
  3,
  9,
  -100,
  -4,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -4,
  11,
  3,
  0,
  9,
  -100,
  -2,
  9,
  3,
  0,
  0,
  0,
  9,
  -100,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -1,
  11,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  1,
  0,
  0,
  0,
  -100,
  -3,
  1,
  0,
  0,
  0,
  13,
  -100,
  -3,
  1,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  7,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  1,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  9,
  5,
  1,
  1,
  0,
  0,
  1,
  1,
  3,
  5,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt9 = [
  -100,
  -100,
  -100,
  -100,
  -6,
  5,
  0,
  1,
  5,
  13,
  -100,
  -5,
  5,
  0,
  0,
  0,
  0,
  1,
  -100,
  -5,
  1,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -5,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  -5,
  5,
  0,
  0,
  0,
  0,
  3,
  -100,
  -6,
  7,
  1,
  0,
  5,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -6,
  13,
  7,
  3,
  0,
  13,
  -100,
  -5,
  7,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  7,
  1,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -5,
  9,
  0,
  0,
  0,
  0,
  11,
  -100,
  -6,
  1,
  0,
  0,
  0,
  11,
  -100,
  -6,
  3,
  0,
  0,
  0,
  11,
  -100,
  -6,
  5,
  0,
  0,
  0,
  11,
  -100,
  -6,
  5,
  0,
  0,
  0,
  11,
  -100,
  -6,
  5,
  0,
  0,
  0,
  11,
  -100,
  -6,
  5,
  0,
  0,
  0,
  11,
  -100,
  -6,
  3,
  0,
  0,
  0,
  11,
  -100,
  -6,
  3,
  0,
  0,
  0,
  11,
  -100,
  -6,
  1,
  0,
  0,
  0,
  11,
  -100,
  -6,
  1,
  0,
  0,
  0,
  13,
  -100,
  -6,
  1,
  0,
  0,
  0,
  13,
  -100,
  -6,
  1,
  0,
  0,
  0,
  13,
  -100,
  -6,
  1,
  0,
  0,
  0,
  13,
  -100,
  -6,
  1,
  0,
  0,
  0,
  13,
  -100,
  -6,
  1,
  0,
  0,
  0,
  -100,
  -6,
  1,
  0,
  0,
  0,
  -100,
  -6,
  1,
  0,
  0,
  1,
  -100,
  -6,
  1,
  0,
  0,
  3,
  -100,
  -6,
  0,
  0,
  0,
  5,
  -100,
  -6,
  0,
  0,
  0,
  7,
  -100,
  -6,
  0,
  0,
  0,
  11,
  -100,
  11,
  0,
  0,
  0,
  5,
  5,
  0,
  0,
  5,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  13,
  3,
  0,
  0,
  3,
  11,
  -100,
  -100,
  -101
];
var lt10 = [
  -100,
  -100,
  -100,
  -100,
  -6,
  9,
  1,
  13,
  -100,
  -3,
  13,
  5,
  0,
  0,
  0,
  11,
  -100,
  -1,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  9,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -7,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -7,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  7,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -8,
  9,
  0,
  0,
  0,
  1,
  9,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -7,
  13,
  1,
  0,
  0,
  7,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -7,
  5,
  0,
  3,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -6,
  5,
  0,
  5,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -5,
  5,
  1,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -3,
  11,
  3,
  1,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -1,
  11,
  3,
  0,
  0,
  1,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  9,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  3,
  -100,
  -4,
  0,
  0,
  0,
  0,
  0,
  9,
  -1,
  11,
  1,
  0,
  0,
  0,
  9,
  -100,
  -4,
  0,
  0,
  0,
  0,
  5,
  -4,
  3,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -4,
  13,
  1,
  0,
  0,
  0,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -5,
  11,
  0,
  0,
  0,
  1,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -6,
  3,
  0,
  0,
  0,
  3,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -6,
  11,
  0,
  0,
  0,
  0,
  7,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -7,
  3,
  0,
  0,
  0,
  0,
  7,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -7,
  13,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -2,
  13,
  3,
  0,
  0,
  0,
  0,
  7,
  -7,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  11,
  -100,
  -1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  -4,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -1,
  7,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -4,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  5,
  9,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt11 = [
  -100,
  -100,
  -100,
  -6,
  11,
  7,
  11,
  -100,
  -4,
  11,
  3,
  0,
  0,
  5,
  -100,
  -3,
  5,
  0,
  0,
  0,
  0,
  5,
  -100,
  -1,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  9,
  1,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  11,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  7,
  -100,
  -3,
  5,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -1,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  9,
  -100,
  -1,
  5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt12 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -5,
  11,
  5,
  0,
  -21,
  7,
  1,
  0,
  3,
  9,
  -100,
  -4,
  7,
  0,
  0,
  0,
  13,
  -4,
  11,
  5,
  1,
  1,
  0,
  1,
  7,
  -7,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -2,
  11,
  1,
  0,
  0,
  0,
  0,
  11,
  -2,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -4,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  13,
  3,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -1,
  13,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  5,
  11,
  -3,
  11,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  9,
  13,
  13,
  -3,
  7,
  0,
  0,
  0,
  0,
  5,
  -100,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  13,
  -6,
  3,
  0,
  0,
  0,
  0,
  0,
  9,
  -8,
  5,
  0,
  0,
  0,
  1,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  0,
  3,
  -8,
  9,
  0,
  0,
  0,
  0,
  7,
  -9,
  11,
  0,
  0,
  0,
  0,
  -100,
  -3,
  3,
  0,
  0,
  0,
  0,
  7,
  -8,
  13,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  -3,
  7,
  0,
  0,
  0,
  0,
  11,
  -9,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  1,
  -100,
  -3,
  11,
  0,
  0,
  0,
  0,
  11,
  -9,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  3,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -8,
  13,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  5,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -8,
  11,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  5,
  -100,
  -4,
  0,
  0,
  0,
  0,
  13,
  -8,
  9,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  5,
  -100,
  -4,
  0,
  0,
  0,
  0,
  13,
  -8,
  11,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  3,
  -100,
  -4,
  0,
  0,
  0,
  0,
  13,
  -8,
  11,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  -3,
  13,
  0,
  0,
  0,
  1,
  -9,
  13,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  -3,
  11,
  0,
  0,
  0,
  13,
  -10,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  -4,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  -10,
  11,
  0,
  0,
  0,
  0,
  -100,
  -3,
  13,
  0,
  0,
  0,
  3,
  -9,
  13,
  0,
  0,
  0,
  0,
  13,
  -9,
  9,
  0,
  0,
  0,
  0,
  -100,
  -3,
  7,
  0,
  0,
  0,
  0,
  13,
  -8,
  11,
  0,
  0,
  0,
  0,
  11,
  -9,
  7,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  3,
  0,
  0,
  0,
  0,
  9,
  -8,
  5,
  0,
  0,
  0,
  0,
  5,
  -9,
  5,
  0,
  0,
  0,
  0,
  7,
  -100,
  -1,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -6,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -7,
  11,
  1,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  11,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -4,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  9,
  -4,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  5,
  -5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt13 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -3,
  13,
  7,
  3,
  0,
  13,
  -5,
  13,
  7,
  1,
  0,
  0,
  3,
  7,
  -100,
  -2,
  5,
  0,
  0,
  0,
  0,
  -4,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  7,
  1,
  0,
  0,
  0,
  0,
  0,
  -3,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  9,
  1,
  0,
  5,
  11,
  13,
  -1,
  11,
  3,
  0,
  0,
  0,
  0,
  9,
  -100,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  7,
  -7,
  3,
  0,
  0,
  0,
  3,
  -100,
  -2,
  1,
  0,
  0,
  0,
  0,
  7,
  -9,
  13,
  0,
  0,
  0,
  1,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  -11,
  1,
  0,
  0,
  0,
  -100,
  -2,
  9,
  0,
  0,
  0,
  0,
  -11,
  1,
  0,
  0,
  0,
  13,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  3,
  0,
  0,
  0,
  13,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  5,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  3,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  1,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  1,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  3,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  -11,
  3,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  13,
  -10,
  5,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  13,
  -10,
  5,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  9,
  -10,
  5,
  0,
  0,
  0,
  9,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  5,
  -10,
  3,
  0,
  0,
  0,
  7,
  -100,
  -1,
  13,
  1,
  0,
  0,
  0,
  0,
  1,
  11,
  -7,
  11,
  5,
  0,
  0,
  0,
  0,
  0,
  3,
  9,
  -100,
  -1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -4,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -4,
  5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt14 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -7,
  13,
  7,
  3,
  1,
  0,
  0,
  1,
  5,
  9,
  -100,
  -6,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  7,
  -100,
  -4,
  11,
  1,
  0,
  0,
  1,
  9,
  13,
  -1,
  13,
  11,
  5,
  0,
  0,
  0,
  3,
  13,
  -100,
  -3,
  11,
  0,
  0,
  0,
  3,
  13,
  -6,
  13,
  1,
  0,
  0,
  0,
  13,
  -100,
  -2,
  11,
  0,
  0,
  0,
  1,
  13,
  -8,
  13,
  0,
  0,
  0,
  5,
  -100,
  -2,
  0,
  0,
  0,
  0,
  9,
  -10,
  5,
  0,
  0,
  0,
  11,
  -100,
  -1,
  7,
  0,
  0,
  0,
  1,
  -11,
  13,
  0,
  0,
  0,
  1,
  -100,
  -1,
  1,
  0,
  0,
  0,
  5,
  -12,
  1,
  0,
  0,
  0,
  9,
  -100,
  11,
  0,
  0,
  0,
  0,
  11,
  -12,
  5,
  0,
  0,
  0,
  3,
  -100,
  7,
  0,
  0,
  0,
  0,
  13,
  -12,
  9,
  0,
  0,
  0,
  0,
  -100,
  3,
  0,
  0,
  0,
  0,
  13,
  -12,
  11,
  0,
  0,
  0,
  0,
  -100,
  1,
  0,
  0,
  0,
  0,
  -13,
  11,
  0,
  0,
  0,
  1,
  -100,
  0,
  0,
  0,
  0,
  0,
  -13,
  11,
  0,
  0,
  0,
  1,
  -100,
  0,
  0,
  0,
  0,
  0,
  13,
  -12,
  11,
  0,
  0,
  0,
  0,
  -100,
  1,
  0,
  0,
  0,
  0,
  13,
  -12,
  9,
  0,
  0,
  0,
  1,
  -100,
  5,
  0,
  0,
  0,
  0,
  11,
  -12,
  5,
  0,
  0,
  0,
  3,
  -100,
  9,
  0,
  0,
  0,
  0,
  9,
  -12,
  3,
  0,
  0,
  0,
  7,
  -100,
  -1,
  1,
  0,
  0,
  0,
  5,
  -12,
  0,
  0,
  0,
  0,
  11,
  -100,
  -1,
  9,
  0,
  0,
  0,
  3,
  -11,
  13,
  0,
  0,
  0,
  3,
  -100,
  -2,
  3,
  0,
  0,
  0,
  13,
  -10,
  7,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  1,
  0,
  0,
  3,
  -9,
  13,
  0,
  0,
  0,
  7,
  -100,
  -3,
  13,
  1,
  0,
  0,
  3,
  13,
  -6,
  13,
  1,
  0,
  0,
  5,
  -100,
  -4,
  13,
  1,
  0,
  0,
  1,
  7,
  13,
  -3,
  9,
  0,
  0,
  0,
  7,
  -100,
  -6,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  11,
  -100,
  -7,
  13,
  7,
  3,
  0,
  0,
  0,
  0,
  3,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt15 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -6,
  11,
  7,
  -100,
  -4,
  11,
  3,
  0,
  0,
  7,
  11,
  5,
  3,
  0,
  0,
  0,
  1,
  5,
  9,
  -100,
  -2,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  7,
  11,
  13,
  -1,
  13,
  3,
  0,
  0,
  0,
  5,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -7,
  7,
  0,
  0,
  0,
  7,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -8,
  7,
  0,
  0,
  0,
  13,
  -100,
  -1,
  11,
  5,
  0,
  0,
  0,
  0,
  0,
  11,
  -9,
  1,
  0,
  0,
  3,
  -100,
  -3,
  7,
  0,
  0,
  0,
  0,
  11,
  -9,
  5,
  0,
  0,
  0,
  11,
  -100,
  -3,
  9,
  0,
  0,
  0,
  0,
  11,
  -9,
  9,
  0,
  0,
  0,
  5,
  -100,
  -3,
  11,
  0,
  0,
  0,
  0,
  11,
  -9,
  11,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  11,
  0,
  0,
  0,
  0,
  11,
  -9,
  13,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  13,
  -10,
  0,
  0,
  0,
  0,
  -100,
  -4,
  0,
  0,
  0,
  9,
  -11,
  0,
  0,
  0,
  3,
  -100,
  -4,
  0,
  0,
  0,
  3,
  -11,
  0,
  0,
  0,
  9,
  -100,
  -4,
  0,
  0,
  0,
  0,
  13,
  -10,
  0,
  0,
  0,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -9,
  5,
  0,
  0,
  0,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -8,
  7,
  0,
  0,
  0,
  7,
  -100,
  -4,
  0,
  0,
  0,
  0,
  5,
  -7,
  9,
  0,
  0,
  0,
  3,
  -100,
  -4,
  0,
  0,
  0,
  0,
  0,
  3,
  11,
  13,
  -3,
  9,
  0,
  0,
  0,
  1,
  -100,
  -4,
  0,
  0,
  0,
  0,
  5,
  7,
  0,
  0,
  0,
  1,
  1,
  0,
  0,
  0,
  1,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -2,
  9,
  5,
  1,
  0,
  0,
  3,
  7,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  7,
  -100,
  -4,
  0,
  0,
  0,
  0,
  3,
  -100,
  -3,
  7,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -1,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -1,
  3,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -101
];
var lt16 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -19,
  7,
  11,
  -100,
  -6,
  11,
  5,
  1,
  0,
  0,
  1,
  5,
  11,
  -4,
  5,
  0,
  3,
  -100,
  -4,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  13,
  5,
  0,
  0,
  1,
  -100,
  -3,
  13,
  1,
  0,
  0,
  1,
  5,
  11,
  -3,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -2,
  13,
  1,
  0,
  0,
  3,
  -8,
  3,
  0,
  0,
  0,
  0,
  5,
  -100,
  -1,
  13,
  1,
  0,
  0,
  0,
  13,
  -8,
  7,
  0,
  0,
  0,
  0,
  5,
  -100,
  -1,
  3,
  0,
  0,
  0,
  5,
  -9,
  11,
  0,
  0,
  0,
  0,
  7,
  -100,
  9,
  0,
  0,
  0,
  0,
  11,
  -9,
  13,
  0,
  0,
  0,
  0,
  9,
  -100,
  3,
  0,
  0,
  0,
  0,
  -10,
  13,
  0,
  0,
  0,
  0,
  9,
  -100,
  1,
  0,
  0,
  0,
  1,
  -11,
  0,
  0,
  0,
  0,
  9,
  -100,
  0,
  0,
  0,
  0,
  3,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  5,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  9,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  11,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  0,
  0,
  0,
  0,
  11,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  1,
  0,
  0,
  0,
  11,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  3,
  0,
  0,
  0,
  9,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  7,
  0,
  0,
  0,
  5,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  11,
  0,
  0,
  0,
  0,
  -11,
  0,
  0,
  0,
  0,
  11,
  -100,
  -1,
  1,
  0,
  0,
  0,
  7,
  -9,
  11,
  0,
  0,
  0,
  0,
  11,
  -100,
  -1,
  9,
  0,
  0,
  0,
  0,
  13,
  -8,
  9,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  3,
  0,
  0,
  0,
  1,
  13,
  -7,
  5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  13,
  3,
  0,
  0,
  0,
  1,
  9,
  13,
  -3,
  13,
  7,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -6,
  11,
  7,
  3,
  1,
  0,
  0,
  5,
  9,
  -1,
  13,
  0,
  0,
  0,
  0,
  11,
  -100,
  -16,
  0,
  0,
  0,
  0,
  13,
  -100,
  -16,
  0,
  0,
  0,
  0,
  13,
  -100,
  -16,
  0,
  0,
  0,
  0,
  13,
  -100,
  -16,
  0,
  0,
  0,
  0,
  13,
  -100,
  -15,
  13,
  0,
  0,
  0,
  0,
  13,
  -100,
  -15,
  9,
  0,
  0,
  0,
  0,
  11,
  -100,
  -15,
  1,
  0,
  0,
  0,
  0,
  5,
  -100,
  -12,
  7,
  5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  9,
  -100,
  -11,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -101
];
var lt17 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -3,
  13,
  5,
  0,
  3,
  -5,
  9,
  3,
  1,
  0,
  0,
  3,
  -100,
  -1,
  11,
  3,
  0,
  0,
  0,
  0,
  -3,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  -2,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -1,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  13,
  -2,
  11,
  7,
  3,
  1,
  3,
  11,
  -100,
  -2,
  3,
  0,
  0,
  0,
  0,
  3,
  -100,
  -2,
  7,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  11,
  0,
  0,
  0,
  0,
  13,
  -100,
  -2,
  13,
  0,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  0,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  13,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  0,
  0,
  0,
  0,
  9,
  -100,
  -1,
  13,
  3,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt18 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -3,
  13,
  7,
  1,
  0,
  1,
  3,
  9,
  11,
  9,
  9,
  13,
  -100,
  -2,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -2,
  1,
  0,
  5,
  13,
  -1,
  13,
  11,
  3,
  0,
  0,
  0,
  1,
  -100,
  -1,
  9,
  0,
  1,
  -6,
  9,
  0,
  0,
  0,
  13,
  -100,
  -1,
  3,
  0,
  9,
  -7,
  11,
  1,
  0,
  9,
  -100,
  -1,
  0,
  0,
  -9,
  13,
  1,
  5,
  -100,
  -1,
  0,
  0,
  11,
  -9,
  13,
  11,
  -100,
  13,
  0,
  0,
  1,
  13,
  -100,
  13,
  0,
  0,
  0,
  1,
  9,
  -100,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  9,
  -100,
  -1,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  7,
  13,
  -100,
  -1,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -4,
  11,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -7,
  9,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -9,
  13,
  7,
  0,
  0,
  0,
  0,
  7,
  -100,
  -11,
  13,
  3,
  0,
  0,
  3,
  -100,
  -13,
  0,
  0,
  0,
  -100,
  7,
  5,
  -11,
  1,
  0,
  0,
  -100,
  1,
  0,
  5,
  -10,
  1,
  0,
  3,
  -100,
  0,
  0,
  0,
  3,
  -9,
  0,
  0,
  9,
  -100,
  1,
  0,
  0,
  0,
  3,
  13,
  -6,
  5,
  0,
  3,
  -100,
  7,
  0,
  0,
  0,
  0,
  1,
  7,
  11,
  13,
  13,
  9,
  3,
  0,
  1,
  13,
  -100,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  13,
  -100,
  -1,
  5,
  3,
  9,
  7,
  3,
  1,
  0,
  0,
  1,
  5,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt19 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -6,
  5,
  0,
  5,
  -100,
  -5,
  13,
  0,
  0,
  0,
  7,
  -100,
  -5,
  7,
  0,
  0,
  0,
  9,
  -100,
  -5,
  3,
  0,
  0,
  0,
  13,
  -100,
  -4,
  11,
  0,
  0,
  0,
  0,
  -100,
  -4,
  3,
  0,
  0,
  0,
  0,
  -100,
  -3,
  5,
  0,
  0,
  0,
  0,
  1,
  -100,
  -2,
  3,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -3,
  9,
  0,
  0,
  0,
  0,
  7,
  13,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  1,
  0,
  0,
  0,
  11,
  -100,
  -4,
  1,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  1,
  0,
  0,
  0,
  11,
  -100,
  -4,
  3,
  0,
  0,
  0,
  11,
  -100,
  -4,
  5,
  0,
  0,
  0,
  11,
  -100,
  -4,
  3,
  0,
  0,
  0,
  11,
  -100,
  -4,
  3,
  0,
  0,
  0,
  11,
  -100,
  -4,
  1,
  0,
  0,
  0,
  9,
  -100,
  -4,
  0,
  0,
  0,
  0,
  5,
  -100,
  -4,
  0,
  0,
  0,
  0,
  1,
  -100,
  -4,
  1,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  3,
  0,
  0,
  0,
  0,
  1,
  13,
  -1,
  9,
  5,
  1,
  3,
  -100,
  -4,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -5,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -6,
  9,
  3,
  1,
  0,
  0,
  1,
  5,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt20 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -4,
  13,
  9,
  1,
  0,
  13,
  -11,
  11,
  5,
  1,
  5,
  -100,
  -2,
  11,
  3,
  0,
  0,
  0,
  0,
  11,
  -8,
  11,
  5,
  0,
  0,
  0,
  0,
  1,
  -100,
  13,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -6,
  7,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -5,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -5,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -2,
  11,
  1,
  0,
  0,
  0,
  0,
  11,
  -6,
  13,
  7,
  3,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  9,
  0,
  0,
  0,
  0,
  11,
  -9,
  9,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  11,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -3,
  13,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  0,
  0,
  0,
  0,
  11,
  -10,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  1,
  0,
  0,
  0,
  11,
  -9,
  13,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  1,
  0,
  0,
  0,
  11,
  -9,
  5,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  5,
  0,
  0,
  0,
  7,
  -8,
  7,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  7,
  0,
  0,
  0,
  0,
  13,
  -5,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -4,
  13,
  0,
  0,
  0,
  0,
  1,
  11,
  -1,
  13,
  11,
  5,
  0,
  0,
  7,
  5,
  0,
  0,
  0,
  0,
  3,
  13,
  -100,
  -5,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  13,
  -2,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -5,
  11,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  9,
  -4,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -100,
  -6,
  13,
  5,
  1,
  0,
  1,
  3,
  9,
  -6,
  3,
  1,
  3,
  7,
  9,
  11,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt21 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -6,
  13,
  9,
  1,
  3,
  13,
  -5,
  13,
  1,
  0,
  0,
  0,
  0,
  1,
  3,
  9,
  -100,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -5,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -5,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -1,
  9,
  3,
  0,
  0,
  0,
  0,
  0,
  5,
  13,
  -7,
  13,
  9,
  0,
  0,
  0,
  0,
  1,
  11,
  -100,
  -3,
  7,
  0,
  0,
  0,
  0,
  -11,
  7,
  0,
  0,
  5,
  -100,
  -4,
  0,
  0,
  0,
  0,
  9,
  -10,
  9,
  0,
  5,
  -100,
  -4,
  5,
  0,
  0,
  0,
  1,
  -10,
  5,
  0,
  11,
  -100,
  -4,
  11,
  0,
  0,
  0,
  0,
  9,
  -9,
  0,
  1,
  -100,
  -5,
  1,
  0,
  0,
  0,
  3,
  -8,
  9,
  0,
  7,
  -100,
  -5,
  7,
  0,
  0,
  0,
  0,
  13,
  -7,
  3,
  0,
  13,
  -100,
  -5,
  13,
  0,
  0,
  0,
  0,
  7,
  -6,
  13,
  0,
  3,
  -100,
  -6,
  3,
  0,
  0,
  0,
  1,
  -6,
  7,
  0,
  11,
  -100,
  -6,
  9,
  0,
  0,
  0,
  0,
  9,
  -5,
  0,
  1,
  -100,
  -6,
  13,
  0,
  0,
  0,
  0,
  3,
  -4,
  7,
  0,
  7,
  -100,
  -7,
  5,
  0,
  0,
  0,
  0,
  11,
  -3,
  1,
  0,
  13,
  -100,
  -7,
  11,
  0,
  0,
  0,
  0,
  1,
  -2,
  9,
  0,
  5,
  -100,
  -8,
  1,
  0,
  0,
  0,
  0,
  5,
  -1,
  1,
  0,
  11,
  -100,
  -8,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -8,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -9,
  3,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -9,
  9,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -10,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -10,
  5,
  0,
  0,
  0,
  1,
  -100,
  -10,
  13,
  1,
  0,
  0,
  7,
  -100,
  -11,
  11,
  1,
  5,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt22 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -29,
  13,
  -100,
  5,
  0,
  0,
  1,
  1,
  1,
  3,
  3,
  5,
  7,
  -3,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -4,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  11,
  -100,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  7,
  -3,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -4,
  9,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -1,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  13,
  -5,
  13,
  5,
  0,
  0,
  0,
  0,
  0,
  3,
  -8,
  9,
  0,
  0,
  0,
  0,
  5,
  -100,
  -3,
  5,
  0,
  0,
  0,
  0,
  -8,
  11,
  0,
  0,
  0,
  0,
  9,
  -9,
  9,
  0,
  0,
  9,
  -100,
  -4,
  1,
  0,
  0,
  0,
  13,
  -8,
  11,
  0,
  0,
  0,
  3,
  -10,
  0,
  3,
  -100,
  -4,
  7,
  0,
  0,
  0,
  11,
  -8,
  13,
  0,
  0,
  0,
  0,
  13,
  -8,
  9,
  0,
  11,
  -100,
  -4,
  13,
  0,
  0,
  0,
  7,
  -8,
  11,
  0,
  0,
  0,
  0,
  7,
  -8,
  1,
  1,
  -100,
  -5,
  5,
  0,
  0,
  1,
  -8,
  7,
  0,
  0,
  0,
  0,
  3,
  -8,
  5,
  11,
  -100,
  -5,
  11,
  0,
  0,
  0,
  9,
  -7,
  1,
  0,
  0,
  0,
  0,
  0,
  13,
  -100,
  -6,
  0,
  0,
  0,
  3,
  -6,
  9,
  0,
  3,
  13,
  0,
  0,
  0,
  7,
  -6,
  5,
  -100,
  -6,
  3,
  0,
  0,
  0,
  13,
  -5,
  1,
  0,
  11,
  -1,
  3,
  0,
  0,
  3,
  -6,
  1,
  -100,
  -6,
  9,
  0,
  0,
  0,
  9,
  -4,
  11,
  0,
  3,
  -2,
  7,
  0,
  0,
  0,
  13,
  -4,
  11,
  1,
  -100,
  -6,
  13,
  0,
  0,
  0,
  3,
  -4,
  5,
  0,
  9,
  -2,
  13,
  0,
  0,
  0,
  7,
  -4,
  5,
  3,
  -100,
  -7,
  3,
  0,
  0,
  0,
  13,
  -3,
  1,
  1,
  -4,
  0,
  0,
  0,
  1,
  -4,
  1,
  7,
  -100,
  -7,
  9,
  0,
  0,
  0,
  5,
  -2,
  13,
  0,
  7,
  -4,
  5,
  0,
  0,
  0,
  9,
  -2,
  9,
  0,
  13,
  -100,
  -8,
  1,
  0,
  0,
  0,
  13,
  -1,
  7,
  1,
  -5,
  11,
  0,
  0,
  0,
  1,
  -2,
  1,
  3,
  -100,
  -8,
  7,
  0,
  0,
  0,
  1,
  13,
  1,
  5,
  -6,
  1,
  0,
  0,
  0,
  13,
  9,
  0,
  9,
  -100,
  -8,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -6,
  7,
  0,
  0,
  0,
  1,
  0,
  1,
  -100,
  -9,
  3,
  0,
  0,
  0,
  0,
  3,
  -7,
  13,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -9,
  9,
  0,
  0,
  0,
  0,
  5,
  -8,
  3,
  0,
  0,
  0,
  0,
  13,
  -100,
  -9,
  13,
  0,
  0,
  0,
  0,
  11,
  -8,
  9,
  0,
  0,
  0,
  1,
  -100,
  -10,
  3,
  0,
  0,
  0,
  -10,
  3,
  0,
  0,
  5,
  -100,
  -10,
  11,
  0,
  0,
  7,
  -10,
  13,
  1,
  1,
  13,
  -100,
  -11,
  11,
  11,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt23 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -16,
  13,
  13,
  -1,
  13,
  9,
  5,
  1,
  0,
  1,
  5,
  13,
  -100,
  -1,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  7,
  -4,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  -1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -4,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  -2,
  13,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  13,
  -6,
  13,
  5,
  0,
  0,
  0,
  0,
  5,
  9,
  13,
  -100,
  -4,
  13,
  3,
  0,
  0,
  0,
  0,
  3,
  -7,
  13,
  0,
  0,
  5,
  13,
  -100,
  -6,
  3,
  0,
  0,
  0,
  0,
  5,
  -6,
  7,
  0,
  7,
  -100,
  -7,
  3,
  0,
  0,
  0,
  0,
  11,
  -4,
  11,
  0,
  9,
  -100,
  -8,
  5,
  0,
  0,
  0,
  1,
  -3,
  11,
  0,
  7,
  -100,
  -9,
  3,
  0,
  0,
  0,
  1,
  11,
  11,
  0,
  7,
  -100,
  -9,
  13,
  1,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -10,
  13,
  1,
  0,
  0,
  0,
  0,
  9,
  -100,
  -11,
  11,
  0,
  0,
  0,
  0,
  1,
  -100,
  -12,
  0,
  0,
  0,
  0,
  0,
  7,
  -100,
  -11,
  9,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -100,
  -10,
  9,
  0,
  5,
  13,
  3,
  0,
  0,
  0,
  1,
  13,
  -100,
  -9,
  11,
  0,
  3,
  -2,
  13,
  1,
  0,
  0,
  0,
  1,
  13,
  -100,
  -8,
  11,
  0,
  3,
  13,
  -3,
  13,
  1,
  0,
  0,
  0,
  1,
  13,
  -100,
  -7,
  9,
  0,
  1,
  13,
  -5,
  11,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -6,
  9,
  0,
  0,
  7,
  -7,
  9,
  0,
  0,
  0,
  0,
  1,
  11,
  -100,
  -5,
  5,
  0,
  0,
  0,
  13,
  -8,
  7,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -3,
  13,
  3,
  0,
  0,
  0,
  0,
  13,
  -8,
  13,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -100,
  9,
  3,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  11,
  -6,
  11,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  3,
  13,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -6,
  11,
  5,
  3,
  1,
  0,
  0,
  0,
  1,
  1,
  3,
  5,
  -100,
  13,
  13,
  13,
  13,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -101
];
var lt24 = [
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -100,
  -1,
  13,
  13,
  -2,
  13,
  13,
  11,
  11,
  11,
  13,
  -6,
  11,
  11,
  11,
  11,
  11,
  11,
  11,
  11,
  13,
  -100,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -4,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  -100,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  -4,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -2,
  11,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  11,
  -6,
  11,
  0,
  0,
  0,
  0,
  1,
  7,
  13,
  -100,
  -4,
  11,
  0,
  0,
  0,
  0,
  0,
  -8,
  9,
  0,
  0,
  1,
  13,
  -100,
  -5,
  7,
  0,
  0,
  0,
  0,
  13,
  -7,
  9,
  0,
  0,
  13,
  -100,
  -6,
  1,
  0,
  0,
  0,
  9,
  -7,
  5,
  0,
  5,
  -100,
  -6,
  7,
  0,
  0,
  0,
  3,
  -7,
  1,
  0,
  13,
  -100,
  -6,
  13,
  0,
  0,
  0,
  0,
  13,
  -5,
  11,
  0,
  1,
  -100,
  -7,
  5,
  0,
  0,
  0,
  7,
  -5,
  7,
  0,
  7,
  -100,
  -7,
  11,
  0,
  0,
  0,
  3,
  -5,
  1,
  0,
  11,
  -100,
  -8,
  1,
  0,
  0,
  0,
  13,
  -3,
  13,
  0,
  3,
  -100,
  -8,
  7,
  0,
  0,
  0,
  7,
  -3,
  7,
  0,
  9,
  -100,
  -8,
  13,
  0,
  0,
  0,
  3,
  -3,
  1,
  1,
  -100,
  -9,
  5,
  0,
  0,
  0,
  13,
  -1,
  9,
  0,
  7,
  -100,
  -9,
  11,
  0,
  0,
  0,
  3,
  13,
  1,
  0,
  13,
  -100,
  -10,
  1,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -10,
  9,
  0,
  0,
  0,
  0,
  0,
  9,
  -100,
  -11,
  1,
  0,
  0,
  0,
  1,
  -100,
  -11,
  5,
  0,
  0,
  0,
  7,
  -100,
  -11,
  9,
  0,
  0,
  0,
  13,
  -100,
  -11,
  13,
  0,
  0,
  3,
  -100,
  -12,
  0,
  0,
  9,
  -100,
  -12,
  0,
  1,
  -100,
  -11,
  13,
  0,
  7,
  -100,
  -11,
  7,
  0,
  11,
  -100,
  -11,
  1,
  0,
  -100,
  -2,
  7,
  0,
  1,
  7,
  -4,
  11,
  0,
  3,
  -100,
  -1,
  11,
  0,
  0,
  0,
  0,
  1,
  9,
  13,
  11,
  1,
  0,
  9,
  -100,
  -1,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  -100,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -1,
  7,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  13,
  -100,
  -2,
  9,
  3,
  0,
  0,
  1,
  3,
  7,
  -100,
  -101
];
var allLetters = [
  lt0,
  lt1,
  lt2,
  lt3,
  lt4,
  lt5,
  lt6,
  lt7,
  lt8,
  lt9,
  lt10,
  lt11,
  lt12,
  lt13,
  lt14,
  lt15,
  lt16,
  lt17,
  lt18,
  lt19,
  lt20,
  lt21,
  lt22,
  lt23,
  lt24
];

// src/lib/Sw.ts
var SW = [
  0,
  4,
  8,
  12,
  16,
  20,
  23,
  27,
  31,
  35,
  39,
  43,
  47,
  50,
  54,
  58,
  61,
  65,
  68,
  71,
  75,
  78,
  81,
  84,
  87,
  90,
  93,
  96,
  98,
  101,
  103,
  105,
  108,
  110,
  112,
  114,
  115,
  117,
  119,
  120,
  121,
  122,
  123,
  124,
  125,
  126,
  126,
  127,
  127,
  127,
  127,
  127,
  127,
  127,
  126,
  126,
  125,
  124,
  123,
  122,
  121,
  120,
  119,
  117,
  115,
  114,
  112,
  110,
  108,
  105,
  103,
  101,
  98,
  96,
  93,
  90,
  87,
  84,
  81,
  78,
  75,
  71,
  68,
  65,
  61,
  58,
  54,
  50,
  47,
  43,
  39,
  35,
  31,
  27,
  23,
  20,
  16,
  12,
  8,
  4,
  0,
  -4,
  -8,
  -12,
  -16,
  -20,
  -23,
  -27,
  -31,
  -35,
  -39,
  -43,
  -47,
  -50,
  -54,
  -58,
  -61,
  -65,
  -68,
  -71,
  -75,
  -78,
  -81,
  -84,
  -87,
  -90,
  -93,
  -96,
  -98,
  -101,
  -103,
  -105,
  -108,
  -110,
  -112,
  -114,
  -115,
  -117,
  -119,
  -120,
  -121,
  -122,
  -123,
  -124,
  -125,
  -126,
  -126,
  -127,
  -127,
  -127,
  -127,
  -127,
  -127,
  -127,
  -126,
  -126,
  -125,
  -124,
  -123,
  -122,
  -121,
  -120,
  -119,
  -117,
  -115,
  -114,
  -112,
  -110,
  -108,
  -105,
  -103,
  -101,
  -98,
  -96,
  -93,
  -90,
  -87,
  -84,
  -81,
  -78,
  -75,
  -71,
  -68,
  -65,
  -61,
  -58,
  -54,
  -50,
  -47,
  -43,
  -39,
  -35,
  -31,
  -27,
  -23,
  -20,
  -16,
  -12,
  -8,
  -4
];

// src/lib/Captcha.ts
var Captcha = class {
  numberOfDots;
  gifSize = 17646;
  letters = "abcdefghijklmnopqrstuvwxyz";
  blurImg;
  filterImg;
  constructor({ numberOfDots = 100, blur = false, filter = false } = {}) {
    this.numberOfDots = numberOfDots;
    this.blurImg = blur;
    this.filterImg = filter;
  }
  /**
   *
   * @param size The number of letters
   * @param color The color of the text
   * @returns The gif buffer and the token
   */
  generate(size = 5, color) {
    const buffer = Buffer.alloc(this.gifSize);
    const { background, token } = this.makeCaptcha(size);
    this.makeGif(background, buffer, color);
    return {
      buffer,
      token
    };
  }
  /**
   *
   * @param min min size
   * @param max max size
   * @returns A number between min and max
   */
  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  /**
   *
   * @param n The index of the letter
   * @param pos The position of the letter
   * @param background The background buffer
   * @param swr The sw buffer
   * @param s1 The s1 value
   * @param s2 The s2 value
   * @returns The new position of the letter
   */
  letter(n, pos, background, swr, s1, s2) {
    const l = background.length;
    const t = allLetters[n];
    let r = 200 * 16 + pos;
    let i = r;
    let sk1 = s1 + pos;
    let sk2 = s2 + pos;
    let mpos = pos;
    let row = 0;
    for (let j = 0, k = t.length; j < k; j++) {
      const p = t[j];
      if (p === -101)
        continue;
      if (p < 0) {
        if (p === -100) {
          r += 200;
          i = r;
          sk1 = s1 + pos;
          row++;
          continue;
        }
        i += -p;
        continue;
      }
      if (sk1 >= 200)
        sk1 %= 200;
      const skew = Math.floor(SW[sk1] / 16);
      sk1 += (swr[pos + i - r] & 1) + 1;
      if (sk2 >= 200)
        sk2 %= 200;
      const skewh = Math.floor(SW[sk2] / 70);
      sk2 += swr[row] & 1;
      const x = i + skew * 200 + skewh;
      mpos = Math.max(mpos, pos + i - r);
      if (x - l < 70 * 200)
        background[x] = p << 4;
      i++;
    }
    return mpos;
  }
  /**
   *
   * @param background The background buffer
   * @param swr The sw buffer
   * @param s1 The s1 value
   */
  line(background, swr, s1) {
    for (let x = 0, sk1 = s1; x < 199; x++) {
      if (sk1 >= 200)
        sk1 %= 200;
      const skew = Math.floor(SW[sk1] / 16);
      sk1 += (swr[x] & 3) + 1;
      const i = 200 * (45 + skew) + x;
      background[i + 0] = 0;
      background[i + 1] = 0;
      background[i + 200] = 0;
      background[i + 201] = 0;
    }
  }
  /**
   *
   * @param background The background buffer
   * @param dr The dr buffer
   */
  dots(background, dr) {
    for (let n = 0; n < this.numberOfDots; n++) {
      const v = dr.readUInt32BE(n);
      const i = v % (200 * 67);
      background[i + 0] = 255;
      background[i + 1] = 255;
      background[i + 2] = 255;
      background[i + 200] = 255;
      background[i + 201] = 255;
      background[i + 202] = 255;
    }
  }
  /**
   *
   * @param background The background buffer
   */
  blur(background) {
    for (let i = 0, y = 0; y < 68; y++) {
      for (let x = 0; x < 198; x++) {
        const c11 = background[i + 0];
        const c12 = background[i + 1];
        const c21 = background[i + 200];
        const c22 = background[i + 201];
        background[i++] = Math.floor((c11 + c12 + c21 + c22) / 4);
      }
    }
  }
  /**
   *
   * @param background The background buffer
   */
  filter(background) {
    const om = Buffer.alloc(70 * 200).fill(255);
    let i = 0;
    let o = 0;
    for (let y = 0; y < 70; y++) {
      for (let x = 4; x < 200 - 4; x++) {
        if (background[i] > 240 && background[i + 1] < 240) {
          om[o] = 0;
          om[o + 1] = 0;
        } else if (background[i] < 240 && background[i + 1] > 240) {
          om[o] = 0;
          om[o + 1] = 0;
        }
        i++;
        o++;
      }
    }
    om.copy(background);
  }
  /**
   *
   * @param size The number of letters
   * @returns The background buffer and the token
   */
  makeCaptcha(size) {
    const rb = (0,node_crypto__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(size + 200 + 100 * 4 + 1 + 1);
    const tb = Buffer.alloc(size);
    const swr = Buffer.alloc(200);
    const dr = Buffer.alloc(100 * 4);
    rb.copy(tb, 0, 0, size);
    rb.copy(swr, 0, size, size + 200);
    rb.copy(dr, 0, size + 200, size + 200 + 100 * 4);
    let s1 = rb.readUInt8(size + 200 + 100 * 4);
    let s2 = rb.readUInt8(size + 200 + 100 * 4 + 1);
    const background = Buffer.alloc(200 * 70).fill(255);
    s1 &= 127;
    s2 &= 63;
    let p = 30;
    for (let n = 0; n < size; n++) {
      tb[n] %= 25;
      p = this.letter(tb[n], p, background, swr, s1, s2);
      tb[n] = this.letters.charCodeAt(tb[n]);
    }
    this.line(background, swr, s1);
    this.dots(background, dr);
    if (this.blurImg)
      this.blur(background);
    if (this.filterImg)
      this.filter(background);
    return { background, token: tb.toString() };
  }
  /**
   *
   * @param background The background buffer
   * @param gif The gif buffer
   * @param color The color of the text
   *
   */
  makeGif(background, gif, color) {
    const r = color ?? this.random(0, colors.length);
    gif.fill(colors[r].replace(/\n/g, ""), 0, 13 + 48 + 10 + 1, "ascii");
    let i = 0;
    let p = 13 + 48 + 10 + 1;
    for (let y = 0; y < 70; y++) {
      gif[p++] = 250;
      for (let x = 0; x < 50; x++) {
        const a = background[i + 0] >> 4;
        const b = background[i + 1] >> 4;
        const c = background[i + 2] >> 4;
        const d = background[i + 3] >> 4;
        gif[p + 0] = 16 | a << 5;
        gif[p + 1] = a >> 3 | 64 | b << 7;
        gif[p + 2] = b >> 1;
        gif[p + 3] = 1 | c << 1;
        gif[p + 4] = 4 | d << 3;
        i += 4;
        p += 5;
      }
    }
    gif.fill("\0;", this.gifSize - 4);
  }
};
__name(Captcha, "Captcha");


//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("03d15b1085e701444f00")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "@terms-and-conditions-maribor-remaster/client-user:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdate_terms_and_conditions_maribor_remaster_client_user"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map