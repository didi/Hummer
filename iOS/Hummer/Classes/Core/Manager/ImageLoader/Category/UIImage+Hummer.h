//
//  UIImage+Hummer.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <UIKit/UIKit.h>
#import "HMImageDecoder.h"
NS_ASSUME_NONNULL_BEGIN

@interface UIImage (Hummer)

+ (UIImage *)hm_decodeImageWithData:(NSData *)data size:(CGSize)destSize scale:(CGFloat)destScale resizeMode:(HMResizeMode)resizeMode;
@end

NS_ASSUME_NONNULL_END
