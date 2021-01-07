//
//  HMImageDecoder.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <UIKit/UIKit.h>
#import "HMImageLoaderDefine.h"
NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, HMResizeMode) {
  HMResizeModeCover = UIViewContentModeScaleAspectFill,
  HMResizeModeContain = UIViewContentModeScaleAspectFit,
  HMResizeModeStretch = UIViewContentModeScaleToFill,
  HMResizeModeCenter = UIViewContentModeCenter,
  HMResizeModeRepeat = -1, // Use negative values to avoid conflicts with iOS enum values.
};
typedef void(^HMImageDecoderCompletionBlock)(UIImage *_Nullable image, NSError * _Nullable error);
typedef  HMImageLoaderContext HMImageDecoderContext;
@protocol HMImageDecoder <NSObject>


- (BOOL)canDecodeImageData:(NSData *)imageData;
- (void)decodeImageData:(NSData *)imageData
                context:(nullable HMImageDecoderContext *)context
             completion:(HMImageDecoderCompletionBlock)completionBlock;

@end

@interface HMImageDecoder : NSObject<HMImageDecoder>


@end


NS_ASSUME_NONNULL_END
