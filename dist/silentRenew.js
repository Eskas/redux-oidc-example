/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 337);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(5);

var ReactCurrentOwner = __webpack_require__(12);

var warning = __webpack_require__(2);
var canDefineProperty = __webpack_require__(18);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(38);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

module.exports = ReactCurrentOwner;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(14);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(5);

var ReactBaseClasses = __webpack_require__(35);
var ReactChildren = __webpack_require__(64);
var ReactDOMFactories = __webpack_require__(68);
var ReactElement = __webpack_require__(11);
var ReactPropTypes = __webpack_require__(72);
var ReactVersion = __webpack_require__(76);

var createReactClass = __webpack_require__(77);
var onlyChild = __webpack_require__(79);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var lowPriorityWarning = __webpack_require__(24);
  var canDefineProperty = __webpack_require__(18);
  var ReactElementValidator = __webpack_require__(40);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;
var createMixin = function (mixin) {
  return mixin;
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForSpread = false;
  var warnedForCreateMixin = false;
  __spread = function () {
    lowPriorityWarning(warnedForSpread, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.');
    warnedForSpread = true;
    return _assign.apply(null, arguments);
  };

  createMixin = function (mixin) {
    lowPriorityWarning(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. ' + 'In React v16.0, it will be removed. ' + 'You can use this mixin directly instead. ' + 'See https://fb.me/createmixin-was-never-implemented for more info.');
    warnedForCreateMixin = true;
    return mixin;
  };
}

var React = {
  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: createReactClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForCreateClass = false;
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        lowPriorityWarning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated,' + ' and will be removed in  React v16.0.' + ' Use the latest available v15.* prop-types package from npm instead.' + ' For info on usage, compatibility, migration and more, see ' + 'https://fb.me/prop-types-docs');
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        lowPriorityWarning(warnedForCreateClass, 'Accessing createClass via the main React package is deprecated,' + ' and will be removed in React v16.0.' + " Use a plain JavaScript class instead. If you're not yet " + 'ready to migrate, create-react-class v15.* is available ' + 'on npm as a temporary, drop-in replacement. ' + 'For more info see https://fb.me/react-create-class');
        warnedForCreateClass = true;
        return createReactClass;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories).forEach(function (factory) {
    React.DOM[factory] = function () {
      if (!warnedForFactories) {
        lowPriorityWarning(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in v16.0+. Use the ' + 'react-dom-factories package instead. ' + ' Version 1.0 provides a drop-in replacement.' + ' For more info, see https://fb.me/react-dom-factories', factory);
        warnedForFactories = true;
      }
      return ReactDOMFactories[factory].apply(ReactDOMFactories, arguments);
    };
  });
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){if(true)module.exports=r(__webpack_require__(27),__webpack_require__(3),function(){try{return __webpack_require__(47)}catch(e){}}(),__webpack_require__(48));else if("function"==typeof define&&define.amd)define(["prop-types","react","immutable","oidc-client"],r);else{var t="object"==typeof exports?r(require("prop-types"),require("react"),function(){try{return require("immutable")}catch(e){}}(),require("oidc-client")):r(e["prop-types"],e.react,e.immutable,e["oidc-client"]);for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,function(e,r,t,n){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=16)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.USER_EXPIRED="redux-oidc/USER_EXPIRED",r.SILENT_RENEW_ERROR="redux-oidc/SILENT_RENEW_ERROR",r.SESSION_TERMINATED="redux-oidc/SESSION_TERMINATED",r.USER_EXPIRING="redux-oidc/USER_EXPIRING",r.USER_FOUND="redux-oidc/USER_FOUND",r.LOADING_USER="redux-oidc/LOADING_USER",r.USER_SIGNED_OUT="redux-oidc/USER_SIGNED_OUT",r.LOAD_USER_ERROR="redux-oidc/LOAD_USER_ERROR"},function(e,r,t){"use strict";function n(){return{type:d.USER_EXPIRED}}function o(e){return{type:d.USER_FOUND,payload:e}}function u(e){return{type:d.SILENT_RENEW_ERROR,payload:e}}function i(){return{type:d.SESSION_TERMINATED}}function s(){return{type:d.USER_EXPIRING}}function a(){return{type:d.LOADING_USER}}function c(){return{type:d.USER_SIGNED_OUT}}function l(){return{type:d.LOAD_USER_ERROR}}Object.defineProperty(r,"__esModule",{value:!0}),r.userExpired=n,r.userFound=o,r.silentRenewError=u,r.sessionTerminated=i,r.userExpiring=s,r.loadingUser=a,r.userSignedOut=c,r.loadUserError=l;var d=t(0)},function(e,r){e.exports=__webpack_require__(27)},function(e,r){e.exports=__webpack_require__(3)},function(e,r,t){"use strict";function n(e){return new o.UserManager(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(15)},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.loadUserError=r.userSignedOut=r.loadingUser=r.userExpiring=r.sessionTerminated=r.silentRenewError=r.userFound=r.userExpired=r.LOAD_USER_ERROR=r.USER_SIGNED_OUT=r.LOADING_USER=r.USER_EXPIRING=r.SESSION_TERMINATED=r.SILENT_RENEW_ERROR=r.USER_FOUND=r.USER_EXPIRED=r.SignoutCallbackComponent=r.OidcProvider=r.reducer=r.immutableReducer=r.CallbackComponent=r.loadUser=r.processSilentRenew=r.createUserManager=void 0;var n=t(11),o=function(e){return e&&e.__esModule?e:{default:e}}(n);r.createUserManager=t(4).default,r.processSilentRenew=t(10).default,r.loadUser=t(9).default,r.CallbackComponent=t(6).default,r.immutableReducer=t(12).default,r.reducer=t(13).default,r.OidcProvider=t(7).default,r.SignoutCallbackComponent=t(8).default,r.USER_EXPIRED=t(0).USER_EXPIRED,r.USER_FOUND=t(0).USER_FOUND,r.SILENT_RENEW_ERROR=t(0).SILENT_RENEW_ERROR,r.SESSION_TERMINATED=t(0).SESSION_TERMINATED,r.USER_EXPIRING=t(0).USER_EXPIRING,r.LOADING_USER=t(0).LOADING_USER,r.USER_SIGNED_OUT=t(0).USER_SIGNED_OUT,r.LOAD_USER_ERROR=t(0).LOAD_USER_ERROR,r.userExpired=t(1).userExpired,r.userFound=t(1).userFound,r.silentRenewError=t(1).silentRenewError,r.sessionTerminated=t(1).sessionTerminated,r.userExpiring=t(1).userExpiring,r.loadingUser=t(1).loadingUser,r.userSignedOut=t(1).userSignedOut,r.loadUserError=t(1).loadUserError,r.default=o.default},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function u(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function i(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),a=t(2),c=n(a),l=t(3),d=n(l),f=function(e){function r(){var e,t,n,i;o(this,r);for(var s=arguments.length,a=Array(s),c=0;c<s;c++)a[c]=arguments[c];return t=n=u(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(a))),n.onRedirectSuccess=function(e){n.props.successCallback(e)},n.onRedirectError=function(e){if(!n.props.errorCallback)throw new Error("Error handling redirect callback: "+e.message);n.props.errorCallback(e)},i=t,u(n,i)}return i(r,e),s(r,[{key:"componentDidMount",value:function(){var e=this;this.props.userManager.signinRedirectCallback().then(function(r){return e.onRedirectSuccess(r)}).catch(function(r){return e.onRedirectError(r)})}},{key:"render",value:function(){return d.default.Children.only(this.props.children)}}]),r}(d.default.Component);f.propTypes={children:c.default.element.isRequired,userManager:c.default.object.isRequired,successCallback:c.default.func.isRequired,errorCallback:c.default.func},r.default=f},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function u(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function i(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),a=t(2),c=n(a),l=t(3),d=n(l),f=t(1),p=function(e){function r(e){o(this,r);var t=u(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e));return t.onUserLoaded=function(e){t.props.store.dispatch((0,f.userFound)(e))},t.onSilentRenewError=function(e){t.props.store.dispatch((0,f.silentRenewError)(e))},t.onAccessTokenExpired=function(){t.props.store.dispatch((0,f.userExpired)())},t.onUserUnloaded=function(){t.props.store.dispatch((0,f.sessionTerminated)())},t.onAccessTokenExpiring=function(){t.props.store.dispatch((0,f.userExpiring)())},t.onUserSignedOut=function(){t.props.store.dispatch((0,f.userSignedOut)())},t.userManager=e.userManager,t.userManager.events.addUserLoaded(t.onUserLoaded),t.userManager.events.addSilentRenewError(t.onSilentRenewError),t.userManager.events.addAccessTokenExpired(t.onAccessTokenExpired),t.userManager.events.addAccessTokenExpiring(t.onAccessTokenExpiring),t.userManager.events.addUserUnloaded(t.onUserUnloaded),t.userManager.events.addUserSignedOut(t.onUserSignedOut),t}return i(r,e),s(r,[{key:"componentWillUnmount",value:function(){this.userManager.events.removeUserLoaded(this.onUserLoaded),this.userManager.events.removeSilentRenewError(this.onSilentRenewError),this.userManager.events.removeAccessTokenExpired(this.onAccessTokenExpired),this.userManager.events.removeAccessTokenExpiring(this.onAccessTokenExpiring),this.userManager.events.removeUserUnloaded(this.onUserUnloaded),this.userManager.events.removeUserSignedOut(this.onUserSignedOut)}},{key:"render",value:function(){return d.default.Children.only(this.props.children)}}]),r}(d.default.Component);p.propTypes={userManager:c.default.object.isRequired,store:c.default.object.isRequired},r.default=p},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function u(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function i(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),a=t(2),c=n(a),l=t(3),d=n(l),f=function(e){function r(){var e,t,n,i;o(this,r);for(var s=arguments.length,a=Array(s),c=0;c<s;c++)a[c]=arguments[c];return t=n=u(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(a))),n.onRedirectSuccess=function(e){n.props.successCallback(e)},n.onRedirectError=function(e){if(!n.props.errorCallback)throw new Error("Error handling logout redirect callback: "+e.message);n.props.errorCallback(e)},i=t,u(n,i)}return i(r,e),s(r,[{key:"componentDidMount",value:function(){var e=this;this.props.userManager.signoutRedirectCallback().then(function(r){return e.onRedirectSuccess(r)}).catch(function(r){return e.onRedirectError(r)})}},{key:"render",value:function(){return d.default.Children.only(this.props.children)}}]),r}(d.default.Component);f.propTypes={children:c.default.element.isRequired,userManager:c.default.object.isRequired,successCallback:c.default.func.isRequired,errorCallback:c.default.func},r.default=f},function(e,r,t){"use strict";function n(e){c=e}function o(){return c}function u(e){return e&&!e.expired?c.dispatch((0,a.userFound)(e)):(!e||e&&e.expired)&&c.dispatch((0,a.userExpired)()),e}function i(e){console.error("redux-oidc: Error in loadUser() function: "+e.message),c.dispatch((0,a.loadUserError)())}function s(e,r){if(!e||!e.dispatch)throw new Error("redux-oidc: You need to pass the redux store into the loadUser helper!");if(!r||!r.getUser)throw new Error("redux-oidc: You need to pass the userManager into the loadUser helper!");return c=e,e.dispatch((0,a.loadingUser)()),r.getUser().then(u).catch(i)}Object.defineProperty(r,"__esModule",{value:!0}),r.setReduxStore=n,r.getReduxStore=o,r.getUserCallback=u,r.errorCallback=i,r.default=s;var a=t(1),c=void 0},function(e,r,t){"use strict";function n(){(0,u.default)().signinSilentCallback()}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(4),u=function(e){return e&&e.__esModule?e:{default:e}}(o)},function(e,r,t){"use strict";function n(e){r.nextMiddleware=E=e}function o(){return E}function u(e){r.storedUser=p=e}function i(){r.storedUser=p=null}function s(e){!e||e.expired?E((0,d.userExpired)()):(r.storedUser=p=e,E((0,d.userFound)(e)))}function a(e){console.error("redux-oidc: Error loading user in oidcMiddleware: "+e.message),E((0,d.loadUserError)())}function c(e,t,n){return t.type===f.USER_EXPIRED||t.type===f.LOADING_USER||t.type===f.USER_FOUND?e(t):(r.nextMiddleware=E=e,p&&!p.expired||(e((0,d.loadingUser)()),n.getUser().then(s).catch(a)),e(t))}function l(e){if(!e||!e.getUser)throw new Error("You must provide a user manager!");return function(r){return function(r){return function(t){return c(r,t,e)}}}}Object.defineProperty(r,"__esModule",{value:!0}),r.nextMiddleware=r.storedUser=void 0,r.setNext=n,r.getNext=o,r.setStoredUser=u,r.removeStoredUser=i,r.getUserCallback=s,r.errorCallback=a,r.middlewareHandler=c,r.default=l;var d=t(1),f=t(0),p=r.storedUser=null,E=r.nextMiddleware=null},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=t(0),u=void 0;try{var i=t(14),s=i.fromJS,a=i.Seq,c=function e(r){return"object"!==(void 0===r?"undefined":n(r))||null===r?r:Array.isArray(r)?a(r).map(e).toList():a(r).map(e).toMap()},l=s({user:null,isLoadingUser:!1});u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments[1];switch(r.type){case o.USER_EXPIRED:case o.SILENT_RENEW_ERROR:return s({user:null,isLoadingUser:!1});case o.SESSION_TERMINATED:case o.USER_SIGNED_OUT:return s({user:null,isLoadingUser:!1});case o.USER_FOUND:return c({user:r.payload,isLoadingUser:!1});case o.LOADING_USER:return e.set("isLoadingUser",!0);default:return e}}}catch(e){u=function(){console.error("You must install immutable-js for the immutable reducer to work!")}}r.default=u},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,r=arguments[1];switch(r.type){case u.USER_EXPIRED:case u.SILENT_RENEW_ERROR:return Object.assign({},o({},e),{user:null,isLoadingUser:!1});case u.SESSION_TERMINATED:case u.USER_SIGNED_OUT:return Object.assign({},o({},e),{user:null,isLoadingUser:!1});case u.USER_FOUND:return Object.assign({},o({},e),{user:r.payload,isLoadingUser:!1});case u.LOADING_USER:return Object.assign({},o({},e),{isLoadingUser:!0});default:return e}}Object.defineProperty(r,"__esModule",{value:!0});var o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e};r.default=n;var u=t(0),i={user:null,isLoadingUser:!1}},function(e,r){e.exports=__webpack_require__(47)},function(e,r){e.exports=__webpack_require__(48)},function(e,r,t){e.exports=t(5)}])});

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = lowPriorityWarning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = __webpack_require__(30);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(41)(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(96)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(20);


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(73);
} else {
  module.exports = __webpack_require__(74);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(338);


/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reduxOidc = __webpack_require__(22);

(0, _reduxOidc.processSilentRenew)();

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(13),
    _assign = __webpack_require__(5);

var ReactNoopUpdateQueue = __webpack_require__(36);

var canDefineProperty = __webpack_require__(18);
var emptyObject = __webpack_require__(37);
var invariant = __webpack_require__(1);
var lowPriorityWarning = __webpack_require__(24);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          lowPriorityWarning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var warning = __webpack_require__(2);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(12);
var ReactComponentTreeHook = __webpack_require__(7);
var ReactElement = __webpack_require__(11);

var checkReactTypeSpec = __webpack_require__(69);

var canDefineProperty = __webpack_require__(18);
var getIteratorFn = __webpack_require__(39);
var warning = __webpack_require__(2);
var lowPriorityWarning = __webpack_require__(24);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        var currentSource = props !== null && props !== undefined && props.__source !== undefined ? props.__source : null;
        ReactComponentTreeHook.pushNonStandardWarningStack(true, currentSource);
        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
        ReactComponentTreeHook.popNonStandardWarningStack();
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(30);
var assign = __webpack_require__(5);

var ReactPropTypesSecret = __webpack_require__(25);
var checkPropTypes = __webpack_require__(75);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Immutable = factory());
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function(/*...values*/) {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function(/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function(/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0; // int
      b = b | 0; // int
      var c = a & 0xffff;
      var d = b & 0xffff;
      // Shift by 0 fixes the sign on the high part.
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
    };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

    // @pragma Construction

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.merge = function(/*...iters*/) {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    // @pragma Mutability

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


  // #pragma Trie Nodes



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return; // undefined
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return; // undefined
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



  // #pragma Iterators

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  }

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  }

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  }

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        }
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

    // @pragma Construction

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function(/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function(/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function(/*...values*/) {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.merge = function(/*...iters*/) {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function(/*...iters*/) {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

    // @pragma Iteration

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

    // TODO: seems like these methods are very similar

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value)
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

    // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

    // @pragma Construction

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) { // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    }
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    }
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    }
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    }
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    }
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      }
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    }

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    }
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    }
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

    // @pragma Access

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

    // @pragma Modification

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

    // @pragma Construction

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function(/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

    // @pragma Construction

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function(/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

    // @pragma Construction

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function(/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function(/*...values*/) {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function(/*...values*/) {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


    // ### Common JavaScript methods and properties

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


    // ### More sequential methods

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


    // ### Hashable Object

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


    // ### More collection methods

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function(/*...iterables*/) {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function(/*, ...iterables */) {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper/*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


    // ### More sequential methods

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

!function t(e,r){if(true)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var n=r();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(this,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function e(){return t.default}:function e(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=22)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i={debug:function t(){},info:function t(){},warn:function t(){},error:function t(){}},o=void 0,s=void 0;(e.Log=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.reset=function t(){s=3,o=i},t.debug=function t(){if(s>=4){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.debug.apply(o,Array.from(r))}},t.info=function t(){if(s>=3){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.info.apply(o,Array.from(r))}},t.warn=function t(){if(s>=2){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.warn.apply(o,Array.from(r))}},t.error=function t(){if(s>=1){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];o.error.apply(o,Array.from(r))}},n(t,null,[{key:"NONE",get:function t(){return 0}},{key:"ERROR",get:function t(){return 1}},{key:"WARN",get:function t(){return 2}},{key:"INFO",get:function t(){return 3}},{key:"DEBUG",get:function t(){return 4}},{key:"level",get:function t(){return s},set:function t(e){if(!(0<=e&&e<=4))throw new Error("Invalid log level");s=e}},{key:"logger",get:function t(){return o},set:function t(e){if(!e.debug&&e.info&&(e.debug=e.info),!(e.debug&&e.info&&e.warn&&e.error))throw new Error("Invalid logger");o=e}}]),t}()).reset()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i={setInterval:function(t){function e(e,r){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t,e){return setInterval(t,e)})),clearInterval:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){return clearInterval(t)}))},o=!1,s=null;e.Global=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t._testing=function t(){o=!0},t.setXMLHttpRequest=function t(e){s=e},n(t,null,[{key:"location",get:function t(){if(!o)return location}},{key:"localStorage",get:function t(){if(!o&&"undefined"!=typeof window)return localStorage}},{key:"sessionStorage",get:function t(){if(!o&&"undefined"!=typeof window)return sessionStorage}},{key:"XMLHttpRequest",get:function t(){if(!o&&"undefined"!=typeof window)return s||XMLHttpRequest}},{key:"timer",get:function t(){if(!o)return i}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.MetadataService=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(7);function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=".well-known/openid-configuration";e.MetadataService=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.JsonService;if(s(this,t),!e)throw i.Log.error("MetadataService: No settings passed to MetadataService"),new Error("settings");this._settings=e,this._jsonService=new r(["application/jwk-set+json"]),this._metadata_promise}return t.prototype.resetSigningKeys=function t(){this._settings=this._settings||{},this._settings.signingKeys=void 0},t.prototype.getMetadata=function t(){var e=this;return!this.metadataUrl&&this._settings.metadata?(i.Log.debug("MetadataService.getMetadata: Returning metadata from settings"),Promise.resolve(this._settings.metadata)):this.metadataUrl?this._metadata_promise?(i.Log.debug("MetadataService.getMetadata: getting metadata from cache promise",this.metadataUrl),this._metadata_promise):(i.Log.debug("MetadataService.getMetadata: getting metadata from",this.metadataUrl),this._metadata_promise=this._jsonService.getJson(this.metadataUrl).then((function(t){return i.Log.debug("MetadataService.getMetadata: json received"),e._settings.metadata||(e._settings.metadata={}),Object.assign(e._settings.metadata,t),e._settings.metadata})),this._metadata_promise):(i.Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings"),Promise.reject(new Error("No authority or metadataUrl configured on settings")))},t.prototype.getIssuer=function t(){return this._getMetadataProperty("issuer")},t.prototype.getAuthorizationEndpoint=function t(){return this._getMetadataProperty("authorization_endpoint")},t.prototype.getUserInfoEndpoint=function t(){return this._getMetadataProperty("userinfo_endpoint")},t.prototype.getTokenEndpoint=function t(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this._getMetadataProperty("token_endpoint",e)},t.prototype.getCheckSessionIframe=function t(){return this._getMetadataProperty("check_session_iframe",!0)},t.prototype.getEndSessionEndpoint=function t(){return this._getMetadataProperty("end_session_endpoint",!0)},t.prototype.getRevocationEndpoint=function t(){return this._getMetadataProperty("revocation_endpoint",!0)},t.prototype.getKeysEndpoint=function t(){return this._getMetadataProperty("jwks_uri",!0)},t.prototype._getMetadataProperty=function t(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return i.Log.debug("MetadataService.getMetadataProperty for: "+e),this.getMetadata().then((function(t){if(i.Log.debug("MetadataService.getMetadataProperty: metadata recieved"),void 0===t[e]){if(!0===r)return void i.Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property "+e);throw i.Log.error("MetadataService.getMetadataProperty: Metadata does not contain property "+e),new Error("Metadata does not contain property "+e)}return t[e]}))},t.prototype.getSigningKeys=function t(){var e=this;return this._settings.signingKeys?(i.Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings"),Promise.resolve(this._settings.signingKeys)):this._getMetadataProperty("jwks_uri").then((function(t){return i.Log.debug("MetadataService.getSigningKeys: jwks_uri received",t),e._jsonService.getJson(t).then((function(t){if(i.Log.debug("MetadataService.getSigningKeys: key set received",t),!t.keys)throw i.Log.error("MetadataService.getSigningKeys: Missing keys on keyset"),new Error("Missing keys on keyset");return e._settings.signingKeys=t.keys,e._settings.signingKeys}))}))},n(t,[{key:"metadataUrl",get:function t(){return this._metadataUrl||(this._settings.metadataUrl?this._metadataUrl=this._settings.metadataUrl:(this._metadataUrl=this._settings.authority,this._metadataUrl&&this._metadataUrl.indexOf(a)<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=a))),this._metadataUrl}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UrlUtility=void 0;var n=r(0),i=r(1);e.UrlUtility=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.addQueryParam=function t(e,r,n){return e.indexOf("?")<0&&(e+="?"),"?"!==e[e.length-1]&&(e+="&"),e+=encodeURIComponent(r),e+="=",e+=encodeURIComponent(n)},t.parseUrlFragment=function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.Global;"string"!=typeof e&&(e=o.location.href);var s=e.lastIndexOf(r);s>=0&&(e=e.substr(s+1)),"?"===r&&(s=e.indexOf("#"))>=0&&(e=e.substr(0,s));for(var a,u={},c=/([^&=]+)=([^&]*)/g,h=0;a=c.exec(e);)if(u[decodeURIComponent(a[1])]=decodeURIComponent(a[2].replace(/\+/g," ")),h++>50)return n.Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters",e),{error:"Response exceeded expected number of parameters"};for(var l in u)return u;return{}},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.JoseUtil=void 0;var n=r(26),i=function o(t){return t&&t.__esModule?t:{default:t}}(r(33));e.JoseUtil=(0,i.default)({jws:n.jws,KeyUtil:n.KeyUtil,X509:n.X509,crypto:n.crypto,hextob64u:n.hextob64u,b64tohex:n.b64tohex,AllowedSigningAlgs:n.AllowedSigningAlgs})},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.OidcClientSettings=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),o=r(0),s=r(23),a=r(6),u=r(24),c=r(2);function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var l=".well-known/openid-configuration",f="id_token",g="openid",d="client_secret_post";e.OidcClientSettings=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.authority,i=e.metadataUrl,o=e.metadata,l=e.signingKeys,p=e.client_id,v=e.client_secret,y=e.response_type,m=void 0===y?f:y,_=e.scope,S=void 0===_?g:_,b=e.redirect_uri,w=e.post_logout_redirect_uri,F=e.client_authentication,E=void 0===F?d:F,x=e.prompt,A=e.display,k=e.max_age,P=e.ui_locales,C=e.acr_values,T=e.resource,R=e.response_mode,I=e.filterProtocolClaims,D=void 0===I||I,L=e.loadUserInfo,N=void 0===L||L,U=e.staleStateAge,B=void 0===U?900:U,O=e.clockSkew,j=void 0===O?300:O,M=e.clockService,H=void 0===M?new s.ClockService:M,V=e.userInfoJwtIssuer,K=void 0===V?"OP":V,q=e.mergeClaims,J=void 0!==q&&q,W=e.stateStore,z=void 0===W?new a.WebStorageStateStore:W,Y=e.ResponseValidatorCtor,G=void 0===Y?u.ResponseValidator:Y,X=e.MetadataServiceCtor,$=void 0===X?c.MetadataService:X,Q=e.extraQueryParams,Z=void 0===Q?{}:Q,tt=e.extraTokenParams,et=void 0===tt?{}:tt;h(this,t),this._authority=r,this._metadataUrl=i,this._metadata=o,this._signingKeys=l,this._client_id=p,this._client_secret=v,this._response_type=m,this._scope=S,this._redirect_uri=b,this._post_logout_redirect_uri=w,this._client_authentication=E,this._prompt=x,this._display=A,this._max_age=k,this._ui_locales=P,this._acr_values=C,this._resource=T,this._response_mode=R,this._filterProtocolClaims=!!D,this._loadUserInfo=!!N,this._staleStateAge=B,this._clockSkew=j,this._clockService=H,this._userInfoJwtIssuer=K,this._mergeClaims=!!J,this._stateStore=z,this._validator=new G(this),this._metadataService=new $(this),this._extraQueryParams="object"===(void 0===Z?"undefined":n(Z))?Z:{},this._extraTokenParams="object"===(void 0===et?"undefined":n(et))?et:{}}return t.prototype.getEpochTime=function t(){return this._clockService.getEpochTime()},i(t,[{key:"client_id",get:function t(){return this._client_id},set:function t(e){if(this._client_id)throw o.Log.error("OidcClientSettings.set_client_id: client_id has already been assigned."),new Error("client_id has already been assigned.");this._client_id=e}},{key:"client_secret",get:function t(){return this._client_secret}},{key:"response_type",get:function t(){return this._response_type}},{key:"scope",get:function t(){return this._scope}},{key:"redirect_uri",get:function t(){return this._redirect_uri}},{key:"post_logout_redirect_uri",get:function t(){return this._post_logout_redirect_uri}},{key:"client_authentication",get:function t(){return this._client_authentication}},{key:"prompt",get:function t(){return this._prompt}},{key:"display",get:function t(){return this._display}},{key:"max_age",get:function t(){return this._max_age}},{key:"ui_locales",get:function t(){return this._ui_locales}},{key:"acr_values",get:function t(){return this._acr_values}},{key:"resource",get:function t(){return this._resource}},{key:"response_mode",get:function t(){return this._response_mode}},{key:"authority",get:function t(){return this._authority},set:function t(e){if(this._authority)throw o.Log.error("OidcClientSettings.set_authority: authority has already been assigned."),new Error("authority has already been assigned.");this._authority=e}},{key:"metadataUrl",get:function t(){return this._metadataUrl||(this._metadataUrl=this.authority,this._metadataUrl&&this._metadataUrl.indexOf(l)<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=l)),this._metadataUrl}},{key:"metadata",get:function t(){return this._metadata},set:function t(e){this._metadata=e}},{key:"signingKeys",get:function t(){return this._signingKeys},set:function t(e){this._signingKeys=e}},{key:"filterProtocolClaims",get:function t(){return this._filterProtocolClaims}},{key:"loadUserInfo",get:function t(){return this._loadUserInfo}},{key:"staleStateAge",get:function t(){return this._staleStateAge}},{key:"clockSkew",get:function t(){return this._clockSkew}},{key:"userInfoJwtIssuer",get:function t(){return this._userInfoJwtIssuer}},{key:"mergeClaims",get:function t(){return this._mergeClaims}},{key:"stateStore",get:function t(){return this._stateStore}},{key:"validator",get:function t(){return this._validator}},{key:"metadataService",get:function t(){return this._metadataService}},{key:"extraQueryParams",get:function t(){return this._extraQueryParams},set:function t(e){"object"===(void 0===e?"undefined":n(e))?this._extraQueryParams=e:this._extraQueryParams={}}},{key:"extraTokenParams",get:function t(){return this._extraTokenParams},set:function t(e){"object"===(void 0===e?"undefined":n(e))?this._extraTokenParams=e:this._extraTokenParams={}}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WebStorageStateStore=void 0;var n=r(0),i=r(1);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.WebStorageStateStore=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.prefix,n=void 0===r?"oidc.":r,s=e.store,a=void 0===s?i.Global.localStorage:s;o(this,t),this._store=a,this._prefix=n}return t.prototype.set=function t(e,r){return n.Log.debug("WebStorageStateStore.set",e),e=this._prefix+e,this._store.setItem(e,r),Promise.resolve()},t.prototype.get=function t(e){n.Log.debug("WebStorageStateStore.get",e),e=this._prefix+e;var r=this._store.getItem(e);return Promise.resolve(r)},t.prototype.remove=function t(e){n.Log.debug("WebStorageStateStore.remove",e),e=this._prefix+e;var r=this._store.getItem(e);return this._store.removeItem(e),Promise.resolve(r)},t.prototype.getAllKeys=function t(){n.Log.debug("WebStorageStateStore.getAllKeys");for(var e=[],r=0;r<this._store.length;r++){var i=this._store.key(r);0===i.indexOf(this._prefix)&&e.push(i.substr(this._prefix.length))}return Promise.resolve(e)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.JsonService=void 0;var n=r(0),i=r(1);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.JsonService=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.Global.XMLHttpRequest,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;o(this,t),e&&Array.isArray(e)?this._contentTypes=e.slice():this._contentTypes=[],this._contentTypes.push("application/json"),n&&this._contentTypes.push("application/jwt"),this._XMLHttpRequest=r,this._jwtHandler=n}return t.prototype.getJson=function t(e,r){var i=this;if(!e)throw n.Log.error("JsonService.getJson: No url passed"),new Error("url");return n.Log.debug("JsonService.getJson, url: ",e),new Promise((function(t,o){var s=new i._XMLHttpRequest;s.open("GET",e);var a=i._contentTypes,u=i._jwtHandler;s.onload=function(){if(n.Log.debug("JsonService.getJson: HTTP response received, status",s.status),200===s.status){var r=s.getResponseHeader("Content-Type");if(r){var i=a.find((function(t){if(r.startsWith(t))return!0}));if("application/jwt"==i)return void u(s).then(t,o);if(i)try{return void t(JSON.parse(s.responseText))}catch(t){return n.Log.error("JsonService.getJson: Error parsing JSON response",t.message),void o(t)}}o(Error("Invalid response Content-Type: "+r+", from URL: "+e))}else o(Error(s.statusText+" ("+s.status+")"))},s.onerror=function(){n.Log.error("JsonService.getJson: network error"),o(Error("Network Error"))},r&&(n.Log.debug("JsonService.getJson: token passed, setting Authorization header"),s.setRequestHeader("Authorization","Bearer "+r)),s.send()}))},t.prototype.postForm=function t(e,r,i){var o=this;if(!e)throw n.Log.error("JsonService.postForm: No url passed"),new Error("url");return n.Log.debug("JsonService.postForm, url: ",e),new Promise((function(t,s){var a=new o._XMLHttpRequest;a.open("POST",e);var u=o._contentTypes;a.onload=function(){if(n.Log.debug("JsonService.postForm: HTTP response received, status",a.status),200!==a.status){if(400===a.status)if(i=a.getResponseHeader("Content-Type"))if(u.find((function(t){if(i.startsWith(t))return!0})))try{var r=JSON.parse(a.responseText);if(r&&r.error)return n.Log.error("JsonService.postForm: Error from server: ",r.error),void s(new Error(r.error))}catch(t){return n.Log.error("JsonService.postForm: Error parsing JSON response",t.message),void s(t)}s(Error(a.statusText+" ("+a.status+")"))}else{var i;if((i=a.getResponseHeader("Content-Type"))&&u.find((function(t){if(i.startsWith(t))return!0})))try{return void t(JSON.parse(a.responseText))}catch(t){return n.Log.error("JsonService.postForm: Error parsing JSON response",t.message),void s(t)}s(Error("Invalid response Content-Type: "+i+", from URL: "+e))}},a.onerror=function(){n.Log.error("JsonService.postForm: network error"),s(Error("Network Error"))};var c="";for(var h in r){var l=r[h];l&&(c.length>0&&(c+="&"),c+=encodeURIComponent(h),c+="=",c+=encodeURIComponent(l))}a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),void 0!==i&&a.setRequestHeader("Authorization","Basic "+btoa(i)),a.send(c)}))},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SigninRequest=void 0;var n=r(0),i=r(3),o=r(13);e.SigninRequest=function(){function t(e){var r=e.url,s=e.client_id,a=e.redirect_uri,u=e.response_type,c=e.scope,h=e.authority,l=e.data,f=e.prompt,g=e.display,d=e.max_age,p=e.ui_locales,v=e.id_token_hint,y=e.login_hint,m=e.acr_values,_=e.resource,S=e.response_mode,b=e.request,w=e.request_uri,F=e.extraQueryParams,E=e.request_type,x=e.client_secret,A=e.extraTokenParams,k=e.skipUserInfo;if(function P(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!r)throw n.Log.error("SigninRequest.ctor: No url passed"),new Error("url");if(!s)throw n.Log.error("SigninRequest.ctor: No client_id passed"),new Error("client_id");if(!a)throw n.Log.error("SigninRequest.ctor: No redirect_uri passed"),new Error("redirect_uri");if(!u)throw n.Log.error("SigninRequest.ctor: No response_type passed"),new Error("response_type");if(!c)throw n.Log.error("SigninRequest.ctor: No scope passed"),new Error("scope");if(!h)throw n.Log.error("SigninRequest.ctor: No authority passed"),new Error("authority");var C=t.isOidc(u),T=t.isCode(u);S||(S=t.isCode(u)?"query":null),this.state=new o.SigninState({nonce:C,data:l,client_id:s,authority:h,redirect_uri:a,code_verifier:T,request_type:E,response_mode:S,client_secret:x,scope:c,extraTokenParams:A,skipUserInfo:k}),r=i.UrlUtility.addQueryParam(r,"client_id",s),r=i.UrlUtility.addQueryParam(r,"redirect_uri",a),r=i.UrlUtility.addQueryParam(r,"response_type",u),r=i.UrlUtility.addQueryParam(r,"scope",c),r=i.UrlUtility.addQueryParam(r,"state",this.state.id),C&&(r=i.UrlUtility.addQueryParam(r,"nonce",this.state.nonce)),T&&(r=i.UrlUtility.addQueryParam(r,"code_challenge",this.state.code_challenge),r=i.UrlUtility.addQueryParam(r,"code_challenge_method","S256"));var R={prompt:f,display:g,max_age:d,ui_locales:p,id_token_hint:v,login_hint:y,acr_values:m,resource:_,request:b,request_uri:w,response_mode:S};for(var I in R)R[I]&&(r=i.UrlUtility.addQueryParam(r,I,R[I]));for(var D in F)r=i.UrlUtility.addQueryParam(r,D,F[D]);this.url=r}return t.isOidc=function t(e){return!!e.split(/\s+/g).filter((function(t){return"id_token"===t}))[0]},t.isOAuth=function t(e){return!!e.split(/\s+/g).filter((function(t){return"token"===t}))[0]},t.isCode=function t(e){return!!e.split(/\s+/g).filter((function(t){return"code"===t}))[0]},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.State=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=function s(t){return t&&t.__esModule?t:{default:t}}(r(14));function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.State=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.id,n=e.data,i=e.created,s=e.request_type;a(this,t),this._id=r||(0,o.default)(),this._data=n,this._created="number"==typeof i&&i>0?i:parseInt(Date.now()/1e3),this._request_type=s}return t.prototype.toStorageString=function t(){return i.Log.debug("State.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type})},t.fromStorageString=function e(r){return i.Log.debug("State.fromStorageString"),new t(JSON.parse(r))},t.clearStaleState=function e(r,n){var o=Date.now()/1e3-n;return r.getAllKeys().then((function(e){i.Log.debug("State.clearStaleState: got keys",e);for(var n=[],s=function s(a){var c=e[a];u=r.get(c).then((function(e){var n=!1;if(e)try{var s=t.fromStorageString(e);i.Log.debug("State.clearStaleState: got item from key: ",c,s.created),s.created<=o&&(n=!0)}catch(t){i.Log.error("State.clearStaleState: Error parsing state for key",c,t.message),n=!0}else i.Log.debug("State.clearStaleState: no item in storage for key: ",c),n=!0;if(n)return i.Log.debug("State.clearStaleState: removed item for key: ",c),r.remove(c)})),n.push(u)},a=0;a<e.length;a++){var u;s(a)}return i.Log.debug("State.clearStaleState: waiting on promise count:",n.length),Promise.all(n)}))},n(t,[{key:"id",get:function t(){return this._id}},{key:"data",get:function t(){return this._data}},{key:"created",get:function t(){return this._created}},{key:"request_type",get:function t(){return this._request_type}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.OidcClient=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(5),s=r(12),a=r(8),u=r(34),c=r(35),h=r(36),l=r(13),f=r(9);function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.OidcClient=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};g(this,t),e instanceof o.OidcClientSettings?this._settings=e:this._settings=new o.OidcClientSettings(e)}return t.prototype.createSigninRequest=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.response_type,o=r.scope,s=r.redirect_uri,u=r.data,c=r.state,h=r.prompt,l=r.display,f=r.max_age,g=r.ui_locales,d=r.id_token_hint,p=r.login_hint,v=r.acr_values,y=r.resource,m=r.request,_=r.request_uri,S=r.response_mode,b=r.extraQueryParams,w=r.extraTokenParams,F=r.request_type,E=r.skipUserInfo,x=arguments[1];i.Log.debug("OidcClient.createSigninRequest");var A=this._settings.client_id;n=n||this._settings.response_type,o=o||this._settings.scope,s=s||this._settings.redirect_uri,h=h||this._settings.prompt,l=l||this._settings.display,f=f||this._settings.max_age,g=g||this._settings.ui_locales,v=v||this._settings.acr_values,y=y||this._settings.resource,S=S||this._settings.response_mode,b=b||this._settings.extraQueryParams,w=w||this._settings.extraTokenParams;var k=this._settings.authority;return a.SigninRequest.isCode(n)&&"code"!==n?Promise.reject(new Error("OpenID Connect hybrid flow is not supported")):this._metadataService.getAuthorizationEndpoint().then((function(t){i.Log.debug("OidcClient.createSigninRequest: Received authorization endpoint",t);var r=new a.SigninRequest({url:t,client_id:A,redirect_uri:s,response_type:n,scope:o,data:u||c,authority:k,prompt:h,display:l,max_age:f,ui_locales:g,id_token_hint:d,login_hint:p,acr_values:v,resource:y,request:m,request_uri:_,extraQueryParams:b,extraTokenParams:w,request_type:F,response_mode:S,client_secret:e._settings.client_secret,skipUserInfo:E}),P=r.state;return(x=x||e._stateStore).set(P.id,P.toStorageString()).then((function(){return r}))}))},t.prototype.readSigninResponseState=function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i.Log.debug("OidcClient.readSigninResponseState");var o="query"===this._settings.response_mode||!this._settings.response_mode&&a.SigninRequest.isCode(this._settings.response_type),s=o?"?":"#",c=new u.SigninResponse(e,s);if(!c.state)return i.Log.error("OidcClient.readSigninResponseState: No state in response"),Promise.reject(new Error("No state in response"));r=r||this._stateStore;var h=n?r.remove.bind(r):r.get.bind(r);return h(c.state).then((function(t){if(!t)throw i.Log.error("OidcClient.readSigninResponseState: No matching state found in storage"),new Error("No matching state found in storage");return{state:l.SigninState.fromStorageString(t),response:c}}))},t.prototype.processSigninResponse=function t(e,r){var n=this;return i.Log.debug("OidcClient.processSigninResponse"),this.readSigninResponseState(e,r,!0).then((function(t){var e=t.state,r=t.response;return i.Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response"),n._validator.validateSigninResponse(e,r)}))},t.prototype.createSignoutRequest=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.id_token_hint,o=r.data,s=r.state,a=r.post_logout_redirect_uri,u=r.extraQueryParams,h=r.request_type,l=arguments[1];return i.Log.debug("OidcClient.createSignoutRequest"),a=a||this._settings.post_logout_redirect_uri,u=u||this._settings.extraQueryParams,this._metadataService.getEndSessionEndpoint().then((function(t){if(!t)throw i.Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned"),new Error("no end session endpoint");i.Log.debug("OidcClient.createSignoutRequest: Received end session endpoint",t);var r=new c.SignoutRequest({url:t,id_token_hint:n,post_logout_redirect_uri:a,data:o||s,extraQueryParams:u,request_type:h}),f=r.state;return f&&(i.Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist"),(l=l||e._stateStore).set(f.id,f.toStorageString())),r}))},t.prototype.readSignoutResponseState=function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];i.Log.debug("OidcClient.readSignoutResponseState");var o=new h.SignoutResponse(e);if(!o.state)return i.Log.debug("OidcClient.readSignoutResponseState: No state in response"),o.error?(i.Log.warn("OidcClient.readSignoutResponseState: Response was error: ",o.error),Promise.reject(new s.ErrorResponse(o))):Promise.resolve({state:void 0,response:o});var a=o.state;r=r||this._stateStore;var u=n?r.remove.bind(r):r.get.bind(r);return u(a).then((function(t){if(!t)throw i.Log.error("OidcClient.readSignoutResponseState: No matching state found in storage"),new Error("No matching state found in storage");return{state:f.State.fromStorageString(t),response:o}}))},t.prototype.processSignoutResponse=function t(e,r){var n=this;return i.Log.debug("OidcClient.processSignoutResponse"),this.readSignoutResponseState(e,r,!0).then((function(t){var e=t.state,r=t.response;return e?(i.Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response"),n._validator.validateSignoutResponse(e,r)):(i.Log.debug("OidcClient.processSignoutResponse: No state from storage; skipping validating response"),r)}))},t.prototype.clearStaleState=function t(e){return i.Log.debug("OidcClient.clearStaleState"),e=e||this._stateStore,f.State.clearStaleState(e,this.settings.staleStateAge)},n(t,[{key:"_stateStore",get:function t(){return this.settings.stateStore}},{key:"_validator",get:function t(){return this.settings.validator}},{key:"_metadataService",get:function t(){return this.settings.metadataService}},{key:"settings",get:function t(){return this._settings}},{key:"metadataService",get:function t(){return this._metadataService}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TokenClient=void 0;var n=r(7),i=r(2),o=r(0);function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.TokenClient=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.JsonService,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(s(this,t),!e)throw o.Log.error("TokenClient.ctor: No settings passed"),new Error("settings");this._settings=e,this._jsonService=new r,this._metadataService=new a(this._settings)}return t.prototype.exchangeCode=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(r=Object.assign({},r)).grant_type=r.grant_type||"authorization_code",r.client_id=r.client_id||this._settings.client_id,r.client_secret=r.client_secret||this._settings.client_secret,r.redirect_uri=r.redirect_uri||this._settings.redirect_uri;var n=void 0,i=r._client_authentication||this._settings._client_authentication;return delete r._client_authentication,r.code?r.redirect_uri?r.code_verifier?r.client_id?r.client_secret||"client_secret_basic"!=i?("client_secret_basic"==i&&(n=r.client_id+":"+r.client_secret,delete r.client_id,delete r.client_secret),this._metadataService.getTokenEndpoint(!1).then((function(t){return o.Log.debug("TokenClient.exchangeCode: Received token endpoint"),e._jsonService.postForm(t,r,n).then((function(t){return o.Log.debug("TokenClient.exchangeCode: response received"),t}))}))):(o.Log.error("TokenClient.exchangeCode: No client_secret passed"),Promise.reject(new Error("A client_secret is required"))):(o.Log.error("TokenClient.exchangeCode: No client_id passed"),Promise.reject(new Error("A client_id is required"))):(o.Log.error("TokenClient.exchangeCode: No code_verifier passed"),Promise.reject(new Error("A code_verifier is required"))):(o.Log.error("TokenClient.exchangeCode: No redirect_uri passed"),Promise.reject(new Error("A redirect_uri is required"))):(o.Log.error("TokenClient.exchangeCode: No code passed"),Promise.reject(new Error("A code is required")))},t.prototype.exchangeRefreshToken=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(r=Object.assign({},r)).grant_type=r.grant_type||"refresh_token",r.client_id=r.client_id||this._settings.client_id,r.client_secret=r.client_secret||this._settings.client_secret;var n=void 0,i=r._client_authentication||this._settings._client_authentication;return delete r._client_authentication,r.refresh_token?r.client_id?("client_secret_basic"==i&&(n=r.client_id+":"+r.client_secret,delete r.client_id,delete r.client_secret),this._metadataService.getTokenEndpoint(!1).then((function(t){return o.Log.debug("TokenClient.exchangeRefreshToken: Received token endpoint"),e._jsonService.postForm(t,r,n).then((function(t){return o.Log.debug("TokenClient.exchangeRefreshToken: response received"),t}))}))):(o.Log.error("TokenClient.exchangeRefreshToken: No client_id passed"),Promise.reject(new Error("A client_id is required"))):(o.Log.error("TokenClient.exchangeRefreshToken: No refresh_token passed"),Promise.reject(new Error("A refresh_token is required")))},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ErrorResponse=void 0;var n=r(0);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}e.ErrorResponse=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=r.error,a=r.error_description,u=r.error_uri,c=r.state,h=r.session_state;if(i(this,e),!s)throw n.Log.error("No error passed to ErrorResponse"),new Error("error");var l=o(this,t.call(this,a||s));return l.name="ErrorResponse",l.error=s,l.error_description=a,l.error_uri=u,l.state=c,l.session_state=h,l}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e}(Error)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SigninState=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(9),s=r(4),a=function u(t){return t&&t.__esModule?t:{default:t}}(r(14));function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}e.SigninState=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.nonce,i=r.authority,o=r.client_id,u=r.redirect_uri,l=r.code_verifier,f=r.response_mode,g=r.client_secret,d=r.scope,p=r.extraTokenParams,v=r.skipUserInfo;c(this,e);var y=h(this,t.call(this,arguments[0]));if(!0===n?y._nonce=(0,a.default)():n&&(y._nonce=n),!0===l?y._code_verifier=(0,a.default)()+(0,a.default)()+(0,a.default)():l&&(y._code_verifier=l),y.code_verifier){var m=s.JoseUtil.hashString(y.code_verifier,"SHA256");y._code_challenge=s.JoseUtil.hexToBase64Url(m)}return y._redirect_uri=u,y._authority=i,y._client_id=o,y._response_mode=f,y._client_secret=g,y._scope=d,y._extraTokenParams=p,y._skipUserInfo=v,y}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.toStorageString=function t(){return i.Log.debug("SigninState.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,request_type:this.request_type,nonce:this.nonce,code_verifier:this.code_verifier,redirect_uri:this.redirect_uri,authority:this.authority,client_id:this.client_id,response_mode:this.response_mode,client_secret:this.client_secret,scope:this.scope,extraTokenParams:this.extraTokenParams,skipUserInfo:this.skipUserInfo})},e.fromStorageString=function t(r){return i.Log.debug("SigninState.fromStorageString"),new e(JSON.parse(r))},n(e,[{key:"nonce",get:function t(){return this._nonce}},{key:"authority",get:function t(){return this._authority}},{key:"client_id",get:function t(){return this._client_id}},{key:"redirect_uri",get:function t(){return this._redirect_uri}},{key:"code_verifier",get:function t(){return this._code_verifier}},{key:"code_challenge",get:function t(){return this._code_challenge}},{key:"response_mode",get:function t(){return this._response_mode}},{key:"client_secret",get:function t(){return this._client_secret}},{key:"scope",get:function t(){return this._scope}},{key:"extraTokenParams",get:function t(){return this._extraTokenParams}},{key:"skipUserInfo",get:function t(){return this._skipUserInfo}}]),e}(o.State)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function n(){return("undefined"!=i&&null!==i&&void 0!==i.getRandomValues?o:s)().replace(/-/g,"")};var i="undefined"!=typeof window?window.crypto||window.msCrypto:null;function o(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^i.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)}))}function s(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^16*Math.random()>>t/4).toString(16)}))}t.exports=e.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.User=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.User=function(){function t(e){var r=e.id_token,n=e.session_state,i=e.access_token,o=e.refresh_token,s=e.token_type,a=e.scope,u=e.profile,c=e.expires_at,h=e.state;!function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id_token=r,this.session_state=n,this.access_token=i,this.refresh_token=o,this.token_type=s,this.scope=a,this.profile=u,this.expires_at=c,this.state=h}return t.prototype.toStorageString=function t(){return i.Log.debug("User.toStorageString"),JSON.stringify({id_token:this.id_token,session_state:this.session_state,access_token:this.access_token,refresh_token:this.refresh_token,token_type:this.token_type,scope:this.scope,profile:this.profile,expires_at:this.expires_at})},t.fromStorageString=function e(r){return i.Log.debug("User.fromStorageString"),new t(JSON.parse(r))},n(t,[{key:"expires_in",get:function t(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}},set:function t(e){var r=parseInt(e);if("number"==typeof r&&r>0){var n=parseInt(Date.now()/1e3);this.expires_at=n+r}}},{key:"expired",get:function t(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function t(){return(this.scope||"").split(" ")}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AccessTokenEvents=void 0;var n=r(0),i=r(46);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.AccessTokenEvents=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.accessTokenExpiringNotificationTime,n=void 0===r?60:r,s=e.accessTokenExpiringTimer,a=void 0===s?new i.Timer("Access token expiring"):s,u=e.accessTokenExpiredTimer,c=void 0===u?new i.Timer("Access token expired"):u;o(this,t),this._accessTokenExpiringNotificationTime=n,this._accessTokenExpiring=a,this._accessTokenExpired=c}return t.prototype.load=function t(e){if(e.access_token&&void 0!==e.expires_in){var r=e.expires_in;if(n.Log.debug("AccessTokenEvents.load: access token present, remaining duration:",r),r>0){var i=r-this._accessTokenExpiringNotificationTime;i<=0&&(i=1),n.Log.debug("AccessTokenEvents.load: registering expiring timer in:",i),this._accessTokenExpiring.init(i)}else n.Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration."),this._accessTokenExpiring.cancel();var o=r+1;n.Log.debug("AccessTokenEvents.load: registering expired timer in:",o),this._accessTokenExpired.init(o)}else this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel()},t.prototype.unload=function t(){n.Log.debug("AccessTokenEvents.unload: canceling existing access token timers"),this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel()},t.prototype.addAccessTokenExpiring=function t(e){this._accessTokenExpiring.addHandler(e)},t.prototype.removeAccessTokenExpiring=function t(e){this._accessTokenExpiring.removeHandler(e)},t.prototype.addAccessTokenExpired=function t(e){this._accessTokenExpired.addHandler(e)},t.prototype.removeAccessTokenExpired=function t(e){this._accessTokenExpired.removeHandler(e)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Event=void 0;var n=r(0);e.Event=function(){function t(e){!function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e,this._callbacks=[]}return t.prototype.addHandler=function t(e){this._callbacks.push(e)},t.prototype.removeHandler=function t(e){var r=this._callbacks.findIndex((function(t){return t===e}));r>=0&&this._callbacks.splice(r,1)},t.prototype.raise=function t(){n.Log.debug("Event: Raising event: "+this._name);for(var e=0;e<this._callbacks.length;e++){var r;(r=this._callbacks)[e].apply(r,arguments)}},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SessionMonitor=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(19),s=r(1);function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.SessionMonitor=function(){function t(e){var r=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.CheckSessionIFrame,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s.Global.timer;if(a(this,t),!e)throw i.Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor"),new Error("userManager");this._userManager=e,this._CheckSessionIFrameCtor=n,this._timer=u,this._userManager.events.addUserLoaded(this._start.bind(this)),this._userManager.events.addUserUnloaded(this._stop.bind(this)),Promise.resolve(this._userManager.getUser().then((function(t){t?r._start(t):r._settings.monitorAnonymousSession&&r._userManager.querySessionStatus().then((function(t){var e={session_state:t.session_state};t.sub&&t.sid&&(e.profile={sub:t.sub,sid:t.sid}),r._start(e)})).catch((function(t){i.Log.error("SessionMonitor ctor: error from querySessionStatus:",t.message)}))})).catch((function(t){i.Log.error("SessionMonitor ctor: error from getUser:",t.message)})))}return t.prototype._start=function t(e){var r=this,n=e.session_state;n&&(e.profile?(this._sub=e.profile.sub,this._sid=e.profile.sid,i.Log.debug("SessionMonitor._start: session_state:",n,", sub:",this._sub)):(this._sub=void 0,this._sid=void 0,i.Log.debug("SessionMonitor._start: session_state:",n,", anonymous user")),this._checkSessionIFrame?this._checkSessionIFrame.start(n):this._metadataService.getCheckSessionIframe().then((function(t){if(t){i.Log.debug("SessionMonitor._start: Initializing check session iframe");var e=r._client_id,o=r._checkSessionInterval,s=r._stopCheckSessionOnError;r._checkSessionIFrame=new r._CheckSessionIFrameCtor(r._callback.bind(r),e,t,o,s),r._checkSessionIFrame.load().then((function(){r._checkSessionIFrame.start(n)}))}else i.Log.warn("SessionMonitor._start: No check session iframe found in the metadata")})).catch((function(t){i.Log.error("SessionMonitor._start: Error from getCheckSessionIframe:",t.message)})))},t.prototype._stop=function t(){var e=this;if(this._sub=void 0,this._sid=void 0,this._checkSessionIFrame&&(i.Log.debug("SessionMonitor._stop"),this._checkSessionIFrame.stop()),this._settings.monitorAnonymousSession)var r=this._timer.setInterval((function(){e._timer.clearInterval(r),e._userManager.querySessionStatus().then((function(t){var r={session_state:t.session_state};t.sub&&t.sid&&(r.profile={sub:t.sub,sid:t.sid}),e._start(r)})).catch((function(t){i.Log.error("SessionMonitor: error from querySessionStatus:",t.message)}))}),1e3)},t.prototype._callback=function t(){var e=this;this._userManager.querySessionStatus().then((function(t){var r=!0;t?t.sub===e._sub?(r=!1,e._checkSessionIFrame.start(t.session_state),t.sid===e._sid?i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:",t.session_state):(i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:",t.session_state),e._userManager.events._raiseUserSessionChanged())):i.Log.debug("SessionMonitor._callback: Different subject signed into OP:",t.sub):i.Log.debug("SessionMonitor._callback: Subject no longer signed into OP"),r&&(e._sub?(i.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event"),e._userManager.events._raiseUserSignedOut()):(i.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed in event"),e._userManager.events._raiseUserSignedIn()))})).catch((function(t){e._sub&&(i.Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event",t.message),e._userManager.events._raiseUserSignedOut())}))},n(t,[{key:"_settings",get:function t(){return this._userManager.settings}},{key:"_metadataService",get:function t(){return this._userManager.metadataService}},{key:"_client_id",get:function t(){return this._settings.client_id}},{key:"_checkSessionInterval",get:function t(){return this._settings.checkSessionInterval}},{key:"_stopCheckSessionOnError",get:function t(){return this._settings.stopCheckSessionOnError}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CheckSessionIFrame=void 0;var n=r(0);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.CheckSessionIFrame=function(){function t(e,r,n,o){var s=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];i(this,t),this._callback=e,this._client_id=r,this._url=n,this._interval=o||2e3,this._stopOnError=s;var a=n.indexOf("/",n.indexOf("//")+2);this._frame_origin=n.substr(0,a),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.style.display="none",this._frame.width=0,this._frame.height=0,this._frame.src=n}return t.prototype.load=function t(){var e=this;return new Promise((function(t){e._frame.onload=function(){t()},window.document.body.appendChild(e._frame),e._boundMessageEvent=e._message.bind(e),window.addEventListener("message",e._boundMessageEvent,!1)}))},t.prototype._message=function t(e){e.origin===this._frame_origin&&e.source===this._frame.contentWindow&&("error"===e.data?(n.Log.error("CheckSessionIFrame: error message from check session op iframe"),this._stopOnError&&this.stop()):"changed"===e.data?(n.Log.debug("CheckSessionIFrame: changed message from check session op iframe"),this.stop(),this._callback()):n.Log.debug("CheckSessionIFrame: "+e.data+" message from check session op iframe"))},t.prototype.start=function t(e){var r=this;if(this._session_state!==e){n.Log.debug("CheckSessionIFrame.start"),this.stop(),this._session_state=e;var i=function t(){r._frame.contentWindow.postMessage(r._client_id+" "+r._session_state,r._frame_origin)};i(),this._timer=window.setInterval(i,this._interval)}},t.prototype.stop=function t(){this._session_state=null,this._timer&&(n.Log.debug("CheckSessionIFrame.stop"),window.clearInterval(this._timer),this._timer=null)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TokenRevocationClient=void 0;var n=r(0),i=r(2),o=r(1);function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a="access_token",u="refresh_token";e.TokenRevocationClient=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.XMLHttpRequest,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(s(this,t),!e)throw n.Log.error("TokenRevocationClient.ctor: No settings provided"),new Error("No settings provided.");this._settings=e,this._XMLHttpRequestCtor=r,this._metadataService=new a(this._settings)}return t.prototype.revoke=function t(e,r){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"access_token";if(!e)throw n.Log.error("TokenRevocationClient.revoke: No token provided"),new Error("No token provided.");if(o!==a&&o!=u)throw n.Log.error("TokenRevocationClient.revoke: Invalid token type"),new Error("Invalid token type.");return this._metadataService.getRevocationEndpoint().then((function(t){if(t){n.Log.debug("TokenRevocationClient.revoke: Revoking "+o);var s=i._settings.client_id,a=i._settings.client_secret;return i._revoke(t,s,a,e,o)}if(r)throw n.Log.error("TokenRevocationClient.revoke: Revocation not supported"),new Error("Revocation not supported")}))},t.prototype._revoke=function t(e,r,i,o,s){var a=this;return new Promise((function(t,u){var c=new a._XMLHttpRequestCtor;c.open("POST",e),c.onload=function(){n.Log.debug("TokenRevocationClient.revoke: HTTP response received, status",c.status),200===c.status?t():u(Error(c.statusText+" ("+c.status+")"))},c.onerror=function(){n.Log.debug("TokenRevocationClient.revoke: Network Error."),u("Network Error")};var h="client_id="+encodeURIComponent(r);i&&(h+="&client_secret="+encodeURIComponent(i)),h+="&token_type_hint="+encodeURIComponent(s),h+="&token="+encodeURIComponent(o),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send(h)}))},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CordovaPopupWindow=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.CordovaPopupWindow=function(){function t(e){var r=this;!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._promise=new Promise((function(t,e){r._resolve=t,r._reject=e})),this.features=e.popupWindowFeatures||"location=no,toolbar=no,zoom=no",this.target=e.popupWindowTarget||"_blank",this.redirect_uri=e.startUrl,i.Log.debug("CordovaPopupWindow.ctor: redirect_uri: "+this.redirect_uri)}return t.prototype._isInAppBrowserInstalled=function t(e){return["cordova-plugin-inappbrowser","cordova-plugin-inappbrowser.inappbrowser","org.apache.cordova.inappbrowser"].some((function(t){return e.hasOwnProperty(t)}))},t.prototype.navigate=function t(e){if(e&&e.url){if(!window.cordova)return this._error("cordova is undefined");var r=window.cordova.require("cordova/plugin_list").metadata;if(!1===this._isInAppBrowserInstalled(r))return this._error("InAppBrowser plugin not found");this._popup=cordova.InAppBrowser.open(e.url,this.target,this.features),this._popup?(i.Log.debug("CordovaPopupWindow.navigate: popup successfully created"),this._exitCallbackEvent=this._exitCallback.bind(this),this._loadStartCallbackEvent=this._loadStartCallback.bind(this),this._popup.addEventListener("exit",this._exitCallbackEvent,!1),this._popup.addEventListener("loadstart",this._loadStartCallbackEvent,!1)):this._error("Error opening popup window")}else this._error("No url provided");return this.promise},t.prototype._loadStartCallback=function t(e){0===e.url.indexOf(this.redirect_uri)&&this._success({url:e.url})},t.prototype._exitCallback=function t(e){this._error(e)},t.prototype._success=function t(e){this._cleanup(),i.Log.debug("CordovaPopupWindow: Successful response from cordova popup window"),this._resolve(e)},t.prototype._error=function t(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e))},t.prototype.close=function t(){this._cleanup()},t.prototype._cleanup=function t(){this._popup&&(i.Log.debug("CordovaPopupWindow: cleaning up popup"),this._popup.removeEventListener("exit",this._exitCallbackEvent,!1),this._popup.removeEventListener("loadstart",this._loadStartCallbackEvent,!1),this._popup.close()),this._popup=null},n(t,[{key:"promise",get:function t(){return this._promise}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=r(10),o=r(5),s=r(6),a=r(37),u=r(38),c=r(16),h=r(2),l=r(48),f=r(49),g=r(19),d=r(20),p=r(18),v=r(1),y=r(15),m=r(50);e.default={Version:m.Version,Log:n.Log,OidcClient:i.OidcClient,OidcClientSettings:o.OidcClientSettings,WebStorageStateStore:s.WebStorageStateStore,InMemoryWebStorage:a.InMemoryWebStorage,UserManager:u.UserManager,AccessTokenEvents:c.AccessTokenEvents,MetadataService:h.MetadataService,CordovaPopupNavigator:l.CordovaPopupNavigator,CordovaIFrameNavigator:f.CordovaIFrameNavigator,CheckSessionIFrame:g.CheckSessionIFrame,TokenRevocationClient:d.TokenRevocationClient,SessionMonitor:p.SessionMonitor,Global:v.Global,User:y.User},t.exports=e.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.ClockService=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.prototype.getEpochTime=function t(){return Promise.resolve(Date.now()/1e3|0)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ResponseValidator=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=r(0),o=r(2),s=r(25),a=r(11),u=r(12),c=r(4);function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var l=["nonce","at_hash","iat","nbf","exp","aud","iss","c_hash"];e.ResponseValidator=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.MetadataService,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:s.UserInfoService,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:c.JoseUtil,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:a.TokenClient;if(h(this,t),!e)throw i.Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator"),new Error("settings");this._settings=e,this._metadataService=new r(this._settings),this._userInfoService=new n(this._settings),this._joseUtil=u,this._tokenClient=new l(this._settings)}return t.prototype.validateSigninResponse=function t(e,r){var n=this;return i.Log.debug("ResponseValidator.validateSigninResponse"),this._processSigninParams(e,r).then((function(t){return i.Log.debug("ResponseValidator.validateSigninResponse: state processed"),n._validateTokens(e,t).then((function(t){return i.Log.debug("ResponseValidator.validateSigninResponse: tokens validated"),n._processClaims(e,t).then((function(t){return i.Log.debug("ResponseValidator.validateSigninResponse: claims processed"),t}))}))}))},t.prototype.validateSignoutResponse=function t(e,r){return e.id!==r.state?(i.Log.error("ResponseValidator.validateSignoutResponse: State does not match"),Promise.reject(new Error("State does not match"))):(i.Log.debug("ResponseValidator.validateSignoutResponse: state validated"),r.state=e.data,r.error?(i.Log.warn("ResponseValidator.validateSignoutResponse: Response was error",r.error),Promise.reject(new u.ErrorResponse(r))):Promise.resolve(r))},t.prototype._processSigninParams=function t(e,r){if(e.id!==r.state)return i.Log.error("ResponseValidator._processSigninParams: State does not match"),Promise.reject(new Error("State does not match"));if(!e.client_id)return i.Log.error("ResponseValidator._processSigninParams: No client_id on state"),Promise.reject(new Error("No client_id on state"));if(!e.authority)return i.Log.error("ResponseValidator._processSigninParams: No authority on state"),Promise.reject(new Error("No authority on state"));if(this._settings.authority){if(this._settings.authority&&this._settings.authority!==e.authority)return i.Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state"),Promise.reject(new Error("authority mismatch on settings vs. signin state"))}else this._settings.authority=e.authority;if(this._settings.client_id){if(this._settings.client_id&&this._settings.client_id!==e.client_id)return i.Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state"),Promise.reject(new Error("client_id mismatch on settings vs. signin state"))}else this._settings.client_id=e.client_id;return i.Log.debug("ResponseValidator._processSigninParams: state validated"),r.state=e.data,r.error?(i.Log.warn("ResponseValidator._processSigninParams: Response was error",r.error),Promise.reject(new u.ErrorResponse(r))):e.nonce&&!r.id_token?(i.Log.error("ResponseValidator._processSigninParams: Expecting id_token in response"),Promise.reject(new Error("No id_token in response"))):!e.nonce&&r.id_token?(i.Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response"),Promise.reject(new Error("Unexpected id_token in response"))):e.code_verifier&&!r.code?(i.Log.error("ResponseValidator._processSigninParams: Expecting code in response"),Promise.reject(new Error("No code in response"))):!e.code_verifier&&r.code?(i.Log.error("ResponseValidator._processSigninParams: Not expecting code in response"),Promise.reject(new Error("Unexpected code in response"))):(r.scope||(r.scope=e.scope),Promise.resolve(r))},t.prototype._processClaims=function t(e,r){var n=this;if(r.isOpenIdConnect){if(i.Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims"),r.profile=this._filterProtocolClaims(r.profile),!0!==e.skipUserInfo&&this._settings.loadUserInfo&&r.access_token)return i.Log.debug("ResponseValidator._processClaims: loading user info"),this._userInfoService.getClaims(r.access_token).then((function(t){return i.Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint"),t.sub!==r.profile.sub?(i.Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in id_token"),Promise.reject(new Error("sub from user info endpoint does not match sub in id_token"))):(r.profile=n._mergeClaims(r.profile,t),i.Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:",r.profile),r)}));i.Log.debug("ResponseValidator._processClaims: not loading user info")}else i.Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");return Promise.resolve(r)},t.prototype._mergeClaims=function t(e,r){var i=Object.assign({},e);for(var o in r){var s=r[o];Array.isArray(s)||(s=[s]);for(var a=0;a<s.length;a++){var u=s[a];i[o]?Array.isArray(i[o])?i[o].indexOf(u)<0&&i[o].push(u):i[o]!==u&&("object"===(void 0===u?"undefined":n(u))&&this._settings.mergeClaims?i[o]=this._mergeClaims(i[o],u):i[o]=[i[o],u]):i[o]=u}}return i},t.prototype._filterProtocolClaims=function t(e){i.Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:",e);var r=Object.assign({},e);return this._settings._filterProtocolClaims?(l.forEach((function(t){delete r[t]})),i.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered",r)):i.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered"),r},t.prototype._validateTokens=function t(e,r){return r.code?(i.Log.debug("ResponseValidator._validateTokens: Validating code"),this._processCode(e,r)):r.id_token?r.access_token?(i.Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token"),this._validateIdTokenAndAccessToken(e,r)):(i.Log.debug("ResponseValidator._validateTokens: Validating id_token"),this._validateIdToken(e,r)):(i.Log.debug("ResponseValidator._validateTokens: No code to process or id_token to validate"),Promise.resolve(r))},t.prototype._processCode=function t(e,r){var o=this,s={client_id:e.client_id,client_secret:e.client_secret,code:r.code,redirect_uri:e.redirect_uri,code_verifier:e.code_verifier};return e.extraTokenParams&&"object"===n(e.extraTokenParams)&&Object.assign(s,e.extraTokenParams),this._tokenClient.exchangeCode(s).then((function(t){for(var n in t)r[n]=t[n];return r.id_token?(i.Log.debug("ResponseValidator._processCode: token response successful, processing id_token"),o._validateIdTokenAttributes(e,r)):(i.Log.debug("ResponseValidator._processCode: token response successful, returning response"),r)}))},t.prototype._validateIdTokenAttributes=function t(e,r){var n=this;return this._metadataService.getIssuer().then((function(t){var o=e.client_id,s=n._settings.clockSkew;return i.Log.debug("ResponseValidator._validateIdTokenAttributes: Validaing JWT attributes; using clock skew (in seconds) of: ",s),n._settings.getEpochTime().then((function(a){return n._joseUtil.validateJwtAttributes(r.id_token,t,o,s,a).then((function(t){return e.nonce&&e.nonce!==t.nonce?(i.Log.error("ResponseValidator._validateIdTokenAttributes: Invalid nonce in id_token"),Promise.reject(new Error("Invalid nonce in id_token"))):t.sub?(r.profile=t,r):(i.Log.error("ResponseValidator._validateIdTokenAttributes: No sub present in id_token"),Promise.reject(new Error("No sub present in id_token")))}))}))}))},t.prototype._validateIdTokenAndAccessToken=function t(e,r){var n=this;return this._validateIdToken(e,r).then((function(t){return n._validateAccessToken(t)}))},t.prototype._getSigningKeyForJwt=function t(e){var r=this;return this._metadataService.getSigningKeys().then((function(t){var n=e.header.kid;if(!t)return i.Log.error("ResponseValidator._validateIdToken: No signing keys from metadata"),Promise.reject(new Error("No signing keys from metadata"));i.Log.debug("ResponseValidator._validateIdToken: Received signing keys");var o=void 0;if(n)o=t.filter((function(t){return t.kid===n}))[0];else{if((t=r._filterByAlg(t,e.header.alg)).length>1)return i.Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata"),Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));o=t[0]}return Promise.resolve(o)}))},t.prototype._getSigningKeyForJwtWithSingleRetry=function t(e){var r=this;return this._getSigningKeyForJwt(e).then((function(t){return t?Promise.resolve(t):(r._metadataService.resetSigningKeys(),r._getSigningKeyForJwt(e))}))},t.prototype._validateIdToken=function t(e,r){var n=this;if(!e.nonce)return i.Log.error("ResponseValidator._validateIdToken: No nonce on state"),Promise.reject(new Error("No nonce on state"));var o=this._joseUtil.parseJwt(r.id_token);return o&&o.header&&o.payload?e.nonce!==o.payload.nonce?(i.Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token"),Promise.reject(new Error("Invalid nonce in id_token"))):this._metadataService.getIssuer().then((function(t){return i.Log.debug("ResponseValidator._validateIdToken: Received issuer"),n._getSigningKeyForJwtWithSingleRetry(o).then((function(s){if(!s)return i.Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys"),Promise.reject(new Error("No key matching kid or alg found in signing keys"));var a=e.client_id,u=n._settings.clockSkew;return i.Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ",u),n._joseUtil.validateJwt(r.id_token,s,t,a,u).then((function(){return i.Log.debug("ResponseValidator._validateIdToken: JWT validation successful"),o.payload.sub?(r.profile=o.payload,r):(i.Log.error("ResponseValidator._validateIdToken: No sub present in id_token"),Promise.reject(new Error("No sub present in id_token")))}))}))})):(i.Log.error("ResponseValidator._validateIdToken: Failed to parse id_token",o),Promise.reject(new Error("Failed to parse id_token")))},t.prototype._filterByAlg=function t(e,r){var n=null;if(r.startsWith("RS"))n="RSA";else if(r.startsWith("PS"))n="PS";else{if(!r.startsWith("ES"))return i.Log.debug("ResponseValidator._filterByAlg: alg not supported: ",r),[];n="EC"}return i.Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ",n),e=e.filter((function(t){return t.kty===n})),i.Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ",n,e.length),e},t.prototype._validateAccessToken=function t(e){if(!e.profile)return i.Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token"),Promise.reject(new Error("No profile loaded from id_token"));if(!e.profile.at_hash)return i.Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token"),Promise.reject(new Error("No at_hash in id_token"));if(!e.id_token)return i.Log.error("ResponseValidator._validateAccessToken: No id_token"),Promise.reject(new Error("No id_token"));var r=this._joseUtil.parseJwt(e.id_token);if(!r||!r.header)return i.Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token",r),Promise.reject(new Error("Failed to parse id_token"));var n=r.header.alg;if(!n||5!==n.length)return i.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",n),Promise.reject(new Error("Unsupported alg: "+n));var o=n.substr(2,3);if(!o)return i.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",n,o),Promise.reject(new Error("Unsupported alg: "+n));if(256!==(o=parseInt(o))&&384!==o&&512!==o)return i.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",n,o),Promise.reject(new Error("Unsupported alg: "+n));var s="sha"+o,a=this._joseUtil.hashString(e.access_token,s);if(!a)return i.Log.error("ResponseValidator._validateAccessToken: access_token hash failed:",s),Promise.reject(new Error("Failed to validate at_hash"));var u=a.substr(0,a.length/2),c=this._joseUtil.hexToBase64Url(u);return c!==e.profile.at_hash?(i.Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash",c,e.profile.at_hash),Promise.reject(new Error("Failed to validate at_hash"))):(i.Log.debug("ResponseValidator._validateAccessToken: success"),Promise.resolve(e))},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UserInfoService=void 0;var n=r(7),i=r(2),o=r(0),s=r(4);function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.UserInfoService=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.JsonService,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:s.JoseUtil;if(a(this,t),!e)throw o.Log.error("UserInfoService.ctor: No settings passed"),new Error("settings");this._settings=e,this._jsonService=new r(void 0,void 0,this._getClaimsFromJwt.bind(this)),this._metadataService=new u(this._settings),this._joseUtil=c}return t.prototype.getClaims=function t(e){var r=this;return e?this._metadataService.getUserInfoEndpoint().then((function(t){return o.Log.debug("UserInfoService.getClaims: received userinfo url",t),r._jsonService.getJson(t,e).then((function(t){return o.Log.debug("UserInfoService.getClaims: claims received",t),t}))})):(o.Log.error("UserInfoService.getClaims: No token passed"),Promise.reject(new Error("A token is required")))},t.prototype._getClaimsFromJwt=function t(e){var r=this;try{var n=this._joseUtil.parseJwt(e.responseText);if(!n||!n.header||!n.payload)return o.Log.error("UserInfoService._getClaimsFromJwt: Failed to parse JWT",n),Promise.reject(new Error("Failed to parse id_token"));var i=n.header.kid,s=void 0;switch(this._settings.userInfoJwtIssuer){case"OP":s=this._metadataService.getIssuer();break;case"ANY":s=Promise.resolve(n.payload.iss);break;default:s=Promise.resolve(this._settings.userInfoJwtIssuer)}return s.then((function(t){return o.Log.debug("UserInfoService._getClaimsFromJwt: Received issuer:"+t),r._metadataService.getSigningKeys().then((function(s){if(!s)return o.Log.error("UserInfoService._getClaimsFromJwt: No signing keys from metadata"),Promise.reject(new Error("No signing keys from metadata"));o.Log.debug("UserInfoService._getClaimsFromJwt: Received signing keys");var a=void 0;if(i)a=s.filter((function(t){return t.kid===i}))[0];else{if((s=r._filterByAlg(s,n.header.alg)).length>1)return o.Log.error("UserInfoService._getClaimsFromJwt: No kid found in id_token and more than one key found in metadata"),Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));a=s[0]}if(!a)return o.Log.error("UserInfoService._getClaimsFromJwt: No key matching kid or alg found in signing keys"),Promise.reject(new Error("No key matching kid or alg found in signing keys"));var u=r._settings.client_id,c=r._settings.clockSkew;return o.Log.debug("UserInfoService._getClaimsFromJwt: Validaing JWT; using clock skew (in seconds) of: ",c),r._joseUtil.validateJwt(e.responseText,a,t,u,c,void 0,!0).then((function(){return o.Log.debug("UserInfoService._getClaimsFromJwt: JWT validation successful"),n.payload}))}))}))}catch(t){return o.Log.error("UserInfoService._getClaimsFromJwt: Error parsing JWT response",t.message),void reject(t)}},t.prototype._filterByAlg=function t(e,r){var n=null;if(r.startsWith("RS"))n="RSA";else if(r.startsWith("PS"))n="PS";else{if(!r.startsWith("ES"))return o.Log.debug("UserInfoService._filterByAlg: alg not supported: ",r),[];n="EC"}return o.Log.debug("UserInfoService._filterByAlg: Looking for keys that match kty: ",n),e=e.filter((function(t){return t.kty===n})),o.Log.debug("UserInfoService._filterByAlg: Number of keys that match kty: ",n,e.length),e},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.AllowedSigningAlgs=e.b64tohex=e.hextob64u=e.crypto=e.X509=e.KeyUtil=e.jws=void 0;var n=r(27);e.jws=n.jws,e.KeyUtil=n.KEYUTIL,e.X509=n.X509,e.crypto=n.crypto,e.hextob64u=n.hextob64u,e.b64tohex=n.b64tohex,e.AllowedSigningAlgs=["RS256","RS384","RS512","PS256","PS384","PS512","ES256","ES384","ES512"]},function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n={userAgent:!1},i={};
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(void 0===o)var o={};o.lang={extend:function t(e,r,i){if(!r||!e)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var o=function t(){};if(o.prototype=r.prototype,e.prototype=new o,e.prototype.constructor=e,e.superclass=r.prototype,r.prototype.constructor==Object.prototype.constructor&&(r.prototype.constructor=r),i){var s;for(s in i)e.prototype[s]=i[s];var a=function t(){},u=["toString","valueOf"];try{/MSIE/.test(n.userAgent)&&(a=function t(e,r){for(s=0;s<u.length;s+=1){var n=u[s],i=r[n];"function"==typeof i&&i!=Object.prototype[n]&&(e[n]=i)}})}catch(t){}a(e.prototype,i)}}};
/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var s,a,u,c,h,l,f,g,d,p,v,y=y||(s=Math,u=(a={}).lib={},c=u.Base=function(){function t(){}return{extend:function e(r){t.prototype=this;var n=new t;return r&&n.mixIn(r),n.hasOwnProperty("init")||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function t(){var e=this.extend();return e.init.apply(e,arguments),e},init:function t(){},mixIn:function t(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function t(){return this.init.prototype.extend(this)}}}(),h=u.WordArray=c.extend({init:function t(e,r){e=this.words=e||[],this.sigBytes=null!=r?r:4*e.length},toString:function t(e){return(e||f).stringify(this)},concat:function t(e){var r=this.words,n=e.words,i=this.sigBytes,o=e.sigBytes;if(this.clamp(),i%4)for(var s=0;s<o;s++){var a=n[s>>>2]>>>24-s%4*8&255;r[i+s>>>2]|=a<<24-(i+s)%4*8}else for(s=0;s<o;s+=4)r[i+s>>>2]=n[s>>>2];return this.sigBytes+=o,this},clamp:function t(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=s.ceil(r/4)},clone:function t(){var e=c.clone.call(this);return e.words=this.words.slice(0),e},random:function t(e){for(var r=[],n=0;n<e;n+=4)r.push(4294967296*s.random()|0);return new h.init(r,e)}}),l=a.enc={},f=l.Hex={stringify:function t(e){for(var r=e.words,n=e.sigBytes,i=[],o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;i.push((s>>>4).toString(16)),i.push((15&s).toString(16))}return i.join("")},parse:function t(e){for(var r=e.length,n=[],i=0;i<r;i+=2)n[i>>>3]|=parseInt(e.substr(i,2),16)<<24-i%8*4;return new h.init(n,r/2)}},g=l.Latin1={stringify:function t(e){for(var r=e.words,n=e.sigBytes,i=[],o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;i.push(String.fromCharCode(s))}return i.join("")},parse:function t(e){for(var r=e.length,n=[],i=0;i<r;i++)n[i>>>2]|=(255&e.charCodeAt(i))<<24-i%4*8;return new h.init(n,r)}},d=l.Utf8={stringify:function t(e){try{return decodeURIComponent(escape(g.stringify(e)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function t(e){return g.parse(unescape(encodeURIComponent(e)))}},p=u.BufferedBlockAlgorithm=c.extend({reset:function t(){this._data=new h.init,this._nDataBytes=0},_append:function t(e){"string"==typeof e&&(e=d.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function t(e){var r=this._data,n=r.words,i=r.sigBytes,o=this.blockSize,a=i/(4*o),u=(a=e?s.ceil(a):s.max((0|a)-this._minBufferSize,0))*o,c=s.min(4*u,i);if(u){for(var l=0;l<u;l+=o)this._doProcessBlock(n,l);var f=n.splice(0,u);r.sigBytes-=c}return new h.init(f,c)},clone:function t(){var e=c.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),u.Hasher=p.extend({cfg:c.extend(),init:function t(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function t(){p.reset.call(this),this._doReset()},update:function t(e){return this._append(e),this._process(),this},finalize:function t(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function t(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function t(e){return function(t,r){return new v.HMAC.init(e,r).finalize(t)}}}),v=a.algo={},a);!function(t){var e,r=(e=y).lib,n=r.Base,i=r.WordArray;(e=e.x64={}).Word=n.extend({init:function t(e,r){this.high=e,this.low=r}}),e.WordArray=n.extend({init:function t(e,r){e=this.words=e||[],this.sigBytes=null!=r?r:8*e.length},toX32:function t(){for(var e=this.words,r=e.length,n=[],o=0;o<r;o++){var s=e[o];n.push(s.high),n.push(s.low)}return i.create(n,this.sigBytes)},clone:function t(){for(var e=n.clone.call(this),r=e.words=this.words.slice(0),i=r.length,o=0;o<i;o++)r[o]=r[o].clone();return e}})}(),function(){var t=y,e=t.lib.WordArray;t.enc.Base64={stringify:function t(e){var r=e.words,n=e.sigBytes,i=this._map;e.clamp(),e=[];for(var o=0;o<n;o+=3)for(var s=(r[o>>>2]>>>24-o%4*8&255)<<16|(r[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|r[o+2>>>2]>>>24-(o+2)%4*8&255,a=0;4>a&&o+.75*a<n;a++)e.push(i.charAt(s>>>6*(3-a)&63));if(r=i.charAt(64))for(;e.length%4;)e.push(r);return e.join("")},parse:function t(r){var n=r.length,i=this._map;(o=i.charAt(64))&&(-1!=(o=r.indexOf(o))&&(n=o));for(var o=[],s=0,a=0;a<n;a++)if(a%4){var u=i.indexOf(r.charAt(a-1))<<a%4*2,c=i.indexOf(r.charAt(a))>>>6-a%4*2;o[s>>>2]|=(u|c)<<24-s%4*8,s++}return e.create(o,s)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(t){for(var e=y,r=(i=e.lib).WordArray,n=i.Hasher,i=e.algo,o=[],s=[],a=function t(e){return 4294967296*(e-(0|e))|0},u=2,c=0;64>c;){var h;t:{h=u;for(var l=t.sqrt(h),f=2;f<=l;f++)if(!(h%f)){h=!1;break t}h=!0}h&&(8>c&&(o[c]=a(t.pow(u,.5))),s[c]=a(t.pow(u,1/3)),c++),u++}var g=[];i=i.SHA256=n.extend({_doReset:function t(){this._hash=new r.init(o.slice(0))},_doProcessBlock:function t(e,r){for(var n=this._hash.words,i=n[0],o=n[1],a=n[2],u=n[3],c=n[4],h=n[5],l=n[6],f=n[7],d=0;64>d;d++){if(16>d)g[d]=0|e[r+d];else{var p=g[d-15],v=g[d-2];g[d]=((p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3)+g[d-7]+((v<<15|v>>>17)^(v<<13|v>>>19)^v>>>10)+g[d-16]}p=f+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&h^~c&l)+s[d]+g[d],v=((i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22))+(i&o^i&a^o&a),f=l,l=h,h=c,c=u+p|0,u=a,a=o,o=i,i=p+v|0}n[0]=n[0]+i|0,n[1]=n[1]+o|0,n[2]=n[2]+a|0,n[3]=n[3]+u|0,n[4]=n[4]+c|0,n[5]=n[5]+h|0,n[6]=n[6]+l|0,n[7]=n[7]+f|0},_doFinalize:function e(){var r=this._data,n=r.words,i=8*this._nDataBytes,o=8*r.sigBytes;return n[o>>>5]|=128<<24-o%32,n[14+(o+64>>>9<<4)]=t.floor(i/4294967296),n[15+(o+64>>>9<<4)]=i,r.sigBytes=4*n.length,this._process(),this._hash},clone:function t(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e}});e.SHA256=n._createHelper(i),e.HmacSHA256=n._createHmacHelper(i)}(Math),function(){function t(){return n.create.apply(n,arguments)}for(var e=y,r=e.lib.Hasher,n=(o=e.x64).Word,i=o.WordArray,o=e.algo,s=[t(1116352408,3609767458),t(1899447441,602891725),t(3049323471,3964484399),t(3921009573,2173295548),t(961987163,4081628472),t(1508970993,3053834265),t(2453635748,2937671579),t(2870763221,3664609560),t(3624381080,2734883394),t(310598401,1164996542),t(607225278,1323610764),t(1426881987,3590304994),t(1925078388,4068182383),t(2162078206,991336113),t(2614888103,633803317),t(3248222580,3479774868),t(3835390401,2666613458),t(4022224774,944711139),t(264347078,2341262773),t(604807628,2007800933),t(770255983,1495990901),t(1249150122,1856431235),t(1555081692,3175218132),t(1996064986,2198950837),t(2554220882,3999719339),t(2821834349,766784016),t(2952996808,2566594879),t(3210313671,3203337956),t(3336571891,1034457026),t(3584528711,2466948901),t(113926993,3758326383),t(338241895,168717936),t(666307205,1188179964),t(773529912,1546045734),t(1294757372,1522805485),t(1396182291,2643833823),t(1695183700,2343527390),t(1986661051,1014477480),t(2177026350,1206759142),t(2456956037,344077627),t(2730485921,1290863460),t(2820302411,3158454273),t(3259730800,3505952657),t(3345764771,106217008),t(3516065817,3606008344),t(3600352804,1432725776),t(4094571909,1467031594),t(275423344,851169720),t(430227734,3100823752),t(506948616,1363258195),t(659060556,3750685593),t(883997877,3785050280),t(958139571,3318307427),t(1322822218,3812723403),t(1537002063,2003034995),t(1747873779,3602036899),t(1955562222,1575990012),t(2024104815,1125592928),t(2227730452,2716904306),t(2361852424,442776044),t(2428436474,593698344),t(2756734187,3733110249),t(3204031479,2999351573),t(3329325298,3815920427),t(3391569614,3928383900),t(3515267271,566280711),t(3940187606,3454069534),t(4118630271,4000239992),t(116418474,1914138554),t(174292421,2731055270),t(289380356,3203993006),t(460393269,320620315),t(685471733,587496836),t(852142971,1086792851),t(1017036298,365543100),t(1126000580,2618297676),t(1288033470,3409855158),t(1501505948,4234509866),t(1607167915,987167468),t(1816402316,1246189591)],a=[],u=0;80>u;u++)a[u]=t();o=o.SHA512=r.extend({_doReset:function t(){this._hash=new i.init([new n.init(1779033703,4089235720),new n.init(3144134277,2227873595),new n.init(1013904242,4271175723),new n.init(2773480762,1595750129),new n.init(1359893119,2917565137),new n.init(2600822924,725511199),new n.init(528734635,4215389547),new n.init(1541459225,327033209)])},_doProcessBlock:function t(e,r){for(var n=(f=this._hash.words)[0],i=f[1],o=f[2],u=f[3],c=f[4],h=f[5],l=f[6],f=f[7],g=n.high,d=n.low,p=i.high,v=i.low,y=o.high,m=o.low,_=u.high,S=u.low,b=c.high,w=c.low,F=h.high,E=h.low,x=l.high,A=l.low,k=f.high,P=f.low,C=g,T=d,R=p,I=v,D=y,L=m,N=_,U=S,B=b,O=w,j=F,M=E,H=x,V=A,K=k,q=P,J=0;80>J;J++){var W=a[J];if(16>J)var z=W.high=0|e[r+2*J],Y=W.low=0|e[r+2*J+1];else{z=((Y=(z=a[J-15]).high)>>>1|(G=z.low)<<31)^(Y>>>8|G<<24)^Y>>>7;var G=(G>>>1|Y<<31)^(G>>>8|Y<<24)^(G>>>7|Y<<25),X=((Y=(X=a[J-2]).high)>>>19|($=X.low)<<13)^(Y<<3|$>>>29)^Y>>>6,$=($>>>19|Y<<13)^($<<3|Y>>>29)^($>>>6|Y<<26),Q=(Y=a[J-7]).high,Z=(tt=a[J-16]).high,tt=tt.low;z=(z=(z=z+Q+((Y=G+Y.low)>>>0<G>>>0?1:0))+X+((Y=Y+$)>>>0<$>>>0?1:0))+Z+((Y=Y+tt)>>>0<tt>>>0?1:0);W.high=z,W.low=Y}Q=B&j^~B&H,tt=O&M^~O&V,W=C&R^C&D^R&D;var et=T&I^T&L^I&L,rt=(G=(C>>>28|T<<4)^(C<<30|T>>>2)^(C<<25|T>>>7),X=(T>>>28|C<<4)^(T<<30|C>>>2)^(T<<25|C>>>7),($=s[J]).high),nt=$.low;Z=K+((B>>>14|O<<18)^(B>>>18|O<<14)^(B<<23|O>>>9))+(($=q+((O>>>14|B<<18)^(O>>>18|B<<14)^(O<<23|B>>>9)))>>>0<q>>>0?1:0),K=H,q=V,H=j,V=M,j=B,M=O,B=N+(Z=(Z=(Z=Z+Q+(($=$+tt)>>>0<tt>>>0?1:0))+rt+(($=$+nt)>>>0<nt>>>0?1:0))+z+(($=$+Y)>>>0<Y>>>0?1:0))+((O=U+$|0)>>>0<U>>>0?1:0)|0,N=D,U=L,D=R,L=I,R=C,I=T,C=Z+(W=G+W+((Y=X+et)>>>0<X>>>0?1:0))+((T=$+Y|0)>>>0<$>>>0?1:0)|0}d=n.low=d+T,n.high=g+C+(d>>>0<T>>>0?1:0),v=i.low=v+I,i.high=p+R+(v>>>0<I>>>0?1:0),m=o.low=m+L,o.high=y+D+(m>>>0<L>>>0?1:0),S=u.low=S+U,u.high=_+N+(S>>>0<U>>>0?1:0),w=c.low=w+O,c.high=b+B+(w>>>0<O>>>0?1:0),E=h.low=E+M,h.high=F+j+(E>>>0<M>>>0?1:0),A=l.low=A+V,l.high=x+H+(A>>>0<V>>>0?1:0),P=f.low=P+q,f.high=k+K+(P>>>0<q>>>0?1:0)},_doFinalize:function t(){var e=this._data,r=e.words,n=8*this._nDataBytes,i=8*e.sigBytes;return r[i>>>5]|=128<<24-i%32,r[30+(i+128>>>10<<5)]=Math.floor(n/4294967296),r[31+(i+128>>>10<<5)]=n,e.sigBytes=4*r.length,this._process(),this._hash.toX32()},clone:function t(){var e=r.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:32}),e.SHA512=r._createHelper(o),e.HmacSHA512=r._createHmacHelper(o)}(),function(){var t=y,e=(i=t.x64).Word,r=i.WordArray,n=(i=t.algo).SHA512,i=i.SHA384=n.extend({_doReset:function t(){this._hash=new r.init([new e.init(3418070365,3238371032),new e.init(1654270250,914150663),new e.init(2438529370,812702999),new e.init(355462360,4144912697),new e.init(1731405415,4290775857),new e.init(2394180231,1750603025),new e.init(3675008525,1694076839),new e.init(1203062813,3204075428)])},_doFinalize:function t(){var e=n._doFinalize.call(this);return e.sigBytes-=16,e}});t.SHA384=n._createHelper(i),t.HmacSHA384=n._createHmacHelper(i)}();
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var m,_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function S(t){var e,r,n="";for(e=0;e+3<=t.length;e+=3)r=parseInt(t.substring(e,e+3),16),n+=_.charAt(r>>6)+_.charAt(63&r);for(e+1==t.length?(r=parseInt(t.substring(e,e+1),16),n+=_.charAt(r<<2)):e+2==t.length&&(r=parseInt(t.substring(e,e+2),16),n+=_.charAt(r>>2)+_.charAt((3&r)<<4)),"=";(3&n.length)>0;)n+="=";return n}function b(t){var e,r,n,i="",o=0;for(e=0;e<t.length&&"="!=t.charAt(e);++e)(n=_.indexOf(t.charAt(e)))<0||(0==o?(i+=R(n>>2),r=3&n,o=1):1==o?(i+=R(r<<2|n>>4),r=15&n,o=2):2==o?(i+=R(r),i+=R(n>>2),r=3&n,o=3):(i+=R(r<<2|n>>4),i+=R(15&n),o=0));return 1==o&&(i+=R(r<<2)),i}function w(t){var e,r=b(t),n=new Array;for(e=0;2*e<r.length;++e)n[e]=parseInt(r.substring(2*e,2*e+2),16);return n}function F(t,e,r){null!=t&&("number"==typeof t?this.fromNumber(t,e,r):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}function E(){return new F(null)}"Microsoft Internet Explorer"==n.appName?(F.prototype.am=function x(t,e,r,n,i,o){for(var s=32767&e,a=e>>15;--o>=0;){var u=32767&this[t],c=this[t++]>>15,h=a*u+c*s;i=((u=s*u+((32767&h)<<15)+r[n]+(1073741823&i))>>>30)+(h>>>15)+a*c+(i>>>30),r[n++]=1073741823&u}return i},m=30):"Netscape"!=n.appName?(F.prototype.am=function A(t,e,r,n,i,o){for(;--o>=0;){var s=e*this[t++]+r[n]+i;i=Math.floor(s/67108864),r[n++]=67108863&s}return i},m=26):(F.prototype.am=function k(t,e,r,n,i,o){for(var s=16383&e,a=e>>14;--o>=0;){var u=16383&this[t],c=this[t++]>>14,h=a*u+c*s;i=((u=s*u+((16383&h)<<14)+r[n]+i)>>28)+(h>>14)+a*c,r[n++]=268435455&u}return i},m=28),F.prototype.DB=m,F.prototype.DM=(1<<m)-1,F.prototype.DV=1<<m;F.prototype.FV=Math.pow(2,52),F.prototype.F1=52-m,F.prototype.F2=2*m-52;var P,C,T=new Array;for(P="0".charCodeAt(0),C=0;C<=9;++C)T[P++]=C;for(P="a".charCodeAt(0),C=10;C<36;++C)T[P++]=C;for(P="A".charCodeAt(0),C=10;C<36;++C)T[P++]=C;function R(t){return"0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)}function I(t,e){var r=T[t.charCodeAt(e)];return null==r?-1:r}function D(t){var e=E();return e.fromInt(t),e}function L(t){var e,r=1;return 0!=(e=t>>>16)&&(t=e,r+=16),0!=(e=t>>8)&&(t=e,r+=8),0!=(e=t>>4)&&(t=e,r+=4),0!=(e=t>>2)&&(t=e,r+=2),0!=(e=t>>1)&&(t=e,r+=1),r}function N(t){this.m=t}function U(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}function B(t,e){return t&e}function O(t,e){return t|e}function j(t,e){return t^e}function M(t,e){return t&~e}function H(t){if(0==t)return-1;var e=0;return 0==(65535&t)&&(t>>=16,e+=16),0==(255&t)&&(t>>=8,e+=8),0==(15&t)&&(t>>=4,e+=4),0==(3&t)&&(t>>=2,e+=2),0==(1&t)&&++e,e}function V(t){for(var e=0;0!=t;)t&=t-1,++e;return e}function K(){}function q(t){return t}function J(t){this.r2=E(),this.q3=E(),F.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t),this.m=t}N.prototype.convert=function W(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t},N.prototype.revert=function z(t){return t},N.prototype.reduce=function Y(t){t.divRemTo(this.m,null,t)},N.prototype.mulTo=function G(t,e,r){t.multiplyTo(e,r),this.reduce(r)},N.prototype.sqrTo=function X(t,e){t.squareTo(e),this.reduce(e)},U.prototype.convert=function $(t){var e=E();return t.abs().dlShiftTo(this.m.t,e),e.divRemTo(this.m,null,e),t.s<0&&e.compareTo(F.ZERO)>0&&this.m.subTo(e,e),e},U.prototype.revert=function Q(t){var e=E();return t.copyTo(e),this.reduce(e),e},U.prototype.reduce=function Z(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var r=32767&t[e],n=r*this.mpl+((r*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[r=e+this.m.t]+=this.m.am(0,n,t,e,0,this.m.t);t[r]>=t.DV;)t[r]-=t.DV,t[++r]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)},U.prototype.mulTo=function tt(t,e,r){t.multiplyTo(e,r),this.reduce(r)},U.prototype.sqrTo=function et(t,e){t.squareTo(e),this.reduce(e)},F.prototype.copyTo=function rt(t){for(var e=this.t-1;e>=0;--e)t[e]=this[e];t.t=this.t,t.s=this.s},F.prototype.fromInt=function nt(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0},F.prototype.fromString=function it(t,e){var r;if(16==e)r=4;else if(8==e)r=3;else if(256==e)r=8;else if(2==e)r=1;else if(32==e)r=5;else{if(4!=e)return void this.fromRadix(t,e);r=2}this.t=0,this.s=0;for(var n=t.length,i=!1,o=0;--n>=0;){var s=8==r?255&t[n]:I(t,n);s<0?"-"==t.charAt(n)&&(i=!0):(i=!1,0==o?this[this.t++]=s:o+r>this.DB?(this[this.t-1]|=(s&(1<<this.DB-o)-1)<<o,this[this.t++]=s>>this.DB-o):this[this.t-1]|=s<<o,(o+=r)>=this.DB&&(o-=this.DB))}8==r&&0!=(128&t[0])&&(this.s=-1,o>0&&(this[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),i&&F.ZERO.subTo(this,this)},F.prototype.clamp=function ot(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t},F.prototype.dlShiftTo=function st(t,e){var r;for(r=this.t-1;r>=0;--r)e[r+t]=this[r];for(r=t-1;r>=0;--r)e[r]=0;e.t=this.t+t,e.s=this.s},F.prototype.drShiftTo=function at(t,e){for(var r=t;r<this.t;++r)e[r-t]=this[r];e.t=Math.max(this.t-t,0),e.s=this.s},F.prototype.lShiftTo=function ut(t,e){var r,n=t%this.DB,i=this.DB-n,o=(1<<i)-1,s=Math.floor(t/this.DB),a=this.s<<n&this.DM;for(r=this.t-1;r>=0;--r)e[r+s+1]=this[r]>>i|a,a=(this[r]&o)<<n;for(r=s-1;r>=0;--r)e[r]=0;e[s]=a,e.t=this.t+s+1,e.s=this.s,e.clamp()},F.prototype.rShiftTo=function ct(t,e){e.s=this.s;var r=Math.floor(t/this.DB);if(r>=this.t)e.t=0;else{var n=t%this.DB,i=this.DB-n,o=(1<<n)-1;e[0]=this[r]>>n;for(var s=r+1;s<this.t;++s)e[s-r-1]|=(this[s]&o)<<i,e[s-r]=this[s]>>n;n>0&&(e[this.t-r-1]|=(this.s&o)<<i),e.t=this.t-r,e.clamp()}},F.prototype.subTo=function ht(t,e){for(var r=0,n=0,i=Math.min(t.t,this.t);r<i;)n+=this[r]-t[r],e[r++]=n&this.DM,n>>=this.DB;if(t.t<this.t){for(n-=t.s;r<this.t;)n+=this[r],e[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<t.t;)n-=t[r],e[r++]=n&this.DM,n>>=this.DB;n-=t.s}e.s=n<0?-1:0,n<-1?e[r++]=this.DV+n:n>0&&(e[r++]=n),e.t=r,e.clamp()},F.prototype.multiplyTo=function lt(t,e){var r=this.abs(),n=t.abs(),i=r.t;for(e.t=i+n.t;--i>=0;)e[i]=0;for(i=0;i<n.t;++i)e[i+r.t]=r.am(0,n[i],e,i,0,r.t);e.s=0,e.clamp(),this.s!=t.s&&F.ZERO.subTo(e,e)},F.prototype.squareTo=function ft(t){for(var e=this.abs(),r=t.t=2*e.t;--r>=0;)t[r]=0;for(r=0;r<e.t-1;++r){var n=e.am(r,e[r],t,2*r,0,1);(t[r+e.t]+=e.am(r+1,2*e[r],t,2*r+1,n,e.t-r-1))>=e.DV&&(t[r+e.t]-=e.DV,t[r+e.t+1]=1)}t.t>0&&(t[t.t-1]+=e.am(r,e[r],t,2*r,0,1)),t.s=0,t.clamp()},F.prototype.divRemTo=function gt(t,e,r){var n=t.abs();if(!(n.t<=0)){var i=this.abs();if(i.t<n.t)return null!=e&&e.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=E());var o=E(),s=this.s,a=t.s,u=this.DB-L(n[n.t-1]);u>0?(n.lShiftTo(u,o),i.lShiftTo(u,r)):(n.copyTo(o),i.copyTo(r));var c=o.t,h=o[c-1];if(0!=h){var l=h*(1<<this.F1)+(c>1?o[c-2]>>this.F2:0),f=this.FV/l,g=(1<<this.F1)/l,d=1<<this.F2,p=r.t,v=p-c,y=null==e?E():e;for(o.dlShiftTo(v,y),r.compareTo(y)>=0&&(r[r.t++]=1,r.subTo(y,r)),F.ONE.dlShiftTo(c,y),y.subTo(o,o);o.t<c;)o[o.t++]=0;for(;--v>=0;){var m=r[--p]==h?this.DM:Math.floor(r[p]*f+(r[p-1]+d)*g);if((r[p]+=o.am(0,m,r,v,0,c))<m)for(o.dlShiftTo(v,y),r.subTo(y,r);r[p]<--m;)r.subTo(y,r)}null!=e&&(r.drShiftTo(c,e),s!=a&&F.ZERO.subTo(e,e)),r.t=c,r.clamp(),u>0&&r.rShiftTo(u,r),s<0&&F.ZERO.subTo(r,r)}}},F.prototype.invDigit=function dt(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var e=3&t;return(e=(e=(e=(e=e*(2-(15&t)*e)&15)*(2-(255&t)*e)&255)*(2-((65535&t)*e&65535))&65535)*(2-t*e%this.DV)%this.DV)>0?this.DV-e:-e},F.prototype.isEven=function pt(){return 0==(this.t>0?1&this[0]:this.s)},F.prototype.exp=function vt(t,e){if(t>4294967295||t<1)return F.ONE;var r=E(),n=E(),i=e.convert(this),o=L(t)-1;for(i.copyTo(r);--o>=0;)if(e.sqrTo(r,n),(t&1<<o)>0)e.mulTo(n,i,r);else{var s=r;r=n,n=s}return e.revert(r)},F.prototype.toString=function yt(t){if(this.s<0)return"-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else{if(4!=t)return this.toRadix(t);e=2}var r,n=(1<<e)-1,i=!1,o="",s=this.t,a=this.DB-s*this.DB%e;if(s-- >0)for(a<this.DB&&(r=this[s]>>a)>0&&(i=!0,o=R(r));s>=0;)a<e?(r=(this[s]&(1<<a)-1)<<e-a,r|=this[--s]>>(a+=this.DB-e)):(r=this[s]>>(a-=e)&n,a<=0&&(a+=this.DB,--s)),r>0&&(i=!0),i&&(o+=R(r));return i?o:"0"},F.prototype.negate=function mt(){var t=E();return F.ZERO.subTo(this,t),t},F.prototype.abs=function _t(){return this.s<0?this.negate():this},F.prototype.compareTo=function St(t){var e=this.s-t.s;if(0!=e)return e;var r=this.t;if(0!=(e=r-t.t))return this.s<0?-e:e;for(;--r>=0;)if(0!=(e=this[r]-t[r]))return e;return 0},F.prototype.bitLength=function bt(){return this.t<=0?0:this.DB*(this.t-1)+L(this[this.t-1]^this.s&this.DM)},F.prototype.mod=function wt(t){var e=E();return this.abs().divRemTo(t,null,e),this.s<0&&e.compareTo(F.ZERO)>0&&t.subTo(e,e),e},F.prototype.modPowInt=function Ft(t,e){var r;return r=t<256||e.isEven()?new N(e):new U(e),this.exp(t,r)},F.ZERO=D(0),F.ONE=D(1),K.prototype.convert=q,K.prototype.revert=q,K.prototype.mulTo=function Et(t,e,r){t.multiplyTo(e,r)},K.prototype.sqrTo=function xt(t,e){t.squareTo(e)},J.prototype.convert=function At(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var e=E();return t.copyTo(e),this.reduce(e),e},J.prototype.revert=function kt(t){return t},J.prototype.reduce=function Pt(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);t.compareTo(this.m)>=0;)t.subTo(this.m,t)},J.prototype.mulTo=function Ct(t,e,r){t.multiplyTo(e,r),this.reduce(r)},J.prototype.sqrTo=function Tt(t,e){t.squareTo(e),this.reduce(e)};var Rt=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],It=(1<<26)/Rt[Rt.length-1];
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Dt(){this.i=0,this.j=0,this.S=new Array}F.prototype.chunkSize=function Lt(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},F.prototype.toRadix=function Nt(t){if(null==t&&(t=10),0==this.signum()||t<2||t>36)return"0";var e=this.chunkSize(t),r=Math.pow(t,e),n=D(r),i=E(),o=E(),s="";for(this.divRemTo(n,i,o);i.signum()>0;)s=(r+o.intValue()).toString(t).substr(1)+s,i.divRemTo(n,i,o);return o.intValue().toString(t)+s},F.prototype.fromRadix=function Ut(t,e){this.fromInt(0),null==e&&(e=10);for(var r=this.chunkSize(e),n=Math.pow(e,r),i=!1,o=0,s=0,a=0;a<t.length;++a){var u=I(t,a);u<0?"-"==t.charAt(a)&&0==this.signum()&&(i=!0):(s=e*s+u,++o>=r&&(this.dMultiply(n),this.dAddOffset(s,0),o=0,s=0))}o>0&&(this.dMultiply(Math.pow(e,o)),this.dAddOffset(s,0)),i&&F.ZERO.subTo(this,this)},F.prototype.fromNumber=function Bt(t,e,r){if("number"==typeof e)if(t<2)this.fromInt(1);else for(this.fromNumber(t,r),this.testBit(t-1)||this.bitwiseTo(F.ONE.shiftLeft(t-1),O,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(e);)this.dAddOffset(2,0),this.bitLength()>t&&this.subTo(F.ONE.shiftLeft(t-1),this);else{var n=new Array,i=7&t;n.length=1+(t>>3),e.nextBytes(n),i>0?n[0]&=(1<<i)-1:n[0]=0,this.fromString(n,256)}},F.prototype.bitwiseTo=function Ot(t,e,r){var n,i,o=Math.min(t.t,this.t);for(n=0;n<o;++n)r[n]=e(this[n],t[n]);if(t.t<this.t){for(i=t.s&this.DM,n=o;n<this.t;++n)r[n]=e(this[n],i);r.t=this.t}else{for(i=this.s&this.DM,n=o;n<t.t;++n)r[n]=e(i,t[n]);r.t=t.t}r.s=e(this.s,t.s),r.clamp()},F.prototype.changeBit=function jt(t,e){var r=F.ONE.shiftLeft(t);return this.bitwiseTo(r,e,r),r},F.prototype.addTo=function Mt(t,e){for(var r=0,n=0,i=Math.min(t.t,this.t);r<i;)n+=this[r]+t[r],e[r++]=n&this.DM,n>>=this.DB;if(t.t<this.t){for(n+=t.s;r<this.t;)n+=this[r],e[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<t.t;)n+=t[r],e[r++]=n&this.DM,n>>=this.DB;n+=t.s}e.s=n<0?-1:0,n>0?e[r++]=n:n<-1&&(e[r++]=this.DV+n),e.t=r,e.clamp()},F.prototype.dMultiply=function Ht(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()},F.prototype.dAddOffset=function Vt(t,e){if(0!=t){for(;this.t<=e;)this[this.t++]=0;for(this[e]+=t;this[e]>=this.DV;)this[e]-=this.DV,++e>=this.t&&(this[this.t++]=0),++this[e]}},F.prototype.multiplyLowerTo=function Kt(t,e,r){var n,i=Math.min(this.t+t.t,e);for(r.s=0,r.t=i;i>0;)r[--i]=0;for(n=r.t-this.t;i<n;++i)r[i+this.t]=this.am(0,t[i],r,i,0,this.t);for(n=Math.min(t.t,e);i<n;++i)this.am(0,t[i],r,i,0,e-i);r.clamp()},F.prototype.multiplyUpperTo=function qt(t,e,r){--e;var n=r.t=this.t+t.t-e;for(r.s=0;--n>=0;)r[n]=0;for(n=Math.max(e-this.t,0);n<t.t;++n)r[this.t+n-e]=this.am(e-n,t[n],r,0,0,this.t+n-e);r.clamp(),r.drShiftTo(1,r)},F.prototype.modInt=function Jt(t){if(t<=0)return 0;var e=this.DV%t,r=this.s<0?t-1:0;if(this.t>0)if(0==e)r=this[0]%t;else for(var n=this.t-1;n>=0;--n)r=(e*r+this[n])%t;return r},F.prototype.millerRabin=function Wt(t){var e=this.subtract(F.ONE),r=e.getLowestSetBit();if(r<=0)return!1;var n=e.shiftRight(r);(t=t+1>>1)>Rt.length&&(t=Rt.length);for(var i=E(),o=0;o<t;++o){i.fromInt(Rt[Math.floor(Math.random()*Rt.length)]);var s=i.modPow(n,this);if(0!=s.compareTo(F.ONE)&&0!=s.compareTo(e)){for(var a=1;a++<r&&0!=s.compareTo(e);)if(0==(s=s.modPowInt(2,this)).compareTo(F.ONE))return!1;if(0!=s.compareTo(e))return!1}}return!0},F.prototype.clone=
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function zt(){var t=E();return this.copyTo(t),t},F.prototype.intValue=function Yt(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},F.prototype.byteValue=function Gt(){return 0==this.t?this.s:this[0]<<24>>24},F.prototype.shortValue=function Xt(){return 0==this.t?this.s:this[0]<<16>>16},F.prototype.signum=function $t(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},F.prototype.toByteArray=function Qt(){var t=this.t,e=new Array;e[0]=this.s;var r,n=this.DB-t*this.DB%8,i=0;if(t-- >0)for(n<this.DB&&(r=this[t]>>n)!=(this.s&this.DM)>>n&&(e[i++]=r|this.s<<this.DB-n);t>=0;)n<8?(r=(this[t]&(1<<n)-1)<<8-n,r|=this[--t]>>(n+=this.DB-8)):(r=this[t]>>(n-=8)&255,n<=0&&(n+=this.DB,--t)),0!=(128&r)&&(r|=-256),0==i&&(128&this.s)!=(128&r)&&++i,(i>0||r!=this.s)&&(e[i++]=r);return e},F.prototype.equals=function Zt(t){return 0==this.compareTo(t)},F.prototype.min=function te(t){return this.compareTo(t)<0?this:t},F.prototype.max=function ee(t){return this.compareTo(t)>0?this:t},F.prototype.and=function re(t){var e=E();return this.bitwiseTo(t,B,e),e},F.prototype.or=function ne(t){var e=E();return this.bitwiseTo(t,O,e),e},F.prototype.xor=function ie(t){var e=E();return this.bitwiseTo(t,j,e),e},F.prototype.andNot=function oe(t){var e=E();return this.bitwiseTo(t,M,e),e},F.prototype.not=function se(){for(var t=E(),e=0;e<this.t;++e)t[e]=this.DM&~this[e];return t.t=this.t,t.s=~this.s,t},F.prototype.shiftLeft=function ae(t){var e=E();return t<0?this.rShiftTo(-t,e):this.lShiftTo(t,e),e},F.prototype.shiftRight=function ue(t){var e=E();return t<0?this.lShiftTo(-t,e):this.rShiftTo(t,e),e},F.prototype.getLowestSetBit=function ce(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+H(this[t]);return this.s<0?this.t*this.DB:-1},F.prototype.bitCount=function he(){for(var t=0,e=this.s&this.DM,r=0;r<this.t;++r)t+=V(this[r]^e);return t},F.prototype.testBit=function le(t){var e=Math.floor(t/this.DB);return e>=this.t?0!=this.s:0!=(this[e]&1<<t%this.DB)},F.prototype.setBit=function fe(t){return this.changeBit(t,O)},F.prototype.clearBit=function ge(t){return this.changeBit(t,M)},F.prototype.flipBit=function de(t){return this.changeBit(t,j)},F.prototype.add=function pe(t){var e=E();return this.addTo(t,e),e},F.prototype.subtract=function ve(t){var e=E();return this.subTo(t,e),e},F.prototype.multiply=function ye(t){var e=E();return this.multiplyTo(t,e),e},F.prototype.divide=function me(t){var e=E();return this.divRemTo(t,e,null),e},F.prototype.remainder=function _e(t){var e=E();return this.divRemTo(t,null,e),e},F.prototype.divideAndRemainder=function Se(t){var e=E(),r=E();return this.divRemTo(t,e,r),new Array(e,r)},F.prototype.modPow=function be(t,e){var r,n,i=t.bitLength(),o=D(1);if(i<=0)return o;r=i<18?1:i<48?3:i<144?4:i<768?5:6,n=i<8?new N(e):e.isEven()?new J(e):new U(e);var s=new Array,a=3,u=r-1,c=(1<<r)-1;if(s[1]=n.convert(this),r>1){var h=E();for(n.sqrTo(s[1],h);a<=c;)s[a]=E(),n.mulTo(h,s[a-2],s[a]),a+=2}var l,f,g=t.t-1,d=!0,p=E();for(i=L(t[g])-1;g>=0;){for(i>=u?l=t[g]>>i-u&c:(l=(t[g]&(1<<i+1)-1)<<u-i,g>0&&(l|=t[g-1]>>this.DB+i-u)),a=r;0==(1&l);)l>>=1,--a;if((i-=a)<0&&(i+=this.DB,--g),d)s[l].copyTo(o),d=!1;else{for(;a>1;)n.sqrTo(o,p),n.sqrTo(p,o),a-=2;a>0?n.sqrTo(o,p):(f=o,o=p,p=f),n.mulTo(p,s[l],o)}for(;g>=0&&0==(t[g]&1<<i);)n.sqrTo(o,p),f=o,o=p,p=f,--i<0&&(i=this.DB-1,--g)}return n.revert(o)},F.prototype.modInverse=function we(t){var e=t.isEven();if(this.isEven()&&e||0==t.signum())return F.ZERO;for(var r=t.clone(),n=this.clone(),i=D(1),o=D(0),s=D(0),a=D(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),e?(i.isEven()&&o.isEven()||(i.addTo(this,i),o.subTo(t,o)),i.rShiftTo(1,i)):o.isEven()||o.subTo(t,o),o.rShiftTo(1,o);for(;n.isEven();)n.rShiftTo(1,n),e?(s.isEven()&&a.isEven()||(s.addTo(this,s),a.subTo(t,a)),s.rShiftTo(1,s)):a.isEven()||a.subTo(t,a),a.rShiftTo(1,a);r.compareTo(n)>=0?(r.subTo(n,r),e&&i.subTo(s,i),o.subTo(a,o)):(n.subTo(r,n),e&&s.subTo(i,s),a.subTo(o,a))}return 0!=n.compareTo(F.ONE)?F.ZERO:a.compareTo(t)>=0?a.subtract(t):a.signum()<0?(a.addTo(t,a),a.signum()<0?a.add(t):a):a},F.prototype.pow=function Fe(t){return this.exp(t,new K)},F.prototype.gcd=function Ee(t){var e=this.s<0?this.negate():this.clone(),r=t.s<0?t.negate():t.clone();if(e.compareTo(r)<0){var n=e;e=r,r=n}var i=e.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)return e;for(i<o&&(o=i),o>0&&(e.rShiftTo(o,e),r.rShiftTo(o,r));e.signum()>0;)(i=e.getLowestSetBit())>0&&e.rShiftTo(i,e),(i=r.getLowestSetBit())>0&&r.rShiftTo(i,r),e.compareTo(r)>=0?(e.subTo(r,e),e.rShiftTo(1,e)):(r.subTo(e,r),r.rShiftTo(1,r));return o>0&&r.lShiftTo(o,r),r},F.prototype.isProbablePrime=function xe(t){var e,r=this.abs();if(1==r.t&&r[0]<=Rt[Rt.length-1]){for(e=0;e<Rt.length;++e)if(r[0]==Rt[e])return!0;return!1}if(r.isEven())return!1;for(e=1;e<Rt.length;){for(var n=Rt[e],i=e+1;i<Rt.length&&n<It;)n*=Rt[i++];for(n=r.modInt(n);e<i;)if(n%Rt[e++]==0)return!1}return r.millerRabin(t)},F.prototype.square=function Ae(){var t=E();return this.squareTo(t),t},Dt.prototype.init=function ke(t){var e,r,n;for(e=0;e<256;++e)this.S[e]=e;for(r=0,e=0;e<256;++e)r=r+this.S[e]+t[e%t.length]&255,n=this.S[e],this.S[e]=this.S[r],this.S[r]=n;this.i=0,this.j=0},Dt.prototype.next=function Pe(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]};var Ce,Te,Re;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */function Ie(){!function t(e){Te[Re++]^=255&e,Te[Re++]^=e>>8&255,Te[Re++]^=e>>16&255,Te[Re++]^=e>>24&255,Re>=256&&(Re-=256)}((new Date).getTime())}if(null==Te){var De;if(Te=new Array,Re=0,void 0!==i&&(void 0!==i.crypto||void 0!==i.msCrypto)){var Le=i.crypto||i.msCrypto;if(Le.getRandomValues){var Ne=new Uint8Array(32);for(Le.getRandomValues(Ne),De=0;De<32;++De)Te[Re++]=Ne[De]}else if("Netscape"==n.appName&&n.appVersion<"5"){var Ue=i.crypto.random(32);for(De=0;De<Ue.length;++De)Te[Re++]=255&Ue.charCodeAt(De)}}for(;Re<256;)De=Math.floor(65536*Math.random()),Te[Re++]=De>>>8,Te[Re++]=255&De;Re=0,Ie()}function Be(){if(null==Ce){for(Ie(),(Ce=function t(){return new Dt}()).init(Te),Re=0;Re<Te.length;++Re)Te[Re]=0;Re=0}return Ce.next()}function Oe(){}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function je(t,e){return new F(t,e)}function Me(t,e,r){for(var n="",i=0;n.length<e;)n+=r(String.fromCharCode.apply(String,t.concat([(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i]))),i+=1;return n}function He(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Ve(t,e){this.x=e,this.q=t}function Ke(t,e,r,n){this.curve=t,this.x=e,this.y=r,this.z=null==n?F.ONE:n,this.zinv=null}function qe(t,e,r){this.q=t,this.a=this.fromBigInteger(e),this.b=this.fromBigInteger(r),this.infinity=new Ke(this,null,null)}Oe.prototype.nextBytes=function Je(t){var e;for(e=0;e<t.length;++e)t[e]=Be()},He.prototype.doPublic=function We(t){return t.modPowInt(this.e,this.n)},He.prototype.setPublic=function ze(t,e){if(this.isPublic=!0,this.isPrivate=!1,"string"!=typeof t)this.n=t,this.e=e;else{if(!(null!=t&&null!=e&&t.length>0&&e.length>0))throw"Invalid RSA public key";this.n=je(t,16),this.e=parseInt(e,16)}},He.prototype.encrypt=function Ye(t){var e=function r(t,e){if(e<t.length+11)throw"Message too long for RSA";for(var r=new Array,n=t.length-1;n>=0&&e>0;){var i=t.charCodeAt(n--);i<128?r[--e]=i:i>127&&i<2048?(r[--e]=63&i|128,r[--e]=i>>6|192):(r[--e]=63&i|128,r[--e]=i>>6&63|128,r[--e]=i>>12|224)}r[--e]=0;for(var o=new Oe,s=new Array;e>2;){for(s[0]=0;0==s[0];)o.nextBytes(s);r[--e]=s[0]}return r[--e]=2,r[--e]=0,new F(r)}(t,this.n.bitLength()+7>>3);if(null==e)return null;var n=this.doPublic(e);if(null==n)return null;var i=n.toString(16);return 0==(1&i.length)?i:"0"+i},He.prototype.encryptOAEP=function Ge(t,e,r){var n=function i(t,e,r,n){var i=br.crypto.MessageDigest,o=br.crypto.Util,s=null;if(r||(r="sha1"),"string"==typeof r&&(s=i.getCanonicalAlgName(r),n=i.getHashLength(s),r=function t(e){return Nr(o.hashHex(Ur(e),s))}),t.length+2*n+2>e)throw"Message too long for RSA";var a,u="";for(a=0;a<e-t.length-2*n-2;a+=1)u+="\0";var c=r("")+u+""+t,h=new Array(n);(new Oe).nextBytes(h);var l=Me(h,c.length,r),f=[];for(a=0;a<c.length;a+=1)f[a]=c.charCodeAt(a)^l.charCodeAt(a);var g=Me(f,h.length,r),d=[0];for(a=0;a<h.length;a+=1)d[a+1]=h[a]^g.charCodeAt(a);return new F(d.concat(f))}(t,this.n.bitLength()+7>>3,e,r);if(null==n)return null;var o=this.doPublic(n);if(null==o)return null;var s=o.toString(16);return 0==(1&s.length)?s:"0"+s},He.prototype.type="RSA",Ve.prototype.equals=function Xe(t){return t==this||this.q.equals(t.q)&&this.x.equals(t.x)},Ve.prototype.toBigInteger=function $e(){return this.x},Ve.prototype.negate=function Qe(){return new Ve(this.q,this.x.negate().mod(this.q))},Ve.prototype.add=function Ze(t){return new Ve(this.q,this.x.add(t.toBigInteger()).mod(this.q))},Ve.prototype.subtract=function tr(t){return new Ve(this.q,this.x.subtract(t.toBigInteger()).mod(this.q))},Ve.prototype.multiply=function er(t){return new Ve(this.q,this.x.multiply(t.toBigInteger()).mod(this.q))},Ve.prototype.square=function rr(){return new Ve(this.q,this.x.square().mod(this.q))},Ve.prototype.divide=function nr(t){return new Ve(this.q,this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))},Ke.prototype.getX=function ir(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))},Ke.prototype.getY=function or(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))},Ke.prototype.equals=function sr(t){return t==this||(this.isInfinity()?t.isInfinity():t.isInfinity()?this.isInfinity():!!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(F.ZERO)&&t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(F.ZERO))},Ke.prototype.isInfinity=function ar(){return null==this.x&&null==this.y||this.z.equals(F.ZERO)&&!this.y.toBigInteger().equals(F.ZERO)},Ke.prototype.negate=function ur(){return new Ke(this.curve,this.x,this.y.negate(),this.z)},Ke.prototype.add=function cr(t){if(this.isInfinity())return t;if(t.isInfinity())return this;var e=t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q),r=t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q);if(F.ZERO.equals(r))return F.ZERO.equals(e)?this.twice():this.curve.getInfinity();var n=new F("3"),i=this.x.toBigInteger(),o=this.y.toBigInteger(),s=(t.x.toBigInteger(),t.y.toBigInteger(),r.square()),a=s.multiply(r),u=i.multiply(s),c=e.square().multiply(this.z),h=c.subtract(u.shiftLeft(1)).multiply(t.z).subtract(a).multiply(r).mod(this.curve.q),l=u.multiply(n).multiply(e).subtract(o.multiply(a)).subtract(c.multiply(e)).multiply(t.z).add(e.multiply(a)).mod(this.curve.q),f=a.multiply(this.z).multiply(t.z).mod(this.curve.q);return new Ke(this.curve,this.curve.fromBigInteger(h),this.curve.fromBigInteger(l),f)},Ke.prototype.twice=function hr(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var t=new F("3"),e=this.x.toBigInteger(),r=this.y.toBigInteger(),n=r.multiply(this.z),i=n.multiply(r).mod(this.curve.q),o=this.curve.a.toBigInteger(),s=e.square().multiply(t);F.ZERO.equals(o)||(s=s.add(this.z.square().multiply(o)));var a=(s=s.mod(this.curve.q)).square().subtract(e.shiftLeft(3).multiply(i)).shiftLeft(1).multiply(n).mod(this.curve.q),u=s.multiply(t).multiply(e).subtract(i.shiftLeft(1)).shiftLeft(2).multiply(i).subtract(s.square().multiply(s)).mod(this.curve.q),c=n.square().multiply(n).shiftLeft(3).mod(this.curve.q);return new Ke(this.curve,this.curve.fromBigInteger(a),this.curve.fromBigInteger(u),c)},Ke.prototype.multiply=function lr(t){if(this.isInfinity())return this;if(0==t.signum())return this.curve.getInfinity();var e,r=t,n=r.multiply(new F("3")),i=this.negate(),o=this,s=this.curve.q.subtract(t),a=s.multiply(new F("3")),u=new Ke(this.curve,this.x,this.y),c=u.negate();for(e=n.bitLength()-2;e>0;--e){o=o.twice();var h=n.testBit(e);h!=r.testBit(e)&&(o=o.add(h?this:i))}for(e=a.bitLength()-2;e>0;--e){u=u.twice();var l=a.testBit(e);l!=s.testBit(e)&&(u=u.add(l?u:c))}return o},Ke.prototype.multiplyTwo=function fr(t,e,r){var n;n=t.bitLength()>r.bitLength()?t.bitLength()-1:r.bitLength()-1;for(var i=this.curve.getInfinity(),o=this.add(e);n>=0;)i=i.twice(),t.testBit(n)?i=r.testBit(n)?i.add(o):i.add(this):r.testBit(n)&&(i=i.add(e)),--n;return i},qe.prototype.getQ=function gr(){return this.q},qe.prototype.getA=function dr(){return this.a},qe.prototype.getB=function pr(){return this.b},qe.prototype.equals=function vr(t){return t==this||this.q.equals(t.q)&&this.a.equals(t.a)&&this.b.equals(t.b)},qe.prototype.getInfinity=function yr(){return this.infinity},qe.prototype.fromBigInteger=function mr(t){return new Ve(this.q,t)},qe.prototype.decodePointHex=function _r(t){switch(parseInt(t.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var e=(t.length-2)/2,r=t.substr(2,e),n=t.substr(e+2,e);return new Ke(this,this.fromBigInteger(new F(r,16)),this.fromBigInteger(new F(n,16)));default:return null}},
/*! (c) Stefan Thomas | https://github.com/bitcoinjs/bitcoinjs-lib
 */
Ve.prototype.getByteLength=function(){return Math.floor((this.toBigInteger().bitLength()+7)/8)},Ke.prototype.getEncoded=function(t){var e=function t(e,r){var n=e.toByteArrayUnsigned();if(r<n.length)n=n.slice(n.length-r);else for(;r>n.length;)n.unshift(0);return n},r=this.getX().toBigInteger(),n=this.getY().toBigInteger(),i=e(r,32);return t?n.isEven()?i.unshift(2):i.unshift(3):(i.unshift(4),i=i.concat(e(n,32))),i},Ke.decodeFrom=function(t,e){e[0];var r=e.length-1,n=e.slice(1,1+r/2),i=e.slice(1+r/2,1+r);n.unshift(0),i.unshift(0);var o=new F(n),s=new F(i);return new Ke(t,t.fromBigInteger(o),t.fromBigInteger(s))},Ke.decodeFromHex=function(t,e){e.substr(0,2);var r=e.length-2,n=e.substr(2,r/2),i=e.substr(2+r/2,r/2),o=new F(n,16),s=new F(i,16);return new Ke(t,t.fromBigInteger(o),t.fromBigInteger(s))},Ke.prototype.add2D=function(t){if(this.isInfinity())return t;if(t.isInfinity())return this;if(this.x.equals(t.x))return this.y.equals(t.y)?this.twice():this.curve.getInfinity();var e=t.x.subtract(this.x),r=t.y.subtract(this.y).divide(e),n=r.square().subtract(this.x).subtract(t.x),i=r.multiply(this.x.subtract(n)).subtract(this.y);return new Ke(this.curve,n,i)},Ke.prototype.twice2D=function(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var t=this.curve.fromBigInteger(F.valueOf(2)),e=this.curve.fromBigInteger(F.valueOf(3)),r=this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(t)),n=r.square().subtract(this.x.multiply(t)),i=r.multiply(this.x.subtract(n)).subtract(this.y);return new Ke(this.curve,n,i)},Ke.prototype.multiply2D=function(t){if(this.isInfinity())return this;if(0==t.signum())return this.curve.getInfinity();var e,r=t,n=r.multiply(new F("3")),i=this.negate(),o=this;for(e=n.bitLength()-2;e>0;--e){o=o.twice();var s=n.testBit(e);s!=r.testBit(e)&&(o=o.add2D(s?this:i))}return o},Ke.prototype.isOnCurve=function(){var t=this.getX().toBigInteger(),e=this.getY().toBigInteger(),r=this.curve.getA().toBigInteger(),n=this.curve.getB().toBigInteger(),i=this.curve.getQ(),o=e.multiply(e).mod(i),s=t.multiply(t).multiply(t).add(r.multiply(t)).add(n).mod(i);return o.equals(s)},Ke.prototype.toString=function(){return"("+this.getX().toBigInteger().toString()+","+this.getY().toBigInteger().toString()+")"},Ke.prototype.validate=function(){var t=this.curve.getQ();if(this.isInfinity())throw new Error("Point is at infinity.");var e=this.getX().toBigInteger(),r=this.getY().toBigInteger();if(e.compareTo(F.ONE)<0||e.compareTo(t.subtract(F.ONE))>0)throw new Error("x coordinate out of bounds");if(r.compareTo(F.ONE)<0||r.compareTo(t.subtract(F.ONE))>0)throw new Error("y coordinate out of bounds");if(!this.isOnCurve())throw new Error("Point is not on the curve.");if(this.multiply(t).isInfinity())throw new Error("Point is not a scalar multiple of G.");return!0};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var Sr=function(){var t=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))',"g"),e=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),n={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};function i(t,e,r){return e?n[e]:String.fromCharCode(parseInt(r,16))}var o=new String(""),s=Object.hasOwnProperty;return function(n,a){var u,c,h=n.match(t),l=h[0],f=!1;"{"===l?u={}:"["===l?u=[]:(u=[],f=!0);for(var g=[u],d=1-f,p=h.length;d<p;++d){var v;switch((l=h[d]).charCodeAt(0)){default:(v=g[0])[c||v.length]=+l,c=void 0;break;case 34:if(-1!==(l=l.substring(1,l.length-1)).indexOf("\\")&&(l=l.replace(e,i)),v=g[0],!c){if(!(v instanceof Array)){c=l||o;break}c=v.length}v[c]=l,c=void 0;break;case 91:v=g[0],g.unshift(v[c||v.length]=[]),c=void 0;break;case 93:g.shift();break;case 102:(v=g[0])[c||v.length]=!1,c=void 0;break;case 110:(v=g[0])[c||v.length]=null,c=void 0;break;case 116:(v=g[0])[c||v.length]=!0,c=void 0;break;case 123:v=g[0],g.unshift(v[c||v.length]={}),c=void 0;break;case 125:g.shift()}}if(f){if(1!==g.length)throw new Error;u=u[0]}else if(g.length)throw new Error;if(a){u=function t(e,n){var i=e[n];if(i&&"object"===(void 0===i?"undefined":r(i))){var o=null;for(var u in i)if(s.call(i,u)&&i!==e){var c=t(i,u);void 0!==c?i[u]=c:(o||(o=[]),o.push(u))}if(o)for(var h=o.length;--h>=0;)delete i[o[h]]}return a.call(e,n,i)}({"":u},"")}return u}}();void 0!==br&&br||(e.KJUR=br={}),void 0!==br.asn1&&br.asn1||(br.asn1={}),br.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var e=t.toString(16);return e.length%2==1&&(e="0"+e),e},this.bigIntToMinTwosComplementsHex=function(t){var e=t.toString(16);if("-"!=e.substr(0,1))e.length%2==1?e="0"+e:e.match(/^[0-7]/)||(e="00"+e);else{var r=e.substr(1).length;r%2==1?r+=1:e.match(/^[0-7]/)||(r+=2);for(var n="",i=0;i<r;i++)n+="f";e=new F(n,16).xor(t).add(F.ONE).toString(16).replace(/^-/,"")}return e},this.getPEMStringFromHex=function(t,e){return Mr(t,e)},this.newObject=function(t){var e=br.asn1,r=e.ASN1Object,n=e.DERBoolean,i=e.DERInteger,o=e.DERBitString,s=e.DEROctetString,a=e.DERNull,u=e.DERObjectIdentifier,c=e.DEREnumerated,h=e.DERUTF8String,l=e.DERNumericString,f=e.DERPrintableString,g=e.DERTeletexString,d=e.DERIA5String,p=e.DERUTCTime,v=e.DERGeneralizedTime,y=e.DERVisibleString,m=e.DERBMPString,_=e.DERSequence,S=e.DERSet,b=e.DERTaggedObject,w=e.ASN1Util.newObject;if(t instanceof e.ASN1Object)return t;var F=Object.keys(t);if(1!=F.length)throw new Error("key of param shall be only one.");var E=F[0];if(-1==":asn1:bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:visstr:bmpstr:seq:set:tag:".indexOf(":"+E+":"))throw new Error("undefined key: "+E);if("bool"==E)return new n(t[E]);if("int"==E)return new i(t[E]);if("bitstr"==E)return new o(t[E]);if("octstr"==E)return new s(t[E]);if("null"==E)return new a(t[E]);if("oid"==E)return new u(t[E]);if("enum"==E)return new c(t[E]);if("utf8str"==E)return new h(t[E]);if("numstr"==E)return new l(t[E]);if("prnstr"==E)return new f(t[E]);if("telstr"==E)return new g(t[E]);if("ia5str"==E)return new d(t[E]);if("utctime"==E)return new p(t[E]);if("gentime"==E)return new v(t[E]);if("visstr"==E)return new y(t[E]);if("bmpstr"==E)return new m(t[E]);if("asn1"==E)return new r(t[E]);if("seq"==E){for(var x=t[E],A=[],k=0;k<x.length;k++){var P=w(x[k]);A.push(P)}return new _({array:A})}if("set"==E){for(x=t[E],A=[],k=0;k<x.length;k++){P=w(x[k]);A.push(P)}return new S({array:A})}if("tag"==E){var C=t[E];if("[object Array]"===Object.prototype.toString.call(C)&&3==C.length){var T=w(C[2]);return new b({tag:C[0],explicit:C[1],obj:T})}return new b(C)}},this.jsonToASN1HEX=function(t){return this.newObject(t).getEncodedHex()}},br.asn1.ASN1Util.oidHexToInt=function(t){for(var e="",r=parseInt(t.substr(0,2),16),n=(e=Math.floor(r/40)+"."+r%40,""),i=2;i<t.length;i+=2){var o=("00000000"+parseInt(t.substr(i,2),16).toString(2)).slice(-8);if(n+=o.substr(1,7),"0"==o.substr(0,1))e=e+"."+new F(n,2).toString(10),n=""}return e},br.asn1.ASN1Util.oidIntToHex=function(t){var e=function t(e){var r=e.toString(16);return 1==r.length&&(r="0"+r),r},r=function t(r){var n="",i=new F(r,10).toString(2),o=7-i.length%7;7==o&&(o=0);for(var s="",a=0;a<o;a++)s+="0";i=s+i;for(a=0;a<i.length-1;a+=7){var u=i.substr(a,7);a!=i.length-7&&(u="1"+u),n+=e(parseInt(u,2))}return n};if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var n="",i=t.split("."),o=40*parseInt(i[0])+parseInt(i[1]);n+=e(o),i.splice(0,2);for(var s=0;s<i.length;s++)n+=r(i[s]);return n},br.asn1.ASN1Object=function(t){this.params=null,this.getLengthHexFromValue=function(){if(void 0===this.hV||null==this.hV)throw new Error("this.hV is null or undefined");if(this.hV.length%2==1)throw new Error("value hex must be even length: n="+"".length+",v="+this.hV);var t=this.hV.length/2,e=t.toString(16);if(e.length%2==1&&(e="0"+e),t<128)return e;var r=e.length/2;if(r>15)throw"ASN.1 length too long to represent by 8x: n = "+t.toString(16);return(128+r).toString(16)+e},this.getEncodedHex=function(){return(null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return""},this.setByParam=function(t){this.params=t},null!=t&&null!=t.tlv&&(this.hTLV=t.tlv,this.isModified=!1)},br.asn1.DERAbstractString=function(t){br.asn1.DERAbstractString.superclass.constructor.call(this);this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=Dr(this.s).toLowerCase()},this.setStringHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?this.setString(t):void 0!==t.str?this.setString(t.str):void 0!==t.hex&&this.setStringHex(t.hex))},o.lang.extend(br.asn1.DERAbstractString,br.asn1.ASN1Object),br.asn1.DERAbstractTime=function(t){br.asn1.DERAbstractTime.superclass.constructor.call(this);this.localDateToUTC=function(t){var e=t.getTime()+6e4*t.getTimezoneOffset();return new Date(e)},this.formatDate=function(t,e,r){var n=this.zeroPadding,i=this.localDateToUTC(t),o=String(i.getFullYear());"utc"==e&&(o=o.substr(2,2));var s=o+n(String(i.getMonth()+1),2)+n(String(i.getDate()),2)+n(String(i.getHours()),2)+n(String(i.getMinutes()),2)+n(String(i.getSeconds()),2);if(!0===r){var a=i.getMilliseconds();if(0!=a){var u=n(String(a),3);s=s+"."+(u=u.replace(/[0]+$/,""))}}return s+"Z"},this.zeroPadding=function(t,e){return t.length>=e?t:new Array(e-t.length+1).join("0")+t},this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=Pr(t)},this.setByDateValue=function(t,e,r,n,i,o){var s=new Date(Date.UTC(t,e-1,r,n,i,o,0));this.setByDate(s)},this.getFreshValueHex=function(){return this.hV}},o.lang.extend(br.asn1.DERAbstractTime,br.asn1.ASN1Object),br.asn1.DERAbstractStructured=function(t){br.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array=t},this.appendASN1Object=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array.push(t)},this.asn1Array=new Array,void 0!==t&&void 0!==t.array&&(this.asn1Array=t.array)},o.lang.extend(br.asn1.DERAbstractStructured,br.asn1.ASN1Object),br.asn1.DERBoolean=function(t){br.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV=0==t?"010100":"0101ff"},o.lang.extend(br.asn1.DERBoolean,br.asn1.ASN1Object),br.asn1.DERInteger=function(t){br.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=br.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new F(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.bigint?this.setByBigInteger(t.bigint):void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},o.lang.extend(br.asn1.DERInteger,br.asn1.ASN1Object),br.asn1.DERBitString=function(t){if(void 0!==t&&void 0!==t.obj){var e=br.asn1.ASN1Util.newObject(t.obj);t.hex="00"+e.getEncodedHex()}br.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(t){this.hTLV=null,this.isModified=!0,this.hV=t},this.setUnusedBitsAndHexValue=function(t,e){if(t<0||7<t)throw"unused bits shall be from 0 to 7: u = "+t;var r="0"+t;this.hTLV=null,this.isModified=!0,this.hV=r+e},this.setByBinaryString=function(t){var e=8-(t=t.replace(/0+$/,"")).length%8;8==e&&(e=0);for(var r=0;r<=e;r++)t+="0";var n="";for(r=0;r<t.length-1;r+=8){var i=t.substr(r,8),o=parseInt(i,2).toString(16);1==o.length&&(o="0"+o),n+=o}this.hTLV=null,this.isModified=!0,this.hV="0"+e+n},this.setByBooleanArray=function(t){for(var e="",r=0;r<t.length;r++)1==t[r]?e+="1":e+="0";this.setByBinaryString(e)},this.newFalseArray=function(t){for(var e=new Array(t),r=0;r<t;r++)e[r]=!1;return e},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t&&t.toLowerCase().match(/^[0-9a-f]+$/)?this.setHexValueIncludingUnusedBits(t):void 0!==t.hex?this.setHexValueIncludingUnusedBits(t.hex):void 0!==t.bin?this.setByBinaryString(t.bin):void 0!==t.array&&this.setByBooleanArray(t.array))},o.lang.extend(br.asn1.DERBitString,br.asn1.ASN1Object),br.asn1.DEROctetString=function(t){if(void 0!==t&&void 0!==t.obj){var e=br.asn1.ASN1Util.newObject(t.obj);t.hex=e.getEncodedHex()}br.asn1.DEROctetString.superclass.constructor.call(this,t),this.hT="04"},o.lang.extend(br.asn1.DEROctetString,br.asn1.DERAbstractString),br.asn1.DERNull=function(){br.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500"},o.lang.extend(br.asn1.DERNull,br.asn1.ASN1Object),br.asn1.DERObjectIdentifier=function(t){br.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.setValueOidString=function(t){var e=function r(t){var e=function t(e){var r=e.toString(16);return 1==r.length&&(r="0"+r),r},r=function t(r){var n="",i=parseInt(r,10).toString(2),o=7-i.length%7;7==o&&(o=0);for(var s="",a=0;a<o;a++)s+="0";i=s+i;for(a=0;a<i.length-1;a+=7){var u=i.substr(a,7);a!=i.length-7&&(u="1"+u),n+=e(parseInt(u,2))}return n};try{if(!t.match(/^[0-9.]+$/))return null;var n="",i=t.split("."),o=40*parseInt(i[0],10)+parseInt(i[1],10);n+=e(o),i.splice(0,2);for(var s=0;s<i.length;s++)n+=r(i[s]);return n}catch(t){return null}}(t);if(null==e)throw new Error("malformed oid string: "+t);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e},this.setValueName=function(t){var e=br.asn1.x509.OID.name2oid(t);if(""===e)throw new Error("DERObjectIdentifier oidName undefined: "+t);this.setValueOidString(e)},this.setValueNameOrOid=function(t){t.match(/^[0-2].[0-9.]+$/)?this.setValueOidString(t):this.setValueName(t)},this.getFreshValueHex=function(){return this.hV},this.setByParam=function(t){"string"==typeof t?this.setValueNameOrOid(t):void 0!==t.oid?this.setValueNameOrOid(t.oid):void 0!==t.name?this.setValueNameOrOid(t.name):void 0!==t.hex&&this.setValueHex(t.hex)},void 0!==t&&this.setByParam(t)},o.lang.extend(br.asn1.DERObjectIdentifier,br.asn1.ASN1Object),br.asn1.DEREnumerated=function(t){br.asn1.DEREnumerated.superclass.constructor.call(this),this.hT="0a",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=br.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new F(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},o.lang.extend(br.asn1.DEREnumerated,br.asn1.ASN1Object),br.asn1.DERUTF8String=function(t){br.asn1.DERUTF8String.superclass.constructor.call(this,t),this.hT="0c"},o.lang.extend(br.asn1.DERUTF8String,br.asn1.DERAbstractString),br.asn1.DERNumericString=function(t){br.asn1.DERNumericString.superclass.constructor.call(this,t),this.hT="12"},o.lang.extend(br.asn1.DERNumericString,br.asn1.DERAbstractString),br.asn1.DERPrintableString=function(t){br.asn1.DERPrintableString.superclass.constructor.call(this,t),this.hT="13"},o.lang.extend(br.asn1.DERPrintableString,br.asn1.DERAbstractString),br.asn1.DERTeletexString=function(t){br.asn1.DERTeletexString.superclass.constructor.call(this,t),this.hT="14"},o.lang.extend(br.asn1.DERTeletexString,br.asn1.DERAbstractString),br.asn1.DERIA5String=function(t){br.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="16"},o.lang.extend(br.asn1.DERIA5String,br.asn1.DERAbstractString),br.asn1.DERVisibleString=function(t){br.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="1a"},o.lang.extend(br.asn1.DERVisibleString,br.asn1.DERAbstractString),br.asn1.DERBMPString=function(t){br.asn1.DERBMPString.superclass.constructor.call(this,t),this.hT="1e"},o.lang.extend(br.asn1.DERBMPString,br.asn1.DERAbstractString),br.asn1.DERUTCTime=function(t){br.asn1.DERUTCTime.superclass.constructor.call(this,t),this.hT="17",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"utc"),this.hV=Pr(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"utc"),this.hV=Pr(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{12}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date))},o.lang.extend(br.asn1.DERUTCTime,br.asn1.DERAbstractTime),br.asn1.DERGeneralizedTime=function(t){br.asn1.DERGeneralizedTime.superclass.constructor.call(this,t),this.hT="18",this.withMillis=!1,this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=Pr(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=Pr(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{14}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date),!0===t.millis&&(this.withMillis=!0))},o.lang.extend(br.asn1.DERGeneralizedTime,br.asn1.DERAbstractTime),br.asn1.DERSequence=function(t){br.asn1.DERSequence.superclass.constructor.call(this,t),this.hT="30",this.getFreshValueHex=function(){for(var t="",e=0;e<this.asn1Array.length;e++){t+=this.asn1Array[e].getEncodedHex()}return this.hV=t,this.hV}},o.lang.extend(br.asn1.DERSequence,br.asn1.DERAbstractStructured),br.asn1.DERSet=function(t){br.asn1.DERSet.superclass.constructor.call(this,t),this.hT="31",this.sortFlag=!0,this.getFreshValueHex=function(){for(var t=new Array,e=0;e<this.asn1Array.length;e++){var r=this.asn1Array[e];t.push(r.getEncodedHex())}return 1==this.sortFlag&&t.sort(),this.hV=t.join(""),this.hV},void 0!==t&&void 0!==t.sortflag&&0==t.sortflag&&(this.sortFlag=!1)},o.lang.extend(br.asn1.DERSet,br.asn1.DERAbstractStructured),br.asn1.DERTaggedObject=function(t){br.asn1.DERTaggedObject.superclass.constructor.call(this);var e=br.asn1;this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(t,e,r){this.hT=e,this.isExplicit=t,this.asn1Object=r,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=r.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,e),this.isModified=!1)},this.getFreshValueHex=function(){return this.hV},this.setByParam=function(t){null!=t.tag&&(this.hT=t.tag),null!=t.explicit&&(this.isExplicit=t.explicit),null!=t.tage&&(this.hT=t.tage,this.isExplicit=!0),null!=t.tagi&&(this.hT=t.tagi,this.isExplicit=!1),null!=t.obj&&(t.obj instanceof e.ASN1Object?(this.asn1Object=t.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)):"object"==r(t.obj)&&(this.asn1Object=e.ASN1Util.newObject(t.obj),this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)))},null!=t&&this.setByParam(t)},o.lang.extend(br.asn1.DERTaggedObject,br.asn1.ASN1Object);var br,wr,Fr,Er=new function(){};function xr(t){for(var e=new Array,r=0;r<t.length;r++)e[r]=t.charCodeAt(r);return e}function Ar(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e}function kr(t){for(var e="",r=0;r<t.length;r++){var n=t[r].toString(16);1==n.length&&(n="0"+n),e+=n}return e}function Pr(t){return kr(xr(t))}function Cr(t){return t=(t=(t=t.replace(/\=/g,"")).replace(/\+/g,"-")).replace(/\//g,"_")}function Tr(t){return t.length%4==2?t+="==":t.length%4==3&&(t+="="),t=(t=t.replace(/-/g,"+")).replace(/_/g,"/")}function Rr(t){return t.length%2==1&&(t="0"+t),Cr(S(t))}function Ir(t){return b(Tr(t))}function Dr(t){return qr(Gr(t))}function Lr(t){return decodeURIComponent(Jr(t))}function Nr(t){for(var e="",r=0;r<t.length-1;r+=2)e+=String.fromCharCode(parseInt(t.substr(r,2),16));return e}function Ur(t){for(var e="",r=0;r<t.length;r++)e+=("0"+t.charCodeAt(r).toString(16)).slice(-2);return e}function Br(t){return S(t)}function Or(t){var e=Br(t).replace(/(.{64})/g,"$1\r\n");return e=e.replace(/\r\n$/,"")}function jr(t){return b(t.replace(/[^0-9A-Za-z\/+=]*/g,""))}function Mr(t,e){return"-----BEGIN "+e+"-----\r\n"+Or(t)+"\r\n-----END "+e+"-----\r\n"}function Hr(t,e){if(-1==t.indexOf("-----BEGIN "))throw"can't find PEM header: "+e;return jr(t=void 0!==e?(t=t.replace(new RegExp("^[^]*-----BEGIN "+e+"-----"),"")).replace(new RegExp("-----END "+e+"-----[^]*$"),""):(t=t.replace(/^[^]*-----BEGIN [^-]+-----/,"")).replace(/-----END [^-]+-----[^]*$/,""))}function Vr(t){var e,r,n,i,o,s,a,u,c,h,l;if(l=t.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/))return u=l[1],e=parseInt(u),2===u.length&&(50<=e&&e<100?e=1900+e:0<=e&&e<50&&(e=2e3+e)),r=parseInt(l[2])-1,n=parseInt(l[3]),i=parseInt(l[4]),o=parseInt(l[5]),s=parseInt(l[6]),a=0,""!==(c=l[7])&&(h=(c.substr(1)+"00").substr(0,3),a=parseInt(h)),Date.UTC(e,r,n,i,o,s,a);throw"unsupported zulu format: "+t}function Kr(t){return~~(Vr(t)/1e3)}function qr(t){return t.replace(/%/g,"")}function Jr(t){return t.replace(/(..)/g,"%$1")}function Wr(t){var e="malformed IPv6 address";if(!t.match(/^[0-9A-Fa-f:]+$/))throw e;var r=(t=t.toLowerCase()).split(":").length-1;if(r<2)throw e;var n=":".repeat(7-r+2),i=(t=t.replace("::",n)).split(":");if(8!=i.length)throw e;for(var o=0;o<8;o++)i[o]=("0000"+i[o]).slice(-4);return i.join("")}function zr(t){if(!t.match(/^[0-9A-Fa-f]{32}$/))throw"malformed IPv6 address octet";for(var e=(t=t.toLowerCase()).match(/.{1,4}/g),r=0;r<8;r++)e[r]=e[r].replace(/^0+/,""),""==e[r]&&(e[r]="0");var n=(t=":"+e.join(":")+":").match(/:(0:){2,}/g);if(null===n)return t.slice(1,-1);var i="";for(r=0;r<n.length;r++)n[r].length>i.length&&(i=n[r]);return(t=t.replace(i,"::")).slice(1,-1)}function Yr(t){var e="malformed hex value";if(!t.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/))throw e;if(8!=t.length)return 32==t.length?zr(t):t;try{return parseInt(t.substr(0,2),16)+"."+parseInt(t.substr(2,2),16)+"."+parseInt(t.substr(4,2),16)+"."+parseInt(t.substr(6,2),16)}catch(t){throw e}}function Gr(t){for(var e=encodeURIComponent(t),r="",n=0;n<e.length;n++)"%"==e[n]?(r+=e.substr(n,3),n+=2):r=r+"%"+Pr(e[n]);return r}function Xr(t){return!(t.length%2!=0||!t.match(/^[0-9a-f]+$/)&&!t.match(/^[0-9A-F]+$/))}function $r(t){return t.length%2==1?"0"+t:t.substr(0,1)>"7"?"00"+t:t}Er.getLblen=function(t,e){if("8"!=t.substr(e+2,1))return 1;var r=parseInt(t.substr(e+3,1));return 0==r?-1:0<r&&r<10?r+1:-2},Er.getL=function(t,e){var r=Er.getLblen(t,e);return r<1?"":t.substr(e+2,2*r)},Er.getVblen=function(t,e){var r;return""==(r=Er.getL(t,e))?-1:("8"===r.substr(0,1)?new F(r.substr(2),16):new F(r,16)).intValue()},Er.getVidx=function(t,e){var r=Er.getLblen(t,e);return r<0?r:e+2*(r+1)},Er.getV=function(t,e){var r=Er.getVidx(t,e),n=Er.getVblen(t,e);return t.substr(r,2*n)},Er.getTLV=function(t,e){return t.substr(e,2)+Er.getL(t,e)+Er.getV(t,e)},Er.getTLVblen=function(t,e){return 2+2*Er.getLblen(t,e)+2*Er.getVblen(t,e)},Er.getNextSiblingIdx=function(t,e){return Er.getVidx(t,e)+2*Er.getVblen(t,e)},Er.getChildIdx=function(t,e){var r,n,i,o=Er,s=[];r=o.getVidx(t,e),n=2*o.getVblen(t,e),"03"==t.substr(e,2)&&(r+=2,n-=2),i=0;for(var a=r;i<=n;){var u=o.getTLVblen(t,a);if((i+=u)<=n&&s.push(a),a+=u,i>=n)break}return s},Er.getNthChildIdx=function(t,e,r){return Er.getChildIdx(t,e)[r]},Er.getIdxbyList=function(t,e,r,n){var i,o,s=Er;return 0==r.length?void 0!==n&&t.substr(e,2)!==n?-1:e:(i=r.shift())>=(o=s.getChildIdx(t,e)).length?-1:s.getIdxbyList(t,o[i],r,n)},Er.getIdxbyListEx=function(t,e,r,n){var i,o,s=Er;if(0==r.length)return void 0!==n&&t.substr(e,2)!==n?-1:e;i=r.shift(),o=s.getChildIdx(t,e);for(var a=0,u=0;u<o.length;u++){var c=t.substr(o[u],2);if("number"==typeof i&&!s.isContextTag(c)&&a==i||"string"==typeof i&&s.isContextTag(c,i))return s.getIdxbyListEx(t,o[u],r,n);s.isContextTag(c)||a++}return-1},Er.getTLVbyList=function(t,e,r,n){var i=Er,o=i.getIdxbyList(t,e,r,n);return-1==o||o>=t.length?null:i.getTLV(t,o)},Er.getTLVbyListEx=function(t,e,r,n){var i=Er,o=i.getIdxbyListEx(t,e,r,n);return-1==o?null:i.getTLV(t,o)},Er.getVbyList=function(t,e,r,n,i){var o,s,a=Er;return-1==(o=a.getIdxbyList(t,e,r,n))||o>=t.length?null:(s=a.getV(t,o),!0===i&&(s=s.substr(2)),s)},Er.getVbyListEx=function(t,e,r,n,i){var o,s,a=Er;return-1==(o=a.getIdxbyListEx(t,e,r,n))?null:(s=a.getV(t,o),"03"==t.substr(o,2)&&!1!==i&&(s=s.substr(2)),s)},Er.getInt=function(t,e,r){null==r&&(r=-1);try{var n=t.substr(e,2);if("02"!=n&&"03"!=n)return r;var i=Er.getV(t,e);return"02"==n?parseInt(i,16):function o(t){try{var e=t.substr(0,2);if("00"==e)return parseInt(t.substr(2),16);var r=parseInt(e,16),n=t.substr(2),i=parseInt(n,16).toString(2);return"0"==i&&(i="00000000"),i=i.slice(0,0-r),parseInt(i,2)}catch(t){return-1}}(i)}catch(t){return r}},Er.getOID=function(t,e,r){null==r&&(r=null);try{return"06"!=t.substr(e,2)?r:function n(t){if(!Xr(t))return null;try{var e=[],r=t.substr(0,2),n=parseInt(r,16);e[0]=new String(Math.floor(n/40)),e[1]=new String(n%40);for(var i=t.substr(2),o=[],s=0;s<i.length/2;s++)o.push(parseInt(i.substr(2*s,2),16));var a=[],u="";for(s=0;s<o.length;s++)128&o[s]?u+=Qr((127&o[s]).toString(2),7):(u+=Qr((127&o[s]).toString(2),7),a.push(new String(parseInt(u,2))),u="");var c=e.join(".");return a.length>0&&(c=c+"."+a.join(".")),c}catch(t){return null}}(Er.getV(t,e))}catch(t){return r}},Er.getOIDName=function(t,e,r){null==r&&(r=null);try{var n=Er.getOID(t,e,r);if(n==r)return r;var i=br.asn1.x509.OID.oid2name(n);return""==i?n:i}catch(t){return r}},Er.getString=function(t,e,r){null==r&&(r=null);try{return Nr(Er.getV(t,e))}catch(t){return r}},Er.hextooidstr=function(t){var e=function t(e,r){return e.length>=r?e:new Array(r-e.length+1).join("0")+e},r=[],n=t.substr(0,2),i=parseInt(n,16);r[0]=new String(Math.floor(i/40)),r[1]=new String(i%40);for(var o=t.substr(2),s=[],a=0;a<o.length/2;a++)s.push(parseInt(o.substr(2*a,2),16));var u=[],c="";for(a=0;a<s.length;a++)128&s[a]?c+=e((127&s[a]).toString(2),7):(c+=e((127&s[a]).toString(2),7),u.push(new String(parseInt(c,2))),c="");var h=r.join(".");return u.length>0&&(h=h+"."+u.join(".")),h},Er.dump=function(t,e,r,n){var i=Er,o=i.getV,s=i.dump,a=i.getChildIdx,u=t;t instanceof br.asn1.ASN1Object&&(u=t.getEncodedHex());var c=function t(e,r){return e.length<=2*r?e:e.substr(0,r)+"..(total "+e.length/2+"bytes).."+e.substr(e.length-r,r)};void 0===e&&(e={ommit_long_octet:32}),void 0===r&&(r=0),void 0===n&&(n="");var h,l=e.ommit_long_octet;if("01"==(h=u.substr(r,2)))return"00"==(f=o(u,r))?n+"BOOLEAN FALSE\n":n+"BOOLEAN TRUE\n";if("02"==h)return n+"INTEGER "+c(f=o(u,r),l)+"\n";if("03"==h){var f=o(u,r);if(i.isASN1HEX(f.substr(2))){var g=n+"BITSTRING, encapsulates\n";return g+=s(f.substr(2),e,0,n+"  ")}return n+"BITSTRING "+c(f,l)+"\n"}if("04"==h){f=o(u,r);if(i.isASN1HEX(f)){g=n+"OCTETSTRING, encapsulates\n";return g+=s(f,e,0,n+"  ")}return n+"OCTETSTRING "+c(f,l)+"\n"}if("05"==h)return n+"NULL\n";if("06"==h){var d=o(u,r),p=br.asn1.ASN1Util.oidHexToInt(d),v=br.asn1.x509.OID.oid2name(p),y=p.replace(/\./g," ");return""!=v?n+"ObjectIdentifier "+v+" ("+y+")\n":n+"ObjectIdentifier ("+y+")\n"}if("0a"==h)return n+"ENUMERATED "+parseInt(o(u,r))+"\n";if("0c"==h)return n+"UTF8String '"+Lr(o(u,r))+"'\n";if("13"==h)return n+"PrintableString '"+Lr(o(u,r))+"'\n";if("14"==h)return n+"TeletexString '"+Lr(o(u,r))+"'\n";if("16"==h)return n+"IA5String '"+Lr(o(u,r))+"'\n";if("17"==h)return n+"UTCTime "+Lr(o(u,r))+"\n";if("18"==h)return n+"GeneralizedTime "+Lr(o(u,r))+"\n";if("1a"==h)return n+"VisualString '"+Lr(o(u,r))+"'\n";if("1e"==h)return n+"BMPString '"+Lr(o(u,r))+"'\n";if("30"==h){if("3000"==u.substr(r,4))return n+"SEQUENCE {}\n";g=n+"SEQUENCE\n";var m=e;if((2==(b=a(u,r)).length||3==b.length)&&"06"==u.substr(b[0],2)&&"04"==u.substr(b[b.length-1],2)){v=i.oidname(o(u,b[0]));var _=JSON.parse(JSON.stringify(e));_.x509ExtName=v,m=_}for(var S=0;S<b.length;S++)g+=s(u,m,b[S],n+"  ");return g}if("31"==h){g=n+"SET\n";var b=a(u,r);for(S=0;S<b.length;S++)g+=s(u,e,b[S],n+"  ");return g}if(0!=(128&(h=parseInt(h,16)))){var w=31&h;if(0!=(32&h)){for(g=n+"["+w+"]\n",b=a(u,r),S=0;S<b.length;S++)g+=s(u,e,b[S],n+"  ");return g}f=o(u,r);if(Er.isASN1HEX(f)){var g=n+"["+w+"]\n";return g+=s(f,e,0,n+"  ")}return("68747470"==f.substr(0,8)||"subjectAltName"===e.x509ExtName&&2==w)&&(f=Lr(f)),g=n+"["+w+"] "+f+"\n"}return n+"UNKNOWN("+h+") "+o(u,r)+"\n"},Er.isContextTag=function(t,e){var r,n;t=t.toLowerCase();try{r=parseInt(t,16)}catch(t){return-1}if(void 0===e)return 128==(192&r);try{return null!=e.match(/^\[[0-9]+\]$/)&&(!((n=parseInt(e.substr(1,e.length-1),10))>31)&&(128==(192&r)&&(31&r)==n))}catch(t){return!1}},Er.isASN1HEX=function(t){var e=Er;if(t.length%2==1)return!1;var r=e.getVblen(t,0),n=t.substr(0,2),i=e.getL(t,0);return t.length-n.length-i.length==2*r},Er.checkStrictDER=function(t,e,r,n,i){var o=Er;if(void 0===r){if("string"!=typeof t)throw new Error("not hex string");if(t=t.toLowerCase(),!br.lang.String.isHex(t))throw new Error("not hex string");r=t.length,i=(n=t.length/2)<128?1:Math.ceil(n.toString(16))+1}if(o.getL(t,e).length>2*i)throw new Error("L of TLV too long: idx="+e);var s=o.getVblen(t,e);if(s>n)throw new Error("value of L too long than hex: idx="+e);var a=o.getTLV(t,e),u=a.length-2-o.getL(t,e).length;if(u!==2*s)throw new Error("V string length and L's value not the same:"+u+"/"+2*s);if(0===e&&t.length!=a.length)throw new Error("total length and TLV length unmatch:"+t.length+"!="+a.length);var c=t.substr(e,2);if("02"===c){var h=o.getVidx(t,e);if("00"==t.substr(h,2)&&t.charCodeAt(h+2)<56)throw new Error("not least zeros for DER INTEGER")}if(32&parseInt(c,16)){for(var l=o.getVblen(t,e),f=0,g=o.getChildIdx(t,e),d=0;d<g.length;d++){f+=o.getTLV(t,g[d]).length,o.checkStrictDER(t,g[d],r,n,i)}if(2*l!=f)throw new Error("sum of children's TLV length and L unmatch: "+2*l+"!="+f)}},Er.oidname=function(t){var e=br.asn1;br.lang.String.isHex(t)&&(t=e.ASN1Util.oidHexToInt(t));var r=e.x509.OID.oid2name(t);return""===r&&(r=t),r},void 0!==br&&br||(e.KJUR=br={}),void 0!==br.lang&&br.lang||(br.lang={}),br.lang.String=function(){},"function"==typeof t?(e.utf8tob64u=wr=function e(r){return Cr(t.from(r,"utf8").toString("base64"))},e.b64utoutf8=Fr=function e(r){return t.from(Tr(r),"base64").toString("utf8")}):(e.utf8tob64u=wr=function t(e){return Rr(qr(Gr(e)))},e.b64utoutf8=Fr=function t(e){return decodeURIComponent(Jr(Ir(e)))}),br.lang.String.isInteger=function(t){return!!t.match(/^[0-9]+$/)||!!t.match(/^-[0-9]+$/)},br.lang.String.isHex=function(t){return Xr(t)},br.lang.String.isBase64=function(t){return!(!(t=t.replace(/\s+/g,"")).match(/^[0-9A-Za-z+\/]+={0,3}$/)||t.length%4!=0)},br.lang.String.isBase64URL=function(t){return!t.match(/[+/=]/)&&(t=Tr(t),br.lang.String.isBase64(t))},br.lang.String.isIntegerArray=function(t){return!!(t=t.replace(/\s+/g,"")).match(/^\[[0-9,]+\]$/)},br.lang.String.isPrintable=function(t){return null!==t.match(/^[0-9A-Za-z '()+,-./:=?]*$/)},br.lang.String.isIA5=function(t){return null!==t.match(/^[\x20-\x21\x23-\x7f]*$/)},br.lang.String.isMail=function(t){return null!==t.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)};var Qr=function t(e,r,n){return null==n&&(n="0"),e.length>=r?e:new Array(r-e.length+1).join(n)+e};void 0!==br&&br||(e.KJUR=br={}),void 0!==br.crypto&&br.crypto||(br.crypto={}),br.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"},this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHAwithRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa"},this.CRYPTOJSMESSAGEDIGESTNAME={md5:y.algo.MD5,sha1:y.algo.SHA1,sha224:y.algo.SHA224,sha256:y.algo.SHA256,sha384:y.algo.SHA384,sha512:y.algo.SHA512,ripemd160:y.algo.RIPEMD160},this.getDigestInfoHex=function(t,e){if(void 0===this.DIGESTINFOHEAD[e])throw"alg not supported in Util.DIGESTINFOHEAD: "+e;return this.DIGESTINFOHEAD[e]+t},this.getPaddedDigestInfoHex=function(t,e,r){var n=this.getDigestInfoHex(t,e),i=r/4;if(n.length+22>i)throw"key is too short for SigAlg: keylen="+r+","+e;for(var o="0001",s="00"+n,a="",u=i-o.length-s.length,c=0;c<u;c+=2)a+="ff";return o+a+s},this.hashString=function(t,e){return new br.crypto.MessageDigest({alg:e}).digestString(t)},this.hashHex=function(t,e){return new br.crypto.MessageDigest({alg:e}).digestHex(t)},this.sha1=function(t){return this.hashString(t,"sha1")},this.sha256=function(t){return this.hashString(t,"sha256")},this.sha256Hex=function(t){return this.hashHex(t,"sha256")},this.sha512=function(t){return this.hashString(t,"sha512")},this.sha512Hex=function(t){return this.hashHex(t,"sha512")},this.isKey=function(t){return t instanceof He||t instanceof br.crypto.DSA||t instanceof br.crypto.ECDSA}},br.crypto.Util.md5=function(t){return new br.crypto.MessageDigest({alg:"md5",prov:"cryptojs"}).digestString(t)},br.crypto.Util.ripemd160=function(t){return new br.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"}).digestString(t)},br.crypto.Util.SECURERANDOMGEN=new Oe,br.crypto.Util.getRandomHexOfNbytes=function(t){var e=new Array(t);return br.crypto.Util.SECURERANDOMGEN.nextBytes(e),kr(e)},br.crypto.Util.getRandomBigIntegerOfNbytes=function(t){return new F(br.crypto.Util.getRandomHexOfNbytes(t),16)},br.crypto.Util.getRandomHexOfNbits=function(t){var e=t%8,r=new Array((t-e)/8+1);return br.crypto.Util.SECURERANDOMGEN.nextBytes(r),r[0]=(255<<e&255^255)&r[0],kr(r)},br.crypto.Util.getRandomBigIntegerOfNbits=function(t){return new F(br.crypto.Util.getRandomHexOfNbits(t),16)},br.crypto.Util.getRandomBigIntegerZeroToMax=function(t){for(var e=t.bitLength();;){var r=br.crypto.Util.getRandomBigIntegerOfNbits(e);if(-1!=t.compareTo(r))return r}},br.crypto.Util.getRandomBigIntegerMinToMax=function(t,e){var r=t.compareTo(e);if(1==r)throw"biMin is greater than biMax";if(0==r)return t;var n=e.subtract(t);return br.crypto.Util.getRandomBigIntegerZeroToMax(n).add(t)},br.crypto.MessageDigest=function(t){this.setAlgAndProvider=function(t,e){if(null!==(t=br.crypto.MessageDigest.getCanonicalAlgName(t))&&void 0===e&&(e=br.crypto.Util.DEFAULTPROVIDER[t]),-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(t)&&"cryptojs"==e){try{this.md=br.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[t].create()}catch(e){throw"setAlgAndProvider hash alg set fail alg="+t+"/"+e}this.updateString=function(t){this.md.update(t)},this.updateHex=function(t){var e=y.enc.Hex.parse(t);this.md.update(e)},this.digest=function(){return this.md.finalize().toString(y.enc.Hex)},this.digestString=function(t){return this.updateString(t),this.digest()},this.digestHex=function(t){return this.updateHex(t),this.digest()}}if(-1!=":sha256:".indexOf(t)&&"sjcl"==e){try{this.md=new sjcl.hash.sha256}catch(e){throw"setAlgAndProvider hash alg set fail alg="+t+"/"+e}this.updateString=function(t){this.md.update(t)},this.updateHex=function(t){var e=sjcl.codec.hex.toBits(t);this.md.update(e)},this.digest=function(){var t=this.md.finalize();return sjcl.codec.hex.fromBits(t)},this.digestString=function(t){return this.updateString(t),this.digest()},this.digestHex=function(t){return this.updateHex(t),this.digest()}}},this.updateString=function(t){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.updateHex=function(t){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestString=function(t){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestHex=function(t){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},void 0!==t&&void 0!==t.alg&&(this.algName=t.alg,void 0===t.prov&&(this.provName=br.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName))},br.crypto.MessageDigest.getCanonicalAlgName=function(t){return"string"==typeof t&&(t=(t=t.toLowerCase()).replace(/-/,"")),t},br.crypto.MessageDigest.getHashLength=function(t){var e=br.crypto.MessageDigest,r=e.getCanonicalAlgName(t);if(void 0===e.HASHLENGTH[r])throw"not supported algorithm: "+t;return e.HASHLENGTH[r]},br.crypto.MessageDigest.HASHLENGTH={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,ripemd160:20},br.crypto.Mac=function(t){this.setAlgAndProvider=function(t,e){if(null==(t=t.toLowerCase())&&(t="hmacsha1"),"hmac"!=(t=t.toLowerCase()).substr(0,4))throw"setAlgAndProvider unsupported HMAC alg: "+t;void 0===e&&(e=br.crypto.Util.DEFAULTPROVIDER[t]),this.algProv=t+"/"+e;var r=t.substr(4);if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(r)&&"cryptojs"==e){try{var n=br.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[r];this.mac=y.algo.HMAC.create(n,this.pass)}catch(t){throw"setAlgAndProvider hash alg set fail hashAlg="+r+"/"+t}this.updateString=function(t){this.mac.update(t)},this.updateHex=function(t){var e=y.enc.Hex.parse(t);this.mac.update(e)},this.doFinal=function(){return this.mac.finalize().toString(y.enc.Hex)},this.doFinalString=function(t){return this.updateString(t),this.doFinal()},this.doFinalHex=function(t){return this.updateHex(t),this.doFinal()}}},this.updateString=function(t){throw"updateString(str) not supported for this alg/prov: "+this.algProv},this.updateHex=function(t){throw"updateHex(hex) not supported for this alg/prov: "+this.algProv},this.doFinal=function(){throw"digest() not supported for this alg/prov: "+this.algProv},this.doFinalString=function(t){throw"digestString(str) not supported for this alg/prov: "+this.algProv},this.doFinalHex=function(t){throw"digestHex(hex) not supported for this alg/prov: "+this.algProv},this.setPassword=function(t){if("string"==typeof t){var e=t;return t.length%2!=1&&t.match(/^[0-9A-Fa-f]+$/)||(e=Ur(t)),void(this.pass=y.enc.Hex.parse(e))}if("object"!=(void 0===t?"undefined":r(t)))throw"KJUR.crypto.Mac unsupported password type: "+t;e=null;if(void 0!==t.hex){if(t.hex.length%2!=0||!t.hex.match(/^[0-9A-Fa-f]+$/))throw"Mac: wrong hex password: "+t.hex;e=t.hex}if(void 0!==t.utf8&&(e=Dr(t.utf8)),void 0!==t.rstr&&(e=Ur(t.rstr)),void 0!==t.b64&&(e=b(t.b64)),void 0!==t.b64u&&(e=Ir(t.b64u)),null==e)throw"KJUR.crypto.Mac unsupported password type: "+t;this.pass=y.enc.Hex.parse(e)},void 0!==t&&(void 0!==t.pass&&this.setPassword(t.pass),void 0!==t.alg&&(this.algName=t.alg,void 0===t.prov&&(this.provName=br.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName)))},br.crypto.Signature=function(t){var e=null;if(this._setAlgNames=function(){var t=this.algName.match(/^(.+)with(.+)$/);t&&(this.mdAlgName=t[1].toLowerCase(),this.pubkeyAlgName=t[2].toLowerCase(),"rsaandmgf1"==this.pubkeyAlgName&&"sha"==this.mdAlgName&&(this.mdAlgName="sha1"))},this._zeroPaddingOfSignature=function(t,e){for(var r="",n=e/4-t.length,i=0;i<n;i++)r+="0";return r+t},this.setAlgAndProvider=function(t,e){if(this._setAlgNames(),"cryptojs/jsrsa"!=e)throw new Error("provider not supported: "+e);if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)){try{this.md=new br.crypto.MessageDigest({alg:this.mdAlgName})}catch(t){throw new Error("setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+t)}this.init=function(t,e){var r=null;try{r=void 0===e?Zr.getKey(t):Zr.getKey(t,e)}catch(t){throw"init failed:"+t}if(!0===r.isPrivate)this.prvKey=r,this.state="SIGN";else{if(!0!==r.isPublic)throw"init failed.:"+r;this.pubKey=r,this.state="VERIFY"}},this.updateString=function(t){this.md.updateString(t)},this.updateHex=function(t){this.md.updateHex(t)},this.sign=function(){if(this.sHashHex=this.md.digest(),void 0===this.prvKey&&void 0!==this.ecprvhex&&void 0!==this.eccurvename&&void 0!==br.crypto.ECDSA&&(this.prvKey=new br.crypto.ECDSA({curve:this.eccurvename,prv:this.ecprvhex})),this.prvKey instanceof He&&"rsaandmgf1"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);else if(this.prvKey instanceof He&&"rsa"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);else if(this.prvKey instanceof br.crypto.ECDSA)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);else{if(!(this.prvKey instanceof br.crypto.DSA))throw"Signature: unsupported private key alg: "+this.pubkeyAlgName;this.hSign=this.prvKey.signWithMessageHash(this.sHashHex)}return this.hSign},this.signString=function(t){return this.updateString(t),this.sign()},this.signHex=function(t){return this.updateHex(t),this.sign()},this.verify=function(t){if(this.sHashHex=this.md.digest(),void 0===this.pubKey&&void 0!==this.ecpubhex&&void 0!==this.eccurvename&&void 0!==br.crypto.ECDSA&&(this.pubKey=new br.crypto.ECDSA({curve:this.eccurvename,pub:this.ecpubhex})),this.pubKey instanceof He&&"rsaandmgf1"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,t,this.mdAlgName,this.pssSaltLen);if(this.pubKey instanceof He&&"rsa"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHash(this.sHashHex,t);if(void 0!==br.crypto.ECDSA&&this.pubKey instanceof br.crypto.ECDSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,t);if(void 0!==br.crypto.DSA&&this.pubKey instanceof br.crypto.DSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,t);throw"Signature: unsupported public key alg: "+this.pubkeyAlgName}}},this.init=function(t,e){throw"init(key, pass) not supported for this alg:prov="+this.algProvName},this.updateString=function(t){throw"updateString(str) not supported for this alg:prov="+this.algProvName},this.updateHex=function(t){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName},this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName},this.signString=function(t){throw"digestString(str) not supported for this alg:prov="+this.algProvName},this.signHex=function(t){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName},this.verify=function(t){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName},this.initParams=t,void 0!==t&&(void 0!==t.alg&&(this.algName=t.alg,void 0===t.prov?this.provName=br.crypto.Util.DEFAULTPROVIDER[this.algName]:this.provName=t.prov,this.algProvName=this.algName+":"+this.provName,this.setAlgAndProvider(this.algName,this.provName),this._setAlgNames()),void 0!==t.psssaltlen&&(this.pssSaltLen=t.psssaltlen),void 0!==t.prvkeypem)){if(void 0!==t.prvkeypas)throw"both prvkeypem and prvkeypas parameters not supported";try{e=Zr.getKey(t.prvkeypem);this.init(e)}catch(t){throw"fatal error to load pem private key: "+t}}},br.crypto.Cipher=function(t){},br.crypto.Cipher.encrypt=function(t,e,r){if(e instanceof He&&e.isPublic){var n=br.crypto.Cipher.getAlgByKeyAndName(e,r);if("RSA"===n)return e.encrypt(t);if("RSAOAEP"===n)return e.encryptOAEP(t,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return e.encryptOAEP(t,"sha"+i[1]);throw"Cipher.encrypt: unsupported algorithm for RSAKey: "+r}throw"Cipher.encrypt: unsupported key or algorithm"},br.crypto.Cipher.decrypt=function(t,e,r){if(e instanceof He&&e.isPrivate){var n=br.crypto.Cipher.getAlgByKeyAndName(e,r);if("RSA"===n)return e.decrypt(t);if("RSAOAEP"===n)return e.decryptOAEP(t,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return e.decryptOAEP(t,"sha"+i[1]);throw"Cipher.decrypt: unsupported algorithm for RSAKey: "+r}throw"Cipher.decrypt: unsupported key or algorithm"},br.crypto.Cipher.getAlgByKeyAndName=function(t,e){if(t instanceof He){if(-1!=":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(e))return e;if(null==e)return"RSA";throw"getAlgByKeyAndName: not supported algorithm name for RSAKey: "+e}throw"getAlgByKeyAndName: not supported algorithm name: "+e},br.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA"}},void 0!==br&&br||(e.KJUR=br={}),void 0!==br.crypto&&br.crypto||(br.crypto={}),br.crypto.ECDSA=function(t){var e=Error,n=F,i=Ke,o=br.crypto.ECDSA,s=br.crypto.ECParameterDB,a=o.getName,u=Er,c=u.getVbyListEx,h=u.isASN1HEX,l=new Oe;this.type="EC",this.isPrivate=!1,this.isPublic=!1,this.getBigRandom=function(t){return new n(t.bitLength(),l).mod(t.subtract(n.ONE)).add(n.ONE)},this.setNamedCurve=function(t){this.ecparams=s.getByName(t),this.prvKeyHex=null,this.pubKeyHex=null,this.curveName=t},this.setPrivateKeyHex=function(t){this.isPrivate=!0,this.prvKeyHex=t},this.setPublicKeyHex=function(t){this.isPublic=!0,this.pubKeyHex=t},this.getPublicKeyXYHex=function(){var t=this.pubKeyHex;if("04"!==t.substr(0,2))throw"this method supports uncompressed format(04) only";var e=this.ecparams.keylen/4;if(t.length!==2+2*e)throw"malformed public key hex length";var r={};return r.x=t.substr(2,e),r.y=t.substr(2+e),r},this.getShortNISTPCurveName=function(){var t=this.curveName;return"secp256r1"===t||"NIST P-256"===t||"P-256"===t||"prime256v1"===t?"P-256":"secp384r1"===t||"NIST P-384"===t||"P-384"===t?"P-384":null},this.generateKeyPairHex=function(){var t=this.ecparams.n,e=this.getBigRandom(t),r=this.ecparams.G.multiply(e),n=r.getX().toBigInteger(),i=r.getY().toBigInteger(),o=this.ecparams.keylen/4,s=("0000000000"+e.toString(16)).slice(-o),a="04"+("0000000000"+n.toString(16)).slice(-o)+("0000000000"+i.toString(16)).slice(-o);return this.setPrivateKeyHex(s),this.setPublicKeyHex(a),{ecprvhex:s,ecpubhex:a}},this.signWithMessageHash=function(t){return this.signHex(t,this.prvKeyHex)},this.signHex=function(t,e){var r=new n(e,16),i=this.ecparams.n,s=new n(t.substring(0,this.ecparams.keylen/4),16);do{var a=this.getBigRandom(i),u=this.ecparams.G.multiply(a).getX().toBigInteger().mod(i)}while(u.compareTo(n.ZERO)<=0);var c=a.modInverse(i).multiply(s.add(r.multiply(u))).mod(i);return o.biRSSigToASN1Sig(u,c)},this.sign=function(t,e){var r=e,i=this.ecparams.n,o=n.fromByteArrayUnsigned(t);do{var s=this.getBigRandom(i),a=this.ecparams.G.multiply(s).getX().toBigInteger().mod(i)}while(a.compareTo(F.ZERO)<=0);var u=s.modInverse(i).multiply(o.add(r.multiply(a))).mod(i);return this.serializeSig(a,u)},this.verifyWithMessageHash=function(t,e){return this.verifyHex(t,e,this.pubKeyHex)},this.verifyHex=function(t,e,r){try{var s,a,u=o.parseSigHex(e);s=u.r,a=u.s;var c=i.decodeFromHex(this.ecparams.curve,r),h=new n(t.substring(0,this.ecparams.keylen/4),16);return this.verifyRaw(h,s,a,c)}catch(t){return!1}},this.verify=function(t,e,o){var s,a,u;if(Bitcoin.Util.isArray(e)){var c=this.parseSig(e);s=c.r,a=c.s}else{if("object"!==(void 0===e?"undefined":r(e))||!e.r||!e.s)throw"Invalid value for signature";s=e.r,a=e.s}if(o instanceof Ke)u=o;else{if(!Bitcoin.Util.isArray(o))throw"Invalid format for pubkey value, must be byte array or ECPointFp";u=i.decodeFrom(this.ecparams.curve,o)}var h=n.fromByteArrayUnsigned(t);return this.verifyRaw(h,s,a,u)},this.verifyRaw=function(t,e,r,i){var o=this.ecparams.n,s=this.ecparams.G;if(e.compareTo(n.ONE)<0||e.compareTo(o)>=0)return!1;if(r.compareTo(n.ONE)<0||r.compareTo(o)>=0)return!1;var a=r.modInverse(o),u=t.multiply(a).mod(o),c=e.multiply(a).mod(o);return s.multiply(u).add(i.multiply(c)).getX().toBigInteger().mod(o).equals(e)},this.serializeSig=function(t,e){var r=t.toByteArraySigned(),n=e.toByteArraySigned(),i=[];return i.push(2),i.push(r.length),(i=i.concat(r)).push(2),i.push(n.length),(i=i.concat(n)).unshift(i.length),i.unshift(48),i},this.parseSig=function(t){var e;if(48!=t[0])throw new Error("Signature not a valid DERSequence");if(2!=t[e=2])throw new Error("First element in signature must be a DERInteger");var r=t.slice(e+2,e+2+t[e+1]);if(2!=t[e+=2+t[e+1]])throw new Error("Second element in signature must be a DERInteger");var i=t.slice(e+2,e+2+t[e+1]);return e+=2+t[e+1],{r:n.fromByteArrayUnsigned(r),s:n.fromByteArrayUnsigned(i)}},this.parseSigCompact=function(t){if(65!==t.length)throw"Signature has the wrong length";var e=t[0]-27;if(e<0||e>7)throw"Invalid signature type";var r=this.ecparams.n;return{r:n.fromByteArrayUnsigned(t.slice(1,33)).mod(r),s:n.fromByteArrayUnsigned(t.slice(33,65)).mod(r),i:e}},this.readPKCS5PrvKeyHex=function(t){if(!1===h(t))throw new Error("not ASN.1 hex string");var e,r,n;try{e=c(t,0,["[0]",0],"06"),r=c(t,0,[1],"04");try{n=c(t,0,["[1]",0],"03")}catch(t){}}catch(t){throw new Error("malformed PKCS#1/5 plain ECC private key")}if(this.curveName=a(e),void 0===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n),this.setPrivateKeyHex(r),this.isPublic=!1},this.readPKCS8PrvKeyHex=function(t){if(!1===h(t))throw new e("not ASN.1 hex string");var r,n,i;try{c(t,0,[1,0],"06"),r=c(t,0,[1,1],"06"),n=c(t,0,[2,0,1],"04");try{i=c(t,0,[2,0,"[1]",0],"03")}catch(t){}}catch(t){throw new e("malformed PKCS#8 plain ECC private key")}if(this.curveName=a(r),void 0===this.curveName)throw new e("unsupported curve name");this.setNamedCurve(this.curveName),this.setPublicKeyHex(i),this.setPrivateKeyHex(n),this.isPublic=!1},this.readPKCS8PubKeyHex=function(t){if(!1===h(t))throw new e("not ASN.1 hex string");var r,n;try{c(t,0,[0,0],"06"),r=c(t,0,[0,1],"06"),n=c(t,0,[1],"03")}catch(t){throw new e("malformed PKCS#8 ECC public key")}if(this.curveName=a(r),null===this.curveName)throw new e("unsupported curve name");this.setNamedCurve(this.curveName),this.setPublicKeyHex(n)},this.readCertPubKeyHex=function(t,r){if(!1===h(t))throw new e("not ASN.1 hex string");var n,i;try{n=c(t,0,[0,5,0,1],"06"),i=c(t,0,[0,5,1],"03")}catch(t){throw new e("malformed X.509 certificate ECC public key")}if(this.curveName=a(n),null===this.curveName)throw new e("unsupported curve name");this.setNamedCurve(this.curveName),this.setPublicKeyHex(i)},void 0!==t&&void 0!==t.curve&&(this.curveName=t.curve),void 0===this.curveName&&(this.curveName="secp256r1"),this.setNamedCurve(this.curveName),void 0!==t&&(void 0!==t.prv&&this.setPrivateKeyHex(t.prv),void 0!==t.pub&&this.setPublicKeyHex(t.pub))},br.crypto.ECDSA.parseSigHex=function(t){var e=br.crypto.ECDSA.parseSigHexInHexRS(t);return{r:new F(e.r,16),s:new F(e.s,16)}},br.crypto.ECDSA.parseSigHexInHexRS=function(t){var e=Er,r=e.getChildIdx,n=e.getV;if(e.checkStrictDER(t,0),"30"!=t.substr(0,2))throw new Error("signature is not a ASN.1 sequence");var i=r(t,0);if(2!=i.length)throw new Error("signature shall have two elements");var o=i[0],s=i[1];if("02"!=t.substr(o,2))throw new Error("1st item not ASN.1 integer");if("02"!=t.substr(s,2))throw new Error("2nd item not ASN.1 integer");return{r:n(t,o),s:n(t,s)}},br.crypto.ECDSA.asn1SigToConcatSig=function(t){var e=br.crypto.ECDSA.parseSigHexInHexRS(t),r=e.r,n=e.s;if("00"==r.substr(0,2)&&r.length%32==2&&(r=r.substr(2)),"00"==n.substr(0,2)&&n.length%32==2&&(n=n.substr(2)),r.length%32==30&&(r="00"+r),n.length%32==30&&(n="00"+n),r.length%32!=0)throw"unknown ECDSA sig r length error";if(n.length%32!=0)throw"unknown ECDSA sig s length error";return r+n},br.crypto.ECDSA.concatSigToASN1Sig=function(t){if(t.length/2*8%128!=0)throw"unknown ECDSA concatinated r-s sig  length error";var e=t.substr(0,t.length/2),r=t.substr(t.length/2);return br.crypto.ECDSA.hexRSSigToASN1Sig(e,r)},br.crypto.ECDSA.hexRSSigToASN1Sig=function(t,e){var r=new F(t,16),n=new F(e,16);return br.crypto.ECDSA.biRSSigToASN1Sig(r,n)},br.crypto.ECDSA.biRSSigToASN1Sig=function(t,e){var r=br.asn1,n=new r.DERInteger({bigint:t}),i=new r.DERInteger({bigint:e});return new r.DERSequence({array:[n,i]}).getEncodedHex()},br.crypto.ECDSA.getName=function(t){return"2b8104001f"===t?"secp192k1":"2a8648ce3d030107"===t?"secp256r1":"2b8104000a"===t?"secp256k1":"2b81040021"===t?"secp224r1":"2b81040022"===t?"secp384r1":-1!=="|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(t)?"secp256r1":-1!=="|secp256k1|".indexOf(t)?"secp256k1":-1!=="|secp224r1|NIST P-224|P-224|".indexOf(t)?"secp224r1":-1!=="|secp384r1|NIST P-384|P-384|".indexOf(t)?"secp384r1":null},void 0!==br&&br||(e.KJUR=br={}),void 0!==br.crypto&&br.crypto||(br.crypto={}),br.crypto.ECParameterDB=new function(){var t={},e={};function r(t){return new F(t,16)}this.getByName=function(r){var n=r;if(void 0!==e[n]&&(n=e[r]),void 0!==t[n])return t[n];throw"unregistered EC curve name: "+n},this.regist=function(n,i,o,s,a,u,c,h,l,f,g,d){t[n]={};var p=r(o),v=r(s),y=r(a),m=r(u),_=r(c),S=new qe(p,v,y),b=S.decodePointHex("04"+h+l);t[n].name=n,t[n].keylen=i,t[n].curve=S,t[n].G=b,t[n].n=m,t[n].h=_,t[n].oid=g,t[n].info=d;for(var w=0;w<f.length;w++)e[f[w]]=n}},br.crypto.ECParameterDB.regist("secp128r1",128,"FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC","E87579C11079F43DD824993C2CEE5ED3","FFFFFFFE0000000075A30D1B9038A115","1","161FF7528B899B2D0C28607CA52C5B86","CF5AC8395BAFEB13C02DA292DDED7A83",[],"","secp128r1 : SECG curve over a 128 bit prime field"),br.crypto.ECParameterDB.regist("secp160k1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73","0","7","0100000000000000000001B8FA16DFAB9ACA16B6B3","1","3B4C382CE37AA192A4019E763036F4F5DD4D7EBB","938CF935318FDCED6BC28286531733C3F03C4FEE",[],"","secp160k1 : SECG curve over a 160 bit prime field"),br.crypto.ECParameterDB.regist("secp160r1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC","1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45","0100000000000000000001F4C8F927AED3CA752257","1","4A96B5688EF573284664698968C38BB913CBFC82","23A628553168947D59DCC912042351377AC5FB32",[],"","secp160r1 : SECG curve over a 160 bit prime field"),br.crypto.ECParameterDB.regist("secp192k1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37","0","3","FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D","1","DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D","9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D",[]),br.crypto.ECParameterDB.regist("secp192r1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC","64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1","FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831","1","188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012","07192B95FFC8DA78631011ED6B24CDD573F977A11E794811",[]),br.crypto.ECParameterDB.regist("secp224r1",224,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE","B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4","FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D","1","B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21","BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",[]),br.crypto.ECParameterDB.regist("secp256k1",256,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F","0","7","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141","1","79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798","483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",[]),br.crypto.ECParameterDB.regist("secp256r1",256,"FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC","5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B","FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551","1","6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296","4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",["NIST P-256","P-256","prime256v1"]),br.crypto.ECParameterDB.regist("secp384r1",384,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC","B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973","1","AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7","3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",["NIST P-384","P-384"]),br.crypto.ECParameterDB.regist("secp521r1",521,"1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC","051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409","1","C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",["NIST P-521","P-521"]);var Zr=function(){var t=function t(r,n,i){return e(y.AES,r,n,i)},e=function t(e,r,n,i){var o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a=y.enc.Hex.parse(i),u={};u.key=s,u.iv=a,u.ciphertext=o;var c=e.decrypt(u,s,{iv:a});return y.enc.Hex.stringify(c)},r=function t(e,r,i){return n(y.AES,e,r,i)},n=function t(e,r,n,i){var o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a=y.enc.Hex.parse(i),u=e.encrypt(o,s,{iv:a}),c=y.enc.Hex.parse(u.toString());return y.enc.Base64.stringify(c)},i={"AES-256-CBC":{proc:t,eproc:r,keylen:32,ivlen:16},"AES-192-CBC":{proc:t,eproc:r,keylen:24,ivlen:16},"AES-128-CBC":{proc:t,eproc:r,keylen:16,ivlen:16},"DES-EDE3-CBC":{proc:function t(r,n,i){return e(y.TripleDES,r,n,i)},eproc:function t(e,r,i){return n(y.TripleDES,e,r,i)},keylen:24,ivlen:8},"DES-CBC":{proc:function t(r,n,i){return e(y.DES,r,n,i)},eproc:function t(e,r,i){return n(y.DES,e,r,i)},keylen:8,ivlen:8}},o=function t(e){var r={},n=e.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));n&&(r.cipher=n[1],r.ivsalt=n[2]);var i=e.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));i&&(r.type=i[1]);var o=-1,s=0;-1!=e.indexOf("\r\n\r\n")&&(o=e.indexOf("\r\n\r\n"),s=2),-1!=e.indexOf("\n\n")&&(o=e.indexOf("\n\n"),s=1);var a=e.indexOf("-----END");if(-1!=o&&-1!=a){var u=e.substring(o+2*s,a-s);u=u.replace(/\s+/g,""),r.data=u}return r},s=function t(e,r,n){for(var o=n.substring(0,16),s=y.enc.Hex.parse(o),a=y.enc.Utf8.parse(r),u=i[e].keylen+i[e].ivlen,c="",h=null;;){var l=y.algo.MD5.create();if(null!=h&&l.update(h),l.update(a),l.update(s),h=l.finalize(),(c+=y.enc.Hex.stringify(h)).length>=2*u)break}var f={};return f.keyhex=c.substr(0,2*i[e].keylen),f.ivhex=c.substr(2*i[e].keylen,2*i[e].ivlen),f},a=function t(e,r,n,o){var s=y.enc.Base64.parse(e),a=y.enc.Hex.stringify(s);return(0,i[r].proc)(a,n,o)};return{version:"1.0.0",parsePKCS5PEM:function t(e){return o(e)},getKeyAndUnusedIvByPasscodeAndIvsalt:function t(e,r,n){return s(e,r,n)},decryptKeyB64:function t(e,r,n,i){return a(e,r,n,i)},getDecryptedKeyHex:function t(e,r){var n=o(e),i=(n.type,n.cipher),u=n.ivsalt,c=n.data,h=s(i,r,u).keyhex;return a(c,i,h,u)},getEncryptedPKCS5PEMFromPrvKeyHex:function t(e,r,n,o,a){var u="";if(void 0!==o&&null!=o||(o="AES-256-CBC"),void 0===i[o])throw"KEYUTIL unsupported algorithm: "+o;void 0!==a&&null!=a||(a=function t(e){var r=y.lib.WordArray.random(e);return y.enc.Hex.stringify(r)}(i[o].ivlen).toUpperCase());var c=function t(e,r,n,o){return(0,i[r].eproc)(e,n,o)}(r,o,s(o,n,a).keyhex,a);u="-----BEGIN "+e+" PRIVATE KEY-----\r\n";return u+="Proc-Type: 4,ENCRYPTED\r\n",u+="DEK-Info: "+o+","+a+"\r\n",u+="\r\n",u+=c.replace(/(.{64})/g,"$1\r\n"),u+="\r\n-----END "+e+" PRIVATE KEY-----\r\n"},parseHexOfEncryptedPKCS8:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={},s=n(e,0);if(2!=s.length)throw"malformed format: SEQUENCE(0).items != 2: "+s.length;o.ciphertext=i(e,s[1]);var a=n(e,s[0]);if(2!=a.length)throw"malformed format: SEQUENCE(0.0).items != 2: "+a.length;if("2a864886f70d01050d"!=i(e,a[0]))throw"this only supports pkcs5PBES2";var u=n(e,a[1]);if(2!=a.length)throw"malformed format: SEQUENCE(0.0.1).items != 2: "+u.length;var c=n(e,u[1]);if(2!=c.length)throw"malformed format: SEQUENCE(0.0.1.1).items != 2: "+c.length;if("2a864886f70d0307"!=i(e,c[0]))throw"this only supports TripleDES";o.encryptionSchemeAlg="TripleDES",o.encryptionSchemeIV=i(e,c[1]);var h=n(e,u[0]);if(2!=h.length)throw"malformed format: SEQUENCE(0.0.1.0).items != 2: "+h.length;if("2a864886f70d01050c"!=i(e,h[0]))throw"this only supports pkcs5PBKDF2";var l=n(e,h[1]);if(l.length<2)throw"malformed format: SEQUENCE(0.0.1.0.1).items < 2: "+l.length;o.pbkdf2Salt=i(e,l[0]);var f=i(e,l[1]);try{o.pbkdf2Iter=parseInt(f,16)}catch(t){throw"malformed format pbkdf2Iter: "+f}return o},getPBKDF2KeyHexFromParam:function t(e,r){var n=y.enc.Hex.parse(e.pbkdf2Salt),i=e.pbkdf2Iter,o=y.PBKDF2(r,n,{keySize:6,iterations:i});return y.enc.Hex.stringify(o)},_getPlainPKCS8HexFromEncryptedPKCS8PEM:function t(e,r){var n=Hr(e,"ENCRYPTED PRIVATE KEY"),i=this.parseHexOfEncryptedPKCS8(n),o=Zr.getPBKDF2KeyHexFromParam(i,r),s={};s.ciphertext=y.enc.Hex.parse(i.ciphertext);var a=y.enc.Hex.parse(o),u=y.enc.Hex.parse(i.encryptionSchemeIV),c=y.TripleDES.decrypt(s,a,{iv:u});return y.enc.Hex.stringify(c)},getKeyFromEncryptedPKCS8PEM:function t(e,r){var n=this._getPlainPKCS8HexFromEncryptedPKCS8PEM(e,r);return this.getKeyFromPlainPrivatePKCS8Hex(n)},parsePlainPrivatePKCS8Hex:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={algparam:null};if("30"!=e.substr(0,2))throw"malformed plain PKCS8 private key(code:001)";var s=n(e,0);if(3!=s.length)throw"malformed plain PKCS8 private key(code:002)";if("30"!=e.substr(s[1],2))throw"malformed PKCS8 private key(code:003)";var a=n(e,s[1]);if(2!=a.length)throw"malformed PKCS8 private key(code:004)";if("06"!=e.substr(a[0],2))throw"malformed PKCS8 private key(code:005)";if(o.algoid=i(e,a[0]),"06"==e.substr(a[1],2)&&(o.algparam=i(e,a[1])),"04"!=e.substr(s[2],2))throw"malformed PKCS8 private key(code:006)";return o.keyidx=r.getVidx(e,s[2]),o},getKeyFromPlainPrivatePKCS8PEM:function t(e){var r=Hr(e,"PRIVATE KEY");return this.getKeyFromPlainPrivatePKCS8Hex(r)},getKeyFromPlainPrivatePKCS8Hex:function t(e){var r,n=this.parsePlainPrivatePKCS8Hex(e);if("2a864886f70d010101"==n.algoid)r=new He;else if("2a8648ce380401"==n.algoid)r=new br.crypto.DSA;else{if("2a8648ce3d0201"!=n.algoid)throw"unsupported private key algorithm";r=new br.crypto.ECDSA}return r.readPKCS8PrvKeyHex(e),r},_getKeyFromPublicPKCS8Hex:function t(e){var r,n=Er.getVbyList(e,0,[0,0],"06");if("2a864886f70d010101"===n)r=new He;else if("2a8648ce380401"===n)r=new br.crypto.DSA;else{if("2a8648ce3d0201"!==n)throw"unsupported PKCS#8 public key hex";r=new br.crypto.ECDSA}return r.readPKCS8PubKeyHex(e),r},parsePublicRawRSAKeyHex:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={};if("30"!=e.substr(0,2))throw"malformed RSA key(code:001)";var s=n(e,0);if(2!=s.length)throw"malformed RSA key(code:002)";if("02"!=e.substr(s[0],2))throw"malformed RSA key(code:003)";if(o.n=i(e,s[0]),"02"!=e.substr(s[1],2))throw"malformed RSA key(code:004)";return o.e=i(e,s[1]),o},parsePublicPKCS8Hex:function t(e){var r=Er,n=r.getChildIdx,i=r.getV,o={algparam:null},s=n(e,0);if(2!=s.length)throw"outer DERSequence shall have 2 elements: "+s.length;var a=s[0];if("30"!=e.substr(a,2))throw"malformed PKCS8 public key(code:001)";var u=n(e,a);if(2!=u.length)throw"malformed PKCS8 public key(code:002)";if("06"!=e.substr(u[0],2))throw"malformed PKCS8 public key(code:003)";if(o.algoid=i(e,u[0]),"06"==e.substr(u[1],2)?o.algparam=i(e,u[1]):"30"==e.substr(u[1],2)&&(o.algparam={},o.algparam.p=r.getVbyList(e,u[1],[0],"02"),o.algparam.q=r.getVbyList(e,u[1],[1],"02"),o.algparam.g=r.getVbyList(e,u[1],[2],"02")),"03"!=e.substr(s[1],2))throw"malformed PKCS8 public key(code:004)";return o.key=i(e,s[1]).substr(2),o}}}();Zr.getKey=function(t,e,r){var n=(v=Er).getChildIdx,i=(v.getV,v.getVbyList),o=br.crypto,s=o.ECDSA,a=o.DSA,u=He,c=Hr,h=Zr;if(void 0!==u&&t instanceof u)return t;if(void 0!==s&&t instanceof s)return t;if(void 0!==a&&t instanceof a)return t;if(void 0!==t.curve&&void 0!==t.xy&&void 0===t.d)return new s({pub:t.xy,curve:t.curve});if(void 0!==t.curve&&void 0!==t.d)return new s({prv:t.d,curve:t.curve});if(void 0===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0===t.d)return(P=new u).setPublic(t.n,t.e),P;if(void 0===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d&&void 0!==t.p&&void 0!==t.q&&void 0!==t.dp&&void 0!==t.dq&&void 0!==t.co&&void 0===t.qi)return(P=new u).setPrivateEx(t.n,t.e,t.d,t.p,t.q,t.dp,t.dq,t.co),P;if(void 0===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d&&void 0===t.p)return(P=new u).setPrivate(t.n,t.e,t.d),P;if(void 0!==t.p&&void 0!==t.q&&void 0!==t.g&&void 0!==t.y&&void 0===t.x)return(P=new a).setPublic(t.p,t.q,t.g,t.y),P;if(void 0!==t.p&&void 0!==t.q&&void 0!==t.g&&void 0!==t.y&&void 0!==t.x)return(P=new a).setPrivate(t.p,t.q,t.g,t.y,t.x),P;if("RSA"===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0===t.d)return(P=new u).setPublic(Ir(t.n),Ir(t.e)),P;if("RSA"===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d&&void 0!==t.p&&void 0!==t.q&&void 0!==t.dp&&void 0!==t.dq&&void 0!==t.qi)return(P=new u).setPrivateEx(Ir(t.n),Ir(t.e),Ir(t.d),Ir(t.p),Ir(t.q),Ir(t.dp),Ir(t.dq),Ir(t.qi)),P;if("RSA"===t.kty&&void 0!==t.n&&void 0!==t.e&&void 0!==t.d)return(P=new u).setPrivate(Ir(t.n),Ir(t.e),Ir(t.d)),P;if("EC"===t.kty&&void 0!==t.crv&&void 0!==t.x&&void 0!==t.y&&void 0===t.d){var l=(k=new s({curve:t.crv})).ecparams.keylen/4,f="04"+("0000000000"+Ir(t.x)).slice(-l)+("0000000000"+Ir(t.y)).slice(-l);return k.setPublicKeyHex(f),k}if("EC"===t.kty&&void 0!==t.crv&&void 0!==t.x&&void 0!==t.y&&void 0!==t.d){l=(k=new s({curve:t.crv})).ecparams.keylen/4,f="04"+("0000000000"+Ir(t.x)).slice(-l)+("0000000000"+Ir(t.y)).slice(-l);var g=("0000000000"+Ir(t.d)).slice(-l);return k.setPublicKeyHex(f),k.setPrivateKeyHex(g),k}if("pkcs5prv"===r){var d,p=t,v=Er;if(9===(d=n(p,0)).length)(P=new u).readPKCS5PrvKeyHex(p);else if(6===d.length)(P=new a).readPKCS5PrvKeyHex(p);else{if(!(d.length>2&&"04"===p.substr(d[1],2)))throw"unsupported PKCS#1/5 hexadecimal key";(P=new s).readPKCS5PrvKeyHex(p)}return P}if("pkcs8prv"===r)return P=h.getKeyFromPlainPrivatePKCS8Hex(t);if("pkcs8pub"===r)return h._getKeyFromPublicPKCS8Hex(t);if("x509pub"===r)return on.getPublicKeyFromCertHex(t);if(-1!=t.indexOf("-END CERTIFICATE-",0)||-1!=t.indexOf("-END X509 CERTIFICATE-",0)||-1!=t.indexOf("-END TRUSTED CERTIFICATE-",0))return on.getPublicKeyFromCertPEM(t);if(-1!=t.indexOf("-END PUBLIC KEY-")){var y=Hr(t,"PUBLIC KEY");return h._getKeyFromPublicPKCS8Hex(y)}if(-1!=t.indexOf("-END RSA PRIVATE KEY-")&&-1==t.indexOf("4,ENCRYPTED")){var m=c(t,"RSA PRIVATE KEY");return h.getKey(m,null,"pkcs5prv")}if(-1!=t.indexOf("-END DSA PRIVATE KEY-")&&-1==t.indexOf("4,ENCRYPTED")){var _=i(R=c(t,"DSA PRIVATE KEY"),0,[1],"02"),S=i(R,0,[2],"02"),b=i(R,0,[3],"02"),w=i(R,0,[4],"02"),E=i(R,0,[5],"02");return(P=new a).setPrivate(new F(_,16),new F(S,16),new F(b,16),new F(w,16),new F(E,16)),P}if(-1!=t.indexOf("-END EC PRIVATE KEY-")&&-1==t.indexOf("4,ENCRYPTED")){m=c(t,"EC PRIVATE KEY");return h.getKey(m,null,"pkcs5prv")}if(-1!=t.indexOf("-END PRIVATE KEY-"))return h.getKeyFromPlainPrivatePKCS8PEM(t);if(-1!=t.indexOf("-END RSA PRIVATE KEY-")&&-1!=t.indexOf("4,ENCRYPTED")){var x=h.getDecryptedKeyHex(t,e),A=new He;return A.readPKCS5PrvKeyHex(x),A}if(-1!=t.indexOf("-END EC PRIVATE KEY-")&&-1!=t.indexOf("4,ENCRYPTED")){var k,P=i(R=h.getDecryptedKeyHex(t,e),0,[1],"04"),C=i(R,0,[2,0],"06"),T=i(R,0,[3,0],"03").substr(2);if(void 0===br.crypto.OID.oidhex2name[C])throw"undefined OID(hex) in KJUR.crypto.OID: "+C;return(k=new s({curve:br.crypto.OID.oidhex2name[C]})).setPublicKeyHex(T),k.setPrivateKeyHex(P),k.isPublic=!1,k}if(-1!=t.indexOf("-END DSA PRIVATE KEY-")&&-1!=t.indexOf("4,ENCRYPTED")){var R;_=i(R=h.getDecryptedKeyHex(t,e),0,[1],"02"),S=i(R,0,[2],"02"),b=i(R,0,[3],"02"),w=i(R,0,[4],"02"),E=i(R,0,[5],"02");return(P=new a).setPrivate(new F(_,16),new F(S,16),new F(b,16),new F(w,16),new F(E,16)),P}if(-1!=t.indexOf("-END ENCRYPTED PRIVATE KEY-"))return h.getKeyFromEncryptedPKCS8PEM(t,e);throw new Error("not supported argument")},Zr.generateKeypair=function(t,e){if("RSA"==t){var r=e;(s=new He).generate(r,"10001"),s.isPrivate=!0,s.isPublic=!0;var n=new He,i=s.n.toString(16),o=s.e.toString(16);return n.setPublic(i,o),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}if("EC"==t){var s,a,u=e,c=new br.crypto.ECDSA({curve:u}).generateKeyPairHex();return(s=new br.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),s.setPrivateKeyHex(c.ecprvhex),s.isPrivate=!0,s.isPublic=!1,(n=new br.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}throw"unknown algorithm: "+t},Zr.getPEM=function(t,e,r,n,i,o){var s=br,a=s.asn1,u=a.DERObjectIdentifier,c=a.DERInteger,h=a.ASN1Util.newObject,l=a.x509.SubjectPublicKeyInfo,f=s.crypto,g=f.DSA,d=f.ECDSA,p=He;function v(t){return h({seq:[{int:0},{int:{bigint:t.n}},{int:t.e},{int:{bigint:t.d}},{int:{bigint:t.p}},{int:{bigint:t.q}},{int:{bigint:t.dmp1}},{int:{bigint:t.dmq1}},{int:{bigint:t.coeff}}]})}function m(t){return h({seq:[{int:1},{octstr:{hex:t.prvKeyHex}},{tag:["a0",!0,{oid:{name:t.curveName}}]},{tag:["a1",!0,{bitstr:{hex:"00"+t.pubKeyHex}}]}]})}function _(t){return h({seq:[{int:0},{int:{bigint:t.p}},{int:{bigint:t.q}},{int:{bigint:t.g}},{int:{bigint:t.y}},{int:{bigint:t.x}}]})}if((void 0!==p&&t instanceof p||void 0!==g&&t instanceof g||void 0!==d&&t instanceof d)&&1==t.isPublic&&(void 0===e||"PKCS8PUB"==e))return Mr(F=new l(t).getEncodedHex(),"PUBLIC KEY");if("PKCS1PRV"==e&&void 0!==p&&t instanceof p&&(void 0===r||null==r)&&1==t.isPrivate)return Mr(F=v(t).getEncodedHex(),"RSA PRIVATE KEY");if("PKCS1PRV"==e&&void 0!==d&&t instanceof d&&(void 0===r||null==r)&&1==t.isPrivate){var S=new u({name:t.curveName}).getEncodedHex(),b=m(t).getEncodedHex(),w="";return w+=Mr(S,"EC PARAMETERS"),w+=Mr(b,"EC PRIVATE KEY")}if("PKCS1PRV"==e&&void 0!==g&&t instanceof g&&(void 0===r||null==r)&&1==t.isPrivate)return Mr(F=_(t).getEncodedHex(),"DSA PRIVATE KEY");if("PKCS5PRV"==e&&void 0!==p&&t instanceof p&&void 0!==r&&null!=r&&1==t.isPrivate){var F=v(t).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA",F,r,n,o)}if("PKCS5PRV"==e&&void 0!==d&&t instanceof d&&void 0!==r&&null!=r&&1==t.isPrivate){F=m(t).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("EC",F,r,n,o)}if("PKCS5PRV"==e&&void 0!==g&&t instanceof g&&void 0!==r&&null!=r&&1==t.isPrivate){F=_(t).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA",F,r,n,o)}var E=function t(e,r){var n=x(e,r);return new h({seq:[{seq:[{oid:{name:"pkcs5PBES2"}},{seq:[{seq:[{oid:{name:"pkcs5PBKDF2"}},{seq:[{octstr:{hex:n.pbkdf2Salt}},{int:n.pbkdf2Iter}]}]},{seq:[{oid:{name:"des-EDE3-CBC"}},{octstr:{hex:n.encryptionSchemeIV}}]}]}]},{octstr:{hex:n.ciphertext}}]}).getEncodedHex()},x=function t(e,r){var n=y.lib.WordArray.random(8),i=y.lib.WordArray.random(8),o=y.PBKDF2(r,n,{keySize:6,iterations:100}),s=y.enc.Hex.parse(e),a=y.TripleDES.encrypt(s,o,{iv:i})+"",u={};return u.ciphertext=a,u.pbkdf2Salt=y.enc.Hex.stringify(n),u.pbkdf2Iter=100,u.encryptionSchemeAlg="DES-EDE3-CBC",u.encryptionSchemeIV=y.enc.Hex.stringify(i),u};if("PKCS8PRV"==e&&null!=p&&t instanceof p&&1==t.isPrivate){var A=v(t).getEncodedHex();F=h({seq:[{int:0},{seq:[{oid:{name:"rsaEncryption"}},{null:!0}]},{octstr:{hex:A}}]}).getEncodedHex();return void 0===r||null==r?Mr(F,"PRIVATE KEY"):Mr(b=E(F,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==e&&void 0!==d&&t instanceof d&&1==t.isPrivate){A=new h({seq:[{int:1},{octstr:{hex:t.prvKeyHex}},{tag:["a1",!0,{bitstr:{hex:"00"+t.pubKeyHex}}]}]}).getEncodedHex(),F=h({seq:[{int:0},{seq:[{oid:{name:"ecPublicKey"}},{oid:{name:t.curveName}}]},{octstr:{hex:A}}]}).getEncodedHex();return void 0===r||null==r?Mr(F,"PRIVATE KEY"):Mr(b=E(F,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==e&&void 0!==g&&t instanceof g&&1==t.isPrivate){A=new c({bigint:t.x}).getEncodedHex(),F=h({seq:[{int:0},{seq:[{oid:{name:"dsa"}},{seq:[{int:{bigint:t.p}},{int:{bigint:t.q}},{int:{bigint:t.g}}]}]},{octstr:{hex:A}}]}).getEncodedHex();return void 0===r||null==r?Mr(F,"PRIVATE KEY"):Mr(b=E(F,r),"ENCRYPTED PRIVATE KEY")}throw new Error("unsupported object nor format")},Zr.getKeyFromCSRPEM=function(t){var e=Hr(t,"CERTIFICATE REQUEST");return Zr.getKeyFromCSRHex(e)},Zr.getKeyFromCSRHex=function(t){var e=Zr.parseCSRHex(t);return Zr.getKey(e.p8pubkeyhex,null,"pkcs8pub")},Zr.parseCSRHex=function(t){var e=Er,r=e.getChildIdx,n=e.getTLV,i={},o=t;if("30"!=o.substr(0,2))throw"malformed CSR(code:001)";var s=r(o,0);if(s.length<1)throw"malformed CSR(code:002)";if("30"!=o.substr(s[0],2))throw"malformed CSR(code:003)";var a=r(o,s[0]);if(a.length<3)throw"malformed CSR(code:004)";return i.p8pubkeyhex=n(o,a[2]),i},Zr.getKeyID=function(t){var e=Zr,r=Er;"string"==typeof t&&-1!=t.indexOf("BEGIN ")&&(t=e.getKey(t));var n=Hr(e.getPEM(t)),i=r.getIdxbyList(n,0,[1]),o=r.getV(n,i).substring(2);return br.crypto.Util.hashHex(o,"sha1")},Zr.getJWKFromKey=function(t){var e={};if(t instanceof He&&t.isPrivate)return e.kty="RSA",e.n=Rr(t.n.toString(16)),e.e=Rr(t.e.toString(16)),e.d=Rr(t.d.toString(16)),e.p=Rr(t.p.toString(16)),e.q=Rr(t.q.toString(16)),e.dp=Rr(t.dmp1.toString(16)),e.dq=Rr(t.dmq1.toString(16)),e.qi=Rr(t.coeff.toString(16)),e;if(t instanceof He&&t.isPublic)return e.kty="RSA",e.n=Rr(t.n.toString(16)),e.e=Rr(t.e.toString(16)),e;if(t instanceof br.crypto.ECDSA&&t.isPrivate){if("P-256"!==(n=t.getShortNISTPCurveName())&&"P-384"!==n)throw"unsupported curve name for JWT: "+n;var r=t.getPublicKeyXYHex();return e.kty="EC",e.crv=n,e.x=Rr(r.x),e.y=Rr(r.y),e.d=Rr(t.prvKeyHex),e}if(t instanceof br.crypto.ECDSA&&t.isPublic){var n;if("P-256"!==(n=t.getShortNISTPCurveName())&&"P-384"!==n)throw"unsupported curve name for JWT: "+n;r=t.getPublicKeyXYHex();return e.kty="EC",e.crv=n,e.x=Rr(r.x),e.y=Rr(r.y),e}throw"not supported key object"},He.getPosArrayOfChildrenFromHex=function(t){return Er.getChildIdx(t,0)},He.getHexValueArrayOfChildrenFromHex=function(t){var e,r=Er.getV,n=r(t,(e=He.getPosArrayOfChildrenFromHex(t))[0]),i=r(t,e[1]),o=r(t,e[2]),s=r(t,e[3]),a=r(t,e[4]),u=r(t,e[5]),c=r(t,e[6]),h=r(t,e[7]),l=r(t,e[8]);return(e=new Array).push(n,i,o,s,a,u,c,h,l),e},He.prototype.readPrivateKeyFromPEMString=function(t){var e=Hr(t),r=He.getHexValueArrayOfChildrenFromHex(e);this.setPrivateEx(r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8])},He.prototype.readPKCS5PrvKeyHex=function(t){var e=He.getHexValueArrayOfChildrenFromHex(t);this.setPrivateEx(e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])},He.prototype.readPKCS8PrvKeyHex=function(t){var e,r,n,i,o,s,a,u,c=Er,h=c.getVbyListEx;if(!1===c.isASN1HEX(t))throw new Error("not ASN.1 hex string");try{e=h(t,0,[2,0,1],"02"),r=h(t,0,[2,0,2],"02"),n=h(t,0,[2,0,3],"02"),i=h(t,0,[2,0,4],"02"),o=h(t,0,[2,0,5],"02"),s=h(t,0,[2,0,6],"02"),a=h(t,0,[2,0,7],"02"),u=h(t,0,[2,0,8],"02")}catch(t){throw new Error("malformed PKCS#8 plain RSA private key")}this.setPrivateEx(e,r,n,i,o,s,a,u)},He.prototype.readPKCS5PubKeyHex=function(t){var e=Er,r=e.getV;if(!1===e.isASN1HEX(t))throw new Error("keyHex is not ASN.1 hex string");var n=e.getChildIdx(t,0);if(2!==n.length||"02"!==t.substr(n[0],2)||"02"!==t.substr(n[1],2))throw new Error("wrong hex for PKCS#5 public key");var i=r(t,n[0]),o=r(t,n[1]);this.setPublic(i,o)},He.prototype.readPKCS8PubKeyHex=function(t){var e=Er;if(!1===e.isASN1HEX(t))throw new Error("not ASN.1 hex string");if("06092a864886f70d010101"!==e.getTLVbyListEx(t,0,[0,0]))throw new Error("not PKCS8 RSA public key");var r=e.getTLVbyListEx(t,0,[1,0]);this.readPKCS5PubKeyHex(r)},He.prototype.readCertPubKeyHex=function(t,e){var r,n;(r=new on).readCertHex(t),n=r.getPublicKeyHex(),this.readPKCS8PubKeyHex(n)};var tn=new RegExp("[^0-9a-f]","gi");function en(t,e){for(var r="",n=e/4-t.length,i=0;i<n;i++)r+="0";return r+t}function rn(t,e,r){for(var n="",i=0;n.length<e;)n+=Nr(r(Ur(t+String.fromCharCode.apply(String,[(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i])))),i+=1;return n}function nn(t){for(var e in br.crypto.Util.DIGESTINFOHEAD){var r=br.crypto.Util.DIGESTINFOHEAD[e],n=r.length;if(t.substring(0,n)==r)return[e,t.substring(n)]}return[]}function on(t){var e,r=Er,n=r.getChildIdx,i=r.getV,o=r.getTLV,s=r.getVbyList,a=r.getVbyListEx,u=r.getTLVbyList,c=r.getTLVbyListEx,h=r.getIdxbyList,l=r.getIdxbyListEx,f=r.getVidx,g=r.oidname,d=r.hextooidstr,p=on,v=Hr;try{e=br.asn1.x509.AlgorithmIdentifier.PSSNAME2ASN1TLV}catch(t){}this.HEX2STAG={"0c":"utf8",13:"prn",16:"ia5","1a":"vis","1e":"bmp"},this.hex=null,this.version=0,this.foffset=0,this.aExtInfo=null,this.getVersion=function(){return null===this.hex||0!==this.version?this.version:"a003020102"!==u(this.hex,0,[0,0])?(this.version=1,this.foffset=-1,1):(this.version=3,3)},this.getSerialNumberHex=function(){return a(this.hex,0,[0,0],"02")},this.getSignatureAlgorithmField=function(){var t=c(this.hex,0,[0,1]);return this.getAlgorithmIdentifierName(t)},this.getAlgorithmIdentifierName=function(t){for(var r in e)if(t===e[r])return r;return g(a(t,0,[0],"06"))},this.getIssuer=function(){return this.getX500Name(this.getIssuerHex())},this.getIssuerHex=function(){return u(this.hex,0,[0,3+this.foffset],"30")},this.getIssuerString=function(){return p.hex2dn(this.getIssuerHex())},this.getSubject=function(){return this.getX500Name(this.getSubjectHex())},this.getSubjectHex=function(){return u(this.hex,0,[0,5+this.foffset],"30")},this.getSubjectString=function(){return p.hex2dn(this.getSubjectHex())},this.getNotBefore=function(){var t=s(this.hex,0,[0,4+this.foffset,0]);return t=t.replace(/(..)/g,"%$1"),t=decodeURIComponent(t)},this.getNotAfter=function(){var t=s(this.hex,0,[0,4+this.foffset,1]);return t=t.replace(/(..)/g,"%$1"),t=decodeURIComponent(t)},this.getPublicKeyHex=function(){return r.getTLVbyList(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyIdx=function(){return h(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyContentIdx=function(){var t=this.getPublicKeyIdx();return h(this.hex,t,[1,0],"30")},this.getPublicKey=function(){return Zr.getKey(this.getPublicKeyHex(),null,"pkcs8pub")},this.getSignatureAlgorithmName=function(){var t=u(this.hex,0,[1],"30");return this.getAlgorithmIdentifierName(t)},this.getSignatureValueHex=function(){return s(this.hex,0,[2],"03",!0)},this.verifySignature=function(t){var e=this.getSignatureAlgorithmField(),r=this.getSignatureValueHex(),n=u(this.hex,0,[0],"30"),i=new br.crypto.Signature({alg:e});return i.init(t),i.updateHex(n),i.verify(r)},this.parseExt=function(t){var e,o,a;if(void 0===t){if(a=this.hex,3!==this.version)return-1;e=h(a,0,[0,7,0],"30"),o=n(a,e)}else{a=Hr(t);var u=h(a,0,[0,3,0,0],"06");if("2a864886f70d01090e"!=i(a,u))return void(this.aExtInfo=new Array);e=h(a,0,[0,3,0,1,0],"30"),o=n(a,e),this.hex=a}this.aExtInfo=new Array;for(var c=0;c<o.length;c++){var l={critical:!1},g=0;3===n(a,o[c]).length&&(l.critical=!0,g=1),l.oid=r.hextooidstr(s(a,o[c],[0],"06"));var d=h(a,o[c],[1+g]);l.vidx=f(a,d),this.aExtInfo.push(l)}},this.getExtInfo=function(t){var e=this.aExtInfo,r=t;if(t.match(/^[0-9.]+$/)||(r=br.asn1.x509.OID.name2oid(t)),""!==r)for(var n=0;n<e.length;n++)if(e[n].oid===r)return e[n]},this.getExtBasicConstraints=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("basicConstraints");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var n={extname:"basicConstraints"};if(e&&(n.critical=!0),"3000"===t)return n;if("30030101ff"===t)return n.cA=!0,n;if("30060101ff02"===t.substr(0,12)){var s=i(t,10),a=parseInt(s,16);return n.cA=!0,n.pathLen=a,n}throw new Error("hExtV parse error: "+t)},this.getExtKeyUsage=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("keyUsage");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var n={extname:"keyUsage"};return e&&(n.critical=!0),n.names=this.getExtKeyUsageString(t).split(","),n},this.getExtKeyUsageBin=function(t){if(void 0===t){var e=this.getExtInfo("keyUsage");if(void 0===e)return"";t=o(this.hex,e.vidx)}if(8!=t.length&&10!=t.length)throw new Error("malformed key usage value: "+t);var r="000000000000000"+parseInt(t.substr(6),16).toString(2);return 8==t.length&&(r=r.slice(-8)),10==t.length&&(r=r.slice(-16)),""==(r=r.replace(/0+$/,""))&&(r="0"),r},this.getExtKeyUsageString=function(t){for(var e=this.getExtKeyUsageBin(t),r=new Array,n=0;n<e.length;n++)"1"==e.substr(n,1)&&r.push(on.KEYUSAGE_NAME[n]);return r.join(",")},this.getExtSubjectKeyIdentifier=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("subjectKeyIdentifier");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var n={extname:"subjectKeyIdentifier"};e&&(n.critical=!0);var s=i(t,0);return n.kid={hex:s},n},this.getExtAuthorityKeyIdentifier=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("authorityKeyIdentifier");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var s={extname:"authorityKeyIdentifier"};e&&(s.critical=!0);for(var a=n(t,0),u=0;u<a.length;u++){var c=t.substr(a[u],2);if("80"===c&&(s.kid={hex:i(t,a[u])}),"a1"===c){var h=o(t,a[u]),l=this.getGeneralNames(h);s.issuer=l[0].dn}"82"===c&&(s.sn={hex:i(t,a[u])})}return s},this.getExtExtKeyUsage=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("extKeyUsage");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var s={extname:"extKeyUsage",array:[]};e&&(s.critical=!0);for(var a=n(t,0),u=0;u<a.length;u++)s.array.push(g(i(t,a[u])));return s},this.getExtExtKeyUsageName=function(){var t=this.getExtInfo("extKeyUsage");if(void 0===t)return t;var e=new Array,r=o(this.hex,t.vidx);if(""===r)return e;for(var s=n(r,0),a=0;a<s.length;a++)e.push(g(i(r,s[a])));return e},this.getExtSubjectAltName=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("subjectAltName");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var n={extname:"subjectAltName",array:[]};return e&&(n.critical=!0),n.array=this.getGeneralNames(t),n},this.getExtIssuerAltName=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("issuerAltName");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var n={extname:"issuerAltName",array:[]};return e&&(n.critical=!0),n.array=this.getGeneralNames(t),n},this.getGeneralNames=function(t){for(var e=n(t,0),r=[],i=0;i<e.length;i++){var s=this.getGeneralName(o(t,e[i]));void 0!==s&&r.push(s)}return r},this.getGeneralName=function(t){var e=t.substr(0,2),r=i(t,0),n=Nr(r);return"81"==e?{rfc822:n}:"82"==e?{dns:n}:"86"==e?{uri:n}:"87"==e?{ip:Yr(r)}:"a4"==e?{dn:this.getX500Name(r)}:void 0},this.getExtSubjectAltName2=function(){var t,e,r,s=this.getExtInfo("subjectAltName");if(void 0===s)return s;for(var a=new Array,u=o(this.hex,s.vidx),c=n(u,0),h=0;h<c.length;h++)r=u.substr(c[h],2),t=i(u,c[h]),"81"===r&&(e=Lr(t),a.push(["MAIL",e])),"82"===r&&(e=Lr(t),a.push(["DNS",e])),"84"===r&&(e=on.hex2dn(t,0),a.push(["DN",e])),"86"===r&&(e=Lr(t),a.push(["URI",e])),"87"===r&&(e=Yr(t),a.push(["IP",e]));return a},this.getExtCRLDistributionPoints=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("cRLDistributionPoints");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var i={extname:"cRLDistributionPoints",array:[]};e&&(i.critical=!0);for(var s=n(t,0),a=0;a<s.length;a++){var u=o(t,s[a]);i.array.push(this.getDistributionPoint(u))}return i},this.getDistributionPoint=function(t){for(var e={},r=n(t,0),i=0;i<r.length;i++){var s=t.substr(r[i],2),a=o(t,r[i]);"a0"==s&&(e.dpname=this.getDistributionPointName(a))}return e},this.getDistributionPointName=function(t){for(var e={},r=n(t,0),i=0;i<r.length;i++){var s=t.substr(r[i],2),a=o(t,r[i]);"a0"==s&&(e.full=this.getGeneralNames(a))}return e},this.getExtCRLDistributionPointsURI=function(){var t=this.getExtInfo("cRLDistributionPoints");if(void 0===t)return t;for(var e=new Array,r=n(this.hex,t.vidx),i=0;i<r.length;i++)try{var o=Lr(s(this.hex,r[i],[0,0,0],"86"));e.push(o)}catch(t){}return e},this.getExtAIAInfo=function(){var t=this.getExtInfo("authorityInfoAccess");if(void 0===t)return t;for(var e={ocsp:[],caissuer:[]},r=n(this.hex,t.vidx),i=0;i<r.length;i++){var o=s(this.hex,r[i],[0],"06"),a=s(this.hex,r[i],[1],"86");"2b06010505073001"===o&&e.ocsp.push(Lr(a)),"2b06010505073002"===o&&e.caissuer.push(Lr(a))}return e},this.getExtAuthorityInfoAccess=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("authorityInfoAccess");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var i={extname:"authorityInfoAccess",array:[]};e&&(i.critical=!0);for(var u=n(t,0),c=0;c<u.length;c++){var h=a(t,u[c],[0],"06"),l=Lr(s(t,u[c],[1],"86"));if("2b06010505073001"==h)i.array.push({ocsp:l});else{if("2b06010505073002"!=h)throw new Error("unknown method: "+h);i.array.push({caissuer:l})}}return i},this.getExtCertificatePolicies=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("certificatePolicies");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var i={extname:"certificatePolicies",array:[]};e&&(i.critical=!0);for(var s=n(t,0),a=0;a<s.length;a++){var u=o(t,s[a]),c=this.getPolicyInformation(u);i.array.push(c)}return i},this.getPolicyInformation=function(t){var e={},r=s(t,0,[0],"06");e.policyoid=g(r);var i=l(t,0,[1],"30");if(-1!=i){e.array=[];for(var a=n(t,i),u=0;u<a.length;u++){var c=o(t,a[u]),h=this.getPolicyQualifierInfo(c);e.array.push(h)}}return e},this.getPolicyQualifierInfo=function(t){var e={},r=s(t,0,[0],"06");if("2b06010505070201"===r){var n=a(t,0,[1],"16");e.cps=Nr(n)}else if("2b06010505070202"===r){var i=u(t,0,[1],"30");e.unotice=this.getUserNotice(i)}return e},this.getUserNotice=function(t){for(var e={},r=n(t,0),i=0;i<r.length;i++){var s=o(t,r[i]);"30"!=s.substr(0,2)&&(e.exptext=this.getDisplayText(s))}return e},this.getDisplayText=function(t){var e={};return e.type={"0c":"utf8",16:"ia5","1a":"vis","1e":"bmp"}[t.substr(0,2)],e.str=Nr(i(t,0)),e},this.getExtCRLNumber=function(t,e){var r={extname:"cRLNumber"};if(e&&(r.critical=!0),"02"==t.substr(0,2))return r.num={hex:i(t,0)},r;throw new Error("hExtV parse error: "+t)},this.getExtCRLReason=function(t,e){var r={extname:"cRLReason"};if(e&&(r.critical=!0),"0a"==t.substr(0,2))return r.code=parseInt(i(t,0),16),r;throw new Error("hExtV parse error: "+t)},this.getExtOcspNonce=function(t,e){var r={extname:"ocspNonce"};e&&(r.critical=!0);var n=i(t,0);return r.hex=n,r},this.getExtOcspNoCheck=function(t,e){var r={extname:"ocspNoCheck"};return e&&(r.critical=!0),r},this.getExtAdobeTimeStamp=function(t,e){if(void 0===t&&void 0===e){var r=this.getExtInfo("adobeTimeStamp");if(void 0===r)return;t=o(this.hex,r.vidx),e=r.critical}var i={extname:"adobeTimeStamp"};e&&(i.critical=!0);var s=n(t,0);if(s.length>1){var a=o(t,s[1]),u=this.getGeneralName(a);null!=u.uri&&(i.uri=u.uri)}if(s.length>2){var c=o(t,s[2]);"0101ff"==c&&(i.reqauth=!0),"010100"==c&&(i.reqauth=!1)}return i},this.getX500NameRule=function(t){for(var e=null,r=[],n=0;n<t.length;n++)for(var i=t[n],o=0;o<i.length;o++)r.push(i[o]);for(n=0;n<r.length;n++){var s=r[n],a=s.ds,u=s.value,c=s.type;if(":"+a,"prn"!=a&&"utf8"!=a&&"ia5"!=a)return"mixed";if("ia5"==a){if("CN"!=c)return"mixed";if(br.lang.String.isMail(u))continue;return"mixed"}if("C"==c){if("prn"==a)continue;return"mixed"}if(":"+a,null==e)e=a;else if(e!==a)return"mixed"}return null==e?"prn":e},this.getX500Name=function(t){var e=this.getX500NameArray(t);return{array:e,str:this.dnarraytostr(e)}},this.getX500NameArray=function(t){for(var e=[],r=n(t,0),i=0;i<r.length;i++)e.push(this.getRDN(o(t,r[i])));return e},this.getRDN=function(t){for(var e=[],r=n(t,0),i=0;i<r.length;i++)e.push(this.getAttrTypeAndValue(o(t,r[i])));return e},this.getAttrTypeAndValue=function(t){var e={type:null,value:null,ds:null},r=n(t,0),i=s(t,r[0],[],"06"),o=s(t,r[1],[]),a=br.asn1.ASN1Util.oidHexToInt(i);return e.type=br.asn1.x509.OID.oid2atype(a),e.value=Nr(o),e.ds=this.HEX2STAG[t.substr(r[1],2)],e},this.readCertPEM=function(t){this.readCertHex(v(t))},this.readCertHex=function(t){this.hex=t,this.getVersion();try{h(this.hex,0,[0,7],"a3"),this.parseExt()}catch(t){}},this.getParam=function(){var t={};return t.version=this.getVersion(),t.serial={hex:this.getSerialNumberHex()},t.sigalg=this.getSignatureAlgorithmField(),t.issuer=this.getIssuer(),t.notbefore=this.getNotBefore(),t.notafter=this.getNotAfter(),t.subject=this.getSubject(),t.sbjpubkey=Mr(this.getPublicKeyHex(),"PUBLIC KEY"),this.aExtInfo.length>0&&(t.ext=this.getExtParamArray()),t.sighex=this.getSignatureValueHex(),t},this.getExtParamArray=function(t){null==t&&(-1!=l(this.hex,0,[0,"[3]"])&&(t=c(this.hex,0,[0,"[3]",0],"30")));for(var e=[],r=n(t,0),i=0;i<r.length;i++){var s=o(t,r[i]),a=this.getExtParam(s);null!=a&&e.push(a)}return e},this.getExtParam=function(t){var e=n(t,0).length;if(2!=e&&3!=e)throw new Error("wrong number elements in Extension: "+e+" "+t);var r=d(s(t,0,[0],"06")),i=!1;3==e&&"0101ff"==u(t,0,[1])&&(i=!0);var o=u(t,0,[e-1,0]),a=void 0;if("2.5.29.14"==r?a=this.getExtSubjectKeyIdentifier(o,i):"2.5.29.15"==r?a=this.getExtKeyUsage(o,i):"2.5.29.17"==r?a=this.getExtSubjectAltName(o,i):"2.5.29.18"==r?a=this.getExtIssuerAltName(o,i):"2.5.29.19"==r?a=this.getExtBasicConstraints(o,i):"2.5.29.31"==r?a=this.getExtCRLDistributionPoints(o,i):"2.5.29.32"==r?a=this.getExtCertificatePolicies(o,i):"2.5.29.35"==r?a=this.getExtAuthorityKeyIdentifier(o,i):"2.5.29.37"==r?a=this.getExtExtKeyUsage(o,i):"1.3.6.1.5.5.7.1.1"==r?a=this.getExtAuthorityInfoAccess(o,i):"2.5.29.20"==r?a=this.getExtCRLNumber(o,i):"2.5.29.21"==r?a=this.getExtCRLReason(o,i):"1.3.6.1.5.5.7.48.1.2"==r?a=this.getExtOcspNonce(o,i):"1.3.6.1.5.5.7.48.1.5"==r?a=this.getExtOcspNoCheck(o,i):"1.2.840.113583.1.1.9.1"==r&&(a=this.getExtAdobeTimeStamp(o,i)),null!=a)return a;var c={extname:r,extn:o};return i&&(c.critical=!0),c},this.findExt=function(t,e){for(var r=0;r<t.length;r++)if(t[r].extname==e)return t[r];return null},this.updateExtCDPFullURI=function(t,e){var r=this.findExt(t,"cRLDistributionPoints");if(null!=r&&null!=r.array)for(var n=r.array,i=0;i<n.length;i++)if(null!=n[i].dpname&&null!=n[i].dpname.full)for(var o=n[i].dpname.full,s=0;s<o.length;s++){var a=o[i];null!=a.uri&&(a.uri=e)}},this.updateExtAIAOCSP=function(t,e){var r=this.findExt(t,"authorityInfoAccess");if(null!=r&&null!=r.array)for(var n=r.array,i=0;i<n.length;i++)null!=n[i].ocsp&&(n[i].ocsp=e)},this.updateExtAIACAIssuer=function(t,e){var r=this.findExt(t,"authorityInfoAccess");if(null!=r&&null!=r.array)for(var n=r.array,i=0;i<n.length;i++)null!=n[i].caissuer&&(n[i].caissuer=e)},this.dnarraytostr=function(t){return"/"+t.map((function(t){return function e(t){return t.map((function(t){return function e(t){return t.type+"="+t.value}(t)})).join("+")}(t)})).join("/")},this.getInfo=function(){var t,e,r,n=function t(e){return JSON.stringify(e.array).replace(/[\[\]\{\}\"]/g,"")},i=function t(e){for(var r="",n=e.array,i=0;i<n.length;i++){var o=n[i];if(r+="    policy oid: "+o.policyoid+"\n",void 0!==o.array)for(var s=0;s<o.array.length;s++){var a=o.array[s];void 0!==a.cps&&(r+="    cps: "+a.cps+"\n")}}return r},o=function t(e){for(var r="",n=e.array,i=0;i<n.length;i++){var o=n[i];try{void 0!==o.dpname.full[0].uri&&(r+="    "+o.dpname.full[0].uri+"\n")}catch(t){}try{void 0!==o.dname.full[0].dn.hex&&(r+="    "+on.hex2dn(o.dpname.full[0].dn.hex)+"\n")}catch(t){}}return r},s=function t(e){for(var r="",n=e.array,i=0;i<n.length;i++){var o=n[i];void 0!==o.caissuer&&(r+="    caissuer: "+o.caissuer+"\n"),void 0!==o.ocsp&&(r+="    ocsp: "+o.ocsp+"\n")}return r};if(t="Basic Fields\n",t+="  serial number: "+this.getSerialNumberHex()+"\n",t+="  signature algorithm: "+this.getSignatureAlgorithmField()+"\n",t+="  issuer: "+this.getIssuerString()+"\n",t+="  notBefore: "+this.getNotBefore()+"\n",t+="  notAfter: "+this.getNotAfter()+"\n",t+="  subject: "+this.getSubjectString()+"\n",t+="  subject public key info: \n",t+="    key algorithm: "+(e=this.getPublicKey()).type+"\n","RSA"===e.type&&(t+="    n="+$r(e.n.toString(16)).substr(0,16)+"...\n",t+="    e="+$r(e.e.toString(16))+"\n"),null!=(r=this.aExtInfo)){t+="X509v3 Extensions:\n";for(var a=0;a<r.length;a++){var u=r[a],c=br.asn1.x509.OID.oid2name(u.oid);""===c&&(c=u.oid);var h="";if(!0===u.critical&&(h="CRITICAL"),t+="  "+c+" "+h+":\n","basicConstraints"===c){var l=this.getExtBasicConstraints();void 0===l.cA?t+="    {}\n":(t+="    cA=true",void 0!==l.pathLen&&(t+=", pathLen="+l.pathLen),t+="\n")}else if("keyUsage"===c)t+="    "+this.getExtKeyUsageString()+"\n";else if("subjectKeyIdentifier"===c)t+="    "+this.getExtSubjectKeyIdentifier().kid.hex+"\n";else if("authorityKeyIdentifier"===c){var f=this.getExtAuthorityKeyIdentifier();void 0!==f.kid&&(t+="    kid="+f.kid.hex+"\n")}else{if("extKeyUsage"===c)t+="    "+this.getExtExtKeyUsage().array.join(", ")+"\n";else if("subjectAltName"===c)t+="    "+n(this.getExtSubjectAltName())+"\n";else if("cRLDistributionPoints"===c)t+=o(this.getExtCRLDistributionPoints());else if("authorityInfoAccess"===c)t+=s(this.getExtAuthorityInfoAccess());else"certificatePolicies"===c&&(t+=i(this.getExtCertificatePolicies()))}}}return t+="signature algorithm: "+this.getSignatureAlgorithmName()+"\n",t+="signature: "+this.getSignatureValueHex().substr(0,16)+"...\n"},"string"==typeof t&&(-1!=t.indexOf("-----BEGIN")?this.readCertPEM(t):br.lang.String.isHex(t)&&this.readCertHex(t))}He.prototype.sign=function(t,e){var r=function t(r){return br.crypto.Util.hashString(r,e)}(t);return this.signWithMessageHash(r,e)},He.prototype.signWithMessageHash=function(t,e){var r=je(br.crypto.Util.getPaddedDigestInfoHex(t,e,this.n.bitLength()),16);return en(this.doPrivate(r).toString(16),this.n.bitLength())},He.prototype.signPSS=function(t,e,r){var n=function t(r){return br.crypto.Util.hashHex(r,e)}(Ur(t));return void 0===r&&(r=-1),this.signWithMessageHashPSS(n,e,r)},He.prototype.signWithMessageHashPSS=function(t,e,r){var n,i=Nr(t),o=i.length,s=this.n.bitLength()-1,a=Math.ceil(s/8),u=function t(r){return br.crypto.Util.hashHex(r,e)};if(-1===r||void 0===r)r=o;else if(-2===r)r=a-o-2;else if(r<-2)throw new Error("invalid salt length");if(a<o+r+2)throw new Error("data too long");var c="";r>0&&(c=new Array(r),(new Oe).nextBytes(c),c=String.fromCharCode.apply(String,c));var h=Nr(u(Ur("\0\0\0\0\0\0\0\0"+i+c))),l=[];for(n=0;n<a-r-o-2;n+=1)l[n]=0;var f=String.fromCharCode.apply(String,l)+""+c,g=rn(h,f.length,u),d=[];for(n=0;n<f.length;n+=1)d[n]=f.charCodeAt(n)^g.charCodeAt(n);var p=65280>>8*a-s&255;for(d[0]&=~p,n=0;n<o;n++)d.push(h.charCodeAt(n));return d.push(188),en(this.doPrivate(new F(d)).toString(16),this.n.bitLength())},He.prototype.verify=function(t,e){var r=je(e=(e=e.replace(tn,"")).replace(/[ \n]+/g,""),16);if(r.bitLength()>this.n.bitLength())return 0;var n=nn(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return!1;var i=n[0];return n[1]==function t(e){return br.crypto.Util.hashString(e,i)}(t)},He.prototype.verifyWithMessageHash=function(t,e){if(e.length!=Math.ceil(this.n.bitLength()/4))return!1;var r=je(e,16);if(r.bitLength()>this.n.bitLength())return 0;var n=nn(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return!1;n[0];return n[1]==t},He.prototype.verifyPSS=function(t,e,r,n){var i=function t(e){return br.crypto.Util.hashHex(e,r)}(Ur(t));return void 0===n&&(n=-1),this.verifyWithMessageHashPSS(i,e,r,n)},He.prototype.verifyWithMessageHashPSS=function(t,e,r,n){if(e.length!=Math.ceil(this.n.bitLength()/4))return!1;var i,o=new F(e,16),s=function t(e){return br.crypto.Util.hashHex(e,r)},a=Nr(t),u=a.length,c=this.n.bitLength()-1,h=Math.ceil(c/8);if(-1===n||void 0===n)n=u;else if(-2===n)n=h-u-2;else if(n<-2)throw new Error("invalid salt length");if(h<u+n+2)throw new Error("data too long");var l=this.doPublic(o).toByteArray();for(i=0;i<l.length;i+=1)l[i]&=255;for(;l.length<h;)l.unshift(0);if(188!==l[h-1])throw new Error("encoded message does not end in 0xbc");var f=(l=String.fromCharCode.apply(String,l)).substr(0,h-u-1),g=l.substr(f.length,u),d=65280>>8*h-c&255;if(0!=(f.charCodeAt(0)&d))throw new Error("bits beyond keysize not zero");var p=rn(g,f.length,s),v=[];for(i=0;i<f.length;i+=1)v[i]=f.charCodeAt(i)^p.charCodeAt(i);v[0]&=~d;var y=h-u-n-2;for(i=0;i<y;i+=1)if(0!==v[i])throw new Error("leftmost octets not zero");if(1!==v[y])throw new Error("0x01 marker not found");return g===Nr(s(Ur("\0\0\0\0\0\0\0\0"+a+String.fromCharCode.apply(String,v.slice(-n)))))},He.SALT_LEN_HLEN=-1,He.SALT_LEN_MAX=-2,He.SALT_LEN_RECOVER=-2,on.hex2dn=function(t,e){if(void 0===e&&(e=0),"30"!==t.substr(e,2))throw new Error("malformed DN");for(var r=new Array,n=Er.getChildIdx(t,e),i=0;i<n.length;i++)r.push(on.hex2rdn(t,n[i]));return"/"+(r=r.map((function(t){return t.replace("/","\\/")}))).join("/")},on.hex2rdn=function(t,e){if(void 0===e&&(e=0),"31"!==t.substr(e,2))throw new Error("malformed RDN");for(var r=new Array,n=Er.getChildIdx(t,e),i=0;i<n.length;i++)r.push(on.hex2attrTypeValue(t,n[i]));return(r=r.map((function(t){return t.replace("+","\\+")}))).join("+")},on.hex2attrTypeValue=function(t,e){var r=Er,n=r.getV;if(void 0===e&&(e=0),"30"!==t.substr(e,2))throw new Error("malformed attribute type and value");var i=r.getChildIdx(t,e);2!==i.length||t.substr(i[0],2);var o=n(t,i[0]),s=br.asn1.ASN1Util.oidHexToInt(o);return br.asn1.x509.OID.oid2atype(s)+"="+Nr(n(t,i[1]))},on.getPublicKeyFromCertHex=function(t){var e=new on;return e.readCertHex(t),e.getPublicKey()},on.getPublicKeyFromCertPEM=function(t){var e=new on;return e.readCertPEM(t),e.getPublicKey()},on.getPublicKeyInfoPropOfCertPEM=function(t){var e,r,n=Er.getVbyList,i={};return i.algparam=null,(e=new on).readCertPEM(t),r=e.getPublicKeyHex(),i.keyhex=n(r,0,[1],"03").substr(2),i.algoid=n(r,0,[0,0],"06"),"2a8648ce3d0201"===i.algoid&&(i.algparam=n(r,0,[0,1],"06")),i},on.KEYUSAGE_NAME=["digitalSignature","nonRepudiation","keyEncipherment","dataEncipherment","keyAgreement","keyCertSign","cRLSign","encipherOnly","decipherOnly"],void 0!==br&&br||(e.KJUR=br={}),void 0!==br.jws&&br.jws||(br.jws={}),br.jws.JWS=function(){var t=br.jws.JWS.isSafeJSONString;this.parseJWS=function(e,r){if(void 0===this.parsedJWS||!r&&void 0===this.parsedJWS.sigvalH){var n=e.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if(null==n)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";var i=n[1],o=n[2],s=n[3],a=i+"."+o;if(this.parsedJWS={},this.parsedJWS.headB64U=i,this.parsedJWS.payloadB64U=o,this.parsedJWS.sigvalB64U=s,this.parsedJWS.si=a,!r){var u=Ir(s),c=je(u,16);this.parsedJWS.sigvalH=u,this.parsedJWS.sigvalBI=c}var h=Fr(i),l=Fr(o);if(this.parsedJWS.headS=h,this.parsedJWS.payloadS=l,!t(h,this.parsedJWS,"headP"))throw"malformed JSON string for JWS Head: "+h}}},br.jws.JWS.sign=function(t,e,n,i,o){var s,a,u,c=br,h=c.jws.JWS,l=h.readSafeJSONString,f=h.isSafeJSONString,g=c.crypto,d=(g.ECDSA,g.Mac),p=g.Signature,v=JSON;if("string"!=typeof e&&"object"!=(void 0===e?"undefined":r(e)))throw"spHeader must be JSON string or object: "+e;if("object"==(void 0===e?"undefined":r(e))&&(a=e,s=v.stringify(a)),"string"==typeof e){if(!f(s=e))throw"JWS Head is not safe JSON string: "+s;a=l(s)}if(u=n,"object"==(void 0===n?"undefined":r(n))&&(u=v.stringify(n)),""!=t&&null!=t||void 0===a.alg||(t=a.alg),""!=t&&null!=t&&void 0===a.alg&&(a.alg=t,s=v.stringify(a)),t!==a.alg)throw"alg and sHeader.alg doesn't match: "+t+"!="+a.alg;var y=null;if(void 0===h.jwsalg2sigalg[t])throw"unsupported alg name: "+t;y=h.jwsalg2sigalg[t];var m=wr(s)+"."+wr(u),_="";if("Hmac"==y.substr(0,4)){if(void 0===i)throw"mac key shall be specified for HS* alg";var S=new d({alg:y,prov:"cryptojs",pass:i});S.updateString(m),_=S.doFinal()}else if(-1!=y.indexOf("withECDSA")){(w=new p({alg:y})).init(i,o),w.updateString(m);var b=w.sign();_=br.crypto.ECDSA.asn1SigToConcatSig(b)}else{var w;if("none"!=y)(w=new p({alg:y})).init(i,o),w.updateString(m),_=w.sign()}return m+"."+Rr(_)},br.jws.JWS.verify=function(t,e,n){var i,o=br,s=o.jws.JWS,a=s.readSafeJSONString,u=o.crypto,c=u.ECDSA,h=u.Mac,l=u.Signature;void 0!==r(He)&&(i=He);var f=t.split(".");if(3!==f.length)return!1;var g=f[0]+"."+f[1],d=Ir(f[2]),p=a(Fr(f[0])),v=null,y=null;if(void 0===p.alg)throw"algorithm not specified in header";if((y=(v=p.alg).substr(0,2),null!=n&&"[object Array]"===Object.prototype.toString.call(n)&&n.length>0)&&-1==(":"+n.join(":")+":").indexOf(":"+v+":"))throw"algorithm '"+v+"' not accepted in the list";if("none"!=v&&null===e)throw"key shall be specified to verify.";if("string"==typeof e&&-1!=e.indexOf("-----BEGIN ")&&(e=Zr.getKey(e)),!("RS"!=y&&"PS"!=y||e instanceof i))throw"key shall be a RSAKey obj for RS* and PS* algs";if("ES"==y&&!(e instanceof c))throw"key shall be a ECDSA obj for ES* algs";var m=null;if(void 0===s.jwsalg2sigalg[p.alg])throw"unsupported alg name: "+v;if("none"==(m=s.jwsalg2sigalg[v]))throw"not supported";if("Hmac"==m.substr(0,4)){if(void 0===e)throw"hexadecimal key shall be specified for HMAC";var _=new h({alg:m,pass:e});return _.updateString(g),d==_.doFinal()}if(-1!=m.indexOf("withECDSA")){var S,b=null;try{b=c.concatSigToASN1Sig(d)}catch(t){return!1}return(S=new l({alg:m})).init(e),S.updateString(g),S.verify(b)}return(S=new l({alg:m})).init(e),S.updateString(g),S.verify(d)},br.jws.JWS.parse=function(t){var e,r,n,i=t.split("."),o={};if(2!=i.length&&3!=i.length)throw"malformed sJWS: wrong number of '.' splitted elements";return e=i[0],r=i[1],3==i.length&&(n=i[2]),o.headerObj=br.jws.JWS.readSafeJSONString(Fr(e)),o.payloadObj=br.jws.JWS.readSafeJSONString(Fr(r)),o.headerPP=JSON.stringify(o.headerObj,null,"  "),null==o.payloadObj?o.payloadPP=Fr(r):o.payloadPP=JSON.stringify(o.payloadObj,null,"  "),void 0!==n&&(o.sigHex=Ir(n)),o},br.jws.JWS.verifyJWT=function(t,e,n){var i=br.jws,o=i.JWS,s=o.readSafeJSONString,a=o.inArray,u=o.includedArray,c=t.split("."),h=c[0],l=c[1],f=(Ir(c[2]),s(Fr(h))),g=s(Fr(l));if(void 0===f.alg)return!1;if(void 0===n.alg)throw"acceptField.alg shall be specified";if(!a(f.alg,n.alg))return!1;if(void 0!==g.iss&&"object"===r(n.iss)&&!a(g.iss,n.iss))return!1;if(void 0!==g.sub&&"object"===r(n.sub)&&!a(g.sub,n.sub))return!1;if(void 0!==g.aud&&"object"===r(n.aud))if("string"==typeof g.aud){if(!a(g.aud,n.aud))return!1}else if("object"==r(g.aud)&&!u(g.aud,n.aud))return!1;var d=i.IntDate.getNow();return void 0!==n.verifyAt&&"number"==typeof n.verifyAt&&(d=n.verifyAt),void 0!==n.gracePeriod&&"number"==typeof n.gracePeriod||(n.gracePeriod=0),!(void 0!==g.exp&&"number"==typeof g.exp&&g.exp+n.gracePeriod<d)&&(!(void 0!==g.nbf&&"number"==typeof g.nbf&&d<g.nbf-n.gracePeriod)&&(!(void 0!==g.iat&&"number"==typeof g.iat&&d<g.iat-n.gracePeriod)&&((void 0===g.jti||void 0===n.jti||g.jti===n.jti)&&!!o.verify(t,e,n.alg))))},br.jws.JWS.includedArray=function(t,e){var n=br.jws.JWS.inArray;if(null===t)return!1;if("object"!==(void 0===t?"undefined":r(t)))return!1;if("number"!=typeof t.length)return!1;for(var i=0;i<t.length;i++)if(!n(t[i],e))return!1;return!0},br.jws.JWS.inArray=function(t,e){if(null===e)return!1;if("object"!==(void 0===e?"undefined":r(e)))return!1;if("number"!=typeof e.length)return!1;for(var n=0;n<e.length;n++)if(e[n]==t)return!0;return!1},br.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS384:"HmacSHA384",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none"},br.jws.JWS.isSafeJSONString=function(t,e,n){var i=null;try{return"object"!=(void 0===(i=Sr(t))?"undefined":r(i))||i.constructor===Array?0:(e&&(e[n]=i),1)}catch(t){return 0}},br.jws.JWS.readSafeJSONString=function(t){var e=null;try{return"object"!=(void 0===(e=Sr(t))?"undefined":r(e))||e.constructor===Array?null:e}catch(t){return null}},br.jws.JWS.getEncodedSignatureValueFromJWS=function(t){var e=t.match(/^[^.]+\.[^.]+\.([^.]+)$/);if(null==e)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";return e[1]},br.jws.JWS.getJWKthumbprint=function(t){if("RSA"!==t.kty&&"EC"!==t.kty&&"oct"!==t.kty)throw"unsupported algorithm for JWK Thumprint";var e="{";if("RSA"===t.kty){if("string"!=typeof t.n||"string"!=typeof t.e)throw"wrong n and e value for RSA key";e+='"e":"'+t.e+'",',e+='"kty":"'+t.kty+'",',e+='"n":"'+t.n+'"}'}else if("EC"===t.kty){if("string"!=typeof t.crv||"string"!=typeof t.x||"string"!=typeof t.y)throw"wrong crv, x and y value for EC key";e+='"crv":"'+t.crv+'",',e+='"kty":"'+t.kty+'",',e+='"x":"'+t.x+'",',e+='"y":"'+t.y+'"}'}else if("oct"===t.kty){if("string"!=typeof t.k)throw"wrong k value for oct(symmetric) key";e+='"kty":"'+t.kty+'",',e+='"k":"'+t.k+'"}'}var r=Ur(e);return Rr(br.crypto.Util.hashHex(r,"sha256"))},br.jws.IntDate={},br.jws.IntDate.get=function(t){var e=br.jws.IntDate,r=e.getNow,n=e.getZulu;if("now"==t)return r();if("now + 1hour"==t)return r()+3600;if("now + 1day"==t)return r()+86400;if("now + 1month"==t)return r()+2592e3;if("now + 1year"==t)return r()+31536e3;if(t.match(/Z$/))return n(t);if(t.match(/^[0-9]+$/))return parseInt(t);throw"unsupported format: "+t},br.jws.IntDate.getZulu=function(t){return Kr(t)},br.jws.IntDate.getNow=function(){return~~(new Date/1e3)},br.jws.IntDate.intDate2UTCString=function(t){return new Date(1e3*t).toUTCString()},br.jws.IntDate.intDate2Zulu=function(t){var e=new Date(1e3*t);return("0000"+e.getUTCFullYear()).slice(-4)+("00"+(e.getUTCMonth()+1)).slice(-2)+("00"+e.getUTCDate()).slice(-2)+("00"+e.getUTCHours()).slice(-2)+("00"+e.getUTCMinutes()).slice(-2)+("00"+e.getUTCSeconds()).slice(-2)+"Z"},e.SecureRandom=Oe,e.rng_seed_time=Ie,e.BigInteger=F,e.RSAKey=He;var sn=br.crypto.EDSA;e.EDSA=sn;var an=br.crypto.DSA;e.DSA=an;var un=br.crypto.Signature;e.Signature=un;var cn=br.crypto.MessageDigest;e.MessageDigest=cn;var hn=br.crypto.Mac;e.Mac=hn;var ln=br.crypto.Cipher;e.Cipher=ln,e.KEYUTIL=Zr,e.ASN1HEX=Er,e.X509=on,e.CryptoJS=y,e.b64tohex=b,e.b64toBA=w,e.stoBA=xr,e.BAtos=Ar,e.BAtohex=kr,e.stohex=Pr,e.stob64=function fn(t){return S(Pr(t))},e.stob64u=function gn(t){return Cr(S(Pr(t)))},e.b64utos=function dn(t){return Ar(w(Tr(t)))},e.b64tob64u=Cr,e.b64utob64=Tr,e.hex2b64=S,e.hextob64u=Rr,e.b64utohex=Ir,e.utf8tob64u=wr,e.b64utoutf8=Fr,e.utf8tob64=function pn(t){return S(qr(Gr(t)))},e.b64toutf8=function vn(t){return decodeURIComponent(Jr(b(t)))},e.utf8tohex=Dr,e.hextoutf8=Lr,e.hextorstr=Nr,e.rstrtohex=Ur,e.hextob64=Br,e.hextob64nl=Or,e.b64nltohex=jr,e.hextopem=Mr,e.pemtohex=Hr,e.hextoArrayBuffer=function yn(t){if(t.length%2!=0)throw"input is not even length";if(null==t.match(/^[0-9A-Fa-f]+$/))throw"input is not hexadecimal";for(var e=new ArrayBuffer(t.length/2),r=new DataView(e),n=0;n<t.length/2;n++)r.setUint8(n,parseInt(t.substr(2*n,2),16));return e},e.ArrayBuffertohex=function mn(t){for(var e="",r=new DataView(t),n=0;n<t.byteLength;n++)e+=("00"+r.getUint8(n).toString(16)).slice(-2);return e},e.zulutomsec=Vr,e.zulutosec=Kr,e.zulutodate=function _n(t){return new Date(Vr(t))},e.datetozulu=function Sn(t,e,r){var n,i=t.getUTCFullYear();if(e){if(i<1950||2049<i)throw"not proper year for UTCTime: "+i;n=(""+i).slice(-2)}else n=("000"+i).slice(-4);if(n+=("0"+(t.getUTCMonth()+1)).slice(-2),n+=("0"+t.getUTCDate()).slice(-2),n+=("0"+t.getUTCHours()).slice(-2),n+=("0"+t.getUTCMinutes()).slice(-2),n+=("0"+t.getUTCSeconds()).slice(-2),r){var o=t.getUTCMilliseconds();0!==o&&(n+="."+(o=(o=("00"+o).slice(-3)).replace(/0+$/g,"")))}return n+="Z"},e.uricmptohex=qr,e.hextouricmp=Jr,e.ipv6tohex=Wr,e.hextoipv6=zr,e.hextoip=Yr,e.iptohex=function bn(t){var e="malformed IP address";if(!(t=t.toLowerCase(t)).match(/^[0-9.]+$/)){if(t.match(/^[0-9a-f:]+$/)&&-1!==t.indexOf(":"))return Wr(t);throw e}var r=t.split(".");if(4!==r.length)throw e;var n="";try{for(var i=0;i<4;i++){n+=("0"+parseInt(r[i]).toString(16)).slice(-2)}return n}catch(t){throw e}},e.encodeURIComponentAll=Gr,e.newline_toUnix=function wn(t){return t=t.replace(/\r\n/gm,"\n")},e.newline_toDos=function Fn(t){return t=(t=t.replace(/\r\n/gm,"\n")).replace(/\n/gm,"\r\n")},e.hextoposhex=$r,e.intarystrtohex=function En(t){t=(t=(t=t.replace(/^\s*\[\s*/,"")).replace(/\s*\]\s*$/,"")).replace(/\s*/g,"");try{return t.split(/,/).map((function(t,e,r){var n=parseInt(t);if(n<0||255<n)throw"integer not in range 0-255";return("00"+n.toString(16)).slice(-2)})).join("")}catch(t){throw"malformed integer array string: "+t}},e.strdiffidx=function t(e,r){var n=e.length;e.length>r.length&&(n=r.length);for(var i=0;i<n;i++)if(e.charCodeAt(i)!=r.charCodeAt(i))return i;return e.length!=r.length?n:-1},e.KJUR=br;var xn=br.crypto;e.crypto=xn;var An=br.asn1;e.asn1=An;var kn=br.jws;e.jws=kn;var Pn=br.lang;e.lang=Pn}).call(this,r(28).Buffer)},function(t,e,r){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var n=r(30),i=r(31),o=r(32);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(s()<e)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=u.prototype:(null===t&&(t=new u(e)),t.length=e),t}function u(t,e,r){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return l(this,t)}return c(this,t,e,r)}function c(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function i(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);u.TYPED_ARRAY_SUPPORT?(t=e).__proto__=u.prototype:t=f(t,e);return t}(t,e,r,n):"string"==typeof e?function s(t,e,r){"string"==typeof r&&""!==r||(r="utf8");if(!u.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|d(e,r),i=(t=a(t,n)).write(e,r);i!==n&&(t=t.slice(0,i));return t}(t,e,r):function c(t,e){if(u.isBuffer(e)){var r=0|g(e.length);return 0===(t=a(t,r)).length||e.copy(t,0,0,r),t}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||function n(t){return t!=t}(e.length)?a(t,0):f(t,e);if("Buffer"===e.type&&o(e.data))return f(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function l(t,e){if(h(e),t=a(t,e<0?0:0|g(e)),!u.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function f(t,e){var r=e.length<0?0:0|g(e.length);t=a(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function g(t){if(t>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|t}function d(t,e){if(u.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return K(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return q(t).length;default:if(n)return K(t).length;e=(""+e).toLowerCase(),n=!0}}function p(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return I(this,e,r);case"utf8":case"utf-8":return A(this,e,r);case"ascii":return T(this,e,r);case"latin1":case"binary":return R(this,e,r);case"base64":return x(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return D(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function v(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function y(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:m(t,e,r,n,i);if("number"==typeof e)return e&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):m(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function m(t,e,r,n,i){var o,s=1,a=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,a/=2,u/=2,r/=2}function c(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){var h=-1;for(o=r;o<a;o++)if(c(t,o)===c(e,-1===h?0:o-h)){if(-1===h&&(h=o),o-h+1===u)return h*s}else-1!==h&&(o-=o-h),h=-1}else for(r+u>a&&(r=a-u),o=r;o>=0;o--){for(var l=!0,f=0;f<u;f++)if(c(t,o+f)!==c(e,f)){l=!1;break}if(l)return o}return-1}function _(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(e.substr(2*s,2),16);if(isNaN(a))return s;t[r+s]=a}return s}function S(t,e,r,n){return J(K(e,t.length-r),t,r,n)}function b(t,e,r,n){return J(function i(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function w(t,e,r,n){return b(t,e,r,n)}function F(t,e,r,n){return J(q(e),t,r,n)}function E(t,e,r,n){return J(function i(t,e){for(var r,n,i,o=[],s=0;s<t.length&&!((e-=2)<0);++s)n=(r=t.charCodeAt(s))>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function x(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function A(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,s,a,u,c=t[i],h=null,l=c>239?4:c>223?3:c>191?2:1;if(i+l<=r)switch(l){case 1:c<128&&(h=c);break;case 2:128==(192&(o=t[i+1]))&&(u=(31&c)<<6|63&o)>127&&(h=u);break;case 3:o=t[i+1],s=t[i+2],128==(192&o)&&128==(192&s)&&(u=(15&c)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(h=u);break;case 4:o=t[i+1],s=t[i+2],a=t[i+3],128==(192&o)&&128==(192&s)&&128==(192&a)&&(u=(15&c)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(h=u)}null===h?(h=65533,l=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),i+=l}return function f(t){var e=t.length;if(e<=C)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=C));return r}(n)}e.Buffer=u,e.SlowBuffer=function k(t){+t!=t&&(t=0);return u.alloc(+t)},e.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function P(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=s(),u.poolSize=8192,u._augment=function(t){return t.__proto__=u.prototype,t},u.from=function(t,e,r){return c(null,t,e,r)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(t,e,r){return function n(t,e,r,i){return h(e),e<=0?a(t,e):void 0!==r?"string"==typeof i?a(t,e).fill(r,i):a(t,e).fill(r):a(t,e)}(null,t,e,r)},u.allocUnsafe=function(t){return l(null,t)},u.allocUnsafeSlow=function(t){return l(null,t)},u.isBuffer=function t(e){return!(null==e||!e._isBuffer)},u.compare=function t(e,r){if(!u.isBuffer(e)||!u.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(e===r)return 0;for(var n=e.length,i=r.length,o=0,s=Math.min(n,i);o<s;++o)if(e[o]!==r[o]){n=e[o],i=r[o];break}return n<i?-1:i<n?1:0},u.isEncoding=function t(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function t(e,r){if(!o(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return u.alloc(0);var n;if(void 0===r)for(r=0,n=0;n<e.length;++n)r+=e[n].length;var i=u.allocUnsafe(r),s=0;for(n=0;n<e.length;++n){var a=e[n];if(!u.isBuffer(a))throw new TypeError('"list" argument must be an Array of Buffers');a.copy(i,s),s+=a.length}return i},u.byteLength=d,u.prototype._isBuffer=!0,u.prototype.swap16=function t(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<e;r+=2)v(this,r,r+1);return this},u.prototype.swap32=function t(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<e;r+=4)v(this,r,r+3),v(this,r+1,r+2);return this},u.prototype.swap64=function t(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<e;r+=8)v(this,r,r+7),v(this,r+1,r+6),v(this,r+2,r+5),v(this,r+3,r+4);return this},u.prototype.toString=function t(){var e=0|this.length;return 0===e?"":0===arguments.length?A(this,0,e):p.apply(this,arguments)},u.prototype.equals=function t(e){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===u.compare(this,e)},u.prototype.inspect=function t(){var r="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(r=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(r+=" ... ")),"<Buffer "+r+">"},u.prototype.compare=function t(e,r,n,i,o){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===n&&(n=e?e.length:0),void 0===i&&(i=0),void 0===o&&(o=this.length),r<0||n>e.length||i<0||o>this.length)throw new RangeError("out of range index");if(i>=o&&r>=n)return 0;if(i>=o)return-1;if(r>=n)return 1;if(this===e)return 0;for(var s=(o>>>=0)-(i>>>=0),a=(n>>>=0)-(r>>>=0),c=Math.min(s,a),h=this.slice(i,o),l=e.slice(r,n),f=0;f<c;++f)if(h[f]!==l[f]){s=h[f],a=l[f];break}return s<a?-1:a<s?1:0},u.prototype.includes=function t(e,r,n){return-1!==this.indexOf(e,r,n)},u.prototype.indexOf=function t(e,r,n){return y(this,e,r,n,!0)},u.prototype.lastIndexOf=function t(e,r,n){return y(this,e,r,n,!1)},u.prototype.write=function t(e,r,n,i){if(void 0===r)i="utf8",n=this.length,r=0;else if(void 0===n&&"string"==typeof r)i=r,n=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r|=0,isFinite(n)?(n|=0,void 0===i&&(i="utf8")):(i=n,n=void 0)}var o=this.length-r;if((void 0===n||n>o)&&(n=o),e.length>0&&(n<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");for(var s=!1;;)switch(i){case"hex":return _(this,e,r,n);case"utf8":case"utf-8":return S(this,e,r,n);case"ascii":return b(this,e,r,n);case"latin1":case"binary":return w(this,e,r,n);case"base64":return F(this,e,r,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,e,r,n);default:if(s)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),s=!0}},u.prototype.toJSON=function t(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var C=4096;function T(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function R(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function I(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=V(t[o]);return i}function D(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function L(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function N(t,e,r,n,i,o){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function U(t,e,r,n){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-r,2);i<o;++i)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function B(t,e,r,n){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-r,4);i<o;++i)t[r+i]=e>>>8*(n?i:3-i)&255}function O(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function j(t,e,r,n,o){return o||O(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function M(t,e,r,n,o){return o||O(t,0,r,8),i.write(t,e,r,n,52,8),r+8}u.prototype.slice=function t(e,r){var n,i=this.length;if((e=~~e)<0?(e+=i)<0&&(e=0):e>i&&(e=i),(r=void 0===r?i:~~r)<0?(r+=i)<0&&(r=0):r>i&&(r=i),r<e&&(r=e),u.TYPED_ARRAY_SUPPORT)(n=this.subarray(e,r)).__proto__=u.prototype;else{var o=r-e;n=new u(o,void 0);for(var s=0;s<o;++s)n[s]=this[s+e]}return n},u.prototype.readUIntLE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=this[e],o=1,s=0;++s<r&&(o*=256);)i+=this[e+s]*o;return i},u.prototype.readUIntBE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=this[e+--r],o=1;r>0&&(o*=256);)i+=this[e+--r]*o;return i},u.prototype.readUInt8=function t(e,r){return r||L(e,1,this.length),this[e]},u.prototype.readUInt16LE=function t(e,r){return r||L(e,2,this.length),this[e]|this[e+1]<<8},u.prototype.readUInt16BE=function t(e,r){return r||L(e,2,this.length),this[e]<<8|this[e+1]},u.prototype.readUInt32LE=function t(e,r){return r||L(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},u.prototype.readUInt32BE=function t(e,r){return r||L(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},u.prototype.readIntLE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=this[e],o=1,s=0;++s<r&&(o*=256);)i+=this[e+s]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*r)),i},u.prototype.readIntBE=function t(e,r,n){e|=0,r|=0,n||L(e,r,this.length);for(var i=r,o=1,s=this[e+--i];i>0&&(o*=256);)s+=this[e+--i]*o;return s>=(o*=128)&&(s-=Math.pow(2,8*r)),s},u.prototype.readInt8=function t(e,r){return r||L(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},u.prototype.readInt16LE=function t(e,r){r||L(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt16BE=function t(e,r){r||L(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt32LE=function t(e,r){return r||L(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},u.prototype.readInt32BE=function t(e,r){return r||L(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},u.prototype.readFloatLE=function t(e,r){return r||L(e,4,this.length),i.read(this,e,!0,23,4)},u.prototype.readFloatBE=function t(e,r){return r||L(e,4,this.length),i.read(this,e,!1,23,4)},u.prototype.readDoubleLE=function t(e,r){return r||L(e,8,this.length),i.read(this,e,!0,52,8)},u.prototype.readDoubleBE=function t(e,r){return r||L(e,8,this.length),i.read(this,e,!1,52,8)},u.prototype.writeUIntLE=function t(e,r,n,i){(e=+e,r|=0,n|=0,i)||N(this,e,r,n,Math.pow(2,8*n)-1,0);var o=1,s=0;for(this[r]=255&e;++s<n&&(o*=256);)this[r+s]=e/o&255;return r+n},u.prototype.writeUIntBE=function t(e,r,n,i){(e=+e,r|=0,n|=0,i)||N(this,e,r,n,Math.pow(2,8*n)-1,0);var o=n-1,s=1;for(this[r+o]=255&e;--o>=0&&(s*=256);)this[r+o]=e/s&255;return r+n},u.prototype.writeUInt8=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,1,255,0),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[r]=255&e,r+1},u.prototype.writeUInt16LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[r]=255&e,this[r+1]=e>>>8):U(this,e,r,!0),r+2},u.prototype.writeUInt16BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>8,this[r+1]=255&e):U(this,e,r,!1),r+2},u.prototype.writeUInt32LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[r+3]=e>>>24,this[r+2]=e>>>16,this[r+1]=e>>>8,this[r]=255&e):B(this,e,r,!0),r+4},u.prototype.writeUInt32BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=255&e):B(this,e,r,!1),r+4},u.prototype.writeIntLE=function t(e,r,n,i){if(e=+e,r|=0,!i){var o=Math.pow(2,8*n-1);N(this,e,r,n,o-1,-o)}var s=0,a=1,u=0;for(this[r]=255&e;++s<n&&(a*=256);)e<0&&0===u&&0!==this[r+s-1]&&(u=1),this[r+s]=(e/a>>0)-u&255;return r+n},u.prototype.writeIntBE=function t(e,r,n,i){if(e=+e,r|=0,!i){var o=Math.pow(2,8*n-1);N(this,e,r,n,o-1,-o)}var s=n-1,a=1,u=0;for(this[r+s]=255&e;--s>=0&&(a*=256);)e<0&&0===u&&0!==this[r+s+1]&&(u=1),this[r+s]=(e/a>>0)-u&255;return r+n},u.prototype.writeInt8=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,1,127,-128),u.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[r]=255&e,r+1},u.prototype.writeInt16LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[r]=255&e,this[r+1]=e>>>8):U(this,e,r,!0),r+2},u.prototype.writeInt16BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>8,this[r+1]=255&e):U(this,e,r,!1),r+2},u.prototype.writeInt32LE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[r]=255&e,this[r+1]=e>>>8,this[r+2]=e>>>16,this[r+3]=e>>>24):B(this,e,r,!0),r+4},u.prototype.writeInt32BE=function t(e,r,n){return e=+e,r|=0,n||N(this,e,r,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),u.TYPED_ARRAY_SUPPORT?(this[r]=e>>>24,this[r+1]=e>>>16,this[r+2]=e>>>8,this[r+3]=255&e):B(this,e,r,!1),r+4},u.prototype.writeFloatLE=function t(e,r,n){return j(this,e,r,!0,n)},u.prototype.writeFloatBE=function t(e,r,n){return j(this,e,r,!1,n)},u.prototype.writeDoubleLE=function t(e,r,n){return M(this,e,r,!0,n)},u.prototype.writeDoubleBE=function t(e,r,n){return M(this,e,r,!1,n)},u.prototype.copy=function t(e,r,n,i){if(n||(n=0),i||0===i||(i=this.length),r>=e.length&&(r=e.length),r||(r=0),i>0&&i<n&&(i=n),i===n)return 0;if(0===e.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),e.length-r<i-n&&(i=e.length-r+n);var o,s=i-n;if(this===e&&n<r&&r<i)for(o=s-1;o>=0;--o)e[o+r]=this[o+n];else if(s<1e3||!u.TYPED_ARRAY_SUPPORT)for(o=0;o<s;++o)e[o+r]=this[o+n];else Uint8Array.prototype.set.call(e,this.subarray(n,n+s),r);return s},u.prototype.fill=function t(e,r,n,i){if("string"==typeof e){if("string"==typeof r?(i=r,r=0,n=this.length):"string"==typeof n&&(i=n,n=this.length),1===e.length){var o=e.charCodeAt(0);o<256&&(e=o)}if(void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!u.isEncoding(i))throw new TypeError("Unknown encoding: "+i)}else"number"==typeof e&&(e&=255);if(r<0||this.length<r||this.length<n)throw new RangeError("Out of range index");if(n<=r)return this;var s;if(r>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(s=r;s<n;++s)this[s]=e;else{var a=u.isBuffer(e)?e:K(new u(e,i).toString()),c=a.length;for(s=0;s<n-r;++s)this[s+r]=a[s%c]}return this};var H=/[^+\/0-9A-Za-z-_]/g;function V(t){return t<16?"0"+t.toString(16):t.toString(16)}function K(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function q(t){return n.toByteArray(function e(t){if((t=function e(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(H,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function J(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}}).call(this,r(29))},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";e.byteLength=function n(t){var e=f(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function i(t){var e,r,n=f(t),i=n[0],o=n[1],s=new u(function c(t,e,r){return 3*(e+r)/4-r}(0,i,o)),h=0,l=o>0?i-4:i;for(r=0;r<l;r+=4)e=a[t.charCodeAt(r)]<<18|a[t.charCodeAt(r+1)]<<12|a[t.charCodeAt(r+2)]<<6|a[t.charCodeAt(r+3)],s[h++]=e>>16&255,s[h++]=e>>8&255,s[h++]=255&e;2===o&&(e=a[t.charCodeAt(r)]<<2|a[t.charCodeAt(r+1)]>>4,s[h++]=255&e);1===o&&(e=a[t.charCodeAt(r)]<<10|a[t.charCodeAt(r+1)]<<4|a[t.charCodeAt(r+2)]>>2,s[h++]=e>>8&255,s[h++]=255&e);return s},e.fromByteArray=function o(t){for(var e,r=t.length,n=r%3,i=[],o=16383,a=0,u=r-n;a<u;a+=o)i.push(g(t,a,a+o>u?u:a+o));1===n?(e=t[r-1],i.push(s[e>>2]+s[e<<4&63]+"==")):2===n&&(e=(t[r-2]<<8)+t[r-1],i.push(s[e>>10]+s[e>>4&63]+s[e<<2&63]+"="));return i.join("")};for(var s=[],a=[],u="undefined"!=typeof Uint8Array?Uint8Array:Array,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h=0,l=c.length;h<l;++h)s[h]=c[h],a[c.charCodeAt(h)]=h;function f(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function g(t,e,r){for(var n,i,o=[],a=e;a<r;a+=3)n=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),o.push(s[(i=n)>>18&63]+s[i>>12&63]+s[i>>6&63]+s[63&i]);return o.join("")}a["-".charCodeAt(0)]=62,a["_".charCodeAt(0)]=63},function(t,e){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
e.read=function(t,e,r,n,i){var o,s,a=8*i-n-1,u=(1<<a)-1,c=u>>1,h=-7,l=r?i-1:0,f=r?-1:1,g=t[e+l];for(l+=f,o=g&(1<<-h)-1,g>>=-h,h+=a;h>0;o=256*o+t[e+l],l+=f,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+t[e+l],l+=f,h-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(g?-1:1);s+=Math.pow(2,n),o-=c}return(g?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,a,u,c=8*o-i-1,h=(1<<c)-1,l=h>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,g=n?0:o-1,d=n?1:-1,p=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=h):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+l>=1?f/u:f*Math.pow(2,1-l))*u>=2&&(s++,u/=2),s+l>=h?(a=0,s=h):s+l>=1?(a=(e*u-1)*Math.pow(2,i),s+=l):(a=e*Math.pow(2,l-1)*Math.pow(2,i),s=0));i>=8;t[r+g]=255&a,g+=d,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;t[r+g]=255&s,g+=d,s/=256,c-=8);t[r+g-d]|=128*p}},function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function n(t){var e=t.jws,r=t.KeyUtil,n=t.X509,o=t.crypto,s=t.hextob64u,a=t.b64tohex,u=t.AllowedSigningAlgs;return function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.parseJwt=function t(r){i.Log.debug("JoseUtil.parseJwt");try{var n=e.JWS.parse(r);return{header:n.headerObj,payload:n.payloadObj}}catch(t){i.Log.error(t)}},t.validateJwt=function e(o,s,u,c,h,l,f){i.Log.debug("JoseUtil.validateJwt");try{if("RSA"===s.kty)if(s.e&&s.n)s=r.getKey(s);else{if(!s.x5c||!s.x5c.length)return i.Log.error("JoseUtil.validateJwt: RSA key missing key material",s),Promise.reject(new Error("RSA key missing key material"));var g=a(s.x5c[0]);s=n.getPublicKeyFromCertHex(g)}else{if("EC"!==s.kty)return i.Log.error("JoseUtil.validateJwt: Unsupported key type",s&&s.kty),Promise.reject(new Error(s.kty));if(!(s.crv&&s.x&&s.y))return i.Log.error("JoseUtil.validateJwt: EC key missing key material",s),Promise.reject(new Error("EC key missing key material"));s=r.getKey(s)}return t._validateJwt(o,s,u,c,h,l,f)}catch(t){return i.Log.error(t&&t.message||t),Promise.reject("JWT validation failed")}},t.validateJwtAttributes=function e(r,n,o,s,a,u){s||(s=0),a||(a=parseInt(Date.now()/1e3));var c=t.parseJwt(r).payload;if(!c.iss)return i.Log.error("JoseUtil._validateJwt: issuer was not provided"),Promise.reject(new Error("issuer was not provided"));if(c.iss!==n)return i.Log.error("JoseUtil._validateJwt: Invalid issuer in token",c.iss),Promise.reject(new Error("Invalid issuer in token: "+c.iss));if(!c.aud)return i.Log.error("JoseUtil._validateJwt: aud was not provided"),Promise.reject(new Error("aud was not provided"));if(!(c.aud===o||Array.isArray(c.aud)&&c.aud.indexOf(o)>=0))return i.Log.error("JoseUtil._validateJwt: Invalid audience in token",c.aud),Promise.reject(new Error("Invalid audience in token: "+c.aud));if(c.azp&&c.azp!==o)return i.Log.error("JoseUtil._validateJwt: Invalid azp in token",c.azp),Promise.reject(new Error("Invalid azp in token: "+c.azp));if(!u){var h=a+s,l=a-s;if(!c.iat)return i.Log.error("JoseUtil._validateJwt: iat was not provided"),Promise.reject(new Error("iat was not provided"));if(h<c.iat)return i.Log.error("JoseUtil._validateJwt: iat is in the future",c.iat),Promise.reject(new Error("iat is in the future: "+c.iat));if(c.nbf&&h<c.nbf)return i.Log.error("JoseUtil._validateJwt: nbf is in the future",c.nbf),Promise.reject(new Error("nbf is in the future: "+c.nbf));if(!c.exp)return i.Log.error("JoseUtil._validateJwt: exp was not provided"),Promise.reject(new Error("exp was not provided"));if(c.exp<l)return i.Log.error("JoseUtil._validateJwt: exp is in the past",c.exp),Promise.reject(new Error("exp is in the past:"+c.exp))}return Promise.resolve(c)},t._validateJwt=function r(n,o,s,a,c,h,l){return t.validateJwtAttributes(n,s,a,c,h,l).then((function(t){try{return e.JWS.verify(n,o,u)?t:(i.Log.error("JoseUtil._validateJwt: signature validation failed"),Promise.reject(new Error("signature validation failed")))}catch(t){return i.Log.error(t&&t.message||t),Promise.reject(new Error("signature validation failed"))}}))},t.hashString=function t(e,r){try{return o.Util.hashString(e,r)}catch(t){i.Log.error(t)}},t.hexToBase64Url=function t(e){try{return s(e)}catch(t){i.Log.error(t)}},t}()};var i=r(0);t.exports=e.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SigninResponse=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(3);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.SigninResponse=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#";o(this,t);var n=i.UrlUtility.parseUrlFragment(e,r);this.error=n.error,this.error_description=n.error_description,this.error_uri=n.error_uri,this.code=n.code,this.state=n.state,this.id_token=n.id_token,this.session_state=n.session_state,this.access_token=n.access_token,this.token_type=n.token_type,this.scope=n.scope,this.profile=void 0,this.expires_in=n.expires_in}return n(t,[{key:"expires_in",get:function t(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}},set:function t(e){var r=parseInt(e);if("number"==typeof r&&r>0){var n=parseInt(Date.now()/1e3);this.expires_at=n+r}}},{key:"expired",get:function t(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function t(){return(this.scope||"").split(" ")}},{key:"isOpenIdConnect",get:function t(){return this.scopes.indexOf("openid")>=0||!!this.id_token}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SignoutRequest=void 0;var n=r(0),i=r(3),o=r(9);e.SignoutRequest=function t(e){var r=e.url,s=e.id_token_hint,a=e.post_logout_redirect_uri,u=e.data,c=e.extraQueryParams,h=e.request_type;if(function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),!r)throw n.Log.error("SignoutRequest.ctor: No url passed"),new Error("url");for(var f in s&&(r=i.UrlUtility.addQueryParam(r,"id_token_hint",s)),a&&(r=i.UrlUtility.addQueryParam(r,"post_logout_redirect_uri",a),u&&(this.state=new o.State({data:u,request_type:h}),r=i.UrlUtility.addQueryParam(r,"state",this.state.id))),c)r=i.UrlUtility.addQueryParam(r,f,c[f]);this.url=r}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SignoutResponse=void 0;var n=r(3);e.SignoutResponse=function t(e){!function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=n.UrlUtility.parseUrlFragment(e,"?");this.error=i.error,this.error_description=i.error_description,this.error_uri=i.error_uri,this.state=i.state}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.InMemoryWebStorage=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.InMemoryWebStorage=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),this._data={}}return t.prototype.getItem=function t(e){return i.Log.debug("InMemoryWebStorage.getItem",e),this._data[e]},t.prototype.setItem=function t(e,r){i.Log.debug("InMemoryWebStorage.setItem",e),this._data[e]=r},t.prototype.removeItem=function t(e){i.Log.debug("InMemoryWebStorage.removeItem",e),delete this._data[e]},t.prototype.key=function t(e){return Object.getOwnPropertyNames(this._data)[e]},n(t,[{key:"length",get:function t(){return Object.getOwnPropertyNames(this._data).length}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UserManager=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(10),s=r(39),a=r(15),u=r(45),c=r(47),h=r(18),l=r(8),f=r(20),g=r(11),d=r(4);function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}e.UserManager=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.SilentRenewService,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h.SessionMonitor,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f.TokenRevocationClient,l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:g.TokenClient,y=arguments.length>5&&void 0!==arguments[5]?arguments[5]:d.JoseUtil;p(this,e),r instanceof s.UserManagerSettings||(r=new s.UserManagerSettings(r));var m=v(this,t.call(this,r));return m._events=new u.UserManagerEvents(r),m._silentRenewService=new n(m),m.settings.automaticSilentRenew&&(i.Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew"),m.startSilentRenew()),m.settings.monitorSession&&(i.Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor"),m._sessionMonitor=new o(m)),m._tokenRevocationClient=new a(m._settings),m._tokenClient=new l(m._settings),m._joseUtil=y,m}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.getUser=function t(){var e=this;return this._loadUser().then((function(t){return t?(i.Log.info("UserManager.getUser: user loaded"),e._events.load(t,!1),t):(i.Log.info("UserManager.getUser: user not found in storage"),null)}))},e.prototype.removeUser=function t(){var e=this;return this.storeUser(null).then((function(){i.Log.info("UserManager.removeUser: user removed from storage"),e._events.unload()}))},e.prototype.signinRedirect=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="si:r";var r={useReplaceToNavigate:e.useReplaceToNavigate};return this._signinStart(e,this._redirectNavigator,r).then((function(){i.Log.info("UserManager.signinRedirect: successful")}))},e.prototype.signinRedirectCallback=function t(e){return this._signinEnd(e||this._redirectNavigator.url).then((function(t){return t.profile&&t.profile.sub?i.Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinRedirectCallback: no sub"),t}))},e.prototype.signinPopup=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="si:p";var r=e.redirect_uri||this.settings.popup_redirect_uri||this.settings.redirect_uri;return r?(e.redirect_uri=r,e.display="popup",this._signin(e,this._popupNavigator,{startUrl:r,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinPopup: no sub")),t}))):(i.Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured"),Promise.reject(new Error("No popup_redirect_uri or redirect_uri configured")))},e.prototype.signinPopupCallback=function t(e){return this._signinCallback(e,this._popupNavigator).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinPopupCallback: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinPopupCallback: no sub")),t})).catch((function(t){i.Log.error(t.message)}))},e.prototype.signinSilent=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return r=Object.assign({},r),this._loadUser().then((function(t){return t&&t.refresh_token?(r.refresh_token=t.refresh_token,e._useRefreshToken(r)):(r.request_type="si:s",r.id_token_hint=r.id_token_hint||e.settings.includeIdTokenInSilentRenew&&t&&t.id_token,t&&e._settings.validateSubOnSilentRenew&&(i.Log.debug("UserManager.signinSilent, subject prior to silent renew: ",t.profile.sub),r.current_sub=t.profile.sub),e._signinSilentIframe(r))}))},e.prototype._useRefreshToken=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this._tokenClient.exchangeRefreshToken(r).then((function(t){return t?t.access_token?e._loadUser().then((function(r){if(r){var n=Promise.resolve();return t.id_token&&(n=e._validateIdTokenFromTokenRefreshToken(r.profile,t.id_token)),n.then((function(){return i.Log.debug("UserManager._useRefreshToken: refresh token response success"),r.id_token=t.id_token||r.id_token,r.access_token=t.access_token,r.refresh_token=t.refresh_token||r.refresh_token,r.expires_in=t.expires_in,e.storeUser(r).then((function(){return e._events.load(r),r}))}))}return null})):(i.Log.error("UserManager._useRefreshToken: No access token returned from token endpoint"),Promise.reject("No access token returned from token endpoint")):(i.Log.error("UserManager._useRefreshToken: No response returned from token endpoint"),Promise.reject("No response returned from token endpoint"))}))},e.prototype._validateIdTokenFromTokenRefreshToken=function t(e,r){var n=this;return this._metadataService.getIssuer().then((function(t){return n.settings.getEpochTime().then((function(o){return n._joseUtil.validateJwtAttributes(r,t,n._settings.client_id,n._settings.clockSkew,o).then((function(t){return t?t.sub!==e.sub?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub"),Promise.reject(new Error("sub in id_token does not match current sub"))):t.auth_time&&t.auth_time!==e.auth_time?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time"),Promise.reject(new Error("auth_time in id_token does not match original auth_time"))):t.azp&&t.azp!==e.azp?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp"),Promise.reject(new Error("azp in id_token does not match original azp"))):!t.azp&&e.azp?(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token"),Promise.reject(new Error("azp not in id_token, but present in original id_token"))):void 0:(i.Log.error("UserManager._validateIdTokenFromTokenRefreshToken: Failed to validate id_token"),Promise.reject(new Error("Failed to validate id_token")))}))}))}))},e.prototype._signinSilentIframe=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.redirect_uri||this.settings.silent_redirect_uri||this.settings.redirect_uri;return r?(e.redirect_uri=r,e.prompt=e.prompt||"none",this._signin(e,this._iframeNavigator,{startUrl:r,silentRequestTimeout:e.silentRequestTimeout||this.settings.silentRequestTimeout}).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinSilent: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinSilent: no sub")),t}))):(i.Log.error("UserManager.signinSilent: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured")))},e.prototype.signinSilentCallback=function t(e){return this._signinCallback(e,this._iframeNavigator).then((function(t){return t&&(t.profile&&t.profile.sub?i.Log.info("UserManager.signinSilentCallback: successful, signed in sub: ",t.profile.sub):i.Log.info("UserManager.signinSilentCallback: no sub")),t}))},e.prototype.signinCallback=function t(e){var r=this;return this.readSigninResponseState(e).then((function(t){var n=t.state;t.response;return"si:r"===n.request_type?r.signinRedirectCallback(e):"si:p"===n.request_type?r.signinPopupCallback(e):"si:s"===n.request_type?r.signinSilentCallback(e):Promise.reject(new Error("invalid response_type in state"))}))},e.prototype.signoutCallback=function t(e,r){var n=this;return this.readSignoutResponseState(e).then((function(t){var i=t.state,o=t.response;return i?"so:r"===i.request_type?n.signoutRedirectCallback(e):"so:p"===i.request_type?n.signoutPopupCallback(e,r):Promise.reject(new Error("invalid response_type in state")):o}))},e.prototype.querySessionStatus=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(r=Object.assign({},r)).request_type="si:s";var n=r.redirect_uri||this.settings.silent_redirect_uri||this.settings.redirect_uri;return n?(r.redirect_uri=n,r.prompt="none",r.response_type=r.response_type||this.settings.query_status_response_type,r.scope=r.scope||"openid",r.skipUserInfo=!0,this._signinStart(r,this._iframeNavigator,{startUrl:n,silentRequestTimeout:r.silentRequestTimeout||this.settings.silentRequestTimeout}).then((function(t){return e.processSigninResponse(t.url).then((function(t){if(i.Log.debug("UserManager.querySessionStatus: got signin response"),t.session_state&&t.profile.sub)return i.Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ",t.profile.sub),{session_state:t.session_state,sub:t.profile.sub,sid:t.profile.sid};i.Log.info("querySessionStatus successful, user not authenticated")})).catch((function(t){if(t.session_state&&e.settings.monitorAnonymousSession&&("login_required"==t.message||"consent_required"==t.message||"interaction_required"==t.message||"account_selection_required"==t.message))return i.Log.info("UserManager.querySessionStatus: querySessionStatus success for anonymous user"),{session_state:t.session_state};throw t}))}))):(i.Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured")))},e.prototype._signin=function t(e,r){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signinStart(e,r,i).then((function(t){return n._signinEnd(t.url,e)}))},e.prototype._signinStart=function t(e,r){var n=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.prepare(o).then((function(t){return i.Log.debug("UserManager._signinStart: got navigator window handle"),n.createSigninRequest(e).then((function(e){return i.Log.debug("UserManager._signinStart: got signin request"),o.url=e.url,o.id=e.state.id,t.navigate(o)})).catch((function(e){throw t.close&&(i.Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window"),t.close()),e}))}))},e.prototype._signinEnd=function t(e){var r=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.processSigninResponse(e).then((function(t){i.Log.debug("UserManager._signinEnd: got signin response");var e=new a.User(t);if(n.current_sub){if(n.current_sub!==e.profile.sub)return i.Log.debug("UserManager._signinEnd: current user does not match user returned from signin. sub from signin: ",e.profile.sub),Promise.reject(new Error("login_required"));i.Log.debug("UserManager._signinEnd: current user matches user returned from signin")}return r.storeUser(e).then((function(){return i.Log.debug("UserManager._signinEnd: user stored"),r._events.load(e),e}))}))},e.prototype._signinCallback=function t(e,r){i.Log.debug("UserManager._signinCallback");var n="query"===this._settings.response_mode||!this._settings.response_mode&&l.SigninRequest.isCode(this._settings.response_type)?"?":"#";return r.callback(e,void 0,n)},e.prototype.signoutRedirect=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="so:r";var r=e.post_logout_redirect_uri||this.settings.post_logout_redirect_uri;r&&(e.post_logout_redirect_uri=r);var n={useReplaceToNavigate:e.useReplaceToNavigate};return this._signoutStart(e,this._redirectNavigator,n).then((function(){i.Log.info("UserManager.signoutRedirect: successful")}))},e.prototype.signoutRedirectCallback=function t(e){return this._signoutEnd(e||this._redirectNavigator.url).then((function(t){return i.Log.info("UserManager.signoutRedirectCallback: successful"),t}))},e.prototype.signoutPopup=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(e=Object.assign({},e)).request_type="so:p";var r=e.post_logout_redirect_uri||this.settings.popup_post_logout_redirect_uri||this.settings.post_logout_redirect_uri;return e.post_logout_redirect_uri=r,e.display="popup",e.post_logout_redirect_uri&&(e.state=e.state||{}),this._signout(e,this._popupNavigator,{startUrl:r,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then((function(){i.Log.info("UserManager.signoutPopup: successful")}))},e.prototype.signoutPopupCallback=function t(e,r){void 0===r&&"boolean"==typeof e&&(r=e,e=null);return this._popupNavigator.callback(e,r,"?").then((function(){i.Log.info("UserManager.signoutPopupCallback: successful")}))},e.prototype._signout=function t(e,r){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signoutStart(e,r,i).then((function(t){return n._signoutEnd(t.url)}))},e.prototype._signoutStart=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=this,n=arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.prepare(o).then((function(t){return i.Log.debug("UserManager._signoutStart: got navigator window handle"),r._loadUser().then((function(n){return i.Log.debug("UserManager._signoutStart: loaded current user from storage"),(r._settings.revokeAccessTokenOnSignout?r._revokeInternal(n):Promise.resolve()).then((function(){var s=e.id_token_hint||n&&n.id_token;return s&&(i.Log.debug("UserManager._signoutStart: Setting id_token into signout request"),e.id_token_hint=s),r.removeUser().then((function(){return i.Log.debug("UserManager._signoutStart: user removed, creating signout request"),r.createSignoutRequest(e).then((function(e){return i.Log.debug("UserManager._signoutStart: got signout request"),o.url=e.url,e.state&&(o.id=e.state.id),t.navigate(o)}))}))}))})).catch((function(e){throw t.close&&(i.Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window"),t.close()),e}))}))},e.prototype._signoutEnd=function t(e){return this.processSignoutResponse(e).then((function(t){return i.Log.debug("UserManager._signoutEnd: got signout response"),t}))},e.prototype.revokeAccessToken=function t(){var e=this;return this._loadUser().then((function(t){return e._revokeInternal(t,!0).then((function(r){if(r)return i.Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing"),t.access_token=null,t.refresh_token=null,t.expires_at=null,t.token_type=null,e.storeUser(t).then((function(){i.Log.debug("UserManager.revokeAccessToken: user stored"),e._events.load(t)}))}))})).then((function(){i.Log.info("UserManager.revokeAccessToken: access token revoked successfully")}))},e.prototype._revokeInternal=function t(e,r){var n=this;if(e){var o=e.access_token,s=e.refresh_token;return this._revokeAccessTokenInternal(o,r).then((function(t){return n._revokeRefreshTokenInternal(s,r).then((function(e){return t||e||i.Log.debug("UserManager.revokeAccessToken: no need to revoke due to no token(s), or JWT format"),t||e}))}))}return Promise.resolve(!1)},e.prototype._revokeAccessTokenInternal=function t(e,r){return!e||e.indexOf(".")>=0?Promise.resolve(!1):this._tokenRevocationClient.revoke(e,r).then((function(){return!0}))},e.prototype._revokeRefreshTokenInternal=function t(e,r){return e?this._tokenRevocationClient.revoke(e,r,"refresh_token").then((function(){return!0})):Promise.resolve(!1)},e.prototype.startSilentRenew=function t(){this._silentRenewService.start()},e.prototype.stopSilentRenew=function t(){this._silentRenewService.stop()},e.prototype._loadUser=function t(){return this._userStore.get(this._userStoreKey).then((function(t){return t?(i.Log.debug("UserManager._loadUser: user storageString loaded"),a.User.fromStorageString(t)):(i.Log.debug("UserManager._loadUser: no user storageString"),null)}))},e.prototype.storeUser=function t(e){if(e){i.Log.debug("UserManager.storeUser: storing user");var r=e.toStorageString();return this._userStore.set(this._userStoreKey,r)}return i.Log.debug("storeUser.storeUser: removing user"),this._userStore.remove(this._userStoreKey)},n(e,[{key:"_redirectNavigator",get:function t(){return this.settings.redirectNavigator}},{key:"_popupNavigator",get:function t(){return this.settings.popupNavigator}},{key:"_iframeNavigator",get:function t(){return this.settings.iframeNavigator}},{key:"_userStore",get:function t(){return this.settings.userStore}},{key:"events",get:function t(){return this._events}},{key:"_userStoreKey",get:function t(){return"user:"+this.settings.authority+":"+this.settings.client_id}}]),e}(o.OidcClient)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UserManagerSettings=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=(r(0),r(5)),o=r(40),s=r(41),a=r(43),u=r(6),c=r(1),h=r(8);function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}e.UserManagerSettings=function(t){function e(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.popup_redirect_uri,i=r.popup_post_logout_redirect_uri,g=r.popupWindowFeatures,d=r.popupWindowTarget,p=r.silent_redirect_uri,v=r.silentRequestTimeout,y=r.automaticSilentRenew,m=void 0!==y&&y,_=r.validateSubOnSilentRenew,S=void 0!==_&&_,b=r.includeIdTokenInSilentRenew,w=void 0===b||b,F=r.monitorSession,E=void 0===F||F,x=r.monitorAnonymousSession,A=void 0!==x&&x,k=r.checkSessionInterval,P=void 0===k?2e3:k,C=r.stopCheckSessionOnError,T=void 0===C||C,R=r.query_status_response_type,I=r.revokeAccessTokenOnSignout,D=void 0!==I&&I,L=r.accessTokenExpiringNotificationTime,N=void 0===L?60:L,U=r.redirectNavigator,B=void 0===U?new o.RedirectNavigator:U,O=r.popupNavigator,j=void 0===O?new s.PopupNavigator:O,M=r.iframeNavigator,H=void 0===M?new a.IFrameNavigator:M,V=r.userStore,K=void 0===V?new u.WebStorageStateStore({store:c.Global.sessionStorage}):V;l(this,e);var q=f(this,t.call(this,arguments[0]));return q._popup_redirect_uri=n,q._popup_post_logout_redirect_uri=i,q._popupWindowFeatures=g,q._popupWindowTarget=d,q._silent_redirect_uri=p,q._silentRequestTimeout=v,q._automaticSilentRenew=m,q._validateSubOnSilentRenew=S,q._includeIdTokenInSilentRenew=w,q._accessTokenExpiringNotificationTime=N,q._monitorSession=E,q._monitorAnonymousSession=A,q._checkSessionInterval=P,q._stopCheckSessionOnError=T,R?q._query_status_response_type=R:arguments[0]&&arguments[0].response_type?q._query_status_response_type=h.SigninRequest.isOidc(arguments[0].response_type)?"id_token":"code":q._query_status_response_type="id_token",q._revokeAccessTokenOnSignout=D,q._redirectNavigator=B,q._popupNavigator=j,q._iframeNavigator=H,q._userStore=K,q}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),n(e,[{key:"popup_redirect_uri",get:function t(){return this._popup_redirect_uri}},{key:"popup_post_logout_redirect_uri",get:function t(){return this._popup_post_logout_redirect_uri}},{key:"popupWindowFeatures",get:function t(){return this._popupWindowFeatures}},{key:"popupWindowTarget",get:function t(){return this._popupWindowTarget}},{key:"silent_redirect_uri",get:function t(){return this._silent_redirect_uri}},{key:"silentRequestTimeout",get:function t(){return this._silentRequestTimeout}},{key:"automaticSilentRenew",get:function t(){return this._automaticSilentRenew}},{key:"validateSubOnSilentRenew",get:function t(){return this._validateSubOnSilentRenew}},{key:"includeIdTokenInSilentRenew",get:function t(){return this._includeIdTokenInSilentRenew}},{key:"accessTokenExpiringNotificationTime",get:function t(){return this._accessTokenExpiringNotificationTime}},{key:"monitorSession",get:function t(){return this._monitorSession}},{key:"monitorAnonymousSession",get:function t(){return this._monitorAnonymousSession}},{key:"checkSessionInterval",get:function t(){return this._checkSessionInterval}},{key:"stopCheckSessionOnError",get:function t(){return this._stopCheckSessionOnError}},{key:"query_status_response_type",get:function t(){return this._query_status_response_type}},{key:"revokeAccessTokenOnSignout",get:function t(){return this._revokeAccessTokenOnSignout}},{key:"redirectNavigator",get:function t(){return this._redirectNavigator}},{key:"popupNavigator",get:function t(){return this._popupNavigator}},{key:"iframeNavigator",get:function t(){return this._iframeNavigator}},{key:"userStore",get:function t(){return this._userStore}}]),e}(i.OidcClientSettings)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.RedirectNavigator=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.RedirectNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.prototype.prepare=function t(){return Promise.resolve(this)},t.prototype.navigate=function t(e){return e&&e.url?(e.useReplaceToNavigate?window.location.replace(e.url):window.location=e.url,Promise.resolve()):(i.Log.error("RedirectNavigator.navigate: No url provided"),Promise.reject(new Error("No url provided")))},n(t,[{key:"url",get:function t(){return window.location.href}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PopupNavigator=void 0;var n=r(0),i=r(42);e.PopupNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.prototype.prepare=function t(e){var r=new i.PopupWindow(e);return Promise.resolve(r)},t.prototype.callback=function t(e,r,o){n.Log.debug("PopupNavigator.callback");try{return i.PopupWindow.notifyOpener(e,r,o),Promise.resolve()}catch(t){return Promise.reject(t)}},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PopupWindow=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(3);e.PopupWindow=function(){function t(e){var r=this;!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._promise=new Promise((function(t,e){r._resolve=t,r._reject=e}));var o=e.popupWindowTarget||"_blank",s=e.popupWindowFeatures||"location=no,toolbar=no,width=500,height=500,left=100,top=100;";this._popup=window.open("",o,s),this._popup&&(i.Log.debug("PopupWindow.ctor: popup successfully created"),this._checkForPopupClosedTimer=window.setInterval(this._checkForPopupClosed.bind(this),500))}return t.prototype.navigate=function t(e){return this._popup?e&&e.url?(i.Log.debug("PopupWindow.navigate: Setting URL in popup"),this._id=e.id,this._id&&(window["popupCallback_"+e.id]=this._callback.bind(this)),this._popup.focus(),this._popup.window.location=e.url):(this._error("PopupWindow.navigate: no url provided"),this._error("No url provided")):this._error("PopupWindow.navigate: Error opening popup window"),this.promise},t.prototype._success=function t(e){i.Log.debug("PopupWindow.callback: Successful response from popup window"),this._cleanup(),this._resolve(e)},t.prototype._error=function t(e){i.Log.error("PopupWindow.error: ",e),this._cleanup(),this._reject(new Error(e))},t.prototype.close=function t(){this._cleanup(!1)},t.prototype._cleanup=function t(e){i.Log.debug("PopupWindow.cleanup"),window.clearInterval(this._checkForPopupClosedTimer),this._checkForPopupClosedTimer=null,delete window["popupCallback_"+this._id],this._popup&&!e&&this._popup.close(),this._popup=null},t.prototype._checkForPopupClosed=function t(){this._popup&&!this._popup.closed||this._error("Popup window closed")},t.prototype._callback=function t(e,r){this._cleanup(r),e?(i.Log.debug("PopupWindow.callback success"),this._success({url:e})):(i.Log.debug("PopupWindow.callback: Invalid response from popup"),this._error("Invalid response from popup"))},t.notifyOpener=function t(e,r,n){if(window.opener){if(e=e||window.location.href){var s=o.UrlUtility.parseUrlFragment(e,n);if(s.state){var a="popupCallback_"+s.state,u=window.opener[a];u?(i.Log.debug("PopupWindow.notifyOpener: passing url message to opener"),u(e,r)):i.Log.warn("PopupWindow.notifyOpener: no matching callback found on opener")}else i.Log.warn("PopupWindow.notifyOpener: no state found in response url")}}else i.Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.")},n(t,[{key:"promise",get:function t(){return this._promise}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.IFrameNavigator=void 0;var n=r(0),i=r(44);e.IFrameNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.prototype.prepare=function t(e){var r=new i.IFrameWindow(e);return Promise.resolve(r)},t.prototype.callback=function t(e){n.Log.debug("IFrameNavigator.callback");try{return i.IFrameWindow.notifyParent(e),Promise.resolve()}catch(t){return Promise.reject(t)}},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.IFrameWindow=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0);e.IFrameWindow=function(){function t(e){var r=this;!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._promise=new Promise((function(t,e){r._resolve=t,r._reject=e})),this._boundMessageEvent=this._message.bind(this),window.addEventListener("message",this._boundMessageEvent,!1),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.width=0,this._frame.height=0,window.document.body.appendChild(this._frame)}return t.prototype.navigate=function t(e){if(e&&e.url){var r=e.silentRequestTimeout||1e4;i.Log.debug("IFrameWindow.navigate: Using timeout of:",r),this._timer=window.setTimeout(this._timeout.bind(this),r),this._frame.src=e.url}else this._error("No url provided");return this.promise},t.prototype._success=function t(e){this._cleanup(),i.Log.debug("IFrameWindow: Successful response from frame window"),this._resolve(e)},t.prototype._error=function t(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e))},t.prototype.close=function t(){this._cleanup()},t.prototype._cleanup=function t(){this._frame&&(i.Log.debug("IFrameWindow: cleanup"),window.removeEventListener("message",this._boundMessageEvent,!1),window.clearTimeout(this._timer),window.document.body.removeChild(this._frame),this._timer=null,this._frame=null,this._boundMessageEvent=null)},t.prototype._timeout=function t(){i.Log.debug("IFrameWindow.timeout"),this._error("Frame window timed out")},t.prototype._message=function t(e){if(i.Log.debug("IFrameWindow.message"),this._timer&&e.origin===this._origin&&e.source===this._frame.contentWindow&&"string"==typeof e.data&&(e.data.startsWith("http://")||e.data.startsWith("https://"))){var r=e.data;r?this._success({url:r}):this._error("Invalid response from frame")}},t.notifyParent=function t(e){i.Log.debug("IFrameWindow.notifyParent"),(e=e||window.location.href)&&(i.Log.debug("IFrameWindow.notifyParent: posting url message to parent"),window.parent.postMessage(e,location.protocol+"//"+location.host))},n(t,[{key:"promise",get:function t(){return this._promise}},{key:"_origin",get:function t(){return location.protocol+"//"+location.host}}]),t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.UserManagerEvents=void 0;var n=r(0),i=r(16),o=r(17);e.UserManagerEvents=function(t){function e(r){!function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var i=function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,t.call(this,r));return i._userLoaded=new o.Event("User loaded"),i._userUnloaded=new o.Event("User unloaded"),i._silentRenewError=new o.Event("Silent renew error"),i._userSignedIn=new o.Event("User signed in"),i._userSignedOut=new o.Event("User signed out"),i._userSessionChanged=new o.Event("User session changed"),i}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.load=function e(r){var i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n.Log.debug("UserManagerEvents.load"),t.prototype.load.call(this,r),i&&this._userLoaded.raise(r)},e.prototype.unload=function e(){n.Log.debug("UserManagerEvents.unload"),t.prototype.unload.call(this),this._userUnloaded.raise()},e.prototype.addUserLoaded=function t(e){this._userLoaded.addHandler(e)},e.prototype.removeUserLoaded=function t(e){this._userLoaded.removeHandler(e)},e.prototype.addUserUnloaded=function t(e){this._userUnloaded.addHandler(e)},e.prototype.removeUserUnloaded=function t(e){this._userUnloaded.removeHandler(e)},e.prototype.addSilentRenewError=function t(e){this._silentRenewError.addHandler(e)},e.prototype.removeSilentRenewError=function t(e){this._silentRenewError.removeHandler(e)},e.prototype._raiseSilentRenewError=function t(e){n.Log.debug("UserManagerEvents._raiseSilentRenewError",e.message),this._silentRenewError.raise(e)},e.prototype.addUserSignedIn=function t(e){this._userSignedIn.addHandler(e)},e.prototype.removeUserSignedIn=function t(e){this._userSignedIn.removeHandler(e)},e.prototype._raiseUserSignedIn=function t(){n.Log.debug("UserManagerEvents._raiseUserSignedIn"),this._userSignedIn.raise()},e.prototype.addUserSignedOut=function t(e){this._userSignedOut.addHandler(e)},e.prototype.removeUserSignedOut=function t(e){this._userSignedOut.removeHandler(e)},e.prototype._raiseUserSignedOut=function t(){n.Log.debug("UserManagerEvents._raiseUserSignedOut"),this._userSignedOut.raise()},e.prototype.addUserSessionChanged=function t(e){this._userSessionChanged.addHandler(e)},e.prototype.removeUserSessionChanged=function t(e){this._userSessionChanged.removeHandler(e)},e.prototype._raiseUserSessionChanged=function t(){n.Log.debug("UserManagerEvents._raiseUserSessionChanged"),this._userSessionChanged.raise()},e}(i.AccessTokenEvents)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Timer=void 0;var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=r(0),o=r(1),s=r(17);function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}e.Timer=function(t){function e(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.timer,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;a(this,e);var s=u(this,t.call(this,r));return s._timer=n,s._nowFunc=i||function(){return Date.now()/1e3},s}return function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),e.prototype.init=function t(e){e<=0&&(e=1),e=parseInt(e);var r=this.now+e;if(this.expiration===r&&this._timerHandle)i.Log.debug("Timer.init timer "+this._name+" skipping initialization since already initialized for expiration:",this.expiration);else{this.cancel(),i.Log.debug("Timer.init timer "+this._name+" for duration:",e),this._expiration=r;var n=5;e<n&&(n=e),this._timerHandle=this._timer.setInterval(this._callback.bind(this),1e3*n)}},e.prototype.cancel=function t(){this._timerHandle&&(i.Log.debug("Timer.cancel: ",this._name),this._timer.clearInterval(this._timerHandle),this._timerHandle=null)},e.prototype._callback=function e(){var r=this._expiration-this.now;i.Log.debug("Timer.callback; "+this._name+" timer expires in:",r),this._expiration<=this.now&&(this.cancel(),t.prototype.raise.call(this))},n(e,[{key:"now",get:function t(){return parseInt(this._nowFunc())}},{key:"expiration",get:function t(){return this._expiration}}]),e}(s.Event)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.SilentRenewService=void 0;var n=r(0);e.SilentRenewService=function(){function t(e){!function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userManager=e}return t.prototype.start=function t(){this._callback||(this._callback=this._tokenExpiring.bind(this),this._userManager.events.addAccessTokenExpiring(this._callback),this._userManager.getUser().then((function(t){})).catch((function(t){n.Log.error("SilentRenewService.start: Error from getUser:",t.message)})))},t.prototype.stop=function t(){this._callback&&(this._userManager.events.removeAccessTokenExpiring(this._callback),delete this._callback)},t.prototype._tokenExpiring=function t(){var e=this;this._userManager.signinSilent().then((function(t){n.Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful")}),(function(t){n.Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:",t.message),e._userManager.events._raiseSilentRenewError(t)}))},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CordovaPopupNavigator=void 0;var n=r(21);e.CordovaPopupNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.prototype.prepare=function t(e){var r=new n.CordovaPopupWindow(e);return Promise.resolve(r)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CordovaIFrameNavigator=void 0;var n=r(21);e.CordovaIFrameNavigator=function(){function t(){!function e(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t)}return t.prototype.prepare=function t(e){e.popupWindowFeatures="hidden=yes";var r=new n.CordovaPopupWindow(e);return Promise.resolve(r)},t}()},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.Version="1.11.3"}])}));

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(41);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var PooledClass = __webpack_require__(65);
var ReactElement = __webpack_require__(11);

var emptyFunction = __webpack_require__(14);
var traverseAllChildren = __webpack_require__(66);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var _prodInvariant = __webpack_require__(13);

var invariant = __webpack_require__(1);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(13);

var ReactCurrentOwner = __webpack_require__(12);
var REACT_ELEMENT_TYPE = __webpack_require__(38);

var getIteratorFn = __webpack_require__(39);
var invariant = __webpack_require__(1);
var KeyEscapeUtils = __webpack_require__(67);
var warning = __webpack_require__(2);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var ReactElement = __webpack_require__(11);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(40);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _prodInvariant = __webpack_require__(13);

var ReactPropTypeLocationNames = __webpack_require__(70);
var ReactPropTypesSecret = __webpack_require__(71);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(2);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(7);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(7);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var _prodInvariant = __webpack_require__(13);

var ReactCurrentOwner = __webpack_require__(12);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(2);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty
  // Strip regex characters so we can use it for regex
  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
  // Remove hasOwnProperty from the template to make it generic
  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs,

  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
    if (typeof console.reactStack !== 'function') {
      return;
    }

    var stack = [];
    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    try {
      if (isCreatingElement) {
        stack.push({
          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
          fileName: currentSource ? currentSource.fileName : null,
          lineNumber: currentSource ? currentSource.lineNumber : null
        });
      }

      while (id) {
        var element = ReactComponentTreeHook.getElement(id);
        var parentID = ReactComponentTreeHook.getParentID(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
        var source = element && element._source;
        stack.push({
          name: ownerName,
          fileName: source ? source.fileName : null,
          lineNumber: source ? source.lineNumber : null
        });
        id = parentID;
      }
    } catch (err) {
      // Internal state is messed up.
      // Stop building the stack (it's just a nice to have).
    }

    console.reactStack(stack);
  },
  popNonStandardWarningStack: function () {
    if (typeof console.reactStackEnd !== 'function') {
      return;
    }
    console.reactStackEnd();
  }
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _require = __webpack_require__(11),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(51);

module.exports = factory(isValidElement);

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = __webpack_require__(25);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



module.exports = '15.7.0';


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _require = __webpack_require__(35),
    Component = _require.Component;

var _require2 = __webpack_require__(11),
    isValidElement = _require2.isValidElement;

var ReactNoopUpdateQueue = __webpack_require__(36);
var factory = __webpack_require__(78);

module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var _assign = __webpack_require__(5);

// -- Inlined from fbjs --

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function _invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var warning = function(){};

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

// /-- Inlined from fbjs --

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillMount`.
     *
     * @optional
     */
    UNSAFE_componentWillMount: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillReceiveProps`.
     *
     * @optional
     */
    UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Replacement for (deprecated) `componentWillUpdate`.
     *
     * @optional
     */
    UNSAFE_componentWillUpdate: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Similar to ReactClassInterface but for static methods.
   */
  var ReactClassStaticInterface = {
    /**
     * This method is invoked after a component is instantiated and when it
     * receives new props. Return an object to update state in response to
     * prop changes. Return null to indicate no change to state.
     *
     * If an object is returned, its keys will be merged into the existing state.
     *
     * @return {object || null}
     * @optional
     */
    getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }

    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isAlreadyDefined = name in Constructor;
      if (isAlreadyDefined) {
        var specPolicy = ReactClassStaticInterface.hasOwnProperty(name)
          ? ReactClassStaticInterface[name]
          : null;

        _invariant(
          specPolicy === 'DEFINE_MANY_MERGED',
          'ReactClass: You are attempting to define ' +
            '`%s` on your component more than once. This conflict may be ' +
            'due to a mixin.',
          name
        );

        Constructor[name] = createMergedResultFunction(Constructor[name], property);

        return;
      }

      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.UNSAFE_componentWillRecieveProps,
        '%s has a method called UNSAFE_componentWillRecieveProps(). ' +
          'Did you mean UNSAFE_componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


var _prodInvariant = __webpack_require__(13);

var ReactElement = __webpack_require__(11);

var invariant = __webpack_require__(1);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(25);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ })

/******/ });
//# sourceMappingURL=silentRenew.js.map