/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/App.less":
/*!***************************!*\
  !*** ./src/main/App.less ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hummer_tenon_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @hummer/tenon-react */ "../../tenon/packages/tenon-react/dist/tenon-react.cjs.js");
/* harmony import */ var _hummer_tenon_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hummer_tenon_react__WEBPACK_IMPORTED_MODULE_0__);

    
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function(){
      
    var ruleSetMap = {"global":{"tagList":[],"classList":[{"selector":"demo-header","matchType":0,"relation":"","style":{"paddingTop":"20.00hm","paddingRight":"0","paddingBottom":"20.00hm","paddingLeft":"0","backgroundColor":"#fa9153"}},{"selector":"demo-title","matchType":0,"relation":"","style":{"fontSize":"36.00hm","width":"100%","textAlign":"center","color":"#ffffff"}},{"selector":"list-container","matchType":0,"relation":"","style":{"paddingTop":"0","paddingRight":"20.00hm","paddingBottom":"0","paddingLeft":"20.00hm","marginTop":"20.00hm"}},{"selector":"list-box","matchType":0,"relation":"","style":{"paddingTop":"20.00hm","paddingRight":"20.00hm","paddingBottom":"20.00hm","paddingLeft":"20.00hm","backgroundColor":"#ffffff","marginTop":"20.00hm"}},{"selector":"list-box-title","matchType":0,"relation":"","style":{"fontSize":"32.00hm","textAlign":"center","marginBottom":"20.00hm"}},{"selector":"list-item","matchType":0,"relation":"","style":{"borderBottomWidth":"1px","borderBottomStyle":"solid","borderBottomColor":"#eeeeff","borderTopWidth":"1px","borderTopStyle":"solid","borderTopColor":"#eeeeff"}},{"selector":"item","matchType":0,"relation":"","style":{"borderBottomWidth":"1px","borderBottomStyle":"solid","borderBottomColor":"#eeeeee","borderTopWidth":"1px","borderTopStyle":"solid","borderTopColor":"#eeeeee","width":"100%","display":"flex","flexDirection":"row","justifyContent":"space-between","alignItems":"center","backgroundColor":"#ffffff","height":"100.00hm"}},{"selector":"item-title","matchType":0,"relation":"","style":{"flexGrow":1,"flexShrink":1,"flexBasis":"auto","color":"#0000ff","textAlign":"center"}},{"selector":"item-icon","matchType":0,"relation":"","style":{"width":"36.00hm","height":"36.00hm","resize":"cover","marginRight":"20.00hm"}}],"idList":[],"attrList":[]}};
    var options = {"scoped":false,"id":"data-v-undefined","packageName":"@hummer/tenon-react"};
  
      return (0,_hummer_tenon_react__WEBPACK_IMPORTED_MODULE_0__.collectStyle)(ruleSetMap, options);
    })());
  

/***/ }),

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
/* harmony import */ var _assets_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/menu */ "./src/main/assets/menu.js");
/* harmony import */ var _components_ListItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ListItem */ "./src/main/components/ListItem.jsx");




function App() {
  var ListBoxs = _assets_menu__WEBPACK_IMPORTED_MODULE_1__.menus.map(function (menu, menuIndex) {
    var title = menu.title,
        items = menu.items;
    var listItems = items.map(function (item, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ListItem__WEBPACK_IMPORTED_MODULE_2__.default, {
        url: item.url,
        name: item.name,
        key: index
      });
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("view", {
      class: "list-box",
      key: menuIndex
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("text", {
      class: "list-box-title"
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("view", {
      class: "list-box-container"
    }, listItems));
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("view", {
    class: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("view", {
    class: "demo-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("text", {
    class: "demo-title"
  }, "Demo App")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("view", {
    class: "list-container"
  }, ListBoxs));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/main/assets/menu.js":
/*!*********************************!*\
  !*** ./src/main/assets/menu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GrammarMenu": () => (/* binding */ GrammarMenu),
/* harmony export */   "ComponentMenu": () => (/* binding */ ComponentMenu),
/* harmony export */   "HighComponent": () => (/* binding */ HighComponent),
/* harmony export */   "Animation": () => (/* binding */ Animation),
/* harmony export */   "Plugin": () => (/* binding */ Plugin),
/* harmony export */   "Style": () => (/* binding */ Style),
/* harmony export */   "Other": () => (/* binding */ Other),
/* harmony export */   "menus": () => (/* binding */ menus)
/* harmony export */ });
var GrammarMenu = {
  title: '语法篇',
  items: [{
    url: './grammar-style.js',
    name: 'Grammar Style'
  }, {
    url: './directive-v-show.js',
    name: 'Directive v-show'
  }, {
    url: './directive-v-if.js',
    name: 'Directive v-if'
  }]
};
var ComponentMenu = {
  title: '组件篇',
  items: [{
    url: './component-view.js',
    name: 'Base Component View'
  }, {
    url: './component-text.js',
    name: 'Base Component Text'
  }, {
    url: './component-image.js',
    name: 'Base Component Image'
  }, {
    url: './component-button.js',
    name: 'Base Component Button'
  }, {
    url: './component-input.js',
    name: 'Base Component Input'
  }, {
    url: './component-textarea.js',
    name: 'Base Component Textarea'
  }, {
    url: './component-switch.js',
    name: 'Base Component Switch'
  }, {
    url: './component-scroller.js',
    name: 'Base Component Scroller'
  }]
};
var HighComponent = {
  title: '高阶组件篇',
  items: [{
    url: './ex-component-list.js',
    name: 'Component List'
  }, {
    url: './ex-component-viewpager.js',
    name: 'Component Viewpager'
  }, {
    url: './ex-component-popup.js',
    name: 'Component Popup'
  }, {
    url: './ex-component-test.js',
    name: 'Component Test'
  }]
};
var Animation = {
  title: '动画篇',
  items: [{
    url: './animation-basic.js',
    name: 'Animation Basic'
  }, {
    url: './animation-keyframe.js',
    name: 'Animation Keyframe'
  }, {
    url: './animation-transition.js',
    name: 'Animation Transition'
  }]
};
var Plugin = {
  title: '插件篇',
  items: [{
    url: './plugin-error.js',
    name: '错误捕获'
  }, {
    url: './store-demo.js',
    name: '页面状态管理'
  }, {
    url: './store-muti-main.js',
    name: '多页面级状态管理'
  }]
};
var Style = {
  title: '样式篇',
  items: [{
    url: './style-basic.js',
    name: '基础样式'
  }, {
    url: './style-layout.js',
    name: '布局样式'
  }]
};
var Other = {
  title: '其它',
  items: [{
    url: './lifecycle.js',
    name: 'Lifecycle'
  }]
};
var menus = [GrammarMenu, ComponentMenu, HighComponent, Style, Animation, Plugin, Other];

/***/ }),

/***/ "./src/main/components/ListItem.jsx":
/*!******************************************!*\
  !*** ./src/main/components/ListItem.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var iconRight = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAASBJREFUWAntljsOwjAMhglcoHNmzsVQ0WwMSAyIAwADF2iKOvRczMy9QbClWkKoqurEEUjYQ+02D3/501hZLNRUAVVAFfiuAoabvq7rvTHmEELonHMniAN3jqn+y6nGsbYBxkLbsWmaO4CxFzU2L31jA6EyNBjiUhqKvTpUZIAoCQxUa6uq2kpsHxsIIXJCRQHlhIoGygWVBJQDKhlIGop97BHg0/B0DaespTYsCd77M73P9SJAmAyhiqJw4B+UHOINxXO9GBCWgr7vPfg1JYe4o3iu/7l/KBkIlZGs3ElA0jC4rdFAOWCigXLBRAHlhEGgFT44Zq29QP8djYFaI3b1wDnZdei92EnDRAHBlt0A5AmDr1KXMgRRUwVUgb9V4AWYNdeAJyzFDAAAAABJRU5ErkJggg==';

function ListItem(props) {
  var name = props.name,
      url = props.url;

  var handleJump = function handleJump() {
    var pageInfo = {
      url: "".concat(url),
      animated: true
    };
    Navigator.openPage(pageInfo, function (result) {
      console.log('Page result: ' + JSON.stringify(result));
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("view", {
    class: "item",
    onTap: handleJump
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("text", {
    class: "item-title"
  }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("image", {
    class: "item-icon",
    src: iconRight
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListItem);

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
/* harmony export */   "ELEMNT_TAG_MAP": () => (/* binding */ ELEMNT_TAG_MAP),
/* harmony export */   "Image": () => (/* binding */ Image),
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "MatchType": () => (/* binding */ MatchType),
/* harmony export */   "NODE_ANCHOR": () => (/* binding */ NODE_ANCHOR),
/* harmony export */   "NODE_ANIMATION_VIEW": () => (/* binding */ NODE_ANIMATION_VIEW),
/* harmony export */   "NODE_BUTTON": () => (/* binding */ NODE_BUTTON),
/* harmony export */   "NODE_COMMENT": () => (/* binding */ NODE_COMMENT),
/* harmony export */   "NODE_DIALOG": () => (/* binding */ NODE_DIALOG),
/* harmony export */   "NODE_IMAGE": () => (/* binding */ NODE_IMAGE),
/* harmony export */   "NODE_INPUT": () => (/* binding */ NODE_INPUT),
/* harmony export */   "NODE_LIST": () => (/* binding */ NODE_LIST),
/* harmony export */   "NODE_LOADMORE": () => (/* binding */ NODE_LOADMORE),
/* harmony export */   "NODE_REFRESH": () => (/* binding */ NODE_REFRESH),
/* harmony export */   "NODE_SCROLLER": () => (/* binding */ NODE_SCROLLER),
/* harmony export */   "NODE_SWITCH": () => (/* binding */ NODE_SWITCH),
/* harmony export */   "NODE_TEXT": () => (/* binding */ NODE_TEXT),
/* harmony export */   "NODE_TEXTAREA": () => (/* binding */ NODE_TEXTAREA),
/* harmony export */   "NODE_VIEW": () => (/* binding */ NODE_VIEW),
/* harmony export */   "NODE_VIEW_PAGER": () => (/* binding */ NODE_VIEW_PAGER),
/* harmony export */   "NotHasChildrenTag": () => (/* binding */ NotHasChildrenTag),
/* harmony export */   "Page": () => (/* binding */ Page),
/* harmony export */   "RootViewComponent": () => (/* binding */ RootViewComponent),
/* harmony export */   "RuleKeyMap": () => (/* binding */ RuleKeyMap),
/* harmony export */   "Switch": () => (/* binding */ Switch),
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "TextArea": () => (/* binding */ TextArea),
/* harmony export */   "View": () => (/* binding */ View),
/* harmony export */   "WithTextTag": () => (/* binding */ WithTextTag),
/* harmony export */   "collectStyle": () => (/* binding */ collectStyle),
/* harmony export */   "document": () => (/* binding */ document),
/* harmony export */   "getComponent": () => (/* binding */ getComponent),
/* harmony export */   "isNotHasChilrenTag": () => (/* binding */ isNotHasChilrenTag),
/* harmony export */   "isWithTextTag": () => (/* binding */ isWithTextTag),
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "shouldTextTag": () => (/* binding */ shouldTextTag)
/* harmony export */ });
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/inherits */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createSuper */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");









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
  var lengthReg = /^[\d\.]+(%|rem|hm|cpx|px|vw|vh)?$/;
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

var NODE_VIEW$1 = Symbol('NODE_VIEW');
var NODE_TEXT$1 = Symbol('NODE_TEXT');
var NODE_IMAGE$1 = Symbol('NODE_IMAGE');
var NODE_BUTTON$1 = Symbol('NODE_BUTTON');
var NODE_TEXTAREA$1 = Symbol('NODE_TEXTAREA');
var NODE_INPUT$1 = Symbol('NODE_INPUT');
var NODE_SWITCH$1 = Symbol('NODE_SWITCH');
var NODE_COMMENT$1 = Symbol('NODE_COMMENT');
var NODE_ANCHOR$1 = Symbol('NODE_ANCHOR');
var NODE_REFRESH$1 = Symbol('NODE_REFRESH');
var NODE_LOADMORE$1 = Symbol('NODE_LOADMORE');
var borderRadius = 'borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius';
var isBorderRadius = makeMap(borderRadius);

function dynamicTransformAdapter(style, view) {
  var tempStyle = {};
  tempStyle = hackForBorderRadius(view, style);
  return tempStyle;
}

function hackForBorderRadius(view, style) {
  if (view && view.__NAME === NODE_IMAGE$1 && hasSpecialAttr(style, isBorderRadius)) {
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
makeMap(NativeTags);

var isCustomNativeTag = function isCustomNativeTag(tag) {
  return isNativeTagReg.test(tag);
};

var extend = Object.assign;
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
    node.parent.removeChild(node);
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
          x: transformUnitValue(position.x),
          y: transformUnitValue(position.y)
        };
        break;

      case AnimationStyle.BACKGROUND_COLOR:
        styles[key] = getColor(styles[key]);
        break;

      case AnimationStyle.WIDTH:
        styles[key] = transformUnitValue(styles[key]);
        break;

      case AnimationStyle.HEIGHT:
        styles[key] = transformUnitValue(styles[key]);
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
      var CSSOM,
          elementStyle = {};
      if (!(CSSOM = __GLOBAL__.CSSOM)) return;
      var className = this.getAttribute('class') || '';
      var classList = className.split(/\s/);
      classList.forEach(function (item) {
        if (item) {
          var globalStyleArr = CSSOM['global'].classMap.get(item) || [];
          globalStyleArr = globalStyleArr.map(function (item) {
            return item === null || item === void 0 ? void 0 : item.style;
          });
          elementStyle = Object.assign.apply(Object, [{}, elementStyle].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_7__.default)(globalStyleArr)));
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
    key: "appendChild",
    value: function appendChild(child) {
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
    key: "removeChild",
    value: function removeChild(child) {
      child._onDestoryed();

      child.unlinkSiblings();
      child.parent = undefined;
      this.children.delete(child);

      if (this.element && child.element) {
        this.element.removeChild(child.element);
      }
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, anchor) {
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
    value: function setElementText(text) {
      console.warn('非text元素不支持');
    }
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
      return styleDynamicTransformer.transformStyle(style, base);
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

        case 'style':
          this.setStyle(value, true);
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
  }, {
    key: "hide",
    value: function hide() {}
  }, {
    key: "show",
    value: function show() {}
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
var ELEMNT_TAG_MAP = getElementTagMap();
var NotHasChildrenTag = [NODE_TEXT, NODE_IMAGE, NODE_BUTTON, NODE_TEXTAREA, NODE_INPUT];
var WithTextTag = [NODE_TEXT, NODE_BUTTON];

function getElementTagMap() {
  var tagMap = new Map();
  tagMap.set(NODE_VIEW, 'view');
  tagMap.set(NODE_TEXT, 'text');
  tagMap.set(NODE_IMAGE, 'image');
  tagMap.set(NODE_BUTTON, 'button');
  tagMap.set(NODE_TEXTAREA, 'textarea');
  tagMap.set(NODE_INPUT, 'input');
  tagMap.set(NODE_SWITCH, 'switch');
  tagMap.set(NODE_SCROLLER, 'scroller');
  tagMap.set(NODE_REFRESH, 'refresh');
  tagMap.set(NODE_LOADMORE, 'loadmore');
  return tagMap;
}

function isNotHasChilrenTag(type) {
  return NotHasChildrenTag.some(function (tag) {
    return ELEMNT_TAG_MAP.get(tag) === type;
  });
}

function shouldTextTag(type) {
  return NotHasChildrenTag.some(function (tag) {
    return ELEMNT_TAG_MAP.get(tag) === type;
  });
}

function isWithTextTag(type) {
  return WithTextTag.some(function (tag) {
    return ELEMNT_TAG_MAP.get(tag) === type;
  });
}

var ImageAttr;

(function (ImageAttr) {
  ImageAttr["Src"] = "src";
  ImageAttr["GifCount"] = "gifRepeatCount";
  ImageAttr["Resize"] = "resize";
})(ImageAttr || (ImageAttr = {}));

var gifReg = /\.gif$/;

var Image = /*#__PURE__*/function (_Base) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Image, _Base);

  var _super = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Image);

  function Image() {
    var _this3;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Image);

    _this3 = _super.call(this);
    _this3.__NAME = NODE_IMAGE$1;
    _this3._src = '';
    _this3.element = new __GLOBAL__.Image();
    _this3.element.style = {
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

        case ImageAttr.Resize:
          this.style = {
            resize: value
          };
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
    _this4.__NAME = NODE_INPUT$1;
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
    _this7.__NAME = NODE_TEXT$1;
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
        case 'richText':
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
    _this8.__NAME = NODE_VIEW$1;

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
    _this9.__NAME = NODE_TEXTAREA$1;
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

        case 'maxLength':
          this.maxLength = value;
          break;

        case 'returnKeyType':
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
    _this14.__NAME = NODE_BUTTON$1;
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
      this.element.pressed = styleTransformer.transformStyle(style, this) || {};
    }
  }, {
    key: "disabledStyle",
    set: function set(style) {
      this.element.disabled = styleTransformer.transformStyle(style, this) || {};
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
    _this15.__NAME = NODE_SWITCH$1;
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

        case 'openColor':
          this.onColor = value;
          break;

        case 'closeColor':
          this.offColor = value;
          break;

        case 'thumbColor':
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

var MatchType;

(function (MatchType) {
  MatchType[MatchType["Class"] = 0] = "Class";
  MatchType[MatchType["ID"] = 1] = "ID";
  MatchType[MatchType["Attr"] = 2] = "Attr";
})(MatchType || (MatchType = {}));

var RuleKeyMap = {
  'tagList': 'tagMap',
  'classList': 'classMap',
  'idList': 'idMap'
};

var collectStyle = function collectStyle(ruleSetMap) {
  if (!__GLOBAL__.CSSOM) {
    var defaultRuleSetGroup = {
      global: {
        tagMap: new Map(),
        classMap: new Map(),
        idMap: new Map()
      }
    };
    __GLOBAL__.CSSOM = defaultRuleSetGroup;
  }

  Object.keys(ruleSetMap).forEach(function (group) {
    var ruleSet = ruleSetMap[group];
    collectStyleGroup(ruleSet, group);
  });
};

var collectStyleGroup = function collectStyleGroup(ruleSet, group) {
  if (!__GLOBAL__.CSSOM[group]) {
    var defaultRuleSet = {
      tagMap: new Map(),
      classMap: new Map(),
      idMap: new Map()
    };
    __GLOBAL__.CSSOM[group] = defaultRuleSet;
  }

  Object.keys(ruleSet).forEach(function (ruleKey) {
    var ruleList = ruleSet[ruleKey];
    var key = RuleKeyMap[ruleKey];
    key && ruleList.forEach(function (rule) {
      if (rule) {
        var selectorMap = __GLOBAL__.CSSOM[group][key];
        var styleList = selectorMap.get(rule.selector) || [];
        styleList.push(rule);

        __GLOBAL__.CSSOM[group][key].set(rule.selector, styleList);
      }
    });
  });
};

var Comment = /*#__PURE__*/function (_Base9) {
  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(Comment, _Base9);

  var _super10 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(Comment);

  function Comment(comment) {
    var _this17;

    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__.default)(this, Comment);

    _this17 = _super10.call(this);
    _this17.__NAME = NODE_COMMENT$1;
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
    _this18.__NAME = NODE_VIEW$1;
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

        case 'scrollDirection':
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
    key: "appendChild",
    value: function appendChild(child) {
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
        if (child.__NAME === NODE_REFRESH$1) {
          this.element.refreshView = child.element;
        } else if (child.__NAME === NODE_LOADMORE$1) {
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
        if (child.__NAME === NODE_REFRESH$1) {
          this.element.refreshView = child.element;
        } else if (child.__NAME === NODE_LOADMORE$1) {
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
    _this20.__NAME = NODE_ANCHOR$1;
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
    _this21.__NAME = NODE_REFRESH$1;
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
    _this22.__NAME = NODE_LOADMORE$1;
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
        case ELEMNT_TAG_MAP.get(NODE_VIEW):
          component = new View();
          break;

        case ELEMNT_TAG_MAP.get(NODE_SCROLLER):
          component = new Scroller();
          break;

        case ELEMNT_TAG_MAP.get(NODE_TEXT):
          component = new Text();
          break;

        case ELEMNT_TAG_MAP.get(NODE_IMAGE):
          component = new Image();
          break;

        case ELEMNT_TAG_MAP.get(NODE_INPUT):
          component = new Input();
          break;

        case ELEMNT_TAG_MAP.get(NODE_TEXTAREA):
          component = new TextArea();
          break;

        case ELEMNT_TAG_MAP.get(NODE_BUTTON):
          component = new Button();
          break;

        case ELEMNT_TAG_MAP.get(NODE_SWITCH):
          component = new Switch();
          break;

        case ELEMNT_TAG_MAP.get(NODE_LOADMORE):
          component = new LoadMore();
          break;

        case ELEMNT_TAG_MAP.get(NODE_REFRESH):
          component = new Refresh();
          break;

        default:
          if (isCustomNativeTag(tag)) {
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

/***/ "../../tenon/packages/tenon-react/dist/tenon-react.cjs.js":
/*!****************************************************************!*\
  !*** ../../tenon/packages/tenon-react/dist/tenon-react.cjs.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var ReactReconciler = __webpack_require__(/*! react-reconciler */ "../../tenon/packages/tenon-react/node_modules/react-reconciler/index.js");

var tenonCore = __webpack_require__(/*! @hummer/tenon-core */ "../../tenon/packages/tenon-core/dist/tenon-core.es.js");

var tenonUtils = __webpack_require__(/*! @hummer/tenon-utils */ "../../tenon/packages/tenon-utils/dist/tenon-utils.es.js");

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e['default'] : e;
}

var ReactReconciler__default = /*#__PURE__*/_interopDefaultLegacy(ReactReconciler);

function getListener(func) {
  return func;
}

var eventReg = /^on[A-Z]/;

function isEventProp(propName) {
  return eventReg.test(propName);
}

function getEventName(name) {
  return name.slice(2).toLowerCase();
}

function diffProperties(node, type, oldProps, newProps) {
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

function processProps(props, type, node) {
  if (tenonCore.isWithTextTag(type)) {
    if (typeof props.children === 'string') {
      node.setElementText(props.children);
    } else if (typeof props.children === 'object') {
      node.setElementText(props.children.join(''));
    }
  }

  Object.keys(props).forEach(function (key) {
    if (key === 'children') {
      return;
    }

    if (typeof props[key] === 'function' && isEventProp(key)) {
      handleEvent(key, props[key], node);
    }

    switch (key) {
      case 'style':
        handleStyle(props.style, node);
        break;

      default:
        node.setAttribute(key, props[key]);
        break;
    }
  });
}

function shouldSetTextContent(type) {
  return tenonCore.isNotHasChilrenTag(type);
}

function handleStyle(styleValue, node) {
  var style = styleValue;

  if (typeof style === 'string') {
    style = tenonUtils.parseStringStyle(style);
  }

  style = tenonUtils.styleTransformer.transformStyle(style, node);
  node.setStyle(style, true);
}

function handleEvent(propName, value, node) {
  var eventName = getEventName(propName);
  var listener = getListener(value);
  console.log('Add Event Listener', propName);
  node.addEventListener(eventName, listener);
}

var HostConfig = {
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },

  getRootHostContext() {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  shouldSetTextContent(type, nextProps) {
    return shouldSetTextContent(type);
  },

  prepareForCommit() {},

  resetAfterCommit: function resetAfterCommit(container) {},

  createInstance(type, newProps, container) {
    var element = tenonCore.document.createElement(type);
    processProps(newProps, type, element);
    return element;
  },

  createTextInstance(text, container) {
    console.log('createTextInstance:', text);
    var element = tenonCore.document.createText(text);
    return element;
  },

  commitTextUpdate(node, oldText, newText) {
    console.log('CommitTextUpdate:', oldText, newText);

    if (oldText !== newText) {
      node.setElementText(newText);
    }
  },

  prepareUpdate(node, type, oldProps, newProps) {
    return diffProperties(node, type, oldProps, newProps);
  },

  commitUpdate(node, updatePayload, type, oldProps, newProps) {
    console.log('commitUpdate');
    processProps(updatePayload, type, node);
  },

  commitMount(node, updatePayload, type, props) {},

  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },

  appendChild(parent, child) {
    parent.appendChild(child);
  },

  insertBefore(parent, child, anchor) {
    parent.insertBefore(child, anchor);
  },

  removeChild(parent, child) {
    parent.removeChild(child);
  },

  finalizeInitialChildren() {
    return true;
  },

  appendChildToContainer(container, child) {
    container.appendChild(child);
  },

  insertInContainerBefore(container, child, anchor) {
    container.insertBefore(child, anchor);
  },

  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },

  hideInstance(node) {
    node.hide();
  },

  hideTextInstance(node) {
    node.setElementText("");
  },

  unhideInstance(node) {},

  unhideTextInstance(node, text) {
    node.setElementText(text);
  },

  clearContainer(container) {}

};
var TenonRenderInst = ReactReconciler__default(Object.assign(Object.assign({}, HostConfig), {
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

function render(rootElement) {
  var page = tenonCore.document.createPageView({});
  var container = TenonRenderInst.createContainer(page, 0, false, null);
  TenonRenderInst.updateContainer(rootElement, container, null, function () {
    page.render();
  });
  return container;
}

exports.render = render;
Object.keys(tenonCore).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = tenonCore[k];
});

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

/***/ "../../tenon/packages/tenon-react/node_modules/react-reconciler/cjs/react-reconciler.development.js":
/*!**********************************************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/react-reconciler/cjs/react-reconciler.development.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/** @license React v0.26.2
 * react-reconciler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */if(true){module.exports=function $$$reconciler($$$hostConfig){var exports={};'use strict';var React=__webpack_require__(/*! react */ "./node_modules/react/index.js");var _assign=__webpack_require__(/*! object-assign */ "../../tenon/packages/tenon-react/node_modules/object-assign/index.js");var Scheduler=__webpack_require__(/*! scheduler */ "../../tenon/packages/tenon-react/node_modules/scheduler/index.js");var tracing=__webpack_require__(/*! scheduler/tracing */ "../../tenon/packages/tenon-react/node_modules/scheduler/tracing.js");var ReactSharedInternals=React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.
function warn(format){{for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}printWarning('warn',format,args);}}function error(format){{for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}printWarning('error',format,args);}}function printWarning(level,format,args){// When changing this logic, you might want to also
// update consoleWithStackDev.www.js as well.
{var ReactDebugCurrentFrame=ReactSharedInternals.ReactDebugCurrentFrame;var stack=ReactDebugCurrentFrame.getStackAddendum();if(stack!==''){format+='%s';args=args.concat([stack]);}var argsWithFormat=args.map(function(item){return''+item;});// Careful: RN currently depends on this prefix
argsWithFormat.unshift('Warning: '+format);// We intentionally don't use spread (or .apply) directly because it
// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console[level],console,argsWithFormat);}}var FunctionComponent=0;var ClassComponent=1;var IndeterminateComponent=2;// Before we know whether it is function or class
var HostRoot=3;// Root of a host tree. Could be nested inside another node.
var HostPortal=4;// A subtree. Could be an entry point to a different renderer.
var HostComponent=5;var HostText=6;var Fragment=7;var Mode=8;var ContextConsumer=9;var ContextProvider=10;var ForwardRef=11;var Profiler=12;var SuspenseComponent=13;var MemoComponent=14;var SimpleMemoComponent=15;var LazyComponent=16;var IncompleteClassComponent=17;var DehydratedFragment=18;var SuspenseListComponent=19;var FundamentalComponent=20;var ScopeComponent=21;var Block=22;var OffscreenComponent=23;var LegacyHiddenComponent=24;/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */function get(key){return key._reactInternals;}function set(key,value){key._reactInternals=value;}// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE=0xeac7;var REACT_PORTAL_TYPE=0xeaca;var REACT_FRAGMENT_TYPE=0xeacb;var REACT_STRICT_MODE_TYPE=0xeacc;var REACT_PROFILER_TYPE=0xead2;var REACT_PROVIDER_TYPE=0xeacd;var REACT_CONTEXT_TYPE=0xeace;var REACT_FORWARD_REF_TYPE=0xead0;var REACT_SUSPENSE_TYPE=0xead1;var REACT_SUSPENSE_LIST_TYPE=0xead8;var REACT_MEMO_TYPE=0xead3;var REACT_LAZY_TYPE=0xead4;var REACT_BLOCK_TYPE=0xead9;var REACT_SERVER_BLOCK_TYPE=0xeada;var REACT_FUNDAMENTAL_TYPE=0xead5;var REACT_SCOPE_TYPE=0xead7;var REACT_OPAQUE_ID_TYPE=0xeae0;var REACT_DEBUG_TRACING_MODE_TYPE=0xeae1;var REACT_OFFSCREEN_TYPE=0xeae2;var REACT_LEGACY_HIDDEN_TYPE=0xeae3;if(typeof Symbol==='function'&&Symbol.for){var symbolFor=Symbol.for;REACT_ELEMENT_TYPE=symbolFor('react.element');REACT_PORTAL_TYPE=symbolFor('react.portal');REACT_FRAGMENT_TYPE=symbolFor('react.fragment');REACT_STRICT_MODE_TYPE=symbolFor('react.strict_mode');REACT_PROFILER_TYPE=symbolFor('react.profiler');REACT_PROVIDER_TYPE=symbolFor('react.provider');REACT_CONTEXT_TYPE=symbolFor('react.context');REACT_FORWARD_REF_TYPE=symbolFor('react.forward_ref');REACT_SUSPENSE_TYPE=symbolFor('react.suspense');REACT_SUSPENSE_LIST_TYPE=symbolFor('react.suspense_list');REACT_MEMO_TYPE=symbolFor('react.memo');REACT_LAZY_TYPE=symbolFor('react.lazy');REACT_BLOCK_TYPE=symbolFor('react.block');REACT_SERVER_BLOCK_TYPE=symbolFor('react.server.block');REACT_FUNDAMENTAL_TYPE=symbolFor('react.fundamental');REACT_SCOPE_TYPE=symbolFor('react.scope');REACT_OPAQUE_ID_TYPE=symbolFor('react.opaque.id');REACT_DEBUG_TRACING_MODE_TYPE=symbolFor('react.debug_trace_mode');REACT_OFFSCREEN_TYPE=symbolFor('react.offscreen');REACT_LEGACY_HIDDEN_TYPE=symbolFor('react.legacy_hidden');}var MAYBE_ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';function getIteratorFn(maybeIterable){if(maybeIterable===null||typeof maybeIterable!=='object'){return null;}var maybeIterator=MAYBE_ITERATOR_SYMBOL&&maybeIterable[MAYBE_ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL];if(typeof maybeIterator==='function'){return maybeIterator;}return null;}function getWrappedName(outerType,innerType,wrapperName){var functionName=innerType.displayName||innerType.name||'';return outerType.displayName||(functionName!==''?wrapperName+"("+functionName+")":wrapperName);}function getContextName(type){return type.displayName||'Context';}function getComponentName(type){if(type==null){// Host root, text node or just invalid type.
return null;}{if(typeof type.tag==='number'){error('Received an unexpected object in getComponentName(). '+'This is likely a bug in React. Please file an issue.');}}if(typeof type==='function'){return type.displayName||type.name||null;}if(typeof type==='string'){return type;}switch(type){case REACT_FRAGMENT_TYPE:return'Fragment';case REACT_PORTAL_TYPE:return'Portal';case REACT_PROFILER_TYPE:return'Profiler';case REACT_STRICT_MODE_TYPE:return'StrictMode';case REACT_SUSPENSE_TYPE:return'Suspense';case REACT_SUSPENSE_LIST_TYPE:return'SuspenseList';}if(typeof type==='object'){switch(type.$$typeof){case REACT_CONTEXT_TYPE:var context=type;return getContextName(context)+'.Consumer';case REACT_PROVIDER_TYPE:var provider=type;return getContextName(provider._context)+'.Provider';case REACT_FORWARD_REF_TYPE:return getWrappedName(type,type.render,'ForwardRef');case REACT_MEMO_TYPE:return getComponentName(type.type);case REACT_BLOCK_TYPE:return getComponentName(type._render);case REACT_LAZY_TYPE:{var lazyComponent=type;var payload=lazyComponent._payload;var init=lazyComponent._init;try{return getComponentName(init(payload));}catch(x){return null;}}}}return null;}// Don't change these two values. They're used by React Dev Tools.
var NoFlags=/*                      */0;var PerformedWork=/*                */1;// You can change the rest (and add more).
var Placement=/*                    */2;var Update=/*                       */4;var PlacementAndUpdate=/*           */6;var Deletion=/*                     */8;var ContentReset=/*                 */16;var Callback=/*                     */32;var DidCapture=/*                   */64;var Ref=/*                          */128;var Snapshot=/*                     */256;var Passive=/*                      */512;// TODO (effects) Remove this bit once the new reconciler is synced to the old.
var PassiveUnmountPendingDev=/*     */8192;var Hydrating=/*                    */1024;var HydratingAndUpdate=/*           */1028;// Passive & Update & Callback & Ref & Snapshot
var LifecycleEffectMask=/*          */932;// Union of all host effects
var HostEffectMask=/*               */2047;// These are not really side effects, but we still reuse this field.
var Incomplete=/*                   */2048;var ShouldCapture=/*                */4096;var ForceUpdateForLegacySuspense=/* */16384;// Static tags describe aspects of a fiber that are not specific to a render,
// Filter certain DOM attributes (e.g. src, href) if their values are empty strings.
var enableProfilerTimer=true;// Record durations for commit and passive effects phases.
var enableFundamentalAPI=false;// Experimental Scope support.
var enableNewReconciler=false;// Errors that are thrown while unmounting (or after in the case of passive effects)
var warnAboutStringRefs=false;var ReactCurrentOwner=ReactSharedInternals.ReactCurrentOwner;function getNearestMountedFiber(fiber){var node=fiber;var nearestMounted=fiber;if(!fiber.alternate){// If there is no alternate, this might be a new tree that isn't inserted
// yet. If it is, then it will have a pending insertion effect on it.
var nextNode=node;do{node=nextNode;if((node.flags&(Placement|Hydrating))!==NoFlags){// This is an insertion or in-progress hydration. The nearest possible
// mounted fiber is the parent but we need to continue to figure out
// if that one is still mounted.
nearestMounted=node.return;}nextNode=node.return;}while(nextNode);}else{while(node.return){node=node.return;}}if(node.tag===HostRoot){// TODO: Check if this was a nested HostRoot when used with
// renderContainerIntoSubtree.
return nearestMounted;}// If we didn't hit the root, that means that we're in an disconnected tree
// that has been unmounted.
return null;}function isFiberMounted(fiber){return getNearestMountedFiber(fiber)===fiber;}function isMounted(component){{var owner=ReactCurrentOwner.current;if(owner!==null&&owner.tag===ClassComponent){var ownerFiber=owner;var instance=ownerFiber.stateNode;if(!instance._warnedAboutRefsInRender){error('%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(ownerFiber.type)||'A component');}instance._warnedAboutRefsInRender=true;}}var fiber=get(component);if(!fiber){return false;}return getNearestMountedFiber(fiber)===fiber;}function assertIsMounted(fiber){if(!(getNearestMountedFiber(fiber)===fiber)){{throw Error("Unable to find node on an unmounted component.");}}}function findCurrentFiberUsingSlowPath(fiber){var alternate=fiber.alternate;if(!alternate){// If there is no alternate, then we only need to check if it is mounted.
var nearestMounted=getNearestMountedFiber(fiber);if(!(nearestMounted!==null)){{throw Error("Unable to find node on an unmounted component.");}}if(nearestMounted!==fiber){return null;}return fiber;}// If we have two possible branches, we'll walk backwards up to the root
// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var a=fiber;var b=alternate;while(true){var parentA=a.return;if(parentA===null){// We're at the root.
break;}var parentB=parentA.alternate;if(parentB===null){// There is no alternate. This is an unusual case. Currently, it only
// happens when a Suspense component is hidden. An extra fragment fiber
// is inserted in between the Suspense fiber and its children. Skip
// over this extra fragment fiber and proceed to the next parent.
var nextParent=parentA.return;if(nextParent!==null){a=b=nextParent;continue;}// If there's no parent, we're at the root.
break;}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(parentA.child===parentB.child){var child=parentA.child;while(child){if(child===a){// We've determined that A is the current branch.
assertIsMounted(parentA);return fiber;}if(child===b){// We've determined that B is the current branch.
assertIsMounted(parentA);return alternate;}child=child.sibling;}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
{{throw Error("Unable to find node on an unmounted component.");}}}if(a.return!==b.return){// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
a=parentA;b=parentB;}else{// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var didFindChild=false;var _child=parentA.child;while(_child){if(_child===a){didFindChild=true;a=parentA;b=parentB;break;}if(_child===b){didFindChild=true;b=parentA;a=parentB;break;}_child=_child.sibling;}if(!didFindChild){// Search parent B's child set
_child=parentB.child;while(_child){if(_child===a){didFindChild=true;a=parentB;b=parentA;break;}if(_child===b){didFindChild=true;b=parentB;a=parentA;break;}_child=_child.sibling;}if(!didFindChild){{throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");}}}}if(!(a.alternate===b)){{throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");}}}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
if(!(a.tag===HostRoot)){{throw Error("Unable to find node on an unmounted component.");}}if(a.stateNode.current===a){// We've determined that A is the current branch.
return fiber;}// Otherwise B has to be current branch.
return alternate;}function findCurrentHostFiber(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child){node.child.return=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node.return||node.return===currentParent){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function findCurrentHostFiberWithNoPortals(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText||enableFundamentalAPI){return node;}else if(node.child&&node.tag!==HostPortal){node.child.return=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node.return||node.return===currentParent){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function doesFiberContain(parentFiber,childFiber){var node=childFiber;var parentFiberAlternate=parentFiber.alternate;while(node!==null){if(node===parentFiber||node===parentFiberAlternate){return true;}node=node.return;}return false;}// This is a host config that's used for the `react-reconciler` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-reconciler` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-reconciler` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* reconciler code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
// eslint-disable-line no-undef
var getPublicInstance=$$$hostConfig.getPublicInstance;var getRootHostContext=$$$hostConfig.getRootHostContext;var getChildHostContext=$$$hostConfig.getChildHostContext;var prepareForCommit=$$$hostConfig.prepareForCommit;var resetAfterCommit=$$$hostConfig.resetAfterCommit;var createInstance=$$$hostConfig.createInstance;var appendInitialChild=$$$hostConfig.appendInitialChild;var finalizeInitialChildren=$$$hostConfig.finalizeInitialChildren;var prepareUpdate=$$$hostConfig.prepareUpdate;var shouldSetTextContent=$$$hostConfig.shouldSetTextContent;var createTextInstance=$$$hostConfig.createTextInstance;var scheduleTimeout=$$$hostConfig.scheduleTimeout;var cancelTimeout=$$$hostConfig.cancelTimeout;var noTimeout=$$$hostConfig.noTimeout;var now=$$$hostConfig.now;var isPrimaryRenderer=$$$hostConfig.isPrimaryRenderer;var warnsIfNotActing=$$$hostConfig.warnsIfNotActing;var supportsMutation=$$$hostConfig.supportsMutation;var supportsPersistence=$$$hostConfig.supportsPersistence;var supportsHydration=$$$hostConfig.supportsHydration;var getFundamentalComponentInstance=$$$hostConfig.getFundamentalComponentInstance;var mountFundamentalComponent=$$$hostConfig.mountFundamentalComponent;var shouldUpdateFundamentalComponent=$$$hostConfig.shouldUpdateFundamentalComponent;var getInstanceFromNode=$$$hostConfig.getInstanceFromNode;var isOpaqueHydratingObject=$$$hostConfig.isOpaqueHydratingObject;var makeOpaqueHydratingObject=$$$hostConfig.makeOpaqueHydratingObject;var makeClientId=$$$hostConfig.makeClientId;var makeClientIdInDEV=$$$hostConfig.makeClientIdInDEV;var beforeActiveInstanceBlur=$$$hostConfig.beforeActiveInstanceBlur;var afterActiveInstanceBlur=$$$hostConfig.afterActiveInstanceBlur;var preparePortalMount=$$$hostConfig.preparePortalMount;var prepareScopeUpdate=$$$hostConfig.preparePortalMount;var getInstanceFromScope=$$$hostConfig.getInstanceFromScope;// -------------------
//      Test selectors
//     (optional)
// -------------------
var supportsTestSelectors=$$$hostConfig.supportsTestSelectors;var findFiberRoot=$$$hostConfig.findFiberRoot;var getBoundingRect=$$$hostConfig.getBoundingRect;var getTextContent=$$$hostConfig.getTextContent;var isHiddenSubtree=$$$hostConfig.isHiddenSubtree;var matchAccessibilityRole=$$$hostConfig.matchAccessibilityRole;var setFocusIfFocusable=$$$hostConfig.setFocusIfFocusable;var setupIntersectionObserver=$$$hostConfig.setupIntersectionObserver;// -------------------
//      Mutation
//     (optional)
// -------------------
var appendChild=$$$hostConfig.appendChild;var appendChildToContainer=$$$hostConfig.appendChildToContainer;var commitTextUpdate=$$$hostConfig.commitTextUpdate;var commitMount=$$$hostConfig.commitMount;var commitUpdate=$$$hostConfig.commitUpdate;var insertBefore=$$$hostConfig.insertBefore;var insertInContainerBefore=$$$hostConfig.insertInContainerBefore;var removeChild=$$$hostConfig.removeChild;var removeChildFromContainer=$$$hostConfig.removeChildFromContainer;var resetTextContent=$$$hostConfig.resetTextContent;var hideInstance=$$$hostConfig.hideInstance;var hideTextInstance=$$$hostConfig.hideTextInstance;var unhideInstance=$$$hostConfig.unhideInstance;var unhideTextInstance=$$$hostConfig.unhideTextInstance;var updateFundamentalComponent=$$$hostConfig.updateFundamentalComponent;var unmountFundamentalComponent=$$$hostConfig.unmountFundamentalComponent;var clearContainer=$$$hostConfig.clearContainer;// -------------------
//     Persistence
//     (optional)
// -------------------
var cloneInstance=$$$hostConfig.cloneInstance;var createContainerChildSet=$$$hostConfig.createContainerChildSet;var appendChildToContainerChildSet=$$$hostConfig.appendChildToContainerChildSet;var finalizeContainerChildren=$$$hostConfig.finalizeContainerChildren;var replaceContainerChildren=$$$hostConfig.replaceContainerChildren;var cloneHiddenInstance=$$$hostConfig.cloneHiddenInstance;var cloneHiddenTextInstance=$$$hostConfig.cloneHiddenTextInstance;var cloneFundamentalInstance=$$$hostConfig.cloneInstance;// -------------------
//     Hydration
//     (optional)
// -------------------
var canHydrateInstance=$$$hostConfig.canHydrateInstance;var canHydrateTextInstance=$$$hostConfig.canHydrateTextInstance;var canHydrateSuspenseInstance=$$$hostConfig.canHydrateSuspenseInstance;var isSuspenseInstancePending=$$$hostConfig.isSuspenseInstancePending;var isSuspenseInstanceFallback=$$$hostConfig.isSuspenseInstanceFallback;var registerSuspenseInstanceRetry=$$$hostConfig.registerSuspenseInstanceRetry;var getNextHydratableSibling=$$$hostConfig.getNextHydratableSibling;var getFirstHydratableChild=$$$hostConfig.getFirstHydratableChild;var hydrateInstance=$$$hostConfig.hydrateInstance;var hydrateTextInstance=$$$hostConfig.hydrateTextInstance;var hydrateSuspenseInstance=$$$hostConfig.hydrateSuspenseInstance;var getNextHydratableInstanceAfterSuspenseInstance=$$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance;var commitHydratedContainer=$$$hostConfig.commitHydratedContainer;var commitHydratedSuspenseInstance=$$$hostConfig.commitHydratedSuspenseInstance;var clearSuspenseBoundary=$$$hostConfig.clearSuspenseBoundary;var clearSuspenseBoundaryFromContainer=$$$hostConfig.clearSuspenseBoundaryFromContainer;var didNotMatchHydratedContainerTextInstance=$$$hostConfig.didNotMatchHydratedContainerTextInstance;var didNotMatchHydratedTextInstance=$$$hostConfig.didNotMatchHydratedTextInstance;var didNotHydrateContainerInstance=$$$hostConfig.didNotHydrateContainerInstance;var didNotHydrateInstance=$$$hostConfig.didNotHydrateInstance;var didNotFindHydratableContainerInstance=$$$hostConfig.didNotFindHydratableContainerInstance;var didNotFindHydratableContainerTextInstance=$$$hostConfig.didNotFindHydratableContainerTextInstance;var didNotFindHydratableContainerSuspenseInstance=$$$hostConfig.didNotFindHydratableContainerSuspenseInstance;var didNotFindHydratableInstance=$$$hostConfig.didNotFindHydratableInstance;var didNotFindHydratableTextInstance=$$$hostConfig.didNotFindHydratableTextInstance;var didNotFindHydratableSuspenseInstance=$$$hostConfig.didNotFindHydratableSuspenseInstance;// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth=0;var prevLog;var prevInfo;var prevWarn;var prevError;var prevGroup;var prevGroupCollapsed;var prevGroupEnd;function disabledLog(){}disabledLog.__reactDisabledLog=true;function disableLogs(){{if(disabledDepth===0){/* eslint-disable react-internal/no-production-logging */prevLog=console.log;prevInfo=console.info;prevWarn=console.warn;prevError=console.error;prevGroup=console.group;prevGroupCollapsed=console.groupCollapsed;prevGroupEnd=console.groupEnd;// https://github.com/facebook/react/issues/19099
var props={configurable:true,enumerable:true,value:disabledLog,writable:true};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{info:props,log:props,warn:props,error:props,group:props,groupCollapsed:props,groupEnd:props});/* eslint-enable react-internal/no-production-logging */}disabledDepth++;}}function reenableLogs(){{disabledDepth--;if(disabledDepth===0){/* eslint-disable react-internal/no-production-logging */var props={configurable:true,enumerable:true,writable:true};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:_assign({},props,{value:prevLog}),info:_assign({},props,{value:prevInfo}),warn:_assign({},props,{value:prevWarn}),error:_assign({},props,{value:prevError}),group:_assign({},props,{value:prevGroup}),groupCollapsed:_assign({},props,{value:prevGroupCollapsed}),groupEnd:_assign({},props,{value:prevGroupEnd})});/* eslint-enable react-internal/no-production-logging */}if(disabledDepth<0){error('disabledDepth fell below zero. '+'This is a bug in React. Please file an issue.');}}}var ReactCurrentDispatcher=ReactSharedInternals.ReactCurrentDispatcher;var prefix;function describeBuiltInComponentFrame(name,source,ownerFn){{if(prefix===undefined){// Extract the VM specific prefix used by each line.
try{throw Error();}catch(x){var match=x.stack.trim().match(/\n( *(at )?)/);prefix=match&&match[1]||'';}}// We use the prefix to ensure our stacks line up with native stack frames.
return'\n'+prefix+name;}}var reentry=false;var componentFrameCache;{var PossiblyWeakMap=typeof WeakMap==='function'?WeakMap:Map;componentFrameCache=new PossiblyWeakMap();}function describeNativeComponentFrame(fn,construct){// If something asked for a stack inside a fake render, it should get ignored.
if(!fn||reentry){return'';}{var frame=componentFrameCache.get(fn);if(frame!==undefined){return frame;}}var control;reentry=true;var previousPrepareStackTrace=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=undefined;var previousDispatcher;{previousDispatcher=ReactCurrentDispatcher.current;// Set the dispatcher in DEV because this might be call in the render function
// for warnings.
ReactCurrentDispatcher.current=null;disableLogs();}try{// This should throw.
if(construct){// Something should be setting the props in the constructor.
var Fake=function Fake(){throw Error();};// $FlowFixMe
Object.defineProperty(Fake.prototype,'props',{set:function set(){// We use a throwing setter instead of frozen or non-writable props
// because that won't throw in a non-strict mode function.
throw Error();}});if(typeof Reflect==='object'&&Reflect.construct){// We construct a different control for this case to include any extra
// frames added by the construct call.
try{Reflect.construct(Fake,[]);}catch(x){control=x;}Reflect.construct(fn,[],Fake);}else{try{Fake.call();}catch(x){control=x;}fn.call(Fake.prototype);}}else{try{throw Error();}catch(x){control=x;}fn();}}catch(sample){// This is inlined manually because closure doesn't do it for us.
if(sample&&control&&typeof sample.stack==='string'){// This extracts the first frame from the sample that isn't also in the control.
// Skipping one frame that we assume is the frame that calls the two.
var sampleLines=sample.stack.split('\n');var controlLines=control.stack.split('\n');var s=sampleLines.length-1;var c=controlLines.length-1;while(s>=1&&c>=0&&sampleLines[s]!==controlLines[c]){// We expect at least one stack frame to be shared.
// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
c--;}for(;s>=1&&c>=0;s--,c--){// Next we find the first one that isn't the same which should be the
// frame that called our sample function and the control.
if(sampleLines[s]!==controlLines[c]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(s!==1||c!==1){do{s--;c--;// We may still have similar intermediate frames from the construct call.
// The next one that isn't the same should be our match though.
if(c<0||sampleLines[s]!==controlLines[c]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var _frame='\n'+sampleLines[s].replace(' at new ',' at ');{if(typeof fn==='function'){componentFrameCache.set(fn,_frame);}}// Return the line we found.
return _frame;}}while(s>=1&&c>=0);}break;}}}}finally{reentry=false;{ReactCurrentDispatcher.current=previousDispatcher;reenableLogs();}Error.prepareStackTrace=previousPrepareStackTrace;}// Fallback to just using the name if we couldn't make it throw.
var name=fn?fn.displayName||fn.name:'';var syntheticFrame=name?describeBuiltInComponentFrame(name):'';{if(typeof fn==='function'){componentFrameCache.set(fn,syntheticFrame);}}return syntheticFrame;}function describeClassComponentFrame(ctor,source,ownerFn){{return describeNativeComponentFrame(ctor,true);}}function describeFunctionComponentFrame(fn,source,ownerFn){{return describeNativeComponentFrame(fn,false);}}function shouldConstruct(Component){var prototype=Component.prototype;return!!(prototype&&prototype.isReactComponent);}function describeUnknownElementTypeFrameInDEV(type,source,ownerFn){if(type==null){return'';}if(typeof type==='function'){{return describeNativeComponentFrame(type,shouldConstruct(type));}}if(typeof type==='string'){return describeBuiltInComponentFrame(type);}switch(type){case REACT_SUSPENSE_TYPE:return describeBuiltInComponentFrame('Suspense');case REACT_SUSPENSE_LIST_TYPE:return describeBuiltInComponentFrame('SuspenseList');}if(typeof type==='object'){switch(type.$$typeof){case REACT_FORWARD_REF_TYPE:return describeFunctionComponentFrame(type.render);case REACT_MEMO_TYPE:// Memo may contain any component type so we recursively resolve it.
return describeUnknownElementTypeFrameInDEV(type.type,source,ownerFn);case REACT_BLOCK_TYPE:return describeFunctionComponentFrame(type._render);case REACT_LAZY_TYPE:{var lazyComponent=type;var payload=lazyComponent._payload;var init=lazyComponent._init;try{// Lazy may contain any component type so we recursively resolve it.
return describeUnknownElementTypeFrameInDEV(init(payload),source,ownerFn);}catch(x){}}}}return'';}var loggedTypeFailures={};var ReactDebugCurrentFrame=ReactSharedInternals.ReactDebugCurrentFrame;function setCurrentlyValidatingElement(element){{if(element){var owner=element._owner;var stack=describeUnknownElementTypeFrameInDEV(element.type,element._source,owner?owner.type:null);ReactDebugCurrentFrame.setExtraStackFrame(stack);}else{ReactDebugCurrentFrame.setExtraStackFrame(null);}}}function checkPropTypes(typeSpecs,values,location,componentName,element){{// $FlowFixMe This is okay but Flow doesn't know it.
var has=Function.call.bind(Object.prototype.hasOwnProperty);for(var typeSpecName in typeSpecs){if(has(typeSpecs,typeSpecName)){var error$1=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if(typeof typeSpecs[typeSpecName]!=='function'){var err=Error((componentName||'React class')+': '+location+' type `'+typeSpecName+'` is invalid; '+'it must be a function, usually from the `prop-types` package, but received `'+typeof typeSpecs[typeSpecName]+'`.'+'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');err.name='Invariant Violation';throw err;}error$1=typeSpecs[typeSpecName](values,typeSpecName,componentName,location,null,'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');}catch(ex){error$1=ex;}if(error$1&&!(error$1 instanceof Error)){setCurrentlyValidatingElement(element);error('%s: type specification of %s'+' `%s` is invalid; the type checker '+'function must return `null` or an `Error` but returned a %s. '+'You may have forgotten to pass an argument to the type checker '+'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and '+'shape all require an argument).',componentName||'React class',location,typeSpecName,typeof error$1);setCurrentlyValidatingElement(null);}if(error$1 instanceof Error&&!(error$1.message in loggedTypeFailures)){// Only monitor this failure once because there tends to be a lot of the
// same error.
loggedTypeFailures[error$1.message]=true;setCurrentlyValidatingElement(element);error('Failed %s type: %s',location,error$1.message);setCurrentlyValidatingElement(null);}}}}}var valueStack=[];var fiberStack;{fiberStack=[];}var index=-1;function createCursor(defaultValue){return{current:defaultValue};}function pop(cursor,fiber){if(index<0){{error('Unexpected pop.');}return;}{if(fiber!==fiberStack[index]){error('Unexpected Fiber popped.');}}cursor.current=valueStack[index];valueStack[index]=null;{fiberStack[index]=null;}index--;}function push(cursor,value,fiber){index++;valueStack[index]=cursor.current;{fiberStack[index]=fiber;}cursor.current=value;}var warnedAboutMissingGetChildContext;{warnedAboutMissingGetChildContext={};}var emptyContextObject={};{Object.freeze(emptyContextObject);}// A cursor to the current merged context object on the stack.
var contextStackCursor=createCursor(emptyContextObject);// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor=createCursor(false);// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext=emptyContextObject;function getUnmaskedContext(workInProgress,Component,didPushOwnContextIfProvider){{if(didPushOwnContextIfProvider&&isContextProvider(Component)){// If the fiber is a context provider itself, when we read its context
// we may have already pushed its own child context on the stack. A context
// provider should not "see" its own child context. Therefore we read the
// previous (parent) context instead for a context provider.
return previousContext;}return contextStackCursor.current;}}function cacheContext(workInProgress,unmaskedContext,maskedContext){{var instance=workInProgress.stateNode;instance.__reactInternalMemoizedUnmaskedChildContext=unmaskedContext;instance.__reactInternalMemoizedMaskedChildContext=maskedContext;}}function getMaskedContext(workInProgress,unmaskedContext){{var type=workInProgress.type;var contextTypes=type.contextTypes;if(!contextTypes){return emptyContextObject;}// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var instance=workInProgress.stateNode;if(instance&&instance.__reactInternalMemoizedUnmaskedChildContext===unmaskedContext){return instance.__reactInternalMemoizedMaskedChildContext;}var context={};for(var key in contextTypes){context[key]=unmaskedContext[key];}{var name=getComponentName(type)||'Unknown';checkPropTypes(contextTypes,context,'context',name);}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// Context is created before the class component is instantiated so check for instance.
if(instance){cacheContext(workInProgress,unmaskedContext,context);}return context;}}function hasContextChanged(){{return didPerformWorkStackCursor.current;}}function isContextProvider(type){{var childContextTypes=type.childContextTypes;return childContextTypes!==null&&childContextTypes!==undefined;}}function popContext(fiber){{pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}}function popTopLevelContextObject(fiber){{pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}}function pushTopLevelContextObject(fiber,context,didChange){{if(!(contextStackCursor.current===emptyContextObject)){{throw Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");}}push(contextStackCursor,context,fiber);push(didPerformWorkStackCursor,didChange,fiber);}}function processChildContext(fiber,type,parentContext){{var instance=fiber.stateNode;var childContextTypes=type.childContextTypes;// TODO (bvaughn) Replace this behavior with an invariant() in the future.
// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if(typeof instance.getChildContext!=='function'){{var componentName=getComponentName(type)||'Unknown';if(!warnedAboutMissingGetChildContext[componentName]){warnedAboutMissingGetChildContext[componentName]=true;error('%s.childContextTypes is specified but there is no getChildContext() method '+'on the instance. You can either define getChildContext() on %s or remove '+'childContextTypes from it.',componentName,componentName);}}return parentContext;}var childContext=instance.getChildContext();for(var contextKey in childContext){if(!(contextKey in childContextTypes)){{throw Error((getComponentName(type)||'Unknown')+".getChildContext(): key \""+contextKey+"\" is not defined in childContextTypes.");}}}{var name=getComponentName(type)||'Unknown';checkPropTypes(childContextTypes,childContext,'child context',name);}return _assign({},parentContext,childContext);}}function pushContextProvider(workInProgress){{var instance=workInProgress.stateNode;// We push the context as early as possible to ensure stack integrity.
// If the instance does not exist yet, we will push null at first,
// and replace it on the stack later when invalidating the context.
var memoizedMergedChildContext=instance&&instance.__reactInternalMemoizedMergedChildContext||emptyContextObject;// Remember the parent context so we can merge with it later.
// Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
previousContext=contextStackCursor.current;push(contextStackCursor,memoizedMergedChildContext,workInProgress);push(didPerformWorkStackCursor,didPerformWorkStackCursor.current,workInProgress);return true;}}function invalidateContextProvider(workInProgress,type,didChange){{var instance=workInProgress.stateNode;if(!instance){{throw Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");}}if(didChange){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var mergedContext=processChildContext(workInProgress,type,previousContext);instance.__reactInternalMemoizedMergedChildContext=mergedContext;// Replace the old (or empty) context with the new one.
// It is important to unwind the context in the reverse order.
pop(didPerformWorkStackCursor,workInProgress);pop(contextStackCursor,workInProgress);// Now push the new context and mark that it has changed.
push(contextStackCursor,mergedContext,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}else{pop(didPerformWorkStackCursor,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}}}function findCurrentUnmaskedContext(fiber){{// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
if(!(isFiberMounted(fiber)&&fiber.tag===ClassComponent)){{throw Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");}}var node=fiber;do{switch(node.tag){case HostRoot:return node.stateNode.context;case ClassComponent:{var Component=node.type;if(isContextProvider(Component)){return node.stateNode.__reactInternalMemoizedMergedChildContext;}break;}}node=node.return;}while(node!==null);{{throw Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");}}}}var LegacyRoot=0;var BlockingRoot=1;var ConcurrentRoot=2;var rendererID=null;var injectedHook=null;var hasLoggedError=false;var isDevToolsPresent=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__!=='undefined';function injectInternals(internals){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__==='undefined'){// No DevTools
return false;}var hook=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(hook.isDisabled){// This isn't a real property on the hook, but it can be set to opt out
// of DevTools integration and associated warnings and logs.
// https://github.com/facebook/react/issues/3877
return true;}if(!hook.supportsFiber){{error('The installed version of React DevTools is too old and will not work '+'with the current version of React. Please update React DevTools. '+'https://reactjs.org/link/react-devtools');}// DevTools exists, even though it doesn't support Fiber.
return true;}try{rendererID=hook.inject(internals);// We have successfully injected, so now it is safe to set up hooks.
injectedHook=hook;}catch(err){// Catch all errors because it is unsafe to throw during initialization.
{error('React instrumentation encountered an error: %s.',err);}}// DevTools exists
return true;}function onScheduleRoot(root,children){{if(injectedHook&&typeof injectedHook.onScheduleFiberRoot==='function'){try{injectedHook.onScheduleFiberRoot(rendererID,root,children);}catch(err){if(!hasLoggedError){hasLoggedError=true;error('React instrumentation encountered an error: %s',err);}}}}}function onCommitRoot(root,priorityLevel){if(injectedHook&&typeof injectedHook.onCommitFiberRoot==='function'){try{var didError=(root.current.flags&DidCapture)===DidCapture;if(enableProfilerTimer){injectedHook.onCommitFiberRoot(rendererID,root,priorityLevel,didError);}else{injectedHook.onCommitFiberRoot(rendererID,root,undefined,didError);}}catch(err){{if(!hasLoggedError){hasLoggedError=true;error('React instrumentation encountered an error: %s',err);}}}}}function onCommitUnmount(fiber){if(injectedHook&&typeof injectedHook.onCommitFiberUnmount==='function'){try{injectedHook.onCommitFiberUnmount(rendererID,fiber);}catch(err){{if(!hasLoggedError){hasLoggedError=true;error('React instrumentation encountered an error: %s',err);}}}}}var Scheduler_now=Scheduler.unstable_now;{// Provide explicit error message when production+profiling bundle of e.g.
// react-dom is used with production (non-profiling) bundle of
// scheduler/tracing
if(!(tracing.__interactionsRef!=null&&tracing.__interactionsRef.current!=null)){{throw Error("It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at https://reactjs.org/link/profiling");}}}// ascending numbers so we can compare them like numbers. They start at 90 to
// avoid clashing with Scheduler's priorities.
var ImmediatePriority=99;var UserBlockingPriority=98;var NormalPriority=97;var LowPriority=96;var IdlePriority=95;// NoPriority is the absence of priority. Also React-only.
var NoPriority=90;var initialTimeMs=Scheduler_now();// If the initial timestamp is reasonably small, use Scheduler's `now` directly.
var SyncLanePriority=15;var SyncBatchedLanePriority=14;var InputDiscreteHydrationLanePriority=13;var InputDiscreteLanePriority=12;var InputContinuousHydrationLanePriority=11;var InputContinuousLanePriority=10;var DefaultHydrationLanePriority=9;var DefaultLanePriority=8;var TransitionHydrationPriority=7;var TransitionPriority=6;var RetryLanePriority=5;var SelectiveHydrationLanePriority=4;var IdleHydrationLanePriority=3;var IdleLanePriority=2;var OffscreenLanePriority=1;var NoLanePriority=0;var TotalLanes=31;var NoLanes=/*                        */0;var NoLane=/*                          */0;var SyncLane=/*                        */1;var SyncBatchedLane=/*                 */2;var InputDiscreteHydrationLane=/*      */4;var InputDiscreteLanes=/*                    */24;var InputContinuousHydrationLane=/*           */32;var InputContinuousLanes=/*                  */192;var DefaultHydrationLane=/*            */256;var DefaultLanes=/*                   */3584;var TransitionHydrationLane=/*                */4096;var TransitionLanes=/*                       */4186112;var RetryLanes=/*                            */62914560;var SomeRetryLane=/*                  */33554432;var SelectiveHydrationLane=/*          */67108864;var NonIdleLanes=/*                                 */134217727;var IdleHydrationLane=/*               */134217728;var IdleLanes=/*                             */805306368;var OffscreenLane=/*                   */1073741824;var NoTimestamp=-1;var currentUpdateLanePriority=NoLanePriority;function getCurrentUpdateLanePriority(){return currentUpdateLanePriority;}function setCurrentUpdateLanePriority(newLanePriority){currentUpdateLanePriority=newLanePriority;}// "Registers" used to "return" multiple values
// Used by getHighestPriorityLanes and getNextLanes:
var return_highestLanePriority=DefaultLanePriority;function getHighestPriorityLanes(lanes){if((SyncLane&lanes)!==NoLanes){return_highestLanePriority=SyncLanePriority;return SyncLane;}if((SyncBatchedLane&lanes)!==NoLanes){return_highestLanePriority=SyncBatchedLanePriority;return SyncBatchedLane;}if((InputDiscreteHydrationLane&lanes)!==NoLanes){return_highestLanePriority=InputDiscreteHydrationLanePriority;return InputDiscreteHydrationLane;}var inputDiscreteLanes=InputDiscreteLanes&lanes;if(inputDiscreteLanes!==NoLanes){return_highestLanePriority=InputDiscreteLanePriority;return inputDiscreteLanes;}if((lanes&InputContinuousHydrationLane)!==NoLanes){return_highestLanePriority=InputContinuousHydrationLanePriority;return InputContinuousHydrationLane;}var inputContinuousLanes=InputContinuousLanes&lanes;if(inputContinuousLanes!==NoLanes){return_highestLanePriority=InputContinuousLanePriority;return inputContinuousLanes;}if((lanes&DefaultHydrationLane)!==NoLanes){return_highestLanePriority=DefaultHydrationLanePriority;return DefaultHydrationLane;}var defaultLanes=DefaultLanes&lanes;if(defaultLanes!==NoLanes){return_highestLanePriority=DefaultLanePriority;return defaultLanes;}if((lanes&TransitionHydrationLane)!==NoLanes){return_highestLanePriority=TransitionHydrationPriority;return TransitionHydrationLane;}var transitionLanes=TransitionLanes&lanes;if(transitionLanes!==NoLanes){return_highestLanePriority=TransitionPriority;return transitionLanes;}var retryLanes=RetryLanes&lanes;if(retryLanes!==NoLanes){return_highestLanePriority=RetryLanePriority;return retryLanes;}if(lanes&SelectiveHydrationLane){return_highestLanePriority=SelectiveHydrationLanePriority;return SelectiveHydrationLane;}if((lanes&IdleHydrationLane)!==NoLanes){return_highestLanePriority=IdleHydrationLanePriority;return IdleHydrationLane;}var idleLanes=IdleLanes&lanes;if(idleLanes!==NoLanes){return_highestLanePriority=IdleLanePriority;return idleLanes;}if((OffscreenLane&lanes)!==NoLanes){return_highestLanePriority=OffscreenLanePriority;return OffscreenLane;}{error('Should have found matching lanes. This is a bug in React.');}// This shouldn't be reachable, but as a fallback, return the entire bitmask.
return_highestLanePriority=DefaultLanePriority;return lanes;}function schedulerPriorityToLanePriority(schedulerPriorityLevel){switch(schedulerPriorityLevel){case ImmediatePriority:return SyncLanePriority;case UserBlockingPriority:return InputContinuousLanePriority;case NormalPriority:case LowPriority:// TODO: Handle LowSchedulerPriority, somehow. Maybe the same lane as hydration.
return DefaultLanePriority;case IdlePriority:return IdleLanePriority;default:return NoLanePriority;}}function lanePriorityToSchedulerPriority(lanePriority){switch(lanePriority){case SyncLanePriority:case SyncBatchedLanePriority:return ImmediatePriority;case InputDiscreteHydrationLanePriority:case InputDiscreteLanePriority:case InputContinuousHydrationLanePriority:case InputContinuousLanePriority:return UserBlockingPriority;case DefaultHydrationLanePriority:case DefaultLanePriority:case TransitionHydrationPriority:case TransitionPriority:case SelectiveHydrationLanePriority:case RetryLanePriority:return NormalPriority;case IdleHydrationLanePriority:case IdleLanePriority:case OffscreenLanePriority:return IdlePriority;case NoLanePriority:return NoPriority;default:{{throw Error("Invalid update priority: "+lanePriority+". This is a bug in React.");}}}}function getNextLanes(root,wipLanes){// Early bailout if there's no pending work left.
var pendingLanes=root.pendingLanes;if(pendingLanes===NoLanes){return_highestLanePriority=NoLanePriority;return NoLanes;}var nextLanes=NoLanes;var nextLanePriority=NoLanePriority;var expiredLanes=root.expiredLanes;var suspendedLanes=root.suspendedLanes;var pingedLanes=root.pingedLanes;// Check if any work has expired.
if(expiredLanes!==NoLanes){nextLanes=expiredLanes;nextLanePriority=return_highestLanePriority=SyncLanePriority;}else{// Do not work on any idle work until all the non-idle work has finished,
// even if the work is suspended.
var nonIdlePendingLanes=pendingLanes&NonIdleLanes;if(nonIdlePendingLanes!==NoLanes){var nonIdleUnblockedLanes=nonIdlePendingLanes&~suspendedLanes;if(nonIdleUnblockedLanes!==NoLanes){nextLanes=getHighestPriorityLanes(nonIdleUnblockedLanes);nextLanePriority=return_highestLanePriority;}else{var nonIdlePingedLanes=nonIdlePendingLanes&pingedLanes;if(nonIdlePingedLanes!==NoLanes){nextLanes=getHighestPriorityLanes(nonIdlePingedLanes);nextLanePriority=return_highestLanePriority;}}}else{// The only remaining work is Idle.
var unblockedLanes=pendingLanes&~suspendedLanes;if(unblockedLanes!==NoLanes){nextLanes=getHighestPriorityLanes(unblockedLanes);nextLanePriority=return_highestLanePriority;}else{if(pingedLanes!==NoLanes){nextLanes=getHighestPriorityLanes(pingedLanes);nextLanePriority=return_highestLanePriority;}}}}if(nextLanes===NoLanes){// This should only be reachable if we're suspended
// TODO: Consider warning in this path if a fallback timer is not scheduled.
return NoLanes;}// If there are higher priority lanes, we'll include them even if they
// are suspended.
nextLanes=pendingLanes&getEqualOrHigherPriorityLanes(nextLanes);// If we're already in the middle of a render, switching lanes will interrupt
// it and we'll lose our progress. We should only do this if the new lanes are
// higher priority.
if(wipLanes!==NoLanes&&wipLanes!==nextLanes&&// If we already suspended with a delay, then interrupting is fine. Don't
// bother waiting until the root is complete.
(wipLanes&suspendedLanes)===NoLanes){getHighestPriorityLanes(wipLanes);var wipLanePriority=return_highestLanePriority;if(nextLanePriority<=wipLanePriority){return wipLanes;}else{return_highestLanePriority=nextLanePriority;}}// Check for entangled lanes and add them to the batch.
//
// A lane is said to be entangled with another when it's not allowed to render
// in a batch that does not also include the other lane. Typically we do this
// when multiple updates have the same source, and we only want to respond to
// the most recent event from that source.
//
// Note that we apply entanglements *after* checking for partial work above.
// This means that if a lane is entangled during an interleaved event while
// it's already rendering, we won't interrupt it. This is intentional, since
// entanglement is usually "best effort": we'll try our best to render the
// lanes in the same batch, but it's not worth throwing out partially
// completed work in order to do it.
//
// For those exceptions where entanglement is semantically important, like
// useMutableSource, we should ensure that there is no partial work at the
// time we apply the entanglement.
var entangledLanes=root.entangledLanes;if(entangledLanes!==NoLanes){var entanglements=root.entanglements;var lanes=nextLanes&entangledLanes;while(lanes>0){var index=pickArbitraryLaneIndex(lanes);var lane=1<<index;nextLanes|=entanglements[index];lanes&=~lane;}}return nextLanes;}function getMostRecentEventTime(root,lanes){var eventTimes=root.eventTimes;var mostRecentEventTime=NoTimestamp;while(lanes>0){var index=pickArbitraryLaneIndex(lanes);var lane=1<<index;var eventTime=eventTimes[index];if(eventTime>mostRecentEventTime){mostRecentEventTime=eventTime;}lanes&=~lane;}return mostRecentEventTime;}function computeExpirationTime(lane,currentTime){// TODO: Expiration heuristic is constant per lane, so could use a map.
getHighestPriorityLanes(lane);var priority=return_highestLanePriority;if(priority>=InputContinuousLanePriority){// User interactions should expire slightly more quickly.
//
// NOTE: This is set to the corresponding constant as in Scheduler.js. When
// we made it larger, a product metric in www regressed, suggesting there's
// a user interaction that's being starved by a series of synchronous
// updates. If that theory is correct, the proper solution is to fix the
// starvation. However, this scenario supports the idea that expiration
// times are an important safeguard when starvation does happen.
//
// Also note that, in the case of user input specifically, this will soon no
// longer be an issue because we plan to make user input synchronous by
// default (until you enter `startTransition`, of course.)
//
// If weren't planning to make these updates synchronous soon anyway, I
// would probably make this number a configurable parameter.
return currentTime+250;}else if(priority>=TransitionPriority){return currentTime+5000;}else{// Anything idle priority or lower should never expire.
return NoTimestamp;}}function markStarvedLanesAsExpired(root,currentTime){// TODO: This gets called every time we yield. We can optimize by storing
// the earliest expiration time on the root. Then use that to quickly bail out
// of this function.
var pendingLanes=root.pendingLanes;var suspendedLanes=root.suspendedLanes;var pingedLanes=root.pingedLanes;var expirationTimes=root.expirationTimes;// Iterate through the pending lanes and check if we've reached their
// expiration time. If so, we'll assume the update is being starved and mark
// it as expired to force it to finish.
var lanes=pendingLanes;while(lanes>0){var index=pickArbitraryLaneIndex(lanes);var lane=1<<index;var expirationTime=expirationTimes[index];if(expirationTime===NoTimestamp){// Found a pending lane with no expiration time. If it's not suspended, or
// if it's pinged, assume it's CPU-bound. Compute a new expiration time
// using the current time.
if((lane&suspendedLanes)===NoLanes||(lane&pingedLanes)!==NoLanes){// Assumes timestamps are monotonically increasing.
expirationTimes[index]=computeExpirationTime(lane,currentTime);}}else if(expirationTime<=currentTime){// This lane expired
root.expiredLanes|=lane;}lanes&=~lane;}}// This returns the highest priority pending lanes regardless of whether they
// are suspended.
function getHighestPriorityPendingLanes(root){return getHighestPriorityLanes(root.pendingLanes);}function getLanesToRetrySynchronouslyOnError(root){var everythingButOffscreen=root.pendingLanes&~OffscreenLane;if(everythingButOffscreen!==NoLanes){return everythingButOffscreen;}if(everythingButOffscreen&OffscreenLane){return OffscreenLane;}return NoLanes;}function returnNextLanesPriority(){return return_highestLanePriority;}function includesNonIdleWork(lanes){return(lanes&NonIdleLanes)!==NoLanes;}function includesOnlyRetries(lanes){return(lanes&RetryLanes)===lanes;}function includesOnlyTransitions(lanes){return(lanes&TransitionLanes)===lanes;}// To ensure consistency across multiple updates in the same event, this should
// be a pure function, so that it always returns the same lane for given inputs.
function findUpdateLane(lanePriority,wipLanes){switch(lanePriority){case NoLanePriority:break;case SyncLanePriority:return SyncLane;case SyncBatchedLanePriority:return SyncBatchedLane;case InputDiscreteLanePriority:{var _lane=pickArbitraryLane(InputDiscreteLanes&~wipLanes);if(_lane===NoLane){// Shift to the next priority level
return findUpdateLane(InputContinuousLanePriority,wipLanes);}return _lane;}case InputContinuousLanePriority:{var _lane2=pickArbitraryLane(InputContinuousLanes&~wipLanes);if(_lane2===NoLane){// Shift to the next priority level
return findUpdateLane(DefaultLanePriority,wipLanes);}return _lane2;}case DefaultLanePriority:{var _lane3=pickArbitraryLane(DefaultLanes&~wipLanes);if(_lane3===NoLane){// If all the default lanes are already being worked on, look for a
// lane in the transition range.
_lane3=pickArbitraryLane(TransitionLanes&~wipLanes);if(_lane3===NoLane){// All the transition lanes are taken, too. This should be very
// rare, but as a last resort, pick a default lane. This will have
// the effect of interrupting the current work-in-progress render.
_lane3=pickArbitraryLane(DefaultLanes);}}return _lane3;}case TransitionPriority:// Should be handled by findTransitionLane instead
case RetryLanePriority:// Should be handled by findRetryLane instead
break;case IdleLanePriority:var lane=pickArbitraryLane(IdleLanes&~wipLanes);if(lane===NoLane){lane=pickArbitraryLane(IdleLanes);}return lane;}{{throw Error("Invalid update priority: "+lanePriority+". This is a bug in React.");}}}// To ensure consistency across multiple updates in the same event, this should
// be pure function, so that it always returns the same lane for given inputs.
function findTransitionLane(wipLanes,pendingLanes){// First look for lanes that are completely unclaimed, i.e. have no
// pending work.
var lane=pickArbitraryLane(TransitionLanes&~pendingLanes);if(lane===NoLane){// If all lanes have pending work, look for a lane that isn't currently
// being worked on.
lane=pickArbitraryLane(TransitionLanes&~wipLanes);if(lane===NoLane){// If everything is being worked on, pick any lane. This has the
// effect of interrupting the current work-in-progress.
lane=pickArbitraryLane(TransitionLanes);}}return lane;}// To ensure consistency across multiple updates in the same event, this should
// be pure function, so that it always returns the same lane for given inputs.
function findRetryLane(wipLanes){// This is a fork of `findUpdateLane` designed specifically for Suspense
// "retries" — a special update that attempts to flip a Suspense boundary
// from its placeholder state to its primary/resolved state.
var lane=pickArbitraryLane(RetryLanes&~wipLanes);if(lane===NoLane){lane=pickArbitraryLane(RetryLanes);}return lane;}function getHighestPriorityLane(lanes){return lanes&-lanes;}function getLowestPriorityLane(lanes){// This finds the most significant non-zero bit.
var index=31-clz32(lanes);return index<0?NoLanes:1<<index;}function getEqualOrHigherPriorityLanes(lanes){return(getLowestPriorityLane(lanes)<<1)-1;}function pickArbitraryLane(lanes){// This wrapper function gets inlined. Only exists so to communicate that it
// doesn't matter which bit is selected; you can pick any bit without
// affecting the algorithms where its used. Here I'm using
// getHighestPriorityLane because it requires the fewest operations.
return getHighestPriorityLane(lanes);}function pickArbitraryLaneIndex(lanes){return 31-clz32(lanes);}function laneToIndex(lane){return pickArbitraryLaneIndex(lane);}function includesSomeLane(a,b){return(a&b)!==NoLanes;}function isSubsetOfLanes(set,subset){return(set&subset)===subset;}function mergeLanes(a,b){return a|b;}function removeLanes(set,subset){return set&~subset;}// Seems redundant, but it changes the type from a single lane (used for
// updates) to a group of lanes (used for flushing work).
function laneToLanes(lane){return lane;}function higherPriorityLane(a,b){// This works because the bit ranges decrease in priority as you go left.
return a!==NoLane&&a<b?a:b;}function createLaneMap(initial){// Intentionally pushing one by one.
// https://v8.dev/blog/elements-kinds#avoid-creating-holes
var laneMap=[];for(var i=0;i<TotalLanes;i++){laneMap.push(initial);}return laneMap;}function markRootUpdated(root,updateLane,eventTime){root.pendingLanes|=updateLane;// TODO: Theoretically, any update to any lane can unblock any other lane. But
// it's not practical to try every single possible combination. We need a
// heuristic to decide which lanes to attempt to render, and in which batches.
// For now, we use the same heuristic as in the old ExpirationTimes model:
// retry any lane at equal or lower priority, but don't try updates at higher
// priority without also including the lower priority updates. This works well
// when considering updates across different priority levels, but isn't
// sufficient for updates within the same priority, since we want to treat
// those updates as parallel.
// Unsuspend any update at equal or lower priority.
var higherPriorityLanes=updateLane-1;// Turns 0b1000 into 0b0111
root.suspendedLanes&=higherPriorityLanes;root.pingedLanes&=higherPriorityLanes;var eventTimes=root.eventTimes;var index=laneToIndex(updateLane);// We can always overwrite an existing timestamp because we prefer the most
// recent event, and we assume time is monotonically increasing.
eventTimes[index]=eventTime;}function markRootSuspended(root,suspendedLanes){root.suspendedLanes|=suspendedLanes;root.pingedLanes&=~suspendedLanes;// The suspended lanes are no longer CPU-bound. Clear their expiration times.
var expirationTimes=root.expirationTimes;var lanes=suspendedLanes;while(lanes>0){var index=pickArbitraryLaneIndex(lanes);var lane=1<<index;expirationTimes[index]=NoTimestamp;lanes&=~lane;}}function markRootPinged(root,pingedLanes,eventTime){root.pingedLanes|=root.suspendedLanes&pingedLanes;}function markRootExpired(root,expiredLanes){root.expiredLanes|=expiredLanes&root.pendingLanes;}function markDiscreteUpdatesExpired(root){root.expiredLanes|=InputDiscreteLanes&root.pendingLanes;}function hasDiscreteLanes(lanes){return(lanes&InputDiscreteLanes)!==NoLanes;}function markRootMutableRead(root,updateLane){root.mutableReadLanes|=updateLane&root.pendingLanes;}function markRootFinished(root,remainingLanes){var noLongerPendingLanes=root.pendingLanes&~remainingLanes;root.pendingLanes=remainingLanes;// Let's try everything again
root.suspendedLanes=0;root.pingedLanes=0;root.expiredLanes&=remainingLanes;root.mutableReadLanes&=remainingLanes;root.entangledLanes&=remainingLanes;var entanglements=root.entanglements;var eventTimes=root.eventTimes;var expirationTimes=root.expirationTimes;// Clear the lanes that no longer have pending work
var lanes=noLongerPendingLanes;while(lanes>0){var index=pickArbitraryLaneIndex(lanes);var lane=1<<index;entanglements[index]=NoLanes;eventTimes[index]=NoTimestamp;expirationTimes[index]=NoTimestamp;lanes&=~lane;}}function markRootEntangled(root,entangledLanes){root.entangledLanes|=entangledLanes;var entanglements=root.entanglements;var lanes=entangledLanes;while(lanes>0){var index=pickArbitraryLaneIndex(lanes);var lane=1<<index;entanglements[index]|=entangledLanes;lanes&=~lane;}}var clz32=Math.clz32?Math.clz32:clz32Fallback;// Count leading zeros. Only used on lanes, so assume input is an integer.
// Based on:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
var log=Math.log;var LN2=Math.LN2;function clz32Fallback(lanes){if(lanes===0){return 32;}return 31-(log(lanes)/LN2|0)|0;}var Scheduler_runWithPriority=Scheduler.unstable_runWithPriority,Scheduler_scheduleCallback=Scheduler.unstable_scheduleCallback,Scheduler_cancelCallback=Scheduler.unstable_cancelCallback,Scheduler_shouldYield=Scheduler.unstable_shouldYield,Scheduler_requestPaint=Scheduler.unstable_requestPaint,Scheduler_now$1=Scheduler.unstable_now,Scheduler_getCurrentPriorityLevel=Scheduler.unstable_getCurrentPriorityLevel,Scheduler_ImmediatePriority=Scheduler.unstable_ImmediatePriority,Scheduler_UserBlockingPriority=Scheduler.unstable_UserBlockingPriority,Scheduler_NormalPriority=Scheduler.unstable_NormalPriority,Scheduler_LowPriority=Scheduler.unstable_LowPriority,Scheduler_IdlePriority=Scheduler.unstable_IdlePriority;{// Provide explicit error message when production+profiling bundle of e.g.
// react-dom is used with production (non-profiling) bundle of
// scheduler/tracing
if(!(tracing.__interactionsRef!=null&&tracing.__interactionsRef.current!=null)){{throw Error("It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at https://reactjs.org/link/profiling");}}}var fakeCallbackNode={};// Except for NoPriority, these correspond to Scheduler priorities. We use
// ascending numbers so we can compare them like numbers. They start at 90 to
// avoid clashing with Scheduler's priorities.
var ImmediatePriority$1=99;var UserBlockingPriority$1=98;var NormalPriority$1=97;var LowPriority$1=96;var IdlePriority$1=95;// NoPriority is the absence of priority. Also React-only.
var NoPriority$1=90;var shouldYield=Scheduler_shouldYield;var requestPaint=// Fall back gracefully if we're running an older version of Scheduler.
Scheduler_requestPaint!==undefined?Scheduler_requestPaint:function(){};var syncQueue=null;var immediateQueueCallbackNode=null;var isFlushingSyncQueue=false;var initialTimeMs$1=Scheduler_now$1();// If the initial timestamp is reasonably small, use Scheduler's `now` directly.
// This will be the case for modern browsers that support `performance.now`. In
// older browsers, Scheduler falls back to `Date.now`, which returns a Unix
// timestamp. In that case, subtract the module initialization time to simulate
// the behavior of performance.now and keep our times small enough to fit
// within 32 bits.
// TODO: Consider lifting this into Scheduler.
var now$1=initialTimeMs$1<10000?Scheduler_now$1:function(){return Scheduler_now$1()-initialTimeMs$1;};function getCurrentPriorityLevel(){switch(Scheduler_getCurrentPriorityLevel()){case Scheduler_ImmediatePriority:return ImmediatePriority$1;case Scheduler_UserBlockingPriority:return UserBlockingPriority$1;case Scheduler_NormalPriority:return NormalPriority$1;case Scheduler_LowPriority:return LowPriority$1;case Scheduler_IdlePriority:return IdlePriority$1;default:{{throw Error("Unknown priority level.");}}}}function reactPriorityToSchedulerPriority(reactPriorityLevel){switch(reactPriorityLevel){case ImmediatePriority$1:return Scheduler_ImmediatePriority;case UserBlockingPriority$1:return Scheduler_UserBlockingPriority;case NormalPriority$1:return Scheduler_NormalPriority;case LowPriority$1:return Scheduler_LowPriority;case IdlePriority$1:return Scheduler_IdlePriority;default:{{throw Error("Unknown priority level.");}}}}function runWithPriority(reactPriorityLevel,fn){var priorityLevel=reactPriorityToSchedulerPriority(reactPriorityLevel);return Scheduler_runWithPriority(priorityLevel,fn);}function scheduleCallback(reactPriorityLevel,callback,options){var priorityLevel=reactPriorityToSchedulerPriority(reactPriorityLevel);return Scheduler_scheduleCallback(priorityLevel,callback,options);}function scheduleSyncCallback(callback){// Push this callback into an internal queue. We'll flush these either in
// the next tick, or earlier if something calls `flushSyncCallbackQueue`.
if(syncQueue===null){syncQueue=[callback];// Flush the queue in the next tick, at the earliest.
immediateQueueCallbackNode=Scheduler_scheduleCallback(Scheduler_ImmediatePriority,flushSyncCallbackQueueImpl);}else{// Push onto existing queue. Don't need to schedule a callback because
// we already scheduled one when we created the queue.
syncQueue.push(callback);}return fakeCallbackNode;}function cancelCallback(callbackNode){if(callbackNode!==fakeCallbackNode){Scheduler_cancelCallback(callbackNode);}}function flushSyncCallbackQueue(){if(immediateQueueCallbackNode!==null){var node=immediateQueueCallbackNode;immediateQueueCallbackNode=null;Scheduler_cancelCallback(node);}flushSyncCallbackQueueImpl();}function flushSyncCallbackQueueImpl(){if(!isFlushingSyncQueue&&syncQueue!==null){// Prevent re-entrancy.
isFlushingSyncQueue=true;var i=0;{try{var _isSync2=true;var _queue=syncQueue;runWithPriority(ImmediatePriority$1,function(){for(;i<_queue.length;i++){var callback=_queue[i];do{callback=callback(_isSync2);}while(callback!==null);}});syncQueue=null;}catch(error){// If something throws, leave the remaining callbacks on the queue.
if(syncQueue!==null){syncQueue=syncQueue.slice(i+1);}// Resume flushing in the next tick
Scheduler_scheduleCallback(Scheduler_ImmediatePriority,flushSyncCallbackQueue);throw error;}finally{isFlushingSyncQueue=false;}}}}var NoMode=0;var StrictMode=1;// TODO: Remove BlockingMode and ConcurrentMode by reading from the root
// tag instead
var BlockingMode=2;var ConcurrentMode=4;var ProfileMode=8;var DebugTracingMode=16;var ReactCurrentBatchConfig=ReactSharedInternals.ReactCurrentBatchConfig;var NoTransition=0;function requestCurrentTransition(){return ReactCurrentBatchConfig.transition;}/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */function is(x,y){return x===y&&(x!==0||1/x===1/y)||x!==x&&y!==y// eslint-disable-line no-self-compare
;}var objectIs=typeof Object.is==='function'?Object.is:is;var hasOwnProperty=Object.prototype.hasOwnProperty;/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */function shallowEqual(objA,objB){if(objectIs(objA,objB)){return true;}if(typeof objA!=='object'||objA===null||typeof objB!=='object'||objB===null){return false;}var keysA=Object.keys(objA);var keysB=Object.keys(objB);if(keysA.length!==keysB.length){return false;}// Test for A's keys different from B.
for(var i=0;i<keysA.length;i++){if(!hasOwnProperty.call(objB,keysA[i])||!objectIs(objA[keysA[i]],objB[keysA[i]])){return false;}}return true;}function describeFiber(fiber){var owner=fiber._debugOwner?fiber._debugOwner.type:null;var source=fiber._debugSource;switch(fiber.tag){case HostComponent:return describeBuiltInComponentFrame(fiber.type);case LazyComponent:return describeBuiltInComponentFrame('Lazy');case SuspenseComponent:return describeBuiltInComponentFrame('Suspense');case SuspenseListComponent:return describeBuiltInComponentFrame('SuspenseList');case FunctionComponent:case IndeterminateComponent:case SimpleMemoComponent:return describeFunctionComponentFrame(fiber.type);case ForwardRef:return describeFunctionComponentFrame(fiber.type.render);case Block:return describeFunctionComponentFrame(fiber.type._render);case ClassComponent:return describeClassComponentFrame(fiber.type);default:return'';}}function getStackByFiberInDevAndProd(workInProgress){try{var info='';var node=workInProgress;do{info+=describeFiber(node);node=node.return;}while(node);return info;}catch(x){return'\nError generating stack: '+x.message+'\n'+x.stack;}}var ReactDebugCurrentFrame$1=ReactSharedInternals.ReactDebugCurrentFrame;var current=null;var isRendering=false;function getCurrentFiberOwnerNameInDevOrNull(){{if(current===null){return null;}var owner=current._debugOwner;if(owner!==null&&typeof owner!=='undefined'){return getComponentName(owner.type);}}return null;}function getCurrentFiberStackInDev(){{if(current===null){return'';}// Safe because if current fiber exists, we are reconciling,
// and it is guaranteed to be the work-in-progress version.
return getStackByFiberInDevAndProd(current);}}function resetCurrentFiber(){{ReactDebugCurrentFrame$1.getCurrentStack=null;current=null;isRendering=false;}}function setCurrentFiber(fiber){{ReactDebugCurrentFrame$1.getCurrentStack=getCurrentFiberStackInDev;current=fiber;isRendering=false;}}function setIsRendering(rendering){{isRendering=rendering;}}function getIsRendering(){{return isRendering;}}var ReactStrictModeWarnings={recordUnsafeLifecycleWarnings:function recordUnsafeLifecycleWarnings(fiber,instance){},flushPendingUnsafeLifecycleWarnings:function flushPendingUnsafeLifecycleWarnings(){},recordLegacyContextWarning:function recordLegacyContextWarning(fiber,instance){},flushLegacyContextWarning:function flushLegacyContextWarning(){},discardPendingWarnings:function discardPendingWarnings(){}};{var findStrictRoot=function findStrictRoot(fiber){var maybeStrictRoot=null;var node=fiber;while(node!==null){if(node.mode&StrictMode){maybeStrictRoot=node;}node=node.return;}return maybeStrictRoot;};var setToSortedString=function setToSortedString(set){var array=[];set.forEach(function(value){array.push(value);});return array.sort().join(', ');};var pendingComponentWillMountWarnings=[];var pendingUNSAFE_ComponentWillMountWarnings=[];var pendingComponentWillReceivePropsWarnings=[];var pendingUNSAFE_ComponentWillReceivePropsWarnings=[];var pendingComponentWillUpdateWarnings=[];var pendingUNSAFE_ComponentWillUpdateWarnings=[];// Tracks components we have already warned about.
var didWarnAboutUnsafeLifecycles=new Set();ReactStrictModeWarnings.recordUnsafeLifecycleWarnings=function(fiber,instance){// Dedup strategy: Warn once per component.
if(didWarnAboutUnsafeLifecycles.has(fiber.type)){return;}if(typeof instance.componentWillMount==='function'&&// Don't warn about react-lifecycles-compat polyfilled components.
instance.componentWillMount.__suppressDeprecationWarning!==true){pendingComponentWillMountWarnings.push(fiber);}if(fiber.mode&StrictMode&&typeof instance.UNSAFE_componentWillMount==='function'){pendingUNSAFE_ComponentWillMountWarnings.push(fiber);}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true){pendingComponentWillReceivePropsWarnings.push(fiber);}if(fiber.mode&StrictMode&&typeof instance.UNSAFE_componentWillReceiveProps==='function'){pendingUNSAFE_ComponentWillReceivePropsWarnings.push(fiber);}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true){pendingComponentWillUpdateWarnings.push(fiber);}if(fiber.mode&StrictMode&&typeof instance.UNSAFE_componentWillUpdate==='function'){pendingUNSAFE_ComponentWillUpdateWarnings.push(fiber);}};ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings=function(){// We do an initial pass to gather component names
var componentWillMountUniqueNames=new Set();if(pendingComponentWillMountWarnings.length>0){pendingComponentWillMountWarnings.forEach(function(fiber){componentWillMountUniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});pendingComponentWillMountWarnings=[];}var UNSAFE_componentWillMountUniqueNames=new Set();if(pendingUNSAFE_ComponentWillMountWarnings.length>0){pendingUNSAFE_ComponentWillMountWarnings.forEach(function(fiber){UNSAFE_componentWillMountUniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});pendingUNSAFE_ComponentWillMountWarnings=[];}var componentWillReceivePropsUniqueNames=new Set();if(pendingComponentWillReceivePropsWarnings.length>0){pendingComponentWillReceivePropsWarnings.forEach(function(fiber){componentWillReceivePropsUniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});pendingComponentWillReceivePropsWarnings=[];}var UNSAFE_componentWillReceivePropsUniqueNames=new Set();if(pendingUNSAFE_ComponentWillReceivePropsWarnings.length>0){pendingUNSAFE_ComponentWillReceivePropsWarnings.forEach(function(fiber){UNSAFE_componentWillReceivePropsUniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});pendingUNSAFE_ComponentWillReceivePropsWarnings=[];}var componentWillUpdateUniqueNames=new Set();if(pendingComponentWillUpdateWarnings.length>0){pendingComponentWillUpdateWarnings.forEach(function(fiber){componentWillUpdateUniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});pendingComponentWillUpdateWarnings=[];}var UNSAFE_componentWillUpdateUniqueNames=new Set();if(pendingUNSAFE_ComponentWillUpdateWarnings.length>0){pendingUNSAFE_ComponentWillUpdateWarnings.forEach(function(fiber){UNSAFE_componentWillUpdateUniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutUnsafeLifecycles.add(fiber.type);});pendingUNSAFE_ComponentWillUpdateWarnings=[];}// Finally, we flush all the warnings
// UNSAFE_ ones before the deprecated ones, since they'll be 'louder'
if(UNSAFE_componentWillMountUniqueNames.size>0){var sortedNames=setToSortedString(UNSAFE_componentWillMountUniqueNames);error('Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. '+'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n'+'* Move code with side effects to componentDidMount, and set initial state in the constructor.\n'+'\nPlease update the following components: %s',sortedNames);}if(UNSAFE_componentWillReceivePropsUniqueNames.size>0){var _sortedNames=setToSortedString(UNSAFE_componentWillReceivePropsUniqueNames);error('Using UNSAFE_componentWillReceiveProps in strict mode is not recommended '+'and may indicate bugs in your code. '+'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n'+'* Move data fetching code or side effects to componentDidUpdate.\n'+"* If you're updating state whenever props change, "+'refactor your code to use memoization techniques or move it to '+'static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n'+'\nPlease update the following components: %s',_sortedNames);}if(UNSAFE_componentWillUpdateUniqueNames.size>0){var _sortedNames2=setToSortedString(UNSAFE_componentWillUpdateUniqueNames);error('Using UNSAFE_componentWillUpdate in strict mode is not recommended '+'and may indicate bugs in your code. '+'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n'+'* Move data fetching code or side effects to componentDidUpdate.\n'+'\nPlease update the following components: %s',_sortedNames2);}if(componentWillMountUniqueNames.size>0){var _sortedNames3=setToSortedString(componentWillMountUniqueNames);warn('componentWillMount has been renamed, and is not recommended for use. '+'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n'+'* Move code with side effects to componentDidMount, and set initial state in the constructor.\n'+'* Rename componentWillMount to UNSAFE_componentWillMount to suppress '+'this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. '+'To rename all deprecated lifecycles to their new names, you can run '+'`npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n'+'\nPlease update the following components: %s',_sortedNames3);}if(componentWillReceivePropsUniqueNames.size>0){var _sortedNames4=setToSortedString(componentWillReceivePropsUniqueNames);warn('componentWillReceiveProps has been renamed, and is not recommended for use. '+'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n'+'* Move data fetching code or side effects to componentDidUpdate.\n'+"* If you're updating state whenever props change, refactor your "+'code to use memoization techniques or move it to '+'static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n'+'* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress '+'this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. '+'To rename all deprecated lifecycles to their new names, you can run '+'`npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n'+'\nPlease update the following components: %s',_sortedNames4);}if(componentWillUpdateUniqueNames.size>0){var _sortedNames5=setToSortedString(componentWillUpdateUniqueNames);warn('componentWillUpdate has been renamed, and is not recommended for use. '+'See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n'+'* Move data fetching code or side effects to componentDidUpdate.\n'+'* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress '+'this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. '+'To rename all deprecated lifecycles to their new names, you can run '+'`npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n'+'\nPlease update the following components: %s',_sortedNames5);}};var pendingLegacyContextWarning=new Map();// Tracks components we have already warned about.
var didWarnAboutLegacyContext=new Set();ReactStrictModeWarnings.recordLegacyContextWarning=function(fiber,instance){var strictRoot=findStrictRoot(fiber);if(strictRoot===null){error('Expected to find a StrictMode component in a strict mode tree. '+'This error is likely caused by a bug in React. Please file an issue.');return;}// Dedup strategy: Warn once per component.
if(didWarnAboutLegacyContext.has(fiber.type)){return;}var warningsForRoot=pendingLegacyContextWarning.get(strictRoot);if(fiber.type.contextTypes!=null||fiber.type.childContextTypes!=null||instance!==null&&typeof instance.getChildContext==='function'){if(warningsForRoot===undefined){warningsForRoot=[];pendingLegacyContextWarning.set(strictRoot,warningsForRoot);}warningsForRoot.push(fiber);}};ReactStrictModeWarnings.flushLegacyContextWarning=function(){pendingLegacyContextWarning.forEach(function(fiberArray,strictRoot){if(fiberArray.length===0){return;}var firstFiber=fiberArray[0];var uniqueNames=new Set();fiberArray.forEach(function(fiber){uniqueNames.add(getComponentName(fiber.type)||'Component');didWarnAboutLegacyContext.add(fiber.type);});var sortedNames=setToSortedString(uniqueNames);try{setCurrentFiber(firstFiber);error('Legacy context API has been detected within a strict-mode tree.'+'\n\nThe old API will be supported in all 16.x releases, but applications '+'using it should migrate to the new version.'+'\n\nPlease update the following components: %s'+'\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context',sortedNames);}finally{resetCurrentFiber();}});};ReactStrictModeWarnings.discardPendingWarnings=function(){pendingComponentWillMountWarnings=[];pendingUNSAFE_ComponentWillMountWarnings=[];pendingComponentWillReceivePropsWarnings=[];pendingUNSAFE_ComponentWillReceivePropsWarnings=[];pendingComponentWillUpdateWarnings=[];pendingUNSAFE_ComponentWillUpdateWarnings=[];pendingLegacyContextWarning=new Map();};}function resolveDefaultProps(Component,baseProps){if(Component&&Component.defaultProps){// Resolve default props. Taken from ReactElement
var props=_assign({},baseProps);var defaultProps=Component.defaultProps;for(var propName in defaultProps){if(props[propName]===undefined){props[propName]=defaultProps[propName];}}return props;}return baseProps;}// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var MAX_SIGNED_31_BIT_INT=1073741823;var valueCursor=createCursor(null);var rendererSigil;{// Use this to detect multiple renderers using the same context
rendererSigil={};}var currentlyRenderingFiber=null;var lastContextDependency=null;var lastContextWithAllBitsObserved=null;var isDisallowedContextReadInDEV=false;function resetContextDependencies(){// This is called right before React yields execution, to ensure `readContext`
// cannot be called outside the render phase.
currentlyRenderingFiber=null;lastContextDependency=null;lastContextWithAllBitsObserved=null;{isDisallowedContextReadInDEV=false;}}function enterDisallowedContextReadInDEV(){{isDisallowedContextReadInDEV=true;}}function exitDisallowedContextReadInDEV(){{isDisallowedContextReadInDEV=false;}}function pushProvider(providerFiber,nextValue){var context=providerFiber.type._context;if(isPrimaryRenderer){push(valueCursor,context._currentValue,providerFiber);context._currentValue=nextValue;{if(context._currentRenderer!==undefined&&context._currentRenderer!==null&&context._currentRenderer!==rendererSigil){error('Detected multiple renderers concurrently rendering the '+'same context provider. This is currently unsupported.');}context._currentRenderer=rendererSigil;}}else{push(valueCursor,context._currentValue2,providerFiber);context._currentValue2=nextValue;{if(context._currentRenderer2!==undefined&&context._currentRenderer2!==null&&context._currentRenderer2!==rendererSigil){error('Detected multiple renderers concurrently rendering the '+'same context provider. This is currently unsupported.');}context._currentRenderer2=rendererSigil;}}}function popProvider(providerFiber){var currentValue=valueCursor.current;pop(valueCursor,providerFiber);var context=providerFiber.type._context;if(isPrimaryRenderer){context._currentValue=currentValue;}else{context._currentValue2=currentValue;}}function calculateChangedBits(context,newValue,oldValue){if(objectIs(oldValue,newValue)){// No change
return 0;}else{var changedBits=typeof context._calculateChangedBits==='function'?context._calculateChangedBits(oldValue,newValue):MAX_SIGNED_31_BIT_INT;{if((changedBits&MAX_SIGNED_31_BIT_INT)!==changedBits){error('calculateChangedBits: Expected the return value to be a '+'31-bit integer. Instead received: %s',changedBits);}}return changedBits|0;}}function scheduleWorkOnParentPath(parent,renderLanes){// Update the child lanes of all the ancestors, including the alternates.
var node=parent;while(node!==null){var alternate=node.alternate;if(!isSubsetOfLanes(node.childLanes,renderLanes)){node.childLanes=mergeLanes(node.childLanes,renderLanes);if(alternate!==null){alternate.childLanes=mergeLanes(alternate.childLanes,renderLanes);}}else if(alternate!==null&&!isSubsetOfLanes(alternate.childLanes,renderLanes)){alternate.childLanes=mergeLanes(alternate.childLanes,renderLanes);}else{// Neither alternate was updated, which means the rest of the
// ancestor path already has sufficient priority.
break;}node=node.return;}}function propagateContextChange(workInProgress,context,changedBits,renderLanes){var fiber=workInProgress.child;if(fiber!==null){// Set the return pointer of the child to the work-in-progress fiber.
fiber.return=workInProgress;}while(fiber!==null){var nextFiber=void 0;// Visit this fiber.
var list=fiber.dependencies;if(list!==null){nextFiber=fiber.child;var dependency=list.firstContext;while(dependency!==null){// Check if the context matches.
if(dependency.context===context&&(dependency.observedBits&changedBits)!==0){// Match! Schedule an update on this fiber.
if(fiber.tag===ClassComponent){// Schedule a force update on the work-in-progress.
var update=createUpdate(NoTimestamp,pickArbitraryLane(renderLanes));update.tag=ForceUpdate;// TODO: Because we don't have a work-in-progress, this will add the
// update to the current fiber, too, which means it will persist even if
// this render is thrown away. Since it's a race condition, not sure it's
// worth fixing.
enqueueUpdate(fiber,update);}fiber.lanes=mergeLanes(fiber.lanes,renderLanes);var alternate=fiber.alternate;if(alternate!==null){alternate.lanes=mergeLanes(alternate.lanes,renderLanes);}scheduleWorkOnParentPath(fiber.return,renderLanes);// Mark the updated lanes on the list, too.
list.lanes=mergeLanes(list.lanes,renderLanes);// Since we already found a match, we can stop traversing the
// dependency list.
break;}dependency=dependency.next;}}else if(fiber.tag===ContextProvider){// Don't scan deeper if this is a matching provider
nextFiber=fiber.type===workInProgress.type?null:fiber.child;}else{// Traverse down.
nextFiber=fiber.child;}if(nextFiber!==null){// Set the return pointer of the child to the work-in-progress fiber.
nextFiber.return=fiber;}else{// No child. Traverse to next sibling.
nextFiber=fiber;while(nextFiber!==null){if(nextFiber===workInProgress){// We're back to the root of this subtree. Exit.
nextFiber=null;break;}var sibling=nextFiber.sibling;if(sibling!==null){// Set the return pointer of the sibling to the work-in-progress fiber.
sibling.return=nextFiber.return;nextFiber=sibling;break;}// No more siblings. Traverse up.
nextFiber=nextFiber.return;}}fiber=nextFiber;}}function prepareToReadContext(workInProgress,renderLanes){currentlyRenderingFiber=workInProgress;lastContextDependency=null;lastContextWithAllBitsObserved=null;var dependencies=workInProgress.dependencies;if(dependencies!==null){var firstContext=dependencies.firstContext;if(firstContext!==null){if(includesSomeLane(dependencies.lanes,renderLanes)){// Context list has a pending update. Mark that this fiber performed work.
markWorkInProgressReceivedUpdate();}// Reset the work-in-progress list
dependencies.firstContext=null;}}}function _readContext(context,observedBits){{// This warning would fire if you read context inside a Hook like useMemo.
// Unlike the class check below, it's not enforced in production for perf.
if(isDisallowedContextReadInDEV){error('Context can only be read while React is rendering. '+'In classes, you can read it in the render method or getDerivedStateFromProps. '+'In function components, you can read it directly in the function body, but not '+'inside Hooks like useReducer() or useMemo().');}}if(lastContextWithAllBitsObserved===context);else if(observedBits===false||observedBits===0);else{var resolvedObservedBits;// Avoid deopting on observable arguments or heterogeneous types.
if(typeof observedBits!=='number'||observedBits===MAX_SIGNED_31_BIT_INT){// Observe all updates.
lastContextWithAllBitsObserved=context;resolvedObservedBits=MAX_SIGNED_31_BIT_INT;}else{resolvedObservedBits=observedBits;}var contextItem={context:context,observedBits:resolvedObservedBits,next:null};if(lastContextDependency===null){if(!(currentlyRenderingFiber!==null)){{throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");}}// This is the first dependency for this component. Create a new list.
lastContextDependency=contextItem;currentlyRenderingFiber.dependencies={lanes:NoLanes,firstContext:contextItem,responders:null};}else{// Append a new context item.
lastContextDependency=lastContextDependency.next=contextItem;}}return isPrimaryRenderer?context._currentValue:context._currentValue2;}var UpdateState=0;var ReplaceState=1;var ForceUpdate=2;var CaptureUpdate=3;// Global state that is reset at the beginning of calling `processUpdateQueue`.
// It should only be read right after calling `processUpdateQueue`, via
// `checkHasForceUpdateAfterProcessing`.
var hasForceUpdate=false;var didWarnUpdateInsideUpdate;var currentlyProcessingQueue;{didWarnUpdateInsideUpdate=false;currentlyProcessingQueue=null;}function initializeUpdateQueue(fiber){var queue={baseState:fiber.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null};fiber.updateQueue=queue;}function cloneUpdateQueue(current,workInProgress){// Clone the update queue from current. Unless it's already a clone.
var queue=workInProgress.updateQueue;var currentQueue=current.updateQueue;if(queue===currentQueue){var clone={baseState:currentQueue.baseState,firstBaseUpdate:currentQueue.firstBaseUpdate,lastBaseUpdate:currentQueue.lastBaseUpdate,shared:currentQueue.shared,effects:currentQueue.effects};workInProgress.updateQueue=clone;}}function createUpdate(eventTime,lane){var update={eventTime:eventTime,lane:lane,tag:UpdateState,payload:null,callback:null,next:null};return update;}function enqueueUpdate(fiber,update){var updateQueue=fiber.updateQueue;if(updateQueue===null){// Only occurs if the fiber has been unmounted.
return;}var sharedQueue=updateQueue.shared;var pending=sharedQueue.pending;if(pending===null){// This is the first update. Create a circular list.
update.next=update;}else{update.next=pending.next;pending.next=update;}sharedQueue.pending=update;{if(currentlyProcessingQueue===sharedQueue&&!didWarnUpdateInsideUpdate){error('An update (setState, replaceState, or forceUpdate) was scheduled '+'from inside an update function. Update functions should be pure, '+'with zero side-effects. Consider using componentDidUpdate or a '+'callback.');didWarnUpdateInsideUpdate=true;}}}function enqueueCapturedUpdate(workInProgress,capturedUpdate){// Captured updates are updates that are thrown by a child during the render
// phase. They should be discarded if the render is aborted. Therefore,
// we should only put them on the work-in-progress queue, not the current one.
var queue=workInProgress.updateQueue;// Check if the work-in-progress queue is a clone.
var current=workInProgress.alternate;if(current!==null){var currentQueue=current.updateQueue;if(queue===currentQueue){// The work-in-progress queue is the same as current. This happens when
// we bail out on a parent fiber that then captures an error thrown by
// a child. Since we want to append the update only to the work-in
// -progress queue, we need to clone the updates. We usually clone during
// processUpdateQueue, but that didn't happen in this case because we
// skipped over the parent when we bailed out.
var newFirst=null;var newLast=null;var firstBaseUpdate=queue.firstBaseUpdate;if(firstBaseUpdate!==null){// Loop through the updates and clone them.
var update=firstBaseUpdate;do{var clone={eventTime:update.eventTime,lane:update.lane,tag:update.tag,payload:update.payload,callback:update.callback,next:null};if(newLast===null){newFirst=newLast=clone;}else{newLast.next=clone;newLast=clone;}update=update.next;}while(update!==null);// Append the captured update the end of the cloned list.
if(newLast===null){newFirst=newLast=capturedUpdate;}else{newLast.next=capturedUpdate;newLast=capturedUpdate;}}else{// There are no base updates.
newFirst=newLast=capturedUpdate;}queue={baseState:currentQueue.baseState,firstBaseUpdate:newFirst,lastBaseUpdate:newLast,shared:currentQueue.shared,effects:currentQueue.effects};workInProgress.updateQueue=queue;return;}}// Append the update to the end of the list.
var lastBaseUpdate=queue.lastBaseUpdate;if(lastBaseUpdate===null){queue.firstBaseUpdate=capturedUpdate;}else{lastBaseUpdate.next=capturedUpdate;}queue.lastBaseUpdate=capturedUpdate;}function getStateFromUpdate(workInProgress,queue,update,prevState,nextProps,instance){switch(update.tag){case ReplaceState:{var payload=update.payload;if(typeof payload==='function'){// Updater function
{enterDisallowedContextReadInDEV();}var nextState=payload.call(instance,prevState,nextProps);{if(workInProgress.mode&StrictMode){disableLogs();try{payload.call(instance,prevState,nextProps);}finally{reenableLogs();}}exitDisallowedContextReadInDEV();}return nextState;}// State object
return payload;}case CaptureUpdate:{workInProgress.flags=workInProgress.flags&~ShouldCapture|DidCapture;}// Intentional fallthrough
case UpdateState:{var _payload=update.payload;var partialState;if(typeof _payload==='function'){// Updater function
{enterDisallowedContextReadInDEV();}partialState=_payload.call(instance,prevState,nextProps);{if(workInProgress.mode&StrictMode){disableLogs();try{_payload.call(instance,prevState,nextProps);}finally{reenableLogs();}}exitDisallowedContextReadInDEV();}}else{// Partial state object
partialState=_payload;}if(partialState===null||partialState===undefined){// Null and undefined are treated as no-ops.
return prevState;}// Merge the partial state and the previous state.
return _assign({},prevState,partialState);}case ForceUpdate:{hasForceUpdate=true;return prevState;}}return prevState;}function processUpdateQueue(workInProgress,props,instance,renderLanes){// This is always non-null on a ClassComponent or HostRoot
var queue=workInProgress.updateQueue;hasForceUpdate=false;{currentlyProcessingQueue=queue.shared;}var firstBaseUpdate=queue.firstBaseUpdate;var lastBaseUpdate=queue.lastBaseUpdate;// Check if there are pending updates. If so, transfer them to the base queue.
var pendingQueue=queue.shared.pending;if(pendingQueue!==null){queue.shared.pending=null;// The pending queue is circular. Disconnect the pointer between first
// and last so that it's non-circular.
var lastPendingUpdate=pendingQueue;var firstPendingUpdate=lastPendingUpdate.next;lastPendingUpdate.next=null;// Append pending updates to base queue
if(lastBaseUpdate===null){firstBaseUpdate=firstPendingUpdate;}else{lastBaseUpdate.next=firstPendingUpdate;}lastBaseUpdate=lastPendingUpdate;// If there's a current queue, and it's different from the base queue, then
// we need to transfer the updates to that queue, too. Because the base
// queue is a singly-linked list with no cycles, we can append to both
// lists and take advantage of structural sharing.
// TODO: Pass `current` as argument
var current=workInProgress.alternate;if(current!==null){// This is always non-null on a ClassComponent or HostRoot
var currentQueue=current.updateQueue;var currentLastBaseUpdate=currentQueue.lastBaseUpdate;if(currentLastBaseUpdate!==lastBaseUpdate){if(currentLastBaseUpdate===null){currentQueue.firstBaseUpdate=firstPendingUpdate;}else{currentLastBaseUpdate.next=firstPendingUpdate;}currentQueue.lastBaseUpdate=lastPendingUpdate;}}}// These values may change as we process the queue.
if(firstBaseUpdate!==null){// Iterate through the list of updates to compute the result.
var newState=queue.baseState;// TODO: Don't need to accumulate this. Instead, we can remove renderLanes
// from the original lanes.
var newLanes=NoLanes;var newBaseState=null;var newFirstBaseUpdate=null;var newLastBaseUpdate=null;var update=firstBaseUpdate;do{var updateLane=update.lane;var updateEventTime=update.eventTime;if(!isSubsetOfLanes(renderLanes,updateLane)){// Priority is insufficient. Skip this update. If this is the first
// skipped update, the previous update/state is the new base
// update/state.
var clone={eventTime:updateEventTime,lane:updateLane,tag:update.tag,payload:update.payload,callback:update.callback,next:null};if(newLastBaseUpdate===null){newFirstBaseUpdate=newLastBaseUpdate=clone;newBaseState=newState;}else{newLastBaseUpdate=newLastBaseUpdate.next=clone;}// Update the remaining priority in the queue.
newLanes=mergeLanes(newLanes,updateLane);}else{// This update does have sufficient priority.
if(newLastBaseUpdate!==null){var _clone={eventTime:updateEventTime,// This update is going to be committed so we never want uncommit
// it. Using NoLane works because 0 is a subset of all bitmasks, so
// this will never be skipped by the check above.
lane:NoLane,tag:update.tag,payload:update.payload,callback:update.callback,next:null};newLastBaseUpdate=newLastBaseUpdate.next=_clone;}// Process this update.
newState=getStateFromUpdate(workInProgress,queue,update,newState,props,instance);var callback=update.callback;if(callback!==null){workInProgress.flags|=Callback;var effects=queue.effects;if(effects===null){queue.effects=[update];}else{effects.push(update);}}}update=update.next;if(update===null){pendingQueue=queue.shared.pending;if(pendingQueue===null){break;}else{// An update was scheduled from inside a reducer. Add the new
// pending updates to the end of the list and keep processing.
var _lastPendingUpdate=pendingQueue;// Intentionally unsound. Pending updates form a circular list, but we
// unravel them when transferring them to the base queue.
var _firstPendingUpdate=_lastPendingUpdate.next;_lastPendingUpdate.next=null;update=_firstPendingUpdate;queue.lastBaseUpdate=_lastPendingUpdate;queue.shared.pending=null;}}}while(true);if(newLastBaseUpdate===null){newBaseState=newState;}queue.baseState=newBaseState;queue.firstBaseUpdate=newFirstBaseUpdate;queue.lastBaseUpdate=newLastBaseUpdate;// Set the remaining expiration time to be whatever is remaining in the queue.
// This should be fine because the only two other things that contribute to
// expiration time are props and context. We're already in the middle of the
// begin phase by the time we start processing the queue, so we've already
// dealt with the props. Context in components that specify
// shouldComponentUpdate is tricky; but we'll have to account for
// that regardless.
markSkippedUpdateLanes(newLanes);workInProgress.lanes=newLanes;workInProgress.memoizedState=newState;}{currentlyProcessingQueue=null;}}function callCallback(callback,context){if(!(typeof callback==='function')){{throw Error("Invalid argument passed as callback. Expected a function. Instead received: "+callback);}}callback.call(context);}function resetHasForceUpdateBeforeProcessing(){hasForceUpdate=false;}function checkHasForceUpdateAfterProcessing(){return hasForceUpdate;}function commitUpdateQueue(finishedWork,finishedQueue,instance){// Commit the effects
var effects=finishedQueue.effects;finishedQueue.effects=null;if(effects!==null){for(var i=0;i<effects.length;i++){var effect=effects[i];var callback=effect.callback;if(callback!==null){effect.callback=null;callCallback(callback,instance);}}}}var fakeInternalInstance={};var isArray=Array.isArray;// React.Component uses a shared frozen object by default.
// We'll use it to determine whether we need to initialize legacy refs.
var emptyRefsObject=new React.Component().refs;var didWarnAboutStateAssignmentForComponent;var didWarnAboutUninitializedState;var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;var didWarnAboutLegacyLifecyclesAndDerivedState;var didWarnAboutUndefinedDerivedState;var warnOnUndefinedDerivedState;var warnOnInvalidCallback;var didWarnAboutDirectlyAssigningPropsToState;var didWarnAboutContextTypeAndContextTypes;var didWarnAboutInvalidateContextType;{didWarnAboutStateAssignmentForComponent=new Set();didWarnAboutUninitializedState=new Set();didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate=new Set();didWarnAboutLegacyLifecyclesAndDerivedState=new Set();didWarnAboutDirectlyAssigningPropsToState=new Set();didWarnAboutUndefinedDerivedState=new Set();didWarnAboutContextTypeAndContextTypes=new Set();didWarnAboutInvalidateContextType=new Set();var didWarnOnInvalidCallback=new Set();warnOnInvalidCallback=function warnOnInvalidCallback(callback,callerName){if(callback===null||typeof callback==='function'){return;}var key=callerName+'_'+callback;if(!didWarnOnInvalidCallback.has(key)){didWarnOnInvalidCallback.add(key);error('%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback);}};warnOnUndefinedDerivedState=function warnOnUndefinedDerivedState(type,partialState){if(partialState===undefined){var componentName=getComponentName(type)||'Component';if(!didWarnAboutUndefinedDerivedState.has(componentName)){didWarnAboutUndefinedDerivedState.add(componentName);error('%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. '+'You have returned undefined.',componentName);}}};// This is so gross but it's at least non-critical and can be removed if
// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(fakeInternalInstance,'_processChildContext',{enumerable:false,value:function value(){{{throw Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");}}}});Object.freeze(fakeInternalInstance);}function applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,nextProps){var prevState=workInProgress.memoizedState;{if(workInProgress.mode&StrictMode){disableLogs();try{// Invoke the function an extra time to help detect side-effects.
getDerivedStateFromProps(nextProps,prevState);}finally{reenableLogs();}}}var partialState=getDerivedStateFromProps(nextProps,prevState);{warnOnUndefinedDerivedState(ctor,partialState);}// Merge the partial state and the previous state.
var memoizedState=partialState===null||partialState===undefined?prevState:_assign({},prevState,partialState);workInProgress.memoizedState=memoizedState;// Once the update queue is empty, persist the derived state onto the
// base state.
if(workInProgress.lanes===NoLanes){// Queue is always non-null for classes
var updateQueue=workInProgress.updateQueue;updateQueue.baseState=memoizedState;}}var classComponentUpdater={isMounted:isMounted,enqueueSetState:function enqueueSetState(inst,payload,callback){var fiber=get(inst);var eventTime=requestEventTime();var lane=requestUpdateLane(fiber);var update=createUpdate(eventTime,lane);update.payload=payload;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback(callback,'setState');}update.callback=callback;}enqueueUpdate(fiber,update);scheduleUpdateOnFiber(fiber,lane,eventTime);},enqueueReplaceState:function enqueueReplaceState(inst,payload,callback){var fiber=get(inst);var eventTime=requestEventTime();var lane=requestUpdateLane(fiber);var update=createUpdate(eventTime,lane);update.tag=ReplaceState;update.payload=payload;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback(callback,'replaceState');}update.callback=callback;}enqueueUpdate(fiber,update);scheduleUpdateOnFiber(fiber,lane,eventTime);},enqueueForceUpdate:function enqueueForceUpdate(inst,callback){var fiber=get(inst);var eventTime=requestEventTime();var lane=requestUpdateLane(fiber);var update=createUpdate(eventTime,lane);update.tag=ForceUpdate;if(callback!==undefined&&callback!==null){{warnOnInvalidCallback(callback,'forceUpdate');}update.callback=callback;}enqueueUpdate(fiber,update);scheduleUpdateOnFiber(fiber,lane,eventTime);}};function checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextContext){var instance=workInProgress.stateNode;if(typeof instance.shouldComponentUpdate==='function'){{if(workInProgress.mode&StrictMode){disableLogs();try{// Invoke the function an extra time to help detect side-effects.
instance.shouldComponentUpdate(newProps,newState,nextContext);}finally{reenableLogs();}}}var shouldUpdate=instance.shouldComponentUpdate(newProps,newState,nextContext);{if(shouldUpdate===undefined){error('%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',getComponentName(ctor)||'Component');}}return shouldUpdate;}if(ctor.prototype&&ctor.prototype.isPureReactComponent){return!shallowEqual(oldProps,newProps)||!shallowEqual(oldState,newState);}return true;}function checkClassInstance(workInProgress,ctor,newProps){var instance=workInProgress.stateNode;{var name=getComponentName(ctor)||'Component';var renderPresent=instance.render;if(!renderPresent){if(ctor.prototype&&typeof ctor.prototype.render==='function'){error('%s(...): No `render` method found on the returned component '+'instance: did you accidentally return an object from the constructor?',name);}else{error('%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`.',name);}}if(instance.getInitialState&&!instance.getInitialState.isReactClassApproved&&!instance.state){error('getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',name);}if(instance.getDefaultProps&&!instance.getDefaultProps.isReactClassApproved){error('getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',name);}if(instance.propTypes){error('propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',name);}if(instance.contextType){error('contextType was defined as an instance property on %s. Use a static '+'property to define contextType instead.',name);}{if(instance.contextTypes){error('contextTypes was defined as an instance property on %s. Use a static '+'property to define contextTypes instead.',name);}if(ctor.contextType&&ctor.contextTypes&&!didWarnAboutContextTypeAndContextTypes.has(ctor)){didWarnAboutContextTypeAndContextTypes.add(ctor);error('%s declares both contextTypes and contextType static properties. '+'The legacy contextTypes property will be ignored.',name);}}if(typeof instance.componentShouldUpdate==='function'){error('%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',name);}if(ctor.prototype&&ctor.prototype.isPureReactComponent&&typeof instance.shouldComponentUpdate!=='undefined'){error('%s has a method called shouldComponentUpdate(). '+'shouldComponentUpdate should not be used when extending React.PureComponent. '+'Please extend React.Component if shouldComponentUpdate is used.',getComponentName(ctor)||'A pure component');}if(typeof instance.componentDidUnmount==='function'){error('%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',name);}if(typeof instance.componentDidReceiveProps==='function'){error('%s has a method called '+'componentDidReceiveProps(). But there is no such lifecycle method. '+'If you meant to update the state in response to changing props, '+'use componentWillReceiveProps(). If you meant to fetch data or '+'run side-effects or mutations after React has updated the UI, use componentDidUpdate().',name);}if(typeof instance.componentWillRecieveProps==='function'){error('%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',name);}if(typeof instance.UNSAFE_componentWillRecieveProps==='function'){error('%s has a method called '+'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?',name);}var hasMutatedProps=instance.props!==newProps;if(instance.props!==undefined&&hasMutatedProps){error('%s(...): When calling super() in `%s`, make sure to pass '+"up the same props that your component's constructor was passed.",name,name);}if(instance.defaultProps){error('Setting defaultProps as an instance property on %s is not supported and will be ignored.'+' Instead, define defaultProps as a static property on %s.',name,name);}if(typeof instance.getSnapshotBeforeUpdate==='function'&&typeof instance.componentDidUpdate!=='function'&&!didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)){didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);error('%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). '+'This component defines getSnapshotBeforeUpdate() only.',getComponentName(ctor));}if(typeof instance.getDerivedStateFromProps==='function'){error('%s: getDerivedStateFromProps() is defined as an instance method '+'and will be ignored. Instead, declare it as a static method.',name);}if(typeof instance.getDerivedStateFromError==='function'){error('%s: getDerivedStateFromError() is defined as an instance method '+'and will be ignored. Instead, declare it as a static method.',name);}if(typeof ctor.getSnapshotBeforeUpdate==='function'){error('%s: getSnapshotBeforeUpdate() is defined as a static method '+'and will be ignored. Instead, declare it as an instance method.',name);}var _state=instance.state;if(_state&&(typeof _state!=='object'||isArray(_state))){error('%s.state: must be set to an object or null',name);}if(typeof instance.getChildContext==='function'&&typeof ctor.childContextTypes!=='object'){error('%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',name);}}}function adoptClassInstance(workInProgress,instance){instance.updater=classComponentUpdater;workInProgress.stateNode=instance;// The instance needs access to the fiber so that it can schedule updates
set(instance,workInProgress);{instance._reactInternalInstance=fakeInternalInstance;}}function constructClassInstance(workInProgress,ctor,props){var isLegacyContextConsumer=false;var unmaskedContext=emptyContextObject;var context=emptyContextObject;var contextType=ctor.contextType;{if('contextType'in ctor){var isValid=// Allow null for conditional declaration
contextType===null||contextType!==undefined&&contextType.$$typeof===REACT_CONTEXT_TYPE&&contextType._context===undefined;// Not a <Context.Consumer>
if(!isValid&&!didWarnAboutInvalidateContextType.has(ctor)){didWarnAboutInvalidateContextType.add(ctor);var addendum='';if(contextType===undefined){addendum=' However, it is set to undefined. '+'This can be caused by a typo or by mixing up named and default imports. '+'This can also happen due to a circular dependency, so '+'try moving the createContext() call to a separate file.';}else if(typeof contextType!=='object'){addendum=' However, it is set to a '+typeof contextType+'.';}else if(contextType.$$typeof===REACT_PROVIDER_TYPE){addendum=' Did you accidentally pass the Context.Provider instead?';}else if(contextType._context!==undefined){// <Context.Consumer>
addendum=' Did you accidentally pass the Context.Consumer instead?';}else{addendum=' However, it is set to an object with keys {'+Object.keys(contextType).join(', ')+'}.';}error('%s defines an invalid contextType. '+'contextType should point to the Context object returned by React.createContext().%s',getComponentName(ctor)||'Component',addendum);}}}if(typeof contextType==='object'&&contextType!==null){context=_readContext(contextType);}else{unmaskedContext=getUnmaskedContext(workInProgress,ctor,true);var contextTypes=ctor.contextTypes;isLegacyContextConsumer=contextTypes!==null&&contextTypes!==undefined;context=isLegacyContextConsumer?getMaskedContext(workInProgress,unmaskedContext):emptyContextObject;}// Instantiate twice to help detect side-effects.
{if(workInProgress.mode&StrictMode){disableLogs();try{new ctor(props,context);// eslint-disable-line no-new
}finally{reenableLogs();}}}var instance=new ctor(props,context);var state=workInProgress.memoizedState=instance.state!==null&&instance.state!==undefined?instance.state:null;adoptClassInstance(workInProgress,instance);{if(typeof ctor.getDerivedStateFromProps==='function'&&state===null){var componentName=getComponentName(ctor)||'Component';if(!didWarnAboutUninitializedState.has(componentName)){didWarnAboutUninitializedState.add(componentName);error('`%s` uses `getDerivedStateFromProps` but its initial state is '+'%s. This is not recommended. Instead, define the initial state by '+'assigning an object to `this.state` in the constructor of `%s`. '+'This ensures that `getDerivedStateFromProps` arguments have a consistent shape.',componentName,instance.state===null?'null':'undefined',componentName);}}// If new component APIs are defined, "unsafe" lifecycles won't be called.
// Warn about these lifecycles if they are present.
// Don't warn about react-lifecycles-compat polyfilled methods though.
if(typeof ctor.getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function'){var foundWillMountName=null;var foundWillReceivePropsName=null;var foundWillUpdateName=null;if(typeof instance.componentWillMount==='function'&&instance.componentWillMount.__suppressDeprecationWarning!==true){foundWillMountName='componentWillMount';}else if(typeof instance.UNSAFE_componentWillMount==='function'){foundWillMountName='UNSAFE_componentWillMount';}if(typeof instance.componentWillReceiveProps==='function'&&instance.componentWillReceiveProps.__suppressDeprecationWarning!==true){foundWillReceivePropsName='componentWillReceiveProps';}else if(typeof instance.UNSAFE_componentWillReceiveProps==='function'){foundWillReceivePropsName='UNSAFE_componentWillReceiveProps';}if(typeof instance.componentWillUpdate==='function'&&instance.componentWillUpdate.__suppressDeprecationWarning!==true){foundWillUpdateName='componentWillUpdate';}else if(typeof instance.UNSAFE_componentWillUpdate==='function'){foundWillUpdateName='UNSAFE_componentWillUpdate';}if(foundWillMountName!==null||foundWillReceivePropsName!==null||foundWillUpdateName!==null){var _componentName=getComponentName(ctor)||'Component';var newApiName=typeof ctor.getDerivedStateFromProps==='function'?'getDerivedStateFromProps()':'getSnapshotBeforeUpdate()';if(!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)){didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n'+'%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n'+'The above lifecycles should be removed. Learn more about this warning here:\n'+'https://reactjs.org/link/unsafe-component-lifecycles',_componentName,newApiName,foundWillMountName!==null?"\n  "+foundWillMountName:'',foundWillReceivePropsName!==null?"\n  "+foundWillReceivePropsName:'',foundWillUpdateName!==null?"\n  "+foundWillUpdateName:'');}}}}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// ReactFiberContext usually updates this cache but can't for newly-created instances.
if(isLegacyContextConsumer){cacheContext(workInProgress,unmaskedContext,context);}return instance;}function callComponentWillMount(workInProgress,instance){var oldState=instance.state;if(typeof instance.componentWillMount==='function'){instance.componentWillMount();}if(typeof instance.UNSAFE_componentWillMount==='function'){instance.UNSAFE_componentWillMount();}if(oldState!==instance.state){{error('%s.componentWillMount(): Assigning directly to this.state is '+"deprecated (except inside a component's "+'constructor). Use setState instead.',getComponentName(workInProgress.type)||'Component');}classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}}function callComponentWillReceiveProps(workInProgress,instance,newProps,nextContext){var oldState=instance.state;if(typeof instance.componentWillReceiveProps==='function'){instance.componentWillReceiveProps(newProps,nextContext);}if(typeof instance.UNSAFE_componentWillReceiveProps==='function'){instance.UNSAFE_componentWillReceiveProps(newProps,nextContext);}if(instance.state!==oldState){{var componentName=getComponentName(workInProgress.type)||'Component';if(!didWarnAboutStateAssignmentForComponent.has(componentName)){didWarnAboutStateAssignmentForComponent.add(componentName);error('%s.componentWillReceiveProps(): Assigning directly to '+"this.state is deprecated (except inside a component's "+'constructor). Use setState instead.',componentName);}}classComponentUpdater.enqueueReplaceState(instance,instance.state,null);}}// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress,ctor,newProps,renderLanes){{checkClassInstance(workInProgress,ctor,newProps);}var instance=workInProgress.stateNode;instance.props=newProps;instance.state=workInProgress.memoizedState;instance.refs=emptyRefsObject;initializeUpdateQueue(workInProgress);var contextType=ctor.contextType;if(typeof contextType==='object'&&contextType!==null){instance.context=_readContext(contextType);}else{var unmaskedContext=getUnmaskedContext(workInProgress,ctor,true);instance.context=getMaskedContext(workInProgress,unmaskedContext);}{if(instance.state===newProps){var componentName=getComponentName(ctor)||'Component';if(!didWarnAboutDirectlyAssigningPropsToState.has(componentName)){didWarnAboutDirectlyAssigningPropsToState.add(componentName);error('%s: It is not recommended to assign props directly to state '+"because updates to props won't be reflected in state. "+'In most cases, it is better to use props directly.',componentName);}}if(workInProgress.mode&StrictMode){ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress,instance);}{ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress,instance);}}processUpdateQueue(workInProgress,newProps,instance,renderLanes);instance.state=workInProgress.memoizedState;var getDerivedStateFromProps=ctor.getDerivedStateFromProps;if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,newProps);instance.state=workInProgress.memoizedState;}// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(typeof ctor.getDerivedStateFromProps!=='function'&&typeof instance.getSnapshotBeforeUpdate!=='function'&&(typeof instance.UNSAFE_componentWillMount==='function'||typeof instance.componentWillMount==='function')){callComponentWillMount(workInProgress,instance);// If we had additional state updates during this life-cycle, let's
// process them now.
processUpdateQueue(workInProgress,newProps,instance,renderLanes);instance.state=workInProgress.memoizedState;}if(typeof instance.componentDidMount==='function'){workInProgress.flags|=Update;}}function resumeMountClassInstance(workInProgress,ctor,newProps,renderLanes){var instance=workInProgress.stateNode;var oldProps=workInProgress.memoizedProps;instance.props=oldProps;var oldContext=instance.context;var contextType=ctor.contextType;var nextContext=emptyContextObject;if(typeof contextType==='object'&&contextType!==null){nextContext=_readContext(contextType);}else{var nextLegacyUnmaskedContext=getUnmaskedContext(workInProgress,ctor,true);nextContext=getMaskedContext(workInProgress,nextLegacyUnmaskedContext);}var getDerivedStateFromProps=ctor.getDerivedStateFromProps;var hasNewLifecycles=typeof getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function';// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillReceiveProps==='function'||typeof instance.componentWillReceiveProps==='function')){if(oldProps!==newProps||oldContext!==nextContext){callComponentWillReceiveProps(workInProgress,instance,newProps,nextContext);}}resetHasForceUpdateBeforeProcessing();var oldState=workInProgress.memoizedState;var newState=instance.state=oldState;processUpdateQueue(workInProgress,newProps,instance,renderLanes);newState=workInProgress.memoizedState;if(oldProps===newProps&&oldState===newState&&!hasContextChanged()&&!checkHasForceUpdateAfterProcessing()){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidMount==='function'){workInProgress.flags|=Update;}return false;}if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,newProps);newState=workInProgress.memoizedState;}var shouldUpdate=checkHasForceUpdateAfterProcessing()||checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextContext);if(shouldUpdate){// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillMount==='function'||typeof instance.componentWillMount==='function')){if(typeof instance.componentWillMount==='function'){instance.componentWillMount();}if(typeof instance.UNSAFE_componentWillMount==='function'){instance.UNSAFE_componentWillMount();}}if(typeof instance.componentDidMount==='function'){workInProgress.flags|=Update;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidMount==='function'){workInProgress.flags|=Update;}// If shouldComponentUpdate returned false, we should still update the
// memoized state to indicate that this work can be reused.
workInProgress.memoizedProps=newProps;workInProgress.memoizedState=newState;}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=nextContext;return shouldUpdate;}// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current,workInProgress,ctor,newProps,renderLanes){var instance=workInProgress.stateNode;cloneUpdateQueue(current,workInProgress);var unresolvedOldProps=workInProgress.memoizedProps;var oldProps=workInProgress.type===workInProgress.elementType?unresolvedOldProps:resolveDefaultProps(workInProgress.type,unresolvedOldProps);instance.props=oldProps;var unresolvedNewProps=workInProgress.pendingProps;var oldContext=instance.context;var contextType=ctor.contextType;var nextContext=emptyContextObject;if(typeof contextType==='object'&&contextType!==null){nextContext=_readContext(contextType);}else{var nextUnmaskedContext=getUnmaskedContext(workInProgress,ctor,true);nextContext=getMaskedContext(workInProgress,nextUnmaskedContext);}var getDerivedStateFromProps=ctor.getDerivedStateFromProps;var hasNewLifecycles=typeof getDerivedStateFromProps==='function'||typeof instance.getSnapshotBeforeUpdate==='function';// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillReceiveProps==='function'||typeof instance.componentWillReceiveProps==='function')){if(unresolvedOldProps!==unresolvedNewProps||oldContext!==nextContext){callComponentWillReceiveProps(workInProgress,instance,newProps,nextContext);}}resetHasForceUpdateBeforeProcessing();var oldState=workInProgress.memoizedState;var newState=instance.state=oldState;processUpdateQueue(workInProgress,newProps,instance,renderLanes);newState=workInProgress.memoizedState;if(unresolvedOldProps===unresolvedNewProps&&oldState===newState&&!hasContextChanged()&&!checkHasForceUpdateAfterProcessing()){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(unresolvedOldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.flags|=Update;}}if(typeof instance.getSnapshotBeforeUpdate==='function'){if(unresolvedOldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.flags|=Snapshot;}}return false;}if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,ctor,getDerivedStateFromProps,newProps);newState=workInProgress.memoizedState;}var shouldUpdate=checkHasForceUpdateAfterProcessing()||checkShouldComponentUpdate(workInProgress,ctor,oldProps,newProps,oldState,newState,nextContext);if(shouldUpdate){// In order to support react-lifecycles-compat polyfilled components,
// Unsafe lifecycles should not be invoked for components using the new APIs.
if(!hasNewLifecycles&&(typeof instance.UNSAFE_componentWillUpdate==='function'||typeof instance.componentWillUpdate==='function')){if(typeof instance.componentWillUpdate==='function'){instance.componentWillUpdate(newProps,newState,nextContext);}if(typeof instance.UNSAFE_componentWillUpdate==='function'){instance.UNSAFE_componentWillUpdate(newProps,newState,nextContext);}}if(typeof instance.componentDidUpdate==='function'){workInProgress.flags|=Update;}if(typeof instance.getSnapshotBeforeUpdate==='function'){workInProgress.flags|=Snapshot;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(unresolvedOldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.flags|=Update;}}if(typeof instance.getSnapshotBeforeUpdate==='function'){if(unresolvedOldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.flags|=Snapshot;}}// If shouldComponentUpdate returned false, we should still update the
// memoized props/state to indicate that this work can be reused.
workInProgress.memoizedProps=newProps;workInProgress.memoizedState=newState;}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=nextContext;return shouldUpdate;}var didWarnAboutMaps;var didWarnAboutGenerators;var didWarnAboutStringRefs;var ownerHasKeyUseWarning;var ownerHasFunctionTypeWarning;var warnForMissingKey=function warnForMissingKey(child,returnFiber){};{didWarnAboutMaps=false;didWarnAboutGenerators=false;didWarnAboutStringRefs={};/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */ownerHasKeyUseWarning={};ownerHasFunctionTypeWarning={};warnForMissingKey=function warnForMissingKey(child,returnFiber){if(child===null||typeof child!=='object'){return;}if(!child._store||child._store.validated||child.key!=null){return;}if(!(typeof child._store==='object')){{throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");}}child._store.validated=true;var componentName=getComponentName(returnFiber.type)||'Component';if(ownerHasKeyUseWarning[componentName]){return;}ownerHasKeyUseWarning[componentName]=true;error('Each child in a list should have a unique '+'"key" prop. See https://reactjs.org/link/warning-keys for '+'more information.');};}var isArray$1=Array.isArray;function coerceRef(returnFiber,current,element){var mixedRef=element.ref;if(mixedRef!==null&&typeof mixedRef!=='function'&&typeof mixedRef!=='object'){{// TODO: Clean this up once we turn on the string ref warning for
// everyone, because the strict mode case will no longer be relevant
if((returnFiber.mode&StrictMode||warnAboutStringRefs)&&// We warn in ReactElement.js if owner and self are equal for string refs
// because these cannot be automatically converted to an arrow function
// using a codemod. Therefore, we don't have to warn about string refs again.
!(element._owner&&element._self&&element._owner.stateNode!==element._self)){var componentName=getComponentName(returnFiber.type)||'Component';if(!didWarnAboutStringRefs[componentName]){{error('A string ref, "%s", has been found within a strict mode tree. '+'String refs are a source of potential bugs and should be avoided. '+'We recommend using useRef() or createRef() instead. '+'Learn more about using refs safely here: '+'https://reactjs.org/link/strict-mode-string-ref',mixedRef);}didWarnAboutStringRefs[componentName]=true;}}}if(element._owner){var owner=element._owner;var inst;if(owner){var ownerFiber=owner;if(!(ownerFiber.tag===ClassComponent)){{throw Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");}}inst=ownerFiber.stateNode;}if(!inst){{throw Error("Missing owner for string ref "+mixedRef+". This error is likely caused by a bug in React. Please file an issue.");}}var stringRef=''+mixedRef;// Check if previous string ref matches new string ref
if(current!==null&&current.ref!==null&&typeof current.ref==='function'&&current.ref._stringRef===stringRef){return current.ref;}var ref=function ref(value){var refs=inst.refs;if(refs===emptyRefsObject){// This is a lazy pooled frozen object, so we need to initialize.
refs=inst.refs={};}if(value===null){delete refs[stringRef];}else{refs[stringRef]=value;}};ref._stringRef=stringRef;return ref;}else{if(!(typeof mixedRef==='string')){{throw Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");}}if(!element._owner){{throw Error("Element ref was specified as a string ("+mixedRef+") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.");}}}}return mixedRef;}function throwOnInvalidObjectType(returnFiber,newChild){if(returnFiber.type!=='textarea'){{{throw Error("Objects are not valid as a React child (found: "+(Object.prototype.toString.call(newChild)==='[object Object]'?'object with keys {'+Object.keys(newChild).join(', ')+'}':newChild)+"). If you meant to render a collection of children, use an array instead.");}}}}function warnOnFunctionType(returnFiber){{var componentName=getComponentName(returnFiber.type)||'Component';if(ownerHasFunctionTypeWarning[componentName]){return;}ownerHasFunctionTypeWarning[componentName]=true;error('Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.');}}// We avoid inlining this to avoid potential deopts from using try/catch.
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects){function deleteChild(returnFiber,childToDelete){if(!shouldTrackSideEffects){// Noop.
return;}// Deletions are added in reversed order so we add it to the front.
// At this point, the return fiber's effect list is empty except for
// deletions, so we can just append the deletion to the list. The remaining
// effects aren't added until the complete phase. Once we implement
// resuming, this may not be true.
var last=returnFiber.lastEffect;if(last!==null){last.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}childToDelete.nextEffect=null;childToDelete.flags=Deletion;}function deleteRemainingChildren(returnFiber,currentFirstChild){if(!shouldTrackSideEffects){// Noop.
return null;}// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var childToDelete=currentFirstChild;while(childToDelete!==null){deleteChild(returnFiber,childToDelete);childToDelete=childToDelete.sibling;}return null;}function mapRemainingChildren(returnFiber,currentFirstChild){// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
// instead.
var existingChildren=new Map();var existingChild=currentFirstChild;while(existingChild!==null){if(existingChild.key!==null){existingChildren.set(existingChild.key,existingChild);}else{existingChildren.set(existingChild.index,existingChild);}existingChild=existingChild.sibling;}return existingChildren;}function useFiber(fiber,pendingProps){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
var clone=createWorkInProgress(fiber,pendingProps);clone.index=0;clone.sibling=null;return clone;}function placeChild(newFiber,lastPlacedIndex,newIndex){newFiber.index=newIndex;if(!shouldTrackSideEffects){// Noop.
return lastPlacedIndex;}var current=newFiber.alternate;if(current!==null){var oldIndex=current.index;if(oldIndex<lastPlacedIndex){// This is a move.
newFiber.flags=Placement;return lastPlacedIndex;}else{// This item can stay in place.
return oldIndex;}}else{// This is an insertion.
newFiber.flags=Placement;return lastPlacedIndex;}}function placeSingleChild(newFiber){// This is simpler for the single child case. We only need to do a
// placement for inserting new children.
if(shouldTrackSideEffects&&newFiber.alternate===null){newFiber.flags=Placement;}return newFiber;}function updateTextNode(returnFiber,current,textContent,lanes){if(current===null||current.tag!==HostText){// Insert
var created=createFiberFromText(textContent,returnFiber.mode,lanes);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current,textContent);existing.return=returnFiber;return existing;}}function updateElement(returnFiber,current,element,lanes){if(current!==null){if(current.elementType===element.type||// Keep this check inline so it only runs on the false path:
isCompatibleFamilyForHotReloading(current,element)){// Move based on index
var existing=useFiber(current,element.props);existing.ref=coerceRef(returnFiber,current,element);existing.return=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}}// Insert
var created=createFiberFromElement(element,returnFiber.mode,lanes);created.ref=coerceRef(returnFiber,current,element);created.return=returnFiber;return created;}function updatePortal(returnFiber,current,portal,lanes){if(current===null||current.tag!==HostPortal||current.stateNode.containerInfo!==portal.containerInfo||current.stateNode.implementation!==portal.implementation){// Insert
var created=createFiberFromPortal(portal,returnFiber.mode,lanes);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current,portal.children||[]);existing.return=returnFiber;return existing;}}function updateFragment(returnFiber,current,fragment,lanes,key){if(current===null||current.tag!==Fragment){// Insert
var created=createFiberFromFragment(fragment,returnFiber.mode,lanes,key);created.return=returnFiber;return created;}else{// Update
var existing=useFiber(current,fragment);existing.return=returnFiber;return existing;}}function createChild(returnFiber,newChild,lanes){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var created=createFiberFromText(''+newChild,returnFiber.mode,lanes);created.return=returnFiber;return created;}if(typeof newChild==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _created=createFiberFromElement(newChild,returnFiber.mode,lanes);_created.ref=coerceRef(returnFiber,null,newChild);_created.return=returnFiber;return _created;}case REACT_PORTAL_TYPE:{var _created2=createFiberFromPortal(newChild,returnFiber.mode,lanes);_created2.return=returnFiber;return _created2;}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _created3=createFiberFromFragment(newChild,returnFiber.mode,lanes,null);_created3.return=returnFiber;return _created3;}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType(returnFiber);}}return null;}function updateSlot(returnFiber,oldFiber,newChild,lanes){// Update the fiber if the keys match, otherwise return null.
var key=oldFiber!==null?oldFiber.key:null;if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
if(key!==null){return null;}return updateTextNode(returnFiber,oldFiber,''+newChild,lanes);}if(typeof newChild==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{if(newChild.key===key){if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,oldFiber,newChild.props.children,lanes,key);}return updateElement(returnFiber,oldFiber,newChild,lanes);}else{return null;}}case REACT_PORTAL_TYPE:{if(newChild.key===key){return updatePortal(returnFiber,oldFiber,newChild,lanes);}else{return null;}}}if(isArray$1(newChild)||getIteratorFn(newChild)){if(key!==null){return null;}return updateFragment(returnFiber,oldFiber,newChild,lanes,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType(returnFiber);}}return null;}function updateFromMap(existingChildren,returnFiber,newIdx,newChild,lanes){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys, so we neither have to check the old nor
// new node for the key. If both are text nodes, they match.
var matchedFiber=existingChildren.get(newIdx)||null;return updateTextNode(returnFiber,matchedFiber,''+newChild,lanes);}if(typeof newChild==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _matchedFiber=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,_matchedFiber,newChild.props.children,lanes,newChild.key);}return updateElement(returnFiber,_matchedFiber,newChild,lanes);}case REACT_PORTAL_TYPE:{var _matchedFiber2=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updatePortal(returnFiber,_matchedFiber2,newChild,lanes);}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _matchedFiber3=existingChildren.get(newIdx)||null;return updateFragment(returnFiber,_matchedFiber3,newChild,lanes,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType(returnFiber);}}return null;}/**
   * Warns if there is a duplicate or missing key
   */function warnOnInvalidKey(child,knownKeys,returnFiber){{if(typeof child!=='object'||child===null){return knownKeys;}switch(child.$$typeof){case REACT_ELEMENT_TYPE:case REACT_PORTAL_TYPE:warnForMissingKey(child,returnFiber);var key=child.key;if(typeof key!=='string'){break;}if(knownKeys===null){knownKeys=new Set();knownKeys.add(key);break;}if(!knownKeys.has(key)){knownKeys.add(key);break;}error('Encountered two children with the same key, `%s`. '+'Keys should be unique so that components maintain their identity '+'across updates. Non-unique keys may cause children to be '+'duplicated and/or omitted — the behavior is unsupported and '+'could change in a future version.',key);break;}}return knownKeys;}function reconcileChildrenArray(returnFiber,currentFirstChild,newChildren,lanes){// This algorithm can't optimize by searching from both ends since we
// don't have backpointers on fibers. I'm trying to see how far we can get
// with that model. If it ends up not being worth the tradeoffs, we can
// add it later.
// Even with a two ended optimization, we'd want to optimize for the case
// where there are few changes and brute force the comparison instead of
// going for the Map. It'd like to explore hitting that path first in
// forward-only mode and only go for the Map once we notice that we need
// lots of look ahead. This doesn't handle reversal as well as two ended
// search but that's unusual. Besides, for the two ended optimization to
// work on Iterables, we'd need to copy the whole set.
// In this first iteration, we'll just live with hitting the bad case
// (adding everything to a Map) in for every insert/move.
// If you change this code, also update reconcileChildrenIterator() which
// uses the same algorithm.
{// First, validate keys.
var knownKeys=null;for(var i=0;i<newChildren.length;i++){var child=newChildren[i];knownKeys=warnOnInvalidKey(child,knownKeys,returnFiber);}}var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;for(;oldFiber!==null&&newIdx<newChildren.length;newIdx++){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx],lanes);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(oldFiber===null){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(newIdx===newChildren.length){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;newIdx<newChildren.length;newIdx++){var _newFiber=createChild(returnFiber,newChildren[newIdx],lanes);if(_newFiber===null){continue;}lastPlacedIndex=placeChild(_newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber;}else{previousNewFiber.sibling=_newFiber;}previousNewFiber=_newFiber;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;newIdx<newChildren.length;newIdx++){var _newFiber2=updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx],lanes);if(_newFiber2!==null){if(shouldTrackSideEffects){if(_newFiber2.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren.delete(_newFiber2.key===null?newIdx:_newFiber2.key);}}lastPlacedIndex=placeChild(_newFiber2,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber2;}else{previousNewFiber.sibling=_newFiber2;}previousNewFiber=_newFiber2;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileChildrenIterator(returnFiber,currentFirstChild,newChildrenIterable,lanes){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var iteratorFn=getIteratorFn(newChildrenIterable);if(!(typeof iteratorFn==='function')){{throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");}}{// We don't support rendering Generators because it's a mutation.
// See https://github.com/facebook/react/issues/12995
if(typeof Symbol==='function'&&// $FlowFixMe Flow doesn't know about toStringTag
newChildrenIterable[Symbol.toStringTag]==='Generator'){if(!didWarnAboutGenerators){error('Using Generators as children is unsupported and will likely yield '+'unexpected results because enumerating a generator mutates it. '+'You may convert it to an array with `Array.from()` or the '+'`[...spread]` operator before rendering. Keep in mind '+'you might need to polyfill these features for older browsers.');}didWarnAboutGenerators=true;}// Warn about using Maps as children
if(newChildrenIterable.entries===iteratorFn){if(!didWarnAboutMaps){error('Using Maps as children is not supported. '+'Use an array of keyed ReactElements instead.');}didWarnAboutMaps=true;}// First, validate keys.
// We'll get a different iterator later for the main pass.
var _newChildren=iteratorFn.call(newChildrenIterable);if(_newChildren){var knownKeys=null;var _step=_newChildren.next();for(;!_step.done;_step=_newChildren.next()){var child=_step.value;knownKeys=warnOnInvalidKey(child,knownKeys,returnFiber);}}}var newChildren=iteratorFn.call(newChildrenIterable);if(!(newChildren!=null)){{throw Error("An iterable object provided no iterator.");}}var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;var step=newChildren.next();for(;oldFiber!==null&&!step.done;newIdx++,step=newChildren.next()){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,step.value,lanes);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(oldFiber===null){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(step.done){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber3=createChild(returnFiber,step.value,lanes);if(_newFiber3===null){continue;}lastPlacedIndex=placeChild(_newFiber3,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber3;}else{previousNewFiber.sibling=_newFiber3;}previousNewFiber=_newFiber3;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber4=updateFromMap(existingChildren,returnFiber,newIdx,step.value,lanes);if(_newFiber4!==null){if(shouldTrackSideEffects){if(_newFiber4.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren.delete(_newFiber4.key===null?newIdx:_newFiber4.key);}}lastPlacedIndex=placeChild(_newFiber4,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber4;}else{previousNewFiber.sibling=_newFiber4;}previousNewFiber=_newFiber4;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileSingleTextNode(returnFiber,currentFirstChild,textContent,lanes){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(currentFirstChild!==null&&currentFirstChild.tag===HostText){// We already have an existing node so let's just update it and delete
// the rest.
deleteRemainingChildren(returnFiber,currentFirstChild.sibling);var existing=useFiber(currentFirstChild,textContent);existing.return=returnFiber;return existing;}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
deleteRemainingChildren(returnFiber,currentFirstChild);var created=createFiberFromText(textContent,returnFiber.mode,lanes);created.return=returnFiber;return created;}function reconcileSingleElement(returnFiber,currentFirstChild,element,lanes){var key=element.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){switch(child.tag){case Fragment:{if(element.type===REACT_FRAGMENT_TYPE){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,element.props.children);existing.return=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}break;}case Block:// We intentionally fallthrough here if enableBlocksAPI is not on.
// eslint-disable-next-lined no-fallthrough
default:{if(child.elementType===element.type||// Keep this check inline so it only runs on the false path:
isCompatibleFamilyForHotReloading(child,element)){deleteRemainingChildren(returnFiber,child.sibling);var _existing3=useFiber(child,element.props);_existing3.ref=coerceRef(returnFiber,child,element);_existing3.return=returnFiber;{_existing3._debugSource=element._source;_existing3._debugOwner=element._owner;}return _existing3;}break;}}// Didn't match.
deleteRemainingChildren(returnFiber,child);break;}else{deleteChild(returnFiber,child);}child=child.sibling;}if(element.type===REACT_FRAGMENT_TYPE){var created=createFiberFromFragment(element.props.children,returnFiber.mode,lanes,element.key);created.return=returnFiber;return created;}else{var _created4=createFiberFromElement(element,returnFiber.mode,lanes);_created4.ref=coerceRef(returnFiber,currentFirstChild,element);_created4.return=returnFiber;return _created4;}}function reconcileSinglePortal(returnFiber,currentFirstChild,portal,lanes){var key=portal.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===HostPortal&&child.stateNode.containerInfo===portal.containerInfo&&child.stateNode.implementation===portal.implementation){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,portal.children||[]);existing.return=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromPortal(portal,returnFiber.mode,lanes);created.return=returnFiber;return created;}// This API will tag the children with the side-effect of the reconciliation
// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function reconcileChildFibers(returnFiber,currentFirstChild,newChild,lanes){// This function is not recursive.
// If the top level item is an array, we treat it as a set of children,
// not as a fragment. Nested arrays on the other hand will be treated as
// fragment nodes. Recursion happens at the normal flow.
// Handle top level unkeyed fragments as if they were arrays.
// This leads to an ambiguity between <>{[...]}</> and <>...</>.
// We treat the ambiguous cases above the same.
var isUnkeyedTopLevelFragment=typeof newChild==='object'&&newChild!==null&&newChild.type===REACT_FRAGMENT_TYPE&&newChild.key===null;if(isUnkeyedTopLevelFragment){newChild=newChild.props.children;}// Handle object types
var isObject=typeof newChild==='object'&&newChild!==null;if(isObject){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstChild,newChild,lanes));case REACT_PORTAL_TYPE:return placeSingleChild(reconcileSinglePortal(returnFiber,currentFirstChild,newChild,lanes));}}if(typeof newChild==='string'||typeof newChild==='number'){return placeSingleChild(reconcileSingleTextNode(returnFiber,currentFirstChild,''+newChild,lanes));}if(isArray$1(newChild)){return reconcileChildrenArray(returnFiber,currentFirstChild,newChild,lanes);}if(getIteratorFn(newChild)){return reconcileChildrenIterator(returnFiber,currentFirstChild,newChild,lanes);}if(isObject){throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType(returnFiber);}}if(typeof newChild==='undefined'&&!isUnkeyedTopLevelFragment){// If the new child is undefined, and the return fiber is a composite
// component, throw an error. If Fiber return types are disabled,
// we already threw above.
switch(returnFiber.tag){case ClassComponent:{{var instance=returnFiber.stateNode;if(instance.render._isMockFunction){// We allow auto-mocks to proceed as if they're returning null.
break;}}}// Intentionally fall through to the next case, which handles both
// functions and classes
// eslint-disable-next-lined no-fallthrough
case Block:case FunctionComponent:case ForwardRef:case SimpleMemoComponent:{{{throw Error((getComponentName(returnFiber.type)||'Component')+"(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");}}}}}// Remaining cases are all treated as empty.
return deleteRemainingChildren(returnFiber,currentFirstChild);}return reconcileChildFibers;}var reconcileChildFibers=ChildReconciler(true);var mountChildFibers=ChildReconciler(false);function cloneChildFibers(current,workInProgress){if(!(current===null||workInProgress.child===current.child)){{throw Error("Resuming work not yet implemented.");}}if(workInProgress.child===null){return;}var currentChild=workInProgress.child;var newChild=createWorkInProgress(currentChild,currentChild.pendingProps);workInProgress.child=newChild;newChild.return=workInProgress;while(currentChild.sibling!==null){currentChild=currentChild.sibling;newChild=newChild.sibling=createWorkInProgress(currentChild,currentChild.pendingProps);newChild.return=workInProgress;}newChild.sibling=null;}// Reset a workInProgress child set to prepare it for a second pass.
function resetChildFibers(workInProgress,lanes){var child=workInProgress.child;while(child!==null){resetWorkInProgress(child,lanes);child=child.sibling;}}var NO_CONTEXT={};var contextStackCursor$1=createCursor(NO_CONTEXT);var contextFiberStackCursor=createCursor(NO_CONTEXT);var rootInstanceStackCursor=createCursor(NO_CONTEXT);function requiredContext(c){if(!(c!==NO_CONTEXT)){{throw Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");}}return c;}function getRootHostContainer(){var rootInstance=requiredContext(rootInstanceStackCursor.current);return rootInstance;}function pushHostContainer(fiber,nextRootInstance){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
push(rootInstanceStackCursor,nextRootInstance,fiber);// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);// Finally, we need to push the host context to the stack.
// However, we can't just call getRootHostContext() and push it because
// we'd have a different number of entries on the stack depending on
// whether getRootHostContext() throws somewhere in renderer code or not.
// So we push an empty value first. This lets us safely unwind on errors.
push(contextStackCursor$1,NO_CONTEXT,fiber);var nextRootContext=getRootHostContext(nextRootInstance);// Now that we know this function doesn't throw, replace it.
pop(contextStackCursor$1,fiber);push(contextStackCursor$1,nextRootContext,fiber);}function popHostContainer(fiber){pop(contextStackCursor$1,fiber);pop(contextFiberStackCursor,fiber);pop(rootInstanceStackCursor,fiber);}function getHostContext(){var context=requiredContext(contextStackCursor$1.current);return context;}function pushHostContext(fiber){var rootInstance=requiredContext(rootInstanceStackCursor.current);var context=requiredContext(contextStackCursor$1.current);var nextContext=getChildHostContext(context,fiber.type,rootInstance);// Don't push this Fiber's context unless it's unique.
if(context===nextContext){return;}// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);push(contextStackCursor$1,nextContext,fiber);}function popHostContext(fiber){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
if(contextFiberStackCursor.current!==fiber){return;}pop(contextStackCursor$1,fiber);pop(contextFiberStackCursor,fiber);}var DefaultSuspenseContext=0;// The Suspense Context is split into two parts. The lower bits is
// inherited deeply down the subtree. The upper bits only affect
// this immediate suspense boundary and gets reset each new
// boundary or suspense list.
var SubtreeSuspenseContextMask=1;// Subtree Flags:
// InvisibleParentSuspenseContext indicates that one of our parent Suspense
// boundaries is not currently showing visible main content.
// Either because it is already showing a fallback or is not mounted at all.
// We can use this to determine if it is desirable to trigger a fallback at
// the parent. If not, then we might need to trigger undesirable boundaries
// and/or suspend the commit to avoid hiding the parent content.
var InvisibleParentSuspenseContext=1;// Shallow Flags:
// ForceSuspenseFallback can be used by SuspenseList to force newly added
// items into their fallback state during one of the render passes.
var ForceSuspenseFallback=2;var suspenseStackCursor=createCursor(DefaultSuspenseContext);function hasSuspenseContext(parentContext,flag){return(parentContext&flag)!==0;}function setDefaultShallowSuspenseContext(parentContext){return parentContext&SubtreeSuspenseContextMask;}function setShallowSuspenseContext(parentContext,shallowContext){return parentContext&SubtreeSuspenseContextMask|shallowContext;}function addSubtreeSuspenseContext(parentContext,subtreeContext){return parentContext|subtreeContext;}function pushSuspenseContext(fiber,newContext){push(suspenseStackCursor,newContext,fiber);}function popSuspenseContext(fiber){pop(suspenseStackCursor,fiber);}function shouldCaptureSuspense(workInProgress,hasInvisibleParent){// If it was the primary children that just suspended, capture and render the
// fallback. Otherwise, don't capture and bubble to the next boundary.
var nextState=workInProgress.memoizedState;if(nextState!==null){if(nextState.dehydrated!==null){// A dehydrated boundary always captures.
return true;}return false;}var props=workInProgress.memoizedProps;// In order to capture, the Suspense component must have a fallback prop.
if(props.fallback===undefined){return false;}// Regular boundaries always capture.
if(props.unstable_avoidThisFallback!==true){return true;}// If it's a boundary we should avoid, then we prefer to bubble up to the
// parent boundary if it is currently invisible.
if(hasInvisibleParent){return false;}// If the parent is not able to handle it, we must handle it.
return true;}function findFirstSuspended(row){var node=row;while(node!==null){if(node.tag===SuspenseComponent){var state=node.memoizedState;if(state!==null){var dehydrated=state.dehydrated;if(dehydrated===null||isSuspenseInstancePending(dehydrated)||isSuspenseInstanceFallback(dehydrated)){return node;}}}else if(node.tag===SuspenseListComponent&&// revealOrder undefined can't be trusted because it don't
// keep track of whether it suspended or not.
node.memoizedProps.revealOrder!==undefined){var didSuspend=(node.flags&DidCapture)!==NoFlags;if(didSuspend){return node;}}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===row){return null;}while(node.sibling===null){if(node.return===null||node.return===row){return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}return null;}var NoFlags$1=/*  */0;// Represents whether effect should fire.
var HasEffect=/* */1;// Represents the phase in which the effect (not the clean-up) fires.
var Layout=/*    */2;var Passive$1=/*   */4;// This may have been an insertion or a hydration.
var hydrationParentFiber=null;var nextHydratableInstance=null;var isHydrating=false;function enterHydrationState(fiber){if(!supportsHydration){return false;}var parentInstance=fiber.stateNode.containerInfo;nextHydratableInstance=getFirstHydratableChild(parentInstance);hydrationParentFiber=fiber;isHydrating=true;return true;}function deleteHydratableInstance(returnFiber,instance){{switch(returnFiber.tag){case HostRoot:didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo,instance);break;case HostComponent:didNotHydrateInstance(returnFiber.type,returnFiber.memoizedProps,returnFiber.stateNode,instance);break;}}var childToDelete=createFiberFromHostInstanceForDeletion();childToDelete.stateNode=instance;childToDelete.return=returnFiber;childToDelete.flags=Deletion;// This might seem like it belongs on progressedFirstDeletion. However,
// these children are not part of the reconciliation list of children.
// Even if we abort and rereconcile the children, that will try to hydrate
// again and the nodes are still in the host tree so these will be
// recreated.
if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}}function insertNonHydratedInstance(returnFiber,fiber){fiber.flags=fiber.flags&~Hydrating|Placement;{switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;switch(fiber.tag){case HostComponent:var type=fiber.type;var props=fiber.pendingProps;didNotFindHydratableContainerInstance(parentContainer,type,props);break;case HostText:var text=fiber.pendingProps;didNotFindHydratableContainerTextInstance(parentContainer,text);break;case SuspenseComponent:didNotFindHydratableContainerSuspenseInstance(parentContainer);break;}break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;switch(fiber.tag){case HostComponent:var _type=fiber.type;var _props=fiber.pendingProps;didNotFindHydratableInstance(parentType,parentProps,parentInstance,_type,_props);break;case HostText:var _text=fiber.pendingProps;didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,_text);break;case SuspenseComponent:didNotFindHydratableSuspenseInstance(parentType,parentProps,parentInstance);break;}break;}default:return;}}}function tryHydrate(fiber,nextInstance){switch(fiber.tag){case HostComponent:{var type=fiber.type;var props=fiber.pendingProps;var instance=canHydrateInstance(nextInstance,type,props);if(instance!==null){fiber.stateNode=instance;return true;}return false;}case HostText:{var text=fiber.pendingProps;var textInstance=canHydrateTextInstance(nextInstance,text);if(textInstance!==null){fiber.stateNode=textInstance;return true;}return false;}case SuspenseComponent:{return false;}default:return false;}}function tryToClaimNextHydratableInstance(fiber){if(!isHydrating){return;}var nextInstance=nextHydratableInstance;if(!nextInstance){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}var firstAttemptedInstance=nextInstance;if(!tryHydrate(fiber,nextInstance)){// If we can't hydrate this instance let's try the next one.
// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
nextInstance=getNextHydratableSibling(firstAttemptedInstance);if(!nextInstance||!tryHydrate(fiber,nextInstance)){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
deleteHydratableInstance(hydrationParentFiber,firstAttemptedInstance);}hydrationParentFiber=fiber;nextHydratableInstance=getFirstHydratableChild(nextInstance);}function prepareToHydrateHostInstance(fiber,rootContainerInstance,hostContext){if(!supportsHydration){{{throw Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");}}}var instance=fiber.stateNode;var updatePayload=hydrateInstance(instance,fiber.type,fiber.memoizedProps,rootContainerInstance,hostContext,fiber);// TODO: Type this specific to this type of component.
fiber.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update.
if(updatePayload!==null){return true;}return false;}function prepareToHydrateHostTextInstance(fiber){if(!supportsHydration){{{throw Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");}}}var textInstance=fiber.stateNode;var textContent=fiber.memoizedProps;var shouldUpdate=hydrateTextInstance(textInstance,textContent,fiber);{if(shouldUpdate){// We assume that prepareToHydrateHostTextInstance is called in a context where the
// hydration parent is the parent host component of this host text.
var returnFiber=hydrationParentFiber;if(returnFiber!==null){switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,textContent);break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,textContent);break;}}}}}return shouldUpdate;}function skipPastDehydratedSuspenseInstance(fiber){if(!supportsHydration){{{throw Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");}}}var suspenseState=fiber.memoizedState;var suspenseInstance=suspenseState!==null?suspenseState.dehydrated:null;if(!suspenseInstance){{throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");}}return getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance);}function popToNextHostParent(fiber){var parent=fiber.return;while(parent!==null&&parent.tag!==HostComponent&&parent.tag!==HostRoot&&parent.tag!==SuspenseComponent){parent=parent.return;}hydrationParentFiber=parent;}function popHydrationState(fiber){if(!supportsHydration){return false;}if(fiber!==hydrationParentFiber){// We're deeper than the current hydration context, inside an inserted
// tree.
return false;}if(!isHydrating){// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
popToNextHostParent(fiber);isHydrating=true;return false;}var type=fiber.type;// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them.
// TODO: Better heuristic.
if(fiber.tag!==HostComponent||type!=='head'&&type!=='body'&&!shouldSetTextContent(type,fiber.memoizedProps)){var nextInstance=nextHydratableInstance;while(nextInstance){deleteHydratableInstance(fiber,nextInstance);nextInstance=getNextHydratableSibling(nextInstance);}}popToNextHostParent(fiber);if(fiber.tag===SuspenseComponent){nextHydratableInstance=skipPastDehydratedSuspenseInstance(fiber);}else{nextHydratableInstance=hydrationParentFiber?getNextHydratableSibling(fiber.stateNode):null;}return true;}function resetHydrationState(){if(!supportsHydration){return;}hydrationParentFiber=null;nextHydratableInstance=null;isHydrating=false;}function getIsHydrating(){return isHydrating;}// and should be reset before starting a new render.
// This tracks which mutable sources need to be reset after a render.
var workInProgressSources=[];var rendererSigil$1;{// Used to detect multiple renderers using the same mutable source.
rendererSigil$1={};}function markSourceAsDirty(mutableSource){workInProgressSources.push(mutableSource);}function resetWorkInProgressVersions(){for(var i=0;i<workInProgressSources.length;i++){var mutableSource=workInProgressSources[i];if(isPrimaryRenderer){mutableSource._workInProgressVersionPrimary=null;}else{mutableSource._workInProgressVersionSecondary=null;}}workInProgressSources.length=0;}function getWorkInProgressVersion(mutableSource){if(isPrimaryRenderer){return mutableSource._workInProgressVersionPrimary;}else{return mutableSource._workInProgressVersionSecondary;}}function setWorkInProgressVersion(mutableSource,version){if(isPrimaryRenderer){mutableSource._workInProgressVersionPrimary=version;}else{mutableSource._workInProgressVersionSecondary=version;}workInProgressSources.push(mutableSource);}function warnAboutMultipleRenderersDEV(mutableSource){{if(isPrimaryRenderer){if(mutableSource._currentPrimaryRenderer==null){mutableSource._currentPrimaryRenderer=rendererSigil$1;}else if(mutableSource._currentPrimaryRenderer!==rendererSigil$1){error('Detected multiple renderers concurrently rendering the '+'same mutable source. This is currently unsupported.');}}else{if(mutableSource._currentSecondaryRenderer==null){mutableSource._currentSecondaryRenderer=rendererSigil$1;}else if(mutableSource._currentSecondaryRenderer!==rendererSigil$1){error('Detected multiple renderers concurrently rendering the '+'same mutable source. This is currently unsupported.');}}}}// Eager reads the version of a mutable source and stores it on the root.
var ReactCurrentDispatcher$1=ReactSharedInternals.ReactCurrentDispatcher,ReactCurrentBatchConfig$1=ReactSharedInternals.ReactCurrentBatchConfig;var didWarnAboutMismatchedHooksForComponent;var didWarnAboutUseOpaqueIdentifier;{didWarnAboutUseOpaqueIdentifier={};didWarnAboutMismatchedHooksForComponent=new Set();}// These are set right before calling the component.
var renderLanes=NoLanes;// The work-in-progress fiber. I've named it differently to distinguish it from
// the work-in-progress hook.
var currentlyRenderingFiber$1=null;// Hooks are stored as a linked list on the fiber's memoizedState field. The
// current hook list is the list that belongs to the current fiber. The
// work-in-progress hook list is a new list that will be added to the
// work-in-progress fiber.
var currentHook=null;var workInProgressHook=null;// Whether an update was scheduled at any point during the render phase. This
// does not get reset if we do another render pass; only when we're completely
// finished evaluating this component. This is an optimization so we know
// whether we need to clear render phase updates after a throw.
var didScheduleRenderPhaseUpdate=false;// Where an update was scheduled only during the current render pass. This
// gets reset after each attempt.
// TODO: Maybe there's some way to consolidate this with
// `didScheduleRenderPhaseUpdate`. Or with `numberOfReRenders`.
var didScheduleRenderPhaseUpdateDuringThisPass=false;var RE_RENDER_LIMIT=25;// In DEV, this is the name of the currently executing primitive hook
var currentHookNameInDev=null;// In DEV, this list ensures that hooks are called in the same order between renders.
// The list stores the order of hooks used during the initial render (mount).
// Subsequent renders (updates) reference this list.
var hookTypesDev=null;var hookTypesUpdateIndexDev=-1;// In DEV, this tracks whether currently rendering component needs to ignore
// the dependencies for Hooks that need them (e.g. useEffect or useMemo).
// When true, such Hooks will always be "remounted". Only used during hot reload.
var ignorePreviousDependencies=false;function mountHookTypesDev(){{var hookName=currentHookNameInDev;if(hookTypesDev===null){hookTypesDev=[hookName];}else{hookTypesDev.push(hookName);}}}function updateHookTypesDev(){{var hookName=currentHookNameInDev;if(hookTypesDev!==null){hookTypesUpdateIndexDev++;if(hookTypesDev[hookTypesUpdateIndexDev]!==hookName){warnOnHookMismatchInDev(hookName);}}}}function checkDepsAreArrayDev(deps){{if(deps!==undefined&&deps!==null&&!Array.isArray(deps)){// Verify deps, but only on mount to avoid extra checks.
// It's unlikely their type would change as usually you define them inline.
error('%s received a final argument that is not an array (instead, received `%s`). When '+'specified, the final argument must be an array.',currentHookNameInDev,typeof deps);}}}function warnOnHookMismatchInDev(currentHookName){{var componentName=getComponentName(currentlyRenderingFiber$1.type);if(!didWarnAboutMismatchedHooksForComponent.has(componentName)){didWarnAboutMismatchedHooksForComponent.add(componentName);if(hookTypesDev!==null){var table='';var secondColumnStart=30;for(var i=0;i<=hookTypesUpdateIndexDev;i++){var oldHookName=hookTypesDev[i];var newHookName=i===hookTypesUpdateIndexDev?currentHookName:oldHookName;var row=i+1+". "+oldHookName;// Extra space so second column lines up
// lol @ IE not supporting String#repeat
while(row.length<secondColumnStart){row+=' ';}row+=newHookName+'\n';table+=row;}error('React has detected a change in the order of Hooks called by %s. '+'This will lead to bugs and errors if not fixed. '+'For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n'+'   Previous render            Next render\n'+'   ------------------------------------------------------\n'+'%s'+'   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n',componentName,table);}}}}function throwInvalidHookError(){{{throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");}}}function areHookInputsEqual(nextDeps,prevDeps){{if(ignorePreviousDependencies){// Only true when this component is being hot reloaded.
return false;}}if(prevDeps===null){{error('%s received a final argument during this render, but not during '+'the previous render. Even though the final argument is optional, '+'its type cannot change between renders.',currentHookNameInDev);}return false;}{// Don't bother comparing lengths in prod because these arrays should be
// passed inline.
if(nextDeps.length!==prevDeps.length){error('The final argument passed to %s changed size between renders. The '+'order and size of this array must remain constant.\n\n'+'Previous: %s\n'+'Incoming: %s',currentHookNameInDev,"["+prevDeps.join(', ')+"]","["+nextDeps.join(', ')+"]");}}for(var i=0;i<prevDeps.length&&i<nextDeps.length;i++){if(objectIs(nextDeps[i],prevDeps[i])){continue;}return false;}return true;}function renderWithHooks(current,workInProgress,Component,props,secondArg,nextRenderLanes){renderLanes=nextRenderLanes;currentlyRenderingFiber$1=workInProgress;{hookTypesDev=current!==null?current._debugHookTypes:null;hookTypesUpdateIndexDev=-1;// Used for hot reloading:
ignorePreviousDependencies=current!==null&&current.type!==workInProgress.type;}workInProgress.memoizedState=null;workInProgress.updateQueue=null;workInProgress.lanes=NoLanes;// The following should have already been reset
// currentHook = null;
// workInProgressHook = null;
// didScheduleRenderPhaseUpdate = false;
// TODO Warn if no hooks are used at all during mount, then some are used during update.
// Currently we will identify the update render as a mount because memoizedState === null.
// This is tricky because it's valid for certain types of components (e.g. React.lazy)
// Using memoizedState to differentiate between mount/update only works if at least one stateful hook is used.
// Non-stateful hooks (e.g. context) don't get added to memoizedState,
// so memoizedState would be null during updates and mounts.
{if(current!==null&&current.memoizedState!==null){ReactCurrentDispatcher$1.current=HooksDispatcherOnUpdateInDEV;}else if(hookTypesDev!==null){// This dispatcher handles an edge case where a component is updating,
// but no stateful hooks have been used.
// We want to match the production code behavior (which will use HooksDispatcherOnMount),
// but with the extra DEV validation to ensure hooks ordering hasn't changed.
// This dispatcher does that.
ReactCurrentDispatcher$1.current=HooksDispatcherOnMountWithHookTypesInDEV;}else{ReactCurrentDispatcher$1.current=HooksDispatcherOnMountInDEV;}}var children=Component(props,secondArg);// Check if there was a render phase update
if(didScheduleRenderPhaseUpdateDuringThisPass){// Keep rendering in a loop for as long as render phase updates continue to
// be scheduled. Use a counter to prevent infinite loops.
var numberOfReRenders=0;do{didScheduleRenderPhaseUpdateDuringThisPass=false;if(!(numberOfReRenders<RE_RENDER_LIMIT)){{throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");}}numberOfReRenders+=1;{// Even when hot reloading, allow dependencies to stabilize
// after first render to prevent infinite render phase updates.
ignorePreviousDependencies=false;}// Start over from the beginning of the list
currentHook=null;workInProgressHook=null;workInProgress.updateQueue=null;{// Also validate hook order for cascading updates.
hookTypesUpdateIndexDev=-1;}ReactCurrentDispatcher$1.current=HooksDispatcherOnRerenderInDEV;children=Component(props,secondArg);}while(didScheduleRenderPhaseUpdateDuringThisPass);}// We can assume the previous dispatcher is always this one, since we set it
// at the beginning of the render phase and there's no re-entrancy.
ReactCurrentDispatcher$1.current=ContextOnlyDispatcher;{workInProgress._debugHookTypes=hookTypesDev;}// This check uses currentHook so that it works the same in DEV and prod bundles.
// hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
var didRenderTooFewHooks=currentHook!==null&&currentHook.next!==null;renderLanes=NoLanes;currentlyRenderingFiber$1=null;currentHook=null;workInProgressHook=null;{currentHookNameInDev=null;hookTypesDev=null;hookTypesUpdateIndexDev=-1;}didScheduleRenderPhaseUpdate=false;if(!!didRenderTooFewHooks){{throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");}}return children;}function bailoutHooks(current,workInProgress,lanes){workInProgress.updateQueue=current.updateQueue;workInProgress.flags&=~(Passive|Update);current.lanes=removeLanes(current.lanes,lanes);}function resetHooksAfterThrow(){// We can assume the previous dispatcher is always this one, since we set it
// at the beginning of the render phase and there's no re-entrancy.
ReactCurrentDispatcher$1.current=ContextOnlyDispatcher;if(didScheduleRenderPhaseUpdate){// There were render phase updates. These are only valid for this render
// phase, which we are now aborting. Remove the updates from the queues so
// they do not persist to the next render. Do not remove updates from hooks
// that weren't processed.
//
// Only reset the updates from the queue if it has a clone. If it does
// not have a clone, that means it wasn't processed, and the updates were
// scheduled before we entered the render phase.
var hook=currentlyRenderingFiber$1.memoizedState;while(hook!==null){var queue=hook.queue;if(queue!==null){queue.pending=null;}hook=hook.next;}didScheduleRenderPhaseUpdate=false;}renderLanes=NoLanes;currentlyRenderingFiber$1=null;currentHook=null;workInProgressHook=null;{hookTypesDev=null;hookTypesUpdateIndexDev=-1;currentHookNameInDev=null;isUpdatingOpaqueValueInRenderPhase=false;}didScheduleRenderPhaseUpdateDuringThisPass=false;}function mountWorkInProgressHook(){var hook={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};if(workInProgressHook===null){// This is the first hook in the list
currentlyRenderingFiber$1.memoizedState=workInProgressHook=hook;}else{// Append to the end of the list
workInProgressHook=workInProgressHook.next=hook;}return workInProgressHook;}function updateWorkInProgressHook(){// This function is used both for updates and for re-renders triggered by a
// render phase update. It assumes there is either a current hook we can
// clone, or a work-in-progress hook from a previous render pass that we can
// use as a base. When we reach the end of the base list, we must switch to
// the dispatcher used for mounts.
var nextCurrentHook;if(currentHook===null){var current=currentlyRenderingFiber$1.alternate;if(current!==null){nextCurrentHook=current.memoizedState;}else{nextCurrentHook=null;}}else{nextCurrentHook=currentHook.next;}var nextWorkInProgressHook;if(workInProgressHook===null){nextWorkInProgressHook=currentlyRenderingFiber$1.memoizedState;}else{nextWorkInProgressHook=workInProgressHook.next;}if(nextWorkInProgressHook!==null){// There's already a work-in-progress. Reuse it.
workInProgressHook=nextWorkInProgressHook;nextWorkInProgressHook=workInProgressHook.next;currentHook=nextCurrentHook;}else{// Clone from the current hook.
if(!(nextCurrentHook!==null)){{throw Error("Rendered more hooks than during the previous render.");}}currentHook=nextCurrentHook;var newHook={memoizedState:currentHook.memoizedState,baseState:currentHook.baseState,baseQueue:currentHook.baseQueue,queue:currentHook.queue,next:null};if(workInProgressHook===null){// This is the first hook in the list.
currentlyRenderingFiber$1.memoizedState=workInProgressHook=newHook;}else{// Append to the end of the list.
workInProgressHook=workInProgressHook.next=newHook;}}return workInProgressHook;}function createFunctionComponentUpdateQueue(){return{lastEffect:null};}function basicStateReducer(state,action){// $FlowFixMe: Flow doesn't like mixed types
return typeof action==='function'?action(state):action;}function mountReducer(reducer,initialArg,init){var hook=mountWorkInProgressHook();var initialState;if(init!==undefined){initialState=init(initialArg);}else{initialState=initialArg;}hook.memoizedState=hook.baseState=initialState;var queue=hook.queue={pending:null,dispatch:null,lastRenderedReducer:reducer,lastRenderedState:initialState};var dispatch=queue.dispatch=dispatchAction.bind(null,currentlyRenderingFiber$1,queue);return[hook.memoizedState,dispatch];}function updateReducer(reducer,initialArg,init){var hook=updateWorkInProgressHook();var queue=hook.queue;if(!(queue!==null)){{throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");}}queue.lastRenderedReducer=reducer;var current=currentHook;// The last rebase update that is NOT part of the base state.
var baseQueue=current.baseQueue;// The last pending update that hasn't been processed yet.
var pendingQueue=queue.pending;if(pendingQueue!==null){// We have new updates that haven't been processed yet.
// We'll add them to the base queue.
if(baseQueue!==null){// Merge the pending queue and the base queue.
var baseFirst=baseQueue.next;var pendingFirst=pendingQueue.next;baseQueue.next=pendingFirst;pendingQueue.next=baseFirst;}{if(current.baseQueue!==baseQueue){// Internal invariant that should never happen, but feasibly could in
// the future if we implement resuming, or some form of that.
error('Internal error: Expected work-in-progress queue to be a clone. '+'This is a bug in React.');}}current.baseQueue=baseQueue=pendingQueue;queue.pending=null;}if(baseQueue!==null){// We have a queue to process.
var first=baseQueue.next;var newState=current.baseState;var newBaseState=null;var newBaseQueueFirst=null;var newBaseQueueLast=null;var update=first;do{var updateLane=update.lane;if(!isSubsetOfLanes(renderLanes,updateLane)){// Priority is insufficient. Skip this update. If this is the first
// skipped update, the previous update/state is the new base
// update/state.
var clone={lane:updateLane,action:update.action,eagerReducer:update.eagerReducer,eagerState:update.eagerState,next:null};if(newBaseQueueLast===null){newBaseQueueFirst=newBaseQueueLast=clone;newBaseState=newState;}else{newBaseQueueLast=newBaseQueueLast.next=clone;}// Update the remaining priority in the queue.
// TODO: Don't need to accumulate this. Instead, we can remove
// renderLanes from the original lanes.
currentlyRenderingFiber$1.lanes=mergeLanes(currentlyRenderingFiber$1.lanes,updateLane);markSkippedUpdateLanes(updateLane);}else{// This update does have sufficient priority.
if(newBaseQueueLast!==null){var _clone={// This update is going to be committed so we never want uncommit
// it. Using NoLane works because 0 is a subset of all bitmasks, so
// this will never be skipped by the check above.
lane:NoLane,action:update.action,eagerReducer:update.eagerReducer,eagerState:update.eagerState,next:null};newBaseQueueLast=newBaseQueueLast.next=_clone;}// Process this update.
if(update.eagerReducer===reducer){// If this update was processed eagerly, and its reducer matches the
// current reducer, we can use the eagerly computed state.
newState=update.eagerState;}else{var action=update.action;newState=reducer(newState,action);}}update=update.next;}while(update!==null&&update!==first);if(newBaseQueueLast===null){newBaseState=newState;}else{newBaseQueueLast.next=newBaseQueueFirst;}// Mark that the fiber performed work, but only if the new state is
// different from the current state.
if(!objectIs(newState,hook.memoizedState)){markWorkInProgressReceivedUpdate();}hook.memoizedState=newState;hook.baseState=newBaseState;hook.baseQueue=newBaseQueueLast;queue.lastRenderedState=newState;}var dispatch=queue.dispatch;return[hook.memoizedState,dispatch];}function rerenderReducer(reducer,initialArg,init){var hook=updateWorkInProgressHook();var queue=hook.queue;if(!(queue!==null)){{throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");}}queue.lastRenderedReducer=reducer;// This is a re-render. Apply the new render phase updates to the previous
// work-in-progress hook.
var dispatch=queue.dispatch;var lastRenderPhaseUpdate=queue.pending;var newState=hook.memoizedState;if(lastRenderPhaseUpdate!==null){// The queue doesn't persist past this render pass.
queue.pending=null;var firstRenderPhaseUpdate=lastRenderPhaseUpdate.next;var update=firstRenderPhaseUpdate;do{// Process this render phase update. We don't have to check the
// priority because it will always be the same as the current
// render's.
var action=update.action;newState=reducer(newState,action);update=update.next;}while(update!==firstRenderPhaseUpdate);// Mark that the fiber performed work, but only if the new state is
// different from the current state.
if(!objectIs(newState,hook.memoizedState)){markWorkInProgressReceivedUpdate();}hook.memoizedState=newState;// Don't persist the state accumulated from the render phase updates to
// the base state unless the queue is empty.
// TODO: Not sure if this is the desired semantics, but it's what we
// do for gDSFP. I can't remember why.
if(hook.baseQueue===null){hook.baseState=newState;}queue.lastRenderedState=newState;}return[newState,dispatch];}function readFromUnsubcribedMutableSource(root,source,getSnapshot){{warnAboutMultipleRenderersDEV(source);}var getVersion=source._getVersion;var version=getVersion(source._source);// Is it safe for this component to read from this source during the current render?
var isSafeToReadFromSource=false;// Check the version first.
// If this render has already been started with a specific version,
// we can use it alone to determine if we can safely read from the source.
var currentRenderVersion=getWorkInProgressVersion(source);if(currentRenderVersion!==null){// It's safe to read if the store hasn't been mutated since the last time
// we read something.
isSafeToReadFromSource=currentRenderVersion===version;}else{// If there's no version, then this is the first time we've read from the
// source during the current render pass, so we need to do a bit more work.
// What we need to determine is if there are any hooks that already
// subscribed to the source, and if so, whether there are any pending
// mutations that haven't been synchronized yet.
//
// If there are no pending mutations, then `root.mutableReadLanes` will be
// empty, and we know we can safely read.
//
// If there *are* pending mutations, we may still be able to safely read
// if the currently rendering lanes are inclusive of the pending mutation
// lanes, since that guarantees that the value we're about to read from
// the source is consistent with the values that we read during the most
// recent mutation.
isSafeToReadFromSource=isSubsetOfLanes(renderLanes,root.mutableReadLanes);if(isSafeToReadFromSource){// If it's safe to read from this source during the current render,
// store the version in case other components read from it.
// A changed version number will let those components know to throw and restart the render.
setWorkInProgressVersion(source,version);}}if(isSafeToReadFromSource){var snapshot=getSnapshot(source._source);{if(typeof snapshot==='function'){error('Mutable source should not return a function as the snapshot value. '+'Functions may close over mutable values and cause tearing.');}}return snapshot;}else{// This handles the special case of a mutable source being shared between renderers.
// In that case, if the source is mutated between the first and second renderer,
// The second renderer don't know that it needs to reset the WIP version during unwind,
// (because the hook only marks sources as dirty if it's written to their WIP version).
// That would cause this tear check to throw again and eventually be visible to the user.
// We can avoid this infinite loop by explicitly marking the source as dirty.
//
// This can lead to tearing in the first renderer when it resumes,
// but there's nothing we can do about that (short of throwing here and refusing to continue the render).
markSourceAsDirty(source);{{throw Error("Cannot read from mutable source during the current render without tearing. This is a bug in React. Please file an issue.");}}}}function useMutableSource(hook,source,getSnapshot,subscribe){var root=getWorkInProgressRoot();if(!(root!==null)){{throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");}}var getVersion=source._getVersion;var version=getVersion(source._source);var dispatcher=ReactCurrentDispatcher$1.current;// eslint-disable-next-line prefer-const
var _dispatcher$useState=dispatcher.useState(function(){return readFromUnsubcribedMutableSource(root,source,getSnapshot);}),currentSnapshot=_dispatcher$useState[0],setSnapshot=_dispatcher$useState[1];var snapshot=currentSnapshot;// Grab a handle to the state hook as well.
// We use it to clear the pending update queue if we have a new source.
var stateHook=workInProgressHook;var memoizedState=hook.memoizedState;var refs=memoizedState.refs;var prevGetSnapshot=refs.getSnapshot;var prevSource=memoizedState.source;var prevSubscribe=memoizedState.subscribe;var fiber=currentlyRenderingFiber$1;hook.memoizedState={refs:refs,source:source,subscribe:subscribe};// Sync the values needed by our subscription handler after each commit.
dispatcher.useEffect(function(){refs.getSnapshot=getSnapshot;// Normally the dispatch function for a state hook never changes,
// but this hook recreates the queue in certain cases  to avoid updates from stale sources.
// handleChange() below needs to reference the dispatch function without re-subscribing,
// so we use a ref to ensure that it always has the latest version.
refs.setSnapshot=setSnapshot;// Check for a possible change between when we last rendered now.
var maybeNewVersion=getVersion(source._source);if(!objectIs(version,maybeNewVersion)){var maybeNewSnapshot=getSnapshot(source._source);{if(typeof maybeNewSnapshot==='function'){error('Mutable source should not return a function as the snapshot value. '+'Functions may close over mutable values and cause tearing.');}}if(!objectIs(snapshot,maybeNewSnapshot)){setSnapshot(maybeNewSnapshot);var lane=requestUpdateLane(fiber);markRootMutableRead(root,lane);}// If the source mutated between render and now,
// there may be state updates already scheduled from the old source.
// Entangle the updates so that they render in the same batch.
markRootEntangled(root,root.mutableReadLanes);}},[getSnapshot,source,subscribe]);// If we got a new source or subscribe function, re-subscribe in a passive effect.
dispatcher.useEffect(function(){var handleChange=function handleChange(){var latestGetSnapshot=refs.getSnapshot;var latestSetSnapshot=refs.setSnapshot;try{latestSetSnapshot(latestGetSnapshot(source._source));// Record a pending mutable source update with the same expiration time.
var lane=requestUpdateLane(fiber);markRootMutableRead(root,lane);}catch(error){// A selector might throw after a source mutation.
// e.g. it might try to read from a part of the store that no longer exists.
// In this case we should still schedule an update with React.
// Worst case the selector will throw again and then an error boundary will handle it.
latestSetSnapshot(function(){throw error;});}};var unsubscribe=subscribe(source._source,handleChange);{if(typeof unsubscribe!=='function'){error('Mutable source subscribe function must return an unsubscribe function.');}}return unsubscribe;},[source,subscribe]);// If any of the inputs to useMutableSource change, reading is potentially unsafe.
//
// If either the source or the subscription have changed we can't can't trust the update queue.
// Maybe the source changed in a way that the old subscription ignored but the new one depends on.
//
// If the getSnapshot function changed, we also shouldn't rely on the update queue.
// It's possible that the underlying source was mutated between the when the last "change" event fired,
// and when the current render (with the new getSnapshot function) is processed.
//
// In both cases, we need to throw away pending updates (since they are no longer relevant)
// and treat reading from the source as we do in the mount case.
if(!objectIs(prevGetSnapshot,getSnapshot)||!objectIs(prevSource,source)||!objectIs(prevSubscribe,subscribe)){// Create a new queue and setState method,
// So if there are interleaved updates, they get pushed to the older queue.
// When this becomes current, the previous queue and dispatch method will be discarded,
// including any interleaving updates that occur.
var newQueue={pending:null,dispatch:null,lastRenderedReducer:basicStateReducer,lastRenderedState:snapshot};newQueue.dispatch=setSnapshot=dispatchAction.bind(null,currentlyRenderingFiber$1,newQueue);stateHook.queue=newQueue;stateHook.baseQueue=null;snapshot=readFromUnsubcribedMutableSource(root,source,getSnapshot);stateHook.memoizedState=stateHook.baseState=snapshot;}return snapshot;}function mountMutableSource(source,getSnapshot,subscribe){var hook=mountWorkInProgressHook();hook.memoizedState={refs:{getSnapshot:getSnapshot,setSnapshot:null},source:source,subscribe:subscribe};return useMutableSource(hook,source,getSnapshot,subscribe);}function updateMutableSource(source,getSnapshot,subscribe){var hook=updateWorkInProgressHook();return useMutableSource(hook,source,getSnapshot,subscribe);}function mountState(initialState){var hook=mountWorkInProgressHook();if(typeof initialState==='function'){// $FlowFixMe: Flow doesn't like mixed types
initialState=initialState();}hook.memoizedState=hook.baseState=initialState;var queue=hook.queue={pending:null,dispatch:null,lastRenderedReducer:basicStateReducer,lastRenderedState:initialState};var dispatch=queue.dispatch=dispatchAction.bind(null,currentlyRenderingFiber$1,queue);return[hook.memoizedState,dispatch];}function updateState(initialState){return updateReducer(basicStateReducer);}function rerenderState(initialState){return rerenderReducer(basicStateReducer);}function pushEffect(tag,create,destroy,deps){var effect={tag:tag,create:create,destroy:destroy,deps:deps,// Circular
next:null};var componentUpdateQueue=currentlyRenderingFiber$1.updateQueue;if(componentUpdateQueue===null){componentUpdateQueue=createFunctionComponentUpdateQueue();currentlyRenderingFiber$1.updateQueue=componentUpdateQueue;componentUpdateQueue.lastEffect=effect.next=effect;}else{var lastEffect=componentUpdateQueue.lastEffect;if(lastEffect===null){componentUpdateQueue.lastEffect=effect.next=effect;}else{var firstEffect=lastEffect.next;lastEffect.next=effect;effect.next=firstEffect;componentUpdateQueue.lastEffect=effect;}}return effect;}function mountRef(initialValue){var hook=mountWorkInProgressHook();var ref={current:initialValue};{Object.seal(ref);}hook.memoizedState=ref;return ref;}function updateRef(initialValue){var hook=updateWorkInProgressHook();return hook.memoizedState;}function mountEffectImpl(fiberFlags,hookFlags,create,deps){var hook=mountWorkInProgressHook();var nextDeps=deps===undefined?null:deps;currentlyRenderingFiber$1.flags|=fiberFlags;hook.memoizedState=pushEffect(HasEffect|hookFlags,create,undefined,nextDeps);}function updateEffectImpl(fiberFlags,hookFlags,create,deps){var hook=updateWorkInProgressHook();var nextDeps=deps===undefined?null:deps;var destroy=undefined;if(currentHook!==null){var prevEffect=currentHook.memoizedState;destroy=prevEffect.destroy;if(nextDeps!==null){var prevDeps=prevEffect.deps;if(areHookInputsEqual(nextDeps,prevDeps)){pushEffect(hookFlags,create,destroy,nextDeps);return;}}}currentlyRenderingFiber$1.flags|=fiberFlags;hook.memoizedState=pushEffect(HasEffect|hookFlags,create,destroy,nextDeps);}function mountEffect(create,deps){{// $FlowExpectedError - jest isn't a global, and isn't recognized outside of tests
if('undefined'!==typeof jest){warnIfNotCurrentlyActingEffectsInDEV(currentlyRenderingFiber$1);}}return mountEffectImpl(Update|Passive,Passive$1,create,deps);}function updateEffect(create,deps){{// $FlowExpectedError - jest isn't a global, and isn't recognized outside of tests
if('undefined'!==typeof jest){warnIfNotCurrentlyActingEffectsInDEV(currentlyRenderingFiber$1);}}return updateEffectImpl(Update|Passive,Passive$1,create,deps);}function mountLayoutEffect(create,deps){return mountEffectImpl(Update,Layout,create,deps);}function updateLayoutEffect(create,deps){return updateEffectImpl(Update,Layout,create,deps);}function imperativeHandleEffect(create,ref){if(typeof ref==='function'){var refCallback=ref;var _inst=create();refCallback(_inst);return function(){refCallback(null);};}else if(ref!==null&&ref!==undefined){var refObject=ref;{if(!refObject.hasOwnProperty('current')){error('Expected useImperativeHandle() first argument to either be a '+'ref callback or React.createRef() object. Instead received: %s.','an object with keys {'+Object.keys(refObject).join(', ')+'}');}}var _inst2=create();refObject.current=_inst2;return function(){refObject.current=null;};}}function mountImperativeHandle(ref,create,deps){{if(typeof create!=='function'){error('Expected useImperativeHandle() second argument to be a function '+'that creates a handle. Instead received: %s.',create!==null?typeof create:'null');}}// TODO: If deps are provided, should we skip comparing the ref itself?
var effectDeps=deps!==null&&deps!==undefined?deps.concat([ref]):null;return mountEffectImpl(Update,Layout,imperativeHandleEffect.bind(null,create,ref),effectDeps);}function updateImperativeHandle(ref,create,deps){{if(typeof create!=='function'){error('Expected useImperativeHandle() second argument to be a function '+'that creates a handle. Instead received: %s.',create!==null?typeof create:'null');}}// TODO: If deps are provided, should we skip comparing the ref itself?
var effectDeps=deps!==null&&deps!==undefined?deps.concat([ref]):null;return updateEffectImpl(Update,Layout,imperativeHandleEffect.bind(null,create,ref),effectDeps);}function mountDebugValue(value,formatterFn){// This hook is normally a no-op.
// The react-debug-hooks package injects its own implementation
// so that e.g. DevTools can display custom hook values.
}var updateDebugValue=mountDebugValue;function mountCallback(callback,deps){var hook=mountWorkInProgressHook();var nextDeps=deps===undefined?null:deps;hook.memoizedState=[callback,nextDeps];return callback;}function updateCallback(callback,deps){var hook=updateWorkInProgressHook();var nextDeps=deps===undefined?null:deps;var prevState=hook.memoizedState;if(prevState!==null){if(nextDeps!==null){var prevDeps=prevState[1];if(areHookInputsEqual(nextDeps,prevDeps)){return prevState[0];}}}hook.memoizedState=[callback,nextDeps];return callback;}function mountMemo(nextCreate,deps){var hook=mountWorkInProgressHook();var nextDeps=deps===undefined?null:deps;var nextValue=nextCreate();hook.memoizedState=[nextValue,nextDeps];return nextValue;}function updateMemo(nextCreate,deps){var hook=updateWorkInProgressHook();var nextDeps=deps===undefined?null:deps;var prevState=hook.memoizedState;if(prevState!==null){// Assume these are defined. If they're not, areHookInputsEqual will warn.
if(nextDeps!==null){var prevDeps=prevState[1];if(areHookInputsEqual(nextDeps,prevDeps)){return prevState[0];}}}var nextValue=nextCreate();hook.memoizedState=[nextValue,nextDeps];return nextValue;}function mountDeferredValue(value){var _mountState=mountState(value),prevValue=_mountState[0],setValue=_mountState[1];mountEffect(function(){var prevTransition=ReactCurrentBatchConfig$1.transition;ReactCurrentBatchConfig$1.transition=1;try{setValue(value);}finally{ReactCurrentBatchConfig$1.transition=prevTransition;}},[value]);return prevValue;}function updateDeferredValue(value){var _updateState=updateState(),prevValue=_updateState[0],setValue=_updateState[1];updateEffect(function(){var prevTransition=ReactCurrentBatchConfig$1.transition;ReactCurrentBatchConfig$1.transition=1;try{setValue(value);}finally{ReactCurrentBatchConfig$1.transition=prevTransition;}},[value]);return prevValue;}function rerenderDeferredValue(value){var _rerenderState=rerenderState(),prevValue=_rerenderState[0],setValue=_rerenderState[1];updateEffect(function(){var prevTransition=ReactCurrentBatchConfig$1.transition;ReactCurrentBatchConfig$1.transition=1;try{setValue(value);}finally{ReactCurrentBatchConfig$1.transition=prevTransition;}},[value]);return prevValue;}function startTransition(setPending,callback){var priorityLevel=getCurrentPriorityLevel();{runWithPriority(priorityLevel<UserBlockingPriority$1?UserBlockingPriority$1:priorityLevel,function(){setPending(true);});runWithPriority(priorityLevel>NormalPriority$1?NormalPriority$1:priorityLevel,function(){var prevTransition=ReactCurrentBatchConfig$1.transition;ReactCurrentBatchConfig$1.transition=1;try{setPending(false);callback();}finally{ReactCurrentBatchConfig$1.transition=prevTransition;}});}}function mountTransition(){var _mountState2=mountState(false),isPending=_mountState2[0],setPending=_mountState2[1];// The `start` method can be stored on a ref, since `setPending`
// never changes.
var start=startTransition.bind(null,setPending);mountRef(start);return[start,isPending];}function updateTransition(){var _updateState2=updateState(),isPending=_updateState2[0];var startRef=updateRef();var start=startRef.current;return[start,isPending];}function rerenderTransition(){var _rerenderState2=rerenderState(),isPending=_rerenderState2[0];var startRef=updateRef();var start=startRef.current;return[start,isPending];}var isUpdatingOpaqueValueInRenderPhase=false;function getIsUpdatingOpaqueValueInRenderPhaseInDEV(){{return isUpdatingOpaqueValueInRenderPhase;}}function warnOnOpaqueIdentifierAccessInDEV(fiber){{// TODO: Should warn in effects and callbacks, too
var name=getComponentName(fiber.type)||'Unknown';if(getIsRendering()&&!didWarnAboutUseOpaqueIdentifier[name]){error('The object passed back from useOpaqueIdentifier is meant to be '+'passed through to attributes only. Do not read the '+'value directly.');didWarnAboutUseOpaqueIdentifier[name]=true;}}}function mountOpaqueIdentifier(){var makeId=makeClientIdInDEV.bind(null,warnOnOpaqueIdentifierAccessInDEV.bind(null,currentlyRenderingFiber$1));if(getIsHydrating()){var didUpgrade=false;var fiber=currentlyRenderingFiber$1;var readValue=function readValue(){if(!didUpgrade){// Only upgrade once. This works even inside the render phase because
// the update is added to a shared queue, which outlasts the
// in-progress render.
didUpgrade=true;{isUpdatingOpaqueValueInRenderPhase=true;setId(makeId());isUpdatingOpaqueValueInRenderPhase=false;warnOnOpaqueIdentifierAccessInDEV(fiber);}}{{throw Error("The object passed back from useOpaqueIdentifier is meant to be passed through to attributes only. Do not read the value directly.");}}};var id=makeOpaqueHydratingObject(readValue);var setId=mountState(id)[1];if((currentlyRenderingFiber$1.mode&BlockingMode)===NoMode){currentlyRenderingFiber$1.flags|=Update|Passive;pushEffect(HasEffect|Passive$1,function(){setId(makeId());},undefined,null);}return id;}else{var _id=makeId();mountState(_id);return _id;}}function updateOpaqueIdentifier(){var id=updateState()[0];return id;}function rerenderOpaqueIdentifier(){var id=rerenderState()[0];return id;}function dispatchAction(fiber,queue,action){{if(typeof arguments[3]==='function'){error("State updates from the useState() and useReducer() Hooks don't support the "+'second callback argument. To execute a side effect after '+'rendering, declare it in the component body with useEffect().');}}var eventTime=requestEventTime();var lane=requestUpdateLane(fiber);var update={lane:lane,action:action,eagerReducer:null,eagerState:null,next:null};// Append the update to the end of the list.
var pending=queue.pending;if(pending===null){// This is the first update. Create a circular list.
update.next=update;}else{update.next=pending.next;pending.next=update;}queue.pending=update;var alternate=fiber.alternate;if(fiber===currentlyRenderingFiber$1||alternate!==null&&alternate===currentlyRenderingFiber$1){// This is a render phase update. Stash it in a lazily-created map of
// queue -> linked list of updates. After this render pass, we'll restart
// and apply the stashed updates on top of the work-in-progress hook.
didScheduleRenderPhaseUpdateDuringThisPass=didScheduleRenderPhaseUpdate=true;}else{if(fiber.lanes===NoLanes&&(alternate===null||alternate.lanes===NoLanes)){// The queue is currently empty, which means we can eagerly compute the
// next state before entering the render phase. If the new state is the
// same as the current state, we may be able to bail out entirely.
var lastRenderedReducer=queue.lastRenderedReducer;if(lastRenderedReducer!==null){var prevDispatcher;{prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;}try{var currentState=queue.lastRenderedState;var eagerState=lastRenderedReducer(currentState,action);// Stash the eagerly computed state, and the reducer used to compute
// it, on the update object. If the reducer hasn't changed by the
// time we enter the render phase, then the eager state can be used
// without calling the reducer again.
update.eagerReducer=lastRenderedReducer;update.eagerState=eagerState;if(objectIs(eagerState,currentState)){// Fast path. We can bail out without scheduling React to re-render.
// It's still possible that we'll need to rebase this update later,
// if the component re-renders for a different reason and by that
// time the reducer has changed.
return;}}catch(error){// Suppress the error. It will throw again in the render phase.
}finally{{ReactCurrentDispatcher$1.current=prevDispatcher;}}}}{// $FlowExpectedError - jest isn't a global, and isn't recognized outside of tests
if('undefined'!==typeof jest){warnIfNotScopedWithMatchingAct(fiber);warnIfNotCurrentlyActingUpdatesInDev(fiber);}}scheduleUpdateOnFiber(fiber,lane,eventTime);}}var ContextOnlyDispatcher={readContext:_readContext,useCallback:throwInvalidHookError,useContext:throwInvalidHookError,useEffect:throwInvalidHookError,useImperativeHandle:throwInvalidHookError,useLayoutEffect:throwInvalidHookError,useMemo:throwInvalidHookError,useReducer:throwInvalidHookError,useRef:throwInvalidHookError,useState:throwInvalidHookError,useDebugValue:throwInvalidHookError,useDeferredValue:throwInvalidHookError,useTransition:throwInvalidHookError,useMutableSource:throwInvalidHookError,useOpaqueIdentifier:throwInvalidHookError,unstable_isNewReconciler:enableNewReconciler};var HooksDispatcherOnMountInDEV=null;var HooksDispatcherOnMountWithHookTypesInDEV=null;var HooksDispatcherOnUpdateInDEV=null;var HooksDispatcherOnRerenderInDEV=null;var InvalidNestedHooksDispatcherOnMountInDEV=null;var InvalidNestedHooksDispatcherOnUpdateInDEV=null;var InvalidNestedHooksDispatcherOnRerenderInDEV=null;{var warnInvalidContextAccess=function warnInvalidContextAccess(){error('Context can only be read while React is rendering. '+'In classes, you can read it in the render method or getDerivedStateFromProps. '+'In function components, you can read it directly in the function body, but not '+'inside Hooks like useReducer() or useMemo().');};var warnInvalidHookAccess=function warnInvalidHookAccess(){error('Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. '+'You can only call Hooks at the top level of your React function. '+'For more information, see '+'https://reactjs.org/link/rules-of-hooks');};HooksDispatcherOnMountInDEV={readContext:function readContext(context,observedBits){return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';mountHookTypesDev();checkDepsAreArrayDev(deps);return mountCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';mountHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';mountHookTypesDev();checkDepsAreArrayDev(deps);return mountEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';mountHookTypesDev();checkDepsAreArrayDev(deps);return mountImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';mountHookTypesDev();checkDepsAreArrayDev(deps);return mountLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';mountHookTypesDev();checkDepsAreArrayDev(deps);var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';mountHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';mountHookTypesDev();return mountRef(initialValue);},useState:function useState(initialState){currentHookNameInDev='useState';mountHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';mountHookTypesDev();return mountDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';mountHookTypesDev();return mountDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';mountHookTypesDev();return mountTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';mountHookTypesDev();return mountMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';mountHookTypesDev();return mountOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};HooksDispatcherOnMountWithHookTypesInDEV={readContext:function readContext(context,observedBits){return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';updateHookTypesDev();return mountCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';updateHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';updateHookTypesDev();return mountEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';updateHookTypesDev();return mountImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';updateHookTypesDev();return mountLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';updateHookTypesDev();return mountRef(initialValue);},useState:function useState(initialState){currentHookNameInDev='useState';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';updateHookTypesDev();return mountDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';updateHookTypesDev();return mountDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';updateHookTypesDev();return mountTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';updateHookTypesDev();return mountMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';updateHookTypesDev();return mountOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};HooksDispatcherOnUpdateInDEV={readContext:function readContext(context,observedBits){return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';updateHookTypesDev();return updateCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';updateHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';updateHookTypesDev();return updateEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';updateHookTypesDev();return updateImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';updateHookTypesDev();return updateLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';updateHookTypesDev();return updateRef();},useState:function useState(initialState){currentHookNameInDev='useState';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';updateHookTypesDev();return updateDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';updateHookTypesDev();return updateDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';updateHookTypesDev();return updateTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';updateHookTypesDev();return updateMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';updateHookTypesDev();return updateOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};HooksDispatcherOnRerenderInDEV={readContext:function readContext(context,observedBits){return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';updateHookTypesDev();return updateCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';updateHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';updateHookTypesDev();return updateEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';updateHookTypesDev();return updateImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';updateHookTypesDev();return updateLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnRerenderInDEV;try{return updateMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnRerenderInDEV;try{return rerenderReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';updateHookTypesDev();return updateRef();},useState:function useState(initialState){currentHookNameInDev='useState';updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnRerenderInDEV;try{return rerenderState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';updateHookTypesDev();return updateDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';updateHookTypesDev();return rerenderDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';updateHookTypesDev();return rerenderTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';updateHookTypesDev();return updateMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';updateHookTypesDev();return rerenderOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};InvalidNestedHooksDispatcherOnMountInDEV={readContext:function readContext(context,observedBits){warnInvalidContextAccess();return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';warnInvalidHookAccess();mountHookTypesDev();return mountCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';warnInvalidHookAccess();mountHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';warnInvalidHookAccess();mountHookTypesDev();return mountEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';warnInvalidHookAccess();mountHookTypesDev();return mountImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';warnInvalidHookAccess();mountHookTypesDev();return mountLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';warnInvalidHookAccess();mountHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';warnInvalidHookAccess();mountHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';warnInvalidHookAccess();mountHookTypesDev();return mountRef(initialValue);},useState:function useState(initialState){currentHookNameInDev='useState';warnInvalidHookAccess();mountHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnMountInDEV;try{return mountState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';warnInvalidHookAccess();mountHookTypesDev();return mountDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';warnInvalidHookAccess();mountHookTypesDev();return mountDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';warnInvalidHookAccess();mountHookTypesDev();return mountTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';warnInvalidHookAccess();mountHookTypesDev();return mountMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';warnInvalidHookAccess();mountHookTypesDev();return mountOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};InvalidNestedHooksDispatcherOnUpdateInDEV={readContext:function readContext(context,observedBits){warnInvalidContextAccess();return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';warnInvalidHookAccess();updateHookTypesDev();return updateCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';warnInvalidHookAccess();updateHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';warnInvalidHookAccess();updateHookTypesDev();return updateEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';warnInvalidHookAccess();updateHookTypesDev();return updateImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';warnInvalidHookAccess();updateHookTypesDev();return updateLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';warnInvalidHookAccess();updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';warnInvalidHookAccess();updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';warnInvalidHookAccess();updateHookTypesDev();return updateRef();},useState:function useState(initialState){currentHookNameInDev='useState';warnInvalidHookAccess();updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';warnInvalidHookAccess();updateHookTypesDev();return updateDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';warnInvalidHookAccess();updateHookTypesDev();return updateDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';warnInvalidHookAccess();updateHookTypesDev();return updateTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';warnInvalidHookAccess();updateHookTypesDev();return updateMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';warnInvalidHookAccess();updateHookTypesDev();return updateOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};InvalidNestedHooksDispatcherOnRerenderInDEV={readContext:function readContext(context,observedBits){warnInvalidContextAccess();return _readContext(context,observedBits);},useCallback:function useCallback(callback,deps){currentHookNameInDev='useCallback';warnInvalidHookAccess();updateHookTypesDev();return updateCallback(callback,deps);},useContext:function useContext(context,observedBits){currentHookNameInDev='useContext';warnInvalidHookAccess();updateHookTypesDev();return _readContext(context,observedBits);},useEffect:function useEffect(create,deps){currentHookNameInDev='useEffect';warnInvalidHookAccess();updateHookTypesDev();return updateEffect(create,deps);},useImperativeHandle:function useImperativeHandle(ref,create,deps){currentHookNameInDev='useImperativeHandle';warnInvalidHookAccess();updateHookTypesDev();return updateImperativeHandle(ref,create,deps);},useLayoutEffect:function useLayoutEffect(create,deps){currentHookNameInDev='useLayoutEffect';warnInvalidHookAccess();updateHookTypesDev();return updateLayoutEffect(create,deps);},useMemo:function useMemo(create,deps){currentHookNameInDev='useMemo';warnInvalidHookAccess();updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return updateMemo(create,deps);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useReducer:function useReducer(reducer,initialArg,init){currentHookNameInDev='useReducer';warnInvalidHookAccess();updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return rerenderReducer(reducer,initialArg,init);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useRef:function useRef(initialValue){currentHookNameInDev='useRef';warnInvalidHookAccess();updateHookTypesDev();return updateRef();},useState:function useState(initialState){currentHookNameInDev='useState';warnInvalidHookAccess();updateHookTypesDev();var prevDispatcher=ReactCurrentDispatcher$1.current;ReactCurrentDispatcher$1.current=InvalidNestedHooksDispatcherOnUpdateInDEV;try{return rerenderState(initialState);}finally{ReactCurrentDispatcher$1.current=prevDispatcher;}},useDebugValue:function useDebugValue(value,formatterFn){currentHookNameInDev='useDebugValue';warnInvalidHookAccess();updateHookTypesDev();return updateDebugValue();},useDeferredValue:function useDeferredValue(value){currentHookNameInDev='useDeferredValue';warnInvalidHookAccess();updateHookTypesDev();return rerenderDeferredValue(value);},useTransition:function useTransition(){currentHookNameInDev='useTransition';warnInvalidHookAccess();updateHookTypesDev();return rerenderTransition();},useMutableSource:function useMutableSource(source,getSnapshot,subscribe){currentHookNameInDev='useMutableSource';warnInvalidHookAccess();updateHookTypesDev();return updateMutableSource(source,getSnapshot,subscribe);},useOpaqueIdentifier:function useOpaqueIdentifier(){currentHookNameInDev='useOpaqueIdentifier';warnInvalidHookAccess();updateHookTypesDev();return rerenderOpaqueIdentifier();},unstable_isNewReconciler:enableNewReconciler};}var now$2=Scheduler.unstable_now;var commitTime=0;var profilerStartTime=-1;function getCommitTime(){return commitTime;}function recordCommitTime(){commitTime=now$2();}function startProfilerTimer(fiber){profilerStartTime=now$2();if(fiber.actualStartTime<0){fiber.actualStartTime=now$2();}}function stopProfilerTimerIfRunning(fiber){profilerStartTime=-1;}function stopProfilerTimerIfRunningAndRecordDelta(fiber,overrideBaseTime){if(profilerStartTime>=0){var elapsedTime=now$2()-profilerStartTime;fiber.actualDuration+=elapsedTime;if(overrideBaseTime){fiber.selfBaseDuration=elapsedTime;}profilerStartTime=-1;}}function transferActualDuration(fiber){// Transfer time spent rendering these children so we don't lose it
// after we rerender. This is used as a helper in special cases
// where we should count the work of multiple passes.
var child=fiber.child;while(child){fiber.actualDuration+=child.actualDuration;child=child.sibling;}}var ReactCurrentOwner$1=ReactSharedInternals.ReactCurrentOwner;var didReceiveUpdate=false;var didWarnAboutBadClass;var didWarnAboutModulePatternComponent;var didWarnAboutContextTypeOnFunctionComponent;var didWarnAboutGetDerivedStateOnFunctionComponent;var didWarnAboutFunctionRefs;var didWarnAboutReassigningProps;var didWarnAboutRevealOrder;var didWarnAboutTailOptions;{didWarnAboutBadClass={};didWarnAboutModulePatternComponent={};didWarnAboutContextTypeOnFunctionComponent={};didWarnAboutGetDerivedStateOnFunctionComponent={};didWarnAboutFunctionRefs={};didWarnAboutReassigningProps=false;didWarnAboutRevealOrder={};didWarnAboutTailOptions={};}function reconcileChildren(current,workInProgress,nextChildren,renderLanes){if(current===null){// If this is a fresh new component that hasn't been rendered yet, we
// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
workInProgress.child=mountChildFibers(workInProgress,null,nextChildren,renderLanes);}else{// If the current child is the same as the work in progress, it means that
// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
workInProgress.child=reconcileChildFibers(workInProgress,current.child,nextChildren,renderLanes);}}function forceUnmountCurrentAndReconcile(current,workInProgress,nextChildren,renderLanes){// This function is fork of reconcileChildren. It's used in cases where we
// want to reconcile without matching against the existing set. This has the
// effect of all current children being unmounted; even if the type and key
// are the same, the old child is unmounted and a new child is created.
//
// To do this, we're going to go through the reconcile algorithm twice. In
// the first pass, we schedule a deletion for all the current children by
// passing null.
workInProgress.child=reconcileChildFibers(workInProgress,current.child,null,renderLanes);// In the second pass, we mount the new children. The trick here is that we
// pass null in place of where we usually pass the current child set. This has
// the effect of remounting all children regardless of whether their
// identities match.
workInProgress.child=reconcileChildFibers(workInProgress,null,nextChildren,renderLanes);}function updateForwardRef(current,workInProgress,Component,nextProps,renderLanes){// TODO: current can be non-null here even if the component
// hasn't yet mounted. This happens after the first render suspends.
// We'll need to figure out if this is fine or can cause issues.
{if(workInProgress.type!==workInProgress.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var innerPropTypes=Component.propTypes;if(innerPropTypes){checkPropTypes(innerPropTypes,nextProps,// Resolved props
'prop',getComponentName(Component));}}}var render=Component.render;var ref=workInProgress.ref;// The rest is a fork of updateFunctionComponent
var nextChildren;prepareToReadContext(workInProgress,renderLanes);{ReactCurrentOwner$1.current=workInProgress;setIsRendering(true);nextChildren=renderWithHooks(current,workInProgress,render,nextProps,ref,renderLanes);if(workInProgress.mode&StrictMode){disableLogs();try{nextChildren=renderWithHooks(current,workInProgress,render,nextProps,ref,renderLanes);}finally{reenableLogs();}}setIsRendering(false);}if(current!==null&&!didReceiveUpdate){bailoutHooks(current,workInProgress,renderLanes);return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}// React DevTools reads this flag.
workInProgress.flags|=PerformedWork;reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function updateMemoComponent(current,workInProgress,Component,nextProps,updateLanes,renderLanes){if(current===null){var type=Component.type;if(isSimpleFunctionComponent(type)&&Component.compare===null&&// SimpleMemoComponent codepath doesn't resolve outer props either.
Component.defaultProps===undefined){var resolvedType=type;{resolvedType=resolveFunctionForHotReloading(type);}// If this is a plain function component without default props,
// and with only the default shallow comparison, we upgrade it
// to a SimpleMemoComponent to allow fast path updates.
workInProgress.tag=SimpleMemoComponent;workInProgress.type=resolvedType;{validateFunctionComponentInDev(workInProgress,type);}return updateSimpleMemoComponent(current,workInProgress,resolvedType,nextProps,updateLanes,renderLanes);}{var innerPropTypes=type.propTypes;if(innerPropTypes){// Inner memo component props aren't currently validated in createElement.
// We could move it there, but we'd still need this for lazy code path.
checkPropTypes(innerPropTypes,nextProps,// Resolved props
'prop',getComponentName(type));}}var child=createFiberFromTypeAndProps(Component.type,null,nextProps,workInProgress,workInProgress.mode,renderLanes);child.ref=workInProgress.ref;child.return=workInProgress;workInProgress.child=child;return child;}{var _type=Component.type;var _innerPropTypes=_type.propTypes;if(_innerPropTypes){// Inner memo component props aren't currently validated in createElement.
// We could move it there, but we'd still need this for lazy code path.
checkPropTypes(_innerPropTypes,nextProps,// Resolved props
'prop',getComponentName(_type));}}var currentChild=current.child;// This is always exactly one child
if(!includesSomeLane(updateLanes,renderLanes)){// This will be the props with resolved defaultProps,
// unlike current.memoizedProps which will be the unresolved ones.
var prevProps=currentChild.memoizedProps;// Default to shallow comparison
var compare=Component.compare;compare=compare!==null?compare:shallowEqual;if(compare(prevProps,nextProps)&&current.ref===workInProgress.ref){return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}}// React DevTools reads this flag.
workInProgress.flags|=PerformedWork;var newChild=createWorkInProgress(currentChild,nextProps);newChild.ref=workInProgress.ref;newChild.return=workInProgress;workInProgress.child=newChild;return newChild;}function updateSimpleMemoComponent(current,workInProgress,Component,nextProps,updateLanes,renderLanes){// TODO: current can be non-null here even if the component
// hasn't yet mounted. This happens when the inner render suspends.
// We'll need to figure out if this is fine or can cause issues.
{if(workInProgress.type!==workInProgress.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var outerMemoType=workInProgress.elementType;if(outerMemoType.$$typeof===REACT_LAZY_TYPE){// We warn when you define propTypes on lazy()
// so let's just skip over it to find memo() outer wrapper.
// Inner props for memo are validated later.
var lazyComponent=outerMemoType;var payload=lazyComponent._payload;var init=lazyComponent._init;try{outerMemoType=init(payload);}catch(x){outerMemoType=null;}// Inner propTypes will be validated in the function component path.
var outerPropTypes=outerMemoType&&outerMemoType.propTypes;if(outerPropTypes){checkPropTypes(outerPropTypes,nextProps,// Resolved (SimpleMemoComponent has no defaultProps)
'prop',getComponentName(outerMemoType));}}}}if(current!==null){var prevProps=current.memoizedProps;if(shallowEqual(prevProps,nextProps)&&current.ref===workInProgress.ref&&// Prevent bailout if the implementation changed due to hot reload.
workInProgress.type===current.type){didReceiveUpdate=false;if(!includesSomeLane(renderLanes,updateLanes)){// The pending lanes were cleared at the beginning of beginWork. We're
// about to bail out, but there might be other lanes that weren't
// included in the current render. Usually, the priority level of the
// remaining updates is accumlated during the evaluation of the
// component (i.e. when processing the update queue). But since since
// we're bailing out early *without* evaluating the component, we need
// to account for it here, too. Reset to the value of the current fiber.
// NOTE: This only applies to SimpleMemoComponent, not MemoComponent,
// because a MemoComponent fiber does not have hooks or an update queue;
// rather, it wraps around an inner component, which may or may not
// contains hooks.
// TODO: Move the reset at in beginWork out of the common path so that
// this is no longer necessary.
workInProgress.lanes=current.lanes;return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}else if((current.flags&ForceUpdateForLegacySuspense)!==NoFlags){// This is a special case that only exists for legacy mode.
// See https://github.com/facebook/react/pull/19216.
didReceiveUpdate=true;}}}return updateFunctionComponent(current,workInProgress,Component,nextProps,renderLanes);}function updateOffscreenComponent(current,workInProgress,renderLanes){var nextProps=workInProgress.pendingProps;var nextChildren=nextProps.children;var prevState=current!==null?current.memoizedState:null;if(nextProps.mode==='hidden'||nextProps.mode==='unstable-defer-without-hiding'){if((workInProgress.mode&ConcurrentMode)===NoMode){// In legacy sync mode, don't defer the subtree. Render it now.
// TODO: Figure out what we should do in Blocking mode.
var nextState={baseLanes:NoLanes};workInProgress.memoizedState=nextState;pushRenderLanes(workInProgress,renderLanes);}else if(!includesSomeLane(renderLanes,OffscreenLane)){var nextBaseLanes;if(prevState!==null){var prevBaseLanes=prevState.baseLanes;nextBaseLanes=mergeLanes(prevBaseLanes,renderLanes);}else{nextBaseLanes=renderLanes;}// Schedule this fiber to re-render at offscreen priority. Then bailout.
{markSpawnedWork(OffscreenLane);}workInProgress.lanes=workInProgress.childLanes=laneToLanes(OffscreenLane);var _nextState={baseLanes:nextBaseLanes};workInProgress.memoizedState=_nextState;// We're about to bail out, but we need to push this to the stack anyway
// to avoid a push/pop misalignment.
pushRenderLanes(workInProgress,nextBaseLanes);return null;}else{// Rendering at offscreen, so we can clear the base lanes.
var _nextState2={baseLanes:NoLanes};workInProgress.memoizedState=_nextState2;// Push the lanes that were skipped when we bailed out.
var subtreeRenderLanes=prevState!==null?prevState.baseLanes:renderLanes;pushRenderLanes(workInProgress,subtreeRenderLanes);}}else{var _subtreeRenderLanes;if(prevState!==null){_subtreeRenderLanes=mergeLanes(prevState.baseLanes,renderLanes);// Since we're not hidden anymore, reset the state
workInProgress.memoizedState=null;}else{// We weren't previously hidden, and we still aren't, so there's nothing
// special to do. Need to push to the stack regardless, though, to avoid
// a push/pop misalignment.
_subtreeRenderLanes=renderLanes;}pushRenderLanes(workInProgress,_subtreeRenderLanes);}reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}// Note: These happen to have identical begin phases, for now. We shouldn't hold
// ourselves to this constraint, though. If the behavior diverges, we should
// fork the function.
var updateLegacyHiddenComponent=updateOffscreenComponent;function updateFragment(current,workInProgress,renderLanes){var nextChildren=workInProgress.pendingProps;reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function updateMode(current,workInProgress,renderLanes){var nextChildren=workInProgress.pendingProps.children;reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function updateProfiler(current,workInProgress,renderLanes){{workInProgress.flags|=Update;// Reset effect durations for the next eventual effect phase.
// These are reset during render to allow the DevTools commit hook a chance to read them,
var stateNode=workInProgress.stateNode;stateNode.effectDuration=0;stateNode.passiveEffectDuration=0;}var nextProps=workInProgress.pendingProps;var nextChildren=nextProps.children;reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function markRef(current,workInProgress){var ref=workInProgress.ref;if(current===null&&ref!==null||current!==null&&current.ref!==ref){// Schedule a Ref effect
workInProgress.flags|=Ref;}}function updateFunctionComponent(current,workInProgress,Component,nextProps,renderLanes){{if(workInProgress.type!==workInProgress.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var innerPropTypes=Component.propTypes;if(innerPropTypes){checkPropTypes(innerPropTypes,nextProps,// Resolved props
'prop',getComponentName(Component));}}}var context;{var unmaskedContext=getUnmaskedContext(workInProgress,Component,true);context=getMaskedContext(workInProgress,unmaskedContext);}var nextChildren;prepareToReadContext(workInProgress,renderLanes);{ReactCurrentOwner$1.current=workInProgress;setIsRendering(true);nextChildren=renderWithHooks(current,workInProgress,Component,nextProps,context,renderLanes);if(workInProgress.mode&StrictMode){disableLogs();try{nextChildren=renderWithHooks(current,workInProgress,Component,nextProps,context,renderLanes);}finally{reenableLogs();}}setIsRendering(false);}if(current!==null&&!didReceiveUpdate){bailoutHooks(current,workInProgress,renderLanes);return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}// React DevTools reads this flag.
workInProgress.flags|=PerformedWork;reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function updateClassComponent(current,workInProgress,Component,nextProps,renderLanes){{if(workInProgress.type!==workInProgress.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var innerPropTypes=Component.propTypes;if(innerPropTypes){checkPropTypes(innerPropTypes,nextProps,// Resolved props
'prop',getComponentName(Component));}}}// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext;if(isContextProvider(Component)){hasContext=true;pushContextProvider(workInProgress);}else{hasContext=false;}prepareToReadContext(workInProgress,renderLanes);var instance=workInProgress.stateNode;var shouldUpdate;if(instance===null){if(current!==null){// A class component without an instance only mounts if it suspended
// inside a non-concurrent tree, in an inconsistent state. We want to
// treat it like a new mount, even though an empty version of it already
// committed. Disconnect the alternate pointers.
current.alternate=null;workInProgress.alternate=null;// Since this is conceptually a new fiber, schedule a Placement effect
workInProgress.flags|=Placement;}// In the initial pass we might need to construct the instance.
constructClassInstance(workInProgress,Component,nextProps);mountClassInstance(workInProgress,Component,nextProps,renderLanes);shouldUpdate=true;}else if(current===null){// In a resume, we'll already have an instance we can reuse.
shouldUpdate=resumeMountClassInstance(workInProgress,Component,nextProps,renderLanes);}else{shouldUpdate=updateClassInstance(current,workInProgress,Component,nextProps,renderLanes);}var nextUnitOfWork=finishClassComponent(current,workInProgress,Component,shouldUpdate,hasContext,renderLanes);{var inst=workInProgress.stateNode;if(shouldUpdate&&inst.props!==nextProps){if(!didWarnAboutReassigningProps){error('It looks like %s is reassigning its own `this.props` while rendering. '+'This is not supported and can lead to confusing bugs.',getComponentName(workInProgress.type)||'a component');}didWarnAboutReassigningProps=true;}}return nextUnitOfWork;}function finishClassComponent(current,workInProgress,Component,shouldUpdate,hasContext,renderLanes){// Refs should update even if shouldComponentUpdate returns false
markRef(current,workInProgress);var didCaptureError=(workInProgress.flags&DidCapture)!==NoFlags;if(!shouldUpdate&&!didCaptureError){// Context providers should defer to sCU for rendering
if(hasContext){invalidateContextProvider(workInProgress,Component,false);}return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}var instance=workInProgress.stateNode;// Rerender
ReactCurrentOwner$1.current=workInProgress;var nextChildren;if(didCaptureError&&typeof Component.getDerivedStateFromError!=='function'){// If we captured an error, but getDerivedStateFromError is not defined,
// unmount all the children. componentDidCatch will schedule an update to
// re-render a fallback. This is temporary until we migrate everyone to
// the new API.
// TODO: Warn in a future release.
nextChildren=null;{stopProfilerTimerIfRunning();}}else{{setIsRendering(true);nextChildren=instance.render();if(workInProgress.mode&StrictMode){disableLogs();try{instance.render();}finally{reenableLogs();}}setIsRendering(false);}}// React DevTools reads this flag.
workInProgress.flags|=PerformedWork;if(current!==null&&didCaptureError){// If we're recovering from an error, reconcile without reusing any of
// the existing children. Conceptually, the normal children and the children
// that are shown on error are two different sets, so we shouldn't reuse
// normal children even if their identities match.
forceUnmountCurrentAndReconcile(current,workInProgress,nextChildren,renderLanes);}else{reconcileChildren(current,workInProgress,nextChildren,renderLanes);}// Memoize state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
workInProgress.memoizedState=instance.state;// The context might have changed so we need to recalculate it.
if(hasContext){invalidateContextProvider(workInProgress,Component,true);}return workInProgress.child;}function pushHostRootContext(workInProgress){var root=workInProgress.stateNode;if(root.pendingContext){pushTopLevelContextObject(workInProgress,root.pendingContext,root.pendingContext!==root.context);}else if(root.context){// Should always be set
pushTopLevelContextObject(workInProgress,root.context,false);}pushHostContainer(workInProgress,root.containerInfo);}function updateHostRoot(current,workInProgress,renderLanes){pushHostRootContext(workInProgress);var updateQueue=workInProgress.updateQueue;if(!(current!==null&&updateQueue!==null)){{throw Error("If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue.");}}var nextProps=workInProgress.pendingProps;var prevState=workInProgress.memoizedState;var prevChildren=prevState!==null?prevState.element:null;cloneUpdateQueue(current,workInProgress);processUpdateQueue(workInProgress,nextProps,null,renderLanes);var nextState=workInProgress.memoizedState;// Caution: React DevTools currently depends on this property
// being called "element".
var nextChildren=nextState.element;if(nextChildren===prevChildren){resetHydrationState();return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}var root=workInProgress.stateNode;if(root.hydrate&&enterHydrationState(workInProgress)){// If we don't have any current children this might be the first pass.
// We always try to hydrate. If this isn't a hydration pass there won't
// be any children to hydrate which is effectively the same thing as
// not hydrating.
if(supportsHydration){var mutableSourceEagerHydrationData=root.mutableSourceEagerHydrationData;if(mutableSourceEagerHydrationData!=null){for(var i=0;i<mutableSourceEagerHydrationData.length;i+=2){var mutableSource=mutableSourceEagerHydrationData[i];var version=mutableSourceEagerHydrationData[i+1];setWorkInProgressVersion(mutableSource,version);}}}var child=mountChildFibers(workInProgress,null,nextChildren,renderLanes);workInProgress.child=child;var node=child;while(node){// Mark each child as hydrating. This is a fast path to know whether this
// tree is part of a hydrating tree. This is used to determine if a child
// node has fully mounted yet, and for scheduling event replaying.
// Conceptually this is similar to Placement in that a new subtree is
// inserted into the React tree here. It just happens to not need DOM
// mutations because it already exists.
node.flags=node.flags&~Placement|Hydrating;node=node.sibling;}}else{// Otherwise reset hydration state in case we aborted and resumed another
// root.
reconcileChildren(current,workInProgress,nextChildren,renderLanes);resetHydrationState();}return workInProgress.child;}function updateHostComponent(current,workInProgress,renderLanes){pushHostContext(workInProgress);if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var type=workInProgress.type;var nextProps=workInProgress.pendingProps;var prevProps=current!==null?current.memoizedProps:null;var nextChildren=nextProps.children;var isDirectTextChild=shouldSetTextContent(type,nextProps);if(isDirectTextChild){// We special case a direct text child of a host node. This is a common
// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also has access to this prop. That
// avoids allocating another HostText fiber and traversing it.
nextChildren=null;}else if(prevProps!==null&&shouldSetTextContent(type,prevProps)){// If we're switching from a direct text child to a normal child, or to
// empty, we need to schedule the text content to be reset.
workInProgress.flags|=ContentReset;}markRef(current,workInProgress);reconcileChildren(current,workInProgress,nextChildren,renderLanes);return workInProgress.child;}function updateHostText(current,workInProgress){if(current===null){tryToClaimNextHydratableInstance(workInProgress);}// Nothing to do here. This is terminal. We'll do the completion step
// immediately after.
return null;}function mountLazyComponent(_current,workInProgress,elementType,updateLanes,renderLanes){if(_current!==null){// A lazy component only mounts if it suspended inside a non-
// concurrent tree, in an inconsistent state. We want to treat it like
// a new mount, even though an empty version of it already committed.
// Disconnect the alternate pointers.
_current.alternate=null;workInProgress.alternate=null;// Since this is conceptually a new fiber, schedule a Placement effect
workInProgress.flags|=Placement;}var props=workInProgress.pendingProps;var lazyComponent=elementType;var payload=lazyComponent._payload;var init=lazyComponent._init;var Component=init(payload);// Store the unwrapped component in the type.
workInProgress.type=Component;var resolvedTag=workInProgress.tag=resolveLazyComponentTag(Component);var resolvedProps=resolveDefaultProps(Component,props);var child;switch(resolvedTag){case FunctionComponent:{{validateFunctionComponentInDev(workInProgress,Component);workInProgress.type=Component=resolveFunctionForHotReloading(Component);}child=updateFunctionComponent(null,workInProgress,Component,resolvedProps,renderLanes);return child;}case ClassComponent:{{workInProgress.type=Component=resolveClassForHotReloading(Component);}child=updateClassComponent(null,workInProgress,Component,resolvedProps,renderLanes);return child;}case ForwardRef:{{workInProgress.type=Component=resolveForwardRefForHotReloading(Component);}child=updateForwardRef(null,workInProgress,Component,resolvedProps,renderLanes);return child;}case MemoComponent:{{if(workInProgress.type!==workInProgress.elementType){var outerPropTypes=Component.propTypes;if(outerPropTypes){checkPropTypes(outerPropTypes,resolvedProps,// Resolved for outer only
'prop',getComponentName(Component));}}}child=updateMemoComponent(null,workInProgress,Component,resolveDefaultProps(Component.type,resolvedProps),// The inner type can have defaults too
updateLanes,renderLanes);return child;}}var hint='';{if(Component!==null&&typeof Component==='object'&&Component.$$typeof===REACT_LAZY_TYPE){hint=' Did you wrap a component in React.lazy() more than once?';}}// This message intentionally doesn't mention ForwardRef or MemoComponent
// because the fact that it's a separate type of work is an
// implementation detail.
{{throw Error("Element type is invalid. Received a promise that resolves to: "+Component+". Lazy element type must resolve to a class or function."+hint);}}}function mountIncompleteClassComponent(_current,workInProgress,Component,nextProps,renderLanes){if(_current!==null){// An incomplete component only mounts if it suspended inside a non-
// concurrent tree, in an inconsistent state. We want to treat it like
// a new mount, even though an empty version of it already committed.
// Disconnect the alternate pointers.
_current.alternate=null;workInProgress.alternate=null;// Since this is conceptually a new fiber, schedule a Placement effect
workInProgress.flags|=Placement;}// Promote the fiber to a class and try rendering again.
workInProgress.tag=ClassComponent;// The rest of this function is a fork of `updateClassComponent`
// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext;if(isContextProvider(Component)){hasContext=true;pushContextProvider(workInProgress);}else{hasContext=false;}prepareToReadContext(workInProgress,renderLanes);constructClassInstance(workInProgress,Component,nextProps);mountClassInstance(workInProgress,Component,nextProps,renderLanes);return finishClassComponent(null,workInProgress,Component,true,hasContext,renderLanes);}function mountIndeterminateComponent(_current,workInProgress,Component,renderLanes){if(_current!==null){// An indeterminate component only mounts if it suspended inside a non-
// concurrent tree, in an inconsistent state. We want to treat it like
// a new mount, even though an empty version of it already committed.
// Disconnect the alternate pointers.
_current.alternate=null;workInProgress.alternate=null;// Since this is conceptually a new fiber, schedule a Placement effect
workInProgress.flags|=Placement;}var props=workInProgress.pendingProps;var context;{var unmaskedContext=getUnmaskedContext(workInProgress,Component,false);context=getMaskedContext(workInProgress,unmaskedContext);}prepareToReadContext(workInProgress,renderLanes);var value;{if(Component.prototype&&typeof Component.prototype.render==='function'){var componentName=getComponentName(Component)||'Unknown';if(!didWarnAboutBadClass[componentName]){error("The <%s /> component appears to have a render method, but doesn't extend React.Component. "+'This is likely to cause errors. Change %s to extend React.Component instead.',componentName,componentName);didWarnAboutBadClass[componentName]=true;}}if(workInProgress.mode&StrictMode){ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress,null);}setIsRendering(true);ReactCurrentOwner$1.current=workInProgress;value=renderWithHooks(null,workInProgress,Component,props,context,renderLanes);setIsRendering(false);}// React DevTools reads this flag.
workInProgress.flags|=PerformedWork;{// Support for module components is deprecated and is removed behind a flag.
// Whether or not it would crash later, we want to show a good message in DEV first.
if(typeof value==='object'&&value!==null&&typeof value.render==='function'&&value.$$typeof===undefined){var _componentName=getComponentName(Component)||'Unknown';if(!didWarnAboutModulePatternComponent[_componentName]){error('The <%s /> component appears to be a function component that returns a class instance. '+'Change %s to a class that extends React.Component instead. '+"If you can't use a class try assigning the prototype on the function as a workaround. "+"`%s.prototype = React.Component.prototype`. Don't use an arrow function since it "+'cannot be called with `new` by React.',_componentName,_componentName,_componentName);didWarnAboutModulePatternComponent[_componentName]=true;}}}if(// Run these checks in production only if the flag is off.
// Eventually we'll delete this branch altogether.
typeof value==='object'&&value!==null&&typeof value.render==='function'&&value.$$typeof===undefined){{var _componentName2=getComponentName(Component)||'Unknown';if(!didWarnAboutModulePatternComponent[_componentName2]){error('The <%s /> component appears to be a function component that returns a class instance. '+'Change %s to a class that extends React.Component instead. '+"If you can't use a class try assigning the prototype on the function as a workaround. "+"`%s.prototype = React.Component.prototype`. Don't use an arrow function since it "+'cannot be called with `new` by React.',_componentName2,_componentName2,_componentName2);didWarnAboutModulePatternComponent[_componentName2]=true;}}// Proceed under the assumption that this is a class instance
workInProgress.tag=ClassComponent;// Throw out any hooks that were used.
workInProgress.memoizedState=null;workInProgress.updateQueue=null;// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=false;if(isContextProvider(Component)){hasContext=true;pushContextProvider(workInProgress);}else{hasContext=false;}workInProgress.memoizedState=value.state!==null&&value.state!==undefined?value.state:null;initializeUpdateQueue(workInProgress);var getDerivedStateFromProps=Component.getDerivedStateFromProps;if(typeof getDerivedStateFromProps==='function'){applyDerivedStateFromProps(workInProgress,Component,getDerivedStateFromProps,props);}adoptClassInstance(workInProgress,value);mountClassInstance(workInProgress,Component,props,renderLanes);return finishClassComponent(null,workInProgress,Component,true,hasContext,renderLanes);}else{// Proceed under the assumption that this is a function component
workInProgress.tag=FunctionComponent;{if(workInProgress.mode&StrictMode){disableLogs();try{value=renderWithHooks(null,workInProgress,Component,props,context,renderLanes);}finally{reenableLogs();}}}reconcileChildren(null,workInProgress,value,renderLanes);{validateFunctionComponentInDev(workInProgress,Component);}return workInProgress.child;}}function validateFunctionComponentInDev(workInProgress,Component){{if(Component){if(Component.childContextTypes){error('%s(...): childContextTypes cannot be defined on a function component.',Component.displayName||Component.name||'Component');}}if(workInProgress.ref!==null){var info='';var ownerName=getCurrentFiberOwnerNameInDevOrNull();if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}var warningKey=ownerName||workInProgress._debugID||'';var debugSource=workInProgress._debugSource;if(debugSource){warningKey=debugSource.fileName+':'+debugSource.lineNumber;}if(!didWarnAboutFunctionRefs[warningKey]){didWarnAboutFunctionRefs[warningKey]=true;error('Function components cannot be given refs. '+'Attempts to access this ref will fail. '+'Did you mean to use React.forwardRef()?%s',info);}}if(typeof Component.getDerivedStateFromProps==='function'){var _componentName3=getComponentName(Component)||'Unknown';if(!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]){error('%s: Function components do not support getDerivedStateFromProps.',_componentName3);didWarnAboutGetDerivedStateOnFunctionComponent[_componentName3]=true;}}if(typeof Component.contextType==='object'&&Component.contextType!==null){var _componentName4=getComponentName(Component)||'Unknown';if(!didWarnAboutContextTypeOnFunctionComponent[_componentName4]){error('%s: Function components do not support contextType.',_componentName4);didWarnAboutContextTypeOnFunctionComponent[_componentName4]=true;}}}}var SUSPENDED_MARKER={dehydrated:null,retryLane:NoLane};function mountSuspenseOffscreenState(renderLanes){return{baseLanes:renderLanes};}function updateSuspenseOffscreenState(prevOffscreenState,renderLanes){return{baseLanes:mergeLanes(prevOffscreenState.baseLanes,renderLanes)};}// TODO: Probably should inline this back
function shouldRemainOnFallback(suspenseContext,current,workInProgress,renderLanes){// If we're already showing a fallback, there are cases where we need to
// remain on that fallback regardless of whether the content has resolved.
// For example, SuspenseList coordinates when nested content appears.
if(current!==null){var suspenseState=current.memoizedState;if(suspenseState===null){// Currently showing content. Don't hide it, even if ForceSuspenseFallack
// is true. More precise name might be "ForceRemainSuspenseFallback".
// Note: This is a factoring smell. Can't remain on a fallback if there's
// no fallback to remain on.
return false;}}// Not currently showing content. Consult the Suspense context.
return hasSuspenseContext(suspenseContext,ForceSuspenseFallback);}function getRemainingWorkInPrimaryTree(current,renderLanes){// TODO: Should not remove render lanes that were pinged during this render
return removeLanes(current.childLanes,renderLanes);}function updateSuspenseComponent(current,workInProgress,renderLanes){var nextProps=workInProgress.pendingProps;// This is used by DevTools to force a boundary to suspend.
{if(shouldSuspend(workInProgress)){workInProgress.flags|=DidCapture;}}var suspenseContext=suspenseStackCursor.current;var showFallback=false;var didSuspend=(workInProgress.flags&DidCapture)!==NoFlags;if(didSuspend||shouldRemainOnFallback(suspenseContext,current)){// Something in this boundary's subtree already suspended. Switch to
// rendering the fallback children.
showFallback=true;workInProgress.flags&=~DidCapture;}else{// Attempting the main content
if(current===null||current.memoizedState!==null){// This is a new mount or this boundary is already showing a fallback state.
// Mark this subtree context as having at least one invisible parent that could
// handle the fallback state.
// Boundaries without fallbacks or should be avoided are not considered since
// they cannot handle preferred fallback states.
if(nextProps.fallback!==undefined&&nextProps.unstable_avoidThisFallback!==true){suspenseContext=addSubtreeSuspenseContext(suspenseContext,InvisibleParentSuspenseContext);}}}suspenseContext=setDefaultShallowSuspenseContext(suspenseContext);pushSuspenseContext(workInProgress,suspenseContext);// OK, the next part is confusing. We're about to reconcile the Suspense
// boundary's children. This involves some custom reconcilation logic. Two
// main reasons this is so complicated.
//
// First, Legacy Mode has different semantics for backwards compatibility. The
// primary tree will commit in an inconsistent state, so when we do the
// second pass to render the fallback, we do some exceedingly, uh, clever
// hacks to make that not totally break. Like transferring effects and
// deletions from hidden tree. In Concurrent Mode, it's much simpler,
// because we bailout on the primary tree completely and leave it in its old
// state, no effects. Same as what we do for Offscreen (except that
// Offscreen doesn't have the first render pass).
//
// Second is hydration. During hydration, the Suspense fiber has a slightly
// different layout, where the child points to a dehydrated fragment, which
// contains the DOM rendered by the server.
//
// Third, even if you set all that aside, Suspense is like error boundaries in
// that we first we try to render one tree, and if that fails, we render again
// and switch to a different tree. Like a try/catch block. So we have to track
// which branch we're currently rendering. Ideally we would model this using
// a stack.
if(current===null){// Initial mount
// If we're currently hydrating, try to hydrate this boundary.
// But only if this has a fallback.
if(nextProps.fallback!==undefined){tryToClaimNextHydratableInstance(workInProgress);// This could've been a dehydrated suspense component.
}var nextPrimaryChildren=nextProps.children;var nextFallbackChildren=nextProps.fallback;if(showFallback){var fallbackFragment=mountSuspenseFallbackChildren(workInProgress,nextPrimaryChildren,nextFallbackChildren,renderLanes);var primaryChildFragment=workInProgress.child;primaryChildFragment.memoizedState=mountSuspenseOffscreenState(renderLanes);workInProgress.memoizedState=SUSPENDED_MARKER;return fallbackFragment;}else if(typeof nextProps.unstable_expectedLoadTime==='number'){// This is a CPU-bound tree. Skip this tree and show a placeholder to
// unblock the surrounding content. Then immediately retry after the
// initial commit.
var _fallbackFragment=mountSuspenseFallbackChildren(workInProgress,nextPrimaryChildren,nextFallbackChildren,renderLanes);var _primaryChildFragment=workInProgress.child;_primaryChildFragment.memoizedState=mountSuspenseOffscreenState(renderLanes);workInProgress.memoizedState=SUSPENDED_MARKER;// Since nothing actually suspended, there will nothing to ping this to
// get it started back up to attempt the next item. While in terms of
// priority this work has the same priority as this current render, it's
// not part of the same transition once the transition has committed. If
// it's sync, we still want to yield so that it can be painted.
// Conceptually, this is really the same as pinging. We can use any
// RetryLane even if it's the one currently rendering since we're leaving
// it behind on this node.
workInProgress.lanes=SomeRetryLane;{markSpawnedWork(SomeRetryLane);}return _fallbackFragment;}else{return mountSuspensePrimaryChildren(workInProgress,nextPrimaryChildren,renderLanes);}}else{// This is an update.
// If the current fiber has a SuspenseState, that means it's already showing
// a fallback.
var prevState=current.memoizedState;if(prevState!==null){if(showFallback){var _nextFallbackChildren2=nextProps.fallback;var _nextPrimaryChildren2=nextProps.children;var _fallbackChildFragment=updateSuspenseFallbackChildren(current,workInProgress,_nextPrimaryChildren2,_nextFallbackChildren2,renderLanes);var _primaryChildFragment3=workInProgress.child;var prevOffscreenState=current.child.memoizedState;_primaryChildFragment3.memoizedState=prevOffscreenState===null?mountSuspenseOffscreenState(renderLanes):updateSuspenseOffscreenState(prevOffscreenState,renderLanes);_primaryChildFragment3.childLanes=getRemainingWorkInPrimaryTree(current,renderLanes);workInProgress.memoizedState=SUSPENDED_MARKER;return _fallbackChildFragment;}else{var _nextPrimaryChildren3=nextProps.children;var _primaryChildFragment4=updateSuspensePrimaryChildren(current,workInProgress,_nextPrimaryChildren3,renderLanes);workInProgress.memoizedState=null;return _primaryChildFragment4;}}else{// The current tree is not already showing a fallback.
if(showFallback){// Timed out.
var _nextFallbackChildren3=nextProps.fallback;var _nextPrimaryChildren4=nextProps.children;var _fallbackChildFragment2=updateSuspenseFallbackChildren(current,workInProgress,_nextPrimaryChildren4,_nextFallbackChildren3,renderLanes);var _primaryChildFragment5=workInProgress.child;var _prevOffscreenState=current.child.memoizedState;_primaryChildFragment5.memoizedState=_prevOffscreenState===null?mountSuspenseOffscreenState(renderLanes):updateSuspenseOffscreenState(_prevOffscreenState,renderLanes);_primaryChildFragment5.childLanes=getRemainingWorkInPrimaryTree(current,renderLanes);// Skip the primary children, and continue working on the
// fallback children.
workInProgress.memoizedState=SUSPENDED_MARKER;return _fallbackChildFragment2;}else{// Still haven't timed out. Continue rendering the children, like we
// normally do.
var _nextPrimaryChildren5=nextProps.children;var _primaryChildFragment6=updateSuspensePrimaryChildren(current,workInProgress,_nextPrimaryChildren5,renderLanes);workInProgress.memoizedState=null;return _primaryChildFragment6;}}}}function mountSuspensePrimaryChildren(workInProgress,primaryChildren,renderLanes){var mode=workInProgress.mode;var primaryChildProps={mode:'visible',children:primaryChildren};var primaryChildFragment=createFiberFromOffscreen(primaryChildProps,mode,renderLanes,null);primaryChildFragment.return=workInProgress;workInProgress.child=primaryChildFragment;return primaryChildFragment;}function mountSuspenseFallbackChildren(workInProgress,primaryChildren,fallbackChildren,renderLanes){var mode=workInProgress.mode;var progressedPrimaryFragment=workInProgress.child;var primaryChildProps={mode:'hidden',children:primaryChildren};var primaryChildFragment;var fallbackChildFragment;if((mode&BlockingMode)===NoMode&&progressedPrimaryFragment!==null){// In legacy mode, we commit the primary tree as if it successfully
// completed, even though it's in an inconsistent state.
primaryChildFragment=progressedPrimaryFragment;primaryChildFragment.childLanes=NoLanes;primaryChildFragment.pendingProps=primaryChildProps;if(workInProgress.mode&ProfileMode){// Reset the durations from the first pass so they aren't included in the
// final amounts. This seems counterintuitive, since we're intentionally
// not measuring part of the render phase, but this makes it match what we
// do in Concurrent Mode.
primaryChildFragment.actualDuration=0;primaryChildFragment.actualStartTime=-1;primaryChildFragment.selfBaseDuration=0;primaryChildFragment.treeBaseDuration=0;}fallbackChildFragment=createFiberFromFragment(fallbackChildren,mode,renderLanes,null);}else{primaryChildFragment=createFiberFromOffscreen(primaryChildProps,mode,NoLanes,null);fallbackChildFragment=createFiberFromFragment(fallbackChildren,mode,renderLanes,null);}primaryChildFragment.return=workInProgress;fallbackChildFragment.return=workInProgress;primaryChildFragment.sibling=fallbackChildFragment;workInProgress.child=primaryChildFragment;return fallbackChildFragment;}function createWorkInProgressOffscreenFiber(current,offscreenProps){// The props argument to `createWorkInProgress` is `any` typed, so we use this
// wrapper function to constrain it.
return createWorkInProgress(current,offscreenProps);}function updateSuspensePrimaryChildren(current,workInProgress,primaryChildren,renderLanes){var currentPrimaryChildFragment=current.child;var currentFallbackChildFragment=currentPrimaryChildFragment.sibling;var primaryChildFragment=createWorkInProgressOffscreenFiber(currentPrimaryChildFragment,{mode:'visible',children:primaryChildren});if((workInProgress.mode&BlockingMode)===NoMode){primaryChildFragment.lanes=renderLanes;}primaryChildFragment.return=workInProgress;primaryChildFragment.sibling=null;if(currentFallbackChildFragment!==null){// Delete the fallback child fragment
currentFallbackChildFragment.nextEffect=null;currentFallbackChildFragment.flags=Deletion;workInProgress.firstEffect=workInProgress.lastEffect=currentFallbackChildFragment;}workInProgress.child=primaryChildFragment;return primaryChildFragment;}function updateSuspenseFallbackChildren(current,workInProgress,primaryChildren,fallbackChildren,renderLanes){var mode=workInProgress.mode;var currentPrimaryChildFragment=current.child;var currentFallbackChildFragment=currentPrimaryChildFragment.sibling;var primaryChildProps={mode:'hidden',children:primaryChildren};var primaryChildFragment;if(// In legacy mode, we commit the primary tree as if it successfully
// completed, even though it's in an inconsistent state.
(mode&BlockingMode)===NoMode&&// Make sure we're on the second pass, i.e. the primary child fragment was
// already cloned. In legacy mode, the only case where this isn't true is
// when DevTools forces us to display a fallback; we skip the first render
// pass entirely and go straight to rendering the fallback. (In Concurrent
// Mode, SuspenseList can also trigger this scenario, but this is a legacy-
// only codepath.)
workInProgress.child!==currentPrimaryChildFragment){var progressedPrimaryFragment=workInProgress.child;primaryChildFragment=progressedPrimaryFragment;primaryChildFragment.childLanes=NoLanes;primaryChildFragment.pendingProps=primaryChildProps;if(workInProgress.mode&ProfileMode){// Reset the durations from the first pass so they aren't included in the
// final amounts. This seems counterintuitive, since we're intentionally
// not measuring part of the render phase, but this makes it match what we
// do in Concurrent Mode.
primaryChildFragment.actualDuration=0;primaryChildFragment.actualStartTime=-1;primaryChildFragment.selfBaseDuration=currentPrimaryChildFragment.selfBaseDuration;primaryChildFragment.treeBaseDuration=currentPrimaryChildFragment.treeBaseDuration;}// The fallback fiber was added as a deletion effect during the first pass.
// However, since we're going to remain on the fallback, we no longer want
// to delete it. So we need to remove it from the list. Deletions are stored
// on the same list as effects. We want to keep the effects from the primary
// tree. So we copy the primary child fragment's effect list, which does not
// include the fallback deletion effect.
var progressedLastEffect=primaryChildFragment.lastEffect;if(progressedLastEffect!==null){workInProgress.firstEffect=primaryChildFragment.firstEffect;workInProgress.lastEffect=progressedLastEffect;progressedLastEffect.nextEffect=null;}else{// TODO: Reset this somewhere else? Lol legacy mode is so weird.
workInProgress.firstEffect=workInProgress.lastEffect=null;}}else{primaryChildFragment=createWorkInProgressOffscreenFiber(currentPrimaryChildFragment,primaryChildProps);}var fallbackChildFragment;if(currentFallbackChildFragment!==null){fallbackChildFragment=createWorkInProgress(currentFallbackChildFragment,fallbackChildren);}else{fallbackChildFragment=createFiberFromFragment(fallbackChildren,mode,renderLanes,null);// Needs a placement effect because the parent (the Suspense boundary) already
// mounted but this is a new fiber.
fallbackChildFragment.flags|=Placement;}fallbackChildFragment.return=workInProgress;primaryChildFragment.return=workInProgress;primaryChildFragment.sibling=fallbackChildFragment;workInProgress.child=primaryChildFragment;return fallbackChildFragment;}function scheduleWorkOnFiber(fiber,renderLanes){fiber.lanes=mergeLanes(fiber.lanes,renderLanes);var alternate=fiber.alternate;if(alternate!==null){alternate.lanes=mergeLanes(alternate.lanes,renderLanes);}scheduleWorkOnParentPath(fiber.return,renderLanes);}function propagateSuspenseContextChange(workInProgress,firstChild,renderLanes){// Mark any Suspense boundaries with fallbacks as having work to do.
// If they were previously forced into fallbacks, they may now be able
// to unblock.
var node=firstChild;while(node!==null){if(node.tag===SuspenseComponent){var state=node.memoizedState;if(state!==null){scheduleWorkOnFiber(node,renderLanes);}}else if(node.tag===SuspenseListComponent){// If the tail is hidden there might not be an Suspense boundaries
// to schedule work on. In this case we have to schedule it on the
// list itself.
// We don't have to traverse to the children of the list since
// the list will propagate the change when it rerenders.
scheduleWorkOnFiber(node,renderLanes);}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}function findLastContentRow(firstChild){// This is going to find the last row among these children that is already
// showing content on the screen, as opposed to being in fallback state or
// new. If a row has multiple Suspense boundaries, any of them being in the
// fallback state, counts as the whole row being in a fallback state.
// Note that the "rows" will be workInProgress, but any nested children
// will still be current since we haven't rendered them yet. The mounted
// order may not be the same as the new order. We use the new order.
var row=firstChild;var lastContentRow=null;while(row!==null){var currentRow=row.alternate;// New rows can't be content rows.
if(currentRow!==null&&findFirstSuspended(currentRow)===null){lastContentRow=row;}row=row.sibling;}return lastContentRow;}function validateRevealOrder(revealOrder){{if(revealOrder!==undefined&&revealOrder!=='forwards'&&revealOrder!=='backwards'&&revealOrder!=='together'&&!didWarnAboutRevealOrder[revealOrder]){didWarnAboutRevealOrder[revealOrder]=true;if(typeof revealOrder==='string'){switch(revealOrder.toLowerCase()){case'together':case'forwards':case'backwards':{error('"%s" is not a valid value for revealOrder on <SuspenseList />. '+'Use lowercase "%s" instead.',revealOrder,revealOrder.toLowerCase());break;}case'forward':case'backward':{error('"%s" is not a valid value for revealOrder on <SuspenseList />. '+'React uses the -s suffix in the spelling. Use "%ss" instead.',revealOrder,revealOrder.toLowerCase());break;}default:error('"%s" is not a supported revealOrder on <SuspenseList />. '+'Did you mean "together", "forwards" or "backwards"?',revealOrder);break;}}else{error('%s is not a supported value for revealOrder on <SuspenseList />. '+'Did you mean "together", "forwards" or "backwards"?',revealOrder);}}}}function validateTailOptions(tailMode,revealOrder){{if(tailMode!==undefined&&!didWarnAboutTailOptions[tailMode]){if(tailMode!=='collapsed'&&tailMode!=='hidden'){didWarnAboutTailOptions[tailMode]=true;error('"%s" is not a supported value for tail on <SuspenseList />. '+'Did you mean "collapsed" or "hidden"?',tailMode);}else if(revealOrder!=='forwards'&&revealOrder!=='backwards'){didWarnAboutTailOptions[tailMode]=true;error('<SuspenseList tail="%s" /> is only valid if revealOrder is '+'"forwards" or "backwards". '+'Did you mean to specify revealOrder="forwards"?',tailMode);}}}}function validateSuspenseListNestedChild(childSlot,index){{var isArray=Array.isArray(childSlot);var isIterable=!isArray&&typeof getIteratorFn(childSlot)==='function';if(isArray||isIterable){var type=isArray?'array':'iterable';error('A nested %s was passed to row #%s in <SuspenseList />. Wrap it in '+'an additional SuspenseList to configure its revealOrder: '+'<SuspenseList revealOrder=...> ... '+'<SuspenseList revealOrder=...>{%s}</SuspenseList> ... '+'</SuspenseList>',type,index,type);return false;}}return true;}function validateSuspenseListChildren(children,revealOrder){{if((revealOrder==='forwards'||revealOrder==='backwards')&&children!==undefined&&children!==null&&children!==false){if(Array.isArray(children)){for(var i=0;i<children.length;i++){if(!validateSuspenseListNestedChild(children[i],i)){return;}}}else{var iteratorFn=getIteratorFn(children);if(typeof iteratorFn==='function'){var childrenIterator=iteratorFn.call(children);if(childrenIterator){var step=childrenIterator.next();var _i=0;for(;!step.done;step=childrenIterator.next()){if(!validateSuspenseListNestedChild(step.value,_i)){return;}_i++;}}}else{error('A single row was passed to a <SuspenseList revealOrder="%s" />. '+'This is not useful since it needs multiple rows. '+'Did you mean to pass multiple children or an array?',revealOrder);}}}}}function initSuspenseListRenderState(workInProgress,isBackwards,tail,lastContentRow,tailMode,lastEffectBeforeRendering){var renderState=workInProgress.memoizedState;if(renderState===null){workInProgress.memoizedState={isBackwards:isBackwards,rendering:null,renderingStartTime:0,last:lastContentRow,tail:tail,tailMode:tailMode,lastEffect:lastEffectBeforeRendering};}else{// We can reuse the existing object from previous renders.
renderState.isBackwards=isBackwards;renderState.rendering=null;renderState.renderingStartTime=0;renderState.last=lastContentRow;renderState.tail=tail;renderState.tailMode=tailMode;renderState.lastEffect=lastEffectBeforeRendering;}}// This can end up rendering this component multiple passes.
// The first pass splits the children fibers into two sets. A head and tail.
// We first render the head. If anything is in fallback state, we do another
// pass through beginWork to rerender all children (including the tail) with
// the force suspend context. If the first render didn't have anything in
// in fallback state. Then we render each row in the tail one-by-one.
// That happens in the completeWork phase without going back to beginWork.
function updateSuspenseListComponent(current,workInProgress,renderLanes){var nextProps=workInProgress.pendingProps;var revealOrder=nextProps.revealOrder;var tailMode=nextProps.tail;var newChildren=nextProps.children;validateRevealOrder(revealOrder);validateTailOptions(tailMode,revealOrder);validateSuspenseListChildren(newChildren,revealOrder);reconcileChildren(current,workInProgress,newChildren,renderLanes);var suspenseContext=suspenseStackCursor.current;var shouldForceFallback=hasSuspenseContext(suspenseContext,ForceSuspenseFallback);if(shouldForceFallback){suspenseContext=setShallowSuspenseContext(suspenseContext,ForceSuspenseFallback);workInProgress.flags|=DidCapture;}else{var didSuspendBefore=current!==null&&(current.flags&DidCapture)!==NoFlags;if(didSuspendBefore){// If we previously forced a fallback, we need to schedule work
// on any nested boundaries to let them know to try to render
// again. This is the same as context updating.
propagateSuspenseContextChange(workInProgress,workInProgress.child,renderLanes);}suspenseContext=setDefaultShallowSuspenseContext(suspenseContext);}pushSuspenseContext(workInProgress,suspenseContext);if((workInProgress.mode&BlockingMode)===NoMode){// In legacy mode, SuspenseList doesn't work so we just
// use make it a noop by treating it as the default revealOrder.
workInProgress.memoizedState=null;}else{switch(revealOrder){case'forwards':{var lastContentRow=findLastContentRow(workInProgress.child);var tail;if(lastContentRow===null){// The whole list is part of the tail.
// TODO: We could fast path by just rendering the tail now.
tail=workInProgress.child;workInProgress.child=null;}else{// Disconnect the tail rows after the content row.
// We're going to render them separately later.
tail=lastContentRow.sibling;lastContentRow.sibling=null;}initSuspenseListRenderState(workInProgress,false,// isBackwards
tail,lastContentRow,tailMode,workInProgress.lastEffect);break;}case'backwards':{// We're going to find the first row that has existing content.
// At the same time we're going to reverse the list of everything
// we pass in the meantime. That's going to be our tail in reverse
// order.
var _tail=null;var row=workInProgress.child;workInProgress.child=null;while(row!==null){var currentRow=row.alternate;// New rows can't be content rows.
if(currentRow!==null&&findFirstSuspended(currentRow)===null){// This is the beginning of the main content.
workInProgress.child=row;break;}var nextRow=row.sibling;row.sibling=_tail;_tail=row;row=nextRow;}// TODO: If workInProgress.child is null, we can continue on the tail immediately.
initSuspenseListRenderState(workInProgress,true,// isBackwards
_tail,null,// last
tailMode,workInProgress.lastEffect);break;}case'together':{initSuspenseListRenderState(workInProgress,false,// isBackwards
null,// tail
null,// last
undefined,workInProgress.lastEffect);break;}default:{// The default reveal order is the same as not having
// a boundary.
workInProgress.memoizedState=null;}}}return workInProgress.child;}function updatePortalComponent(current,workInProgress,renderLanes){pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);var nextChildren=workInProgress.pendingProps;if(current===null){// Portals are special because we don't append the children during mount
// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
workInProgress.child=reconcileChildFibers(workInProgress,null,nextChildren,renderLanes);}else{reconcileChildren(current,workInProgress,nextChildren,renderLanes);}return workInProgress.child;}var hasWarnedAboutUsingNoValuePropOnContextProvider=false;function updateContextProvider(current,workInProgress,renderLanes){var providerType=workInProgress.type;var context=providerType._context;var newProps=workInProgress.pendingProps;var oldProps=workInProgress.memoizedProps;var newValue=newProps.value;{if(!('value'in newProps)){if(!hasWarnedAboutUsingNoValuePropOnContextProvider){hasWarnedAboutUsingNoValuePropOnContextProvider=true;error('The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?');}}var providerPropTypes=workInProgress.type.propTypes;if(providerPropTypes){checkPropTypes(providerPropTypes,newProps,'prop','Context.Provider');}}pushProvider(workInProgress,newValue);if(oldProps!==null){var oldValue=oldProps.value;var changedBits=calculateChangedBits(context,newValue,oldValue);if(changedBits===0){// No change. Bailout early if children are the same.
if(oldProps.children===newProps.children&&!hasContextChanged()){return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}}else{// The context value changed. Search for matching consumers and schedule
// them to update.
propagateContextChange(workInProgress,context,changedBits,renderLanes);}}var newChildren=newProps.children;reconcileChildren(current,workInProgress,newChildren,renderLanes);return workInProgress.child;}var hasWarnedAboutUsingContextAsConsumer=false;function updateContextConsumer(current,workInProgress,renderLanes){var context=workInProgress.type;// The logic below for Context differs depending on PROD or DEV mode. In
// DEV mode, we create a separate object for Context.Consumer that acts
// like a proxy to Context. This proxy object adds unnecessary code in PROD
// so we use the old behaviour (Context.Consumer references Context) to
// reduce size and overhead. The separate object references context via
// a property called "_context", which also gives us the ability to check
// in DEV mode if this property exists or not and warn if it does not.
{if(context._context===undefined){// This may be because it's a Context (rather than a Consumer).
// Or it may be because it's older React where they're the same thing.
// We only want to warn if we're sure it's a new React.
if(context!==context.Consumer){if(!hasWarnedAboutUsingContextAsConsumer){hasWarnedAboutUsingContextAsConsumer=true;error('Rendering <Context> directly is not supported and will be removed in '+'a future major release. Did you mean to render <Context.Consumer> instead?');}}}else{context=context._context;}}var newProps=workInProgress.pendingProps;var render=newProps.children;{if(typeof render!=='function'){error('A context consumer was rendered with multiple children, or a child '+"that isn't a function. A context consumer expects a single child "+'that is a function. If you did pass a function, make sure there '+'is no trailing or leading whitespace around it.');}}prepareToReadContext(workInProgress,renderLanes);var newValue=_readContext(context,newProps.unstable_observedBits);var newChildren;{ReactCurrentOwner$1.current=workInProgress;setIsRendering(true);newChildren=render(newValue);setIsRendering(false);}// React DevTools reads this flag.
workInProgress.flags|=PerformedWork;reconcileChildren(current,workInProgress,newChildren,renderLanes);return workInProgress.child;}function markWorkInProgressReceivedUpdate(){didReceiveUpdate=true;}function bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes){if(current!==null){// Reuse previous dependencies
workInProgress.dependencies=current.dependencies;}{// Don't update "base" render times for bailouts.
stopProfilerTimerIfRunning();}markSkippedUpdateLanes(workInProgress.lanes);// Check if the children have any pending work.
if(!includesSomeLane(renderLanes,workInProgress.childLanes)){// The children don't have any work either. We can skip them.
// TODO: Once we add back resuming, we should check if the children are
// a work-in-progress set. If so, we need to transfer their effects.
return null;}else{// This fiber doesn't have work, but its subtree does. Clone the child
// fibers and continue.
cloneChildFibers(current,workInProgress);return workInProgress.child;}}function remountFiber(current,oldWorkInProgress,newWorkInProgress){{var returnFiber=oldWorkInProgress.return;if(returnFiber===null){throw new Error('Cannot swap the root fiber.');}// Disconnect from the old current.
// It will get deleted.
current.alternate=null;oldWorkInProgress.alternate=null;// Connect to the new tree.
newWorkInProgress.index=oldWorkInProgress.index;newWorkInProgress.sibling=oldWorkInProgress.sibling;newWorkInProgress.return=oldWorkInProgress.return;newWorkInProgress.ref=oldWorkInProgress.ref;// Replace the child/sibling pointers above it.
if(oldWorkInProgress===returnFiber.child){returnFiber.child=newWorkInProgress;}else{var prevSibling=returnFiber.child;if(prevSibling===null){throw new Error('Expected parent to have a child.');}while(prevSibling.sibling!==oldWorkInProgress){prevSibling=prevSibling.sibling;if(prevSibling===null){throw new Error('Expected to find the previous sibling.');}}prevSibling.sibling=newWorkInProgress;}// Delete the old fiber and place the new one.
// Since the old fiber is disconnected, we have to schedule it manually.
var last=returnFiber.lastEffect;if(last!==null){last.nextEffect=current;returnFiber.lastEffect=current;}else{returnFiber.firstEffect=returnFiber.lastEffect=current;}current.nextEffect=null;current.flags=Deletion;newWorkInProgress.flags|=Placement;// Restart work from the new fiber.
return newWorkInProgress;}}function beginWork(current,workInProgress,renderLanes){var updateLanes=workInProgress.lanes;{if(workInProgress._debugNeedsRemount&&current!==null){// This will restart the begin phase with a new fiber.
return remountFiber(current,workInProgress,createFiberFromTypeAndProps(workInProgress.type,workInProgress.key,workInProgress.pendingProps,workInProgress._debugOwner||null,workInProgress.mode,workInProgress.lanes));}}if(current!==null){var oldProps=current.memoizedProps;var newProps=workInProgress.pendingProps;if(oldProps!==newProps||hasContextChanged()||// Force a re-render if the implementation changed due to hot reload:
workInProgress.type!==current.type){// If props or context changed, mark the fiber as having performed work.
// This may be unset if the props are determined to be equal later (memo).
didReceiveUpdate=true;}else if(!includesSomeLane(renderLanes,updateLanes)){didReceiveUpdate=false;// This fiber does not have any pending work. Bailout without entering
// the begin phase. There's still some bookkeeping we that needs to be done
// in this optimized path, mostly pushing stuff onto the stack.
switch(workInProgress.tag){case HostRoot:pushHostRootContext(workInProgress);resetHydrationState();break;case HostComponent:pushHostContext(workInProgress);break;case ClassComponent:{var Component=workInProgress.type;if(isContextProvider(Component)){pushContextProvider(workInProgress);}break;}case HostPortal:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);break;case ContextProvider:{var newValue=workInProgress.memoizedProps.value;pushProvider(workInProgress,newValue);break;}case Profiler:{// Profiler should only call onRender when one of its descendants actually rendered.
var hasChildWork=includesSomeLane(renderLanes,workInProgress.childLanes);if(hasChildWork){workInProgress.flags|=Update;}// Reset effect durations for the next eventual effect phase.
// These are reset during render to allow the DevTools commit hook a chance to read them,
var stateNode=workInProgress.stateNode;stateNode.effectDuration=0;stateNode.passiveEffectDuration=0;}break;case SuspenseComponent:{var state=workInProgress.memoizedState;if(state!==null){// whether to retry the primary children, or to skip over it and
// go straight to the fallback. Check the priority of the primary
// child fragment.
var primaryChildFragment=workInProgress.child;var primaryChildLanes=primaryChildFragment.childLanes;if(includesSomeLane(renderLanes,primaryChildLanes)){// The primary children have pending work. Use the normal path
// to attempt to render the primary children again.
return updateSuspenseComponent(current,workInProgress,renderLanes);}else{// The primary child fragment does not have pending work marked
// on it
pushSuspenseContext(workInProgress,setDefaultShallowSuspenseContext(suspenseStackCursor.current));// The primary children do not have pending work with sufficient
// priority. Bailout.
var child=bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);if(child!==null){// The fallback children have pending work. Skip over the
// primary children and work on the fallback.
return child.sibling;}else{return null;}}}else{pushSuspenseContext(workInProgress,setDefaultShallowSuspenseContext(suspenseStackCursor.current));}break;}case SuspenseListComponent:{var didSuspendBefore=(current.flags&DidCapture)!==NoFlags;var _hasChildWork=includesSomeLane(renderLanes,workInProgress.childLanes);if(didSuspendBefore){if(_hasChildWork){// If something was in fallback state last time, and we have all the
// same children then we're still in progressive loading state.
// Something might get unblocked by state updates or retries in the
// tree which will affect the tail. So we need to use the normal
// path to compute the correct tail.
return updateSuspenseListComponent(current,workInProgress,renderLanes);}// If none of the children had any work, that means that none of
// them got retried so they'll still be blocked in the same way
// as before. We can fast bail out.
workInProgress.flags|=DidCapture;}// If nothing suspended before and we're rendering the same children,
// then the tail doesn't matter. Anything new that suspends will work
// in the "together" mode, so we can continue from the state we had.
var renderState=workInProgress.memoizedState;if(renderState!==null){// Reset to the "together" mode in case we've started a different
// update in the past but didn't complete it.
renderState.rendering=null;renderState.tail=null;renderState.lastEffect=null;}pushSuspenseContext(workInProgress,suspenseStackCursor.current);if(_hasChildWork){break;}else{// If none of the children had any work, that means that none of
// them got retried so they'll still be blocked in the same way
// as before. We can fast bail out.
return null;}}case OffscreenComponent:case LegacyHiddenComponent:{// Need to check if the tree still needs to be deferred. This is
// almost identical to the logic used in the normal update path,
// so we'll just enter that. The only difference is we'll bail out
// at the next level instead of this one, because the child props
// have not changed. Which is fine.
// TODO: Probably should refactor `beginWork` to split the bailout
// path from the normal path. I'm tempted to do a labeled break here
// but I won't :)
workInProgress.lanes=NoLanes;return updateOffscreenComponent(current,workInProgress,renderLanes);}}return bailoutOnAlreadyFinishedWork(current,workInProgress,renderLanes);}else{if((current.flags&ForceUpdateForLegacySuspense)!==NoFlags){// This is a special case that only exists for legacy mode.
// See https://github.com/facebook/react/pull/19216.
didReceiveUpdate=true;}else{// An update was scheduled on this fiber, but there are no new props
// nor legacy context. Set this to false. If an update queue or context
// consumer produces a changed value, it will set this to true. Otherwise,
// the component will assume the children have not changed and bail out.
didReceiveUpdate=false;}}}else{didReceiveUpdate=false;}// Before entering the begin phase, clear pending update priority.
// TODO: This assumes that we're about to evaluate the component and process
// the update queue. However, there's an exception: SimpleMemoComponent
// sometimes bails out later in the begin phase. This indicates that we should
// move this assignment out of the common path and into each branch.
workInProgress.lanes=NoLanes;switch(workInProgress.tag){case IndeterminateComponent:{return mountIndeterminateComponent(current,workInProgress,workInProgress.type,renderLanes);}case LazyComponent:{var elementType=workInProgress.elementType;return mountLazyComponent(current,workInProgress,elementType,updateLanes,renderLanes);}case FunctionComponent:{var _Component=workInProgress.type;var unresolvedProps=workInProgress.pendingProps;var resolvedProps=workInProgress.elementType===_Component?unresolvedProps:resolveDefaultProps(_Component,unresolvedProps);return updateFunctionComponent(current,workInProgress,_Component,resolvedProps,renderLanes);}case ClassComponent:{var _Component2=workInProgress.type;var _unresolvedProps=workInProgress.pendingProps;var _resolvedProps=workInProgress.elementType===_Component2?_unresolvedProps:resolveDefaultProps(_Component2,_unresolvedProps);return updateClassComponent(current,workInProgress,_Component2,_resolvedProps,renderLanes);}case HostRoot:return updateHostRoot(current,workInProgress,renderLanes);case HostComponent:return updateHostComponent(current,workInProgress,renderLanes);case HostText:return updateHostText(current,workInProgress);case SuspenseComponent:return updateSuspenseComponent(current,workInProgress,renderLanes);case HostPortal:return updatePortalComponent(current,workInProgress,renderLanes);case ForwardRef:{var type=workInProgress.type;var _unresolvedProps2=workInProgress.pendingProps;var _resolvedProps2=workInProgress.elementType===type?_unresolvedProps2:resolveDefaultProps(type,_unresolvedProps2);return updateForwardRef(current,workInProgress,type,_resolvedProps2,renderLanes);}case Fragment:return updateFragment(current,workInProgress,renderLanes);case Mode:return updateMode(current,workInProgress,renderLanes);case Profiler:return updateProfiler(current,workInProgress,renderLanes);case ContextProvider:return updateContextProvider(current,workInProgress,renderLanes);case ContextConsumer:return updateContextConsumer(current,workInProgress,renderLanes);case MemoComponent:{var _type2=workInProgress.type;var _unresolvedProps3=workInProgress.pendingProps;// Resolve outer props first, then resolve inner props.
var _resolvedProps3=resolveDefaultProps(_type2,_unresolvedProps3);{if(workInProgress.type!==workInProgress.elementType){var outerPropTypes=_type2.propTypes;if(outerPropTypes){checkPropTypes(outerPropTypes,_resolvedProps3,// Resolved for outer only
'prop',getComponentName(_type2));}}}_resolvedProps3=resolveDefaultProps(_type2.type,_resolvedProps3);return updateMemoComponent(current,workInProgress,_type2,_resolvedProps3,updateLanes,renderLanes);}case SimpleMemoComponent:{return updateSimpleMemoComponent(current,workInProgress,workInProgress.type,workInProgress.pendingProps,updateLanes,renderLanes);}case IncompleteClassComponent:{var _Component3=workInProgress.type;var _unresolvedProps4=workInProgress.pendingProps;var _resolvedProps4=workInProgress.elementType===_Component3?_unresolvedProps4:resolveDefaultProps(_Component3,_unresolvedProps4);return mountIncompleteClassComponent(current,workInProgress,_Component3,_resolvedProps4,renderLanes);}case SuspenseListComponent:{return updateSuspenseListComponent(current,workInProgress,renderLanes);}case FundamentalComponent:{break;}case ScopeComponent:{break;}case Block:{break;}case OffscreenComponent:{return updateOffscreenComponent(current,workInProgress,renderLanes);}case LegacyHiddenComponent:{return updateLegacyHiddenComponent(current,workInProgress,renderLanes);}}{{throw Error("Unknown unit of work tag ("+workInProgress.tag+"). This error is likely caused by a bug in React. Please file an issue.");}}}function markUpdate(workInProgress){// Tag the fiber with an update effect. This turns a Placement into
// a PlacementAndUpdate.
workInProgress.flags|=Update;}function markRef$1(workInProgress){workInProgress.flags|=Ref;}var _appendAllChildren;var updateHostContainer;var updateHostComponent$1;var updateHostText$1;if(supportsMutation){// Mutation mode
_appendAllChildren=function appendAllChildren(parent,workInProgress,needsVisibilityToggle,isHidden){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendInitialChild(parent,node.stateNode);}else if(node.tag===HostPortal);else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}};updateHostContainer=function updateHostContainer(workInProgress){// Noop
};updateHostComponent$1=function updateHostComponent$1(current,workInProgress,type,newProps,rootContainerInstance){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var oldProps=current.memoizedProps;if(oldProps===newProps){// In mutation mode, this is sufficient for a bailout because
// we won't touch this node even if children changed.
return;}// If we get updated because one of our children updated, we don't
// have newProps so we'll have to reuse them.
// TODO: Split the update API as separate for the props vs. children.
// Even better would be if children weren't special cased at all tho.
var instance=workInProgress.stateNode;var currentHostContext=getHostContext();// TODO: Experiencing an error where oldProps is null. Suggests a host
// component is hitting the resume path. Figure out why. Possibly
// related to `hidden`.
var updatePayload=prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContext);// TODO: Type this specific to this type of component.
workInProgress.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update. All the work is done in commitWork.
if(updatePayload){markUpdate(workInProgress);}};updateHostText$1=function updateHostText$1(current,workInProgress,oldText,newText){// If the text differs, mark it as an update. All the work in done in commitWork.
if(oldText!==newText){markUpdate(workInProgress);}};}else if(supportsPersistence){// Persistent host tree mode
_appendAllChildren=function appendAllChildren(parent,workInProgress,needsVisibilityToggle,isHidden){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){// eslint-disable-next-line no-labels
if(node.tag===HostComponent){var instance=node.stateNode;if(needsVisibilityToggle&&isHidden){// This child is inside a timed out tree. Hide it.
var props=node.memoizedProps;var type=node.type;instance=cloneHiddenInstance(instance,type,props,node);}appendInitialChild(parent,instance);}else if(node.tag===HostText){var _instance=node.stateNode;if(needsVisibilityToggle&&isHidden){// This child is inside a timed out tree. Hide it.
var text=node.memoizedProps;_instance=cloneHiddenTextInstance(_instance,text,node);}appendInitialChild(parent,_instance);}else if(node.tag===HostPortal);else if(node.tag===SuspenseComponent){if((node.flags&Update)!==NoFlags){// Need to toggle the visibility of the primary children.
var newIsHidden=node.memoizedState!==null;if(newIsHidden){var primaryChildParent=node.child;if(primaryChildParent!==null){if(primaryChildParent.child!==null){primaryChildParent.child.return=primaryChildParent;_appendAllChildren(parent,primaryChildParent,true,newIsHidden);}var fallbackChildParent=primaryChildParent.sibling;if(fallbackChildParent!==null){fallbackChildParent.return=node;node=fallbackChildParent;continue;}}}}if(node.child!==null){// Continue traversing like normal
node.child.return=node;node=node.child;continue;}}else if(node.child!==null){node.child.return=node;node=node.child;continue;}// $FlowFixMe This is correct but Flow is confused by the labeled break.
node=node;if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}};// An unfortunate fork of appendAllChildren because we have two different parent types.
var appendAllChildrenToContainer=function appendAllChildrenToContainer(containerChildSet,workInProgress,needsVisibilityToggle,isHidden){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){// eslint-disable-next-line no-labels
if(node.tag===HostComponent){var instance=node.stateNode;if(needsVisibilityToggle&&isHidden){// This child is inside a timed out tree. Hide it.
var props=node.memoizedProps;var type=node.type;instance=cloneHiddenInstance(instance,type,props,node);}appendChildToContainerChildSet(containerChildSet,instance);}else if(node.tag===HostText){var _instance3=node.stateNode;if(needsVisibilityToggle&&isHidden){// This child is inside a timed out tree. Hide it.
var text=node.memoizedProps;_instance3=cloneHiddenTextInstance(_instance3,text,node);}appendChildToContainerChildSet(containerChildSet,_instance3);}else if(node.tag===HostPortal);else if(node.tag===SuspenseComponent){if((node.flags&Update)!==NoFlags){// Need to toggle the visibility of the primary children.
var newIsHidden=node.memoizedState!==null;if(newIsHidden){var primaryChildParent=node.child;if(primaryChildParent!==null){if(primaryChildParent.child!==null){primaryChildParent.child.return=primaryChildParent;appendAllChildrenToContainer(containerChildSet,primaryChildParent,true,newIsHidden);}var fallbackChildParent=primaryChildParent.sibling;if(fallbackChildParent!==null){fallbackChildParent.return=node;node=fallbackChildParent;continue;}}}}if(node.child!==null){// Continue traversing like normal
node.child.return=node;node=node.child;continue;}}else if(node.child!==null){node.child.return=node;node=node.child;continue;}// $FlowFixMe This is correct but Flow is confused by the labeled break.
node=node;if(node===workInProgress){return;}while(node.sibling===null){if(node.return===null||node.return===workInProgress){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}};updateHostContainer=function updateHostContainer(workInProgress){var portalOrRoot=workInProgress.stateNode;var childrenUnchanged=workInProgress.firstEffect===null;if(childrenUnchanged);else{var container=portalOrRoot.containerInfo;var newChildSet=createContainerChildSet(container);// If children might have changed, we have to add them all to the set.
appendAllChildrenToContainer(newChildSet,workInProgress,false,false);portalOrRoot.pendingChildren=newChildSet;// Schedule an update on the container to swap out the container.
markUpdate(workInProgress);finalizeContainerChildren(container,newChildSet);}};updateHostComponent$1=function updateHostComponent$1(current,workInProgress,type,newProps,rootContainerInstance){var currentInstance=current.stateNode;var oldProps=current.memoizedProps;// If there are no effects associated with this node, then none of our children had any updates.
// This guarantees that we can reuse all of them.
var childrenUnchanged=workInProgress.firstEffect===null;if(childrenUnchanged&&oldProps===newProps){// No changes, just reuse the existing instance.
// Note that this might release a previous clone.
workInProgress.stateNode=currentInstance;return;}var recyclableInstance=workInProgress.stateNode;var currentHostContext=getHostContext();var updatePayload=null;if(oldProps!==newProps){updatePayload=prepareUpdate(recyclableInstance,type,oldProps,newProps,rootContainerInstance,currentHostContext);}if(childrenUnchanged&&updatePayload===null){// No changes, just reuse the existing instance.
// Note that this might release a previous clone.
workInProgress.stateNode=currentInstance;return;}var newInstance=cloneInstance(currentInstance,updatePayload,type,oldProps,newProps,workInProgress,childrenUnchanged,recyclableInstance);if(finalizeInitialChildren(newInstance,type,newProps,rootContainerInstance,currentHostContext)){markUpdate(workInProgress);}workInProgress.stateNode=newInstance;if(childrenUnchanged){// If there are no other effects in this tree, we need to flag this node as having one.
// Even though we're not going to use it for anything.
// Otherwise parents won't know that there are new children to propagate upwards.
markUpdate(workInProgress);}else{// If children might have changed, we have to add them all to the set.
_appendAllChildren(newInstance,workInProgress,false,false);}};updateHostText$1=function updateHostText$1(current,workInProgress,oldText,newText){if(oldText!==newText){// If the text content differs, we'll create a new text instance for it.
var rootContainerInstance=getRootHostContainer();var currentHostContext=getHostContext();workInProgress.stateNode=createTextInstance(newText,rootContainerInstance,currentHostContext,workInProgress);// We'll have to mark it as having an effect, even though we won't use the effect for anything.
// This lets the parents know that at least one of their children has changed.
markUpdate(workInProgress);}else{workInProgress.stateNode=current.stateNode;}};}else{// No host operations
updateHostContainer=function updateHostContainer(workInProgress){// Noop
};updateHostComponent$1=function updateHostComponent$1(current,workInProgress,type,newProps,rootContainerInstance){// Noop
};updateHostText$1=function updateHostText$1(current,workInProgress,oldText,newText){// Noop
};}function cutOffTailIfNeeded(renderState,hasRenderedATailFallback){if(getIsHydrating()){// If we're hydrating, we should consume as many items as we can
// so we don't leave any behind.
return;}switch(renderState.tailMode){case'hidden':{// Any insertions at the end of the tail list after this point
// should be invisible. If there are already mounted boundaries
// anything before them are not considered for collapsing.
// Therefore we need to go through the whole tail to find if
// there are any.
var tailNode=renderState.tail;var lastTailNode=null;while(tailNode!==null){if(tailNode.alternate!==null){lastTailNode=tailNode;}tailNode=tailNode.sibling;}// Next we're simply going to delete all insertions after the
// last rendered item.
if(lastTailNode===null){// All remaining items in the tail are insertions.
renderState.tail=null;}else{// Detach the insertion after the last node that was already
// inserted.
lastTailNode.sibling=null;}break;}case'collapsed':{// Any insertions at the end of the tail list after this point
// should be invisible. If there are already mounted boundaries
// anything before them are not considered for collapsing.
// Therefore we need to go through the whole tail to find if
// there are any.
var _tailNode=renderState.tail;var _lastTailNode=null;while(_tailNode!==null){if(_tailNode.alternate!==null){_lastTailNode=_tailNode;}_tailNode=_tailNode.sibling;}// Next we're simply going to delete all insertions after the
// last rendered item.
if(_lastTailNode===null){// All remaining items in the tail are insertions.
if(!hasRenderedATailFallback&&renderState.tail!==null){// We suspended during the head. We want to show at least one
// row at the tail. So we'll keep on and cut off the rest.
renderState.tail.sibling=null;}else{renderState.tail=null;}}else{// Detach the insertion after the last node that was already
// inserted.
_lastTailNode.sibling=null;}break;}}}function completeWork(current,workInProgress,renderLanes){var newProps=workInProgress.pendingProps;switch(workInProgress.tag){case IndeterminateComponent:case LazyComponent:case SimpleMemoComponent:case FunctionComponent:case ForwardRef:case Fragment:case Mode:case Profiler:case ContextConsumer:case MemoComponent:return null;case ClassComponent:{var Component=workInProgress.type;if(isContextProvider(Component)){popContext(workInProgress);}return null;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);resetWorkInProgressVersions();var fiberRoot=workInProgress.stateNode;if(fiberRoot.pendingContext){fiberRoot.context=fiberRoot.pendingContext;fiberRoot.pendingContext=null;}if(current===null||current.child===null){// If we hydrated, pop so that we can delete any remaining children
// that weren't hydrated.
var wasHydrated=popHydrationState(workInProgress);if(wasHydrated){// If we hydrated, then we'll need to schedule an update for
// the commit side-effects on the root.
markUpdate(workInProgress);}else if(!fiberRoot.hydrate){// Schedule an effect to clear this container at the start of the next commit.
// This handles the case of React rendering into a container with previous children.
// It's also safe to do for updates too, because current.child would only be null
// if the previous render was null (so the the container would already be empty).
workInProgress.flags|=Snapshot;}}updateHostContainer(workInProgress);return null;}case HostComponent:{popHostContext(workInProgress);var rootContainerInstance=getRootHostContainer();var type=workInProgress.type;if(current!==null&&workInProgress.stateNode!=null){updateHostComponent$1(current,workInProgress,type,newProps,rootContainerInstance);if(current.ref!==workInProgress.ref){markRef$1(workInProgress);}}else{if(!newProps){if(!(workInProgress.stateNode!==null)){{throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");}}// This can happen when we abort work.
return null;}var currentHostContext=getHostContext();// TODO: Move createInstance to beginWork and keep it on a context
// "stack" as the parent. Then append children as we go in beginWork
// or completeWork depending on whether we want to add them top->down or
// bottom->up. Top->down is faster in IE11.
var _wasHydrated=popHydrationState(workInProgress);if(_wasHydrated){// TODO: Move this and createInstance step into the beginPhase
// to consolidate.
if(prepareToHydrateHostInstance(workInProgress,rootContainerInstance,currentHostContext)){// If changes to the hydrated node need to be applied at the
// commit-phase we mark this as such.
markUpdate(workInProgress);}}else{var instance=createInstance(type,newProps,rootContainerInstance,currentHostContext,workInProgress);_appendAllChildren(instance,workInProgress,false,false);workInProgress.stateNode=instance;// Certain renderers require commit-time effects for initial mount.
// (eg DOM renderer supports auto-focus for certain elements).
// Make sure such renderers get scheduled for later work.
if(finalizeInitialChildren(instance,type,newProps,rootContainerInstance,currentHostContext)){markUpdate(workInProgress);}}if(workInProgress.ref!==null){// If there is a ref on a host node we need to schedule a callback
markRef$1(workInProgress);}}return null;}case HostText:{var newText=newProps;if(current&&workInProgress.stateNode!=null){var oldText=current.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
updateHostText$1(current,workInProgress,oldText,newText);}else{if(typeof newText!=='string'){if(!(workInProgress.stateNode!==null)){{throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");}}// This can happen when we abort work.
}var _rootContainerInstance=getRootHostContainer();var _currentHostContext=getHostContext();var _wasHydrated2=popHydrationState(workInProgress);if(_wasHydrated2){if(prepareToHydrateHostTextInstance(workInProgress)){markUpdate(workInProgress);}}else{workInProgress.stateNode=createTextInstance(newText,_rootContainerInstance,_currentHostContext,workInProgress);}}return null;}case SuspenseComponent:{popSuspenseContext(workInProgress);var nextState=workInProgress.memoizedState;if((workInProgress.flags&DidCapture)!==NoFlags){// Something suspended. Re-render with the fallback children.
workInProgress.lanes=renderLanes;// Do not reset the effect list.
if((workInProgress.mode&ProfileMode)!==NoMode){transferActualDuration(workInProgress);}return workInProgress;}var nextDidTimeout=nextState!==null;var prevDidTimeout=false;if(current===null){if(workInProgress.memoizedProps.fallback!==undefined){popHydrationState(workInProgress);}}else{var prevState=current.memoizedState;prevDidTimeout=prevState!==null;}if(nextDidTimeout&&!prevDidTimeout){// If this subtreee is running in blocking mode we can suspend,
// otherwise we won't suspend.
// TODO: This will still suspend a synchronous tree if anything
// in the concurrent tree already suspended during this render.
// This is a known bug.
if((workInProgress.mode&BlockingMode)!==NoMode){// TODO: Move this back to throwException because this is too late
// if this is a large tree which is common for initial loads. We
// don't know if we should restart a render or not until we get
// this marker, and this is too late.
// If this render already had a ping or lower pri updates,
// and this is the first time we know we're going to suspend we
// should be able to immediately restart from within throwException.
var hasInvisibleChildContext=current===null&&workInProgress.memoizedProps.unstable_avoidThisFallback!==true;if(hasInvisibleChildContext||hasSuspenseContext(suspenseStackCursor.current,InvisibleParentSuspenseContext)){// If this was in an invisible tree or a new render, then showing
// this boundary is ok.
renderDidSuspend();}else{// Otherwise, we're going to have to hide content so we should
// suspend for longer if possible.
renderDidSuspendDelayIfPossible();}}}if(supportsPersistence){// TODO: Only schedule updates if not prevDidTimeout.
if(nextDidTimeout){// If this boundary just timed out, schedule an effect to attach a
// retry listener to the promise. This flag is also used to hide the
// primary children.
workInProgress.flags|=Update;}}if(supportsMutation){// TODO: Only schedule updates if these values are non equal, i.e. it changed.
if(nextDidTimeout||prevDidTimeout){// If this boundary just timed out, schedule an effect to attach a
// retry listener to the promise. This flag is also used to hide the
// primary children. In mutation mode, we also need the flag to
// *unhide* children that were previously hidden, so check if this
// is currently timed out, too.
workInProgress.flags|=Update;}}return null;}case HostPortal:popHostContainer(workInProgress);updateHostContainer(workInProgress);if(current===null){preparePortalMount(workInProgress.stateNode.containerInfo);}return null;case ContextProvider:// Pop provider fiber
popProvider(workInProgress);return null;case IncompleteClassComponent:{// Same as class component case. I put it down here so that the tags are
// sequential to ensure this switch is compiled to a jump table.
var _Component=workInProgress.type;if(isContextProvider(_Component)){popContext(workInProgress);}return null;}case SuspenseListComponent:{popSuspenseContext(workInProgress);var renderState=workInProgress.memoizedState;if(renderState===null){// We're running in the default, "independent" mode.
// We don't do anything in this mode.
return null;}var didSuspendAlready=(workInProgress.flags&DidCapture)!==NoFlags;var renderedTail=renderState.rendering;if(renderedTail===null){// We just rendered the head.
if(!didSuspendAlready){// This is the first pass. We need to figure out if anything is still
// suspended in the rendered set.
// If new content unsuspended, but there's still some content that
// didn't. Then we need to do a second pass that forces everything
// to keep showing their fallbacks.
// We might be suspended if something in this render pass suspended, or
// something in the previous committed pass suspended. Otherwise,
// there's no chance so we can skip the expensive call to
// findFirstSuspended.
var cannotBeSuspended=renderHasNotSuspendedYet()&&(current===null||(current.flags&DidCapture)===NoFlags);if(!cannotBeSuspended){var row=workInProgress.child;while(row!==null){var suspended=findFirstSuspended(row);if(suspended!==null){didSuspendAlready=true;workInProgress.flags|=DidCapture;cutOffTailIfNeeded(renderState,false);// If this is a newly suspended tree, it might not get committed as
// part of the second pass. In that case nothing will subscribe to
// its thennables. Instead, we'll transfer its thennables to the
// SuspenseList so that it can retry if they resolve.
// There might be multiple of these in the list but since we're
// going to wait for all of them anyway, it doesn't really matter
// which ones gets to ping. In theory we could get clever and keep
// track of how many dependencies remain but it gets tricky because
// in the meantime, we can add/remove/change items and dependencies.
// We might bail out of the loop before finding any but that
// doesn't matter since that means that the other boundaries that
// we did find already has their listeners attached.
var newThennables=suspended.updateQueue;if(newThennables!==null){workInProgress.updateQueue=newThennables;workInProgress.flags|=Update;}// Rerender the whole list, but this time, we'll force fallbacks
// to stay in place.
// Reset the effect list before doing the second pass since that's now invalid.
if(renderState.lastEffect===null){workInProgress.firstEffect=null;}workInProgress.lastEffect=renderState.lastEffect;// Reset the child fibers to their original state.
resetChildFibers(workInProgress,renderLanes);// Set up the Suspense Context to force suspense and immediately
// rerender the children.
pushSuspenseContext(workInProgress,setShallowSuspenseContext(suspenseStackCursor.current,ForceSuspenseFallback));return workInProgress.child;}row=row.sibling;}}if(renderState.tail!==null&&now$1()>getRenderTargetTime()){// We have already passed our CPU deadline but we still have rows
// left in the tail. We'll just give up further attempts to render
// the main content and only render fallbacks.
workInProgress.flags|=DidCapture;didSuspendAlready=true;cutOffTailIfNeeded(renderState,false);// Since nothing actually suspended, there will nothing to ping this
// to get it started back up to attempt the next item. While in terms
// of priority this work has the same priority as this current render,
// it's not part of the same transition once the transition has
// committed. If it's sync, we still want to yield so that it can be
// painted. Conceptually, this is really the same as pinging.
// We can use any RetryLane even if it's the one currently rendering
// since we're leaving it behind on this node.
workInProgress.lanes=SomeRetryLane;{markSpawnedWork(SomeRetryLane);}}}else{cutOffTailIfNeeded(renderState,false);}// Next we're going to render the tail.
}else{// Append the rendered row to the child list.
if(!didSuspendAlready){var _suspended=findFirstSuspended(renderedTail);if(_suspended!==null){workInProgress.flags|=DidCapture;didSuspendAlready=true;// Ensure we transfer the update queue to the parent so that it doesn't
// get lost if this row ends up dropped during a second pass.
var _newThennables=_suspended.updateQueue;if(_newThennables!==null){workInProgress.updateQueue=_newThennables;workInProgress.flags|=Update;}cutOffTailIfNeeded(renderState,true);// This might have been modified.
if(renderState.tail===null&&renderState.tailMode==='hidden'&&!renderedTail.alternate&&!getIsHydrating()// We don't cut it if we're hydrating.
){// We need to delete the row we just rendered.
// Reset the effect list to what it was before we rendered this
// child. The nested children have already appended themselves.
var lastEffect=workInProgress.lastEffect=renderState.lastEffect;// Remove any effects that were appended after this point.
if(lastEffect!==null){lastEffect.nextEffect=null;}// We're done.
return null;}}else if(// The time it took to render last row is greater than the remaining
// time we have to render. So rendering one more row would likely
// exceed it.
now$1()*2-renderState.renderingStartTime>getRenderTargetTime()&&renderLanes!==OffscreenLane){// We have now passed our CPU deadline and we'll just give up further
// attempts to render the main content and only render fallbacks.
// The assumption is that this is usually faster.
workInProgress.flags|=DidCapture;didSuspendAlready=true;cutOffTailIfNeeded(renderState,false);// Since nothing actually suspended, there will nothing to ping this
// to get it started back up to attempt the next item. While in terms
// of priority this work has the same priority as this current render,
// it's not part of the same transition once the transition has
// committed. If it's sync, we still want to yield so that it can be
// painted. Conceptually, this is really the same as pinging.
// We can use any RetryLane even if it's the one currently rendering
// since we're leaving it behind on this node.
workInProgress.lanes=SomeRetryLane;{markSpawnedWork(SomeRetryLane);}}}if(renderState.isBackwards){// The effect list of the backwards tail will have been added
// to the end. This breaks the guarantee that life-cycles fire in
// sibling order but that isn't a strong guarantee promised by React.
// Especially since these might also just pop in during future commits.
// Append to the beginning of the list.
renderedTail.sibling=workInProgress.child;workInProgress.child=renderedTail;}else{var previousSibling=renderState.last;if(previousSibling!==null){previousSibling.sibling=renderedTail;}else{workInProgress.child=renderedTail;}renderState.last=renderedTail;}}if(renderState.tail!==null){// We still have tail rows to render.
// Pop a row.
var next=renderState.tail;renderState.rendering=next;renderState.tail=next.sibling;renderState.lastEffect=workInProgress.lastEffect;renderState.renderingStartTime=now$1();next.sibling=null;// Restore the context.
// TODO: We can probably just avoid popping it instead and only
// setting it the first time we go from not suspended to suspended.
var suspenseContext=suspenseStackCursor.current;if(didSuspendAlready){suspenseContext=setShallowSuspenseContext(suspenseContext,ForceSuspenseFallback);}else{suspenseContext=setDefaultShallowSuspenseContext(suspenseContext);}pushSuspenseContext(workInProgress,suspenseContext);// Do a pass over the next row.
return next;}return null;}case FundamentalComponent:{break;}case ScopeComponent:{break;}case Block:break;case OffscreenComponent:case LegacyHiddenComponent:{popRenderLanes(workInProgress);if(current!==null){var _nextState=workInProgress.memoizedState;var _prevState=current.memoizedState;var prevIsHidden=_prevState!==null;var nextIsHidden=_nextState!==null;if(prevIsHidden!==nextIsHidden&&newProps.mode!=='unstable-defer-without-hiding'){workInProgress.flags|=Update;}}return null;}}{{throw Error("Unknown unit of work tag ("+workInProgress.tag+"). This error is likely caused by a bug in React. Please file an issue.");}}}function unwindWork(workInProgress,renderLanes){switch(workInProgress.tag){case ClassComponent:{var Component=workInProgress.type;if(isContextProvider(Component)){popContext(workInProgress);}var flags=workInProgress.flags;if(flags&ShouldCapture){workInProgress.flags=flags&~ShouldCapture|DidCapture;if((workInProgress.mode&ProfileMode)!==NoMode){transferActualDuration(workInProgress);}return workInProgress;}return null;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);resetWorkInProgressVersions();var _flags=workInProgress.flags;if(!((_flags&DidCapture)===NoFlags)){{throw Error("The root failed to unmount after an error. This is likely a bug in React. Please file an issue.");}}workInProgress.flags=_flags&~ShouldCapture|DidCapture;return workInProgress;}case HostComponent:{// TODO: popHydrationState
popHostContext(workInProgress);return null;}case SuspenseComponent:{popSuspenseContext(workInProgress);var _flags2=workInProgress.flags;if(_flags2&ShouldCapture){workInProgress.flags=_flags2&~ShouldCapture|DidCapture;// Captured a suspense effect. Re-render the boundary.
if((workInProgress.mode&ProfileMode)!==NoMode){transferActualDuration(workInProgress);}return workInProgress;}return null;}case SuspenseListComponent:{popSuspenseContext(workInProgress);// SuspenseList doesn't actually catch anything. It should've been
// caught by a nested boundary. If not, it should bubble through.
return null;}case HostPortal:popHostContainer(workInProgress);return null;case ContextProvider:popProvider(workInProgress);return null;case OffscreenComponent:case LegacyHiddenComponent:popRenderLanes(workInProgress);return null;default:return null;}}function unwindInterruptedWork(interruptedWork){switch(interruptedWork.tag){case ClassComponent:{var childContextTypes=interruptedWork.type.childContextTypes;if(childContextTypes!==null&&childContextTypes!==undefined){popContext(interruptedWork);}break;}case HostRoot:{popHostContainer(interruptedWork);popTopLevelContextObject(interruptedWork);resetWorkInProgressVersions();break;}case HostComponent:{popHostContext(interruptedWork);break;}case HostPortal:popHostContainer(interruptedWork);break;case SuspenseComponent:popSuspenseContext(interruptedWork);break;case SuspenseListComponent:popSuspenseContext(interruptedWork);break;case ContextProvider:popProvider(interruptedWork);break;case OffscreenComponent:case LegacyHiddenComponent:popRenderLanes(interruptedWork);break;}}function createCapturedValue(value,source){// If the value is an error, call this function immediately after it is thrown
// so the stack is accurate.
return{value:value,source:source,stack:getStackByFiberInDevAndProd(source)};}// This module is forked in different environments.
// By default, return `true` to log errors to the console.
// Forks can return `false` if this isn't desirable.
function showErrorDialog(boundary,errorInfo){return true;}function logCapturedError(boundary,errorInfo){try{var logError=showErrorDialog(boundary,errorInfo);// Allow injected showErrorDialog() to prevent default console.error logging.
// This enables renderers like ReactNative to better manage redbox behavior.
if(logError===false){return;}var error=errorInfo.value;if(true){var source=errorInfo.source;var stack=errorInfo.stack;var componentStack=stack!==null?stack:'';// Browsers support silencing uncaught errors by calling
// `preventDefault()` in window `error` handler.
// We record this information as an expando on the error.
if(error!=null&&error._suppressLogging){if(boundary.tag===ClassComponent){// The error is recoverable and was silenced.
// Ignore it and don't print the stack addendum.
// This is handy for testing error boundaries without noise.
return;}// The error is fatal. Since the silencing might have
// been accidental, we'll surface it anyway.
// However, the browser would have silenced the original error
// so we'll print it first, and then print the stack addendum.
console['error'](error);// Don't transform to our wrapper
// For a more detailed description of this block, see:
// https://github.com/facebook/react/pull/13384
}var componentName=source?getComponentName(source.type):null;var componentNameMessage=componentName?"The above error occurred in the <"+componentName+"> component:":'The above error occurred in one of your React components:';var errorBoundaryMessage;var errorBoundaryName=getComponentName(boundary.type);if(errorBoundaryName){errorBoundaryMessage="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+errorBoundaryName+".");}else{errorBoundaryMessage='Consider adding an error boundary to your tree to customize error handling behavior.\n'+'Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.';}var combinedMessage=componentNameMessage+"\n"+componentStack+"\n\n"+(""+errorBoundaryMessage);// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console['error'](combinedMessage);// Don't transform to our wrapper
}else{}}catch(e){// This method must not throw, or React internal state will get messed up.
// If console.error is overridden, or logCapturedError() shows a dialog that throws,
// we want to report this error outside of the normal stack as a last resort.
// https://github.com/facebook/react/issues/13188
setTimeout(function(){throw e;});}}var PossiblyWeakMap$1=typeof WeakMap==='function'?WeakMap:Map;function createRootErrorUpdate(fiber,errorInfo,lane){var update=createUpdate(NoTimestamp,lane);// Unmount the root by rendering null.
update.tag=CaptureUpdate;// Caution: React DevTools currently depends on this property
// being called "element".
update.payload={element:null};var error=errorInfo.value;update.callback=function(){onUncaughtError(error);logCapturedError(fiber,errorInfo);};return update;}function createClassErrorUpdate(fiber,errorInfo,lane){var update=createUpdate(NoTimestamp,lane);update.tag=CaptureUpdate;var getDerivedStateFromError=fiber.type.getDerivedStateFromError;if(typeof getDerivedStateFromError==='function'){var error$1=errorInfo.value;update.payload=function(){logCapturedError(fiber,errorInfo);return getDerivedStateFromError(error$1);};}var inst=fiber.stateNode;if(inst!==null&&typeof inst.componentDidCatch==='function'){update.callback=function callback(){{markFailedErrorBoundaryForHotReloading(fiber);}if(typeof getDerivedStateFromError!=='function'){// To preserve the preexisting retry behavior of error boundaries,
// we keep track of which ones already failed during this batch.
// This gets reset before we yield back to the browser.
// TODO: Warn in strict mode if getDerivedStateFromError is
// not defined.
markLegacyErrorBoundaryAsFailed(this);// Only log here if componentDidCatch is the only error boundary method defined
logCapturedError(fiber,errorInfo);}var error$1=errorInfo.value;var stack=errorInfo.stack;this.componentDidCatch(error$1,{componentStack:stack!==null?stack:''});{if(typeof getDerivedStateFromError!=='function'){// If componentDidCatch is the only error boundary method defined,
// then it needs to call setState to recover from errors.
// If no state update is scheduled then the boundary will swallow the error.
if(!includesSomeLane(fiber.lanes,SyncLane)){error('%s: Error boundaries should implement getDerivedStateFromError(). '+'In that method, return a state update to display an error message or fallback UI.',getComponentName(fiber.type)||'Unknown');}}}};}else{update.callback=function(){markFailedErrorBoundaryForHotReloading(fiber);};}return update;}function attachPingListener(root,wakeable,lanes){// Attach a listener to the promise to "ping" the root and retry. But only if
// one does not already exist for the lanes we're currently rendering (which
// acts like a "thread ID" here).
var pingCache=root.pingCache;var threadIDs;if(pingCache===null){pingCache=root.pingCache=new PossiblyWeakMap$1();threadIDs=new Set();pingCache.set(wakeable,threadIDs);}else{threadIDs=pingCache.get(wakeable);if(threadIDs===undefined){threadIDs=new Set();pingCache.set(wakeable,threadIDs);}}if(!threadIDs.has(lanes)){// Memoize using the thread ID to prevent redundant listeners.
threadIDs.add(lanes);var ping=pingSuspendedRoot.bind(null,root,wakeable,lanes);wakeable.then(ping,ping);}}function throwException(root,returnFiber,sourceFiber,value,rootRenderLanes){// The source fiber did not complete.
sourceFiber.flags|=Incomplete;// Its effect list is no longer valid.
sourceFiber.firstEffect=sourceFiber.lastEffect=null;if(value!==null&&typeof value==='object'&&typeof value.then==='function'){// This is a wakeable.
var wakeable=value;if((sourceFiber.mode&BlockingMode)===NoMode){// Reset the memoizedState to what it was before we attempted
// to render it.
var currentSource=sourceFiber.alternate;if(currentSource){sourceFiber.updateQueue=currentSource.updateQueue;sourceFiber.memoizedState=currentSource.memoizedState;sourceFiber.lanes=currentSource.lanes;}else{sourceFiber.updateQueue=null;sourceFiber.memoizedState=null;}}var hasInvisibleParentBoundary=hasSuspenseContext(suspenseStackCursor.current,InvisibleParentSuspenseContext);// Schedule the nearest Suspense to re-render the timed out view.
var _workInProgress=returnFiber;do{if(_workInProgress.tag===SuspenseComponent&&shouldCaptureSuspense(_workInProgress,hasInvisibleParentBoundary)){// Found the nearest boundary.
// Stash the promise on the boundary fiber. If the boundary times out, we'll
// attach another listener to flip the boundary back to its normal state.
var wakeables=_workInProgress.updateQueue;if(wakeables===null){var updateQueue=new Set();updateQueue.add(wakeable);_workInProgress.updateQueue=updateQueue;}else{wakeables.add(wakeable);}// If the boundary is outside of blocking mode, we should *not*
// suspend the commit. Pretend as if the suspended component rendered
// null and keep rendering. In the commit phase, we'll schedule a
// subsequent synchronous update to re-render the Suspense.
//
// Note: It doesn't matter whether the component that suspended was
// inside a blocking mode tree. If the Suspense is outside of it, we
// should *not* suspend the commit.
if((_workInProgress.mode&BlockingMode)===NoMode){_workInProgress.flags|=DidCapture;sourceFiber.flags|=ForceUpdateForLegacySuspense;// We're going to commit this fiber even though it didn't complete.
// But we shouldn't call any lifecycle methods or callbacks. Remove
// all lifecycle effect tags.
sourceFiber.flags&=~(LifecycleEffectMask|Incomplete);if(sourceFiber.tag===ClassComponent){var currentSourceFiber=sourceFiber.alternate;if(currentSourceFiber===null){// This is a new mount. Change the tag so it's not mistaken for a
// completed class component. For example, we should not call
// componentWillUnmount if it is deleted.
sourceFiber.tag=IncompleteClassComponent;}else{// When we try rendering again, we should not reuse the current fiber,
// since it's known to be in an inconsistent state. Use a force update to
// prevent a bail out.
var update=createUpdate(NoTimestamp,SyncLane);update.tag=ForceUpdate;enqueueUpdate(sourceFiber,update);}}// The source fiber did not complete. Mark it with Sync priority to
// indicate that it still has pending work.
sourceFiber.lanes=mergeLanes(sourceFiber.lanes,SyncLane);// Exit without suspending.
return;}// Confirmed that the boundary is in a concurrent mode tree. Continue
// with the normal suspend path.
//
// After this we'll use a set of heuristics to determine whether this
// render pass will run to completion or restart or "suspend" the commit.
// The actual logic for this is spread out in different places.
//
// This first principle is that if we're going to suspend when we complete
// a root, then we should also restart if we get an update or ping that
// might unsuspend it, and vice versa. The only reason to suspend is
// because you think you might want to restart before committing. However,
// it doesn't make sense to restart only while in the period we're suspended.
//
// Restarting too aggressively is also not good because it starves out any
// intermediate loading state. So we use heuristics to determine when.
// Suspense Heuristics
//
// If nothing threw a Promise or all the same fallbacks are already showing,
// then don't suspend/restart.
//
// If this is an initial render of a new tree of Suspense boundaries and
// those trigger a fallback, then don't suspend/restart. We want to ensure
// that we can show the initial loading state as quickly as possible.
//
// If we hit a "Delayed" case, such as when we'd switch from content back into
// a fallback, then we should always suspend/restart. Transitions apply
// to this case. If none is defined, JND is used instead.
//
// If we're already showing a fallback and it gets "retried", allowing us to show
// another level, but there's still an inner boundary that would show a fallback,
// then we suspend/restart for 500ms since the last time we showed a fallback
// anywhere in the tree. This effectively throttles progressive loading into a
// consistent train of commits. This also gives us an opportunity to restart to
// get to the completed state slightly earlier.
//
// If there's ambiguity due to batching it's resolved in preference of:
// 1) "delayed", 2) "initial render", 3) "retry".
//
// We want to ensure that a "busy" state doesn't get force committed. We want to
// ensure that new initial loading states can commit as soon as possible.
attachPingListener(root,wakeable,rootRenderLanes);_workInProgress.flags|=ShouldCapture;_workInProgress.lanes=rootRenderLanes;return;}// This boundary already captured during this render. Continue to the next
// boundary.
_workInProgress=_workInProgress.return;}while(_workInProgress!==null);// No boundary was found. Fallthrough to error mode.
// TODO: Use invariant so the message is stripped in prod?
value=new Error((getComponentName(sourceFiber.type)||'A React component')+' suspended while rendering, but no fallback UI was specified.\n'+'\n'+'Add a <Suspense fallback=...> component higher in the tree to '+'provide a loading indicator or placeholder to display.');}// We didn't find a boundary that could handle this type of exception. Start
// over and traverse parent path again, this time treating the exception
// as an error.
renderDidError();value=createCapturedValue(value,sourceFiber);var workInProgress=returnFiber;do{switch(workInProgress.tag){case HostRoot:{var _errorInfo=value;workInProgress.flags|=ShouldCapture;var lane=pickArbitraryLane(rootRenderLanes);workInProgress.lanes=mergeLanes(workInProgress.lanes,lane);var _update=createRootErrorUpdate(workInProgress,_errorInfo,lane);enqueueCapturedUpdate(workInProgress,_update);return;}case ClassComponent:// Capture and retry
var errorInfo=value;var ctor=workInProgress.type;var instance=workInProgress.stateNode;if((workInProgress.flags&DidCapture)===NoFlags&&(typeof ctor.getDerivedStateFromError==='function'||instance!==null&&typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance))){workInProgress.flags|=ShouldCapture;var _lane=pickArbitraryLane(rootRenderLanes);workInProgress.lanes=mergeLanes(workInProgress.lanes,_lane);// Schedule the error boundary to re-render using updated state
var _update2=createClassErrorUpdate(workInProgress,errorInfo,_lane);enqueueCapturedUpdate(workInProgress,_update2);return;}break;}workInProgress=workInProgress.return;}while(workInProgress!==null);}function invokeGuardedCallbackProd(name,func,context,a,b,c,d,e,f){var funcArgs=Array.prototype.slice.call(arguments,3);try{func.apply(context,funcArgs);}catch(error){this.onError(error);}}var invokeGuardedCallbackImpl=invokeGuardedCallbackProd;{// In DEV mode, we swap out invokeGuardedCallback for a special version
// that plays more nicely with the browser's DevTools. The idea is to preserve
// "Pause on exceptions" behavior. Because React wraps all user-provided
// functions in invokeGuardedCallback, and the production version of
// invokeGuardedCallback uses a try-catch, all user exceptions are treated
// like caught exceptions, and the DevTools won't pause unless the developer
// takes the extra step of enabling pause on caught exceptions. This is
// unintuitive, though, because even though React has caught the error, from
// the developer's perspective, the error is uncaught.
//
// To preserve the expected "Pause on exceptions" behavior, we don't use a
// try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
// DOM node, and call the user-provided callback from inside an event handler
// for that fake event. If the callback throws, the error is "captured" using
// a global event handler. But because the error happens in a different
// event loop context, it does not interrupt the normal program flow.
// Effectively, this gives us try-catch behavior without actually using
// try-catch. Neat!
// Check that the browser supports the APIs we need to implement our special
// DEV version of invokeGuardedCallback
if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){var fakeNode=document.createElement('react');invokeGuardedCallbackImpl=function invokeGuardedCallbackDev(name,func,context,a,b,c,d,e,f){// If document doesn't exist we know for sure we will crash in this method
// when we call document.createEvent(). However this can cause confusing
// errors: https://github.com/facebookincubator/create-react-app/issues/3482
// So we preemptively throw with a better message instead.
if(!(typeof document!=='undefined')){{throw Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");}}var evt=document.createEvent('Event');var didCall=false;// Keeps track of whether the user-provided callback threw an error. We
// set this to true at the beginning, then set it to false right after
// calling the function. If the function errors, `didError` will never be
// set to false. This strategy works even if the browser is flaky and
// fails to call our global error handler, because it doesn't rely on
// the error event at all.
var didError=true;// Keeps track of the value of window.event so that we can reset it
// during the callback to let user code access window.event in the
// browsers that support it.
var windowEvent=window.event;// Keeps track of the descriptor of window.event to restore it after event
// dispatching: https://github.com/facebook/react/issues/13688
var windowEventDescriptor=Object.getOwnPropertyDescriptor(window,'event');function restoreAfterDispatch(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
fakeNode.removeEventListener(evtType,callCallback,false);// We check for window.hasOwnProperty('event') to prevent the
// window.event assignment in both IE <= 10 as they throw an error
// "Member not found" in strict mode, and in Firefox which does not
// support window.event.
if(typeof window.event!=='undefined'&&window.hasOwnProperty('event')){window.event=windowEvent;}}// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var funcArgs=Array.prototype.slice.call(arguments,3);function callCallback(){didCall=true;restoreAfterDispatch();func.apply(context,funcArgs);didError=false;}// Create a global error event handler. We use this to capture the value
// that was thrown. It's possible that this error handler will fire more
// than once; for example, if non-React code also calls `dispatchEvent`
// and a handler for that event throws. We should be resilient to most of
// those cases. Even if our error event handler fires more than once, the
// last error event is always used. If the callback actually does error,
// we know that the last error event is the correct one, because it's not
// possible for anything else to have happened in between our callback
// erroring and the code that follows the `dispatchEvent` call below. If
// the callback doesn't error, but the error event was fired, we know to
// ignore it because `didError` will be false, as described above.
var error;// Use this to track whether the error event is ever called.
var didSetError=false;var isCrossOriginError=false;function handleWindowError(event){error=event.error;didSetError=true;if(error===null&&event.colno===0&&event.lineno===0){isCrossOriginError=true;}if(event.defaultPrevented){// Some other error handler has prevented default.
// Browsers silence the error report if this happens.
// We'll remember this to later decide whether to log it or not.
if(error!=null&&typeof error==='object'){try{error._suppressLogging=true;}catch(inner){// Ignore.
}}}}// Create a fake event type.
var evtType="react-"+(name?name:'invokeguardedcallback');// Attach our event handlers
window.addEventListener('error',handleWindowError);fakeNode.addEventListener(evtType,callCallback,false);// Synchronously dispatch our fake event. If the user-provided function
// errors, it will trigger our global error handler.
evt.initEvent(evtType,false,false);fakeNode.dispatchEvent(evt);if(windowEventDescriptor){Object.defineProperty(window,'event',windowEventDescriptor);}if(didCall&&didError){if(!didSetError){// The callback errored, but the error event never fired.
error=new Error('An error was thrown inside one of your components, but React '+"doesn't know what it was. This is likely due to browser "+'flakiness. React does its best to preserve the "Pause on '+'exceptions" behavior of the DevTools, which requires some '+"DEV-mode only tricks. It's possible that these don't work in "+'your browser. Try triggering the error in production mode, '+'or switching to a modern browser. If you suspect that this is '+'actually an issue with React, please file an issue.');}else if(isCrossOriginError){error=new Error("A cross-origin error was thrown. React doesn't have access to "+'the actual error object in development. '+'See https://reactjs.org/link/crossorigin-error for more information.');}this.onError(error);}// Remove our event listeners
window.removeEventListener('error',handleWindowError);if(!didCall){// Something went really wrong, and our event was not dispatched.
// https://github.com/facebook/react/issues/16734
// https://github.com/facebook/react/issues/16585
// Fall back to the production implementation.
restoreAfterDispatch();return invokeGuardedCallbackProd.apply(this,arguments);}};}}var invokeGuardedCallbackImpl$1=invokeGuardedCallbackImpl;var hasError=false;var caughtError=null;// Used by event system to capture/rethrow the first error.
var reporter={onError:function onError(error){hasError=true;caughtError=error;}};/**
 * Call a function while guarding against errors that happens within it.
 * Returns an error if it throws, otherwise null.
 *
 * In production, this is implemented using a try-catch. The reason we don't
 * use a try-catch directly is so that we can swap out a different
 * implementation in DEV mode.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */function invokeGuardedCallback(name,func,context,a,b,c,d,e,f){hasError=false;caughtError=null;invokeGuardedCallbackImpl$1.apply(reporter,arguments);}function hasCaughtError(){return hasError;}function clearCaughtError(){if(hasError){var error=caughtError;hasError=false;caughtError=null;return error;}else{{{throw Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");}}}}var didWarnAboutUndefinedSnapshotBeforeUpdate=null;{didWarnAboutUndefinedSnapshotBeforeUpdate=new Set();}var PossiblyWeakSet=typeof WeakSet==='function'?WeakSet:Set;var callComponentWillUnmountWithTimer=function callComponentWillUnmountWithTimer(current,instance){instance.props=current.memoizedProps;instance.state=current.memoizedState;{instance.componentWillUnmount();}};// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current,instance){{invokeGuardedCallback(null,callComponentWillUnmountWithTimer,null,current,instance);if(hasCaughtError()){var unmountError=clearCaughtError();captureCommitPhaseError(current,unmountError);}}}function safelyDetachRef(current){var ref=current.ref;if(ref!==null){if(typeof ref==='function'){{invokeGuardedCallback(null,ref,null,null);if(hasCaughtError()){var refError=clearCaughtError();captureCommitPhaseError(current,refError);}}}else{ref.current=null;}}}function safelyCallDestroy(current,destroy){{invokeGuardedCallback(null,destroy,null);if(hasCaughtError()){var error=clearCaughtError();captureCommitPhaseError(current,error);}}}function commitBeforeMutationLifeCycles(current,finishedWork){switch(finishedWork.tag){case FunctionComponent:case ForwardRef:case SimpleMemoComponent:case Block:{return;}case ClassComponent:{if(finishedWork.flags&Snapshot){if(current!==null){var prevProps=current.memoizedProps;var prevState=current.memoizedState;var instance=finishedWork.stateNode;// We could update instance props and state here,
// but instead we rely on them being set during last render.
// TODO: revisit this when we implement resuming.
{if(finishedWork.type===finishedWork.elementType&&!didWarnAboutReassigningProps){if(instance.props!==finishedWork.memoizedProps){error('Expected %s props to match memoized props before '+'getSnapshotBeforeUpdate. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.props`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}if(instance.state!==finishedWork.memoizedState){error('Expected %s state to match memoized state before '+'getSnapshotBeforeUpdate. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.state`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}}}var snapshot=instance.getSnapshotBeforeUpdate(finishedWork.elementType===finishedWork.type?prevProps:resolveDefaultProps(finishedWork.type,prevProps),prevState);{var didWarnSet=didWarnAboutUndefinedSnapshotBeforeUpdate;if(snapshot===undefined&&!didWarnSet.has(finishedWork.type)){didWarnSet.add(finishedWork.type);error('%s.getSnapshotBeforeUpdate(): A snapshot value (or null) '+'must be returned. You have returned undefined.',getComponentName(finishedWork.type));}}instance.__reactInternalSnapshotBeforeUpdate=snapshot;}}return;}case HostRoot:{if(supportsMutation){if(finishedWork.flags&Snapshot){var root=finishedWork.stateNode;clearContainer(root.containerInfo);}}return;}case HostComponent:case HostText:case HostPortal:case IncompleteClassComponent:// Nothing to do for these component types
return;}{{throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");}}}function commitHookEffectListUnmount(tag,finishedWork){var updateQueue=finishedWork.updateQueue;var lastEffect=updateQueue!==null?updateQueue.lastEffect:null;if(lastEffect!==null){var firstEffect=lastEffect.next;var effect=firstEffect;do{if((effect.tag&tag)===tag){// Unmount
var destroy=effect.destroy;effect.destroy=undefined;if(destroy!==undefined){destroy();}}effect=effect.next;}while(effect!==firstEffect);}}function commitHookEffectListMount(tag,finishedWork){var updateQueue=finishedWork.updateQueue;var lastEffect=updateQueue!==null?updateQueue.lastEffect:null;if(lastEffect!==null){var firstEffect=lastEffect.next;var effect=firstEffect;do{if((effect.tag&tag)===tag){// Mount
var create=effect.create;effect.destroy=create();{var destroy=effect.destroy;if(destroy!==undefined&&typeof destroy!=='function'){var addendum=void 0;if(destroy===null){addendum=' You returned null. If your effect does not require clean '+'up, return undefined (or nothing).';}else if(typeof destroy.then==='function'){addendum='\n\nIt looks like you wrote useEffect(async () => ...) or returned a Promise. '+'Instead, write the async function inside your effect '+'and call it immediately:\n\n'+'useEffect(() => {\n'+'  async function fetchData() {\n'+'    // You can await here\n'+'    const response = await MyAPI.getData(someId);\n'+'    // ...\n'+'  }\n'+'  fetchData();\n'+"}, [someId]); // Or [] if effect doesn't need props or state\n\n"+'Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching';}else{addendum=' You returned: '+destroy;}error('An effect function must not return anything besides a function, '+'which is used for clean-up.%s',addendum);}}}effect=effect.next;}while(effect!==firstEffect);}}function schedulePassiveEffects(finishedWork){var updateQueue=finishedWork.updateQueue;var lastEffect=updateQueue!==null?updateQueue.lastEffect:null;if(lastEffect!==null){var firstEffect=lastEffect.next;var effect=firstEffect;do{var _effect=effect,next=_effect.next,tag=_effect.tag;if((tag&Passive$1)!==NoFlags$1&&(tag&HasEffect)!==NoFlags$1){enqueuePendingPassiveHookEffectUnmount(finishedWork,effect);enqueuePendingPassiveHookEffectMount(finishedWork,effect);}effect=next;}while(effect!==firstEffect);}}function commitLifeCycles(finishedRoot,current,finishedWork,committedLanes){switch(finishedWork.tag){case FunctionComponent:case ForwardRef:case SimpleMemoComponent:case Block:{// At this point layout effects have already been destroyed (during mutation phase).
// This is done to prevent sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
{commitHookEffectListMount(Layout|HasEffect,finishedWork);}schedulePassiveEffects(finishedWork);return;}case ClassComponent:{var instance=finishedWork.stateNode;if(finishedWork.flags&Update){if(current===null){// We could update instance props and state here,
// but instead we rely on them being set during last render.
// TODO: revisit this when we implement resuming.
{if(finishedWork.type===finishedWork.elementType&&!didWarnAboutReassigningProps){if(instance.props!==finishedWork.memoizedProps){error('Expected %s props to match memoized props before '+'componentDidMount. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.props`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}if(instance.state!==finishedWork.memoizedState){error('Expected %s state to match memoized state before '+'componentDidMount. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.state`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}}}{instance.componentDidMount();}}else{var prevProps=finishedWork.elementType===finishedWork.type?current.memoizedProps:resolveDefaultProps(finishedWork.type,current.memoizedProps);var prevState=current.memoizedState;// We could update instance props and state here,
// but instead we rely on them being set during last render.
// TODO: revisit this when we implement resuming.
{if(finishedWork.type===finishedWork.elementType&&!didWarnAboutReassigningProps){if(instance.props!==finishedWork.memoizedProps){error('Expected %s props to match memoized props before '+'componentDidUpdate. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.props`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}if(instance.state!==finishedWork.memoizedState){error('Expected %s state to match memoized state before '+'componentDidUpdate. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.state`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}}}{instance.componentDidUpdate(prevProps,prevState,instance.__reactInternalSnapshotBeforeUpdate);}}}// TODO: I think this is now always non-null by the time it reaches the
// commit phase. Consider removing the type check.
var updateQueue=finishedWork.updateQueue;if(updateQueue!==null){{if(finishedWork.type===finishedWork.elementType&&!didWarnAboutReassigningProps){if(instance.props!==finishedWork.memoizedProps){error('Expected %s props to match memoized props before '+'processing the update queue. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.props`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}if(instance.state!==finishedWork.memoizedState){error('Expected %s state to match memoized state before '+'processing the update queue. '+'This might either be because of a bug in React, or because '+'a component reassigns its own `this.state`. '+'Please file an issue.',getComponentName(finishedWork.type)||'instance');}}}// We could update instance props and state here,
// but instead we rely on them being set during last render.
// TODO: revisit this when we implement resuming.
commitUpdateQueue(finishedWork,updateQueue,instance);}return;}case HostRoot:{// TODO: I think this is now always non-null by the time it reaches the
// commit phase. Consider removing the type check.
var _updateQueue=finishedWork.updateQueue;if(_updateQueue!==null){var _instance=null;if(finishedWork.child!==null){switch(finishedWork.child.tag){case HostComponent:_instance=getPublicInstance(finishedWork.child.stateNode);break;case ClassComponent:_instance=finishedWork.child.stateNode;break;}}commitUpdateQueue(finishedWork,_updateQueue,_instance);}return;}case HostComponent:{var _instance2=finishedWork.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
if(current===null&&finishedWork.flags&Update){var type=finishedWork.type;var props=finishedWork.memoizedProps;commitMount(_instance2,type,props,finishedWork);}return;}case HostText:{// We have no life-cycles associated with text.
return;}case HostPortal:{// We have no life-cycles associated with portals.
return;}case Profiler:{{var _finishedWork$memoize2=finishedWork.memoizedProps,onCommit=_finishedWork$memoize2.onCommit,onRender=_finishedWork$memoize2.onRender;var effectDuration=finishedWork.stateNode.effectDuration;var commitTime=getCommitTime();if(typeof onRender==='function'){{onRender(finishedWork.memoizedProps.id,current===null?'mount':'update',finishedWork.actualDuration,finishedWork.treeBaseDuration,finishedWork.actualStartTime,commitTime,finishedRoot.memoizedInteractions);}}}return;}case SuspenseComponent:{commitSuspenseHydrationCallbacks(finishedRoot,finishedWork);return;}case SuspenseListComponent:case IncompleteClassComponent:case FundamentalComponent:case ScopeComponent:case OffscreenComponent:case LegacyHiddenComponent:return;}{{throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");}}}function hideOrUnhideAllChildren(finishedWork,isHidden){if(supportsMutation){// We only have the top Fiber that was inserted but we need to recurse down its
// children to find all the terminal nodes.
var node=finishedWork;while(true){if(node.tag===HostComponent){var instance=node.stateNode;if(isHidden){hideInstance(instance);}else{unhideInstance(node.stateNode,node.memoizedProps);}}else if(node.tag===HostText){var _instance3=node.stateNode;if(isHidden){hideTextInstance(_instance3);}else{unhideTextInstance(_instance3,node.memoizedProps);}}else if((node.tag===OffscreenComponent||node.tag===LegacyHiddenComponent)&&node.memoizedState!==null&&node!==finishedWork);else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===finishedWork){return;}while(node.sibling===null){if(node.return===null||node.return===finishedWork){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}}function commitAttachRef(finishedWork){var ref=finishedWork.ref;if(ref!==null){var instance=finishedWork.stateNode;var instanceToUse;switch(finishedWork.tag){case HostComponent:instanceToUse=getPublicInstance(instance);break;default:instanceToUse=instance;}// Moved outside to ensure DCE works with this flag
if(typeof ref==='function'){ref(instanceToUse);}else{{if(!ref.hasOwnProperty('current')){error('Unexpected ref object provided for %s. '+'Use either a ref-setter function or React.createRef().',getComponentName(finishedWork.type));}}ref.current=instanceToUse;}}}function commitDetachRef(current){var currentRef=current.ref;if(currentRef!==null){if(typeof currentRef==='function'){currentRef(null);}else{currentRef.current=null;}}}// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(finishedRoot,current,renderPriorityLevel){onCommitUnmount(current);switch(current.tag){case FunctionComponent:case ForwardRef:case MemoComponent:case SimpleMemoComponent:case Block:{var updateQueue=current.updateQueue;if(updateQueue!==null){var lastEffect=updateQueue.lastEffect;if(lastEffect!==null){var firstEffect=lastEffect.next;var effect=firstEffect;do{var _effect2=effect,destroy=_effect2.destroy,tag=_effect2.tag;if(destroy!==undefined){if((tag&Passive$1)!==NoFlags$1){enqueuePendingPassiveHookEffectUnmount(current,effect);}else{{safelyCallDestroy(current,destroy);}}}effect=effect.next;}while(effect!==firstEffect);}}return;}case ClassComponent:{safelyDetachRef(current);var instance=current.stateNode;if(typeof instance.componentWillUnmount==='function'){safelyCallComponentWillUnmount(current,instance);}return;}case HostComponent:{safelyDetachRef(current);return;}case HostPortal:{// TODO: this is recursive.
// We are also not using this parent because
// the portal will get pushed immediately.
if(supportsMutation){unmountHostComponents(finishedRoot,current);}else if(supportsPersistence){emptyPortalContainer(current);}return;}case FundamentalComponent:{return;}case DehydratedFragment:{return;}case ScopeComponent:{return;}}}function commitNestedUnmounts(finishedRoot,root,renderPriorityLevel){// While we're inside a removed host node we don't want to call
// removeChild on the inner nodes because they're removed by the top
// call anyway. We also want to call componentWillUnmount on all
// composites before this host node is removed from the tree. Therefore
// we do an inner loop while we're still inside the host node.
var node=root;while(true){commitUnmount(finishedRoot,node);// Visit children because they may contain more composite or host nodes.
// Skip portals because commitUnmount() currently visits them recursively.
if(node.child!==null&&(// If we use mutation we drill down into portals using commitUnmount above.
// If we don't use mutation we drill down into portals here instead.
!supportsMutation||node.tag!==HostPortal)){node.child.return=node;node=node.child;continue;}if(node===root){return;}while(node.sibling===null){if(node.return===null||node.return===root){return;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}function detachFiberMutation(fiber){// Cut off the return pointers to disconnect it from the tree. Ideally, we
// should clear the child pointer of the parent alternate to let this
// get GC:ed but we don't know which for sure which parent is the current
// one so we'll settle for GC:ing the subtree of this child. This child
// itself will be GC:ed when the parent updates the next time.
// Note: we cannot null out sibling here, otherwise it can cause issues
// with findDOMNode and how it requires the sibling field to carry out
// traversal in a later effect. See PR #16820. We now clear the sibling
// field after effects, see: detachFiberAfterEffects.
//
// Don't disconnect stateNode now; it will be detached in detachFiberAfterEffects.
// It may be required if the current component is an error boundary,
// and one of its descendants throws while unmounting a passive effect.
fiber.alternate=null;fiber.child=null;fiber.dependencies=null;fiber.firstEffect=null;fiber.lastEffect=null;fiber.memoizedProps=null;fiber.memoizedState=null;fiber.pendingProps=null;fiber.return=null;fiber.updateQueue=null;{fiber._debugOwner=null;}}function emptyPortalContainer(current){if(!supportsPersistence){return;}var portal=current.stateNode;var containerInfo=portal.containerInfo;var emptyChildSet=createContainerChildSet(containerInfo);replaceContainerChildren(containerInfo,emptyChildSet);}function commitContainer(finishedWork){if(!supportsPersistence){return;}switch(finishedWork.tag){case ClassComponent:case HostComponent:case HostText:case FundamentalComponent:{return;}case HostRoot:case HostPortal:{var portalOrRoot=finishedWork.stateNode;var containerInfo=portalOrRoot.containerInfo,pendingChildren=portalOrRoot.pendingChildren;replaceContainerChildren(containerInfo,pendingChildren);return;}}{{throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");}}}function getHostParentFiber(fiber){var parent=fiber.return;while(parent!==null){if(isHostParent(parent)){return parent;}parent=parent.return;}{{throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");}}}function isHostParent(fiber){return fiber.tag===HostComponent||fiber.tag===HostRoot||fiber.tag===HostPortal;}function getHostSibling(fiber){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
// TODO: Find a more efficient way to do this.
var node=fiber;siblings:while(true){// If we didn't find anything, let's try the next sibling.
while(node.sibling===null){if(node.return===null||isHostParent(node.return)){// If we pop out of the root or hit the parent the fiber we are the
// last sibling.
return null;}node=node.return;}node.sibling.return=node.return;node=node.sibling;while(node.tag!==HostComponent&&node.tag!==HostText&&node.tag!==DehydratedFragment){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(node.flags&Placement){// If we don't have a child, try the siblings instead.
continue siblings;}// If we don't have a child, try the siblings instead.
// We also skip portals because they are not part of this host tree.
if(node.child===null||node.tag===HostPortal){continue siblings;}else{node.child.return=node;node=node.child;}}// Check if this host node is stable or about to be placed.
if(!(node.flags&Placement)){// Found it!
return node.stateNode;}}}function commitPlacement(finishedWork){if(!supportsMutation){return;}// Recursively insert all host nodes into the parent.
var parentFiber=getHostParentFiber(finishedWork);// Note: these two variables *must* always be updated together.
var parent;var isContainer;var parentStateNode=parentFiber.stateNode;switch(parentFiber.tag){case HostComponent:parent=parentStateNode;isContainer=false;break;case HostRoot:parent=parentStateNode.containerInfo;isContainer=true;break;case HostPortal:parent=parentStateNode.containerInfo;isContainer=true;break;case FundamentalComponent:// eslint-disable-next-line-no-fallthrough
default:{{throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");}}}if(parentFiber.flags&ContentReset){// Reset the text content of the parent before doing any insertions
resetTextContent(parent);// Clear ContentReset from the effect tag
parentFiber.flags&=~ContentReset;}var before=getHostSibling(finishedWork);// We only have the top Fiber that was inserted but we need to recurse down its
// children to find all the terminal nodes.
if(isContainer){insertOrAppendPlacementNodeIntoContainer(finishedWork,before,parent);}else{insertOrAppendPlacementNode(finishedWork,before,parent);}}function insertOrAppendPlacementNodeIntoContainer(node,before,parent){var tag=node.tag;var isHost=tag===HostComponent||tag===HostText;if(isHost||enableFundamentalAPI){var stateNode=isHost?node.stateNode:node.stateNode.instance;if(before){insertInContainerBefore(parent,stateNode,before);}else{appendChildToContainer(parent,stateNode);}}else if(tag===HostPortal);else{var child=node.child;if(child!==null){insertOrAppendPlacementNodeIntoContainer(child,before,parent);var sibling=child.sibling;while(sibling!==null){insertOrAppendPlacementNodeIntoContainer(sibling,before,parent);sibling=sibling.sibling;}}}}function insertOrAppendPlacementNode(node,before,parent){var tag=node.tag;var isHost=tag===HostComponent||tag===HostText;if(isHost||enableFundamentalAPI){var stateNode=isHost?node.stateNode:node.stateNode.instance;if(before){insertBefore(parent,stateNode,before);}else{appendChild(parent,stateNode);}}else if(tag===HostPortal);else{var child=node.child;if(child!==null){insertOrAppendPlacementNode(child,before,parent);var sibling=child.sibling;while(sibling!==null){insertOrAppendPlacementNode(sibling,before,parent);sibling=sibling.sibling;}}}}function unmountHostComponents(finishedRoot,current,renderPriorityLevel){// We only have the top Fiber that was deleted but we need to recurse down its
// children to find all the terminal nodes.
var node=current;// Each iteration, currentParent is populated with node's host parent if not
// currentParentIsValid.
var currentParentIsValid=false;// Note: these two variables *must* always be updated together.
var currentParent;var currentParentIsContainer;while(true){if(!currentParentIsValid){var parent=node.return;findParent:while(true){if(!(parent!==null)){{throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");}}var parentStateNode=parent.stateNode;switch(parent.tag){case HostComponent:currentParent=parentStateNode;currentParentIsContainer=false;break findParent;case HostRoot:currentParent=parentStateNode.containerInfo;currentParentIsContainer=true;break findParent;case HostPortal:currentParent=parentStateNode.containerInfo;currentParentIsContainer=true;break findParent;}parent=parent.return;}currentParentIsValid=true;}if(node.tag===HostComponent||node.tag===HostText){commitNestedUnmounts(finishedRoot,node);// After all the children have unmounted, it is now safe to remove the
// node from the tree.
if(currentParentIsContainer){removeChildFromContainer(currentParent,node.stateNode);}else{removeChild(currentParent,node.stateNode);}// Don't visit children because we already visited them.
}else if(node.tag===HostPortal){if(node.child!==null){// When we go into a portal, it becomes the parent to remove from.
// We will reassign it back when we pop the portal on the way up.
currentParent=node.stateNode.containerInfo;currentParentIsContainer=true;// Visit children because portals might contain host components.
node.child.return=node;node=node.child;continue;}}else{commitUnmount(finishedRoot,node);// Visit children because we may find more host components below.
if(node.child!==null){node.child.return=node;node=node.child;continue;}}if(node===current){return;}while(node.sibling===null){if(node.return===null||node.return===current){return;}node=node.return;if(node.tag===HostPortal){// When we go out of the portal, we need to restore the parent.
// Since we don't keep a stack of them, we will search for it.
currentParentIsValid=false;}}node.sibling.return=node.return;node=node.sibling;}}function commitDeletion(finishedRoot,current,renderPriorityLevel){if(supportsMutation){// Recursively delete all host nodes from the parent.
// Detach refs and call componentWillUnmount() on the whole subtree.
unmountHostComponents(finishedRoot,current);}else{// Detach refs and call componentWillUnmount() on the whole subtree.
commitNestedUnmounts(finishedRoot,current);}var alternate=current.alternate;detachFiberMutation(current);if(alternate!==null){detachFiberMutation(alternate);}}function commitWork(current,finishedWork){if(!supportsMutation){switch(finishedWork.tag){case FunctionComponent:case ForwardRef:case MemoComponent:case SimpleMemoComponent:case Block:{// Layout effects are destroyed during the mutation phase so that all
// destroy functions for all fibers are called before any create functions.
// This prevents sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
{commitHookEffectListUnmount(Layout|HasEffect,finishedWork);}return;}case Profiler:{return;}case SuspenseComponent:{commitSuspenseComponent(finishedWork);attachSuspenseRetryListeners(finishedWork);return;}case SuspenseListComponent:{attachSuspenseRetryListeners(finishedWork);return;}case HostRoot:{if(supportsHydration){var root=finishedWork.stateNode;if(root.hydrate){// We've just hydrated. No need to hydrate again.
root.hydrate=false;commitHydratedContainer(root.containerInfo);}}break;}case OffscreenComponent:case LegacyHiddenComponent:{return;}}commitContainer(finishedWork);return;}switch(finishedWork.tag){case FunctionComponent:case ForwardRef:case MemoComponent:case SimpleMemoComponent:case Block:{// Layout effects are destroyed during the mutation phase so that all
// destroy functions for all fibers are called before any create functions.
// This prevents sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
{commitHookEffectListUnmount(Layout|HasEffect,finishedWork);}return;}case ClassComponent:{return;}case HostComponent:{var instance=finishedWork.stateNode;if(instance!=null){// Commit the work prepared earlier.
var newProps=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldProps=current!==null?current.memoizedProps:newProps;var type=finishedWork.type;// TODO: Type the updateQueue to be specific to host components.
var updatePayload=finishedWork.updateQueue;finishedWork.updateQueue=null;if(updatePayload!==null){commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork);}}return;}case HostText:{if(!(finishedWork.stateNode!==null)){{throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");}}var textInstance=finishedWork.stateNode;var newText=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldText=current!==null?current.memoizedProps:newText;commitTextUpdate(textInstance,oldText,newText);return;}case HostRoot:{if(supportsHydration){var _root=finishedWork.stateNode;if(_root.hydrate){// We've just hydrated. No need to hydrate again.
_root.hydrate=false;commitHydratedContainer(_root.containerInfo);}}return;}case Profiler:{return;}case SuspenseComponent:{commitSuspenseComponent(finishedWork);attachSuspenseRetryListeners(finishedWork);return;}case SuspenseListComponent:{attachSuspenseRetryListeners(finishedWork);return;}case IncompleteClassComponent:{return;}case FundamentalComponent:{break;}case ScopeComponent:{break;}case OffscreenComponent:case LegacyHiddenComponent:{var newState=finishedWork.memoizedState;var isHidden=newState!==null;hideOrUnhideAllChildren(finishedWork,isHidden);return;}}{{throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");}}}function commitSuspenseComponent(finishedWork){var newState=finishedWork.memoizedState;if(newState!==null){markCommitTimeOfFallback();if(supportsMutation){// Hide the Offscreen component that contains the primary children. TODO:
// Ideally, this effect would have been scheduled on the Offscreen fiber
// itself. That's how unhiding works: the Offscreen component schedules an
// effect on itself. However, in this case, the component didn't complete,
// so the fiber was never added to the effect list in the normal path. We
// could have appended it to the effect list in the Suspense component's
// second pass, but doing it this way is less complicated. This would be
// simpler if we got rid of the effect list and traversed the tree, like
// we're planning to do.
var primaryChildParent=finishedWork.child;hideOrUnhideAllChildren(primaryChildParent,true);}}}function commitSuspenseHydrationCallbacks(finishedRoot,finishedWork){if(!supportsHydration){return;}var newState=finishedWork.memoizedState;if(newState===null){var current=finishedWork.alternate;if(current!==null){var prevState=current.memoizedState;if(prevState!==null){var suspenseInstance=prevState.dehydrated;if(suspenseInstance!==null){commitHydratedSuspenseInstance(suspenseInstance);}}}}}function attachSuspenseRetryListeners(finishedWork){// If this boundary just timed out, then it will have a set of wakeables.
// For each wakeable, attach a listener so that when it resolves, React
// attempts to re-render the boundary in the primary (pre-timeout) state.
var wakeables=finishedWork.updateQueue;if(wakeables!==null){finishedWork.updateQueue=null;var retryCache=finishedWork.stateNode;if(retryCache===null){retryCache=finishedWork.stateNode=new PossiblyWeakSet();}wakeables.forEach(function(wakeable){// Memoize using the boundary fiber to prevent redundant listeners.
var retry=resolveRetryWakeable.bind(null,finishedWork,wakeable);if(!retryCache.has(wakeable)){{if(wakeable.__reactDoNotTraceInteractions!==true){retry=tracing.unstable_wrap(retry);}}retryCache.add(wakeable);wakeable.then(retry,retry);}});}}// This function detects when a Suspense boundary goes from visible to hidden.
// It returns false if the boundary is already hidden.
// TODO: Use an effect tag.
function isSuspenseBoundaryBeingHidden(current,finishedWork){if(current!==null){var oldState=current.memoizedState;if(oldState===null||oldState.dehydrated!==null){var newState=finishedWork.memoizedState;return newState!==null&&newState.dehydrated===null;}}return false;}function commitResetTextContent(current){if(!supportsMutation){return;}resetTextContent(current.stateNode);}var COMPONENT_TYPE=0;var HAS_PSEUDO_CLASS_TYPE=1;var ROLE_TYPE=2;var TEST_NAME_TYPE=3;var TEXT_TYPE=4;if(typeof Symbol==='function'&&Symbol.for){var symbolFor$1=Symbol.for;COMPONENT_TYPE=symbolFor$1('selector.component');HAS_PSEUDO_CLASS_TYPE=symbolFor$1('selector.has_pseudo_class');ROLE_TYPE=symbolFor$1('selector.role');TEST_NAME_TYPE=symbolFor$1('selector.test_id');TEXT_TYPE=symbolFor$1('selector.text');}function createComponentSelector(component){return{$$typeof:COMPONENT_TYPE,value:component};}function createHasPsuedoClassSelector(selectors){return{$$typeof:HAS_PSEUDO_CLASS_TYPE,value:selectors};}function createRoleSelector(role){return{$$typeof:ROLE_TYPE,value:role};}function createTextSelector(text){return{$$typeof:TEXT_TYPE,value:text};}function createTestNameSelector(id){return{$$typeof:TEST_NAME_TYPE,value:id};}function findFiberRootForHostRoot(hostRoot){var maybeFiber=getInstanceFromNode(hostRoot);if(maybeFiber!=null){if(!(typeof maybeFiber.memoizedProps['data-testname']==='string')){{throw Error("Invalid host root specified. Should be either a React container or a node with a testname attribute.");}}return maybeFiber;}else{var fiberRoot=findFiberRoot(hostRoot);if(!(fiberRoot!==null)){{throw Error("Could not find React container within specified host subtree.");}}// The Flow type for FiberRoot is a little funky.
// createFiberRoot() cheats this by treating the root as :any and adding stateNode lazily.
return fiberRoot.stateNode.current;}}function matchSelector(fiber,selector){switch(selector.$$typeof){case COMPONENT_TYPE:if(fiber.type===selector.value){return true;}break;case HAS_PSEUDO_CLASS_TYPE:return hasMatchingPaths(fiber,selector.value);case ROLE_TYPE:if(fiber.tag===HostComponent){var node=fiber.stateNode;if(matchAccessibilityRole(node,selector.value)){return true;}}break;case TEXT_TYPE:if(fiber.tag===HostComponent||fiber.tag===HostText){var textContent=getTextContent(fiber);if(textContent!==null&&textContent.indexOf(selector.value)>=0){return true;}}break;case TEST_NAME_TYPE:if(fiber.tag===HostComponent){var dataTestID=fiber.memoizedProps['data-testname'];if(typeof dataTestID==='string'&&dataTestID.toLowerCase()===selector.value.toLowerCase()){return true;}}break;default:{{throw Error("Invalid selector type "+selector+" specified.");}}}return false;}function selectorToString(selector){switch(selector.$$typeof){case COMPONENT_TYPE:var displayName=getComponentName(selector.value)||'Unknown';return"<"+displayName+">";case HAS_PSEUDO_CLASS_TYPE:return":has("+(selectorToString(selector)||'')+")";case ROLE_TYPE:return"[role=\""+selector.value+"\"]";case TEXT_TYPE:return"\""+selector.value+"\"";case TEST_NAME_TYPE:return"[data-testname=\""+selector.value+"\"]";default:{{throw Error("Invalid selector type "+selector+" specified.");}}}}function findPaths(root,selectors){var matchingFibers=[];var stack=[root,0];var index=0;while(index<stack.length){var fiber=stack[index++];var selectorIndex=stack[index++];var selector=selectors[selectorIndex];if(fiber.tag===HostComponent&&isHiddenSubtree(fiber)){continue;}else{while(selector!=null&&matchSelector(fiber,selector)){selectorIndex++;selector=selectors[selectorIndex];}}if(selectorIndex===selectors.length){matchingFibers.push(fiber);}else{var child=fiber.child;while(child!==null){stack.push(child,selectorIndex);child=child.sibling;}}}return matchingFibers;}// Same as findPaths but with eager bailout on first match
function hasMatchingPaths(root,selectors){var stack=[root,0];var index=0;while(index<stack.length){var fiber=stack[index++];var selectorIndex=stack[index++];var selector=selectors[selectorIndex];if(fiber.tag===HostComponent&&isHiddenSubtree(fiber)){continue;}else{while(selector!=null&&matchSelector(fiber,selector)){selectorIndex++;selector=selectors[selectorIndex];}}if(selectorIndex===selectors.length){return true;}else{var child=fiber.child;while(child!==null){stack.push(child,selectorIndex);child=child.sibling;}}}return false;}function findAllNodes(hostRoot,selectors){if(!supportsTestSelectors){{{throw Error("Test selector API is not supported by this renderer.");}}}var root=findFiberRootForHostRoot(hostRoot);var matchingFibers=findPaths(root,selectors);var instanceRoots=[];var stack=Array.from(matchingFibers);var index=0;while(index<stack.length){var node=stack[index++];if(node.tag===HostComponent){if(isHiddenSubtree(node)){continue;}instanceRoots.push(node.stateNode);}else{var child=node.child;while(child!==null){stack.push(child);child=child.sibling;}}}return instanceRoots;}function getFindAllNodesFailureDescription(hostRoot,selectors){if(!supportsTestSelectors){{{throw Error("Test selector API is not supported by this renderer.");}}}var root=findFiberRootForHostRoot(hostRoot);var maxSelectorIndex=0;var matchedNames=[];// The logic of this loop should be kept in sync with findPaths()
var stack=[root,0];var index=0;while(index<stack.length){var fiber=stack[index++];var selectorIndex=stack[index++];var selector=selectors[selectorIndex];if(fiber.tag===HostComponent&&isHiddenSubtree(fiber)){continue;}else if(matchSelector(fiber,selector)){matchedNames.push(selectorToString(selector));selectorIndex++;if(selectorIndex>maxSelectorIndex){maxSelectorIndex=selectorIndex;}}if(selectorIndex<selectors.length){var child=fiber.child;while(child!==null){stack.push(child,selectorIndex);child=child.sibling;}}}if(maxSelectorIndex<selectors.length){var unmatchedNames=[];for(var i=maxSelectorIndex;i<selectors.length;i++){unmatchedNames.push(selectorToString(selectors[i]));}return'findAllNodes was able to match part of the selector:\n'+("  "+matchedNames.join(' > ')+"\n\n")+'No matching component was found for:\n'+("  "+unmatchedNames.join(' > '));}return null;}function findBoundingRects(hostRoot,selectors){if(!supportsTestSelectors){{{throw Error("Test selector API is not supported by this renderer.");}}}var instanceRoots=findAllNodes(hostRoot,selectors);var boundingRects=[];for(var i=0;i<instanceRoots.length;i++){boundingRects.push(getBoundingRect(instanceRoots[i]));}for(var _i=boundingRects.length-1;_i>0;_i--){var targetRect=boundingRects[_i];var targetLeft=targetRect.x;var targetRight=targetLeft+targetRect.width;var targetTop=targetRect.y;var targetBottom=targetTop+targetRect.height;for(var j=_i-1;j>=0;j--){if(_i!==j){var otherRect=boundingRects[j];var otherLeft=otherRect.x;var otherRight=otherLeft+otherRect.width;var otherTop=otherRect.y;var otherBottom=otherTop+otherRect.height;// Merging all rects to the minimums set would be complicated,
// but we can handle the most common cases:
// 1. completely overlapping rects
// 2. adjacent rects that are the same width or height (e.g. items in a list)
//
// Even given the above constraints,
// we still won't end up with the fewest possible rects without doing multiple passes,
// but it's good enough for this purpose.
if(targetLeft>=otherLeft&&targetTop>=otherTop&&targetRight<=otherRight&&targetBottom<=otherBottom){// Complete overlapping rects; remove the inner one.
boundingRects.splice(_i,1);break;}else if(targetLeft===otherLeft&&targetRect.width===otherRect.width&&!(otherBottom<targetTop)&&!(otherTop>targetBottom)){// Adjacent vertical rects; merge them.
if(otherTop>targetTop){otherRect.height+=otherTop-targetTop;otherRect.y=targetTop;}if(otherBottom<targetBottom){otherRect.height=targetBottom-otherTop;}boundingRects.splice(_i,1);break;}else if(targetTop===otherTop&&targetRect.height===otherRect.height&&!(otherRight<targetLeft)&&!(otherLeft>targetRight)){// Adjacent horizontal rects; merge them.
if(otherLeft>targetLeft){otherRect.width+=otherLeft-targetLeft;otherRect.x=targetLeft;}if(otherRight<targetRight){otherRect.width=targetRight-otherLeft;}boundingRects.splice(_i,1);break;}}}}return boundingRects;}function focusWithin(hostRoot,selectors){if(!supportsTestSelectors){{{throw Error("Test selector API is not supported by this renderer.");}}}var root=findFiberRootForHostRoot(hostRoot);var matchingFibers=findPaths(root,selectors);var stack=Array.from(matchingFibers);var index=0;while(index<stack.length){var fiber=stack[index++];if(isHiddenSubtree(fiber)){continue;}if(fiber.tag===HostComponent){var node=fiber.stateNode;if(setFocusIfFocusable(node)){return true;}}var child=fiber.child;while(child!==null){stack.push(child);child=child.sibling;}}return false;}var commitHooks=[];function onCommitRoot$1(){if(supportsTestSelectors){commitHooks.forEach(function(commitHook){return commitHook();});}}function observeVisibleRects(hostRoot,selectors,callback,options){if(!supportsTestSelectors){{{throw Error("Test selector API is not supported by this renderer.");}}}var instanceRoots=findAllNodes(hostRoot,selectors);var _setupIntersectionObs=setupIntersectionObserver(instanceRoots,callback,options),_disconnect=_setupIntersectionObs.disconnect,observe=_setupIntersectionObs.observe,unobserve=_setupIntersectionObs.unobserve;// When React mutates the host environment, we may need to change what we're listening to.
var commitHook=function commitHook(){var nextInstanceRoots=findAllNodes(hostRoot,selectors);instanceRoots.forEach(function(target){if(nextInstanceRoots.indexOf(target)<0){unobserve(target);}});nextInstanceRoots.forEach(function(target){if(instanceRoots.indexOf(target)<0){observe(target);}});};commitHooks.push(commitHook);return{disconnect:function disconnect(){// Stop listening for React mutations:
var index=commitHooks.indexOf(commitHook);if(index>=0){commitHooks.splice(index,1);}// Disconnect the host observer:
_disconnect();}};}var didWarnAboutMessageChannel=false;var enqueueTaskImpl=null;function enqueueTask(task){if(enqueueTaskImpl===null){try{// read require off the module object to get around the bundlers.
// we don't want them to detect a require and bundle a Node polyfill.
var requireString=('require'+Math.random()).slice(0,7);var nodeRequire=module&&module[requireString];// assuming we're in node, let's try to get node's
// version of setImmediate, bypassing fake timers if any.
enqueueTaskImpl=nodeRequire.call(module,'timers').setImmediate;}catch(_err){// we're in a browser
// we can't use regular timers because they may still be faked
// so we try MessageChannel+postMessage instead
enqueueTaskImpl=function enqueueTaskImpl(callback){{if(didWarnAboutMessageChannel===false){didWarnAboutMessageChannel=true;if(typeof MessageChannel==='undefined'){error('This browser does not have a MessageChannel implementation, '+'so enqueuing tasks via await act(async () => ...) will fail. '+'Please file an issue at https://github.com/facebook/react/issues '+'if you encounter this warning.');}}}var channel=new MessageChannel();channel.port1.onmessage=callback;channel.port2.postMessage(undefined);};}}return enqueueTaskImpl(task);}var ceil=Math.ceil;var ReactCurrentDispatcher$2=ReactSharedInternals.ReactCurrentDispatcher,ReactCurrentOwner$2=ReactSharedInternals.ReactCurrentOwner,IsSomeRendererActing=ReactSharedInternals.IsSomeRendererActing;var NoContext=/*             */0;var BatchedContext=/*               */1;var EventContext=/*                 */2;var DiscreteEventContext=/*         */4;var LegacyUnbatchedContext=/*       */8;var RenderContext=/*                */16;var CommitContext=/*                */32;var RetryAfterError=/*       */64;var RootIncomplete=0;var RootFatalErrored=1;var RootErrored=2;var RootSuspended=3;var RootSuspendedWithDelay=4;var RootCompleted=5;// Describes where we are in the React execution stack
var executionContext=NoContext;// The root we're working on
var workInProgressRoot=null;// The fiber we're working on
var workInProgress=null;// The lanes we're rendering
var workInProgressRootRenderLanes=NoLanes;// Stack that allows components to change the render lanes for its subtree
// This is a superset of the lanes we started working on at the root. The only
// case where it's different from `workInProgressRootRenderLanes` is when we
// enter a subtree that is hidden and needs to be unhidden: Suspense and
// Offscreen component.
//
// Most things in the work loop should deal with workInProgressRootRenderLanes.
// Most things in begin/complete phases should deal with subtreeRenderLanes.
var subtreeRenderLanes=NoLanes;var subtreeRenderLanesCursor=createCursor(NoLanes);// Whether to root completed, errored, suspended, etc.
var workInProgressRootExitStatus=RootIncomplete;// A fatal error, if one is thrown
var workInProgressRootFatalError=null;// "Included" lanes refer to lanes that were worked on during this render. It's
// slightly different than `renderLanes` because `renderLanes` can change as you
// enter and exit an Offscreen tree. This value is the combination of all render
// lanes for the entire render phase.
var workInProgressRootIncludedLanes=NoLanes;// The work left over by components that were visited during this render. Only
// includes unprocessed updates, not work in bailed out children.
var workInProgressRootSkippedLanes=NoLanes;// Lanes that were updated (in an interleaved event) during this render.
var workInProgressRootUpdatedLanes=NoLanes;// Lanes that were pinged (in an interleaved event) during this render.
var workInProgressRootPingedLanes=NoLanes;var mostRecentlyUpdatedRoot=null;// The most recent time we committed a fallback. This lets us ensure a train
// model where we don't commit new loading states in too quick succession.
var globalMostRecentFallbackTime=0;var FALLBACK_THROTTLE_MS=500;// The absolute time for when we should start giving up on rendering
// more and prefer CPU suspense heuristics instead.
var workInProgressRootRenderTargetTime=Infinity;// How long a render is supposed to take before we start following CPU
// suspense heuristics and opt out of rendering more content.
var RENDER_TIMEOUT_MS=500;function resetRenderTimer(){workInProgressRootRenderTargetTime=now$1()+RENDER_TIMEOUT_MS;}function getRenderTargetTime(){return workInProgressRootRenderTargetTime;}var nextEffect=null;var hasUncaughtError=false;var firstUncaughtError=null;var legacyErrorBoundariesThatAlreadyFailed=null;var rootDoesHavePassiveEffects=false;var rootWithPendingPassiveEffects=null;var pendingPassiveEffectsRenderPriority=NoPriority$1;var pendingPassiveEffectsLanes=NoLanes;var pendingPassiveHookEffectsMount=[];var pendingPassiveHookEffectsUnmount=[];var rootsWithPendingDiscreteUpdates=null;// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT=50;var nestedUpdateCount=0;var rootWithNestedUpdates=null;var NESTED_PASSIVE_UPDATE_LIMIT=50;var nestedPassiveUpdateCount=0;// Marks the need to reschedule pending interactions at these lanes
// during the commit phase. This enables them to be traced across components
// that spawn new work during render. E.g. hidden boundaries, suspended SSR
// hydration or SuspenseList.
// TODO: Can use a bitmask instead of an array
var spawnedWorkDuringRender=null;// If two updates are scheduled within the same event, we should treat their
// event times as simultaneous, even if the actual clock time has advanced
// between the first and second call.
var currentEventTime=NoTimestamp;var currentEventWipLanes=NoLanes;var currentEventPendingLanes=NoLanes;// Dev only flag that tracks if passive effects are currently being flushed.
// We warn about state updates for unmounted components differently in this case.
var isFlushingPassiveEffects=false;var focusedInstanceHandle=null;var shouldFireAfterActiveInstanceBlur=false;function getWorkInProgressRoot(){return workInProgressRoot;}function requestEventTime(){if((executionContext&(RenderContext|CommitContext))!==NoContext){// We're inside React, so it's fine to read the actual time.
return now$1();}// We're not inside React, so we may be in the middle of a browser event.
if(currentEventTime!==NoTimestamp){// Use the same start time for all updates until we enter React again.
return currentEventTime;}// This is the first update since React yielded. Compute a new start time.
currentEventTime=now$1();return currentEventTime;}function requestUpdateLane(fiber){// Special cases
var mode=fiber.mode;if((mode&BlockingMode)===NoMode){return SyncLane;}else if((mode&ConcurrentMode)===NoMode){return getCurrentPriorityLevel()===ImmediatePriority$1?SyncLane:SyncBatchedLane;}// The algorithm for assigning an update to a lane should be stable for all
// updates at the same priority within the same event. To do this, the inputs
// to the algorithm must be the same. For example, we use the `renderLanes`
// to avoid choosing a lane that is already in the middle of rendering.
//
// However, the "included" lanes could be mutated in between updates in the
// same event, like if you perform an update inside `flushSync`. Or any other
// code path that might call `prepareFreshStack`.
//
// The trick we use is to cache the first of each of these inputs within an
// event. Then reset the cached values once we can be sure the event is over.
// Our heuristic for that is whenever we enter a concurrent work loop.
//
// We'll do the same for `currentEventPendingLanes` below.
if(currentEventWipLanes===NoLanes){currentEventWipLanes=workInProgressRootIncludedLanes;}var isTransition=requestCurrentTransition()!==NoTransition;if(isTransition){if(currentEventPendingLanes!==NoLanes){currentEventPendingLanes=mostRecentlyUpdatedRoot!==null?mostRecentlyUpdatedRoot.pendingLanes:NoLanes;}return findTransitionLane(currentEventWipLanes,currentEventPendingLanes);}// TODO: Remove this dependency on the Scheduler priority.
// To do that, we're replacing it with an update lane priority.
var schedulerPriority=getCurrentPriorityLevel();// The old behavior was using the priority level of the Scheduler.
// This couples React to the Scheduler internals, so we're replacing it
// with the currentUpdateLanePriority above. As an example of how this
// could be problematic, if we're not inside `Scheduler.runWithPriority`,
// then we'll get the priority of the current running Scheduler task,
// which is probably not what we want.
var lane;if(// TODO: Temporary. We're removing the concept of discrete updates.
(executionContext&DiscreteEventContext)!==NoContext&&schedulerPriority===UserBlockingPriority$1){lane=findUpdateLane(InputDiscreteLanePriority,currentEventWipLanes);}else{var schedulerLanePriority=schedulerPriorityToLanePriority(schedulerPriority);lane=findUpdateLane(schedulerLanePriority,currentEventWipLanes);}return lane;}function requestRetryLane(fiber){// This is a fork of `requestUpdateLane` designed specifically for Suspense
// "retries" — a special update that attempts to flip a Suspense boundary
// from its placeholder state to its primary/resolved state.
// Special cases
var mode=fiber.mode;if((mode&BlockingMode)===NoMode){return SyncLane;}else if((mode&ConcurrentMode)===NoMode){return getCurrentPriorityLevel()===ImmediatePriority$1?SyncLane:SyncBatchedLane;}// See `requestUpdateLane` for explanation of `currentEventWipLanes`
if(currentEventWipLanes===NoLanes){currentEventWipLanes=workInProgressRootIncludedLanes;}return findRetryLane(currentEventWipLanes);}function scheduleUpdateOnFiber(fiber,lane,eventTime){checkForNestedUpdates();warnAboutRenderPhaseUpdatesInDEV(fiber);var root=markUpdateLaneFromFiberToRoot(fiber,lane);if(root===null){warnAboutUpdateOnUnmountedFiberInDEV(fiber);return null;}// Mark that the root has a pending update.
markRootUpdated(root,lane,eventTime);if(root===workInProgressRoot){// Received an update to a tree that's in the middle of rendering. Mark
// that there was an interleaved update work on this root. Unless the
// `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
// phase update. In that case, we don't treat render phase updates as if
// they were interleaved, for backwards compat reasons.
{workInProgressRootUpdatedLanes=mergeLanes(workInProgressRootUpdatedLanes,lane);}if(workInProgressRootExitStatus===RootSuspendedWithDelay){// The root already suspended with a delay, which means this render
// definitely won't finish. Since we have a new update, let's mark it as
// suspended now, right before marking the incoming update. This has the
// effect of interrupting the current render and switching to the update.
// TODO: Make sure this doesn't override pings that happen while we've
// already started rendering.
markRootSuspended$1(root,workInProgressRootRenderLanes);}}// TODO: requestUpdateLanePriority also reads the priority. Pass the
// priority as an argument to that function and this one.
var priorityLevel=getCurrentPriorityLevel();if(lane===SyncLane){if(// Check if we're inside unbatchedUpdates
(executionContext&LegacyUnbatchedContext)!==NoContext&&// Check if we're not already rendering
(executionContext&(RenderContext|CommitContext))===NoContext){// Register pending interactions on the root to avoid losing traced interaction data.
schedulePendingInteractions(root,lane);// This is a legacy edge case. The initial mount of a ReactDOM.render-ed
// root inside of batchedUpdates should be synchronous, but layout updates
// should be deferred until the end of the batch.
performSyncWorkOnRoot(root);}else{ensureRootIsScheduled(root,eventTime);schedulePendingInteractions(root,lane);if(executionContext===NoContext){// Flush the synchronous work now, unless we're already working or inside
// a batch. This is intentionally inside scheduleUpdateOnFiber instead of
// scheduleCallbackForFiber to preserve the ability to schedule a callback
// without immediately flushing it. We only do this for user-initiated
// updates, to preserve historical behavior of legacy mode.
resetRenderTimer();flushSyncCallbackQueue();}}}else{// Schedule a discrete update but only if it's not Sync.
if((executionContext&DiscreteEventContext)!==NoContext&&(// Only updates at user-blocking priority or greater are considered
// discrete, even inside a discrete event.
priorityLevel===UserBlockingPriority$1||priorityLevel===ImmediatePriority$1)){// This is the result of a discrete event. Track the lowest priority
// discrete update per root so we can flush them early, if needed.
if(rootsWithPendingDiscreteUpdates===null){rootsWithPendingDiscreteUpdates=new Set([root]);}else{rootsWithPendingDiscreteUpdates.add(root);}}// Schedule other updates after in case the callback is sync.
ensureRootIsScheduled(root,eventTime);schedulePendingInteractions(root,lane);}// We use this when assigning a lane for a transition inside
// `requestUpdateLane`. We assume it's the same as the root being updated,
// since in the common case of a single root app it probably is. If it's not
// the same root, then it's not a huge deal, we just might batch more stuff
// together more than necessary.
mostRecentlyUpdatedRoot=root;}// This is split into a separate function so we can mark a fiber with pending
// work without treating it as a typical update that originates from an event;
// e.g. retrying a Suspense boundary isn't an update, but it does schedule work
// on a fiber.
function markUpdateLaneFromFiberToRoot(sourceFiber,lane){// Update the source fiber's lanes
sourceFiber.lanes=mergeLanes(sourceFiber.lanes,lane);var alternate=sourceFiber.alternate;if(alternate!==null){alternate.lanes=mergeLanes(alternate.lanes,lane);}{if(alternate===null&&(sourceFiber.flags&(Placement|Hydrating))!==NoFlags){warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);}}// Walk the parent path to the root and update the child expiration time.
var node=sourceFiber;var parent=sourceFiber.return;while(parent!==null){parent.childLanes=mergeLanes(parent.childLanes,lane);alternate=parent.alternate;if(alternate!==null){alternate.childLanes=mergeLanes(alternate.childLanes,lane);}else{{if((parent.flags&(Placement|Hydrating))!==NoFlags){warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);}}}node=parent;parent=parent.return;}if(node.tag===HostRoot){var root=node.stateNode;return root;}else{return null;}}// Use this function to schedule a task for a root. There's only one task per
// root; if a task was already scheduled, we'll check to make sure the priority
// of the existing task is the same as the priority of the next level that the
// root has work on. This function is called on every update, and right before
// exiting a task.
function ensureRootIsScheduled(root,currentTime){var existingCallbackNode=root.callbackNode;// Check if any lanes are being starved by other work. If so, mark them as
// expired so we know to work on those next.
markStarvedLanesAsExpired(root,currentTime);// Determine the next lanes to work on, and their priority.
var nextLanes=getNextLanes(root,root===workInProgressRoot?workInProgressRootRenderLanes:NoLanes);// This returns the priority level computed during the `getNextLanes` call.
var newCallbackPriority=returnNextLanesPriority();if(nextLanes===NoLanes){// Special case: There's nothing to work on.
if(existingCallbackNode!==null){cancelCallback(existingCallbackNode);root.callbackNode=null;root.callbackPriority=NoLanePriority;}return;}// Check if there's an existing task. We may be able to reuse it.
if(existingCallbackNode!==null){var existingCallbackPriority=root.callbackPriority;if(existingCallbackPriority===newCallbackPriority){// The priority hasn't changed. We can reuse the existing task. Exit.
return;}// The priority changed. Cancel the existing callback. We'll schedule a new
// one below.
cancelCallback(existingCallbackNode);}// Schedule a new callback.
var newCallbackNode;if(newCallbackPriority===SyncLanePriority){// Special case: Sync React callbacks are scheduled on a special
// internal queue
newCallbackNode=scheduleSyncCallback(performSyncWorkOnRoot.bind(null,root));}else if(newCallbackPriority===SyncBatchedLanePriority){newCallbackNode=scheduleCallback(ImmediatePriority$1,performSyncWorkOnRoot.bind(null,root));}else{var schedulerPriorityLevel=lanePriorityToSchedulerPriority(newCallbackPriority);newCallbackNode=scheduleCallback(schedulerPriorityLevel,performConcurrentWorkOnRoot.bind(null,root));}root.callbackPriority=newCallbackPriority;root.callbackNode=newCallbackNode;}// This is the entry point for every concurrent task, i.e. anything that
// goes through Scheduler.
function performConcurrentWorkOnRoot(root){// Since we know we're in a React event, we can clear the current
// event time. The next update will compute a new event time.
currentEventTime=NoTimestamp;currentEventWipLanes=NoLanes;currentEventPendingLanes=NoLanes;if(!((executionContext&(RenderContext|CommitContext))===NoContext)){{throw Error("Should not already be working.");}}// Flush any pending passive effects before deciding which lanes to work on,
// in case they schedule additional work.
var originalCallbackNode=root.callbackNode;var didFlushPassiveEffects=flushPassiveEffects();if(didFlushPassiveEffects){// Something in the passive effect phase may have canceled the current task.
// Check if the task node for this root was changed.
if(root.callbackNode!==originalCallbackNode){// The current task was canceled. Exit. We don't need to call
// `ensureRootIsScheduled` because the check above implies either that
// there's a new task, or that there's no remaining work on this root.
return null;}}// Determine the next expiration time to work on, using the fields stored
// on the root.
var lanes=getNextLanes(root,root===workInProgressRoot?workInProgressRootRenderLanes:NoLanes);if(lanes===NoLanes){// Defensive coding. This is never expected to happen.
return null;}var exitStatus=renderRootConcurrent(root,lanes);if(includesSomeLane(workInProgressRootIncludedLanes,workInProgressRootUpdatedLanes)){// The render included lanes that were updated during the render phase.
// For example, when unhiding a hidden tree, we include all the lanes
// that were previously skipped when the tree was hidden. That set of
// lanes is a superset of the lanes we started rendering with.
//
// So we'll throw out the current work and restart.
prepareFreshStack(root,NoLanes);}else if(exitStatus!==RootIncomplete){if(exitStatus===RootErrored){executionContext|=RetryAfterError;// If an error occurred during hydration,
// discard server response and fall back to client side render.
if(root.hydrate){root.hydrate=false;clearContainer(root.containerInfo);}// If something threw an error, try rendering one more time. We'll render
// synchronously to block concurrent data mutations, and we'll includes
// all pending updates are included. If it still fails after the second
// attempt, we'll give up and commit the resulting tree.
lanes=getLanesToRetrySynchronouslyOnError(root);if(lanes!==NoLanes){exitStatus=renderRootSync(root,lanes);}}if(exitStatus===RootFatalErrored){var fatalError=workInProgressRootFatalError;prepareFreshStack(root,NoLanes);markRootSuspended$1(root,lanes);ensureRootIsScheduled(root,now$1());throw fatalError;}// We now have a consistent tree. The next step is either to commit it,
// or, if something suspended, wait to commit it after a timeout.
var finishedWork=root.current.alternate;root.finishedWork=finishedWork;root.finishedLanes=lanes;finishConcurrentRender(root,exitStatus,lanes);}ensureRootIsScheduled(root,now$1());if(root.callbackNode===originalCallbackNode){// The task node scheduled for this root is the same one that's
// currently executed. Need to return a continuation.
return performConcurrentWorkOnRoot.bind(null,root);}return null;}function finishConcurrentRender(root,exitStatus,lanes){switch(exitStatus){case RootIncomplete:case RootFatalErrored:{{{throw Error("Root did not complete. This is a bug in React.");}}}// Flow knows about invariant, so it complains if I add a break
// statement, but eslint doesn't know about invariant, so it complains
// if I do. eslint-disable-next-line no-fallthrough
case RootErrored:{// We should have already attempted to retry this tree. If we reached
// this point, it errored again. Commit it.
commitRoot(root);break;}case RootSuspended:{markRootSuspended$1(root,lanes);// We have an acceptable loading state. We need to figure out if we
// should immediately commit it or wait a bit.
if(includesOnlyRetries(lanes)&&// do not delay if we're inside an act() scope
!shouldForceFlushFallbacksInDEV()){// This render only included retries, no updates. Throttle committing
// retries so that we don't show too many loading states too quickly.
var msUntilTimeout=globalMostRecentFallbackTime+FALLBACK_THROTTLE_MS-now$1();// Don't bother with a very short suspense time.
if(msUntilTimeout>10){var nextLanes=getNextLanes(root,NoLanes);if(nextLanes!==NoLanes){// There's additional work on this root.
break;}var suspendedLanes=root.suspendedLanes;if(!isSubsetOfLanes(suspendedLanes,lanes)){// We should prefer to render the fallback of at the last
// suspended level. Ping the last suspended level to try
// rendering it again.
// FIXME: What if the suspended lanes are Idle? Should not restart.
var eventTime=requestEventTime();markRootPinged(root,suspendedLanes);break;}// The render is suspended, it hasn't timed out, and there's no
// lower priority work to do. Instead of committing the fallback
// immediately, wait for more data to arrive.
root.timeoutHandle=scheduleTimeout(commitRoot.bind(null,root),msUntilTimeout);break;}}// The work expired. Commit immediately.
commitRoot(root);break;}case RootSuspendedWithDelay:{markRootSuspended$1(root,lanes);if(includesOnlyTransitions(lanes)){// This is a transition, so we should exit without committing a
// placeholder and without scheduling a timeout. Delay indefinitely
// until we receive more data.
break;}if(!shouldForceFlushFallbacksInDEV()){// This is not a transition, but we did trigger an avoided state.
// Schedule a placeholder to display after a short delay, using the Just
// Noticeable Difference.
// TODO: Is the JND optimization worth the added complexity? If this is
// the only reason we track the event time, then probably not.
// Consider removing.
var mostRecentEventTime=getMostRecentEventTime(root,lanes);var eventTimeMs=mostRecentEventTime;var timeElapsedMs=now$1()-eventTimeMs;var _msUntilTimeout=jnd(timeElapsedMs)-timeElapsedMs;// Don't bother with a very short suspense time.
if(_msUntilTimeout>10){// Instead of committing the fallback immediately, wait for more data
// to arrive.
root.timeoutHandle=scheduleTimeout(commitRoot.bind(null,root),_msUntilTimeout);break;}}// Commit the placeholder.
commitRoot(root);break;}case RootCompleted:{// The work completed. Ready to commit.
commitRoot(root);break;}default:{{{throw Error("Unknown root exit status.");}}}}}function markRootSuspended$1(root,suspendedLanes){// When suspending, we should always exclude lanes that were pinged or (more
// rarely, since we try to avoid it) updated during the render phase.
// TODO: Lol maybe there's a better way to factor this besides this
// obnoxiously named function :)
suspendedLanes=removeLanes(suspendedLanes,workInProgressRootPingedLanes);suspendedLanes=removeLanes(suspendedLanes,workInProgressRootUpdatedLanes);markRootSuspended(root,suspendedLanes);}// This is the entry point for synchronous tasks that don't go
// through Scheduler
function performSyncWorkOnRoot(root){if(!((executionContext&(RenderContext|CommitContext))===NoContext)){{throw Error("Should not already be working.");}}flushPassiveEffects();var lanes;var exitStatus;if(root===workInProgressRoot&&includesSomeLane(root.expiredLanes,workInProgressRootRenderLanes)){// There's a partial tree, and at least one of its lanes has expired. Finish
// rendering it before rendering the rest of the expired work.
lanes=workInProgressRootRenderLanes;exitStatus=renderRootSync(root,lanes);if(includesSomeLane(workInProgressRootIncludedLanes,workInProgressRootUpdatedLanes)){// The render included lanes that were updated during the render phase.
// For example, when unhiding a hidden tree, we include all the lanes
// that were previously skipped when the tree was hidden. That set of
// lanes is a superset of the lanes we started rendering with.
//
// Note that this only happens when part of the tree is rendered
// concurrently. If the whole tree is rendered synchronously, then there
// are no interleaved events.
lanes=getNextLanes(root,lanes);exitStatus=renderRootSync(root,lanes);}}else{lanes=getNextLanes(root,NoLanes);exitStatus=renderRootSync(root,lanes);}if(root.tag!==LegacyRoot&&exitStatus===RootErrored){executionContext|=RetryAfterError;// If an error occurred during hydration,
// discard server response and fall back to client side render.
if(root.hydrate){root.hydrate=false;clearContainer(root.containerInfo);}// If something threw an error, try rendering one more time. We'll render
// synchronously to block concurrent data mutations, and we'll includes
// all pending updates are included. If it still fails after the second
// attempt, we'll give up and commit the resulting tree.
lanes=getLanesToRetrySynchronouslyOnError(root);if(lanes!==NoLanes){exitStatus=renderRootSync(root,lanes);}}if(exitStatus===RootFatalErrored){var fatalError=workInProgressRootFatalError;prepareFreshStack(root,NoLanes);markRootSuspended$1(root,lanes);ensureRootIsScheduled(root,now$1());throw fatalError;}// We now have a consistent tree. Because this is a sync render, we
// will commit it even if something suspended.
var finishedWork=root.current.alternate;root.finishedWork=finishedWork;root.finishedLanes=lanes;commitRoot(root);// Before exiting, make sure there's a callback scheduled for the next
// pending level.
ensureRootIsScheduled(root,now$1());return null;}function flushRoot(root,lanes){markRootExpired(root,lanes);ensureRootIsScheduled(root,now$1());if((executionContext&(RenderContext|CommitContext))===NoContext){resetRenderTimer();flushSyncCallbackQueue();}}function flushDiscreteUpdates(){// TODO: Should be able to flush inside batchedUpdates, but not inside `act`.
// However, `act` uses `batchedUpdates`, so there's no way to distinguish
// those two cases. Need to fix this before exposing flushDiscreteUpdates
// as a public API.
if((executionContext&(BatchedContext|RenderContext|CommitContext))!==NoContext){{if((executionContext&RenderContext)!==NoContext){error('unstable_flushDiscreteUpdates: Cannot flush updates when React is '+'already rendering.');}}// We're already rendering, so we can't synchronously flush pending work.
// This is probably a nested event dispatch triggered by a lifecycle/effect,
// like `el.focus()`. Exit.
return;}flushPendingDiscreteUpdates();// If the discrete updates scheduled passive effects, flush them now so that
// they fire before the next serial event.
flushPassiveEffects();}function deferredUpdates(fn){{return runWithPriority(NormalPriority$1,fn);}}function flushPendingDiscreteUpdates(){if(rootsWithPendingDiscreteUpdates!==null){// For each root with pending discrete updates, schedule a callback to
// immediately flush them.
var roots=rootsWithPendingDiscreteUpdates;rootsWithPendingDiscreteUpdates=null;roots.forEach(function(root){markDiscreteUpdatesExpired(root);ensureRootIsScheduled(root,now$1());});}// Now flush the immediate queue.
flushSyncCallbackQueue();}function batchedUpdates(fn,a){var prevExecutionContext=executionContext;executionContext|=BatchedContext;try{return fn(a);}finally{executionContext=prevExecutionContext;if(executionContext===NoContext){// Flush the immediate callbacks that were scheduled during this batch
resetRenderTimer();flushSyncCallbackQueue();}}}function batchedEventUpdates(fn,a){var prevExecutionContext=executionContext;executionContext|=EventContext;try{return fn(a);}finally{executionContext=prevExecutionContext;if(executionContext===NoContext){// Flush the immediate callbacks that were scheduled during this batch
resetRenderTimer();flushSyncCallbackQueue();}}}function discreteUpdates(fn,a,b,c,d){var prevExecutionContext=executionContext;executionContext|=DiscreteEventContext;{try{return runWithPriority(UserBlockingPriority$1,fn.bind(null,a,b,c,d));}finally{executionContext=prevExecutionContext;if(executionContext===NoContext){// Flush the immediate callbacks that were scheduled during this batch
resetRenderTimer();flushSyncCallbackQueue();}}}}function unbatchedUpdates(fn,a){var prevExecutionContext=executionContext;executionContext&=~BatchedContext;executionContext|=LegacyUnbatchedContext;try{return fn(a);}finally{executionContext=prevExecutionContext;if(executionContext===NoContext){// Flush the immediate callbacks that were scheduled during this batch
resetRenderTimer();flushSyncCallbackQueue();}}}function flushSync(fn,a){var prevExecutionContext=executionContext;if((prevExecutionContext&(RenderContext|CommitContext))!==NoContext){{error('flushSync was called from inside a lifecycle method. React cannot '+'flush when React is already rendering. Consider moving this call to '+'a scheduler task or micro task.');}return fn(a);}executionContext|=BatchedContext;{try{if(fn){return runWithPriority(ImmediatePriority$1,fn.bind(null,a));}else{return undefined;}}finally{executionContext=prevExecutionContext;// Flush the immediate callbacks that were scheduled during this batch.
// Note that this will happen even if batchedUpdates is higher up
// the stack.
flushSyncCallbackQueue();}}}function flushControlled(fn){var prevExecutionContext=executionContext;executionContext|=BatchedContext;{try{runWithPriority(ImmediatePriority$1,fn);}finally{executionContext=prevExecutionContext;if(executionContext===NoContext){// Flush the immediate callbacks that were scheduled during this batch
resetRenderTimer();flushSyncCallbackQueue();}}}}function pushRenderLanes(fiber,lanes){push(subtreeRenderLanesCursor,subtreeRenderLanes,fiber);subtreeRenderLanes=mergeLanes(subtreeRenderLanes,lanes);workInProgressRootIncludedLanes=mergeLanes(workInProgressRootIncludedLanes,lanes);}function popRenderLanes(fiber){subtreeRenderLanes=subtreeRenderLanesCursor.current;pop(subtreeRenderLanesCursor,fiber);}function prepareFreshStack(root,lanes){root.finishedWork=null;root.finishedLanes=NoLanes;var timeoutHandle=root.timeoutHandle;if(timeoutHandle!==noTimeout){// The root previous suspended and scheduled a timeout to commit a fallback
// state. Now that we have additional work, cancel the timeout.
root.timeoutHandle=noTimeout;// $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
cancelTimeout(timeoutHandle);}if(workInProgress!==null){var interruptedWork=workInProgress.return;while(interruptedWork!==null){unwindInterruptedWork(interruptedWork);interruptedWork=interruptedWork.return;}}workInProgressRoot=root;workInProgress=createWorkInProgress(root.current,null);workInProgressRootRenderLanes=subtreeRenderLanes=workInProgressRootIncludedLanes=lanes;workInProgressRootExitStatus=RootIncomplete;workInProgressRootFatalError=null;workInProgressRootSkippedLanes=NoLanes;workInProgressRootUpdatedLanes=NoLanes;workInProgressRootPingedLanes=NoLanes;{spawnedWorkDuringRender=null;}{ReactStrictModeWarnings.discardPendingWarnings();}}function handleError(root,thrownValue){do{var erroredWork=workInProgress;try{// Reset module-level state that was set during the render phase.
resetContextDependencies();resetHooksAfterThrow();resetCurrentFiber();// TODO: I found and added this missing line while investigating a
// separate issue. Write a regression test using string refs.
ReactCurrentOwner$2.current=null;if(erroredWork===null||erroredWork.return===null){// Expected to be working on a non-root fiber. This is a fatal error
// because there's no ancestor that can handle it; the root is
// supposed to capture all errors that weren't caught by an error
// boundary.
workInProgressRootExitStatus=RootFatalErrored;workInProgressRootFatalError=thrownValue;// Set `workInProgress` to null. This represents advancing to the next
// sibling, or the parent if there are no siblings. But since the root
// has no siblings nor a parent, we set it to null. Usually this is
// handled by `completeUnitOfWork` or `unwindWork`, but since we're
// intentionally not calling those, we need set it here.
// TODO: Consider calling `unwindWork` to pop the contexts.
workInProgress=null;return;}if(enableProfilerTimer&&erroredWork.mode&ProfileMode){// Record the time spent rendering before an error was thrown. This
// avoids inaccurate Profiler durations in the case of a
// suspended render.
stopProfilerTimerIfRunningAndRecordDelta(erroredWork,true);}throwException(root,erroredWork.return,erroredWork,thrownValue,workInProgressRootRenderLanes);completeUnitOfWork(erroredWork);}catch(yetAnotherThrownValue){// Something in the return path also threw.
thrownValue=yetAnotherThrownValue;if(workInProgress===erroredWork&&erroredWork!==null){// If this boundary has already errored, then we had trouble processing
// the error. Bubble it to the next boundary.
erroredWork=erroredWork.return;workInProgress=erroredWork;}else{erroredWork=workInProgress;}continue;}// Return to the normal work loop.
return;}while(true);}function pushDispatcher(){var prevDispatcher=ReactCurrentDispatcher$2.current;ReactCurrentDispatcher$2.current=ContextOnlyDispatcher;if(prevDispatcher===null){// The React isomorphic package does not include a default dispatcher.
// Instead the first renderer will lazily attach one, in order to give
// nicer error messages.
return ContextOnlyDispatcher;}else{return prevDispatcher;}}function popDispatcher(prevDispatcher){ReactCurrentDispatcher$2.current=prevDispatcher;}function pushInteractions(root){{var prevInteractions=tracing.__interactionsRef.current;tracing.__interactionsRef.current=root.memoizedInteractions;return prevInteractions;}}function popInteractions(prevInteractions){{tracing.__interactionsRef.current=prevInteractions;}}function markCommitTimeOfFallback(){globalMostRecentFallbackTime=now$1();}function markSkippedUpdateLanes(lane){workInProgressRootSkippedLanes=mergeLanes(lane,workInProgressRootSkippedLanes);}function renderDidSuspend(){if(workInProgressRootExitStatus===RootIncomplete){workInProgressRootExitStatus=RootSuspended;}}function renderDidSuspendDelayIfPossible(){if(workInProgressRootExitStatus===RootIncomplete||workInProgressRootExitStatus===RootSuspended){workInProgressRootExitStatus=RootSuspendedWithDelay;}// Check if there are updates that we skipped tree that might have unblocked
// this render.
if(workInProgressRoot!==null&&(includesNonIdleWork(workInProgressRootSkippedLanes)||includesNonIdleWork(workInProgressRootUpdatedLanes))){// Mark the current render as suspended so that we switch to working on
// the updates that were skipped. Usually we only suspend at the end of
// the render phase.
// TODO: We should probably always mark the root as suspended immediately
// (inside this function), since by suspending at the end of the render
// phase introduces a potential mistake where we suspend lanes that were
// pinged or updated while we were rendering.
markRootSuspended$1(workInProgressRoot,workInProgressRootRenderLanes);}}function renderDidError(){if(workInProgressRootExitStatus!==RootCompleted){workInProgressRootExitStatus=RootErrored;}}// Called during render to determine if anything has suspended.
// Returns false if we're not sure.
function renderHasNotSuspendedYet(){// If something errored or completed, we can't really be sure,
// so those are false.
return workInProgressRootExitStatus===RootIncomplete;}function renderRootSync(root,lanes){var prevExecutionContext=executionContext;executionContext|=RenderContext;var prevDispatcher=pushDispatcher();// If the root or lanes have changed, throw out the existing stack
// and prepare a fresh one. Otherwise we'll continue where we left off.
if(workInProgressRoot!==root||workInProgressRootRenderLanes!==lanes){prepareFreshStack(root,lanes);startWorkOnPendingInteractions(root,lanes);}var prevInteractions=pushInteractions(root);do{try{workLoopSync();break;}catch(thrownValue){handleError(root,thrownValue);}}while(true);resetContextDependencies();{popInteractions(prevInteractions);}executionContext=prevExecutionContext;popDispatcher(prevDispatcher);if(workInProgress!==null){// This is a sync render, so we should have finished the whole tree.
{{throw Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");}}}workInProgressRoot=null;workInProgressRootRenderLanes=NoLanes;return workInProgressRootExitStatus;}// The work loop is an extremely hot path. Tell Closure not to inline it.
/** @noinline */function workLoopSync(){// Already timed out, so perform work without checking if we need to yield.
while(workInProgress!==null){performUnitOfWork(workInProgress);}}function renderRootConcurrent(root,lanes){var prevExecutionContext=executionContext;executionContext|=RenderContext;var prevDispatcher=pushDispatcher();// If the root or lanes have changed, throw out the existing stack
// and prepare a fresh one. Otherwise we'll continue where we left off.
if(workInProgressRoot!==root||workInProgressRootRenderLanes!==lanes){resetRenderTimer();prepareFreshStack(root,lanes);startWorkOnPendingInteractions(root,lanes);}var prevInteractions=pushInteractions(root);do{try{workLoopConcurrent();break;}catch(thrownValue){handleError(root,thrownValue);}}while(true);resetContextDependencies();{popInteractions(prevInteractions);}popDispatcher(prevDispatcher);executionContext=prevExecutionContext;if(workInProgress!==null){return RootIncomplete;}else{workInProgressRoot=null;workInProgressRootRenderLanes=NoLanes;// Return the final exit status.
return workInProgressRootExitStatus;}}/** @noinline */function workLoopConcurrent(){// Perform work until Scheduler asks us to yield
while(workInProgress!==null&&!shouldYield()){performUnitOfWork(workInProgress);}}function performUnitOfWork(unitOfWork){// The current, flushed, state of this fiber is the alternate. Ideally
// nothing should rely on this, but relying on it here means that we don't
// need an additional field on the work in progress.
var current=unitOfWork.alternate;setCurrentFiber(unitOfWork);var next;if((unitOfWork.mode&ProfileMode)!==NoMode){startProfilerTimer(unitOfWork);next=beginWork$1(current,unitOfWork,subtreeRenderLanes);stopProfilerTimerIfRunningAndRecordDelta(unitOfWork,true);}else{next=beginWork$1(current,unitOfWork,subtreeRenderLanes);}resetCurrentFiber();unitOfWork.memoizedProps=unitOfWork.pendingProps;if(next===null){// If this doesn't spawn new work, complete the current work.
completeUnitOfWork(unitOfWork);}else{workInProgress=next;}ReactCurrentOwner$2.current=null;}function completeUnitOfWork(unitOfWork){// Attempt to complete the current unit of work, then move to the next
// sibling. If there are no more siblings, return to the parent fiber.
var completedWork=unitOfWork;do{// The current, flushed, state of this fiber is the alternate. Ideally
// nothing should rely on this, but relying on it here means that we don't
// need an additional field on the work in progress.
var current=completedWork.alternate;var returnFiber=completedWork.return;// Check if the work completed or if something threw.
if((completedWork.flags&Incomplete)===NoFlags){setCurrentFiber(completedWork);var next=void 0;if((completedWork.mode&ProfileMode)===NoMode){next=completeWork(current,completedWork,subtreeRenderLanes);}else{startProfilerTimer(completedWork);next=completeWork(current,completedWork,subtreeRenderLanes);// Update render duration assuming we didn't error.
stopProfilerTimerIfRunningAndRecordDelta(completedWork,false);}resetCurrentFiber();if(next!==null){// Completing this fiber spawned new work. Work on that next.
workInProgress=next;return;}resetChildLanes(completedWork);if(returnFiber!==null&&// Do not append effects to parents if a sibling failed to complete
(returnFiber.flags&Incomplete)===NoFlags){// Append all the effects of the subtree and this fiber onto the effect
// list of the parent. The completion order of the children affects the
// side-effect order.
if(returnFiber.firstEffect===null){returnFiber.firstEffect=completedWork.firstEffect;}if(completedWork.lastEffect!==null){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=completedWork.firstEffect;}returnFiber.lastEffect=completedWork.lastEffect;}// If this fiber had side-effects, we append it AFTER the children's
// side-effects. We can perform certain side-effects earlier if needed,
// by doing multiple passes over the effect list. We don't want to
// schedule our own side-effect on our own list because if end up
// reusing children we'll schedule this effect onto itself since we're
// at the end.
var flags=completedWork.flags;// Skip both NoWork and PerformedWork tags when creating the effect
// list. PerformedWork effect is read by React DevTools but shouldn't be
// committed.
if(flags>PerformedWork){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=completedWork;}else{returnFiber.firstEffect=completedWork;}returnFiber.lastEffect=completedWork;}}}else{// This fiber did not complete because something threw. Pop values off
// the stack without entering the complete phase. If this is a boundary,
// capture values if possible.
var _next=unwindWork(completedWork);// Because this fiber did not complete, don't reset its expiration time.
if(_next!==null){// If completing this work spawned new work, do that next. We'll come
// back here again.
// Since we're restarting, remove anything that is not a host effect
// from the effect tag.
_next.flags&=HostEffectMask;workInProgress=_next;return;}if((completedWork.mode&ProfileMode)!==NoMode){// Record the render duration for the fiber that errored.
stopProfilerTimerIfRunningAndRecordDelta(completedWork,false);// Include the time spent working on failed children before continuing.
var actualDuration=completedWork.actualDuration;var child=completedWork.child;while(child!==null){actualDuration+=child.actualDuration;child=child.sibling;}completedWork.actualDuration=actualDuration;}if(returnFiber!==null){// Mark the parent fiber as incomplete and clear its effect list.
returnFiber.firstEffect=returnFiber.lastEffect=null;returnFiber.flags|=Incomplete;}}var siblingFiber=completedWork.sibling;if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
workInProgress=siblingFiber;return;}// Otherwise, return to the parent
completedWork=returnFiber;// Update the next thing we're working on in case something throws.
workInProgress=completedWork;}while(completedWork!==null);// We've reached the root.
if(workInProgressRootExitStatus===RootIncomplete){workInProgressRootExitStatus=RootCompleted;}}function resetChildLanes(completedWork){if(// TODO: Move this check out of the hot path by moving `resetChildLanes`
// to switch statement in `completeWork`.
(completedWork.tag===LegacyHiddenComponent||completedWork.tag===OffscreenComponent)&&completedWork.memoizedState!==null&&!includesSomeLane(subtreeRenderLanes,OffscreenLane)&&(completedWork.mode&ConcurrentMode)!==NoLanes){// The children of this component are hidden. Don't bubble their
// expiration times.
return;}var newChildLanes=NoLanes;// Bubble up the earliest expiration time.
if((completedWork.mode&ProfileMode)!==NoMode){// In profiling mode, resetChildExpirationTime is also used to reset
// profiler durations.
var actualDuration=completedWork.actualDuration;var treeBaseDuration=completedWork.selfBaseDuration;// When a fiber is cloned, its actualDuration is reset to 0. This value will
// only be updated if work is done on the fiber (i.e. it doesn't bailout).
// When work is done, it should bubble to the parent's actualDuration. If
// the fiber has not been cloned though, (meaning no work was done), then
// this value will reflect the amount of time spent working on a previous
// render. In that case it should not bubble. We determine whether it was
// cloned by comparing the child pointer.
var shouldBubbleActualDurations=completedWork.alternate===null||completedWork.child!==completedWork.alternate.child;var child=completedWork.child;while(child!==null){newChildLanes=mergeLanes(newChildLanes,mergeLanes(child.lanes,child.childLanes));if(shouldBubbleActualDurations){actualDuration+=child.actualDuration;}treeBaseDuration+=child.treeBaseDuration;child=child.sibling;}var isTimedOutSuspense=completedWork.tag===SuspenseComponent&&completedWork.memoizedState!==null;if(isTimedOutSuspense){// Don't count time spent in a timed out Suspense subtree as part of the base duration.
var primaryChildFragment=completedWork.child;if(primaryChildFragment!==null){treeBaseDuration-=primaryChildFragment.treeBaseDuration;}}completedWork.actualDuration=actualDuration;completedWork.treeBaseDuration=treeBaseDuration;}else{var _child=completedWork.child;while(_child!==null){newChildLanes=mergeLanes(newChildLanes,mergeLanes(_child.lanes,_child.childLanes));_child=_child.sibling;}}completedWork.childLanes=newChildLanes;}function commitRoot(root){var renderPriorityLevel=getCurrentPriorityLevel();runWithPriority(ImmediatePriority$1,commitRootImpl.bind(null,root,renderPriorityLevel));return null;}function commitRootImpl(root,renderPriorityLevel){do{// `flushPassiveEffects` will call `flushSyncUpdateQueue` at the end, which
// means `flushPassiveEffects` will sometimes result in additional
// passive effects. So we need to keep flushing in a loop until there are
// no more pending effects.
// TODO: Might be better if `flushPassiveEffects` did not automatically
// flush synchronous work at the end, to avoid factoring hazards like this.
flushPassiveEffects();}while(rootWithPendingPassiveEffects!==null);flushRenderPhaseStrictModeWarningsInDEV();if(!((executionContext&(RenderContext|CommitContext))===NoContext)){{throw Error("Should not already be working.");}}var finishedWork=root.finishedWork;var lanes=root.finishedLanes;if(finishedWork===null){return null;}root.finishedWork=null;root.finishedLanes=NoLanes;if(!(finishedWork!==root.current)){{throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");}}// commitRoot never returns a continuation; it always finishes synchronously.
// So we can clear these now to allow a new callback to be scheduled.
root.callbackNode=null;// Update the first and last pending times on this root. The new first
// pending time is whatever is left on the root fiber.
var remainingLanes=mergeLanes(finishedWork.lanes,finishedWork.childLanes);markRootFinished(root,remainingLanes);// Clear already finished discrete updates in case that a later call of
// `flushDiscreteUpdates` starts a useless render pass which may cancels
// a scheduled timeout.
if(rootsWithPendingDiscreteUpdates!==null){if(!hasDiscreteLanes(remainingLanes)&&rootsWithPendingDiscreteUpdates.has(root)){rootsWithPendingDiscreteUpdates.delete(root);}}if(root===workInProgressRoot){// We can reset these now that they are finished.
workInProgressRoot=null;workInProgress=null;workInProgressRootRenderLanes=NoLanes;}// Get the list of effects.
var firstEffect;if(finishedWork.flags>PerformedWork){// A fiber's effect list consists only of its children, not itself. So if
// the root has an effect, we need to add it to the end of the list. The
// resulting list is the set that would belong to the root's parent, if it
// had one; that is, all the effects in the tree including the root.
if(finishedWork.lastEffect!==null){finishedWork.lastEffect.nextEffect=finishedWork;firstEffect=finishedWork.firstEffect;}else{firstEffect=finishedWork;}}else{// There is no effect on the root.
firstEffect=finishedWork.firstEffect;}if(firstEffect!==null){var prevExecutionContext=executionContext;executionContext|=CommitContext;var prevInteractions=pushInteractions(root);// Reset this to null before calling lifecycles
ReactCurrentOwner$2.current=null;// The commit phase is broken into several sub-phases. We do a separate pass
// of the effect list for each phase: all mutation effects come before all
// layout effects, and so on.
// The first phase a "before mutation" phase. We use this phase to read the
// state of the host tree right before we mutate it. This is where
// getSnapshotBeforeUpdate is called.
focusedInstanceHandle=prepareForCommit(root.containerInfo);shouldFireAfterActiveInstanceBlur=false;nextEffect=firstEffect;do{{invokeGuardedCallback(null,commitBeforeMutationEffects,null);if(hasCaughtError()){if(!(nextEffect!==null)){{throw Error("Should be working on an effect.");}}var error=clearCaughtError();captureCommitPhaseError(nextEffect,error);nextEffect=nextEffect.nextEffect;}}}while(nextEffect!==null);// We no longer need to track the active instance fiber
focusedInstanceHandle=null;{// Mark the current commit time to be shared by all Profilers in this
// batch. This enables them to be grouped later.
recordCommitTime();}// The next phase is the mutation phase, where we mutate the host tree.
nextEffect=firstEffect;do{{invokeGuardedCallback(null,commitMutationEffects,null,root,renderPriorityLevel);if(hasCaughtError()){if(!(nextEffect!==null)){{throw Error("Should be working on an effect.");}}var _error=clearCaughtError();captureCommitPhaseError(nextEffect,_error);nextEffect=nextEffect.nextEffect;}}}while(nextEffect!==null);if(shouldFireAfterActiveInstanceBlur){afterActiveInstanceBlur();}resetAfterCommit(root.containerInfo);// The work-in-progress tree is now the current tree. This must come after
// the mutation phase, so that the previous tree is still current during
// componentWillUnmount, but before the layout phase, so that the finished
// work is current during componentDidMount/Update.
root.current=finishedWork;// The next phase is the layout phase, where we call effects that read
// the host tree after it's been mutated. The idiomatic use case for this is
// layout, but class component lifecycles also fire here for legacy reasons.
nextEffect=firstEffect;do{{invokeGuardedCallback(null,commitLayoutEffects,null,root,lanes);if(hasCaughtError()){if(!(nextEffect!==null)){{throw Error("Should be working on an effect.");}}var _error2=clearCaughtError();captureCommitPhaseError(nextEffect,_error2);nextEffect=nextEffect.nextEffect;}}}while(nextEffect!==null);nextEffect=null;// Tell Scheduler to yield at the end of the frame, so the browser has an
// opportunity to paint.
requestPaint();{popInteractions(prevInteractions);}executionContext=prevExecutionContext;}else{// No effects.
root.current=finishedWork;// Measure these anyway so the flamegraph explicitly shows that there were
// no effects.
// TODO: Maybe there's a better way to report this.
{recordCommitTime();}}var rootDidHavePassiveEffects=rootDoesHavePassiveEffects;if(rootDoesHavePassiveEffects){// This commit has passive effects. Stash a reference to them. But don't
// schedule a callback until after flushing layout work.
rootDoesHavePassiveEffects=false;rootWithPendingPassiveEffects=root;pendingPassiveEffectsLanes=lanes;pendingPassiveEffectsRenderPriority=renderPriorityLevel;}else{// We are done with the effect chain at this point so let's clear the
// nextEffect pointers to assist with GC. If we have passive effects, we'll
// clear this in flushPassiveEffects.
nextEffect=firstEffect;while(nextEffect!==null){var nextNextEffect=nextEffect.nextEffect;nextEffect.nextEffect=null;if(nextEffect.flags&Deletion){detachFiberAfterEffects(nextEffect);}nextEffect=nextNextEffect;}}// Read this again, since an effect might have updated it
remainingLanes=root.pendingLanes;// Check if there's remaining work on this root
if(remainingLanes!==NoLanes){{if(spawnedWorkDuringRender!==null){var expirationTimes=spawnedWorkDuringRender;spawnedWorkDuringRender=null;for(var i=0;i<expirationTimes.length;i++){scheduleInteractions(root,expirationTimes[i],root.memoizedInteractions);}}schedulePendingInteractions(root,remainingLanes);}}else{// If there's no remaining work, we can clear the set of already failed
// error boundaries.
legacyErrorBoundariesThatAlreadyFailed=null;}{if(!rootDidHavePassiveEffects){// If there are no passive effects, then we can complete the pending interactions.
// Otherwise, we'll wait until after the passive effects are flushed.
// Wait to do this until after remaining work has been scheduled,
// so that we don't prematurely signal complete for interactions when there's e.g. hidden work.
finishPendingInteractions(root,lanes);}}if(remainingLanes===SyncLane){// Count the number of times the root synchronously re-renders without
// finishing. If there are too many, it indicates an infinite update loop.
if(root===rootWithNestedUpdates){nestedUpdateCount++;}else{nestedUpdateCount=0;rootWithNestedUpdates=root;}}else{nestedUpdateCount=0;}onCommitRoot(finishedWork.stateNode,renderPriorityLevel);{onCommitRoot$1();}// Always call this before exiting `commitRoot`, to ensure that any
// additional work on this root is scheduled.
ensureRootIsScheduled(root,now$1());if(hasUncaughtError){hasUncaughtError=false;var _error3=firstUncaughtError;firstUncaughtError=null;throw _error3;}if((executionContext&LegacyUnbatchedContext)!==NoContext){// a ReactDOM.render-ed root inside of batchedUpdates. The commit fired
// synchronously, but layout updates should be deferred until the end
// of the batch.
return null;}// If layout work was scheduled, flush it now.
flushSyncCallbackQueue();return null;}function commitBeforeMutationEffects(){while(nextEffect!==null){var current=nextEffect.alternate;if(!shouldFireAfterActiveInstanceBlur&&focusedInstanceHandle!==null){if((nextEffect.flags&Deletion)!==NoFlags){if(doesFiberContain(nextEffect,focusedInstanceHandle)){shouldFireAfterActiveInstanceBlur=true;beforeActiveInstanceBlur();}}else{// TODO: Move this out of the hot path using a dedicated effect tag.
if(nextEffect.tag===SuspenseComponent&&isSuspenseBoundaryBeingHidden(current,nextEffect)&&doesFiberContain(nextEffect,focusedInstanceHandle)){shouldFireAfterActiveInstanceBlur=true;beforeActiveInstanceBlur();}}}var flags=nextEffect.flags;if((flags&Snapshot)!==NoFlags){setCurrentFiber(nextEffect);commitBeforeMutationLifeCycles(current,nextEffect);resetCurrentFiber();}if((flags&Passive)!==NoFlags){// If there are passive effects, schedule a callback to flush at
// the earliest opportunity.
if(!rootDoesHavePassiveEffects){rootDoesHavePassiveEffects=true;scheduleCallback(NormalPriority$1,function(){flushPassiveEffects();return null;});}}nextEffect=nextEffect.nextEffect;}}function commitMutationEffects(root,renderPriorityLevel){// TODO: Should probably move the bulk of this function to commitWork.
while(nextEffect!==null){setCurrentFiber(nextEffect);var flags=nextEffect.flags;if(flags&ContentReset){commitResetTextContent(nextEffect);}if(flags&Ref){var current=nextEffect.alternate;if(current!==null){commitDetachRef(current);}}// The following switch statement is only concerned about placement,
// updates, and deletions. To avoid needing to add a case for every possible
// bitmap value, we remove the secondary effects from the effect tag and
// switch on that value.
var primaryFlags=flags&(Placement|Update|Deletion|Hydrating);switch(primaryFlags){case Placement:{commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is
// inserted, before any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted does
// and isMounted is deprecated anyway so we should be able to kill this.
nextEffect.flags&=~Placement;break;}case PlacementAndUpdate:{// Placement
commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is
// inserted, before any life-cycles like componentDidMount gets called.
nextEffect.flags&=~Placement;// Update
var _current=nextEffect.alternate;commitWork(_current,nextEffect);break;}case Hydrating:{nextEffect.flags&=~Hydrating;break;}case HydratingAndUpdate:{nextEffect.flags&=~Hydrating;// Update
var _current2=nextEffect.alternate;commitWork(_current2,nextEffect);break;}case Update:{var _current3=nextEffect.alternate;commitWork(_current3,nextEffect);break;}case Deletion:{commitDeletion(root,nextEffect);break;}}resetCurrentFiber();nextEffect=nextEffect.nextEffect;}}function commitLayoutEffects(root,committedLanes){while(nextEffect!==null){setCurrentFiber(nextEffect);var flags=nextEffect.flags;if(flags&(Update|Callback)){var current=nextEffect.alternate;commitLifeCycles(root,current,nextEffect);}{if(flags&Ref){commitAttachRef(nextEffect);}}resetCurrentFiber();nextEffect=nextEffect.nextEffect;}}function flushPassiveEffects(){// Returns whether passive effects were flushed.
if(pendingPassiveEffectsRenderPriority!==NoPriority$1){var priorityLevel=pendingPassiveEffectsRenderPriority>NormalPriority$1?NormalPriority$1:pendingPassiveEffectsRenderPriority;pendingPassiveEffectsRenderPriority=NoPriority$1;{return runWithPriority(priorityLevel,flushPassiveEffectsImpl);}}return false;}function enqueuePendingPassiveHookEffectMount(fiber,effect){pendingPassiveHookEffectsMount.push(effect,fiber);if(!rootDoesHavePassiveEffects){rootDoesHavePassiveEffects=true;scheduleCallback(NormalPriority$1,function(){flushPassiveEffects();return null;});}}function enqueuePendingPassiveHookEffectUnmount(fiber,effect){pendingPassiveHookEffectsUnmount.push(effect,fiber);{fiber.flags|=PassiveUnmountPendingDev;var alternate=fiber.alternate;if(alternate!==null){alternate.flags|=PassiveUnmountPendingDev;}}if(!rootDoesHavePassiveEffects){rootDoesHavePassiveEffects=true;scheduleCallback(NormalPriority$1,function(){flushPassiveEffects();return null;});}}function invokePassiveEffectCreate(effect){var create=effect.create;effect.destroy=create();}function flushPassiveEffectsImpl(){if(rootWithPendingPassiveEffects===null){return false;}var root=rootWithPendingPassiveEffects;var lanes=pendingPassiveEffectsLanes;rootWithPendingPassiveEffects=null;pendingPassiveEffectsLanes=NoLanes;if(!((executionContext&(RenderContext|CommitContext))===NoContext)){{throw Error("Cannot flush passive effects while already rendering.");}}{isFlushingPassiveEffects=true;}var prevExecutionContext=executionContext;executionContext|=CommitContext;var prevInteractions=pushInteractions(root);// It's important that ALL pending passive effect destroy functions are called
// before ANY passive effect create functions are called.
// Otherwise effects in sibling components might interfere with each other.
// e.g. a destroy function in one component may unintentionally override a ref
// value set by a create function in another component.
// Layout effects have the same constraint.
// First pass: Destroy stale passive effects.
var unmountEffects=pendingPassiveHookEffectsUnmount;pendingPassiveHookEffectsUnmount=[];for(var i=0;i<unmountEffects.length;i+=2){var _effect=unmountEffects[i];var fiber=unmountEffects[i+1];var destroy=_effect.destroy;_effect.destroy=undefined;{fiber.flags&=~PassiveUnmountPendingDev;var alternate=fiber.alternate;if(alternate!==null){alternate.flags&=~PassiveUnmountPendingDev;}}if(typeof destroy==='function'){{setCurrentFiber(fiber);{invokeGuardedCallback(null,destroy,null);}if(hasCaughtError()){if(!(fiber!==null)){{throw Error("Should be working on an effect.");}}var error=clearCaughtError();captureCommitPhaseError(fiber,error);}resetCurrentFiber();}}}// Second pass: Create new passive effects.
var mountEffects=pendingPassiveHookEffectsMount;pendingPassiveHookEffectsMount=[];for(var _i=0;_i<mountEffects.length;_i+=2){var _effect2=mountEffects[_i];var _fiber=mountEffects[_i+1];{setCurrentFiber(_fiber);{invokeGuardedCallback(null,invokePassiveEffectCreate,null,_effect2);}if(hasCaughtError()){if(!(_fiber!==null)){{throw Error("Should be working on an effect.");}}var _error4=clearCaughtError();captureCommitPhaseError(_fiber,_error4);}resetCurrentFiber();}}// Note: This currently assumes there are no passive effects on the root fiber
// because the root is not part of its own effect list.
// This could change in the future.
var effect=root.current.firstEffect;while(effect!==null){var nextNextEffect=effect.nextEffect;// Remove nextEffect pointer to assist GC
effect.nextEffect=null;if(effect.flags&Deletion){detachFiberAfterEffects(effect);}effect=nextNextEffect;}{popInteractions(prevInteractions);finishPendingInteractions(root,lanes);}{isFlushingPassiveEffects=false;}executionContext=prevExecutionContext;flushSyncCallbackQueue();// If additional passive effects were scheduled, increment a counter. If this
// exceeds the limit, we'll fire a warning.
nestedPassiveUpdateCount=rootWithPendingPassiveEffects===null?0:nestedPassiveUpdateCount+1;return true;}function isAlreadyFailedLegacyErrorBoundary(instance){return legacyErrorBoundariesThatAlreadyFailed!==null&&legacyErrorBoundariesThatAlreadyFailed.has(instance);}function markLegacyErrorBoundaryAsFailed(instance){if(legacyErrorBoundariesThatAlreadyFailed===null){legacyErrorBoundariesThatAlreadyFailed=new Set([instance]);}else{legacyErrorBoundariesThatAlreadyFailed.add(instance);}}function prepareToThrowUncaughtError(error){if(!hasUncaughtError){hasUncaughtError=true;firstUncaughtError=error;}}var onUncaughtError=prepareToThrowUncaughtError;function captureCommitPhaseErrorOnRoot(rootFiber,sourceFiber,error){var errorInfo=createCapturedValue(error,sourceFiber);var update=createRootErrorUpdate(rootFiber,errorInfo,SyncLane);enqueueUpdate(rootFiber,update);var eventTime=requestEventTime();var root=markUpdateLaneFromFiberToRoot(rootFiber,SyncLane);if(root!==null){markRootUpdated(root,SyncLane,eventTime);ensureRootIsScheduled(root,eventTime);schedulePendingInteractions(root,SyncLane);}}function captureCommitPhaseError(sourceFiber,error){if(sourceFiber.tag===HostRoot){// Error was thrown at the root. There is no parent, so the root
// itself should capture it.
captureCommitPhaseErrorOnRoot(sourceFiber,sourceFiber,error);return;}var fiber=sourceFiber.return;while(fiber!==null){if(fiber.tag===HostRoot){captureCommitPhaseErrorOnRoot(fiber,sourceFiber,error);return;}else if(fiber.tag===ClassComponent){var ctor=fiber.type;var instance=fiber.stateNode;if(typeof ctor.getDerivedStateFromError==='function'||typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance)){var errorInfo=createCapturedValue(error,sourceFiber);var update=createClassErrorUpdate(fiber,errorInfo,SyncLane);enqueueUpdate(fiber,update);var eventTime=requestEventTime();var root=markUpdateLaneFromFiberToRoot(fiber,SyncLane);if(root!==null){markRootUpdated(root,SyncLane,eventTime);ensureRootIsScheduled(root,eventTime);schedulePendingInteractions(root,SyncLane);}else{// This component has already been unmounted.
// We can't schedule any follow up work for the root because the fiber is already unmounted,
// but we can still call the log-only boundary so the error isn't swallowed.
//
// TODO This is only a temporary bandaid for the old reconciler fork.
// We can delete this special case once the new fork is merged.
if(typeof instance.componentDidCatch==='function'&&!isAlreadyFailedLegacyErrorBoundary(instance)){try{instance.componentDidCatch(error,errorInfo);}catch(errorToIgnore){// TODO Ignore this error? Rethrow it?
// This is kind of an edge case.
}}}return;}}fiber=fiber.return;}}function pingSuspendedRoot(root,wakeable,pingedLanes){var pingCache=root.pingCache;if(pingCache!==null){// The wakeable resolved, so we no longer need to memoize, because it will
// never be thrown again.
pingCache.delete(wakeable);}var eventTime=requestEventTime();markRootPinged(root,pingedLanes);if(workInProgressRoot===root&&isSubsetOfLanes(workInProgressRootRenderLanes,pingedLanes)){// Received a ping at the same priority level at which we're currently
// rendering. We might want to restart this render. This should mirror
// the logic of whether or not a root suspends once it completes.
// TODO: If we're rendering sync either due to Sync, Batched or expired,
// we should probably never restart.
// If we're suspended with delay, or if it's a retry, we'll always suspend
// so we can always restart.
if(workInProgressRootExitStatus===RootSuspendedWithDelay||workInProgressRootExitStatus===RootSuspended&&includesOnlyRetries(workInProgressRootRenderLanes)&&now$1()-globalMostRecentFallbackTime<FALLBACK_THROTTLE_MS){// Restart from the root.
prepareFreshStack(root,NoLanes);}else{// Even though we can't restart right now, we might get an
// opportunity later. So we mark this render as having a ping.
workInProgressRootPingedLanes=mergeLanes(workInProgressRootPingedLanes,pingedLanes);}}ensureRootIsScheduled(root,eventTime);schedulePendingInteractions(root,pingedLanes);}function retryTimedOutBoundary(boundaryFiber,retryLane){// The boundary fiber (a Suspense component or SuspenseList component)
// previously was rendered in its fallback state. One of the promises that
// suspended it has resolved, which means at least part of the tree was
// likely unblocked. Try rendering again, at a new expiration time.
if(retryLane===NoLane){retryLane=requestRetryLane(boundaryFiber);}// TODO: Special case idle priority?
var eventTime=requestEventTime();var root=markUpdateLaneFromFiberToRoot(boundaryFiber,retryLane);if(root!==null){markRootUpdated(root,retryLane,eventTime);ensureRootIsScheduled(root,eventTime);schedulePendingInteractions(root,retryLane);}}function resolveRetryWakeable(boundaryFiber,wakeable){var retryLane=NoLane;// Default
var retryCache;{retryCache=boundaryFiber.stateNode;}if(retryCache!==null){// The wakeable resolved, so we no longer need to memoize, because it will
// never be thrown again.
retryCache.delete(wakeable);}retryTimedOutBoundary(boundaryFiber,retryLane);}// Computes the next Just Noticeable Difference (JND) boundary.
// The theory is that a person can't tell the difference between small differences in time.
// Therefore, if we wait a bit longer than necessary that won't translate to a noticeable
// difference in the experience. However, waiting for longer might mean that we can avoid
// showing an intermediate loading state. The longer we have already waited, the harder it
// is to tell small differences in time. Therefore, the longer we've already waited,
// the longer we can wait additionally. At some point we have to give up though.
// We pick a train model where the next boundary commits at a consistent schedule.
// These particular numbers are vague estimates. We expect to adjust them based on research.
function jnd(timeElapsed){return timeElapsed<120?120:timeElapsed<480?480:timeElapsed<1080?1080:timeElapsed<1920?1920:timeElapsed<3000?3000:timeElapsed<4320?4320:ceil(timeElapsed/1960)*1960;}function checkForNestedUpdates(){if(nestedUpdateCount>NESTED_UPDATE_LIMIT){nestedUpdateCount=0;rootWithNestedUpdates=null;{{throw Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");}}}{if(nestedPassiveUpdateCount>NESTED_PASSIVE_UPDATE_LIMIT){nestedPassiveUpdateCount=0;error('Maximum update depth exceeded. This can happen when a component '+"calls setState inside useEffect, but useEffect either doesn't "+'have a dependency array, or one of the dependencies changes on '+'every render.');}}}function flushRenderPhaseStrictModeWarningsInDEV(){{ReactStrictModeWarnings.flushLegacyContextWarning();{ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();}}}var didWarnStateUpdateForNotYetMountedComponent=null;function warnAboutUpdateOnNotYetMountedFiberInDEV(fiber){{if((executionContext&RenderContext)!==NoContext){// We let the other warning about render phase updates deal with this one.
return;}if(!(fiber.mode&(BlockingMode|ConcurrentMode))){return;}var tag=fiber.tag;if(tag!==IndeterminateComponent&&tag!==HostRoot&&tag!==ClassComponent&&tag!==FunctionComponent&&tag!==ForwardRef&&tag!==MemoComponent&&tag!==SimpleMemoComponent&&tag!==Block){// Only warn for user-defined components, not internal ones like Suspense.
return;}// We show the whole stack but dedupe on the top component's name because
// the problematic code almost always lies inside that component.
var componentName=getComponentName(fiber.type)||'ReactComponent';if(didWarnStateUpdateForNotYetMountedComponent!==null){if(didWarnStateUpdateForNotYetMountedComponent.has(componentName)){return;}didWarnStateUpdateForNotYetMountedComponent.add(componentName);}else{didWarnStateUpdateForNotYetMountedComponent=new Set([componentName]);}var previousFiber=current;try{setCurrentFiber(fiber);error("Can't perform a React state update on a component that hasn't mounted yet. "+'This indicates that you have a side-effect in your render function that '+'asynchronously later calls tries to update the component. Move this work to '+'useEffect instead.');}finally{if(previousFiber){setCurrentFiber(fiber);}else{resetCurrentFiber();}}}}var didWarnStateUpdateForUnmountedComponent=null;function warnAboutUpdateOnUnmountedFiberInDEV(fiber){{var tag=fiber.tag;if(tag!==HostRoot&&tag!==ClassComponent&&tag!==FunctionComponent&&tag!==ForwardRef&&tag!==MemoComponent&&tag!==SimpleMemoComponent&&tag!==Block){// Only warn for user-defined components, not internal ones like Suspense.
return;}// If there are pending passive effects unmounts for this Fiber,
// we can assume that they would have prevented this update.
if((fiber.flags&PassiveUnmountPendingDev)!==NoFlags){return;}// We show the whole stack but dedupe on the top component's name because
// the problematic code almost always lies inside that component.
var componentName=getComponentName(fiber.type)||'ReactComponent';if(didWarnStateUpdateForUnmountedComponent!==null){if(didWarnStateUpdateForUnmountedComponent.has(componentName)){return;}didWarnStateUpdateForUnmountedComponent.add(componentName);}else{didWarnStateUpdateForUnmountedComponent=new Set([componentName]);}if(isFlushingPassiveEffects);else{var previousFiber=current;try{setCurrentFiber(fiber);error("Can't perform a React state update on an unmounted component. This "+'is a no-op, but it indicates a memory leak in your application. To '+'fix, cancel all subscriptions and asynchronous tasks in %s.',tag===ClassComponent?'the componentWillUnmount method':'a useEffect cleanup function');}finally{if(previousFiber){setCurrentFiber(fiber);}else{resetCurrentFiber();}}}}}var beginWork$1;{var dummyFiber=null;beginWork$1=function beginWork$1(current,unitOfWork,lanes){// If a component throws an error, we replay it again in a synchronously
// dispatched event, so that the debugger will treat it as an uncaught
// error See ReactErrorUtils for more information.
// Before entering the begin phase, copy the work-in-progress onto a dummy
// fiber. If beginWork throws, we'll use this to reset the state.
var originalWorkInProgressCopy=assignFiberPropertiesInDEV(dummyFiber,unitOfWork);try{return beginWork(current,unitOfWork,lanes);}catch(originalError){if(originalError!==null&&typeof originalError==='object'&&typeof originalError.then==='function'){// Don't replay promises. Treat everything else like an error.
throw originalError;}// Keep this code in sync with handleError; any changes here must have
// corresponding changes there.
resetContextDependencies();resetHooksAfterThrow();// Don't reset current debug fiber, since we're about to work on the
// same fiber again.
// Unwind the failed stack frame
unwindInterruptedWork(unitOfWork);// Restore the original properties of the fiber.
assignFiberPropertiesInDEV(unitOfWork,originalWorkInProgressCopy);if(unitOfWork.mode&ProfileMode){// Reset the profiler timer.
startProfilerTimer(unitOfWork);}// Run beginWork again.
invokeGuardedCallback(null,beginWork,null,current,unitOfWork,lanes);if(hasCaughtError()){var replayError=clearCaughtError();// `invokeGuardedCallback` sometimes sets an expando `_suppressLogging`.
// Rethrow this error instead of the original one.
throw replayError;}else{// This branch is reachable if the render phase is impure.
throw originalError;}}};}var didWarnAboutUpdateInRender=false;var didWarnAboutUpdateInRenderForAnotherComponent;{didWarnAboutUpdateInRenderForAnotherComponent=new Set();}function warnAboutRenderPhaseUpdatesInDEV(fiber){{if(isRendering&&(executionContext&RenderContext)!==NoContext&&!getIsUpdatingOpaqueValueInRenderPhaseInDEV()){switch(fiber.tag){case FunctionComponent:case ForwardRef:case SimpleMemoComponent:{var renderingComponentName=workInProgress&&getComponentName(workInProgress.type)||'Unknown';// Dedupe by the rendering component because it's the one that needs to be fixed.
var dedupeKey=renderingComponentName;if(!didWarnAboutUpdateInRenderForAnotherComponent.has(dedupeKey)){didWarnAboutUpdateInRenderForAnotherComponent.add(dedupeKey);var setStateComponentName=getComponentName(fiber.type)||'Unknown';error('Cannot update a component (`%s`) while rendering a '+'different component (`%s`). To locate the bad setState() call inside `%s`, '+'follow the stack trace as described in https://reactjs.org/link/setstate-in-render',setStateComponentName,renderingComponentName,renderingComponentName);}break;}case ClassComponent:{if(!didWarnAboutUpdateInRender){error('Cannot update during an existing state transition (such as '+'within `render`). Render methods should be a pure '+'function of props and state.');didWarnAboutUpdateInRender=true;}break;}}}}}// a 'shared' variable that changes when act() opens/closes in tests.
var IsThisRendererActing={current:false};function warnIfNotScopedWithMatchingAct(fiber){{if(warnsIfNotActing===true&&IsSomeRendererActing.current===true&&IsThisRendererActing.current!==true){var previousFiber=current;try{setCurrentFiber(fiber);error("It looks like you're using the wrong act() around your test interactions.\n"+'Be sure to use the matching version of act() corresponding to your renderer:\n\n'+'// for react-dom:\n'+// Break up imports to avoid accidentally parsing them as dependencies.
'import {act} fr'+"om 'react-dom/test-utils';\n"+'// ...\n'+'act(() => ...);\n\n'+'// for react-test-renderer:\n'+// Break up imports to avoid accidentally parsing them as dependencies.
'import TestRenderer fr'+"om react-test-renderer';\n"+'const {act} = TestRenderer;\n'+'// ...\n'+'act(() => ...);');}finally{if(previousFiber){setCurrentFiber(fiber);}else{resetCurrentFiber();}}}}}function warnIfNotCurrentlyActingEffectsInDEV(fiber){{if(warnsIfNotActing===true&&(fiber.mode&StrictMode)!==NoMode&&IsSomeRendererActing.current===false&&IsThisRendererActing.current===false){error('An update to %s ran an effect, but was not wrapped in act(...).\n\n'+'When testing, code that causes React state updates should be '+'wrapped into act(...):\n\n'+'act(() => {\n'+'  /* fire events that update state */\n'+'});\n'+'/* assert on the output */\n\n'+"This ensures that you're testing the behavior the user would see "+'in the browser.'+' Learn more at https://reactjs.org/link/wrap-tests-with-act',getComponentName(fiber.type));}}}function warnIfNotCurrentlyActingUpdatesInDEV(fiber){{if(warnsIfNotActing===true&&executionContext===NoContext&&IsSomeRendererActing.current===false&&IsThisRendererActing.current===false){var previousFiber=current;try{setCurrentFiber(fiber);error('An update to %s inside a test was not wrapped in act(...).\n\n'+'When testing, code that causes React state updates should be '+'wrapped into act(...):\n\n'+'act(() => {\n'+'  /* fire events that update state */\n'+'});\n'+'/* assert on the output */\n\n'+"This ensures that you're testing the behavior the user would see "+'in the browser.'+' Learn more at https://reactjs.org/link/wrap-tests-with-act',getComponentName(fiber.type));}finally{if(previousFiber){setCurrentFiber(fiber);}else{resetCurrentFiber();}}}}}var warnIfNotCurrentlyActingUpdatesInDev=warnIfNotCurrentlyActingUpdatesInDEV;// In tests, we want to enforce a mocked scheduler.
var didWarnAboutUnmockedScheduler=false;// TODO Before we release concurrent mode, revisit this and decide whether a mocked
// scheduler is the actual recommendation. The alternative could be a testing build,
// a new lib, or whatever; we dunno just yet. This message is for early adopters
// to get their tests right.
function warnIfUnmockedScheduler(fiber){{if(didWarnAboutUnmockedScheduler===false&&Scheduler.unstable_flushAllWithoutAsserting===undefined){if(fiber.mode&BlockingMode||fiber.mode&ConcurrentMode){didWarnAboutUnmockedScheduler=true;error('In Concurrent or Sync modes, the "scheduler" module needs to be mocked '+'to guarantee consistent behaviour across tests and browsers. '+'For example, with jest: \n'+// Break up requires to avoid accidentally parsing them as dependencies.
"jest.mock('scheduler', () => require"+"('scheduler/unstable_mock'));\n\n"+'For more info, visit https://reactjs.org/link/mock-scheduler');}}}}function computeThreadID(root,lane){// Interaction threads are unique per root and expiration time.
// NOTE: Intentionally unsound cast. All that matters is that it's a number
// and it represents a batch of work. Could make a helper function instead,
// but meh this is fine for now.
return lane*1000+root.interactionThreadID;}function markSpawnedWork(lane){if(spawnedWorkDuringRender===null){spawnedWorkDuringRender=[lane];}else{spawnedWorkDuringRender.push(lane);}}function scheduleInteractions(root,lane,interactions){if(interactions.size>0){var pendingInteractionMap=root.pendingInteractionMap;var pendingInteractions=pendingInteractionMap.get(lane);if(pendingInteractions!=null){interactions.forEach(function(interaction){if(!pendingInteractions.has(interaction)){// Update the pending async work count for previously unscheduled interaction.
interaction.__count++;}pendingInteractions.add(interaction);});}else{pendingInteractionMap.set(lane,new Set(interactions));// Update the pending async work count for the current interactions.
interactions.forEach(function(interaction){interaction.__count++;});}var subscriber=tracing.__subscriberRef.current;if(subscriber!==null){var threadID=computeThreadID(root,lane);subscriber.onWorkScheduled(interactions,threadID);}}}function schedulePendingInteractions(root,lane){scheduleInteractions(root,lane,tracing.__interactionsRef.current);}function startWorkOnPendingInteractions(root,lanes){// we can accurately attribute time spent working on it, And so that cascading
// work triggered during the render phase will be associated with it.
var interactions=new Set();root.pendingInteractionMap.forEach(function(scheduledInteractions,scheduledLane){if(includesSomeLane(lanes,scheduledLane)){scheduledInteractions.forEach(function(interaction){return interactions.add(interaction);});}});// Store the current set of interactions on the FiberRoot for a few reasons:
// We can re-use it in hot functions like performConcurrentWorkOnRoot()
// without having to recalculate it. We will also use it in commitWork() to
// pass to any Profiler onRender() hooks. This also provides DevTools with a
// way to access it when the onCommitRoot() hook is called.
root.memoizedInteractions=interactions;if(interactions.size>0){var subscriber=tracing.__subscriberRef.current;if(subscriber!==null){var threadID=computeThreadID(root,lanes);try{subscriber.onWorkStarted(interactions,threadID);}catch(error){// If the subscriber throws, rethrow it in a separate task
scheduleCallback(ImmediatePriority$1,function(){throw error;});}}}}function finishPendingInteractions(root,committedLanes){var remainingLanesAfterCommit=root.pendingLanes;var subscriber;try{subscriber=tracing.__subscriberRef.current;if(subscriber!==null&&root.memoizedInteractions.size>0){// FIXME: More than one lane can finish in a single commit.
var threadID=computeThreadID(root,committedLanes);subscriber.onWorkStopped(root.memoizedInteractions,threadID);}}catch(error){// If the subscriber throws, rethrow it in a separate task
scheduleCallback(ImmediatePriority$1,function(){throw error;});}finally{// Clear completed interactions from the pending Map.
// Unless the render was suspended or cascading work was scheduled,
// In which case– leave pending interactions until the subsequent render.
var pendingInteractionMap=root.pendingInteractionMap;pendingInteractionMap.forEach(function(scheduledInteractions,lane){// Only decrement the pending interaction count if we're done.
// If there's still work at the current priority,
// That indicates that we are waiting for suspense data.
if(!includesSomeLane(remainingLanesAfterCommit,lane)){pendingInteractionMap.delete(lane);scheduledInteractions.forEach(function(interaction){interaction.__count--;if(subscriber!==null&&interaction.__count===0){try{subscriber.onInteractionScheduledWorkCompleted(interaction);}catch(error){// If the subscriber throws, rethrow it in a separate task
scheduleCallback(ImmediatePriority$1,function(){throw error;});}}});}});}}// `act` testing API
function shouldForceFlushFallbacksInDEV(){// Never force flush in production. This function should get stripped out.
return actingUpdatesScopeDepth>0;}var flushMockScheduler=Scheduler.unstable_flushAllWithoutAsserting;var isSchedulerMocked=typeof flushMockScheduler==='function';// Returns whether additional work was scheduled. Caller should keep flushing
// until there's no work left.
function flushActWork(){if(flushMockScheduler!==undefined){try{return flushMockScheduler();}finally{}}else{try{var didFlushWork=false;while(flushPassiveEffects()){didFlushWork=true;}return didFlushWork;}finally{}}}function flushWorkAndMicroTasks(onDone){try{flushActWork();enqueueTask(function(){if(flushActWork()){flushWorkAndMicroTasks(onDone);}else{onDone();}});}catch(err){onDone(err);}}// we track the 'depth' of the act() calls with this counter,
// so we can tell if any async act() calls try to run in parallel.
var actingUpdatesScopeDepth=0;function act(callback){var previousActingUpdatesScopeDepth=actingUpdatesScopeDepth;actingUpdatesScopeDepth++;var previousIsSomeRendererActing=IsSomeRendererActing.current;var previousIsThisRendererActing=IsThisRendererActing.current;IsSomeRendererActing.current=true;IsThisRendererActing.current=true;function onDone(){actingUpdatesScopeDepth--;IsSomeRendererActing.current=previousIsSomeRendererActing;IsThisRendererActing.current=previousIsThisRendererActing;{if(actingUpdatesScopeDepth>previousActingUpdatesScopeDepth){// if it's _less than_ previousActingUpdatesScopeDepth, then we can assume the 'other' one has warned
error('You seem to have overlapping act() calls, this is not supported. '+'Be sure to await previous act() calls before making a new one. ');}}}var result;try{result=batchedUpdates(callback);}catch(error){// on sync errors, we still want to 'cleanup' and decrement actingUpdatesScopeDepth
onDone();throw error;}if(result!==null&&typeof result==='object'&&typeof result.then==='function'){// setup a boolean that gets set to true only
// once this act() call is await-ed
var called=false;{if(typeof Promise!=='undefined'){//eslint-disable-next-line no-undef
Promise.resolve().then(function(){}).then(function(){if(called===false){error('You called act(async () => ...) without await. '+'This could lead to unexpected testing behaviour, interleaving multiple act '+'calls and mixing their scopes. You should - await act(async () => ...);');}});}}// in the async case, the returned thenable runs the callback, flushes
// effects and  microtasks in a loop until flushPassiveEffects() === false,
// and cleans up
return{then:function then(resolve,reject){called=true;result.then(function(){if(actingUpdatesScopeDepth>1||isSchedulerMocked===true&&previousIsSomeRendererActing===true){onDone();resolve();return;}// we're about to exit the act() scope,
// now's the time to flush tasks/effects
flushWorkAndMicroTasks(function(err){onDone();if(err){reject(err);}else{resolve();}});},function(err){onDone();reject(err);});}};}else{{if(result!==undefined){error('The callback passed to act(...) function '+'must return undefined, or a Promise. You returned %s',result);}}// flush effects until none remain, and cleanup
try{if(actingUpdatesScopeDepth===1&&(isSchedulerMocked===false||previousIsSomeRendererActing===false)){// we're about to exit the act() scope,
// now's the time to flush effects
flushActWork();}onDone();}catch(err){onDone();throw err;}// in the sync case, the returned thenable only warns *if* await-ed
return{then:function then(resolve){{error('Do not await the result of calling act(...) with sync logic, it is not a Promise.');}resolve();}};}}function detachFiberAfterEffects(fiber){fiber.sibling=null;fiber.stateNode=null;}var resolveFamily=null;// $FlowFixMe Flow gets confused by a WeakSet feature check below.
var failedBoundaries=null;var setRefreshHandler=function setRefreshHandler(handler){{resolveFamily=handler;}};function resolveFunctionForHotReloading(type){{if(resolveFamily===null){// Hot reloading is disabled.
return type;}var family=resolveFamily(type);if(family===undefined){return type;}// Use the latest known implementation.
return family.current;}}function resolveClassForHotReloading(type){// No implementation differences.
return resolveFunctionForHotReloading(type);}function resolveForwardRefForHotReloading(type){{if(resolveFamily===null){// Hot reloading is disabled.
return type;}var family=resolveFamily(type);if(family===undefined){// Check if we're dealing with a real forwardRef. Don't want to crash early.
if(type!==null&&type!==undefined&&typeof type.render==='function'){// ForwardRef is special because its resolved .type is an object,
// but it's possible that we only have its inner render function in the map.
// If that inner render function is different, we'll build a new forwardRef type.
var currentRender=resolveFunctionForHotReloading(type.render);if(type.render!==currentRender){var syntheticType={$$typeof:REACT_FORWARD_REF_TYPE,render:currentRender};if(type.displayName!==undefined){syntheticType.displayName=type.displayName;}return syntheticType;}}return type;}// Use the latest known implementation.
return family.current;}}function isCompatibleFamilyForHotReloading(fiber,element){{if(resolveFamily===null){// Hot reloading is disabled.
return false;}var prevType=fiber.elementType;var nextType=element.type;// If we got here, we know types aren't === equal.
var needsCompareFamilies=false;var $$typeofNextType=typeof nextType==='object'&&nextType!==null?nextType.$$typeof:null;switch(fiber.tag){case ClassComponent:{if(typeof nextType==='function'){needsCompareFamilies=true;}break;}case FunctionComponent:{if(typeof nextType==='function'){needsCompareFamilies=true;}else if($$typeofNextType===REACT_LAZY_TYPE){// We don't know the inner type yet.
// We're going to assume that the lazy inner type is stable,
// and so it is sufficient to avoid reconciling it away.
// We're not going to unwrap or actually use the new lazy type.
needsCompareFamilies=true;}break;}case ForwardRef:{if($$typeofNextType===REACT_FORWARD_REF_TYPE){needsCompareFamilies=true;}else if($$typeofNextType===REACT_LAZY_TYPE){needsCompareFamilies=true;}break;}case MemoComponent:case SimpleMemoComponent:{if($$typeofNextType===REACT_MEMO_TYPE){// TODO: if it was but can no longer be simple,
// we shouldn't set this.
needsCompareFamilies=true;}else if($$typeofNextType===REACT_LAZY_TYPE){needsCompareFamilies=true;}break;}default:return false;}// Check if both types have a family and it's the same one.
if(needsCompareFamilies){// Note: memo() and forwardRef() we'll compare outer rather than inner type.
// This means both of them need to be registered to preserve state.
// If we unwrapped and compared the inner types for wrappers instead,
// then we would risk falsely saying two separate memo(Foo)
// calls are equivalent because they wrap the same Foo function.
var prevFamily=resolveFamily(prevType);if(prevFamily!==undefined&&prevFamily===resolveFamily(nextType)){return true;}}return false;}}function markFailedErrorBoundaryForHotReloading(fiber){{if(resolveFamily===null){// Hot reloading is disabled.
return;}if(typeof WeakSet!=='function'){return;}if(failedBoundaries===null){failedBoundaries=new WeakSet();}failedBoundaries.add(fiber);}}var scheduleRefresh=function scheduleRefresh(root,update){{if(resolveFamily===null){// Hot reloading is disabled.
return;}var staleFamilies=update.staleFamilies,updatedFamilies=update.updatedFamilies;flushPassiveEffects();flushSync(function(){scheduleFibersWithFamiliesRecursively(root.current,updatedFamilies,staleFamilies);});}};var scheduleRoot=function scheduleRoot(root,element){{if(root.context!==emptyContextObject){// Super edge case: root has a legacy _renderSubtree context
// but we don't know the parentComponent so we can't pass it.
// Just ignore. We'll delete this with _renderSubtree code path later.
return;}flushPassiveEffects();flushSync(function(){updateContainer(element,root,null,null);});}};function scheduleFibersWithFamiliesRecursively(fiber,updatedFamilies,staleFamilies){{var alternate=fiber.alternate,child=fiber.child,sibling=fiber.sibling,tag=fiber.tag,type=fiber.type;var candidateType=null;switch(tag){case FunctionComponent:case SimpleMemoComponent:case ClassComponent:candidateType=type;break;case ForwardRef:candidateType=type.render;break;}if(resolveFamily===null){throw new Error('Expected resolveFamily to be set during hot reload.');}var needsRender=false;var needsRemount=false;if(candidateType!==null){var family=resolveFamily(candidateType);if(family!==undefined){if(staleFamilies.has(family)){needsRemount=true;}else if(updatedFamilies.has(family)){if(tag===ClassComponent){needsRemount=true;}else{needsRender=true;}}}}if(failedBoundaries!==null){if(failedBoundaries.has(fiber)||alternate!==null&&failedBoundaries.has(alternate)){needsRemount=true;}}if(needsRemount){fiber._debugNeedsRemount=true;}if(needsRemount||needsRender){scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);}if(child!==null&&!needsRemount){scheduleFibersWithFamiliesRecursively(child,updatedFamilies,staleFamilies);}if(sibling!==null){scheduleFibersWithFamiliesRecursively(sibling,updatedFamilies,staleFamilies);}}}var findHostInstancesForRefresh=function findHostInstancesForRefresh(root,families){{var hostInstances=new Set();var types=new Set(families.map(function(family){return family.current;}));findHostInstancesForMatchingFibersRecursively(root.current,types,hostInstances);return hostInstances;}};function findHostInstancesForMatchingFibersRecursively(fiber,types,hostInstances){{var child=fiber.child,sibling=fiber.sibling,tag=fiber.tag,type=fiber.type;var candidateType=null;switch(tag){case FunctionComponent:case SimpleMemoComponent:case ClassComponent:candidateType=type;break;case ForwardRef:candidateType=type.render;break;}var didMatch=false;if(candidateType!==null){if(types.has(candidateType)){didMatch=true;}}if(didMatch){// We have a match. This only drills down to the closest host components.
// There's no need to search deeper because for the purpose of giving
// visual feedback, "flashing" outermost parent rectangles is sufficient.
findHostInstancesForFiberShallowly(fiber,hostInstances);}else{// If there's no match, maybe there will be one further down in the child tree.
if(child!==null){findHostInstancesForMatchingFibersRecursively(child,types,hostInstances);}}if(sibling!==null){findHostInstancesForMatchingFibersRecursively(sibling,types,hostInstances);}}}function findHostInstancesForFiberShallowly(fiber,hostInstances){{var foundHostInstances=findChildHostInstancesForFiberShallowly(fiber,hostInstances);if(foundHostInstances){return;}// If we didn't find any host children, fallback to closest host parent.
var node=fiber;while(true){switch(node.tag){case HostComponent:hostInstances.add(node.stateNode);return;case HostPortal:hostInstances.add(node.stateNode.containerInfo);return;case HostRoot:hostInstances.add(node.stateNode.containerInfo);return;}if(node.return===null){throw new Error('Expected to reach root first.');}node=node.return;}}}function findChildHostInstancesForFiberShallowly(fiber,hostInstances){{var node=fiber;var foundHostInstances=false;while(true){if(node.tag===HostComponent){// We got a match.
foundHostInstances=true;hostInstances.add(node.stateNode);// There may still be more, so keep searching.
}else if(node.child!==null){node.child.return=node;node=node.child;continue;}if(node===fiber){return foundHostInstances;}while(node.sibling===null){if(node.return===null||node.return===fiber){return foundHostInstances;}node=node.return;}node.sibling.return=node.return;node=node.sibling;}}return false;}var hasBadMapPolyfill;{hasBadMapPolyfill=false;try{var nonExtensibleObject=Object.preventExtensions({});/* eslint-disable no-new */new Map([[nonExtensibleObject,null]]);new Set([nonExtensibleObject]);/* eslint-enable no-new */}catch(e){// TODO: Consider warning about bad polyfills
hasBadMapPolyfill=true;}}var debugCounter=1;function FiberNode(tag,pendingProps,key,mode){// Instance
this.tag=tag;this.key=key;this.elementType=null;this.type=null;this.stateNode=null;// Fiber
this.return=null;this.child=null;this.sibling=null;this.index=0;this.ref=null;this.pendingProps=pendingProps;this.memoizedProps=null;this.updateQueue=null;this.memoizedState=null;this.dependencies=null;this.mode=mode;// Effects
this.flags=NoFlags;this.nextEffect=null;this.firstEffect=null;this.lastEffect=null;this.lanes=NoLanes;this.childLanes=NoLanes;this.alternate=null;{// Note: The following is done to avoid a v8 performance cliff.
//
// Initializing the fields below to smis and later updating them with
// double values will cause Fibers to end up having separate shapes.
// This behavior/bug has something to do with Object.preventExtension().
// Fortunately this only impacts DEV builds.
// Unfortunately it makes React unusably slow for some applications.
// To work around this, initialize the fields below with doubles.
//
// Learn more about this here:
// https://github.com/facebook/react/issues/14365
// https://bugs.chromium.org/p/v8/issues/detail?id=8538
this.actualDuration=Number.NaN;this.actualStartTime=Number.NaN;this.selfBaseDuration=Number.NaN;this.treeBaseDuration=Number.NaN;// It's okay to replace the initial doubles with smis after initialization.
// This won't trigger the performance cliff mentioned above,
// and it simplifies other profiler code (including DevTools).
this.actualDuration=0;this.actualStartTime=-1;this.selfBaseDuration=0;this.treeBaseDuration=0;}{// This isn't directly used but is handy for debugging internals:
this._debugID=debugCounter++;this._debugSource=null;this._debugOwner=null;this._debugNeedsRemount=false;this._debugHookTypes=null;if(!hasBadMapPolyfill&&typeof Object.preventExtensions==='function'){Object.preventExtensions(this);}}}// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber=function createFiber(tag,pendingProps,key,mode){// $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
return new FiberNode(tag,pendingProps,key,mode);};function shouldConstruct$1(Component){var prototype=Component.prototype;return!!(prototype&&prototype.isReactComponent);}function isSimpleFunctionComponent(type){return typeof type==='function'&&!shouldConstruct$1(type)&&type.defaultProps===undefined;}function resolveLazyComponentTag(Component){if(typeof Component==='function'){return shouldConstruct$1(Component)?ClassComponent:FunctionComponent;}else if(Component!==undefined&&Component!==null){var $$typeof=Component.$$typeof;if($$typeof===REACT_FORWARD_REF_TYPE){return ForwardRef;}if($$typeof===REACT_MEMO_TYPE){return MemoComponent;}}return IndeterminateComponent;}// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current,pendingProps){var workInProgress=current.alternate;if(workInProgress===null){// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
workInProgress=createFiber(current.tag,pendingProps,current.key,current.mode);workInProgress.elementType=current.elementType;workInProgress.type=current.type;workInProgress.stateNode=current.stateNode;{// DEV-only fields
workInProgress._debugID=current._debugID;workInProgress._debugSource=current._debugSource;workInProgress._debugOwner=current._debugOwner;workInProgress._debugHookTypes=current._debugHookTypes;}workInProgress.alternate=current;current.alternate=workInProgress;}else{workInProgress.pendingProps=pendingProps;// Needed because Blocks store data on type.
workInProgress.type=current.type;// We already have an alternate.
// Reset the effect tag.
workInProgress.flags=NoFlags;// The effect list is no longer valid.
workInProgress.nextEffect=null;workInProgress.firstEffect=null;workInProgress.lastEffect=null;{// We intentionally reset, rather than copy, actualDuration & actualStartTime.
// This prevents time from endlessly accumulating in new commits.
// This has the downside of resetting values for different priority renders,
// But works for yielding (the common case) and should support resuming.
workInProgress.actualDuration=0;workInProgress.actualStartTime=-1;}}workInProgress.childLanes=current.childLanes;workInProgress.lanes=current.lanes;workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;// Clone the dependencies object. This is mutated during the render phase, so
// it cannot be shared with the current fiber.
var currentDependencies=current.dependencies;workInProgress.dependencies=currentDependencies===null?null:{lanes:currentDependencies.lanes,firstContext:currentDependencies.firstContext};// These will be overridden during the parent's reconciliation
workInProgress.sibling=current.sibling;workInProgress.index=current.index;workInProgress.ref=current.ref;{workInProgress.selfBaseDuration=current.selfBaseDuration;workInProgress.treeBaseDuration=current.treeBaseDuration;}{workInProgress._debugNeedsRemount=current._debugNeedsRemount;switch(workInProgress.tag){case IndeterminateComponent:case FunctionComponent:case SimpleMemoComponent:workInProgress.type=resolveFunctionForHotReloading(current.type);break;case ClassComponent:workInProgress.type=resolveClassForHotReloading(current.type);break;case ForwardRef:workInProgress.type=resolveForwardRefForHotReloading(current.type);break;}}return workInProgress;}// Used to reuse a Fiber for a second pass.
function resetWorkInProgress(workInProgress,renderLanes){// This resets the Fiber to what createFiber or createWorkInProgress would
// have set the values to before during the first pass. Ideally this wouldn't
// be necessary but unfortunately many code paths reads from the workInProgress
// when they should be reading from current and writing to workInProgress.
// We assume pendingProps, index, key, ref, return are still untouched to
// avoid doing another reconciliation.
// Reset the effect tag but keep any Placement tags, since that's something
// that child fiber is setting, not the reconciliation.
workInProgress.flags&=Placement;// The effect list is no longer valid.
workInProgress.nextEffect=null;workInProgress.firstEffect=null;workInProgress.lastEffect=null;var current=workInProgress.alternate;if(current===null){// Reset to createFiber's initial values.
workInProgress.childLanes=NoLanes;workInProgress.lanes=renderLanes;workInProgress.child=null;workInProgress.memoizedProps=null;workInProgress.memoizedState=null;workInProgress.updateQueue=null;workInProgress.dependencies=null;workInProgress.stateNode=null;{// Note: We don't reset the actualTime counts. It's useful to accumulate
// actual time across multiple render passes.
workInProgress.selfBaseDuration=0;workInProgress.treeBaseDuration=0;}}else{// Reset to the cloned values that createWorkInProgress would've.
workInProgress.childLanes=current.childLanes;workInProgress.lanes=current.lanes;workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;// Needed because Blocks store data on type.
workInProgress.type=current.type;// Clone the dependencies object. This is mutated during the render phase, so
// it cannot be shared with the current fiber.
var currentDependencies=current.dependencies;workInProgress.dependencies=currentDependencies===null?null:{lanes:currentDependencies.lanes,firstContext:currentDependencies.firstContext};{// Note: We don't reset the actualTime counts. It's useful to accumulate
// actual time across multiple render passes.
workInProgress.selfBaseDuration=current.selfBaseDuration;workInProgress.treeBaseDuration=current.treeBaseDuration;}}return workInProgress;}function createHostRootFiber(tag){var mode;if(tag===ConcurrentRoot){mode=ConcurrentMode|BlockingMode|StrictMode;}else if(tag===BlockingRoot){mode=BlockingMode|StrictMode;}else{mode=NoMode;}if(isDevToolsPresent){// Always collect profile timings when DevTools are present.
// This enables DevTools to start capturing timing at any point–
// Without some nodes in the tree having empty base times.
mode|=ProfileMode;}return createFiber(HostRoot,null,null,mode);}function createFiberFromTypeAndProps(type,// React$ElementType
key,pendingProps,owner,mode,lanes){var fiberTag=IndeterminateComponent;// The resolved type is set if we know what the final type will be. I.e. it's not lazy.
var resolvedType=type;if(typeof type==='function'){if(shouldConstruct$1(type)){fiberTag=ClassComponent;{resolvedType=resolveClassForHotReloading(resolvedType);}}else{{resolvedType=resolveFunctionForHotReloading(resolvedType);}}}else if(typeof type==='string'){fiberTag=HostComponent;}else{getTag:switch(type){case REACT_FRAGMENT_TYPE:return createFiberFromFragment(pendingProps.children,mode,lanes,key);case REACT_DEBUG_TRACING_MODE_TYPE:fiberTag=Mode;mode|=DebugTracingMode;break;case REACT_STRICT_MODE_TYPE:fiberTag=Mode;mode|=StrictMode;break;case REACT_PROFILER_TYPE:return createFiberFromProfiler(pendingProps,mode,lanes,key);case REACT_SUSPENSE_TYPE:return createFiberFromSuspense(pendingProps,mode,lanes,key);case REACT_SUSPENSE_LIST_TYPE:return createFiberFromSuspenseList(pendingProps,mode,lanes,key);case REACT_OFFSCREEN_TYPE:return createFiberFromOffscreen(pendingProps,mode,lanes,key);case REACT_LEGACY_HIDDEN_TYPE:return createFiberFromLegacyHidden(pendingProps,mode,lanes,key);case REACT_SCOPE_TYPE:// eslint-disable-next-line no-fallthrough
default:{if(typeof type==='object'&&type!==null){switch(type.$$typeof){case REACT_PROVIDER_TYPE:fiberTag=ContextProvider;break getTag;case REACT_CONTEXT_TYPE:// This is a consumer
fiberTag=ContextConsumer;break getTag;case REACT_FORWARD_REF_TYPE:fiberTag=ForwardRef;{resolvedType=resolveForwardRefForHotReloading(resolvedType);}break getTag;case REACT_MEMO_TYPE:fiberTag=MemoComponent;break getTag;case REACT_LAZY_TYPE:fiberTag=LazyComponent;resolvedType=null;break getTag;case REACT_BLOCK_TYPE:fiberTag=Block;break getTag;}}var info='';{if(type===undefined||typeof type==='object'&&type!==null&&Object.keys(type).length===0){info+=' You likely forgot to export your component from the file '+"it's defined in, or you might have mixed up default and "+'named imports.';}var ownerName=owner?getComponentName(owner.type):null;if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}}{{throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: "+(type==null?type:typeof type)+"."+info);}}}}}var fiber=createFiber(fiberTag,pendingProps,key,mode);fiber.elementType=type;fiber.type=resolvedType;fiber.lanes=lanes;{fiber._debugOwner=owner;}return fiber;}function createFiberFromElement(element,mode,lanes){var owner=null;{owner=element._owner;}var type=element.type;var key=element.key;var pendingProps=element.props;var fiber=createFiberFromTypeAndProps(type,key,pendingProps,owner,mode,lanes);{fiber._debugSource=element._source;fiber._debugOwner=element._owner;}return fiber;}function createFiberFromFragment(elements,mode,lanes,key){var fiber=createFiber(Fragment,elements,key,mode);fiber.lanes=lanes;return fiber;}function createFiberFromProfiler(pendingProps,mode,lanes,key){{if(typeof pendingProps.id!=='string'){error('Profiler must specify an "id" as a prop');}}var fiber=createFiber(Profiler,pendingProps,key,mode|ProfileMode);// TODO: The Profiler fiber shouldn't have a type. It has a tag.
fiber.elementType=REACT_PROFILER_TYPE;fiber.type=REACT_PROFILER_TYPE;fiber.lanes=lanes;{fiber.stateNode={effectDuration:0,passiveEffectDuration:0};}return fiber;}function createFiberFromSuspense(pendingProps,mode,lanes,key){var fiber=createFiber(SuspenseComponent,pendingProps,key,mode);// TODO: The SuspenseComponent fiber shouldn't have a type. It has a tag.
// This needs to be fixed in getComponentName so that it relies on the tag
// instead.
fiber.type=REACT_SUSPENSE_TYPE;fiber.elementType=REACT_SUSPENSE_TYPE;fiber.lanes=lanes;return fiber;}function createFiberFromSuspenseList(pendingProps,mode,lanes,key){var fiber=createFiber(SuspenseListComponent,pendingProps,key,mode);{// TODO: The SuspenseListComponent fiber shouldn't have a type. It has a tag.
// This needs to be fixed in getComponentName so that it relies on the tag
// instead.
fiber.type=REACT_SUSPENSE_LIST_TYPE;}fiber.elementType=REACT_SUSPENSE_LIST_TYPE;fiber.lanes=lanes;return fiber;}function createFiberFromOffscreen(pendingProps,mode,lanes,key){var fiber=createFiber(OffscreenComponent,pendingProps,key,mode);// TODO: The OffscreenComponent fiber shouldn't have a type. It has a tag.
// This needs to be fixed in getComponentName so that it relies on the tag
// instead.
{fiber.type=REACT_OFFSCREEN_TYPE;}fiber.elementType=REACT_OFFSCREEN_TYPE;fiber.lanes=lanes;return fiber;}function createFiberFromLegacyHidden(pendingProps,mode,lanes,key){var fiber=createFiber(LegacyHiddenComponent,pendingProps,key,mode);// TODO: The LegacyHidden fiber shouldn't have a type. It has a tag.
// This needs to be fixed in getComponentName so that it relies on the tag
// instead.
{fiber.type=REACT_LEGACY_HIDDEN_TYPE;}fiber.elementType=REACT_LEGACY_HIDDEN_TYPE;fiber.lanes=lanes;return fiber;}function createFiberFromText(content,mode,lanes){var fiber=createFiber(HostText,content,null,mode);fiber.lanes=lanes;return fiber;}function createFiberFromHostInstanceForDeletion(){var fiber=createFiber(HostComponent,null,null,NoMode);// TODO: These should not need a type.
fiber.elementType='DELETED';fiber.type='DELETED';return fiber;}function createFiberFromPortal(portal,mode,lanes){var pendingProps=portal.children!==null?portal.children:[];var fiber=createFiber(HostPortal,pendingProps,portal.key,mode);fiber.lanes=lanes;fiber.stateNode={containerInfo:portal.containerInfo,pendingChildren:null,// Used by persistent updates
implementation:portal.implementation};return fiber;}// Used for stashing WIP properties to replay failed work in DEV.
function assignFiberPropertiesInDEV(target,source){if(target===null){// This Fiber's initial properties will always be overwritten.
// We only use a Fiber to ensure the same hidden class so DEV isn't slow.
target=createFiber(IndeterminateComponent,null,null,NoMode);}// This is intentionally written as a list of all properties.
// We tried to use Object.assign() instead but this is called in
// the hottest path, and Object.assign() was too slow:
// https://github.com/facebook/react/issues/12502
// This code is DEV-only so size is not a concern.
target.tag=source.tag;target.key=source.key;target.elementType=source.elementType;target.type=source.type;target.stateNode=source.stateNode;target.return=source.return;target.child=source.child;target.sibling=source.sibling;target.index=source.index;target.ref=source.ref;target.pendingProps=source.pendingProps;target.memoizedProps=source.memoizedProps;target.updateQueue=source.updateQueue;target.memoizedState=source.memoizedState;target.dependencies=source.dependencies;target.mode=source.mode;target.flags=source.flags;target.nextEffect=source.nextEffect;target.firstEffect=source.firstEffect;target.lastEffect=source.lastEffect;target.lanes=source.lanes;target.childLanes=source.childLanes;target.alternate=source.alternate;{target.actualDuration=source.actualDuration;target.actualStartTime=source.actualStartTime;target.selfBaseDuration=source.selfBaseDuration;target.treeBaseDuration=source.treeBaseDuration;}target._debugID=source._debugID;target._debugSource=source._debugSource;target._debugOwner=source._debugOwner;target._debugNeedsRemount=source._debugNeedsRemount;target._debugHookTypes=source._debugHookTypes;return target;}function FiberRootNode(containerInfo,tag,hydrate){this.tag=tag;this.containerInfo=containerInfo;this.pendingChildren=null;this.current=null;this.pingCache=null;this.finishedWork=null;this.timeoutHandle=noTimeout;this.context=null;this.pendingContext=null;this.hydrate=hydrate;this.callbackNode=null;this.callbackPriority=NoLanePriority;this.eventTimes=createLaneMap(NoLanes);this.expirationTimes=createLaneMap(NoTimestamp);this.pendingLanes=NoLanes;this.suspendedLanes=NoLanes;this.pingedLanes=NoLanes;this.expiredLanes=NoLanes;this.mutableReadLanes=NoLanes;this.finishedLanes=NoLanes;this.entangledLanes=NoLanes;this.entanglements=createLaneMap(NoLanes);if(supportsHydration){this.mutableSourceEagerHydrationData=null;}{this.interactionThreadID=tracing.unstable_getThreadID();this.memoizedInteractions=new Set();this.pendingInteractionMap=new Map();}{switch(tag){case BlockingRoot:this._debugRootType='createBlockingRoot()';break;case ConcurrentRoot:this._debugRootType='createRoot()';break;case LegacyRoot:this._debugRootType='createLegacyRoot()';break;}}}function createFiberRoot(containerInfo,tag,hydrate,hydrationCallbacks){var root=new FiberRootNode(containerInfo,tag,hydrate);// stateNode is any.
var uninitializedFiber=createHostRootFiber(tag);root.current=uninitializedFiber;uninitializedFiber.stateNode=root;initializeUpdateQueue(uninitializedFiber);return root;}// This ensures that the version used for server rendering matches the one
// that is eventually read during hydration.
// If they don't match there's a potential tear and a full deopt render is required.
function registerMutableSourceForHydration(root,mutableSource){var getVersion=mutableSource._getVersion;var version=getVersion(mutableSource._source);// TODO Clear this data once all pending hydration work is finished.
// Retaining it forever may interfere with GC.
if(root.mutableSourceEagerHydrationData==null){root.mutableSourceEagerHydrationData=[mutableSource,version];}else{root.mutableSourceEagerHydrationData.push(mutableSource,version);}}function createPortal(children,containerInfo,// TODO: figure out the API for cross-renderer implementation.
implementation){var key=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;return{// This tag allow us to uniquely identify this as a React Portal
$$typeof:REACT_PORTAL_TYPE,key:key==null?null:''+key,children:children,containerInfo:containerInfo,implementation:implementation};}var didWarnAboutNestedUpdates;var didWarnAboutFindNodeInStrictMode;{didWarnAboutNestedUpdates=false;didWarnAboutFindNodeInStrictMode={};}function getContextForSubtree(parentComponent){if(!parentComponent){return emptyContextObject;}var fiber=get(parentComponent);var parentContext=findCurrentUnmaskedContext(fiber);if(fiber.tag===ClassComponent){var Component=fiber.type;if(isContextProvider(Component)){return processChildContext(fiber,Component,parentContext);}}return parentContext;}function findHostInstance(component){var fiber=get(component);if(fiber===undefined){if(typeof component.render==='function'){{{throw Error("Unable to find node on an unmounted component.");}}}else{{{throw Error("Argument appears to not be a ReactComponent. Keys: "+Object.keys(component));}}}}var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}function findHostInstanceWithWarning(component,methodName){{var fiber=get(component);if(fiber===undefined){if(typeof component.render==='function'){{{throw Error("Unable to find node on an unmounted component.");}}}else{{{throw Error("Argument appears to not be a ReactComponent. Keys: "+Object.keys(component));}}}}var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}if(hostFiber.mode&StrictMode){var componentName=getComponentName(fiber.type)||'Component';if(!didWarnAboutFindNodeInStrictMode[componentName]){didWarnAboutFindNodeInStrictMode[componentName]=true;var previousFiber=current;try{setCurrentFiber(hostFiber);if(fiber.mode&StrictMode){error('%s is deprecated in StrictMode. '+'%s was passed an instance of %s which is inside StrictMode. '+'Instead, add a ref directly to the element you want to reference. '+'Learn more about using refs safely here: '+'https://reactjs.org/link/strict-mode-find-node',methodName,methodName,componentName);}else{error('%s is deprecated in StrictMode. '+'%s was passed an instance of %s which renders StrictMode children. '+'Instead, add a ref directly to the element you want to reference. '+'Learn more about using refs safely here: '+'https://reactjs.org/link/strict-mode-find-node',methodName,methodName,componentName);}}finally{// Ideally this should reset to previous but this shouldn't be called in
// render and there's another warning for that anyway.
if(previousFiber){setCurrentFiber(previousFiber);}else{resetCurrentFiber();}}}}return hostFiber.stateNode;}}function createContainer(containerInfo,tag,hydrate,hydrationCallbacks){return createFiberRoot(containerInfo,tag,hydrate);}function updateContainer(element,container,parentComponent,callback){{onScheduleRoot(container,element);}var current$1=container.current;var eventTime=requestEventTime();{// $FlowExpectedError - jest isn't a global, and isn't recognized outside of tests
if('undefined'!==typeof jest){warnIfUnmockedScheduler(current$1);warnIfNotScopedWithMatchingAct(current$1);}}var lane=requestUpdateLane(current$1);var context=getContextForSubtree(parentComponent);if(container.context===null){container.context=context;}else{container.pendingContext=context;}{if(isRendering&&current!==null&&!didWarnAboutNestedUpdates){didWarnAboutNestedUpdates=true;error('Render methods should be a pure function of props and state; '+'triggering nested component updates from render is not allowed. '+'If necessary, trigger nested updates in componentDidUpdate.\n\n'+'Check the render method of %s.',getComponentName(current.type)||'Unknown');}}var update=createUpdate(eventTime,lane);// Caution: React DevTools currently depends on this property
// being called "element".
update.payload={element:element};callback=callback===undefined?null:callback;if(callback!==null){{if(typeof callback!=='function'){error('render(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callback);}}update.callback=callback;}enqueueUpdate(current$1,update);scheduleUpdateOnFiber(current$1,lane,eventTime);return lane;}function getPublicRootInstance(container){var containerFiber=container.current;if(!containerFiber.child){return null;}switch(containerFiber.child.tag){case HostComponent:return getPublicInstance(containerFiber.child.stateNode);default:return containerFiber.child.stateNode;}}function attemptSynchronousHydration(fiber){switch(fiber.tag){case HostRoot:var root=fiber.stateNode;if(root.hydrate){// Flush the first scheduled "update".
var lanes=getHighestPriorityPendingLanes(root);flushRoot(root,lanes);}break;case SuspenseComponent:var eventTime=requestEventTime();flushSync(function(){return scheduleUpdateOnFiber(fiber,SyncLane,eventTime);});// If we're still blocked after this, we need to increase
// the priority of any promises resolving within this
// boundary so that they next attempt also has higher pri.
var retryLane=InputDiscreteHydrationLane;markRetryLaneIfNotHydrated(fiber,retryLane);break;}}function markRetryLaneImpl(fiber,retryLane){var suspenseState=fiber.memoizedState;if(suspenseState!==null&&suspenseState.dehydrated!==null){suspenseState.retryLane=higherPriorityLane(suspenseState.retryLane,retryLane);}}// Increases the priority of thennables when they resolve within this boundary.
function markRetryLaneIfNotHydrated(fiber,retryLane){markRetryLaneImpl(fiber,retryLane);var alternate=fiber.alternate;if(alternate){markRetryLaneImpl(alternate,retryLane);}}function attemptUserBlockingHydration(fiber){if(fiber.tag!==SuspenseComponent){// We ignore HostRoots here because we can't increase
// their priority and they should not suspend on I/O,
// since you have to wrap anything that might suspend in
// Suspense.
return;}var eventTime=requestEventTime();var lane=InputDiscreteHydrationLane;scheduleUpdateOnFiber(fiber,lane,eventTime);markRetryLaneIfNotHydrated(fiber,lane);}function attemptContinuousHydration(fiber){if(fiber.tag!==SuspenseComponent){// We ignore HostRoots here because we can't increase
// their priority and they should not suspend on I/O,
// since you have to wrap anything that might suspend in
// Suspense.
return;}var eventTime=requestEventTime();var lane=SelectiveHydrationLane;scheduleUpdateOnFiber(fiber,lane,eventTime);markRetryLaneIfNotHydrated(fiber,lane);}function attemptHydrationAtCurrentPriority(fiber){if(fiber.tag!==SuspenseComponent){// We ignore HostRoots here because we can't increase
// their priority other than synchronously flush it.
return;}var eventTime=requestEventTime();var lane=requestUpdateLane(fiber);scheduleUpdateOnFiber(fiber,lane,eventTime);markRetryLaneIfNotHydrated(fiber,lane);}function runWithPriority$1(priority,fn){var previousPriority=getCurrentUpdateLanePriority();try{setCurrentUpdateLanePriority(priority);return fn();}finally{setCurrentUpdateLanePriority(previousPriority);}}function findHostInstanceWithNoPortals(fiber){var hostFiber=findCurrentHostFiberWithNoPortals(fiber);if(hostFiber===null){return null;}if(hostFiber.tag===FundamentalComponent){return hostFiber.stateNode.instance;}return hostFiber.stateNode;}var shouldSuspendImpl=function shouldSuspendImpl(fiber){return false;};function shouldSuspend(fiber){return shouldSuspendImpl(fiber);}var overrideHookState=null;var overrideHookStateDeletePath=null;var overrideHookStateRenamePath=null;var overrideProps=null;var overridePropsDeletePath=null;var overridePropsRenamePath=null;var scheduleUpdate=null;var setSuspenseHandler=null;{var copyWithDeleteImpl=function copyWithDeleteImpl(obj,path,index){var key=path[index];var updated=Array.isArray(obj)?obj.slice():_assign({},obj);if(index+1===path.length){if(Array.isArray(updated)){updated.splice(key,1);}else{delete updated[key];}return updated;}// $FlowFixMe number or string is fine here
updated[key]=copyWithDeleteImpl(obj[key],path,index+1);return updated;};var copyWithDelete=function copyWithDelete(obj,path){return copyWithDeleteImpl(obj,path,0);};var copyWithRenameImpl=function copyWithRenameImpl(obj,oldPath,newPath,index){var oldKey=oldPath[index];var updated=Array.isArray(obj)?obj.slice():_assign({},obj);if(index+1===oldPath.length){var newKey=newPath[index];// $FlowFixMe number or string is fine here
updated[newKey]=updated[oldKey];if(Array.isArray(updated)){updated.splice(oldKey,1);}else{delete updated[oldKey];}}else{// $FlowFixMe number or string is fine here
updated[oldKey]=copyWithRenameImpl(// $FlowFixMe number or string is fine here
obj[oldKey],oldPath,newPath,index+1);}return updated;};var copyWithRename=function copyWithRename(obj,oldPath,newPath){if(oldPath.length!==newPath.length){warn('copyWithRename() expects paths of the same length');return;}else{for(var i=0;i<newPath.length-1;i++){if(oldPath[i]!==newPath[i]){warn('copyWithRename() expects paths to be the same except for the deepest key');return;}}}return copyWithRenameImpl(obj,oldPath,newPath,0);};var copyWithSetImpl=function copyWithSetImpl(obj,path,index,value){if(index>=path.length){return value;}var key=path[index];var updated=Array.isArray(obj)?obj.slice():_assign({},obj);// $FlowFixMe number or string is fine here
updated[key]=copyWithSetImpl(obj[key],path,index+1,value);return updated;};var copyWithSet=function copyWithSet(obj,path,value){return copyWithSetImpl(obj,path,0,value);};var findHook=function findHook(fiber,id){// For now, the "id" of stateful hooks is just the stateful hook index.
// This may change in the future with e.g. nested hooks.
var currentHook=fiber.memoizedState;while(currentHook!==null&&id>0){currentHook=currentHook.next;id--;}return currentHook;};// Support DevTools editable values for useState and useReducer.
overrideHookState=function overrideHookState(fiber,id,path,value){var hook=findHook(fiber,id);if(hook!==null){var newState=copyWithSet(hook.memoizedState,path,value);hook.memoizedState=newState;hook.baseState=newState;// We aren't actually adding an update to the queue,
// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
fiber.memoizedProps=_assign({},fiber.memoizedProps);scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);}};overrideHookStateDeletePath=function overrideHookStateDeletePath(fiber,id,path){var hook=findHook(fiber,id);if(hook!==null){var newState=copyWithDelete(hook.memoizedState,path);hook.memoizedState=newState;hook.baseState=newState;// We aren't actually adding an update to the queue,
// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
fiber.memoizedProps=_assign({},fiber.memoizedProps);scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);}};overrideHookStateRenamePath=function overrideHookStateRenamePath(fiber,id,oldPath,newPath){var hook=findHook(fiber,id);if(hook!==null){var newState=copyWithRename(hook.memoizedState,oldPath,newPath);hook.memoizedState=newState;hook.baseState=newState;// We aren't actually adding an update to the queue,
// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
fiber.memoizedProps=_assign({},fiber.memoizedProps);scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);}};// Support DevTools props for function components, forwardRef, memo, host components, etc.
overrideProps=function overrideProps(fiber,path,value){fiber.pendingProps=copyWithSet(fiber.memoizedProps,path,value);if(fiber.alternate){fiber.alternate.pendingProps=fiber.pendingProps;}scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);};overridePropsDeletePath=function overridePropsDeletePath(fiber,path){fiber.pendingProps=copyWithDelete(fiber.memoizedProps,path);if(fiber.alternate){fiber.alternate.pendingProps=fiber.pendingProps;}scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);};overridePropsRenamePath=function overridePropsRenamePath(fiber,oldPath,newPath){fiber.pendingProps=copyWithRename(fiber.memoizedProps,oldPath,newPath);if(fiber.alternate){fiber.alternate.pendingProps=fiber.pendingProps;}scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);};scheduleUpdate=function scheduleUpdate(fiber){scheduleUpdateOnFiber(fiber,SyncLane,NoTimestamp);};setSuspenseHandler=function setSuspenseHandler(newShouldSuspendImpl){shouldSuspendImpl=newShouldSuspendImpl;};}function findHostInstanceByFiber(fiber){var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}function emptyFindFiberByHostInstance(instance){return null;}function getCurrentFiberForDevTools(){return current;}function injectIntoDevTools(devToolsConfig){var findFiberByHostInstance=devToolsConfig.findFiberByHostInstance;var ReactCurrentDispatcher=ReactSharedInternals.ReactCurrentDispatcher;return injectInternals({bundleType:devToolsConfig.bundleType,version:devToolsConfig.version,rendererPackageName:devToolsConfig.rendererPackageName,rendererConfig:devToolsConfig.rendererConfig,overrideHookState:overrideHookState,overrideHookStateDeletePath:overrideHookStateDeletePath,overrideHookStateRenamePath:overrideHookStateRenamePath,overrideProps:overrideProps,overridePropsDeletePath:overridePropsDeletePath,overridePropsRenamePath:overridePropsRenamePath,setSuspenseHandler:setSuspenseHandler,scheduleUpdate:scheduleUpdate,currentDispatcherRef:ReactCurrentDispatcher,findHostInstanceByFiber:findHostInstanceByFiber,findFiberByHostInstance:findFiberByHostInstance||emptyFindFiberByHostInstance,// React Refresh
findHostInstancesForRefresh:findHostInstancesForRefresh,scheduleRefresh:scheduleRefresh,scheduleRoot:scheduleRoot,setRefreshHandler:setRefreshHandler,// Enables DevTools to append owner stacks to error messages in DEV mode.
getCurrentFiber:getCurrentFiberForDevTools});}exports.IsThisRendererActing=IsThisRendererActing;exports.act=act;exports.attemptContinuousHydration=attemptContinuousHydration;exports.attemptHydrationAtCurrentPriority=attemptHydrationAtCurrentPriority;exports.attemptSynchronousHydration=attemptSynchronousHydration;exports.attemptUserBlockingHydration=attemptUserBlockingHydration;exports.batchedEventUpdates=batchedEventUpdates;exports.batchedUpdates=batchedUpdates;exports.createComponentSelector=createComponentSelector;exports.createContainer=createContainer;exports.createHasPsuedoClassSelector=createHasPsuedoClassSelector;exports.createPortal=createPortal;exports.createRoleSelector=createRoleSelector;exports.createTestNameSelector=createTestNameSelector;exports.createTextSelector=createTextSelector;exports.deferredUpdates=deferredUpdates;exports.discreteUpdates=discreteUpdates;exports.findAllNodes=findAllNodes;exports.findBoundingRects=findBoundingRects;exports.findHostInstance=findHostInstance;exports.findHostInstanceWithNoPortals=findHostInstanceWithNoPortals;exports.findHostInstanceWithWarning=findHostInstanceWithWarning;exports.flushControlled=flushControlled;exports.flushDiscreteUpdates=flushDiscreteUpdates;exports.flushPassiveEffects=flushPassiveEffects;exports.flushSync=flushSync;exports.focusWithin=focusWithin;exports.getCurrentUpdateLanePriority=getCurrentUpdateLanePriority;exports.getFindAllNodesFailureDescription=getFindAllNodesFailureDescription;exports.getPublicRootInstance=getPublicRootInstance;exports.injectIntoDevTools=injectIntoDevTools;exports.observeVisibleRects=observeVisibleRects;exports.registerMutableSourceForHydration=registerMutableSourceForHydration;exports.runWithPriority=runWithPriority$1;exports.shouldSuspend=shouldSuspend;exports.unbatchedUpdates=unbatchedUpdates;exports.updateContainer=updateContainer;return exports;};}

/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/react-reconciler/index.js":
/*!*******************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/react-reconciler/index.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-reconciler.development.js */ "../../tenon/packages/tenon-react/node_modules/react-reconciler/cjs/react-reconciler.development.js");
}

/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/scheduler/cjs/scheduler-tracing.development.js":
/*!****************************************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/scheduler/cjs/scheduler-tracing.development.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/** @license React v0.20.2
 * scheduler-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

    var interactionIDCounter = 0;
    var threadIDCounter = 0; // Set of currently traced interactions.
    // Interactions "stack"–
    // Meaning that newly traced interactions are appended to the previously active set.
    // When an interaction goes out of scope, the previous set (if any) is restored.

    exports.__interactionsRef = null; // Listener(s) to notify when interactions begin and end.

    exports.__subscriberRef = null;
    {
      exports.__interactionsRef = {
        current: new Set()
      };
      exports.__subscriberRef = {
        current: null
      };
    }

    function unstable_clear(callback) {
      var prevInteractions = exports.__interactionsRef.current;
      exports.__interactionsRef.current = new Set();

      try {
        return callback();
      } finally {
        exports.__interactionsRef.current = prevInteractions;
      }
    }

    function unstable_getCurrent() {
      {
        return exports.__interactionsRef.current;
      }
    }

    function unstable_getThreadID() {
      return ++threadIDCounter;
    }

    function unstable_trace(name, timestamp, callback) {
      var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;
      var interaction = {
        __count: 1,
        id: interactionIDCounter++,
        name: name,
        timestamp: timestamp
      };
      var prevInteractions = exports.__interactionsRef.current; // Traced interactions should stack/accumulate.
      // To do that, clone the current interactions.
      // The previous set will be restored upon completion.

      var interactions = new Set(prevInteractions);
      interactions.add(interaction);
      exports.__interactionsRef.current = interactions;
      var subscriber = exports.__subscriberRef.current;
      var returnValue;

      try {
        if (subscriber !== null) {
          subscriber.onInteractionTraced(interaction);
        }
      } finally {
        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(interactions, threadID);
          }
        } finally {
          try {
            returnValue = callback();
          } finally {
            exports.__interactionsRef.current = prevInteractions;

            try {
              if (subscriber !== null) {
                subscriber.onWorkStopped(interactions, threadID);
              }
            } finally {
              interaction.__count--; // If no async work was scheduled for this interaction,
              // Notify subscribers that it's completed.

              if (subscriber !== null && interaction.__count === 0) {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              }
            }
          }
        }
      }

      return returnValue;
    }

    function unstable_wrap(callback) {
      var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;
      var wrappedInteractions = exports.__interactionsRef.current;
      var subscriber = exports.__subscriberRef.current;

      if (subscriber !== null) {
        subscriber.onWorkScheduled(wrappedInteractions, threadID);
      } // Update the pending async work count for the current interactions.
      // Update after calling subscribers in case of error.


      wrappedInteractions.forEach(function (interaction) {
        interaction.__count++;
      });
      var hasRun = false;

      function wrapped() {
        var prevInteractions = exports.__interactionsRef.current;
        exports.__interactionsRef.current = wrappedInteractions;
        subscriber = exports.__subscriberRef.current;

        try {
          var returnValue;

          try {
            if (subscriber !== null) {
              subscriber.onWorkStarted(wrappedInteractions, threadID);
            }
          } finally {
            try {
              returnValue = callback.apply(undefined, arguments);
            } finally {
              exports.__interactionsRef.current = prevInteractions;

              if (subscriber !== null) {
                subscriber.onWorkStopped(wrappedInteractions, threadID);
              }
            }
          }

          return returnValue;
        } finally {
          if (!hasRun) {
            // We only expect a wrapped function to be executed once,
            // But in the event that it's executed more than once–
            // Only decrement the outstanding interaction counts once.
            hasRun = true; // Update pending async counts for all wrapped interactions.
            // If this was the last scheduled async work for any of them,
            // Mark them as completed.

            wrappedInteractions.forEach(function (interaction) {
              interaction.__count--;

              if (subscriber !== null && interaction.__count === 0) {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              }
            });
          }
        }
      }

      wrapped.cancel = function cancel() {
        subscriber = exports.__subscriberRef.current;

        try {
          if (subscriber !== null) {
            subscriber.onWorkCanceled(wrappedInteractions, threadID);
          }
        } finally {
          // Update pending async counts for all wrapped interactions.
          // If this was the last scheduled async work for any of them,
          // Mark them as completed.
          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      };

      return wrapped;
    }

    var subscribers = null;
    {
      subscribers = new Set();
    }

    function unstable_subscribe(subscriber) {
      {
        subscribers.add(subscriber);

        if (subscribers.size === 1) {
          exports.__subscriberRef.current = {
            onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
            onInteractionTraced: onInteractionTraced,
            onWorkCanceled: onWorkCanceled,
            onWorkScheduled: onWorkScheduled,
            onWorkStarted: onWorkStarted,
            onWorkStopped: onWorkStopped
          };
        }
      }
    }

    function unstable_unsubscribe(subscriber) {
      {
        subscribers.delete(subscriber);

        if (subscribers.size === 0) {
          exports.__subscriberRef.current = null;
        }
      }
    }

    function onInteractionTraced(interaction) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onInteractionTraced(interaction);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onInteractionScheduledWorkCompleted(interaction) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onInteractionScheduledWorkCompleted(interaction);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkScheduled(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkScheduled(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkStarted(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkStarted(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkStopped(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkStopped(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    function onWorkCanceled(interactions, threadID) {
      var didCatchError = false;
      var caughtError = null;
      subscribers.forEach(function (subscriber) {
        try {
          subscriber.onWorkCanceled(interactions, threadID);
        } catch (error) {
          if (!didCatchError) {
            didCatchError = true;
            caughtError = error;
          }
        }
      });

      if (didCatchError) {
        throw caughtError;
      }
    }

    exports.unstable_clear = unstable_clear;
    exports.unstable_getCurrent = unstable_getCurrent;
    exports.unstable_getThreadID = unstable_getThreadID;
    exports.unstable_subscribe = unstable_subscribe;
    exports.unstable_trace = unstable_trace;
    exports.unstable_unsubscribe = unstable_unsubscribe;
    exports.unstable_wrap = unstable_wrap;
  })();
}

/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/scheduler/cjs/scheduler.development.js":
/*!********************************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/scheduler/cjs/scheduler.development.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/** @license React v0.20.2
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict';

    var enableSchedulerDebugging = false;
    var enableProfiling = false;

    var _requestHostCallback;

    var requestHostTimeout;
    var cancelHostTimeout;
    var requestPaint;
    var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

    if (hasPerformanceNow) {
      var localPerformance = performance;

      exports.unstable_now = function () {
        return localPerformance.now();
      };
    } else {
      var localDate = Date;
      var initialTime = localDate.now();

      exports.unstable_now = function () {
        return localDate.now() - initialTime;
      };
    }

    if ( // If Scheduler runs in a non-DOM environment, it falls back to a naive
    // implementation using setTimeout.
    typeof window === 'undefined' || // Check if MessageChannel is supported, too.
    typeof MessageChannel !== 'function') {
      // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
      // fallback to a naive implementation.
      var _callback = null;
      var _timeoutID = null;

      var _flushCallback = function _flushCallback() {
        if (_callback !== null) {
          try {
            var currentTime = exports.unstable_now();
            var hasRemainingTime = true;

            _callback(hasRemainingTime, currentTime);

            _callback = null;
          } catch (e) {
            setTimeout(_flushCallback, 0);
            throw e;
          }
        }
      };

      _requestHostCallback = function requestHostCallback(cb) {
        if (_callback !== null) {
          // Protect against re-entrancy.
          setTimeout(_requestHostCallback, 0, cb);
        } else {
          _callback = cb;
          setTimeout(_flushCallback, 0);
        }
      };

      requestHostTimeout = function requestHostTimeout(cb, ms) {
        _timeoutID = setTimeout(cb, ms);
      };

      cancelHostTimeout = function cancelHostTimeout() {
        clearTimeout(_timeoutID);
      };

      exports.unstable_shouldYield = function () {
        return false;
      };

      requestPaint = exports.unstable_forceFrameRate = function () {};
    } else {
      // Capture local references to native APIs, in case a polyfill overrides them.
      var _setTimeout = window.setTimeout;
      var _clearTimeout = window.clearTimeout;

      if (typeof console !== 'undefined') {
        // TODO: Scheduler no longer requires these methods to be polyfilled. But
        // maybe we want to continue warning if they don't exist, to preserve the
        // option to rely on it in the future?
        var requestAnimationFrame = window.requestAnimationFrame;
        var cancelAnimationFrame = window.cancelAnimationFrame;

        if (typeof requestAnimationFrame !== 'function') {
          // Using console['error'] to evade Babel and ESLint
          console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://reactjs.org/link/react-polyfills');
        }

        if (typeof cancelAnimationFrame !== 'function') {
          // Using console['error'] to evade Babel and ESLint
          console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://reactjs.org/link/react-polyfills');
        }
      }

      var isMessageLoopRunning = false;
      var scheduledHostCallback = null;
      var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
      // thread, like user events. By default, it yields multiple times per frame.
      // It does not attempt to align with frame boundaries, since most tasks don't
      // need to be frame aligned; for those that do, use requestAnimationFrame.

      var yieldInterval = 5;
      var deadline = 0; // TODO: Make this configurable

      {
        // `isInputPending` is not available. Since we have no way of knowing if
        // there's pending input, always yield at the end of the frame.
        exports.unstable_shouldYield = function () {
          return exports.unstable_now() >= deadline;
        }; // Since we yield every frame regardless, `requestPaint` has no effect.


        requestPaint = function requestPaint() {};
      }

      exports.unstable_forceFrameRate = function (fps) {
        if (fps < 0 || fps > 125) {
          // Using console['error'] to evade Babel and ESLint
          console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
          return;
        }

        if (fps > 0) {
          yieldInterval = Math.floor(1000 / fps);
        } else {
          // reset the framerate
          yieldInterval = 5;
        }
      };

      var performWorkUntilDeadline = function performWorkUntilDeadline() {
        if (scheduledHostCallback !== null) {
          var currentTime = exports.unstable_now(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
          // cycle. This means there's always time remaining at the beginning of
          // the message event.

          deadline = currentTime + yieldInterval;
          var hasTimeRemaining = true;

          try {
            var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);

            if (!hasMoreWork) {
              isMessageLoopRunning = false;
              scheduledHostCallback = null;
            } else {
              // If there's more work, schedule the next message event at the end
              // of the preceding one.
              port.postMessage(null);
            }
          } catch (error) {
            // If a scheduler task throws, exit the current browser task so the
            // error can be observed.
            port.postMessage(null);
            throw error;
          }
        } else {
          isMessageLoopRunning = false;
        } // Yielding to the browser will give it a chance to paint, so we can

      };

      var channel = new MessageChannel();
      var port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;

      _requestHostCallback = function _requestHostCallback(callback) {
        scheduledHostCallback = callback;

        if (!isMessageLoopRunning) {
          isMessageLoopRunning = true;
          port.postMessage(null);
        }
      };

      requestHostTimeout = function requestHostTimeout(callback, ms) {
        taskTimeoutID = _setTimeout(function () {
          callback(exports.unstable_now());
        }, ms);
      };

      cancelHostTimeout = function cancelHostTimeout() {
        _clearTimeout(taskTimeoutID);

        taskTimeoutID = -1;
      };
    }

    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      siftUp(heap, node, index);
    }

    function peek(heap) {
      var first = heap[0];
      return first === undefined ? null : first;
    }

    function pop(heap) {
      var first = heap[0];

      if (first !== undefined) {
        var last = heap.pop();

        if (last !== first) {
          heap[0] = last;
          siftDown(heap, last, 0);
        }

        return first;
      } else {
        return null;
      }
    }

    function siftUp(heap, node, i) {
      var index = i;

      while (true) {
        var parentIndex = index - 1 >>> 1;
        var parent = heap[parentIndex];

        if (parent !== undefined && compare(parent, node) > 0) {
          // The parent is larger. Swap positions.
          heap[parentIndex] = node;
          heap[index] = parent;
          index = parentIndex;
        } else {
          // The parent is smaller. Exit.
          return;
        }
      }
    }

    function siftDown(heap, node, i) {
      var index = i;
      var length = heap.length;

      while (index < length) {
        var leftIndex = (index + 1) * 2 - 1;
        var left = heap[leftIndex];
        var rightIndex = leftIndex + 1;
        var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

        if (left !== undefined && compare(left, node) < 0) {
          if (right !== undefined && compare(right, left) < 0) {
            heap[index] = right;
            heap[rightIndex] = node;
            index = rightIndex;
          } else {
            heap[index] = left;
            heap[leftIndex] = node;
            index = leftIndex;
          }
        } else if (right !== undefined && compare(right, node) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          // Neither child is smaller. Exit.
          return;
        }
      }
    }

    function compare(a, b) {
      // Compare sort index first, then task id.
      var diff = a.sortIndex - b.sortIndex;
      return diff !== 0 ? diff : a.id - b.id;
    } // TODO: Use symbols?


    var ImmediatePriority = 1;
    var UserBlockingPriority = 2;
    var NormalPriority = 3;
    var LowPriority = 4;
    var IdlePriority = 5;

    function markTaskErrored(task, ms) {}
    /* eslint-disable no-var */
    // Math.pow(2, 30) - 1
    // 0b111111111111111111111111111111


    var maxSigned31BitInt = 1073741823; // Times out immediately

    var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

    var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
    var NORMAL_PRIORITY_TIMEOUT = 5000;
    var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

    var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap

    var taskQueue = [];
    var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

    var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.

    var currentTask = null;
    var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

    var isPerformingWork = false;
    var isHostCallbackScheduled = false;
    var isHostTimeoutScheduled = false;

    function advanceTimers(currentTime) {
      // Check for tasks that are no longer delayed and add them to the queue.
      var timer = peek(timerQueue);

      while (timer !== null) {
        if (timer.callback === null) {
          // Timer was cancelled.
          pop(timerQueue);
        } else if (timer.startTime <= currentTime) {
          // Timer fired. Transfer to the task queue.
          pop(timerQueue);
          timer.sortIndex = timer.expirationTime;
          push(taskQueue, timer);
        } else {
          // Remaining timers are pending.
          return;
        }

        timer = peek(timerQueue);
      }
    }

    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);

      if (!isHostCallbackScheduled) {
        if (peek(taskQueue) !== null) {
          isHostCallbackScheduled = true;

          _requestHostCallback(flushWork);
        } else {
          var firstTimer = peek(timerQueue);

          if (firstTimer !== null) {
            requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
        }
      }
    }

    function flushWork(hasTimeRemaining, initialTime) {
      isHostCallbackScheduled = false;

      if (isHostTimeoutScheduled) {
        // We scheduled a timeout but it's no longer needed. Cancel it.
        isHostTimeoutScheduled = false;
        cancelHostTimeout();
      }

      isPerformingWork = true;
      var previousPriorityLevel = currentPriorityLevel;

      try {
        if (enableProfiling) {
          try {
            return workLoop(hasTimeRemaining, initialTime);
          } catch (error) {
            if (currentTask !== null) {
              var currentTime = exports.unstable_now();
              markTaskErrored(currentTask, currentTime);
              currentTask.isQueued = false;
            }

            throw error;
          }
        } else {
          // No catch in prod code path.
          return workLoop(hasTimeRemaining, initialTime);
        }
      } finally {
        currentTask = null;
        currentPriorityLevel = previousPriorityLevel;
        isPerformingWork = false;
      }
    }

    function workLoop(hasTimeRemaining, initialTime) {
      var currentTime = initialTime;
      advanceTimers(currentTime);
      currentTask = peek(taskQueue);

      while (currentTask !== null && !enableSchedulerDebugging) {
        if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || exports.unstable_shouldYield())) {
          // This currentTask hasn't expired, and we've reached the deadline.
          break;
        }

        var callback = currentTask.callback;

        if (typeof callback === 'function') {
          currentTask.callback = null;
          currentPriorityLevel = currentTask.priorityLevel;
          var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
          var continuationCallback = callback(didUserCallbackTimeout);
          currentTime = exports.unstable_now();

          if (typeof continuationCallback === 'function') {
            currentTask.callback = continuationCallback;
          } else {
            if (currentTask === peek(taskQueue)) {
              pop(taskQueue);
            }
          }

          advanceTimers(currentTime);
        } else {
          pop(taskQueue);
        }

        currentTask = peek(taskQueue);
      } // Return whether there's additional work


      if (currentTask !== null) {
        return true;
      } else {
        var firstTimer = peek(timerQueue);

        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }

        return false;
      }
    }

    function unstable_runWithPriority(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case ImmediatePriority:
        case UserBlockingPriority:
        case NormalPriority:
        case LowPriority:
        case IdlePriority:
          break;

        default:
          priorityLevel = NormalPriority;
      }

      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;

      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    }

    function unstable_next(eventHandler) {
      var priorityLevel;

      switch (currentPriorityLevel) {
        case ImmediatePriority:
        case UserBlockingPriority:
        case NormalPriority:
          // Shift down to normal priority
          priorityLevel = NormalPriority;
          break;

        default:
          // Anything lower than normal priority should remain at the current level.
          priorityLevel = currentPriorityLevel;
          break;
      }

      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;

      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    }

    function unstable_wrapCallback(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function () {
        // This is a fork of runWithPriority, inlined for performance.
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;

        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    }

    function unstable_scheduleCallback(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      var startTime;

      if (typeof options === 'object' && options !== null) {
        var delay = options.delay;

        if (typeof delay === 'number' && delay > 0) {
          startTime = currentTime + delay;
        } else {
          startTime = currentTime;
        }
      } else {
        startTime = currentTime;
      }

      var timeout;

      switch (priorityLevel) {
        case ImmediatePriority:
          timeout = IMMEDIATE_PRIORITY_TIMEOUT;
          break;

        case UserBlockingPriority:
          timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
          break;

        case IdlePriority:
          timeout = IDLE_PRIORITY_TIMEOUT;
          break;

        case LowPriority:
          timeout = LOW_PRIORITY_TIMEOUT;
          break;

        case NormalPriority:
        default:
          timeout = NORMAL_PRIORITY_TIMEOUT;
          break;
      }

      var expirationTime = startTime + timeout;
      var newTask = {
        id: taskIdCounter++,
        callback: callback,
        priorityLevel: priorityLevel,
        startTime: startTime,
        expirationTime: expirationTime,
        sortIndex: -1
      };

      if (startTime > currentTime) {
        // This is a delayed task.
        newTask.sortIndex = startTime;
        push(timerQueue, newTask);

        if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
          // All tasks are delayed, and this is the task with the earliest delay.
          if (isHostTimeoutScheduled) {
            // Cancel an existing timeout.
            cancelHostTimeout();
          } else {
            isHostTimeoutScheduled = true;
          } // Schedule a timeout.


          requestHostTimeout(handleTimeout, startTime - currentTime);
        }
      } else {
        newTask.sortIndex = expirationTime;
        push(taskQueue, newTask); // wait until the next time we yield.

        if (!isHostCallbackScheduled && !isPerformingWork) {
          isHostCallbackScheduled = true;

          _requestHostCallback(flushWork);
        }
      }

      return newTask;
    }

    function unstable_pauseExecution() {}

    function unstable_continueExecution() {
      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;

        _requestHostCallback(flushWork);
      }
    }

    function unstable_getFirstCallbackNode() {
      return peek(taskQueue);
    }

    function unstable_cancelCallback(task) {
      // remove from the queue because you can't remove arbitrary nodes from an
      // array based heap, only the first one.)
      task.callback = null;
    }

    function unstable_getCurrentPriorityLevel() {
      return currentPriorityLevel;
    }

    var unstable_requestPaint = requestPaint;
    var unstable_Profiling = null;
    exports.unstable_IdlePriority = IdlePriority;
    exports.unstable_ImmediatePriority = ImmediatePriority;
    exports.unstable_LowPriority = LowPriority;
    exports.unstable_NormalPriority = NormalPriority;
    exports.unstable_Profiling = unstable_Profiling;
    exports.unstable_UserBlockingPriority = UserBlockingPriority;
    exports.unstable_cancelCallback = unstable_cancelCallback;
    exports.unstable_continueExecution = unstable_continueExecution;
    exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
    exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
    exports.unstable_next = unstable_next;
    exports.unstable_pauseExecution = unstable_pauseExecution;
    exports.unstable_requestPaint = unstable_requestPaint;
    exports.unstable_runWithPriority = unstable_runWithPriority;
    exports.unstable_scheduleCallback = unstable_scheduleCallback;
    exports.unstable_wrapCallback = unstable_wrapCallback;
  })();
}

/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/scheduler/index.js":
/*!************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/scheduler/index.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ "../../tenon/packages/tenon-react/node_modules/scheduler/cjs/scheduler.development.js");
}

/***/ }),

/***/ "../../tenon/packages/tenon-react/node_modules/scheduler/tracing.js":
/*!**************************************************************************!*\
  !*** ../../tenon/packages/tenon-react/node_modules/scheduler/tracing.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/scheduler-tracing.development.js */ "../../tenon/packages/tenon-react/node_modules/scheduler/cjs/scheduler-tracing.development.js");
}

/***/ }),

/***/ "../../tenon/packages/tenon-utils/dist/tenon-utils.es.js":
/*!***************************************************************!*\
  !*** ../../tenon/packages/tenon-utils/dist/tenon-utils.es.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ELEMNT_TAG_MAP": () => (/* binding */ ELEMNT_TAG_MAP),
/* harmony export */   "NODE_ANCHOR": () => (/* binding */ NODE_ANCHOR),
/* harmony export */   "NODE_ANIMATION_VIEW": () => (/* binding */ NODE_ANIMATION_VIEW),
/* harmony export */   "NODE_BUTTON": () => (/* binding */ NODE_BUTTON),
/* harmony export */   "NODE_COMMENT": () => (/* binding */ NODE_COMMENT),
/* harmony export */   "NODE_DIALOG": () => (/* binding */ NODE_DIALOG),
/* harmony export */   "NODE_IMAGE": () => (/* binding */ NODE_IMAGE),
/* harmony export */   "NODE_INPUT": () => (/* binding */ NODE_INPUT),
/* harmony export */   "NODE_LIST": () => (/* binding */ NODE_LIST),
/* harmony export */   "NODE_LOADMORE": () => (/* binding */ NODE_LOADMORE),
/* harmony export */   "NODE_REFRESH": () => (/* binding */ NODE_REFRESH),
/* harmony export */   "NODE_SCROLLER": () => (/* binding */ NODE_SCROLLER),
/* harmony export */   "NODE_SWITCH": () => (/* binding */ NODE_SWITCH),
/* harmony export */   "NODE_TEXT": () => (/* binding */ NODE_TEXT),
/* harmony export */   "NODE_TEXTAREA": () => (/* binding */ NODE_TEXTAREA),
/* harmony export */   "NODE_VIEW": () => (/* binding */ NODE_VIEW),
/* harmony export */   "NODE_VIEW_PAGER": () => (/* binding */ NODE_VIEW_PAGER),
/* harmony export */   "NativeTags": () => (/* binding */ NativeTags),
/* harmony export */   "camelize": () => (/* binding */ camelize),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "getColor": () => (/* binding */ getColor),
/* harmony export */   "getEnvironmentInfo": () => (/* binding */ getEnvironmentInfo),
/* harmony export */   "isCustomNativeTag": () => (/* binding */ isCustomNativeTag),
/* harmony export */   "isNativeTags": () => (/* binding */ isNativeTags),
/* harmony export */   "makeMap": () => (/* binding */ makeMap),
/* harmony export */   "makeMapByArr": () => (/* binding */ makeMapByArr),
/* harmony export */   "parseStringStyle": () => (/* binding */ parseStringStyle),
/* harmony export */   "styleDynamicTransformer": () => (/* binding */ styleDynamicTransformer),
/* harmony export */   "styleTransformer": () => (/* binding */ styleTransformer),
/* harmony export */   "transformUnitValue": () => (/* binding */ transformUnitValue),
/* harmony export */   "traverseArr": () => (/* binding */ traverseArr)
/* harmony export */ });
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "../../../hummer-cli/packages/plugin-build/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");




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
  var lengthReg = /^[\d\.]+(%|rem|hm|cpx|px|vw|vh)?$/;
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
    shadowItems = [].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__.default)(values.slice(0, values.indexOf('rgb')).trim().split(/\s/)), [values.slice(values.indexOf('rgb'))]);
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
      _style$width$split2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(_style$width$split, 3),
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
      _value$split2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(_value$split, 3),
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

  var _values = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(values, 2),
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
  var _values2 = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(values, 3),
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
  tempArray = (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__.default)(transitonValues);

  if (transitonValues.length === 2) {
    tempArray = [].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__.default)(transitonValues), ['ease', '0s']);
  } else if (transitonValues.length === 3) {
    if (isTime(transitonValues[2])) {
      tempArray = [transitonValues[0], transitonValues[1], 'ease', transitonValues[2]];
    } else {
      tempArray = [].concat((0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__.default)(transitonValues), ['0s']);
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
    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.default)(this, StyleTransformer);

    this.middlewares = [];
    this.registerMiddleware();
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.default)(StyleTransformer, [{
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
    (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.default)(this, StyleDynamicTransformer);

    this.middlewares = [];
    this.registerMiddleware();
  }

  (0,_Users_didi_Documents_GitHub_hummer_cli_packages_plugin_build_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.default)(StyleDynamicTransformer, [{
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
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
/* harmony import */ var _hummer_tenon_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @hummer/tenon-react */ "../../tenon/packages/tenon-react/dist/tenon-react.cjs.js");
/* harmony import */ var _hummer_tenon_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_hummer_tenon_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.less */ "./src/main/App.less");




_hummer_tenon_react__WEBPACK_IMPORTED_MODULE_2__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_App__WEBPACK_IMPORTED_MODULE_1__.default, null));
})();

/******/ })()
;
//# sourceMappingURL=http://172.23.165.19:8000/main.js.map