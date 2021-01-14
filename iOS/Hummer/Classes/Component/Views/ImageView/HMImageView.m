//
//  HMImageView.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMImageView.h"
#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMInterceptor.h"
#import "UIView+HMDom.h"
#import "HMResourceModel.h"
#import "HMJSGlobal.h"
#import <Hummer/HMConverter.h>
#import <Hummer/HMImageManager.h>
#import <Hummer/UIImageView+HMImageLoader.h>
#import <Hummer/HMAnimatedImage+Hummer.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMImageView ()

@property (nonatomic, copy, nullable) NSString *imageSrc;

//@property (nonatomic, strong, nullable) HMAnimatedImageView *internalImageView;

- (nullable NSString *)src;

- (void)setSrc:(nullable HMBaseValue *)src;

- (NSInteger)gifRepeatCount;

- (void)setGifRepeatCount:(nullable HMBaseValue *)src;

@end

NS_ASSUME_NONNULL_END

@implementation HMImageView

HM_EXPORT_CLASS(Image, HMImageView)

HM_EXPORT_PROPERTY(src, src, setSrc:)

HM_EXPORT_PROPERTY(gifSrc, src, setGifSrc:)

HM_EXPORT_PROPERTY(gifRepeatCount, gifRepeatCount, setGifRepeatCount:)

HM_EXPORT_ATTRIBUTE(resize, contentMode, HMStringToContentMode:)

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.contentMode = UIViewContentModeCenter;
        self.userInteractionEnabled = YES;
//        _internalImageView = [[HMAnimatedImageView alloc] init];
//        _internalImageView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
//        [self addSubview:_internalImageView];
    }
    return self;
}

#pragma mark - Export Property

- (NSString *)src {
    return self.imageSrc;
}


- (void)setGifSrc:(HMBaseValue *)src {
    NSString *srcString = src.toString;
    HMImageLoaderContext *context = @{HMImageManagerContextAnimatedImageClass:@"HMAnimatedImage"};
    [self realSetSrc:srcString context:context];
}

- (void)setSrc:(HMBaseValue *)src {
    NSString *srcString = src.toString;
    if ([srcString hasSuffix:@".gif"]) {
        [self setGifSrc:src];
        return;
    }
    [self realSetSrc:srcString context:nil];
}

- (void)realSetSrc:(NSString *)src context:(nullable HMImageLoaderContext *)context {
    
    self.imageSrc = src;
    if (self.imageSrc) {
        __weak typeof(self) weakSelf = self;
        [self hm_setImageWithURL:self.imageSrc inJSBundleSource:nil context:context completion:^(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType) {
            typeof(weakSelf) strongSelf = weakSelf;
            if (!image) {return;}
            __block UIImage *img = image;
            if ([HMInterceptor hasInterceptor:HMInterceptorTypeImage]) {
                [HMInterceptor enumerateInterceptor:HMInterceptorTypeImage
                                          withBlock:^(id<HMImageProtocol> interceptor,
                                                      NSUInteger idx,
                                                      BOOL * _Nonnull stop) {
                    UIImage *newImg = [interceptor imageView:strongSelf willSetImage:image src:src];
                    if (newImg) {
                        img = newImg;
                        *stop = YES;
                    }
                }];
            }
            if (context[HMImageManagerContextAnimatedImageClass]) {
                if ([img isKindOfClass:HMAnimatedImage.class]) {
                    HMAnimatedImage *animatedImage = (HMAnimatedImage *)img;
                    strongSelf.image = animatedImage.hm_animatedImages.lastObject;
                    strongSelf.animationImages = animatedImage.hm_animatedImages;
                    strongSelf.animationDuration = animatedImage.hm_animatedDuration;
                    [strongSelf startAnimating];
                }else{
                    HMAssert(NO,@"gif image is not a HMAnimatedImage`s instance");
                }
            }else{
                strongSelf.image = img;
            }
            [strongSelf hm_markDirty];
        }];
    }
}

- (NSInteger)gifRepeatCount {
    return self.animationRepeatCount;
}

- (void)setGifRepeatCount:(HMBaseValue *)src {
    self.animationRepeatCount = src.toNumber.intValue;
}

@end
