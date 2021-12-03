//
//  NSData+Hummer.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>
#import "HMImageCoderDefine.h"
NS_ASSUME_NONNULL_BEGIN

@interface NSData (Hummer)

+ (HMImageFormat)hm_imageFormatForImageData:(nullable NSData *)data;
+ (nonnull CFStringRef)hm_UTTypeFromImageFormat:(HMImageFormat)format;
+ (HMImageFormat)hm_imageFormatFromUTType:(CFStringRef)uttype;
@end

NS_ASSUME_NONNULL_END
