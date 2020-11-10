var Storage = function (_Base) {
    _inherits(Storage, _Base);

    function Storage() {
        var _ref;

        _classCallCheck(this, Storage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = Storage.__proto__ || Object.getPrototypeOf(Storage)).call.apply(_ref, [this, 'Storage'].concat(args)));
    }

    _createClass(Storage, null, [{
        key: 'set',
        value: function set() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Storage', 0, 'set'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'get',
        value: function get() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['Storage', 0, 'get'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'remove',
        value: function remove() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Storage', 0, 'remove'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'exist',
        value: function exist() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['Storage', 0, 'exist'].concat(_toConsumableArray(args)));
        }
    }]);

    return Storage;
}(Base);
__GLOBAL__.Storage = Storage;
var Location = function (_Base2) {
    _inherits(Location, _Base2);

    function Location() {
        var _ref2;

        _classCallCheck(this, Location);

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return _possibleConstructorReturn(this, (_ref2 = Location.__proto__ || Object.getPrototypeOf(Location)).call.apply(_ref2, [this, 'HMLocation'].concat(args)));
    }

    _createClass(Location, [{
        key: 'getLastLocation',
        value: function getLastLocation() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                args[_key7] = arguments[_key7];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HMLocation', this.objID, 'getLastLocation'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'startLocation',
        value: function startLocation() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HMLocation', this.objID, 'startLocation'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'stopLocation',
        value: function stopLocation() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                args[_key9] = arguments[_key9];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HMLocation', this.objID, 'stopLocation'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'onError',
        value: function onError() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = arguments[_key10];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HMLocation', this.objID, 'onError'].concat(_toConsumableArray(args)));
        }
    }]);

    return Location;
}(Base);
__GLOBAL__.Location = Location;
var Navigator = function (_Base3) {
    _inherits(Navigator, _Base3);

    function Navigator() {
        var _ref3;

        _classCallCheck(this, Navigator);

        for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
            args[_key11] = arguments[_key11];
        }

        return _possibleConstructorReturn(this, (_ref3 = Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call.apply(_ref3, [this, 'Navigator'].concat(args)));
    }

    _createClass(Navigator, null, [{
        key: 'openPage',
        value: function openPage() {
            for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                args[_key12] = arguments[_key12];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Navigator', 0, 'openPage'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'popPage',
        value: function popPage() {
            for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                args[_key13] = arguments[_key13];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Navigator', 0, 'popPage'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'popToPage',
        value: function popToPage() {
            for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                args[_key14] = arguments[_key14];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Navigator', 0, 'popToPage'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'popToRootPage',
        value: function popToRootPage() {
            for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                args[_key15] = arguments[_key15];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Navigator', 0, 'popToRootPage'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'popBack',
        value: function popBack() {
            for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                args[_key16] = arguments[_key16];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Navigator', 0, 'popBack'].concat(_toConsumableArray(args)));
        }
    }]);

    return Navigator;
}(Base);
__GLOBAL__.Navigator = Navigator;
var Timer = function (_Base4) {
    _inherits(Timer, _Base4);

    function Timer() {
        var _ref4;

        _classCallCheck(this, Timer);

        for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
            args[_key17] = arguments[_key17];
        }

        return _possibleConstructorReturn(this, (_ref4 = Timer.__proto__ || Object.getPrototypeOf(Timer)).call.apply(_ref4, [this, 'Timer'].concat(args)));
    }

    _createClass(Timer, [{
        key: 'setInterval',
        value: function setInterval() {
            for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                args[_key18] = arguments[_key18];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Timer', this.objID, 'setInterval'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'clearInterval',
        value: function clearInterval() {
            for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                args[_key19] = arguments[_key19];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Timer', this.objID, 'clearInterval'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'setTimeout',
        value: function setTimeout() {
            for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                args[_key20] = arguments[_key20];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Timer', this.objID, 'setTimeout'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'clearTimeout',
        value: function clearTimeout() {
            for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                args[_key21] = arguments[_key21];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Timer', this.objID, 'clearTimeout'].concat(_toConsumableArray(args)));
        }
    }]);

    return Timer;
}(Base);
__GLOBAL__.Timer = Timer;
var WebSocket = function (_Base5) {
    _inherits(WebSocket, _Base5);

    function WebSocket() {
        var _ref5;

        _classCallCheck(this, WebSocket);

        for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
            args[_key22] = arguments[_key22];
        }

        return _possibleConstructorReturn(this, (_ref5 = WebSocket.__proto__ || Object.getPrototypeOf(WebSocket)).call.apply(_ref5, [this, 'WebSocket'].concat(args)));
    }

    _createClass(WebSocket, null, [{
        key: 'connect',
        value: function connect() {
            for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
                args[_key23] = arguments[_key23];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'connect'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'close',
        value: function close() {
            for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
                args[_key24] = arguments[_key24];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'close'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'send',
        value: function send() {
            for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
                args[_key25] = arguments[_key25];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'send'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'onOpen',
        value: function onOpen() {
            for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
                args[_key26] = arguments[_key26];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'onOpen'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'onClose',
        value: function onClose() {
            for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
                args[_key27] = arguments[_key27];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'onClose'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'onError',
        value: function onError() {
            for (var _len28 = arguments.length, args = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
                args[_key28] = arguments[_key28];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'onError'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'onMessage',
        value: function onMessage() {
            for (var _len29 = arguments.length, args = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
                args[_key29] = arguments[_key29];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['WebSocket', 0, 'onMessage'].concat(_toConsumableArray(args)));
        }
    }]);

    return WebSocket;
}(Base);
__GLOBAL__.WebSocket = WebSocket;
var Memory = function (_Base6) {
    _inherits(Memory, _Base6);

    function Memory() {
        var _ref6;

        _classCallCheck(this, Memory);

        for (var _len30 = arguments.length, args = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
            args[_key30] = arguments[_key30];
        }

        return _possibleConstructorReturn(this, (_ref6 = Memory.__proto__ || Object.getPrototypeOf(Memory)).call.apply(_ref6, [this, 'Memory'].concat(args)));
    }

    _createClass(Memory, null, [{
        key: 'set',
        value: function set() {
            for (var _len31 = arguments.length, args = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
                args[_key31] = arguments[_key31];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Memory', 0, 'set'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'get',
        value: function get() {
            for (var _len32 = arguments.length, args = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
                args[_key32] = arguments[_key32];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['Memory', 0, 'get'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'remove',
        value: function remove() {
            for (var _len33 = arguments.length, args = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
                args[_key33] = arguments[_key33];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Memory', 0, 'remove'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'exist',
        value: function exist() {
            for (var _len34 = arguments.length, args = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
                args[_key34] = arguments[_key34];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['Memory', 0, 'exist'].concat(_toConsumableArray(args)));
        }
    }]);

    return Memory;
}(Base);
__GLOBAL__.Memory = Memory;
var Request = function (_Base7) {
    _inherits(Request, _Base7);

    function Request() {
        var _ref7;

        _classCallCheck(this, Request);

        for (var _len35 = arguments.length, args = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
            args[_key35] = arguments[_key35];
        }

        return _possibleConstructorReturn(this, (_ref7 = Request.__proto__ || Object.getPrototypeOf(Request)).call.apply(_ref7, [this, 'Request'].concat(args)));
    }

    _createClass(Request, [{
        key: 'send',
        value: function send() {
            for (var _len36 = arguments.length, args = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
                args[_key36] = arguments[_key36];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Request', this.objID, 'send'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'url',
        set: function set(arg) {
            this._url = arg;
            arg = transSingleArg(arg);
            invoke('Request', this.objID, 'setUrl', arg);
        },
        get: function get() {
            return this._url;
        }
    }, {
        key: 'method',
        set: function set(arg) {
            this._method = arg;
            arg = transSingleArg(arg);
            invoke('Request', this.objID, 'setMethod', arg);
        },
        get: function get() {
            return this._method;
        }
    }, {
        key: 'timeout',
        set: function set(arg) {
            this._timeout = arg;
            arg = transSingleArg(arg);
            invoke('Request', this.objID, 'setTimeout', arg);
        },
        get: function get() {
            return this._timeout;
        }
    }, {
        key: 'header',
        set: function set(arg) {
            this._header = arg;
            arg = transSingleArg(arg);
            invoke('Request', this.objID, 'setHeader', arg);
        },
        get: function get() {
            return this._header;
        }
    }, {
        key: 'param',
        set: function set(arg) {
            this._param = arg;
            arg = transSingleArg(arg);
            invoke('Request', this.objID, 'setParam', arg);
        },
        get: function get() {
            return this._param;
        }
    }]);

    return Request;
}(Base);
__GLOBAL__.Request = Request;
var BasicAnimation = function (_Base8) {
    _inherits(BasicAnimation, _Base8);

    function BasicAnimation() {
        var _ref8;

        _classCallCheck(this, BasicAnimation);

        for (var _len37 = arguments.length, args = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
            args[_key37] = arguments[_key37];
        }

        return _possibleConstructorReturn(this, (_ref8 = BasicAnimation.__proto__ || Object.getPrototypeOf(BasicAnimation)).call.apply(_ref8, [this, 'BasicAnimation'].concat(args)));
    }

    _createClass(BasicAnimation, [{
        key: 'on',
        value: function on() {
            for (var _len38 = arguments.length, args = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
                args[_key38] = arguments[_key38];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['BasicAnimation', this.objID, 'on'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'value',
        set: function set(arg) {
            this._value = arg;
            arg = transSingleArg(arg);
            invoke('BasicAnimation', this.objID, 'setValue', arg);
        },
        get: function get() {
            return this._value;
        }
    }, {
        key: 'duration',
        set: function set(arg) {
            this._duration = arg;
            arg = transSingleArg(arg);
            invoke('BasicAnimation', this.objID, 'setDuration', arg);
        },
        get: function get() {
            return this._duration;
        }
    }, {
        key: 'delay',
        set: function set(arg) {
            this._delay = arg;
            arg = transSingleArg(arg);
            invoke('BasicAnimation', this.objID, 'setDelay', arg);
        },
        get: function get() {
            return this._delay;
        }
    }, {
        key: 'repeatCount',
        set: function set(arg) {
            this._repeatCount = arg;
            arg = transSingleArg(arg);
            invoke('BasicAnimation', this.objID, 'setRepeatCount', arg);
        },
        get: function get() {
            return this._repeatCount;
        }
    }, {
        key: 'easing',
        set: function set(arg) {
            this._easing = arg;
            arg = transSingleArg(arg);
            invoke('BasicAnimation', this.objID, 'setEasing', arg);
        },
        get: function get() {
            return this._easing;
        }
    }]);

    return BasicAnimation;
}(Base);
__GLOBAL__.BasicAnimation = BasicAnimation;
var KeyframeAnimation = function (_Base9) {
    _inherits(KeyframeAnimation, _Base9);

    function KeyframeAnimation() {
        var _ref9;

        _classCallCheck(this, KeyframeAnimation);

        for (var _len39 = arguments.length, args = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
            args[_key39] = arguments[_key39];
        }

        return _possibleConstructorReturn(this, (_ref9 = KeyframeAnimation.__proto__ || Object.getPrototypeOf(KeyframeAnimation)).call.apply(_ref9, [this, 'KeyframeAnimation'].concat(args)));
    }

    _createClass(KeyframeAnimation, [{
        key: 'on',
        value: function on() {
            for (var _len40 = arguments.length, args = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
                args[_key40] = arguments[_key40];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['KeyframeAnimation', this.objID, 'on'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'keyframes',
        set: function set(arg) {
            this._keyframes = arg;
            arg = transSingleArg(arg);
            invoke('KeyframeAnimation', this.objID, 'setKeyframes', arg);
        },
        get: function get() {
            return this._keyframes;
        }
    }, {
        key: 'value',
        set: function set(arg) {
            this._value = arg;
            arg = transSingleArg(arg);
            invoke('KeyframeAnimation', this.objID, 'setValue', arg);
        },
        get: function get() {
            return this._value;
        }
    }, {
        key: 'duration',
        set: function set(arg) {
            this._duration = arg;
            arg = transSingleArg(arg);
            invoke('KeyframeAnimation', this.objID, 'setDuration', arg);
        },
        get: function get() {
            return this._duration;
        }
    }, {
        key: 'delay',
        set: function set(arg) {
            this._delay = arg;
            arg = transSingleArg(arg);
            invoke('KeyframeAnimation', this.objID, 'setDelay', arg);
        },
        get: function get() {
            return this._delay;
        }
    }, {
        key: 'repeatCount',
        set: function set(arg) {
            this._repeatCount = arg;
            arg = transSingleArg(arg);
            invoke('KeyframeAnimation', this.objID, 'setRepeatCount', arg);
        },
        get: function get() {
            return this._repeatCount;
        }
    }, {
        key: 'easing',
        set: function set(arg) {
            this._easing = arg;
            arg = transSingleArg(arg);
            invoke('KeyframeAnimation', this.objID, 'setEasing', arg);
        },
        get: function get() {
            return this._easing;
        }
    }]);

    return KeyframeAnimation;
}(Base);
__GLOBAL__.KeyframeAnimation = KeyframeAnimation;