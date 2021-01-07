//
//  HMTransformResolver.h
//  Hummer
//
//  Created by didi on 2020/12/10.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMTransformResolver : NSObject

+ (CATransform3D)resolverTransformValue:(id)value view:(UIView *)view;

@end

NS_ASSUME_NONNULL_END
