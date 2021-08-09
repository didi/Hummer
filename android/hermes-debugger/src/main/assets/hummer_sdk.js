var Storage = /*#__PURE__*/function (_Base) {
  _inherits(Storage, _Base);

  var _super = _createSuper(Storage);

  function Storage(...args) {
    _classCallCheck(this, Storage);

    return _super.call(this, 'Storage', ...args);
  }

  _createClass(Storage, null, [{
    key: "set",
    value: function set(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Storage', 0, 'set', ...args);
    }
  }, {
    key: "get",
    value: function get(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('Storage', 0, 'get', ...args);
    }
  }, {
    key: "remove",
    value: function remove(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Storage', 0, 'remove', ...args);
    }
  }, {
    key: "removeAll",
    value: function removeAll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Storage', 0, 'removeAll', ...args);
    }
  }, {
    key: "exist",
    value: function exist(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('Storage', 0, 'exist', ...args);
    }
  }]);

  return Storage;
}(Base);

__GLOBAL__.Storage = Storage;

var Location = /*#__PURE__*/function (_Base2) {
  _inherits(Location, _Base2);

  var _super2 = _createSuper(Location);

  function Location(...args) {
    _classCallCheck(this, Location);

    return _super2.call(this, 'Location', ...args);
  }

  _createClass(Location, [{
    key: "getLastLocation",
    value: function getLastLocation(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Location', this.objID, 'getLastLocation', ...args);
    }
  }, {
    key: "startLocation",
    value: function startLocation(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Location', this.objID, 'startLocation', ...args);
    }
  }, {
    key: "stopLocation",
    value: function stopLocation(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Location', this.objID, 'stopLocation', ...args);
    }
  }, {
    key: "onError",
    value: function onError(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Location', this.objID, 'onError', ...args);
    }
  }]);

  return Location;
}(Base);

__GLOBAL__.Location = Location;

var Navigator = /*#__PURE__*/function (_Base3) {
  _inherits(Navigator, _Base3);

  var _super3 = _createSuper(Navigator);

  function Navigator(...args) {
    _classCallCheck(this, Navigator);

    return _super3.call(this, 'Navigator', ...args);
  }

  _createClass(Navigator, null, [{
    key: "openPage",
    value: function openPage(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Navigator', 0, 'openPage', ...args);
    }
  }, {
    key: "popPage",
    value: function popPage(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Navigator', 0, 'popPage', ...args);
    }
  }, {
    key: "popToPage",
    value: function popToPage(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Navigator', 0, 'popToPage', ...args);
    }
  }, {
    key: "popToRootPage",
    value: function popToRootPage(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Navigator', 0, 'popToRootPage', ...args);
    }
  }, {
    key: "popBack",
    value: function popBack(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Navigator', 0, 'popBack', ...args);
    }
  }]);

  return Navigator;
}(Base);

__GLOBAL__.Navigator = Navigator;

var Timer = /*#__PURE__*/function (_Base4) {
  _inherits(Timer, _Base4);

  var _super4 = _createSuper(Timer);

  function Timer(...args) {
    _classCallCheck(this, Timer);

    return _super4.call(this, 'Timer', ...args);
  }

  _createClass(Timer, [{
    key: "setInterval",
    value: function setInterval(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Timer', this.objID, 'setInterval', ...args);
    }
  }, {
    key: "clearInterval",
    value: function clearInterval(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Timer', this.objID, 'clearInterval', ...args);
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Timer', this.objID, 'setTimeout', ...args);
    }
  }, {
    key: "clearTimeout",
    value: function clearTimeout(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Timer', this.objID, 'clearTimeout', ...args);
    }
  }]);

  return Timer;
}(Base);

__GLOBAL__.Timer = Timer;

var WebSocket = /*#__PURE__*/function (_Base5) {
  _inherits(WebSocket, _Base5);

  var _super5 = _createSuper(WebSocket);

  function WebSocket(...args) {
    _classCallCheck(this, WebSocket);

    return _super5.call(this, 'WebSocket', ...args);
  }

  _createClass(WebSocket, null, [{
    key: "connect",
    value: function connect(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'connect', ...args);
    }
  }, {
    key: "close",
    value: function close(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'close', ...args);
    }
  }, {
    key: "send",
    value: function send(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'send', ...args);
    }
  }, {
    key: "onOpen",
    value: function onOpen(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'onOpen', ...args);
    }
  }, {
    key: "onClose",
    value: function onClose(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'onClose', ...args);
    }
  }, {
    key: "onError",
    value: function onError(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'onError', ...args);
    }
  }, {
    key: "onMessage",
    value: function onMessage(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('WebSocket', 0, 'onMessage', ...args);
    }
  }]);

  return WebSocket;
}(Base);

__GLOBAL__.WebSocket = WebSocket;

var Memory = /*#__PURE__*/function (_Base6) {
  _inherits(Memory, _Base6);

  var _super6 = _createSuper(Memory);

  function Memory(...args) {
    _classCallCheck(this, Memory);

    return _super6.call(this, 'Memory', ...args);
  }

  _createClass(Memory, null, [{
    key: "set",
    value: function set(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Memory', 0, 'set', ...args);
    }
  }, {
    key: "get",
    value: function get(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('Memory', 0, 'get', ...args);
    }
  }, {
    key: "remove",
    value: function remove(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Memory', 0, 'remove', ...args);
    }
  }, {
    key: "removeAll",
    value: function removeAll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Memory', 0, 'removeAll', ...args);
    }
  }, {
    key: "exist",
    value: function exist(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('Memory', 0, 'exist', ...args);
    }
  }]);

  return Memory;
}(Base);

__GLOBAL__.Memory = Memory;

var Request = /*#__PURE__*/function (_Base7) {
  _inherits(Request, _Base7);

  var _super7 = _createSuper(Request);

  function Request(...args) {
    _classCallCheck(this, Request);

    return _super7.call(this, 'Request', ...args);
  }

  _createClass(Request, [{
    key: "send",
    value: function send(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Request', this.objID, 'send', ...args);
    }
  }, {
    key: "url",
    set: function (arg) {
      this._url = arg;
      arg = transSingleArg(arg);
      invoke('Request', this.objID, 'setUrl', arg);
    },
    get: function () {
      return this._url;
    }
  }, {
    key: "method",
    set: function (arg) {
      this._method = arg;
      arg = transSingleArg(arg);
      invoke('Request', this.objID, 'setMethod', arg);
    },
    get: function () {
      return this._method;
    }
  }, {
    key: "timeout",
    set: function (arg) {
      this._timeout = arg;
      arg = transSingleArg(arg);
      invoke('Request', this.objID, 'setTimeout', arg);
    },
    get: function () {
      return this._timeout;
    }
  }, {
    key: "header",
    set: function (arg) {
      this._header = arg;
      arg = transSingleArg(arg);
      invoke('Request', this.objID, 'setHeader', arg);
    },
    get: function () {
      return this._header;
    }
  }, {
    key: "param",
    set: function (arg) {
      this._param = arg;
      arg = transSingleArg(arg);
      invoke('Request', this.objID, 'setParam', arg);
    },
    get: function () {
      return this._param;
    }
  }]);

  return Request;
}(Base);

__GLOBAL__.Request = Request;

var BasicAnimation = /*#__PURE__*/function (_Base8) {
  _inherits(BasicAnimation, _Base8);

  var _super8 = _createSuper(BasicAnimation);

  function BasicAnimation(...args) {
    _classCallCheck(this, BasicAnimation);

    return _super8.call(this, 'BasicAnimation', ...args);
  }

  _createClass(BasicAnimation, [{
    key: "on",
    value: function on(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('BasicAnimation', this.objID, 'on', ...args);
    }
  }, {
    key: "from",
    set: function (arg) {
      this._from = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setFrom', arg);
    },
    get: function () {
      return this._from;
    }
  }, {
    key: "value",
    set: function (arg) {
      this._value = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setValue', arg);
    },
    get: function () {
      return this._value;
    }
  }, {
    key: "duration",
    set: function (arg) {
      this._duration = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setDuration', arg);
    },
    get: function () {
      return this._duration;
    }
  }, {
    key: "delay",
    set: function (arg) {
      this._delay = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setDelay', arg);
    },
    get: function () {
      return this._delay;
    }
  }, {
    key: "easing",
    set: function (arg) {
      this._easing = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setEasing', arg);
    },
    get: function () {
      return this._easing;
    }
  }, {
    key: "repeatCount",
    set: function (arg) {
      this._repeatCount = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setRepeatCount', arg);
    },
    get: function () {
      return this._repeatCount;
    }
  }, {
    key: "repeatMode",
    set: function (arg) {
      this._repeatMode = arg;
      arg = transSingleArg(arg);
      invoke('BasicAnimation', this.objID, 'setRepeatMode', arg);
    },
    get: function () {
      return this._repeatMode;
    }
  }]);

  return BasicAnimation;
}(Base);

__GLOBAL__.BasicAnimation = BasicAnimation;

var KeyframeAnimation = /*#__PURE__*/function (_Base9) {
  _inherits(KeyframeAnimation, _Base9);

  var _super9 = _createSuper(KeyframeAnimation);

  function KeyframeAnimation(...args) {
    _classCallCheck(this, KeyframeAnimation);

    return _super9.call(this, 'KeyframeAnimation', ...args);
  }

  _createClass(KeyframeAnimation, [{
    key: "on",
    value: function on(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('KeyframeAnimation', this.objID, 'on', ...args);
    }
  }, {
    key: "keyframes",
    set: function (arg) {
      this._keyframes = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setKeyframes', arg);
    },
    get: function () {
      return this._keyframes;
    }
  }, {
    key: "from",
    set: function (arg) {
      this._from = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setFrom', arg);
    },
    get: function () {
      return this._from;
    }
  }, {
    key: "value",
    set: function (arg) {
      this._value = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setValue', arg);
    },
    get: function () {
      return this._value;
    }
  }, {
    key: "duration",
    set: function (arg) {
      this._duration = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setDuration', arg);
    },
    get: function () {
      return this._duration;
    }
  }, {
    key: "delay",
    set: function (arg) {
      this._delay = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setDelay', arg);
    },
    get: function () {
      return this._delay;
    }
  }, {
    key: "easing",
    set: function (arg) {
      this._easing = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setEasing', arg);
    },
    get: function () {
      return this._easing;
    }
  }, {
    key: "repeatCount",
    set: function (arg) {
      this._repeatCount = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setRepeatCount', arg);
    },
    get: function () {
      return this._repeatCount;
    }
  }, {
    key: "repeatMode",
    set: function (arg) {
      this._repeatMode = arg;
      arg = transSingleArg(arg);
      invoke('KeyframeAnimation', this.objID, 'setRepeatMode', arg);
    },
    get: function () {
      return this._repeatMode;
    }
  }]);

  return KeyframeAnimation;
}(Base);

__GLOBAL__.KeyframeAnimation = KeyframeAnimation;