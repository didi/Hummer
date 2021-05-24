/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js"); // TODO: this is special because it gets imported during build.


    var ReactVersion = '17.0.2'; // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var REACT_ELEMENT_TYPE = 0xeac7;
    var REACT_PORTAL_TYPE = 0xeaca;
    exports.Fragment = 0xeacb;
    exports.StrictMode = 0xeacc;
    exports.Profiler = 0xead2;
    var REACT_PROVIDER_TYPE = 0xeacd;
    var REACT_CONTEXT_TYPE = 0xeace;
    var REACT_FORWARD_REF_TYPE = 0xead0;
    exports.Suspense = 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = 0xead8;
    var REACT_MEMO_TYPE = 0xead3;
    var REACT_LAZY_TYPE = 0xead4;
    var REACT_BLOCK_TYPE = 0xead9;
    var REACT_SERVER_BLOCK_TYPE = 0xeada;
    var REACT_FUNDAMENTAL_TYPE = 0xead5;
    var REACT_SCOPE_TYPE = 0xead7;
    var REACT_OPAQUE_ID_TYPE = 0xeae0;
    var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
    var REACT_OFFSCREEN_TYPE = 0xeae2;
    var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

    if (typeof Symbol === 'function' && Symbol.for) {
      var symbolFor = Symbol.for;
      REACT_ELEMENT_TYPE = symbolFor('react.element');
      REACT_PORTAL_TYPE = symbolFor('react.portal');
      exports.Fragment = symbolFor('react.fragment');
      exports.StrictMode = symbolFor('react.strict_mode');
      exports.Profiler = symbolFor('react.profiler');
      REACT_PROVIDER_TYPE = symbolFor('react.provider');
      REACT_CONTEXT_TYPE = symbolFor('react.context');
      REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
      exports.Suspense = symbolFor('react.suspense');
      REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
      REACT_MEMO_TYPE = symbolFor('react.memo');
      REACT_LAZY_TYPE = symbolFor('react.lazy');
      REACT_BLOCK_TYPE = symbolFor('react.block');
      REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
      REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
      REACT_SCOPE_TYPE = symbolFor('react.scope');
      REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
      REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
      REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
      REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
    }

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * Keeps track of the current dispatcher.
     */


    var ReactCurrentDispatcher = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    /**
     * Keeps track of the current batch's configuration such as how long an update
     * should suspend for if it needs to.
     */

    var ReactCurrentBatchConfig = {
      transition: 0
    };
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
    var ReactDebugCurrentFrame = {};
    var currentExtraStackFrame = null;

    function setExtraStackFrame(stack) {
      {
        currentExtraStackFrame = stack;
      }
    }

    {
      ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
        {
          currentExtraStackFrame = stack;
        }
      }; // Stack implementation injected by the current renderer.


      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var stack = ''; // Add an extra top frame while an element is being validated

        if (currentExtraStackFrame) {
          stack += currentExtraStackFrame;
        } // Delegate to the injected renderer-specific implementation


        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          stack += impl() || '';
        }

        return stack;
      };
    }
    /**
     * Used by act() to track whether you're inside an act() scope.
     */

    var IsSomeRendererActing = {
      current: false
    };
    var ReactSharedInternals = {
      ReactCurrentDispatcher: ReactCurrentDispatcher,
      ReactCurrentBatchConfig: ReactCurrentBatchConfig,
      ReactCurrentOwner: ReactCurrentOwner,
      IsSomeRendererActing: IsSomeRendererActing,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: _assign
    };
    {
      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
    } // by calls to these methods by a Babel plugin.
    //
    // In PROD (or in packages without access to React internals),
    // they are left as they are instead.

    function warn(format) {
      {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        printWarning('warn', format, args);
      }
    }

    function error(format) {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        }

        var argsWithFormat = args.map(function (item) {
          return '' + item;
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);
      }
    }

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + "." + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
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
      isMounted: function isMounted(publicInstance) {
        return false;
      },

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
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    var emptyObject = {};
    {
      Object.freeze(emptyObject);
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
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

    Component.prototype.setState = function (partialState, callback) {
      if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
        {
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        }
      }

      this.updater.enqueueSetState(this, partialState, callback, 'setState');
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


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    /**
     * Convenience component with default shallow equality check for sCU.
     */

    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || '';
      return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
    }

    function getContextName(type) {
      return type.displayName || 'Context';
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case exports.Fragment:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case exports.Profiler:
          return 'Profiler';

        case exports.StrictMode:
          return 'StrictMode';

        case exports.Suspense:
          return 'Suspense';

        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            var context = type;
            return getContextName(context) + '.Consumer';

          case REACT_PROVIDER_TYPE:
            var provider = type;
            return getContextName(provider._context) + '.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            return getComponentName(type.type);

          case REACT_BLOCK_TYPE:
            return getComponentName(type._render);

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                return getComponentName(init(payload));
              } catch (x) {
                return null;
              }
            }
        }
      }

      return null;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }

    function hasValidRef(config) {
      {
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
      {
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
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    function warnIfStringRefCannotBeAutoConverted(config) {
      {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, instanceof check
     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} props
     * @param {*} key
     * @param {string|object} ref
     * @param {*} owner
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @internal
     */


    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
          {
            warnIfStringRefCannotBeAutoConverted(config);
          }
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      if (!!(element === null || element === undefined)) {
        {
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        }
      }

      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


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
      } // Children can be more than one argument, and those are transferred onto
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
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */


    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
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
      var escapedString = key.replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return text.replace(userProvidedKeyEscapeRegex, '$&/');
    }
    /**
     * Generate a key string that identifies a element within a set.
     *
     * @param {*} element A element that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getElementKey(element, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof element === 'object' && element !== null && element.key != null) {
        // Explicit key
        return escape('' + element.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        var _child = children;
        var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows:

        var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

        if (Array.isArray(mappedChild)) {
          var escapedChildKey = '';

          if (childKey != null) {
            escapedChildKey = escapeUserProvidedKey(childKey) + '/';
          }

          mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
            return c;
          });
        } else if (mappedChild != null) {
          if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
          }

          array.push(mappedChild);
        }

        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getElementKey(child, i);
          subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          var iterableChildren = children;
          {
            // Warn about using Maps as children
            if (iteratorFn === iterableChildren.entries) {
              if (!didWarnAboutMaps) {
                warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
              }

              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(iterableChildren);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getElementKey(child, ii++);
            subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          }
        } else if (type === 'object') {
          var childrenString = '' + children;
          {
            {
              throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
        }
      }

      return subtreeCount;
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
     *
     * The provided mapFunction(child, index) will be called for each
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
      var count = 0;
      mapIntoArray(children, result, '', '', function (child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children) {
      var n = 0;
      mapChildren(children, function () {
        n++; // Don't return anything
      });
      return n;
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      mapChildren(children, function () {
        forEachFunc.apply(this, arguments); // Don't return anything.
      }, forEachContext);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */


    function toArray(children) {
      return mapChildren(children, function (child) {
        return child;
      }) || [];
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
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
      if (!isValidElement(children)) {
        {
          throw Error("React.Children.only expected to receive a single React element child.");
        }
      }

      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
            error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
          }
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };
      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      var hasWarnedAboutUsingNestedContextConsumers = false;
      var hasWarnedAboutUsingConsumerProvider = false;
      var hasWarnedAboutDisplayNameOnConsumer = false;
      {
        // A separate object, but proxies back to the original context object for
        // backwards compatibility. It has a different $$typeof, so we can properly
        // warn for the incorrect usage of Context as a Consumer.
        var Consumer = {
          $$typeof: REACT_CONTEXT_TYPE,
          _context: context,
          _calculateChangedBits: context._calculateChangedBits
        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

        Object.defineProperties(Consumer, {
          Provider: {
            get: function get() {
              if (!hasWarnedAboutUsingConsumerProvider) {
                hasWarnedAboutUsingConsumerProvider = true;
                error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
              }

              return context.Provider;
            },
            set: function set(_Provider) {
              context.Provider = _Provider;
            }
          },
          _currentValue: {
            get: function get() {
              return context._currentValue;
            },
            set: function set(_currentValue) {
              context._currentValue = _currentValue;
            }
          },
          _currentValue2: {
            get: function get() {
              return context._currentValue2;
            },
            set: function set(_currentValue2) {
              context._currentValue2 = _currentValue2;
            }
          },
          _threadCount: {
            get: function get() {
              return context._threadCount;
            },
            set: function set(_threadCount) {
              context._threadCount = _threadCount;
            }
          },
          Consumer: {
            get: function get() {
              if (!hasWarnedAboutUsingNestedContextConsumers) {
                hasWarnedAboutUsingNestedContextConsumers = true;
                error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
              }

              return context.Consumer;
            }
          },
          displayName: {
            get: function get() {
              return context.displayName;
            },
            set: function set(displayName) {
              if (!hasWarnedAboutDisplayNameOnConsumer) {
                warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);
                hasWarnedAboutDisplayNameOnConsumer = true;
              }
            }
          }
        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

        context.Consumer = Consumer;
      }
      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }
      return context;
    }

    var Uninitialized = -1;
    var Pending = 0;
    var Resolved = 1;
    var Rejected = 2;

    function lazyInitializer(payload) {
      if (payload._status === Uninitialized) {
        var ctor = payload._result;
        var thenable = ctor(); // Transition to the next state.

        var pending = payload;
        pending._status = Pending;
        pending._result = thenable;
        thenable.then(function (moduleObject) {
          if (payload._status === Pending) {
            var defaultExport = moduleObject.default;
            {
              if (defaultExport === undefined) {
                error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
                'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
              }
            } // Transition to the next state.

            var resolved = payload;
            resolved._status = Resolved;
            resolved._result = defaultExport;
          }
        }, function (error) {
          if (payload._status === Pending) {
            // Transition to the next state.
            var rejected = payload;
            rejected._status = Rejected;
            rejected._result = error;
          }
        });
      }

      if (payload._status === Resolved) {
        return payload._result;
      } else {
        throw payload._result;
      }
    }

    function lazy(ctor) {
      var payload = {
        // We use these fields to store the result.
        _status: -1,
        _result: ctor
      };
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: payload,
        _init: lazyInitializer
      };
      {
        // In production, this would just set it on the object.
        var defaultProps;
        var propTypes; // $FlowFixMe

        Object.defineProperties(lazyType, {
          defaultProps: {
            configurable: true,
            get: function get() {
              return defaultProps;
            },
            set: function set(newDefaultProps) {
              error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              defaultProps = newDefaultProps; // Match production behavior more closely:
              // $FlowFixMe

              Object.defineProperty(lazyType, 'defaultProps', {
                enumerable: true
              });
            }
          },
          propTypes: {
            configurable: true,
            get: function get() {
              return propTypes;
            },
            set: function set(newPropTypes) {
              error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              propTypes = newPropTypes; // Match production behavior more closely:
              // $FlowFixMe

              Object.defineProperty(lazyType, 'propTypes', {
                enumerable: true
              });
            }
          }
        });
      }
      return lazyType;
    }

    function forwardRef(render) {
      {
        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
          error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
        } else if (typeof render !== 'function') {
          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        } else {
          if (render.length !== 0 && render.length !== 2) {
            error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
          }
        }

        if (render != null) {
          if (render.defaultProps != null || render.propTypes != null) {
            error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
          }
        }
      }
      var elementType = {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
      {
        var ownName;
        Object.defineProperty(elementType, 'displayName', {
          enumerable: false,
          configurable: true,
          get: function get() {
            return ownName;
          },
          set: function set(name) {
            ownName = name;

            if (render.displayName == null) {
              render.displayName = name;
            }
          }
        });
      }
      return elementType;
    } // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.


    var enableScopeAPI = false; // Experimental Create Event Handle API.

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
        return true;
      }

      if (typeof type === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
          return true;
        }
      }

      return false;
    }

    function memo(type, compare) {
      {
        if (!isValidElementType(type)) {
          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
        }
      }
      var elementType = {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: compare === undefined ? null : compare
      };
      {
        var ownName;
        Object.defineProperty(elementType, 'displayName', {
          enumerable: false,
          configurable: true,
          get: function get() {
            return ownName;
          },
          set: function set(name) {
            ownName = name;

            if (type.displayName == null) {
              type.displayName = name;
            }
          }
        });
      }
      return elementType;
    }

    function resolveDispatcher() {
      var dispatcher = ReactCurrentDispatcher.current;

      if (!(dispatcher !== null)) {
        {
          throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
        }
      }

      return dispatcher;
    }

    function useContext(Context, unstable_observedBits) {
      var dispatcher = resolveDispatcher();
      {
        if (unstable_observedBits !== undefined) {
          error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
        } // TODO: add a more generic warning for invalid values.


        if (Context._context !== undefined) {
          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
          // and nobody should be using this in existing code.

          if (realContext.Consumer === Context) {
            error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
          } else if (realContext.Provider === Context) {
            error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
          }
        }
      }
      return dispatcher.useContext(Context, unstable_observedBits);
    }

    function useState(initialState) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useState(initialState);
    }

    function useReducer(reducer, initialArg, init) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useReducer(reducer, initialArg, init);
    }

    function useRef(initialValue) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useRef(initialValue);
    }

    function useEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useEffect(create, deps);
    }

    function useLayoutEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useLayoutEffect(create, deps);
    }

    function useCallback(callback, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useCallback(callback, deps);
    }

    function useMemo(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useMemo(create, deps);
    }

    function useImperativeHandle(ref, create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useImperativeHandle(ref, create, deps);
    }

    function useDebugValue(value, formatterFn) {
      {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDebugValue(value, formatterFn);
      }
    } // Helpers to patch console.logs to avoid logging during side-effect free
    // replaying on render function. This currently only patches the object
    // lazily which won't cover if the log function was extracted eagerly.
    // We could also eagerly patch the method.


    var disabledDepth = 0;
    var prevLog;
    var prevInfo;
    var prevWarn;
    var prevError;
    var prevGroup;
    var prevGroupCollapsed;
    var prevGroupEnd;

    function disabledLog() {}

    disabledLog.__reactDisabledLog = true;

    function disableLogs() {
      {
        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          prevLog = console.log;
          prevInfo = console.info;
          prevWarn = console.warn;
          prevError = console.error;
          prevGroup = console.group;
          prevGroupCollapsed = console.groupCollapsed;
          prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

          var props = {
            configurable: true,
            enumerable: true,
            value: disabledLog,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            info: props,
            log: props,
            warn: props,
            error: props,
            group: props,
            groupCollapsed: props,
            groupEnd: props
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        disabledDepth++;
      }
    }

    function reenableLogs() {
      {
        disabledDepth--;

        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          var props = {
            configurable: true,
            enumerable: true,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            log: _assign({}, props, {
              value: prevLog
            }),
            info: _assign({}, props, {
              value: prevInfo
            }),
            warn: _assign({}, props, {
              value: prevWarn
            }),
            error: _assign({}, props, {
              value: prevError
            }),
            group: _assign({}, props, {
              value: prevGroup
            }),
            groupCollapsed: _assign({}, props, {
              value: prevGroupCollapsed
            }),
            groupEnd: _assign({}, props, {
              value: prevGroupEnd
            })
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        if (disabledDepth < 0) {
          error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
        }
      }
    }

    var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
    var prefix;

    function describeBuiltInComponentFrame(name, source, ownerFn) {
      {
        if (prefix === undefined) {
          // Extract the VM specific prefix used by each line.
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || '';
          }
        } // We use the prefix to ensure our stacks line up with native stack frames.


        return '\n' + prefix + name;
      }
    }

    var reentry = false;
    var componentFrameCache;
    {
      var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
      componentFrameCache = new PossiblyWeakMap();
    }

    function describeNativeComponentFrame(fn, construct) {
      // If something asked for a stack inside a fake render, it should get ignored.
      if (!fn || reentry) {
        return '';
      }

      {
        var frame = componentFrameCache.get(fn);

        if (frame !== undefined) {
          return frame;
        }
      }
      var control;
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

      Error.prepareStackTrace = undefined;
      var previousDispatcher;
      {
        previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
        // for warnings.

        ReactCurrentDispatcher$1.current = null;
        disableLogs();
      }

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function Fake() {
            throw Error();
          }; // $FlowFixMe


          Object.defineProperty(Fake.prototype, 'props', {
            set: function set() {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if (typeof Reflect === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            }

            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          }

          fn();
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          // This extracts the first frame from the sample that isn't also in the control.
          // Skipping one frame that we assume is the frame that calls the two.
          var sampleLines = sample.stack.split('\n');
          var controlLines = control.stack.split('\n');
          var s = sampleLines.length - 1;
          var c = controlLines.length - 1;

          while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
            // We expect at least one stack frame to be shared.
            // Typically this will be the root most one. However, stack frames may be
            // cut off due to maximum stack limits. In this case, one maybe cut off
            // earlier than the other. We assume that the sample is longer or the same
            // and there for cut off earlier. So we should find the root most frame in
            // the sample somewhere in the control.
            c--;
          }

          for (; s >= 1 && c >= 0; s--, c--) {
            // Next we find the first one that isn't the same which should be the
            // frame that called our sample function and the control.
            if (sampleLines[s] !== controlLines[c]) {
              // In V8, the first line is describing the message but other VMs don't.
              // If we're about to return the first line, and the control is also on the same
              // line, that's a pretty good indicator that our sample threw at same line as
              // the control. I.e. before we entered the sample frame. So we ignore this result.
              // This can happen if you passed a class to function component, or non-function.
              if (s !== 1 || c !== 1) {
                do {
                  s--;
                  c--; // We may still have similar intermediate frames from the construct call.
                  // The next one that isn't the same should be our match though.

                  if (c < 0 || sampleLines[s] !== controlLines[c]) {
                    // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                    var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                    {
                      if (typeof fn === 'function') {
                        componentFrameCache.set(fn, _frame);
                      }
                    } // Return the line we found.

                    return _frame;
                  }
                } while (s >= 1 && c >= 0);
              }

              break;
            }
          }
        }
      } finally {
        reentry = false;
        {
          ReactCurrentDispatcher$1.current = previousDispatcher;
          reenableLogs();
        }
        Error.prepareStackTrace = previousPrepareStackTrace;
      } // Fallback to just using the name if we couldn't make it throw.


      var name = fn ? fn.displayName || fn.name : '';
      var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
      {
        if (typeof fn === 'function') {
          componentFrameCache.set(fn, syntheticFrame);
        }
      }
      return syntheticFrame;
    }

    function describeFunctionComponentFrame(fn, source, ownerFn) {
      {
        return describeNativeComponentFrame(fn, false);
      }
    }

    function shouldConstruct(Component) {
      var prototype = Component.prototype;
      return !!(prototype && prototype.isReactComponent);
    }

    function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
      if (type == null) {
        return '';
      }

      if (typeof type === 'function') {
        {
          return describeNativeComponentFrame(type, shouldConstruct(type));
        }
      }

      if (typeof type === 'string') {
        return describeBuiltInComponentFrame(type);
      }

      switch (type) {
        case exports.Suspense:
          return describeBuiltInComponentFrame('Suspense');

        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame('SuspenseList');
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeFunctionComponentFrame(type.render);

          case REACT_MEMO_TYPE:
            // Memo may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

          case REACT_BLOCK_TYPE:
            return describeFunctionComponentFrame(type._render);

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                // Lazy may contain any component type so we recursively resolve it.
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {}
            }
        }
      }

      return '';
    }

    var loggedTypeFailures = {};
    var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
        }
      }
    }

    function checkPropTypes(typeSpecs, values, location, componentName, element) {
      {
        // $FlowFixMe This is okay but Flow doesn't know it.
        var has = Function.call.bind(Object.prototype.hasOwnProperty);

        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.

            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                err.name = 'Invariant Violation';
                throw err;
              }

              error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
            } catch (ex) {
              error$1 = ex;
            }

            if (error$1 && !(error$1 instanceof Error)) {
              setCurrentlyValidatingElement(element);
              error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
              setCurrentlyValidatingElement(null);
            }

            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error$1.message] = true;
              setCurrentlyValidatingElement(element);
              error('Failed %s type: %s', location, error$1.message);
              setCurrentlyValidatingElement(null);
            }
          }
        }
      }
    }

    function setCurrentlyValidatingElement$1(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          setExtraStackFrame(stack);
        } else {
          setExtraStackFrame(null);
        }
      }
    }

    var propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(source) {
      if (source !== undefined) {
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }

    function getSourceInfoErrorAddendumForProps(elementProps) {
      if (elementProps !== null && elementProps !== undefined) {
        return getSourceInfoErrorAddendum(elementProps.__source);
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
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
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
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
      }

      {
        setCurrentlyValidatingElement$1(element);
        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
        setCurrentlyValidatingElement$1(null);
      }
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

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
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
      {
        var type = element.type;

        if (type === null || type === undefined || typeof type === 'string') {
          return;
        }

        var propTypes;

        if (typeof type === 'function') {
          propTypes = type.propTypes;
        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }

        if (propTypes) {
          // Intentionally inside to avoid triggering lazy initializers:
          var name = getComponentName(type);
          checkPropTypes(propTypes, element.props, 'prop', name, element);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

          var _name = getComponentName(type);

          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
        }

        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      {
        var keys = Object.keys(fragment.props);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (key !== 'children' && key !== 'key') {
            setCurrentlyValidatingElement$1(fragment);
            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
            setCurrentlyValidatingElement$1(null);
            break;
          }
        }

        if (fragment.ref !== null) {
          setCurrentlyValidatingElement$1(fragment);
          error('Invalid attribute `ref` supplied to `React.Fragment`.');
          setCurrentlyValidatingElement$1(null);
        }
      }
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendumForProps(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        {
          error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
        }
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === exports.Fragment) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    var didWarnAboutDeprecatedCreateFactory = false;

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      {
        if (!didWarnAboutDeprecatedCreateFactory) {
          didWarnAboutDeprecatedCreateFactory = true;
          warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
        } // Legacy hook: remove it


        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    {
      try {
        var frozenObject = Object.freeze({});
        /* eslint-disable no-new */

        new Map([[frozenObject, null]]);
        new Set([frozenObject]);
        /* eslint-enable no-new */
      } catch (e) {}
    }
    var createElement$1 = createElementWithValidation;
    var cloneElement$1 = cloneElementWithValidation;
    var createFactory = createFactoryWithValidation;
    var Children = {
      map: mapChildren,
      forEach: forEachChildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    };
    exports.Children = Children;
    exports.Component = Component;
    exports.PureComponent = PureComponent;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
    exports.cloneElement = cloneElement$1;
    exports.createContext = createContext;
    exports.createElement = createElement$1;
    exports.createFactory = createFactory;
    exports.createRef = createRef;
    exports.forwardRef = forwardRef;
    exports.isValidElement = isValidElement;
    exports.lazy = lazy;
    exports.memo = memo;
    exports.useCallback = useCallback;
    exports.useContext = useContext;
    exports.useDebugValue = useDebugValue;
    exports.useEffect = useEffect;
    exports.useImperativeHandle = useImperativeHandle;
    exports.useLayoutEffect = useLayoutEffect;
    exports.useMemo = useMemo;
    exports.useReducer = useReducer;
    exports.useRef = useRef;
    exports.useState = useState;
    exports.version = ReactVersion;
  })();
}

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}

/***/ }),

/***/ "./src/main/App.jsx":
/*!**************************!*\
  !*** ./src/main/App.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "I am  react app.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "../../tenon/packages/tenon-core/dist/tenon-core.es.js":
/*!*************************************************************!*\
  !*** ../../tenon/packages/tenon-core/dist/tenon-core.es.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base": () => (/* binding */ Base),
/* harmony export */   "Button": () => (/* binding */ Button),
/* harmony export */   "Image": () => (/* binding */ Image),
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "Page": () => (/* binding */ Page),
/* harmony export */   "RootViewComponent": () => (/* binding */ RootViewComponent),
/* harmony export */   "Switch": () => (/* binding */ Switch),
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "TextArea": () => (/* binding */ TextArea),
/* harmony export */   "View": () => (/* binding */ View),
/* harmony export */   "document": () => (/* binding */ document),
/* harmony export */   "getComponent": () => (/* binding */ getComponent),
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/inherits */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createSuper */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");








var tenonUtils_cjs = {};
Object.defineProperty(tenonUtils_cjs, '__esModule', {
  value: true
});
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:(.+)/;

function parseStringStyle(cssText) {
  var ret = {};
  cssText.split(listDelimiterRE).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}

function transformAttr(style) {
  var tempStyle = {};
  Object.keys(style).forEach(function (key) {
    var humpKey = transformHumpKey(key);
    tempStyle[humpKey] = style[key];
  });
  return tempStyle;
}

function transformHumpKey(key) {
  var humpKey = key.replace(/-(\w)/g, function ($0, $1) {
    return $1.toUpperCase();
  });
  return humpKey;
}

var COLOR_MAP = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslateblue: '#8470ff',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  transparent: '#000000',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  violetred: '#d02090',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

function getColor(color) {
  return COLOR_MAP[color] || color;
}

function getEnvironmentInfo() {
  return {};
}

function traverseArr(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    var result = callback(item, i);

    if (!result) {
      break;
    }
  }
}

function makeMap(str) {
  var expectedLowerCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectedLowerCase ? function (val) {
    return !!map[val.toLowerCase()];
  } : function (val) {
    return !!map[val];
  };
}

function makeMapByArr(list) {
  var expectedLowerCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var map = Object.create(null);

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectedLowerCase ? function (val) {
    return !!map[val.toLowerCase()];
  } : function (val) {
    return !!map[val];
  };
}

var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
}

var unitAttrs = ['font-size', 'placeholder-font-size', 'flex-basis', 'width', 'max-width', 'min-width', 'height', 'max-height', 'min-height', 'padding', 'padding-left', 'padding-right', 'padding-bottom', 'padding-top', 'margin', 'margin-left', 'margin-right', 'margin-bottom', 'margin-top', 'left', 'right', 'top', 'bottom', 'border-width', 'border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width', 'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'];
var isNeedUnitTrasform = makeMapByArr(unitAttrs);
var isRemUnit = /rem$/;
var isVUnit = /v(h|w|min|max)$/;
var isCpxUnit = /cpx$/;

function transformUnit(style) {
  Object.keys(style).forEach(function (key) {
    if (isNeedUnitTrasform(key)) {
      var value = transformUnitValue(style[key]);
      style[key] = value;
    }
  });
  return style;
}

function transformUnitValue(value) {
  if (isRemUnit.test(value)) {
    return transfromRem(value);
  } else if (isVUnit.test(value)) {
    return transformVUnit(value);
  } else if (isCpxUnit.test(value)) {
    return transfromCpx(value);
  }

  return value;
}

function hexify(color) {
  var values = color.replace(/rgba?\(/, '').replace(/\)/, '').replace(/[\s+]/g, '').split(',');
  var a = parseFloat(values[3] || "1"),
      r = parseInt(values[0]),
      g = parseInt(values[1]),
      b = parseInt(values[2]),
      a = Math.floor(a * 255);
  return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2) + ("0" + a.toString(16)).slice(-2);
}

function transfromRem(value) {
  var num = (Number(value.replace(/rem/, '')) * 100).toFixed(2);
  return num + 'hm';
}

function transfromCpx(value) {
  var num = value.replace(/cpx/, 'hm');
  return num;
}

function transformVUnit(value) {
  return value;
}

var colorAttrs = "color,background-color,border-color,border-top-color,border-left-color,border-right-color,border-bottom-color,placeholder-color,cursor-color";
var isColorAttr = makeMap(colorAttrs);
var rgbaReg = /rgba?/;

function transformColor(style) {
  Object.keys(style).forEach(function (key) {
    if (isColorAttr(key)) {
      var value = style[key];

      if (isRgba(value)) {
        style[key] = hexify(value);
      } else {
        style[key] = transformColorStyle(value);
      }
    }
  });
  return style;
}

function isRgba(color) {
  return rgbaReg.test(color);
}

function transformColorStyle(value) {
  if (/^#/.test(value) && value.length === 4) {
    return normalizeColor(value);
  } else {
    return getColor(value);
  }
}

function normalizeColor(value) {
  return value.replace(/(\w)/ig, function (match) {
    return "".concat(match).concat(match);
  });
}

var commonAttrs = ["margin", "padding"];
var borderAttrs = ["border-radius"];
var attrs$2 = commonAttrs.concat(borderAttrs);
var isDirectAttr = makeMapByArr(commonAttrs);
var isBorderDirectAttr = makeMapByArr(borderAttrs);

function transformBreakToken(style) {
  var tempStyle = Object.assign({}, style);
  attrs$2.forEach(function (attr) {
    if (!style[attr]) {
      return;
    }

    if (isDirectAttr(attr)) {
      delete tempStyle[attr];
      tempStyle = extend(breakDirectionAttr({
        attr: attr,
        value: style[attr]
      }), tempStyle);
    } else if (isBorderDirectAttr(attr)) {
      delete tempStyle[attr];
      tempStyle = extend(breakBorderRadiusAttr({
        attr: attr,
        value: style[attr]
      }, /\s+/), tempStyle);
    }
  });
  return tempStyle;
}

function breakDirectionAttr(_ref) {
  var attr = _ref.attr,
      value = _ref.value;
  var splitReg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /\s/;
  var vals = value.split(splitReg).map(function (item) {
    return item.trim();
  });
  var top, right, bottom, left;

  switch (vals.length) {
    case 1:
      top = vals[0];
      right = vals[0];
      bottom = vals[0];
      left = vals[0];
      break;

    case 2:
      top = vals[0];
      right = vals[1];
      bottom = vals[0];
      left = vals[1];
      break;

    case 3:
      top = vals[0];
      right = vals[1];
      bottom = vals[2];
      left = vals[1];
      break;

    case 4:
      top = vals[0];
      right = vals[1];
      bottom = vals[2];
      left = vals[3];
      break;

    default:
      top = 0;
      bottom = 0;
      left = 0;
      right = 0;
      break;
  }

  return {
    [attr + '-top']: top,
    [attr + '-right']: right,
    [attr + '-bottom']: bottom,
    [attr + '-left']: left
  };
}

function breakBorderRadiusAttr(_ref2) {
  var attr = _ref2.attr,
      value = _ref2.value;
  var splitReg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /\s+/;
  var vals = value.split(splitReg).map(function (item) {
    return item.trim();
  });
  var topLeft, topRight, bottomLeft, bottomRight;

  if (vals.length === 1) {
    return {
      'border-radius': vals[0]
    };
  }

  switch (vals.length) {
    case 1:
      topLeft = vals[0];
      topRight = vals[0];
      bottomRight = vals[0];
      bottomLeft = vals[0];
      break;

    case 2:
      topLeft = vals[0];
      topRight = vals[1];
      bottomRight = vals[0];
      bottomLeft = vals[1];
      break;

    case 3:
      topLeft = vals[0];
      topRight = vals[1];
      bottomRight = vals[2];
      bottomLeft = vals[1];
      break;

    case 4:
      topLeft = vals[0];
      topRight = vals[1];
      bottomRight = vals[2];
      bottomLeft = vals[3];
      break;

    default:
      topLeft = 0;
      topRight = 0;
      bottomRight = 0;
      bottomLeft = 0;
      break;
  }

  return {
    ['border-top-left-radius']: topLeft,
    ['border-top-right-radius']: topRight,
    ['border-bottom-right-radius']: bottomRight,
    ['border-bottom-left-radius']: bottomLeft
  };
}

var Keyword;

(function (Keyword) {
  Keyword["AUTO"] = "auto";
})(Keyword || (Keyword = {}));

var BorderStyle;

(function (BorderStyle) {
  BorderStyle["NONE"] = "none";
  BorderStyle["SOLID"] = "solid";
  BorderStyle["DASHED"] = "dashed";
  BorderStyle["DOTTED"] = "dotted";
})(BorderStyle || (BorderStyle = {}));

function isNumber(num) {
  return !isNaN(num);
}

function isLength(length) {
  var lengthReg = /[\d\.]+(%|rem|hm|cpx|px|vw|vh)?$/;
  return lengthReg.test(length);
}

function isBorderStyle(value) {
  return [BorderStyle.NONE, BorderStyle.DASHED, BorderStyle.DOTTED, BorderStyle.SOLID].findIndex(function (borderStyle) {
    return value === borderStyle;
  }) !== -1;
}

var attrs$1 = ["border", "border-left", "border-right", "border-top", "border-bottom"];

function transformBorder(style) {
  var tempStyle = Object.assign({}, style);
  attrs$1.forEach(function (attr) {
    if (!style[attr]) {
      return;
    } else {
      delete tempStyle[attr];
      tempStyle = extend(transformBorderStyle(attr, style[attr]), tempStyle);
    }
  });
  return tempStyle;
}

function transformBorderStyle(attr, borderValue) {
  var values = borderValue.trim().split(/\s+/);
  var tempStyle = {};

  for (var i = 0, len = values.length; i < len; i++) {
    if (isBorderStyle(values[i])) {
      tempStyle[attr + "-style"] = values[i];
    } else if (isLength(values[i])) {
      tempStyle[attr + "-width"] = values[i];
    } else {
      tempStyle[attr + "-color"] = values[i];
    }
  }

  return tempStyle;
}

var attrs = ["box-shadow"];

function transformShadow(style) {
  traverseArr(attrs, function (item, index) {
    if (style[item]) {
      style["shadow"] = getShadowValue(style[item]);
      delete style[item];
    }
  });
  return style;
}

function getShadowValue(value) {
  var values = value;

  if (!values) {
    return '';
  }

  var shadowItems = transformValue(value);

  if (shadowItems.length > 4) {
    values = [shadowItems[0], shadowItems[1], shadowItems[2], shadowItems[4]].join(' ');
  } else {
    values = shadowItems.join(' ');
  }

  return values;
}

function transformValue(value) {
  var rgbReg = /rgb?/,
      rgbaReg = /rgba?/;
  var values = value,
      shadowItems = new Array();

  if (rgbReg.test(values)) {
    shadowItems = [].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(values.slice(0, values.indexOf('rgb')).trim().split(/\s/)), [values.slice(values.indexOf('rgb'))]);
  } else {
    shadowItems = values.split(/\s/);
  }

  for (var i = 0; i < shadowItems.length; i++) {
    if (rgbaReg.test(shadowItems[i])) {
      shadowItems[i] = hexify(shadowItems[i]);
    } else {
      shadowItems[i] = transformUnitValue(shadowItems[i]);
    }
  }

  return shadowItems;
}

var borderRadius$1 = "border-radius,border-top-left-radius,border-top-right-radius,border-bottom-left-radius,border-bottom-right-radius";
var isBorderRadius$1 = makeMap(borderRadius$1);

function transformAdapter(style) {
  var tempStyle = Object.assign({}, style);
  tempStyle = hackForBorderRadius$1(tempStyle);
  tempStyle = hackForDefaultFlex(tempStyle);
  tempStyle = hackForWhiteSpace(tempStyle);
  return tempStyle;
}

function hackForWhiteSpace(style) {
  if (style['white-space'] === 'nowrap') {
    style['textLineClamp'] = "1";
  }

  return style;
}

function hackForDefaultFlex(style) {
  if (style['display'] === 'flex' && !style['flex-direction']) {
    style['flex-direction'] = 'row';
  }

  return style;
}

function hackForBorderRadius$1(style) {
  if (hasSpecialAttr$1(style, isBorderRadius$1)) {
    transformBorderRadius(style);
  }

  return style;
}

function hasSpecialAttr$1(obj, func) {
  return Object.keys(obj).some(function (key) {
    return func(key);
  });
}

function transformBorderRadius(style) {
  if (!style.width) {
    return;
  }

  var _style$width$split = style.width.split(/([\d\.]+)/),
      _style$width$split2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__.default)(_style$width$split, 3),
      width = _style$width$split2[1],
      unit = _style$width$split2[2];

  if (unit === '%') {
    return;
  }

  Object.keys(style).forEach(function (key) {
    if (isBorderRadius$1(key)) {
      style[key] = getBorderRadius(style[key], {
        width,
        unit
      });
    }
  });
}

function getBorderRadius(value, _ref3) {
  var width = _ref3.width,
      unit = _ref3.unit;

  var _value$split = value.split(/([\d\.]+)/),
      _value$split2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__.default)(_value$split, 3),
      bPercent = _value$split2[1],
      bUnit = _value$split2[2];

  if (bUnit === '%') {
    return (width * parseFloat(bPercent) / 100).toFixed(2) + unit;
  }

  return value;
}

var CLIP_LIST = ['border-box', 'padding-box', 'content-box', 'text'];
var REPEAT_LIST = ['repeat-x', 'repeat-y', 'repeat', 'space', 'round', 'no-repeat'];
var SIZE_LIST = ['contain', 'cover'];
var isUrl = /url\((?:"|')/;
var isImageBase64Reg = /url\(data:/;
var isLinearGradient = /linear\-gradient/;
var imageUrlReg = /url\((?:"|')?([\w\W]+)(?:"|')\)/;
var imageBase64Reg = /url\(([\w\W]+)\)/;
var linearReg = /linear\-gradient\(([\w\W]+)\)/;

function transformBackground(style) {
  var tempStyle = Object.assign({}, style);

  if (tempStyle['background-image']) {
    var value = tempStyle['background-image'];

    if (isLinearGradient.test(value.trim())) {
      delete tempStyle['background-image'];
      var matches = value.match(linearReg);
      var linearValue = matches && matches[1] || '';
      tempStyle['background-color'] = 'linear-gradient(' + transformLinear(linearValue) + ')';
    } else {
      tempStyle['background-image'] = transformBackgroundImage(value);
    }
  }

  if (tempStyle['background']) {
    var _value = tempStyle['background'];
    delete tempStyle['background'];
    tempStyle = Object.assign(Object.assign({}, splitBackground(_value)), tempStyle);
  }

  return tempStyle;
}

function splitBackground(value) {
  var newBackgroundMap = {};
  var colorKeys = Object.keys(COLOR_MAP).join('|');
  var color = '(#\\w{3,8})|(rgba?\\(.+\\))';
  var isColor = new RegExp("(".concat(color, "|").concat(colorKeys, ")"));

  if (isColor.test(value)) {
    var match = isColor.exec(value);

    if (match) {
      newBackgroundMap['background-color'] = match[0];
    }
  }

  if (isUrl.test(value)) {
    var urlMatch = /url\(.+\)/;

    var _match = urlMatch.exec(value);

    var backgorundImage = _match && _match[0];

    if (backgorundImage) {
      newBackgroundMap['background-image'] = transformBackgroundImage(backgorundImage);
    }
  }

  var clipMatch = matchKeyList(CLIP_LIST, value);

  if (clipMatch) {
    newBackgroundMap['backgrond-clip'] = clipMatch;
  }

  var repeatMatch = matchKeyList(REPEAT_LIST, value);

  if (repeatMatch) {
    newBackgroundMap['background-repeat'] = repeatMatch;
  }

  var sizeMatch = matchKeyList(SIZE_LIST, value);

  if (sizeMatch) {
    newBackgroundMap['background-size'] = sizeMatch;
  }

  return newBackgroundMap;
}

function matchKeyList(list, value) {
  var matchList = list.join('|');
  var isList = new RegExp(matchList);

  if (isList.test(value)) {
    var match = isList.exec(value);

    if (match) {
      return match[0];
    }
  }

  return '';
}

function transformBackgroundImage(value) {
  var backgroundImage = value.trim();

  if (isUrl.test(backgroundImage)) {
    var matches = backgroundImage.match(imageUrlReg);
    return matches && matches[1] || '';
  } else if (isImageBase64Reg.test(backgroundImage)) {
    var _matches = backgroundImage.match(imageBase64Reg);

    return _matches && _matches[1] || '';
  }

  return '';
}

function transformLinear(value) {
  var backgroundLinear = value.replace(/\s+/g, '');
  var isRgba = /rgba?/;
  var rgbaReg = /rgba\(\d+,\d+,\d+,[\d\.]+\)/g;

  if (isRgba.test(backgroundLinear)) {
    var matcheList = backgroundLinear.match(rgbaReg);

    for (var item in matcheList) {
      backgroundLinear = backgroundLinear.replace(matcheList[parseInt(item)], hexify(matcheList[parseInt(item)]));
    }
  }

  backgroundLinear = backgroundLinear.split(',').map(function (res) {
    return getColor(res);
  }).join(' ');
  return backgroundLinear;
}

function transformFlex(style) {
  var tempStyle = Object.assign({}, style);

  if (tempStyle['flex']) {
    var value = tempStyle['flex'];
    delete tempStyle['flex'];
    tempStyle = Object.assign(Object.assign(Object.assign({}, defaultFlexStyle), transformFlexStyle(value + "")), tempStyle);
  }

  return tempStyle;
}

var defaultFlexStyle = {
  "flex-grow": 0,
  "flex-shrink": 0,
  "flex-basis": 'auto'
};

function transformFlexStyle(flexStyleValue) {
  var tempStyle = {};
  var values = flexStyleValue.trim().split(/\s+/);

  switch (values.length) {
    case 1:
      tempStyle = handleFlexStyleBy1(values);
      break;

    case 2:
      tempStyle = handleFlexStyleBy2(values);
      break;

    case 3:
      tempStyle = handleFlexStyleBy3(values);
      break;
  }

  return tempStyle;
}

function handleFlexStyleBy1(values) {
  var value = values[0];
  var tempStyle = {};

  if (isNaN(parseInt(value))) {
    tempStyle["flex-basis"] = value;
  } else {
    if (value === "0") {
      tempStyle["flex-basis"] = 0;
    } else {
      tempStyle["flex-grow"] = Number(value);
      tempStyle["flex-shrink"] = Number(value);
    }
  }

  return tempStyle;
}

function handleFlexStyleBy2(values) {
  var tempStyle = {};

  var _values = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__.default)(values, 2),
      firstValue = _values[0],
      secondValue = _values[1];

  if (firstValue) {
    tempStyle["flex-grow"] = firstValue;
  }

  if (secondValue) {
    if (isNumber(secondValue)) {
      tempStyle["flex-shrink"] = Number(secondValue);
    } else {
      tempStyle["flex-basis"] = secondValue;
    }
  }

  return tempStyle;
}

function handleFlexStyleBy3(values) {
  var _values2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__.default)(values, 3),
      firstValue = _values2[0],
      secondValue = _values2[1],
      thirdValue = _values2[2];

  return {
    "flex-grow": firstValue,
    "flex-shrink": secondValue,
    "flex-basis": thirdValue
  };
}

function transformTransform(style) {
  var tempStyle = Object.assign({}, style);

  if (tempStyle['transform']) {
    var value = tempStyle['transform'];
    tempStyle = Object.assign(Object.assign({}, tempStyle), splitToArray(transTranslateUnit(replaceDeg(value))));
  }

  return tempStyle;
}

function splitToArray(params) {
  return {
    transform: params.trim().split(/\s+/g).join(',')
  };
}

function replaceDeg(str) {
  return str.replace(/deg/g, '');
}

function transTranslateUnit(str) {
  var arr = str.replace(/\s/g, '').match(/[a-zA-Z0-9]+\(.+?\)/g) || [];
  arr.map(function (item, index) {
    if (item.indexOf('translate') > -1 || item.indexOf('position') > -1) {
      var temp = item.match(/[^(][a-zA-Z0-9,]+(?=\))/g);
      var key = item.split('(')[0];
      var value = temp ? temp[0] : '0';
      value = value.split(',').map(function (v) {
        return transformUnitValue(v);
      }).join(',');
      arr[index] = "".concat(key, "(").concat(value, ")");
    }
  });
  return arr.join(' ');
}

var transitionFullProperty = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'];

function transformTransition(style) {
  var tempStyle = Object.assign({}, style);
  transitionFullProperty.forEach(function (property) {
    if (tempStyle[property]) {
      var value = tempStyle[property];
      tempStyle = Object.assign(Object.assign({}, getHummerProp(property, value)), tempStyle);
      delete tempStyle[property];
    }
  });

  if (tempStyle['transition']) {
    var value = tempStyle['transition'];
    tempStyle = Object.assign(Object.assign({}, splitToFullProps(value)), tempStyle);
    delete tempStyle['transition'];
  }

  return tempStyle;
}

function getHummerProp(property, value) {
  var obj = {};
  obj[property] = isTime(value) ? value.replace('s', '') : value;
  return obj;
}

function splitToFullProps(params) {
  var transitionPropertyArray = [];
  var transitionDurationArray = [];
  var transitionTimingFunctionArray = [];
  var transitionDelayArray = [];
  var transitionArray = params.split(',');
  transitionArray.forEach(function (transition) {
    var transitonValues = transition.trim().split(/\s+/g);
    transitonValues = getFullValues(transitonValues);
    transitionPropertyArray.push(transitonValues[0]);
    transitionDurationArray.push(transitonValues[1].replace('s', ''));
    transitionTimingFunctionArray.push(transitonValues[2]);
    transitionDelayArray.push(transitonValues[3].replace('s', ''));
  });
  return {
    'transition-property': transitionPropertyArray.join(','),
    'transition-duration': transitionDurationArray.join(','),
    'transition-timing-function': transitionTimingFunctionArray[0],
    'transition-delay': transitionDelayArray[0]
  };
}

function getFullValues(transitonValues) {
  var tempArray = [];
  tempArray = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(transitonValues);

  if (transitonValues.length === 2) {
    tempArray = [].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(transitonValues), ['ease', '0s']);
  } else if (transitonValues.length === 3) {
    if (isTime(transitonValues[2])) {
      tempArray = [transitonValues[0], transitonValues[1], 'ease', transitonValues[2]];
    } else {
      tempArray = [].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(transitonValues), ['0s']);
    }
  }

  return tempArray;
}

function isTime(str) {
  return /^\d*[s]$/.test(str);
}

var NODE_VIEW = Symbol('NODE_VIEW');
var NODE_TEXT = Symbol('NODE_TEXT');
var NODE_IMAGE = Symbol('NODE_IMAGE');
var NODE_BUTTON = Symbol('NODE_BUTTON');
var NODE_TEXTAREA = Symbol('NODE_TEXTAREA');
var NODE_INPUT = Symbol('NODE_INPUT');
var NODE_SWITCH = Symbol('NODE_SWITCH');
var NODE_SCROLLER = Symbol('NODE_SCROLLER');
var NODE_VIEW_PAGER = Symbol('NODE_VIEW_PAGER');
var NODE_LIST = Symbol('NODE_LIST');
var NODE_DIALOG = Symbol('NODE_DIALOG');
var NODE_ANIMATION_VIEW = Symbol('NODE_ANIMATION_VIEW');
var NODE_COMMENT = Symbol('NODE_COMMENT');
var NODE_ANCHOR = Symbol('NODE_ANCHOR');
var NODE_REFRESH = Symbol('NODE_REFRESH');
var NODE_LOADMORE = Symbol('NODE_LOADMORE');
var ELEMNT_TAG_MAP = {
  [NODE_VIEW]: 'view',
  [NODE_TEXT]: 'text',
  [NODE_IMAGE]: 'image',
  [NODE_BUTTON]: 'button',
  [NODE_TEXTAREA]: 'textarea',
  [NODE_INPUT]: 'input',
  [NODE_SWITCH]: 'switch',
  [NODE_SCROLLER]: 'scroller',
  [NODE_VIEW_PAGER]: 'viewpager',
  [NODE_LIST]: 'list',
  [NODE_DIALOG]: 'dialog',
  [NODE_ANIMATION_VIEW]: 'animation',
  [NODE_ANCHOR]: 'anchor',
  [NODE_REFRESH]: 'refresh',
  [NODE_LOADMORE]: 'loadmore'
};
var borderRadius = 'borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius';
var isBorderRadius = makeMap(borderRadius);

function dynamicTransformAdapter(style, view) {
  var tempStyle = {};
  tempStyle = hackForBorderRadius(view, style);
  return tempStyle;
}

function hackForBorderRadius(view, style) {
  if (view && view.__NAME === NODE_IMAGE && hasSpecialAttr(style, isBorderRadius)) {
    style['overflow'] = 'hidden';
  }

  return style;
}

function hasSpecialAttr(obj, func) {
  return Object.keys(obj).some(function (key) {
    return func(key);
  });
}

var StyleTransformer = /*#__PURE__*/function () {
  function StyleTransformer() {
    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, StyleTransformer);

    this.middlewares = [];
    this.registerMiddleware();
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(StyleTransformer, [{
    key: "registerMiddleware",
    value: function registerMiddleware() {
      this.use(transformAdapter).use(transformBreakToken).use(transformBackground).use(transformTransform).use(transformTransition).use(transformFlex).use(transformBorder).use(transformShadow).use(transformColor).use(transformUnit).use(transformAttr);
    }
  }, {
    key: "use",
    value: function use(middleware) {
      if (typeof middleware !== 'function') {
        throw "middleware must be a function";
      }

      this.middlewares.push(middleware);
      return this;
    }
  }, {
    key: "transformStyle",
    value: function transformStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var view = arguments.length > 1 ? arguments[1] : undefined;
      var tempStyle = style;
      this.middlewares.forEach(function (middleware) {
        var result = middleware(tempStyle, view);
        tempStyle = result ? result : tempStyle;
      });
      return tempStyle;
    }
  }]);

  return StyleTransformer;
}();

var StyleDynamicTransformer = /*#__PURE__*/function () {
  function StyleDynamicTransformer() {
    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, StyleDynamicTransformer);

    this.middlewares = [];
    this.registerMiddleware();
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(StyleDynamicTransformer, [{
    key: "registerMiddleware",
    value: function registerMiddleware() {
      this.use(dynamicTransformAdapter);
    }
  }, {
    key: "use",
    value: function use(middleware) {
      if (typeof middleware !== 'function') {
        throw "middleware must be a function";
      }

      this.middlewares.push(middleware);
      return this;
    }
  }, {
    key: "transformStyle",
    value: function transformStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var view = arguments.length > 1 ? arguments[1] : undefined;
      var tempStyle = style;
      this.middlewares.forEach(function (middleware) {
        var result = middleware(tempStyle, view);
        tempStyle = result ? result : tempStyle;
      });
      return tempStyle;
    }
  }]);

  return StyleDynamicTransformer;
}();

var styleTransformer = new StyleTransformer();
var styleDynamicTransformer = new StyleDynamicTransformer();
var isNativeTagReg = /^ex-/;
var NativeTags = "view,text,image,input,textarea,button,scroller,switch,refresh,loadmore,list,viewpager";
var isNativeTags = makeMap(NativeTags);

var isCustomNativeTag = function isCustomNativeTag(tag) {
  return isNativeTagReg.test(tag);
};

var extend = Object.assign;
var ELEMNT_TAG_MAP_1 = tenonUtils_cjs.ELEMNT_TAG_MAP = ELEMNT_TAG_MAP;
var NODE_ANCHOR_1 = tenonUtils_cjs.NODE_ANCHOR = NODE_ANCHOR;
tenonUtils_cjs.NODE_ANIMATION_VIEW = NODE_ANIMATION_VIEW;
var NODE_BUTTON_1 = tenonUtils_cjs.NODE_BUTTON = NODE_BUTTON;
var NODE_COMMENT_1 = tenonUtils_cjs.NODE_COMMENT = NODE_COMMENT;
tenonUtils_cjs.NODE_DIALOG = NODE_DIALOG;
var NODE_IMAGE_1 = tenonUtils_cjs.NODE_IMAGE = NODE_IMAGE;
var NODE_INPUT_1 = tenonUtils_cjs.NODE_INPUT = NODE_INPUT;
tenonUtils_cjs.NODE_LIST = NODE_LIST;
var NODE_LOADMORE_1 = tenonUtils_cjs.NODE_LOADMORE = NODE_LOADMORE;
var NODE_REFRESH_1 = tenonUtils_cjs.NODE_REFRESH = NODE_REFRESH;
var NODE_SCROLLER_1 = tenonUtils_cjs.NODE_SCROLLER = NODE_SCROLLER;
var NODE_SWITCH_1 = tenonUtils_cjs.NODE_SWITCH = NODE_SWITCH;
var NODE_TEXT_1 = tenonUtils_cjs.NODE_TEXT = NODE_TEXT;
var NODE_TEXTAREA_1 = tenonUtils_cjs.NODE_TEXTAREA = NODE_TEXTAREA;
var NODE_VIEW_1 = tenonUtils_cjs.NODE_VIEW = NODE_VIEW;
tenonUtils_cjs.NODE_VIEW_PAGER = NODE_VIEW_PAGER;
tenonUtils_cjs.NativeTags = NativeTags;
tenonUtils_cjs.camelize = camelize;
tenonUtils_cjs.extend = extend;
var getColor_1 = tenonUtils_cjs.getColor = getColor;
tenonUtils_cjs.getEnvironmentInfo = getEnvironmentInfo;
var isCustomNativeTag_1 = tenonUtils_cjs.isCustomNativeTag = isCustomNativeTag;
tenonUtils_cjs.isNativeTags = isNativeTags;
tenonUtils_cjs.makeMap = makeMap;
tenonUtils_cjs.makeMapByArr = makeMapByArr;
tenonUtils_cjs.parseStringStyle = parseStringStyle;
var styleDynamicTransformer_1 = tenonUtils_cjs.styleDynamicTransformer = styleDynamicTransformer;
var styleTransformer_1 = tenonUtils_cjs.styleTransformer = styleTransformer;
var transformUnitValue_1 = tenonUtils_cjs.transformUnitValue = transformUnitValue;
tenonUtils_cjs.traverseArr = traverseArr;
var ViewCache = new Map();
var FixedViewCache = new Map();

var setCacheNode = function setCacheNode(node) {
  ViewCache.set(node.__view_id, node);
};

var deleteCacheNode = function deleteCacheNode(node) {
  ViewCache.delete(node.__view_id);
};

var handleFixedNodeByStyle = function handleFixedNodeByStyle(node, newStyle) {
  var oldPosition = node.style.position;
  var newPosition = newStyle.position;

  if (newPosition === 'fixed') {
    registerFixedNode(node);
    return true;
  }

  if (oldPosition === 'fixed' && newPosition !== 'fixed') {
    unRegisterFixedNode(node);
    return false;
  }

  return false;
};

var registerFixedNode = function registerFixedNode(node) {
  var fixedNode = {
    id: node.__view_id,
    parents: node.parent ? getParentIds(node.__view_id) : null
  };
  FixedViewCache.set(node.__view_id, fixedNode);
};

var unRegisterFixedNode = function unRegisterFixedNode(node) {
  var id = node.__view_id;
  FixedViewCache.delete(id);
};

var removeChildWithFixed = function removeChildWithFixed(node) {
  var __view_id = node.__view_id;
  FixedViewCache.forEach(function (fixedNode) {
    var id = fixedNode.id,
        parents = fixedNode.parents;

    if (fixedNode.parents === null) {
      parents = fixedNode.parents = getParentIds(id);
    }

    if (parents && parents.has(__view_id)) {
      deleteNodeByViewId(id);
    }

    if (id === __view_id) {
      FixedViewCache.delete(id);
    }
  });
  deleteCacheNode(node);
};

function getParentIds(id) {
  var ids = new Set();
  var node = ViewCache.get(id);

  while (node) {
    if (node.parent) {
      ids.add(node.parent.__view_id);
    }

    node = node.parent;
  }

  return ids;
}

function deleteNodeByViewId(id) {
  var node = ViewCache.get(id);

  if (node && node.parent) {
    node.parent._removeChild(node);
  }

  FixedViewCache.delete(id);
}

var animationId = 0;
var EasingType;

(function (EasingType) {
  EasingType["LINEAR"] = "linear";
  EasingType["EASE"] = "ease";
  EasingType["EASE_IN"] = "ease-in";
  EasingType["EASE_OUT"] = "ease-out";
  EasingType["EASE_IN_OUT"] = "ease-in-out";
})(EasingType || (EasingType = {}));

var AnimationStyle;

(function (AnimationStyle) {
  AnimationStyle["POSITION"] = "position";
  AnimationStyle["SCALE"] = "scale";
  AnimationStyle["SCALEX"] = "scaleX";
  AnimationStyle["SCALEY"] = "scaleY";
  AnimationStyle["ROTATIONX"] = "rotationX";
  AnimationStyle["ROTATIONY"] = "rotationY";
  AnimationStyle["ROTATIONZ"] = "rotationZ";
  AnimationStyle["OPACITY"] = "opacity";
  AnimationStyle["BACKGROUND_COLOR"] = "backgroundColor";
  AnimationStyle["WIDTH"] = "width";
  AnimationStyle["HEIGHT"] = "height";
})(AnimationStyle || (AnimationStyle = {}));

function handleKeyframeAnimation(node, animation) {
  var id = animation.id,
      onEnd = animation.onEnd,
      onStart = animation.onStart,
      keyframes = animation.keyframes,
      _animation$repeatCoun = animation.repeatCount,
      repeatCount = _animation$repeatCoun === void 0 ? 1 : _animation$repeatCoun,
      duration = animation.duration,
      delay = animation.delay,
      _animation$easing = animation.easing,
      easing = _animation$easing === void 0 ? 'linear' : _animation$easing;
  var element = node.element;
  var styles = keyframes[0].styles;
  styles = transformStyle(styles);
  var len = Object.keys(styles).length;

  if (!id) {
    id = animationId++;
  }

  Object.keys(styles).forEach(function (key, index) {
    var ani = new __GLOBAL__.KeyframeAnimation(key);
    var tempKeyframes = [];
    keyframes.forEach(function (keyframe) {
      var transformedStyles = transformStyle(keyframe.styles);

      if (transformedStyles[key] !== undefined) {
        tempKeyframes.push({
          percent: keyframe.percent,
          value: transformedStyles[key]
        });
      }
    });
    ani.keyframes = tempKeyframes;
    easing && (ani.easing = easing);
    duration && (ani.duration = handleDuration(duration));
    delay && (ani.delay = handleDelay(delay));
    repeatCount && (ani.repeatCount = repeatCount);

    if (index === 0) {
      onStart && ani.on("start", function () {
        onStart && onStart();
      });
    }

    onEnd && ani.on("end", function () {
      if (--len <= 0) {
        onEnd && onEnd();
      }
    });
    element.addAnimation(ani, id + "_" + key);
  });
}

function handleBasicAnimation(node, animation) {
  var styles = animation.styles,
      id = animation.id,
      duration = animation.duration,
      delay = animation.delay,
      repeatCount = animation.repeatCount,
      easing = animation.easing,
      onStart = animation.onStart,
      onEnd = animation.onEnd;
  var element = node.element;
  styles = transformStyle(styles);

  if (!id) {
    id = animationId++;
  }

  var len = Object.keys(styles).length;
  Object.keys(styles).forEach(function (key, index) {
    var ani = new __GLOBAL__.BasicAnimation(key);
    ani.value = styles[key];
    easing && (ani.easing = easing);
    !isNaN(duration) && (ani.duration = handleDuration(duration));
    !isNaN(delay) && (ani.delay = handleDelay(delay));
    !isNaN(repeatCount) && (ani.repeatCount = repeatCount);

    if (index === 0) {
      onStart && ani.on("start", function () {
        onStart && onStart();
      });
    }

    onEnd && ani.on("end", function () {
      if (--len <= 0) {
        onEnd && onEnd();
      }
    });
    element.addAnimation(ani, id + "_" + key);
  });
}

function handleStepAnimation(node, animation) {
  var id = animation.id,
      onEnd = animation.onEnd,
      onStart = animation.onStart,
      steps = animation.steps;
  var current = Promise.resolve();
  steps && steps.forEach(function (step, index) {
    var _onStart;

    var _onEnd;

    current = current.then(function () {
      return new Promise(function (resolve) {
        if (index === 0) {
          _onStart = function _onStart() {
            step.onStart && step.onStart();
            onStart && onStart();
          };
        }

        if (index === steps.length - 1) {
          _onEnd = function _onEnd() {
            step.onEnd && step.onEnd();
            onEnd && onEnd();
          };
        } else {
          _onEnd = function _onEnd() {
            step.onEnd && step.onEnd();
            resolve();
          };
        }

        handleBasicAnimation(node, Object.assign(Object.assign({}, step), {
          id: id + "_" + index,
          onStart: _onStart,
          onEnd: _onEnd
        }));
      });
    });
  });
}

function transformStyle(styles) {
  Object.keys(styles).forEach(function (key) {
    switch (key) {
      case AnimationStyle.POSITION:
        var position = styles[key];
        styles[key] = {
          x: transformUnitValue_1(position.x),
          y: transformUnitValue_1(position.y)
        };
        break;

      case AnimationStyle.BACKGROUND_COLOR:
        styles[key] = getColor_1(styles[key]);
        break;

      case AnimationStyle.WIDTH:
        styles[key] = transformUnitValue_1(styles[key]);
        break;

      case AnimationStyle.HEIGHT:
        styles[key] = transformUnitValue_1(styles[key]);
        break;
    }
  });
  return styles;
}

function handleDuration(duration) {
  return duration / 1000;
}

function handleDelay(delay) {
  return delay / 1000;
}

var _handleAnimation = function handleAnimation(context, animation) {
  if (animation.keyframes) {
    handleKeyframeAnimation(context, animation);
  }

  if (animation.styles) {
    handleBasicAnimation(context, animation);
  }

  if (animation.steps) {
    handleStepAnimation(context, animation);
  }
};

var __view_id = 0;

var Base = /*#__PURE__*/function () {
  function Base() {
    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Base);

    this._scopedId = null;
    this.__NAME = null;
    this.element = null;
    this.dataset = {};
    this.children = new Set();
    this.parent = undefined;
    this.firstChild = null;
    this.lastChild = null;
    this.prevSibling = null;
    this.nextSibling = null;
    this.props = new Map();
    this.__view_id = 0;
    this._defaultStyle = {};
    this._style = {};
    this._baseStyle = {};
    this.__view_id = __view_id++;
    setCacheNode(this);
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Base, [{
    key: "disabled",
    get: function get() {
      return !this.element.enabled;
    },
    set: function set(disabled) {
      this.element.enabled = !disabled;
    }
  }, {
    key: "style",
    get: function get() {
      return this._style || {};
    },
    set: function set(value) {
      this.setStyle(value, true);
    }
  }, {
    key: "className",
    get: function get() {
      return this.props.get('class');
    }
  }, {
    key: "setScopeId",
    value: function setScopeId(id) {
      if (!this._scopedId) {
        this._scopedId = id;
        this.updateStyle();
      }
    }
  }, {
    key: "updateStyle",
    value: function updateStyle() {
      if (!this._scopedId) return;
      var CSSOM,
          elementStyle = {};
      if (!(CSSOM = __GLOBAL__.CSSOM)) return;
      var className = this.getAttribute('class') || '';
      var scopedRuleSet = CSSOM.hasOwnProperty(this._scopedId) ? CSSOM[this._scopedId].classMap : new Map();
      var classList = className.split(/\s/);
      classList.forEach(function (item) {
        if (item) {
          var globalStyleArr = CSSOM['global'].classMap.get(item) || [];
          globalStyleArr = globalStyleArr.map(function (item) {
            return item === null || item === void 0 ? void 0 : item.style;
          });
          var scopeStylesArr = scopedRuleSet.get(item) || [];
          scopeStylesArr = scopeStylesArr.map(function (item) {
            return item === null || item === void 0 ? void 0 : item.style;
          });
          elementStyle = Object.assign.apply(Object, [{}, elementStyle].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(globalStyleArr), (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(scopeStylesArr)));
        }
      });

      if (Object.keys(elementStyle).length > 0) {
        this.setStyle(elementStyle);
      }
    }
  }, {
    key: "_onMounted",
    value: function _onMounted() {
      this.onMounted();
    }
  }, {
    key: "onMounted",
    value: function onMounted() {}
  }, {
    key: "_onDestoryed",
    value: function _onDestoryed() {
      removeChildWithFixed(this);
      this.onDestoryed();
    }
  }, {
    key: "onDestoryed",
    value: function onDestoryed() {}
  }, {
    key: "_appendChild",
    value: function _appendChild(child) {
      child.unlinkSiblings();
      child.parent = this;
      this.children.add(child);

      if (!this.firstChild) {
        this.firstChild = child;
      }

      child.prevSibling = this.lastChild;
      child.nextSibling = null;

      if (this.lastChild) {
        this.lastChild.nextSibling = child;
      }

      this.lastChild = child;

      if (this.element && child.element) {
        this.element.appendChild(child.element);
      }

      child._onMounted();
    }
  }, {
    key: "unlinkSiblings",
    value: function unlinkSiblings() {
      if (this.parent && this.parent.firstChild === this) {
        this.parent.firstChild = this.nextSibling;
      }

      if (this.parent && this.parent.lastChild === this) {
        this.parent.lastChild = this.prevSibling;
      }

      if (this.prevSibling) {
        this.prevSibling.nextSibling = this.nextSibling;
      }

      if (this.nextSibling) {
        this.nextSibling.prevSibling = this.prevSibling;
      }

      this.prevSibling = null;
      this.nextSibling = null;
    }
  }, {
    key: "_removeChild",
    value: function _removeChild(child) {
      child._onDestoryed();

      child.unlinkSiblings();
      child.parent = undefined;
      this.children.delete(child);

      if (this.element && child.element) {
        this.element.removeChild(child.element);
      }
    }
  }, {
    key: "_insertBefore",
    value: function _insertBefore(child, anchor) {
      child.unlinkSiblings();
      child.parent = this;

      if (anchor.prevSibling) {
        child.prevSibling = anchor.prevSibling;
        anchor.prevSibling.nextSibling = child;
      }

      anchor.prevSibling = child;
      child.nextSibling = anchor;

      if (this.firstChild === anchor) {
        this.firstChild = child;
      }

      this.children.add(child);

      if (this.element && child.element && anchor.element) {
        this.element.insertBefore(child.element, anchor.element);

        child._onMounted();
      }
    }
  }, {
    key: "setElementText",
    value: function setElementText(text) {}
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tempStyle = this.hackForStyle(style, this);
      flag && (this._baseStyle = tempStyle);
      var newStyle = Object.assign(Object.assign(Object.assign({}, this._defaultStyle), tempStyle), this._baseStyle);
      handleFixedNodeByStyle(this, newStyle);
      this.element.style = this._style = newStyle;
    }
  }, {
    key: "hackForStyle",
    value: function hackForStyle(style, base) {
      return styleDynamicTransformer_1.transformStyle(style, base);
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      key.search(/^data-/) === 0 && key.split('data-')[1] && (this.dataset[key.split('data-')[1]] = value);
      this.props.set(key, value);

      switch (key) {
        case 'disabled':
          this.disabled = value;
          break;

        case 'class':
          this.updateStyle();
          break;

        default:
          this._setAttribute(key, value);

          break;
      }
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {}
  }, {
    key: "getAttribute",
    value: function getAttribute(key) {
      switch (key) {
        case 'disabled':
          return this.disabled;

        default:
          return this.props.get(key);
      }
    }
  }, {
    key: "handleAnimation",
    value: function handleAnimation(animation) {
      _handleAnimation(this, animation);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, func) {
      var _this = this;

      this.element.addEventListener(event, function (e) {
        e.target = {
          dataset: _this.dataset
        };
        func.call(_this, e);
      });
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event, func) {
      this.element.removeEventListener(event, func);
    }
  }, {
    key: "getRect",
    value: function getRect(func) {
      var _this2 = this;

      this.element.getRect(function (rect) {
        func.call(_this2, rect);
      });
    }
  }]);

  return Base;
}();

var components = new Map();

function register(component) {
  if (Array.isArray(component)) {
    component.forEach(function (component) {
      registerComponent(component);
    });
  } else {
    registerComponent(component);
  }
}

function registerComponent(component) {
  var name = component.name;
  components.set("ex-".concat(name), component);
}

function getComponent(tag) {
  var component = components.get(tag);
  return component.factory();
}

var ImageAttr;

(function (ImageAttr) {
  ImageAttr["Src"] = "src";
  ImageAttr["GifCount"] = "gifRepeatCount";
})(ImageAttr || (ImageAttr = {}));

var gifReg = /\.gif$/;

var Image = /*#__PURE__*/function (_Base) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Image, _Base);

  var _super = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Image);

  function Image() {
    var _this3;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Image);

    _this3 = _super.call(this);
    _this3.__NAME = NODE_IMAGE_1;
    _this3._src = '';
    _this3.element = new __GLOBAL__.Image();
    _this3._defaultStyle = {
      resize: 'stretch'
    };
    return _this3;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Image, [{
    key: "src",
    set: function set(value) {
      if (gifReg.test(value)) {
        this.element.gifSrc = value;
      } else {
        this.element.src = value;
      }

      this._src = value;
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case ImageAttr.Src:
          this.src = value;
          break;

        case ImageAttr.GifCount:
          this.element.gifRepeatCount = Number(value);
          this.src = this._src;
          break;
      }
    }
  }]);

  return Image;
}(Base);

var Input = /*#__PURE__*/function (_Base2) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Input, _Base2);

  var _super2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Input);

  function Input() {
    var _this4;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Input);

    _this4 = _super2.call(this);
    _this4.__NAME = NODE_INPUT_1;
    _this4._input = null;
    _this4._change = null;
    _this4._focus = null;
    _this4._blur = null;
    _this4._confirm = null;
    _this4._hasInput = false;
    _this4.element = new __GLOBAL__.Input();
    return _this4;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Input, [{
    key: "value",
    get: function get() {
      return this.element.text || '';
    },
    set: function set(value) {
      this.element.text = value;
    }
  }, {
    key: "focused",
    get: function get() {
      return this.element.focused || false;
    },
    set: function set(value) {
      var flag = value;

      if (typeof value === 'string') {
        if (value === 'true') {
          flag = true;
        } else if (value === 'false') {
          flag = false;
        }
      }

      this.element.focused = flag;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.element.placeholder || '';
    },
    set: function set(text) {
      this.element.placeholder = text;
    }
  }, {
    key: "type",
    set: function set(value) {
      this.element.style = {
        type: value
      };
    }
  }, {
    key: "returnKeyType",
    set: function set(value) {
      this.element.style = {
        returnKeyType: value
      };
    }
  }, {
    key: "maxLength",
    set: function set(value) {
      this.element.style = {
        maxLength: value
      };
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'value':
          this.value = value;
          break;

        case 'placeholder':
          this.placeholder = value;
          break;

        case 'focused':
          this.focused = value;
          break;

        case 'type':
          this.type = value;
          break;

        case 'max-length':
          this.maxLength = value;
          break;

        case 'return-key-type':
          this.returnKeyType = value;
          break;
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, func) {
      var _this5 = this;

      var handler = function handler(text) {
        func.call(_this5, text);
      };

      switch (event) {
        case 'input':
          this._input = handler;
          break;

        case 'change':
          this._change = handler;
          break;

        case 'focus':
          this._focus = handler;
          break;

        case 'blur':
          this._blur = handler;
          break;

        case 'confirm':
          this._confirm = handler;
          break;
      }

      this.initListener();
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event) {
      switch (event) {
        case 'input':
          this._input = null;
          this._hasInput = false;
          break;

        case 'change':
          this._change = null;
          break;

        case 'focus':
          this._focus = null;
          break;

        case 'blur':
          this._blur = null;
          break;

        case 'confirm':
          this._confirm = null;
          break;
      }
    }
  }, {
    key: "initListener",
    value: function initListener() {
      var _this6 = this;

      if (this._hasInput) {
        return;
      }

      this.element.addEventListener('input', function (event) {
        var state = event.state,
            text = event.text;

        switch (state) {
          case 1:
            _this6._focus && _this6._focus(text);
            break;

          case 2:
            _this6._change && _this6._change(text);
            break;

          case 3:
            _this6._blur && _this6._blur(text);
            break;

          case 4:
            _this6._confirm && _this6._confirm(text);
            break;
        }

        _this6._input && _this6._input({
          value: text,
          text: text,
          state
        });
      });
      this._hasInput = true;
    }
  }]);

  return Input;
}(Base);

var Text = /*#__PURE__*/function (_Base3) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Text, _Base3);

  var _super3 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Text);

  function Text() {
    var _this7;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Text);

    _this7 = _super3.call(this);
    _this7.__NAME = NODE_TEXT_1;
    _this7._text = '';
    _this7.element = new __GLOBAL__.Text();
    return _this7;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Text, [{
    key: "setElementText",
    value: function setElementText(text) {
      this._text = text;
      this.element.text = text;
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(text) {
      this._text = text;
      this.element.text = text;
    }
  }, {
    key: "richText",
    set: function set(value) {
      this.element.richText = value;
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'rich-text':
          this.richText = value;
          break;
      }
    }
  }]);

  return Text;
}(Base);

var View = /*#__PURE__*/function (_Base4) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(View, _Base4);

  var _super4 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(View);

  function View() {
    var _this8;

    var isView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, View);

    _this8 = _super4.call(this);
    _this8.__NAME = NODE_VIEW_1;

    if (!isView) {
      return (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__.default)(_this8);
    }

    _this8.element = new __GLOBAL__.View();
    return _this8;
  }

  return View;
}(Base);

var TextArea = /*#__PURE__*/function (_Base5) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(TextArea, _Base5);

  var _super5 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(TextArea);

  function TextArea() {
    var _this9;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, TextArea);

    _this9 = _super5.call(this);
    _this9.__NAME = NODE_TEXTAREA_1;
    _this9._input = null;
    _this9._change = null;
    _this9._focus = null;
    _this9._blur = null;
    _this9._confirm = null;
    _this9._hasInput = false;
    _this9.element = new __GLOBAL__.TextArea();
    return _this9;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(TextArea, [{
    key: "value",
    get: function get() {
      return this.element.text || '';
    },
    set: function set(value) {
      this.element.text = value;
    }
  }, {
    key: "focused",
    get: function get() {
      return this.element.focused || false;
    },
    set: function set(value) {
      var flag = value;

      if (typeof value === 'string') {
        if (value === 'true') {
          flag = true;
        } else if (value === 'false') {
          flag = false;
        }
      }

      this.element.focused = flag;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.element.placeholder || '';
    },
    set: function set(text) {
      this.element.placeholder = text;
    }
  }, {
    key: "type",
    set: function set(value) {
      this.element.style = {
        type: value
      };
    }
  }, {
    key: "returnKeyType",
    set: function set(value) {
      this.element.style = {
        returnKeyType: value
      };
    }
  }, {
    key: "maxLength",
    set: function set(value) {
      this.element.style = {
        maxLength: value
      };
    }
  }, {
    key: "rows",
    set: function set(value) {
      this.element.style = {
        textLineClamp: value
      };
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'value':
          this.value = value;
          break;

        case 'placeholder':
          this.placeholder = value;
          break;

        case 'focused':
          this.focused = value;
          break;

        case 'type':
          this.type = value;
          break;

        case 'max-length':
          this.maxLength = value;
          break;

        case 'return-key-type':
          this.returnKeyType = value;
          break;

        case 'rows':
          this.rows = value;
          break;
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, func) {
      var _this10 = this;

      var handler = function handler(text) {
        func.call(_this10, text);
      };

      switch (event) {
        case 'input':
          this._input = handler;
          break;

        case 'change':
          this._change = handler;
          break;

        case 'focus':
          this._focus = handler;
          break;

        case 'blur':
          this._blur = handler;
          break;

        case 'confirm':
          this._confirm = handler;
          break;
      }

      this.initListener();
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event) {
      switch (event) {
        case 'input':
          this._input = null;
          this._hasInput = false;
          break;

        case 'change':
          this._change = null;
          break;

        case 'focus':
          this._focus = null;
          break;

        case 'blur':
          this._blur = null;
          break;

        case 'confirm':
          this._confirm = null;
          break;
      }
    }
  }, {
    key: "initListener",
    value: function initListener() {
      var _this11 = this;

      if (this._hasInput) {
        return;
      }

      this.element.addEventListener('input', function (event) {
        var state = event.state,
            text = event.text;

        switch (state) {
          case 1:
            _this11._focus && _this11._focus(text);
            break;

          case 2:
            _this11._change && _this11._change(text);
            break;

          case 3:
            _this11._blur && _this11._blur(text);
            break;

          case 4:
            _this11._confirm && _this11._confirm(text);
            break;
        }

        _this11._input && _this11._input({
          value: text,
          state
        });
      });
      this._hasInput = true;
    }
  }]);

  return TextArea;
}(Base);

var noFunc = function noFunc() {};

var RootViewComponent = /*#__PURE__*/function (_GLOBAL__$View) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(RootViewComponent, _GLOBAL__$View);

  var _super6 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(RootViewComponent);

  function RootViewComponent() {
    var _this12;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, RootViewComponent);

    _this12 = _super6.call(this);
    _this12._element = null;
    _this12._canScroll = true;
    var onLoad = options.onLoad,
        onShow = options.onShow,
        onHide = options.onHide,
        onUnload = options.onUnload,
        onBack = options.onBack,
        _options$canScroll = options.canScroll,
        canScroll = _options$canScroll === void 0 ? true : _options$canScroll,
        _options$pageStyle = options.pageStyle,
        pageStyle = _options$pageStyle === void 0 ? {} : _options$pageStyle;
    _this12._onCreate = onLoad || noFunc;
    _this12._onAppear = onShow || noFunc;
    _this12._onDisappear = onHide || noFunc;
    _this12._onDestroy = onUnload || noFunc;
    _this12._onBack = onBack || noFunc;
    _this12._canScroll = canScroll;
    _this12.style = Object.assign(Object.assign({}, pageStyle), {
      width: '100%',
      height: '100%'
    });

    if (_this12._canScroll) {
      _this12._element = new __GLOBAL__.Scroller();
      _this12._element.style = {
        width: "100%",
        height: "100%"
      };

      _this12.appendChild(_this12._element);
    }

    return _this12;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(RootViewComponent, [{
    key: "element",
    get: function get() {
      return this._canScroll && this._element ? this._element : this;
    }
  }, {
    key: "onCreate",
    value: function onCreate() {
      this._onCreate();
    }
  }, {
    key: "onAppear",
    value: function onAppear() {
      this._onAppear();
    }
  }, {
    key: "onDisappear",
    value: function onDisappear() {
      this._onDisappear();
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      this._onDestroy();
    }
  }, {
    key: "onBack",
    value: function onBack() {
      var result = this._onBack();

      return result || false;
    }
  }]);

  return RootViewComponent;
}(__GLOBAL__.View);

var Page = /*#__PURE__*/function (_Base6) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Page, _Base6);

  var _super7 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Page);

  function Page(options) {
    var _this13;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Page);

    _this13 = _super7.call(this);
    _this13._rootView = new RootViewComponent(options);
    _this13.element = _this13._rootView.element;
    return _this13;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Page, [{
    key: "render",
    value: function render() {
      __GLOBAL__.Hummer.render(this._rootView);
    }
  }, {
    key: "onLoad",
    set: function set(load) {
      this._rootView._onCreate = load;
    }
  }, {
    key: "onShow",
    set: function set(show) {
      this._rootView._onAppear = show;
    }
  }, {
    key: "onHide",
    set: function set(hide) {
      this._rootView._onDisappear = hide;
    }
  }, {
    key: "onUnload",
    set: function set(destroy) {
      this._rootView._onDestroy = destroy;
    }
  }, {
    key: "onBack",
    set: function set(back) {
      this._rootView._onBack = back;
    }
  }]);

  return Page;
}(Base);

var Button = /*#__PURE__*/function (_Base7) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Button, _Base7);

  var _super8 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Button);

  function Button() {
    var _this14;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Button);

    _this14 = _super8.call(this);
    _this14.__NAME = NODE_BUTTON_1;
    _this14._text = '';
    _this14.element = new __GLOBAL__.Button();
    return _this14;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Button, [{
    key: "setElementText",
    value: function setElementText(text) {
      this.text = text;
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(text) {
      this._text = text;
      this.element.text = text;
    }
  }, {
    key: "pressedStyle",
    set: function set(style) {
      this.element.pressed = styleTransformer_1.transformStyle(style, this) || {};
    }
  }, {
    key: "disabledStyle",
    set: function set(style) {
      this.element.disabled = styleTransformer_1.transformStyle(style, this) || {};
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'disabled':
          this.disabled = value;
          break;

        case 'disabled-style':
          this.disabledStyle = value;
          break;

        case 'pressed-style':
          this.pressedStyle = value;
          break;
      }
    }
  }]);

  return Button;
}(Base);

var Switch = /*#__PURE__*/function (_Base8) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Switch, _Base8);

  var _super9 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Switch);

  function Switch() {
    var _this15;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Switch);

    _this15 = _super9.call(this);
    _this15.__NAME = NODE_SWITCH_1;
    _this15.element = new __GLOBAL__.Switch();
    return _this15;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Switch, [{
    key: "value",
    get: function get() {
      return this.element.checked;
    },
    set: function set(value) {
      this.element.checked = value;
    }
  }, {
    key: "onColor",
    set: function set(value) {
      this.element.style = {
        onColor: value
      };
    }
  }, {
    key: "offColor",
    set: function set(value) {
      this.element.style = {
        offColor: value
      };
    }
  }, {
    key: "thumbColor",
    set: function set(value) {
      this.element.style = {
        thumbColor: value
      };
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'value':
          this.value = value;
          break;

        case 'open-color':
          this.onColor = value;
          break;

        case 'close-color':
          this.offColor = value;
          break;

        case 'thumb-color':
          this.thumbColor = value;
          break;
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, func) {
      var _this16 = this;

      if (event === 'switch') {
        var invoker = function invoker(e) {
          var state = e.state;
          var value = state === 1 ? true : false;
          func.call(_this16, value);
        };

        this.element.addEventListener(event, invoker);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(event, func) {
      this.element.removeEventListener(event, func);
    }
  }]);

  return Switch;
}(Base);

var Comment = /*#__PURE__*/function (_Base9) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Comment, _Base9);

  var _super10 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Comment);

  function Comment(comment) {
    var _this17;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Comment);

    _this17 = _super10.call(this);
    _this17.__NAME = NODE_COMMENT_1;
    _this17._comment = '';
    _this17.element = new __GLOBAL__.View();
    _this17.element.style = {
      display: 'none'
    };
    _this17._comment = comment;
    return _this17;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Comment, [{
    key: "comment",
    get: function get() {
      return this._comment;
    }
  }]);

  return Comment;
}(Base);

var Scroller = /*#__PURE__*/function (_Base10) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Scroller, _Base10);

  var _super11 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Scroller);

  function Scroller() {
    var _this18;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Scroller);

    _this18 = _super11.call(this);
    _this18.__NAME = NODE_VIEW_1;
    _this18.element = new __GLOBAL__.Scroller();
    return _this18;
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Scroller, [{
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      switch (key) {
        case 'disabled':
          this.disabled = value;
          break;

        case 'scroll-direction':
          if (value === 'horizontal' && this.element instanceof __GLOBAL__.Scroller) {
            var scroller = new __GLOBAL__.HorizontalScroller();
            scroller.style = this._style;

            var _iterator = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__.default)(this.children.values()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var child = _step.value;
                this.element.removeChild(child.element);
                scroller.appendChild(child.element);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            this.element = scroller;
          }

          break;

        default:
          this.element.style = {
            [key]: value
          };
          break;
      }
    }
  }, {
    key: "_appendChild",
    value: function _appendChild(child) {
      child.unlinkSiblings();
      child.parent = this;
      this.children.add(child);

      if (!this.firstChild) {
        this.firstChild = child;
      }

      child.prevSibling = this.lastChild;
      child.nextSibling = null;

      if (this.lastChild) {
        this.lastChild.nextSibling = child;
      }

      this.lastChild = child;

      if (this.element && child.element) {
        if (child.__NAME === NODE_REFRESH_1) {
          this.element.refreshView = child.element;
        } else if (child.__NAME === NODE_LOADMORE_1) {
          this.element.loadMoreView = child.element;
        } else {
          this.element.appendChild(child.element);

          child._onMounted();

          child.onMounted();
        }
      }
    }
  }, {
    key: "_insertBefore",
    value: function _insertBefore(child, anchor) {
      child.unlinkSiblings();
      child.parent = this;

      if (anchor.prevSibling) {
        child.prevSibling = anchor.prevSibling;
        anchor.prevSibling.nextSibling = child;
      }

      anchor.prevSibling = child;
      child.nextSibling = anchor;

      if (this.firstChild === anchor) {
        this.firstChild = child;
      }

      this.children.add(child);

      if (this.element && child.element && anchor.element) {
        if (child.__NAME === NODE_REFRESH_1) {
          this.element.refreshView = child.element;
        } else if (child.__NAME === NODE_LOADMORE_1) {
          this.element.loadMoreView = child.element;
        } else {
          this.element.appendChild(child.element);

          child._onMounted();

          child.onMounted();
        }
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(x, y) {
      this.element.scrollTo(x, y);
    }
  }, {
    key: "scrollBy",
    value: function scrollBy(dx, dy) {
      this.element.scrolBy(dx, dy);
    }
  }, {
    key: "scrollToTop",
    value: function scrollToTop() {
      this.element.scrollToTop();
    }
  }, {
    key: "scrollToBottom",
    value: function scrollToBottom() {
      this.element.scrollToBottom();
    }
  }, {
    key: "stopPullRefresh",
    value: function stopPullRefresh() {
      this.element.stopPullRefresh();
    }
  }, {
    key: "stopLoadMore",
    value: function stopLoadMore(enable) {
      this.element.stopLoadMore(enable);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, func) {
      var _this19 = this;

      switch (event) {
        case "scroll":
          this.element.addEventListener('scroll', function (e) {
            func.call(_this19, e);
          });
          break;

        case "scrolltotop":
          this.element.setOnScrollToTopListener(function () {
            func.call(_this19);
          });
          break;

        case "scrolltobottom":
          this.element.setOnScrollToBottomListener(function () {
            func.call(_this19);
          });
          break;

        case 'refresh':
          this.element.onRefresh = function (state) {
            func.call(_this19, state, _this19);
          };

          break;

        case 'loadmore':
          this.element.onLoadMore = function (state) {
            func.call(_this19, state, _this19);
          };

          break;

        default:
          this.element.addEventListener(event, function (e) {
            func.call(_this19, e);
          });
          break;
      }
    }
  }]);

  return Scroller;
}(Base);

var Anchor = /*#__PURE__*/function (_Base11) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Anchor, _Base11);

  var _super12 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Anchor);

  function Anchor() {
    var _this20;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Anchor);

    _this20 = _super12.call(this);
    _this20.__NAME = NODE_ANCHOR_1;
    _this20.element = new __GLOBAL__.View();
    _this20.element.style = {
      display: "none"
    };
    return _this20;
  }

  return Anchor;
}(Base);

var Refresh = /*#__PURE__*/function (_View) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Refresh, _View);

  var _super13 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Refresh);

  function Refresh() {
    var _this21;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Refresh);

    _this21 = _super13.apply(this, arguments);
    _this21.__NAME = NODE_REFRESH_1;
    return _this21;
  }

  return Refresh;
}(View);

var LoadMore = /*#__PURE__*/function (_View2) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(LoadMore, _View2);

  var _super14 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(LoadMore);

  function LoadMore() {
    var _this22;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, LoadMore);

    _this22 = _super14.apply(this, arguments);
    _this22.__NAME = NODE_LOADMORE_1;
    return _this22;
  }

  return LoadMore;
}(View);

var Document = /*#__PURE__*/function () {
  function Document() {
    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Document);
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__.default)(Document, [{
    key: "createElement",
    value: function createElement(tag) {
      var component = null;

      switch (tag) {
        case ELEMNT_TAG_MAP_1[NODE_VIEW_1]:
          component = new View();
          break;

        case ELEMNT_TAG_MAP_1[NODE_SCROLLER_1]:
          component = new Scroller();
          break;

        case ELEMNT_TAG_MAP_1[NODE_TEXT_1]:
          component = new Text();
          break;

        case ELEMNT_TAG_MAP_1[NODE_IMAGE_1]:
          component = new Image();
          break;

        case ELEMNT_TAG_MAP_1[NODE_INPUT_1]:
          component = new Input();
          break;

        case ELEMNT_TAG_MAP_1[NODE_TEXTAREA_1]:
          component = new TextArea();
          break;

        case ELEMNT_TAG_MAP_1[NODE_BUTTON_1]:
          component = new Button();
          break;

        case ELEMNT_TAG_MAP_1[NODE_SWITCH_1]:
          component = new Switch();
          break;

        case ELEMNT_TAG_MAP_1[NODE_LOADMORE_1]:
          component = new LoadMore();
          break;

        case ELEMNT_TAG_MAP_1[NODE_REFRESH_1]:
          component = new Refresh();
          break;

        default:
          if (isCustomNativeTag_1(tag)) {
            component = getComponent(tag) || new View();
          } else {
            component = new View();
          }

          break;
      }

      return component;
    }
  }, {
    key: "createText",
    value: function createText(text) {
      var component = null;

      if (!text) {
        component = new Anchor();
      } else {
        component = new Text();
        component.setElementText(text);
      }

      return component;
    }
  }, {
    key: "createComment",
    value: function createComment(comment) {
      return new Comment(comment);
    }
  }, {
    key: "createPageView",
    value: function createPageView(options) {
      var pageView = new Page(options);
      return pageView;
    }
  }]);

  return Document;
}();

var document = new Document();


/***/ }),

/***/ "../../tenon/packages/tenon-react/dist/tenon-react.es.js":
/*!***************************************************************!*\
  !*** ../../tenon/packages/tenon-react/dist/tenon-react.es.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../tenon/packages/tenon-react/node_modules/react/index.js");
/* harmony import */ var _hummer_tenon_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hummer/tenon-core */ "../../tenon/packages/tenon-core/dist/tenon-core.es.js");


var reactReconciler = {
  exports: {}
};
var reactReconciler_production_min = {
  exports: {}
};
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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
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
var scheduler = {
  exports: {}
};
var scheduler_production_min = {};
/** @license React v0.20.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (exports) {
  var _f, g, h, k;

  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l = performance;

    exports.unstable_now = function () {
      return l.now();
    };
  } else {
    var p = Date,
        q = p.now();

    exports.unstable_now = function () {
      return p.now() - q;
    };
  }

  if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
    var t = null,
        u = null,
        w = function w() {
      if (null !== t) try {
        var a = exports.unstable_now();
        t(!0, a);
        t = null;
      } catch (b) {
        throw setTimeout(w, 0), b;
      }
    };

    _f = function f(a) {
      null !== t ? setTimeout(_f, 0, a) : (t = a, setTimeout(w, 0));
    };

    g = function g(a, b) {
      u = setTimeout(a, b);
    };

    h = function h() {
      clearTimeout(u);
    };

    exports.unstable_shouldYield = function () {
      return !1;
    };

    k = exports.unstable_forceFrameRate = function () {};
  } else {
    var x = window.setTimeout,
        y = window.clearTimeout;

    if ("undefined" !== typeof console) {
      var z = window.cancelAnimationFrame;
      "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    }

    var A = !1,
        B = null,
        C = -1,
        D = 5,
        E = 0;

    exports.unstable_shouldYield = function () {
      return exports.unstable_now() >= E;
    };

    k = function k() {};

    exports.unstable_forceFrameRate = function (a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1E3 / a) : 5;
    };

    var F = new MessageChannel(),
        G = F.port2;

    F.port1.onmessage = function () {
      if (null !== B) {
        var a = exports.unstable_now();
        E = a + D;

        try {
          B(!0, a) ? G.postMessage(null) : (A = !1, B = null);
        } catch (b) {
          throw G.postMessage(null), b;
        }
      } else A = !1;
    };

    _f = function _f(a) {
      B = a;
      A || (A = !0, G.postMessage(null));
    };

    g = function g(a, b) {
      C = x(function () {
        a(exports.unstable_now());
      }, b);
    };

    h = function h() {
      y(C);
      C = -1;
    };
  }

  function H(a, b) {
    var c = a.length;
    a.push(b);

    a: for (;;) {
      var d = c - 1 >>> 1,
          e = a[d];
      if (void 0 !== e && 0 < I(e, b)) a[d] = b, a[c] = e, c = d;else break a;
    }
  }

  function J(a) {
    a = a[0];
    return void 0 === a ? null : a;
  }

  function K(a) {
    var b = a[0];

    if (void 0 !== b) {
      var c = a.pop();

      if (c !== b) {
        a[0] = c;

        a: for (var d = 0, e = a.length; d < e;) {
          var m = 2 * (d + 1) - 1,
              n = a[m],
              v = m + 1,
              r = a[v];
          if (void 0 !== n && 0 > I(n, c)) void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > I(r, c)) a[d] = r, a[v] = c, d = v;else break a;
        }
      }

      return b;
    }

    return null;
  }

  function I(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }

  var L = [],
      M = [],
      N = 1,
      O = null,
      P = 3,
      Q = !1,
      R = !1,
      S = !1;

  function T(a) {
    for (var b = J(M); null !== b;) {
      if (null === b.callback) K(M);else if (b.startTime <= a) K(M), b.sortIndex = b.expirationTime, H(L, b);else break;
      b = J(M);
    }
  }

  function U(a) {
    S = !1;
    T(a);
    if (!R) if (null !== J(L)) R = !0, _f(V);else {
      var b = J(M);
      null !== b && g(U, b.startTime - a);
    }
  }

  function V(a, b) {
    R = !1;
    S && (S = !1, h());
    Q = !0;
    var c = P;

    try {
      T(b);

      for (O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield());) {
        var d = O.callback;

        if ("function" === typeof d) {
          O.callback = null;
          P = O.priorityLevel;
          var e = d(O.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? O.callback = e : O === J(L) && K(L);
          T(b);
        } else K(L);

        O = J(L);
      }

      if (null !== O) var m = !0;else {
        var n = J(M);
        null !== n && g(U, n.startTime - b);
        m = !1;
      }
      return m;
    } finally {
      O = null, P = c, Q = !1;
    }
  }

  var W = k;
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;

  exports.unstable_cancelCallback = function (a) {
    a.callback = null;
  };

  exports.unstable_continueExecution = function () {
    R || Q || (R = !0, _f(V));
  };

  exports.unstable_getCurrentPriorityLevel = function () {
    return P;
  };

  exports.unstable_getFirstCallbackNode = function () {
    return J(L);
  };

  exports.unstable_next = function (a) {
    switch (P) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;

      default:
        b = P;
    }

    var c = P;
    P = b;

    try {
      return a();
    } finally {
      P = c;
    }
  };

  exports.unstable_pauseExecution = function () {};

  exports.unstable_requestPaint = W;

  exports.unstable_runWithPriority = function (a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;

      default:
        a = 3;
    }

    var c = P;
    P = a;

    try {
      return b();
    } finally {
      P = c;
    }
  };

  exports.unstable_scheduleCallback = function (a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;

    switch (a) {
      case 1:
        var e = -1;
        break;

      case 2:
        e = 250;
        break;

      case 5:
        e = 1073741823;
        break;

      case 4:
        e = 1E4;
        break;

      default:
        e = 5E3;
    }

    e = c + e;
    a = {
      id: N++,
      callback: b,
      priorityLevel: a,
      startTime: c,
      expirationTime: e,
      sortIndex: -1
    };
    c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = !0, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = !0, _f(V)));
    return a;
  };

  exports.unstable_wrapCallback = function (a) {
    var b = P;
    return function () {
      var c = P;
      P = b;

      try {
        return a.apply(this, arguments);
      } finally {
        P = c;
      }
    };
  };
})(scheduler_production_min);

{
  scheduler.exports = scheduler_production_min;
}
/** @license React v0.26.2
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
  module.exports = function $$$reconciler($$$hostConfig) {
    var exports = {};
    var aa = objectAssign,
        ba = react__WEBPACK_IMPORTED_MODULE_0__,
        m = scheduler.exports;

    function q(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      }

      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }

    var ca = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
        da = 60103,
        ea = 60106,
        fa = 60107,
        ha = 60108,
        ia = 60114,
        ja = 60109,
        ka = 60110,
        la = 60112,
        ma = 60113,
        na = 60120,
        oa = 60115,
        pa = 60116,
        qa = 60121,
        ra = 60129,
        sa = 60130,
        ta = 60131;

    if ("function" === typeof Symbol && Symbol.for) {
      var r = Symbol.for;
      da = r("react.element");
      ea = r("react.portal");
      fa = r("react.fragment");
      ha = r("react.strict_mode");
      ia = r("react.profiler");
      ja = r("react.provider");
      ka = r("react.context");
      la = r("react.forward_ref");
      ma = r("react.suspense");
      na = r("react.suspense_list");
      oa = r("react.memo");
      pa = r("react.lazy");
      qa = r("react.block");
      r("react.scope");
      ra = r("react.debug_trace_mode");
      sa = r("react.offscreen");
      ta = r("react.legacy_hidden");
    }

    var ua = "function" === typeof Symbol && Symbol.iterator;

    function va(a) {
      if (null === a || "object" !== typeof a) return null;
      a = ua && a[ua] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }

    function wa(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;

      switch (a) {
        case fa:
          return "Fragment";

        case ea:
          return "Portal";

        case ia:
          return "Profiler";

        case ha:
          return "StrictMode";

        case ma:
          return "Suspense";

        case na:
          return "SuspenseList";
      }

      if ("object" === typeof a) switch (a.$$typeof) {
        case ka:
          return (a.displayName || "Context") + ".Consumer";

        case ja:
          return (a._context.displayName || "Context") + ".Provider";

        case la:
          var b = a.render;
          b = b.displayName || b.name || "";
          return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

        case oa:
          return wa(a.type);

        case qa:
          return wa(a._render);

        case pa:
          b = a._payload;
          a = a._init;

          try {
            return wa(a(b));
          } catch (c) {}

      }
      return null;
    }

    function xa(a) {
      var b = a,
          c = a;
      if (a.alternate) for (; b.return;) {
        b = b.return;
      } else {
        a = b;

        do {
          b = a, 0 !== (b.flags & 1026) && (c = b.return), a = b.return;
        } while (a);
      }
      return 3 === b.tag ? c : null;
    }

    function ya(a) {
      if (xa(a) !== a) throw Error(q(188));
    }

    function za(a) {
      var b = a.alternate;

      if (!b) {
        b = xa(a);
        if (null === b) throw Error(q(188));
        return b !== a ? null : a;
      }

      for (var c = a, d = b;;) {
        var e = c.return;
        if (null === e) break;
        var f = e.alternate;

        if (null === f) {
          d = e.return;

          if (null !== d) {
            c = d;
            continue;
          }

          break;
        }

        if (e.child === f.child) {
          for (f = e.child; f;) {
            if (f === c) return ya(e), a;
            if (f === d) return ya(e), b;
            f = f.sibling;
          }

          throw Error(q(188));
        }

        if (c.return !== d.return) c = e, d = f;else {
          for (var g = !1, h = e.child; h;) {
            if (h === c) {
              g = !0;
              c = e;
              d = f;
              break;
            }

            if (h === d) {
              g = !0;
              d = e;
              c = f;
              break;
            }

            h = h.sibling;
          }

          if (!g) {
            for (h = f.child; h;) {
              if (h === c) {
                g = !0;
                c = f;
                d = e;
                break;
              }

              if (h === d) {
                g = !0;
                d = f;
                c = e;
                break;
              }

              h = h.sibling;
            }

            if (!g) throw Error(q(189));
          }
        }
        if (c.alternate !== d) throw Error(q(190));
      }

      if (3 !== c.tag) throw Error(q(188));
      return c.stateNode.current === c ? a : b;
    }

    function Aa(a) {
      a = za(a);
      if (!a) return null;

      for (var b = a;;) {
        if (5 === b.tag || 6 === b.tag) return b;
        if (b.child) b.child.return = b, b = b.child;else {
          if (b === a) break;

          for (; !b.sibling;) {
            if (!b.return || b.return === a) return null;
            b = b.return;
          }

          b.sibling.return = b.return;
          b = b.sibling;
        }
      }

      return null;
    }

    function Ba(a) {
      a = za(a);
      if (!a) return null;

      for (var b = a;;) {
        if (5 === b.tag || 6 === b.tag) return b;
        if (b.child && 4 !== b.tag) b.child.return = b, b = b.child;else {
          if (b === a) break;

          for (; !b.sibling;) {
            if (!b.return || b.return === a) return null;
            b = b.return;
          }

          b.sibling.return = b.return;
          b = b.sibling;
        }
      }

      return null;
    }

    function Ca(a, b) {
      for (var c = a.alternate; null !== b;) {
        if (b === a || b === c) return !0;
        b = b.return;
      }

      return !1;
    }

    var Da = $$$hostConfig.getPublicInstance,
        Ea = $$$hostConfig.getRootHostContext,
        Fa = $$$hostConfig.getChildHostContext,
        Ga = $$$hostConfig.prepareForCommit,
        Ha = $$$hostConfig.resetAfterCommit,
        Ia = $$$hostConfig.createInstance,
        Ja = $$$hostConfig.appendInitialChild,
        Ka = $$$hostConfig.finalizeInitialChildren,
        La = $$$hostConfig.prepareUpdate,
        Ma = $$$hostConfig.shouldSetTextContent,
        Na = $$$hostConfig.createTextInstance,
        Pa = $$$hostConfig.scheduleTimeout,
        Qa = $$$hostConfig.cancelTimeout,
        Ra = $$$hostConfig.noTimeout,
        Sa = $$$hostConfig.isPrimaryRenderer,
        Ta = $$$hostConfig.supportsMutation,
        Ua = $$$hostConfig.supportsPersistence,
        Va = $$$hostConfig.supportsHydration,
        Wa = $$$hostConfig.getInstanceFromNode,
        Xa = $$$hostConfig.makeOpaqueHydratingObject,
        Ya = $$$hostConfig.makeClientId,
        Za = $$$hostConfig.beforeActiveInstanceBlur,
        $a = $$$hostConfig.afterActiveInstanceBlur,
        ab = $$$hostConfig.preparePortalMount,
        bb = $$$hostConfig.supportsTestSelectors,
        cb = $$$hostConfig.findFiberRoot,
        db = $$$hostConfig.getBoundingRect,
        eb = $$$hostConfig.getTextContent,
        fb = $$$hostConfig.isHiddenSubtree,
        gb = $$$hostConfig.matchAccessibilityRole,
        hb = $$$hostConfig.setFocusIfFocusable,
        ib = $$$hostConfig.setupIntersectionObserver,
        jb = $$$hostConfig.appendChild,
        kb = $$$hostConfig.appendChildToContainer,
        lb = $$$hostConfig.commitTextUpdate,
        mb = $$$hostConfig.commitMount,
        nb = $$$hostConfig.commitUpdate,
        ob = $$$hostConfig.insertBefore,
        pb = $$$hostConfig.insertInContainerBefore,
        qb = $$$hostConfig.removeChild,
        rb = $$$hostConfig.removeChildFromContainer,
        sb = $$$hostConfig.resetTextContent,
        tb = $$$hostConfig.hideInstance,
        ub = $$$hostConfig.hideTextInstance,
        vb = $$$hostConfig.unhideInstance,
        wb = $$$hostConfig.unhideTextInstance,
        xb = $$$hostConfig.clearContainer,
        yb = $$$hostConfig.cloneInstance,
        zb = $$$hostConfig.createContainerChildSet,
        Ab = $$$hostConfig.appendChildToContainerChildSet,
        Bb = $$$hostConfig.finalizeContainerChildren,
        Cb = $$$hostConfig.replaceContainerChildren,
        Db = $$$hostConfig.cloneHiddenInstance,
        Eb = $$$hostConfig.cloneHiddenTextInstance,
        Fb = $$$hostConfig.canHydrateInstance,
        Gb = $$$hostConfig.canHydrateTextInstance,
        Hb = $$$hostConfig.isSuspenseInstancePending,
        Ib = $$$hostConfig.isSuspenseInstanceFallback,
        Jb = $$$hostConfig.getNextHydratableSibling,
        Kb = $$$hostConfig.getFirstHydratableChild,
        Lb = $$$hostConfig.hydrateInstance,
        Mb = $$$hostConfig.hydrateTextInstance,
        Nb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
        Ob = $$$hostConfig.commitHydratedContainer,
        Pb = $$$hostConfig.commitHydratedSuspenseInstance,
        Qb;

    function Rb(a) {
      if (void 0 === Qb) try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        Qb = b && b[1] || "";
      }
      return "\n" + Qb + a;
    }

    var Sb = !1;

    function Tb(a, b) {
      if (!a || Sb) return "";
      Sb = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;

      try {
        if (b) {
          if (b = function b() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", {
            set: function set() {
              throw Error();
            }
          }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (k) {
              var d = k;
            }

            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (k) {
              d = k;
            }

            a.call(b.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (k) {
            d = k;
          }

          a();
        }
      } catch (k) {
        if (k && d && "string" === typeof k.stack) {
          for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) {
            h--;
          }

          for (; 1 <= g && 0 <= h; g--, h--) {
            if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do {
                  if (g--, h--, 0 > h || e[g] !== f[h]) return "\n" + e[g].replace(" at new ", " at ");
                } while (1 <= g && 0 <= h);
              }

              break;
            }
          }
        }
      } finally {
        Sb = !1, Error.prepareStackTrace = c;
      }

      return (a = a ? a.displayName || a.name : "") ? Rb(a) : "";
    }

    var Ub = [],
        Vb = -1;

    function Wb(a) {
      return {
        current: a
      };
    }

    function z(a) {
      0 > Vb || (a.current = Ub[Vb], Ub[Vb] = null, Vb--);
    }

    function A(a, b) {
      Vb++;
      Ub[Vb] = a.current;
      a.current = b;
    }

    var Xb = {},
        B = Wb(Xb),
        D = Wb(!1),
        Yb = Xb;

    function Zb(a, b) {
      var c = a.type.contextTypes;
      if (!c) return Xb;
      var d = a.stateNode;
      if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
      var e = {},
          f;

      for (f in c) {
        e[f] = b[f];
      }

      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
      return e;
    }

    function E(a) {
      a = a.childContextTypes;
      return null !== a && void 0 !== a;
    }

    function $b() {
      z(D);
      z(B);
    }

    function ac(a, b, c) {
      if (B.current !== Xb) throw Error(q(168));
      A(B, b);
      A(D, c);
    }

    function bc(a, b, c) {
      var d = a.stateNode;
      a = b.childContextTypes;
      if ("function" !== typeof d.getChildContext) return c;
      d = d.getChildContext();

      for (var e in d) {
        if (!(e in a)) throw Error(q(108, wa(b) || "Unknown", e));
      }

      return aa({}, c, d);
    }

    function cc(a) {
      a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Xb;
      Yb = B.current;
      A(B, a);
      A(D, D.current);
      return !0;
    }

    function dc(a, b, c) {
      var d = a.stateNode;
      if (!d) throw Error(q(169));
      c ? (a = bc(a, b, Yb), d.__reactInternalMemoizedMergedChildContext = a, z(D), z(B), A(B, a)) : z(D);
      A(D, c);
    }

    var ec = null,
        fc = null,
        gc = m.unstable_now;
    gc();
    var hc = 0,
        F = 8;

    function ic(a) {
      if (0 !== (1 & a)) return F = 15, 1;
      if (0 !== (2 & a)) return F = 14, 2;
      if (0 !== (4 & a)) return F = 13, 4;
      var b = 24 & a;
      if (0 !== b) return F = 12, b;
      if (0 !== (a & 32)) return F = 11, 32;
      b = 192 & a;
      if (0 !== b) return F = 10, b;
      if (0 !== (a & 256)) return F = 9, 256;
      b = 3584 & a;
      if (0 !== b) return F = 8, b;
      if (0 !== (a & 4096)) return F = 7, 4096;
      b = 4186112 & a;
      if (0 !== b) return F = 6, b;
      b = 62914560 & a;
      if (0 !== b) return F = 5, b;
      if (a & 67108864) return F = 4, 67108864;
      if (0 !== (a & 134217728)) return F = 3, 134217728;
      b = 805306368 & a;
      if (0 !== b) return F = 2, b;
      if (0 !== (1073741824 & a)) return F = 1, 1073741824;
      F = 8;
      return a;
    }

    function jc(a) {
      switch (a) {
        case 99:
          return 15;

        case 98:
          return 10;

        case 97:
        case 96:
          return 8;

        case 95:
          return 2;

        default:
          return 0;
      }
    }

    function kc(a) {
      switch (a) {
        case 15:
        case 14:
          return 99;

        case 13:
        case 12:
        case 11:
        case 10:
          return 98;

        case 9:
        case 8:
        case 7:
        case 6:
        case 4:
        case 5:
          return 97;

        case 3:
        case 2:
        case 1:
          return 95;

        case 0:
          return 90;

        default:
          throw Error(q(358, a));
      }
    }

    function lc(a, b) {
      var c = a.pendingLanes;
      if (0 === c) return F = 0;
      var d = 0,
          e = 0,
          f = a.expiredLanes,
          g = a.suspendedLanes,
          h = a.pingedLanes;
      if (0 !== f) d = f, e = F = 15;else if (f = c & 134217727, 0 !== f) {
        var k = f & ~g;
        0 !== k ? (d = ic(k), e = F) : (h &= f, 0 !== h && (d = ic(h), e = F));
      } else f = c & ~g, 0 !== f ? (d = ic(f), e = F) : 0 !== h && (d = ic(h), e = F);
      if (0 === d) return 0;
      d = 31 - mc(d);
      d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;

      if (0 !== b && b !== d && 0 === (b & g)) {
        ic(b);
        if (e <= F) return b;
        F = e;
      }

      b = a.entangledLanes;
      if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) {
        c = 31 - mc(b), e = 1 << c, d |= a[c], b &= ~e;
      }
      return d;
    }

    function nc(a) {
      a = a.pendingLanes & -1073741825;
      return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
    }

    function oc(a, b) {
      switch (a) {
        case 15:
          return 1;

        case 14:
          return 2;

        case 12:
          return a = pc(24 & ~b), 0 === a ? oc(10, b) : a;

        case 10:
          return a = pc(192 & ~b), 0 === a ? oc(8, b) : a;

        case 8:
          return a = pc(3584 & ~b), 0 === a && (a = pc(4186112 & ~b), 0 === a && (a = 512)), a;

        case 2:
          return b = pc(805306368 & ~b), 0 === b && (b = 268435456), b;
      }

      throw Error(q(358, a));
    }

    function pc(a) {
      return a & -a;
    }

    function qc(a) {
      for (var b = [], c = 0; 31 > c; c++) {
        b.push(a);
      }

      return b;
    }

    function rc(a, b, c) {
      a.pendingLanes |= b;
      var d = b - 1;
      a.suspendedLanes &= d;
      a.pingedLanes &= d;
      a = a.eventTimes;
      b = 31 - mc(b);
      a[b] = c;
    }

    var mc = Math.clz32 ? Math.clz32 : sc,
        tc = Math.log,
        uc = Math.LN2;

    function sc(a) {
      return 0 === a ? 32 : 31 - (tc(a) / uc | 0) | 0;
    }

    var vc = m.unstable_runWithPriority,
        wc = m.unstable_scheduleCallback,
        xc = m.unstable_cancelCallback,
        yc = m.unstable_shouldYield,
        zc = m.unstable_requestPaint,
        Ac = m.unstable_now,
        Bc = m.unstable_getCurrentPriorityLevel,
        Cc = m.unstable_ImmediatePriority,
        Dc = m.unstable_UserBlockingPriority,
        Ec = m.unstable_NormalPriority,
        Fc = m.unstable_LowPriority,
        Gc = m.unstable_IdlePriority,
        Hc = {},
        Ic = void 0 !== zc ? zc : function () {},
        Jc = null,
        Kc = null,
        Lc = !1,
        Mc = Ac(),
        G = 1E4 > Mc ? Ac : function () {
      return Ac() - Mc;
    };

    function Nc() {
      switch (Bc()) {
        case Cc:
          return 99;

        case Dc:
          return 98;

        case Ec:
          return 97;

        case Fc:
          return 96;

        case Gc:
          return 95;

        default:
          throw Error(q(332));
      }
    }

    function Oc(a) {
      switch (a) {
        case 99:
          return Cc;

        case 98:
          return Dc;

        case 97:
          return Ec;

        case 96:
          return Fc;

        case 95:
          return Gc;

        default:
          throw Error(q(332));
      }
    }

    function Pc(a, b) {
      a = Oc(a);
      return vc(a, b);
    }

    function Qc(a, b, c) {
      a = Oc(a);
      return wc(a, b, c);
    }

    function H() {
      if (null !== Kc) {
        var a = Kc;
        Kc = null;
        xc(a);
      }

      Rc();
    }

    function Rc() {
      if (!Lc && null !== Jc) {
        Lc = !0;
        var a = 0;

        try {
          var b = Jc;
          Pc(99, function () {
            for (; a < b.length; a++) {
              var c = b[a];

              do {
                c = c(!0);
              } while (null !== c);
            }
          });
          Jc = null;
        } catch (c) {
          throw null !== Jc && (Jc = Jc.slice(a + 1)), wc(Cc, H), c;
        } finally {
          Lc = !1;
        }
      }
    }

    var Sc = ca.ReactCurrentBatchConfig;

    function Tc(a, b) {
      return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
    }

    var I = "function" === typeof Object.is ? Object.is : Tc,
        Uc = Object.prototype.hasOwnProperty;

    function Vc(a, b) {
      if (I(a, b)) return !0;
      if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
      var c = Object.keys(a),
          d = Object.keys(b);
      if (c.length !== d.length) return !1;

      for (d = 0; d < c.length; d++) {
        if (!Uc.call(b, c[d]) || !I(a[c[d]], b[c[d]])) return !1;
      }

      return !0;
    }

    function Wc(a) {
      switch (a.tag) {
        case 5:
          return Rb(a.type);

        case 16:
          return Rb("Lazy");

        case 13:
          return Rb("Suspense");

        case 19:
          return Rb("SuspenseList");

        case 0:
        case 2:
        case 15:
          return a = Tb(a.type, !1), a;

        case 11:
          return a = Tb(a.type.render, !1), a;

        case 22:
          return a = Tb(a.type._render, !1), a;

        case 1:
          return a = Tb(a.type, !0), a;

        default:
          return "";
      }
    }

    function Xc(a, b) {
      if (a && a.defaultProps) {
        b = aa({}, b);
        a = a.defaultProps;

        for (var c in a) {
          void 0 === b[c] && (b[c] = a[c]);
        }

        return b;
      }

      return b;
    }

    var Yc = Wb(null),
        Zc = null,
        $c = null,
        ad = null;

    function bd() {
      ad = $c = Zc = null;
    }

    function cd(a, b) {
      a = a.type._context;
      Sa ? (A(Yc, a._currentValue), a._currentValue = b) : (A(Yc, a._currentValue2), a._currentValue2 = b);
    }

    function dd(a) {
      var b = Yc.current;
      z(Yc);
      a = a.type._context;
      Sa ? a._currentValue = b : a._currentValue2 = b;
    }

    function ed(a, b) {
      for (; null !== a;) {
        var c = a.alternate;
        if ((a.childLanes & b) === b) {
          if (null === c || (c.childLanes & b) === b) break;else c.childLanes |= b;
        } else a.childLanes |= b, null !== c && (c.childLanes |= b);
        a = a.return;
      }
    }

    function fd(a, b) {
      Zc = a;
      ad = $c = null;
      a = a.dependencies;
      null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (gd = !0), a.firstContext = null);
    }

    function J(a, b) {
      if (ad !== a && !1 !== b && 0 !== b) {
        if ("number" !== typeof b || 1073741823 === b) ad = a, b = 1073741823;
        b = {
          context: a,
          observedBits: b,
          next: null
        };

        if (null === $c) {
          if (null === Zc) throw Error(q(308));
          $c = b;
          Zc.dependencies = {
            lanes: 0,
            firstContext: b,
            responders: null
          };
        } else $c = $c.next = b;
      }

      return Sa ? a._currentValue : a._currentValue2;
    }

    var hd = !1;

    function id(a) {
      a.updateQueue = {
        baseState: a.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null
        },
        effects: null
      };
    }

    function jd(a, b) {
      a = a.updateQueue;
      b.updateQueue === a && (b.updateQueue = {
        baseState: a.baseState,
        firstBaseUpdate: a.firstBaseUpdate,
        lastBaseUpdate: a.lastBaseUpdate,
        shared: a.shared,
        effects: a.effects
      });
    }

    function kd(a, b) {
      return {
        eventTime: a,
        lane: b,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      };
    }

    function md(a, b) {
      a = a.updateQueue;

      if (null !== a) {
        a = a.shared;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
    }

    function nd(a, b) {
      var c = a.updateQueue,
          d = a.alternate;

      if (null !== d && (d = d.updateQueue, c === d)) {
        var e = null,
            f = null;
        c = c.firstBaseUpdate;

        if (null !== c) {
          do {
            var g = {
              eventTime: c.eventTime,
              lane: c.lane,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null
            };
            null === f ? e = f = g : f = f.next = g;
            c = c.next;
          } while (null !== c);

          null === f ? e = f = b : f = f.next = b;
        } else e = f = b;

        c = {
          baseState: d.baseState,
          firstBaseUpdate: e,
          lastBaseUpdate: f,
          shared: d.shared,
          effects: d.effects
        };
        a.updateQueue = c;
        return;
      }

      a = c.lastBaseUpdate;
      null === a ? c.firstBaseUpdate = b : a.next = b;
      c.lastBaseUpdate = b;
    }

    function od(a, b, c, d) {
      var e = a.updateQueue;
      hd = !1;
      var f = e.firstBaseUpdate,
          g = e.lastBaseUpdate,
          h = e.shared.pending;

      if (null !== h) {
        e.shared.pending = null;
        var k = h,
            l = k.next;
        k.next = null;
        null === g ? f = l : g.next = l;
        g = k;
        var n = a.alternate;

        if (null !== n) {
          n = n.updateQueue;
          var t = n.lastBaseUpdate;
          t !== g && (null === t ? n.firstBaseUpdate = l : t.next = l, n.lastBaseUpdate = k);
        }
      }

      if (null !== f) {
        t = e.baseState;
        g = 0;
        n = l = k = null;

        do {
          h = f.lane;
          var p = f.eventTime;

          if ((d & h) === h) {
            null !== n && (n = n.next = {
              eventTime: p,
              lane: 0,
              tag: f.tag,
              payload: f.payload,
              callback: f.callback,
              next: null
            });

            a: {
              var y = a,
                  x = f;
              h = b;
              p = c;

              switch (x.tag) {
                case 1:
                  y = x.payload;

                  if ("function" === typeof y) {
                    t = y.call(p, t, h);
                    break a;
                  }

                  t = y;
                  break a;

                case 3:
                  y.flags = y.flags & -4097 | 64;

                case 0:
                  y = x.payload;
                  h = "function" === typeof y ? y.call(p, t, h) : y;
                  if (null === h || void 0 === h) break a;
                  t = aa({}, t, h);
                  break a;

                case 2:
                  hd = !0;
              }
            }

            null !== f.callback && (a.flags |= 32, h = e.effects, null === h ? e.effects = [f] : h.push(f));
          } else p = {
            eventTime: p,
            lane: h,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, null === n ? (l = n = p, k = t) : n = n.next = p, g |= h;

          f = f.next;
          if (null === f) if (h = e.shared.pending, null === h) break;else f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
        } while (1);

        null === n && (k = t);
        e.baseState = k;
        e.firstBaseUpdate = l;
        e.lastBaseUpdate = n;
        pd |= g;
        a.lanes = g;
        a.memoizedState = t;
      }
    }

    function qd(a, b, c) {
      a = b.effects;
      b.effects = null;
      if (null !== a) for (b = 0; b < a.length; b++) {
        var d = a[b],
            e = d.callback;

        if (null !== e) {
          d.callback = null;
          d = c;
          if ("function" !== typeof e) throw Error(q(191, e));
          e.call(d);
        }
      }
    }

    var rd = new ba.Component().refs;

    function sd(a, b, c, d) {
      b = a.memoizedState;
      c = c(d, b);
      c = null === c || void 0 === c ? b : aa({}, b, c);
      a.memoizedState = c;
      0 === a.lanes && (a.updateQueue.baseState = c);
    }

    var vd = {
      isMounted: function isMounted(a) {
        return (a = a._reactInternals) ? xa(a) === a : !1;
      },
      enqueueSetState: function enqueueSetState(a, b, c) {
        a = a._reactInternals;
        var d = K(),
            e = td(a),
            f = kd(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        md(a, f);
        ud(a, e, d);
      },
      enqueueReplaceState: function enqueueReplaceState(a, b, c) {
        a = a._reactInternals;
        var d = K(),
            e = td(a),
            f = kd(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        md(a, f);
        ud(a, e, d);
      },
      enqueueForceUpdate: function enqueueForceUpdate(a, b) {
        a = a._reactInternals;
        var c = K(),
            d = td(a),
            e = kd(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        md(a, e);
        ud(a, d, c);
      }
    };

    function wd(a, b, c, d, e, f, g) {
      a = a.stateNode;
      return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Vc(c, d) || !Vc(e, f) : !0;
    }

    function xd(a, b, c) {
      var d = !1,
          e = Xb;
      var f = b.contextType;
      "object" === typeof f && null !== f ? f = J(f) : (e = E(b) ? Yb : B.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Zb(a, e) : Xb);
      b = new b(c, f);
      a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
      b.updater = vd;
      a.stateNode = b;
      b._reactInternals = a;
      d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
      return b;
    }

    function yd(a, b, c, d) {
      a = b.state;
      "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
      "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
      b.state !== a && vd.enqueueReplaceState(b, b.state, null);
    }

    function zd(a, b, c, d) {
      var e = a.stateNode;
      e.props = c;
      e.state = a.memoizedState;
      e.refs = rd;
      id(a);
      var f = b.contextType;
      "object" === typeof f && null !== f ? e.context = J(f) : (f = E(b) ? Yb : B.current, e.context = Zb(a, f));
      od(a, c, e, d);
      e.state = a.memoizedState;
      f = b.getDerivedStateFromProps;
      "function" === typeof f && (sd(a, b, f, c), e.state = a.memoizedState);
      "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && vd.enqueueReplaceState(e, e.state, null), od(a, c, e, d), e.state = a.memoizedState);
      "function" === typeof e.componentDidMount && (a.flags |= 4);
    }

    var Ad = Array.isArray;

    function Bd(a, b, c) {
      a = c.ref;

      if (null !== a && "function" !== typeof a && "object" !== typeof a) {
        if (c._owner) {
          c = c._owner;

          if (c) {
            if (1 !== c.tag) throw Error(q(309));
            var d = c.stateNode;
          }

          if (!d) throw Error(q(147, a));
          var e = "" + a;
          if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

          b = function b(a) {
            var b = d.refs;
            b === rd && (b = d.refs = {});
            null === a ? delete b[e] : b[e] = a;
          };

          b._stringRef = e;
          return b;
        }

        if ("string" !== typeof a) throw Error(q(284));
        if (!c._owner) throw Error(q(290, a));
      }

      return a;
    }

    function Cd(a, b) {
      if ("textarea" !== a.type) throw Error(q(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
    }

    function Dd(a) {
      function b(b, c) {
        if (a) {
          var d = b.lastEffect;
          null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
          c.nextEffect = null;
          c.flags = 8;
        }
      }

      function c(c, d) {
        if (!a) return null;

        for (; null !== d;) {
          b(c, d), d = d.sibling;
        }

        return null;
      }

      function d(a, b) {
        for (a = new Map(); null !== b;) {
          null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
        }

        return a;
      }

      function e(a, b) {
        a = Ed(a, b);
        a.index = 0;
        a.sibling = null;
        return a;
      }

      function f(b, c, d) {
        b.index = d;
        if (!a) return c;
        d = b.alternate;
        if (null !== d) return d = d.index, d < c ? (b.flags = 2, c) : d;
        b.flags = 2;
        return c;
      }

      function g(b) {
        a && null === b.alternate && (b.flags = 2);
        return b;
      }

      function h(a, b, c, d) {
        if (null === b || 6 !== b.tag) return b = Fd(c, a.mode, d), b.return = a, b;
        b = e(b, c);
        b.return = a;
        return b;
      }

      function k(a, b, c, d) {
        if (null !== b && b.elementType === c.type) return d = e(b, c.props), d.ref = Bd(a, b, c), d.return = a, d;
        d = Gd(c.type, c.key, c.props, null, a.mode, d);
        d.ref = Bd(a, b, c);
        d.return = a;
        return d;
      }

      function l(a, b, c, d) {
        if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Hd(c, a.mode, d), b.return = a, b;
        b = e(b, c.children || []);
        b.return = a;
        return b;
      }

      function n(a, b, c, d, f) {
        if (null === b || 7 !== b.tag) return b = Id(c, a.mode, d, f), b.return = a, b;
        b = e(b, c);
        b.return = a;
        return b;
      }

      function t(a, b, c) {
        if ("string" === typeof b || "number" === typeof b) return b = Fd("" + b, a.mode, c), b.return = a, b;

        if ("object" === typeof b && null !== b) {
          switch (b.$$typeof) {
            case da:
              return c = Gd(b.type, b.key, b.props, null, a.mode, c), c.ref = Bd(a, null, b), c.return = a, c;

            case ea:
              return b = Hd(b, a.mode, c), b.return = a, b;
          }

          if (Ad(b) || va(b)) return b = Id(b, a.mode, c, null), b.return = a, b;
          Cd(a, b);
        }

        return null;
      }

      function p(a, b, c, d) {
        var e = null !== b ? b.key : null;
        if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

        if ("object" === typeof c && null !== c) {
          switch (c.$$typeof) {
            case da:
              return c.key === e ? c.type === fa ? n(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

            case ea:
              return c.key === e ? l(a, b, c, d) : null;
          }

          if (Ad(c) || va(c)) return null !== e ? null : n(a, b, c, d, null);
          Cd(a, c);
        }

        return null;
      }

      function y(a, b, c, d, e) {
        if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

        if ("object" === typeof d && null !== d) {
          switch (d.$$typeof) {
            case da:
              return a = a.get(null === d.key ? c : d.key) || null, d.type === fa ? n(b, a, d.props.children, e, d.key) : k(b, a, d, e);

            case ea:
              return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
          }

          if (Ad(d) || va(d)) return a = a.get(c) || null, n(b, a, d, e, null);
          Cd(b, d);
        }

        return null;
      }

      function x(e, g, h, k) {
        for (var l = null, v = null, u = g, C = g = 0, n = null; null !== u && C < h.length; C++) {
          u.index > C ? (n = u, u = null) : n = u.sibling;
          var w = p(e, u, h[C], k);

          if (null === w) {
            null === u && (u = n);
            break;
          }

          a && u && null === w.alternate && b(e, u);
          g = f(w, g, C);
          null === v ? l = w : v.sibling = w;
          v = w;
          u = n;
        }

        if (C === h.length) return c(e, u), l;

        if (null === u) {
          for (; C < h.length; C++) {
            u = t(e, h[C], k), null !== u && (g = f(u, g, C), null === v ? l = u : v.sibling = u, v = u);
          }

          return l;
        }

        for (u = d(e, u); C < h.length; C++) {
          n = y(u, e, C, h[C], k), null !== n && (a && null !== n.alternate && u.delete(null === n.key ? C : n.key), g = f(n, g, C), null === v ? l = n : v.sibling = n, v = n);
        }

        a && u.forEach(function (a) {
          return b(e, a);
        });
        return l;
      }

      function Y(e, g, h, k) {
        var l = va(h);
        if ("function" !== typeof l) throw Error(q(150));
        h = l.call(h);
        if (null == h) throw Error(q(151));

        for (var u = l = null, v = g, n = g = 0, C = null, w = h.next(); null !== v && !w.done; n++, w = h.next()) {
          v.index > n ? (C = v, v = null) : C = v.sibling;
          var x = p(e, v, w.value, k);

          if (null === x) {
            null === v && (v = C);
            break;
          }

          a && v && null === x.alternate && b(e, v);
          g = f(x, g, n);
          null === u ? l = x : u.sibling = x;
          u = x;
          v = C;
        }

        if (w.done) return c(e, v), l;

        if (null === v) {
          for (; !w.done; n++, w = h.next()) {
            w = t(e, w.value, k), null !== w && (g = f(w, g, n), null === u ? l = w : u.sibling = w, u = w);
          }

          return l;
        }

        for (v = d(e, v); !w.done; n++, w = h.next()) {
          w = y(v, e, n, w.value, k), null !== w && (a && null !== w.alternate && v.delete(null === w.key ? n : w.key), g = f(w, g, n), null === u ? l = w : u.sibling = w, u = w);
        }

        a && v.forEach(function (a) {
          return b(e, a);
        });
        return l;
      }

      return function (a, d, f, h) {
        var k = "object" === typeof f && null !== f && f.type === fa && null === f.key;
        k && (f = f.props.children);
        var l = "object" === typeof f && null !== f;
        if (l) switch (f.$$typeof) {
          case da:
            a: {
              l = f.key;

              for (k = d; null !== k;) {
                if (k.key === l) {
                  switch (k.tag) {
                    case 7:
                      if (f.type === fa) {
                        c(a, k.sibling);
                        d = e(k, f.props.children);
                        d.return = a;
                        a = d;
                        break a;
                      }

                      break;

                    default:
                      if (k.elementType === f.type) {
                        c(a, k.sibling);
                        d = e(k, f.props);
                        d.ref = Bd(a, k, f);
                        d.return = a;
                        a = d;
                        break a;
                      }

                  }

                  c(a, k);
                  break;
                } else b(a, k);

                k = k.sibling;
              }

              f.type === fa ? (d = Id(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Gd(f.type, f.key, f.props, null, a.mode, h), h.ref = Bd(a, d, f), h.return = a, a = h);
            }

            return g(a);

          case ea:
            a: {
              for (k = f.key; null !== d;) {
                if (d.key === k) {
                  if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                    c(a, d.sibling);
                    d = e(d, f.children || []);
                    d.return = a;
                    a = d;
                    break a;
                  } else {
                    c(a, d);
                    break;
                  }
                } else b(a, d);
                d = d.sibling;
              }

              d = Hd(f, a.mode, h);
              d.return = a;
              a = d;
            }

            return g(a);
        }
        if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Fd(f, a.mode, h), d.return = a, a = d), g(a);
        if (Ad(f)) return x(a, d, f, h);
        if (va(f)) return Y(a, d, f, h);
        l && Cd(a, f);
        if ("undefined" === typeof f && !k) switch (a.tag) {
          case 1:
          case 22:
          case 0:
          case 11:
          case 15:
            throw Error(q(152, wa(a.type) || "Component"));
        }
        return c(a, d);
      };
    }

    var Jd = Dd(!0),
        Kd = Dd(!1),
        Ld = {},
        L = Wb(Ld),
        Md = Wb(Ld),
        Nd = Wb(Ld);

    function Od(a) {
      if (a === Ld) throw Error(q(174));
      return a;
    }

    function Pd(a, b) {
      A(Nd, b);
      A(Md, a);
      A(L, Ld);
      a = Ea(b);
      z(L);
      A(L, a);
    }

    function Qd() {
      z(L);
      z(Md);
      z(Nd);
    }

    function Rd(a) {
      var b = Od(Nd.current),
          c = Od(L.current);
      b = Fa(c, a.type, b);
      c !== b && (A(Md, a), A(L, b));
    }

    function Sd(a) {
      Md.current === a && (z(L), z(Md));
    }

    var M = Wb(0);

    function Td(a) {
      for (var b = a; null !== b;) {
        if (13 === b.tag) {
          var c = b.memoizedState;
          if (null !== c && (c = c.dehydrated, null === c || Hb(c) || Ib(c))) return b;
        } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
          if (0 !== (b.flags & 64)) return b;
        } else if (null !== b.child) {
          b.child.return = b;
          b = b.child;
          continue;
        }

        if (b === a) break;

        for (; null === b.sibling;) {
          if (null === b.return || b.return === a) return null;
          b = b.return;
        }

        b.sibling.return = b.return;
        b = b.sibling;
      }

      return null;
    }

    var Ud = null,
        Vd = null,
        Wd = !1;

    function Xd(a, b) {
      var c = Yd(5, null, null, 0);
      c.elementType = "DELETED";
      c.type = "DELETED";
      c.stateNode = b;
      c.return = a;
      c.flags = 8;
      null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
    }

    function Zd(a, b) {
      switch (a.tag) {
        case 5:
          return b = Fb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

        case 6:
          return b = Gb(b, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;

        case 13:
          return !1;

        default:
          return !1;
      }
    }

    function $d(a) {
      if (Wd) {
        var b = Vd;

        if (b) {
          var c = b;

          if (!Zd(a, b)) {
            b = Jb(c);

            if (!b || !Zd(a, b)) {
              a.flags = a.flags & -1025 | 2;
              Wd = !1;
              Ud = a;
              return;
            }

            Xd(Ud, c);
          }

          Ud = a;
          Vd = Kb(b);
        } else a.flags = a.flags & -1025 | 2, Wd = !1, Ud = a;
      }
    }

    function ae(a) {
      for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {
        a = a.return;
      }

      Ud = a;
    }

    function be(a) {
      if (!Va || a !== Ud) return !1;
      if (!Wd) return ae(a), Wd = !0, !1;
      var b = a.type;
      if (5 !== a.tag || "head" !== b && "body" !== b && !Ma(b, a.memoizedProps)) for (b = Vd; b;) {
        Xd(a, b), b = Jb(b);
      }
      ae(a);

      if (13 === a.tag) {
        if (!Va) throw Error(q(316));
        a = a.memoizedState;
        a = null !== a ? a.dehydrated : null;
        if (!a) throw Error(q(317));
        Vd = Nb(a);
      } else Vd = Ud ? Jb(a.stateNode) : null;

      return !0;
    }

    function ce() {
      Va && (Vd = Ud = null, Wd = !1);
    }

    var de = [];

    function ee() {
      for (var a = 0; a < de.length; a++) {
        var b = de[a];
        Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
      }

      de.length = 0;
    }

    var fe = ca.ReactCurrentDispatcher,
        ge = ca.ReactCurrentBatchConfig,
        he = 0,
        N = null,
        O = null,
        P = null,
        ie = !1,
        je = !1;

    function Q() {
      throw Error(q(321));
    }

    function ke(a, b) {
      if (null === b) return !1;

      for (var c = 0; c < b.length && c < a.length; c++) {
        if (!I(a[c], b[c])) return !1;
      }

      return !0;
    }

    function le(a, b, c, d, e, f) {
      he = f;
      N = b;
      b.memoizedState = null;
      b.updateQueue = null;
      b.lanes = 0;
      fe.current = null === a || null === a.memoizedState ? me : ne;
      a = c(d, e);

      if (je) {
        f = 0;

        do {
          je = !1;
          if (!(25 > f)) throw Error(q(301));
          f += 1;
          P = O = null;
          b.updateQueue = null;
          fe.current = oe;
          a = c(d, e);
        } while (je);
      }

      fe.current = pe;
      b = null !== O && null !== O.next;
      he = 0;
      P = O = N = null;
      ie = !1;
      if (b) throw Error(q(300));
      return a;
    }

    function qe() {
      var a = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      null === P ? N.memoizedState = P = a : P = P.next = a;
      return P;
    }

    function re() {
      if (null === O) {
        var a = N.alternate;
        a = null !== a ? a.memoizedState : null;
      } else a = O.next;

      var b = null === P ? N.memoizedState : P.next;
      if (null !== b) P = b, O = a;else {
        if (null === a) throw Error(q(310));
        O = a;
        a = {
          memoizedState: O.memoizedState,
          baseState: O.baseState,
          baseQueue: O.baseQueue,
          queue: O.queue,
          next: null
        };
        null === P ? N.memoizedState = P = a : P = P.next = a;
      }
      return P;
    }

    function se(a, b) {
      return "function" === typeof b ? b(a) : b;
    }

    function te(a) {
      var b = re(),
          c = b.queue;
      if (null === c) throw Error(q(311));
      c.lastRenderedReducer = a;
      var d = O,
          e = d.baseQueue,
          f = c.pending;

      if (null !== f) {
        if (null !== e) {
          var g = e.next;
          e.next = f.next;
          f.next = g;
        }

        d.baseQueue = e = f;
        c.pending = null;
      }

      if (null !== e) {
        e = e.next;
        d = d.baseState;
        var h = g = f = null,
            k = e;

        do {
          var l = k.lane;
          if ((he & l) === l) null !== h && (h = h.next = {
            lane: 0,
            action: k.action,
            eagerReducer: k.eagerReducer,
            eagerState: k.eagerState,
            next: null
          }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);else {
            var n = {
              lane: l,
              action: k.action,
              eagerReducer: k.eagerReducer,
              eagerState: k.eagerState,
              next: null
            };
            null === h ? (g = h = n, f = d) : h = h.next = n;
            N.lanes |= l;
            pd |= l;
          }
          k = k.next;
        } while (null !== k && k !== e);

        null === h ? f = d : h.next = g;
        I(d, b.memoizedState) || (gd = !0);
        b.memoizedState = d;
        b.baseState = f;
        b.baseQueue = h;
        c.lastRenderedState = d;
      }

      return [b.memoizedState, c.dispatch];
    }

    function ue(a) {
      var b = re(),
          c = b.queue;
      if (null === c) throw Error(q(311));
      c.lastRenderedReducer = a;
      var d = c.dispatch,
          e = c.pending,
          f = b.memoizedState;

      if (null !== e) {
        c.pending = null;
        var g = e = e.next;

        do {
          f = a(f, g.action), g = g.next;
        } while (g !== e);

        I(f, b.memoizedState) || (gd = !0);
        b.memoizedState = f;
        null === b.baseQueue && (b.baseState = f);
        c.lastRenderedState = f;
      }

      return [f, d];
    }

    function ve(a, b, c) {
      var d = b._getVersion;
      d = d(b._source);
      var e = Sa ? b._workInProgressVersionPrimary : b._workInProgressVersionSecondary;
      if (null !== e) a = e === d;else if (a = a.mutableReadLanes, a = (he & a) === a) Sa ? b._workInProgressVersionPrimary = d : b._workInProgressVersionSecondary = d, de.push(b);
      if (a) return c(b._source);
      de.push(b);
      throw Error(q(350));
    }

    function we(a, b, c, d) {
      var e = R;
      if (null === e) throw Error(q(349));
      var f = b._getVersion,
          g = f(b._source),
          h = fe.current,
          k = h.useState(function () {
        return ve(e, b, c);
      }),
          l = k[1],
          n = k[0];
      k = P;
      var t = a.memoizedState,
          p = t.refs,
          y = p.getSnapshot,
          x = t.source;
      t = t.subscribe;
      var Y = N;
      a.memoizedState = {
        refs: p,
        source: b,
        subscribe: d
      };
      h.useEffect(function () {
        p.getSnapshot = c;
        p.setSnapshot = l;
        var a = f(b._source);

        if (!I(g, a)) {
          a = c(b._source);
          I(n, a) || (l(a), a = td(Y), e.mutableReadLanes |= a & e.pendingLanes);
          a = e.mutableReadLanes;
          e.entangledLanes |= a;

          for (var d = e.entanglements, h = a; 0 < h;) {
            var k = 31 - mc(h),
                t = 1 << k;
            d[k] |= a;
            h &= ~t;
          }
        }
      }, [c, b, d]);
      h.useEffect(function () {
        return d(b._source, function () {
          var a = p.getSnapshot,
              c = p.setSnapshot;

          try {
            c(a(b._source));
            var d = td(Y);
            e.mutableReadLanes |= d & e.pendingLanes;
          } catch (Oa) {
            c(function () {
              throw Oa;
            });
          }
        });
      }, [b, d]);
      I(y, c) && I(x, b) && I(t, d) || (a = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: se,
        lastRenderedState: n
      }, a.dispatch = l = xe.bind(null, N, a), k.queue = a, k.baseQueue = null, n = ve(e, b, c), k.memoizedState = k.baseState = n);
      return n;
    }

    function ye(a, b, c) {
      var d = re();
      return we(d, a, b, c);
    }

    function ze(a) {
      var b = qe();
      "function" === typeof a && (a = a());
      b.memoizedState = b.baseState = a;
      a = b.queue = {
        pending: null,
        dispatch: null,
        lastRenderedReducer: se,
        lastRenderedState: a
      };
      a = a.dispatch = xe.bind(null, N, a);
      return [b.memoizedState, a];
    }

    function Ae(a, b, c, d) {
      a = {
        tag: a,
        create: b,
        destroy: c,
        deps: d,
        next: null
      };
      b = N.updateQueue;
      null === b ? (b = {
        lastEffect: null
      }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
      return a;
    }

    function Be(a) {
      var b = qe();
      a = {
        current: a
      };
      return b.memoizedState = a;
    }

    function Ce() {
      return re().memoizedState;
    }

    function De(a, b, c, d) {
      var e = qe();
      N.flags |= a;
      e.memoizedState = Ae(1 | b, c, void 0, void 0 === d ? null : d);
    }

    function Ee(a, b, c, d) {
      var e = re();
      d = void 0 === d ? null : d;
      var f = void 0;

      if (null !== O) {
        var g = O.memoizedState;
        f = g.destroy;

        if (null !== d && ke(d, g.deps)) {
          Ae(b, c, f, d);
          return;
        }
      }

      N.flags |= a;
      e.memoizedState = Ae(1 | b, c, f, d);
    }

    function Fe(a, b) {
      return De(516, 4, a, b);
    }

    function Ge(a, b) {
      return Ee(516, 4, a, b);
    }

    function He(a, b) {
      return Ee(4, 2, a, b);
    }

    function Ie(a, b) {
      if ("function" === typeof b) return a = a(), b(a), function () {
        b(null);
      };
      if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
        b.current = null;
      };
    }

    function Je(a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return Ee(4, 2, Ie.bind(null, b, a), c);
    }

    function Ke() {}

    function Le(a, b) {
      var c = re();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && ke(b, d[1])) return d[0];
      c.memoizedState = [a, b];
      return a;
    }

    function Me(a, b) {
      var c = re();
      b = void 0 === b ? null : b;
      var d = c.memoizedState;
      if (null !== d && null !== b && ke(b, d[1])) return d[0];
      a = a();
      c.memoizedState = [a, b];
      return a;
    }

    function Ne(a, b) {
      var c = Nc();
      Pc(98 > c ? 98 : c, function () {
        a(!0);
      });
      Pc(97 < c ? 97 : c, function () {
        var c = ge.transition;
        ge.transition = 1;

        try {
          a(!1), b();
        } finally {
          ge.transition = c;
        }
      });
    }

    function xe(a, b, c) {
      var d = K(),
          e = td(a),
          f = {
        lane: e,
        action: c,
        eagerReducer: null,
        eagerState: null,
        next: null
      },
          g = b.pending;
      null === g ? f.next = f : (f.next = g.next, g.next = f);
      b.pending = f;
      g = a.alternate;
      if (a === N || null !== g && g === N) je = ie = !0;else {
        if (0 === a.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g)) try {
          var h = b.lastRenderedState,
              k = g(h, c);
          f.eagerReducer = g;
          f.eagerState = k;
          if (I(k, h)) return;
        } catch (l) {} finally {}
        ud(a, e, d);
      }
    }

    var pe = {
      readContext: J,
      useCallback: Q,
      useContext: Q,
      useEffect: Q,
      useImperativeHandle: Q,
      useLayoutEffect: Q,
      useMemo: Q,
      useReducer: Q,
      useRef: Q,
      useState: Q,
      useDebugValue: Q,
      useDeferredValue: Q,
      useTransition: Q,
      useMutableSource: Q,
      useOpaqueIdentifier: Q,
      unstable_isNewReconciler: !1
    },
        me = {
      readContext: J,
      useCallback: function useCallback(a, b) {
        qe().memoizedState = [a, void 0 === b ? null : b];
        return a;
      },
      useContext: J,
      useEffect: Fe,
      useImperativeHandle: function useImperativeHandle(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return De(4, 2, Ie.bind(null, b, a), c);
      },
      useLayoutEffect: function useLayoutEffect(a, b) {
        return De(4, 2, a, b);
      },
      useMemo: function useMemo(a, b) {
        var c = qe();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      },
      useReducer: function useReducer(a, b, c) {
        var d = qe();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = d.queue = {
          pending: null,
          dispatch: null,
          lastRenderedReducer: a,
          lastRenderedState: b
        };
        a = a.dispatch = xe.bind(null, N, a);
        return [d.memoizedState, a];
      },
      useRef: Be,
      useState: ze,
      useDebugValue: Ke,
      useDeferredValue: function useDeferredValue(a) {
        var b = ze(a),
            c = b[0],
            d = b[1];
        Fe(function () {
          var b = ge.transition;
          ge.transition = 1;

          try {
            d(a);
          } finally {
            ge.transition = b;
          }
        }, [a]);
        return c;
      },
      useTransition: function useTransition() {
        var a = ze(!1),
            b = a[0];
        a = Ne.bind(null, a[1]);
        Be(a);
        return [a, b];
      },
      useMutableSource: function useMutableSource(a, b, c) {
        var d = qe();
        d.memoizedState = {
          refs: {
            getSnapshot: b,
            setSnapshot: null
          },
          source: a,
          subscribe: c
        };
        return we(d, a, b, c);
      },
      useOpaqueIdentifier: function useOpaqueIdentifier() {
        if (Wd) {
          var a = !1,
              b = Xa(function () {
            a || (a = !0, c(Ya()));
            throw Error(q(355));
          }),
              c = ze(b)[1];
          0 === (N.mode & 2) && (N.flags |= 516, Ae(5, function () {
            c(Ya());
          }, void 0, null));
          return b;
        }

        b = Ya();
        ze(b);
        return b;
      },
      unstable_isNewReconciler: !1
    },
        ne = {
      readContext: J,
      useCallback: Le,
      useContext: J,
      useEffect: Ge,
      useImperativeHandle: Je,
      useLayoutEffect: He,
      useMemo: Me,
      useReducer: te,
      useRef: Ce,
      useState: function useState() {
        return te(se);
      },
      useDebugValue: Ke,
      useDeferredValue: function useDeferredValue(a) {
        var b = te(se),
            c = b[0],
            d = b[1];
        Ge(function () {
          var b = ge.transition;
          ge.transition = 1;

          try {
            d(a);
          } finally {
            ge.transition = b;
          }
        }, [a]);
        return c;
      },
      useTransition: function useTransition() {
        var a = te(se)[0];
        return [Ce().current, a];
      },
      useMutableSource: ye,
      useOpaqueIdentifier: function useOpaqueIdentifier() {
        return te(se)[0];
      },
      unstable_isNewReconciler: !1
    },
        oe = {
      readContext: J,
      useCallback: Le,
      useContext: J,
      useEffect: Ge,
      useImperativeHandle: Je,
      useLayoutEffect: He,
      useMemo: Me,
      useReducer: ue,
      useRef: Ce,
      useState: function useState() {
        return ue(se);
      },
      useDebugValue: Ke,
      useDeferredValue: function useDeferredValue(a) {
        var b = ue(se),
            c = b[0],
            d = b[1];
        Ge(function () {
          var b = ge.transition;
          ge.transition = 1;

          try {
            d(a);
          } finally {
            ge.transition = b;
          }
        }, [a]);
        return c;
      },
      useTransition: function useTransition() {
        var a = ue(se)[0];
        return [Ce().current, a];
      },
      useMutableSource: ye,
      useOpaqueIdentifier: function useOpaqueIdentifier() {
        return ue(se)[0];
      },
      unstable_isNewReconciler: !1
    },
        Oe = ca.ReactCurrentOwner,
        gd = !1;

    function S(a, b, c, d) {
      b.child = null === a ? Kd(b, null, c, d) : Jd(b, a.child, c, d);
    }

    function Pe(a, b, c, d, e) {
      c = c.render;
      var f = b.ref;
      fd(b, e);
      d = le(a, b, c, d, f, e);
      if (null !== a && !gd) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, Re(a, b, e);
      b.flags |= 1;
      S(a, b, d, e);
      return b.child;
    }

    function Se(a, b, c, d, e, f) {
      if (null === a) {
        var g = c.type;
        if ("function" === typeof g && !Te(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, Ue(a, b, g, d, e, f);
        a = Gd(c.type, null, d, b, b.mode, f);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }

      g = a.child;
      if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Vc, c(e, d) && a.ref === b.ref)) return Re(a, b, f);
      b.flags |= 1;
      a = Ed(g, d);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }

    function Ue(a, b, c, d, e, f) {
      if (null !== a && Vc(a.memoizedProps, d) && a.ref === b.ref) if (gd = !1, 0 !== (f & e)) 0 !== (a.flags & 16384) && (gd = !0);else return b.lanes = a.lanes, Re(a, b, f);
      return Ve(a, b, c, d, f);
    }

    function We(a, b, c) {
      var d = b.pendingProps,
          e = d.children,
          f = null !== a ? a.memoizedState : null;
      if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode) {
        if (0 === (b.mode & 4)) b.memoizedState = {
          baseLanes: 0
        }, Xe(b, c);else if (0 !== (c & 1073741824)) b.memoizedState = {
          baseLanes: 0
        }, Xe(b, null !== f ? f.baseLanes : c);else return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
          baseLanes: a
        }, Xe(b, a), null;
      } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, Xe(b, d);
      S(a, b, e, c);
      return b.child;
    }

    function Ye(a, b) {
      var c = b.ref;
      if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 128;
    }

    function Ve(a, b, c, d, e) {
      var f = E(c) ? Yb : B.current;
      f = Zb(b, f);
      fd(b, e);
      c = le(a, b, c, d, f, e);
      if (null !== a && !gd) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, Re(a, b, e);
      b.flags |= 1;
      S(a, b, c, e);
      return b.child;
    }

    function Ze(a, b, c, d, e) {
      if (E(c)) {
        var f = !0;
        cc(b);
      } else f = !1;

      fd(b, e);
      if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), xd(b, c, d), zd(b, c, d, e), d = !0;else if (null === a) {
        var g = b.stateNode,
            h = b.memoizedProps;
        g.props = h;
        var k = g.context,
            l = c.contextType;
        "object" === typeof l && null !== l ? l = J(l) : (l = E(c) ? Yb : B.current, l = Zb(b, l));
        var n = c.getDerivedStateFromProps,
            t = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
        t || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && yd(b, g, d, l);
        hd = !1;
        var p = b.memoizedState;
        g.state = p;
        od(b, d, g, e);
        k = b.memoizedState;
        h !== d || p !== k || D.current || hd ? ("function" === typeof n && (sd(b, c, n, d), k = b.memoizedState), (h = hd || wd(b, c, h, d, p, k, l)) ? (t || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = !1);
      } else {
        g = b.stateNode;
        jd(a, b);
        h = b.memoizedProps;
        l = b.type === b.elementType ? h : Xc(b.type, h);
        g.props = l;
        t = b.pendingProps;
        p = g.context;
        k = c.contextType;
        "object" === typeof k && null !== k ? k = J(k) : (k = E(c) ? Yb : B.current, k = Zb(b, k));
        var y = c.getDerivedStateFromProps;
        (n = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== t || p !== k) && yd(b, g, d, k);
        hd = !1;
        p = b.memoizedState;
        g.state = p;
        od(b, d, g, e);
        var x = b.memoizedState;
        h !== t || p !== x || D.current || hd ? ("function" === typeof y && (sd(b, c, y, d), x = b.memoizedState), (l = hd || wd(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = !1);
      }
      return $e(a, b, c, d, f, e);
    }

    function $e(a, b, c, d, e, f) {
      Ye(a, b);
      var g = 0 !== (b.flags & 64);
      if (!d && !g) return e && dc(b, c, !1), Re(a, b, f);
      d = b.stateNode;
      Oe.current = b;
      var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
      b.flags |= 1;
      null !== a && g ? (b.child = Jd(b, a.child, null, f), b.child = Jd(b, null, h, f)) : S(a, b, h, f);
      b.memoizedState = d.state;
      e && dc(b, c, !0);
      return b.child;
    }

    function af(a) {
      var b = a.stateNode;
      b.pendingContext ? ac(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ac(a, b.context, !1);
      Pd(a, b.containerInfo);
    }

    var bf = {
      dehydrated: null,
      retryLane: 0
    };

    function cf(a, b, c) {
      var d = b.pendingProps,
          e = M.current,
          f = !1,
          g;
      (g = 0 !== (b.flags & 64)) || (g = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
      g ? (f = !0, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || !0 === d.unstable_avoidThisFallback || (e |= 1);
      A(M, e & 1);

      if (null === a) {
        void 0 !== d.fallback && $d(b);
        a = d.children;
        e = d.fallback;
        if (f) return a = df(b, a, e, c), b.child.memoizedState = {
          baseLanes: c
        }, b.memoizedState = bf, a;
        if ("number" === typeof d.unstable_expectedLoadTime) return a = df(b, a, e, c), b.child.memoizedState = {
          baseLanes: c
        }, b.memoizedState = bf, b.lanes = 33554432, a;
        c = ef({
          mode: "visible",
          children: a
        }, b.mode, c, null);
        c.return = b;
        return b.child = c;
      }

      if (null !== a.memoizedState) {
        if (f) return d = ff(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? {
          baseLanes: c
        } : {
          baseLanes: e.baseLanes | c
        }, f.childLanes = a.childLanes & ~c, b.memoizedState = bf, d;
        c = gf(a, b, d.children, c);
        b.memoizedState = null;
        return c;
      }

      if (f) return d = ff(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? {
        baseLanes: c
      } : {
        baseLanes: e.baseLanes | c
      }, f.childLanes = a.childLanes & ~c, b.memoizedState = bf, d;
      c = gf(a, b, d.children, c);
      b.memoizedState = null;
      return c;
    }

    function df(a, b, c, d) {
      var e = a.mode,
          f = a.child;
      b = {
        mode: "hidden",
        children: b
      };
      0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = ef(b, e, 0, null);
      c = Id(c, e, d, null);
      f.return = a;
      c.return = a;
      f.sibling = c;
      a.child = f;
      return c;
    }

    function gf(a, b, c, d) {
      var e = a.child;
      a = e.sibling;
      c = Ed(e, {
        mode: "visible",
        children: c
      });
      0 === (b.mode & 2) && (c.lanes = d);
      c.return = b;
      c.sibling = null;
      null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
      return b.child = c;
    }

    function ff(a, b, c, d, e) {
      var f = b.mode,
          g = a.child;
      a = g.sibling;
      var h = {
        mode: "hidden",
        children: c
      };
      0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Ed(g, h);
      null !== a ? d = Ed(a, d) : (d = Id(d, f, e, null), d.flags |= 2);
      d.return = b;
      c.return = b;
      c.sibling = d;
      b.child = c;
      return d;
    }

    function hf(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      null !== c && (c.lanes |= b);
      ed(a.return, b);
    }

    function jf(a, b, c, d, e, f) {
      var g = a.memoizedState;
      null === g ? a.memoizedState = {
        isBackwards: b,
        rendering: null,
        renderingStartTime: 0,
        last: d,
        tail: c,
        tailMode: e,
        lastEffect: f
      } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
    }

    function kf(a, b, c) {
      var d = b.pendingProps,
          e = d.revealOrder,
          f = d.tail;
      S(a, b, d.children, c);
      d = M.current;
      if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 64;else {
        if (null !== a && 0 !== (a.flags & 64)) a: for (a = b.child; null !== a;) {
          if (13 === a.tag) null !== a.memoizedState && hf(a, c);else if (19 === a.tag) hf(a, c);else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b) break a;

          for (; null === a.sibling;) {
            if (null === a.return || a.return === b) break a;
            a = a.return;
          }

          a.sibling.return = a.return;
          a = a.sibling;
        }
        d &= 1;
      }
      A(M, d);
      if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
        case "forwards":
          c = b.child;

          for (e = null; null !== c;) {
            a = c.alternate, null !== a && null === Td(a) && (e = c), c = c.sibling;
          }

          c = e;
          null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
          jf(b, !1, e, c, f, b.lastEffect);
          break;

        case "backwards":
          c = null;
          e = b.child;

          for (b.child = null; null !== e;) {
            a = e.alternate;

            if (null !== a && null === Td(a)) {
              b.child = e;
              break;
            }

            a = e.sibling;
            e.sibling = c;
            c = e;
            e = a;
          }

          jf(b, !0, c, null, f, b.lastEffect);
          break;

        case "together":
          jf(b, !1, null, null, void 0, b.lastEffect);
          break;

        default:
          b.memoizedState = null;
      }
      return b.child;
    }

    function Re(a, b, c) {
      null !== a && (b.dependencies = a.dependencies);
      pd |= b.lanes;

      if (0 !== (c & b.childLanes)) {
        if (null !== a && b.child !== a.child) throw Error(q(153));

        if (null !== b.child) {
          a = b.child;
          c = Ed(a, a.pendingProps);
          b.child = c;

          for (c.return = b; null !== a.sibling;) {
            a = a.sibling, c = c.sibling = Ed(a, a.pendingProps), c.return = b;
          }

          c.sibling = null;
        }

        return b.child;
      }

      return null;
    }

    function lf(a) {
      a.flags |= 4;
    }

    var _mf, nf, of, pf;

    if (Ta) _mf = function mf(a, b) {
      for (var c = b.child; null !== c;) {
        if (5 === c.tag || 6 === c.tag) Ja(a, c.stateNode);else if (4 !== c.tag && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b) break;

        for (; null === c.sibling;) {
          if (null === c.return || c.return === b) return;
          c = c.return;
        }

        c.sibling.return = c.return;
        c = c.sibling;
      }
    }, nf = function nf() {}, of = function of(a, b, c, d, e) {
      a = a.memoizedProps;

      if (a !== d) {
        var f = b.stateNode,
            g = Od(L.current);
        c = La(f, c, a, d, e, g);
        (b.updateQueue = c) && lf(b);
      }
    }, pf = function pf(a, b, c, d) {
      c !== d && lf(b);
    };else if (Ua) {
      _mf = function mf(a, b, c, d) {
        for (var e = b.child; null !== e;) {
          if (5 === e.tag) {
            var f = e.stateNode;
            c && d && (f = Db(f, e.type, e.memoizedProps, e));
            Ja(a, f);
          } else if (6 === e.tag) f = e.stateNode, c && d && (f = Eb(f, e.memoizedProps, e)), Ja(a, f);else if (4 !== e.tag) {
            if (13 === e.tag && 0 !== (e.flags & 4) && (f = null !== e.memoizedState)) {
              var g = e.child;

              if (null !== g && (null !== g.child && (g.child.return = g, _mf(a, g, !0, f)), f = g.sibling, null !== f)) {
                f.return = e;
                e = f;
                continue;
              }
            }

            if (null !== e.child) {
              e.child.return = e;
              e = e.child;
              continue;
            }
          }

          if (e === b) break;

          for (; null === e.sibling;) {
            if (null === e.return || e.return === b) return;
            e = e.return;
          }

          e.sibling.return = e.return;
          e = e.sibling;
        }
      };

      var qf = function qf(a, b, c, d) {
        for (var e = b.child; null !== e;) {
          if (5 === e.tag) {
            var f = e.stateNode;
            c && d && (f = Db(f, e.type, e.memoizedProps, e));
            Ab(a, f);
          } else if (6 === e.tag) f = e.stateNode, c && d && (f = Eb(f, e.memoizedProps, e)), Ab(a, f);else if (4 !== e.tag) {
            if (13 === e.tag && 0 !== (e.flags & 4) && (f = null !== e.memoizedState)) {
              var g = e.child;

              if (null !== g && (null !== g.child && (g.child.return = g, qf(a, g, !0, f)), f = g.sibling, null !== f)) {
                f.return = e;
                e = f;
                continue;
              }
            }

            if (null !== e.child) {
              e.child.return = e;
              e = e.child;
              continue;
            }
          }

          if (e === b) break;

          for (; null === e.sibling;) {
            if (null === e.return || e.return === b) return;
            e = e.return;
          }

          e.sibling.return = e.return;
          e = e.sibling;
        }
      };

      nf = function nf(a) {
        var b = a.stateNode;

        if (null !== a.firstEffect) {
          var c = b.containerInfo,
              d = zb(c);
          qf(d, a, !1, !1);
          b.pendingChildren = d;
          lf(a);
          Bb(c, d);
        }
      };

      of = function of(a, b, c, d, e) {
        var f = a.stateNode,
            g = a.memoizedProps;
        if ((a = null === b.firstEffect) && g === d) b.stateNode = f;else {
          var h = b.stateNode,
              k = Od(L.current),
              l = null;
          g !== d && (l = La(h, c, g, d, e, k));
          a && null === l ? b.stateNode = f : (f = yb(f, l, c, g, d, b, a, h), Ka(f, c, d, e, k) && lf(b), b.stateNode = f, a ? lf(b) : _mf(f, b, !1, !1));
        }
      };

      pf = function pf(a, b, c, d) {
        c !== d ? (a = Od(Nd.current), c = Od(L.current), b.stateNode = Na(d, a, c, b), lf(b)) : b.stateNode = a.stateNode;
      };
    } else nf = function nf() {}, of = function of() {}, pf = function pf() {};

    function rf(a, b) {
      if (!Wd) switch (a.tailMode) {
        case "hidden":
          b = a.tail;

          for (var c = null; null !== b;) {
            null !== b.alternate && (c = b), b = b.sibling;
          }

          null === c ? a.tail = null : c.sibling = null;
          break;

        case "collapsed":
          c = a.tail;

          for (var d = null; null !== c;) {
            null !== c.alternate && (d = c), c = c.sibling;
          }

          null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
    }

    function sf(a, b, c) {
      var d = b.pendingProps;

      switch (b.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;

        case 1:
          return E(b.type) && $b(), null;

        case 3:
          Qd();
          z(D);
          z(B);
          ee();
          d = b.stateNode;
          d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
          if (null === a || null === a.child) be(b) ? lf(b) : d.hydrate || (b.flags |= 256);
          nf(b);
          return null;

        case 5:
          Sd(b);
          var e = Od(Nd.current);
          c = b.type;
          if (null !== a && null != b.stateNode) of(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);else {
            if (!d) {
              if (null === b.stateNode) throw Error(q(166));
              return null;
            }

            a = Od(L.current);

            if (be(b)) {
              if (!Va) throw Error(q(175));
              a = Lb(b.stateNode, b.type, b.memoizedProps, e, a, b);
              b.updateQueue = a;
              null !== a && lf(b);
            } else {
              var f = Ia(c, d, e, a, b);

              _mf(f, b, !1, !1);

              b.stateNode = f;
              Ka(f, c, d, e, a) && lf(b);
            }

            null !== b.ref && (b.flags |= 128);
          }
          return null;

        case 6:
          if (a && null != b.stateNode) pf(a, b, a.memoizedProps, d);else {
            if ("string" !== typeof d && null === b.stateNode) throw Error(q(166));
            a = Od(Nd.current);
            e = Od(L.current);

            if (be(b)) {
              if (!Va) throw Error(q(176));
              Mb(b.stateNode, b.memoizedProps, b) && lf(b);
            } else b.stateNode = Na(d, a, e, b);
          }
          return null;

        case 13:
          z(M);
          d = b.memoizedState;
          if (0 !== (b.flags & 64)) return b.lanes = c, b;
          d = null !== d;
          e = !1;
          null === a ? void 0 !== b.memoizedProps.fallback && be(b) : e = null !== a.memoizedState;
          if (d && !e && 0 !== (b.mode & 2)) if (null === a && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (M.current & 1)) 0 === T && (T = 3);else {
            if (0 === T || 3 === T) T = 4;
            null === R || 0 === (pd & 134217727) && 0 === (tf & 134217727) || uf(R, U);
          }
          Ua && d && (b.flags |= 4);
          Ta && (d || e) && (b.flags |= 4);
          return null;

        case 4:
          return Qd(), nf(b), null === a && ab(b.stateNode.containerInfo), null;

        case 10:
          return dd(b), null;

        case 17:
          return E(b.type) && $b(), null;

        case 19:
          z(M);
          d = b.memoizedState;
          if (null === d) return null;
          e = 0 !== (b.flags & 64);
          f = d.rendering;
          if (null === f) {
            if (e) rf(d, !1);else {
              if (0 !== T || null !== a && 0 !== (a.flags & 64)) for (a = b.child; null !== a;) {
                f = Td(a);

                if (null !== f) {
                  b.flags |= 64;
                  rf(d, !1);
                  a = f.updateQueue;
                  null !== a && (b.updateQueue = a, b.flags |= 4);
                  null === d.lastEffect && (b.firstEffect = null);
                  b.lastEffect = d.lastEffect;
                  a = c;

                  for (d = b.child; null !== d;) {
                    e = d, c = a, e.flags &= 2, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null, f = e.alternate, null === f ? (e.childLanes = 0, e.lanes = c, e.child = null, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = f.childLanes, e.lanes = f.lanes, e.child = f.child, e.memoizedProps = f.memoizedProps, e.memoizedState = f.memoizedState, e.updateQueue = f.updateQueue, e.type = f.type, c = f.dependencies, e.dependencies = null === c ? null : {
                      lanes: c.lanes,
                      firstContext: c.firstContext
                    }), d = d.sibling;
                  }

                  A(M, M.current & 1 | 2);
                  return b.child;
                }

                a = a.sibling;
              }
              null !== d.tail && G() > vf && (b.flags |= 64, e = !0, rf(d, !1), b.lanes = 33554432);
            }
          } else {
            if (!e) if (a = Td(f), null !== a) {
              if (b.flags |= 64, e = !0, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), rf(d, !0), null === d.tail && "hidden" === d.tailMode && !f.alternate && !Wd) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
            } else 2 * G() - d.renderingStartTime > vf && 1073741824 !== c && (b.flags |= 64, e = !0, rf(d, !1), b.lanes = 33554432);
            d.isBackwards ? (f.sibling = b.child, b.child = f) : (a = d.last, null !== a ? a.sibling = f : b.child = f, d.last = f);
          }
          return null !== d.tail ? (a = d.tail, d.rendering = a, d.tail = a.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = G(), a.sibling = null, b = M.current, A(M, e ? b & 1 | 2 : b & 1), a) : null;

        case 23:
        case 24:
          return wf(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
      }

      throw Error(q(156, b.tag));
    }

    function xf(a) {
      switch (a.tag) {
        case 1:
          E(a.type) && $b();
          var b = a.flags;
          return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;

        case 3:
          Qd();
          z(D);
          z(B);
          ee();
          b = a.flags;
          if (0 !== (b & 64)) throw Error(q(285));
          a.flags = b & -4097 | 64;
          return a;

        case 5:
          return Sd(a), null;

        case 13:
          return z(M), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;

        case 19:
          return z(M), null;

        case 4:
          return Qd(), null;

        case 10:
          return dd(a), null;

        case 23:
        case 24:
          return wf(), null;

        default:
          return null;
      }
    }

    function yf(a, b) {
      try {
        var c = "",
            d = b;

        do {
          c += Wc(d), d = d.return;
        } while (d);

        var e = c;
      } catch (f) {
        e = "\nError generating stack: " + f.message + "\n" + f.stack;
      }

      return {
        value: a,
        source: b,
        stack: e
      };
    }

    function zf(a, b) {
      try {
        console.error(b.value);
      } catch (c) {
        setTimeout(function () {
          throw c;
        });
      }
    }

    var Af = "function" === typeof WeakMap ? WeakMap : Map;

    function Bf(a, b, c) {
      c = kd(-1, c);
      c.tag = 3;
      c.payload = {
        element: null
      };
      var d = b.value;

      c.callback = function () {
        Cf || (Cf = !0, Df = d);
        zf(a, b);
      };

      return c;
    }

    function Ef(a, b, c) {
      c = kd(-1, c);
      c.tag = 3;
      var d = a.type.getDerivedStateFromError;

      if ("function" === typeof d) {
        var e = b.value;

        c.payload = function () {
          zf(a, b);
          return d(e);
        };
      }

      var f = a.stateNode;
      null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
        "function" !== typeof d && (null === Ff ? Ff = new Set([this]) : Ff.add(this), zf(a, b));
        var c = b.stack;
        this.componentDidCatch(b.value, {
          componentStack: null !== c ? c : ""
        });
      });
      return c;
    }

    var Gf = "function" === typeof WeakSet ? WeakSet : Set;

    function Hf(a) {
      var b = a.ref;
      if (null !== b) if ("function" === typeof b) try {
        b(null);
      } catch (c) {
        If(a, c);
      } else b.current = null;
    }

    function Jf(a, b) {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;

        case 1:
          if (b.flags & 256 && null !== a) {
            var c = a.memoizedProps,
                d = a.memoizedState;
            a = b.stateNode;
            b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : Xc(b.type, c), d);
            a.__reactInternalSnapshotBeforeUpdate = b;
          }

          return;

        case 3:
          Ta && b.flags & 256 && xb(b.stateNode.containerInfo);
          return;

        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }

      throw Error(q(163));
    }

    function Kf(a, b) {
      b = b.updateQueue;
      b = null !== b ? b.lastEffect : null;

      if (null !== b) {
        var c = b = b.next;

        do {
          if ((c.tag & a) === a) {
            var d = c.destroy;
            c.destroy = void 0;
            void 0 !== d && d();
          }

          c = c.next;
        } while (c !== b);
      }
    }

    function Lf(a, b, c) {
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          b = c.updateQueue;
          b = null !== b ? b.lastEffect : null;

          if (null !== b) {
            a = b = b.next;

            do {
              if (3 === (a.tag & 3)) {
                var d = a.create;
                a.destroy = d();
              }

              a = a.next;
            } while (a !== b);
          }

          b = c.updateQueue;
          b = null !== b ? b.lastEffect : null;

          if (null !== b) {
            a = b = b.next;

            do {
              var e = a;
              d = e.next;
              e = e.tag;
              0 !== (e & 4) && 0 !== (e & 1) && (Mf(c, a), Nf(c, a));
              a = d;
            } while (a !== b);
          }

          return;

        case 1:
          a = c.stateNode;
          c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : Xc(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate)));
          b = c.updateQueue;
          null !== b && qd(c, b, a);
          return;

        case 3:
          b = c.updateQueue;

          if (null !== b) {
            a = null;
            if (null !== c.child) switch (c.child.tag) {
              case 5:
                a = Da(c.child.stateNode);
                break;

              case 1:
                a = c.child.stateNode;
            }
            qd(c, b, a);
          }

          return;

        case 5:
          a = c.stateNode;
          null === b && c.flags & 4 && mb(a, c.type, c.memoizedProps, c);
          return;

        case 6:
          return;

        case 4:
          return;

        case 12:
          return;

        case 13:
          Va && null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Pb(c))));
          return;

        case 19:
        case 17:
        case 20:
        case 21:
        case 23:
        case 24:
          return;
      }

      throw Error(q(163));
    }

    function Of(a, b) {
      if (Ta) for (var c = a;;) {
        if (5 === c.tag) {
          var d = c.stateNode;
          b ? tb(d) : vb(c.stateNode, c.memoizedProps);
        } else if (6 === c.tag) d = c.stateNode, b ? ub(d) : wb(d, c.memoizedProps);else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }

        if (c === a) break;

        for (; null === c.sibling;) {
          if (null === c.return || c.return === a) return;
          c = c.return;
        }

        c.sibling.return = c.return;
        c = c.sibling;
      }
    }

    function Pf(a, b) {
      if (fc && "function" === typeof fc.onCommitFiberUnmount) try {
        fc.onCommitFiberUnmount(ec, b);
      } catch (f) {}

      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          a = b.updateQueue;

          if (null !== a && (a = a.lastEffect, null !== a)) {
            var c = a = a.next;

            do {
              var d = c,
                  e = d.destroy;
              d = d.tag;
              if (void 0 !== e) if (0 !== (d & 4)) Mf(b, c);else {
                d = b;

                try {
                  e();
                } catch (f) {
                  If(d, f);
                }
              }
              c = c.next;
            } while (c !== a);
          }

          break;

        case 1:
          Hf(b);
          a = b.stateNode;
          if ("function" === typeof a.componentWillUnmount) try {
            a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
          } catch (f) {
            If(b, f);
          }
          break;

        case 5:
          Hf(b);
          break;

        case 4:
          Ta ? Qf(a, b) : Ua && Ua && (b = b.stateNode.containerInfo, a = zb(b), Cb(b, a));
      }
    }

    function Rf(a, b) {
      for (var c = b;;) {
        if (Pf(a, c), null === c.child || Ta && 4 === c.tag) {
          if (c === b) break;

          for (; null === c.sibling;) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }

          c.sibling.return = c.return;
          c = c.sibling;
        } else c.child.return = c, c = c.child;
      }
    }

    function Sf(a) {
      a.alternate = null;
      a.child = null;
      a.dependencies = null;
      a.firstEffect = null;
      a.lastEffect = null;
      a.memoizedProps = null;
      a.memoizedState = null;
      a.pendingProps = null;
      a.return = null;
      a.updateQueue = null;
    }

    function Tf(a) {
      return 5 === a.tag || 3 === a.tag || 4 === a.tag;
    }

    function Uf(a) {
      if (Ta) {
        a: {
          for (var b = a.return; null !== b;) {
            if (Tf(b)) break a;
            b = b.return;
          }

          throw Error(q(160));
        }

        var c = b;
        b = c.stateNode;

        switch (c.tag) {
          case 5:
            var d = !1;
            break;

          case 3:
            b = b.containerInfo;
            d = !0;
            break;

          case 4:
            b = b.containerInfo;
            d = !0;
            break;

          default:
            throw Error(q(161));
        }

        c.flags & 16 && (sb(b), c.flags &= -17);

        a: b: for (c = a;;) {
          for (; null === c.sibling;) {
            if (null === c.return || Tf(c.return)) {
              c = null;
              break a;
            }

            c = c.return;
          }

          c.sibling.return = c.return;

          for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
            if (c.flags & 2) continue b;
            if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
          }

          if (!(c.flags & 2)) {
            c = c.stateNode;
            break a;
          }
        }

        d ? Vf(a, c, b) : Wf(a, c, b);
      }
    }

    function Vf(a, b, c) {
      var d = a.tag,
          e = 5 === d || 6 === d;
      if (e) a = e ? a.stateNode : a.stateNode.instance, b ? pb(c, a, b) : kb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Vf(a, b, c), a = a.sibling; null !== a;) {
        Vf(a, b, c), a = a.sibling;
      }
    }

    function Wf(a, b, c) {
      var d = a.tag,
          e = 5 === d || 6 === d;
      if (e) a = e ? a.stateNode : a.stateNode.instance, b ? ob(c, a, b) : jb(c, a);else if (4 !== d && (a = a.child, null !== a)) for (Wf(a, b, c), a = a.sibling; null !== a;) {
        Wf(a, b, c), a = a.sibling;
      }
    }

    function Qf(a, b) {
      for (var c = b, d = !1, e, f;;) {
        if (!d) {
          d = c.return;

          a: for (;;) {
            if (null === d) throw Error(q(160));
            e = d.stateNode;

            switch (d.tag) {
              case 5:
                f = !1;
                break a;

              case 3:
                e = e.containerInfo;
                f = !0;
                break a;

              case 4:
                e = e.containerInfo;
                f = !0;
                break a;
            }

            d = d.return;
          }

          d = !0;
        }

        if (5 === c.tag || 6 === c.tag) Rf(a, c), f ? rb(e, c.stateNode) : qb(e, c.stateNode);else if (4 === c.tag) {
          if (null !== c.child) {
            e = c.stateNode.containerInfo;
            f = !0;
            c.child.return = c;
            c = c.child;
            continue;
          }
        } else if (Pf(a, c), null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b) break;

        for (; null === c.sibling;) {
          if (null === c.return || c.return === b) return;
          c = c.return;
          4 === c.tag && (d = !1);
        }

        c.sibling.return = c.return;
        c = c.sibling;
      }
    }

    function Xf(a, b) {
      if (Ta) {
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            Kf(3, b);
            return;

          case 1:
            return;

          case 5:
            var c = b.stateNode;

            if (null != c) {
              var d = b.memoizedProps;
              a = null !== a ? a.memoizedProps : d;
              var e = b.type,
                  f = b.updateQueue;
              b.updateQueue = null;
              null !== f && nb(c, f, e, a, d, b);
            }

            return;

          case 6:
            if (null === b.stateNode) throw Error(q(162));
            c = b.memoizedProps;
            lb(b.stateNode, null !== a ? a.memoizedProps : c, c);
            return;

          case 3:
            Va && (b = b.stateNode, b.hydrate && (b.hydrate = !1, Ob(b.containerInfo)));
            return;

          case 12:
            return;

          case 13:
            Yf(b);
            Zf(b);
            return;

          case 19:
            Zf(b);
            return;

          case 17:
            return;

          case 23:
          case 24:
            Of(b, null !== b.memoizedState);
            return;
        }

        throw Error(q(163));
      }

      switch (b.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          Kf(3, b);
          return;

        case 12:
          return;

        case 13:
          Yf(b);
          Zf(b);
          return;

        case 19:
          Zf(b);
          return;

        case 3:
          Va && (c = b.stateNode, c.hydrate && (c.hydrate = !1, Ob(c.containerInfo)));
          break;

        case 23:
        case 24:
          return;
      }

      a: if (Ua) {
        switch (b.tag) {
          case 1:
          case 5:
          case 6:
          case 20:
            break a;

          case 3:
          case 4:
            b = b.stateNode;
            Cb(b.containerInfo, b.pendingChildren);
            break a;
        }

        throw Error(q(163));
      }
    }

    function Yf(a) {
      null !== a.memoizedState && ($f = G(), Ta && Of(a.child, !0));
    }

    function Zf(a) {
      var b = a.updateQueue;

      if (null !== b) {
        a.updateQueue = null;
        var c = a.stateNode;
        null === c && (c = a.stateNode = new Gf());
        b.forEach(function (b) {
          var d = ag.bind(null, a, b);
          c.has(b) || (c.add(b), b.then(d, d));
        });
      }
    }

    function bg(a, b) {
      return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : !1;
    }

    var cg = 0,
        dg = 1,
        eg = 2,
        fg = 3,
        gg = 4;

    if ("function" === typeof Symbol && Symbol.for) {
      var hg = Symbol.for;
      cg = hg("selector.component");
      dg = hg("selector.has_pseudo_class");
      eg = hg("selector.role");
      fg = hg("selector.test_id");
      gg = hg("selector.text");
    }

    function ig(a) {
      var b = Wa(a);

      if (null != b) {
        if ("string" !== typeof b.memoizedProps["data-testname"]) throw Error(q(364));
        return b;
      }

      a = cb(a);
      if (null === a) throw Error(q(362));
      return a.stateNode.current;
    }

    function jg(a, b) {
      switch (b.$$typeof) {
        case cg:
          if (a.type === b.value) return !0;
          break;

        case dg:
          a: {
            b = b.value;
            a = [a, 0];

            for (var c = 0; c < a.length;) {
              var d = a[c++],
                  e = a[c++],
                  f = b[e];

              if (5 !== d.tag || !fb(d)) {
                for (; null != f && jg(d, f);) {
                  e++, f = b[e];
                }

                if (e === b.length) {
                  b = !0;
                  break a;
                } else for (d = d.child; null !== d;) {
                  a.push(d, e), d = d.sibling;
                }
              }
            }

            b = !1;
          }

          return b;

        case eg:
          if (5 === a.tag && gb(a.stateNode, b.value)) return !0;
          break;

        case gg:
          if (5 === a.tag || 6 === a.tag) if (a = eb(a), null !== a && 0 <= a.indexOf(b.value)) return !0;
          break;

        case fg:
          if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase())) return !0;
          break;

        default:
          throw Error(q(365, b));
      }

      return !1;
    }

    function kg(a) {
      switch (a.$$typeof) {
        case cg:
          return "<" + (wa(a.value) || "Unknown") + ">";

        case dg:
          return ":has(" + (kg(a) || "") + ")";

        case eg:
          return '[role="' + a.value + '"]';

        case gg:
          return '"' + a.value + '"';

        case fg:
          return '[data-testname="' + a.value + '"]';

        default:
          throw Error(q(365, a));
      }
    }

    function lg(a, b) {
      var c = [];
      a = [a, 0];

      for (var d = 0; d < a.length;) {
        var e = a[d++],
            f = a[d++],
            g = b[f];

        if (5 !== e.tag || !fb(e)) {
          for (; null != g && jg(e, g);) {
            f++, g = b[f];
          }

          if (f === b.length) c.push(e);else for (e = e.child; null !== e;) {
            a.push(e, f), e = e.sibling;
          }
        }
      }

      return c;
    }

    function mg(a, b) {
      if (!bb) throw Error(q(363));
      a = ig(a);
      a = lg(a, b);
      b = [];
      a = Array.from(a);

      for (var c = 0; c < a.length;) {
        var d = a[c++];
        if (5 === d.tag) fb(d) || b.push(d.stateNode);else for (d = d.child; null !== d;) {
          a.push(d), d = d.sibling;
        }
      }

      return b;
    }

    var ng = null;

    function og(a) {
      if (null === ng) try {
        var b = ("require" + Math.random()).slice(0, 7);
        ng = (module && module[b]).call(module, "timers").setImmediate;
      } catch (c) {
        ng = function ng(a) {
          var b = new MessageChannel();
          b.port1.onmessage = a;
          b.port2.postMessage(void 0);
        };
      }
      return ng(a);
    }

    var pg = Math.ceil,
        qg = ca.ReactCurrentDispatcher,
        rg = ca.ReactCurrentOwner,
        sg = ca.IsSomeRendererActing,
        V = 0,
        R = null,
        W = null,
        U = 0,
        tg = 0,
        ug = Wb(0),
        T = 0,
        vg = null,
        wg = 0,
        pd = 0,
        tf = 0,
        xg = 0,
        yg = null,
        $f = 0,
        vf = Infinity;

    function zg() {
      vf = G() + 500;
    }

    var X = null,
        Cf = !1,
        Df = null,
        Ff = null,
        Ag = !1,
        Bg = null,
        Cg = 90,
        Dg = [],
        Eg = [],
        Fg = null,
        Gg = 0,
        Hg = null,
        Ig = -1,
        Jg = 0,
        Kg = 0,
        Lg = null,
        Mg = !1;

    function K() {
      return 0 !== (V & 48) ? G() : -1 !== Ig ? Ig : Ig = G();
    }

    function td(a) {
      a = a.mode;
      if (0 === (a & 2)) return 1;
      if (0 === (a & 4)) return 99 === Nc() ? 1 : 2;
      0 === Jg && (Jg = wg);

      if (0 !== Sc.transition) {
        0 !== Kg && (Kg = null !== yg ? yg.pendingLanes : 0);
        a = Jg;
        var b = 4186112 & ~Kg;
        b &= -b;
        0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
        return b;
      }

      a = Nc();
      0 !== (V & 4) && 98 === a ? a = oc(12, Jg) : (a = jc(a), a = oc(a, Jg));
      return a;
    }

    function ud(a, b, c) {
      if (50 < Gg) throw Gg = 0, Hg = null, Error(q(185));
      a = Ng(a, b);
      if (null === a) return null;
      rc(a, b, c);
      a === R && (tf |= b, 4 === T && uf(a, U));
      var d = Nc();
      1 === b ? 0 !== (V & 8) && 0 === (V & 48) ? Og(a) : (Z(a, c), 0 === V && (zg(), H())) : (0 === (V & 4) || 98 !== d && 99 !== d || (null === Fg ? Fg = new Set([a]) : Fg.add(a)), Z(a, c));
      yg = a;
    }

    function Ng(a, b) {
      a.lanes |= b;
      var c = a.alternate;
      null !== c && (c.lanes |= b);
      c = a;

      for (a = a.return; null !== a;) {
        a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
      }

      return 3 === c.tag ? c.stateNode : null;
    }

    function Z(a, b) {
      for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g;) {
        var h = 31 - mc(g),
            k = 1 << h,
            l = f[h];

        if (-1 === l) {
          if (0 === (k & d) || 0 !== (k & e)) {
            l = b;
            ic(k);
            var n = F;
            f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5E3 : -1;
          }
        } else l <= b && (a.expiredLanes |= k);

        g &= ~k;
      }

      d = lc(a, a === R ? U : 0);
      b = F;
      if (0 === d) null !== c && (c !== Hc && xc(c), a.callbackNode = null, a.callbackPriority = 0);else {
        if (null !== c) {
          if (a.callbackPriority === b) return;
          c !== Hc && xc(c);
        }

        15 === b ? (c = Og.bind(null, a), null === Jc ? (Jc = [c], Kc = wc(Cc, Rc)) : Jc.push(c), c = Hc) : 14 === b ? c = Qc(99, Og.bind(null, a)) : (c = kc(b), c = Qc(c, Pg.bind(null, a)));
        a.callbackPriority = b;
        a.callbackNode = c;
      }
    }

    function Pg(a) {
      Ig = -1;
      Kg = Jg = 0;
      if (0 !== (V & 48)) throw Error(q(327));
      var b = a.callbackNode;
      if (Qg() && a.callbackNode !== b) return null;
      var c = lc(a, a === R ? U : 0);
      if (0 === c) return null;
      var d = c;
      var e = V;
      V |= 16;
      var f = Rg();
      if (R !== a || U !== d) zg(), Sg(a, d);

      do {
        try {
          Tg();
          break;
        } catch (h) {
          Ug(a, h);
        }
      } while (1);

      bd();
      qg.current = f;
      V = e;
      null !== W ? d = 0 : (R = null, U = 0, d = T);
      if (0 !== (wg & tf)) Sg(a, 0);else if (0 !== d) {
        2 === d && (V |= 64, a.hydrate && (a.hydrate = !1, xb(a.containerInfo)), c = nc(a), 0 !== c && (d = Vg(a, c)));
        if (1 === d) throw b = vg, Sg(a, 0), uf(a, c), Z(a, G()), b;
        a.finishedWork = a.current.alternate;
        a.finishedLanes = c;

        switch (d) {
          case 0:
          case 1:
            throw Error(q(345));

          case 2:
            Zg(a);
            break;

          case 3:
            uf(a, c);

            if ((c & 62914560) === c && (d = $f + 500 - G(), 10 < d)) {
              if (0 !== lc(a, 0)) break;
              e = a.suspendedLanes;

              if ((e & c) !== c) {
                K();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }

              a.timeoutHandle = Pa(Zg.bind(null, a), d);
              break;
            }

            Zg(a);
            break;

          case 4:
            uf(a, c);
            if ((c & 4186112) === c) break;
            d = a.eventTimes;

            for (e = -1; 0 < c;) {
              var g = 31 - mc(c);
              f = 1 << g;
              g = d[g];
              g > e && (e = g);
              c &= ~f;
            }

            c = e;
            c = G() - c;
            c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3E3 > c ? 3E3 : 4320 > c ? 4320 : 1960 * pg(c / 1960)) - c;

            if (10 < c) {
              a.timeoutHandle = Pa(Zg.bind(null, a), c);
              break;
            }

            Zg(a);
            break;

          case 5:
            Zg(a);
            break;

          default:
            throw Error(q(329));
        }
      }
      Z(a, G());
      return a.callbackNode === b ? Pg.bind(null, a) : null;
    }

    function uf(a, b) {
      b &= ~xg;
      b &= ~tf;
      a.suspendedLanes |= b;
      a.pingedLanes &= ~b;

      for (a = a.expirationTimes; 0 < b;) {
        var c = 31 - mc(b),
            d = 1 << c;
        a[c] = -1;
        b &= ~d;
      }
    }

    function Og(a) {
      if (0 !== (V & 48)) throw Error(q(327));
      Qg();

      if (a === R && 0 !== (a.expiredLanes & U)) {
        var b = U;
        var c = Vg(a, b);
        0 !== (wg & tf) && (b = lc(a, b), c = Vg(a, b));
      } else b = lc(a, 0), c = Vg(a, b);

      0 !== a.tag && 2 === c && (V |= 64, a.hydrate && (a.hydrate = !1, xb(a.containerInfo)), b = nc(a), 0 !== b && (c = Vg(a, b)));
      if (1 === c) throw c = vg, Sg(a, 0), uf(a, b), Z(a, G()), c;
      a.finishedWork = a.current.alternate;
      a.finishedLanes = b;
      Zg(a);
      Z(a, G());
      return null;
    }

    function $g() {
      if (null !== Fg) {
        var a = Fg;
        Fg = null;
        a.forEach(function (a) {
          a.expiredLanes |= 24 & a.pendingLanes;
          Z(a, G());
        });
      }

      H();
    }

    function ah(a, b) {
      var c = V;
      V |= 1;

      try {
        return a(b);
      } finally {
        V = c, 0 === V && (zg(), H());
      }
    }

    function bh(a, b) {
      var c = V;
      if (0 !== (c & 48)) return a(b);
      V |= 1;

      try {
        if (a) return Pc(99, a.bind(null, b));
      } finally {
        V = c, H();
      }
    }

    function Xe(a, b) {
      A(ug, tg);
      tg |= b;
      wg |= b;
    }

    function wf() {
      tg = ug.current;
      z(ug);
    }

    function Sg(a, b) {
      a.finishedWork = null;
      a.finishedLanes = 0;
      var c = a.timeoutHandle;
      c !== Ra && (a.timeoutHandle = Ra, Qa(c));
      if (null !== W) for (c = W.return; null !== c;) {
        var d = c;

        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes;
            null !== d && void 0 !== d && $b();
            break;

          case 3:
            Qd();
            z(D);
            z(B);
            ee();
            break;

          case 5:
            Sd(d);
            break;

          case 4:
            Qd();
            break;

          case 13:
            z(M);
            break;

          case 19:
            z(M);
            break;

          case 10:
            dd(d);
            break;

          case 23:
          case 24:
            wf();
        }

        c = c.return;
      }
      R = a;
      W = Ed(a.current, null);
      U = tg = wg = b;
      T = 0;
      vg = null;
      xg = tf = pd = 0;
    }

    function Ug(a, b) {
      do {
        var c = W;

        try {
          bd();
          fe.current = pe;

          if (ie) {
            for (var d = N.memoizedState; null !== d;) {
              var e = d.queue;
              null !== e && (e.pending = null);
              d = d.next;
            }

            ie = !1;
          }

          he = 0;
          P = O = N = null;
          je = !1;
          rg.current = null;

          if (null === c || null === c.return) {
            T = 1;
            vg = b;
            W = null;
            break;
          }

          a: {
            var f = a,
                g = c.return,
                h = c,
                k = b;
            b = U;
            h.flags |= 2048;
            h.firstEffect = h.lastEffect = null;

            if (null !== k && "object" === typeof k && "function" === typeof k.then) {
              var l = k;

              if (0 === (h.mode & 2)) {
                var n = h.alternate;
                n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
              }

              var t = 0 !== (M.current & 1),
                  p = g;

              do {
                var y;

                if (y = 13 === p.tag) {
                  var x = p.memoizedState;
                  if (null !== x) y = null !== x.dehydrated ? !0 : !1;else {
                    var Y = p.memoizedProps;
                    y = void 0 === Y.fallback ? !1 : !0 !== Y.unstable_avoidThisFallback ? !0 : t ? !1 : !0;
                  }
                }

                if (y) {
                  var u = p.updateQueue;

                  if (null === u) {
                    var v = new Set();
                    v.add(l);
                    p.updateQueue = v;
                  } else u.add(l);

                  if (0 === (p.mode & 2)) {
                    p.flags |= 64;
                    h.flags |= 16384;
                    h.flags &= -2981;
                    if (1 === h.tag) if (null === h.alternate) h.tag = 17;else {
                      var C = kd(-1, 1);
                      C.tag = 2;
                      md(h, C);
                    }
                    h.lanes |= 1;
                    break a;
                  }

                  k = void 0;
                  h = b;
                  var Oa = f.pingCache;
                  null === Oa ? (Oa = f.pingCache = new Af(), k = new Set(), Oa.set(l, k)) : (k = Oa.get(l), void 0 === k && (k = new Set(), Oa.set(l, k)));

                  if (!k.has(h)) {
                    k.add(h);
                    var Qe = ch.bind(null, f, l, h);
                    l.then(Qe, Qe);
                  }

                  p.flags |= 4096;
                  p.lanes = b;
                  break a;
                }

                p = p.return;
              } while (null !== p);

              k = Error((wa(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
            }

            5 !== T && (T = 2);
            k = yf(k, h);
            p = g;

            do {
              switch (p.tag) {
                case 3:
                  f = k;
                  p.flags |= 4096;
                  b &= -b;
                  p.lanes |= b;
                  var Wg = Bf(p, f, b);
                  nd(p, Wg);
                  break a;

                case 1:
                  f = k;
                  var Xg = p.type,
                      ld = p.stateNode;

                  if (0 === (p.flags & 64) && ("function" === typeof Xg.getDerivedStateFromError || null !== ld && "function" === typeof ld.componentDidCatch && (null === Ff || !Ff.has(ld)))) {
                    p.flags |= 4096;
                    b &= -b;
                    p.lanes |= b;
                    var Yg = Ef(p, f, b);
                    nd(p, Yg);
                    break a;
                  }

              }

              p = p.return;
            } while (null !== p);
          }

          dh(c);
        } catch (w) {
          b = w;
          W === c && null !== c && (W = c = c.return);
          continue;
        }

        break;
      } while (1);
    }

    function Rg() {
      var a = qg.current;
      qg.current = pe;
      return null === a ? pe : a;
    }

    function Vg(a, b) {
      var c = V;
      V |= 16;
      var d = Rg();
      R === a && U === b || Sg(a, b);

      do {
        try {
          eh();
          break;
        } catch (e) {
          Ug(a, e);
        }
      } while (1);

      bd();
      V = c;
      qg.current = d;
      if (null !== W) throw Error(q(261));
      R = null;
      U = 0;
      return T;
    }

    function eh() {
      for (; null !== W;) {
        fh(W);
      }
    }

    function Tg() {
      for (; null !== W && !yc();) {
        fh(W);
      }
    }

    function fh(a) {
      var b = gh(a.alternate, a, tg);
      a.memoizedProps = a.pendingProps;
      null === b ? dh(a) : W = b;
      rg.current = null;
    }

    function dh(a) {
      var b = a;

      do {
        var c = b.alternate;
        a = b.return;

        if (0 === (b.flags & 2048)) {
          c = sf(c, b, tg);

          if (null !== c) {
            W = c;
            return;
          }

          c = b;

          if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (tg & 1073741824) || 0 === (c.mode & 4)) {
            for (var d = 0, e = c.child; null !== e;) {
              d |= e.lanes | e.childLanes, e = e.sibling;
            }

            c.childLanes = d;
          }

          null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
        } else {
          c = xf(b);

          if (null !== c) {
            c.flags &= 2047;
            W = c;
            return;
          }

          null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
        }

        b = b.sibling;

        if (null !== b) {
          W = b;
          return;
        }

        W = b = a;
      } while (null !== b);

      0 === T && (T = 5);
    }

    function Zg(a) {
      var b = Nc();
      Pc(99, hh.bind(null, a, b));
      return null;
    }

    function hh(a, b) {
      do {
        Qg();
      } while (null !== Bg);

      if (0 !== (V & 48)) throw Error(q(327));
      var c = a.finishedWork;
      if (null === c) return null;
      a.finishedWork = null;
      a.finishedLanes = 0;
      if (c === a.current) throw Error(q(177));
      a.callbackNode = null;
      var d = c.lanes | c.childLanes,
          e = d,
          f = a.pendingLanes & ~e;
      a.pendingLanes = e;
      a.suspendedLanes = 0;
      a.pingedLanes = 0;
      a.expiredLanes &= e;
      a.mutableReadLanes &= e;
      a.entangledLanes &= e;
      e = a.entanglements;

      for (var g = a.eventTimes, h = a.expirationTimes; 0 < f;) {
        var k = 31 - mc(f),
            l = 1 << k;
        e[k] = 0;
        g[k] = -1;
        h[k] = -1;
        f &= ~l;
      }

      null !== Fg && 0 === (d & 24) && Fg.has(a) && Fg.delete(a);
      a === R && (W = R = null, U = 0);
      1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;

      if (null !== d) {
        e = V;
        V |= 32;
        rg.current = null;
        Lg = Ga(a.containerInfo);
        Mg = !1;
        X = d;

        do {
          try {
            ih();
          } catch (v) {
            if (null === X) throw Error(q(330));
            If(X, v);
            X = X.nextEffect;
          }
        } while (null !== X);

        Lg = null;
        X = d;

        do {
          try {
            for (g = a; null !== X;) {
              var n = X.flags;
              n & 16 && Ta && sb(X.stateNode);

              if (n & 128) {
                var t = X.alternate;

                if (null !== t) {
                  var p = t.ref;
                  null !== p && ("function" === typeof p ? p(null) : p.current = null);
                }
              }

              switch (n & 1038) {
                case 2:
                  Uf(X);
                  X.flags &= -3;
                  break;

                case 6:
                  Uf(X);
                  X.flags &= -3;
                  Xf(X.alternate, X);
                  break;

                case 1024:
                  X.flags &= -1025;
                  break;

                case 1028:
                  X.flags &= -1025;
                  Xf(X.alternate, X);
                  break;

                case 4:
                  Xf(X.alternate, X);
                  break;

                case 8:
                  h = g;
                  f = X;
                  Ta ? Qf(h, f) : Rf(h, f);
                  var y = f.alternate;
                  Sf(f);
                  null !== y && Sf(y);
              }

              X = X.nextEffect;
            }
          } catch (v) {
            if (null === X) throw Error(q(330));
            If(X, v);
            X = X.nextEffect;
          }
        } while (null !== X);

        Mg && $a();
        Ha(a.containerInfo);
        a.current = c;
        X = d;

        do {
          try {
            for (n = a; null !== X;) {
              var x = X.flags;
              x & 36 && Lf(n, X.alternate, X);

              if (x & 128) {
                t = void 0;
                var Y = X.ref;

                if (null !== Y) {
                  var u = X.stateNode;

                  switch (X.tag) {
                    case 5:
                      t = Da(u);
                      break;

                    default:
                      t = u;
                  }

                  "function" === typeof Y ? Y(t) : Y.current = t;
                }
              }

              X = X.nextEffect;
            }
          } catch (v) {
            if (null === X) throw Error(q(330));
            If(X, v);
            X = X.nextEffect;
          }
        } while (null !== X);

        X = null;
        Ic();
        V = e;
      } else a.current = c;

      if (Ag) Ag = !1, Bg = a, Cg = b;else for (X = d; null !== X;) {
        b = X.nextEffect, X.nextEffect = null, X.flags & 8 && (x = X, x.sibling = null, x.stateNode = null), X = b;
      }
      d = a.pendingLanes;
      0 === d && (Ff = null);
      1 === d ? a === Hg ? Gg++ : (Gg = 0, Hg = a) : Gg = 0;
      c = c.stateNode;
      if (fc && "function" === typeof fc.onCommitFiberRoot) try {
        fc.onCommitFiberRoot(ec, c, void 0, 64 === (c.current.flags & 64));
      } catch (v) {}
      Z(a, G());
      if (Cf) throw Cf = !1, a = Df, Df = null, a;
      if (0 !== (V & 8)) return null;
      H();
      return null;
    }

    function ih() {
      for (; null !== X;) {
        var a = X.alternate;
        Mg || null === Lg || (0 !== (X.flags & 8) ? Ca(X, Lg) && (Mg = !0, Za()) : 13 === X.tag && bg(a, X) && Ca(X, Lg) && (Mg = !0, Za()));
        var b = X.flags;
        0 !== (b & 256) && Jf(a, X);
        0 === (b & 512) || Ag || (Ag = !0, Qc(97, function () {
          Qg();
          return null;
        }));
        X = X.nextEffect;
      }
    }

    function Qg() {
      if (90 !== Cg) {
        var a = 97 < Cg ? 97 : Cg;
        Cg = 90;
        return Pc(a, jh);
      }

      return !1;
    }

    function Nf(a, b) {
      Dg.push(b, a);
      Ag || (Ag = !0, Qc(97, function () {
        Qg();
        return null;
      }));
    }

    function Mf(a, b) {
      Eg.push(b, a);
      Ag || (Ag = !0, Qc(97, function () {
        Qg();
        return null;
      }));
    }

    function jh() {
      if (null === Bg) return !1;
      var a = Bg;
      Bg = null;
      if (0 !== (V & 48)) throw Error(q(331));
      var b = V;
      V |= 32;
      var c = Eg;
      Eg = [];

      for (var d = 0; d < c.length; d += 2) {
        var e = c[d],
            f = c[d + 1],
            g = e.destroy;
        e.destroy = void 0;
        if ("function" === typeof g) try {
          g();
        } catch (k) {
          if (null === f) throw Error(q(330));
          If(f, k);
        }
      }

      c = Dg;
      Dg = [];

      for (d = 0; d < c.length; d += 2) {
        e = c[d];
        f = c[d + 1];

        try {
          var h = e.create;
          e.destroy = h();
        } catch (k) {
          if (null === f) throw Error(q(330));
          If(f, k);
        }
      }

      for (h = a.current.firstEffect; null !== h;) {
        a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;
      }

      V = b;
      H();
      return !0;
    }

    function kh(a, b, c) {
      b = yf(c, b);
      b = Bf(a, b, 1);
      md(a, b);
      b = K();
      a = Ng(a, 1);
      null !== a && (rc(a, 1, b), Z(a, b));
    }

    function If(a, b) {
      if (3 === a.tag) kh(a, a, b);else for (var c = a.return; null !== c;) {
        if (3 === c.tag) {
          kh(c, a, b);
          break;
        } else if (1 === c.tag) {
          var d = c.stateNode;

          if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ff || !Ff.has(d))) {
            a = yf(b, a);
            var e = Ef(c, a, 1);
            md(c, e);
            e = K();
            c = Ng(c, 1);
            if (null !== c) rc(c, 1, e), Z(c, e);else if ("function" === typeof d.componentDidCatch && (null === Ff || !Ff.has(d))) try {
              d.componentDidCatch(b, a);
            } catch (f) {}
            break;
          }
        }

        c = c.return;
      }
    }

    function ch(a, b, c) {
      var d = a.pingCache;
      null !== d && d.delete(b);
      b = K();
      a.pingedLanes |= a.suspendedLanes & c;
      R === a && (U & c) === c && (4 === T || 3 === T && (U & 62914560) === U && 500 > G() - $f ? Sg(a, 0) : xg |= c);
      Z(a, b);
    }

    function ag(a, b) {
      var c = a.stateNode;
      null !== c && c.delete(b);
      b = 0;
      0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === Nc() ? 1 : 2 : (0 === Jg && (Jg = wg), b = pc(62914560 & ~Jg), 0 === b && (b = 4194304)));
      c = K();
      a = Ng(a, b);
      null !== a && (rc(a, b, c), Z(a, c));
    }

    var gh;

    gh = function gh(a, b, c) {
      var d = b.lanes;
      if (null !== a) {
        if (a.memoizedProps !== b.pendingProps || D.current) gd = !0;else if (0 !== (c & d)) gd = 0 !== (a.flags & 16384) ? !0 : !1;else {
          gd = !1;

          switch (b.tag) {
            case 3:
              af(b);
              ce();
              break;

            case 5:
              Rd(b);
              break;

            case 1:
              E(b.type) && cc(b);
              break;

            case 4:
              Pd(b, b.stateNode.containerInfo);
              break;

            case 10:
              cd(b, b.memoizedProps.value);
              break;

            case 13:
              if (null !== b.memoizedState) {
                if (0 !== (c & b.child.childLanes)) return cf(a, b, c);
                A(M, M.current & 1);
                b = Re(a, b, c);
                return null !== b ? b.sibling : null;
              }

              A(M, M.current & 1);
              break;

            case 19:
              d = 0 !== (c & b.childLanes);

              if (0 !== (a.flags & 64)) {
                if (d) return kf(a, b, c);
                b.flags |= 64;
              }

              var e = b.memoizedState;
              null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
              A(M, M.current);
              if (d) break;else return null;

            case 23:
            case 24:
              return b.lanes = 0, We(a, b, c);
          }

          return Re(a, b, c);
        }
      } else gd = !1;
      b.lanes = 0;

      switch (b.tag) {
        case 2:
          d = b.type;
          null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
          a = b.pendingProps;
          e = Zb(b, B.current);
          fd(b, c);
          e = le(null, b, d, a, e, c);
          b.flags |= 1;

          if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
            b.tag = 1;
            b.memoizedState = null;
            b.updateQueue = null;

            if (E(d)) {
              var f = !0;
              cc(b);
            } else f = !1;

            b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
            id(b);
            var g = d.getDerivedStateFromProps;
            "function" === typeof g && sd(b, d, g, a);
            e.updater = vd;
            b.stateNode = e;
            e._reactInternals = b;
            zd(b, d, a, c);
            b = $e(null, b, d, !0, f, c);
          } else b.tag = 0, S(null, b, e, c), b = b.child;

          return b;

        case 16:
          e = b.elementType;

          a: {
            null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
            a = b.pendingProps;
            f = e._init;
            e = f(e._payload);
            b.type = e;
            f = b.tag = lh(e);
            a = Xc(e, a);

            switch (f) {
              case 0:
                b = Ve(null, b, e, a, c);
                break a;

              case 1:
                b = Ze(null, b, e, a, c);
                break a;

              case 11:
                b = Pe(null, b, e, a, c);
                break a;

              case 14:
                b = Se(null, b, e, Xc(e.type, a), d, c);
                break a;
            }

            throw Error(q(306, e, ""));
          }

          return b;

        case 0:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), Ve(a, b, d, e, c);

        case 1:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), Ze(a, b, d, e, c);

        case 3:
          af(b);
          d = b.updateQueue;
          if (null === a || null === d) throw Error(q(282));
          d = b.pendingProps;
          e = b.memoizedState;
          e = null !== e ? e.element : null;
          jd(a, b);
          od(b, d, null, c);
          d = b.memoizedState.element;
          if (d === e) ce(), b = Re(a, b, c);else {
            e = b.stateNode;
            if (f = e.hydrate) Va ? (Vd = Kb(b.stateNode.containerInfo), Ud = b, f = Wd = !0) : f = !1;

            if (f) {
              if (Va && (a = e.mutableSourceEagerHydrationData, null != a)) for (e = 0; e < a.length; e += 2) {
                f = a[e], g = a[e + 1], Sa ? f._workInProgressVersionPrimary = g : f._workInProgressVersionSecondary = g, de.push(f);
              }
              c = Kd(b, null, d, c);

              for (b.child = c; c;) {
                c.flags = c.flags & -3 | 1024, c = c.sibling;
              }
            } else S(a, b, d, c), ce();

            b = b.child;
          }
          return b;

        case 5:
          return Rd(b), null === a && $d(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ma(d, e) ? g = null : null !== f && Ma(d, f) && (b.flags |= 16), Ye(a, b), S(a, b, g, c), b.child;

        case 6:
          return null === a && $d(b), null;

        case 13:
          return cf(a, b, c);

        case 4:
          return Pd(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Jd(b, null, d, c) : S(a, b, d, c), b.child;

        case 11:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), Pe(a, b, d, e, c);

        case 7:
          return S(a, b, b.pendingProps, c), b.child;

        case 8:
          return S(a, b, b.pendingProps.children, c), b.child;

        case 12:
          return S(a, b, b.pendingProps.children, c), b.child;

        case 10:
          a: {
            d = b.type._context;
            e = b.pendingProps;
            g = b.memoizedProps;
            f = e.value;
            cd(b, f);

            if (null !== g) {
              var h = g.value;
              f = I(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0;

              if (0 === f) {
                if (g.children === e.children && !D.current) {
                  b = Re(a, b, c);
                  break a;
                }
              } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
                var k = h.dependencies;

                if (null !== k) {
                  g = h.child;

                  for (var l = k.firstContext; null !== l;) {
                    if (l.context === d && 0 !== (l.observedBits & f)) {
                      1 === h.tag && (l = kd(-1, c & -c), l.tag = 2, md(h, l));
                      h.lanes |= c;
                      l = h.alternate;
                      null !== l && (l.lanes |= c);
                      ed(h.return, c);
                      k.lanes |= c;
                      break;
                    }

                    l = l.next;
                  }
                } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

                if (null !== g) g.return = h;else for (g = h; null !== g;) {
                  if (g === b) {
                    g = null;
                    break;
                  }

                  h = g.sibling;

                  if (null !== h) {
                    h.return = g.return;
                    g = h;
                    break;
                  }

                  g = g.return;
                }
                h = g;
              }
            }

            S(a, b, e.children, c);
            b = b.child;
          }

          return b;

        case 9:
          return e = b.type, f = b.pendingProps, d = f.children, fd(b, c), e = J(e, f.unstable_observedBits), d = d(e), b.flags |= 1, S(a, b, d, c), b.child;

        case 14:
          return e = b.type, f = Xc(e, b.pendingProps), f = Xc(e.type, f), Se(a, b, e, f, d, c);

        case 15:
          return Ue(a, b, b.type, b.pendingProps, d, c);

        case 17:
          return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Xc(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, E(d) ? (a = !0, cc(b)) : a = !1, fd(b, c), xd(b, d, e), zd(b, d, e, c), $e(null, b, d, !0, a, c);

        case 19:
          return kf(a, b, c);

        case 23:
          return We(a, b, c);

        case 24:
          return We(a, b, c);
      }

      throw Error(q(156, b.tag));
    };

    var mh = {
      current: !1
    },
        nh = m.unstable_flushAllWithoutAsserting,
        oh = "function" === typeof nh;

    function ph() {
      if (void 0 !== nh) return nh();

      for (var a = !1; Qg();) {
        a = !0;
      }

      return a;
    }

    function qh(a) {
      try {
        ph(), og(function () {
          ph() ? qh(a) : a();
        });
      } catch (b) {
        a(b);
      }
    }

    var rh = 0,
        sh = !1;

    function th(a, b, c, d) {
      this.tag = a;
      this.key = c;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d;
      this.flags = 0;
      this.lastEffect = this.firstEffect = this.nextEffect = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }

    function Yd(a, b, c, d) {
      return new th(a, b, c, d);
    }

    function Te(a) {
      a = a.prototype;
      return !(!a || !a.isReactComponent);
    }

    function lh(a) {
      if ("function" === typeof a) return Te(a) ? 1 : 0;

      if (void 0 !== a && null !== a) {
        a = a.$$typeof;
        if (a === la) return 11;
        if (a === oa) return 14;
      }

      return 2;
    }

    function Ed(a, b) {
      var c = a.alternate;
      null === c ? (c = Yd(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
      c.childLanes = a.childLanes;
      c.lanes = a.lanes;
      c.child = a.child;
      c.memoizedProps = a.memoizedProps;
      c.memoizedState = a.memoizedState;
      c.updateQueue = a.updateQueue;
      b = a.dependencies;
      c.dependencies = null === b ? null : {
        lanes: b.lanes,
        firstContext: b.firstContext
      };
      c.sibling = a.sibling;
      c.index = a.index;
      c.ref = a.ref;
      return c;
    }

    function Gd(a, b, c, d, e, f) {
      var g = 2;
      d = a;
      if ("function" === typeof a) Te(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
        case fa:
          return Id(c.children, e, f, b);

        case ra:
          g = 8;
          e |= 16;
          break;

        case ha:
          g = 8;
          e |= 1;
          break;

        case ia:
          return a = Yd(12, c, b, e | 8), a.elementType = ia, a.type = ia, a.lanes = f, a;

        case ma:
          return a = Yd(13, c, b, e), a.type = ma, a.elementType = ma, a.lanes = f, a;

        case na:
          return a = Yd(19, c, b, e), a.elementType = na, a.lanes = f, a;

        case sa:
          return ef(c, e, f, b);

        case ta:
          return a = Yd(24, c, b, e), a.elementType = ta, a.lanes = f, a;

        default:
          if ("object" === typeof a && null !== a) switch (a.$$typeof) {
            case ja:
              g = 10;
              break a;

            case ka:
              g = 9;
              break a;

            case la:
              g = 11;
              break a;

            case oa:
              g = 14;
              break a;

            case pa:
              g = 16;
              d = null;
              break a;

            case qa:
              g = 22;
              break a;
          }
          throw Error(q(130, null == a ? a : typeof a, ""));
      }
      b = Yd(g, c, b, e);
      b.elementType = a;
      b.type = d;
      b.lanes = f;
      return b;
    }

    function Id(a, b, c, d) {
      a = Yd(7, a, d, b);
      a.lanes = c;
      return a;
    }

    function ef(a, b, c, d) {
      a = Yd(23, a, d, b);
      a.elementType = sa;
      a.lanes = c;
      return a;
    }

    function Fd(a, b, c) {
      a = Yd(6, a, null, b);
      a.lanes = c;
      return a;
    }

    function Hd(a, b, c) {
      b = Yd(4, null !== a.children ? a.children : [], a.key, b);
      b.lanes = c;
      b.stateNode = {
        containerInfo: a.containerInfo,
        pendingChildren: null,
        implementation: a.implementation
      };
      return b;
    }

    function uh(a, b, c) {
      this.tag = b;
      this.containerInfo = a;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = Ra;
      this.pendingContext = this.context = null;
      this.hydrate = c;
      this.callbackNode = null;
      this.callbackPriority = 0;
      this.eventTimes = qc(0);
      this.expirationTimes = qc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = qc(0);
      Va && (this.mutableSourceEagerHydrationData = null);
    }

    function vh(a) {
      var b = a._reactInternals;

      if (void 0 === b) {
        if ("function" === typeof a.render) throw Error(q(188));
        throw Error(q(268, Object.keys(a)));
      }

      a = Aa(b);
      return null === a ? null : a.stateNode;
    }

    function wh(a, b) {
      a = a.memoizedState;

      if (null !== a && null !== a.dehydrated) {
        var c = a.retryLane;
        a.retryLane = 0 !== c && c < b ? c : b;
      }
    }

    function xh(a, b) {
      wh(a, b);
      (a = a.alternate) && wh(a, b);
    }

    function yh(a) {
      a = Aa(a);
      return null === a ? null : a.stateNode;
    }

    function zh() {
      return null;
    }

    exports.IsThisRendererActing = mh;

    exports.act = function (a) {
      function b() {
        rh--;
        sg.current = c;
        mh.current = d;
      }

      !1 === sh && (sh = !0, console.error("act(...) is not supported in production builds of React, and might not behave as expected."));
      rh++;
      var c = sg.current,
          d = mh.current;
      sg.current = !0;
      mh.current = !0;

      try {
        var e = ah(a);
      } catch (f) {
        throw b(), f;
      }

      if (null !== e && "object" === typeof e && "function" === typeof e.then) return {
        then: function then(a, d) {
          e.then(function () {
            1 < rh || !0 === oh && !0 === c ? (b(), a()) : qh(function (c) {
              b();
              c ? d(c) : a();
            });
          }, function (a) {
            b();
            d(a);
          });
        }
      };

      try {
        1 !== rh || !1 !== oh && !1 !== c || ph(), b();
      } catch (f) {
        throw b(), f;
      }

      return {
        then: function then(a) {
          a();
        }
      };
    };

    exports.attemptContinuousHydration = function (a) {
      if (13 === a.tag) {
        var b = K();
        ud(a, 67108864, b);
        xh(a, 67108864);
      }
    };

    exports.attemptHydrationAtCurrentPriority = function (a) {
      if (13 === a.tag) {
        var b = K(),
            c = td(a);
        ud(a, c, b);
        xh(a, c);
      }
    };

    exports.attemptSynchronousHydration = function (a) {
      switch (a.tag) {
        case 3:
          var b = a.stateNode;

          if (b.hydrate) {
            var c = ic(b.pendingLanes);
            b.expiredLanes |= c & b.pendingLanes;
            Z(b, G());
            0 === (V & 48) && (zg(), H());
          }

          break;

        case 13:
          var d = K();
          bh(function () {
            return ud(a, 1, d);
          });
          xh(a, 4);
      }
    };

    exports.attemptUserBlockingHydration = function (a) {
      if (13 === a.tag) {
        var b = K();
        ud(a, 4, b);
        xh(a, 4);
      }
    };

    exports.batchedEventUpdates = function (a, b) {
      var c = V;
      V |= 2;

      try {
        return a(b);
      } finally {
        V = c, 0 === V && (zg(), H());
      }
    };

    exports.batchedUpdates = ah;

    exports.createComponentSelector = function (a) {
      return {
        $$typeof: cg,
        value: a
      };
    };

    exports.createContainer = function (a, b, c) {
      a = new uh(a, b, c);
      b = Yd(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
      a.current = b;
      b.stateNode = a;
      id(b);
      return a;
    };

    exports.createHasPsuedoClassSelector = function (a) {
      return {
        $$typeof: dg,
        value: a
      };
    };

    exports.createPortal = function (a, b, c) {
      var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: ea,
        key: null == d ? null : "" + d,
        children: a,
        containerInfo: b,
        implementation: c
      };
    };

    exports.createRoleSelector = function (a) {
      return {
        $$typeof: eg,
        value: a
      };
    };

    exports.createTestNameSelector = function (a) {
      return {
        $$typeof: fg,
        value: a
      };
    };

    exports.createTextSelector = function (a) {
      return {
        $$typeof: gg,
        value: a
      };
    };

    exports.deferredUpdates = function (a) {
      return Pc(97, a);
    };

    exports.discreteUpdates = function (a, b, c, d, e) {
      var f = V;
      V |= 4;

      try {
        return Pc(98, a.bind(null, b, c, d, e));
      } finally {
        V = f, 0 === V && (zg(), H());
      }
    };

    exports.findAllNodes = mg;

    exports.findBoundingRects = function (a, b) {
      if (!bb) throw Error(q(363));
      b = mg(a, b);
      a = [];

      for (var c = 0; c < b.length; c++) {
        a.push(db(b[c]));
      }

      for (b = a.length - 1; 0 < b; b--) {
        c = a[b];

        for (var d = c.x, e = d + c.width, f = c.y, g = f + c.height, h = b - 1; 0 <= h; h--) {
          if (b !== h) {
            var k = a[h],
                l = k.x,
                n = l + k.width,
                t = k.y,
                p = t + k.height;

            if (d >= l && f >= t && e <= n && g <= p) {
              a.splice(b, 1);
              break;
            } else if (!(d !== l || c.width !== k.width || p < f || t > g)) {
              t > f && (k.height += t - f, k.y = f);
              p < g && (k.height = g - t);
              a.splice(b, 1);
              break;
            } else if (!(f !== t || c.height !== k.height || n < d || l > e)) {
              l > d && (k.width += l - d, k.x = d);
              n < e && (k.width = e - l);
              a.splice(b, 1);
              break;
            }
          }
        }
      }

      return a;
    };

    exports.findHostInstance = vh;

    exports.findHostInstanceWithNoPortals = function (a) {
      a = Ba(a);
      return null === a ? null : 20 === a.tag ? a.stateNode.instance : a.stateNode;
    };

    exports.findHostInstanceWithWarning = function (a) {
      return vh(a);
    };

    exports.flushControlled = function (a) {
      var b = V;
      V |= 1;

      try {
        Pc(99, a);
      } finally {
        V = b, 0 === V && (zg(), H());
      }
    };

    exports.flushDiscreteUpdates = function () {
      0 === (V & 49) && ($g(), Qg());
    };

    exports.flushPassiveEffects = Qg;
    exports.flushSync = bh;

    exports.focusWithin = function (a, b) {
      if (!bb) throw Error(q(363));
      a = ig(a);
      b = lg(a, b);
      b = Array.from(b);

      for (a = 0; a < b.length;) {
        var c = b[a++];

        if (!fb(c)) {
          if (5 === c.tag && hb(c.stateNode)) return !0;

          for (c = c.child; null !== c;) {
            b.push(c), c = c.sibling;
          }
        }
      }

      return !1;
    };

    exports.getCurrentUpdateLanePriority = function () {
      return hc;
    };

    exports.getFindAllNodesFailureDescription = function (a, b) {
      if (!bb) throw Error(q(363));
      var c = 0,
          d = [];
      a = [ig(a), 0];

      for (var e = 0; e < a.length;) {
        var f = a[e++],
            g = a[e++],
            h = b[g];
        if (5 !== f.tag || !fb(f)) if (jg(f, h) && (d.push(kg(h)), g++, g > c && (c = g)), g < b.length) for (f = f.child; null !== f;) {
          a.push(f, g), f = f.sibling;
        }
      }

      if (c < b.length) {
        for (a = []; c < b.length; c++) {
          a.push(kg(b[c]));
        }

        return "findAllNodes was able to match part of the selector:\n  " + (d.join(" > ") + "\n\nNo matching component was found for:\n  ") + a.join(" > ");
      }

      return null;
    };

    exports.getPublicRootInstance = function (a) {
      a = a.current;
      if (!a.child) return null;

      switch (a.child.tag) {
        case 5:
          return Da(a.child.stateNode);

        default:
          return a.child.stateNode;
      }
    };

    exports.injectIntoDevTools = function (a) {
      a = {
        bundleType: a.bundleType,
        version: a.version,
        rendererPackageName: a.rendererPackageName,
        rendererConfig: a.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: ca.ReactCurrentDispatcher,
        findHostInstanceByFiber: yh,
        findFiberByHostInstance: a.findFiberByHostInstance || zh,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null
      };
      if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) a = !1;else {
        var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!b.isDisabled && b.supportsFiber) try {
          ec = b.inject(a), fc = b;
        } catch (c) {}
        a = !0;
      }
      return a;
    };

    exports.observeVisibleRects = function (a, b, c, d) {
      if (!bb) throw Error(q(363));
      a = mg(a, b);
      var e = ib(a, c, d).disconnect;
      return {
        disconnect: function disconnect() {
          e();
        }
      };
    };

    exports.registerMutableSourceForHydration = function (a, b) {
      var c = b._getVersion;
      c = c(b._source);
      null == a.mutableSourceEagerHydrationData ? a.mutableSourceEagerHydrationData = [b, c] : a.mutableSourceEagerHydrationData.push(b, c);
    };

    exports.runWithPriority = function (a, b) {
      var c = hc;

      try {
        return hc = a, b();
      } finally {
        hc = c;
      }
    };

    exports.shouldSuspend = function () {
      return !1;
    };

    exports.unbatchedUpdates = function (a, b) {
      var c = V;
      V &= -2;
      V |= 8;

      try {
        return a(b);
      } finally {
        V = c, 0 === V && (zg(), H());
      }
    };

    exports.updateContainer = function (a, b, c, d) {
      var e = b.current,
          f = K(),
          g = td(e);

      a: if (c) {
        c = c._reactInternals;

        b: {
          if (xa(c) !== c || 1 !== c.tag) throw Error(q(170));
          var h = c;

          do {
            switch (h.tag) {
              case 3:
                h = h.stateNode.context;
                break b;

              case 1:
                if (E(h.type)) {
                  h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                  break b;
                }

            }

            h = h.return;
          } while (null !== h);

          throw Error(q(171));
        }

        if (1 === c.tag) {
          var k = c.type;

          if (E(k)) {
            c = bc(c, k, h);
            break a;
          }
        }

        c = h;
      } else c = Xb;

      null === b.context ? b.context = c : b.pendingContext = c;
      b = kd(f, g);
      b.payload = {
        element: a
      };
      d = void 0 === d ? null : d;
      null !== d && (b.callback = d);
      md(e, b);
      ud(e, g, f);
      return g;
    };

    return exports;
  };
})(reactReconciler_production_min);

{
  reactReconciler.exports = reactReconciler_production_min.exports;
}
var ReactReconciler = reactReconciler.exports;
var randomKey = Math.random().toString(36).slice(2);
var internalInstanceKey = '__reactFiber$' + randomKey;
var internalPropsKey = '__reactProps$' + randomKey;

function appendChild(parent, child) {
  parent._appendChild(child);
}

function appendChildToContainer(container, child) {
  container._appendChild(child);
}

function appendInitialChild(parent, child) {
  parent._appendChild(child);
}

function commitMount() {}

function commitTextUpdate() {}

function commitUpdate(instance, updatePayload) {
  Object.keys(updatePayload).forEach(function (attr) {
    if (attr === 'children') {
      instance.text = updatePayload[attr].join('');
    }

    instance.setAttribute(attr, updatePayload[attr]);
  });
}

function createContainerChildSet() {}

function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  var element = _hummer_tenon_core__WEBPACK_IMPORTED_MODULE_1__.document.createElement(type);
  Object.keys(props).forEach(function (attr) {
    switch (attr) {
      case 'children':
        if (type === 'text') {
          if (typeof props.children === 'string') {
            element.text = props.children;
          } else if (typeof props.children === 'object') {
            element.text = props.children.join('');
          }
        }

        break;

      case 'style':
        element.setStyle(props[attr]);
        break;

      default:
        element.setAttribute(attr, props[attr]);
        break;
    }
  });
  element[internalInstanceKey] = internalInstanceHandle;
  element[internalPropsKey] = props;
  return element;
}

function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
  var element = _hummer_tenon_core__WEBPACK_IMPORTED_MODULE_1__.document.createElement('text');
  element.meta = {
    skipDom: true
  };
  element.text = text;
  element[internalInstanceKey] = internalInstanceHandle;
  return element;
}

function finalizeContainerChildren() {}

function finalizeInitialChildren() {
  return true;
}

function getPublicInstance(instance) {
  return instance;
}

function insertBefore(parent, child, beforeChild) {
  parent._insertBefore(child, beforeChild);
}

function prepareForCommit() {}

function prepareUpdate(instance, type, oldProps, newProps) {
  var updatePayload = {};
  Object.keys(newProps).forEach(function (key) {
    var oldPropValue = oldProps[key];
    var newPropValue = newProps[key];

    switch (key) {
      case 'children':
        {
          if (oldPropValue !== newPropValue) {
            updatePayload[key] = newPropValue;
          }

          break;
        }

      default:
        {
          if (typeof oldPropValue === 'function' && typeof newPropValue === 'function') ;else if (oldPropValue !== newPropValue) {
            updatePayload[key] = newPropValue;
          }
        }
    }
  });

  if (!Object.keys(updatePayload).length) {
    return null;
  }

  return updatePayload;
}

function replaceContainerChildren() {}

function removeChild(parent, child) {
  parent._removeChild(child);
}

function removeChildFromContainer(parent, child) {
  parent._removeChild(child);
}

function resetAfterCommit() {}

function resetTextContent() {}

function getRootHostContext() {
  return {};
}

function getChildHostContext() {
  return {};
}

function shouldDeprioritizeSubtree() {
  return true;
}

function shouldSetTextContent(type, nextProps) {
  if (['text'].indexOf(type) !== -1) {
    var children = nextProps.children;
    return typeof children === 'string' || typeof children === 'number';
  }

  return false;
}

function clearContainer(container) {}

var HostConfig = {
  appendChild,
  appendChildToContainer,
  appendInitialChild,
  commitMount,
  commitTextUpdate,
  commitUpdate,
  createContainerChildSet,
  createInstance,
  createTextInstance,
  finalizeContainerChildren,
  finalizeInitialChildren,
  getPublicInstance,
  insertBefore,
  prepareForCommit,
  prepareUpdate,
  replaceContainerChildren,
  removeChild,
  removeChildFromContainer,
  resetAfterCommit,
  resetTextContent,
  getRootHostContext,
  getChildHostContext,
  shouldDeprioritizeSubtree,
  shouldSetTextContent,
  clearContainer
};
var TenonRenderInst = ReactReconciler(Object.assign(Object.assign({}, HostConfig), {
  clearTimeout,
  setTimeout,
  isPrimaryRenderer: true,
  noTimeout: -1,
  supportsMutation: true,
  supportsHydration: false,
  supportsPersistence: false,
  now: Date.now,
  scheduleDeferredCallback: function scheduleDeferredCallback() {},
  cancelDeferredCallback: function cancelDeferredCallback() {}
}));

function getPublicRootInstance(container) {
  var containerFiber = container.current;

  if (!containerFiber.child) {
    return null;
  }

  return containerFiber.child.stateNode;
}

function render(rootElement, container) {
  if (!container._rootContainer) {
    container._rootContainer = TenonRenderInst.createContainer(container, 0, false, null);
  }

  TenonRenderInst.updateContainer(rootElement, container._rootContainer, null, function () {});
  return getPublicRootInstance(container._rootContainer);
}



/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/object-assign/index.js":
/*!****************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/object-assign/index.js ***!
  \****************************************************************************/
/***/ ((module) => {

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
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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

/***/ "../../tenon/packages/tenon-react/node_modules/react/cjs/react.development.js":
/*!************************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/react/cjs/react.development.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    var _assign = __webpack_require__(/*! object-assign */ "../../tenon/packages/tenon-react/node_modules/object-assign/index.js"); // TODO: this is special because it gets imported during build.


    var ReactVersion = '17.0.2'; // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var REACT_ELEMENT_TYPE = 0xeac7;
    var REACT_PORTAL_TYPE = 0xeaca;
    exports.Fragment = 0xeacb;
    exports.StrictMode = 0xeacc;
    exports.Profiler = 0xead2;
    var REACT_PROVIDER_TYPE = 0xeacd;
    var REACT_CONTEXT_TYPE = 0xeace;
    var REACT_FORWARD_REF_TYPE = 0xead0;
    exports.Suspense = 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = 0xead8;
    var REACT_MEMO_TYPE = 0xead3;
    var REACT_LAZY_TYPE = 0xead4;
    var REACT_BLOCK_TYPE = 0xead9;
    var REACT_SERVER_BLOCK_TYPE = 0xeada;
    var REACT_FUNDAMENTAL_TYPE = 0xead5;
    var REACT_SCOPE_TYPE = 0xead7;
    var REACT_OPAQUE_ID_TYPE = 0xeae0;
    var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
    var REACT_OFFSCREEN_TYPE = 0xeae2;
    var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

    if (typeof Symbol === 'function' && Symbol.for) {
      var symbolFor = Symbol.for;
      REACT_ELEMENT_TYPE = symbolFor('react.element');
      REACT_PORTAL_TYPE = symbolFor('react.portal');
      exports.Fragment = symbolFor('react.fragment');
      exports.StrictMode = symbolFor('react.strict_mode');
      exports.Profiler = symbolFor('react.profiler');
      REACT_PROVIDER_TYPE = symbolFor('react.provider');
      REACT_CONTEXT_TYPE = symbolFor('react.context');
      REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
      exports.Suspense = symbolFor('react.suspense');
      REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
      REACT_MEMO_TYPE = symbolFor('react.memo');
      REACT_LAZY_TYPE = symbolFor('react.lazy');
      REACT_BLOCK_TYPE = symbolFor('react.block');
      REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
      REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
      REACT_SCOPE_TYPE = symbolFor('react.scope');
      REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
      REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
      REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
      REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
    }

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * Keeps track of the current dispatcher.
     */


    var ReactCurrentDispatcher = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    /**
     * Keeps track of the current batch's configuration such as how long an update
     * should suspend for if it needs to.
     */

    var ReactCurrentBatchConfig = {
      transition: 0
    };
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
    var ReactDebugCurrentFrame = {};
    var currentExtraStackFrame = null;

    function setExtraStackFrame(stack) {
      {
        currentExtraStackFrame = stack;
      }
    }

    {
      ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
        {
          currentExtraStackFrame = stack;
        }
      }; // Stack implementation injected by the current renderer.


      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var stack = ''; // Add an extra top frame while an element is being validated

        if (currentExtraStackFrame) {
          stack += currentExtraStackFrame;
        } // Delegate to the injected renderer-specific implementation


        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          stack += impl() || '';
        }

        return stack;
      };
    }
    /**
     * Used by act() to track whether you're inside an act() scope.
     */

    var IsSomeRendererActing = {
      current: false
    };
    var ReactSharedInternals = {
      ReactCurrentDispatcher: ReactCurrentDispatcher,
      ReactCurrentBatchConfig: ReactCurrentBatchConfig,
      ReactCurrentOwner: ReactCurrentOwner,
      IsSomeRendererActing: IsSomeRendererActing,
      // Used by renderers to avoid bundling object-assign twice in UMD bundles:
      assign: _assign
    };
    {
      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
    } // by calls to these methods by a Babel plugin.
    //
    // In PROD (or in packages without access to React internals),
    // they are left as they are instead.

    function warn(format) {
      {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        printWarning('warn', format, args);
      }
    }

    function error(format) {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        }

        var argsWithFormat = args.map(function (item) {
          return '' + item;
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);
      }
    }

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + "." + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
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
      isMounted: function isMounted(publicInstance) {
        return false;
      },

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
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
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
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    var emptyObject = {};
    {
      Object.freeze(emptyObject);
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
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

    Component.prototype.setState = function (partialState, callback) {
      if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
        {
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        }
      }

      this.updater.enqueueSetState(this, partialState, callback, 'setState');
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


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    /**
     * Convenience component with default shallow equality check for sCU.
     */

    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context; // If a component has string refs, we will assign a different object later.

      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || '';
      return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
    }

    function getContextName(type) {
      return type.displayName || 'Context';
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case exports.Fragment:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case exports.Profiler:
          return 'Profiler';

        case exports.StrictMode:
          return 'StrictMode';

        case exports.Suspense:
          return 'Suspense';

        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            var context = type;
            return getContextName(context) + '.Consumer';

          case REACT_PROVIDER_TYPE:
            var provider = type;
            return getContextName(provider._context) + '.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            return getComponentName(type.type);

          case REACT_BLOCK_TYPE:
            return getComponentName(type._render);

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                return getComponentName(init(payload));
              } catch (x) {
                return null;
              }
            }
        }
      }

      return null;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }

    function hasValidRef(config) {
      {
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
      {
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
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    function warnIfStringRefCannotBeAutoConverted(config) {
      {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, instanceof check
     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} props
     * @param {*} key
     * @param {string|object} ref
     * @param {*} owner
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @internal
     */


    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
          {
            warnIfStringRefCannotBeAutoConverted(config);
          }
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      if (!!(element === null || element === undefined)) {
        {
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        }
      }

      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


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
      } // Children can be more than one argument, and those are transferred onto
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
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */


    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
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
      var escapedString = key.replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return text.replace(userProvidedKeyEscapeRegex, '$&/');
    }
    /**
     * Generate a key string that identifies a element within a set.
     *
     * @param {*} element A element that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getElementKey(element, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof element === 'object' && element !== null && element.key != null) {
        // Explicit key
        return escape('' + element.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        var _child = children;
        var mappedChild = callback(_child); // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows:

        var childKey = nameSoFar === '' ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;

        if (Array.isArray(mappedChild)) {
          var escapedChildKey = '';

          if (childKey != null) {
            escapedChildKey = escapeUserProvidedKey(childKey) + '/';
          }

          mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
            return c;
          });
        } else if (mappedChild != null) {
          if (isValidElement(mappedChild)) {
            mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            escapedPrefix + ( // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            mappedChild.key && (!_child || _child.key !== mappedChild.key) ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
          }

          array.push(mappedChild);
        }

        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getElementKey(child, i);
          subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          var iterableChildren = children;
          {
            // Warn about using Maps as children
            if (iteratorFn === iterableChildren.entries) {
              if (!didWarnAboutMaps) {
                warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
              }

              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(iterableChildren);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getElementKey(child, ii++);
            subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          }
        } else if (type === 'object') {
          var childrenString = '' + children;
          {
            {
              throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
        }
      }

      return subtreeCount;
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenmap
     *
     * The provided mapFunction(child, index) will be called for each
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
      var count = 0;
      mapIntoArray(children, result, '', '', function (child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrencount
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children) {
      var n = 0;
      mapChildren(children, function () {
        n++; // Don't return anything
      });
      return n;
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      mapChildren(children, function () {
        forEachFunc.apply(this, arguments); // Don't return anything.
      }, forEachContext);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
     */


    function toArray(children) {
      return mapChildren(children, function (child) {
        return child;
      }) || [];
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#reactchildrenonly
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
      if (!isValidElement(children)) {
        {
          throw Error("React.Children.only expected to receive a single React element child.");
        }
      }

      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
            error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
          }
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        // Used to track how many concurrent renderers this context currently
        // supports within in a single renderer. Such as parallel server rendering.
        _threadCount: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };
      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      var hasWarnedAboutUsingNestedContextConsumers = false;
      var hasWarnedAboutUsingConsumerProvider = false;
      var hasWarnedAboutDisplayNameOnConsumer = false;
      {
        // A separate object, but proxies back to the original context object for
        // backwards compatibility. It has a different $$typeof, so we can properly
        // warn for the incorrect usage of Context as a Consumer.
        var Consumer = {
          $$typeof: REACT_CONTEXT_TYPE,
          _context: context,
          _calculateChangedBits: context._calculateChangedBits
        }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

        Object.defineProperties(Consumer, {
          Provider: {
            get: function get() {
              if (!hasWarnedAboutUsingConsumerProvider) {
                hasWarnedAboutUsingConsumerProvider = true;
                error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
              }

              return context.Provider;
            },
            set: function set(_Provider) {
              context.Provider = _Provider;
            }
          },
          _currentValue: {
            get: function get() {
              return context._currentValue;
            },
            set: function set(_currentValue) {
              context._currentValue = _currentValue;
            }
          },
          _currentValue2: {
            get: function get() {
              return context._currentValue2;
            },
            set: function set(_currentValue2) {
              context._currentValue2 = _currentValue2;
            }
          },
          _threadCount: {
            get: function get() {
              return context._threadCount;
            },
            set: function set(_threadCount) {
              context._threadCount = _threadCount;
            }
          },
          Consumer: {
            get: function get() {
              if (!hasWarnedAboutUsingNestedContextConsumers) {
                hasWarnedAboutUsingNestedContextConsumers = true;
                error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
              }

              return context.Consumer;
            }
          },
          displayName: {
            get: function get() {
              return context.displayName;
            },
            set: function set(displayName) {
              if (!hasWarnedAboutDisplayNameOnConsumer) {
                warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);
                hasWarnedAboutDisplayNameOnConsumer = true;
              }
            }
          }
        }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

        context.Consumer = Consumer;
      }
      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }
      return context;
    }

    var Uninitialized = -1;
    var Pending = 0;
    var Resolved = 1;
    var Rejected = 2;

    function lazyInitializer(payload) {
      if (payload._status === Uninitialized) {
        var ctor = payload._result;
        var thenable = ctor(); // Transition to the next state.

        var pending = payload;
        pending._status = Pending;
        pending._result = thenable;
        thenable.then(function (moduleObject) {
          if (payload._status === Pending) {
            var defaultExport = moduleObject.default;
            {
              if (defaultExport === undefined) {
                error('lazy: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + // Break up imports to avoid accidentally parsing them as dependencies.
                'const MyComponent = lazy(() => imp' + "ort('./MyComponent'))", moduleObject);
              }
            } // Transition to the next state.

            var resolved = payload;
            resolved._status = Resolved;
            resolved._result = defaultExport;
          }
        }, function (error) {
          if (payload._status === Pending) {
            // Transition to the next state.
            var rejected = payload;
            rejected._status = Rejected;
            rejected._result = error;
          }
        });
      }

      if (payload._status === Resolved) {
        return payload._result;
      } else {
        throw payload._result;
      }
    }

    function lazy(ctor) {
      var payload = {
        // We use these fields to store the result.
        _status: -1,
        _result: ctor
      };
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: payload,
        _init: lazyInitializer
      };
      {
        // In production, this would just set it on the object.
        var defaultProps;
        var propTypes; // $FlowFixMe

        Object.defineProperties(lazyType, {
          defaultProps: {
            configurable: true,
            get: function get() {
              return defaultProps;
            },
            set: function set(newDefaultProps) {
              error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              defaultProps = newDefaultProps; // Match production behavior more closely:
              // $FlowFixMe

              Object.defineProperty(lazyType, 'defaultProps', {
                enumerable: true
              });
            }
          },
          propTypes: {
            configurable: true,
            get: function get() {
              return propTypes;
            },
            set: function set(newPropTypes) {
              error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
              propTypes = newPropTypes; // Match production behavior more closely:
              // $FlowFixMe

              Object.defineProperty(lazyType, 'propTypes', {
                enumerable: true
              });
            }
          }
        });
      }
      return lazyType;
    }

    function forwardRef(render) {
      {
        if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
          error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
        } else if (typeof render !== 'function') {
          error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
        } else {
          if (render.length !== 0 && render.length !== 2) {
            error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
          }
        }

        if (render != null) {
          if (render.defaultProps != null || render.propTypes != null) {
            error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
          }
        }
      }
      var elementType = {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
      {
        var ownName;
        Object.defineProperty(elementType, 'displayName', {
          enumerable: false,
          configurable: true,
          get: function get() {
            return ownName;
          },
          set: function set(name) {
            ownName = name;

            if (render.displayName == null) {
              render.displayName = name;
            }
          }
        });
      }
      return elementType;
    } // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.


    var enableScopeAPI = false; // Experimental Create Event Handle API.

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
        return true;
      }

      if (typeof type === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
          return true;
        }
      }

      return false;
    }

    function memo(type, compare) {
      {
        if (!isValidElementType(type)) {
          error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
        }
      }
      var elementType = {
        $$typeof: REACT_MEMO_TYPE,
        type: type,
        compare: compare === undefined ? null : compare
      };
      {
        var ownName;
        Object.defineProperty(elementType, 'displayName', {
          enumerable: false,
          configurable: true,
          get: function get() {
            return ownName;
          },
          set: function set(name) {
            ownName = name;

            if (type.displayName == null) {
              type.displayName = name;
            }
          }
        });
      }
      return elementType;
    }

    function resolveDispatcher() {
      var dispatcher = ReactCurrentDispatcher.current;

      if (!(dispatcher !== null)) {
        {
          throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
        }
      }

      return dispatcher;
    }

    function useContext(Context, unstable_observedBits) {
      var dispatcher = resolveDispatcher();
      {
        if (unstable_observedBits !== undefined) {
          error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
        } // TODO: add a more generic warning for invalid values.


        if (Context._context !== undefined) {
          var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
          // and nobody should be using this in existing code.

          if (realContext.Consumer === Context) {
            error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
          } else if (realContext.Provider === Context) {
            error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
          }
        }
      }
      return dispatcher.useContext(Context, unstable_observedBits);
    }

    function useState(initialState) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useState(initialState);
    }

    function useReducer(reducer, initialArg, init) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useReducer(reducer, initialArg, init);
    }

    function useRef(initialValue) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useRef(initialValue);
    }

    function useEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useEffect(create, deps);
    }

    function useLayoutEffect(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useLayoutEffect(create, deps);
    }

    function useCallback(callback, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useCallback(callback, deps);
    }

    function useMemo(create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useMemo(create, deps);
    }

    function useImperativeHandle(ref, create, deps) {
      var dispatcher = resolveDispatcher();
      return dispatcher.useImperativeHandle(ref, create, deps);
    }

    function useDebugValue(value, formatterFn) {
      {
        var dispatcher = resolveDispatcher();
        return dispatcher.useDebugValue(value, formatterFn);
      }
    } // Helpers to patch console.logs to avoid logging during side-effect free
    // replaying on render function. This currently only patches the object
    // lazily which won't cover if the log function was extracted eagerly.
    // We could also eagerly patch the method.


    var disabledDepth = 0;
    var prevLog;
    var prevInfo;
    var prevWarn;
    var prevError;
    var prevGroup;
    var prevGroupCollapsed;
    var prevGroupEnd;

    function disabledLog() {}

    disabledLog.__reactDisabledLog = true;

    function disableLogs() {
      {
        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          prevLog = console.log;
          prevInfo = console.info;
          prevWarn = console.warn;
          prevError = console.error;
          prevGroup = console.group;
          prevGroupCollapsed = console.groupCollapsed;
          prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

          var props = {
            configurable: true,
            enumerable: true,
            value: disabledLog,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            info: props,
            log: props,
            warn: props,
            error: props,
            group: props,
            groupCollapsed: props,
            groupEnd: props
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        disabledDepth++;
      }
    }

    function reenableLogs() {
      {
        disabledDepth--;

        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          var props = {
            configurable: true,
            enumerable: true,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            log: _assign({}, props, {
              value: prevLog
            }),
            info: _assign({}, props, {
              value: prevInfo
            }),
            warn: _assign({}, props, {
              value: prevWarn
            }),
            error: _assign({}, props, {
              value: prevError
            }),
            group: _assign({}, props, {
              value: prevGroup
            }),
            groupCollapsed: _assign({}, props, {
              value: prevGroupCollapsed
            }),
            groupEnd: _assign({}, props, {
              value: prevGroupEnd
            })
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        if (disabledDepth < 0) {
          error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
        }
      }
    }

    var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
    var prefix;

    function describeBuiltInComponentFrame(name, source, ownerFn) {
      {
        if (prefix === undefined) {
          // Extract the VM specific prefix used by each line.
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || '';
          }
        } // We use the prefix to ensure our stacks line up with native stack frames.


        return '\n' + prefix + name;
      }
    }

    var reentry = false;
    var componentFrameCache;
    {
      var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
      componentFrameCache = new PossiblyWeakMap();
    }

    function describeNativeComponentFrame(fn, construct) {
      // If something asked for a stack inside a fake render, it should get ignored.
      if (!fn || reentry) {
        return '';
      }

      {
        var frame = componentFrameCache.get(fn);

        if (frame !== undefined) {
          return frame;
        }
      }
      var control;
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

      Error.prepareStackTrace = undefined;
      var previousDispatcher;
      {
        previousDispatcher = ReactCurrentDispatcher$1.current; // Set the dispatcher in DEV because this might be call in the render function
        // for warnings.

        ReactCurrentDispatcher$1.current = null;
        disableLogs();
      }

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function Fake() {
            throw Error();
          }; // $FlowFixMe


          Object.defineProperty(Fake.prototype, 'props', {
            set: function set() {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if (typeof Reflect === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            }

            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          }

          fn();
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          // This extracts the first frame from the sample that isn't also in the control.
          // Skipping one frame that we assume is the frame that calls the two.
          var sampleLines = sample.stack.split('\n');
          var controlLines = control.stack.split('\n');
          var s = sampleLines.length - 1;
          var c = controlLines.length - 1;

          while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
            // We expect at least one stack frame to be shared.
            // Typically this will be the root most one. However, stack frames may be
            // cut off due to maximum stack limits. In this case, one maybe cut off
            // earlier than the other. We assume that the sample is longer or the same
            // and there for cut off earlier. So we should find the root most frame in
            // the sample somewhere in the control.
            c--;
          }

          for (; s >= 1 && c >= 0; s--, c--) {
            // Next we find the first one that isn't the same which should be the
            // frame that called our sample function and the control.
            if (sampleLines[s] !== controlLines[c]) {
              // In V8, the first line is describing the message but other VMs don't.
              // If we're about to return the first line, and the control is also on the same
              // line, that's a pretty good indicator that our sample threw at same line as
              // the control. I.e. before we entered the sample frame. So we ignore this result.
              // This can happen if you passed a class to function component, or non-function.
              if (s !== 1 || c !== 1) {
                do {
                  s--;
                  c--; // We may still have similar intermediate frames from the construct call.
                  // The next one that isn't the same should be our match though.

                  if (c < 0 || sampleLines[s] !== controlLines[c]) {
                    // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                    var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                    {
                      if (typeof fn === 'function') {
                        componentFrameCache.set(fn, _frame);
                      }
                    } // Return the line we found.

                    return _frame;
                  }
                } while (s >= 1 && c >= 0);
              }

              break;
            }
          }
        }
      } finally {
        reentry = false;
        {
          ReactCurrentDispatcher$1.current = previousDispatcher;
          reenableLogs();
        }
        Error.prepareStackTrace = previousPrepareStackTrace;
      } // Fallback to just using the name if we couldn't make it throw.


      var name = fn ? fn.displayName || fn.name : '';
      var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
      {
        if (typeof fn === 'function') {
          componentFrameCache.set(fn, syntheticFrame);
        }
      }
      return syntheticFrame;
    }

    function describeFunctionComponentFrame(fn, source, ownerFn) {
      {
        return describeNativeComponentFrame(fn, false);
      }
    }

    function shouldConstruct(Component) {
      var prototype = Component.prototype;
      return !!(prototype && prototype.isReactComponent);
    }

    function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
      if (type == null) {
        return '';
      }

      if (typeof type === 'function') {
        {
          return describeNativeComponentFrame(type, shouldConstruct(type));
        }
      }

      if (typeof type === 'string') {
        return describeBuiltInComponentFrame(type);
      }

      switch (type) {
        case exports.Suspense:
          return describeBuiltInComponentFrame('Suspense');

        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame('SuspenseList');
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeFunctionComponentFrame(type.render);

          case REACT_MEMO_TYPE:
            // Memo may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

          case REACT_BLOCK_TYPE:
            return describeFunctionComponentFrame(type._render);

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                // Lazy may contain any component type so we recursively resolve it.
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {}
            }
        }
      }

      return '';
    }

    var loggedTypeFailures = {};
    var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
        }
      }
    }

    function checkPropTypes(typeSpecs, values, location, componentName, element) {
      {
        // $FlowFixMe This is okay but Flow doesn't know it.
        var has = Function.call.bind(Object.prototype.hasOwnProperty);

        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.

            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                err.name = 'Invariant Violation';
                throw err;
              }

              error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
            } catch (ex) {
              error$1 = ex;
            }

            if (error$1 && !(error$1 instanceof Error)) {
              setCurrentlyValidatingElement(element);
              error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
              setCurrentlyValidatingElement(null);
            }

            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error$1.message] = true;
              setCurrentlyValidatingElement(element);
              error('Failed %s type: %s', location, error$1.message);
              setCurrentlyValidatingElement(null);
            }
          }
        }
      }
    }

    function setCurrentlyValidatingElement$1(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          setExtraStackFrame(stack);
        } else {
          setExtraStackFrame(null);
        }
      }
    }

    var propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(source) {
      if (source !== undefined) {
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }

    function getSourceInfoErrorAddendumForProps(elementProps) {
      if (elementProps !== null && elementProps !== undefined) {
        return getSourceInfoErrorAddendum(elementProps.__source);
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
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
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
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
      }

      {
        setCurrentlyValidatingElement$1(element);
        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
        setCurrentlyValidatingElement$1(null);
      }
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

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
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
      {
        var type = element.type;

        if (type === null || type === undefined || typeof type === 'string') {
          return;
        }

        var propTypes;

        if (typeof type === 'function') {
          propTypes = type.propTypes;
        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }

        if (propTypes) {
          // Intentionally inside to avoid triggering lazy initializers:
          var name = getComponentName(type);
          checkPropTypes(propTypes, element.props, 'prop', name, element);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

          var _name = getComponentName(type);

          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
        }

        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      {
        var keys = Object.keys(fragment.props);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (key !== 'children' && key !== 'key') {
            setCurrentlyValidatingElement$1(fragment);
            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
            setCurrentlyValidatingElement$1(null);
            break;
          }
        }

        if (fragment.ref !== null) {
          setCurrentlyValidatingElement$1(fragment);
          error('Invalid attribute `ref` supplied to `React.Fragment`.');
          setCurrentlyValidatingElement$1(null);
        }
      }
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendumForProps(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        {
          error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
        }
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === exports.Fragment) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    var didWarnAboutDeprecatedCreateFactory = false;

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      {
        if (!didWarnAboutDeprecatedCreateFactory) {
          didWarnAboutDeprecatedCreateFactory = true;
          warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
        } // Legacy hook: remove it


        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    {
      try {
        var frozenObject = Object.freeze({});
        /* eslint-disable no-new */

        new Map([[frozenObject, null]]);
        new Set([frozenObject]);
        /* eslint-enable no-new */
      } catch (e) {}
    }
    var createElement$1 = createElementWithValidation;
    var cloneElement$1 = cloneElementWithValidation;
    var createFactory = createFactoryWithValidation;
    var Children = {
      map: mapChildren,
      forEach: forEachChildren,
      count: countChildren,
      toArray: toArray,
      only: onlyChild
    };
    exports.Children = Children;
    exports.Component = Component;
    exports.PureComponent = PureComponent;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
    exports.cloneElement = cloneElement$1;
    exports.createContext = createContext;
    exports.createElement = createElement$1;
    exports.createFactory = createFactory;
    exports.createRef = createRef;
    exports.forwardRef = forwardRef;
    exports.isValidElement = isValidElement;
    exports.lazy = lazy;
    exports.memo = memo;
    exports.useCallback = useCallback;
    exports.useContext = useContext;
    exports.useDebugValue = useDebugValue;
    exports.useEffect = useEffect;
    exports.useImperativeHandle = useImperativeHandle;
    exports.useLayoutEffect = useLayoutEffect;
    exports.useMemo = useMemo;
    exports.useReducer = useReducer;
    exports.useRef = useRef;
    exports.useState = useState;
    exports.version = ReactVersion;
  })();
}

/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/react/index.js":
/*!********************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/react/index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "../../tenon/packages/tenon-react/node_modules/react/cjs/react.development.js");
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!***********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(arr);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!******************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!***********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createForOfIteratorHelper)
/* harmony export */ });
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createSuper.js":
/*!********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createSuper.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createSuper)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");
/* harmony import */ var _possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./possibleConstructorReturn.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");



function _createSuper(Derived) {
  var hasNativeReflectConstruct = (0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__.default)();
  return function _createSuperInternal() {
    var Super = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0,_possibleConstructorReturn_js__WEBPACK_IMPORTED_MODULE_2__.default)(this, result);
  };
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!***********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*****************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

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
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__.default)(subClass, superClass);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
/*!*********************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!**********************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__.default)(call) === "object" || typeof call === "function")) {
    return call;
  }

  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__.default)(self);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!***********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!**********************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__.default)(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__.default)(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__.default)(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__.default)();
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__.default)(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__.default)(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__.default)(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__.default)();
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!***********************************************************************************************************************!*\
  !*** ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__.default)(o, minLen);
}

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/main/entry.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/main/App.jsx");
/* harmony import */ var _hummer_tenon_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @hummer/tenon-react */ "../../tenon/packages/tenon-react/dist/tenon-react.es.js");


 // import "./App.css"

_hummer_tenon_react__WEBPACK_IMPORTED_MODULE_2__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_App__WEBPACK_IMPORTED_MODULE_1__.default, null));
})();

/******/ })()
;
//# sourceMappingURL=http://172.23.165.128:8000/main.js.map