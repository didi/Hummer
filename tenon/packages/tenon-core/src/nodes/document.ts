
import {ELEMNT_TAG_MAP,NODE_SWITCH, NODE_VIEW, NODE_TEXT, NODE_IMAGE, NODE_INPUT, NODE_TEXTAREA, NODE_BUTTON, NODE_SCROLLER, NODE_REFRESH, NODE_LOADMORE} from './types'
import {Page, PageOptions} from './components/page'
import {View} from './components/view'
import {Text} from './components/text'
import {Image} from './components/image'
import {Input} from './components/input'
import {TextArea} from './components/textarea'
import {Button} from './components/button'
import {Comment} from './components/comment'
import { Scroller } from './components/scroller'
import {Anchor} from './components/anchor'
import { Switch } from './components/switch'
import {Refresh} from './components/extend/refresh'
import {LoadMore} from './components/extend/loadmore'

import {Base} from './Base'
import {getComponent} from './component'
import {isCustomNativeTag} from '@hummer/tenon-utils'
/**
 * 通用Document对象
 */
export class Document{
  constructor(){}

  createElement(tag:string):(Base | null){
    let component = null
    switch(tag){
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
        component = new TextArea()
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
        if(isCustomNativeTag(tag)){
          // Custom Native Tag
          component = getComponent(tag) || new View()
        }else {
          // Default
          component = new View();
        }
        break;
    }
    return component
  }

  createText(text: string): Text|Anchor{
    // Vue中调用该方法实现锚点，做特殊处理
    let component = null;
    if(!text){
      // 创建锚点
      component = new Anchor();
    }else{
      component = new Text();
      component.setElementText(text);
    }
    return component
  }

  createComment(comment: string){
    return new Comment(comment)
  }

  createPageView(options: PageOptions): Page{
    let pageView = new Page(options)
    return pageView
  }
}
