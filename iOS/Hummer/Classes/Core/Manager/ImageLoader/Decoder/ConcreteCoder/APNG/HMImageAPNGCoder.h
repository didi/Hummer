//
//  HMImageAPNGCoder.h
//  Expecta
//
//  Created by didi on 2021/9/6.
//

#import <Foundation/Foundation.h>
#import "HMImageIOAnimatedCoder.h"

NS_ASSUME_NONNULL_BEGIN

/**
 Built in coder using ImageIO that supports APNG encoding/decoding
 */
@interface HMImageAPNGCoder : HMImageIOAnimatedCoder <HMAnimatedImageCoder>

@end

NS_ASSUME_NONNULL_END
