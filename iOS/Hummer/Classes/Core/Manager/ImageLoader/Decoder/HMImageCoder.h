//
//  HMImageDecoder.h
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <UIKit/UIKit.h>
#import "HMImageLoaderDefine.h"
#import "UIImage+HMMetadata.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, HMResizeMode) {
  HMResizeModeCover = UIViewContentModeScaleAspectFill,
  HMResizeModeContain = UIViewContentModeScaleAspectFit,
  HMResizeModeStretch = UIViewContentModeScaleToFill,
  HMResizeModeCenter = UIViewContentModeCenter,
  HMResizeModeRepeat = -1, // Use negative values to avoid conflicts with iOS enum values.
};


typedef NSString * HMImageCoderOption NS_STRING_ENUM;
typedef NSDictionary<HMImageCoderOption, id> HMImageCoderOptions;
typedef NSMutableDictionary<HMImageCoderOption, id> HMImageCoderMutableOptions;


FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderDecodeFirstFrameOnly;

/**
 A CGFloat value which is greater than or equal to 1.0. This value specify the image scale factor for decoding. If not provide, use 1.0. (NSNumber)
 @note works for `HMImageCoder`, `HMProgressiveImageCoder`, `HMAnimatedImageCoder`.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderDecodeScaleFactor;

/**
 A Boolean value indicating whether to keep the original aspect ratio when generating thumbnail images (or bitmap images from vector format).
 Defaults to YES.
 @note works for `HMImageCoder`, `HMProgressiveImageCoder`, `HMAnimatedImageCoder`.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderDecodePreserveAspectRatio;

/**
 A CGSize value indicating whether or not to generate the thumbnail images (or bitmap images from vector format). When this value is provided, the decoder will generate a thumbnail image which pixel size is smaller than or equal to (depends the `.preserveAspectRatio`) the value size.
 Defaults to CGSizeZero, which means no thumbnail generation at all.
 @note Supports for animated image as well.
 @note When you pass `.preserveAspectRatio == NO`, the thumbnail image is stretched to match each dimension. When `.preserveAspectRatio == YES`, the thumbnail image's width is limited to pixel size's width, the thumbnail image's height is limited to pixel size's height. For common cases, you can just pass a square size to limit both.
 @note works for `HMImageCoder`, `HMProgressiveImageCoder`, `HMAnimatedImageCoder`.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderDecodeThumbnailPixelSize;


// These options are for image encoding
/**
 A Boolean value indicating whether to encode the first frame only for animated image during encoding. (NSNumber). If not provide, encode animated image if need.
 @note works for `HMImageCoder`.
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeFirstFrameOnly;
/**
 A double value between 0.0-1.0 indicating the encode compression quality to produce the image data. 1.0 resulting in no compression and 0.0 resulting in the maximum compression possible. If not provide, use 1.0. (NSNumber)
 @note works for `HMImageCoder`
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeCompressionQuality;

/**
 A UIColor(NSColor) value to used for non-alpha image encoding when the input image has alpha channel, the background color will be used to compose the alpha one. If not provide, use white color.
 @note works for `HMImageCoder`
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeBackgroundColor;

/**
 A CGSize value indicating the max image resolution in pixels during encoding. For vector image, this also effect the output vector data information about width and height. The encoder will not generate the encoded image larger than this limit. Note it always use the aspect ratio of input image..
 Defaults to CGSizeZero, which means no max size limit at all.
 @note Supports for animated image as well.
 @note The output image's width is limited to pixel size's width, the output image's height is limited to pixel size's height. For common cases, you can just pass a square size to limit both.
 @note works for `HMImageCoder`
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeMaxPixelSize;

/**
 A NSUInteger value specify the max output data bytes size after encoding. Some lossy format like JPEG/HEIF supports the hint for codec to automatically reduce the quality and match the file size you want. Note this option will override the `HMImageCoderEncodeCompressionQuality`, because now the quality is decided by the encoder. (NSNumber)
 @note This is a hint, no guarantee for output size because of compression algorithm limit. And this options does not works for vector images.
 @note works for `HMImageCoder`
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeMaxFileSize;

/**
 A Boolean value indicating the encoding format should contains a thumbnail image into the output data. Only some of image format (like JPEG/HEIF/AVIF) support this behavior. The embed thumbnail will be used during next time thumbnail decoding (provided `.thumbnailPixelSize`), which is faster than full image thumbnail decoding. (NSNumber)
 Defaults to NO, which does not embed any thumbnail.
 @note The thumbnail image's pixel size is not defined, the encoder can choose the proper pixel size which is suitable for encoding quality.
 @note works for `HMImageCoder`
 */
FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderEncodeEmbedThumbnail;

FOUNDATION_EXPORT HMImageCoderOption _Nonnull const HMImageCoderWebImageContext;


#define HM_IMG_DECODE_ERROR [NSError errorWithDomain:HMWebImageErrorDomain code:HMWebImageErrorBadImageData userInfo:@{NSLocalizedDescriptionKey : @"decode image fail"}]


typedef  HMImageLoaderContext HMImageDecoderContext;






@protocol HMImageCoder <NSObject>

@required
#pragma mark - Decoding

- (BOOL)canDecodeFromData:(nullable NSData *)data;
- (nullable UIImage *)decodedImageWithData:(nullable NSData *)data
                                   options:(nullable HMImageCoderOptions *)options;

#pragma mark - Encoding

- (BOOL)canEncodeToFormat:(HMImageFormat)format;
- (nullable NSData *)encodedDataWithImage:(nullable UIImage *)image
                                   format:(HMImageFormat)format
                                  options:(nullable HMImageCoderOptions *)options;

@end


@protocol HMAnimatedImageProvider <NSObject>

@required
/**
The original animated image data for current image. If current image is not an animated format, return nil.
We may use this method to grab back the original image data if need, such as NSCoding or compare.

@return The animated image data
*/
@property (nonatomic, copy, readonly, nullable) NSData *animatedImageData;

/**
Total animated frame count.
If the frame count is less than 1, then the methods below will be ignored.

@return Total animated frame count.
*/
@property (nonatomic, assign, readonly) NSUInteger animatedImageFrameCount;
/**
Animation loop count, 0 means infinite looping.

@return Animation loop count
*/
@property (nonatomic, assign, readonly) NSUInteger animatedImageLoopCount;
/**
Returns the frame image from a specified index.
@note The index maybe randomly if one image was set to different imageViews, keep it re-entrant. (It's not recommend to store the images into array because it's memory consuming)

@param index Frame index (zero based).
@return Frame's image
*/
- (nullable UIImage *)animatedImageFrameAtIndex:(NSUInteger)index;
/**
Returns the frames's duration from a specified index.
@note The index maybe randomly if one image was set to different imageViews, keep it re-entrant. (It's recommend to store the durations into array because it's not memory-consuming)

@param index Frame index (zero based).
@return Frame's duration
*/
- (NSTimeInterval)animatedImageDurationAtIndex:(NSUInteger)index;
@end

#pragma mark - Animated Coder

@protocol HMAnimatedImageCoder <HMImageCoder, HMAnimatedImageProvider>

@required
/**
 Because animated image coder should keep the original data, we will alloc a new instance with the same class for the specify animated image data
 The init method should return nil if it can't decode the specify animated image data to produce any frame.
 After the instance created, we may call methods in `HMAnimatedImageProvider` to produce animated image frame.

 @param data The animated image data to be decode
 @param options A dictionary containing any animated decoding options (instance-level). Pass @{HMImageCoderDecodeScaleFactor: @(1.0)} to specify scale factor for animated image (each frames should use the same scale).
 @return A new instance to do animated decoding for specify image data
 */
- (nullable instancetype)initWithAnimatedImageData:(nullable NSData *)data options:(nullable HMImageCoderOptions *)options;

@end
NS_ASSUME_NONNULL_END
