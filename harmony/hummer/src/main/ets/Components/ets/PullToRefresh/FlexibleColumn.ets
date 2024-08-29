
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
const fakeStyleModifier = new FakeStyleModifier()
export { fakeStyleModifier }

@Component
export struct FlexibleColumn {
  @BuilderParam childBuilder?: (() => void) | null;
  private _width: number = -1;
  private _height: number = -1;
  didUpdateLayout?: (width: number, height: number) => void

  build() {
    Column() {
      this.childBuilder?.();
    }
  }

  onMeasureSize(selfLayoutInfo: GeometryInfo, children: Measurable[], constraint: ConstraintSizeOptions): SizeResult {
    let selfWidth = selfLayoutInfo.width;
    let height = 0;
    children.forEach((child) => {
      let result: MeasureResult = child.measure(constraint)
      height += result.height;
    })
    if (this._width != selfWidth || this._height != height) {
      this._width = selfWidth;
      this._height = height;
      this.didUpdateLayout?.(selfWidth, height);
    }
    return { width: selfWidth, height: height }
  }
}