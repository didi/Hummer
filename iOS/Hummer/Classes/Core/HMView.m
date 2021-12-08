#import "HMView.h"
#import <Hummer/HMConverter.h>
#import <Hummer/UIView+HMImageLoader.h>
#import <Hummer/HMJSGlobal.h>
#import <Hummer/HMAttrManager.h>
#import <Hummer/HMYogaConfig.h>
#import <Hummer/UIView+HMRenderObject.h>
#import <Hummer/HMTransitionAnimation.h>
#import <Hummer/HMBorderDrawing.h>
#import <Hummer/UIView+HMDom.h>
#import <Hummer/HMExportManager.h>
#import <Hummer/UIView+HMAttribute.h>
#import <Hummer/HMGradientColor.h>

NS_ASSUME_NONNULL_BEGIN

static double HMZeroIfNaN(double value) {
    return isnan(value) || isinf(value) ? 0 : value;
}

static BOOL layerHasShadow(CALayer *layer);

static CGFloat defaultIfNegativeTo(CGFloat defaultValue, CGFloat x);

static UIUserInterfaceLayoutDirection resolveLayoutDirection(UIView *view);

static void updateShadowPathForView(HMView *view);

@interface HMView () {
@private
    /// 用于存储背景色，而 UIView -> backgroundColor 等于 CALayer backgroundColor 用于渲染
    UIColor *_Nullable _backgroundColor;
}

@property(nonatomic, nullable, weak) CAGradientLayer *gradientLayer;

@property(nonatomic, nullable, copy) NSDictionary<NSString *, id <NSCopying, NSSecureCoding>> *styleStore;

//@property(nonatomic, assign) BOOL isBoxSizing;

@property(nonatomic, readonly) NSSet<NSString *> *flexStyleKeySet;

@property(nonatomic, readonly) NSSet<NSString *> *transitionKeySet;

@property(nonatomic, readonly) NSSet<NSString *> *borderStyleSet;

- (void)commonInit;

- (UIEdgeInsets)bordersAsInsets;

- (HMCornerRadii)cornerRadii;

- (HMBorderColors)borderColors;

- (void)updateClippingForLayer:(CALayer *)layer;

@end

NS_ASSUME_NONNULL_END

UIUserInterfaceLayoutDirection resolveLayoutDirection(UIView *view) {
    UIUserInterfaceLayoutDirection userInterfaceLayoutDirection;
    if (@available(iOS 10.0, *)) {
        userInterfaceLayoutDirection = view.effectiveUserInterfaceLayoutDirection;
    } else {
        // Fallback on earlier versions
        userInterfaceLayoutDirection = UIApplication.sharedApplication.userInterfaceLayoutDirection;
    }

    return userInterfaceLayoutDirection;
}

BOOL layerHasShadow(CALayer *layer) {
    return layer.shadowOpacity * CGColorGetAlpha(layer.shadowColor) > 0;
}

CGFloat defaultIfNegativeTo(CGFloat defaultValue, CGFloat x) {
    return x >= 0 ? x : defaultValue;
}

void updateShadowPathForView(HMView *view) {
    if (layerHasShadow(view.layer)) {
        if (CGColorGetAlpha(view.backgroundColor.CGColor) > 0.999) {
            // If view has a solid background color, calculate shadow path from border
            const HMCornerRadii cornerRadii = view.cornerRadii;
            const HMCornerInsets cornerInsets = HMGetCornerInsets(cornerRadii, UIEdgeInsetsZero);
            CGPathRef shadowPath = HMPathCreateWithRoundedRect(view.bounds, cornerInsets, nil);
            view.layer.shadowPath = shadowPath;
            CGPathRelease(shadowPath);
        } else {
            // Can't accurately calculate box shadow, so fall back to pixel-based shadow
            view.layer.shadowPath = nil;
            // TODO(ChasonTang): HMLogAdvice(@"View #%@ of type %@ has a shadow set but cannot calculate shadow efficiently. Consider setting a background color to fix this, or apply the shadow to a more specific component.", view.hummerTag, view.class);
        }
    }
}

HM_EXPORT_CLASS(NewView, HMView)

@implementation HMView

- (NSSet<NSString *> *)transitionKeySet {
    static NSSet<NSString *> *transitionSet;
    static dispatch_once_t dispatchOnce;
    dispatch_once(&dispatchOnce, ^{
        transitionSet = [NSSet setWithArray:@[
                @"transitionDelay",
                @"transitionDuration",
                @"transitionProperty",
                @"transitionTimingFunction",
        ]];
    });

    return transitionSet;
}

- (NSSet<NSString *> *)borderStyleSet {
    static NSSet<NSString *> *borderStyleSet;
    static dispatch_once_t dispatchOnce;

    dispatch_once(&dispatchOnce, ^{
        // alphabet order
        borderStyleSet = [NSSet setWithArray:@[
                @"borderBottomWidth",
                @"borderEndWidth",
                @"borderLeftWidth",
                @"borderRightWidth",
                @"borderStartWidth",
                @"borderTopWidth",
                @"borderWidth",
        ]];
    });

    return borderStyleSet;
}

- (NSSet<NSString *> *)flexStyleKeySet {
    static NSSet<NSString *> *flexStyleSet;
    static dispatch_once_t dispatchOnce;
    dispatch_once(&dispatchOnce, ^{
        // alphabet order
        flexStyleSet = [NSSet setWithArray:@[
                @"alignContent",
                @"alignItems",
                @"alignSelf",
                @"aspectRatio",
//                @"borderBottomWidth",
//                @"borderEndWidth",
//                @"borderLeftWidth",
//                @"borderRightWidth",
//                @"borderStartWidth",
//                @"borderTopWidth",
//                @"borderWidth",
                @"bottom",
                @"display",
                @"end",
                @"flex",
                @"flexBasis",
                @"flexDirection",
                @"flexGrow",
                @"flexShrink",
                @"flexWrap",
                @"height",
                @"justifyContent",
                @"left",
                @"margin",
                @"marginBottom",
                @"marginEnd",
                @"marginHorizontal",
                @"marginLeft",
                @"marginRight",
                @"marginStart",
                @"marginTop",
                @"marginVertical",
                @"maxHeight",
                @"maxWidth",
                @"minHeight",
                @"minWidth",
//                @"overflow",
                @"padding",
                @"paddingBottom",
                @"paddingEnd",
                @"paddingHorizontal",
                @"paddingLeft",
                @"paddingRight",
                @"paddingStart",
                @"paddingTop",
                @"paddingVertical",
                @"position",
                @"right",
                @"start",
                @"top",
                @"width",
//                @"zIndex",
//                @"direction"
        ]];
    });

    return flexStyleSet;
}

//HM_EXPORT_PROPERTY(style, hm_style, hm_setStyle:)
//HM_EXPORT_ATTRIBUTE(backgroundColor, __backgroundColor, HMStringToColor:)
//HM_EXPORT_ATTRIBUTE(backgroundImage, __backgroundImage, HMStringOrigin:)
//HM_EXPORT_ATTRIBUTE(borderStyle, __borderStyle, HMStringToBorderStyleList:)
//HM_EXPORT_ATTRIBUTE(borderLeftStyle, __borderLeftStyle, HMStringToBorderStyle:)
//HM_EXPORT_ATTRIBUTE(borderTopStyle, __borderTopStyle, HMStringToBorderStyle:)
//HM_EXPORT_ATTRIBUTE(borderRightStyle, __borderRightStyle, HMStringToBorderStyle:)
//HM_EXPORT_ATTRIBUTE(borderBottomStyle, __borderBottomStyle, HMStringToBorderStyle:)
//HM_EXPORT_ATTRIBUTE(borderColor, __borderColor, HMStringToBorderColorList:)
//HM_EXPORT_ATTRIBUTE(borderLeftColor, __borderLeftColor, HMStringToColor:)
//HM_EXPORT_ATTRIBUTE(borderTopColor, __borderTopColor, HMStringToColor:)
//HM_EXPORT_ATTRIBUTE(borderRightColor, __borderRightColor, HMStringToColor:)
//HM_EXPORT_ATTRIBUTE(borderBottomColor, __borderBottomColor, HMStringToColor:)
//HM_EXPORT_ATTRIBUTE(borderWidth, __borderWidth, HMStringToNumberArray:)
//HM_EXPORT_ATTRIBUTE(borderLeftWidth, __borderLeftWidth, HMStringToFloat:)
//HM_EXPORT_ATTRIBUTE(borderTopWidth, __borderTopWidth, HMStringToFloat:)
//HM_EXPORT_ATTRIBUTE(borderRightWidth, __borderRightWidth, HMStringToFloat:)
//HM_EXPORT_ATTRIBUTE(borderBottomWidth, __borderBottomWidth, HMStringToFloat:)
//HM_EXPORT_ATTRIBUTE(borderRadius, __borderRadius, HMStringToBorderRadiusList:)
//HM_EXPORT_ATTRIBUTE(borderTopLeftRadius, __borderTopLeftRadius, HMNumberToYGPoint:)
//HM_EXPORT_ATTRIBUTE(borderTopRightRadius, __borderTopRightRadius, HMNumberToYGPoint:)
//HM_EXPORT_ATTRIBUTE(borderBottomLeftRadius, __borderBottomLeftRadius, HMNumberToYGPoint:)
//HM_EXPORT_ATTRIBUTE(borderBottomRightRadius, __borderBottomRightRadius, HMNumberToYGPoint:)
//HM_EXPORT_ATTRIBUTE(shadow, __shadow, HMStringToShadowAttributes:)

- (void)set__backgroundImage:(nullable id)parameter {
    NSParameterAssert([parameter isKindOfClass:NSString.class]);
    NSString *imageString = parameter;
    [self hm_internalSetImageWithURL:imageString inJSBundleSource:nil context:nil completion:^(UIImage *_Nullable image, NSData *_Nullable data, NSError *_Nullable error, HMImageCacheType cacheType) {
        if (image) {
            self.layer.contents = (__bridge id _Nullable) (image.CGImage);
        }
    }];
}

- (void)set__borderStyle:(nullable id)list {
    NSParameterAssert([list isKindOfClass:NSArray.class]);
    id borderStyleObject = ((NSArray *) list).lastObject;
    if (![borderStyleObject isKindOfClass:NSNumber.class]) {
        return;
    }
    self.borderStyle = (HMBorderStyle) ((NSNumber *) borderStyleObject).unsignedIntegerValue;
}

- (void)set__borderLeftStyle:(HMBorderStyle)style {
    self.borderStyle = style;
}

- (void)set__borderRightStyle:(HMBorderStyle)style {
    self.borderStyle = style;
}

- (void)set__borderTopStyle:(HMBorderStyle)style {
    self.borderStyle = style;
}

- (void)set__borderBottomStyle:(HMBorderStyle)style {
    self.borderStyle = style;
}

- (void)set__borderColor:(nullable id)list {
    NSParameterAssert([list isKindOfClass:NSArray.class]);
    NSArray *borderColorList = list;
    if (borderColorList.count == 1) {
        borderColorList = @[borderColorList[0], borderColorList[0], borderColorList[0], borderColorList[0]];
    } else if (borderColorList.count == 2) {
        borderColorList = @[borderColorList[0], borderColorList[1], borderColorList[0], borderColorList[1]];
    } else if (borderColorList.count == 3) {
        borderColorList = @[borderColorList[0], borderColorList[1], borderColorList[2], borderColorList[1]];
    }
    id colorObject = borderColorList[0];
    self.borderTopColor = [colorObject isKindOfClass:UIColor.class] ? colorObject : nil;
    colorObject = borderColorList[1];
    self.borderRightColor = [colorObject isKindOfClass:UIColor.class] ? colorObject : nil;
    colorObject = borderColorList[2];
    self.borderBottomColor = [colorObject isKindOfClass:UIColor.class] ? colorObject : nil;
    colorObject = borderColorList[3];
    self.borderLeftColor = [colorObject isKindOfClass:UIColor.class] ? colorObject : nil;
}

- (void)set__borderLeftColor:(id)color {
    NSParameterAssert([color isKindOfClass:UIColor.class]);
    self.borderLeftColor = color;
}

- (void)set__borderRightColor:(id)color {
    NSParameterAssert([color isKindOfClass:UIColor.class]);
    self.borderRightColor = color;
}

- (void)set__borderTopColor:(id)color {
    NSParameterAssert([color isKindOfClass:UIColor.class]);
    self.borderTopColor = color;
}

- (void)set__borderBottomColor:(id)color {
    NSParameterAssert([color isKindOfClass:UIColor.class]);
    self.borderBottomColor = color;
}

- (void)set__borderWidth:(nullable id)list {
    NSParameterAssert([list isKindOfClass:NSArray.class]);
    NSArray *borderWidthList = list;
    if (borderWidthList.count == 1) {
        borderWidthList = @[borderWidthList[0], borderWidthList[0], borderWidthList[0], borderWidthList[0]];
    } else if (borderWidthList.count == 2) {
        borderWidthList = @[borderWidthList[0], borderWidthList[1], borderWidthList[0], borderWidthList[1]];
    } else if (borderWidthList.count == 3) {
        borderWidthList = @[borderWidthList[0], borderWidthList[1], borderWidthList[2], borderWidthList[1]];
    }

    id numberObject = borderWidthList[0];
    self.borderTopWidth = [numberObject isKindOfClass:NSNumber.class] ? ((NSNumber *) numberObject).doubleValue : -1;
    numberObject = borderWidthList[1];
    self.borderRightWidth = [numberObject isKindOfClass:NSNumber.class] ? ((NSNumber *) numberObject).doubleValue : -1;
    numberObject = borderWidthList[2];
    self.borderBottomWidth = [numberObject isKindOfClass:NSNumber.class] ? ((NSNumber *) numberObject).doubleValue : -1;
    numberObject = borderWidthList[3];
    self.borderLeftWidth = [numberObject isKindOfClass:NSNumber.class] ? ((NSNumber *) numberObject).doubleValue : -1;
}

- (void)set__borderLeftWidth:(CGFloat)width {
    self.borderLeftWidth = width;
}

- (void)set__borderTopWidth:(CGFloat)width {
    self.borderTopWidth = width;
}

- (void)set__borderRightWidth:(CGFloat)width {
    self.borderRightWidth = width;
}

- (void)set__borderBottomWidth:(CGFloat)width {
    self.borderBottomWidth = width;
}

- (void)set__borderRadius:(nullable id)list {
    NSParameterAssert([list isKindOfClass:NSArray.class]);
    NSArray *borderRadiusList = list;
    if (borderRadiusList.count == 1) {
        borderRadiusList = @[borderRadiusList[0], borderRadiusList[0], borderRadiusList[0], borderRadiusList[0]];
    }
    if (borderRadiusList.count == 2) {
        borderRadiusList = @[borderRadiusList[0], borderRadiusList[1], borderRadiusList[0], borderRadiusList[1]];
    }
    if (borderRadiusList.count == 3) {
        borderRadiusList = @[borderRadiusList[0], borderRadiusList[1], borderRadiusList[2], borderRadiusList[1]];
    }

    NSValue *listValue = borderRadiusList[0];
    self.borderTopLeftRadius = listValue.ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? listValue.ygValue.value : -1;
    listValue = borderRadiusList[1];
    self.borderTopRightRadius = listValue.ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? listValue.ygValue.value : -1;
    listValue = borderRadiusList[2];
    self.borderBottomRightRadius = listValue.ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? listValue.ygValue.value : -1;
    listValue = borderRadiusList[3];
    self.borderBottomLeftRadius = listValue.ygValue.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? listValue.ygValue.value : -1;
}

- (void)set__borderTopLeftRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    self.borderTopLeftRadius = radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? radius.value : -1;
}

- (void)set__borderTopRightRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    self.borderTopRightRadius = radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? radius.value : -1;
}

- (void)set__borderBottomLeftRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    self.borderBottomLeftRadius = radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? radius.value : -1;
}

- (void)set__borderBottomRightRadius:(YOGA_TYPE_WRAPPER(YGValue))radius {
    self.borderBottomRightRadius = radius.unit == YOGA_TYPE_WRAPPER(YGUnitPoint) ? radius.value : -1;
}

- (void)set__backgroundColor:(nullable id)backgroundColor {
    if (!backgroundColor) {
        self.backgroundColor = nil;
        [self.gradientLayer removeFromSuperlayer];
        return;
    }
    NSParameterAssert([backgroundColor isKindOfClass:UIColor.class]);
    if ([backgroundColor isKindOfClass:HMGradientColor.class]) {
        self.backgroundColor = nil;
        if (!self.gradientLayer) {
            CAGradientLayer *gradientLayer = CAGradientLayer.layer;
            [self.layer insertSublayer:gradientLayer atIndex:0];
            self.gradientLayer = gradientLayer;
        }
        HMGradientColor *gradientColor = backgroundColor;
        [CATransaction begin];
        [CATransaction setDisableActions:YES];
        self.gradientLayer.colors = @[(id) gradientColor.beginColor.CGColor, (id) gradientColor.endColor.CGColor];
        self.gradientLayer.startPoint = gradientColor.beginPoint;
        self.gradientLayer.endPoint = gradientColor.endPoint;
        self.gradientLayer.frame = self.bounds;
        [CATransaction commit];
    } else {
        [self.gradientLayer removeFromSuperlayer];
        self.backgroundColor = backgroundColor;
    }
}

- (void)set__shadow:(nullable NSArray<NSObject *> *)shadowAttributes {
    if (shadowAttributes.count != 4) {
        return;
    }
    NSParameterAssert(shadowAttributes.count == 4);
    CGFloat widthOffset = [shadowAttributes[0] isKindOfClass:NSNumber.class] ? ((NSNumber *) shadowAttributes[0]).doubleValue : 0;
    CGFloat heightOffset = [shadowAttributes[1] isKindOfClass:NSNumber.class] ? ((NSNumber *) shadowAttributes[1]).doubleValue : 0;
    CGFloat shadowRadius = [shadowAttributes[2] isKindOfClass:NSNumber.class] ? ((NSNumber *) shadowAttributes[2]).doubleValue : 0;
    UIColor *color = [shadowAttributes[3] isKindOfClass:UIColor.class] ? (UIColor *) shadowAttributes[3] : nil;

    self.layer.shadowOpacity = (float) CGColorGetAlpha(color.CGColor);
    self.layer.shadowColor = CGColorCreateCopyWithAlpha(color.CGColor, 1);
    self.layer.shadowRadius = shadowRadius;
    self.layer.shadowOffset = CGSizeMake(widthOffset, heightOffset);
    [self.layer setNeedsDisplay];
}

- (NSDictionary<NSString *, NSObject *> *)hm_style {
#ifndef NDEBUG
    return (NSDictionary<NSString *, NSObject *> *) self.styleStore;
#else
    return nil;
#endif
}

- (void)hm_setStyle:(HMBaseValue *)style {
    NSDictionary<NSString *, id <NSSecureCoding, NSCopying>> *styleDictionary = style.toDictionary;
    NSAssert(styleDictionary.count > 0, @"toDictionary must return NSDictionary that contain a object at least.");

#ifndef NDEBUG
    {
        if (!self.styleStore) {
            self.styleStore = styleDictionary;
        } else {
            NSMutableDictionary<NSString *, id <NSCopying, NSSecureCoding>> *styleStore = self.styleStore.mutableCopy;
            self.styleStore = nil;
            [styleStore addEntriesFromDictionary:styleDictionary];
            self.styleStore = styleStore;
        }
    };
#endif

    {
        // process { position: 'fixed' } situation
        NSMutableDictionary<NSString *, id <NSCopying, NSSecureCoding>> *styleStore = nil;
        id positionValueObject = styleDictionary[@"position"];
        if ([positionValueObject isKindOfClass:NSString.class]) {
            if ([((NSString *) positionValueObject).lowercaseString isEqualToString:@"fixed"]) {
                styleStore = styleDictionary.mutableCopy;
#pragma clang diagnostic push
#pragma ide diagnostic ignored "UnusedValue"
                styleDictionary = nil;
#pragma clang diagnostic pop
                styleStore[@"position"] = @"absolute";
                styleDictionary = styleStore.copy;
                self.hm_isFixedPosition = YES;
            } else {
                self.hm_isFixedPosition = NO;
            }
        }
    }

    __block NSMutableDictionary<NSString *, id <NSCopying, NSSecureCoding>> *animationDictionary = nil;
    __block NSMutableDictionary<NSString *, id <NSCopying, NSSecureCoding>> *transitions = nil;
    [styleDictionary enumerateKeysAndObjectsUsingBlock:^(NSString *key, id obj, BOOL *stop) {
        if ([self.hm_transitionAnimation.needAnimations.allKeys containsObject:key]) {
            if (!animationDictionary) {
                animationDictionary = NSMutableDictionary.dictionary;
            }
            animationDictionary[key] = obj;

            return;
        }
        // animation
        if ([self.transitionKeySet containsObject:key]) {
            if (!transitions) {
                transitions = NSMutableDictionary.dictionary;
            }
            transitions[key] = obj;

            return;
        }
        if ([self.borderStyleSet containsObject:key]) {
            [self hm_configureWithTarget:self.hm_renderObject cssAttribute:key value:obj converterManager:HMYogaConfig.defaulfConfig];
            [self hm_configureWithTarget:self cssAttribute:key value:obj converterManager:HMAttrManager.sharedManager];

            return;
        }
        if ([self.flexStyleKeySet containsObject:key]) {
            // 默认情况下都启用 flexbox 布局
            [self hm_configureWithTarget:self.hm_renderObject cssAttribute:key value:obj converterManager:HMYogaConfig.defaulfConfig];

            return;
        }

        [self hm_configureWithTarget:self cssAttribute:key value:obj converterManager:HMAttrManager.sharedManager];
    }];

    // 1. boxSizing: 'none'
    // 2. boxSizing: 'border-box' && borderStyle: 'none'
    // => reset layout to undefined(NaN)
    if (!self.HMBorderBoxSizing || (self.HMBorderBoxSizing && self.borderStyle == HMBorderStyleNone)) {
        // rollback borderWidth style
        self.hm_renderObject.borderWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderBottomWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderEndWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderLeftWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderRightWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderStartWidth = YOGA_TYPE_WRAPPER(YGUndefined);
        self.hm_renderObject.borderTopWidth = YOGA_TYPE_WRAPPER(YGUndefined);
    }

    // 设置样式之后，根据 zIndex 处理 fixed
    [self hm_processFixedPositionWithContext:[HMJSGlobal.globalObject currentContext:style.context]];
    // 将动画相关信息记录到 transitionAnimation
    [self.hm_transitionAnimation addAnimations:(NSDictionary<NSString *, NSObject *> *) animationDictionary];
    // 初始化 transitionAnimation 对象
    if (!self.hm_transitionAnimation && transitions.count > 0) {
        self.hm_transitionAnimation = [[HMTransitionAnimation alloc] initWithTransitions:(NSDictionary<NSString *, NSObject *> *) transitions view:self];
    }
    [self hm_markDirty];
}

- (void)hm_layoutBackgroundColorImageBorderShadowCornerRadius {
    // 移除父类的 UIView 实现
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    [self commonInit];

    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super initWithCoder:coder];
    if (self) {
        [self commonInit];
    }

    return self;
}

- (void)commonInit {
    _borderWidth = -1;
    _borderTopWidth = -1;
    _borderRightWidth = -1;
    _borderBottomWidth = -1;
    _borderLeftWidth = -1;
    _borderStartWidth = -1;
    _borderEndWidth = -1;
    _borderTopLeftRadius = -1;
    _borderTopRightRadius = -1;
    _borderTopStartRadius = -1;
    _borderTopEndRadius = -1;
    _borderBottomLeftRadius = -1;
    _borderBottomRightRadius = -1;
    _borderBottomStartRadius = -1;
    _borderBottomEndRadius = -1;
    _borderStyle = HMBorderStyleSolid;

    _backgroundColor = super.backgroundColor;
}

- (UIEdgeInsets)bordersAsInsets {
    const CGFloat borderWidth = MAX(0, _borderWidth);
    const BOOL isRTL = resolveLayoutDirection(self) == UIUserInterfaceLayoutDirectionRightToLeft;

    const CGFloat directionAwareBorderLeftWidth = isRTL ? _borderEndWidth : _borderStartWidth;
    const CGFloat directionAwareBorderRightWidth = isRTL ? _borderStartWidth : _borderEndWidth;

    return (UIEdgeInsets) {
            defaultIfNegativeTo(borderWidth, _borderTopWidth),
            defaultIfNegativeTo(borderWidth, defaultIfNegativeTo(_borderLeftWidth, directionAwareBorderLeftWidth)),
            defaultIfNegativeTo(borderWidth, _borderBottomWidth),
            defaultIfNegativeTo(borderWidth, defaultIfNegativeTo(_borderRightWidth, directionAwareBorderRightWidth)),
    };
}

- (UIColor *)backgroundColor {
    return _backgroundColor;
}

- (void)setBackgroundColor:(UIColor *)backgroundColor {
    if ([_backgroundColor isEqual:backgroundColor]) {
        return;
    }

    _backgroundColor = backgroundColor;
    [self.layer setNeedsDisplay];
}

- (HMCornerRadii)cornerRadii {
    const BOOL isRTL = resolveLayoutDirection(self) == UIUserInterfaceLayoutDirectionRightToLeft;
    const CGFloat radius = MAX(0, _borderRadius);

    CGFloat topLeftRadius;
    CGFloat topRightRadius;
    CGFloat bottomLeftRadius;
    CGFloat bottomRightRadius;

    const CGFloat directionAwareTopLeftRadius = isRTL ? _borderTopEndRadius : _borderTopStartRadius;
    const CGFloat directionAwareTopRightRadius = isRTL ? _borderTopStartRadius : _borderTopEndRadius;
    const CGFloat directionAwareBottomLeftRadius = isRTL ? _borderBottomEndRadius : _borderBottomStartRadius;
    const CGFloat directionAwareBottomRightRadius = isRTL ? _borderBottomStartRadius : _borderBottomEndRadius;

    topLeftRadius =
            defaultIfNegativeTo(radius, defaultIfNegativeTo(_borderTopLeftRadius, directionAwareTopLeftRadius));
    topRightRadius =
            defaultIfNegativeTo(radius, defaultIfNegativeTo(_borderTopRightRadius, directionAwareTopRightRadius));
    bottomLeftRadius =
            defaultIfNegativeTo(radius, defaultIfNegativeTo(_borderBottomLeftRadius, directionAwareBottomLeftRadius));
    bottomRightRadius = defaultIfNegativeTo(
            radius, defaultIfNegativeTo(_borderBottomRightRadius, directionAwareBottomRightRadius));

    // Get scale factors required to prevent radii from overlapping
    const CGSize size = self.bounds.size;
    const CGFloat topScaleFactor = HMZeroIfNaN(MIN(1, size.width / (topLeftRadius + topRightRadius)));
    const CGFloat bottomScaleFactor = HMZeroIfNaN(MIN(1, size.width / (bottomLeftRadius + bottomRightRadius)));
    const CGFloat rightScaleFactor = HMZeroIfNaN(MIN(1, size.height / (topRightRadius + bottomRightRadius)));
    const CGFloat leftScaleFactor = HMZeroIfNaN(MIN(1, size.height / (topLeftRadius + bottomLeftRadius)));

    // Return scaled radii
    return (HMCornerRadii) {
            topLeftRadius * MIN(topScaleFactor, leftScaleFactor),
            topRightRadius * MIN(topScaleFactor, rightScaleFactor),
            bottomLeftRadius * MIN(bottomScaleFactor, leftScaleFactor),
            bottomRightRadius * MIN(bottomScaleFactor, rightScaleFactor),
    };
}

- (HMBorderColors)borderColors {
    const BOOL isRTL = resolveLayoutDirection(self) == UIUserInterfaceLayoutDirectionRightToLeft;

    UIColor *directionAwareBorderLeftColor = isRTL ? _borderEndColor : _borderStartColor;
    UIColor *directionAwareBorderRightColor = isRTL ? _borderStartColor : _borderEndColor;

    return (HMBorderColors) {
            (_borderTopColor ?: _borderColor).CGColor,
            (directionAwareBorderLeftColor ?: _borderLeftColor ?: _borderColor).CGColor,
            (_borderBottomColor ?: _borderColor).CGColor,
            (directionAwareBorderRightColor ?: _borderRightColor ?: _borderColor).CGColor,
    };
}

- (void)hummerSetFrame:(CGRect)frame {
    // If frame is zero, or below the threshold where the border radii can
    // be rendered as a stretchable image, we'll need to re-render.
    // TODO: detect up-front if re-rendering is necessary
    CGSize oldSize = self.bounds.size;
    [super hummerSetFrame:frame];
    if (!CGSizeEqualToSize(self.bounds.size, oldSize)) {
        [self.layer setNeedsDisplay];
        self.gradientLayer.frame = self.bounds;
    }
}

- (void)displayLayer:(CALayer *)layer {
    if (CGSizeEqualToSize(layer.bounds.size, CGSizeZero)) {
        return;
    }

    updateShadowPathForView(self);

    const HMCornerRadii cornerRadii = self.cornerRadii;
    const UIEdgeInsets borderInsets = self.bordersAsInsets;
    const HMBorderColors borderColors = self.borderColors;

    BOOL useIOSBorderRendering = HMCornerRadiiAreEqual(cornerRadii) && HMBorderInsetsAreEqual(borderInsets) &&
            HMBorderColorsAreEqual(borderColors) && _borderStyle == HMBorderStyleSolid &&

            // iOS draws borders in front of the content whereas CSS draws them behind
                    // the content. For this reason, only use iOS border drawing when clipping
                    // or when the border is hidden.

                    (borderInsets.top == 0 || (borderColors.top && CGColorGetAlpha(borderColors.top) == 0) || self.clipsToBounds);

    // iOS clips to the outside of the border, but CSS clips to the inside. To
    // solve this, we'll need to add a container view inside the main view to
    // correctly clip the subviews.

    // TODO(ChasonTang): DarkMode
    CGColorRef backgroundColor = _backgroundColor.CGColor;
//    CGColorRef backgroundColor;
//    if (@available(iOS 13.0, *)) {
//        backgroundColor = [_backgroundColor resolvedColorWithTraitCollection:self.traitCollection].CGColor;
//    } else {
//        backgroundColor = _backgroundColor.CGColor;
//    }

    if (useIOSBorderRendering) {
        layer.cornerRadius = cornerRadii.topLeft;
        layer.borderColor = borderColors.left;
        layer.borderWidth = borderInsets.left;
        layer.backgroundColor = backgroundColor;
        layer.contents = nil;
        layer.needsDisplayOnBoundsChange = NO;
        layer.mask = nil;

        return;
    }

    UIImage *image = HMGetBorderImage(
            _borderStyle, layer.bounds.size, cornerRadii, borderInsets, borderColors, backgroundColor, self.clipsToBounds);

    layer.backgroundColor = nil;

    if (image == nil) {
        layer.contents = nil;
        layer.needsDisplayOnBoundsChange = NO;

        return;
    }

    CGRect contentsCenter = ({
        CGSize size = image.size;
        UIEdgeInsets insets = image.capInsets;
        CGRectMake(
                insets.left / size.width, insets.top / size.height, (CGFloat) 1.0 / size.width, (CGFloat) 1.0 / size.height);
    });

    layer.contents = (id) image.CGImage;
    layer.contentsScale = image.scale;
    layer.needsDisplayOnBoundsChange = YES;
    layer.magnificationFilter = kCAFilterNearest;

    const BOOL isResizable = !UIEdgeInsetsEqualToEdgeInsets(image.capInsets, UIEdgeInsetsZero);
    if (isResizable) {
        layer.contentsCenter = contentsCenter;
    } else {
        layer.contentsCenter = CGRectMake(0.0, 0.0, 1.0, 1.0);
    }

    [self updateClippingForLayer:layer];
}

- (void)updateClippingForLayer:(CALayer *)layer {
    CALayer *mask = nil;
    CGFloat cornerRadius = 0;

    if (self.clipsToBounds) {
        const HMCornerRadii cornerRadii = self.cornerRadii;
        if (HMCornerRadiiAreEqual(cornerRadii)) {
            cornerRadius = cornerRadii.topLeft;

        } else {
            CAShapeLayer *shapeLayer = CAShapeLayer.layer;
            CGPathRef path =
                    HMPathCreateWithRoundedRect(self.bounds, HMGetCornerInsets(cornerRadii, UIEdgeInsetsZero), NULL);
            shapeLayer.path = path;
            CGPathRelease(path);
            mask = shapeLayer;
        }
    }

    layer.cornerRadius = cornerRadius;
    layer.mask = mask;
}

/// MARK: - Border Color

#define setBorderColor(side)                       \
  - (void)setBorder##side##Color:(UIColor *)color \
  {                                                \
      if ([_border##side##Color isEqual:color]) {    \
        return;                                      \
      }                                              \
      _border##side##Color = color;                  \
      [self.layer setNeedsDisplay];                  \
  }

setBorderColor()

setBorderColor(Top)

setBorderColor(Right)

setBorderColor(Bottom)

setBorderColor(Left)

setBorderColor(Start)

setBorderColor(End)

/// MARK: - Border Width

#define setBorderWidth(side)                     \
  - (void)setBorder##side##Width:(CGFloat)width {\
      if (_border##side##Width == width) {         \
        return;                                    \
      }                                            \
      _border##side##Width = width;                \
      [self.layer setNeedsDisplay];                \
  }

setBorderWidth()

setBorderWidth(Top)

setBorderWidth(Right)

setBorderWidth(Bottom)

setBorderWidth(Left)

setBorderWidth(Start)

setBorderWidth(End)

/// MARK: - Border Radius

#define setBorderRadius(side)                      \
  - (void)setBorder##side##Radius:(CGFloat)radius {\
      if (_border##side##Radius == radius) {         \
        return;                                      \
      }                                              \
      _border##side##Radius = radius;                \
      [self.layer setNeedsDisplay];                  \
  }

setBorderRadius()

setBorderRadius(TopLeft)

setBorderRadius(TopRight)

setBorderRadius(TopStart)

setBorderRadius(TopEnd)

setBorderRadius(BottomLeft)

setBorderRadius(BottomRight)

setBorderRadius(BottomStart)

setBorderRadius(BottomEnd)

/// MARK: - Border Style

- (void)setBorderStyle:(HMBorderStyle)borderStyle {
    if (_borderStyle == borderStyle) {
        return;
    }
    _borderStyle = borderStyle;
    [self.layer setNeedsDisplay];
}

@end
