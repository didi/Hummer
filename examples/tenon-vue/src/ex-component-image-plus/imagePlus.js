

const {Image: ImageComponent} = __GLOBAL__
import {Base} from '@hummer/tenon-vue'

const ImageAttr = {
  Src: 'src',
  GifCount: 'gifRepeatCount',
  Resize: 'resize',
  FiledImage: 'failedImage'
}
const gifReg = /\.gif$/
 class ImagePlus extends Base{
  _src = ''
  _failedImage = ''
  constructor(){
    super()
    this.element = new ImageComponent()
    // Image标签默认是按照Image组件的宽高缩放图片
    this.element.style = {
      resize: 'stretch'
    }
  }

  set src(value){
    if(gifReg.test(value)){
      this.element.gifSrc = value
    }else {
      this.element.load({
        src: value,
        failedImage: 'https://pt-starimg.didistatic.com/static/starimg/img/jc8qujGOcK1604850873080.png'
      }, (srcType, isSuccess) => {
        console.log('加载结束', srcType, isSuccess, this._failedImage)
      });
    }
    this._src = value
  }

   _setAttribute(key, value){
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
      case ImageAttr.FiledImage:
        this._failedImage = value
        this.src = this._src
      default:
        break;
    }
  }
}

export default {
  name: 'image-plus',
  factory() {
    let component = new ImagePlus()
    return component
  }
}
