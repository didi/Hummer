//
//  HMImageCoder.h
//  Hummer
//
//  Created by didi on 2021/8/31.
//

#import <Foundation/Foundation.h>
#import "NSData+Hummer.h"
#import "HMImageLoaderDefine.h"
#import "HMImageCoder.h"

NS_ASSUME_NONNULL_BEGIN
/**
 * HMImageIOAnimatedCoder 基于<ImageIO> 实现图片解码，支持格式：
 * public.jpeg,
 * public.png,
 * com.compuserve.gif,
 * public.tiff,
 * public.jpeg-2000,
 * com.apple.atx,
 * org.khronos.ktx,
 * org.khronos.astc,
 * com.microsoft.dds,
 * public.heic,
 * public.heics,
 * com.microsoft.ico,
 * com.microsoft.bmp,
 * com.apple.icns,
 * com.adobe.photoshop-image,
 * com.adobe.pdf,
 * com.truevision.tga-image,
 * com.ilm.openexr-image,
 * public.pbm,
 * public.pvr
 * 其中 AVFileTypeHEIC/AVFileTypeHEIF 定义在 AVFoundation 中，iOS11之后
 * public.heic
 * public.heif
 * org.webmproject.webp //苹果硬编码，iOS 14之后支持
 
 * 目前 Hummer 只处理 kUTTypeJPEG，kUTTypePNG，kUTTypeGIF，kUTTypeTIFF，kUTTypePDF，kUTTypeScalableVectorGraphics(SVG)，webp
 *
 * 
 *
 */
FOUNDATION_EXPORT UIImage * _Nullable HMImageLoaderDecodeImageData(NSData * _Nonnull imageData, NSURL * _Nonnull imageURL, HMImageDecoderContext * _Nullable context);

@interface HMImageCoderManager : NSObject<HMImageCoder>

@property (nonatomic, strong) NSMutableArray <id<HMImageCoder>> *coders;

+ (HMImageCoderManager *)sharedManager;

@end

NS_ASSUME_NONNULL_END
