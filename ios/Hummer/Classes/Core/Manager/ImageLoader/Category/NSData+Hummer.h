//
//  NSData+Hummer.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
typedef NSInteger HMImageFormat NS_TYPED_EXTENSIBLE_ENUM;
static const HMImageFormat HMImageFormatUndefined = -1;
static const HMImageFormat HMImageFormatJPEG      = 0;
static const HMImageFormat HMImageFormatPNG       = 1;
static const HMImageFormat HMImageFormatGIF       = 2;
static const HMImageFormat HMImageFormatTIFF      = 3;
static const HMImageFormat HMImageFormatWebP      = 4;
static const HMImageFormat HMImageFormatHEIC      = 5;
static const HMImageFormat HMImageFormatHEIF      = 6;
static const HMImageFormat HMImageFormatPDF       = 7;
static const HMImageFormat HMImageFormatSVG       = 8;
@interface NSData (Hummer)

+ (HMImageFormat)hm_imageFormatForImageData:(nullable NSData *)data;

@end

NS_ASSUME_NONNULL_END
