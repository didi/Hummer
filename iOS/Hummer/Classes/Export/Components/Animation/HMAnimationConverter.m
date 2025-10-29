//
//  HMAnimationConverter.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMAnimationConverter.h"
#import "HMConverter.h"
#import "HMUtility.h"

@implementation HMAnimationConverter

+ (NSDictionary *)hmKeyPathMap {
    return @{
             @"position":@"position",
             @"scale":@"transform.scale",
             @"scaleX":@"transform.scale.x",
             @"scaleY":@"transform.scale.y",
             @"rotationX":@"transform.rotation.x",
             @"rotationY":@"transform.rotation.y",
             @"rotationZ":@"transform.rotation.z",
             @"opacity":@"opacity",
             @"backgroundColor":@"backgroundColor",
             @"cornerRadius":@"cornerRadius",
             @"width":@"bounds.size.width",
             @"height":@"bounds.size.height",
             };
}

+ (NSString *)convertAnimationKeyPath:(NSString *)value {
    return [[HMAnimationConverter hmKeyPathMap] valueForKey:value];
}

+ (id)convertAnimationValue:(id)value keyPath:(NSString *)keyPath {
    id convertVaule = nil;
    if ([keyPath isEqualToString:@"backgroundColor"]) {
        if ([value isKindOfClass:[NSString class]]) {
            convertVaule = (id)[HMConverter HMStringToColor:value].CGColor;
        }
    } else if ([keyPath isEqualToString:@"skew"]) {
        if ([value isKindOfClass:[NSDictionary class]]
            && ((NSDictionary *)value).allKeys.count == 2
            && [((NSDictionary *)value).allKeys containsObject:@"x"]
            && [((NSDictionary *)value).allKeys containsObject:@"y"]
            ) {
            CATransform3D skewTransform = [self calculateSkewTransformWithValue:value];
            convertVaule = [NSValue valueWithCATransform3D:skewTransform];
        }
    } else {
        if ([value isKindOfClass:[NSNumber class]]) {
            convertVaule = value;
        } else if ([value isKindOfClass:[NSString class]]) {
            convertVaule = @(HMPointWithString(value));
        } else if ([value isKindOfClass:[NSDictionary class]] &&
                   [self isValuePoint:value]) {
            CGPoint point = [HMConverter HMDicToCGPoint:value];
            convertVaule = [NSValue valueWithCGPoint:point];
        }
        if ([keyPath hasPrefix:@"rotation"]) {
            convertVaule = @([convertVaule floatValue] * M_PI / 180);
        }
    }
    return convertVaule;
}

+ (CATransform3D)calculateSkewTransformWithValue:(NSDictionary *)value
{
    NSNumber *x = value[@"x"];
    NSNumber *y = value[@"y"];
    double a = tan((x.floatValue) / 180.0 * M_PI);
    double b = tan((y.floatValue) / 180.0 * M_PI);
    
    return CATransform3DMakeAffineTransform(CGAffineTransformMake(1, a, b, 1, 0, 0));

}

+ (BOOL)isValuePoint:(NSDictionary *)value {
    return value.allKeys.count == 2 &&
           [value.allKeys containsObject:@"x"] &&
           [value.allKeys containsObject:@"y"];
}


+ (CAMediaTimingFunction *)convertMediaTimingFunction:(NSString *)timingFunctionName {
    if (!timingFunctionName || timingFunctionName.length == 0) {
        return nil;
    }
    CAMediaTimingFunctionName functionName = kCAMediaTimingFunctionDefault;
    if ([timingFunctionName isEqualToString:@"linear"]) {
        functionName = kCAMediaTimingFunctionLinear;
    } else if ([timingFunctionName isEqualToString:@"ease-in"]) {
        functionName = kCAMediaTimingFunctionEaseIn;
    } else if ([timingFunctionName isEqualToString:@"ease-out"]) {
        functionName = kCAMediaTimingFunctionEaseOut;
    } else if ([timingFunctionName isEqualToString:@"ease-in-out"]) {
        functionName = kCAMediaTimingFunctionEaseInEaseOut;
    }
    return [CAMediaTimingFunction functionWithName:functionName];
}

@end
