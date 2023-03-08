//
//  HMImageView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@class HMBaseValue;
typedef NS_ENUM (NSInteger, HMImageLoaderSrcType) {
    /**
     *  Unknown error
     */
    HMImageLoaderSrcTypeUnknown = 0,
    /**
     *  Download Internet pictures
     */
    HMImageLoaderSrcTypeNetworking = 1,
    /**
     *  Load local image
     */
    HMImageLoaderSrcTypeLocalResource= 2,
};

typedef void(^HMImageLoadCompletionBlock)(NSInteger srcType, BOOL isSuccess);

@interface HMImageView : UIImageView

- (void)setSrcValue:(HMBaseValue *)src;
/// 设置图片 src，在非js上下文中，相对路径将解析到默认namespace(hummer_default)下
- (void)setSrc:(NSString *)src;
@end

NS_ASSUME_NONNULL_END
