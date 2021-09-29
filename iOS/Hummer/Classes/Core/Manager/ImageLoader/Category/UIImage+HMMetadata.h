//
//  UIImage+HMMetadata.h
//  Hummer
//
//  Created by didi on 2021/9/1.
//

#import <UIKit/UIKit.h>
#import "HMImageCoderDefine.h"

NS_ASSUME_NONNULL_BEGIN

@interface UIImage (HMMetadata)

@property (nonatomic, assign) HMImageFormat hm_imageFormat;

@property (nonatomic, assign) NSUInteger hm_imageLoopCount;

@property (nonatomic, assign, readonly) BOOL hm_isAnimated;
@end

NS_ASSUME_NONNULL_END
