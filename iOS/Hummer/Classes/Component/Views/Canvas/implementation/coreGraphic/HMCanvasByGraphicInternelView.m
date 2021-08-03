//
//  HMCanvasByGraphicInternelView.m
//  Hummer
//
//  Created by litianhao on 2021/8/2.
//

#import "HMCanvasByGraphicInternelView.h"
#import "HMCanvasDrawCommand.h"

static const char *serialQueueKey  = "com.hummer.components.canvas.serial";


@interface HMCanvasByGraphicInternelView ()

@property (nonatomic , strong) NSMutableArray<HMDrawCommand *> *drawCommands;
@property (nonatomic , assign) BOOL needSetDisplayOnView;
@property (nonatomic , strong) dispatch_queue_t serial_queue;

@end

@implementation HMCanvasByGraphicInternelView
@synthesize lineWidth = _lineWidth, lineColor , fillColor , lineCap , lineJoin , fontSize , textColor;


- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.fillColor = [UIColor whiteColor];
        self.lineColor = [UIColor blackColor];
        self.lineWidth = 1;
        self.lineJoin = kCGLineJoinRound;
        self.lineCap = kCGLineCapRound;
        self.fontSize = 10;
        self.drawCommands = [NSMutableArray array];
        self.backgroundColor = [UIColor whiteColor];
        self.needSetDisplayOnView = YES;
        _serial_queue = dispatch_queue_create(serialQueueKey, DISPATCH_QUEUE_SERIAL);
        dispatch_queue_set_specific(_serial_queue, serialQueueKey, &serialQueueKey, NULL);
    }
    return self;
}

- (void)asynExcuteDrawBlock:(void(^)(void))drawBlock needsDisplay:(BOOL)needsDisplay {
    if (drawBlock == nil) {
        return;
    }
    dispatch_async(_serial_queue, ^{
        drawBlock();
        if (needsDisplay && self.needSetDisplayOnView) {
            self.needSetDisplayOnView = NO;
            dispatch_async(dispatch_get_main_queue(), ^{
                [self setNeedsDisplay];
            });
        }
    });
}

- (void)safeSyncExcuteBlockAtSerialQueue:(void(^)(void))block {
    if (!block) {
        return;
    }
    if (dispatch_get_specific(serialQueueKey)) {
        block();
    }else {
        dispatch_sync(_serial_queue, block);
    }
}

- (void)drawRect:(CGRect)rect {

   CGContextRef context = UIGraphicsGetCurrentContext();

    [self safeSyncExcuteBlockAtSerialQueue:^{

        [self.drawCommands enumerateObjectsUsingBlock:^(HMDrawCommand * _Nonnull drawCommand, NSUInteger idx, BOOL * _Nonnull stop) {
            CGContextSaveGState(context);
                CGContextAddPath(context, drawCommand.path.CGPath);
                CGContextSetStrokeColorWithColor(context, drawCommand.paint.lineColor.CGColor);
                CGContextSetLineCap(context, drawCommand.paint.lineCap);
                CGContextSetLineJoin(context, drawCommand.paint.lineJoin);
                CGContextSetLineWidth(context, drawCommand.paint.lineWidth);
                CGContextSetFillColorWithColor(context, drawCommand.paint.fillColor.CGColor);
                CGContextBeginPath(context);
                switch (drawCommand.paint.paintType) {
                    case HMDrawPaintTypeStroke:
                        CGContextAddPath(context, drawCommand.path.CGPath);
                        CGContextStrokePath(context);
                        break;
                    case HMDrawPaintTypeFill:
                        CGContextAddPath(context, drawCommand.path.CGPath);
                        CGContextFillPath(context);
                        break;
                    case HMDrawPaintTypeText:
                        [drawCommand.text drawInRect:drawCommand.rect withAttributes:@{
                            NSFontAttributeName : [UIFont systemFontOfSize:drawCommand.paint.fontSize] ,
                            NSForegroundColorAttributeName : drawCommand.paint.textColor ?: [UIColor blackColor]}];
                        break;
                    case HMDrawPaintTypeImage:
                        [drawCommand.image drawInRect:drawCommand.rect];
                        break;
                    case HMDrawPaintTypeStrokeArc:
                        CGContextAddArcToPoint(context, drawCommand.paint.startPoint.x, drawCommand.paint.startPoint.y, drawCommand.paint.endPoint.x, drawCommand.paint.endPoint.y, drawCommand.paint.radius);
                        CGContextStrokePath(context);
                        break;
                    default:
                        break;
                }
            CGContextRestoreGState(context);
        }];
        self.needSetDisplayOnView = YES;
    }];
}

- (HMDrawCommand *)getCurrentCommand {
    HMDrawCommand *command = self.drawCommands.lastObject;
    if (command == nil) {
        command = [self generalNewCommand];
    }
    return command;
}


- (HMDrawCommand *)generalNewCommand {
    HMDrawCommand *command = [[HMDrawCommand alloc] init];
    command.paint.fillColor =  self.fillColor ;
    command.paint.lineColor = self.lineColor;
    command.paint.lineWidth = self.lineWidth ;
    command.paint.lineJoin = self.lineJoin ;
    command.paint.lineCap = self.lineCap;
    command.paint.fontSize = self.fontSize;
    command.paint.textColor = self.textColor;
    [self.drawCommands addObject:command];
    return command;
}


#pragma mark - interface impl

- (void)moveToPoint:(CGPoint)point {
    [self asynExcuteDrawBlock:^{
        [[self getCurrentCommand].path moveToPoint:point];
    } needsDisplay:NO];
}

- (void)addLineTo:(CGPoint)p {
    [self asynExcuteDrawBlock:^{
        
        HMDrawCommand *command = [self getCurrentCommand];
        if (command.paint.paintType != HMDrawPaintTypeStroke ||
            command.paint.lineColor != self.lineColor ||
            command.paint.lineWidth != self.lineWidth) {
            CGPoint currentPoint = command.path.currentPoint;
            
            command = [self generalNewCommand];
            [command.path moveToPoint:currentPoint];
            [command.path addLineToPoint:p];
        }else {
            [command.path addLineToPoint:p];
        }

    } needsDisplay:YES];
}

- (void)drawImage:(UIImage *)image atRect:(CGRect)rect {
    [self asynExcuteDrawBlock:^{
        HMDrawCommand *command = [self generalNewCommand];
        command.paint.paintType = HMDrawPaintTypeImage;
        command.image = image;
        command.rect = rect;
    } needsDisplay:YES];
}

- (void)drawText:(NSString *)text atPoint:(CGPoint)point maxWidth:(CGFloat)maxWidth {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeText;
            command.text = text;
            command.rect = CGRectMake(point.x, point.y, maxWidth, CGFLOAT_MAX);
    } needsDisplay:YES];
}


- (void)fillRect:(CGRect)rect {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeFill;
            command.path = [UIBezierPath bezierPathWithRect:rect];
    } needsDisplay:YES];
}

- (void)strokeRect:(CGRect)rect {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeStroke;
            command.path = [UIBezierPath bezierPathWithRect:rect];
    } needsDisplay:YES];
}

- (void)strokeCircleAtPoint:(CGPoint)point radius:(CGFloat)radius {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeStroke;
            command.path = [UIBezierPath bezierPathWithArcCenter:point radius:radius startAngle:0 endAngle:M_PI * 2 clockwise:1];
    } needsDisplay:YES];
}

- (void)fillCircleAtPoint:(CGPoint)point radius:(CGFloat)radius {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeFill;
            command.path = [UIBezierPath bezierPathWithArcCenter:point radius:radius startAngle:0 endAngle:M_PI * 2 clockwise:1];
    } needsDisplay:YES];
}

- (void)drawArcAtPoint:(CGPoint)point radius:(CGFloat)radius startAngle:(CGFloat)startAngle endAngle:(CGFloat)endAngle clockwise:(BOOL)clockwise {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeStroke;
            command.path = [UIBezierPath bezierPathWithArcCenter:point radius:radius startAngle:startAngle endAngle:endAngle clockwise:clockwise];
    } needsDisplay:YES];
}

- (void)drawArcFromPoint:(CGPoint)fromPoint toPoint:(CGPoint)toPoint radius:(CGFloat)radius clockwise:(BOOL)clockwise {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeStrokeArc;
            command.paint.startPoint = fromPoint;
            command.paint.endPoint = toPoint;
            command.paint.radius = radius;
    } needsDisplay:YES];
}

- (void)drawEllipseAtRect:(CGRect)rect {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeStroke;
            command.path = [UIBezierPath bezierPathWithOvalInRect:rect];
    } needsDisplay:YES];
}

- (void)fillEllipseAtRect:(CGRect)rect {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeFill;
            command.path = [UIBezierPath bezierPathWithOvalInRect:rect];
    } needsDisplay:YES];
}


- (void)drawPath:(UIBezierPath *)path {
    [self asynExcuteDrawBlock:^{
            HMDrawCommand *command = [self generalNewCommand];
            command.paint.paintType = HMDrawPaintTypeStroke;
            command.path  = path;
    } needsDisplay:YES];
}

@end
