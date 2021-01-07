//
//  HMLayoutUtils.m
//  Hummer
//
//  Created by didi on 2020/10/26.
//

#import "HMLayoutUtils.h"
#import "HMConfig.h"
#import "UIView+HMRenderObject.h"

@implementation HMLayoutUtils


+ (NSDictionary *)rectForView:(UIView *)view
{
    if (!view) {
        return @{
            @"width": @0,
            @"height": @0,
            @"left": @0,
            @"right": @0,
            @"top": @0,
            @"bottom": @0,
        };
    }
    CGPoint origin = view.frame.origin;
    
    CGSize size = [view hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
    
    return @{
        @"width": @(size.width),
        @"height": @(size.height),
        @"left": @(origin.x),
        @"right": @(origin.x + size.width),
        @"top": @(origin.y),
        @"bottom": @(origin.y + size.height)
    };
}

@end
