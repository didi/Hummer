//
//  HMCanvasByGraphicInternelView.m
//  Hummer
//
//  Created by litianhao on 2021/8/2.
//

#import "HMCanvasByGraphicInternelView.h"
#import "HMCanvasDrawCommand.h"


@interface HMCanvasLayer : CALayer

@property (nonatomic , strong , readonly) NSMutableArray<HMDrawCommand *> *drawCommands;

@end


@implementation HMCanvasLayer
{
    NSMutableArray<HMDrawCommand *> *_drawCommands;
}

- (NSMutableArray<HMDrawCommand *> *)drawCommands {
    if (!_drawCommands) {
        _drawCommands = [NSMutableArray array];
    }
    return _drawCommands;
}

- (void)drawInContext:(CGContextRef)context {
    CGContextSaveGState(context);
    [self.drawCommands enumerateObjectsUsingBlock:^(HMDrawCommand * _Nonnull drawCommand, NSUInteger idx, BOOL * _Nonnull stop) {
        switch (drawCommand.paint.paintType) {
                case HMDrawPaintTypeStroke:
                    {
                        CGContextSetStrokeColorWithColor(context, drawCommand.paint.lineColor.CGColor);
                        CGContextSetLineCap(context, drawCommand.paint.lineCap);
                        CGContextSetLineJoin(context, drawCommand.paint.lineJoin);
                        CGContextSetLineWidth(context, drawCommand.paint.lineWidth);
                        CGContextAddPath(context, drawCommand.path.CGPath);
                        CGContextStrokePath(context);
                        break;
                    }
                case HMDrawPaintTypeFill:
                    {
                        CGContextSetFillColorWithColor(context, drawCommand.paint.fillColor.CGColor);
                        CGContextAddPath(context, drawCommand.path.CGPath);
                        CGContextFillPath(context);
                        break;
                    }
                case HMDrawPaintTypeText:
                    {
                        UIGraphicsPushContext(context);
                        UIFont *font =  [UIFont systemFontOfSize:drawCommand.paint.fontSize];
                        UIColor *textColor = drawCommand.paint.textColor ?: [UIColor blackColor];
                        [drawCommand.text drawInRect:drawCommand.rect withAttributes:@{
                            NSFontAttributeName : font,
                            NSForegroundColorAttributeName : textColor
                        }];
                        UIGraphicsPopContext();
                        break;
                    }
                case HMDrawPaintTypeImage:
                    {
                        if (drawCommand.image && !CGRectEqualToRect(drawCommand.rect, CGRectZero)) {
                            UIGraphicsPushContext(context);
                            [drawCommand.image drawInRect:drawCommand.rect];
                            UIGraphicsPopContext();
                        }
                        break;
                    }
                default:
                    break;
            }
    }];
    CGContextRestoreGState(context);
}

@end

@interface HMCanvasByGraphicInternelView ()

@property (nonatomic , assign) BOOL needSetDisplayOnView;
@property (nonatomic , strong) dispatch_queue_t serial_queue;
@property (nonatomic , strong) NSMutableArray<HMCanvasLayer *> *canvasLayers;
@property (nonatomic , assign) NSUInteger maxCommandCountPerLayer;
@end


@implementation HMCanvasByGraphicInternelView
@synthesize lineWidth = _lineWidth, lineColor , fillColor , lineCap , lineJoin , fontSize , textColor;


- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.backgroundColor = [UIColor whiteColor];
        [self configDefaultPaintStyle];
        self.maxCommandCountPerLayer = 100;
        self.canvasLayers = [NSMutableArray array];
    }
    return self;
}


- (void)configDefaultPaintStyle {
    self.fillColor = [UIColor whiteColor];
    self.lineColor = [UIColor blackColor];
    self.lineWidth = 1;
    self.lineJoin = kCGLineJoinRound;
    self.lineCap = kCGLineCapRound;
    self.fontSize = 10;
    self.textColor = [UIColor blackColor];
}

- (HMCanvasLayer *)currentCanvasLayer {
    HMCanvasLayer *layer = self.canvasLayers.lastObject ;
    if (!layer) {
        layer = [self generalNewCanvasLayer];
    }
    return layer;
}


- (HMCanvasLayer *)generalNewCanvasLayer {
    HMCanvasLayer *layer = [HMCanvasLayer layer];
    layer.frame = self.bounds;
    [self.layer addSublayer:layer];
    [self.canvasLayers addObject:layer];
    return layer;
}

- (HMDrawCommand *)fetchCommandOfPaintType:(HMDrawPaintType)paintType {
    HMDrawCommand *command = [self getCurrentCommand];
    if (![self canReuseCommand:command paintType:paintType]) {
       command = [self generalNewCommand];
       command.paint.paintType = paintType;
    }
    return command;
}

- (HMDrawCommand *)getCurrentCommand {
    HMCanvasLayer *canvasLayer = [self currentCanvasLayer];
    return canvasLayer.drawCommands.lastObject;
}


- (HMDrawCommand *)generalNewCommand {
    HMCanvasLayer *canvasLayer = [self currentCanvasLayer];
    if (canvasLayer.drawCommands.count >= self.maxCommandCountPerLayer) {
        canvasLayer = [self generalNewCanvasLayer];
    }
    HMDrawCommand *command = [[HMDrawCommand alloc] init];
    command.paint.fillColor =  self.fillColor ;
    command.paint.lineColor = self.lineColor;
    command.paint.lineWidth = self.lineWidth ;
    command.paint.lineJoin = self.lineJoin ;
    command.paint.lineCap = self.lineCap;
    command.paint.fontSize = self.fontSize;
    command.paint.textColor = self.textColor;
    [canvasLayer.drawCommands addObject:command];
    return command;
}

- (BOOL)canReuseCommand:(HMDrawCommand *)drawCommand paintType:(HMDrawPaintType)paintType {
    if (HMDrawPaintTypeText == paintType ||
        HMDrawPaintTypeImage == paintType) {
        return NO; // 文本绘制和图片绘制 不复用command
    }
    if (drawCommand.paint.paintType != paintType) {
        return NO;
    }
    BOOL canReuse = YES;
    switch (paintType) {
        case HMDrawPaintTypeStroke:
        {
            canReuse = canReuse && (drawCommand.paint.lineColor == self.lineColor);
            canReuse = canReuse && (fabs(drawCommand.paint.lineWidth - self.lineWidth) < 0.0000001) ;
            canReuse = canReuse && (drawCommand.paint.lineCap == self.lineCap);
            canReuse = canReuse && (drawCommand.paint.lineJoin == self.lineJoin);
            break;
        }
        case HMDrawPaintTypeFill:
        {
            canReuse = canReuse && (drawCommand.paint.fillColor == self.fillColor);
            break;
        }
        default:
            break;
    }
    return canReuse;
}


#pragma mark - interface impl

- (void)moveToPoint:(CGPoint)point {
    [[self getCurrentCommand].path moveToPoint:point];
}

- (void)addLineTo:(CGPoint)p {
    HMDrawCommand *command = [self getCurrentCommand];
    if (![self canReuseCommand:command paintType:HMDrawPaintTypeStroke]) {
        CGPoint currentPoint = command.path.currentPoint;
        command = [self generalNewCommand];
        [command.path moveToPoint:currentPoint];
    }
    
    [command.path addLineToPoint:p];
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)drawImage:(UIImage *)image atRect:(CGRect)rect {
    HMDrawCommand *command = [self generalNewCommand];
    command.paint.paintType = HMDrawPaintTypeImage;
    command.image = image;
    command.rect = rect;
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)drawText:(NSString *)text atPoint:(CGPoint)point maxWidth:(CGFloat)maxWidth {
    HMDrawCommand *command = [self generalNewCommand];
    command.paint.paintType = HMDrawPaintTypeText;
    command.text = text;
    command.rect = CGRectMake(point.x, point.y, maxWidth, CGFLOAT_MAX);
    [[self currentCanvasLayer] setNeedsDisplay];
}


- (void)fillRect:(CGRect)rect {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeFill];
    [command.path appendPath:[UIBezierPath bezierPathWithRect:rect]];
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)strokeRect:(CGRect)rect {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeStroke];
    [command.path appendPath:[UIBezierPath bezierPathWithRect:rect]];
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)strokeCircleAtPoint:(CGPoint)point radius:(CGFloat)radius {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeStroke];
    [command.path appendPath:[UIBezierPath bezierPathWithArcCenter:point radius:radius startAngle:0 endAngle:M_PI * 2 clockwise:1]];
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)fillCircleAtPoint:(CGPoint)point radius:(CGFloat)radius {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeFill];
    [command.path appendPath:[UIBezierPath bezierPathWithArcCenter:point radius:radius startAngle:0 endAngle:M_PI * 2 clockwise:1]];
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)drawArcAtPoint:(CGPoint)point radius:(CGFloat)radius startAngle:(CGFloat)startAngle endAngle:(CGFloat)endAngle clockwise:(BOOL)clockwise {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeStroke];
    [command.path appendPath:[UIBezierPath bezierPathWithArcCenter:point radius:radius startAngle:startAngle endAngle:endAngle clockwise:clockwise]];
    [[self currentCanvasLayer] setNeedsDisplay];
}


- (void)drawEllipseAtRect:(CGRect)rect {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeStroke];
    [command.path appendPath:[UIBezierPath bezierPathWithOvalInRect:rect]];
    [[self currentCanvasLayer] setNeedsDisplay];
}

- (void)fillEllipseAtRect:(CGRect)rect {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeFill];
    [command.path appendPath:[UIBezierPath bezierPathWithOvalInRect:rect]];
    [[self currentCanvasLayer] setNeedsDisplay];
}


- (void)drawPath:(UIBezierPath *)path {
    HMDrawCommand *command = [self fetchCommandOfPaintType:HMDrawPaintTypeStroke];
    [command.path appendPath:path];
    [[self currentCanvasLayer] setNeedsDisplay];
    
}

@end
