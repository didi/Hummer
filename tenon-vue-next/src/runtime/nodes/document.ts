
// import {ELEMNT_TAG_MAP,NODE_SWITCH, NODE_VIEW, NODE_TEXT, NODE_IMAGE, NODE_INPUT, NODE_TEXTAREA, NODE_BUTTON, NODE_SCROLLER, NODE_REFRESH, NODE_LOADMORE} from '@hummer/tenon-utils'
import {Page, PageOptions, ScrollPage} from './components/page'
// import {View} from './components/view'
// import {Text} from './components/text'
// import {Image} from './components/image'
// import {Input} from './components/input'
// import {TextArea} from './components/textarea'
// import {Button} from './components/button'
import {Comment} from './components/comment'
// import { Scroller } from './components/scroller'
import {Anchor} from './components/anchor'
// import { Switch } from './components/switch'
// import {Refresh} from './components/extend/refresh'
// import {LoadMore} from './components/extend/loadmore'

// import {Base} from './Base'
import {getComponent} from './component'
import {isCustomNativeTag} from '@hummer/tenon-utils'

import { Hummer, HummerElement, Text } from '@hummer/hummer-api'

/**
 * 通用Document对象
 */
export class Document{
  constructor(){}

  createElement(tag:string):(HummerElement | undefined){
    let component = Hummer.createElement(tag)

    if (!component) {
      if(isCustomNativeTag(tag)){
        // Custom Native Tag
        component = getComponent(tag) || Hummer.createElement('view')
      }else {
        // Default
        component = Hummer.createElement('view')
      }
    }

    return component
  }

  createText(text: string): Text | Anchor {
    // Vue中调用该方法实现锚点，做特殊处理
    let component: Text | Anchor | undefined;
    if(!text){
      // 创建锚点
      component = new Anchor();
    }else{
      component = Hummer.createElement('text') as Text;
      component.text = text;
    }
    return component
  }

  createComment(comment: string){
    return new Comment(comment)
  }

  createPageView(options: PageOptions): Page | ScrollPage{
    let pageView: Page | ScrollPage | null = null;
    if (options.canScroll) {
      pageView = new ScrollPage(options)
    } else {
      pageView = new Page(options)
    }
    return pageView
  }
}
export default new Document()