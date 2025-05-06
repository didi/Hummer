import type { HMNode } from '../Components/Node';
import type { IHummerStyle } from '../Interface/IHummerStyle';
import { FlexManager, getBorderStyle, getLinearGradient, getShadow, useRelativeContainer } from "@bundle:com.example.hummer/entry@hummer/ets/AttributeModifiers/Utils";
import { convertColorToARGB, getVP } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/Utils";
import { parseImageSrc } from "@bundle:com.example.hummer/entry@hummer/ets/Components/ets/Image/utils";
import { isUndefined } from "@bundle:com.example.hummer/entry@hummer/ets/Utils/is";
//todo 修改目录
export class CommonStyleModifier implements AttributeModifier<CommonAttribute> {
    node: HMNode | null = null;
    style?: IHummerStyle;
    useYoga: boolean = false;
    enabled?: boolean | undefined;
    setNode(node: HMNode, style?: IHummerStyle) {
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
        const width = getVP(this.style.width);
        if (!isUndefined(width)) {
            instance.width(width);
        }
        const height = getVP(this.style.height);
        if (!isUndefined(height)) {
            instance.height(height);
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
                instance.backgroundImageSize(ImageSize.Cover);
                instance.backgroundImage(parseImageSrc(this.style.backgroundImage, this.node.context.baseUrl));
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
        const borderTopWidth = getVP(this.style.borderTopWidth);
        const borderRightWidth = getVP(this.style.borderRightWidth);
        const borderBottomWidth = getVP(this.style.borderBottomWidth);
        const borderLeftWidth = getVP(this.style.borderLeftWidth);
        if (!isUndefined(borderTopWidth) || !isUndefined(borderRightWidth) || !isUndefined(borderBottomWidth) || !isUndefined(borderLeftWidth)) {
            instance.borderWidth({
                top: borderTopWidth,
                right: borderRightWidth,
                bottom: borderBottomWidth,
                left: borderLeftWidth
            });
        }
        const borderTopColor = convertColorToARGB(this.style.borderTopColor);
        const borderRightColor = convertColorToARGB(this.style.borderRightColor);
        const borderBottomColor = convertColorToARGB(this.style.borderBottomColor);
        const borderLeftColor = convertColorToARGB(this.style.borderLeftColor);
        if (!isUndefined(borderTopColor) || !isUndefined(borderRightColor) || !isUndefined(borderBottomColor) || !isUndefined(borderLeftColor)) {
            instance.borderColor({
                top: borderTopColor,
                right: borderRightColor,
                bottom: borderBottomColor,
                left: borderLeftColor
            });
        }
        const borderTopLeftRadius = getVP(this.style.borderTopLeftRadius);
        const borderTopRightRadius = getVP(this.style.borderTopRightRadius);
        const borderBottomLeftRadius = getVP(this.style.borderBottomLeftRadius);
        const borderBottomRightRadius = getVP(this.style.borderBottomRightRadius);
        if (!isUndefined(borderTopLeftRadius) || !isUndefined(borderTopRightRadius) || !isUndefined(borderBottomLeftRadius) || !isUndefined(borderBottomRightRadius)) {
            instance.borderRadius({
                topLeft: borderTopLeftRadius,
                topRight: borderTopRightRadius,
                bottomLeft: borderBottomLeftRadius,
                bottomRight: borderBottomRightRadius
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
        const paddingTop = getVP(this.style.paddingTop);
        const paddingRight = getVP(this.style.paddingRight);
        const paddingBottom = getVP(this.style.paddingBottom);
        const paddingLeft = getVP(this.style.paddingLeft);
        if (!isUndefined(paddingTop) || !isUndefined(paddingRight) || !isUndefined(paddingBottom) || !isUndefined(paddingLeft)) {
            instance.padding({
                top: paddingTop,
                right: paddingRight,
                bottom: paddingBottom,
                left: paddingLeft
            });
        }
        const minWidth = getVP(this.style.minWidth);
        const maxWidth = getVP(this.style.maxWidth);
        const minHeight = getVP(this.style.minHeight);
        const maxHeight = getVP(this.style.maxHeight);
        if (!isUndefined(minWidth) || !isUndefined(maxWidth) || !isUndefined(minHeight) || !isUndefined(maxHeight)) {
            instance.constraintSize({
                minWidth: minWidth,
                maxWidth: maxWidth,
                minHeight: minHeight,
                maxHeight: maxHeight
            });
        }
        if (useRelativeContainer(this.style)) {
            //todo: 鸿蒙不支持 绝对定位设置 right bottom
            //绝对定位 top = top + margintop 这里暂时只处理 top
            const top = getVP(this.style.top);
            const right = getVP(this.style.right);
            const bottom = getVP(this.style.bottom);
            const left = getVP(this.style.left);
            instance.alignRules({
                top: isUndefined(top) ? undefined : { anchor: "__container__", align: VerticalAlign.Top },
                left: isUndefined(left) ? undefined : { anchor: "__container__", align: HorizontalAlign.Start },
                right: isUndefined(right) ? undefined : { anchor: "__container__", align: HorizontalAlign.End },
                bottom: isUndefined(bottom) ? undefined : { anchor: "__container__", align: VerticalAlign.Bottom }
            });
            if (!isUndefined(top) || !isUndefined(right) || !isUndefined(bottom) || !isUndefined(left)) {
                instance.margin({
                    top: top,
                    right: right,
                    bottom: bottom,
                    left: left
                });
            }
        }
        else {
            const marginTop = getVP(this.style.marginTop);
            const marginRight = getVP(this.style.marginRight);
            const marginBottom = getVP(this.style.marginBottom);
            const marginLeft = getVP(this.style.marginLeft);
            if (!isUndefined(marginTop) || !isUndefined(marginRight) || !isUndefined(marginBottom) || !isUndefined(marginLeft)) {
                instance.margin({
                    top: marginTop,
                    right: marginRight,
                    bottom: marginBottom,
                    left: marginLeft
                });
            }
        }
    }
    _applyYogaLayoutAttribute(instance: CommonAttribute): void {
        if (!this.node || !this.style) {
            return;
        }
        // yoga 计算结果后，只需要设置 x,y
        const x = getVP(this.style.left, 0);
        const y = getVP(this.style.top, 0);
        instance.position({
            x: x,
            y: y
        });
    }
}
const commonStyleModifier = new CommonStyleModifier();
export default commonStyleModifier;
