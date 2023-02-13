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
#import "HMSourceParser.h"
#import "HMJSGlobal.h"
#import <Hummer/HMConverter.h>
#import <Hummer/HMImageManager.h>
#import <Hummer/UIImageView+HMImageLoader.h>
#import <Hummer/HMAnimatedImage+Hummer.h>

#import <Hummer/UIView+HMInspector.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMImageViewLayer : CALayer

@end


@interface HMImageView ()

@property (nonatomic, copy, nullable) NSString *imageSrc;

//@property (nonatomic, strong, nullable) HMAnimatedImageView *internalImageView;

@end

NS_ASSUME_NONNULL_END

@implementation HMImageViewLayer

- (void)removeAllAnimations {
    BOOL isAnimating = NO;
    HMImageView *imageView = nil;
    if ([self.delegate isKindOfClass:HMImageView.class]) {
        imageView = (HMImageView *) self.delegate;
        isAnimating = imageView.isAnimating;
    }
    [super removeAllAnimations];
    if (isAnimating) {
        [imageView startAnimating];
    }
}

@end

@interface HMImageView()<HMViewInspectorDescription>

@end

@implementation HMImageView

HM_EXPORT_CLASS(Image, HMImageView)

HM_EXPORT_PROPERTY(src, src, setSrcValue:)

HM_EXPORT_PROPERTY(gifSrc, src, setGifSrcValue:)

HM_EXPORT_METHOD(load, __load:completion:)

HM_EXPORT_PROPERTY(gifRepeatCount, gifRepeatCount, setGifRepeatCount:)

HM_EXPORT_ATTRIBUTE(resize, contentMode, HMStringToContentMode:)

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.contentMode = UIViewContentModeScaleToFill;
        self.userInteractionEnabled = YES;
        self.clipsToBounds = YES;
//        _internalImageView = [[HMAnimatedImageView alloc] init];
//        _internalImageView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
//        [self addSubview:_internalImageView];
    }
    return self;
}

- (void)__load:(HMBaseValue *)params completion:(HMFunctionType)callback{

    NSString *srcString = params.toString;
    NSString *placeholder = nil;
    NSString *errorSource = nil;
    HMImageLoaderContext *context = nil;
    if (!params.isString) {
     
        NSDictionary *dic = params.toDictionary;
        if (dic[@"gifRepeatCount"]) {
            self.gifRepeatCount = dic[@"gifRepeatCount"];
        }
        srcString = dic[@"src"];
        placeholder = dic[@"placeholder"];
        errorSource = dic[@"failedImage"];
        if (dic[@"gifSrc"]) {
            context = @{HMImageManagerContextAnimatedImageClass:@"HMAnimatedImage"};
            srcString = dic[@"gifSrc"];
        }
    }
    if ([srcString hasSuffix:@".gif"]) {
        context = @{HMImageManagerContextAnimatedImageClass:@"HMAnimatedImage"};
    }
    [self realSetSrc:srcString placeholder:placeholder failedImage:errorSource context:context completionBlock:^(NSInteger srcType, BOOL isSuccess) {
        if (callback) {
            callback(@[@(srcType), @(isSuccess)]);
        }
    }];
}

+ (Class)layerClass {
    return HMImageViewLayer.class;
}

#pragma mark - Export Property

- (NSString *)src {
    return self.imageSrc;
}


- (void)setGifSrc:(NSString *)src {
    NSString *srcString = src;
    HMImageLoaderContext *context = @{HMImageManagerContextAnimatedImageClass:@"HMAnimatedImage"};
    [self realSetSrc:srcString placeholder:nil failedImage:nil context:context completionBlock:nil];
}

- (void)setGifSrcValue:(HMBaseValue *)src {
    NSString *srcString = src.toString;
    [self setGifSrc:srcString];
}

- (void)setSrcValue:(HMBaseValue *)src {
    NSString *srcString = src.toString;
    [self setSrc:srcString];
}

- (void)setSrc:(NSString *)srcString {
    if ([srcString hasSuffix:@".gif"]) {
        [self setGifSrc:srcString];
        return;
    }
    [self realSetSrc:srcString placeholder:nil failedImage:nil context:nil completionBlock:nil];
}

- (void)realSetSrc:(NSString *)src placeholder:(NSString *)placeholder failedImage:(NSString *)failedImage context:(nullable HMImageLoaderContext *)context completionBlock:(HMImageLoadCompletionBlock)completionBlock {

    self.imageSrc = src;
    if (self.imageSrc) {
        self.image = nil;
        __weak typeof(self) weakSelf = self;
        
        [self hm_setImageWithURL:self.imageSrc placeholder:placeholder failedImage:failedImage inJSBundleSource:nil processBlock:nil context:context completion:^(UIImage * _Nullable image, NSData * _Nullable data, NSError * _Nullable error, HMImageCacheType cacheType) {
            __strong typeof(weakSelf) strongSelf = weakSelf;
            if (error || !image) {
                if (completionBlock) {
                    completionBlock(HMImageLoaderSrcTypeUnknown, NO);
                }
                return;
            }
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
            // set UIAnimatedImage for ImageView.image, will cause animationRepeatCount invalidate
            if (context[HMImageManagerContextAnimatedImageClass]) {
                if ([img isKindOfClass:HMAnimatedImage.class]) {
                    HMAnimatedImage *animatedImage = (HMAnimatedImage *)img;
                    strongSelf.image = animatedImage.hm_animatedImages.lastObject;
                    strongSelf.animationImages = animatedImage.hm_animatedImages;
                    strongSelf.animationDuration = animatedImage.hm_animatedDuration;
                    [strongSelf startAnimating];
                } else{
                    //兜底逻辑。可能会导致 repeatCount 失效。
                    strongSelf.image = img;
                }
            }else if (image.hm_isAnimated){
                strongSelf.image = img.images.lastObject;
                strongSelf.animationImages = img.images;
                strongSelf.animationDuration = img.duration;
                [strongSelf startAnimating];               
            }else{
                strongSelf.image = img;
                // 停止动画
                strongSelf.animationImages = nil;
            }
            [strongSelf hm_markDirty];
            
            if (completionBlock) {
                if (cacheType == HMImageCacheTypeNone) {
                    completionBlock(HMImageLoaderSrcTypeNetworking, YES);

                } else if (cacheType == HMImageCacheTypeDisk || cacheType == HMImageCacheTypeMemory) {
                    completionBlock(HMImageLoaderSrcTypeLocalResource, YES);
                } else {
                    completionBlock(HMImageLoaderSrcTypeUnknown, YES);
                }
            }
        }];
    }
}

- (NSInteger)gifRepeatCount {
    return self.animationRepeatCount;
}

- (void)setGifRepeatCount:(HMBaseValue *)src {
    self.animationRepeatCount = src.toNumber.intValue;
}


#pragma mark - <HMViewInspectorDescription>

- (NSString *)hm_content {
    return self.imageSrc;
}

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    return nil;
}

@end
