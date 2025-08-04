var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter5() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter5.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter5.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter5.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter5.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter5.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter5.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter5.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter5.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter5.prototype.off = EventEmitter5.prototype.removeListener;
    EventEmitter5.prototype.addListener = EventEmitter5.prototype.on;
    EventEmitter5.prefixed = prefix;
    EventEmitter5.EventEmitter = EventEmitter5;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter5;
    }
  }
});

// node_modules/xgplayer-flv/es/_virtual/_rollupPluginBabelHelpers.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
    obj[key] = desc.value;
  }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
          invoke("next", value2, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function(method, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method)
          throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel)
              continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
            continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method, method = delegate.iterator[methodName];
    if (void 0 === method)
      return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod)
        return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next)
        return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(val) {
    var object = Object(val), keys = [];
    for (var key in object)
      keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object)
          return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
        for (var name in this)
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type)
        throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function(exception) {
      if (this.done)
        throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc)
          return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally)
              throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function(record, afterLoc) {
      if ("throw" === record.type)
        throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc)
          return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf22(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf22(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// node_modules/xgplayer-streaming-shared/es/_virtual/_rollupPluginBabelHelpers.js
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread22(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime2() {
  _regeneratorRuntime2 = function() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
    obj[key] = desc.value;
  }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
          invoke("next", value2, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function(method, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method)
          throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel)
              continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
            continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method, method = delegate.iterator[methodName];
    if (void 0 === method)
      return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod)
        return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next)
        return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(val) {
    var object = Object(val), keys = [];
    for (var key in object)
      keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object)
          return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
        for (var name in this)
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type)
        throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function(exception) {
      if (this.done)
        throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc)
          return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally)
              throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function(record, afterLoc) {
      if ("throw" === record.type)
        throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc)
          return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function asyncGeneratorStep2(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator2(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep2(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey2(descriptor.key), descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf2(subClass, superClass);
}
function _getPrototypeOf2(o) {
  _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf22(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf2(o);
}
function _setPrototypeOf2(o, p) {
  _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf22(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf2(o, p);
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct2()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf2(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf2(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf2(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _assertThisInitialized2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn2(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized2(self);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn2(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf2(object);
    if (object === null)
      break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = it.call(o);
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
function _toPrimitive2(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// node_modules/xgplayer-streaming-shared/es/buffer.js
var Buffer2 = /* @__PURE__ */ function() {
  function Buffer22() {
    _classCallCheck2(this, Buffer22);
  }
  _createClass2(Buffer22, null, [{
    key: "start",
    value: function start(buf) {
      if (!buf || !buf.length)
        return 0;
      if (buf.length === 1 && buf.end(0) - buf.start(0) < 1e-6)
        return 0;
      if (buf.length === 1 && buf.start(0) < 0)
        return 0;
      return buf.start(0);
    }
  }, {
    key: "end",
    value: function end(buf) {
      if (!buf || !buf.length)
        return 0;
      if (buf.length === 1 && buf.end(0) - buf.start(0) < 1e-6)
        return 0;
      return buf.end(buf.length - 1);
    }
  }, {
    key: "get",
    value: function get(b) {
      if (!b)
        return;
      try {
        return b.buffered;
      } catch (error) {
      }
    }
  }, {
    key: "buffers",
    value: function buffers(buf, maxHole) {
      if (!buf || !buf.length)
        return [];
      var buffers2 = [];
      for (var i = 0, l = buf.length; i < l; i++) {
        var bufLen = buffers2.length;
        if (!bufLen || !maxHole) {
          buffers2.push([buf.start(i), buf.end(i)]);
        } else {
          var last = buffers2[bufLen - 1];
          var lastEnd = last[1];
          var start = buf.start(i);
          if (start - lastEnd <= maxHole) {
            var end = buf.end(i);
            if (end > lastEnd) {
              last[1] = end;
            }
          } else {
            buffers2.push([buf.start(i), buf.end(i)]);
          }
        }
      }
      return buffers2;
    }
  }, {
    key: "totalLength",
    value: function totalLength(buffers) {
      if (!buffers || !buffers.length)
        return 0;
      return buffers.reduce(function(a, c) {
        return a += c[1] - c[0];
      }, 0);
    }
  }, {
    key: "info",
    value: function info(buf) {
      var pos = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var maxHole = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      if (!buf || !buf.length)
        return {
          start: 0,
          end: 0,
          buffers: []
        };
      var start = 0;
      var end = 0;
      var index = 0;
      var nextStart = 0;
      var nextEnd = 0;
      var prevStart = 0;
      var prevEnd = 0;
      var buffers = Buffer22.buffers(buf, maxHole);
      for (var i = 0, l = buffers.length; i < l; i++) {
        var item = buffers[i];
        if (pos + maxHole >= item[0] && pos <= item[1]) {
          start = item[0];
          end = item[1];
          index = i;
        } else if (pos + maxHole < item[0]) {
          nextStart = item[0];
          nextEnd = item[1];
          break;
        } else if (pos + maxHole > item[1]) {
          prevStart = item[0];
          prevEnd = item[1];
        }
      }
      return {
        start,
        end,
        index,
        buffers,
        nextStart,
        nextEnd,
        prevStart,
        prevEnd,
        currentTime: pos,
        behind: pos - start,
        remaining: end ? end - pos : 0,
        length: Buffer22.totalLength && Buffer22.totalLength(buffers)
      };
    }
  }, {
    key: "isBuffered",
    value: function isBuffered(media, pos) {
      if (media) {
        var buffered = Buffer22.get(media);
        if (buffered !== null && buffered !== void 0 && buffered.length) {
          for (var i = 0; i < buffered.length; i++) {
            if (pos >= buffered.start(i) && pos <= buffered.end(i)) {
              return true;
            }
          }
        }
      }
      return false;
    }
  }]);
  return Buffer22;
}();

// node_modules/xgplayer-streaming-shared/es/env.js
var isBrowser = typeof window !== "undefined";

// node_modules/xgplayer-streaming-shared/es/error.js
var _ERR_CODE;
var ERR = {
  MANIFEST: "manifest",
  NETWORK: "network",
  NETWORK_TIMEOUT: "network_timeout",
  NETWORK_FORBIDDEN: "network_forbidden",
  NETWORK_NOTFOUND: "network_notfound",
  NETWROK_RANGE_NOT_SATISFIABLE: "network_range_not_satisfiable",
  DEMUX: "demux",
  REMUX: "remux",
  MEDIA: "media",
  DRM: "drm",
  OTHER: "other",
  RUNTIME: "runtime",
  SUB_TYPES: {
    FLV: "FLV",
    HLS: "HLS",
    MP4: "MP4",
    FMP4: "FMP4",
    MSE_ADD_SB: "MSE_ADD_SB",
    MSE_APPEND_BUFFER: "MSE_APPEND_BUFFER",
    MSE_OTHER: "MSE_OTHER",
    MSE_FULL: "MSE_FULL",
    MSE_CHANGE_TYPE: "MSE_CHANGE_TYPE",
    OPTION: "OPTION",
    DASH: "DASH",
    LICENSE: "LICENSE",
    CUSTOM_LICENSE: "CUSTOM_LICENSE",
    MSE_HIJACK: "MSE_HIJACK",
    EME_HIJACK: "EME_HIJACK",
    SIDX: "SIDX",
    NO_CANPLAY_ERROR: "NO_CANPLAY_ERROR",
    BUFFERBREAK_ERROR: "BUFFERBREAK_ERROR",
    WAITING_TIMEOUT_ERROR: "WAITING_TIMEOUT_ERROR",
    MEDIA_ERR_ABORTED: "MEDIA_ERR_ABORTED",
    MEDIA_ERR_NETWORK: "MEDIA_ERR_NETWORK",
    MEDIA_ERR_DECODE: "MEDIA_ERR_DECODE",
    MEDIA_ERR_SRC_NOT_SUPPORTED: "MEDIA_ERR_SRC_NOT_SUPPORTED",
    MEDIA_ERR_CODEC_NOT_SUPPORTED: "MEDIA_ERR_CODEC_NOT_SUPPORTED",
    MEDIA_ERR_URL_EMPTY: "MEDIA_ERR_URL_EMPTY"
  }
};
var ERR_CODE = (_ERR_CODE = {}, _defineProperty2(_ERR_CODE, ERR.MANIFEST, {
  HLS: 1100,
  DASH: 1200
}), _defineProperty2(_ERR_CODE, ERR.NETWORK, 2100), _defineProperty2(_ERR_CODE, ERR.NETWORK_TIMEOUT, 2101), _defineProperty2(_ERR_CODE, ERR.NETWORK_FORBIDDEN, 2103), _defineProperty2(_ERR_CODE, ERR.NETWORK_NOTFOUND, 2104), _defineProperty2(_ERR_CODE, ERR.NETWROK_RANGE_NOT_SATISFIABLE, 2116), _defineProperty2(_ERR_CODE, ERR.DEMUX, {
  FLV: 3100,
  HLS: 3200,
  MP4: 3300,
  FMP4: 3400,
  SIDX: 3410
}), _defineProperty2(_ERR_CODE, ERR.REMUX, {
  FMP4: 4100,
  MP4: 4200
}), _defineProperty2(_ERR_CODE, ERR.MEDIA, {
  MEDIA_ERR_ABORTED: 5101,
  MEDIA_ERR_NETWORK: 5102,
  MEDIA_ERR_DECODE: 5103,
  MEDIA_ERR_SRC_NOT_SUPPORTED: 5104,
  MEDIA_ERR_CODEC_NOT_SUPPORTED: 5105,
  MEDIA_ERR_URL_EMPTY: 5106,
  MSE_ADD_SB: 5200,
  MSE_APPEND_BUFFER: 5201,
  MSE_OTHER: 5202,
  MSE_FULL: 5203,
  MSE_HIJACK: 5204,
  MSE_CHANGE_TYPE: 5205,
  EME_HIJACK: 5301
}), _defineProperty2(_ERR_CODE, ERR.DRM, {
  LICENSE: 7100,
  CUSTOM_LICENSE: 7200
}), _defineProperty2(_ERR_CODE, ERR.OTHER, 8e3), _defineProperty2(_ERR_CODE, ERR.RUNTIME, {
  NO_CANPLAY_ERROR: 9001,
  BUFFERBREAK_ERROR: 9002,
  WAITING_TIMEOUT_ERROR: 9003
}), _ERR_CODE);
var StreamingError = /* @__PURE__ */ function(_Error) {
  _inherits2(StreamingError2, _Error);
  var _super = _createSuper2(StreamingError2);
  function StreamingError2(type, subType, origin, payload, msg) {
    var _this;
    _classCallCheck2(this, StreamingError2);
    _this = _super.call(this, msg || (origin === null || origin === void 0 ? void 0 : origin.message));
    _this.errorType = type === ERR.NETWORK_TIMEOUT ? ERR.NETWORK : type;
    _this.originError = origin;
    _this.ext = payload;
    _this.errorCode = ERR_CODE[type][subType] || ERR_CODE[type];
    _this.errorMessage = _this.message;
    if (!_this.errorCode) {
      _this.errorType = ERR.OTHER;
      _this.errorCode = ERR_CODE[_this.errorType];
    }
    return _this;
  }
  _createClass2(StreamingError2, null, [{
    key: "create",
    value: function create(type, subType, origin, payload, msg) {
      if (type instanceof StreamingError2) {
        return type;
      } else if (type instanceof Error) {
        origin = type;
        type = "";
      }
      if (!type)
        type = ERR.OTHER;
      return new StreamingError2(type, subType, origin, payload, msg);
    }
  }, {
    key: "network",
    value: function network(error) {
      var _error$response;
      return new StreamingError2(error !== null && error !== void 0 && error.isTimeout ? ERR.NETWORK_TIMEOUT : ERR.NETWORK, null, error instanceof Error ? error : null, {
        url: error === null || error === void 0 ? void 0 : error.url,
        response: error === null || error === void 0 ? void 0 : error.response,
        httpCode: error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status
      });
    }
  }]);
  return StreamingError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));

// node_modules/xgplayer-streaming-shared/es/logger.js
var LogCacheLevel = {
  "DEBUG": 1,
  "LOG": 2,
  "WARN": 3,
  "ERROR": 4
};
var LOG_MAX_SIZE = 200 * 1024;
var SIMPLE_TYPE = ["Boolean", "Number", "String", "Undefined", "Null", "Date", "Object"];
var Logger = /* @__PURE__ */ function() {
  function Logger22(name, config) {
    _classCallCheck2(this, Logger22);
    this.name = name || "";
    this._prefix = "[".concat(this.name, "]");
    this.logCacheLevel = (config === null || config === void 0 ? void 0 : config.logCacheLevel) || 3;
    this.logMaxSize = (config === null || config === void 0 ? void 0 : config.logMaxSize) || LOG_MAX_SIZE;
    this.logSize = 0;
    this.logTextArray = [];
  }
  _createClass2(Logger22, [{
    key: "debug",
    value: function debug() {
      var _console;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this.logCache.apply(this, [LogCacheLevel.DEBUG].concat(args));
      if (Logger22.disabled)
        return;
      (_console = console).debug.apply(_console, ["[".concat(nowTime(), "]"), this._prefix].concat(args));
    }
  }, {
    key: "log",
    value: function log() {
      var _console2;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this.logCache.apply(this, [LogCacheLevel.LOG].concat(args));
      if (Logger22.disabled)
        return;
      (_console2 = console).log.apply(_console2, ["[".concat(nowTime(), "]"), this._prefix].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _console3;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this.logCache.apply(this, [LogCacheLevel.WARN].concat(args));
      if (Logger22.disabled)
        return;
      (_console3 = console).warn.apply(_console3, ["[".concat(nowTime(), "]"), this._prefix].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _console4;
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this.logCache.apply(this, [LogCacheLevel.ERROR].concat(args));
      if (Logger22.disabled)
        return;
      (_console4 = console).error.apply(_console4, ["[".concat(nowTime(), "]"), this._prefix].concat(args));
    }
  }, {
    key: "logCache",
    value: function logCache(logCacheLevel) {
      if (logCacheLevel < this.logCacheLevel)
        return;
      var text = "";
      try {
        for (var _len5 = arguments.length, logText = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          logText[_key5 - 1] = arguments[_key5];
        }
        var finLogText = logText.map(function(item) {
          return logable(item);
        });
        text = "[".concat(nowTime(), "]") + this._prefix + JSON.stringify(finLogText);
      } catch (e) {
        return;
      }
      if (logCacheLevel >= this.logCacheLevel) {
        this.logSize += text.length;
        this.logTextArray.push(text);
      }
      if (this.logSize > this.logMaxSize) {
        var delLog = this.logTextArray.shift();
        this.logSize -= delLog.length;
      }
    }
  }, {
    key: "getLogCache",
    value: function getLogCache() {
      var logText = this.logTextArray.join("\n");
      this.reset();
      return logText;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.logTextArray = [];
      this.logSize = 0;
    }
  }, {
    key: "table",
    value: function table() {
      var _console5;
      if (Logger22.disabled)
        return;
      console.group(this._prefix);
      (_console5 = console).table.apply(_console5, arguments);
      console.groupEnd();
    }
  }, {
    key: "setLogLevel",
    value: function setLogLevel(val) {
      this.logCacheLevel = val;
    }
  }], [{
    key: "enable",
    value: function enable() {
      Logger22.disabled = false;
    }
  }, {
    key: "disable",
    value: function disable() {
      Logger22.disabled = true;
    }
  }]);
  return Logger22;
}();
_defineProperty2(Logger, "disabled", true);
function nowTime() {
  return (/* @__PURE__ */ new Date()).toLocaleString();
}
function reduceDepth(val) {
  if (_typeof(val) !== "object") {
    return val;
  }
  var objType = Object.prototype.toString.call(val).slice(8, -1);
  switch (objType) {
    case "Array":
    case "Uint8Array":
    case "ArrayBuffer":
      return objType + "[" + val.length + "]";
    case "Object":
      return "{}";
    default:
      return objType;
  }
}
function logable(obj, maxDepth, depth) {
  if (!depth)
    depth = 1;
  if (!maxDepth)
    maxDepth = 2;
  var result = {};
  if (!obj || _typeof(obj) !== "object") {
    return obj;
  }
  var objType = Object.prototype.toString.call(obj).slice(8, -1);
  if (!SIMPLE_TYPE.includes(objType)) {
    return objType;
  }
  if (depth > maxDepth) {
    return void 0;
  }
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (depth === maxDepth) {
        result[key] = reduceDepth(obj[key]);
      } else if (_typeof(obj[key]) === "object") {
        result[key] = logable(obj[key], maxDepth, depth + 1);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

// node_modules/xgplayer-streaming-shared/es/utils.js
function createPublicPromise() {
  var res, rej;
  var promise = new Promise(function(resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.used = false;
  promise.resolve = function() {
    promise.used = true;
    return res.apply(void 0, arguments);
  };
  promise.reject = function() {
    promise.used = true;
    return rej.apply(void 0, arguments);
  };
  return promise;
}
function nowTime2() {
  try {
    return parseInt(performance.now(), 10);
  } catch (e) {
    return (/* @__PURE__ */ new Date()).getTime();
  }
}
var SafeJSON = {
  stringify: function stringify(obj) {
    try {
      return JSON.stringify(obj);
    } catch (e) {
      return "";
    }
  },
  parse: function parse(obj) {
    try {
      return JSON.parse(obj);
    } catch (e) {
      return void 0;
    }
  }
};

// node_modules/xgplayer-streaming-shared/es/mse.js
function getMediaSource() {
  var preferMMS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
  try {
    if (!isBrowser)
      return null;
    if (preferMMS && typeof ManagedMediaSource !== "undefined")
      return ManagedMediaSource;
    return window.MediaSource;
  } catch (e) {
  }
}
function isMMS(mediaSource) {
  return /ManagedMediaSource/gi.test(Object.prototype.toString.call(mediaSource));
}
function getTimeRanges(buffered) {
  var ranges = [];
  if (buffered instanceof TimeRanges) {
    for (var i = 0; i < buffered.length; i++) {
      ranges.push({
        start: buffered.start(i),
        end: buffered.end(i)
      });
    }
  }
  return ranges;
}
var OP_NAME = {
  APPEND: "appendBuffer",
  REMOVE: "removeBuffer",
  UPDATE_DURATION: "updateDuration"
};
var MSE = /* @__PURE__ */ function() {
  function MSE2(media, config) {
    var _this2 = this;
    _classCallCheck2(this, MSE2);
    _defineProperty2(this, "media", null);
    _defineProperty2(this, "mediaSource", null);
    _defineProperty2(this, "_openPromise", createPublicPromise());
    _defineProperty2(this, "_queue", /* @__PURE__ */ Object.create(null));
    _defineProperty2(this, "_sourceBuffer", /* @__PURE__ */ Object.create(null));
    _defineProperty2(this, "_mseFullFlag", {});
    _defineProperty2(this, "_st", 0);
    _defineProperty2(this, "_opst", 0);
    _defineProperty2(this, "_logger", null);
    _defineProperty2(this, "_config", null);
    _defineProperty2(this, "_url", null);
    _defineProperty2(this, "_onStartStreaming", function() {
      _this2._logger.debug("startstreaming");
    });
    _defineProperty2(this, "_onEndStreaming", function() {
      _this2._logger.debug("endstreaming");
    });
    _defineProperty2(this, "_onSBUpdateEnd", function(type) {
      var queue = _this2._queue[type];
      if (queue) {
        var op = queue[0];
        if (!((op === null || op === void 0 ? void 0 : op.opName) === OP_NAME.UPDATE_DURATION)) {
          queue.shift();
        }
        if (op) {
          var _this2$_sourceBuffer$, _op$context;
          var costtime = nowTime2() - _this2._opst;
          _this2._logger.debug("UpdateEnd(".concat(type, "/").concat(op.opName, ")"), SafeJSON.stringify(getTimeRanges((_this2$_sourceBuffer$ = _this2._sourceBuffer[type]) === null || _this2$_sourceBuffer$ === void 0 ? void 0 : _this2$_sourceBuffer$.buffered)), costtime, op.context);
          op.promise.resolve({
            name: op.opName,
            context: op.context,
            costtime
          });
          var callback = (_op$context = op.context) === null || _op$context === void 0 ? void 0 : _op$context.callback;
          if (callback && typeof callback === "function") {
            callback(op.context);
          }
          _this2._startQueue(type);
        }
      }
    });
    _defineProperty2(this, "_onSBUpdateError", function(type, event) {
      var queue = _this2._queue[type];
      if (queue) {
        var op = queue[0];
        if (op) {
          _this2._logger.error("UpdateError", type, op.opName, op.context);
          op.promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_APPEND_BUFFER, event));
        }
      }
    });
    this._config = Object.assign(MSE2.getDefaultConfig(), config);
    if (media)
      this.bindMedia(media);
    this._logger = new Logger("MSE");
    if (this._config.openLog) {
      Logger.enable();
    }
  }
  _createClass2(MSE2, [{
    key: "isOpened",
    get: function get() {
      var _this$mediaSource;
      return ((_this$mediaSource = this.mediaSource) === null || _this$mediaSource === void 0 ? void 0 : _this$mediaSource.readyState) === "open";
    }
  }, {
    key: "hasOpTasks",
    get: function get() {
      var _this3 = this;
      var flag = false;
      Object.keys(this._queue).forEach(function(k) {
        var queue = _this3._queue[k];
        if (Array.isArray(queue)) {
          flag || (flag = queue.length > 0);
        }
      });
      return flag;
    }
  }, {
    key: "url",
    get: function get() {
      return this._url;
    }
  }, {
    key: "duration",
    get: function get() {
      var _this$mediaSource2;
      return ((_this$mediaSource2 = this.mediaSource) === null || _this$mediaSource2 === void 0 ? void 0 : _this$mediaSource2.duration) || -1;
    }
  }, {
    key: "isEnded",
    get: function get() {
      return this.mediaSource ? this.mediaSource.readyState === "ended" : false;
    }
  }, {
    key: "streaming",
    get: function get() {
      return isMMS(this.mediaSource) ? this.mediaSource.streaming : true;
    }
  }, {
    key: "isFull",
    value: function isFull(type) {
      return type ? this._mseFullFlag[type] : this._mseFullFlag[MSE2.VIDEO];
    }
  }, {
    key: "updateDuration",
    value: function updateDuration(duration) {
      var _this4 = this;
      var isReduceDuration = this.mediaSource && this.mediaSource.duration > duration;
      if (this.mediaSource && this.mediaSource.duration > duration) {
        var bufferEnd = 0;
        Object.keys(this._sourceBuffer).forEach(function(k) {
          try {
            bufferEnd = Math.max(_this4.bufferEnd(k) || 0, bufferEnd);
          } catch (error) {
          }
        });
        if (duration < bufferEnd) {
          return Promise.resolve();
        }
      }
      return this._enqueueBlockingOp(function() {
        if (_this4.isEnded) {
          _this4._logger.debug("setDuration but ended");
          return;
        }
        if (_this4.mediaSource) {
          _this4.mediaSource.duration = duration;
          _this4._logger.debug("setDuration", duration);
        }
      }, OP_NAME.UPDATE_DURATION, {
        isReduceDuration
      });
    }
  }, {
    key: "open",
    value: function open() {
      var _this5 = this;
      if (this._openPromise.used && !this.isOpened && this.mediaSource) {
        var ms = this.mediaSource;
        var onOpen = function onOpen2() {
          var costTime = nowTime2() - _this5._st;
          _this5._logger.debug("sourceopen", costTime);
          ms.removeEventListener("sourceopen", onOpen2);
          _this5._openPromise.resolve({
            costtime: costTime
          });
        };
        ms.addEventListener("sourceopen", onOpen);
        this._openPromise = createPublicPromise();
      }
      return this._openPromise;
    }
  }, {
    key: "bindMedia",
    value: function() {
      var _bindMedia = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee(media) {
        var _this6 = this;
        var MediaSource2, ms, useMMS, onOpen;
        return _regeneratorRuntime2().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.mediaSource || this.media)) {
                  _context.next = 3;
                  break;
                }
                _context.next = 3;
                return this.unbindMedia();
              case 3:
                MediaSource2 = getMediaSource(this._config.preferMMS);
                if (!(!media || !MediaSource2)) {
                  _context.next = 6;
                  break;
                }
                throw new Error("Param media or MediaSource does not exist");
              case 6:
                this.media = media;
                ms = this.mediaSource = new MediaSource2();
                useMMS = isMMS(ms);
                this._st = nowTime2();
                onOpen = function onOpen2() {
                  var costTime = nowTime2() - _this6._st;
                  _this6._logger.debug("sourceopen");
                  ms.removeEventListener("sourceopen", onOpen2);
                  URL.revokeObjectURL(media.src);
                  _this6._openPromise.resolve({
                    costtime: costTime
                  });
                };
                ms.addEventListener("sourceopen", onOpen);
                if (useMMS) {
                  ms.addEventListener("startstreaming", this._onStartStreaming);
                  ms.addEventListener("endstreaming", this._onEndStreaming);
                }
                this._url = URL.createObjectURL(ms);
                media.src = this._url;
                media.disableRemotePlayback = useMMS;
                return _context.abrupt("return", this._openPromise);
              case 17:
              case "end":
                return _context.stop();
            }
        }, _callee, this);
      }));
      function bindMedia(_x) {
        return _bindMedia.apply(this, arguments);
      }
      return bindMedia;
    }()
  }, {
    key: "unbindMedia",
    value: function() {
      var _unbindMedia = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee2() {
        var _this7 = this;
        var ms, hasMetadata, mseOpen;
        return _regeneratorRuntime2().wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._openPromise.used)
                  this._openPromise.resolve();
                ms = this.mediaSource;
                if (ms) {
                  Object.keys(this._queue).forEach(function(t) {
                    var queue = _this7._queue[t];
                    if (queue) {
                      queue.forEach(function(x) {
                        var _x$promise, _x$promise$resolve;
                        return (_x$promise = x.promise) === null || _x$promise === void 0 ? void 0 : (_x$promise$resolve = _x$promise.resolve) === null || _x$promise$resolve === void 0 ? void 0 : _x$promise$resolve.call(_x$promise);
                      });
                    }
                  });
                  hasMetadata = !!this.media && this.media.readyState >= 1;
                  mseOpen = ms.readyState === "open";
                  if (hasMetadata && mseOpen) {
                    try {
                      ms.endOfStream();
                    } catch (error) {
                    }
                  }
                  Object.keys(this._sourceBuffer).forEach(function(k) {
                    try {
                      ms.removeSourceBuffer(_this7._sourceBuffer[k]);
                    } catch (error) {
                    }
                  });
                  if (isMMS(ms)) {
                    ms.removeEventListener("startstreaming", this._onStartStreaming);
                    ms.removeEventListener("endstreaming", this._onEndStreaming);
                  }
                }
                if (this.media) {
                  this.media.disableRemotePlayback = false;
                  this.media.removeAttribute("src");
                  try {
                    this.media.load();
                  } catch (error) {
                  }
                  this.media = null;
                }
                this.mediaSource = null;
                this._openPromise = createPublicPromise();
                this._queue = /* @__PURE__ */ Object.create(null);
                this._sourceBuffer = /* @__PURE__ */ Object.create(null);
              case 8:
              case "end":
                return _context2.stop();
            }
        }, _callee2, this);
      }));
      function unbindMedia() {
        return _unbindMedia.apply(this, arguments);
      }
      return unbindMedia;
    }()
  }, {
    key: "createSource",
    value: function createSource(type, mimeType) {
      if (this._sourceBuffer[type] || !this.mediaSource)
        return;
      var sb;
      try {
        sb = this._sourceBuffer[type] = this.mediaSource.addSourceBuffer(mimeType);
      } catch (error) {
        throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_ADD_SB, error);
      }
      sb.mimeType = mimeType;
      sb.addEventListener("updateend", this._onSBUpdateEnd.bind(this, type));
      sb.addEventListener("error", this._onSBUpdateError.bind(this, type));
    }
  }, {
    key: "changeType",
    value: function changeType(type, mimeType) {
      var _this8 = this;
      var sb = this._sourceBuffer[type];
      if (!this.mediaSource || !sb || sb.mimeType === mimeType)
        return Promise.resolve();
      if (typeof sb.changeType !== "function") {
        return Promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_CHANGE_TYPE, new Error("changeType is not a function")));
      }
      return this._enqueueOp(type, function() {
        try {
          sb.changeType(mimeType);
        } catch (e) {
          throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_CHANGE_TYPE, e);
        }
        sb.mimeType = mimeType;
        _this8._onSBUpdateEnd(type);
      }, "changeType", {
        mimeType
      });
    }
  }, {
    key: "createOrChangeSource",
    value: function createOrChangeSource(type, mimeType) {
      this.createSource(type, mimeType);
      return this.changeType(type, mimeType);
    }
  }, {
    key: "append",
    value: function append(type, buffer, context) {
      var _this9 = this;
      if (!buffer || !buffer.byteLength) {
        return Promise.resolve();
      }
      if (!this._sourceBuffer[type])
        return Promise.resolve();
      return this._enqueueOp(type, function() {
        var _this9$_sourceBuffer$;
        if (!_this9.mediaSource || _this9.media.error)
          return;
        _this9._logger.debug("MSE APPEND START", context);
        _this9._opst = nowTime2();
        (_this9$_sourceBuffer$ = _this9._sourceBuffer[type]) === null || _this9$_sourceBuffer$ === void 0 ? void 0 : _this9$_sourceBuffer$.appendBuffer(buffer);
      }, OP_NAME.APPEND, context);
    }
  }, {
    key: "remove",
    value: function remove(type, startTime, endTime, context) {
      var _this10 = this;
      var isInsertHead = false;
      if (this._mseFullFlag[type]) {
        isInsertHead = true;
      }
      return this._enqueueOp(type, function() {
        if (!_this10.mediaSource || _this10.media.error)
          return;
        var sb = _this10._sourceBuffer[type];
        if (startTime >= endTime || !sb) {
          _this10._onSBUpdateEnd(type);
          return;
        }
        _this10._opst = nowTime2();
        _this10._logger.debug("MSE REMOVE START", type, startTime, endTime, context);
        sb.remove(startTime, endTime);
      }, OP_NAME.REMOVE, context, isInsertHead);
    }
  }, {
    key: "clearBuffer",
    value: function clearBuffer(startTime, endTime) {
      var _this11 = this;
      var p;
      Object.keys(this._sourceBuffer).forEach(function(k) {
        p = _this11.remove(k, startTime, endTime);
      });
      return p || Promise.resolve();
    }
  }, {
    key: "clearAllBuffer",
    value: function clearAllBuffer() {
      var _this12 = this;
      var p;
      Object.keys(this._sourceBuffer).forEach(function(k) {
        var sb = _this12._sourceBuffer[k];
        p = _this12.remove(k, 0, Buffer2.end(Buffer2.get(sb)));
      });
      return p;
    }
  }, {
    key: "clearOpQueues",
    value: function clearOpQueues(type, allClear) {
      var _this$_queue$type;
      this._logger.debug("MSE clearOpQueue START");
      var queue = this._queue[type];
      if (allClear && queue) {
        this._queue[type] = [];
        return;
      }
      if (!queue || !queue[type] || queue.length < 5)
        return;
      var initQueue = [];
      queue.forEach(function(op) {
        if (op.context && op.context.isinit) {
          initQueue.push(op);
        }
      });
      this._queue[type] = queue.slice(0, 2);
      initQueue.length > 0 && (_this$_queue$type = this._queue[type]).push.apply(_this$_queue$type, initQueue);
    }
  }, {
    key: "endOfStream",
    value: function endOfStream(reason) {
      var _this13 = this;
      if (!this.mediaSource || this.mediaSource.readyState !== "open")
        return Promise.resolve();
      return this._enqueueBlockingOp(function() {
        var ms = _this13.mediaSource;
        if (!ms || ms.readyState !== "open")
          return;
        _this13._logger.debug("MSE endOfStream START");
        if (reason) {
          ms.endOfStream(reason);
        } else {
          ms.endOfStream();
        }
      }, "endOfStream");
    }
  }, {
    key: "setLiveSeekableRange",
    value: function setLiveSeekableRange(start, end) {
      var ms = this.mediaSource;
      if (start < 0 || end < start || !(ms !== null && ms !== void 0 && ms.setLiveSeekableRange) || ms.readyState !== "open")
        return;
      ms.setLiveSeekableRange(start, end);
    }
  }, {
    key: "getSourceBuffer",
    value: function getSourceBuffer(type) {
      return this._sourceBuffer[type];
    }
  }, {
    key: "buffered",
    value: function buffered(type) {
      return Buffer2.get(this._sourceBuffer[type]);
    }
  }, {
    key: "bufferStart",
    value: function bufferStart(type) {
      return Buffer2.start(this.buffered(type));
    }
  }, {
    key: "bufferEnd",
    value: function bufferEnd(type) {
      return Buffer2.end(this.buffered(type));
    }
  }, {
    key: "_enqueueOp",
    value: function _enqueueOp(type, exec, opName, context, isInsertHead) {
      var _this14 = this;
      if (!this.mediaSource)
        return Promise.resolve();
      var queue = this._queue[type] = this._queue[type] || [];
      var op = {
        exec,
        promise: createPublicPromise(),
        opName,
        context
      };
      if (isInsertHead) {
        queue.splice(0, 0, op);
        this._mseFullFlag[type] = false;
        this._startQueue(type);
      } else {
        queue.push(op);
      }
      if (this.isOpened || this.isEnded) {
        if (queue.length === 1) {
          this._startQueue(type);
        }
      } else {
        this._openPromise.then(function() {
          if (queue.length === 1) {
            _this14._startQueue(type);
          }
        });
      }
      return op.promise;
    }
  }, {
    key: "_enqueueBlockingOp",
    value: function() {
      var _enqueueBlockingOp2 = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee3(exec, opName, context) {
        var _this15 = this;
        var types, waiters;
        return _regeneratorRuntime2().wrap(function _callee3$(_context3) {
          while (1)
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.mediaSource) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return", Promise.resolve());
              case 2:
                types = Object.keys(this._sourceBuffer);
                if (types.length) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return", exec());
              case 5:
                waiters = [];
                types.forEach(function(t) {
                  var queue = _this15._queue[t];
                  var prom = createPublicPromise();
                  waiters.push(prom);
                  queue.push({
                    exec: function exec2() {
                      prom.resolve();
                    },
                    promise: prom,
                    opName,
                    context
                  });
                  if (queue.length === 1) {
                    _this15._startQueue(t);
                  }
                });
                return _context3.abrupt("return", Promise.all(waiters).then(function() {
                  try {
                    return exec();
                  } finally {
                    types.forEach(function(t) {
                      var queue = _this15._queue[t];
                      var sb = _this15._sourceBuffer[t];
                      queue === null || queue === void 0 ? void 0 : queue.shift();
                      if (!sb || !sb.updating) {
                        _this15._startQueue(t);
                      }
                    });
                  }
                }));
              case 8:
              case "end":
                return _context3.stop();
            }
        }, _callee3, this);
      }));
      function _enqueueBlockingOp(_x2, _x3, _x4) {
        return _enqueueBlockingOp2.apply(this, arguments);
      }
      return _enqueueBlockingOp;
    }()
  }, {
    key: "_startQueue",
    value: function _startQueue(type) {
      var queue = this._queue[type];
      if (queue) {
        var op = queue[0];
        if (op && !this._mseFullFlag[type]) {
          try {
            op.exec();
          } catch (error) {
            if (error && error.message && error.message.indexOf("SourceBuffer is full") >= 0) {
              var _op$promise;
              this._mseFullFlag[type] = true;
              if (op.context && _typeof(op.context) === "object") {
                op.context.isFull = true;
              }
              this._logger.error("[MSE error],  context,", op.context, " ,name,", op.opName, ",err,SourceBuffer is full");
              op === null || op === void 0 ? void 0 : (_op$promise = op.promise) === null || _op$promise === void 0 ? void 0 : _op$promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_FULL, error));
            } else {
              var _op$promise2;
              this._logger.error(error);
              op === null || op === void 0 ? void 0 : (_op$promise2 = op.promise) === null || _op$promise2 === void 0 ? void 0 : _op$promise2.reject(error.constructor === StreamingError ? error : new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_OTHER, error));
              queue.shift();
              this._startQueue(type);
            }
          }
        }
      }
    }
  }, {
    key: "setTimeoffset",
    value: function setTimeoffset(type, timestampOffset, context) {
      var _this16 = this;
      return this._enqueueOp(type, function() {
        if (timestampOffset < 0) {
          timestampOffset += 1e-3;
        }
        _this16._sourceBuffer[type].timestampOffset = timestampOffset;
        _this16._onSBUpdateEnd(type);
      }, "setTimeoffset", context);
    }
  }, {
    key: "abort",
    value: function abort(type, context) {
      var _this17 = this;
      if (!this.isOpened) {
        return Promise.resolve();
      }
      return this._enqueueOp(type, function() {
        _this17._sourceBuffer[type].abort();
        _this17._onSBUpdateEnd(type);
      }, "abort", context);
    }
  }], [{
    key: "isSupported",
    value: function isSupported() {
      var mime = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"';
      var MediaSource2 = getMediaSource();
      if (!MediaSource2)
        return false;
      try {
        return MediaSource2.isTypeSupported(mime);
      } catch (error) {
        this._logger.error(mime, error);
        return false;
      }
    }
  }, {
    key: "isMMSOnly",
    value: function isMMSOnly() {
      return typeof ManagedMediaSource !== "undefined" && typeof MediaSource === "undefined";
    }
  }, {
    key: "getDefaultConfig",
    value: function getDefaultConfig() {
      return {
        openLog: false,
        preferMMS: false
      };
    }
  }]);
  return MSE2;
}();
_defineProperty2(MSE, "VIDEO", "video");
_defineProperty2(MSE, "AUDIO", "audio");

// node_modules/xgplayer-streaming-shared/es/net/types.js
var LoaderType = {
  FETCH: "fetch",
  XHR: "xhr"
};
var ResponseType = {
  ARRAY_BUFFER: "arraybuffer",
  TEXT: "text",
  JSON: "json"
};

// node_modules/xgplayer-streaming-shared/es/net/error.js
var NetError = /* @__PURE__ */ function(_Error) {
  _inherits2(NetError2, _Error);
  var _super = _createSuper2(NetError2);
  function NetError2(url, request, response, msg) {
    var _this;
    _classCallCheck2(this, NetError2);
    _this = _super.call(this, msg);
    _defineProperty2(_assertThisInitialized2(_this), "retryCount", 0);
    _defineProperty2(_assertThisInitialized2(_this), "isTimeout", false);
    _defineProperty2(_assertThisInitialized2(_this), "loaderType", LoaderType.FETCH);
    _defineProperty2(_assertThisInitialized2(_this), "startTime", 0);
    _defineProperty2(_assertThisInitialized2(_this), "endTime", 0);
    _defineProperty2(_assertThisInitialized2(_this), "options", {});
    _this.url = url;
    _this.request = request;
    _this.response = response;
    return _this;
  }
  return _createClass2(NetError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));

// node_modules/xgplayer-streaming-shared/es/is.js
var toString = Object.prototype.toString;
function isObject(a) {
  return a !== null && _typeof(a) === "object";
}
function isPlainObject(val) {
  if (toString.call(val) !== "[object Object]") {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
function isDate(a) {
  return toString.call(a) === "[object Date]";
}

// node_modules/xgplayer-streaming-shared/es/net/helper.js
function getRangeValue(value) {
  if (!value || value[0] === null || value[0] === void 0 || value[0] === 0 && (value[1] === null || value[1] === void 0)) {
    return;
  }
  var ret = "bytes=" + value[0] + "-";
  if (value[1])
    ret += value[1];
  return ret;
}
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function setUrlParams(url, params) {
  if (!url)
    return;
  if (!params)
    return url;
  var v;
  var str = Object.keys(params).map(function(k) {
    v = params[k];
    if (v === null || v === void 0)
      return;
    if (Array.isArray(v)) {
      k = k + "[]";
    } else {
      v = [v];
    }
    return v.map(function(x) {
      if (isDate(x)) {
        x = x.toISOString();
      } else if (isObject(x)) {
        x = JSON.stringify(x);
      }
      return "".concat(encode(k), "=").concat(encode(x));
    }).join("&");
  }).filter(Boolean).join("&");
  if (str) {
    var hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + str;
  }
  return url;
}
function createResponse(data, done, response, contentLength, age, startTime, firstByteTime, index, range, vid, priOptions) {
  age = age !== null && age !== void 0 ? parseFloat(age) : null;
  contentLength = parseInt(contentLength || "0", 10);
  if (Number.isNaN(contentLength))
    contentLength = 0;
  var options = {
    range,
    vid,
    index,
    contentLength,
    age,
    startTime,
    firstByteTime,
    endTime: Date.now(),
    priOptions
  };
  return {
    data,
    done,
    options,
    response
  };
}
function calculateSpeed(byteLen, milliSecond) {
  return Math.round(byteLen * 8 * 1e3 / milliSecond / 1024);
}

// node_modules/xgplayer-streaming-shared/es/event.js
var EVENT = {
  ERROR: "error",
  TTFB: "core.ttfb",
  LOAD_START: "core.loadstart",
  LOAD_RESPONSE_HEADERS: "core.loadresponseheaders",
  LOAD_COMPLETE: "core.loadcomplete",
  LOAD_RETRY: "core.loadretry",
  SOURCEBUFFER_CREATED: "core.sourcebuffercreated",
  MEDIASOURCE_OPENED: "core.mediasourceopened",
  ANALYZE_DURATION_EXCEEDED: "core.analyzedurationexceeded",
  APPEND_BUFFER: "core.appendbuffer",
  REMOVE_BUFFER: "core.removebuffer",
  BUFFEREOS: "core.buffereos",
  KEYFRAME: "core.keyframe",
  CHASEFRAME: "core.chaseframe",
  METADATA_PARSED: "core.metadataparsed",
  SEI: "core.sei",
  SEI_IN_TIME: "core.seiintime",
  FLV_SCRIPT_DATA: "core.flvscriptdata",
  LOWDECODE: "core.lowdecode",
  SWITCH_URL_SUCCESS: "core.switchurlsuccess",
  SWITCH_URL_FAILED: "core.switchurlfailed",
  SPEED: "core.speed",
  HLS_MANIFEST_LOADED: "core.hlsmanifestloaded",
  HLS_LEVEL_LOADED: "core.hlslevelloaded",
  DEMUXED_TRACK: "core.demuxedtrack",
  STREAM_EXCEPTION: "core.streamexception",
  LARGE_AV_FIRST_FRAME_GAP_DETECT: "LARGE_AV_FIRST_FRAME_GAP_DETECT",
  LARGE_VIDEO_DTS_GAP_DETECT: "LARGE_VIDEO_DTS_GAP_DETECT",
  LARGE_AUDIO_DTS_GAP_DETECT: "LARGE_AUDIO_DTS_GAP_DETECT",
  AUDIO_GAP_DETECT: "AUDIO_GAP_DETECT",
  AUDIO_OVERLAP_DETECT: "AUDIO_OVERLAP_DETECT",
  MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT: "MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT",
  REAL_TIME_SPEED: "real_time_speed"
};

// node_modules/xgplayer-streaming-shared/es/net/fetch.js
var import_eventemitter3 = __toESM(require_eventemitter3());
var CACHESIZE = 2 * 1024 * 1024;
var FetchLoader = /* @__PURE__ */ function(_EventEmitter) {
  _inherits2(FetchLoader2, _EventEmitter);
  var _super = _createSuper2(FetchLoader2);
  function FetchLoader2() {
    var _this;
    _classCallCheck2(this, FetchLoader2);
    _this = _super.call(this);
    _defineProperty2(_assertThisInitialized2(_this), "_abortController", null);
    _defineProperty2(_assertThisInitialized2(_this), "_timeoutTimer", null);
    _defineProperty2(_assertThisInitialized2(_this), "_reader", null);
    _defineProperty2(_assertThisInitialized2(_this), "_response", null);
    _defineProperty2(_assertThisInitialized2(_this), "_aborted", false);
    _defineProperty2(_assertThisInitialized2(_this), "_index", -1);
    _defineProperty2(_assertThisInitialized2(_this), "_range", null);
    _defineProperty2(_assertThisInitialized2(_this), "_receivedLength", 0);
    _defineProperty2(_assertThisInitialized2(_this), "_running", false);
    _defineProperty2(_assertThisInitialized2(_this), "_logger", null);
    _defineProperty2(_assertThisInitialized2(_this), "_vid", "");
    _defineProperty2(_assertThisInitialized2(_this), "_onProcessMinLen", 0);
    _defineProperty2(_assertThisInitialized2(_this), "_onCancel", null);
    _defineProperty2(_assertThisInitialized2(_this), "_priOptions", null);
    return _this;
  }
  _createClass2(FetchLoader2, [{
    key: "load",
    value: function load(_ref) {
      var _this$_abortControlle, _this2 = this;
      var url = _ref.url, vid = _ref.vid, timeout = _ref.timeout, responseType = _ref.responseType, onProgress = _ref.onProgress, index = _ref.index, onTimeout = _ref.onTimeout, onCancel = _ref.onCancel, range = _ref.range, transformResponse = _ref.transformResponse, request = _ref.request, params = _ref.params, logger4 = _ref.logger, method = _ref.method, headers = _ref.headers, body = _ref.body, mode = _ref.mode, credentials = _ref.credentials, cache = _ref.cache, redirect = _ref.redirect, referrer = _ref.referrer, referrerPolicy = _ref.referrerPolicy, onProcessMinLen = _ref.onProcessMinLen, priOptions = _ref.priOptions;
      this._logger = logger4;
      this._aborted = false;
      this._onProcessMinLen = onProcessMinLen;
      this._onCancel = onCancel;
      this._abortController = typeof AbortController !== "undefined" && new AbortController();
      this._running = true;
      this._index = index;
      this._range = range || [0, 0];
      this._vid = vid || url;
      this._priOptions = priOptions || {};
      var init = {
        method,
        headers,
        body,
        mode,
        credentials,
        cache,
        redirect,
        referrer,
        referrerPolicy,
        signal: (_this$_abortControlle = this._abortController) === null || _this$_abortControlle === void 0 ? void 0 : _this$_abortControlle.signal
      };
      var isTimeout = false;
      clearTimeout(this._timeoutTimer);
      url = setUrlParams(url, params);
      var rangeValue = getRangeValue(range);
      if (rangeValue) {
        if (request) {
          headers = request.headers;
        } else {
          headers = init.headers = init.headers || (Headers ? new Headers() : {});
        }
        if (Headers && headers instanceof Headers) {
          headers.append("Range", rangeValue);
        } else {
          headers.Range = rangeValue;
        }
      }
      if (timeout) {
        this._timeoutTimer = setTimeout(function() {
          isTimeout = true;
          _this2.cancel();
          if (onTimeout) {
            var error = new NetError(url, init, null, "timeout");
            error.isTimeout = true;
            onTimeout(error, {
              index: _this2._index,
              range: _this2._range,
              vid: _this2._vid,
              priOptions: _this2._priOptions
            });
          }
        }, timeout);
      }
      var startTime = Date.now();
      this._logger.debug("[fetch load start], index,", index, ",range,", range);
      return new Promise(function(resolve, reject) {
        fetch(request || url, request ? void 0 : init).then(/* @__PURE__ */ function() {
          var _ref2 = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee(response) {
            var firstByteTime, data, costTime, speed;
            return _regeneratorRuntime2().wrap(function _callee$(_context) {
              while (1)
                switch (_context.prev = _context.next) {
                  case 0:
                    clearTimeout(_this2._timeoutTimer);
                    _this2._response = response;
                    if (!(_this2._aborted || !_this2._running)) {
                      _context.next = 4;
                      break;
                    }
                    return _context.abrupt("return");
                  case 4:
                    if (transformResponse) {
                      response = transformResponse(response, url) || response;
                    }
                    if (response.ok) {
                      _context.next = 7;
                      break;
                    }
                    throw new NetError(url, init, response, "bad network response");
                  case 7:
                    firstByteTime = Date.now();
                    if (!(responseType === ResponseType.TEXT)) {
                      _context.next = 15;
                      break;
                    }
                    _context.next = 11;
                    return response.text();
                  case 11:
                    data = _context.sent;
                    _this2._running = false;
                    _context.next = 37;
                    break;
                  case 15:
                    if (!(responseType === ResponseType.JSON)) {
                      _context.next = 22;
                      break;
                    }
                    _context.next = 18;
                    return response.json();
                  case 18:
                    data = _context.sent;
                    _this2._running = false;
                    _context.next = 37;
                    break;
                  case 22:
                    if (!onProgress) {
                      _context.next = 29;
                      break;
                    }
                    _this2.resolve = resolve;
                    _this2.reject = reject;
                    _this2._loadChunk(response, onProgress, startTime, firstByteTime);
                    return _context.abrupt("return");
                  case 29:
                    _context.next = 31;
                    return response.arrayBuffer();
                  case 31:
                    data = _context.sent;
                    data = new Uint8Array(data);
                    _this2._running = false;
                    costTime = Date.now() - startTime;
                    speed = calculateSpeed(data.byteLength, costTime);
                    _this2.emit(EVENT.REAL_TIME_SPEED, {
                      speed,
                      len: data.byteLength,
                      time: costTime,
                      vid: _this2._vid,
                      index: _this2._index,
                      range: _this2._range,
                      priOptions: _this2._priOptions
                    });
                  case 37:
                    _this2._logger.debug("[fetch load end], index,", index, ",range,", range);
                    resolve(createResponse(data, true, response, response.headers.get("Content-Length"), response.headers.get("age"), startTime, firstByteTime, index, range, _this2._vid, _this2._priOptions));
                  case 39:
                  case "end":
                    return _context.stop();
                }
            }, _callee);
          }));
          return function(_x) {
            return _ref2.apply(this, arguments);
          };
        }()).catch(function(error) {
          var _error;
          clearTimeout(_this2._timeoutTimer);
          _this2._running = false;
          if (_this2._aborted && !isTimeout)
            return;
          error = error instanceof NetError ? error : new NetError(url, init, null, (_error = error) === null || _error === void 0 ? void 0 : _error.message);
          error.startTime = startTime;
          error.endTime = Date.now();
          error.isTimeout = isTimeout;
          error.options = {
            index: _this2._index,
            range: _this2._range,
            vid: _this2._vid,
            priOptions: _this2._priOptions
          };
          reject(error);
        });
      });
    }
  }, {
    key: "cancel",
    value: function() {
      var _cancel = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee2() {
        return _regeneratorRuntime2().wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._aborted) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                this._aborted = true;
                this._running = false;
                if (!this._response) {
                  _context2.next = 14;
                  break;
                }
                _context2.prev = 5;
                if (!this._reader) {
                  _context2.next = 9;
                  break;
                }
                _context2.next = 9;
                return this._reader.cancel();
              case 9:
                _context2.next = 13;
                break;
              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](5);
              case 13:
                this._response = this._reader = null;
              case 14:
                if (this._abortController) {
                  try {
                    this._abortController.abort();
                  } catch (error) {
                  }
                  this._abortController = null;
                }
                if (this._onCancel) {
                  this._onCancel({
                    index: this._index,
                    range: this._range,
                    vid: this._vid,
                    priOptions: this._priOptions
                  });
                }
              case 16:
              case "end":
                return _context2.stop();
            }
        }, _callee2, this, [[5, 11]]);
      }));
      function cancel() {
        return _cancel.apply(this, arguments);
      }
      return cancel;
    }()
  }, {
    key: "_loadChunk",
    value: function _loadChunk(response, onProgress, st, firstByteTime) {
      var _this3 = this;
      if (!response.body || !response.body.getReader) {
        this._running = false;
        var err = new NetError(response.url, "", response, "onProgress of bad response.body.getReader");
        err.options = {
          index: this._index,
          range: this._range,
          vid: this._vid,
          priOptions: this._priOptions
        };
        this.reject(err);
        return;
      }
      if (this._onProcessMinLen > 0) {
        this._cache = new Uint8Array(CACHESIZE);
        this._writeIdx = 0;
      }
      var reader = this._reader = response.body.getReader();
      var data;
      var startTime;
      var endTime;
      var pump = /* @__PURE__ */ function() {
        var _ref3 = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee3() {
          var _this3$_range;
          var startRange, startByte, curLen, retData, temp, costTime, speed;
          return _regeneratorRuntime2().wrap(function _callee3$(_context3) {
            while (1)
              switch (_context3.prev = _context3.next) {
                case 0:
                  startTime = Date.now();
                  _context3.prev = 1;
                  _context3.next = 4;
                  return reader.read();
                case 4:
                  data = _context3.sent;
                  endTime = Date.now();
                  _context3.next = 13;
                  break;
                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](1);
                  endTime = Date.now();
                  if (!_this3._aborted) {
                    _this3._running = false;
                    _context3.t0.options = {
                      index: _this3._index,
                      range: _this3._range,
                      vid: _this3._vid,
                      priOptions: _this3._priOptions
                    };
                    _this3.reject(_context3.t0);
                  }
                  return _context3.abrupt("return");
                case 13:
                  startRange = ((_this3$_range = _this3._range) === null || _this3$_range === void 0 ? void 0 : _this3$_range.length) > 0 ? _this3._range[0] : 0;
                  startByte = startRange + _this3._receivedLength;
                  if (!_this3._aborted) {
                    _context3.next = 19;
                    break;
                  }
                  _this3._running = false;
                  onProgress(void 0, false, {
                    range: [startByte, startByte],
                    vid: _this3._vid,
                    index: _this3._index,
                    startTime,
                    endTime,
                    st,
                    firstByteTime,
                    priOptions: _this3._priOptions
                  }, response);
                  return _context3.abrupt("return");
                case 19:
                  curLen = data.value ? data.value.byteLength : 0;
                  _this3._receivedLength += curLen;
                  _this3._logger.debug("\u3010fetchLoader,onProgress call\u3011,task,", _this3._range, ", start,", startByte, ", end,", startRange + _this3._receivedLength, ", done,", data.done);
                  if (_this3._onProcessMinLen > 0) {
                    if (_this3._writeIdx + curLen >= _this3._onProcessMinLen || data.done) {
                      retData = new Uint8Array(_this3._writeIdx + curLen);
                      retData.set(_this3._cache.slice(0, _this3._writeIdx), 0);
                      curLen > 0 && retData.set(data.value, _this3._writeIdx);
                      _this3._writeIdx = 0;
                      _this3._logger.debug("\u3010fetchLoader,onProgress enough\u3011,done,", data.done, ",len,", retData.byteLength, ", writeIdx,", _this3._writeIdx);
                    } else {
                      if (curLen > 0 && _this3._writeIdx + curLen < CACHESIZE) {
                        _this3._cache.set(data.value, _this3._writeIdx);
                        _this3._writeIdx += curLen;
                        _this3._logger.debug("\u3010fetchLoader,onProgress cache\u3011,len,", curLen, ", writeIdx,", _this3._writeIdx);
                      } else if (curLen > 0) {
                        temp = new Uint8Array(_this3._writeIdx + curLen + 2048);
                        _this3._logger.debug("\u3010fetchLoader,onProgress extra start\u3011,size,", _this3._writeIdx + curLen + 2048, ", datalen,", curLen, ", writeIdx,", _this3._writeIdx);
                        temp.set(_this3._cache.slice(0, _this3._writeIdx), 0);
                        curLen > 0 && temp.set(data.value, _this3._writeIdx);
                        _this3._writeIdx += curLen;
                        delete _this3._cache;
                        _this3._cache = temp;
                        _this3._logger.debug("\u3010fetchLoader,onProgress extra end\u3011,len,", curLen, ", writeIdx,", _this3._writeIdx);
                      }
                    }
                  } else {
                    retData = data.value;
                  }
                  if (retData && retData.byteLength > 0 || data.done) {
                    onProgress(retData, data.done, {
                      range: [_this3._range[0] + _this3._receivedLength - (retData ? retData.byteLength : 0), _this3._range[0] + _this3._receivedLength],
                      vid: _this3._vid,
                      index: _this3._index,
                      startTime,
                      endTime,
                      st,
                      firstByteTime,
                      priOptions: _this3._priOptions
                    }, response);
                  }
                  if (!data.done) {
                    pump();
                  } else {
                    costTime = Date.now() - st;
                    speed = calculateSpeed(_this3._receivedLength, costTime);
                    _this3.emit(EVENT.REAL_TIME_SPEED, {
                      speed,
                      len: _this3._receivedLength,
                      time: costTime,
                      vid: _this3._vid,
                      index: _this3._index,
                      range: _this3._range,
                      priOptions: _this3._priOptions
                    });
                    _this3._running = false;
                    _this3._logger.debug("[fetchLoader onProgress end],task,", _this3._range, ",done,", data.done);
                    _this3.resolve(createResponse(data, true, response, response.headers.get("Content-Length"), response.headers.get("age"), st, firstByteTime, _this3._index, _this3._range, _this3._vid, _this3._priOptions));
                  }
                case 25:
                case "end":
                  return _context3.stop();
              }
          }, _callee3, null, [[1, 8]]);
        }));
        return function pump2() {
          return _ref3.apply(this, arguments);
        };
      }();
      pump();
    }
  }, {
    key: "receiveLen",
    get: function get() {
      return this._receivedLength;
    }
  }, {
    key: "running",
    get: function get() {
      return this._running;
    },
    set: function set(status) {
      this._running = status;
    }
  }], [{
    key: "isSupported",
    value: function isSupported() {
      return !!(typeof fetch !== "undefined");
    }
  }]);
  return FetchLoader2;
}(import_eventemitter3.default);

// node_modules/xgplayer-streaming-shared/es/net/config.js
function getConfig(cfg) {
  return _objectSpread22({
    loaderType: LoaderType.FETCH,
    retry: 0,
    retryDelay: 0,
    timeout: 0,
    request: null,
    onTimeout: void 0,
    onProgress: void 0,
    onRetryError: void 0,
    transformRequest: void 0,
    transformResponse: void 0,
    transformError: void 0,
    responseType: ResponseType.TEXT,
    range: void 0,
    url: "",
    params: void 0,
    method: "GET",
    headers: {},
    body: void 0,
    mode: void 0,
    credentials: void 0,
    cache: void 0,
    redirect: void 0,
    referrer: void 0,
    referrerPolicy: void 0,
    integrity: void 0,
    onProcessMinLen: 0
  }, cfg);
}

// node_modules/xgplayer-streaming-shared/es/net/xhr.js
var import_eventemitter32 = __toESM(require_eventemitter3());
var XhrLoader = /* @__PURE__ */ function(_EventEmitter) {
  _inherits2(XhrLoader2, _EventEmitter);
  var _super = _createSuper2(XhrLoader2);
  function XhrLoader2() {
    var _this;
    _classCallCheck2(this, XhrLoader2);
    _this = _super.call(this);
    _defineProperty2(_assertThisInitialized2(_this), "_xhr", null);
    _defineProperty2(_assertThisInitialized2(_this), "_aborted", false);
    _defineProperty2(_assertThisInitialized2(_this), "_timeoutTimer", null);
    _defineProperty2(_assertThisInitialized2(_this), "_range", null);
    _defineProperty2(_assertThisInitialized2(_this), "_receivedLength", 0);
    _defineProperty2(_assertThisInitialized2(_this), "_url", null);
    _defineProperty2(_assertThisInitialized2(_this), "_onProgress", null);
    _defineProperty2(_assertThisInitialized2(_this), "_index", -1);
    _defineProperty2(_assertThisInitialized2(_this), "_headers", null);
    _defineProperty2(_assertThisInitialized2(_this), "_currentChunkSizeKB", 384);
    _defineProperty2(_assertThisInitialized2(_this), "_timeout", null);
    _defineProperty2(_assertThisInitialized2(_this), "_xhr", null);
    _defineProperty2(_assertThisInitialized2(_this), "_withCredentials", null);
    _defineProperty2(_assertThisInitialized2(_this), "_startTime", -1);
    _defineProperty2(_assertThisInitialized2(_this), "_loadCompleteResolve", null);
    _defineProperty2(_assertThisInitialized2(_this), "_loadCompleteReject", null);
    _defineProperty2(_assertThisInitialized2(_this), "_runing", false);
    _defineProperty2(_assertThisInitialized2(_this), "_logger", false);
    _defineProperty2(_assertThisInitialized2(_this), "_vid", "");
    _defineProperty2(_assertThisInitialized2(_this), "_responseType", void 0);
    _defineProperty2(_assertThisInitialized2(_this), "_credentials", void 0);
    _defineProperty2(_assertThisInitialized2(_this), "_method", void 0);
    _defineProperty2(_assertThisInitialized2(_this), "_transformResponse", void 0);
    _defineProperty2(_assertThisInitialized2(_this), "_firstRtt", void 0);
    _defineProperty2(_assertThisInitialized2(_this), "_onCancel", null);
    _defineProperty2(_assertThisInitialized2(_this), "_priOptions", null);
    return _this;
  }
  _createClass2(XhrLoader2, [{
    key: "load",
    value: function load(req) {
      var _this2 = this;
      clearTimeout(this._timeoutTimer);
      this._logger = req.logger;
      this._range = req.range;
      this._onProgress = req.onProgress;
      this._index = req.index;
      this._headers = req.headers;
      this._withCredentials = req.credentials === "include" || req.credentials === "same-origin";
      this._body = req.body || null;
      req.method && (this._method = req.method);
      this._timeout = req.timeout || null;
      this._runing = true;
      this._vid = req.vid || req.url;
      this._responseType = req.responseType;
      this._firstRtt = -1;
      this._onTimeout = req.onTimeout;
      this._onCancel = req.onCancel;
      this._request = req.request;
      this._priOptions = req.priOptions || {};
      this._logger.debug("\u3010xhrLoader task\u3011, range", this._range);
      this._url = setUrlParams(req.url, req.params);
      var startTime = Date.now();
      return new Promise(function(resolve, reject) {
        _this2._loadCompleteResolve = resolve;
        _this2._loadCompleteReject = reject;
        _this2._startLoad();
      }).catch(function(error) {
        clearTimeout(_this2._timeoutTimer);
        _this2._runing = false;
        if (_this2._aborted)
          return;
        error = error instanceof NetError ? error : new NetError(_this2._url, _this2._request);
        error.startTime = startTime;
        error.endTime = Date.now();
        error.options = {
          index: _this2._index,
          vid: _this2._vid,
          priOptions: _this2._priOptions
        };
        throw error;
      });
    }
  }, {
    key: "_startLoad",
    value: function _startLoad() {
      var range = null;
      if (this._responseType === ResponseType.ARRAY_BUFFER && this._range && this._range.length > 1) {
        if (this._onProgress) {
          this._firstRtt = -1;
          var chunkSize = this._currentChunkSizeKB * 1024;
          var from = this._range[0] + this._receivedLength;
          var to = this._range[1];
          if (chunkSize < this._range[1] - from) {
            to = from + chunkSize;
          }
          range = [from, to];
          this._logger.debug("[xhr_loader->],tast :", this._range, ", SubRange, ", range);
        } else {
          range = this._range;
          this._logger.debug("[xhr_loader->],tast :", this._range, ", allRange, ", range);
        }
      }
      this._internalOpen(range);
    }
  }, {
    key: "_internalOpen",
    value: function _internalOpen(range) {
      var _this3 = this;
      try {
        this._startTime = Date.now();
        var xhr = this._xhr = new XMLHttpRequest();
        xhr.open(this._method || "GET", this._url, true);
        xhr.responseType = this._responseType;
        this._timeout && (xhr.timeout = this._timeout);
        xhr.withCredentials = this._withCredentials;
        xhr.onload = this._onLoad.bind(this);
        xhr.onreadystatechange = this._onReadyStatechange.bind(this);
        xhr.onerror = function(errorEvent) {
          var _errorEvent$currentTa, _errorEvent$currentTa2, _errorEvent$currentTa3;
          _this3._running = false;
          var error = new NetError(_this3._url, _this3._request, errorEvent === null || errorEvent === void 0 ? void 0 : (_errorEvent$currentTa = errorEvent.currentTarget) === null || _errorEvent$currentTa === void 0 ? void 0 : _errorEvent$currentTa.response, "xhr.onerror.status:" + (errorEvent === null || errorEvent === void 0 ? void 0 : (_errorEvent$currentTa2 = errorEvent.currentTarget) === null || _errorEvent$currentTa2 === void 0 ? void 0 : _errorEvent$currentTa2.status) + ",statusText," + (errorEvent === null || errorEvent === void 0 ? void 0 : (_errorEvent$currentTa3 = errorEvent.currentTarget) === null || _errorEvent$currentTa3 === void 0 ? void 0 : _errorEvent$currentTa3.statusText));
          error.options = {
            index: _this3._index,
            range: _this3._range,
            vid: _this3._vid,
            priOptions: _this3._priOptions
          };
          _this3._loadCompleteReject(error);
        };
        xhr.ontimeout = function(event) {
          _this3.cancel();
          var error = new NetError(_this3._url, _this3._request, {
            status: 408
          }, "timeout");
          if (_this3._onTimeout) {
            error.isTimeout = true;
            _this3._onTimeout(error, {
              index: _this3._index,
              range: _this3._range,
              vid: _this3._vid,
              priOptions: _this3._priOptions
            });
          }
          error.options = {
            index: _this3._index,
            range: _this3._range,
            vid: _this3._vid,
            priOptions: _this3._priOptions
          };
          _this3._loadCompleteReject(error);
        };
        var headers = this._headers || {};
        var rangeValue = getRangeValue(range);
        if (rangeValue) {
          headers.Range = rangeValue;
        }
        if (headers) {
          Object.keys(headers).forEach(function(k) {
            xhr.setRequestHeader(k, headers[k]);
          });
        }
        this._logger.debug("[xhr.send->] tast,", this._range, ",load sub range, ", range);
        xhr.send(this._body);
      } catch (e) {
        e.options = {
          index: this._index,
          range,
          vid: this._vid,
          priOptions: this._priOptions
        };
        this._loadCompleteReject(e);
      }
    }
  }, {
    key: "_onReadyStatechange",
    value: function _onReadyStatechange(e) {
      var xhr = e.target;
      if (xhr.readyState === 2) {
        this._firstRtt < 0 && (this._firstRtt = Date.now());
      }
    }
  }, {
    key: "_onLoad",
    value: function _onLoad(e) {
      var _this$_range;
      var status = e.target.status;
      if (status < 200 || status > 299) {
        var error = new NetError(this._url, null, _objectSpread22(_objectSpread22({}, e.target.response), {}, {
          status
        }), "bad response,status:" + status);
        error.options = {
          index: this._index,
          range: this._range,
          vid: this._vid,
          priOptions: this._priOptions
        };
        return this._loadCompleteReject(error);
      }
      var data = null;
      var done = false;
      var byteStart;
      var startRange = ((_this$_range = this._range) === null || _this$_range === void 0 ? void 0 : _this$_range.length) > 0 ? this._range[0] : 0;
      if (this._responseType === ResponseType.ARRAY_BUFFER) {
        var _this$_range2;
        var chunk = new Uint8Array(e.target.response);
        byteStart = startRange + this._receivedLength;
        if (chunk && chunk.byteLength > 0) {
          this._receivedLength += chunk.byteLength;
          var costTime = Date.now() - this._startTime;
          var speed = calculateSpeed(this._receivedLength, costTime);
          this.emit(EVENT.REAL_TIME_SPEED, {
            speed,
            len: this._receivedLength,
            time: costTime,
            vid: this._vid,
            index: this._index,
            range: [byteStart, startRange + this._receivedLength],
            priOptions: this._priOptions
          });
        }
        data = chunk;
        if (((_this$_range2 = this._range) === null || _this$_range2 === void 0 ? void 0 : _this$_range2.length) > 1 && this._range[1] && this._receivedLength < this._range[1] - this._range[0]) {
          done = false;
        } else {
          done = true;
        }
        this._logger.debug("[xhr load done->], tast :", this._range, ", start", byteStart, "end ", startRange + this._receivedLength, ",dataLen,", chunk ? chunk.byteLength : 0, ",receivedLength", this._receivedLength, ",index,", this._index, ", done,", done);
      } else {
        done = true;
        data = e.target.response;
      }
      var response = {
        ok: status >= 200 && status < 300,
        status,
        statusText: this._xhr.statusText,
        url: this._xhr.responseURL,
        headers: this._getHeaders(this._xhr),
        body: this._xhr.response
      };
      if (this._transformResponse) {
        response = this._transformResponse(response, this._url) || response;
      }
      if (this._onProgress) {
        this._onProgress(data, done, {
          index: this._index,
          vid: this._vid,
          range: [byteStart, startRange + this._receivedLength],
          startTime: this._startTime,
          endTime: Date.now(),
          priOptions: this._priOptions
        }, response);
      }
      if (!done) {
        this._startLoad();
      } else {
        this._runing = false;
        this._loadCompleteResolve && this._loadCompleteResolve(createResponse(this._onProgress ? null : data, done, response, response.headers["content-length"], response.headers.age, this._startTime, this._firstRtt, this._index, this._range, this._vid, this._priOptions));
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this._aborted)
        return;
      this._aborted = true;
      this._runing = false;
      _get(_getPrototypeOf2(XhrLoader2.prototype), "removeAllListeners", this).call(this);
      if (this._onCancel) {
        this._onCancel({
          index: this._index,
          range: this._range,
          vid: this._vid,
          priOptions: this._priOptions
        });
      }
      if (this._xhr) {
        return this._xhr.abort();
      }
    }
  }, {
    key: "receiveLen",
    get: function get() {
      return this._receivedLength;
    }
  }, {
    key: "running",
    get: function get() {
      return this._running;
    },
    set: function set(status) {
      this._running = status;
    }
  }, {
    key: "_getHeaders",
    value: function _getHeaders(xhr) {
      var headerLines = xhr.getAllResponseHeaders().trim().split("\r\n");
      var headers = {};
      var _iterator = _createForOfIteratorHelper(headerLines), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var header = _step.value;
          var parts = header.split(": ");
          headers[parts[0].toLowerCase()] = parts.slice(1).join(": ");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return headers;
    }
  }], [{
    key: "isSupported",
    value: function isSupported() {
      return typeof XMLHttpRequest !== "undefined";
    }
  }]);
  return XhrLoader2;
}(import_eventemitter32.default);

// node_modules/xgplayer-streaming-shared/es/net/task.js
var _excluded = ["retry", "retryDelay", "onRetryError", "transformError"];
var Task = /* @__PURE__ */ function() {
  function Task2(type, config) {
    _classCallCheck2(this, Task2);
    this.promise = createPublicPromise();
    this.alive = !!config.onProgress;
    !config.logger && (config.logger = new Logger("Loader"));
    this._loaderType = type;
    this._loader = type === LoaderType.FETCH && typeof fetch !== "undefined" ? new FetchLoader() : new XhrLoader();
    this._config = config;
    this._retryCount = 0;
    this._retryTimer = null;
    this._canceled = false;
    this._retryCheckFunc = config.retryCheckFunc;
    this._logger = config.logger;
  }
  _createClass2(Task2, [{
    key: "exec",
    value: function exec() {
      var _this = this;
      var _this$_config = this._config, retry = _this$_config.retry, retryDelay = _this$_config.retryDelay, onRetryError = _this$_config.onRetryError, transformError = _this$_config.transformError, rest = _objectWithoutProperties(_this$_config, _excluded);
      var request = /* @__PURE__ */ function() {
        var _ref = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee() {
          var response, error, isRetry;
          return _regeneratorRuntime2().wrap(function _callee$(_context) {
            while (1)
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this._loader.load(rest);
                case 3:
                  response = _context.sent;
                  _this.promise.resolve(response);
                  _context.next = 27;
                  break;
                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](0);
                  _this._loader.running = false;
                  _this._logger.debug("[task request catch err]", _context.t0);
                  if (!_this._canceled) {
                    _context.next = 13;
                    break;
                  }
                  return _context.abrupt("return");
                case 13:
                  _context.t0.loaderType = _this._loaderType;
                  _context.t0.retryCount = _this._retryCount;
                  error = _context.t0;
                  if (transformError) {
                    error = transformError(error) || error;
                  }
                  if (onRetryError && _this._retryCount > 0)
                    onRetryError(error, _this._retryCount, {
                      index: rest.index,
                      vid: rest.vid,
                      range: rest.range,
                      priOptions: rest.priOptions
                    });
                  _this._retryCount++;
                  isRetry = true;
                  if (_this._retryCheckFunc) {
                    isRetry = _this._retryCheckFunc(_context.t0);
                  }
                  if (!(isRetry && _this._retryCount <= retry)) {
                    _context.next = 26;
                    break;
                  }
                  clearTimeout(_this._retryTimer);
                  _this._logger.debug("[task request setTimeout],retry", _this._retryCount, ",retry range,", rest.range);
                  _this._retryTimer = setTimeout(request, retryDelay);
                  return _context.abrupt("return");
                case 26:
                  _this.promise.reject(error);
                case 27:
                case "end":
                  return _context.stop();
              }
          }, _callee, null, [[0, 7]]);
        }));
        return function request2() {
          return _ref.apply(this, arguments);
        };
      }();
      request();
      return this.promise;
    }
  }, {
    key: "cancel",
    value: function() {
      var _cancel = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee2() {
        return _regeneratorRuntime2().wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                clearTimeout(this._retryTimer);
                this._canceled = true;
                this._loader.running = false;
                return _context2.abrupt("return", this._loader.cancel());
              case 4:
              case "end":
                return _context2.stop();
            }
        }, _callee2, this);
      }));
      function cancel() {
        return _cancel.apply(this, arguments);
      }
      return cancel;
    }()
  }, {
    key: "running",
    get: function get() {
      return this._loader && this._loader.running;
    }
  }, {
    key: "loader",
    get: function get() {
      return this._loader;
    }
  }]);
  return Task2;
}();

// node_modules/xgplayer-streaming-shared/es/streaming-helper.js
function isMediaPlaying(media) {
  return media && !media.paused && !media.ended && media.playbackRate !== 0 && media.readyState !== 0;
}
function getVideoPlaybackQuality(video) {
  if (!video)
    return {};
  if (typeof video.getVideoPlaybackQuality === "function") {
    var info = video.getVideoPlaybackQuality();
    return {
      droppedVideoFrames: info.droppedVideoFrames || info.corruptedVideoFrames,
      totalVideoFrames: info.totalVideoFrames,
      creationTime: info.creationTime
    };
  }
  return {
    droppedVideoFrames: video.webkitDroppedFrameCount,
    totalVideoFrames: video.webkitDecodedFrameCount,
    creationTime: performance.now()
  };
}
function concatUint8Array() {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }
  arr = arr.filter(Boolean);
  if (arr.length < 2)
    return arr[0];
  var data = new Uint8Array(arr.reduce(function(p, c) {
    return p + c.byteLength;
  }, 0));
  var prevLen = 0;
  arr.forEach(function(d) {
    data.set(d, prevLen);
    prevLen += d.byteLength;
  });
  return data;
}
function sleep() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  return new Promise(function(resolve) {
    return setTimeout(resolve, t);
  });
}

// node_modules/xgplayer-streaming-shared/es/net/index.js
var import_eventemitter33 = __toESM(require_eventemitter3());
var NetLoader = /* @__PURE__ */ function(_EventEmitter) {
  _inherits2(NetLoader2, _EventEmitter);
  var _super = _createSuper2(NetLoader2);
  function NetLoader2(cfg) {
    var _this;
    _classCallCheck2(this, NetLoader2);
    _this = _super.call(this, cfg);
    _defineProperty2(_assertThisInitialized2(_this), "type", LoaderType.FETCH);
    _defineProperty2(_assertThisInitialized2(_this), "_queue", []);
    _defineProperty2(_assertThisInitialized2(_this), "_alive", []);
    _defineProperty2(_assertThisInitialized2(_this), "_currentTask", null);
    _defineProperty2(_assertThisInitialized2(_this), "_finnalUrl", "");
    _defineProperty2(_assertThisInitialized2(_this), "_config", void 0);
    _this._config = getConfig(cfg);
    if (_this._config.loaderType === LoaderType.XHR || !FetchLoader.isSupported()) {
      _this.type = LoaderType.XHR;
    }
    _this.log = cfg.logger;
    return _this;
  }
  _createClass2(NetLoader2, [{
    key: "isFetch",
    value: function isFetch() {
      return this.type === LoaderType.FETCH;
    }
  }, {
    key: "load",
    value: function load(url) {
      var _this2 = this;
      var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (typeof url === "string" || !url) {
        config.url = url || config.url || this._config.url;
      } else {
        config = url;
      }
      config = Object.assign({}, this._config, config);
      if (config.params)
        config.params = Object.assign({}, config.params);
      if (config.headers && isPlainObject(config.headers))
        config.headers = Object.assign({}, config.headers);
      if (config.body && isPlainObject(config.body))
        config.body = Object.assign({}, config.body);
      if (config.transformRequest) {
        config = config.transformRequest(config) || config;
      }
      config.logger = this.log;
      var task = new Task(this.type, config);
      task.loader.on(EVENT.REAL_TIME_SPEED, function(data) {
        _this2.emit(EVENT.REAL_TIME_SPEED, data);
      });
      this._queue.push(task);
      if (this._queue.length === 1 && (!this._currentTask || !this._currentTask.running)) {
        this._processTask();
      }
      return task.promise;
    }
  }, {
    key: "cancel",
    value: function() {
      var _cancel = _asyncToGenerator2(/* @__PURE__ */ _regeneratorRuntime2().mark(function _callee() {
        var cancels;
        return _regeneratorRuntime2().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                cancels = this._queue.map(function(t) {
                  return t.cancel();
                }).concat(this._alive.map(function(t) {
                  return t.cancel();
                }));
                if (this._currentTask) {
                  cancels.push(this._currentTask.cancel());
                }
                this._queue = [];
                this._alive = [];
                _context.next = 6;
                return Promise.all(cancels);
              case 6:
                _context.next = 8;
                return sleep();
              case 8:
              case "end":
                return _context.stop();
            }
        }, _callee, this);
      }));
      function cancel() {
        return _cancel.apply(this, arguments);
      }
      return cancel;
    }()
  }, {
    key: "_processTask",
    value: function _processTask() {
      var _this3 = this;
      this._currentTask = this._queue.shift();
      if (!this._currentTask)
        return;
      if (this._currentTask.alive) {
        this._alive.push(this._currentTask);
      }
      var req = this._currentTask.exec().catch(function(e) {
      });
      if (!(req && typeof req.finally === "function"))
        return;
      req.finally(function() {
        var _this3$_currentTask, _this3$_alive;
        if ((_this3$_currentTask = _this3._currentTask) !== null && _this3$_currentTask !== void 0 && _this3$_currentTask.alive && ((_this3$_alive = _this3._alive) === null || _this3$_alive === void 0 ? void 0 : _this3$_alive.length) > 0) {
          _this3._alive = _this3._alive.filter(function(task) {
            return task && task !== _this3._currentTask;
          });
        }
        _this3._processTask();
      });
    }
  }], [{
    key: "isFetchSupport",
    value: function isFetchSupport() {
      return FetchLoader.isSupported();
    }
  }]);
  return NetLoader2;
}(import_eventemitter33.default);

// node_modules/xgplayer-streaming-shared/es/services/gap.js
var GapService = /* @__PURE__ */ function() {
  function GapService2() {
    _classCallCheck2(this, GapService2);
    _defineProperty2(this, "_prevCurrentTime", 0);
  }
  _createClass2(GapService2, [{
    key: "do",
    value: function _do(media) {
      var maxJumpDistance = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
      var isLive = arguments.length > 2 ? arguments[2] : void 0;
      var seekThreshold = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
      if (!media)
        return;
      var currentTime = media.currentTime;
      var jumpTo = 0;
      if (this._prevCurrentTime === currentTime) {
        var info = Buffer2.info(Buffer2.get(media), currentTime);
        if (!info.buffers.length)
          return;
        if (isLive && info.nextStart || info.nextStart && info.nextStart - currentTime < maxJumpDistance) {
          jumpTo = info.nextStart + 0.1;
        } else if (info.end && info.end - currentTime > seekThreshold && !media.seeking) {
          jumpTo = currentTime + 0.1;
        }
      }
      this._prevCurrentTime = currentTime;
      if (jumpTo && currentTime !== jumpTo) {
        media.currentTime = jumpTo;
      }
    }
  }]);
  return GapService2;
}();

// node_modules/xgplayer-streaming-shared/es/services/sei.js
var SeiService = /* @__PURE__ */ function() {
  function SeiService2(emitter) {
    var _this = this;
    _classCallCheck2(this, SeiService2);
    _defineProperty2(this, "_seiSet", /* @__PURE__ */ new Set());
    this.emitter = emitter;
    emitter.on(EVENT.SEI, function(sei) {
      if (sei)
        _this._seiSet.add(sei);
    });
  }
  _createClass2(SeiService2, [{
    key: "throw",
    value: function _throw(currentTime, isLive) {
      var _this2 = this;
      if (currentTime === null || currentTime === void 0 || !this._seiSet.size)
        return;
      var min = currentTime - 0.2;
      var max = currentTime + 0.2;
      var toThrow = [];
      this._seiSet.forEach(function(sei) {
        if (sei.time >= min && sei.time <= max) {
          toThrow.push(sei);
        }
      });
      toThrow.forEach(function(sei) {
        _this2._seiSet.delete(sei);
        _this2.emitter.emit(EVENT.SEI_IN_TIME, sei);
      });
      if (!isLive)
        return;
      this._seiSet.forEach(function(s) {
        if (s.time < currentTime - 5) {
          _this2._seiSet.delete(s);
        }
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this._seiSet.clear();
    }
  }]);
  return SeiService2;
}();

// node_modules/xgplayer-streaming-shared/es/services/bandwidth.js
var SKIP_SMALL_CHUNK = 1e3;
var MAX_CHUNK_SAVE_SIZE = 50;
var MAX_SEGMENT_SAVE_SIZE = 3;
var LONGTIME_NO_RECEIVE = 3e3;
var BandwidthService = /* @__PURE__ */ function() {
  function BandwidthService2(opts) {
    _classCallCheck2(this, BandwidthService2);
    _defineProperty2(this, "_chunkSpeed", 0);
    _defineProperty2(this, "_chunkCache", []);
    _defineProperty2(this, "_speeds", []);
    _defineProperty2(this, "_totalSize", 0);
    _defineProperty2(this, "_totalCost", 0);
    this._opts = opts || {};
  }
  _createClass2(BandwidthService2, [{
    key: "addRecord",
    value: function addRecord(totalByte, ms) {
      if (!totalByte || !ms)
        return;
      this._speeds.push(8e3 * totalByte / ms);
      this._speeds = this._speeds.slice(-MAX_SEGMENT_SAVE_SIZE);
    }
  }, {
    key: "addChunkRecord",
    value: function addChunkRecord(totalByte, ms) {
      var _this$_opts, _this$_opts2;
      if (!totalByte || !ms || totalByte < (((_this$_opts = this._opts) === null || _this$_opts === void 0 ? void 0 : _this$_opts.skipChunkSize) || SKIP_SMALL_CHUNK))
        return;
      this._totalSize += totalByte;
      this._totalCost += ms;
      this._chunkSpeed = 8e3 * totalByte / ms;
      this._chunkCache.push({
        size: totalByte,
        duration: ms,
        timestamp: performance.now()
      });
      var size = ((_this$_opts2 = this._opts) === null || _this$_opts2 === void 0 ? void 0 : _this$_opts2.chunkCountForSpeed) || MAX_CHUNK_SAVE_SIZE;
      if (this._chunkCache.length > size) {
        this._chunkCache = this._chunkCache.slice(-size);
      }
    }
  }, {
    key: "getAvgSpeed",
    value: function getAvgSpeed() {
      var _this$_opts3;
      if (!this._chunkCache.length && !this._speeds.length)
        return 0;
      if (this._speeds.length) {
        return this._speeds.reduce(function(a, c) {
          return a += c;
        }) / this._speeds.length;
      }
      var lastSample = this._chunkCache[this._chunkCache.length - 1];
      var cost = performance.now() - lastSample.timestamp;
      if (cost > (((_this$_opts3 = this._opts) === null || _this$_opts3 === void 0 ? void 0 : _this$_opts3.longtimeNoReceived) || LONGTIME_NO_RECEIVE)) {
        this._chunkCache.push({
          size: 0,
          duration: cost,
          timestamp: performance.now()
        });
      }
      var totalSize = this._chunkCache.reduce(function(a, c) {
        return a += c.size;
      }, 0);
      var totalDuration = this._chunkCache.reduce(function(a, c) {
        return a += c.duration;
      }, 0);
      return 8e3 * totalSize / totalDuration;
    }
  }, {
    key: "getLatestSpeed",
    value: function getLatestSpeed() {
      if (!this._chunkCache.length && !this._speeds.length)
        return 0;
      if (this._speeds.length) {
        return this._speeds[this._speeds.length - 1];
      }
      return this._chunkSpeed;
    }
  }, {
    key: "getTotalSize",
    value: function getTotalSize() {
      return this._totalSize;
    }
  }, {
    key: "getTotalCost",
    value: function getTotalCost() {
      return this._totalCost;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._chunkCache = [];
      this._speeds = [];
      this._totalSize = 0;
      this._totalCost = 0;
    }
  }]);
  return BandwidthService2;
}();

// node_modules/xgplayer-streaming-shared/es/services/stats.js
var import_eventemitter34 = __toESM(require_eventemitter3());
var Stats = /* @__PURE__ */ function() {
  function Stats2(timescale) {
    _classCallCheck2(this, Stats2);
    _defineProperty2(this, "encodeType", "");
    _defineProperty2(this, "audioCodec", "");
    _defineProperty2(this, "videoCodec", "");
    _defineProperty2(this, "domain", "");
    _defineProperty2(this, "fps", 0);
    _defineProperty2(this, "bitrate", 0);
    _defineProperty2(this, "width", 0);
    _defineProperty2(this, "height", 0);
    _defineProperty2(this, "samplerate", 0);
    _defineProperty2(this, "channelCount", 0);
    _defineProperty2(this, "gop", 0);
    _defineProperty2(this, "_bitsAccumulateSize", 0);
    _defineProperty2(this, "_bitsAccumulateDuration", 0);
    _defineProperty2(this, "_startGopId", -1);
    this._timescale = timescale;
  }
  _createClass2(Stats2, [{
    key: "getStats",
    value: function getStats() {
      return {
        encodeType: this.encodeType,
        audioCodec: this.audioCodec,
        videoCodec: this.videoCodec,
        domain: this.domain,
        fps: this.fps,
        bitrate: this.bitrate,
        width: this.width,
        height: this.height,
        samplerate: this.samplerate,
        channelCount: this.channelCount,
        gop: this.gop
      };
    }
  }, {
    key: "setEncodeType",
    value: function setEncodeType(encode2) {
      this.encodeType = encode2;
    }
  }, {
    key: "setFpsFromScriptData",
    value: function setFpsFromScriptData(_ref) {
      var _data$onMetaData;
      var data = _ref.data;
      var fps = data === null || data === void 0 ? void 0 : (_data$onMetaData = data.onMetaData) === null || _data$onMetaData === void 0 ? void 0 : _data$onMetaData.framerate;
      if (fps && fps > 0 && fps < 100) {
        this.fps = fps;
      }
    }
  }, {
    key: "setVideoMeta",
    value: function setVideoMeta(track) {
      this.width = track.width;
      this.height = track.height;
      this.videoCodec = track.codec;
      this.encodeType = track.codecType;
      if (track.fpsNum && track.fpsDen) {
        var fps = track.fpsNum / track.fpsDen;
        if (fps > 0 && fps < 100) {
          this.fps = fps;
        }
      }
    }
  }, {
    key: "setAudioMeta",
    value: function setAudioMeta(track) {
      this.audioCodec = track.codec;
      this.samplerate = track.sampleRate;
      this.channelCount = track.channelCount;
    }
  }, {
    key: "setDomain",
    value: function setDomain(responseUrl) {
      this.domain = responseUrl.split("/").slice(2, 3)[0];
    }
  }, {
    key: "updateBitrate",
    value: function updateBitrate(samples) {
      var _this = this;
      if (!this.fps || this.fps >= 100) {
        if (samples.length) {
          var duration = samples.reduce(function(a, b) {
            return a += b.duration;
          }, 0) / samples.length;
          this.fps = Math.round(this._timescale / duration);
        }
      }
      samples.forEach(function(sample) {
        if (_this._startGopId === -1) {
          _this._startGopId = sample.gopId;
        }
        if (sample.gopId === _this._startGopId) {
          _this.gop++;
        }
        _this._bitsAccumulateDuration += sample.duration / (_this._timescale / 1e3);
        _this._bitsAccumulateSize += sample.units.reduce(function(a, c) {
          return a += c.length;
        }, 0);
        if (_this._bitsAccumulateDuration >= 1e3) {
          _this.bitrate = _this._bitsAccumulateSize * 8;
          _this._bitsAccumulateDuration = 0;
          _this._bitsAccumulateSize = 0;
        }
      });
    }
  }]);
  return Stats2;
}();
var MediaStatsService = /* @__PURE__ */ function() {
  function MediaStatsService2(core) {
    var timescale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e3;
    _classCallCheck2(this, MediaStatsService2);
    _defineProperty2(this, "_core", null);
    _defineProperty2(this, "_samples", []);
    this._core = core;
    this._timescale = timescale;
    this._stats = new Stats(timescale);
    this._bindEvents();
  }
  _createClass2(MediaStatsService2, [{
    key: "getStats",
    value: function getStats() {
      var _this$_core, _this$_core2, _this$_core2$speedInf, _this$_core3, _this$_core3$speedInf, _this$_core4, _this$_core4$speedInf, _this$_core5, _this$_core5$speedInf, _this$_core6, _this$_core6$bufferIn;
      var _ref2 = ((_this$_core = this._core) === null || _this$_core === void 0 ? void 0 : _this$_core.media) || {}, _ref2$currentTime = _ref2.currentTime, currentTime = _ref2$currentTime === void 0 ? 0 : _ref2$currentTime, _ref2$decodeFps = _ref2.decodeFps, decodeFps = _ref2$decodeFps === void 0 ? 0 : _ref2$decodeFps;
      return _objectSpread22(_objectSpread22({}, this._stats.getStats()), {}, {
        downloadSpeed: ((_this$_core2 = this._core) === null || _this$_core2 === void 0 ? void 0 : (_this$_core2$speedInf = _this$_core2.speedInfo) === null || _this$_core2$speedInf === void 0 ? void 0 : _this$_core2$speedInf.call(_this$_core2).speed) || 0,
        avgSpeed: ((_this$_core3 = this._core) === null || _this$_core3 === void 0 ? void 0 : (_this$_core3$speedInf = _this$_core3.speedInfo) === null || _this$_core3$speedInf === void 0 ? void 0 : _this$_core3$speedInf.call(_this$_core3).avgSpeed) || 0,
        totalReceivedByte: ((_this$_core4 = this._core) === null || _this$_core4 === void 0 ? void 0 : (_this$_core4$speedInf = _this$_core4.speedInfo) === null || _this$_core4$speedInf === void 0 ? void 0 : _this$_core4$speedInf.call(_this$_core4).totalSize) || 0,
        totalReceivedCost: ((_this$_core5 = this._core) === null || _this$_core5 === void 0 ? void 0 : (_this$_core5$speedInf = _this$_core5.speedInfo) === null || _this$_core5$speedInf === void 0 ? void 0 : _this$_core5$speedInf.call(_this$_core5).totalCost) || 0,
        currentTime,
        bufferEnd: ((_this$_core6 = this._core) === null || _this$_core6 === void 0 ? void 0 : (_this$_core6$bufferIn = _this$_core6.bufferInfo()) === null || _this$_core6$bufferIn === void 0 ? void 0 : _this$_core6$bufferIn.remaining) || 0,
        decodeFps
      });
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;
      this._core.on(EVENT.DEMUXED_TRACK, function(_ref3) {
        var videoTrack = _ref3.videoTrack;
        return _this2._stats.updateBitrate(videoTrack.samples);
      });
      this._core.on(EVENT.FLV_SCRIPT_DATA, function(data) {
        _this2._stats.setFpsFromScriptData(data);
      });
      this._core.on(EVENT.METADATA_PARSED, function(e) {
        if (e.type === "video") {
          _this2._stats.setVideoMeta(e.track);
        } else {
          _this2._stats.setAudioMeta(e.track);
        }
      });
      this._core.on(EVENT.TTFB, function(e) {
        _this2._stats.setDomain(e.responseUrl);
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this._samples = [];
      this._stats = new Stats(this._timescale);
    }
  }]);
  return MediaStatsService2;
}();

// node_modules/xgplayer-flv/es/flv/index.js
var import_eventemitter35 = __toESM(require_eventemitter3());

// node_modules/xgplayer-transmuxer/es/_virtual/_rollupPluginBabelHelpers.js
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey3(descriptor.key), descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty3(obj, key, value) {
  key = _toPropertyKey3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf3(subClass, superClass);
}
function _getPrototypeOf3(o) {
  _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf22(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf3(o);
}
function _setPrototypeOf3(o, p) {
  _setPrototypeOf3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf22(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf3(o, p);
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn3(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized3(self);
}
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn3(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray2(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray2(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray2(o, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive3(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey3(arg) {
  var key = _toPrimitive3(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

// node_modules/xgplayer-transmuxer/es/model/types.js
var TrackType = {
  VIDEO: "video",
  AUDIO: "audio",
  METADATA: "metadata"
};
var VideoCodecType = {
  AV1: "av1",
  AVC: "avc",
  HEVC: "hevc"
};
var AudioCodecType = {
  AAC: "aac",
  G711PCMA: "g7110a",
  G711PCMU: "g7110m",
  OPUS: "opus",
  MP3: "mp3"
};
var WarningType = {
  LARGE_AV_SHIFT: "LARGE_AV_SHIFT",
  LARGE_VIDEO_GAP: "LARGE_VIDEO_GAP",
  LARGE_VIDEO_GAP_BETWEEN_CHUNK: "LARGE_VIDEO_GAP_BETWEEN_CHUNK",
  LARGE_AUDIO_GAP: "LARGE_AUDIO_GAP",
  AUDIO_FILLED: "AUDIO_FILLED",
  AUDIO_DROPPED: "AUDIO_DROPPED"
};

// node_modules/xgplayer-transmuxer/es/model/video-track.js
var VideoTrack = /* @__PURE__ */ function() {
  function VideoTrack2() {
    _classCallCheck3(this, VideoTrack2);
    _defineProperty3(this, "id", 1);
    _defineProperty3(this, "type", TrackType.VIDEO);
    _defineProperty3(this, "codecType", VideoCodecType.AVC);
    _defineProperty3(this, "pid", -1);
    _defineProperty3(this, "hvcC", void 0);
    _defineProperty3(this, "codec", "");
    _defineProperty3(this, "timescale", 0);
    _defineProperty3(this, "formatTimescale", 0);
    _defineProperty3(this, "sequenceNumber", 0);
    _defineProperty3(this, "baseMediaDecodeTime", 0);
    _defineProperty3(this, "baseDts", 0);
    _defineProperty3(this, "duration", 0);
    _defineProperty3(this, "warnings", []);
    _defineProperty3(this, "samples", []);
    _defineProperty3(this, "pps", []);
    _defineProperty3(this, "sps", []);
    _defineProperty3(this, "vps", []);
    _defineProperty3(this, "fpsNum", 0);
    _defineProperty3(this, "fpsDen", 0);
    _defineProperty3(this, "sarRatio", []);
    _defineProperty3(this, "width", 0);
    _defineProperty3(this, "height", 0);
    _defineProperty3(this, "nalUnitSize", 4);
    _defineProperty3(this, "present", false);
    _defineProperty3(this, "isVideoEncryption", false);
    _defineProperty3(this, "isAudioEncryption", false);
    _defineProperty3(this, "isVideo", true);
    _defineProperty3(this, "lastKeyFrameDts", 0);
    _defineProperty3(this, "kid", null);
    _defineProperty3(this, "pssh", null);
    _defineProperty3(this, "ext", void 0);
  }
  _createClass3(VideoTrack2, [{
    key: "reset",
    value: function reset() {
      this.sequenceNumber = this.width = this.height = this.fpsDen = this.fpsNum = this.duration = this.baseMediaDecodeTime = this.timescale = 0;
      this.codec = "";
      this.present = false;
      this.pid = -1;
      this.pps = [];
      this.sps = [];
      this.vps = [];
      this.sarRatio = [];
      this.samples = [];
      this.warnings = [];
      this.hvcC = null;
    }
  }, {
    key: "firstDts",
    get: function get() {
      return this.samples.length ? this.samples[0].dts : null;
    }
  }, {
    key: "firstPts",
    get: function get() {
      return this.samples.length ? this.samples[0].pts : null;
    }
  }, {
    key: "samplesDuration",
    get: function get() {
      if (this.samples.length > 0) {
        var first = this.samples[0];
        var last = this.samples[this.samples.length - 1];
        return last.dts - first.dts + last.duration;
      }
      return 0;
    }
  }, {
    key: "exist",
    value: function exist() {
      if (/av01/.test(this.codec)) {
        return true;
      }
      return !!(this.pps.length && this.sps.length && this.codec);
    }
  }, {
    key: "hasSample",
    value: function hasSample() {
      return !!this.samples.length;
    }
  }, {
    key: "isEncryption",
    get: function get() {
      return this.isVideoEncryption;
    }
  }]);
  return VideoTrack2;
}();

// node_modules/xgplayer-transmuxer/es/model/audio-track.js
var AudioTrack = /* @__PURE__ */ function() {
  function AudioTrack2() {
    _classCallCheck3(this, AudioTrack2);
    _defineProperty3(this, "id", 2);
    _defineProperty3(this, "type", TrackType.AUDIO);
    _defineProperty3(this, "codecType", AudioCodecType.AAC);
    _defineProperty3(this, "pid", -1);
    _defineProperty3(this, "codec", "");
    _defineProperty3(this, "container", "");
    _defineProperty3(this, "sequenceNumber", 0);
    _defineProperty3(this, "sampleDuration", 0);
    _defineProperty3(this, "timescale", 0);
    _defineProperty3(this, "formatTimescale", 0);
    _defineProperty3(this, "baseMediaDecodeTime", 0);
    _defineProperty3(this, "duration", 0);
    _defineProperty3(this, "warnings", []);
    _defineProperty3(this, "samples", []);
    _defineProperty3(this, "baseDts", 0);
    _defineProperty3(this, "sampleSize", 16);
    _defineProperty3(this, "sampleRate", 0);
    _defineProperty3(this, "channelCount", 0);
    _defineProperty3(this, "objectType", 0);
    _defineProperty3(this, "sampleRateIndex", 0);
    _defineProperty3(this, "config", []);
    _defineProperty3(this, "present", false);
    _defineProperty3(this, "isVideoEncryption", false);
    _defineProperty3(this, "isAudioEncryption", false);
    _defineProperty3(this, "kid", null);
    _defineProperty3(this, "ext", void 0);
  }
  _createClass3(AudioTrack2, [{
    key: "reset",
    value: function reset() {
      this.sequenceNumber = 0;
      this.timescale = 0;
      this.sampleDuration = 0;
      this.sampleRate = 0;
      this.channelCount = 0;
      this.baseMediaDecodeTime = 0;
      this.present = false;
      this.pid = -1;
      this.codec = "";
      this.samples = [];
      this.config = [];
      this.warnings = [];
    }
  }, {
    key: "exist",
    value: function exist() {
      return !!(this.sampleRate && this.channelCount && (this.codec || this.container) && (this.codecType === AudioCodecType.AAC || this.codecType === AudioCodecType.G711PCMA || this.codecType === AudioCodecType.G711PCMU || this.codecType === AudioCodecType.OPUS || this.codecType === AudioCodecType.MP3));
    }
  }, {
    key: "hasSample",
    value: function hasSample() {
      return !!this.samples.length;
    }
  }, {
    key: "isEncryption",
    get: function get() {
      return this.isAudioEncryption;
    }
  }, {
    key: "firstDts",
    get: function get() {
      return this.samples.length ? this.samples[0].dts : null;
    }
  }, {
    key: "firstPts",
    get: function get() {
      return this.samples.length ? this.samples[0].pts : null;
    }
  }, {
    key: "samplesDuration",
    get: function get() {
      if (this.samples.length > 0) {
        var first = this.samples[0];
        var last = this.samples[this.samples.length - 1];
        return last.dts - first.dts + last.duration;
      }
      return 0;
    }
  }]);
  return AudioTrack2;
}();

// node_modules/xgplayer-transmuxer/es/model/video-sample.js
var VideoSample = /* @__PURE__ */ function() {
  function VideoSample2(pts, dts, units) {
    _classCallCheck3(this, VideoSample2);
    _defineProperty3(this, "flag", {});
    _defineProperty3(this, "keyframe", false);
    _defineProperty3(this, "gopId", 0);
    _defineProperty3(this, "duration", 0);
    _defineProperty3(this, "size", 0);
    _defineProperty3(this, "units", []);
    _defineProperty3(this, "chromaFormat", 420);
    this.originPts = this.pts = pts;
    this.originDts = this.dts = dts;
    if (units)
      this.units = units;
  }
  _createClass3(VideoSample2, [{
    key: "cts",
    get: function get() {
      return this.pts - this.dts;
    }
  }, {
    key: "setToKeyframe",
    value: function setToKeyframe() {
      this.keyframe = true;
      this.flag.dependsOn = 2;
      this.flag.isNonSyncSample = 0;
    }
  }]);
  return VideoSample2;
}();

// node_modules/xgplayer-transmuxer/es/model/audio-sample.js
var AudioSample = /* @__PURE__ */ _createClass3(
  function AudioSample2(pts, data, duration, sampleOffset) {
    _classCallCheck3(this, AudioSample2);
    _defineProperty3(this, "duration", 1024);
    _defineProperty3(this, "flag", {
      dependsOn: 2,
      isNonSyncSample: 0
    });
    _defineProperty3(this, "keyframe", true);
    this.originPts = this.pts = this.dts = pts;
    this.data = data;
    this.size = data.byteLength;
    this.sampleOffset = sampleOffset;
    if (duration)
      this.duration = duration;
  }
);

// node_modules/xgplayer-transmuxer/es/model/metadata-track.js
var Sample = /* @__PURE__ */ _createClass3(
  function Sample2(data, pts) {
    _classCallCheck3(this, Sample2);
    _defineProperty3(this, "time", 0);
    this.data = data;
    this.originPts = this.pts = pts;
  }
);
var FlvScriptSample = /* @__PURE__ */ function(_Sample) {
  _inherits3(FlvScriptSample2, _Sample);
  var _super = _createSuper3(FlvScriptSample2);
  function FlvScriptSample2() {
    _classCallCheck3(this, FlvScriptSample2);
    return _super.apply(this, arguments);
  }
  return _createClass3(FlvScriptSample2);
}(Sample);
var SeiSample = /* @__PURE__ */ function(_Sample2) {
  _inherits3(SeiSample2, _Sample2);
  var _super2 = _createSuper3(SeiSample2);
  function SeiSample2() {
    _classCallCheck3(this, SeiSample2);
    return _super2.apply(this, arguments);
  }
  return _createClass3(SeiSample2);
}(Sample);
var MetadataTrack = /* @__PURE__ */ function() {
  function MetadataTrack2() {
    _classCallCheck3(this, MetadataTrack2);
    _defineProperty3(this, "id", 3);
    _defineProperty3(this, "type", TrackType.METADATA);
    _defineProperty3(this, "timescale", 0);
    _defineProperty3(this, "flvScriptSamples", []);
    _defineProperty3(this, "seiSamples", []);
  }
  _createClass3(MetadataTrack2, [{
    key: "exist",
    value: function exist() {
      return !!((this.flvScriptSamples.length || this.seiSamples.length) && this.timescale);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.timescale = 0;
      this.flvScriptSamples = [];
      this.seiSamples = [];
    }
  }, {
    key: "hasSample",
    value: function hasSample() {
      return !!(this.flvScriptSamples.length || this.seiSamples.length);
    }
  }]);
  return MetadataTrack2;
}();

// node_modules/xgplayer-transmuxer/es/utils/logger.js
var Logger2 = /* @__PURE__ */ function() {
  function Logger22(name) {
    _classCallCheck3(this, Logger22);
    this.name = name || "";
    this._prefix = "[".concat(this.name, "]");
  }
  _createClass3(Logger22, [{
    key: "warn",
    value: function warn() {
      var _console;
      if (Logger22.disabled)
        return;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_console = console).warn.apply(_console, [this._prefix].concat(args));
    }
  }], [{
    key: "enable",
    value: function enable() {
      Logger22.disabled = false;
    }
  }, {
    key: "disable",
    value: function disable() {
      Logger22.disabled = true;
    }
  }]);
  return Logger22;
}();
_defineProperty3(Logger2, "disabled", true);

// node_modules/xgplayer-transmuxer/es/utils/env.js
var isBrowser2 = typeof window !== "undefined";
var ua = isBrowser2 && navigator.userAgent.toLocaleLowerCase();
var isSafari = isBrowser2 && /^((?!chrome|android).)*safari/.test(ua);
var isFirefox = isBrowser2 && ua.includes("firefox");
var isAndroid = isBrowser2 && ua.includes("android");

// node_modules/xgplayer-transmuxer/es/codec/aac.js
var AAC = /* @__PURE__ */ function() {
  function AAC2() {
    _classCallCheck3(this, AAC2);
  }
  _createClass3(AAC2, null, [{
    key: "getRateIndexByRate",
    value: function getRateIndexByRate(rate) {
      return AAC2.FREQ.indexOf(rate);
    }
  }, {
    key: "parseADTS",
    value: function parseADTS(data, pts) {
      var len = data.length;
      var i = 0;
      while (i + 2 < len) {
        if (data[i] === 255 && (data[i + 1] & 246) === 240) {
          break;
        }
        i++;
      }
      if (i >= len)
        return;
      var skip = i;
      var frames = [];
      var samplingFrequencyIndex = (data[i + 2] & 60) >>> 2;
      var sampleRate = AAC2.FREQ[samplingFrequencyIndex];
      if (!sampleRate)
        throw new Error("Invalid sampling index: ".concat(samplingFrequencyIndex));
      var objectType = ((data[i + 2] & 192) >>> 6) + 1;
      var channelCount = (data[i + 2] & 1) << 2 | (data[i + 3] & 192) >>> 6;
      var _AAC$_getConfig = AAC2._getConfig(samplingFrequencyIndex, channelCount, objectType), config = _AAC$_getConfig.config, codec = _AAC$_getConfig.codec;
      var protectionSkipBytes;
      var frameLength;
      var frameIndex = 0;
      var duration = AAC2.getFrameDuration(sampleRate);
      while (i + 7 < len) {
        if (data[i] !== 255 || (data[i + 1] & 246) !== 240) {
          i++;
          continue;
        }
        frameLength = (data[i + 3] & 3) << 11 | data[i + 4] << 3 | (data[i + 5] & 224) >> 5;
        if (!frameLength || len - i < frameLength)
          break;
        protectionSkipBytes = (~data[i + 1] & 1) * 2;
        frames.push({
          pts: pts + frameIndex * duration,
          data: data.subarray(i + 7 + protectionSkipBytes, i + frameLength)
        });
        frameIndex++;
        i += frameLength;
      }
      return {
        skip,
        remaining: i >= len ? void 0 : data.subarray(i),
        frames,
        samplingFrequencyIndex,
        sampleRate,
        objectType,
        channelCount,
        codec,
        config,
        originCodec: "mp4a.40.".concat(objectType)
      };
    }
  }, {
    key: "parseAudioSpecificConfig",
    value: function parseAudioSpecificConfig(data) {
      if (!data.length)
        return;
      var objectType = data[0] >>> 3;
      var samplingFrequencyIndex = (data[0] & 7) << 1 | data[1] >>> 7;
      var channelCount = (data[1] & 120) >>> 3;
      var sampleRate = AAC2.FREQ[samplingFrequencyIndex];
      if (!sampleRate)
        return;
      var _AAC$_getConfig2 = AAC2._getConfig(samplingFrequencyIndex, channelCount, objectType), config = _AAC$_getConfig2.config, codec = _AAC$_getConfig2.codec;
      return {
        samplingFrequencyIndex,
        sampleRate,
        objectType,
        channelCount,
        config,
        codec,
        originCodec: "mp4a.40.".concat(objectType)
      };
    }
  }, {
    key: "getFrameDuration",
    value: function getFrameDuration(rate) {
      var timescale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9e4;
      return 1024 * timescale / rate;
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(samplingIndex, channelCount, originObjectType) {
      var config = [];
      var objectType;
      var extensionSamplingIndex;
      if (isFirefox) {
        if (samplingIndex >= 6) {
          objectType = 5;
          extensionSamplingIndex = samplingIndex - 3;
        } else {
          objectType = 2;
          extensionSamplingIndex = samplingIndex;
        }
      } else if (isAndroid) {
        objectType = 2;
        extensionSamplingIndex = samplingIndex;
      } else {
        objectType = 5;
        extensionSamplingIndex = samplingIndex;
        if (samplingIndex >= 6) {
          extensionSamplingIndex = samplingIndex - 3;
        } else if (channelCount === 1) {
          objectType = 2;
          extensionSamplingIndex = samplingIndex;
        }
      }
      config[0] = objectType << 3;
      config[0] |= (samplingIndex & 14) >> 1;
      config[1] = (samplingIndex & 1) << 7;
      config[1] |= channelCount << 3;
      if (objectType === 5) {
        config[1] |= (extensionSamplingIndex & 14) >> 1;
        config[2] = (extensionSamplingIndex & 1) << 7;
        config[2] |= 2 << 2;
        config[3] = 0;
      }
      return {
        config,
        codec: "mp4a.40.".concat(objectType)
      };
    }
  }, {
    key: "getSilentFrame",
    value: function getSilentFrame(codec, channelCount) {
      switch (codec) {
        case "mp4a.40.2":
          if (channelCount === 1) {
            return new Uint8Array([0, 200, 0, 128, 35, 128]);
          }
          if (channelCount === 2) {
            return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
          }
          if (channelCount === 3) {
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
          }
          if (channelCount === 4) {
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
          }
          if (channelCount === 5) {
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
          }
          if (channelCount === 6) {
            return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
          }
          break;
        default:
          if (channelCount === 1) {
            return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
          }
          if (channelCount === 2) {
            return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
          }
          if (channelCount === 3) {
            return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
          }
          break;
      }
    }
  }]);
  return AAC2;
}();
_defineProperty3(AAC, "FREQ", [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350]);

// node_modules/xgplayer-transmuxer/es/codec/opus.js
var OPUS = /* @__PURE__ */ function() {
  function OPUS2() {
    _classCallCheck3(this, OPUS2);
  }
  _createClass3(OPUS2, null, [{
    key: "getFrameDuration",
    value: function getFrameDuration(samples) {
      return 20;
    }
  }, {
    key: "parseHeaderPackets",
    value: function parseHeaderPackets(data) {
      if (!data.length)
        return;
      var dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
      var magicSignature = "";
      for (var i = 0; i < 8; i++) {
        magicSignature += String.fromCodePoint(data[i]);
      }
      if (magicSignature !== "OpusHead") {
        throw new Error("Invalid Opus MagicSignature");
      }
      var channelCount = data[9];
      console.log("Pre-skip", data[10], data[11]);
      var sampleRate = dv.getUint32(12, true);
      var outputGain = dv.getInt16(16, true);
      if (!sampleRate)
        return;
      var codec = "opus";
      var originCodec = "opus";
      var config = new Uint8Array(data.buffer, data.byteOffset + 8, data.byteLength - 8);
      return {
        outputGain,
        sampleRate,
        channelCount,
        config,
        codec,
        originCodec
      };
    }
  }]);
  return OPUS2;
}();

// node_modules/xgplayer-transmuxer/es/flv/fixer.js
var LARGE_AV_FIRST_FRAME_GAP = 500;
var AUDIO_GAP_OVERLAP_THRESHOLD_COUNT = 3;
var MAX_SILENT_FRAME_DURATION = 1e3;
var AUDIO_EXCEPTION_LOG_EMIT_DURATION = 5e3;
var MAX_VIDEO_FRAME_DURATION = 1e3;
var MAX_DTS_DELTA_WITH_NEXT_CHUNK = 200;
var VIDEO_EXCEPTION_LOG_EMIT_DURATION = 5e3;
var TRACK_BROKEN_CHECK_TIME = 5;
var FlvFixer = /* @__PURE__ */ function() {
  function FlvFixer2(videoTrack, audioTrack, metadataTrack) {
    _classCallCheck3(this, FlvFixer2);
    this.videoTrack = videoTrack;
    this.audioTrack = audioTrack;
    this.metadataTrack = metadataTrack;
    this._baseDts = -1;
    this._baseDtsInited = false;
    this._audioNextPts = void 0;
    this._videoNextDts = void 0;
    this._audioTimestampBreak = 0;
    this._videoTimestampBreak = 0;
    this._lastVideoDuration = 0;
    this._keyFrameInNextChunk = false;
    this._lastAudioExceptionGapDot = -Infinity;
    this._lastAudioExceptionOverlapDot = -Infinity;
    this._lastAudioExceptionLargeGapDot = -Infinity;
    this._lastVideoExceptionLargeGapDot = -Infinity;
    this._lastVideoExceptionChunkFirstDtsDot = -Infinity;
  }
  _createClass3(FlvFixer2, [{
    key: "fix",
    value: function fix() {
      var _this = this;
      var startTime = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var discontinuity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var contiguous = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      startTime = Math.round(startTime * 1e3);
      var videoTrack = this.videoTrack;
      var audioTrack = this.audioTrack;
      if (discontinuity || !contiguous) {
        this._videoLastSample = null;
        this._audioNextPts = void 0;
        this._videoNextDts = void 0;
        this._audioTimestampBreak = 0;
        this._videoTimestampBreak = 0;
        this._lastAudioExceptionGapDot = -Infinity;
        this._lastAudioExceptionOverlapDot = -Infinity;
        this._lastAudioExceptionLargeGapDot = -Infinity;
        this._lastVideoExceptionLargeGapDot = -Infinity;
        this._lastVideoExceptionChunkFirstDtsDot = -Infinity;
      }
      if (discontinuity && !contiguous) {
        this._baseDtsInited = false;
      }
      if (!this._baseDtsInited) {
        this._calculateBaseDts(audioTrack, videoTrack);
      }
      if (!contiguous && startTime) {
        this._audioNextPts = this._videoNextDts = startTime;
      }
      var resetBaseDts = this._baseDtsInited && (this._videoTimestampBreak || !this.videoTrack.exist()) && (this._audioTimestampBreak || !this.audioTrack.exist());
      if (resetBaseDts) {
        this._resetBaseDtsWhenStreamBreaked();
      }
      this._fixAudio(audioTrack);
      this._keyFrameInNextChunk = false;
      this._fixVideo(videoTrack);
      if (this.metadataTrack.exist()) {
        var timescale = this.metadataTrack.timescale;
        this.metadataTrack.seiSamples.forEach(function(s) {
          s.pts = s.originPts - _this._baseDts;
          s.time = Math.max(0, s.pts) / timescale;
        });
        this.metadataTrack.flvScriptSamples.forEach(function(s) {
          s.pts = s.originPts - _this._baseDts;
          s.time = Math.max(0, s.pts) / timescale;
        });
      }
      if (videoTrack.samples.length) {
        videoTrack.baseMediaDecodeTime = videoTrack.samples[0].dts;
      }
      if (audioTrack.samples.length) {
        audioTrack.baseMediaDecodeTime = audioTrack.samples[0].pts * audioTrack.timescale / 1e3;
      }
    }
  }, {
    key: "_fixVideo",
    value: function _fixVideo(videoTrack) {
      var _this2 = this;
      var samples = videoTrack.samples;
      if (!samples.length)
        return;
      samples.forEach(function(x) {
        x.dts -= _this2._baseDts;
        x.pts -= _this2._baseDts;
        if (x.keyframe)
          _this2._keyFrameInNextChunk = true;
      });
      var refSampleDurationInt;
      if (videoTrack.fpsNum && videoTrack.fpsDen) {
        refSampleDurationInt = videoTrack.timescale * (videoTrack.fpsDen / videoTrack.fpsNum);
      } else if (videoTrack.length > 1) {
        var first = videoTrack.samples[0];
        var last = videoTrack.samples[samples.length - 1];
        refSampleDurationInt = Math.floor((last.dts - first.dts) / (samples.length - 1));
      } else {
        refSampleDurationInt = this._lastVideoDuration || 40;
      }
      var lastSample = samples.pop();
      if (this._videoLastSample) {
        samples.unshift(this._videoLastSample);
      }
      this._videoLastSample = lastSample;
      if (!samples.length)
        return;
      if (this._videoNextDts === void 0) {
        var samp0 = samples[0];
        this._videoNextDts = samp0.dts;
      }
      var len = samples.length;
      var sampleDuration = 0;
      var firstSample = samples[0];
      var vDelta = this._videoNextDts - firstSample.dts;
      if (Math.abs(vDelta) > MAX_DTS_DELTA_WITH_NEXT_CHUNK) {
        if (Math.abs(firstSample.dts - this._lastVideoExceptionChunkFirstDtsDot) > VIDEO_EXCEPTION_LOG_EMIT_DURATION) {
          var _samples$;
          this._lastVideoExceptionChunkFirstDtsDot = firstSample.dts;
          videoTrack.warnings.push({
            type: WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK,
            nextDts: this._videoNextDts,
            firstSampleDts: firstSample.dts,
            nextSampleDts: (_samples$ = samples[1]) === null || _samples$ === void 0 ? void 0 : _samples$.dts,
            sampleDuration: vDelta
          });
        }
        if (this._videoTimestampBreak >= TRACK_BROKEN_CHECK_TIME) {
          this._videoNextDts = firstSample.dts;
          this._videoTimestampBreak = 0;
        } else {
          firstSample.dts += vDelta;
          firstSample.pts += vDelta;
          if (!this.audioTrack.exist()) {
            this._videoTimestampBreak = 1;
          }
        }
      }
      for (var i = 0; i < len; i++) {
        var dts = samples[i].dts;
        var nextSample = samples[i + 1];
        if (i < len - 1) {
          sampleDuration = nextSample.dts - dts;
        } else if (lastSample) {
          sampleDuration = lastSample.dts - dts;
        } else {
          sampleDuration = refSampleDurationInt;
        }
        if (sampleDuration > MAX_VIDEO_FRAME_DURATION || sampleDuration < 0) {
          this._videoTimestampBreak++;
          if (Math.abs(dts - this._lastVideoExceptionLargeGapDot) > VIDEO_EXCEPTION_LOG_EMIT_DURATION) {
            this._lastVideoExceptionLargeGapDot = dts;
            videoTrack.warnings.push({
              type: WarningType.LARGE_VIDEO_GAP,
              time: dts / videoTrack.timescale,
              dts,
              originDts: samples[i].originDts,
              nextDts: this._videoNextDts,
              sampleDuration,
              refSampleDuration: refSampleDurationInt
            });
          }
          sampleDuration = refSampleDurationInt;
        }
        samples[i].duration = sampleDuration;
        this._videoNextDts += sampleDuration;
        this._lastVideoDuration = sampleDuration;
      }
    }
  }, {
    key: "_fixAudio",
    value: function _fixAudio(audioTrack) {
      var _this3 = this;
      var samples = audioTrack.samples;
      if (!samples.length)
        return;
      samples.forEach(function(x) {
        x.dts = x.pts -= _this3._baseDts;
      });
      this._doFixAudioInternal(audioTrack, samples, 1e3);
    }
  }, {
    key: "_calculateBaseDts",
    value: function _calculateBaseDts(audioTrack, videoTrack) {
      var audioSamps = audioTrack.samples;
      var videoSamps = videoTrack.samples;
      if (!audioSamps.length && !videoSamps.length) {
        return false;
      }
      var audioBasePts = Infinity;
      var videoBaseDts = Infinity;
      if (audioSamps.length) {
        audioTrack.baseDts = audioBasePts = audioSamps[0].pts;
      }
      if (videoSamps.length) {
        videoTrack.baseDts = videoBaseDts = videoSamps[0].dts;
      }
      this._baseDts = Math.min(audioBasePts, videoBaseDts);
      var delta = videoBaseDts - audioBasePts;
      if (Number.isFinite(delta) && Math.abs(delta) > LARGE_AV_FIRST_FRAME_GAP) {
        videoTrack.warnings.push({
          type: WarningType.LARGE_AV_SHIFT,
          videoBaseDts,
          audioBasePts,
          baseDts: this._baseDts,
          delta
        });
      }
      this._baseDtsInited = true;
      return true;
    }
  }, {
    key: "_resetBaseDtsWhenStreamBreaked",
    value: function _resetBaseDtsWhenStreamBreaked() {
      var calc = this._calculateBaseDts(this.audioTrack, this.videoTrack);
      if (!calc)
        return;
      if (!this.audioTrack.exist()) {
        this._baseDts -= this._videoNextDts;
      } else if (!this.videoTrack.exist()) {
        this._baseDts -= this._audioNextPts;
      } else {
        this._baseDts -= Math.min(this._audioNextPts, this._videoNextDts);
      }
      this._videoTimestampBreak = 0;
      this._audioTimestampBreak = 0;
    }
  }, {
    key: "_doFixAudioInternal",
    value: function _doFixAudioInternal(audioTrack, samples, timescale) {
      if (!audioTrack.sampleDuration) {
        switch (audioTrack.codecType) {
          case AudioCodecType.AAC: {
            audioTrack.sampleDuration = AAC.getFrameDuration(audioTrack.timescale, timescale);
            break;
          }
          case AudioCodecType.OPUS: {
            audioTrack.sampleDuration = OPUS.getFrameDuration(audioTrack.samples, timescale);
            break;
          }
          case AudioCodecType.G711PCMA:
          case AudioCodecType.G711PCMU: {
            audioTrack.sampleDuration = this._getG711Duration(audioTrack);
            break;
          }
          default:
            console.error("can't fix audio codecType:", audioTrack.codecType);
            break;
        }
      }
      var refSampleDuration = audioTrack.sampleDuration;
      var sampleDurationInSampleRate = audioTrack.codecType === AudioCodecType.OPUS ? 20 : audioTrack.codecType === AudioCodecType.AAC ? 1024 : refSampleDuration * audioTrack.timescale / 1e3;
      if (this._audioNextPts === void 0) {
        var samp0 = samples[0];
        this._audioNextPts = samp0.pts;
      }
      for (var i = 0; i < samples.length; i++) {
        var nextPts = this._audioNextPts;
        var sample = samples[i];
        var delta = sample.pts - nextPts;
        if (i === 0 && this._audioTimestampBreak >= TRACK_BROKEN_CHECK_TIME && this._keyFrameInNextChunk) {
          nextPts = this._audioNextPts = sample.dts;
          delta = 0;
          this._audioTimestampBreak = 0;
        }
        if (!this._audioTimestampBreak && delta >= AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration && delta <= MAX_SILENT_FRAME_DURATION && !isSafari) {
          var silentFrame = this._getSilentFrame(audioTrack) || samples[0].data.subarray();
          var count = Math.floor(delta / refSampleDuration);
          if (Math.abs(sample.pts - this._lastAudioExceptionGapDot) > AUDIO_EXCEPTION_LOG_EMIT_DURATION) {
            this._lastAudioExceptionGapDot = sample.pts;
            audioTrack.warnings.push({
              type: WarningType.AUDIO_FILLED,
              pts: sample.pts,
              originPts: sample.originPts,
              count,
              nextPts,
              refSampleDuration
            });
          }
          for (var j = 0; j < count; j++) {
            var silentSample = new AudioSample(Math.floor(this._audioNextPts + refSampleDuration) - Math.floor(this._audioNextPts), silentFrame, sampleDurationInSampleRate);
            silentSample.originPts = Math.floor(this._baseDts + nextPts);
            samples.splice(i, 0, silentSample);
            this._audioNextPts += refSampleDuration;
            i++;
          }
          i--;
        } else if (delta <= -AUDIO_GAP_OVERLAP_THRESHOLD_COUNT * refSampleDuration && delta >= -1 * MAX_SILENT_FRAME_DURATION) {
          if (Math.abs(sample.pts - this._lastAudioExceptionOverlapDot) > AUDIO_EXCEPTION_LOG_EMIT_DURATION) {
            this._lastAudioExceptionOverlapDot = sample.pts;
            audioTrack.warnings.push({
              type: WarningType.AUDIO_DROPPED,
              pts: sample.pts,
              originPts: sample.originPts,
              nextPts,
              refSampleDuration
            });
          }
          samples.splice(i, 1);
          i--;
        } else {
          if (Math.abs(delta) > MAX_SILENT_FRAME_DURATION) {
            this._audioTimestampBreak++;
            if (Math.abs(sample.pts - this._lastAudioExceptionLargeGapDot) > AUDIO_EXCEPTION_LOG_EMIT_DURATION) {
              this._lastAudioExceptionLargeGapDot = sample.pts;
              audioTrack.warnings.push({
                type: WarningType.LARGE_AUDIO_GAP,
                time: sample.pts / 1e3,
                pts: sample.pts,
                originPts: sample.originPts,
                nextPts,
                sampleDuration: delta,
                refSampleDuration
              });
            }
          }
          if (audioTrack.codecType === AudioCodecType.OPUS) {
            var lastSample = samples[samples.length - 1];
            if (lastSample) {
              lastSample.duration = sample.pts - lastSample.pts;
            }
          } else {
            sample.dts = sample.pts = nextPts;
            sample.duration = sampleDurationInSampleRate;
          }
          this._audioNextPts += refSampleDuration;
        }
      }
    }
  }, {
    key: "_getG711Duration",
    value: function _getG711Duration(track) {
      var sampleSize = track.sampleSize, channelCount = track.channelCount, sampleRate = track.sampleRate;
      var samp0 = track.samples[0];
      if (!samp0)
        return;
      return samp0.data.byteLength * 2 / channelCount / (sampleSize / 8) / sampleRate * 1e3;
    }
  }, {
    key: "_getSilentFrame",
    value: function _getSilentFrame(track) {
      if (track.codecType === AudioCodecType.AAC)
        return AAC.getSilentFrame(track.codec, track.channelCount);
      return new Uint8Array(8 * track.sampleDuration * track.channelCount);
    }
  }]);
  return FlvFixer2;
}();

// node_modules/xgplayer-transmuxer/es/utils/index.js
function concatUint8Array2() {
  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
    arr[_key] = arguments[_key];
  }
  arr = arr.filter(Boolean);
  var data = new Uint8Array(arr.reduce(function(p, c) {
    return p + c.byteLength;
  }, 0));
  var prevLen = 0;
  arr.forEach(function(d) {
    data.set(d, prevLen);
    prevLen += d.byteLength;
  });
  return data;
}
var MAX_SIZE = Math.pow(2, 32);
function readBig32(data) {
  var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return (data[i] << 24 >>> 0) + (data[i + 1] << 16) + (data[i + 2] << 8) + (data[i + 3] || 0);
}
function getAvcCodec(codecs) {
  var codec = "avc1.";
  var h;
  for (var i = 0; i < 3; i++) {
    h = codecs[i].toString(16);
    if (h.length < 2)
      h = "0".concat(h);
    codec += h;
  }
  return codec;
}
function parse2(a) {
  if (!Array.isArray(a)) {
    var arr = [];
    var value = "";
    for (var i = 0; i < a.length; i++) {
      if (i % 2) {
        value = a[i - 1] + a[i];
        arr.push(parseInt(value, 16));
        value = "";
      }
    }
    return arr;
  }
  return a.map(function(item) {
    return parseInt(item, 16);
  });
}

// node_modules/xgplayer-transmuxer/es/codec/nalu.js
var NALu = /* @__PURE__ */ function() {
  function NALu2() {
    _classCallCheck3(this, NALu2);
  }
  _createClass3(NALu2, null, [{
    key: "parseAnnexB",
    value: function parseAnnexB(data) {
      var j = data.byteLength - 1;
      var dropZerosLength = 0;
      do {
        if (data[j] === 0) {
          dropZerosLength++;
        } else {
          break;
        }
        j--;
      } while (j > 0);
      if (dropZerosLength >= 3) {
        data = data.subarray(0, j + 1);
      }
      var len = data.length;
      var start = 2;
      var end = 0;
      while (data[start] !== null && data[start] !== void 0 && data[start] !== 1) {
        start++;
      }
      start++;
      end = start + 2;
      if (end >= len)
        return [];
      var units = [];
      while (end < len) {
        switch (data[end]) {
          case 0:
            if (data[end - 1] !== 0) {
              end += 2;
              break;
            } else if (data[end - 2] !== 0) {
              end++;
              break;
            } else if (end < len - 1 && data[end + 1] !== 1) {
              end++;
              break;
            }
            if (start !== end - 2)
              units.push(data.subarray(start, end - 2));
            do {
              end++;
            } while (data[end] !== 1 && end < len);
            start = end + 1;
            end = start + 2;
            break;
          case 1:
            if (data[end - 1] !== 0 || data[end - 2] !== 0) {
              end += 3;
              break;
            }
            if (start !== end - 2)
              units.push(data.subarray(start, end - 2));
            start = end + 1;
            end = start + 2;
            break;
          default:
            end += 3;
            break;
        }
      }
      if (start < len)
        units.push(data.subarray(start));
      return units;
    }
  }, {
    key: "parseAvcC",
    value: function parseAvcC(data) {
      var size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
      if (data.length < 4)
        return;
      var dataLen = data.length;
      var units = [];
      var offset = 0;
      var length;
      while (offset + size < dataLen) {
        length = readBig32(data, offset);
        if (size === 3)
          length >>>= 8;
        offset += size;
        if (!length)
          continue;
        if (offset + length > dataLen) {
          break;
        }
        units.push(data.subarray(offset, offset + length));
        offset += length;
      }
      return units;
    }
  }, {
    key: "parseSEI",
    value: function parseSEI(unit, isHevc) {
      var len = unit.length;
      var i = isHevc ? 2 : 1;
      var type = 0;
      var size = 0;
      var uuid = "";
      while (unit[i] === 255) {
        type += 255;
        i++;
      }
      type += unit[i++];
      while (unit[i] === 255) {
        size += 255;
        i++;
      }
      size += unit[i++];
      if (type === 5 && len > i + 16) {
        for (var j = 0; j < 16; j++) {
          uuid += unit[i].toString(16);
          i++;
        }
      }
      return {
        payload: unit.subarray(i, i + size),
        type,
        size,
        uuid
      };
    }
  }, {
    key: "removeEPB",
    value: function removeEPB(uint) {
      var length = uint.byteLength;
      var emulationPreventionBytesPositions = [];
      var i = 1;
      while (i < length - 2) {
        if (uint[i] === 0 && uint[i + 1] === 0 && uint[i + 2] === 3) {
          emulationPreventionBytesPositions.push(i + 2);
          i += 2;
        } else {
          i++;
        }
      }
      if (!emulationPreventionBytesPositions.length)
        return uint;
      var newLength = length - emulationPreventionBytesPositions.length;
      var newData = new Uint8Array(newLength);
      var sourceIndex = 0;
      for (i = 0; i < newLength; sourceIndex++, i++) {
        if (sourceIndex === emulationPreventionBytesPositions[0]) {
          sourceIndex++;
          emulationPreventionBytesPositions.shift();
        }
        newData[i] = uint[sourceIndex];
      }
      return newData;
    }
  }]);
  return NALu2;
}();

// node_modules/xgplayer-transmuxer/es/utils/exp-golomb.js
var ExpGolomb = /* @__PURE__ */ function() {
  function ExpGolomb2(data) {
    _classCallCheck3(this, ExpGolomb2);
    _defineProperty3(this, "_bytesAvailable", void 0);
    _defineProperty3(this, "_bitsAvailable", 0);
    _defineProperty3(this, "_word", 0);
    if (!data)
      throw new Error("ExpGolomb data params is required");
    this._data = data;
    this._bytesAvailable = data.byteLength;
    if (this._bytesAvailable)
      this._loadWord();
  }
  _createClass3(ExpGolomb2, [{
    key: "bitsAvailable",
    get: function get() {
      return this._bitsAvailable;
    }
  }, {
    key: "_loadWord",
    value: function _loadWord() {
      var position = this._data.byteLength - this._bytesAvailable;
      var availableBytes = Math.min(4, this._bytesAvailable);
      if (availableBytes === 0)
        throw new Error("No bytes available");
      var workingBytes = new Uint8Array(4);
      workingBytes.set(this._data.subarray(position, position + availableBytes));
      this._word = new DataView(workingBytes.buffer).getUint32(0);
      this._bitsAvailable = availableBytes * 8;
      this._bytesAvailable -= availableBytes;
    }
  }, {
    key: "skipBits",
    value: function skipBits(count) {
      if (this._bitsAvailable > count) {
        this._word <<= count;
        this._bitsAvailable -= count;
      } else {
        count -= this._bitsAvailable;
        var skipBytes = Math.floor(count / 8);
        count -= skipBytes * 8;
        this._bytesAvailable -= skipBytes;
        this._loadWord();
        this._word <<= count;
        this._bitsAvailable -= count;
      }
    }
  }, {
    key: "readBits",
    value: function readBits(size) {
      if (size > 32) {
        throw new Error("Cannot read more than 32 bits");
      }
      var bits = Math.min(this._bitsAvailable, size);
      var val = this._word >>> 32 - bits;
      this._bitsAvailable -= bits;
      if (this._bitsAvailable > 0) {
        this._word <<= bits;
      } else if (this._bytesAvailable > 0) {
        this._loadWord();
      }
      bits = size - bits;
      if (bits > 0 && this._bitsAvailable) {
        return val << bits | this.readBits(bits);
      }
      return val;
    }
  }, {
    key: "skipLZ",
    value: function skipLZ() {
      var leadingZeroCount;
      for (leadingZeroCount = 0; leadingZeroCount < this._bitsAvailable; ++leadingZeroCount) {
        if ((this._word & 2147483648 >>> leadingZeroCount) !== 0) {
          this._word <<= leadingZeroCount;
          this._bitsAvailable -= leadingZeroCount;
          return leadingZeroCount;
        }
      }
      this._loadWord();
      return leadingZeroCount + this.skipLZ();
    }
  }, {
    key: "skipUEG",
    value: function skipUEG() {
      this.skipBits(1 + this.skipLZ());
    }
  }, {
    key: "readUEG",
    value: function readUEG() {
      var clz = this.skipLZ();
      return this.readBits(clz + 1) - 1;
    }
  }, {
    key: "readEG",
    value: function readEG() {
      var val = this.readUEG();
      if (1 & val) {
        return 1 + val >>> 1;
      }
      return -1 * (val >>> 1);
    }
  }, {
    key: "readBool",
    value: function readBool() {
      return this.readBits(1) === 1;
    }
  }, {
    key: "readUByte",
    value: function readUByte() {
      return this.readBits(8);
    }
  }, {
    key: "skipScalingList",
    value: function skipScalingList(count) {
      var lastScale = 8;
      var nextScale = 8;
      var deltaScale;
      for (var j = 0; j < count; j++) {
        if (nextScale !== 0) {
          deltaScale = this.readEG();
          nextScale = (lastScale + deltaScale + 256) % 256;
        }
        lastScale = nextScale === 0 ? lastScale : nextScale;
      }
    }
  }]);
  return ExpGolomb2;
}();

// node_modules/xgplayer-transmuxer/es/codec/avc.js
var AVC = /* @__PURE__ */ function() {
  function AVC2() {
    _classCallCheck3(this, AVC2);
  }
  _createClass3(AVC2, null, [{
    key: "parseAVCDecoderConfigurationRecord",
    value: function parseAVCDecoderConfigurationRecord(data) {
      if (data.length < 7)
        return;
      var nalUnitSize = (data[4] & 3) + 1;
      var spsParsed;
      var spsArr = [];
      var ppsArr = [];
      var offset = 6;
      var spsCount = data[5] & 31;
      var spsSize;
      for (var i = 0; i < spsCount; i++) {
        spsSize = data[offset] << 8 | data[offset + 1];
        offset += 2;
        if (!spsSize)
          continue;
        var sps = data.subarray(offset, offset + spsSize);
        offset += spsSize;
        spsArr.push(sps);
        if (!spsParsed) {
          spsParsed = AVC2.parseSPS(NALu.removeEPB(sps));
        }
      }
      var ppsCount = data[offset];
      offset++;
      var ppsSize;
      for (var _i = 0; _i < ppsCount; _i++) {
        ppsSize = data[offset] << 8 | data[offset + 1];
        offset += 2;
        if (!ppsSize)
          continue;
        ppsArr.push(data.subarray(offset, offset + ppsSize));
        offset += ppsSize;
      }
      return {
        sps: spsParsed,
        spsArr,
        ppsArr,
        nalUnitSize
      };
    }
  }, {
    key: "parseSPS",
    value: function parseSPS(unit) {
      var eg = new ExpGolomb(unit);
      eg.readUByte();
      var profileIdc = eg.readUByte();
      var profileCompatibility = eg.readUByte();
      var levelIdc = eg.readUByte();
      eg.skipUEG();
      var chromaFormat = 420;
      if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128 || profileIdc === 138 || profileIdc === 144) {
        var chromaFormatIdc = eg.readUEG();
        if (chromaFormatIdc <= 3)
          chromaFormat = [0, 420, 422, 444][chromaFormatIdc];
        if (chromaFormatIdc === 3)
          eg.skipBits(1);
        eg.skipUEG();
        eg.skipUEG();
        eg.skipBits(1);
        if (eg.readBool()) {
          var scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
          for (var i = 0; i < scalingListCount; i++) {
            if (eg.readBool()) {
              if (i < 6) {
                eg.skipScalingList(16);
              } else {
                eg.skipScalingList(64);
              }
            }
          }
        }
      }
      eg.skipUEG();
      var picOrderCntType = eg.readUEG();
      if (picOrderCntType === 0) {
        eg.readUEG();
      } else if (picOrderCntType === 1) {
        eg.skipBits(1);
        eg.skipUEG();
        eg.skipUEG();
        var numRefFramesInPicOrderCntCycle = eg.readUEG();
        for (var _i2 = 0; _i2 < numRefFramesInPicOrderCntCycle; _i2++) {
          eg.skipUEG();
        }
      }
      eg.skipUEG();
      eg.skipBits(1);
      var picWidthInMbsMinus1 = eg.readUEG();
      var picHeightInMapUnitsMinus1 = eg.readUEG();
      var frameMbsOnlyFlag = eg.readBits(1);
      if (frameMbsOnlyFlag === 0)
        eg.skipBits(1);
      eg.skipBits(1);
      var frameCropLeftOffset = 0;
      var frameCropRightOffset = 0;
      var frameCropTopOffset = 0;
      var frameCropBottomOffset = 0;
      if (eg.readBool()) {
        frameCropLeftOffset = eg.readUEG();
        frameCropRightOffset = eg.readUEG();
        frameCropTopOffset = eg.readUEG();
        frameCropBottomOffset = eg.readUEG();
      }
      var sarRatio;
      var fixedFrame;
      var fpsNum;
      var fpsDen;
      var fps;
      if (eg.readBool()) {
        if (eg.readBool()) {
          var aspectRatioIdc = eg.readUByte();
          switch (aspectRatioIdc) {
            case 1:
              sarRatio = [1, 1];
              break;
            case 2:
              sarRatio = [12, 11];
              break;
            case 3:
              sarRatio = [10, 11];
              break;
            case 4:
              sarRatio = [16, 11];
              break;
            case 5:
              sarRatio = [40, 33];
              break;
            case 6:
              sarRatio = [24, 11];
              break;
            case 7:
              sarRatio = [20, 11];
              break;
            case 8:
              sarRatio = [32, 11];
              break;
            case 9:
              sarRatio = [80, 33];
              break;
            case 10:
              sarRatio = [18, 11];
              break;
            case 11:
              sarRatio = [15, 11];
              break;
            case 12:
              sarRatio = [64, 33];
              break;
            case 13:
              sarRatio = [160, 99];
              break;
            case 14:
              sarRatio = [4, 3];
              break;
            case 15:
              sarRatio = [3, 2];
              break;
            case 16:
              sarRatio = [2, 1];
              break;
            case 255: {
              sarRatio = [eg.readUByte() << 8 | eg.readUByte(), eg.readUByte() << 8 | eg.readUByte()];
              break;
            }
          }
        }
        if (eg.readBool())
          eg.readBool();
        if (eg.readBool()) {
          eg.readBits(4);
          if (eg.readBool())
            eg.readBits(24);
        }
        if (eg.readBool()) {
          eg.readUEG();
          eg.readUEG();
        }
        if (eg.readBool()) {
          var numUnitsInTick = eg.readBits(32);
          var timeScale = eg.readBits(32);
          fixedFrame = eg.readBool();
          fpsNum = timeScale;
          fpsDen = numUnitsInTick * 2;
          fps = fpsNum / fpsDen;
        }
      }
      return {
        codec: getAvcCodec(unit.subarray(1, 4)),
        profileIdc,
        profileCompatibility,
        levelIdc,
        chromaFormat,
        width: Math.ceil((picWidthInMbsMinus1 + 1) * 16 - 2 * (frameCropLeftOffset + frameCropRightOffset)),
        height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset),
        sarRatio,
        fpsNum,
        fpsDen,
        fps,
        fixedFrame
      };
    }
  }]);
  return AVC2;
}();

// node_modules/xgplayer-transmuxer/es/codec/hevc.js
var HEVC = /* @__PURE__ */ function() {
  function HEVC2() {
    _classCallCheck3(this, HEVC2);
  }
  _createClass3(HEVC2, null, [{
    key: "parseHEVCDecoderConfigurationRecord",
    value: function parseHEVCDecoderConfigurationRecord(data) {
      var hvcC = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (data.length < 23)
        return;
      hvcC = hvcC || {};
      var nalUnitSize = (data[21] & 3) + 1;
      var vpsParsed;
      var spsParsed;
      var spsArr = [];
      var ppsArr = [];
      var vpsArr = [];
      var offset = 23;
      var numOfArrays = data[22];
      var nalUnitType;
      var numNalus;
      var nalSize;
      for (var i = 0; i < numOfArrays; i++) {
        nalUnitType = data[offset] & 63;
        numNalus = data[offset + 1] << 8 | data[offset + 2];
        offset += 3;
        for (var j = 0; j < numNalus; j++) {
          nalSize = data[offset] << 8 | data[offset + 1];
          offset += 2;
          if (!nalSize)
            continue;
          switch (nalUnitType) {
            case 32:
              {
                var vps = data.subarray(offset, offset + nalSize);
                if (!vpsParsed)
                  vpsParsed = HEVC2.parseVPS(NALu.removeEPB(vps), hvcC);
                vpsArr.push(vps);
              }
              break;
            case 33:
              {
                var sps = data.subarray(offset, offset + nalSize);
                if (!spsParsed)
                  spsParsed = HEVC2.parseSPS(NALu.removeEPB(sps), hvcC);
                spsArr.push(sps);
              }
              break;
            case 34:
              ppsArr.push(data.subarray(offset, offset + nalSize));
              break;
          }
          offset += nalSize;
        }
      }
      return {
        hvcC,
        sps: spsParsed,
        spsArr,
        ppsArr,
        vpsArr,
        nalUnitSize
      };
    }
  }, {
    key: "parseVPS",
    value: function parseVPS(unit, hvcC) {
      hvcC = hvcC || {};
      var eg = new ExpGolomb(unit);
      eg.readUByte();
      eg.readUByte();
      eg.readBits(12);
      var vpsMaxSubLayersMinus1 = eg.readBits(3);
      hvcC.numTemporalLayers = Math.max(hvcC.numTemporalLayers || 0, vpsMaxSubLayersMinus1 + 1);
      eg.readBits(17);
      HEVC2._parseProfileTierLevel(eg, vpsMaxSubLayersMinus1, hvcC);
      return hvcC;
    }
  }, {
    key: "parseSPS",
    value: function parseSPS(unit) {
      var hvcC = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      hvcC = hvcC || {};
      var eg = new ExpGolomb(unit);
      eg.readUByte();
      eg.readUByte();
      eg.readBits(4);
      var spsMaxSubLayersMinus1 = eg.readBits(3);
      hvcC.numTemporalLayers = Math.max(spsMaxSubLayersMinus1 + 1, hvcC.numTemporalLayers || 0);
      hvcC.temporalIdNested = eg.readBits(1);
      HEVC2._parseProfileTierLevel(eg, spsMaxSubLayersMinus1, hvcC);
      eg.readUEG();
      var chromaFormatIdc = hvcC.chromaFormatIdc = eg.readUEG();
      var chromaFormat = 420;
      if (chromaFormatIdc <= 3)
        chromaFormat = [0, 420, 422, 444][chromaFormatIdc];
      var separateColourPlaneFlag = 0;
      if (chromaFormatIdc === 3) {
        separateColourPlaneFlag = eg.readBits(1);
      }
      var width = eg.readUEG();
      var height = eg.readUEG();
      var conformanceWindowFlag = eg.readBits(1);
      var confWinLeftOffset;
      var confWinRightOffset;
      var confWinTopOffset;
      var confWinBottomOffset;
      if (conformanceWindowFlag === 1) {
        confWinLeftOffset = eg.readUEG();
        confWinRightOffset = eg.readUEG();
        confWinTopOffset = eg.readUEG();
        confWinBottomOffset = eg.readUEG();
      }
      hvcC.bitDepthLumaMinus8 = eg.readUEG();
      hvcC.bitDepthChromaMinus8 = eg.readUEG();
      if (conformanceWindowFlag === 1) {
        var subWidthC = (chromaFormatIdc === 1 || chromaFormatIdc === 2) && separateColourPlaneFlag === 0 ? 2 : 1;
        var subHeightC = chromaFormatIdc === 1 && separateColourPlaneFlag === 0 ? 2 : 1;
        width -= subWidthC * (confWinRightOffset + confWinLeftOffset);
        height -= subHeightC * (confWinBottomOffset + confWinTopOffset);
      }
      return {
        codec: "hev1.1.6.L93.B0",
        width,
        height,
        chromaFormat,
        hvcC
      };
    }
  }, {
    key: "_parseProfileTierLevel",
    value: function _parseProfileTierLevel(eg, maxSubLayersMinus1, hvcC) {
      var generalTierFlag = hvcC.generalTierFlag || 0;
      hvcC.generalProfileSpace = eg.readBits(2);
      hvcC.generalTierFlag = Math.max(eg.readBits(1), generalTierFlag);
      hvcC.generalProfileIdc = Math.max(eg.readBits(5), hvcC.generalProfileIdc || 0);
      hvcC.generalProfileCompatibilityFlags = eg.readBits(32);
      hvcC.generalConstraintIndicatorFlags = [eg.readBits(8), eg.readBits(8), eg.readBits(8), eg.readBits(8), eg.readBits(8), eg.readBits(8)];
      var generalLevelIdc = eg.readBits(8);
      if (generalTierFlag < hvcC.generalTierFlag) {
        hvcC.generalLevelIdc = generalLevelIdc;
      } else {
        hvcC.generalLevelIdc = Math.max(generalLevelIdc, hvcC.generalLevelIdc || 0);
      }
      var subLayerProfilePresentFlag = [];
      var subLayerLevelPresentFlag = [];
      if (maxSubLayersMinus1 > eg.bitsAvailable) {
        throw new Error("maxSubLayersMinus inavlid size ".concat(maxSubLayersMinus1));
      }
      for (var j = 0; j < maxSubLayersMinus1; j++) {
        subLayerProfilePresentFlag[j] = eg.readBits(1);
        subLayerLevelPresentFlag[j] = eg.readBits(1);
      }
      if (maxSubLayersMinus1 > 0) {
        eg.readBits((8 - maxSubLayersMinus1) * 2);
      }
      for (var i = 0; i < maxSubLayersMinus1; i++) {
        if (subLayerProfilePresentFlag[i] !== 0) {
          eg.readBits(2);
          eg.readBits(1);
          eg.readBits(5);
          eg.readBits(16);
          eg.readBits(16);
          eg.readBits(4);
          eg.readBits(16);
          eg.readBits(16);
          eg.readBits(12);
        }
        if (subLayerLevelPresentFlag[i] !== 0) {
          eg.readBits(8);
        }
      }
    }
  }]);
  return HEVC2;
}();

// node_modules/xgplayer-transmuxer/es/utils/utf8.js
var UTF8 = /* @__PURE__ */ function() {
  function UTF82() {
    _classCallCheck3(this, UTF82);
  }
  _createClass3(UTF82, null, [{
    key: "decode",
    value: function decode(uint8array) {
      var out = [];
      var input = uint8array;
      var i = 0;
      var length = uint8array.length;
      while (i < length) {
        if (input[i] < 128) {
          out.push(String.fromCharCode(input[i]));
          ++i;
          continue;
        } else if (input[i] < 192)
          ;
        else if (input[i] < 224) {
          if (UTF82._checkContinuation(input, i, 1)) {
            var ucs4 = (input[i] & 31) << 6 | input[i + 1] & 63;
            if (ucs4 >= 128) {
              out.push(String.fromCharCode(ucs4 & 65535));
              i += 2;
              continue;
            }
          }
        } else if (input[i] < 240) {
          if (UTF82._checkContinuation(input, i, 2)) {
            var _ucs = (input[i] & 15) << 12 | (input[i + 1] & 63) << 6 | input[i + 2] & 63;
            if (_ucs >= 2048 && (_ucs & 63488) !== 55296) {
              out.push(String.fromCharCode(_ucs & 65535));
              i += 3;
              continue;
            }
          }
        } else if (input[i] < 248) {
          if (UTF82._checkContinuation(input, i, 3)) {
            var _ucs2 = (input[i] & 7) << 18 | (input[i + 1] & 63) << 12 | (input[i + 2] & 63) << 6 | input[i + 3] & 63;
            if (_ucs2 > 65536 && _ucs2 < 1114112) {
              _ucs2 -= 65536;
              out.push(String.fromCharCode(_ucs2 >>> 10 | 55296));
              out.push(String.fromCharCode(_ucs2 & 1023 | 56320));
              i += 4;
              continue;
            }
          }
        }
        out.push(String.fromCharCode(65533));
        ++i;
      }
      return out.join("");
    }
  }, {
    key: "_checkContinuation",
    value: function _checkContinuation(uint8array, start, checkLength) {
      var array = uint8array;
      if (start + checkLength < array.length) {
        while (checkLength--) {
          if ((array[++start] & 192) !== 128) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    }
  }]);
  return UTF82;
}();

// node_modules/xgplayer-transmuxer/es/flv/amf.js
var AMF = /* @__PURE__ */ function() {
  function AMF2() {
    _classCallCheck3(this, AMF2);
  }
  _createClass3(AMF2, null, [{
    key: "parse",
    value: function parse3(data) {
      if (data.length < 3)
        return;
      var ret = {};
      var name = AMF2._parseValue(new DataView(data.buffer, data.byteOffset, data.byteLength));
      var value = AMF2._parseValue(new DataView(data.buffer, data.byteOffset + name.size, data.byteLength - name.size));
      ret[name.data] = value.data;
      return ret;
    }
  }, {
    key: "_parseValue",
    value: function _parseValue(view) {
      var dataLen = view.byteLength;
      var type = view.getUint8(0);
      var offset = 1;
      var isEnd = false;
      var value;
      switch (type) {
        case 0:
          value = view.getFloat64(1);
          offset += 8;
          break;
        case 1: {
          value = !!view.getUint8(1);
          offset += 1;
          break;
        }
        case 2:
          {
            var _AMF$_parseString = AMF2._parseString(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset)), data = _AMF$_parseString.data, size = _AMF$_parseString.size;
            value = data;
            offset += size;
          }
          break;
        case 3:
          {
            value = {};
            var terminal = 0;
            if ((view.getUint32(dataLen - 4) & 16777215) === 9) {
              terminal = 3;
            }
            while (offset < dataLen - 4) {
              var _AMF$_parseObject = AMF2._parseObject(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset - terminal)), _size = _AMF$_parseObject.size, _data = _AMF$_parseObject.data, _isEnd = _AMF$_parseObject.isEnd;
              if (_isEnd)
                break;
              value[_data.name] = _data.value;
              offset += _size;
            }
            if (offset <= dataLen - 3) {
              var marker = view.getUint32(offset - 1) & 16777215;
              if (marker === 9)
                offset += 3;
            }
          }
          break;
        case 8:
          {
            value = {};
            offset += 4;
            var _terminal = 0;
            if ((view.getUint32(dataLen - 4) & 16777215) === 9) {
              _terminal = 3;
            }
            while (offset < dataLen - 8) {
              var _AMF$_parseObject2 = AMF2._parseObject(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset - _terminal)), _size2 = _AMF$_parseObject2.size, _data2 = _AMF$_parseObject2.data, _isEnd2 = _AMF$_parseObject2.isEnd;
              if (_isEnd2)
                break;
              value[_data2.name] = _data2.value;
              offset += _size2;
            }
            if (offset <= dataLen - 3) {
              var _marker = view.getUint32(offset - 1) & 16777215;
              if (_marker === 9) {
                offset += 3;
              }
            }
          }
          break;
        case 9:
          value = void 0;
          offset = 1;
          isEnd = true;
          break;
        case 10:
          {
            value = [];
            var strictArrayLength = view.getUint32(1);
            offset += 4;
            for (var i = 0; i < strictArrayLength; i++) {
              var _AMF$_parseValue = AMF2._parseValue(new DataView(view.buffer, view.byteOffset + offset, view.byteLength - offset)), _data3 = _AMF$_parseValue.data, _size3 = _AMF$_parseValue.size;
              value.push(_data3);
              offset += _size3;
            }
          }
          break;
        case 11:
          {
            var timestamp = view.getFloat64(offset) + view.getInt16(offset + 8) * 6e4;
            value = new Date(timestamp);
            offset += 10;
          }
          break;
        case 12:
          {
            var length = view.getUint32(1);
            offset += 4;
            value = "";
            if (length > 0) {
              value = UTF8.decode(new Uint8Array(view.buffer, view.byteOffset + offset, length));
            }
            offset += length;
          }
          break;
        default:
          offset = dataLen;
          break;
      }
      return {
        data: value,
        size: offset,
        isEnd
      };
    }
  }, {
    key: "_parseString",
    value: function _parseString(view) {
      var length = view.getUint16(0);
      var data = "";
      if (length > 0) {
        data = UTF8.decode(new Uint8Array(view.buffer, view.byteOffset + 2, length));
      }
      return {
        data,
        size: 2 + length
      };
    }
  }, {
    key: "_parseObject",
    value: function _parseObject(view) {
      if (view.byteLength < 3)
        return;
      var name = AMF2._parseString(view);
      var value = AMF2._parseValue(new DataView(view.buffer, view.byteOffset + name.size, view.byteLength - name.size));
      return {
        data: {
          name: name.data,
          value: value.data
        },
        size: name.size + value.size,
        isEnd: value.isEnd
      };
    }
  }]);
  return AMF2;
}();

// node_modules/xgplayer-transmuxer/es/flv/soundFormat.js
var FlvSoundFormat = {
  MP3: 2,
  G711A: 7,
  G711M: 8,
  AAC: 10,
  OPUS: 13
};

// node_modules/xgplayer-transmuxer/es/flv/index.js
var logger = new Logger2("FlvDemuxer");
var FlvDemuxer = /* @__PURE__ */ function() {
  function FlvDemuxer2(videoTrack, audioTrack, metadataTrack) {
    _classCallCheck3(this, FlvDemuxer2);
    _defineProperty3(this, "_headerParsed", false);
    _defineProperty3(this, "_remainingData", null);
    _defineProperty3(this, "_gopId", 0);
    _defineProperty3(this, "_needAddMetaBeforeKeyFrameNal", true);
    this.videoTrack = videoTrack || new VideoTrack();
    this.audioTrack = audioTrack || new AudioTrack();
    this.metadataTrack = metadataTrack || new MetadataTrack();
    this._fixer = new FlvFixer(this.videoTrack, this.audioTrack, this.metadataTrack);
  }
  _createClass3(FlvDemuxer2, [{
    key: "demux",
    value: function demux(data) {
      var _scriptDataObject$dat;
      var discontinuity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var contiguous = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      var seamlessLoadingSwitching = arguments.length > 3 ? arguments[3] : void 0;
      var audioTrack = this.audioTrack, videoTrack = this.videoTrack, metadataTrack = this.metadataTrack;
      if (discontinuity || !contiguous) {
        this._remainingData = null;
      }
      if (discontinuity) {
        this._headerParsed = false;
      }
      if (discontinuity) {
        videoTrack.reset();
        audioTrack.reset();
        metadataTrack.reset();
      } else {
        videoTrack.samples = [];
        audioTrack.samples = [];
        metadataTrack.seiSamples = [];
        metadataTrack.flvScriptSamples = [];
        videoTrack.warnings = [];
        audioTrack.warnings = [];
        if (this._remainingData) {
          data = concatUint8Array2(this._remainingData, data);
          this._remainingData = null;
        }
      }
      if (!data.length) {
        return {
          videoTrack,
          audioTrack,
          metadataTrack
        };
      }
      var offset = 0;
      if (!this._headerParsed) {
        if (!FlvDemuxer2.probe(data)) {
          throw new Error("Invalid flv file");
        }
        audioTrack.present = (data[4] & 4) >>> 2 !== 0;
        videoTrack.present = (data[4] & 1) !== 0;
        this._headerParsed = true;
        offset = readBig32(data, 5) + 4;
      }
      var dataLen = data.length;
      var tagType;
      var dataSize;
      var timestamp;
      var bodyData;
      var prevTagSize;
      while (offset + 15 < dataLen) {
        tagType = data[offset];
        dataSize = data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3];
        if (offset + 15 + dataSize > dataLen)
          break;
        timestamp = (data[offset + 7] << 24 >>> 0) + (data[offset + 4] << 16) + (data[offset + 5] << 8) + data[offset + 6];
        offset += 11;
        bodyData = data.subarray(offset, offset + dataSize);
        if (tagType === 8) {
          this._parseAudio(bodyData, timestamp);
        } else if (tagType === 9) {
          if (seamlessLoadingSwitching)
            this.seamlessLoadingSwitching = true;
          this._parseVideo(bodyData, timestamp);
        } else if (tagType === 18) {
          this._parseScript(bodyData, timestamp);
        } else {
          logger.warn("Invalid tag type: ".concat(tagType));
        }
        offset += dataSize;
        prevTagSize = readBig32(data, offset);
        if (prevTagSize !== 11 + dataSize) {
          logger.warn("Invalid PrevTagSize ".concat(prevTagSize, " (").concat(11 + dataSize, ")"));
        }
        offset += 4;
      }
      if (offset < dataLen) {
        this._remainingData = data.subarray(offset);
      }
      audioTrack.formatTimescale = videoTrack.formatTimescale = videoTrack.timescale = metadataTrack.timescale = 1e3;
      audioTrack.timescale = audioTrack.codecType === AudioCodecType.OPUS ? 1e3 : audioTrack.sampleRate || 0;
      if (!audioTrack.exist() && audioTrack.hasSample()) {
        audioTrack.reset();
      }
      if (!videoTrack.exist() && videoTrack.hasSample()) {
        videoTrack.reset();
      }
      var scriptDataObject = metadataTrack.flvScriptSamples[metadataTrack.flvScriptSamples.length - 1];
      var metaData = scriptDataObject === null || scriptDataObject === void 0 ? void 0 : (_scriptDataObject$dat = scriptDataObject.data) === null || _scriptDataObject$dat === void 0 ? void 0 : _scriptDataObject$dat.onMetaData;
      if (metaData) {
        if (videoTrack !== null && videoTrack !== void 0 && videoTrack.exist()) {
          if (metaData.hasOwnProperty("duration")) {
            videoTrack.duration = metaData.duration * 1e3;
          }
          if (metaData.hasOwnProperty("width") && metaData.hasOwnProperty("height")) {
            videoTrack.width = metaData.width;
            videoTrack.height = metaData.height;
          }
        }
        if (audioTrack !== null && audioTrack !== void 0 && audioTrack.exist()) {
          if (metaData.hasOwnProperty("duration")) {
            audioTrack.duration = metaData.duration * 1e3;
          }
        }
      }
      return {
        videoTrack,
        audioTrack,
        metadataTrack
      };
    }
  }, {
    key: "fix",
    value: function fix(startTime, discontinuity, contiguous) {
      this._fixer.fix(startTime, discontinuity, contiguous);
      return {
        videoTrack: this.videoTrack,
        audioTrack: this.audioTrack,
        metadataTrack: this.metadataTrack
      };
    }
  }, {
    key: "demuxAndFix",
    value: function demuxAndFix(data, discontinuity, contiguous, startTime, seamlessLoadingSwitching) {
      this.demux(data, discontinuity, contiguous, seamlessLoadingSwitching);
      return this.fix(startTime, discontinuity, contiguous);
    }
  }, {
    key: "_parseAudio",
    value: function _parseAudio(data, pts) {
      if (!data.length)
        return;
      var format = (data[0] & 240) >>> 4;
      var track = this.audioTrack;
      if (format !== FlvSoundFormat.AAC && format !== FlvSoundFormat.G711A && format !== FlvSoundFormat.G711M && format !== FlvSoundFormat.OPUS) {
        logger.warn("Unsupported sound format: ".concat(format));
        track.reset();
        return;
      }
      if (format !== FlvSoundFormat.AAC && format !== FlvSoundFormat.OPUS) {
        var soundRate = (data[0] & 12) >> 2;
        var soundSize = (data[0] & 2) >> 1;
        var soundType = data[0] & 1;
        track.sampleRate = FlvDemuxer2.AUDIO_RATE[soundRate];
        track.sampleSize = soundSize ? 16 : 8;
        track.channelCount = soundType + 1;
      }
      switch (format) {
        case FlvSoundFormat.G711A:
        case FlvSoundFormat.G711M:
          this._parseG711(data, pts, format);
          break;
        case FlvSoundFormat.AAC:
          this._parseAac(data, pts);
          break;
        case FlvSoundFormat.OPUS:
          this._parseOpus(data, pts);
          break;
      }
    }
  }, {
    key: "_parseOpus",
    value: function _parseOpus(data, pts) {
      var track = this.audioTrack;
      var packetType = data[1];
      track.codecType = AudioCodecType.OPUS;
      switch (packetType) {
        case 0: {
          var ret = OPUS.parseHeaderPackets(data.subarray(2));
          if (ret) {
            track.codec = ret.codec;
            track.channelCount = ret.channelCount;
            track.sampleRate = ret.sampleRate;
            track.config = ret.config;
            track.sampleDuration = OPUS.getFrameDuration([], track.timescale);
          } else {
            track.reset();
            logger.warn("Cannot parse AudioSpecificConfig", data);
          }
          break;
        }
        case 1: {
          if (pts === void 0 || pts === null)
            return;
          var newSample = new AudioSample(pts, data.subarray(2), track.sampleDuration);
          track.samples.push(newSample);
          break;
        }
        default:
          logger.warn("Unknown OpusPacketType: ".concat(packetType));
      }
    }
  }, {
    key: "_parseG711",
    value: function _parseG711(data, pts, format) {
      var track = this.audioTrack;
      var audioData = data.subarray(1);
      if (audioData.byteLength < 1)
        return;
      var sample = new AudioSample(pts, audioData);
      track.codecType = format === 7 ? AudioCodecType.G711PCMA : AudioCodecType.G711PCMU;
      track.sampleRate = 8e3;
      track.codec = track.codecType;
      track.samples.push(sample);
    }
  }, {
    key: "_parseAac",
    value: function _parseAac(data, pts) {
      var track = this.audioTrack;
      track.codecType = AudioCodecType.AAC;
      if (data[1] === 0) {
        var ret = AAC.parseAudioSpecificConfig(data.subarray(2));
        if (ret) {
          track.codec = ret.codec;
          track.channelCount = ret.channelCount;
          track.sampleRate = ret.sampleRate;
          track.config = ret.config;
          track.objectType = ret.objectType;
          track.sampleRateIndex = ret.samplingFrequencyIndex;
        } else {
          track.reset();
          logger.warn("Cannot parse AudioSpecificConfig", data);
        }
      } else if (data[1] === 1) {
        if (pts === void 0 || pts === null)
          return;
        track.samples.push(new AudioSample(pts, data.subarray(2)));
      } else {
        logger.warn("Unknown AACPacketType: ".concat(data[1]));
      }
    }
  }, {
    key: "_parseVideo",
    value: function _parseVideo(data, dts) {
      var _this = this;
      if (data.length < 6)
        return;
      var frameType = (data[0] & 240) >>> 4;
      var codecId = data[0] & 15;
      var track = this.videoTrack;
      if (codecId !== 7 && codecId !== 12) {
        track.reset();
        logger.warn("Unsupported codecId: ".concat(codecId));
        return;
      }
      var isHevc = codecId === 12;
      track.codecType = isHevc ? VideoCodecType.HEVC : VideoCodecType.AVC;
      var packetType = data[1];
      var cts = (data[2] << 16 | data[3] << 8 | data[4]) << 8 >> 8;
      if (packetType === 0) {
        var configData = data.subarray(5);
        var ret = isHevc ? HEVC.parseHEVCDecoderConfigurationRecord(configData) : AVC.parseAVCDecoderConfigurationRecord(configData);
        if (ret) {
          var hvcC = ret.hvcC, sps = ret.sps, ppsArr = ret.ppsArr, spsArr = ret.spsArr, vpsArr = ret.vpsArr, nalUnitSize = ret.nalUnitSize;
          if (hvcC) {
            track.hvcC = track.hvcC || hvcC;
          }
          if (sps) {
            track.codec = sps.codec;
            track.width = sps.width;
            track.height = sps.height;
            track.sarRatio = sps.sarRatio;
            track.fpsNum = sps.fpsNum;
            track.fpsDen = sps.fpsDen;
          }
          if (spsArr.length)
            track.sps = spsArr;
          if (ppsArr.length)
            track.pps = ppsArr;
          if (vpsArr && vpsArr.length)
            track.vps = vpsArr;
          if (nalUnitSize)
            track.nalUnitSize = nalUnitSize;
        } else {
          logger.warn("Cannot parse ".concat(isHevc ? "HEVC" : "AVC", "DecoderConfigurationRecord"), data);
        }
      } else if (packetType === 1) {
        var units = NALu.parseAvcC(data.subarray(5), track.nalUnitSize);
        units = this._checkAddMetaNalToUnits(isHevc, units, track);
        if (units && units.length) {
          var sample = new VideoSample(dts + cts, dts, units);
          if (this.seamlessLoadingSwitching && dts < track.lastKeyFrameDts) {
            return;
          }
          this.seamlessLoadingSwitching = false;
          if (frameType === 1) {
            sample.setToKeyframe();
            track.lastKeyFrameDts = dts;
          }
          track.samples.push(sample);
          units.forEach(function(unit) {
            var type = isHevc ? unit[0] >>> 1 & 63 : unit[0] & 31;
            switch (type) {
              case 5:
              case 16:
              case 17:
              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
              case 23:
                if (!isHevc && type !== 5 || isHevc && type === 5)
                  break;
                sample.setToKeyframe();
                break;
              case 6:
              case 39:
              case 40:
                if (!isHevc && type !== 6 || isHevc && type === 6)
                  break;
                _this.metadataTrack.seiSamples.push(new SeiSample(NALu.parseSEI(NALu.removeEPB(unit), isHevc), dts + cts));
                break;
            }
          });
          if (sample.keyframe) {
            this._gopId++;
          }
          sample.gopId = this._gopId;
        } else {
          logger.warn("Cannot parse NALUs", data);
        }
      } else if (packetType === 2)
        ;
      else {
        logger.warn("Unknown AVCPacketType: ".concat(packetType));
      }
    }
  }, {
    key: "_checkAddMetaNalToUnits",
    value: function _checkAddMetaNalToUnits(hevc, units, track) {
      if (!hevc || !this._needAddMetaBeforeKeyFrameNal) {
        this._needAddMetaBeforeKeyFrameNal = false;
        return units;
      }
      var nalTypes = units.map(function(x) {
        return x[0] >>> 1 & 63;
      });
      if (nalTypes.includes(32)) {
        this._needAddMetaBeforeKeyFrameNal = false;
        return units;
      }
      units.unshift(track.pps[0]);
      units.unshift(track.sps[0]);
      units.unshift(track.vps[0]);
      return units.filter(Boolean);
    }
  }, {
    key: "_parseScript",
    value: function _parseScript(data, pts) {
      this.metadataTrack.flvScriptSamples.push(new FlvScriptSample(AMF.parse(data), pts));
    }
  }], [{
    key: "probe",
    value: function probe(data) {
      if (data[0] !== 70 || data[1] !== 76 || data[2] !== 86 || data[3] !== 1) {
        return false;
      }
      return readBig32(data, 5) >= 9;
    }
  }]);
  return FlvDemuxer2;
}();
_defineProperty3(FlvDemuxer, "AUDIO_RATE", [5500, 11e3, 22e3, 44e3]);

// node_modules/xgplayer-transmuxer/es/mp4/buffer.js
function Concat(ResultConstructor) {
  var totalLength = 0;
  for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }
  arrays.forEach(function(arr) {
    totalLength += arr.length;
  });
  var result = new ResultConstructor(totalLength);
  var offset = 0;
  arrays.forEach(function(arr) {
    result.set(arr, offset);
    offset += arr.length;
  });
  return result;
}
var Buffer3 = /* @__PURE__ */ function() {
  function Buffer22() {
    _classCallCheck3(this, Buffer22);
    this.buffer = new Uint8Array(0);
  }
  _createClass3(Buffer22, [{
    key: "write",
    value: function write() {
      var self = this;
      for (var _len2 = arguments.length, buffer = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        buffer[_key2] = arguments[_key2];
      }
      buffer.forEach(function(item) {
        if (item) {
          self.buffer = Concat(Uint8Array, self.buffer, item);
        } else {
          window.console.warn(item);
        }
      });
    }
  }], [{
    key: "writeUint16",
    value: function writeUint16(value) {
      return new Uint8Array([value >> 8 & 255, value & 255]);
    }
  }, {
    key: "writeUint32",
    value: function writeUint32(value) {
      return new Uint8Array([value >> 24, value >> 16 & 255, value >> 8 & 255, value & 255]);
    }
  }]);
  return Buffer22;
}();

// node_modules/xgplayer-transmuxer/es/mp4/mp4.js
var UINT32_MAX = Math.pow(2, 32) - 1;
var MP4 = /* @__PURE__ */ function() {
  function MP42() {
    _classCallCheck3(this, MP42);
  }
  _createClass3(MP42, null, [{
    key: "box",
    value: function box(type) {
      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }
      payload = payload.filter(Boolean);
      var size = 8 + payload.reduce(function(p, c) {
        return p + c.byteLength;
      }, 0);
      var ret = new Uint8Array(size);
      ret[0] = size >> 24 & 255;
      ret[1] = size >> 16 & 255;
      ret[2] = size >> 8 & 255;
      ret[3] = size & 255;
      ret.set(type, 4);
      var offset = 8;
      payload.forEach(function(data) {
        ret.set(data, offset);
        offset += data.byteLength;
      });
      return ret;
    }
  }, {
    key: "ftyp",
    value: function ftyp(tracks) {
      var isHevc = tracks.find(function(t) {
        return t.type === TrackType.VIDEO && t.codecType === VideoCodecType.HEVC;
      });
      return isHevc ? MP42.FTYPHEV1 : MP42.FTYPAVC1;
    }
  }, {
    key: "initSegment",
    value: function initSegment(tracks) {
      var ftyp = MP42.ftyp(tracks);
      var init = concatUint8Array2(ftyp, MP42.moov(tracks));
      return init;
    }
  }, {
    key: "pssh",
    value: function pssh(data) {
      var content = new Uint8Array([
        1,
        0,
        0,
        0
      ].concat([16, 119, 239, 236, 192, 178, 77, 2, 172, 227, 60, 30, 82, 226, 251, 75], [0, 0, 0, 1], parse2(data.kid), [0, 0, 0, 0]));
      return MP42.box(MP42.types.pssh, content);
    }
  }, {
    key: "moov",
    value: function moov(tracks) {
      if (tracks[0].useEME && (tracks[0].encv || tracks[0].enca)) {
        if (!tracks[0].pssh) {
          tracks[0].pssh = {
            kid: tracks[0].kid
          };
        }
        var pssh = this.pssh(tracks[0].pssh);
        return MP42.box.apply(MP42, [MP42.types.moov, MP42.mvhd(tracks[0].mvhdDurtion || tracks[0].duration, tracks[0].mvhdTimecale || tracks[0].timescale), MP42.mvex(tracks)].concat(_toConsumableArray(tracks.map(function(t) {
          return MP42.trak(t);
        })), [pssh]));
      } else {
        return MP42.box.apply(MP42, [MP42.types.moov, MP42.mvhd(tracks[0].mvhdDurtion || tracks[0].duration, tracks[0].mvhdTimecale || tracks[0].timescale)].concat(_toConsumableArray(tracks.map(function(t) {
          return MP42.trak(t);
        })), [MP42.mvex(tracks)]));
      }
    }
  }, {
    key: "mvhd",
    value: function mvhd(duration) {
      var timescale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9e4;
      var mvhd2 = MP42.box(MP42.types.mvhd, new Uint8Array([
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
        timescale >> 24 & 255,
        timescale >> 16 & 255,
        timescale >> 8 & 255,
        timescale & 255,
        duration >> 24 & 255,
        duration >> 16 & 255,
        duration >> 8 & 255,
        duration & 255,
        0,
        1,
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
        64,
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
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        255,
        255,
        255,
        255
      ]));
      return mvhd2;
    }
  }, {
    key: "trak",
    value: function trak(track) {
      var trak2 = MP42.box(MP42.types.trak, MP42.tkhd(track.id, track.tkhdDuration || 0, track.width, track.height), MP42.mdia(track));
      return trak2;
    }
  }, {
    key: "tkhd",
    value: function tkhd(id, duration) {
      var width = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      var height = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
      var tkhd2 = MP42.box(MP42.types.tkhd, new Uint8Array([
        0,
        0,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        id >> 24 & 255,
        id >> 16 & 255,
        id >> 8 & 255,
        id & 255,
        0,
        0,
        0,
        0,
        duration >> 24 & 255,
        duration >> 16 & 255,
        duration >> 8 & 255,
        duration & 255,
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
        64,
        0,
        0,
        0,
        width >> 8 & 255,
        width & 255,
        0,
        0,
        height >> 8 & 255,
        height & 255,
        0,
        0
      ]));
      return tkhd2;
    }
  }, {
    key: "mdia",
    value: function mdia(track) {
      var mdia2 = MP42.box(MP42.types.mdia, MP42.mdhd(track.duration, track.timescale), MP42.hdlr(track.type), MP42.minf(track));
      return mdia2;
    }
  }, {
    key: "mdhd",
    value: function mdhd(duration) {
      var timescale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 9e4;
      var mdhd2 = MP42.box(MP42.types.mdhd, new Uint8Array([
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
        timescale >> 24 & 255,
        timescale >> 16 & 255,
        timescale >> 8 & 255,
        timescale & 255,
        duration >> 24 & 255,
        duration >> 16 & 255,
        duration >> 8 & 255,
        duration & 255,
        85,
        196,
        0,
        0
      ]));
      return mdhd2;
    }
  }, {
    key: "hdlr",
    value: function hdlr(type) {
      var hdlr2 = MP42.box(MP42.types.hdlr, MP42.HDLR_TYPES[type]);
      return hdlr2;
    }
  }, {
    key: "minf",
    value: function minf(track) {
      var minf2 = MP42.box(MP42.types.minf, track.type === TrackType.VIDEO ? MP42.VMHD : MP42.SMHD, MP42.DINF, MP42.stbl(track));
      return minf2;
    }
  }, {
    key: "stbl",
    value: function stbl(track) {
      var extBox = [];
      if (track && track.ext) {
        track.ext.stss && extBox.push(MP42.stss(track.ext.stss.entries));
      }
      var stbl2 = MP42.box(MP42.types.stbl, MP42.stsd(track), MP42.STTS, extBox[0], MP42.STSC, MP42.STSZ, MP42.STCO);
      return stbl2;
    }
  }, {
    key: "stsd",
    value: function stsd(track) {
      var content;
      if (track.type === "audio") {
        if (track.useEME && track.enca) {
          content = MP42.enca(track);
        } else {
          if (track.codecType === AudioCodecType.OPUS) {
            content = MP42.opus(track);
          } else {
            content = MP42.mp4a(track);
          }
        }
      } else if (track.useEME && track.encv) {
        content = MP42.encv(track);
      } else if (track.av1C) {
        content = MP42.av01(track);
      } else {
        content = MP42.avc1hev1(track);
      }
      var stsd2 = MP42.box(MP42.types.stsd, new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1
      ]), content);
      return stsd2;
    }
  }, {
    key: "enca",
    value: function enca(data) {
      var channelCount = data.enca.channelCount;
      var sampleRate = data.enca.sampleRate;
      var content = new Uint8Array([
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
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        channelCount,
        0,
        16,
        0,
        0,
        0,
        0,
        sampleRate >> 8 & 255,
        sampleRate & 255,
        0,
        0
      ]);
      var esds = MP42.esds(data.config);
      var sinf = MP42.sinf(data.enca);
      return MP42.box(MP42.types.enca, content, esds, sinf);
    }
  }, {
    key: "encv",
    value: function encv(track) {
      var _concat$concat, _ref;
      var sps = track.sps.length > 0 ? track.sps[0] : [];
      var pps = track.pps.length > 0 ? track.pps[0] : [];
      var width = track.width;
      var height = track.height;
      var hSpacing = track.sarRatio[0];
      var vSpacing = track.sarRatio[1];
      var content = new Uint8Array([
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
        width >> 8 & 255,
        width & 255,
        height >> 8 & 255,
        height & 255,
        0,
        72,
        0,
        0,
        0,
        72,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        18,
        100,
        97,
        105,
        108,
        121,
        109,
        111,
        116,
        105,
        111,
        110,
        47,
        104,
        108,
        115,
        46,
        106,
        115,
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
        24,
        17,
        17
      ]);
      var avcc = new Uint8Array((_concat$concat = (_ref = [
        1,
        sps[1],
        sps[2],
        sps[3],
        252 | 3,
        224 | 1,
        sps.length >>> 8 & 255,
        sps.length & 255
      ]).concat.apply(_ref, _toConsumableArray(sps)).concat([1, pps.length >>> 8 & 255, pps.length & 255])).concat.apply(_concat$concat, _toConsumableArray(pps)));
      var btrt = new Uint8Array([0, 0, 88, 57, 0, 15, 200, 192, 0, 4, 86, 72]);
      var sinf = MP42.sinf(track.encv);
      var pasp = new Uint8Array([
        hSpacing >> 24,
        hSpacing >> 16 & 255,
        hSpacing >> 8 & 255,
        hSpacing & 255,
        vSpacing >> 24,
        vSpacing >> 16 & 255,
        vSpacing >> 8 & 255,
        vSpacing & 255
      ]);
      return MP42.box(MP42.types.encv, content, MP42.box(MP42.types.avcC, avcc), MP42.box(MP42.types.btrt, btrt), sinf, MP42.box(MP42.types.pasp, pasp));
    }
  }, {
    key: "schi",
    value: function schi(data) {
      var content = new Uint8Array([]);
      var tenc = MP42.tenc(data);
      return MP42.box(MP42.types.schi, content, tenc);
    }
  }, {
    key: "tenc",
    value: function tenc(data) {
      var content = new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        data.default_IsEncrypted & 255,
        data.default_IV_size & 255
      ].concat(parse2(data.default_KID)));
      return MP42.box(MP42.types.tenc, content);
    }
  }, {
    key: "sinf",
    value: function sinf(data) {
      var content = new Uint8Array([]);
      var frma = new Uint8Array([data.data_format.charCodeAt(0), data.data_format.charCodeAt(1), data.data_format.charCodeAt(2), data.data_format.charCodeAt(3)]);
      var schm = new Uint8Array([
        0,
        0,
        0,
        0,
        99,
        101,
        110,
        99,
        0,
        1,
        0,
        0
      ]);
      var schi = MP42.schi(data);
      return MP42.box(MP42.types.sinf, content, MP42.box(MP42.types.frma, frma), MP42.box(MP42.types.schm, schm), schi);
    }
  }, {
    key: "av01",
    value: function av01(track) {
      return MP42.box(MP42.types.av01, new Uint8Array([
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
        track.width >> 8 & 255,
        track.width & 255,
        track.height >> 8 & 255,
        track.height & 255,
        0,
        72,
        0,
        0,
        0,
        72,
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
        24,
        17,
        17
      ]), track.av1C, track.colr);
    }
  }, {
    key: "avc1hev1",
    value: function avc1hev1(track) {
      var isHevc = track.codecType === VideoCodecType.HEVC;
      var typ = isHevc ? MP42.types.hvc1 : MP42.types.avc1;
      var config = isHevc ? MP42.hvcC(track) : MP42.avcC(track);
      var boxes = [new Uint8Array([
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
        track.width >> 8 & 255,
        track.width & 255,
        track.height >> 8 & 255,
        track.height & 255,
        0,
        72,
        0,
        0,
        0,
        72,
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
        24,
        17,
        17
      ]), config];
      if (isHevc) {
        boxes.push(MP42.box(MP42.types.fiel, new Uint8Array([1, 0])));
      } else if (track.sarRatio && track.sarRatio.length > 1) {
        boxes.push(MP42.pasp(track.sarRatio));
      }
      return MP42.box.apply(MP42, [typ].concat(boxes));
    }
  }, {
    key: "avcC",
    value: function avcC(track) {
      var _concat$concat2, _ref2;
      var sps = [];
      var pps = [];
      var len;
      track.sps.forEach(function(s) {
        len = s.byteLength;
        sps.push(len >>> 8 & 255);
        sps.push(len & 255);
        sps.push.apply(sps, _toConsumableArray(s));
      });
      track.pps.forEach(function(p) {
        len = p.byteLength;
        pps.push(len >>> 8 & 255);
        pps.push(len & 255);
        pps.push.apply(pps, _toConsumableArray(p));
      });
      return MP42.box(MP42.types.avcC, new Uint8Array((_concat$concat2 = (_ref2 = [
        1,
        sps[3],
        sps[4],
        sps[5],
        252 | 3,
        224 | track.sps.length
      ]).concat.apply(_ref2, sps).concat([track.pps.length])).concat.apply(_concat$concat2, pps)));
    }
  }, {
    key: "hvcC",
    value: function hvcC(track) {
      var hvcC2 = track.hvcC;
      if (hvcC2 instanceof ArrayBuffer || hvcC2 instanceof Uint8Array)
        return hvcC2;
      var vps = track.vps, sps = track.sps, pps = track.pps;
      var data;
      if (hvcC2) {
        var pcf = hvcC2.generalProfileCompatibilityFlags;
        var cif = hvcC2.generalConstraintIndicatorFlags;
        var numOfArrays = (vps.length && 1) + (sps.length && 1) + (pps.length && 1);
        data = [
          1,
          hvcC2.generalProfileSpace << 6 | hvcC2.generalTierFlag << 5 | hvcC2.generalProfileIdc,
          pcf >>> 24,
          pcf >>> 16,
          pcf >>> 8,
          pcf,
          cif[0],
          cif[1],
          cif[2],
          cif[3],
          cif[4],
          cif[5],
          hvcC2.generalLevelIdc,
          240,
          0,
          252,
          hvcC2.chromaFormatIdc | 252,
          hvcC2.bitDepthLumaMinus8 | 248,
          hvcC2.bitDepthChromaMinus8 | 248,
          0,
          0,
          hvcC2.numTemporalLayers << 3 | hvcC2.temporalIdNested << 2 | 3,
          numOfArrays
        ];
        var write = function write2(x) {
          var _data;
          data.push(x.length >> 8, x.length);
          (_data = data).push.apply(_data, _toConsumableArray(x));
        };
        if (vps.length) {
          data.push(160, 0, vps.length);
          vps.forEach(write);
        }
        if (sps.length) {
          data.push(161, 0, sps.length);
          sps.forEach(write);
        }
        if (pps.length) {
          data.push(162, 0, pps.length);
          pps.forEach(write);
        }
      } else {
        data = [
          1,
          1,
          96,
          0,
          0,
          0,
          144,
          0,
          0,
          0,
          0,
          0,
          93,
          240,
          0,
          252,
          253,
          248,
          248,
          0,
          0,
          15,
          3,
          160,
          0,
          1,
          0,
          24,
          64,
          1,
          12,
          1,
          255,
          255,
          1,
          96,
          0,
          0,
          3,
          0,
          144,
          0,
          0,
          3,
          0,
          0,
          3,
          0,
          93,
          153,
          152,
          9,
          161,
          0,
          1,
          0,
          45,
          66,
          1,
          1,
          1,
          96,
          0,
          0,
          3,
          0,
          144,
          0,
          0,
          3,
          0,
          0,
          3,
          0,
          93,
          160,
          2,
          128,
          128,
          45,
          22,
          89,
          153,
          164,
          147,
          43,
          154,
          128,
          128,
          128,
          130,
          0,
          0,
          3,
          0,
          2,
          0,
          0,
          3,
          0,
          50,
          16,
          162,
          0,
          1,
          0,
          7,
          68,
          1,
          193,
          114,
          180,
          98,
          64
        ];
      }
      return MP42.box(MP42.types.hvcC, new Uint8Array(data));
    }
  }, {
    key: "pasp",
    value: function pasp(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), hSpacing = _ref4[0], vSpacing = _ref4[1];
      return MP42.box(MP42.types.pasp, new Uint8Array([hSpacing >> 24, hSpacing >> 16 & 255, hSpacing >> 8 & 255, hSpacing & 255, vSpacing >> 24, vSpacing >> 16 & 255, vSpacing >> 8 & 255, vSpacing & 255]));
    }
  }, {
    key: "mp4a",
    value: function mp4a(track) {
      return MP42.box(MP42.types.mp4a, new Uint8Array([
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
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        track.channelCount,
        0,
        16,
        0,
        0,
        0,
        0,
        track.sampleRate >> 8 & 255,
        track.sampleRate & 255,
        0,
        0
      ]), track.config.length ? MP42.esds(track.config) : void 0);
    }
  }, {
    key: "esds",
    value: function esds(config) {
      var len = config.length;
      var esds2 = MP42.box(MP42.types.esds, new Uint8Array([
        0,
        0,
        0,
        0,
        3,
        23 + len,
        0,
        0,
        0,
        4,
        15 + len,
        64,
        21,
        0,
        6,
        0,
        0,
        0,
        218,
        192,
        0,
        0,
        218,
        192,
        5
      ].concat([len]).concat(config).concat(
        [6, 1, 2]
      )));
      return esds2;
    }
  }, {
    key: "opus",
    value: function opus(track) {
      var opusAudioDescription = new Uint8Array([
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
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        track.channelCount,
        0,
        16,
        0,
        0,
        0,
        0,
        track.sampleRate >> 8 & 255,
        track.sampleRate & 255,
        0,
        0
      ]);
      var opusSpecificConfig = track.config.length ? MP42.dOps(track) : [];
      return MP42.box(MP42.types.Opus, opusAudioDescription, opusSpecificConfig);
    }
  }, {
    key: "dOps",
    value: function dOps(track) {
      if (track.config) {
        track.config[4] = track.sampleRate >>> 24 & 255;
        track.config[5] = track.sampleRate >>> 16 & 255;
        track.config[6] = track.sampleRate >>> 8 & 255;
        track.config[7] = track.sampleRate & 255;
        return MP42.box(MP42.types.dOps, track.config);
      }
    }
  }, {
    key: "mvex",
    value: function mvex(tracks) {
      var mvex2 = MP42.box.apply(MP42, [MP42.types.mvex].concat(_toConsumableArray(tracks.map(function(t) {
        return MP42.trex(t.id);
      }))));
      return mvex2;
    }
  }, {
    key: "trex",
    value: function trex(id) {
      var trex2 = MP42.box(MP42.types.trex, new Uint8Array([
        0,
        0,
        0,
        0,
        id >> 24,
        id >> 16 & 255,
        id >> 8 & 255,
        id & 255,
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
        0,
        1,
        0,
        1
      ]));
      return trex2;
    }
  }, {
    key: "trex1",
    value: function trex1(id) {
      var trex = MP42.box(MP42.types.trex, new Uint8Array([
        0,
        0,
        0,
        0,
        id >> 24,
        id >> 16 & 255,
        id >> 8 & 255,
        id & 255,
        0,
        0,
        0,
        1,
        0,
        0,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        0
      ]));
      return trex;
    }
  }, {
    key: "trex2",
    value: function trex2(id) {
      var trex = MP42.box(MP42.types.trex, new Uint8Array([
        0,
        0,
        0,
        0,
        id >> 24,
        id >> 16 & 255,
        id >> 8 & 255,
        id & 255,
        0,
        0,
        0,
        1,
        0,
        0,
        4,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        0
      ]));
      return trex;
    }
  }, {
    key: "moof",
    value: function moof(tracks) {
      var moof2 = MP42.box.apply(MP42, [MP42.types.moof, MP42.mfhd(tracks[0].samples ? tracks[0].samples[0].gopId : 0)].concat(_toConsumableArray(tracks.map(function(t) {
        return MP42.traf(t);
      }))));
      return moof2;
    }
  }, {
    key: "mfhd",
    value: function mfhd(sequenceNumber) {
      var mfhd2 = MP42.box(MP42.types.mfhd, new Uint8Array([
        0,
        0,
        0,
        0,
        sequenceNumber >> 24,
        sequenceNumber >> 16 & 255,
        sequenceNumber >> 8 & 255,
        sequenceNumber & 255
      ]));
      return mfhd2;
    }
  }, {
    key: "traf",
    value: function traf(track) {
      var tfhd = MP42.tfhd(track.id);
      var tfdt = MP42.tfdt(track, track.baseMediaDecodeTime);
      var sencLength = 0;
      var samples;
      if (track.isVideo && track.videoSenc) {
        samples = track.videoSenc;
        samples.forEach(function(item) {
          sencLength = sencLength + 8;
          if (item.subsamples && item.subsamples.length) {
            sencLength = sencLength + 2;
            sencLength = sencLength + item.subsamples.length * 6;
          }
        });
      }
      track.videoSencLength = sencLength;
      if (!track.useEME || !track.isVideoEncryption && !track.isAudioEncryption) {
        var sdtp = MP42.sdtp(track);
        var offset = 16 + 20 + 8 + 16 + 8 + 8;
        return MP42.box(MP42.types.traf, tfhd, tfdt, sdtp, MP42.trun(track.samples, sdtp.byteLength + offset));
      } else if (track.isVideoEncryption) {
        if (track.isVideo) {
          var saiz = MP42.saiz(track);
          var saio = MP42.saio(track);
          var trun = MP42.trun1(track);
          var senc = MP42.senc(track);
          var traf2 = MP42.box(MP42.types.traf, tfhd, tfdt, saiz, saio, trun, senc);
          return traf2;
        } else {
          if (!track.isAudioEncryption) {
            var sbgp = MP42.sbgp();
            var _trun = MP42.trun1(track);
            return MP42.box(MP42.types.traf, tfhd, tfdt, sbgp, _trun);
          } else {
            var _sbgp = MP42.sbgp();
            var _saiz = MP42.saiz(track);
            var _saio = MP42.saio(track);
            var _senc = MP42.senc(track);
            var _trun2 = MP42.trun1(track);
            var _traf = MP42.box(MP42.types.traf, tfhd, tfdt, _sbgp, _saiz, _saio, _senc, _trun2);
            return _traf;
          }
        }
      } else {
        if (track.isVideo) {
          var _trun3 = MP42.trun1(track);
          return MP42.box(MP42.types.traf, tfhd, tfdt, _trun3);
        } else {
          var _sbgp2 = MP42.sbgp();
          var _saiz2 = MP42.saiz(track);
          var _saio2 = MP42.saio(track);
          var _senc2 = MP42.senc(track);
          var _trun4 = MP42.trun1(track);
          var _traf2 = MP42.box(MP42.types.traf, tfhd, tfdt, _sbgp2, _saiz2, _saio2, _senc2, _trun4);
          return _traf2;
        }
      }
    }
  }, {
    key: "sdtp",
    value: function sdtp(data) {
      var buffer = new Buffer3();
      data.samples.forEach(function(item) {
        buffer.write(new Uint8Array(data.isVideo ? [item.keyframe ? 32 : 16] : [16]));
      });
      return MP42.box(MP42.types.sdtp, this.extension(0, 0), buffer.buffer);
    }
  }, {
    key: "trun1",
    value: function trun1(data) {
      var buffer = new Buffer3();
      var sampleCount = Buffer3.writeUint32(data.samples.length);
      var offset = null;
      if (data.isVideo) {
        var sencLength = data.videoSencLength;
        offset = Buffer3.writeUint32(data.samples.length * 16 + sencLength + 149);
        if (!data.isVideoEncryption && data.isAudioEncryption) {
          offset = Buffer3.writeUint32(data.samples.length * 16 + 92);
        }
      } else {
        var len = data.samples.length * 12 + 124;
        if (data.isAudioEncryption) {
          len = data.samples.length * 12 + 8 * data.audioSenc.length + 177;
        }
        offset = Buffer3.writeUint32(len);
      }
      data.samples.forEach(function(item) {
        buffer.write(Buffer3.writeUint32(item.duration));
        buffer.write(Buffer3.writeUint32(item.size));
        buffer.write(Buffer3.writeUint32(item.keyframe ? 33554432 : 65536));
        if (data.isVideo) {
          buffer.write(Buffer3.writeUint32(item.cts ? item.cts : 0));
        }
      });
      return MP42.box(MP42.types.trun, this.extension(0, data.flags), sampleCount, offset, buffer.buffer);
    }
  }, {
    key: "senc",
    value: function senc(data) {
      var buffer = new Buffer3();
      var len = data.samples.length;
      var ceil = data.isVideo ? 16 : 8;
      var flag = data.isVideo ? 2 : 0;
      var samples = [];
      var samplesLength = 0;
      if (data.isVideo) {
        samples = data.videoSenc;
        samplesLength = data.videoSencLength;
      } else {
        samples = data.audioSenc;
      }
      samplesLength = samplesLength || ceil * len;
      buffer.write(Buffer3.writeUint32(16 + samplesLength), MP42.types.senc, this.extension(0, flag));
      buffer.write(Buffer3.writeUint32(len));
      samples.forEach(function(item) {
        for (var i = 0; i < item.InitializationVector.length; i++) {
          buffer.write(new Uint8Array([item.InitializationVector[i]]));
        }
        if (item.subsamples && item.subsamples.length) {
          buffer.write(Buffer3.writeUint16(item.subsamples.length));
          item.subsamples.forEach(function(value) {
            buffer.write(Buffer3.writeUint16(value.BytesOfClearData));
            buffer.write(Buffer3.writeUint32(value.BytesOfProtectedData));
          });
        }
      });
      return buffer.buffer;
    }
  }, {
    key: "saio",
    value: function saio(data) {
      var length = data.samples.length * 12 + 141;
      if (!data.isVideo && data.isAudioEncryption) {
        length = 149;
      }
      var content = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, length >> 24 & 255, length >> 16 & 255, length >> 8 & 255, length & 255]);
      return MP42.box(MP42.types.saio, content);
    }
  }, {
    key: "saiz",
    value: function saiz(data) {
      var samplesLength = data.samples.length;
      var content = new Uint8Array([
        0,
        0,
        0,
        0,
        16,
        samplesLength >> 24 & 255,
        samplesLength >> 16 & 255,
        samplesLength >> 8 & 255,
        samplesLength & 255
      ]);
      return MP42.box(MP42.types.saiz, content);
    }
  }, {
    key: "sbgp",
    value: function sbgp() {
      var content = new Uint8Array([
        114,
        111,
        108,
        108,
        0,
        0,
        0,
        1,
        0,
        0,
        1,
        25,
        0,
        0,
        0,
        1
      ]);
      return MP42.box(MP42.types.sbgp, this.extension(0, 0), content);
    }
  }, {
    key: "extension",
    value: function extension(version, flag) {
      return new Uint8Array([version, flag >> 16 & 255, flag >> 8 & 255, flag & 255]);
    }
  }, {
    key: "tfhd",
    value: function tfhd(id) {
      return MP42.box(MP42.types.tfhd, new Uint8Array([
        0,
        0,
        0,
        0,
        id >> 24,
        id >> 16 & 255,
        id >> 8 & 255,
        id & 255
      ]));
    }
  }, {
    key: "tfdt",
    value: function tfdt(data, baseMediaDecodeTime) {
      var upperWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime / (UINT32_MAX + 1));
      var lowerWordBaseMediaDecodeTime = Math.floor(baseMediaDecodeTime % (UINT32_MAX + 1));
      if (data.useEME && (data.isVideoEncryption || data.isAudioEncryption)) {
        return MP42.box(MP42.types.tfdt, new Uint8Array([
          0,
          0,
          0,
          0,
          lowerWordBaseMediaDecodeTime >> 24,
          lowerWordBaseMediaDecodeTime >> 16 & 255,
          lowerWordBaseMediaDecodeTime >> 8 & 255,
          lowerWordBaseMediaDecodeTime & 255
        ]));
      } else {
        return MP42.box(MP42.types.tfdt, new Uint8Array([
          1,
          0,
          0,
          0,
          upperWordBaseMediaDecodeTime >> 24,
          upperWordBaseMediaDecodeTime >> 16 & 255,
          upperWordBaseMediaDecodeTime >> 8 & 255,
          upperWordBaseMediaDecodeTime & 255,
          lowerWordBaseMediaDecodeTime >> 24,
          lowerWordBaseMediaDecodeTime >> 16 & 255,
          lowerWordBaseMediaDecodeTime >> 8 & 255,
          lowerWordBaseMediaDecodeTime & 255
        ]));
      }
    }
  }, {
    key: "trun",
    value: function trun(samples, offset) {
      var sampleLen = samples.length;
      var dataLen = 12 + 16 * sampleLen;
      offset += 8 + dataLen;
      var data = new Uint8Array(dataLen);
      data.set([
        0,
        0,
        15,
        1,
        sampleLen >>> 24 & 255,
        sampleLen >>> 16 & 255,
        sampleLen >>> 8 & 255,
        sampleLen & 255,
        offset >>> 24 & 255,
        offset >>> 16 & 255,
        offset >>> 8 & 255,
        offset & 255
      ], 0);
      for (var i = 0; i < sampleLen; i++) {
        var _samples$i = samples[i], duration = _samples$i.duration, size = _samples$i.size, _samples$i$flag = _samples$i.flag, flag = _samples$i$flag === void 0 ? {} : _samples$i$flag, _samples$i$cts = _samples$i.cts, cts = _samples$i$cts === void 0 ? 0 : _samples$i$cts;
        data.set([
          duration >>> 24 & 255,
          duration >>> 16 & 255,
          duration >>> 8 & 255,
          duration & 255,
          size >>> 24 & 255,
          size >>> 16 & 255,
          size >>> 8 & 255,
          size & 255,
          flag.isLeading << 2 | (flag.dependsOn === null || flag.dependsOn === void 0 ? 1 : flag.dependsOn),
          flag.isDependedOn << 6 | flag.hasRedundancy << 4 | flag.paddingValue << 1 | (flag.isNonSyncSample === null || flag.isNonSyncSample === void 0 ? 1 : flag.isNonSyncSample),
          flag.degradationPriority & 240 << 8,
          flag.degradationPriority & 15,
          cts >>> 24 & 255,
          cts >>> 16 & 255,
          cts >>> 8 & 255,
          cts & 255
        ], 12 + 16 * i);
      }
      return MP42.box(MP42.types.trun, data);
    }
  }, {
    key: "moovMP4",
    value: function moovMP4(tracks) {
      return MP42.box.apply(MP42, [MP42.types.moov, MP42.mvhd(tracks[0].duration, tracks[0].timescale)].concat(_toConsumableArray(tracks.map(function(t) {
        return MP42.trackMP4(t);
      }))));
    }
  }, {
    key: "trackMP4",
    value: function trackMP4(track) {
      return MP42.box(MP42.types.trak, MP42.tkhd(track.id, track.duration, track.width, track.height), MP42.mdiaMP4(track));
    }
  }, {
    key: "mdiaMP4",
    value: function mdiaMP4(track) {
      return MP42.box(MP42.types.mdia, MP42.mdhd(track.duration, track.timescale), MP42.hdlr(track.type), MP42.minfMP4(track));
    }
  }, {
    key: "minfMP4",
    value: function minfMP4(track) {
      return MP42.box(MP42.types.minf, track.type === TrackType.VIDEO ? MP42.VMHD : MP42.SMHD, MP42.DINF, MP42.stblMP4(track));
    }
  }, {
    key: "stblMP4",
    value: function stblMP4(track) {
      var ext = track.ext;
      var boxes = [MP42.stsd(track), MP42.stts(ext.stts), MP42.stsc(ext.stsc), MP42.stsz(ext.stsz), MP42.stco(ext.stco)];
      if (ext.stss.length) {
        boxes.push(MP42.stss(ext.stss));
      }
      if (ext.ctts.length) {
        boxes.push(MP42.ctts(ext.ctts));
      }
      return MP42.box.apply(MP42, [MP42.types.stbl].concat(boxes));
    }
  }, {
    key: "stts",
    value: function stts(samples) {
      var len = samples.length;
      var data = new Uint8Array(8 * len);
      var offset = 0;
      samples.forEach(function(_ref5) {
        var value = _ref5.value, count = _ref5.count;
        data.set([count >> 24, count >> 16 & 255, count >> 8 & 255, count & 255, value >> 24, value >> 16 & 255, value >> 8 & 255, value & 255], offset);
        offset += 8;
      });
      return MP42.box(MP42.types.stts, concatUint8Array2(new Uint8Array([0, 0, 0, 0, len >> 24, len >> 16 & 255, len >> 8 & 255, len & 255]), data));
    }
  }, {
    key: "stsc",
    value: function stsc(entries) {
      var len = entries.length;
      var data = new Uint8Array(12 * len);
      var offset = 0;
      entries.forEach(function(_ref6) {
        var firstChunk = _ref6.firstChunk, samplesPerChunk = _ref6.samplesPerChunk, sampleDescIndex = _ref6.sampleDescIndex;
        data.set([firstChunk >> 24, firstChunk >> 16 & 255, firstChunk >> 8 & 255, firstChunk & 255, samplesPerChunk >> 24, samplesPerChunk >> 16 & 255, samplesPerChunk >> 8 & 255, samplesPerChunk & 255, sampleDescIndex >> 24, sampleDescIndex >> 16 & 255, sampleDescIndex >> 8 & 255, sampleDescIndex & 255], offset);
        offset += 12;
      });
      return MP42.box(MP42.types.stsc, concatUint8Array2(new Uint8Array([0, 0, 0, 0, len >> 24, len >> 16 & 255, len >> 8 & 255, len & 255]), data));
    }
  }, {
    key: "stsz",
    value: function stsz(samplesSizes) {
      var len = samplesSizes.length;
      var data = new Uint8Array(4 * len);
      var offset = 0;
      samplesSizes.forEach(function(x) {
        data.set([x >> 24, x >> 16 & 255, x >> 8 & 255, x & 255], offset);
        offset += 4;
      });
      return MP42.box(MP42.types.stsz, concatUint8Array2(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, len >> 24, len >> 16 & 255, len >> 8 & 255, len & 255]), data));
    }
  }, {
    key: "stco",
    value: function stco(offsets) {
      var len = offsets.length;
      var data = new Uint8Array(4 * len);
      var offset = 0;
      offsets.forEach(function(x) {
        data.set([x >> 24, x >> 16 & 255, x >> 8 & 255, x & 255], offset);
        offset += 4;
      });
      return MP42.box(MP42.types.stco, concatUint8Array2(new Uint8Array([0, 0, 0, 0, len >> 24, len >> 16 & 255, len >> 8 & 255, len & 255]), data));
    }
  }, {
    key: "stss",
    value: function stss(keyframeIndexes) {
      var len = keyframeIndexes.length;
      var data = new Uint8Array(4 * len);
      var offset = 0;
      keyframeIndexes.forEach(function(x) {
        data.set([x >> 24, x >> 16 & 255, x >> 8 & 255, x & 255], offset);
        offset += 4;
      });
      return MP42.box(MP42.types.stss, concatUint8Array2(new Uint8Array([0, 0, 0, 0, len >> 24, len >> 16 & 255, len >> 8 & 255, len & 255]), data));
    }
  }, {
    key: "ctts",
    value: function ctts(samples) {
      var len = samples.length;
      var data = new Uint8Array(8 * len);
      var offset = 0;
      samples.forEach(function(_ref7) {
        var value = _ref7.value, count = _ref7.count;
        data.set([count >> 24, count >> 16 & 255, count >> 8 & 255, count & 255, value >> 24, value >> 16 & 255, value >> 8 & 255, value & 255], offset);
        offset += 8;
      });
      return MP42.box(MP42.types.ctts, concatUint8Array2(new Uint8Array([0, 0, 0, 0, len >> 24, len >> 16 & 255, len >> 8 & 255, len & 255]), data));
    }
  }, {
    key: "styp",
    value: function styp() {
      return MP42.box(MP42.types.styp, new Uint8Array([109, 115, 100, 104, 0, 0, 0, 0, 109, 115, 100, 104, 109, 115, 105, 120]));
    }
  }, {
    key: "sidx",
    value: function sidx(data) {
      var timescale = data.timescale;
      var duration = data.samples[0].duration;
      var durationCount = duration * data.samples.length;
      var earliestTime = data.samples[0].sampleOffset * duration;
      var mdatSize = 8;
      data.samples.forEach(function(item) {
        mdatSize += item.size;
      });
      var length = 0;
      if (data.isVideo) {
        var sencLength = 0;
        var samples;
        if (data.videoSenc) {
          samples = data.videoSenc;
        }
        if (data.isVideo) {
          samples.forEach(function(item) {
            sencLength = sencLength + 8;
            if (item.subsamples && item.subsamples.length) {
              sencLength = sencLength + 2;
              sencLength = sencLength + item.subsamples.length * 6;
            }
          });
        }
        data.videoSencLength = sencLength;
        length = mdatSize + 141 + data.samples.length * 16 + sencLength;
        if (data.useEME && data.isAudioEncryption && !data.isVideoEncryption) {
          length = mdatSize + data.samples.length * 16 + 84;
        }
      } else {
        length = mdatSize + 116 + data.samples.length * 12;
        if (data.useEME && data.isAudioEncryption) {
          length = mdatSize + 169 + data.samples.length * 12 + 8 * data.audioSenc.length;
        }
      }
      var content = new Uint8Array([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        data.id & 255,
        timescale >> 24 & 255,
        timescale >> 16 & 255,
        timescale >> 8 & 255,
        timescale & 255,
        earliestTime >> 24 & 255,
        earliestTime >> 16 & 255,
        earliestTime >> 8 & 255,
        earliestTime & 255,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        length >> 16 & 255,
        length >> 8 & 255,
        length & 255,
        durationCount >> 24 & 255,
        durationCount >> 16 & 255,
        durationCount >> 8 & 255,
        durationCount & 255,
        144,
        0,
        0,
        0
      ]);
      return MP42.box(MP42.types.sidx, content);
    }
  }, {
    key: "mdat",
    value: function mdat(data) {
      var mdat2 = MP42.box(MP42.types.mdat, data);
      return mdat2;
    }
  }]);
  return MP42;
}();
_defineProperty3(MP4, "types", ["Opus", "dOps", "av01", "av1C", "avc1", "avcC", "hvc1", "hvcC", "dinf", "dref", "esds", "ftyp", "hdlr", "mdat", "mdhd", "mdia", "mfhd", "minf", "moof", "moov", "mp4a", "mvex", "mvhd", "pasp", "stbl", "stco", "stsc", "stsd", "stsz", "stts", "tfdt", "tfhd", "traf", "trak", "trex", "tkhd", "vmhd", "smhd", "ctts", "stss", "styp", "pssh", "sidx", "sbgp", "saiz", "saio", "senc", "trun", "encv", "enca", "sinf", "btrt", "frma", "tenc", "schm", "schi", "mehd", "fiel", "sdtp"].reduce(function(p, c) {
  p[c] = [c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2), c.charCodeAt(3)];
  return p;
}, /* @__PURE__ */ Object.create(null)));
_defineProperty3(MP4, "HDLR_TYPES", {
  video: new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    118,
    105,
    100,
    101,
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
    86,
    105,
    100,
    101,
    111,
    72,
    97,
    110,
    100,
    108,
    101,
    114,
    0
  ]),
  audio: new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    115,
    111,
    117,
    110,
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
    83,
    111,
    117,
    110,
    100,
    72,
    97,
    110,
    100,
    108,
    101,
    114,
    0
  ])
});
_defineProperty3(MP4, "FTYPAVC1", MP4.box(MP4.types.ftyp, new Uint8Array([
  105,
  115,
  111,
  109,
  0,
  0,
  0,
  1,
  105,
  115,
  111,
  109,
  97,
  118,
  99,
  49
])));
_defineProperty3(MP4, "FTYPHEV1", MP4.box(MP4.types.ftyp, new Uint8Array([
  105,
  115,
  111,
  109,
  0,
  0,
  0,
  1,
  105,
  115,
  111,
  109,
  104,
  101,
  118,
  49
])));
_defineProperty3(MP4, "DINF", MP4.box(MP4.types.dinf, MP4.box(MP4.types.dref, new Uint8Array([
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
  0,
  12,
  117,
  114,
  108,
  32,
  0,
  0,
  0,
  1
]))));
_defineProperty3(MP4, "VMHD", MP4.box(MP4.types.vmhd, new Uint8Array([
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
  0
])));
_defineProperty3(MP4, "SMHD", MP4.box(MP4.types.smhd, new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
])));
_defineProperty3(MP4, "StblTable", new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]));
_defineProperty3(MP4, "STTS", MP4.box(MP4.types.stts, MP4.StblTable));
_defineProperty3(MP4, "STSC", MP4.box(MP4.types.stsc, MP4.StblTable));
_defineProperty3(MP4, "STSZ", MP4.box(MP4.types.stsz, new Uint8Array([
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
  0
])));
_defineProperty3(MP4, "STCO", MP4.box(MP4.types.stco, MP4.StblTable));

// node_modules/xgplayer-transmuxer/es/mp4/logger.js
var Logger3 = /* @__PURE__ */ function() {
  function Logger22(name, enable) {
    _classCallCheck3(this, Logger22);
    this.name = name || "";
    this._prefix = "[".concat(this.name, "]");
    Logger22.disabled = enable;
  }
  _createClass3(Logger22, [{
    key: "debug",
    value: function debug() {
      var _console;
      if (Logger22.disabled)
        return;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      (_console = console).debug.apply(_console, [this._prefix].concat(args));
    }
  }, {
    key: "log",
    value: function log() {
      var _console2;
      if (Logger22.disabled)
        return;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      (_console2 = console).log.apply(_console2, [this._prefix].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _console3;
      if (Logger22.disabled)
        return;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      (_console3 = console).warn.apply(_console3, [this._prefix].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _console4;
      if (Logger22.disabled)
        return;
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      (_console4 = console).error.apply(_console4, [this._prefix].concat(args));
    }
  }, {
    key: "table",
    value: function table() {
      var _console5;
      if (Logger22.disabled)
        return;
      console.group(this._prefix);
      (_console5 = console).table.apply(_console5, arguments);
      console.groupEnd();
    }
  }], [{
    key: "enable",
    value: function enable() {
      Logger22.disabled = false;
    }
  }, {
    key: "disable",
    value: function disable() {
      Logger22.disabled = true;
    }
  }]);
  return Logger22;
}();
_defineProperty3(Logger3, "disabled", true);

// node_modules/xgplayer-transmuxer/es/mp4/fmp4-remuxer.js
var FMP4Remuxer = /* @__PURE__ */ function() {
  function FMP4Remuxer2(videoTrack, audioTrack, options) {
    _classCallCheck3(this, FMP4Remuxer2);
    this.videoTrack = videoTrack;
    this.audioTrack = audioTrack;
    var browserVersions = /Chrome\/([^.]+)/.exec(navigator.userAgent);
    this.forceFirstIDR = browserVersions && Number(browserVersions[1]) < 50;
    this.log = new Logger3("FMP4Remuxer", options && options.openLog ? !options.openLog : true);
  }
  _createClass3(FMP4Remuxer2, [{
    key: "remux",
    value: function remux() {
      var createInit = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var videoTrack = this.videoTrack;
      var audioTrack = this.audioTrack;
      var hasVideo = videoTrack.exist();
      var hasAudio = audioTrack.exist();
      var videoInitSegment;
      var audioInitSegment;
      var initSegment;
      var tracks = [];
      if (createInit) {
        if (options && options.initMerge) {
          if (hasVideo) {
            tracks.push(this.videoTrack);
          }
          if (hasAudio) {
            tracks.push(this.audioTrack);
          }
          initSegment = MP4.initSegment(tracks);
        } else {
          if (hasVideo)
            videoInitSegment = MP4.initSegment([this.videoTrack]);
          if (hasAudio)
            audioInitSegment = MP4.initSegment([this.audioTrack]);
        }
      }
      var videoSegment;
      var audioSegment;
      if (hasVideo && videoTrack.hasSample()) {
        videoSegment = this._remuxVideo();
      }
      if (hasAudio && audioTrack.hasSample()) {
        audioSegment = this._remuxAudio();
      }
      videoTrack.samples = [];
      audioTrack.samples = [];
      return {
        initSegment,
        videoInitSegment,
        audioInitSegment,
        videoSegment,
        audioSegment
      };
    }
  }, {
    key: "_remuxVideo",
    value: function _remuxVideo() {
      var track = this.videoTrack;
      if (this.forceFirstIDR) {
        track.samples[0].flag = {
          dependsOn: 2,
          isNonSyncSample: 0
        };
      }
      var samples = track.samples;
      var isAV01 = /av01/.test(track.codec);
      var mdatSize = 0;
      if (isAV01) {
        samples.forEach(function(s) {
          mdatSize += s.data.byteLength;
        });
      } else {
        samples.forEach(function(s) {
          mdatSize += s.units.reduce(function(t, c) {
            return t + c.byteLength;
          }, 0);
          mdatSize += s.units.length * 4;
        });
      }
      var mdata = new Uint8Array(mdatSize);
      if (isAV01) {
        for (var i = 0, l = samples.length, offset = 0, sample; i < l; i++) {
          sample = samples[i];
          mdata.set(sample.data, offset);
          sample.size = sample.data.byteLength;
          offset += sample.size;
        }
      } else {
        var mdatView = new DataView(mdata.buffer);
        var _loop = function _loop2(_offset2, _sample2) {
          _sample2 = samples[_i];
          var sampleSize = 0;
          _sample2.units.forEach(function(u) {
            mdatView.setUint32(_offset2, u.byteLength);
            _offset2 += 4;
            mdata.set(u, _offset2);
            _offset2 += u.byteLength;
            sampleSize += 4 + u.byteLength;
          });
          _sample2.size = sampleSize;
          _offset = _offset2, _sample = _sample2;
        };
        for (var _i = 0, _l = samples.length, _offset = 0, _sample; _i < _l; _i++) {
          _loop(_offset, _sample);
        }
      }
      var mdat = MP4.mdat(mdata);
      var moof = MP4.moof([track]);
      return concatUint8Array2(moof, mdat);
    }
  }, {
    key: "_remuxAudio",
    value: function _remuxAudio() {
      var track = this.audioTrack;
      var mdata = new Uint8Array(track.samples.reduce(function(t, c) {
        return t + c.size;
      }, 0));
      track.samples.reduce(function(offset, s) {
        mdata.set(s.data, offset);
        return offset + s.size;
      }, 0);
      var mdat = MP4.mdat(mdata);
      var moof = MP4.moof([track]);
      return concatUint8Array2(moof, mdat);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.videoTrack.reset();
      this.audioTrack.reset();
    }
  }]);
  return FMP4Remuxer2;
}();

// node_modules/xgplayer-flv/es/flv/services/transfer-cost.js
var TransferCost = /* @__PURE__ */ function() {
  function TransferCost2() {
    _classCallCheck(this, TransferCost2);
    _defineProperty(this, "_ttfb", 0);
    _defineProperty(this, "_demuxStart", 0);
    _defineProperty(this, "_demuxEnd", 0);
    _defineProperty(this, "_demuxCost", 0);
    _defineProperty(this, "_remuxStart", 0);
    _defineProperty(this, "_remuxEnd", 0);
    _defineProperty(this, "_remuxCost", 0);
    _defineProperty(this, "_appendStart", 0);
    _defineProperty(this, "_appendEnd", 0);
    _defineProperty(this, "_appendCost", 0);
  }
  _createClass(TransferCost2, [{
    key: "set",
    value: function set(event, value) {
      this["_".concat(event)] = value;
    }
  }, {
    key: "start",
    value: function start(event) {
      this["_".concat(event, "Start")] = Date.now();
    }
  }, {
    key: "end",
    value: function end(event) {
      this["_".concat(event, "End")] = Date.now();
      this["_".concat(event, "Cost")] = this["_".concat(event, "Cost")] + (this["_".concat(event, "End")] - this["_".concat(event, "Start")]);
    }
  }, {
    key: "transferCost",
    get: function get() {
      return {
        ttfbCost: this._ttfb,
        demuxCost: this._demuxCost,
        remuxCost: this._remuxCost,
        appendCost: this._appendCost
      };
    }
  }]);
  return TransferCost2;
}();
var TRANSFER_EVENT = {
  TTFB: "ttfb",
  DEMUX: "demux",
  REMUX: "remux",
  APPEND: "append"
};

// node_modules/xgplayer-flv/es/flv/services/buffer-service.js
var logger2 = new Logger("BufferService");
var BufferService = /* @__PURE__ */ function() {
  function BufferService2(flv, softVideo) {
    var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    _classCallCheck(this, BufferService2);
    _defineProperty(this, "flv", null);
    _defineProperty(this, "_demuxer", new FlvDemuxer());
    _defineProperty(this, "_remuxer", null);
    _defineProperty(this, "_mse", null);
    _defineProperty(this, "_softVideo", null);
    _defineProperty(this, "_sourceCreated", false);
    _defineProperty(this, "_needInitSegment", true);
    _defineProperty(this, "_discontinuity", true);
    _defineProperty(this, "_contiguous", false);
    _defineProperty(this, "_initSegmentId", "");
    _defineProperty(this, "_cachedBuffer", null);
    _defineProperty(this, "_demuxStartTime", 0);
    _defineProperty(this, "_opts", null);
    this.flv = flv;
    this._opts = opts;
    if (softVideo) {
      this._softVideo = softVideo;
    } else {
      this._remuxer = new FMP4Remuxer(this._demuxer.videoTrack, this._demuxer.audioTrack);
      this._mse = new MSE(null, {
        preferMMS: typeof opts.preferMMS === "boolean" ? opts.preferMMS : !!opts.perferMMS
      });
      this._mse.bindMedia(flv.media);
    }
  }
  _createClass(BufferService2, [{
    key: "baseDts",
    get: function get() {
      var _this$_demuxer, _this$_demuxer$_fixer;
      return (_this$_demuxer = this._demuxer) === null || _this$_demuxer === void 0 ? void 0 : (_this$_demuxer$_fixer = _this$_demuxer._fixer) === null || _this$_demuxer$_fixer === void 0 ? void 0 : _this$_demuxer$_fixer._baseDts;
    }
  }, {
    key: "blobUrl",
    get: function get() {
      var _this$_mse;
      return (_this$_mse = this._mse) === null || _this$_mse === void 0 ? void 0 : _this$_mse.url;
    }
  }, {
    key: "isFull",
    value: function isFull() {
      var mediaType = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : MSE.VIDEO;
      return this._mse.isFull(mediaType);
    }
  }, {
    key: "seamlessSwitch",
    value: function seamlessSwitch() {
      this._needInitSegment = true;
      this._discontinuity = true;
      this._contiguous = true;
      this._initSegmentId = "";
    }
  }, {
    key: "unContiguous",
    value: function unContiguous(startTime) {
      this._contiguous = false;
      this._demuxStartTime = startTime;
    }
  }, {
    key: "reset",
    value: function() {
      var _reset = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee() {
        var reuseMse, _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                reuseMse = _args.length > 0 && _args[0] !== void 0 ? _args[0] : false;
                if (!(this._mse && !reuseMse)) {
                  _context.next = 6;
                  break;
                }
                _context.next = 4;
                return this._mse.unbindMedia();
              case 4:
                _context.next = 6;
                return this._mse.bindMedia(this.flv.media);
              case 6:
                this._needInitSegment = true;
                this._discontinuity = true;
                this._contiguous = false;
                this._sourceCreated = false;
                this._initSegmentId = "";
                this.resetSeamlessSwitchStats();
              case 12:
              case "end":
                return _context.stop();
            }
        }, _callee, this);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }()
  }, {
    key: "resetSeamlessSwitchStats",
    value: function resetSeamlessSwitchStats() {
      this.seamlessLoadingSwitch = null;
      this.seamlessLoadingSwitching = false;
      if (this._demuxer) {
        this._demuxer.seamlessLoadingSwitching = false;
      }
    }
  }, {
    key: "endOfStream",
    value: function() {
      var _endOfStream = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._mse) {
                  _context2.next = 7;
                  break;
                }
                if (!this._sourceCreated) {
                  _context2.next = 5;
                  break;
                }
                _context2.next = 4;
                return this._mse.endOfStream();
              case 4:
                this.flv.emit(EVENT.BUFFEREOS);
              case 5:
                _context2.next = 8;
                break;
              case 7:
                if (this._softVideo) {
                  this._softVideo.endOfStream();
                }
              case 8:
              case "end":
                return _context2.stop();
            }
        }, _callee2, this);
      }));
      function endOfStream() {
        return _endOfStream.apply(this, arguments);
      }
      return endOfStream;
    }()
  }, {
    key: "updateDuration",
    value: function() {
      var _updateDuration = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(duration) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1)
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this._mse) {
                  _context3.next = 7;
                  break;
                }
                if (this._mse.isOpened) {
                  _context3.next = 4;
                  break;
                }
                _context3.next = 4;
                return this._mse.open();
              case 4:
                logger2.debug("update duration", duration);
                _context3.next = 7;
                return this._mse.updateDuration(duration);
              case 7:
              case "end":
                return _context3.stop();
            }
        }, _callee3, this);
      }));
      function updateDuration(_x) {
        return _updateDuration.apply(this, arguments);
      }
      return updateDuration;
    }()
  }, {
    key: "destroy",
    value: function() {
      var _destroy = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1)
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this._mse) {
                  _context4.next = 3;
                  break;
                }
                _context4.next = 3;
                return this._mse.unbindMedia();
              case 3:
                this._mse = null;
                this._softVideo = null;
                this._demuxer = null;
                this._remuxer = null;
              case 7:
              case "end":
                return _context4.stop();
            }
        }, _callee4, this);
      }));
      function destroy() {
        return _destroy.apply(this, arguments);
      }
      return destroy;
    }()
  }, {
    key: "appendBuffer",
    value: function() {
      var _appendBuffer = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5(chunk) {
        var _this = this;
        var switchingNoReset, demuxer, videoTrack, audioTrack, metadataTrack, idx, videoExist, audioExist, duration, track, videoType, audioType, mse, afterAppend, newId, remuxResult, p, ret;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1)
            switch (_context5.prev = _context5.next) {
              case 0:
                switchingNoReset = false;
                if (this._cachedBuffer) {
                  chunk = concatUint8Array(this._cachedBuffer, chunk);
                  this._cachedBuffer = null;
                }
                demuxer = this._demuxer;
                if (!(!chunk || !chunk.length || !demuxer)) {
                  _context5.next = 5;
                  break;
                }
                return _context5.abrupt("return");
              case 5:
                _context5.prev = 5;
                this.flv._transferCost.start(TRANSFER_EVENT.DEMUX);
                demuxer.demuxAndFix(chunk, this.seamlessLoadingSwitching || this._discontinuity, this._contiguous, this._demuxStartTime, this.seamlessLoadingSwitching);
                this.seamlessLoadingSwitching = false;
                this.flv._transferCost.end(TRANSFER_EVENT.DEMUX);
                _context5.next = 15;
                break;
              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](5);
                throw new StreamingError(ERR.DEMUX, ERR.SUB_TYPES.FLV, _context5.t0);
              case 15:
                videoTrack = demuxer.videoTrack, audioTrack = demuxer.audioTrack, metadataTrack = demuxer.metadataTrack;
                if (!this.seamlessLoadingSwitch) {
                  _context5.next = 25;
                  break;
                }
                idx = videoTrack.samples.findIndex(function(sample) {
                  return sample.originDts === videoTrack.lastKeyFrameDts;
                });
                if (!(idx >= 0)) {
                  _context5.next = 25;
                  break;
                }
                videoTrack.samples.splice(idx);
                _context5.next = 22;
                return this.seamlessLoadingSwitch();
              case 22:
                this.seamlessLoadingSwitch = null;
                chunk = null;
                switchingNoReset = true;
              case 25:
                videoExist = videoTrack.exist();
                audioExist = audioTrack.exist();
                if (this._opts.onlyAudio) {
                  videoExist = false;
                  videoTrack.present = false;
                }
                if (this._opts.onlyVideo) {
                  audioExist = false;
                  audioTrack.present = false;
                }
                if (!(!videoExist && videoTrack.present || !audioExist && audioTrack.present)) {
                  _context5.next = 42;
                  break;
                }
                duration = 0;
                track = videoExist ? videoTrack : audioExist ? audioTrack : void 0;
                if (track && track.samples.length) {
                  duration = (track.samples[track.samples.length - 1].originPts - track.samples[0].originPts) / track.timescale * 1e3;
                }
                if (!(duration > this._opts.analyzeDuration)) {
                  _context5.next = 40;
                  break;
                }
                logger2.warn("analyze duration exceeded, ".concat(duration, "ms"), track);
                videoTrack.present = videoExist;
                audioTrack.present = audioExist;
                this.flv.emit(EVENT.ANALYZE_DURATION_EXCEEDED, {
                  duration
                });
                _context5.next = 42;
                break;
              case 40:
                this._cachedBuffer = chunk;
                return _context5.abrupt("return");
              case 42:
                videoType = videoTrack.type;
                audioType = audioTrack.type;
                this._fireEvents(videoTrack, audioTrack, metadataTrack);
                if (!switchingNoReset) {
                  this._discontinuity = false;
                  this._contiguous = true;
                  this._demuxStartTime = 0;
                }
                mse = this._mse;
                afterAppend = function afterAppend2() {
                  var _this$flv;
                  if ((_this$flv = _this.flv) !== null && _this$flv !== void 0 && _this$flv.emit) {
                    var _this$flv2;
                    (_this$flv2 = _this.flv) === null || _this$flv2 === void 0 ? void 0 : _this$flv2.emit(EVENT.APPEND_BUFFER, {});
                  }
                };
                this.flv.emit(EVENT.DEMUXED_TRACK, {
                  videoTrack
                });
                newId = "".concat(videoTrack.codec, "/").concat(videoTrack.width, "/").concat(videoTrack.height, "/").concat(audioTrack.codec, "/").concat(audioTrack.config);
                if (newId !== this._initSegmentId) {
                  this._needInitSegment = true;
                  this._initSegmentId = newId;
                  this._emitMetaParsedEvent(videoTrack, audioTrack);
                }
                if (!mse) {
                  _context5.next = 83;
                  break;
                }
                if (this._sourceCreated) {
                  _context5.next = 59;
                  break;
                }
                _context5.next = 55;
                return mse.open();
              case 55:
                if (videoExist) {
                  logger2.log("codec: video/mp4;codecs=".concat(videoTrack.codec));
                  mse.createSource(videoType, "video/mp4;codecs=".concat(videoTrack.codec));
                }
                if (audioExist) {
                  logger2.log("codec: audio/mp4;codecs=".concat(audioTrack.codec));
                  mse.createSource(audioType, "audio/mp4;codecs=".concat(audioTrack.codec));
                }
                this._sourceCreated = true;
                this.flv.emit(EVENT.SOURCEBUFFER_CREATED);
              case 59:
                _context5.prev = 59;
                if (this._needInitSegment && !this._opts.mseLowLatency) {
                  videoTrack.duration = this._opts.durationForMSELowLatencyOff * videoTrack.timescale;
                  audioTrack.duration = this._opts.durationForMSELowLatencyOff * audioExist.timescale;
                }
                this.flv._transferCost.start(TRANSFER_EVENT.REMUX);
                remuxResult = this._remuxer.remux(this._needInitSegment);
                this.flv._transferCost.end(TRANSFER_EVENT.REMUX);
                _context5.next = 69;
                break;
              case 66:
                _context5.prev = 66;
                _context5.t1 = _context5["catch"](59);
                throw new StreamingError(ERR.REMUX, ERR.SUB_TYPES.FMP4, _context5.t1);
              case 69:
                if (!(this._needInitSegment && !remuxResult.videoInitSegment && !remuxResult.audioInitSegment)) {
                  _context5.next = 71;
                  break;
                }
                return _context5.abrupt("return");
              case 71:
                this._needInitSegment = false;
                p = [];
                if (remuxResult.videoInitSegment)
                  p.push(mse.append(videoType, remuxResult.videoInitSegment));
                if (remuxResult.audioInitSegment)
                  p.push(mse.append(audioType, remuxResult.audioInitSegment));
                if (remuxResult.videoSegment)
                  p.push(mse.append(videoType, remuxResult.videoSegment));
                if (remuxResult.audioSegment)
                  p.push(mse.append(audioType, remuxResult.audioSegment));
                this.flv._transferCost.start(TRANSFER_EVENT.APPEND);
                ret = Promise.all(p);
                ret.then(afterAppend).then(function() {
                  _this.flv._transferCost.end(TRANSFER_EVENT.APPEND);
                  afterAppend();
                });
                return _context5.abrupt("return", ret);
              case 83:
                if (this._softVideo) {
                  this._softVideo.appendBuffer(videoTrack, audioTrack);
                  afterAppend();
                }
              case 84:
              case "end":
                return _context5.stop();
            }
        }, _callee5, this, [[5, 12], [59, 66]]);
      }));
      function appendBuffer(_x2) {
        return _appendBuffer.apply(this, arguments);
      }
      return appendBuffer;
    }()
  }, {
    key: "evictBuffer",
    value: function() {
      var _evictBuffer = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6(bufferBehind) {
        var _this2 = this;
        var media, currentTime, removeEnd, start;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1)
            switch (_context6.prev = _context6.next) {
              case 0:
                media = this.flv.media;
                if (!(!this._mse || !this._demuxer || !media || !bufferBehind || bufferBehind < 0)) {
                  _context6.next = 3;
                  break;
                }
                return _context6.abrupt("return");
              case 3:
                currentTime = media.currentTime;
                removeEnd = currentTime - bufferBehind;
                if (!(removeEnd <= 0)) {
                  _context6.next = 7;
                  break;
                }
                return _context6.abrupt("return");
              case 7:
                start = Buffer2.start(Buffer2.get(media));
                if (!(start + 1 >= removeEnd)) {
                  _context6.next = 10;
                  break;
                }
                return _context6.abrupt("return");
              case 10:
                return _context6.abrupt("return", this._mse.clearBuffer(0, removeEnd).then(function() {
                  return _this2.flv.emit(EVENT.REMOVE_BUFFER, {
                    removeEnd
                  });
                }));
              case 11:
              case "end":
                return _context6.stop();
            }
        }, _callee6, this);
      }));
      function evictBuffer(_x3) {
        return _evictBuffer.apply(this, arguments);
      }
      return evictBuffer;
    }()
  }, {
    key: "_emitMetaParsedEvent",
    value: function _emitMetaParsedEvent(videoTrack, audioTrack) {
      if (videoTrack.exist()) {
        this.flv.emit(EVENT.METADATA_PARSED, {
          type: "video",
          track: videoTrack,
          meta: {
            codec: videoTrack.codec,
            timescale: videoTrack.timescale,
            width: videoTrack.width,
            height: videoTrack.height,
            sarRatio: videoTrack.sarRatio,
            baseDts: videoTrack.baseDts
          }
        });
      }
      if (audioTrack.exist()) {
        this.flv.emit(EVENT.METADATA_PARSED, {
          type: "audio",
          track: audioTrack,
          meta: {
            codec: audioTrack.codec,
            channelCount: audioTrack.channelCount,
            sampleRate: audioTrack.sampleRate,
            timescale: audioTrack.timescale,
            baseDts: audioTrack.baseDts
          }
        });
      }
      logger2.debug("track parsed", videoTrack, audioTrack);
    }
  }, {
    key: "_fireEvents",
    value: function _fireEvents(videoTrack, audioTrack, metadataTrack) {
      var _this3 = this;
      logger2.debug("videoTrack samples count: ".concat(videoTrack.samples.length, ", audioTrack samples count: ").concat(audioTrack.samples.length));
      metadataTrack.flvScriptSamples.forEach(function(sample) {
        _this3.flv.emit(EVENT.FLV_SCRIPT_DATA, sample);
        logger2.debug("flvScriptData", sample);
      });
      videoTrack.samples.forEach(function(sample) {
        if (sample.keyframe) {
          _this3.flv.emit(EVENT.KEYFRAME, {
            pts: sample.originPts
          });
        }
      });
      videoTrack.warnings.forEach(function(warn) {
        var type;
        switch (warn.type) {
          case WarningType.LARGE_AV_SHIFT:
            type = EVENT.LARGE_AV_FIRST_FRAME_GAP_DETECT;
            break;
          case WarningType.LARGE_VIDEO_GAP:
            type = EVENT.LARGE_VIDEO_DTS_GAP_DETECT;
            break;
          case WarningType.LARGE_VIDEO_GAP_BETWEEN_CHUNK:
            type = EVENT.MAX_DTS_DELTA_WITH_NEXT_SEGMENT_DETECT;
            break;
        }
        if (type)
          _this3.flv.emit(EVENT.STREAM_EXCEPTION, _objectSpread2(_objectSpread2({}, warn), {}, {
            type
          }));
        logger2.warn("video exception", warn);
      });
      audioTrack.warnings.forEach(function(warn) {
        var type;
        switch (warn.type) {
          case WarningType.LARGE_AUDIO_GAP:
            type = EVENT.LARGE_AUDIO_DTS_GAP_DETECT;
            break;
          case WarningType.AUDIO_FILLED:
            type = EVENT.AUDIO_GAP_DETECT;
            break;
          case WarningType.AUDIO_DROPPED:
            type = EVENT.AUDIO_OVERLAP_DETECT;
            break;
        }
        if (type)
          _this3.flv.emit(EVENT.STREAM_EXCEPTION, _objectSpread2(_objectSpread2({}, warn), {}, {
            type
          }));
        logger2.warn("audio exception", warn);
      });
      metadataTrack.seiSamples.forEach(function(sei) {
        _this3.flv.emit(EVENT.SEI, _objectSpread2(_objectSpread2({}, sei), {}, {
          sei: {
            code: sei.data.type,
            content: sei.data.payload,
            dts: sei.pts
          }
        }));
      });
    }
  }]);
  return BufferService2;
}();

// node_modules/xgplayer-flv/es/flv/options.js
function getOption(opts) {
  var ret = _objectSpread2({
    retryCount: 3,
    retryDelay: 1e3,
    disconnectRetryCount: 0,
    loadTimeout: 1e4,
    maxReaderInterval: 5e3,
    preloadTime: 5,
    defaultVodLoadSize: 1e7,
    isLive: false,
    softDecode: false,
    bufferBehind: 10,
    maxJumpDistance: 3,
    analyzeDuration: 2e4,
    seamlesslyReload: false,
    keepStatusAfterSwitch: true,
    onlyVideo: false,
    onlyAudio: false,
    preferMMS: false,
    mseLowLatency: true,
    durationForMSELowLatencyOff: 6,
    chunkCountForSpeed: 50,
    skipChunkSize: 1e3,
    longtimeNoReceived: 3e3,
    enableStartGapJump: true
  }, opts);
  if (ret.isLive) {
    if (ret.preloadTime) {
      if (!ret.maxLatency) {
        ret.maxLatency = ret.preloadTime * 2;
      }
      if (!ret.targetLatency) {
        ret.targetLatency = ret.preloadTime;
      }
      if (ret.disconnectTime === null || ret.disconnectTime === void 0) {
        ret.disconnectTime = ret.maxLatency;
      }
    }
  }
  return ret;
}

// node_modules/xgplayer-flv/es/flv/utils.js
function searchKeyframeIndex(list, value) {
  var idx = 0;
  var last = list.length - 1;
  var mid = 0;
  var lbound = 0;
  var ubound = last;
  if (value < list[0]) {
    idx = 0;
    lbound = ubound + 1;
  }
  while (lbound <= ubound) {
    mid = lbound + Math.floor((ubound - lbound) / 2);
    if (mid === last || value >= list[mid] && value < list[mid + 1]) {
      idx = mid;
      break;
    } else if (list[mid] < value) {
      lbound = mid + 1;
    } else {
      ubound = mid - 1;
    }
  }
  return idx;
}

// node_modules/xgplayer-flv/es/flv/index.js
var logger3 = new Logger("flv");
var MAX_HOLE = 0.1;
var MAX_START_GAP = 0.3;
var Flv = /* @__PURE__ */ function(_EventEmitter) {
  _inherits(Flv2, _EventEmitter);
  var _super = _createSuper(Flv2);
  function Flv2(_opts) {
    var _this;
    _classCallCheck(this, Flv2);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "media", null);
    _defineProperty(_assertThisInitialized(_this), "_loading", false);
    _defineProperty(_assertThisInitialized(_this), "_opts", null);
    _defineProperty(_assertThisInitialized(_this), "_bufferService", null);
    _defineProperty(_assertThisInitialized(_this), "_gapService", null);
    _defineProperty(_assertThisInitialized(_this), "_stats", null);
    _defineProperty(_assertThisInitialized(_this), "_mediaLoader", null);
    _defineProperty(_assertThisInitialized(_this), "_maxChunkWaitTimer", null);
    _defineProperty(_assertThisInitialized(_this), "_tickTimer", null);
    _defineProperty(_assertThisInitialized(_this), "_tickInterval", 500);
    _defineProperty(_assertThisInitialized(_this), "_urlSwitching", false);
    _defineProperty(_assertThisInitialized(_this), "_seamlessSwitching", false);
    _defineProperty(_assertThisInitialized(_this), "_disconnectRetryCount", 0);
    _defineProperty(_assertThisInitialized(_this), "_preLoadEndPoint", 0);
    _defineProperty(_assertThisInitialized(_this), "_keyframes", null);
    _defineProperty(_assertThisInitialized(_this), "_acceptRanges", true);
    _defineProperty(_assertThisInitialized(_this), "_onProgress", /* @__PURE__ */ function() {
      var _ref2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(chunk, done, _ref, response) {
        var startTime, endTime, st, firstByteTime, _this$_mediaLoader, headers, elapsed, _this$_bufferService, remaining, maxReaderInterval;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                startTime = _ref.startTime, endTime = _ref.endTime, st = _ref.st, firstByteTime = _ref.firstByteTime;
                _this._loading = !done;
                if (_this._firstProgressEmit) {
                  _context.next = 13;
                  break;
                }
                if (_this.media) {
                  _context.next = 6;
                  break;
                }
                (_this$_mediaLoader = _this._mediaLoader) === null || _this$_mediaLoader === void 0 ? void 0 : _this$_mediaLoader.cancel();
                return _context.abrupt("return");
              case 6:
                headers = response.headers;
                elapsed = st ? firstByteTime - st : endTime - startTime;
                _this.emit(EVENT.TTFB, {
                  url: _this._opts.url,
                  responseUrl: response.url,
                  elapsed
                });
                _this.emit(EVENT.LOAD_RESPONSE_HEADERS, {
                  headers
                });
                _this._transferCost.set(TRANSFER_EVENT.TTFB, elapsed);
                _this._acceptRanges = !!(headers !== null && headers !== void 0 && headers.get("Accept-Ranges")) || !!(headers !== null && headers !== void 0 && headers.get("Content-Range"));
                _this._firstProgressEmit = true;
              case 13:
                if (_this._bufferService) {
                  _context.next = 15;
                  break;
                }
                return _context.abrupt("return");
              case 15:
                clearTimeout(_this._maxChunkWaitTimer);
                _this._bandwidthService.addChunkRecord(chunk === null || chunk === void 0 ? void 0 : chunk.byteLength, endTime - startTime);
                _context.prev = 17;
                _context.next = 20;
                return _this._bufferService.appendBuffer(chunk);
              case 20:
                (_this$_bufferService = _this._bufferService) === null || _this$_bufferService === void 0 ? void 0 : _this$_bufferService.evictBuffer(_this._opts.bufferBehind);
                _context.next = 33;
                break;
              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](17);
                if (!(!_this.isLive && _this._bufferService.isFull())) {
                  _context.next = 32;
                  break;
                }
                _context.next = 28;
                return _this._mediaLoader.cancel();
              case 28:
                _this._loading = false;
                remaining = _this.bufferInfo().remaining;
                _this._opts.preloadTime = parseInt(remaining) / 2;
                return _context.abrupt("return");
              case 32:
                return _context.abrupt("return", _this._emitError(StreamingError.create(_context.t0)));
              case 33:
                if (_this._urlSwitching) {
                  _this._urlSwitching = false;
                  _this.emit(EVENT.SWITCH_URL_SUCCESS, {
                    url: _this._opts.url
                  });
                }
                if (_this._seamlessSwitching) {
                  _this._seamlessSwitching = false;
                  _this._tick();
                }
                if (!(done && !_this.media.seeking)) {
                  _context.next = 40;
                  break;
                }
                _this.emit(EVENT.LOAD_COMPLETE);
                logger3.debug("load done");
                if (_this.isLive && _this._disconnectRetryCount <= 0) {
                  _this._end();
                }
                return _context.abrupt("return");
              case 40:
                if (_this.isLive) {
                  _context.next = 42;
                  break;
                }
                return _context.abrupt("return");
              case 42:
                maxReaderInterval = _this._opts.maxReaderInterval;
                if (maxReaderInterval && _this._firstProgressEmit) {
                  clearTimeout(_this._maxChunkWaitTimer);
                  _this._maxChunkWaitTimer = setTimeout(function() {
                    if (_this._disconnectRetryCount) {
                      _this._disconnectRetryCount--;
                      _this.load();
                      return;
                    }
                    logger3.debug("onMaxChunkWait", maxReaderInterval);
                    _this._end();
                  }, maxReaderInterval);
                }
              case 44:
              case "end":
                return _context.stop();
            }
        }, _callee, null, [[17, 23]]);
      }));
      return function(_x, _x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_assertThisInitialized(_this), "_onRetryError", function(error, retryTime) {
      logger3.debug("load retry", error, retryTime);
      _this.emit(EVENT.LOAD_RETRY, {
        error: StreamingError.network(error),
        retryTime
      });
    });
    _defineProperty(_assertThisInitialized(_this), "_end", function() {
      _this._clear();
      if (_this._bufferService) {
        _this._bufferService.endOfStream();
      }
      logger3.debug("end stream");
    });
    _defineProperty(_assertThisInitialized(_this), "_resetDisconnectCount", function() {
      _this._disconnectRetryCount = _this._opts.disconnectRetryCount;
    });
    _defineProperty(_assertThisInitialized(_this), "_tick", function() {
      clearTimeout(_this._tickTimer);
      var _assertThisInitialize = _assertThisInitialized(_this), media = _assertThisInitialize.media;
      if (!media)
        return;
      _this._tickTimer = setTimeout(_this._tick, _this._tickInterval);
      var bufferEnd = Buffer2.end(Buffer2.get(media));
      if (bufferEnd < MAX_HOLE || !media.readyState)
        return;
      var opts = _this._opts;
      if (isMediaPlaying(media) && media.currentTime) {
        if (_this._gapService) {
          _this._gapService.do(media, opts.maxJumpDistance, _this.isLive, 3);
        }
      } else {
        if (!media.currentTime && _this._gapService && opts.enableStartGapJump) {
          var gapJump = _this._opts.mseLowLatency || _this._opts.mseLowLatency === false && _this.bufferInfo(MAX_START_GAP).nextStart;
          if (gapJump) {
            _this._gapService.do(media, opts.maxJumpDistance, _this.isLive, 3);
          }
          return;
        }
        if (opts.isLive && media.readyState === 4 && bufferEnd - media.currentTime > opts.disconnectTime) {
          _this.disconnect();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_onPlay", function() {
      var _this$media, _this$media$buffered;
      var canReplay = _this._opts.softDecode || ((_this$media = _this.media) === null || _this$media === void 0 ? void 0 : (_this$media$buffered = _this$media.buffered) === null || _this$media$buffered === void 0 ? void 0 : _this$media$buffered.length);
      if (_this.isLive) {
        if (!_this._loading && canReplay) {
          _this.replay(void 0, true);
        }
        return;
      }
      var info = _this.bufferInfo();
      if ((info.start || info.nextStart) > MAX_HOLE) {
        _this._tick();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_onLoadeddata", function() {
      if (_this.isLive && !_this._opts.mseLowLatency) {
        if (_this.media.duration !== Infinity) {
          _this._bufferService.updateDuration(Infinity).catch(function(e) {
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_onSeeking", /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1)
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_this.isLive && _this.seekable) {
                _this._preLoadEndPoint = -1;
                _this._checkPreload();
              }
            case 1:
            case "end":
              return _context2.stop();
          }
      }, _callee2);
    })));
    _defineProperty(_assertThisInitialized(_this), "_onTimeupdate", function() {
      if (!_this.media)
        return;
      var opts = _this._opts;
      var currentTime = _this.media.currentTime;
      if (opts.isLive && opts.maxLatency && opts.targetLatency) {
        var bufferEnd = Buffer2.end(Buffer2.get(_this.media));
        var latency = bufferEnd - currentTime;
        if (latency >= opts.maxLatency) {
          _this.media.currentTime = bufferEnd - opts.targetLatency;
          _this.emit(EVENT.CHASEFRAME, {
            currentTime: _this.media.currentTime,
            latency: opts.targetLatency
          });
        }
      }
      _this._seiService.throw(currentTime, true);
      if (opts.isLive || !_this.seekable || _this._loading)
        return;
      _this._checkPreload();
    });
    _defineProperty(_assertThisInitialized(_this), "_onWaiting", function() {
      if (_this.isLive && !_this._loading && _this._disconnectRetryCount) {
        _this._disconnectRetryCount--;
        _this.load();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_onBufferUpdate", function() {
      if (_this._opts.isLive)
        return;
      var _this$bufferInfo = _this.bufferInfo(), end = _this$bufferInfo.end, nextEnd = _this$bufferInfo.nextEnd;
      if (Math.abs((end || nextEnd) - _this.media.duration) < 1) {
        _this._end();
        if (_this.media.readyState <= 2) {
          _this._tick();
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_checkPreload", /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3() {
      var _this$bufferInfo2, _this$bufferInfo2$rem, remainingBuffer, opts, filepositions, times, currentTime, i, end, startByte;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1)
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$bufferInfo2 = _this.bufferInfo(), _this$bufferInfo2$rem = _this$bufferInfo2.remaining, remainingBuffer = _this$bufferInfo2$rem === void 0 ? 0 : _this$bufferInfo2$rem;
              opts = _this._opts;
              filepositions = _this._keyframes.filepositions;
              times = _this._keyframes.times;
              currentTime = _this.media.currentTime;
              if (!(remainingBuffer < opts.preloadTime)) {
                _context3.next = 19;
                break;
              }
              i = searchKeyframeIndex(_this._keyframes.times, currentTime + remainingBuffer + MAX_HOLE);
              end = searchKeyframeIndex(_this._keyframes.times, currentTime + remainingBuffer + _this._opts.preloadTime);
              if (end === i) {
                end = i + 1;
              }
              if (!(_this._preLoadEndPoint === end)) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return");
            case 11:
              startByte = filepositions[i];
              if (!(startByte === null || startByte === void 0)) {
                _context3.next = 14;
                break;
              }
              return _context3.abrupt("return");
            case 14:
              _context3.next = 16;
              return _this._mediaLoader.cancel();
            case 16:
              _this._loadData(null, [startByte, filepositions[end]]);
              _this._preLoadEndPoint = end;
              _this._bufferService.unContiguous(times[i]);
            case 19:
            case "end":
              return _context3.stop();
          }
      }, _callee3);
    })));
    _defineProperty(_assertThisInitialized(_this), "_onFlvScriptData", function(sample) {
      var _sample$data, _sample$data$onMetaDa, _sample$data2, _sample$data2$onMetaD;
      var keyframes = (_sample$data = sample.data) === null || _sample$data === void 0 ? void 0 : (_sample$data$onMetaDa = _sample$data.onMetaData) === null || _sample$data$onMetaDa === void 0 ? void 0 : _sample$data$onMetaDa.keyframes;
      var duration = (_sample$data2 = sample.data) === null || _sample$data2 === void 0 ? void 0 : (_sample$data2$onMetaD = _sample$data2.onMetaData) === null || _sample$data2$onMetaD === void 0 ? void 0 : _sample$data2$onMetaD.duration;
      if (keyframes) {
        _this._keyframes = keyframes;
      }
      if (!_this._opts.isLive && duration) {
        _this._bufferService.updateDuration(duration);
      }
    });
    _this._opts = getOption(_opts);
    _this.media = _this._opts.media || document.createElement("video");
    _this._opts.media = null;
    _this._firstProgressEmit = false;
    _this._mediaLoader = new NetLoader(_objectSpread2(_objectSpread2({}, _this._opts.fetchOptions), {}, {
      retry: _this._opts.retryCount,
      retryDelay: _this._opts.retryDelay,
      timeout: _this._opts.loadTimeout,
      onRetryError: _this._onRetryError,
      onProgress: _this._onProgress,
      responseType: "arraybuffer"
    }));
    _this._disconnectRetryCount = _this._opts.disconnectRetryCount;
    _this._transferCost = new TransferCost();
    _this._bufferService = new BufferService(_assertThisInitialized(_this), _this._opts.softDecode ? _this.media : void 0, _this._opts);
    _this._seiService = new SeiService(_assertThisInitialized(_this));
    _this._bandwidthService = new BandwidthService({
      chunkCountForSpeed: _this._opts.chunkCountForSpeed,
      skipChunkSize: _this._opts.skipChunkSize,
      longtimeNoReceived: _this._opts.longtimeNoReceived
    });
    _this._stats = new MediaStatsService(_assertThisInitialized(_this));
    if (!_this._opts.softDecode) {
      _this._gapService = new GapService();
    }
    _this.media.addEventListener("play", _this._onPlay);
    _this.media.addEventListener("loadeddata", _this._onLoadeddata);
    _this.media.addEventListener("seeking", _this._onSeeking);
    _this.media.addEventListener("timeupdate", _this._onTimeupdate);
    _this.media.addEventListener("progress", _this._onBufferUpdate);
    _this.media.addEventListener("waiting", _this._onWaiting);
    _this.on(EVENT.FLV_SCRIPT_DATA, _this._onFlvScriptData);
    return _this;
  }
  _createClass(Flv2, [{
    key: "version",
    get: function get() {
      return "3.0.21";
    }
  }, {
    key: "isLive",
    get: function get() {
      return this._opts.isLive;
    }
  }, {
    key: "baseDts",
    get: function get() {
      var _this$_bufferService2;
      return (_this$_bufferService2 = this._bufferService) === null || _this$_bufferService2 === void 0 ? void 0 : _this$_bufferService2.baseDts;
    }
  }, {
    key: "seekable",
    get: function get() {
      return !!this._keyframes && this._acceptRanges;
    }
  }, {
    key: "loader",
    get: function get() {
      return this._mediaLoader;
    }
  }, {
    key: "blobUrl",
    get: function get() {
      var _this$_bufferService3;
      return (_this$_bufferService3 = this._bufferService) === null || _this$_bufferService3 === void 0 ? void 0 : _this$_bufferService3.blobUrl;
    }
  }, {
    key: "speedInfo",
    value: function speedInfo() {
      return {
        speed: this._bandwidthService.getLatestSpeed(),
        avgSpeed: this._bandwidthService.getAvgSpeed(),
        totalSize: this._bandwidthService.getTotalSize(),
        totalCost: this._bandwidthService.getTotalCost()
      };
    }
  }, {
    key: "getStats",
    value: function getStats() {
      return this._stats.getStats();
    }
  }, {
    key: "bufferInfo",
    value: function bufferInfo() {
      var _this$media2;
      var maxHole = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : MAX_HOLE;
      return Buffer2.info(Buffer2.get(this.media), (_this$media2 = this.media) === null || _this$media2 === void 0 ? void 0 : _this$media2.currentTime, maxHole);
    }
  }, {
    key: "playbackQuality",
    value: function playbackQuality() {
      return getVideoPlaybackQuality(this.media);
    }
  }, {
    key: "load",
    value: function() {
      var _load = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(url) {
        var reuseMse, _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1)
            switch (_context4.prev = _context4.next) {
              case 0:
                reuseMse = _args4.length > 1 && _args4[1] !== void 0 ? _args4[1] : false;
                if (this._bufferService) {
                  _context4.next = 3;
                  break;
                }
                return _context4.abrupt("return");
              case 3:
                _context4.next = 5;
                return this._reset(reuseMse);
              case 5:
                this._loadData(url, this._opts.isLive ? [] : [0, this._opts.defaultVodLoadSize]);
                clearTimeout(this._tickTimer);
                this._tickTimer = setTimeout(this._tick, this._tickInterval);
              case 8:
              case "end":
                return _context4.stop();
            }
        }, _callee4, this);
      }));
      function load(_x5) {
        return _load.apply(this, arguments);
      }
      return load;
    }()
  }, {
    key: "replay",
    value: function() {
      var _replay = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5() {
        var _this2 = this;
        var seamlesslyReload, isPlayEmit, _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1)
            switch (_context5.prev = _context5.next) {
              case 0:
                seamlesslyReload = _args5.length > 0 && _args5[0] !== void 0 ? _args5[0] : this._opts.seamlesslyReload;
                isPlayEmit = _args5.length > 1 ? _args5[1] : void 0;
                if (this.media) {
                  _context5.next = 4;
                  break;
                }
                return _context5.abrupt("return");
              case 4:
                this._resetDisconnectCount();
                if (!seamlesslyReload) {
                  _context5.next = 11;
                  break;
                }
                _context5.next = 8;
                return this._clear();
              case 8:
                setTimeout(function() {
                  _this2._seamlessSwitching = true;
                  _this2._loadData(_this2._opts.url);
                  _this2._bufferService.seamlessSwitch();
                });
                _context5.next = 13;
                break;
              case 11:
                _context5.next = 13;
                return this.load();
              case 13:
                return _context5.abrupt("return", this.media.play(!isPlayEmit).catch(function() {
                }));
              case 14:
              case "end":
                return _context5.stop();
            }
        }, _callee5, this);
      }));
      function replay() {
        return _replay.apply(this, arguments);
      }
      return replay;
    }()
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this$_bufferService4;
      logger3.debug("disconnect!");
      (_this$_bufferService4 = this._bufferService) === null || _this$_bufferService4 === void 0 ? void 0 : _this$_bufferService4.resetSeamlessSwitchStats();
      return this._clear();
    }
  }, {
    key: "switchURL",
    value: function() {
      var _switchURL = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee7(url, seamless) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1)
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this._bufferService) {
                  _context7.next = 2;
                  break;
                }
                return _context7.abrupt("return");
              case 2:
                this._resetDisconnectCount();
                if (!(this._loading && seamless)) {
                  _context7.next = 6;
                  break;
                }
                this._bufferService.seamlessLoadingSwitch = /* @__PURE__ */ function() {
                  var _ref5 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee6(pts) {
                    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                      while (1)
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            _context6.next = 2;
                            return _this3._clear();
                          case 2:
                            _this3._bufferService.seamlessLoadingSwitching = true;
                            _this3._urlSwitching = true;
                            _this3._seamlessSwitching = true;
                            _this3._bufferService.seamlessSwitch();
                            _this3._loadData(url);
                          case 7:
                          case "end":
                            return _context6.stop();
                        }
                    }, _callee6);
                  }));
                  return function(_x8) {
                    return _ref5.apply(this, arguments);
                  };
                }();
                return _context7.abrupt("return");
              case 6:
                if (!(!seamless || !this._opts.isLive)) {
                  _context7.next = 11;
                  break;
                }
                _context7.next = 9;
                return this.load(url);
              case 9:
                this._urlSwitching = true;
                return _context7.abrupt("return", this.media.play(true).catch(function() {
                }));
              case 11:
                _context7.next = 13;
                return this._clear();
              case 13:
                setTimeout(function() {
                  _this3._urlSwitching = true;
                  _this3._seamlessSwitching = true;
                  _this3._loadData(url);
                  _this3._bufferService.seamlessSwitch();
                });
              case 14:
              case "end":
                return _context7.stop();
            }
        }, _callee7, this);
      }));
      function switchURL(_x6, _x7) {
        return _switchURL.apply(this, arguments);
      }
      return switchURL;
    }()
  }, {
    key: "destroy",
    value: function() {
      var _destroy = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee8() {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1)
            switch (_context8.prev = _context8.next) {
              case 0:
                if (this.media) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return");
              case 2:
                this.removeAllListeners();
                this._seiService.reset();
                this.media.removeEventListener("play", this._onPlay);
                this.media.removeEventListener("loadeddata", this._onLoadeddata);
                this.media.removeEventListener("seeking", this._onSeeking);
                this.media.removeEventListener("timeupdate", this._onTimeupdate);
                this.media.removeEventListener("waiting", this._onWaiting);
                this.media.removeEventListener("progress", this._onBufferUpdate);
                _context8.next = 12;
                return Promise.all([this._clear(), this._bufferService.destroy()]);
              case 12:
                this.media = null;
                this._bufferService = null;
              case 14:
              case "end":
                return _context8.stop();
            }
        }, _callee8, this);
      }));
      function destroy() {
        return _destroy.apply(this, arguments);
      }
      return destroy;
    }()
  }, {
    key: "_emitError",
    value: function _emitError(error) {
      var _this$media3;
      var endOfStream = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      logger3.table(error);
      logger3.error(error);
      logger3.error((_this$media3 = this.media) === null || _this$media3 === void 0 ? void 0 : _this$media3.error);
      if (this._urlSwitching) {
        this._urlSwitching = false;
        this._seamlessSwitching = false;
        this.emit(EVENT.SWITCH_URL_FAILED, error);
      }
      this.emit(EVENT.ERROR, error);
      if (endOfStream) {
        this._seiService.reset();
        this._end();
      }
    }
  }, {
    key: "_reset",
    value: function() {
      var _reset2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee9() {
        var reuseMse, _args9 = arguments;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1)
            switch (_context9.prev = _context9.next) {
              case 0:
                reuseMse = _args9.length > 0 && _args9[0] !== void 0 ? _args9[0] : false;
                this._seiService.reset();
                this._bandwidthService.reset();
                this._stats.reset();
                _context9.next = 6;
                return this._clear();
              case 6:
                _context9.next = 8;
                return this._bufferService.reset(reuseMse);
              case 8:
              case "end":
                return _context9.stop();
            }
        }, _callee9, this);
      }));
      function _reset() {
        return _reset2.apply(this, arguments);
      }
      return _reset;
    }()
  }, {
    key: "_loadData",
    value: function() {
      var _loadData2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee10(url, range) {
        var finnalUrl;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1)
            switch (_context10.prev = _context10.next) {
              case 0:
                if (url)
                  this._opts.url = url;
                finnalUrl = url = this._opts.url;
                if (url) {
                  _context10.next = 4;
                  break;
                }
                throw new Error("Source url is missing");
              case 4:
                if (this._opts.preProcessUrl) {
                  finnalUrl = this._opts.preProcessUrl(url).url;
                }
                this._mediaLoader.finnalUrl = finnalUrl;
                this.emit(EVENT.LOAD_START, {
                  url: finnalUrl,
                  seamlessSwitching: this._seamlessSwitching
                });
                logger3.debug("load data, loading:", this._loading, finnalUrl);
                if (!this._loading) {
                  _context10.next = 11;
                  break;
                }
                _context10.next = 11;
                return this._mediaLoader.cancel();
              case 11:
                this._loading = true;
                _context10.prev = 12;
                _context10.next = 15;
                return this._mediaLoader.load({
                  url: finnalUrl,
                  range
                });
              case 15:
                _context10.next = 21;
                break;
              case 17:
                _context10.prev = 17;
                _context10.t0 = _context10["catch"](12);
                this._loading = false;
                return _context10.abrupt("return", this._emitError(StreamingError.network(_context10.t0), false));
              case 21:
              case "end":
                return _context10.stop();
            }
        }, _callee10, this, [[12, 17]]);
      }));
      function _loadData(_x9, _x10) {
        return _loadData2.apply(this, arguments);
      }
      return _loadData;
    }()
  }, {
    key: "_clear",
    value: function() {
      var _clear2 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee11() {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1)
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this._mediaLoader) {
                  _context11.next = 3;
                  break;
                }
                _context11.next = 3;
                return this._mediaLoader.cancel();
              case 3:
                clearTimeout(this._maxChunkWaitTimer);
                clearTimeout(this._tickTimer);
                this._loading = false;
                this._firstProgressEmit = false;
              case 7:
              case "end":
                return _context11.stop();
            }
        }, _callee11, this);
      }));
      function _clear() {
        return _clear2.apply(this, arguments);
      }
      return _clear;
    }()
  }], [{
    key: "isSupported",
    value: function isSupported(mediaType) {
      if (!mediaType || mediaType === "video" || mediaType === "audio") {
        return MSE.isSupported();
      }
      return typeof WebAssembly !== "undefined";
    }
  }, {
    key: "enableLogger",
    value: function enableLogger() {
      Logger.enable();
      Logger2.enable();
    }
  }, {
    key: "disableLogger",
    value: function disableLogger() {
      Logger.disable();
      Logger2.disable();
    }
  }]);
  return Flv2;
}(import_eventemitter35.default);
try {
  if (localStorage.getItem("xgd")) {
    Flv.enableLogger();
  } else {
    Flv.disableLogger();
  }
} catch (error) {
}
export {
  Flv
};
