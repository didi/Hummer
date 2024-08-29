import { HMNode } from '../../Node';
import { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext } from '../ComponentBuilder';
import { dispatchTapEvent, dispatchTouchEvent, shouldBindEvent } from '../EventHandler';
import { TapEventName, TouchEventName } from '../../Event';
import { parseImageSrc } from './utils';
import { ImagePropsWrapper } from './ImagePropsWrapper';
import { dispatchImageEvent } from './Event';
import { isUndefined } from '../../../Utils/is';


class ImageSourceHolder {
  public source?: string | Resource | PixelMap

  constructor(source?: string | Resource | PixelMap) {
    this.source = source
  }
}

@Component
export default struct HMImage {
  builderContext!: ComponentBuilderContext
  private hmContext!: HMContext;
  private node!: HMNode;
  private src : string | undefined;

  @State private props:ImagePropsWrapper | undefined = undefined;
  @State private imageSource: ImageSourceHolder | undefined = undefined
  aboutToAppear(): void {

    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node;

    this.props = new ImagePropsWrapper(this.node);
    this.updateImageSource();

    this.props.bindPropsUpdate(()=>{
      this.updateImageSource();
    })
  }

  aboutToDisappear(): void {
    this.props?.dispose();
  }

  updateImageSource() {

    const uri : string | undefined = this.props?.src ? this.props?.src : this.props?.gifSrc
    // 重复设置
    if(isUndefined(uri) || (this.src == uri && this.src)){
      return;
    }
    this.src = uri;

    if (uri && uri.startsWith("data:")) {
      this.imageSource = new ImageSourceHolder(uri);
      return;
    }

    const resourceStr = parseImageSrc(uri, this.hmContext.baseUrl);
    this.imageSource = new ImageSourceHolder(resourceStr);
    return;
    //todo: 开发图片库
  }

  dispatchOnError(event: ImageError){
    //todo: 回调 error

  }
  dispatchOnComplete(event: ImageError){
    //todo: 回调 error

  }
  resize(): ImageFit {
    const hummerResize = this.props?.resize;
    // 'origin' | 'contain' | 'cover' | 'stretch'
    switch (hummerResize) {
      case 'origin':
        return ImageFit.None
      case 'contain':
        return ImageFit.Contain
      case 'cover':
        return ImageFit.Cover
      case 'stretch':
        return ImageFit.Fill
      default:
        return ImageFit.Fill
    }
  }

  handleEvent(isSuccess:boolean){
    dispatchImageEvent(this.node, isSuccess);
  }
  build() {
    Image(this.imageSource?.source)
      .objectFit(this.resize())
      .attributeModifier(commonStyleModifier.setNode(this.node, this.props?.style))
      .onComplete((e)=>{
        this.handleEvent(true);
      })
      .onError((event: ImageError) => {
        this.handleEvent(false);
      })
  }
}