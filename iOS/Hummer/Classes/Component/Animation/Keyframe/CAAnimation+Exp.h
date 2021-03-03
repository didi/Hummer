//
//  CAAnimation+Exp.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <QuartzCore/QuartzCore.h>

@interface CAAnimation (Base)

@property (nonatomic, copy, nullable) void(^onEnding)(CAAnimation *anim, BOOL flag);

@end
