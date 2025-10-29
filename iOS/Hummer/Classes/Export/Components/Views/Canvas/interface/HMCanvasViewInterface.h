//
//  HMCanvasViewInterface.h
//  Hummer
//
//  Created by litianhao on 2021/7/28.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMCanvasViewInterface <NSObject>

@property (nonatomic , assign) CGFloat lineWidth ;

@property (nonatomic , strong) UIColor *lineColor ;

@property (nonatomic , strong) UIColor *fillColor ;

@property (nonatomic , assign) CGLineCap lineCap ;

@property (nonatomic , assign) CGLineJoin lineJoin ;

@property (nonatomic , assign) CGFloat fontSize ;

@property (nonatomic , strong) UIColor *textColor ;

- (void)moveToPoint:(CGPoint)point;

- (void)addLineTo:(CGPoint)p;

- (void)drawImage:(UIImage *)image atRect:(CGRect)rect;

- (void)fillRect:(CGRect)rect;

- (void)strokeRect:(CGRect)rect;

- (void)fillCircleAtPoint:(CGPoint)point radius:(CGFloat)radius;

- (void)strokeCircleAtPoint:(CGPoint)point radius:(CGFloat)radius;

- (void)drawArcAtPoint:(CGPoint)point radius:(CGFloat)radius startAngle:(CGFloat)startAngle endAngle:(CGFloat)endAngle clockwise:(BOOL)clockwise;

- (void)drawEllipseAtRect:(CGRect)rect;

- (void)fillEllipseAtRect:(CGRect)rect;

- (void)drawPath:(UIBezierPath *)path;

- (void)drawText:(NSString *)text atPoint:(CGPoint)point maxWidth:(CGFloat)maxWidth;

@end


@protocol HMCanvasInternalInterface <HMCanvasViewInterface>

@property (nonatomic , weak ) UIView *containerView;

- (instancetype)initWithContainerView:(UIView *)containerView;

- (void)refreshLayout;

@end

NS_ASSUME_NONNULL_END
