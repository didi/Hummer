import {Image as ImageComponent} from '@hummer/hummer-front'
import {Base} from '../Base'
import {NODE_IMAGE} from '@hummer/tenon-utils'

enum ImageAttr{
  Src = 'src',
  GifCount = 'gifRepeatCount',
  Resize = 'resize'
}
const gifReg = /\.gif$/
export class Image extends Base{
  __NAME = NODE_IMAGE
  private _src:string = ''
  constructor(){
    super()
    this.element = new ImageComponent()
    // Image标签默认是按照Image组件的宽高缩放图片
    this.element.style = {
      resize: 'stretch'
    }
  }

  set src(value: string){
    if(gifReg.test(value)){
      this.element.gifSrc = value
    }else {
      this.element.src = value
    }
    this._src = value
  }

   _setAttribute(key:string, value: any){
    switch(key){
      case ImageAttr.Src:
        this.src = value
        break;
      case ImageAttr.GifCount:
        this.element.gifRepeatCount = Number(value)
        this.src = this._src
        break;
      case ImageAttr.Resize:
        this.style = {
          resize: value
        }
        break;
      default:
        break;
    }
  }
}