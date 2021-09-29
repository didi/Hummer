//
//  HMGIFImageDecoder.m
//  Hummer
//
//  Created by didi on 2020/11/25.
//

#import "HMGIFImageDecoder.h"
#import "HMAnimatedImage.h"
#import <MobileCoreServices/MobileCoreServices.h>

@implementation HMGIFImageDecoder

#pragma mark - Subclass Override

+ (HMImageFormat)imageFormat {
    return HMImageFormatGIF;
}

+ (NSString *)imageUTType {
    return (__bridge NSString *)kUTTypeGIF;
}

+ (NSString *)dictionaryProperty {
    return (__bridge NSString *)kCGImagePropertyGIFDictionary;
}

+ (NSString *)unclampedDelayTimeProperty {
    return (__bridge NSString *)kCGImagePropertyGIFUnclampedDelayTime;
}

+ (NSString *)delayTimeProperty {
    return (__bridge NSString *)kCGImagePropertyGIFDelayTime;
}

+ (NSString *)loopCountProperty {
    return (__bridge NSString *)kCGImagePropertyGIFLoopCount;
}

+ (NSUInteger)defaultLoopCount {
    return 1;
}

@end
