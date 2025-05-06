interface FlexibleColumn_Params {
    childBuilder?: (() => void) | null;
    _width?: number;
    _height?: number;
    didUpdateLayout?: (width: number, height: number) => void;
}
export class FakeStyleModifier implements AttributeModifier<CommonAttribute> {
    applyNormalAttribute(instance: CommonAttribute): void {
    }
    applyPressedAttribute(instance: CommonAttribute): void {
    }
    applyFocusedAttribute(instance: CommonAttribute): void {
    }
    applyDisabledAttribute(instance: CommonAttribute): void {
    }
    applySelectedAttribute(instance: CommonAttribute): void {
    }
}
const fakeStyleModifier = new FakeStyleModifier();
export { fakeStyleModifier };
export class FlexibleColumn extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.childBuilder = undefined;
        this._width = -1;
        this._height = -1;
        this.didUpdateLayout = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: FlexibleColumn_Params) {
        if (params.childBuilder !== undefined) {
            this.childBuilder = params.childBuilder;
        }
        if (params._width !== undefined) {
            this._width = params._width;
        }
        if (params._height !== undefined) {
            this._height = params._height;
        }
        if (params.didUpdateLayout !== undefined) {
            this.didUpdateLayout = params.didUpdateLayout;
        }
    }
    updateStateVars(params: FlexibleColumn_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __childBuilder?;
    private _width: number;
    private _height: number;
    private didUpdateLayout?: (width: number, height: number) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("hummer/src/main/ets/Components/ets/PullToRefresh/FlexibleColumn.ets(29:5)");
        }, Column);
        this.childBuilder?.bind(this)();
        Column.pop();
    }
    onMeasureSize(selfLayoutInfo: GeometryInfo, children: Measurable[], constraint: ConstraintSizeOptions): SizeResult {
        let selfWidth = selfLayoutInfo.width;
        let height = 0;
        children.forEach((child) => {
            let result: MeasureResult = child.measure(constraint);
            height += result.height;
        });
        if (this._width != selfWidth || this._height != height) {
            this._width = selfWidth;
            this._height = height;
            this.didUpdateLayout?.(selfWidth, height);
        }
        return { width: selfWidth, height: height };
    }
    rerender() {
        this.updateDirtyElements();
    }
}
