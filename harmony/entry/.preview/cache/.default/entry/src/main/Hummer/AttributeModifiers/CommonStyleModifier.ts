import type { Node } from '../Components/Node';
import type { IHummerStyle } from '../Style/IHummerStyle';
import { FlexManager, getBorderStyle, getLinearGradient, getShadow } from "@bundle:com.example.hummer/entry/src/main/Hummer/AttributeModifiers/Utils";
import { convertColorToARGB, isUndefined } from "@bundle:com.example.hummer/entry/src/main/Hummer/Utils/Utils";
import { getVP } from "@bundle:com.example.hummer/entry/src/main/Hummer/AttributeModifiers/Utils";
export class CommonStyleModifier implements AttributeModifier<CommonAttribute> {
    node: Node | null = null;
    style?: IHummerStyle;
    useYoga: boolean = false;
    enabled?: boolean | undefined;
    setNode(node: Node, style?: IHummerStyle) {
        this.node = node;
        if (style) {
            this.style = style;
        }
        else {
            this.style = this.node.style;
        }
        this.enabled = this.node.attributes.enabled;
        return this;
    }
    applyNormalAttribute(instance: CommonAttribute): void {
        if (!this.node || !this.style) {
            return;
        }
        // instance.hitTestBehavior(HitTestMode.Block);
        instance.id(this.node.uniqueId);
        if (!isUndefined(this.enabled)) {
            instance.enabled(this.enabled);
        }
        if (!isUndefined(this.style.width)) {
            instance.width(this.style.width);
        }
        if (!isUndefined(this.style.height)) {
            instance.height(this.style.height);
        }
        // 样式冲突处理 linearGradient 和 backgroundImage
        // 当两者都可以和 color 叠加
        // 当 linearGradient 和 backgroundImage 都存在时，已 backgroundImage 为主
        const linearGradient = getLinearGradient(this.style.backgroundColor);
        if (!isUndefined(this.style.backgroundColor)) {
            // 兼容老写法（linearGradient 在 backgroundColor 中）
            if (isUndefined(linearGradient)) {
                instance.backgroundColor(convertColorToARGB(this.style.backgroundColor));
            }
            else {
                instance.linearGradient(linearGradient);
            }
        }
        // 处理 linearGradient 和 backgroundImage 冲突
        if (!isUndefined(this.style.backgroundImage)) {
            if (isUndefined(linearGradient)) {
                instance.backgroundImage(this.style.backgroundImage);
            }
            else {
                instance.linearGradient(linearGradient);
            }
        }
        // 样式冲突处理 先 display 后 Visibility（Visibility覆盖display）
        if (!isUndefined(this.style.display)) {
            const visibility = this.style.display == "none" ? Visibility.None : Visibility.Visible;
            instance.visibility(visibility);
        }
        if (!isUndefined(this.style.visibility)) {
            const visibility = this.style.visibility == "hidden" ? Visibility.Hidden : Visibility.Visible;
            instance.visibility(visibility);
        }
        const borderTopStyle = getBorderStyle(this.style.alignSelf);
        const borderRightStyle = getBorderStyle(this.style.alignSelf);
        const borderBottomStyle = getBorderStyle(this.style.alignSelf);
        const borderLeftStyle = getBorderStyle(this.style.alignSelf);
        if (!isUndefined(borderTopStyle) || !isUndefined(borderRightStyle) || !isUndefined(borderBottomStyle) || !isUndefined(borderLeftStyle)) {
            instance.borderStyle({
                top: borderTopStyle,
                right: borderRightStyle,
                bottom: borderBottomStyle,
                left: borderLeftStyle
            });
        }
        if (!isUndefined(this.style.borderTopWidth) || !isUndefined(this.style.borderRightWidth) || !isUndefined(this.style.borderBottomWidth) || !isUndefined(this.style.borderLeftWidth)) {
            instance.borderWidth({
                top: this.style.borderTopWidth,
                right: this.style.borderRightWidth,
                bottom: this.style.borderBottomWidth,
                left: this.style.borderLeftWidth
            });
        }
        if (!isUndefined(this.style.borderTopColor) || !isUndefined(this.style.borderRightColor) || !isUndefined(this.style.borderBottomColor) || !isUndefined(this.style.borderLeftColor)) {
            instance.borderColor({
                top: this.style.borderTopColor,
                right: this.style.borderRightColor,
                bottom: this.style.borderBottomColor,
                left: this.style.borderLeftColor
            });
        }
        if (!isUndefined(this.style.borderTopLeftRadius) || !isUndefined(this.style.borderTopRightRadius) || !isUndefined(this.style.borderBottomLeftRadius) || !isUndefined(this.style.borderBottomRightRadius)) {
            instance.borderRadius({
                topLeft: this.style.borderTopLeftRadius,
                topRight: this.style.borderTopRightRadius,
                bottomLeft: this.style.borderBottomLeftRadius,
                bottomRight: this.style.borderBottomRightRadius
            });
        }
        if (!isUndefined(this.style.zIndex)) {
            instance.zIndex(this.style.zIndex);
        }
        if (!isUndefined(this.style.opacity)) {
            instance.opacity(this.style.opacity);
        }
        const shadow = getShadow(this.style.shadow);
        if (!isUndefined(shadow)) {
            instance.shadow(shadow);
        }
        if (!isUndefined(this.style.overflow)) {
            instance.clip(this.style?.overflow == 'hidden');
        }
        if (!isUndefined(this.style.transformModel)) {
            const translate = this.style.transformModel.translate;
            if (translate) {
                instance.translate({
                    x: translate.x || 0,
                    y: translate.y || 0,
                    z: 0,
                });
            }
            const scale = this.style.transformModel.scale;
            if (scale) {
                instance.scale({
                    x: scale.x || 1,
                    y: scale.y || 1,
                    z: 1,
                });
            }
            const rotation = this.style.transformModel.rotation;
            if (rotation) {
                instance.rotate({
                    x: rotation.x || 0,
                    y: rotation.y || 0,
                    z: rotation.z || 0,
                    angle: rotation.angle
                });
            }
        }
        if (this.useYoga) {
            this._applyYogaLayoutAttribute(instance);
        }
        else {
            this._applyNormalLayoutAttribute(instance);
        }
        //   if (!isUndefined(this.style.transformOrigin)) {
        //     instance.rotate({ centerX: this.style.transformOrigin.x, centerY: this.style.transformOrigin.y, angle: 0 })
        //     instance.scale({ centerX: this.style.transformOrigin.x, centerY: this.style.transformOrigin.y })
        //   }
        //   if (!isUndefined(this.style.transform)) {
        //     instance.transform(this.style.transform)
        //   }
        //   if (this.node.hmStyle?.position === 'relative') {
        //     instance.offset({
        //       x: getLeft(this.node),
        //       y: getTop(this.node)
        //     })
        //   }
        // }
    }
    _applyNormalLayoutAttribute(instance: CommonAttribute): void {
        if (!this.node || !this.style) {
            return;
        }
        if (!isUndefined(this.style.flexGrow)) {
            instance.flexGrow(this.style.flexGrow);
        }
        if (!isUndefined(this.style.flexShrink)) {
            instance.flexShrink(this.style.flexShrink);
        }
        if (!isUndefined(this.style.flexBasis)) {
            instance.flexBasis(this.style.flexBasis);
        }
        const alignSelf = FlexManager.itemAlign(this.style.alignSelf);
        if (!isUndefined(alignSelf)) {
            instance.alignSelf(alignSelf);
        }
        if (!isUndefined(this.style.paddingTop) || !isUndefined(this.style.paddingRight) || !isUndefined(this.style.paddingBottom) || !isUndefined(this.style.paddingLeft)) {
            instance.padding({
                top: this.style.paddingTop,
                right: this.style.paddingRight,
                bottom: this.style.paddingBottom,
                left: this.style.paddingLeft
            });
        }
        if (!isUndefined(this.style.marginTop) || !isUndefined(this.style.marginRight) || !isUndefined(this.style.marginBottom) || !isUndefined(this.style.marginLeft)) {
            instance.margin({
                top: this.style.marginTop,
                right: this.style.marginRight,
                bottom: this.style.marginBottom,
                left: this.style.marginLeft
            });
        }
        if (!isUndefined(this.style.minWidth) || !isUndefined(this.style.maxWidth) || !isUndefined(this.style.minHeight) || !isUndefined(this.style.maxHeight)) {
            instance.constraintSize({
                minWidth: this.style.minWidth,
                maxWidth: this.style.maxWidth,
                minHeight: this.style.minHeight,
                maxHeight: this.style.maxHeight
            });
        }
        //todo: 鸿蒙不支持 绝对定位设置 right bottom
        if (this.style?.position === 'absolute' || this.style?.position === 'fixed') {
            const x = this.style.top ? getVP(this.style.top) : 0;
            const y = this.style.left ? getVP(this.style.left) : 0;
            instance.position({
                x: x,
                y: y
            });
        }
    }
    _applyYogaLayoutAttribute(instance: CommonAttribute): void {
        if (!this.node || !this.style) {
            return;
        }
        // yoga 计算结果后，只需要设置 x,y
        const x = this.style.top ? getVP(this.style.top) : 0;
        const y = this.style.left ? getVP(this.style.left) : 0;
        instance.position({
            x: x,
            y: y
        });
    }
}
const commonStyleModifier = new CommonStyleModifier();
export default commonStyleModifier;
