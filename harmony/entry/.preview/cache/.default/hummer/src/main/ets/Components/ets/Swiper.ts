interface HMSwiper_Params {
    builderContext?: ComponentBuilderContext;
    hmContext?: HMContext;
    node?: HMNode;
    style?: IHummerSwiperStyle | undefined;
    attributes?: AttributesType | undefined;
    data?: HMAny[];
    triggerItemView?: (TriggerItemView | undefined);
    triggerItemClick?: (TriggerItemClick | undefined);
    triggerPageChange?: HMAny | undefined;
    index?: number;
    scroller?: SwiperController;
    listItemTypeList?: number[];
    listItemNodeList?: HMAny[];
    swiperDataSource?: SwiperDataSource;
}
import { MutationType } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { AttributesType, HMNode } from "@bundle:com.example.hummer/entry@hummer/ets/Components/Node";
import type { HMContext } from '../../Context/HMContext';
import commonStyleModifier from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/CommonStyleModifier";
import { componentFactoryBuilder } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import type { ComponentBuilderContext } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/ComponentBuilder";
import type { IHummerSwiperStyle } from '../../Interface/IHummerStyle';
import { getVP } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import type { HMAny } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
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
        });
    }
    notifyDataAdd(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataDelete(index);
        });
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
        });
    }
}
type TriggerItemView = (position: number, view: HMAny) => HMAny;
type TriggerItemClick = (position: number) => HMAny;
export default class HMSwiper extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.builderContext = undefined;
        this.hmContext = undefined;
        this.node = undefined;
        this.__style = new ObservedPropertyObjectPU(undefined, this, "style");
        this.__attributes = new ObservedPropertyObjectPU(undefined, this, "attributes");
        this.data = [];
        this.triggerItemView = undefined;
        this.triggerItemClick = undefined;
        this.triggerPageChange = undefined;
        this.__index = new ObservedPropertySimplePU(0, this, "index");
        this.scroller = new SwiperController();
        this.listItemTypeList = [];
        this.listItemNodeList = [];
        this.swiperDataSource = new SwiperDataSource();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: HMSwiper_Params) {
        if (params.builderContext !== undefined) {
            this.builderContext = params.builderContext;
        }
        if (params.hmContext !== undefined) {
            this.hmContext = params.hmContext;
        }
        if (params.node !== undefined) {
            this.node = params.node;
        }
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.attributes !== undefined) {
            this.attributes = params.attributes;
        }
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.triggerItemView !== undefined) {
            this.triggerItemView = params.triggerItemView;
        }
        if (params.triggerItemClick !== undefined) {
            this.triggerItemClick = params.triggerItemClick;
        }
        if (params.triggerPageChange !== undefined) {
            this.triggerPageChange = params.triggerPageChange;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.listItemTypeList !== undefined) {
            this.listItemTypeList = params.listItemTypeList;
        }
        if (params.listItemNodeList !== undefined) {
            this.listItemNodeList = params.listItemNodeList;
        }
        if (params.swiperDataSource !== undefined) {
            this.swiperDataSource = params.swiperDataSource;
        }
    }
    updateStateVars(params: HMSwiper_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__attributes.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__attributes.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private builderContext: ComponentBuilderContext;
    private hmContext: HMContext;
    private node: HMNode;
    private __style: ObservedPropertyObjectPU<IHummerSwiperStyle | undefined>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: IHummerSwiperStyle | undefined) {
        this.__style.set(newValue);
    }
    private __attributes: ObservedPropertyObjectPU<AttributesType | undefined>;
    get attributes() {
        return this.__attributes.get();
    }
    set attributes(newValue: AttributesType | undefined) {
        this.__attributes.set(newValue);
    }
    private data: HMAny[];
    private triggerItemView: (TriggerItemView | undefined);
    private triggerItemClick: (TriggerItemClick | undefined);
    private triggerPageChange: HMAny | undefined;
    private __index: ObservedPropertySimplePU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    // 滚动控制器
    private scroller: SwiperController;
    // item & data
    private listItemTypeList: number[];
    private listItemNodeList: HMAny[];
    private swiperDataSource: SwiperDataSource;
    aboutToAppear(): void {
        this.hmContext = this.builderContext.hmContext;
        this.node = this.builderContext.node;
        this.style = this.node.style as IHummerSwiperStyle;
        this.attributes = this.node.attributes;
        this.data = this.attributes?.data || [];
        // 监听style 和 attributes
        this.node.registerUpdateFunc(MutationType.Style, (style: IHummerSwiperStyle) => {
            this.style = style;
        }).registerUpdateFunc(MutationType.Attribute, (attributes: AttributesType) => {
            this.attributes = attributes;
            this.data = this.attributes?.data || [];
            this.handleDataChange();
        });
        // 刷新列表方法 内部触发onRegister onCreate回调
        this.node.registerNativeFunc("setCurrentItem", (position: number) => {
            this.index = position;
        }).registerNativeFunc("onPageChange", (callback: (position: number, total: number) => HMAny) => {
            this.triggerPageChange = callback;
        }).registerNativeFunc("onItemClick", (callback: (position: number) => HMAny) => {
            this.triggerItemClick = callback;
        }).registerNativeFunc("onItemView", (callback: (position: number, view: HMAny) => HMAny) => {
            this.triggerItemView = callback;
        });
    }
    // hdc
    aboutToDisappear(): void {
        this.node.unregisterAllUpdateFuncs();
    }
    handleDataChange() {
        if (!this.triggerItemView) {
            return;
        }
        for (let position = 0; position < this.data.length; position++) {
            let res: HMAny = this.triggerItemView && (this.triggerItemView as TriggerItemView)(position, this.listItemTypeList[position]);
            this.listItemNodeList.push(res);
        }
        this.swiperDataSource.modifyAllData(this.data.length);
        this.swiperDataSource.reloadData();
    }
    getImageResource(uri: string) {
        if (uri && uri.startsWith("asset://")) {
            return $rawfile(uri.replace("asset://", "assets/"));
        }
        return uri;
    }
    getLoop(loop: boolean | undefined): boolean {
        if (loop === undefined) {
            return true;
        }
        else {
            return loop;
        }
    }
    getAutoPlay(autoPlay: boolean | undefined): boolean {
        if (autoPlay === undefined) {
            return false;
        }
        else {
            return autoPlay;
        }
    }
    defaultImage(uri: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.getImageResource(uri));
            Image.debugLine("hummer/src/main/ets/Components/ets/Swiper.ets(196:5)");
            Image.objectFit(ImageFit.Cover);
            Image.onComplete((e) => { });
            Image.onError((event: ImageError) => {
                console.log('swiper default image error', event);
            });
        }, Image);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create(this.scroller);
            Swiper.debugLine("hummer/src/main/ets/Components/ets/Swiper.ets(205:5)");
            Swiper.attributeModifier.bind(this)(commonStyleModifier.setNode(this.node));
            Swiper.cachedCount(1);
            Swiper.onChange((index: number) => {
                this.triggerPageChange && this.triggerPageChange(index, this.data.length);
            });
            Swiper.itemSpace(getVP(this.style?.itemSpacing || 0));
            Swiper.loop(this.getLoop(this.style?.canLoop));
            Swiper.autoPlay(this.getAutoPlay(this.style?.autoPlay));
            Swiper.duration(this.style?.loopInterval || 0);
            Swiper.index(this.index, newValue => { this.index = newValue; });
        }, Swiper);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("hummer/src/main/ets/Components/ets/Swiper.ets(207:9)");
                    Column.onClick((e) => {
                        this.triggerItemClick && this.triggerItemClick(index);
                    });
                    Column.onTouch((e) => {
                        this.triggerItemClick && this.triggerItemClick(index);
                    });
                    Column.onAppear(() => {
                        this.triggerItemView && this.triggerItemView(index, this.listItemNodeList[index]);
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.listItemNodeList[index]) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            componentFactoryBuilder.bind(this)(makeBuilderParameterProxy("componentFactoryBuilder", { hmContext: () => (this["__hmContext"] ? this["__hmContext"] : this["hmContext"]), tag: () => this.listItemNodeList[index].name, node: () => this.listItemNodeList[index], customComponentBuilder: () => this.builderContext.customComponentBuilder }));
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.defaultImage.bind(this)(this.data[index]);
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            LazyForEach.create("1", this, this.swiperDataSource, __lazyForEachItemGenFunction);
            LazyForEach.pop();
        }
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
