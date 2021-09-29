//
//  HMImageAPNGCoder.m
//  Expecta
//
//  Created by didi on 2021/9/6.
//

#import "HMImageAPNGCoder.h"
#import <MobileCoreServices/MobileCoreServices.h>

@implementation HMImageAPNGCoder

#pragma mark - Subclass Override

+ (HMImageFormat)imageFormat {
    return HMImageFormatPNG;
}

+ (NSString *)imageUTType {
    return (__bridge NSString *)kUTTypePNG;
}

+ (NSString *)dictionaryProperty {
    return (__bridge NSString *)kCGImagePropertyPNGDictionary;
}

+ (NSString *)unclampedDelayTimeProperty {
    return (__bridge NSString *)kCGImagePropertyAPNGUnclampedDelayTime;
}

+ (NSString *)delayTimeProperty {
    return (__bridge NSString *)kCGImagePropertyAPNGDelayTime;
}

+ (NSString *)loopCountProperty {
    return (__bridge NSString *)kCGImagePropertyAPNGLoopCount;
}

+ (NSUInteger)defaultLoopCount {
    return 0;
}

@end
