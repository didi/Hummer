//
//  HMCanvasImplByCoreGraphic.m
//  Hummer
//
//  Created by litianhao on 2021/8/2.
//

#import "HMCanvasImplByCoreGraphic.h"
#import "HMCanvasByGraphicInternelView.h"

@interface HMCanvasImplByCoreGraphic ()

@property (nonatomic , strong) HMCanvasByGraphicInternelView *canvas;

@end

@implementation HMCanvasImplByCoreGraphic

@synthesize containerView = _containerView;

- (instancetype)initWithContainerView:(UIView *)containerView {
    if (self = [super init]) {
        self.containerView = containerView;
        [self.containerView addSubview:self.canvas];
        [self refreshLayout];
    }
    return self;
}

- (void)setContainerView:(UIView *)containerView {
    [self.canvas removeFromSuperview];
    _containerView = containerView;
    [containerView addSubview:self.canvas];
    [self refreshLayout];
}

- (void)refreshLayout {
    self.canvas.frame = self.containerView.bounds;
    self.canvas.backgroundColor = self.containerView.backgroundColor;
    [self.canvas setNeedsDisplay];
}

- (void)moveToPoint:(CGPoint)point {
    [self.canvas moveToPoint:point];
}

- (void)addLineTo:(CGPoint)p {
    [self.canvas addLineTo:p];
}

- (void)drawImage:(UIImage *)image atRect:(CGRect)rect {
    [self.canvas drawImage:image atRect:rect];
}

- (void)fillRect:(CGRect)rect {
    [self.canvas fillRect:rect];
}

- (void)strokeRect:(CGRect)rect {
    [self.canvas strokeRect:rect];
}

- (void)strokeCircleAtPoint:(CGPoint)point radius:(CGFloat)radius {
    [self.canvas strokeCircleAtPoint:point radius:radius];
}

- (void)fillCircleAtPoint:(CGPoint)point radius:(CGFloat)radius {
    [self.canvas fillCircleAtPoint:point radius:radius];
}

- (void)drawText:(NSString *)text atPoint:(CGPoint)point maxWidth:(CGFloat)maxWidth {
    [self.canvas drawText:text atPoint:point maxWidth:maxWidth];
}

- (void)drawArcAtPoint:(CGPoint)point radius:(CGFloat)radius startAngle:(CGFloat)startAngle endAngle:(CGFloat)endAngle clockwise:(BOOL)clockwise {
    [self.canvas drawArcAtPoint:point radius:radius startAngle:startAngle endAngle:endAngle clockwise:clockwise];
}

- (void)drawEllipseAtRect:(CGRect)rect {
    [self.canvas drawEllipseAtRect:rect];
}

- (void)fillEllipseAtRect:(CGRect)rect {
    [self.canvas fillEllipseAtRect:rect];
}

- (void)drawPath:(UIBezierPath *)path {
    [self.canvas drawPath:path];
}

- (HMCanvasByGraphicInternelView *)canvas {
    if (!_canvas) {
        _canvas = [[HMCanvasByGraphicInternelView alloc] init];
    }
    return _canvas;
}

#pragma mark 未实现方法

- (id)forwardingTargetForSelector:(SEL)selector{
    if (![self respondsToSelector:selector]) {
        return self.canvas;
    }
    return [super forwardingTargetForSelector:selector];
}

- (void)setFillColor:(UIColor *)fillColor {
    [self.canvas setFillColor:fillColor];
}

- (UIColor *)fillColor {
    return self.canvas.fillColor;
}

- (void)setFontSize:(CGFloat)fontSize {
    [self.canvas setFontSize:fontSize];
}

- (CGFloat)fontSize {
    return self.canvas.fontSize;
}

- (void)setLineCap:(CGLineCap)lineCap {
    [self.canvas setLineCap:lineCap];
}

- (CGLineCap)lineCap {
    return self.canvas.lineCap;
}

- (void)setLineColor:(UIColor *)lineColor {
    [self.canvas setLineColor:lineColor];
}

- (UIColor *)lineColor {
    return self.canvas.lineColor;
}

- (void)setLineJoin:(CGLineJoin)lineJoin {
    [self.canvas setLineJoin:lineJoin];
}

- (CGLineJoin)lineJoin {
    return self.canvas.lineJoin;
}

- (void)setLineWidth:(CGFloat)lineWidth {
    [self.canvas setLineWidth:lineWidth];
}

- (CGFloat)lineWidth {
    return self.canvas.lineWidth;
}

- (UIColor *)textColor {
    return self.canvas.textColor;
}

- (void)setTextColor:(UIColor *)textColor {
    self.canvas.textColor = textColor;
}

@end
