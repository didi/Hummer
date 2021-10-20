//
//  HMView.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/10/20.
//

#import "HMView.h"
#import <Hummer/HMBorderDrawing.h>
#import <Hummer/UIView+HMDom.h>

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

//@property (nonatomic, nullable, copy) UIColor *hmBackgroundColor;

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

@implementation HMView

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

    // TODO(ChasonTang): 黑夜模式
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
