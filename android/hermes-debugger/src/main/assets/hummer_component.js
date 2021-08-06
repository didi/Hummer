var Image = /*#__PURE__*/function (_Base) {
  _inherits(Image, _Base);

  var _super = _createSuper(Image);

  function Image(...args) {
    _classCallCheck(this, Image);

    return _super.call(this, 'Image', ...args);
  }

  _createClass(Image, [{
    key: "load",
    value: function load(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Image', this.objID, 'load', ...args);
    }
  }, {
    key: "src",
    set: function (arg) {
      this._src = arg;
      arg = transSingleArg(arg);
      invoke('Image', this.objID, 'setSrc', arg);
    },
    get: function () {
      return this._src;
    }
  }, {
    key: "gifSrc",
    set: function (arg) {
      this._gifSrc = arg;
      arg = transSingleArg(arg);
      invoke('Image', this.objID, 'setGifSrc', arg);
    },
    get: function () {
      return this._gifSrc;
    }
  }, {
    key: "gifRepeatCount",
    set: function (arg) {
      this._gifRepeatCount = arg;
      arg = transSingleArg(arg);
      invoke('Image', this.objID, 'setGifRepeatCount', arg);
    },
    get: function () {
      return this._gifRepeatCount;
    }
  }]);

  return Image;
}(Base);

__GLOBAL__.Image = Image;

var Loading = /*#__PURE__*/function (_Base2) {
  _inherits(Loading, _Base2);

  var _super2 = _createSuper(Loading);

  function Loading(...args) {
    _classCallCheck(this, Loading);

    return _super2.call(this, 'Loading', ...args);
  }

  return Loading;
}(Base);

__GLOBAL__.Loading = Loading;

var TextArea = /*#__PURE__*/function (_Base3) {
  _inherits(TextArea, _Base3);

  var _super3 = _createSuper(TextArea);

  function TextArea(...args) {
    _classCallCheck(this, TextArea);

    return _super3.call(this, 'TextArea', ...args);
  }

  _createClass(TextArea, [{
    key: "text",
    set: function (arg) {
      this._text = arg;
      arg = transSingleArg(arg);
      invoke('TextArea', this.objID, 'setText', arg);
    },
    get: function () {
      return invoke('TextArea', this.objID, 'getText');
    }
  }, {
    key: "placeholder",
    set: function (arg) {
      this._placeholder = arg;
      arg = transSingleArg(arg);
      invoke('TextArea', this.objID, 'setPlaceholder', arg);
    },
    get: function () {
      return this._placeholder;
    }
  }, {
    key: "focused",
    set: function (arg) {
      this._focused = arg;
      arg = transSingleArg(arg);
      invoke('TextArea', this.objID, 'setFocused', arg);
    },
    get: function () {
      return invoke('TextArea', this.objID, 'getFocused');
    }
  }]);

  return TextArea;
}(Base);

__GLOBAL__.TextArea = TextArea;

var Input = /*#__PURE__*/function (_Base4) {
  _inherits(Input, _Base4);

  var _super4 = _createSuper(Input);

  function Input(...args) {
    _classCallCheck(this, Input);

    return _super4.call(this, 'Input', ...args);
  }

  _createClass(Input, [{
    key: "text",
    set: function (arg) {
      this._text = arg;
      arg = transSingleArg(arg);
      invoke('Input', this.objID, 'setText', arg);
    },
    get: function () {
      return invoke('Input', this.objID, 'getText');
    }
  }, {
    key: "placeholder",
    set: function (arg) {
      this._placeholder = arg;
      arg = transSingleArg(arg);
      invoke('Input', this.objID, 'setPlaceholder', arg);
    },
    get: function () {
      return this._placeholder;
    }
  }, {
    key: "focused",
    set: function (arg) {
      this._focused = arg;
      arg = transSingleArg(arg);
      invoke('Input', this.objID, 'setFocused', arg);
    },
    get: function () {
      return invoke('Input', this.objID, 'getFocused');
    }
  }]);

  return Input;
}(Base);

__GLOBAL__.Input = Input;

var Switch = /*#__PURE__*/function (_Base5) {
  _inherits(Switch, _Base5);

  var _super5 = _createSuper(Switch);

  function Switch(...args) {
    _classCallCheck(this, Switch);

    return _super5.call(this, 'Switch', ...args);
  }

  _createClass(Switch, [{
    key: "checked",
    set: function (arg) {
      this._checked = arg;
      arg = transSingleArg(arg);
      invoke('Switch', this.objID, 'setChecked', arg);
    },
    get: function () {
      return this._checked;
    }
  }]);

  return Switch;
}(Base);

__GLOBAL__.Switch = Switch;

var ViewPager = /*#__PURE__*/function (_Base6) {
  _inherits(ViewPager, _Base6);

  var _super6 = _createSuper(ViewPager);

  function ViewPager(...args) {
    _classCallCheck(this, ViewPager);

    return _super6.call(this, 'ViewPager', ...args);
  }

  _createClass(ViewPager, [{
    key: "setCurrentItem",
    value: function setCurrentItem(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('ViewPager', this.objID, 'setCurrentItem', ...args);
    }
  }, {
    key: "onPageChange",
    value: function onPageChange(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('ViewPager', this.objID, 'onPageChange', ...args);
    }
  }, {
    key: "onPageScroll",
    value: function onPageScroll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('ViewPager', this.objID, 'onPageScroll', ...args);
    }
  }, {
    key: "onPageScrollStateChange",
    value: function onPageScrollStateChange(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('ViewPager', this.objID, 'onPageScrollStateChange', ...args);
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('ViewPager', this.objID, 'onItemClick', ...args);
    }
  }, {
    key: "onItemView",
    value: function onItemView(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('ViewPager', this.objID, 'onItemView', ...args);
    }
  }, {
    key: "data",
    set: function (arg) {
      this._data = arg;
      arg = transSingleArg(arg);
      invoke('ViewPager', this.objID, 'setData', arg);
    },
    get: function () {
      return this._data;
    }
  }]);

  return ViewPager;
}(Base);

__GLOBAL__.ViewPager = ViewPager;

var Toast = /*#__PURE__*/function (_Base7) {
  _inherits(Toast, _Base7);

  var _super7 = _createSuper(Toast);

  function Toast(...args) {
    _classCallCheck(this, Toast);

    return _super7.call(this, 'Toast', ...args);
  }

  _createClass(Toast, null, [{
    key: "show",
    value: function show(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Toast', 0, 'show', ...args);
    }
  }, {
    key: "custom",
    value: function custom(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Toast', 0, 'custom', ...args);
    }
  }]);

  return Toast;
}(Base);

__GLOBAL__.Toast = Toast;

var CanvasView = /*#__PURE__*/function (_Base8) {
  _inherits(CanvasView, _Base8);

  var _super8 = _createSuper(CanvasView);

  function CanvasView(...args) {
    _classCallCheck(this, CanvasView);

    return _super8.call(this, 'CanvasView', ...args);
  }

  _createClass(CanvasView, [{
    key: "getCanvasContext",
    value: function getCanvasContext(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('CanvasView', this.objID, 'getCanvasContext', ...args);
    }
  }, {
    key: "drawImage",
    value: function drawImage(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'drawImage', ...args);
    }
  }, {
    key: "fillRect",
    value: function fillRect(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'fillRect', ...args);
    }
  }, {
    key: "strokeRect",
    value: function strokeRect(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'strokeRect', ...args);
    }
  }, {
    key: "fillCircle",
    value: function fillCircle(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'fillCircle', ...args);
    }
  }, {
    key: "strokeCircle",
    value: function strokeCircle(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'strokeCircle', ...args);
    }
  }, {
    key: "fontSize",
    value: function fontSize(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'fontSize', ...args);
    }
  }, {
    key: "fillText",
    value: function fillText(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'fillText', ...args);
    }
  }, {
    key: "arc",
    value: function arc(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'arc', ...args);
    }
  }, {
    key: "drawLine",
    value: function drawLine(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'drawLine', ...args);
    }
  }, {
    key: "drawLines",
    value: function drawLines(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'drawLines', ...args);
    }
  }, {
    key: "strokeEllipse",
    value: function strokeEllipse(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'ellipse', ...args);
    }
  }, {
    key: "fillEllipse",
    value: function fillEllipse(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'fillEllipse', ...args);
    }
  }, {
    key: "lineWidth",
    value: function lineWidth(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'lineWidth', ...args);
    }
  }, {
    key: "lineColor",
    value: function lineColor(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'lineColor', ...args);
    }
  }, {
    key: "lineJoin",
    value: function lineJoin(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'lineJoin', ...args);
    }
  }, {
    key: "fillColor",
    value: function fillColor(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'fillColor', ...args);
    }
  }, {
    key: "textColor",
    value: function textColor(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'textColor', ...args);
    }
  }, {
    key: "lineCap",
    value: function lineCap(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasView', this.objID, 'lineCap', ...args);
    }
  }]);

  return CanvasView;
}(Base);

__GLOBAL__.CanvasView = CanvasView;

var CanvasPath = /*#__PURE__*/function (_Base9) {
  _inherits(CanvasPath, _Base9);

  var _super9 = _createSuper(CanvasPath);

  function CanvasPath(...args) {
    _classCallCheck(this, CanvasPath);

    return _super9.call(this, 'CanvasPath', ...args);
  }

  _createClass(CanvasPath, [{
    key: "moveTo",
    value: function moveTo(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasPath', this.objID, 'moveTo', ...args);
    }
  }, {
    key: "lineTo",
    value: function lineTo(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasPath', this.objID, 'lineTo', ...args);
    }
  }, {
    key: "close",
    value: function close(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('CanvasPath', this.objID, 'close', ...args);
    }
  }]);

  return CanvasPath;
}(Base);

__GLOBAL__.CanvasPath = CanvasPath;

var Dialog = /*#__PURE__*/function (_Base10) {
  _inherits(Dialog, _Base10);

  var _super10 = _createSuper(Dialog);

  function Dialog(...args) {
    _classCallCheck(this, Dialog);

    return _super10.call(this, 'Dialog', ...args);
  }

  _createClass(Dialog, [{
    key: "alert",
    value: function alert(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Dialog', this.objID, 'alert', ...args);
    }
  }, {
    key: "confirm",
    value: function confirm(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Dialog', this.objID, 'confirm', ...args);
    }
  }, {
    key: "loading",
    value: function loading(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Dialog', this.objID, 'loading', ...args);
    }
  }, {
    key: "custom",
    value: function custom(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Dialog', this.objID, 'custom', ...args);
    }
  }, {
    key: "dismiss",
    value: function dismiss(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Dialog', this.objID, 'dismiss', ...args);
    }
  }, {
    key: "cancelable",
    set: function (arg) {
      this._cancelable = arg;
      arg = transSingleArg(arg);
      invoke('Dialog', this.objID, 'setCancelable', arg);
    },
    get: function () {
      return this._cancelable;
    }
  }]);

  return Dialog;
}(Base);

__GLOBAL__.Dialog = Dialog;

var Button = /*#__PURE__*/function (_Base11) {
  _inherits(Button, _Base11);

  var _super11 = _createSuper(Button);

  function Button(...args) {
    _classCallCheck(this, Button);

    return _super11.call(this, 'Button', ...args);
  }

  _createClass(Button, [{
    key: "text",
    set: function (arg) {
      this._text = arg;
      arg = transSingleArg(arg);
      invoke('Button', this.objID, 'setText', arg);
    },
    get: function () {
      return this._text;
    }
  }, {
    key: "pressed",
    set: function (arg) {
      this._pressed = arg;
      arg = transSingleArg(arg);
      invoke('Button', this.objID, 'setPressed', arg);
    },
    get: function () {
      return this._pressed;
    }
  }, {
    key: "disabled",
    set: function (arg) {
      this._disabled = arg;
      arg = transSingleArg(arg);
      invoke('Button', this.objID, 'setDisabled', arg);
    },
    get: function () {
      return this._disabled;
    }
  }]);

  return Button;
}(Base);

__GLOBAL__.Button = Button;

var List = /*#__PURE__*/function (_Base12) {
  _inherits(List, _Base12);

  var _super12 = _createSuper(List);

  function List(...args) {
    _classCallCheck(this, List);

    return _super12.call(this, 'List', ...args);
  }

  _createClass(List, [{
    key: "refresh",
    value: function refresh(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('List', this.objID, 'refresh', ...args);
    }
  }, {
    key: "stopPullRefresh",
    value: function stopPullRefresh(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('List', this.objID, 'stopPullRefresh', ...args);
    }
  }, {
    key: "stopLoadMore",
    value: function stopLoadMore(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('List', this.objID, 'stopLoadMore', ...args);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('List', this.objID, 'scrollTo', ...args);
    }
  }, {
    key: "scrollBy",
    value: function scrollBy(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('List', this.objID, 'scrollBy', ...args);
    }
  }, {
    key: "scrollToPosition",
    value: function scrollToPosition(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('List', this.objID, 'scrollToPosition', ...args);
    }
  }, {
    key: "refreshView",
    set: function (arg) {
      this._refreshView = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setRefreshView', arg);
    },
    get: function () {
      return this._refreshView;
    }
  }, {
    key: "loadMoreView",
    set: function (arg) {
      this._loadMoreView = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setLoadMoreView', arg);
    },
    get: function () {
      return this._loadMoreView;
    }
  }, {
    key: "onRefresh",
    set: function (arg) {
      this._onRefresh = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setOnRefresh', arg);
    },
    get: function () {
      return this._onRefresh;
    }
  }, {
    key: "onLoadMore",
    set: function (arg) {
      this._onLoadMore = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setOnLoadMore', arg);
    },
    get: function () {
      return this._onLoadMore;
    }
  }, {
    key: "onRegister",
    set: function (arg) {
      this._onRegister = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setOnRegister', arg);
    },
    get: function () {
      return this._onRegister;
    }
  }, {
    key: "onCreate",
    set: function (arg) {
      this._onCreate = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setOnCreate', arg);
    },
    get: function () {
      return this._onCreate;
    }
  }, {
    key: "onUpdate",
    set: function (arg) {
      this._onUpdate = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setOnUpdate', arg);
    },
    get: function () {
      return this._onUpdate;
    }
  }, {
    key: "showScrollBar",
    set: function (arg) {
      this._showScrollBar = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setShowScrollBar', arg);
    },
    get: function () {
      return this._showScrollBar;
    }
  }, {
    key: "bounces",
    set: function (arg) {
      this._bounces = arg;
      arg = transSingleArg(arg);
      invoke('List', this.objID, 'setBounces', arg);
    },
    get: function () {
      return this._bounces;
    }
  }]);

  return List;
}(Base);

__GLOBAL__.List = List;

var View = /*#__PURE__*/function (_Base13) {
  _inherits(View, _Base13);

  var _super13 = _createSuper(View);

  function View(...args) {
    _classCallCheck(this, View);

    return _super13.call(this, 'View', ...args);
  }

  _createClass(View, [{
    key: "appendChild",
    value: function appendChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'appendChild', ...args);
    }
  }, {
    key: "removeChild",
    value: function removeChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'removeChild', ...args);
    }
  }, {
    key: "removeAll",
    value: function removeAll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'removeAll', ...args);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'insertBefore', ...args);
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'replaceChild', ...args);
    }
  }, {
    key: "getElementById",
    value: function getElementById(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('View', this.objID, 'getElementById', ...args);
    }
  }, {
    key: "layout",
    value: function layout(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'layout', ...args);
    }
  }, {
    key: "empty",
    value: function empty(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('View', this.objID, 'empty', ...args);
    }
  }]);

  return View;
}(Base);

__GLOBAL__.View = View;

var Anchor = /*#__PURE__*/function (_Base14) {
  _inherits(Anchor, _Base14);

  var _super14 = _createSuper(Anchor);

  function Anchor(...args) {
    _classCallCheck(this, Anchor);

    return _super14.call(this, 'Anchor', ...args);
  }

  _createClass(Anchor, [{
    key: "appendChild",
    value: function appendChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'appendChild', ...args);
    }
  }, {
    key: "removeChild",
    value: function removeChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'removeChild', ...args);
    }
  }, {
    key: "removeAll",
    value: function removeAll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'removeAll', ...args);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'insertBefore', ...args);
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'replaceChild', ...args);
    }
  }, {
    key: "getElementById",
    value: function getElementById(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('Anchor', this.objID, 'getElementById', ...args);
    }
  }, {
    key: "layout",
    value: function layout(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'layout', ...args);
    }
  }, {
    key: "empty",
    value: function empty(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Anchor', this.objID, 'empty', ...args);
    }
  }]);

  return Anchor;
}(Base);

__GLOBAL__.Anchor = Anchor;

var Text = /*#__PURE__*/function (_Base15) {
  _inherits(Text, _Base15);

  var _super15 = _createSuper(Text);

  function Text(...args) {
    _classCallCheck(this, Text);

    return _super15.call(this, 'Text', ...args);
  }

  _createClass(Text, [{
    key: "text",
    set: function (arg) {
      this._text = arg;
      arg = transSingleArg(arg);
      invoke('Text', this.objID, 'setText', arg);
    },
    get: function () {
      return this._text;
    }
  }, {
    key: "richText",
    set: function (arg) {
      this._richText = arg;
      arg = transSingleArg(arg);
      invoke('Text', this.objID, 'setRichText', arg);
    },
    get: function () {
      return this._richText;
    }
  }, {
    key: "formattedText",
    set: function (arg) {
      this._formattedText = arg;
      arg = transSingleArg(arg);
      invoke('Text', this.objID, 'setFormattedText', arg);
    },
    get: function () {
      return this._formattedText;
    }
  }, {
    key: "textCopyEnable",
    set: function (arg) {
      this._textCopyEnable = arg;
      arg = transSingleArg(arg);
      invoke('Text', this.objID, 'setTextCopyEnable', arg);
    },
    get: function () {
      return this._textCopyEnable;
    }
  }]);

  return Text;
}(Base);

__GLOBAL__.Text = Text;

var Scroller = /*#__PURE__*/function (_Base16) {
  _inherits(Scroller, _Base16);

  var _super16 = _createSuper(Scroller);

  function Scroller(...args) {
    _classCallCheck(this, Scroller);

    return _super16.call(this, 'Scroller', ...args);
  }

  _createClass(Scroller, [{
    key: "appendChild",
    value: function appendChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'appendChild', ...args);
    }
  }, {
    key: "removeChild",
    value: function removeChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'removeChild', ...args);
    }
  }, {
    key: "removeAll",
    value: function removeAll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'removeAll', ...args);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'insertBefore', ...args);
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'replaceChild', ...args);
    }
  }, {
    key: "getElementById",
    value: function getElementById(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('Scroller', this.objID, 'getSubview', ...args);
    }
  }, {
    key: "layout",
    value: function layout(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'layout', ...args);
    }
  }, {
    key: "stopPullRefresh",
    value: function stopPullRefresh(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'stopPullRefresh', ...args);
    }
  }, {
    key: "stopLoadMore",
    value: function stopLoadMore(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'stopLoadMore', ...args);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'scrollTo', ...args);
    }
  }, {
    key: "scrollBy",
    value: function scrollBy(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'scrollBy', ...args);
    }
  }, {
    key: "scrollToTop",
    value: function scrollToTop(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'scrollToTop', ...args);
    }
  }, {
    key: "scrollToBottom",
    value: function scrollToBottom(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'scrollToBottom', ...args);
    }
  }, {
    key: "setOnScrollToTopListener",
    value: function setOnScrollToTopListener(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'setOnScrollToTopListener', ...args);
    }
  }, {
    key: "setOnScrollToBottomListener",
    value: function setOnScrollToBottomListener(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'setOnScrollToBottomListener', ...args);
    }
  }, {
    key: "updateContentSize",
    value: function updateContentSize(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('Scroller', this.objID, 'updateContentSize', ...args);
    }
  }, {
    key: "showScrollBar",
    set: function (arg) {
      this._showScrollBar = arg;
      arg = transSingleArg(arg);
      invoke('Scroller', this.objID, 'setShowScrollBar', arg);
    },
    get: function () {
      return this._showScrollBar;
    }
  }, {
    key: "refreshView",
    set: function (arg) {
      this._refreshView = arg;
      arg = transSingleArg(arg);
      invoke('Scroller', this.objID, 'setRefreshView', arg);
    },
    get: function () {
      return this._refreshView;
    }
  }, {
    key: "loadMoreView",
    set: function (arg) {
      this._loadMoreView = arg;
      arg = transSingleArg(arg);
      invoke('Scroller', this.objID, 'setLoadMoreView', arg);
    },
    get: function () {
      return this._loadMoreView;
    }
  }, {
    key: "onRefresh",
    set: function (arg) {
      this._onRefresh = arg;
      arg = transSingleArg(arg);
      invoke('Scroller', this.objID, 'setOnRefresh', arg);
    },
    get: function () {
      return this._onRefresh;
    }
  }, {
    key: "onLoadMore",
    set: function (arg) {
      this._onLoadMore = arg;
      arg = transSingleArg(arg);
      invoke('Scroller', this.objID, 'setOnLoadMore', arg);
    },
    get: function () {
      return this._onLoadMore;
    }
  }, {
    key: "bounces",
    set: function (arg) {
      this._bounces = arg;
      arg = transSingleArg(arg);
      invoke('Scroller', this.objID, 'setBounces', arg);
    },
    get: function () {
      return this._bounces;
    }
  }]);

  return Scroller;
}(Base);

__GLOBAL__.Scroller = Scroller;

var HorizontalScroller = /*#__PURE__*/function (_Base17) {
  _inherits(HorizontalScroller, _Base17);

  var _super17 = _createSuper(HorizontalScroller);

  function HorizontalScroller(...args) {
    _classCallCheck(this, HorizontalScroller);

    return _super17.call(this, 'HorizontalScroller', ...args);
  }

  _createClass(HorizontalScroller, [{
    key: "appendChild",
    value: function appendChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'appendChild', ...args);
    }
  }, {
    key: "removeChild",
    value: function removeChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'removeChild', ...args);
    }
  }, {
    key: "removeAll",
    value: function removeAll(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'removeAll', ...args);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'insertBefore', ...args);
    }
  }, {
    key: "replaceChild",
    value: function replaceChild(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'replaceChild', ...args);
    }
  }, {
    key: "getElementById",
    value: function getElementById(...args) {
      let stash = args;
      args = transArgs(...args);
      return invoke('HorizontalScroller', this.objID, 'getSubview', ...args);
    }
  }, {
    key: "layout",
    value: function layout(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'layout', ...args);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'scrollTo', ...args);
    }
  }, {
    key: "scrollBy",
    value: function scrollBy(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'scrollBy', ...args);
    }
  }, {
    key: "scrollToTop",
    value: function scrollToTop(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'scrollToTop', ...args);
    }
  }, {
    key: "scrollToBottom",
    value: function scrollToBottom(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'scrollToBottom', ...args);
    }
  }, {
    key: "setOnScrollToTopListener",
    value: function setOnScrollToTopListener(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'setOnScrollToTopListener', ...args);
    }
  }, {
    key: "setOnScrollToBottomListener",
    value: function setOnScrollToBottomListener(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'setOnScrollToBottomListener', ...args);
    }
  }, {
    key: "updateContentSize",
    value: function updateContentSize(...args) {
      let stash = args;
      args = transArgs(...args);
      invoke('HorizontalScroller', this.objID, 'updateContentSize', ...args);
    }
  }, {
    key: "showScrollBar",
    set: function (arg) {
      this._showScrollBar = arg;
      arg = transSingleArg(arg);
      invoke('HorizontalScroller', this.objID, 'setShowScrollBar', arg);
    },
    get: function () {
      return this._showScrollBar;
    }
  }, {
    key: "bounces",
    set: function (arg) {
      this._bounces = arg;
      arg = transSingleArg(arg);
      invoke('HorizontalScroller', this.objID, 'setBounces', arg);
    },
    get: function () {
      return this._bounces;
    }
  }]);

  return HorizontalScroller;
}(Base);

__GLOBAL__.HorizontalScroller = HorizontalScroller;