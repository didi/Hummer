//
//  HMAnimatedImage+Hummer.h
//  Hummer
//
//  Created by didi on 2020/12/3.
//

#import "HMAnimatedImage.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMAnimatedImage (Hummer)

- (NSTimeInterval)hm_animatedDuration;
- (NSArray<UIImage *> *)hm_animatedImages;
@end

NS_ASSUME_NONNULL_END
