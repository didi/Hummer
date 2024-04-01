// const { document: _Document } = __Hummer__

// // import { View } from "../../components/View"


export interface PageOptions{
    onLoad?: Function,
    onReady?: Function,
    onShow?: Function,
    onHide?: Function,
    onUnload?: Function,
    onBack?: Function,
    canScroll?: Boolean,  // 是否可滚动
    pageStyle?: Record<string, string> // 页面样式
  }

