//
//  HMCanvasDrawCommand.h
//  Hummer
//
//  Created by litianhao on 2021/8/2.
//

#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger , HMDrawPaintType ) {
    HMDrawPaintTypeStroke,
    HMDrawPaintTypeFill,
    HMDrawPaintTypeText,
    HMDrawPaintTypeImage
} ;

@interface HMDrawPaint : NSObject

@property (nonatomic , assign) CGFloat lineWidth ;

@property (nonatomic , strong) UIColor *lineColor ;

@property (nonatomic , strong) UIColor *fillColor ;

@property (nonatomic , assign) CGLineCap lineCap ;

@property (nonatomic , assign) CGLineJoin lineJoin ;

@property (nonatomic , assign) CGFloat fontSize ;

@property (nonatomic , strong) UIColor *textColor;

@property (nonatomic , assign) HMDrawPaintType paintType;

@end


@interface HMDrawCommand : NSObject

@property (nonatomic , strong) UIBezierPath *path ;

@property (nonatomic , copy  ) NSString *text;

@property (nonatomic , strong) UIImage *image;

@property (nonatomic , assign) CGRect rect;

@property (nonatomic , strong) HMDrawPaint *paint;

@end
