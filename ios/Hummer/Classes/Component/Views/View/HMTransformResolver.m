//
//  HMTransformResolver.m
//  Hummer
//
//  Created by didi on 2020/12/10.
//

#import "HMTransformResolver.h"
#import "HMTransitionAnimationConverter.h"
#import "HMAnimationConverter.h"

@implementation HMTransformResolver

+ (CATransform3D)resolverTransformValue:(id)value view:(UIView *)view
{
    __block CATransform3D originT3d = view.layer.transform;
    NSDictionary <NSString *, NSObject *> *transformValues = [HMTransitionAnimationConverter convertStyleToAnimations:@{@"transform": value}];
    [transformValues enumerateKeysAndObjectsUsingBlock:^(NSString * _Nonnull key, NSObject * _Nonnull obj, BOOL * _Nonnull stop) {
        id transformFuncValue = [HMAnimationConverter convertAnimationValue:obj keyPath:key];
        CATransform3D t3d = [self convertFuncValueTo3DwithValue:transformFuncValue key:key];
        originT3d = CATransform3DConcat(originT3d, t3d);
    }];
    return originT3d;
}

+ (CATransform3D)convertFuncValueTo3DwithValue:(id)value key:(NSString *)key
{
    CATransform3D t3d = CATransform3DIdentity;
    if ([key isEqualToString:@"position"]) {
        CGPoint point = [((NSValue *)value) CGPointValue];
        t3d = CATransform3DMakeTranslation(point.x, point.y,0);
    } else if([key hasPrefix:@"scale"]){
        CGFloat x = 1;
        CGFloat y = 1;
        CGFloat v = [((NSNumber *)value) floatValue];
        if ([key isEqualToString:@"scaleX"]) {
            x = v;
        }else if ([key isEqualToString:@"scaleY"]){
            y = v;
        }else{
            x = v;
            y = v;
        }
        t3d = CATransform3DMakeScale(x, y,1);
    } else if([key hasPrefix:@"rotation"]){
        CGFloat v = [((NSNumber *)value) floatValue];
        if ([key hasSuffix:@"X"]) {
            t3d = CATransform3DMakeRotation(v, 1, 0, 0);
        } else if ([key hasSuffix:@"Y"]) {
            t3d = CATransform3DMakeRotation(v, 0, 1, 0);
        } else if ([key hasSuffix:@"Z"]) {
            t3d = CATransform3DMakeRotation(v, 0, 0, 1);
        }
    } else if([key isEqualToString:@"skew"]){
        t3d = ((NSValue *)value).CATransform3DValue;
    }

    return t3d;
}

@end
