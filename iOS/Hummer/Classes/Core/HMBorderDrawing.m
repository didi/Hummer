#import "HMBorderDrawing.h"

NS_ASSUME_NONNULL_BEGIN

typedef void (^HMGraphicsImageDrawingActions)(CGContextRef _Nullable context);

static void pathAddEllipticArc(CGMutablePathRef _Nullable path, const CGAffineTransform *_Nullable m, CGPoint origin, CGSize size, CGFloat startAngle, CGFloat endAngle, BOOL clockwise);

static UIImage *_Nullable getSolidBorderImage(HMCornerRadii cornerRadii, CGSize viewSize, UIEdgeInsets borderInsets, HMBorderColors borderColors, CGColorRef _Nullable backgroundColor, BOOL drawToEdge);

static UIImage *_Nullable getDashedOrDottedBorderImage(HMBorderStyle borderStyle, HMCornerRadii cornerRadii, CGSize viewSize, UIEdgeInsets borderInsets, HMBorderColors borderColors, CGColorRef _Nullable backgroundColor, BOOL drawToEdge);

NS_INLINE BOOL cornerRadiiAreAboveThreshold(HMCornerRadii cornerRadii);

static CGContextRef _Nullable uiGraphicsBeginImageContext(CGSize size, BOOL opaque);
static UIImage *_Nullable uiGraphicsImageRendererToDrawing(HMGraphicsImageDrawingActions _Nullable uiactions, CGSize size, BOOL opaque);

static UIEdgeInsets roundInsetsToPixel(UIEdgeInsets edgeInsets);

static CGPathRef pathCreateOuterOutline(BOOL drawToEdge, CGRect rect, HMCornerRadii cornerRadii);

static void ellipseGetIntersectionsWithLine(CGRect ellipseBounds, CGPoint lineStart, CGPoint lineEnd, CGPoint intersections[2]);

/// MARK: - Util
static CGFloat HMScreenScale(void);

static CGFloat HMRoundPixelValue(CGFloat value);

NS_ASSUME_NONNULL_END

void ellipseGetIntersectionsWithLine(CGRect ellipseBounds, CGPoint lineStart, CGPoint lineEnd, CGPoint intersections[2]) {
    const CGPoint ellipseCenter = {CGRectGetMidX(ellipseBounds), CGRectGetMidY(ellipseBounds)};

    lineStart.x -= ellipseCenter.x;
    lineStart.y -= ellipseCenter.y;
    lineEnd.x -= ellipseCenter.x;
    lineEnd.y -= ellipseCenter.y;

    const CGFloat m = (lineEnd.y - lineStart.y) / (lineEnd.x - lineStart.x);
    const CGFloat a = ellipseBounds.size.width / 2;
    const CGFloat b = ellipseBounds.size.height / 2;
    const CGFloat c = lineStart.y - m * lineStart.x;
    const CGFloat A = (b * b + a * a * m * m);
    const CGFloat B = 2 * a * a * c * m;
    const CGFloat D = sqrt((a * a * (b * b - c * c)) / A + pow(B / (2 * A), 2));

    const CGFloat x_ = -B / (2 * A);
    const CGFloat x1 = x_ + D;
    const CGFloat x2 = x_ - D;
    const CGFloat y1 = m * x1 + c;
    const CGFloat y2 = m * x2 + c;

    intersections[0] = (CGPoint) {x1 + ellipseCenter.x, y1 + ellipseCenter.y};
    intersections[1] = (CGPoint) {x2 + ellipseCenter.x, y2 + ellipseCenter.y};
}

CGFloat HMScreenScale(void) {
    static dispatch_once_t onceToken;
    static CGFloat scale;

    dispatch_once(&onceToken, ^{
        // TODO(ChasonTang): 未来需要考虑外接屏幕显示的问题
        scale = UIScreen.mainScreen.scale;
    });

    return scale;
}

CGFloat HMRoundPixelValue(CGFloat value) {
    CGFloat scale = HMScreenScale();

    return round(value * scale) / scale;
}

UIEdgeInsets roundInsetsToPixel(UIEdgeInsets edgeInsets) {
    edgeInsets.top = HMRoundPixelValue(edgeInsets.top);
    edgeInsets.bottom = HMRoundPixelValue(edgeInsets.bottom);
    edgeInsets.left = HMRoundPixelValue(edgeInsets.left);
    edgeInsets.right = HMRoundPixelValue(edgeInsets.right);

    return edgeInsets;
}

static BOOL drawShouldUseOpaque(CGColorRef _Nullable backgroundColor, BOOL hasCornerRadii, BOOL drawToEdge) {
    const CGFloat alpha = CGColorGetAlpha(backgroundColor);
    return (drawToEdge || !hasCornerRadii) && alpha == 1.0;
}

CGContextRef uiGraphicsBeginImageContext(CGSize size, BOOL opaque) {
    // TODO: scale 传入 0.0 会使用设备主屏幕的 scale
    UIGraphicsBeginImageContextWithOptions(size, opaque, 0.0);

    return UIGraphicsGetCurrentContext();
}

CGPathRef pathCreateOuterOutline(BOOL drawToEdge, CGRect rect, HMCornerRadii cornerRadii) {
    if (drawToEdge) {
        return CGPathCreateWithRect(rect, nil);
    }

    // 圆角外轮廓
    return HMPathCreateWithRoundedRect(rect, HMGetCornerInsets(cornerRadii, UIEdgeInsetsZero), nil);
}

static const CGFloat HM_VIEW_BORDER_THRESHOLD = 0.001;

BOOL cornerRadiiAreAboveThreshold(HMCornerRadii cornerRadii) {
    return cornerRadii.topLeft > HM_VIEW_BORDER_THRESHOLD || cornerRadii.topRight > HM_VIEW_BORDER_THRESHOLD || cornerRadii.bottomLeft > HM_VIEW_BORDER_THRESHOLD || cornerRadii.bottomRight > HM_VIEW_BORDER_THRESHOLD;
}

BOOL HMBorderInsetsAreEqual(UIEdgeInsets borderInsets) {
    return ABS(borderInsets.left - borderInsets.right) < HM_VIEW_BORDER_THRESHOLD && ABS(borderInsets.left - borderInsets.bottom) < HM_VIEW_BORDER_THRESHOLD && ABS(borderInsets.left - borderInsets.top) < HM_VIEW_BORDER_THRESHOLD;
}

BOOL HMCornerRadiiAreEqual(HMCornerRadii cornerRadii) {
    return ABS(cornerRadii.topLeft - cornerRadii.topRight) < HM_VIEW_BORDER_THRESHOLD && ABS(cornerRadii.topLeft - cornerRadii.bottomLeft) < HM_VIEW_BORDER_THRESHOLD && ABS(cornerRadii.topLeft - cornerRadii.bottomRight) < HM_VIEW_BORDER_THRESHOLD;
}

BOOL HMBorderColorsAreEqual(HMBorderColors borderColors) {
    return CGColorEqualToColor(borderColors.left, borderColors.right) && CGColorEqualToColor(borderColors.left, borderColors.top) && CGColorEqualToColor(borderColors.left, borderColors.bottom);
}

HMCornerInsets HMGetCornerInsets(HMCornerRadii cornerRadii, UIEdgeInsets edgeInsets) {
    return (HMCornerInsets) {
            {
                    MAX(0, cornerRadii.topLeft - edgeInsets.left),
                    MAX(0, cornerRadii.topLeft - edgeInsets.top),
            },
            {
                    MAX(0, cornerRadii.topRight - edgeInsets.right),
                    MAX(0, cornerRadii.topRight - edgeInsets.top),
            },
            {
                    MAX(0, cornerRadii.bottomLeft - edgeInsets.left),
                    MAX(0, cornerRadii.bottomLeft - edgeInsets.bottom),
            },
            {
                    MAX(0, cornerRadii.bottomRight - edgeInsets.right),
                    MAX(0, cornerRadii.bottomRight - edgeInsets.bottom),
            }
    };
}

void pathAddEllipticArc(CGMutablePathRef path, const CGAffineTransform *m, CGPoint origin, CGSize size, CGFloat startAngle, CGFloat endAngle, BOOL clockwise) {
    CGFloat xScale = 1, yScale = 1, radius = 0;
    if (size.width != 0) {
        xScale = 1;
        yScale = size.height / size.width;
        radius = size.width;
    } else if (size.height != 0) {
        xScale = size.width / size.height;
        yScale = 1;
        radius = size.height;
    }

    CGAffineTransform t = CGAffineTransformMakeTranslation(origin.x, origin.y);
    t = CGAffineTransformScale(t, xScale, yScale);
    if (m) {
        t = CGAffineTransformConcat(t, *m);
    }

    CGPathAddArc(path, &t, 0, 0, radius, startAngle, endAngle, clockwise);
}

UIImage *getSolidBorderImage(HMCornerRadii cornerRadii, CGSize viewSize, UIEdgeInsets borderInsets, HMBorderColors borderColors, CGColorRef backgroundColor, BOOL drawToEdge) {
    const BOOL hasCornerRadii = cornerRadiiAreAboveThreshold(cornerRadii);
    const HMCornerInsets cornerInsets = HMGetCornerInsets(cornerRadii, borderInsets);

    // 边框宽度需要对齐设备 scale 的像素网格
    borderInsets = roundInsetsToPixel(borderInsets);

    // 如果中部内容区域 >= (0, 0)
    const BOOL makeStretchable =
            (borderInsets.left + cornerInsets.topLeft.width + borderInsets.right + cornerInsets.bottomRight.width <=
                    viewSize.width) &&
                    (borderInsets.left + cornerInsets.bottomLeft.width + borderInsets.right + cornerInsets.topRight.width <=
                            viewSize.width) &&
                    (borderInsets.top + cornerInsets.topLeft.height + borderInsets.bottom + cornerInsets.bottomRight.height <=
                            viewSize.height) &&
                    (borderInsets.top + cornerInsets.topRight.height + borderInsets.bottom + cornerInsets.bottomLeft.height <=
                            viewSize.height);

    // 中部内容区域侵蚀部分
    UIEdgeInsets edgeInsets = {
            borderInsets.top + MAX(cornerInsets.topLeft.height, cornerInsets.topRight.height),
            borderInsets.left + MAX(cornerInsets.topLeft.width, cornerInsets.bottomLeft.width),
            borderInsets.bottom + MAX(cornerInsets.bottomLeft.height, cornerInsets.bottomRight.height),
            borderInsets.right + MAX(cornerInsets.bottomRight.width, cornerInsets.topRight.width)
    };

    if (hasCornerRadii) {
        // 有圆角的情况下，侵蚀部分要上下、左右对称
        // Asymmetrical edgeInsets cause strange artifacting on iOS 10 and earlier.
        edgeInsets = (UIEdgeInsets) {
                MAX(edgeInsets.top, edgeInsets.bottom),
                MAX(edgeInsets.left, edgeInsets.right),
                MAX(edgeInsets.top, edgeInsets.bottom),
                MAX(edgeInsets.left, edgeInsets.right),
        };
    }

    const CGSize size = makeStretchable ? (CGSize) {
            // 1pt for the middle stretchable area along each axis
            edgeInsets.left + 1 + edgeInsets.right,
            edgeInsets.top + 1 + edgeInsets.bottom
    } : viewSize;

    HMGraphicsImageDrawingActions uiactions = ^(CGContextRef ctx) {
        const CGRect rect = {.size = size};
        CGPathRef path = pathCreateOuterOutline(drawToEdge, rect, cornerRadii);

        if (backgroundColor) {
            CGContextSetFillColorWithColor(ctx, backgroundColor);
            CGContextAddPath(ctx, path);
            CGContextFillPath(ctx);
        }

        CGContextAddPath(ctx, path);
        CGPathRelease(path);

        CGPathRef insetPath = HMPathCreateWithRoundedRect(UIEdgeInsetsInsetRect(rect, borderInsets), cornerInsets, nil);

        CGContextAddPath(ctx, insetPath);
        CGContextEOClip(ctx);

        BOOL hasEqualColors = HMBorderColorsAreEqual(borderColors);
        if ((drawToEdge || !hasCornerRadii) && hasEqualColors) {
            CGContextSetFillColorWithColor(ctx, borderColors.left);
            CGContextAddRect(ctx, rect);
            CGContextAddPath(ctx, insetPath);
            CGContextEOFillPath(ctx);

        } else {
            CGPoint topLeft = {borderInsets.left, borderInsets.top};
            if (cornerInsets.topLeft.width > 0 && cornerInsets.topLeft.height > 0) {
                CGPoint points[2];
                ellipseGetIntersectionsWithLine(
                        (CGRect) {topLeft, {2 * cornerInsets.topLeft.width, 2 * cornerInsets.topLeft.height}},
                        CGPointZero,
                        topLeft,
                        points);
                if (!isnan(points[1].x) && !isnan(points[1].y)) {
                    topLeft = points[1];
                }
            }

            CGPoint bottomLeft = {borderInsets.left, size.height - borderInsets.bottom};
            if (cornerInsets.bottomLeft.width > 0 && cornerInsets.bottomLeft.height > 0) {
                CGPoint points[2];
                ellipseGetIntersectionsWithLine(
                        (CGRect) {
                                {bottomLeft.x, bottomLeft.y - 2 * cornerInsets.bottomLeft.height},
                                {2 * cornerInsets.bottomLeft.width, 2 * cornerInsets.bottomLeft.height}},
                        (CGPoint) {0, size.height},
                        bottomLeft,
                        points);
                if (!isnan(points[1].x) && !isnan(points[1].y)) {
                    bottomLeft = points[1];
                }
            }

            CGPoint topRight = {size.width - borderInsets.right, borderInsets.top};
            if (cornerInsets.topRight.width > 0 && cornerInsets.topRight.height > 0) {
                CGPoint points[2];
                ellipseGetIntersectionsWithLine(
                        (CGRect) {
                                {topRight.x - 2 * cornerInsets.topRight.width, topRight.y},
                                {2 * cornerInsets.topRight.width, 2 * cornerInsets.topRight.height}},
                        (CGPoint) {size.width, 0},
                        topRight,
                        points);
                if (!isnan(points[0].x) && !isnan(points[0].y)) {
                    topRight = points[0];
                }
            }

            CGPoint bottomRight = {size.width - borderInsets.right, size.height - borderInsets.bottom};
            if (cornerInsets.bottomRight.width > 0 && cornerInsets.bottomRight.height > 0) {
                CGPoint points[2];
                ellipseGetIntersectionsWithLine(
                        (CGRect) {
                                {bottomRight.x - 2 * cornerInsets.bottomRight.width, bottomRight.y - 2 * cornerInsets.bottomRight.height},
                                {2 * cornerInsets.bottomRight.width, 2 * cornerInsets.bottomRight.height}},
                        (CGPoint) {size.width, size.height},
                        bottomRight,
                        points);
                if (!isnan(points[0].x) && !isnan(points[0].y)) {
                    bottomRight = points[0];
                }
            }

            CGColorRef currentColor = NULL;

            // RIGHT
            if (borderInsets.right > 0) {
                const CGPoint points[] = {
                        {size.width, 0},
                        topRight,
                        bottomRight,
                        {size.width, size.height},
                };

                currentColor = borderColors.right;
                CGContextAddLines(ctx, points, sizeof(points) / sizeof(*points));
            }

            // BOTTOM
            if (borderInsets.bottom > 0) {
                const CGPoint points[] = {
                        {0, size.height},
                        bottomLeft,
                        bottomRight,
                        {size.width, size.height},
                };

                if (!CGColorEqualToColor(currentColor, borderColors.bottom)) {
                    CGContextSetFillColorWithColor(ctx, currentColor);
                    CGContextFillPath(ctx);
                    currentColor = borderColors.bottom;
                }
                CGContextAddLines(ctx, points, sizeof(points) / sizeof(*points));
            }

            // LEFT
            if (borderInsets.left > 0) {
                const CGPoint points[] = {
                        CGPointZero,
                        topLeft,
                        bottomLeft,
                        {0, size.height},
                };

                if (!CGColorEqualToColor(currentColor, borderColors.left)) {
                    CGContextSetFillColorWithColor(ctx, currentColor);
                    CGContextFillPath(ctx);
                    currentColor = borderColors.left;
                }
                CGContextAddLines(ctx, points, sizeof(points) / sizeof(*points));
            }

            // TOP
            if (borderInsets.top > 0) {
                const CGPoint points[] = {
                        CGPointZero,
                        topLeft,
                        topRight,
                        {size.width, 0},
                };

                if (!CGColorEqualToColor(currentColor, borderColors.top)) {
                    CGContextSetFillColorWithColor(ctx, currentColor);
                    CGContextFillPath(ctx);
                    currentColor = borderColors.top;
                }
                CGContextAddLines(ctx, points, sizeof(points) / sizeof(*points));
            }

            CGContextSetFillColorWithColor(ctx, currentColor);
            CGContextFillPath(ctx);
        }

        CGPathRelease(insetPath);
    };
    
    BOOL opaque = drawShouldUseOpaque(backgroundColor, hasCornerRadii, drawToEdge);
    UIImage *image = uiGraphicsImageRendererToDrawing(uiactions, size, opaque);
    if (makeStretchable) {
        image = [image resizableImageWithCapInsets:edgeInsets];
    }

    return image;
}

UIImage *getDashedOrDottedBorderImage(HMBorderStyle borderStyle, HMCornerRadii cornerRadii, CGSize viewSize, UIEdgeInsets borderInsets, HMBorderColors borderColors, CGColorRef backgroundColor, BOOL drawToEdge) {
    NSCParameterAssert(borderStyle == HMBorderStyleDashed || borderStyle == HMBorderStyleDotted);

    if (!HMBorderColorsAreEqual(borderColors) || !HMBorderInsetsAreEqual(borderInsets)) {
        // TODO(ChasonTang): HMLogWarn(@"Unsupported dashed / dotted border style");
        return nil;
    }

    const CGFloat lineWidth = borderInsets.top;
    if (lineWidth <= 0.0) {
        return nil;
    }

    const BOOL hasCornerRadii = cornerRadiiAreAboveThreshold(cornerRadii);
    
    HMGraphicsImageDrawingActions uiactions = ^(CGContextRef ctx) {
        const CGRect rect = {.size = viewSize};

        if (backgroundColor) {
            CGPathRef outerPath = pathCreateOuterOutline(drawToEdge, rect, cornerRadii);
            CGContextAddPath(ctx, outerPath);
            CGPathRelease(outerPath);

            CGContextSetFillColorWithColor(ctx, backgroundColor);
            CGContextFillPath(ctx);
        }

        // Stroking means that the width is divided in half and grows in both directions
        // perpendicular to the path, that's why we inset by half the width, so that it
        // reaches the edge of the rect.
        CGRect pathRect = CGRectInset(rect, lineWidth / 2.0, lineWidth / 2.0);
        CGPathRef path = HMPathCreateWithRoundedRect(pathRect, HMGetCornerInsets(cornerRadii, UIEdgeInsetsZero), nil);

        CGFloat dashLengths[2];
        dashLengths[0] = dashLengths[1] = (borderStyle == HMBorderStyleDashed ? 3 : 1) * lineWidth;

        CGContextSetLineWidth(ctx, lineWidth);
        CGContextSetLineDash(ctx, 0, dashLengths, sizeof(dashLengths) / sizeof(*dashLengths));

        CGContextSetStrokeColorWithColor(ctx, [UIColor yellowColor].CGColor);

        CGContextAddPath(ctx, path);
        CGContextSetStrokeColorWithColor(ctx, borderColors.top);
        CGContextStrokePath(ctx);

        CGPathRelease(path);
    };
    BOOL opaque = drawShouldUseOpaque(backgroundColor, hasCornerRadii, drawToEdge);
    return uiGraphicsImageRendererToDrawing(uiactions, viewSize, opaque);
}

UIImage *uiGraphicsImageRendererToDrawing(HMGraphicsImageDrawingActions uiactions, CGSize size, BOOL opaque) {
    UIImage *image = nil;
    if (@available(iOS 10.0, tvOS 10.0, *)) {
        UIGraphicsImageRendererFormat *uiFormat;
        // iOS 11.0.0 GM does have `preferredFormat`, but iOS 11 betas did not.
        if ([UIGraphicsImageRenderer respondsToSelector:@selector(preferredFormat)]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wunguarded-availability"
            uiFormat = [UIGraphicsImageRendererFormat preferredFormat];
#pragma clang diagnostic pop
        } else {
            uiFormat = [UIGraphicsImageRendererFormat defaultFormat];
        }
        uiFormat.opaque = opaque;
        UIGraphicsImageRenderer *uiImageRenderer = [[UIGraphicsImageRenderer alloc] initWithSize:size format:uiFormat];
        UIGraphicsImageDrawingActions drawingActions = ^(UIGraphicsImageRendererContext *rendererContext) {
            if (uiactions) {
                uiactions(rendererContext.CGContext);
            }
        };
        image = [uiImageRenderer imageWithActions:drawingActions];
    } else {
        CGContextRef contextRef = uiGraphicsBeginImageContext(size, opaque);
        if (uiactions) {
            uiactions(contextRef);
        }
        image = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
    }
    return image;
}

CGPathRef HMPathCreateWithRoundedRect(CGRect bounds, HMCornerInsets cornerInsets, const CGAffineTransform *transform) {
    const CGFloat minX = CGRectGetMinX(bounds);
    const CGFloat minY = CGRectGetMinY(bounds);
    const CGFloat maxX = CGRectGetMaxX(bounds);
    const CGFloat maxY = CGRectGetMaxY(bounds);

    const CGSize topLeft = {
            MAX(0, MIN(cornerInsets.topLeft.width, bounds.size.width - cornerInsets.topRight.width)),
            MAX(0, MIN(cornerInsets.topLeft.height, bounds.size.height - cornerInsets.bottomLeft.height)),
    };
    const CGSize topRight = {
            MAX(0, MIN(cornerInsets.topRight.width, bounds.size.width - cornerInsets.topLeft.width)),
            MAX(0, MIN(cornerInsets.topRight.height, bounds.size.height - cornerInsets.bottomRight.height)),
    };
    const CGSize bottomLeft = {
            MAX(0, MIN(cornerInsets.bottomLeft.width, bounds.size.width - cornerInsets.bottomRight.width)),
            MAX(0, MIN(cornerInsets.bottomLeft.height, bounds.size.height - cornerInsets.topLeft.height)),
    };
    const CGSize bottomRight = {
            MAX(0, MIN(cornerInsets.bottomRight.width, bounds.size.width - cornerInsets.bottomLeft.width)),
            MAX(0, MIN(cornerInsets.bottomRight.height, bounds.size.height - cornerInsets.topRight.height)),
    };

    CGMutablePathRef path = CGPathCreateMutable();
    pathAddEllipticArc(
            path, transform, (CGPoint) {minX + topLeft.width, minY + topLeft.height}, topLeft, M_PI, 3 * M_PI_2, NO);
    pathAddEllipticArc(
            path, transform, (CGPoint) {maxX - topRight.width, minY + topRight.height}, topRight, 3 * M_PI_2, 0, NO);
    pathAddEllipticArc(
            path, transform, (CGPoint) {maxX - bottomRight.width, maxY - bottomRight.height}, bottomRight, 0, M_PI_2, NO);
    pathAddEllipticArc(
            path, transform, (CGPoint) {minX + bottomLeft.width, maxY - bottomLeft.height}, bottomLeft, M_PI_2, M_PI, NO);
    CGPathCloseSubpath(path);

    // TODO(ChasonTang): 确认 CGPathCreateCopy 是否存在 COW
    return path;
}

UIImage *HMGetBorderImage(HMBorderStyle borderStyle, CGSize viewSize, HMCornerRadii cornerRadii, UIEdgeInsets borderInsets, HMBorderColors borderColors, CGColorRef backgroundColor, BOOL drawToEdge) {
    switch (borderStyle) {
        case HMBorderStyleSolid:
            return getSolidBorderImage(cornerRadii, viewSize, borderInsets, borderColors, backgroundColor, drawToEdge);
        case HMBorderStyleDashed:
        case HMBorderStyleDotted:
            return getDashedOrDottedBorderImage(
                    borderStyle, cornerRadii, viewSize, borderInsets, borderColors, backgroundColor, drawToEdge);
        case HMBorderStyleNone:
            break;
    }

    return nil;
}

