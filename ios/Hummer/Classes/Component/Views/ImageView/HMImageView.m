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
#import "HMInterceptor.h"
#import "UIView+HMDom.h"
#import "HMJSGlobal.h"
#import "HMBaseValue.h"
#import "HMConverter.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMImageView ()

@property (nonatomic, copy, nullable) NSString *imageSrc;

- (nullable NSString *)src;

- (void)setSrc:(nullable HMBaseValue *)src;

- (NSInteger)gifRepeatCount;

- (void)setGifRepeatCount:(nullable HMBaseValue *)src;

@end

NS_ASSUME_NONNULL_END

@implementation HMImageView

HM_EXPORT_CLASS(Image, HMImageView)

HM_EXPORT_PROPERTY(src, src, setSrc:)

HM_EXPORT_PROPERTY(gifSrc, src, setSrc:)

HM_EXPORT_PROPERTY(gifRepeatCount, gifRepeatCount, setGifRepeatCount:)

HM_EXPORT_ATTRIBUTE(resize, contentMode, HMStringToContentMode:)

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.contentMode = UIViewContentModeCenter;
        self.userInteractionEnabled = YES;
    }

    return self;
}

#pragma mark - Export Property

- (NSString *)src {
    return self.imageSrc;
}

- (void)setSrc:(nullable HMBaseValue *)src {
    NSString *srcString = src.toString;
    if ([self.imageSrc isEqualToString:srcString]) {
        return;
    }
    NSString *newSrc = src.toString;
    self.imageSrc = newSrc;
    if (self.imageSrc) {
        HMJSContext *context = [HMJSGlobal.globalObject currentContext:hm_currentExecutor];
        if ([HMInterceptor hasInterceptor:HMInterceptorTypeImage]) {
            [HMInterceptor enumerateInterceptor:HMInterceptorTypeImage withBlock:^(id  _Nonnull interceptor, NSUInteger idx, BOOL * _Nonnull stop) {
                id<HMImageProtocol> imageInterceptor = interceptor;
                [imageInterceptor getImageWithUrlOrBase64:newSrc imageView:self baseUrl:context.url completionBlock:^(BOOL isSuccess, BOOL isRemoteImage, UIImage * _Nonnull image) {
                    if (isSuccess) {
                        if (!isRemoteImage && image) {
                            self.image = image;
                        }
                        [self hm_markDirty];
                    }
                }];
            }];
        } else {
            HMLogError(@"缺少图片加载拦截器");
        }
    }
}

- (NSInteger)gifRepeatCount {
    return self.animationRepeatCount;
}

- (void)setGifRepeatCount:(nullable HMBaseValue *)src {
    self.animationRepeatCount = src.toNumber.intValue;
}

@end
