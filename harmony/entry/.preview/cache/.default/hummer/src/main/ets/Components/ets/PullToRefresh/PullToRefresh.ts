interface PullToRefresh_Params {
    // @Link data: Object[];
    scroller?: Scroller;
    customList?: () => void;
    refreshConfigurator?: PullToRefreshConfigurator;
    mWidth?: Length;
    mHeight?: Length;
    onRefresh?: () => Promise<string>;
    onLoadMore?: () => Promise<string>;
    customRefresh?: (() => void) | null;
    //开启自定义下拉动画
    onAnimPullDown?: (value?: number, width?: number, height?: number) => void;
    onAnimRefreshing?: (value?: number, width?: number, height?: number) => void;
    customLoad?: (() => void) | null;
    onAnimPullUp?: (value?: number, width?: number, height?: number) => void;
    onAnimLoading?: (value?: number, width?: number, height?: number) => void;
    refreshStateChange?: ((state: RefreshEventState) => void) | null;
    loadMoreStateChange?: ((state: RefreshEventState) => void) | null;
    mHeightNumber?: number;
    trYTop?: number;
    trYBottom?: number;
    state?: number;
    lastState?: number;
    refreshText?: string;
    loadText?: string;
    angle1?: number | string;
    angle2?: number | string;
    mWidthNumber?: number;
    touchYOld?: number;
    touchYNew?: number;
    listOffsetOld?: number;
    listOffsetNew?: number;
    canvasSetting?: RenderingContextSettings;
    canvasRefresh?: CanvasRenderingContext2D;
    value?: number;
    timer?: number;
    refreshRingOx?: number;
    refreshRingOy?: number;
    refreshRingRadius?: number;
    refreshPoint1x?: number;
    refreshPoint1y?: number;
    refreshPoint2x?: number;
    refreshPoint2y?: number;
    panOption?: PanGestureOptions;
}
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
import type { RefreshEventState } from './Event';
import { PullToRefreshConfigurator } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/PullToRefresh/PullToRefreshConfigurator";
const IS_FREE = 0;
const IS_PULL_DOWN_1 = 11;
const IS_PULL_DOWN_2 = 12;
const IS_REFRESHING = 3;
const IS_REFRESHED = 5;
const IS_PULL_UP_1 = 41;
const IS_PULL_UP_2 = 42;
const IS_LOADING = 7;
class HummerState {
    action: string;
    state: RefreshEventState;
    constructor(action: string, state: RefreshEventState) {
        this.action = action;
        this.state = state;
    }
}
const state2HummerState = (state: number, lastState: number): HummerState | undefined => {
    let hummerState: RefreshEventState | undefined = undefined;
    let action: string | undefined = undefined;
    if (Math.abs(state - lastState) == 1) {
        return undefined;
    }
    switch (state) {
        case IS_PULL_DOWN_1:
        case IS_PULL_DOWN_2:
            action = 'refresh';
            hummerState = 0;
            break;
        case IS_REFRESHING:
            action = 'refresh';
            hummerState = 1;
            break;
        case IS_REFRESHED:
            action = 'refresh';
            hummerState = 2;
            break;
        case IS_PULL_UP_1:
        case IS_PULL_UP_2:
            action = 'loadMore';
            hummerState = 0;
            break;
        case IS_LOADING:
            action = 'loadMore';
            hummerState = 1;
            break;
        case IS_FREE:
            if (lastState == IS_LOADING) {
                action = 'loadMore';
                hummerState = 2;
            }
            break;
        default:
            break;
    }
    if (action && !isUndefined(hummerState)) {
        return new HummerState(action, hummerState);
    }
    return undefined;
};
export class PullToRefresh extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.customList = undefined;
        this.refreshConfigurator = undefined;
        this.mWidth = '100%';
        this.mHeight = '100%';
        this.onRefresh = () => {
            return new Promise<string>((resolve, reject) => {
                setTimeout(() => {
                    resolve('刷新失败');
                }, 1000);
            });
        };
        this.onLoadMore = () => {
            return new Promise<string>((resolve, reject) => {
                setTimeout(() => {
                    resolve('');
                }, 1000);
            });
        };
        this.customRefresh = undefined;
        this.onAnimPullDown = undefined;
        this.onAnimRefreshing = undefined;
        this.customLoad = undefined;
        this.onAnimPullUp = undefined;
        this.onAnimLoading = undefined;
        this.refreshStateChange = undefined;
        this.loadMoreStateChange = undefined;
        this.__mHeightNumber = new ObservedPropertySimplePU(0, this, "mHeightNumber");
        this.__trYTop = new ObservedPropertySimplePU(0, this, "trYTop");
        this.__trYBottom = new ObservedPropertySimplePU(0, this, "trYBottom");
        this.__state = new ObservedPropertySimplePU(IS_FREE, this, "state");
        this.lastState = IS_FREE;
        this.__refreshText = new ObservedPropertySimplePU('', this, "refreshText");
        this.__loadText = new ObservedPropertySimplePU('', this, "loadText");
        this.__angle1 = new ObservedPropertySimplePU(0, this, "angle1");
        this.__angle2 = new ObservedPropertySimplePU(0, this, "angle2");
        this.mWidthNumber = 0;
        this.touchYOld = 0;
        this.touchYNew = 0;
        this.listOffsetOld = 0;
        this.listOffsetNew = 0;
        this.canvasSetting = new RenderingContextSettings(true);
        this.canvasRefresh = new CanvasRenderingContext2D(this.canvasSetting);
        this.value = 0;
        this.timer = undefined;
        this.refreshRingOx = 0;
        this.refreshRingOy = 0;
        this.refreshRingRadius = 0;
        this.refreshPoint1x = 0;
        this.refreshPoint1y = 0;
        this.refreshPoint2x = 0;
        this.refreshPoint2y = 0;
        this.panOption = new PanGestureOptions({ direction: PanDirection.Up | PanDirection.Down });
        this.setInitiallyProvidedValue(params);
        this.declareWatch("state", this.onStateChange);
    }
    setInitiallyProvidedValue(params: PullToRefresh_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.customList !== undefined) {
            this.customList = params.customList;
        }
        if (params.refreshConfigurator !== undefined) {
            this.refreshConfigurator = params.refreshConfigurator;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.onRefresh !== undefined) {
            this.onRefresh = params.onRefresh;
        }
        if (params.onLoadMore !== undefined) {
            this.onLoadMore = params.onLoadMore;
        }
        if (params.customRefresh !== undefined) {
            this.customRefresh = params.customRefresh;
        }
        if (params.onAnimPullDown !== undefined) {
            this.onAnimPullDown = params.onAnimPullDown;
        }
        if (params.onAnimRefreshing !== undefined) {
            this.onAnimRefreshing = params.onAnimRefreshing;
        }
        if (params.customLoad !== undefined) {
            this.customLoad = params.customLoad;
        }
        if (params.onAnimPullUp !== undefined) {
            this.onAnimPullUp = params.onAnimPullUp;
        }
        if (params.onAnimLoading !== undefined) {
            this.onAnimLoading = params.onAnimLoading;
        }
        if (params.refreshStateChange !== undefined) {
            this.refreshStateChange = params.refreshStateChange;
        }
        if (params.loadMoreStateChange !== undefined) {
            this.loadMoreStateChange = params.loadMoreStateChange;
        }
        if (params.mHeightNumber !== undefined) {
            this.mHeightNumber = params.mHeightNumber;
        }
        if (params.trYTop !== undefined) {
            this.trYTop = params.trYTop;
        }
        if (params.trYBottom !== undefined) {
            this.trYBottom = params.trYBottom;
        }
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.lastState !== undefined) {
            this.lastState = params.lastState;
        }
        if (params.refreshText !== undefined) {
            this.refreshText = params.refreshText;
        }
        if (params.loadText !== undefined) {
            this.loadText = params.loadText;
        }
        if (params.angle1 !== undefined) {
            this.angle1 = params.angle1;
        }
        if (params.angle2 !== undefined) {
            this.angle2 = params.angle2;
        }
        if (params.mWidthNumber !== undefined) {
            this.mWidthNumber = params.mWidthNumber;
        }
        if (params.touchYOld !== undefined) {
            this.touchYOld = params.touchYOld;
        }
        if (params.touchYNew !== undefined) {
            this.touchYNew = params.touchYNew;
        }
        if (params.listOffsetOld !== undefined) {
            this.listOffsetOld = params.listOffsetOld;
        }
        if (params.listOffsetNew !== undefined) {
            this.listOffsetNew = params.listOffsetNew;
        }
        if (params.canvasSetting !== undefined) {
            this.canvasSetting = params.canvasSetting;
        }
        if (params.canvasRefresh !== undefined) {
            this.canvasRefresh = params.canvasRefresh;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.refreshRingOx !== undefined) {
            this.refreshRingOx = params.refreshRingOx;
        }
        if (params.refreshRingOy !== undefined) {
            this.refreshRingOy = params.refreshRingOy;
        }
        if (params.refreshRingRadius !== undefined) {
            this.refreshRingRadius = params.refreshRingRadius;
        }
        if (params.refreshPoint1x !== undefined) {
            this.refreshPoint1x = params.refreshPoint1x;
        }
        if (params.refreshPoint1y !== undefined) {
            this.refreshPoint1y = params.refreshPoint1y;
        }
        if (params.refreshPoint2x !== undefined) {
            this.refreshPoint2x = params.refreshPoint2x;
        }
        if (params.refreshPoint2y !== undefined) {
            this.refreshPoint2y = params.refreshPoint2y;
        }
        if (params.panOption !== undefined) {
            this.panOption = params.panOption;
        }
    }
    updateStateVars(params: PullToRefresh_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mHeightNumber.purgeDependencyOnElmtId(rmElmtId);
        this.__trYTop.purgeDependencyOnElmtId(rmElmtId);
        this.__trYBottom.purgeDependencyOnElmtId(rmElmtId);
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshText.purgeDependencyOnElmtId(rmElmtId);
        this.__loadText.purgeDependencyOnElmtId(rmElmtId);
        this.__angle1.purgeDependencyOnElmtId(rmElmtId);
        this.__angle2.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mHeightNumber.aboutToBeDeleted();
        this.__trYTop.aboutToBeDeleted();
        this.__trYBottom.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        this.__refreshText.aboutToBeDeleted();
        this.__loadText.aboutToBeDeleted();
        this.__angle1.aboutToBeDeleted();
        this.__angle2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // @Link data: Object[];
    private scroller: Scroller;
    private __customList?;
    private refreshConfigurator?: PullToRefreshConfigurator;
    private mWidth?: Length;
    private mHeight?: Length;
    private onRefresh?: () => Promise<string>;
    private onLoadMore?: () => Promise<string>;
    // 自定义下拉动画
    private __customRefresh?;
    //开启自定义下拉动画
    private onAnimPullDown?: (value?: number, width?: number, height?: number) => void;
    private onAnimRefreshing?: (value?: number, width?: number, height?: number) => void;
    // 自定义上拉动画
    private __customLoad?;
    private onAnimPullUp?: (value?: number, width?: number, height?: number) => void;
    private onAnimLoading?: (value?: number, width?: number, height?: number) => void;
    private refreshStateChange?: ((state: RefreshEventState) => void) | null;
    private loadMoreStateChange?: ((state: RefreshEventState) => void) | null;
    //-----------------------------以下为组件内自用属性-----------------------------//
    private __mHeightNumber?: ObservedPropertySimplePU<number>;
    get mHeightNumber() {
        return this.__mHeightNumber.get();
    }
    set mHeightNumber(newValue: number) {
        this.__mHeightNumber.set(newValue);
    }
    private __trYTop?: ObservedPropertySimplePU<number>;
    get trYTop() {
        return this.__trYTop.get();
    }
    set trYTop(newValue: number) {
        this.__trYTop.set(newValue);
    }
    private __trYBottom?: ObservedPropertySimplePU<number>;
    get trYBottom() {
        return this.__trYBottom.get();
    }
    set trYBottom(newValue: number) {
        this.__trYBottom.set(newValue);
    }
    private __state?: ObservedPropertySimplePU<number>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: number) {
        this.__state.set(newValue);
    }
    private lastState: number;
    private __refreshText?: ObservedPropertySimplePU<string>;
    get refreshText() {
        return this.__refreshText.get();
    }
    set refreshText(newValue: string) {
        this.__refreshText.set(newValue);
    }
    private __loadText?: ObservedPropertySimplePU<string>;
    get loadText() {
        return this.__loadText.get();
    }
    set loadText(newValue: string) {
        this.__loadText.set(newValue);
    }
    private __angle1?: ObservedPropertySimplePU<number | string>;
    get angle1() {
        return this.__angle1.get();
    }
    set angle1(newValue: number | string) {
        this.__angle1.set(newValue);
    }
    private __angle2?: ObservedPropertySimplePU<number | string>;
    get angle2() {
        return this.__angle2.get();
    }
    set angle2(newValue: number | string) {
        this.__angle2.set(newValue);
    }
    private mWidthNumber?: number;
    private touchYOld?: number;
    private touchYNew?: number;
    private listOffsetOld?: number;
    private listOffsetNew?: number;
    private canvasSetting?: RenderingContextSettings;
    private canvasRefresh?: CanvasRenderingContext2D;
    private value?: number;
    private timer?: number;
    private refreshRingOx?: number;
    private refreshRingOy?: number;
    private refreshRingRadius?: number;
    private refreshPoint1x?: number;
    private refreshPoint1y?: number;
    private refreshPoint2x?: number;
    private refreshPoint2y?: number;
    private panOption: PanGestureOptions;
    aboutToAppear() {
        if (!this.refreshConfigurator) {
            this.refreshConfigurator = new PullToRefreshConfigurator();
        }
    }
    onStateChange() {
        if (this.state === this.lastState) {
            return;
        }
        const hummerState = state2HummerState(this.state as number, this.lastState);
        if (hummerState) {
            // 触发通知
            if (hummerState.action === 'loadMore') {
                this.loadMoreStateChange?.(hummerState.state!);
            }
            else {
                this.refreshStateChange?.(hummerState.state!);
            }
        }
        this.lastState = this.state as number;
    }
    private initCanvas(): void {
        if (this.refreshRingOx == 0) {
            if (this.canvasRefresh !== undefined && this.refreshConfigurator !== undefined) {
                this.canvasRefresh.strokeStyle = this.refreshConfigurator.getRefreshColor();
                this.canvasRefresh.fillStyle = this.refreshConfigurator.getRefreshColor();
                this.canvasRefresh.lineWidth = this.refreshConfigurator.getRefreshHeight() / 60 + 1;
            }
            if (this.refreshConfigurator !== undefined) {
                this.refreshRingOx = this.refreshConfigurator.getRefreshWidth() / 2; // 圆心x坐标
                this.refreshRingOy = this.refreshConfigurator.getRefreshHeight() / 2; // 圆心y坐标
                this.refreshRingRadius = this.refreshConfigurator.getRefreshHeight() / 4; // 半径
                this.refreshPoint1x = this.refreshRingOx + this.refreshRingRadius * Math.cos(Math.PI * 150 / 180);
                this.refreshPoint1y = this.refreshRingOy + this.refreshRingRadius * Math.sin(Math.PI * 150 / 180);
                this.refreshPoint2x = this.refreshRingOx + this.refreshRingRadius * Math.cos(Math.PI * -30 / 180);
                this.refreshPoint2y = this.refreshRingOy + this.refreshRingRadius * Math.sin(Math.PI * -30 / 180);
            }
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(182:5)");
            Column.width(this.mWidth === undefined ? '100%' : this.mWidth);
            Column.height(this.mHeight === undefined ? '100%' : this.mHeight);
            Column.onAreaChange((oldValue: Area, newValue: Area) => {
                this.mWidthNumber = Math.round(newValue.width as number);
                this.mHeightNumber = Math.round(newValue.height as number);
            });
            Gesture.create(GesturePriority.Parallel);
            PanGesture.create(this.panOption);
            PanGesture.onActionStart((event?: GestureEvent) => {
                if (event !== undefined) {
                    this.touchYOld = event.offsetY;
                }
            });
            PanGesture.onActionUpdate((event?: GestureEvent) => {
                if (event !== undefined) {
                    this.onActionUpdate(event);
                }
            });
            PanGesture.onActionEnd(() => {
                this.onActionEnd();
            });
            PanGesture.pop();
            Gesture.pop();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 下拉刷新动画部分
            Stack.create();
            Stack.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(184:7)");
            // 下拉刷新动画部分
            Stack.width('100%');
            // 下拉刷新动画部分
            Stack.height(this.trYTop !== undefined ? this.trYTop : 0);
            // 下拉刷新动画部分
            Stack.backgroundColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshBackgroundColor() : 0);
        }, Stack);
        this.headerUI.bind(this)();
        // 下拉刷新动画部分
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主体列表部分
            Column.create();
            Column.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(192:7)");
            // 主体列表部分
            Column.width('100%');
            // 主体列表部分
            Column.height((this.mHeightNumber !== undefined ? this.mHeightNumber : 0) - (this.trYTop !== undefined ? this.trYTop : 0) + (this.trYBottom !== undefined ? this.trYBottom : 0));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.customList !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.customList.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 主体列表部分
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 上拉加载动画部分
            Stack.create();
            Stack.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(201:7)");
            // 上拉加载动画部分
            Stack.width('100%');
            // 上拉加载动画部分
            Stack.height(this.trYBottom !== undefined ? -this.trYBottom : 0);
            // 上拉加载动画部分
            Stack.backgroundColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadBackgroundColor() : 0);
        }, Stack);
        this.footerUI.bind(this)();
        // 上拉加载动画部分
        Stack.pop();
        Column.pop();
    }
    private headerUI(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.customRefresh !== undefined && this.customRefresh !== null) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(235:7)");
                        Column.clip(true);
                        Column.width('100%');
                        Column.height('100%');
                    }, Column);
                    this.customRefresh.bind(this)();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(242:7)");
                        Stack.width('100%');
                        Stack.height('100%');
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.refreshText);
                        Text.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(243:9)");
                        Text.textAlign(TextAlign.Center);
                        Text.fontColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshTextColor() : 0);
                        Text.fontSize(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshTextSize() : 0);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(247:9)");
                        Stack.width(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshWidth() : 0);
                        Stack.height(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshHeight() : 0);
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Canvas.create(this.canvasRefresh);
                        Canvas.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(248:11)");
                        Canvas.width('100%');
                        Canvas.height('100%');
                        Canvas.onReady(() => {
                            this.initCanvas();
                        });
                        Canvas.visibility(this.state == IS_PULL_DOWN_2 ? Visibility.Visible : Visibility.Hidden);
                    }, Canvas);
                    Canvas.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(255:11)");
                        LoadingProgress.width(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshHeight() : 0);
                        LoadingProgress.height(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshHeight() : 0);
                        LoadingProgress.color(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getRefreshColor() : 0);
                        LoadingProgress.visibility(this.state == IS_REFRESHING ? Visibility.Visible : Visibility.Hidden);
                    }, LoadingProgress);
                    Stack.pop();
                    Stack.pop();
                });
            }
        }, If);
        If.pop();
    }
    private footerUI(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.customLoad !== undefined && this.customLoad !== null) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(272:7)");
                        Column.clip(true);
                        Column.width('100%');
                        Column.height('100%');
                    }, Column);
                    this.customLoad.bind(this)();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(279:7)");
                        Row.height('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(280:9)");
                        Stack.width(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadImgHeight() : 0);
                        Stack.height(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadImgHeight() : 0);
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.hummer", "moduleName": "entry" });
                        Image.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(281:11)");
                        Image.width('100%');
                        Image.height('100%');
                        Image.objectFit(ImageFit.Contain);
                        Image.visibility(this.state == IS_PULL_UP_2 ? Visibility.Visible : Visibility.Hidden);
                        Image.rotate({
                            z: 1,
                            angle: this.angle1 !== undefined ? this.angle1 : 0
                        });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.hummer", "moduleName": "entry" });
                        Image.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(290:11)");
                        Image.width('100%');
                        Image.height('100%');
                        Image.objectFit(ImageFit.Contain);
                        Image.visibility(this.state == IS_LOADING ? Visibility.Visible : Visibility.Hidden);
                        Image.rotate({
                            z: 1,
                            angle: this.angle2 !== undefined ? this.angle2 : 0
                        });
                    }, Image);
                    Stack.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.loadText);
                        Text.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/PullToRefresh.ets(303:9)");
                        Text.height('100%');
                        Text.textAlign(TextAlign.Center);
                        Text.margin({ left: 8 });
                        Text.fontColor(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadTextColor() : 0);
                        Text.fontSize(this.refreshConfigurator !== undefined ? this.refreshConfigurator.getLoadTextSize() : 0);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
    }
    private onActionUpdate(event: GestureEvent): void {
        if (this.state !== undefined && this.refreshConfigurator !== undefined && this.touchYOld !== undefined) {
            if (this.state == IS_FREE ||
                this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2 ||
                this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                let maxTranslate = this.refreshConfigurator.getMaxTranslate();
                let loadImgHeight = this.refreshConfigurator.getLoadImgHeight();
                let refreshHeight = this.refreshConfigurator.getRefreshHeight();
                if (!this.scroller.currentOffset()) {
                    return;
                }
                this.touchYNew = event.offsetY;
                // 当前手势是否下拉
                let distanceY = this.touchYNew - this.touchYOld;
                let isPullAction = distanceY > 0;
                //兼容页面滑动到顶部时，this.scroller.currentOffset().yOffset返回0.000000....的浮点数的情况
                let yOffset: number = this.scroller.currentOffset().yOffset;
                let isTop: boolean = yOffset == 0 ? true : false;
                if (yOffset > -0.0001 && yOffset < 0.001) {
                    isTop = true;
                }
                if ((this.state == IS_FREE && isTop && isPullAction) || // 处于自由状态且列表处于顶部位置 并且 当前手势是下拉手势
                    this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2) { // 处于下拉状态中
                    if (this.refreshConfigurator.getHasRefresh()) {
                        if (this.touchYOld !== undefined && refreshHeight !== undefined) {
                            // 获取最新位移距离
                            let trY = this.touchYNew - this.touchYOld;
                            //防止下拉回滑时list组件底层跟着滑动
                            if (trY < 0) {
                                this.scroller.scrollTo({ xOffset: 0, yOffset: 0 });
                            }
                            // 计算当前需要位移的总距离
                            this.trYTop = this.getTranslateYOfRefresh(trY);
                            if (this.trYTop < refreshHeight) {
                                this.state = IS_PULL_DOWN_1;
                            }
                            else {
                                this.state = IS_PULL_DOWN_2;
                            }
                            // 如果没有自定义刷新动画，就执行内置动画下拉时的逻辑
                            if (!this.customRefresh && maxTranslate !== undefined) {
                                this.drawRefreshView(this.trYTop / maxTranslate);
                            }
                            // 如果有下拉中动画回调，就执行下拉中动画回调
                            if (this.onAnimPullDown && maxTranslate !== undefined) {
                                this.onAnimPullDown(this.trYTop / maxTranslate, this.mWidthNumber, this.trYTop);
                            }
                        }
                    }
                }
                else if (this.refreshConfigurator.getHasLoadMore()) {
                    this.listOffsetNew = this.scroller.currentOffset().yOffset;
                    // 列表处于底部位置且上滑时，2.已上滑时
                    try {
                        if (this.touchYOld !== undefined) {
                            if ((this.state == IS_FREE && this.listOffsetOld == this.listOffsetNew && this.listOffsetOld != 0 && this.touchYNew < this.touchYOld && this.scroller.isAtEnd()) ||
                                this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                                // 获取最新的位移距离
                                let trY = this.touchYNew - this.touchYOld;
                                // 计算当前需要位移的总距离
                                this.trYBottom = this.getTranslateYOfLoadMore(trY);
                                if (loadImgHeight !== undefined && this.trYBottom > -loadImgHeight) {
                                    this.state = IS_PULL_UP_1;
                                }
                                else {
                                    this.state = IS_PULL_UP_2;
                                }
                                // 如果没有自定义加载更多动画，就执行内置动画上拉时的逻辑
                                if (!this.customLoad && maxTranslate !== undefined) {
                                    this.drawLoadView(true, -this.trYBottom / maxTranslate);
                                }
                                // 如果有上拉中动画回调，就执行上拉中动画回调
                                if (this.onAnimPullUp) {
                                    if (this.trYBottom !== undefined && maxTranslate !== undefined) {
                                        this.onAnimPullUp(-this.trYBottom / maxTranslate, this.mWidthNumber, -this.trYBottom);
                                    }
                                }
                            }
                        }
                    }
                    catch (error) {
                        if (this.touchYOld !== undefined) {
                            if ((this.state == IS_FREE && this.listOffsetOld == this.listOffsetNew && this.listOffsetOld != 0 && this.touchYNew < this.touchYOld) ||
                                this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                                if (this.touchYNew !== undefined && this.touchYOld !== undefined && loadImgHeight !== undefined) {
                                    // 获取最新的位移距离
                                    let trY = this.touchYNew - this.touchYOld;
                                    // 计算当前需要位移的总距离
                                    this.trYBottom = this.getTranslateYOfLoadMore(trY);
                                    if (this.trYBottom > -loadImgHeight) {
                                        this.state = IS_PULL_UP_1;
                                    }
                                    else {
                                        this.state = IS_PULL_UP_2;
                                    }
                                    // 如果没有自定义加载更多动画，就执行内置动画上拉时的逻辑
                                    if (!this.customLoad && maxTranslate !== undefined) {
                                        this.drawLoadView(true, -this.trYBottom / maxTranslate);
                                    }
                                    // 如果有上拉中动画回调，就执行上拉中动画回调
                                    if (this.onAnimPullUp) {
                                        if (this.trYBottom !== undefined && maxTranslate !== undefined) {
                                            this.onAnimPullUp(-this.trYBottom / maxTranslate, this.mWidthNumber, -this.trYBottom);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.listOffsetOld = this.listOffsetNew;
                }
                this.touchYOld = this.touchYNew;
            }
        }
    }
    private onActionEnd(): void {
        if (this.refreshConfigurator !== undefined) {
            let maxTranslate = this.refreshConfigurator.getMaxTranslate();
            let refreshAnimDuration = this.refreshConfigurator.getRefreshAnimDuration();
            if (this.refreshConfigurator.getListIsPlacement()) {
                if (this.state !== undefined) {
                    if (this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2) {
                        // 让列表归位到顶部
                        this.scroller.scrollEdge(Edge.Top);
                        // 让列表归位到底部
                    }
                    else if (this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                        this.scroller.scrollEdge(Edge.Bottom);
                    }
                }
            }
            if (this.trYTop !== undefined) {
                if (this.trYTop > 0) { // 下拉结束
                    if (this.state !== undefined && maxTranslate !== undefined) {
                        if (this.state == IS_FREE || this.state == IS_PULL_DOWN_1 || this.state == IS_PULL_DOWN_2) {
                            if (this.trYTop / maxTranslate < 0.75) {
                                this.closeRefresh();
                            }
                            else {
                                this.state = IS_REFRESHING;
                                this.trYTop = maxTranslate * 0.75;
                                clearInterval(this.timer);
                                this.timer = setInterval(() => {
                                    if (this.value !== undefined) {
                                        if (this.value >= 1) {
                                            this.value -= 1;
                                        }
                                        else {
                                            if (refreshAnimDuration !== undefined && refreshAnimDuration !== 0) {
                                                this.value += 10 / refreshAnimDuration;
                                            }
                                        }
                                        // 保留3位小数
                                        this.value = Math.round(this.value * 1000) / 1000;
                                    }
                                    // 刷新中动画采用系统组件，因此不用自己去执行动画
                                    // 如果有刷新中动画回调，就执行刷新中动画回调
                                    if (this.onAnimRefreshing) {
                                        this.onAnimRefreshing(this.value, this.mWidthNumber, this.trYTop);
                                    }
                                }, 10);
                                if (this.onRefresh !== undefined) {
                                    this.onRefresh().then((refreshText) => {
                                        if (refreshText.length == 0) {
                                            this.closeRefresh();
                                        }
                                        else {
                                            this.state = IS_REFRESHED;
                                            if (!this.customRefresh) {
                                                this.refreshText = refreshText;
                                            }
                                            setTimeout(() => {
                                                this.closeRefresh();
                                            }, 1000);
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
                else if (this.trYBottom !== undefined && this.trYBottom < 0) { // 上拉结束
                    if (this.state !== undefined && maxTranslate !== undefined) {
                        if (this.state == IS_FREE || this.state == IS_PULL_UP_1 || this.state == IS_PULL_UP_2) {
                            if (-this.trYBottom / maxTranslate < 0.75) {
                                this.closeLoad();
                            }
                            else {
                                this.state = IS_LOADING;
                                this.trYBottom = -maxTranslate * 0.75;
                                clearInterval(this.timer);
                                this.timer = setInterval(() => {
                                    if (this.value !== undefined) {
                                        if (this.value >= 1) {
                                            this.value -= 1;
                                        }
                                        else {
                                            this.value += 0.01;
                                        }
                                        // 保留2位小数
                                        this.value = Math.round(this.value * 100) / 100;
                                        // 如果没有自定义加载中动画，就执行内置加载中动画
                                        if (!this.customLoad) {
                                            this.drawLoadView(false, this.value);
                                        }
                                    }
                                    // 如果有加载中动画回调，就执行加载中动画回调
                                    if (this.onAnimLoading) {
                                        if (this.trYBottom !== undefined) {
                                            this.onAnimLoading(this.value, this.mWidthNumber, -this.trYBottom);
                                        }
                                    }
                                }, 10);
                                if (this.onLoadMore !== undefined) {
                                    this.onLoadMore().then((loadText) => {
                                        this.closeLoad();
                                    });
                                }
                            }
                        }
                    }
                }
                else {
                    this.state = IS_FREE;
                }
            }
        }
    }
    private getTranslateYOfRefresh(newTranslateY: number): number {
        if (this.refreshConfigurator !== undefined) {
            let maxTranslateY = this.refreshConfigurator.getMaxTranslate();
            let sensitivity = this.refreshConfigurator.getSensitivity();
            if (maxTranslateY !== undefined && sensitivity !== undefined && this.trYTop !== undefined) {
                // 阻尼值计算
                if (this.trYTop / maxTranslateY < 0.2) {
                    newTranslateY = newTranslateY * 1 * sensitivity;
                }
                else if (this.trYTop / maxTranslateY < 0.4) {
                    newTranslateY = newTranslateY * 0.8 * sensitivity;
                }
                else if (this.trYTop / maxTranslateY < 0.6) {
                    newTranslateY = newTranslateY * 0.6 * sensitivity;
                }
                else if (this.trYTop / maxTranslateY < 0.8) {
                    newTranslateY = newTranslateY * 0.4 * sensitivity;
                }
                else {
                    newTranslateY = newTranslateY * 0.2 * sensitivity;
                }
                // 下拉值计算
                if (this.trYTop + newTranslateY > maxTranslateY) {
                    return maxTranslateY;
                }
                else if (this.trYTop + newTranslateY < 0) {
                    return 0;
                }
                else {
                    return this.trYTop + newTranslateY;
                }
            }
        }
        return 0;
    }
    private getTranslateYOfLoadMore(newTranslateY: number): number {
        if (this.refreshConfigurator !== undefined) {
            let maxTranslateY = this.refreshConfigurator.getMaxTranslate();
            let sensitivity = this.refreshConfigurator.getSensitivity();
            if (maxTranslateY !== undefined && sensitivity !== undefined && this.trYBottom !== undefined) {
                // 阻尼值计算
                if (this.trYBottom / maxTranslateY > -0.2) {
                    newTranslateY = newTranslateY * 1 * sensitivity;
                }
                else if (this.trYBottom / maxTranslateY > -0.4) {
                    newTranslateY = newTranslateY * 0.8 * sensitivity;
                }
                else if (this.trYBottom / maxTranslateY > -0.6) {
                    newTranslateY = newTranslateY * 0.6 * sensitivity;
                }
                else if (this.trYBottom / maxTranslateY > -0.8) {
                    newTranslateY = newTranslateY * 0.4 * sensitivity;
                }
                else {
                    newTranslateY = newTranslateY * 0.2 * sensitivity;
                }
                // 下拉值计算
                if (this.trYBottom + newTranslateY < -maxTranslateY) {
                    return -maxTranslateY;
                }
                else if (this.trYBottom + newTranslateY > 0) {
                    return 0;
                }
                else {
                    return this.trYBottom + newTranslateY;
                }
            }
        }
        return 0;
    }
    private drawRefreshView(value: number): void {
        if (this.refreshConfigurator !== undefined && this.trYTop !== undefined) {
            let refreshHeight = this.refreshConfigurator.getRefreshHeight();
            if (refreshHeight !== undefined && this.trYTop >= refreshHeight) {
                if (this.canvasRefresh !== undefined) {
                    let refreshWidth = this.refreshConfigurator.getRefreshWidth();
                    if (refreshWidth !== undefined) {
                        this.canvasRefresh.clearRect(0, 0, refreshWidth, refreshHeight);
                    }
                    // 绘制圆环
                    this.canvasRefresh.beginPath();
                    if (this.refreshRingOx !== undefined && this.refreshRingOy !== undefined && this.refreshRingRadius !== undefined) {
                        this.canvasRefresh.arc(this.refreshRingOx, this.refreshRingOy, this.refreshRingRadius, 0, Math.PI * 2);
                    }
                    this.canvasRefresh.stroke();
                    // 绘制卫星
                    value = value > 0.75 ? 0.75 : value;
                    this.canvasRefresh.beginPath();
                    if (this.refreshPoint2x !== undefined && this.refreshPoint1x !== undefined
                        && this.refreshPoint2y !== undefined && this.refreshPoint1y !== undefined) {
                        this.canvasRefresh.arc(value * (this.refreshPoint2x - this.refreshPoint1x) + this.refreshPoint1x, value * (this.refreshPoint2y - this.refreshPoint1y) + this.refreshPoint1y, refreshHeight / 20 + 1, 0, Math.PI * 2);
                    }
                    this.canvasRefresh.fill();
                }
            }
        }
    }
    private drawLoadView(isPullUp: boolean, value: number): void {
        if (isPullUp) {
            if (this.refreshConfigurator !== undefined) {
                let loadImgHeight = this.refreshConfigurator.getLoadImgHeight();
                if (loadImgHeight !== undefined && this.trYBottom !== undefined) {
                    if (this.trYBottom <= -loadImgHeight) {
                        if (value < 0.75) {
                            this.angle1 = 0;
                            if (this.refreshConfigurator !== undefined) {
                                this.loadText = this.refreshConfigurator.getLoadTextPullUp1();
                            }
                        }
                        else {
                            this.angle1 = 180;
                            if (this.refreshConfigurator !== undefined) {
                                this.loadText = this.refreshConfigurator.getLoadTextPullUp2();
                            }
                        }
                    }
                    else {
                        this.loadText = '';
                    }
                }
            }
        }
        else {
            this.angle2 = value * 360;
            if (this.refreshConfigurator !== undefined) {
                this.loadText = this.refreshConfigurator.getLoadTextLoading();
            }
        }
    }
    public closeRefresh(): void {
        clearInterval(this.timer);
        if (this.refreshConfigurator !== undefined) {
            Context.animateTo({ duration: this.refreshConfigurator.getAnimDuration() }, () => {
                this.trYTop = 0;
            });
        }
        if (this.refreshConfigurator !== undefined) {
            setTimeout(() => {
                this.state = IS_FREE;
                this.refreshText = '';
            }, this.refreshConfigurator.getAnimDuration());
        }
    }
    public closeLoad(): void {
        clearInterval(this.timer);
        if (this.refreshConfigurator !== undefined) {
            Context.animateTo({ duration: this.refreshConfigurator.getAnimDuration() }, () => {
                this.trYBottom = 0;
            });
        }
        this.state = IS_FREE;
        this.loadText = '';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
