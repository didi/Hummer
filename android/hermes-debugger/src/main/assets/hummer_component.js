var Image = function (_Base) {
    _inherits(Image, _Base);

    function Image() {
        var _ref;

        _classCallCheck(this, Image);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = Image.__proto__ || Object.getPrototypeOf(Image)).call.apply(_ref, [this, 'Image'].concat(args)));
    }

    _createClass(Image, [{
        key: 'src',
        set: function set(arg) {
            this._src = arg;
            arg = transSingleArg(arg);
            invoke('Image', this.objID, 'setSrc', arg);
        },
        get: function get() {
            return this._src;
        }
    }, {
        key: 'gifSrc',
        set: function set(arg) {
            this._gifSrc = arg;
            arg = transSingleArg(arg);
            invoke('Image', this.objID, 'setGifSrc', arg);
        },
        get: function get() {
            return this._gifSrc;
        }
    }, {
        key: 'gifRepeatCount',
        set: function set(arg) {
            this._gifRepeatCount = arg;
            arg = transSingleArg(arg);
            invoke('Image', this.objID, 'setGifRepeatCount', arg);
        },
        get: function get() {
            return this._gifRepeatCount;
        }
    }]);

    return Image;
}(Base);
__GLOBAL__.Image = Image;
var Loading = function (_Base2) {
    _inherits(Loading, _Base2);

    function Loading() {
        var _ref2;

        _classCallCheck(this, Loading);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _possibleConstructorReturn(this, (_ref2 = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref2, [this, 'Loading'].concat(args)));
    }

    return Loading;
}(Base);
__GLOBAL__.Loading = Loading;
var TextArea = function (_Base3) {
    _inherits(TextArea, _Base3);

    function TextArea() {
        var _ref3;

        _classCallCheck(this, TextArea);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _possibleConstructorReturn(this, (_ref3 = TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call.apply(_ref3, [this, 'TextArea'].concat(args)));
    }

    _createClass(TextArea, [{
        key: 'text',
        set: function set(arg) {
            this._text = arg;
            arg = transSingleArg(arg);
            invoke('TextArea', this.objID, 'setText', arg);
        },
        get: function get() {
            return invoke('TextArea', this.objID, 'getText');
        }
    }, {
        key: 'placeholder',
        set: function set(arg) {
            this._placeholder = arg;
            arg = transSingleArg(arg);
            invoke('TextArea', this.objID, 'setPlaceholder', arg);
        },
        get: function get() {
            return this._placeholder;
        }
    }, {
        key: 'focused',
        set: function set(arg) {
            this._focused = arg;
            arg = transSingleArg(arg);
            invoke('TextArea', this.objID, 'setFocused', arg);
        },
        get: function get() {
            return this._focused;
        }
    }]);

    return TextArea;
}(Base);
__GLOBAL__.TextArea = TextArea;
var Input = function (_Base4) {
    _inherits(Input, _Base4);

    function Input() {
        var _ref4;

        _classCallCheck(this, Input);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return _possibleConstructorReturn(this, (_ref4 = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref4, [this, 'Input'].concat(args)));
    }

    _createClass(Input, [{
        key: 'text',
        set: function set(arg) {
            this._text = arg;
            arg = transSingleArg(arg);
            invoke('Input', this.objID, 'setText', arg);
        },
        get: function get() {
            return invoke('Input', this.objID, 'getText');
        }
    }, {
        key: 'placeholder',
        set: function set(arg) {
            this._placeholder = arg;
            arg = transSingleArg(arg);
            invoke('Input', this.objID, 'setPlaceholder', arg);
        },
        get: function get() {
            return this._placeholder;
        }
    }, {
        key: 'focused',
        set: function set(arg) {
            this._focused = arg;
            arg = transSingleArg(arg);
            invoke('Input', this.objID, 'setFocused', arg);
        },
        get: function get() {
            return this._focused;
        }
    }]);

    return Input;
}(Base);
__GLOBAL__.Input = Input;
var Switch = function (_Base5) {
    _inherits(Switch, _Base5);

    function Switch() {
        var _ref5;

        _classCallCheck(this, Switch);

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return _possibleConstructorReturn(this, (_ref5 = Switch.__proto__ || Object.getPrototypeOf(Switch)).call.apply(_ref5, [this, 'Switch'].concat(args)));
    }

    _createClass(Switch, [{
        key: 'checked',
        set: function set(arg) {
            this._checked = arg;
            arg = transSingleArg(arg);
            invoke('Switch', this.objID, 'setChecked', arg);
        },
        get: function get() {
            return this._checked;
        }
    }]);

    return Switch;
}(Base);
__GLOBAL__.Switch = Switch;
var Toast = function (_Base6) {
    _inherits(Toast, _Base6);

    function Toast() {
        var _ref6;

        _classCallCheck(this, Toast);

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return _possibleConstructorReturn(this, (_ref6 = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref6, [this, 'Toast'].concat(args)));
    }

    _createClass(Toast, null, [{
        key: 'show',
        value: function show() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                args[_key7] = arguments[_key7];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Toast', 0, 'show'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'custom',
        value: function custom() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Toast', 0, 'custom'].concat(_toConsumableArray(args)));
        }
    }]);

    return Toast;
}(Base);
__GLOBAL__.Toast = Toast;
var Dialog = function (_Base7) {
    _inherits(Dialog, _Base7);

    function Dialog() {
        var _ref7;

        _classCallCheck(this, Dialog);

        for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            args[_key9] = arguments[_key9];
        }

        return _possibleConstructorReturn(this, (_ref7 = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref7, [this, 'Dialog'].concat(args)));
    }

    _createClass(Dialog, [{
        key: 'alert',
        value: function alert() {
            for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = arguments[_key10];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Dialog', this.objID, 'alert'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                args[_key11] = arguments[_key11];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Dialog', this.objID, 'confirm'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'loading',
        value: function loading() {
            for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                args[_key12] = arguments[_key12];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Dialog', this.objID, 'loading'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'custom',
        value: function custom() {
            for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                args[_key13] = arguments[_key13];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Dialog', this.objID, 'custom'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'dismiss',
        value: function dismiss() {
            for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                args[_key14] = arguments[_key14];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Dialog', this.objID, 'dismiss'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'cancelable',
        set: function set(arg) {
            this._cancelable = arg;
            arg = transSingleArg(arg);
            invoke('Dialog', this.objID, 'setCancelable', arg);
        },
        get: function get() {
            return this._cancelable;
        }
    }]);

    return Dialog;
}(Base);
__GLOBAL__.Dialog = Dialog;
var Button = function (_Base8) {
    _inherits(Button, _Base8);

    function Button() {
        var _ref8;

        _classCallCheck(this, Button);

        for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
            args[_key15] = arguments[_key15];
        }

        return _possibleConstructorReturn(this, (_ref8 = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref8, [this, 'Button'].concat(args)));
    }

    _createClass(Button, [{
        key: 'text',
        set: function set(arg) {
            this._text = arg;
            arg = transSingleArg(arg);
            invoke('Button', this.objID, 'setText', arg);
        },
        get: function get() {
            return this._text;
        }
    }, {
        key: 'pressed',
        set: function set(arg) {
            this._pressed = arg;
            arg = transSingleArg(arg);
            invoke('Button', this.objID, 'setPressed', arg);
        },
        get: function get() {
            return this._pressed;
        }
    }, {
        key: 'disabled',
        set: function set(arg) {
            this._disabled = arg;
            arg = transSingleArg(arg);
            invoke('Button', this.objID, 'setDisabled', arg);
        },
        get: function get() {
            return this._disabled;
        }
    }]);

    return Button;
}(Base);
__GLOBAL__.Button = Button;
var List = function (_Base9) {
    _inherits(List, _Base9);

    function List() {
        var _ref9;

        _classCallCheck(this, List);

        for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
            args[_key16] = arguments[_key16];
        }

        return _possibleConstructorReturn(this, (_ref9 = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref9, [this, 'List'].concat(args)));
    }

    _createClass(List, [{
        key: 'refresh',
        value: function refresh() {
            for (var _len17 = arguments.length, args = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                args[_key17] = arguments[_key17];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['List', this.objID, 'refresh'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'stopPullRefresh',
        value: function stopPullRefresh() {
            for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                args[_key18] = arguments[_key18];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['List', this.objID, 'stopPullRefresh'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'stopLoadMore',
        value: function stopLoadMore() {
            for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                args[_key19] = arguments[_key19];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['List', this.objID, 'stopLoadMore'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            for (var _len20 = arguments.length, args = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                args[_key20] = arguments[_key20];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['List', this.objID, 'scrollTo'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollBy',
        value: function scrollBy() {
            for (var _len21 = arguments.length, args = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                args[_key21] = arguments[_key21];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['List', this.objID, 'scrollBy'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollToPosition',
        value: function scrollToPosition() {
            for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
                args[_key22] = arguments[_key22];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['List', this.objID, 'scrollToPosition'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'onLoadMore',
        set: function set(arg) {
            this._onLoadMore = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setOnLoadMore', arg);
        },
        get: function get() {
            return this._onLoadMore;
        }
    }, {
        key: 'loadMoreView',
        set: function set(arg) {
            this._loadMoreView = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setLoadMoreView', arg);
        },
        get: function get() {
            return this._loadMoreView;
        }
    }, {
        key: 'refreshView',
        set: function set(arg) {
            this._refreshView = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setRefreshView', arg);
        },
        get: function get() {
            return this._refreshView;
        }
    }, {
        key: 'onRefresh',
        set: function set(arg) {
            this._onRefresh = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setOnRefresh', arg);
        },
        get: function get() {
            return this._onRefresh;
        }
    }, {
        key: 'onRegister',
        set: function set(arg) {
            this._onRegister = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setOnRegister', arg);
        },
        get: function get() {
            return this._onRegister;
        }
    }, {
        key: 'onCreate',
        set: function set(arg) {
            this._onCreate = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setOnCreate', arg);
        },
        get: function get() {
            return this._onCreate;
        }
    }, {
        key: 'onUpdate',
        set: function set(arg) {
            this._onUpdate = arg;
            arg = transSingleArg(arg);
            invoke('List', this.objID, 'setOnUpdate', arg);
        },
        get: function get() {
            return this._onUpdate;
        }
    }]);

    return List;
}(Base);
__GLOBAL__.List = List;
var View = function (_Base10) {
    _inherits(View, _Base10);

    function View() {
        var _ref10;

        _classCallCheck(this, View);

        for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
            args[_key23] = arguments[_key23];
        }

        return _possibleConstructorReturn(this, (_ref10 = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref10, [this, 'View'].concat(args)));
    }

    _createClass(View, [{
        key: 'appendChild',
        value: function appendChild() {
            for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
                args[_key24] = arguments[_key24];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'appendChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeChild',
        value: function removeChild() {
            for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
                args[_key25] = arguments[_key25];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'removeChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
                args[_key26] = arguments[_key26];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'removeAll'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore() {
            for (var _len27 = arguments.length, args = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
                args[_key27] = arguments[_key27];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'insertBefore'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild() {
            for (var _len28 = arguments.length, args = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
                args[_key28] = arguments[_key28];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'replaceChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'getElementById',
        value: function getElementById() {
            for (var _len29 = arguments.length, args = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
                args[_key29] = arguments[_key29];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['View', this.objID, 'getElementById'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'layout',
        value: function layout() {
            for (var _len30 = arguments.length, args = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
                args[_key30] = arguments[_key30];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'layout'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'empty',
        value: function empty() {
            for (var _len31 = arguments.length, args = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
                args[_key31] = arguments[_key31];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['View', this.objID, 'empty'].concat(_toConsumableArray(args)));
        }
    }]);

    return View;
}(Base);
__GLOBAL__.View = View;
var Text = function (_Base11) {
    _inherits(Text, _Base11);

    function Text() {
        var _ref11;

        _classCallCheck(this, Text);

        for (var _len32 = arguments.length, args = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
            args[_key32] = arguments[_key32];
        }

        return _possibleConstructorReturn(this, (_ref11 = Text.__proto__ || Object.getPrototypeOf(Text)).call.apply(_ref11, [this, 'Text'].concat(args)));
    }

    _createClass(Text, [{
        key: 'text',
        set: function set(arg) {
            this._text = arg;
            arg = transSingleArg(arg);
            invoke('Text', this.objID, 'setText', arg);
        },
        get: function get() {
            return this._text;
        }
    }, {
        key: 'richText',
        set: function set(arg) {
            this._richText = arg;
            arg = transSingleArg(arg);
            invoke('Text', this.objID, 'setRichText', arg);
        },
        get: function get() {
            return this._richText;
        }
    }, {
        key: 'formattedText',
        set: function set(arg) {
            this._formattedText = arg;
            arg = transSingleArg(arg);
            invoke('Text', this.objID, 'setFormattedText', arg);
        },
        get: function get() {
            return this._formattedText;
        }
    }]);

    return Text;
}(Base);
__GLOBAL__.Text = Text;
var Scroller = function (_Base12) {
    _inherits(Scroller, _Base12);

    function Scroller() {
        var _ref12;

        _classCallCheck(this, Scroller);

        for (var _len33 = arguments.length, args = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
            args[_key33] = arguments[_key33];
        }

        return _possibleConstructorReturn(this, (_ref12 = Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call.apply(_ref12, [this, 'Scroller'].concat(args)));
    }

    _createClass(Scroller, [{
        key: 'appendChild',
        value: function appendChild() {
            for (var _len34 = arguments.length, args = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
                args[_key34] = arguments[_key34];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'appendChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeChild',
        value: function removeChild() {
            for (var _len35 = arguments.length, args = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
                args[_key35] = arguments[_key35];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'removeChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            for (var _len36 = arguments.length, args = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
                args[_key36] = arguments[_key36];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'removeAll'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore() {
            for (var _len37 = arguments.length, args = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
                args[_key37] = arguments[_key37];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'insertBefore'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild() {
            for (var _len38 = arguments.length, args = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
                args[_key38] = arguments[_key38];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'replaceChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'getElementById',
        value: function getElementById() {
            for (var _len39 = arguments.length, args = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
                args[_key39] = arguments[_key39];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['Scroller', this.objID, 'getSubview'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'layout',
        value: function layout() {
            for (var _len40 = arguments.length, args = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
                args[_key40] = arguments[_key40];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'layout'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            for (var _len41 = arguments.length, args = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
                args[_key41] = arguments[_key41];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'scrollTo'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollBy',
        value: function scrollBy() {
            for (var _len42 = arguments.length, args = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
                args[_key42] = arguments[_key42];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'scrollBy'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            for (var _len43 = arguments.length, args = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
                args[_key43] = arguments[_key43];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'scrollToTop'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            for (var _len44 = arguments.length, args = Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
                args[_key44] = arguments[_key44];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'scrollToBottom'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'setOnScrollToTopListener',
        value: function setOnScrollToTopListener() {
            for (var _len45 = arguments.length, args = Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
                args[_key45] = arguments[_key45];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'setOnScrollToTopListener'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'setOnScrollToBottomListener',
        value: function setOnScrollToBottomListener() {
            for (var _len46 = arguments.length, args = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
                args[_key46] = arguments[_key46];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'setOnScrollToBottomListener'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'updateContentSize',
        value: function updateContentSize() {
            for (var _len47 = arguments.length, args = Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
                args[_key47] = arguments[_key47];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['Scroller', this.objID, 'updateContentSize'].concat(_toConsumableArray(args)));
        }
    }]);

    return Scroller;
}(Base);
__GLOBAL__.Scroller = Scroller;
var HorizontalScroller = function (_Base13) {
    _inherits(HorizontalScroller, _Base13);

    function HorizontalScroller() {
        var _ref13;

        _classCallCheck(this, HorizontalScroller);

        for (var _len48 = arguments.length, args = Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
            args[_key48] = arguments[_key48];
        }

        return _possibleConstructorReturn(this, (_ref13 = HorizontalScroller.__proto__ || Object.getPrototypeOf(HorizontalScroller)).call.apply(_ref13, [this, 'HorizontalScroller'].concat(args)));
    }

    _createClass(HorizontalScroller, [{
        key: 'appendChild',
        value: function appendChild() {
            for (var _len49 = arguments.length, args = Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
                args[_key49] = arguments[_key49];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'appendChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeChild',
        value: function removeChild() {
            for (var _len50 = arguments.length, args = Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
                args[_key50] = arguments[_key50];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'removeChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'removeAll',
        value: function removeAll() {
            for (var _len51 = arguments.length, args = Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
                args[_key51] = arguments[_key51];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'removeAll'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore() {
            for (var _len52 = arguments.length, args = Array(_len52), _key52 = 0; _key52 < _len52; _key52++) {
                args[_key52] = arguments[_key52];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'insertBefore'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'replaceChild',
        value: function replaceChild() {
            for (var _len53 = arguments.length, args = Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
                args[_key53] = arguments[_key53];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'replaceChild'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'getElementById',
        value: function getElementById() {
            for (var _len54 = arguments.length, args = Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
                args[_key54] = arguments[_key54];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            return invoke.apply(undefined, ['HorizontalScroller', this.objID, 'getSubview'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'layout',
        value: function layout() {
            for (var _len55 = arguments.length, args = Array(_len55), _key55 = 0; _key55 < _len55; _key55++) {
                args[_key55] = arguments[_key55];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'layout'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            for (var _len56 = arguments.length, args = Array(_len56), _key56 = 0; _key56 < _len56; _key56++) {
                args[_key56] = arguments[_key56];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'scrollTo'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollBy',
        value: function scrollBy() {
            for (var _len57 = arguments.length, args = Array(_len57), _key57 = 0; _key57 < _len57; _key57++) {
                args[_key57] = arguments[_key57];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'scrollBy'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            for (var _len58 = arguments.length, args = Array(_len58), _key58 = 0; _key58 < _len58; _key58++) {
                args[_key58] = arguments[_key58];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'scrollToTop'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            for (var _len59 = arguments.length, args = Array(_len59), _key59 = 0; _key59 < _len59; _key59++) {
                args[_key59] = arguments[_key59];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'scrollToBottom'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'setOnScrollToTopListener',
        value: function setOnScrollToTopListener() {
            for (var _len60 = arguments.length, args = Array(_len60), _key60 = 0; _key60 < _len60; _key60++) {
                args[_key60] = arguments[_key60];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'setOnScrollToTopListener'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'setOnScrollToBottomListener',
        value: function setOnScrollToBottomListener() {
            for (var _len61 = arguments.length, args = Array(_len61), _key61 = 0; _key61 < _len61; _key61++) {
                args[_key61] = arguments[_key61];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'setOnScrollToBottomListener'].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'updateContentSize',
        value: function updateContentSize() {
            for (var _len62 = arguments.length, args = Array(_len62), _key62 = 0; _key62 < _len62; _key62++) {
                args[_key62] = arguments[_key62];
            }

            args = transArgs.apply(undefined, _toConsumableArray(args));
            invoke.apply(undefined, ['HorizontalScroller', this.objID, 'updateContentSize'].concat(_toConsumableArray(args)));
        }
    }]);

    return HorizontalScroller;
}(Base);
__GLOBAL__.HorizontalScroller = HorizontalScroller;