//
//  HMImageView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

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

@end

NS_ASSUME_NONNULL_END
