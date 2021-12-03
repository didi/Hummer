//
//  UIImage+Hummer.m
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import "UIImage+Hummer.h"
#import "NSData+Hummer.h"
#import <objc/runtime.h>

@implementation UIImage (Hummer)
static CGFloat HMCeilValue(CGFloat value, CGFloat scale)
{
  return ceil(value * scale) / scale;
}

static CGFloat HMFloorValue(CGFloat value, CGFloat scale)
{
  return floor(value * scale) / scale;
}
static CGSize HMCeilSize(CGSize size, CGFloat scale)
{
  return (CGSize){
    HMCeilValue(size.width, scale),
    HMCeilValue(size.height, scale)
  };
}

CGRect HMTargetRect(CGSize sourceSize, CGSize destSize,
                     CGFloat destScale, HMResizeMode resizeMode)
{
  if (CGSizeEqualToSize(destSize, CGSizeZero)) {
    // Assume we require the largest size available
    return (CGRect){CGPointZero, sourceSize};
  }

  CGFloat aspect = sourceSize.width / sourceSize.height;
  // If only one dimension in destSize is non-zero (for example, an Image
  // with `flex: 1` whose height is indeterminate), calculate the unknown
  // dimension based on the aspect ratio of sourceSize
  if (destSize.width == 0) {
    destSize.width = destSize.height * aspect;
  }
  if (destSize.height == 0) {
    destSize.height = destSize.width / aspect;
  }

  // Calculate target aspect ratio if needed
  CGFloat targetAspect = 0.0;
  if (resizeMode != HMResizeModeCenter &&
      resizeMode != HMResizeModeStretch) {
    targetAspect = destSize.width / destSize.height;
    if (aspect == targetAspect) {
      resizeMode = HMResizeModeStretch;
    }
  }

  switch (resizeMode) {
    case HMResizeModeStretch:
    case HMResizeModeRepeat:

      return (CGRect){CGPointZero, HMCeilSize(destSize, destScale)};

    case HMResizeModeContain:

      if (targetAspect <= aspect) { // target is taller than content

        sourceSize.width = destSize.width;
        sourceSize.height = sourceSize.width / aspect;

      } else { // target is wider than content

        sourceSize.height = destSize.height;
        sourceSize.width = sourceSize.height * aspect;
      }
      return (CGRect){
        {
          HMFloorValue((destSize.width - sourceSize.width) / 2, destScale),
          HMFloorValue((destSize.height - sourceSize.height) / 2, destScale),
        },
        HMCeilSize(sourceSize, destScale)
      };

    case HMResizeModeCover:

      if (targetAspect <= aspect) { // target is taller than content

        sourceSize.height = destSize.height;
        sourceSize.width = sourceSize.height * aspect;
        destSize.width = destSize.height * targetAspect;
        return (CGRect){
          {HMFloorValue((destSize.width - sourceSize.width) / 2, destScale), 0},
          HMCeilSize(sourceSize, destScale)
        };

      } else { // target is wider than content

        sourceSize.width = destSize.width;
        sourceSize.height = sourceSize.width / aspect;
        destSize.height = destSize.width / targetAspect;
        return (CGRect){
          {0, HMFloorValue((destSize.height - sourceSize.height) / 2, destScale)},
          HMCeilSize(sourceSize, destScale)
        };
      }

    case HMResizeModeCenter:

      // Make sure the image is not clipped by the target.
      if (sourceSize.height > destSize.height) {
        sourceSize.width = destSize.width;
        sourceSize.height = sourceSize.width / aspect;
      }
      if (sourceSize.width > destSize.width) {
        sourceSize.height = destSize.height;
        sourceSize.width = sourceSize.height * aspect;
      }

      return (CGRect){
        {
          HMFloorValue((destSize.width - sourceSize.width) / 2, destScale),
          HMFloorValue((destSize.height - sourceSize.height) / 2, destScale),
        },
        HMCeilSize(sourceSize, destScale)
      };
  }
}

CGSize HMSizeInPixels(CGSize pointSize, CGFloat scale)
{
  return (CGSize){
      ceil(pointSize.width * scale),
      ceil(pointSize.height * scale),
  };
}

CGSize HMTargetSize(CGSize sourceSize, CGFloat sourceScale,
                     CGSize destSize, CGFloat destScale,
                     HMResizeMode resizeMode,
                     BOOL allowUpscaling)
{
  switch (resizeMode) {
    case HMResizeModeCenter:

      return HMTargetRect(sourceSize, destSize, destScale, resizeMode).size;

    case HMResizeModeStretch:

      if (!allowUpscaling) {
        CGFloat scale = sourceScale / destScale;
        destSize.width = MIN(sourceSize.width * scale, destSize.width);
        destSize.height = MIN(sourceSize.height * scale, destSize.height);
      }
      return HMCeilSize(destSize, destScale);

    default: {

      // Get target size
      CGSize size = HMTargetRect(sourceSize, destSize, destScale, resizeMode).size;
      if (!allowUpscaling) {
        // return sourceSize if target size is larger
        if (sourceSize.width * sourceScale < size.width * destScale) {
          return sourceSize;
        }
      }
      return size;
    }
  }
}

+ (UIImage *)hm_decodeImageWithData:(NSData *)data size:(CGSize)destSize scale:(CGFloat)destScale resizeMode:(HMResizeMode)resizeMode {
    CGImageSourceRef sourceRef = CGImageSourceCreateWithData((__bridge CFDataRef)data, NULL);
    if (!sourceRef) {
      return nil;
    }

    // Get original image size
    CFDictionaryRef imageProperties = CGImageSourceCopyPropertiesAtIndex(sourceRef, 0, NULL);
    if (!imageProperties) {
      CFRelease(sourceRef);
      return nil;
    }
    NSNumber *width = CFDictionaryGetValue(imageProperties, kCGImagePropertyPixelWidth);
    NSNumber *height = CFDictionaryGetValue(imageProperties, kCGImagePropertyPixelHeight);
    CGSize sourceSize = {width.doubleValue, height.doubleValue};
    CFRelease(imageProperties);

    if (CGSizeEqualToSize(destSize, CGSizeZero)) {
      destSize = sourceSize;
    }
    if (!destScale) {
      destScale = (float) UIScreen.mainScreen.scale;
    }

    if (resizeMode == UIViewContentModeScaleToFill) {
      // Decoder cannot change aspect ratio, so HMResizeModeStretch is equivalent
      // to HMResizeModeCover for our purposes
      resizeMode = HMResizeModeCover;
    }

    // Calculate target size
    CGSize targetSize = HMTargetSize(sourceSize, 1, destSize, destScale, resizeMode, NO);
    CGSize targetPixelSize = HMSizeInPixels(targetSize, destScale);
    CGFloat maxPixelSize = fmax(fmin(sourceSize.width, targetPixelSize.width),
                                fmin(sourceSize.height, targetPixelSize.height));

    NSDictionary<NSString *, NSNumber *> *options = @{
      (id)kCGImageSourceShouldAllowFloat: @YES,
      (id)kCGImageSourceCreateThumbnailWithTransform: @YES,
      (id)kCGImageSourceCreateThumbnailFromImageAlways: @YES,
      (id)kCGImageSourceThumbnailMaxPixelSize: @(maxPixelSize),
    };

    // Get thumbnail
    CGImageRef imageRef = CGImageSourceCreateThumbnailAtIndex(sourceRef, 0, (__bridge CFDictionaryRef)options);
    CFRelease(sourceRef);
    if (!imageRef) {
      return nil;
    }

    // Return image
    UIImage *image = [UIImage imageWithCGImage:imageRef
                                         scale:destScale
                                   orientation:UIImageOrientationUp];
    CGImageRelease(imageRef);
    return image;
}





@end
