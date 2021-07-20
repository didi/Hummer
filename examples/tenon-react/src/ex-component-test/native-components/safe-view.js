import {Base} from '@hummer/tenon-react'

import {View, Text} from '@hummer/hummer-front'

/**
 * 拦截子视图的组件
 */
class SafeView extends Base{
  constructor(){
    super()
    this._initialize()
  }
  _initialize(){
    // 初始化
    this._initElement()
  }

  _initElement(){
    let nativeView = new NativeView()
    this.nativeView = nativeView
    this.element = nativeView.element
  }

  _setAttribute(key, value){
    switch(key){
      case 'headerText':
        this.nativeView.setHeaderText(value)
        break;
      default:
        break;
    }
  }
  appendChild(child){
    if(child){
      this.nativeView.contentView.appendChild(child.element)
    }
  }

  insertBefore(child, anchor){
    if(child && anchor){
      this.nativeView.content.insertBefore(child.element, anchor.element)
    }
  }
}


/**
 * 模拟实现的原生组件，Native View
 */
class NativeView{
  constructor(){
    this.element = new View()
    this.element.style = {
      width: "100%"
    }

    this.initialize()
  }
  initialize(){
    this.initHeader()
    this.initContent()
  }

  initHeader(){
    let header = new View()
    header.style = {
      backgroundColor: '#fa9153',
      height: '60hm',
      width: '100%',
      textAlign: 'center',
      borderTopLeftRadius: '5hm',
      borderTopRightRadius: '5hm'
    }
    let headerText = new Text();
    headerText.style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '100%',
      color: '#ffffff'
    }
    header.appendChild(headerText);
    this.headerText = headerText;
    this.element.appendChild(header);
    this.setHeaderText("Header Init Text");
  }

  initContent(){
    let view = new View();
    view.style = {
      width: '100%',
      borderBottomLeftRadius: '5hm',
      borderBottomRightRadius: '5hm',
      backgroundColor: '#eeeeee'
    };
    this.contentView = view;
    this.element.appendChild(view);
  }

  setHeaderText(value){
    this.headerText.text = value;
  }
}


export default {
  name: 'safe-view',
  factory(){
    let safeView = new SafeView();
    return safeView
  }
}

