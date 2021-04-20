import { Base } from '@hummer/tenon-vue'

const { View } = __GLOBAL__

class WebView extends Base {
  constructor() {
    super();
    let element = new View();
    this.element = element;

    // this.element.setWebviewReady((height) => {
    //   // 容器返回的高度
    //   // Ps. 注意单位转换
    //   this.element.style = {
    //     height: height
    //   }
    // })
  }
  _setAttribute(key, value) {
    switch (key) {
      case 'content':
        this.element.content = value
        break;
      default:
        this.element.style = {
          [key]: value
        }
        break;
    }
  }
  
  addEventListener(event, func){
    switch(event){
      case 'webviewready':
        console.log('Add Event WebviewReady')
        break;
      default: 
        break;
    }
  }

}
export default {
  name: 'webview',
  factory() {
    return new WebView()
  }
}