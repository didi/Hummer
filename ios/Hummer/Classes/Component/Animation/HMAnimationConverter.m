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
    } else {
        if ([value isKindOfClass:[NSNumber class]]) {
            convertVaule = value;
        } else if ([value isKindOfClass:[NSString class]]) {
            convertVaule = @([value floatValue]);
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
