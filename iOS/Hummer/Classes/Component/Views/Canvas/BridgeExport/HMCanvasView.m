//
//  THCanvasView.m
//  TestCanvas
//
//  Created by litianhao on 2021/6/30.
//

#import "HMCanvasView.h"
#import "HMCanvasViewInterface.h"
#import "HMCanvasImplByCoreGraphic.h"
#import "HMExportManager.h"
#import "HMBaseValue.h"
#import "HMConverter.h"
#import "HMUIUtility.h"
#import "UIView+HMImageLoader.h"
#import "HMImageManager.h"

@interface HMCanvasView ()

@property (nonatomic , strong , readwrite) id<HMCanvasInternalInterface> internal_canvas_impl;

@end

@implementation HMCanvasView


- (instancetype)initWithFrame:(CGRect)frame {
    frame = [UIScreen mainScreen].bounds;
    if (self = [super initWithFrame:frame]) {
        self.backgroundColor = [UIColor whiteColor];
        [self initialData];
    }
    return self;
}

- (void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    [self.internal_canvas_impl refreshLayout];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self.internal_canvas_impl refreshLayout];
}


- (void)setBackgroundColor:(UIColor *)backgroundColor {
    [super setBackgroundColor:backgroundColor];
    [self.internal_canvas_impl refreshLayout];
}

- (void)initialData {
    self.internal_canvas_impl = [[HMCanvasImplByCoreGraphic alloc] initWithContainerView:self];
}

@end


#pragma mark - export to hummer

@interface HMCanvasView (HMExported)

@end


@implementation HMCanvasView (HMExported)

HM_EXPORT_CLASS(CanvasView,HMCanvasView)

#pragma mark - line
HM_EXPORT_METHOD(lineWidth, configStrokeLineWidth:)
HM_EXPORT_METHOD(lineColor, configStrokeLineColor:)
HM_EXPORT_METHOD(moveTo, moveToPointAtX:y:)
HM_EXPORT_METHOD(addLineTo, addLineToX:y:)
HM_EXPORT_METHOD(drawLine, drawLineAtHummerStartX:startY:endX:endY:)
HM_EXPORT_METHOD(strokeRect, strokeRectAtHummerWithX:Y:W:H:)
HM_EXPORT_METHOD(strokeCircle, strokeCircleAtX:y:radius:)
HM_EXPORT_METHOD(strokeEllipse, strokeEllipseAtX:y:trailX:trailY:)
HM_EXPORT_METHOD(arc, arcAtCenterX:centerY:radius:startAngle:endAngle:clockwise:)
HM_EXPORT_METHOD(lineCap, configStrokeLineCap:)
HM_EXPORT_METHOD(lineJoin, configStrokeLineJoin:)


#pragma mark - fill
HM_EXPORT_METHOD(fillColor, configFillColor:)
HM_EXPORT_METHOD(fillRect, fillRectAtHummerWithX:Y:W:H:)
HM_EXPORT_METHOD(fillCircle, fillCircleAtX:y:radius:)
HM_EXPORT_METHOD(fillEllipse, fillEllipseAtX:y:trailX:trailY:)


#pragma mark - text
HM_EXPORT_METHOD(fontSize, configFontSize:)
HM_EXPORT_METHOD(textColor, configTextColor:)
HM_EXPORT_METHOD(fillText, fillText:atX:y:maxWidth:)

#pragma mark - text
HM_EXPORT_METHOD(drawImage,drawImageWithSrc:atX:y:width:height:)

/// 渲染图片
- (void)drawImageWithSrc:(HMBaseValue *)src
                     atX:(HMBaseValue *)x
                       y:(HMBaseValue *)y
                   width:(HMBaseValue *)width
                  height:(HMBaseValue *)height {
    NSString *srcString = src.toString;
    if (![srcString isKindOfClass:[NSString class]] || srcString.length == 0) {
        return;
    }
    
    __weak typeof(self) weakSelf = self;
    [[HMImageManager sharedManager] load:srcString inJSBundleSource:nil context:nil completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
        if (image) {
            [weakSelf.internal_canvas_impl drawImage:image
                                              atRect:HMCanvasCGRectMake(x, y, width, height)];
        }
    }];    
}

/// 填充矩形
- (void)fillRectAtHummerWithX:(HMBaseValue *)x
                            Y:(HMBaseValue *)y
                            W:(HMBaseValue *)w
                            H:(HMBaseValue *)h {
    [self.internal_canvas_impl fillRect:HMCanvasCGRectMake(x, y, w, h)];
}

- (void)strokeRectAtHummerWithX:(HMBaseValue *)x
                              Y:(HMBaseValue *)y
                              W:(HMBaseValue *)w
                              H:(HMBaseValue *)h {
    [self.internal_canvas_impl strokeRect:HMCanvasCGRectMake(x, y, w, h)];
}

- (void)drawLineAtHummerStartX:(HMBaseValue *)startX
                        startY:(HMBaseValue *)startY
                          endX:(HMBaseValue *)endX
                          endY:(HMBaseValue *)endY  {
    [self.internal_canvas_impl moveToPoint:HMCanvasCGPointMake(startX, startY)];
    [self.internal_canvas_impl addLineTo:HMCanvasCGPointMake(endX, endY)];
}

- (void)moveToPointAtX:(HMBaseValue *)x
                     y:(HMBaseValue *)y {
    [self.internal_canvas_impl moveToPoint:HMCanvasCGPointMake(x, y)];
}

- (void)addLineToX:(HMBaseValue *)x
                 y:(HMBaseValue *)y {
    [self.internal_canvas_impl addLineTo:HMCanvasCGPointMake(x, y)];
}


- (void)configStrokeLineWidth:(HMBaseValue *)lineWidth {
    [self.internal_canvas_impl setLineWidth:HMPointWithString(lineWidth.toString)];
}

- (void)configStrokeLineColor:(HMBaseValue *)lineColor {
    [self.internal_canvas_impl setLineColor: [HMConverter HMStringToColor:lineColor.toString]];
}

- (void)configStrokeLineCap:(HMBaseValue *)lineCap {
    CGLineCap lineCapValue = kCGLineCapRound;
    switch (lineCap.toInt32) {
        case kCGLineCapButt:
            lineCapValue = kCGLineCapButt;
            break;
        case kCGLineCapSquare:
            lineCapValue = kCGLineCapSquare;
            break;
        default:
            lineCapValue = kCGLineCapRound;
            break;
    }
    [self.internal_canvas_impl setLineCap:lineCapValue];
}


- (void)configStrokeLineJoin:(HMBaseValue *)lineJoin {
    CGLineJoin lineJoinValue = kCGLineJoinRound;
    switch (lineJoin.toInt32) {
        case kCGLineJoinBevel:
            lineJoinValue = kCGLineJoinBevel;
            break;
        case kCGLineJoinMiter:
            lineJoinValue = kCGLineJoinMiter;
            break;
        default:
            lineJoinValue = kCGLineJoinRound;
            break;
    }
    [self.internal_canvas_impl setLineJoin:lineJoinValue];
}

- (void)configFillColor:(HMBaseValue *)lineColor {
    [self.internal_canvas_impl setFillColor: [HMConverter HMStringToColor:lineColor.toString]];
}

- (void)configFontSize:(HMBaseValue *)fontSize {
    self.internal_canvas_impl.fontSize = fontSize.toDouble;
}

- (void)configTextColor:(HMBaseValue *)colorHex {
    self.internal_canvas_impl.textColor = [HMConverter HMStringToColor:colorHex.toString];
}

- (void)fillText:(HMBaseValue *)text
             atX:(HMBaseValue *)x
               y:(HMBaseValue *)y
        maxWidth:(HMBaseValue *)maxWidth {
    [self.internal_canvas_impl drawText:text.toString
                                atPoint:CGPointMake(x.toDouble, y.toDouble)
                               maxWidth:maxWidth.toDouble];
}


- (void)strokeCircleAtX:(HMBaseValue *)x
                      y:(HMBaseValue *)y
                 radius:(HMBaseValue *)radius {
    [self.internal_canvas_impl strokeCircleAtPoint:HMCanvasCGPointMake(x, y)
                                            radius:radius.toDouble];
}

- (void)fillCircleAtX:(HMBaseValue *)x
                    y:(HMBaseValue *)y
               radius:(HMBaseValue *)radius {
    [self.internal_canvas_impl fillCircleAtPoint:HMCanvasCGPointMake(x, y)
                                          radius:radius.toDouble];
}

- (void)strokeEllipseAtX:(HMBaseValue *)x
                       y:(HMBaseValue *)y
                  trailX:(HMBaseValue *)trailX
                  trailY:(HMBaseValue *)trailY {
    [self.internal_canvas_impl drawEllipseAtRect:HMCanvasCGRectMakeByTrail(x,
                                                                           y,
                                                                           trailX,
                                                                           trailY)];
}

- (void)fillEllipseAtX:(HMBaseValue *)x
                     y:(HMBaseValue *)y
                trailX:(HMBaseValue *)trailX
                trailY:(HMBaseValue *)trailY {
    [self.internal_canvas_impl fillEllipseAtRect:HMCanvasCGRectMakeByTrail(x,
                                                                           y,
                                                                           trailX,
                                                                           trailY)];
}


- (void)arcAtCenterX:(HMBaseValue *)centerX
             centerY:(HMBaseValue *)centerY
              radius:(HMBaseValue *)radius
          startAngle:(HMBaseValue *)startAngle
            endAngle:(HMBaseValue *)endAngle
           clockwise:(HMBaseValue *)clockwise {
    [self.internal_canvas_impl drawArcAtPoint:HMCanvasCGPointMake(centerX, centerY)
                                       radius:radius.toDouble
                                   startAngle:startAngle.toDouble
                                     endAngle:endAngle.toDouble
                                    clockwise:!(clockwise.toBool)];
}

@end

