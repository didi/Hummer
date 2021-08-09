//
//  HMCanvasDrawCommand.m
//  Hummer
//
//  Created by litianhao on 2021/8/2.
//

#import "HMCanvasDrawCommand.h"

@implementation HMDrawPaint

- (instancetype)init {
    if (self = [super init]) {
        self.paintType = HMDrawPaintTypeStroke;
    }
    return self;
}

@end

@implementation HMDrawCommand

- (UIBezierPath *)path {
    if (!_path) {
        _path = [UIBezierPath bezierPath];
    }
    return _path;
}

- (HMDrawPaint *)paint {
    if (!_paint) {
        _paint = [[HMDrawPaint alloc] init];
    }
    return _paint;
}


@end
