//
//  HMImageLoaderDefine.h
//  Hummer
//
//  Created by didi on 2020/11/23.
//

#import <Foundation/Foundation.h>
FOUNDATION_EXPORT NSErrorDomain const _Nonnull HMWebImageErrorDomain;

/// HMWebImage error domain and codes
typedef NS_ERROR_ENUM(HMWebImageErrorDomain, HMWebImageError) {
    HMWebImageErrorInvalidURL = 1000, // The URL is invalid, such as nil URL or corrupted URL
    HMWebImageErrorBadImageData = 1001, // The image data can not be decoded to image, or the image data is empty
    HMWebImageErrorCacheNotModified = 1002, // The remote location specify that the cached image is not modified, such as the HTTP response 304 code. It's useful for `HMWebImageRefreshCached`
    HMWebImageErrorBlackListed = 1003, // The URL is blacklisted because of unrecoverable failsure marked by downloader (such as 404), you can use `.retryFailed` option to avoid this
    HMWebImageErrorInvalidDownloadOperation = 2000, // The image download operation is invalid, such as nil operation or unexpected error occur when operation initialized
    HMWebImageErrorInvalidDownloadStatusCode = 2001, // The image download response a invalid status code. You can check the status code in error's userInfo under `HMWebImageErrorDownloadStatusCodeKey`
    HMWebImageErrorCancelled = 2002, // The image loading operation is cancelled before finished, during either async disk cache query, or waiting before actual network request. For actual network request error, check `NSURLErrorDomain` error domain and code.
    HMWebImageErrorInvalidDownloadResponse = 2003, // When using response modifier, the modified download response is nil and marked as failed.
};


/// Image Cache Type
typedef NS_ENUM(NSInteger, HMImageCacheType) {
    /**
     * For query and contains op in response, means the image isn't available in the image cache
     * For op in request, this type is not available and take no effect.
     */
    HMImageCacheTypeNone,
    /**
     * For query and contains op in response, means the image was obtained from the disk cache.
     * For op in request, means process only disk cache.
     */
    HMImageCacheTypeDisk,
    /**
     * For query and contains op in response, means the image was obtained from the memory cache.
     * For op in request, means process only memory cache.
     */
    HMImageCacheTypeMemory,
    /**
     * For query and contains op in response, this type is not available and take no effect.
     * For op in request, means process both memory cache and disk cache.
     */
    HMImageCacheTypeAll
};

typedef void(^HMImageLoadProcessBlock)(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType);
typedef void(^HMImageCompletionBlock)(UIImage * _Nullable image, NSError * _Nullable error, HMImageCacheType cacheType);
typedef void(^HMImageLoaderCompletionBlock)(id _Nullable data, BOOL needCache, HMImageCacheType cacheType, NSError * _Nullable error);

typedef NSString * HMImageLoaderContextOption NS_EXTENSIBLE_STRING_ENUM;
typedef NSDictionary<HMImageLoaderContextOption, id> HMImageLoaderContext;

#define HM_LOCK(lock) dispatch_semaphore_wait(lock, DISPATCH_TIME_FOREVER);
#define HM_UNLOCK(lock) dispatch_semaphore_signal(lock);


/// The HTTP status code for invalid download response (NSNumber *)
FOUNDATION_EXPORT NSErrorUserInfoKey const _Nonnull HMWebImageErrorDownloadStatusCodeKey;



FOUNDATION_EXPORT HMImageLoaderContextOption _Nonnull const HMImageManagerContextAnimatedImageClass;
FOUNDATION_EXPORT HMImageLoaderContextOption _Nonnull const HMImageManagerContextImageTransformer;

FOUNDATION_EXPORT HMImageLoaderContextOption _Nonnull const HMImageManagerContextImageScaleFactor;
FOUNDATION_EXPORT HMImageLoaderContextOption _Nonnull const HMImageManagerContextImageResizeMode;
FOUNDATION_EXPORT HMImageLoaderContextOption _Nonnull const HMImageManagerContextImageResize;
FOUNDATION_EXPORT HMImageLoaderContextOption _Nonnull const HMImageManagerContextNamespace;

