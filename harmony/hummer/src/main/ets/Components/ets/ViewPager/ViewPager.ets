import { AttributesType, MutationType, HMNode } from '../../../Components/Node';
import { ViewPagerNode } from './ViewPagerNode'
import { HMContext } from '../../../Context/HMContext';
import commonStyleModifier from '../../../AttributeModifiers/CommonStyleModifier';
import { ComponentBuilderContext, componentFactoryBuilder } from '../ComponentBuilder';

import { IHummerSwiperStyle } from '../../../Interface/IHummerStyle';
import { getVP, HMAny } from '../../../Utils/Utils';

class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = [];
  private originDataArray: string[] = [];

  public totalCount(): number {
    return 0;
  }

  public getData(index: number): string {
    return this.originDataArray[index];
  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      console.info('add listener');
      this.listeners.push(listener);
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const pos = this.listeners.indexOf(listener);
    if (pos >= 0) {
      console.info('remove listener');
      this.listeners.splice(pos, 1);
    }
  }

  notifyDataReload(): void {
    this.listeners.forEach(listener => {
      listener.onDataReloaded();
    })
  }

  notifyDataAdd(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataAdd(index);
    })
  }

  notifyDataChange(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataChange(index);
    })
  }

  notifyDataDelete(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataDelete(index);
    })
  }
}

class SwiperDataSource extends BasicDataSource {
  private dataArray: HMAny[] = [];

  public totalCount(): number {
    return this.dataArray.length;
  }

  public getData(index: number): string {
    return this.dataArray[index];
  }

  public addData(index: number, data: string): void {
    this.dataArray.splice(index, 0, data);
    this.notifyDataAdd(index);
  }

  public pushData(data: string): void {
    this.dataArray.push(data);
    this.notifyDataAdd(this.dataArray.length - 1);
  }

  public deleteData(index: number): void {
    this.dataArray.splice(index, 1);
    this.notifyDataDelete(index);
  }

  public changeData(index: number): void {
    this.notifyDataChange(index);
  }

  public reloadData(): void {
    this.notifyDataReload();
  }

  public modifyAllData(count: number): void {
    this.dataArray = (new Array(count)).map((item: HMAny, index: number): HMAny => {
      return index + new Date().getUTCMilliseconds();
    })
  }
}

type TriggerItemView = (position: number, view: HMAny) => HMAny
type TriggerItemClick = (position: number) => HMAny

@Component
export default struct HMSwiper {
  builderContext!: ComponentBuilderContext
  private hmContext!: HMContext;
  private node!: ViewPagerNode;
  @State private style: IHummerSwiperStyle | undefined = undefined;
  @State private attributes: AttributesType | undefined = undefined;
  private data: HMAny[] = [];
  // private triggerItemView: (TriggerItemView | undefined) = undefined;
  // private triggerItemClick: (TriggerItemClick | undefined) = undefined;
  // private triggerPageChange: HMAny | undefined = undefined;

  @State private index: number = 0;

  // 滚动控制器
  private scroller: SwiperController = new SwiperController()
  // item & data
  private listItemTypeList: number[] = [];
  private listItemNodeList: HMAny[] = [];
  private swiperDataSource: SwiperDataSource = new SwiperDataSource();

  aboutToAppear(): void {
    this.hmContext = this.builderContext.hmContext;
    this.node = this.builderContext.node as ViewPagerNode;
    this.style = this.node.style as IHummerSwiperStyle;
    this.attributes = this.node.attributes;
    this.data = this.attributes?.data || []

    // 监听style 和 attributes
    this.node.registerUpdateFunc(MutationType.Style, (style: IHummerSwiperStyle) => {
      this.style = style;
    }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
      this.attributes = attributes;
      this.data = this.attributes?.data || [];
      this.handleDataChange()
    })

    // 刷新列表方法 内部触发onRegister onCreate回调
    this.node.registerNativeFunc("setCurrentItem", (position: number) => {
      this.index = position;
    }).registerNativeFunc("onPageChange", (callback: (position: number, total: number) => HMAny) => {
      this.node.triggerPageChange = callback;
    }).registerNativeFunc("onItemClick", (callback: (position: number) => HMAny) => {
      this.node.triggerItemClick = callback;
    }).registerNativeFunc("onItemView", (callback: (position: number, view: HMAny) => HMAny) => {
      this.node.triggerItemView = callback;
    })

    this.handleDataChange()

  }
  // hdc
  aboutToDisappear(): void {
    this.node.unregisterAllUpdateFuncs();
  }

  handleDataChange() {
    if (!this.node.triggerItemView) {
      return
    }
    for (let position = 0; position < this.data.length; position++) {
      let res: HMAny =this.node.triggerItemView && (this.node.triggerItemView as TriggerItemView)(position, this.listItemNodeList[position])
      this.listItemNodeList.push(res)
    }
    this.swiperDataSource.modifyAllData(this.data.length)
    this.swiperDataSource.reloadData()
  }

  getImageResource(uri: string) {
    if (uri && uri.startsWith("asset://")) {
      return $rawfile(uri.replace("asset://", "assets/"))
    }
    return uri
  }

  getLoop(loop: boolean | undefined): boolean {
    if (loop === undefined) {
      return true
    } else {
      return loop
    }
  }

  getAutoPlay(autoPlay: boolean | undefined): boolean {
    if (autoPlay === undefined) {
      return false
    } else {
      return autoPlay
    }
  }

  @Builder
  defaultImage(uri: string) {
    Image(this.getImageResource(uri))
      .objectFit(ImageFit.Cover)
      .onComplete((e)=>{})
      .onError((event: ImageError) => {
        console.log('swiper default image error', event)
      })
  }

  build() {
    Swiper(this.scroller) {
      LazyForEach(this.swiperDataSource, (item: HMAny, index: number) => {
        Column() {
          if (this.listItemNodeList[index]) {
            componentFactoryBuilder({
              hmContext : this.hmContext,
              tag : this.listItemNodeList[index].name,
              node : this.listItemNodeList[index],
              customComponentBuilder : this.builderContext.customComponentBuilder
            })
          } else {
            this.defaultImage(this.data[index])
          }
        }
        .onClick((e) => {
          this.node.triggerItemClick && this.node.triggerItemClick(index)
        })
        .onTouch((e) => {
          this.node.triggerItemClick && this.node.triggerItemClick(index)
        })
        .onAppear(() => {
          this.node.triggerItemView && this.node.triggerItemView(index, this.listItemNodeList[index])
        })
      })
    }
    .attributeModifier(commonStyleModifier.setNode(this.node))
    .cachedCount(1)
    .onChange((index: number) => {
      this.node.triggerPageChange && this.node.triggerPageChange(index, this.data.length)
    })
    .itemSpace(getVP(this.style?.itemSpacing || 0))
    .loop(this.getLoop(this.style?.canLoop))
    .autoPlay(this.getAutoPlay(this.style?.autoPlay))
    .interval(this.style?.loopInterval || 0)
    // 默认移除indicator
    .indicator(false)
    .index($$this.index)
    // TODO: edgeSpacing
    // TODO: scaleFactor alphaFactor
  }
}