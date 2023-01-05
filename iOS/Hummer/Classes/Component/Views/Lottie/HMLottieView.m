//
//  HMOCLottieView.m
//  DCPTrack
//
//  Created by didi on 2022/12/21.
//

#import "HMLottieView.h"
#import "HMExportManager.h"
#import "HMBaseValue.h"
#import "HMJSGlobal.h"
#import "HMImageManager.h"
#import "HMLottieView+ImageLoader.h"
#import "UIView+HMDom.h"
#import "HMUtility.h"

#if __has_include(<lottie-ios/Lottie/Lottie.h>)
#import <lottie-ios/Lottie/Lottie.h>
#else
#import "Hummer-Swift.h"
#endif

//https://github.com/airbnb/lottie-ios/blob/3.0.0/Documentation/MIGRATING.md
/**
 * Lottie 搜索 image 策略
 * json:{
 *  assets:{
 *      w:x,//宽
 *      h:x,//高
 *      u:x,//imageDirectory
 *      p:x,//imageName
 *  }
 * }
 * LOTAsset
 * case1:
 *      hasPrefix:@"data:"
 * case2: animationWithFilePath
 *      asset.rootDirectory.length > 0
 *      rootDirectory + imageDirectory + imageName
 * case3:
 *      assetBundle + imageName
 *
 */


@interface HMLottieView()

@property (nonatomic, nullable, strong) id<HMImageLoaderOperation> combinedOperation;

#if __has_include(<lottie-ios/Lottie/Lottie.h>)
@property (nonatomic, nullable, strong) LOTAnimationView *animationView;
#else
@property (nonatomic, nullable, strong) CompatibleLOTAnimationView *animationView;
#endif

@property (nonatomic, strong) NSString *src;
@property (nonatomic, strong) NSString *url;
@property (nonatomic, strong) NSString *fileName;
@property (nonatomic, assign) BOOL loopAnimation;
@property (nonatomic,   copy) HMFuncCallback completionCallback;
@property (nonatomic,   copy) HMFuncCallback failedCallback;
@property (nonatomic,   copy) HMFuncCallback readyCallback;

@property (nonatomic, strong) NSMutableDictionary *cacheKeyMapper;
@end

@implementation HMLottieView

/**
 * src
 */
HM_EXPORT_CLASS(LottieView,HMLottieView)

HM_EXPORT_PROPERTY(src, __src, __setSrc:)
HM_EXPORT_METHOD(playAnimation, __playAnimation)
HM_EXPORT_METHOD(cancelAnimation, __cancelAnimation)
HM_EXPORT_METHOD(setLoop, __setLoop:)
HM_EXPORT_METHOD(setOnCompletionCallback, __setOnCompletionCallback:)
HM_EXPORT_METHOD(onDataFailed, __setOnDataFailedCallback:)
HM_EXPORT_METHOD(onDataReady, __setOnDataReadyCallback:)

- (NSString *)__src {
    return self.src;
}
- (void)__setSrc:(HMBaseValue *)srcValue {
    
    NSString *src = srcValue.toString;

    HMJSContext *hummerJSContext = [HMJSGlobal.globalObject currentContext:srcValue.context];
    NSMutableDictionary *context = [NSMutableDictionary new];
    //不自动解码
    [context setObject:@1 forKey:HMImageContextImageDoNotDecode];
    //只查询磁盘
    [context setObject:@(HMImageCacheTypeDisk) forKey:HMImageContextQueryCacheType];
    //只存储磁盘
    [context setObject:@(HMImageCacheTypeDisk) forKey:HMImageContextStoreCacheType];
//self.animationView.te
    id<HMURLConvertible> bundle = hummerJSContext.url;
    if(hummerJSContext.nameSpace){
        [context setObject:hummerJSContext.nameSpace forKey:HMImageManagerContextNamespace];
    }
    
    [self.combinedOperation cancel];
    if(self.cacheKeyMapper[src]){
        [self setupAnimationView:self.cacheKeyMapper[src]];
        HM_SafeRunBlockAtMainThread(self.readyCallback,@[]);
        return;
    }
        __weak typeof(self) wSelf = self;
        self.combinedOperation = [self hm_setLottieWithSrc:src inJSBundleSource:bundle context:context completion:^(NSString * _Nonnull filePath, HMImageCacheType cacheType, NSError * _Nullable error) {
            if(filePath){
                [wSelf.cacheKeyMapper setObject:filePath forKey:src];
                [wSelf setupAnimationView:filePath];
                HM_SafeRunBlockAtMainThread(wSelf.readyCallback,@[]);
            }else{
                HM_SafeRunBlockAtMainThread(wSelf.failedCallback,@[]);
            }
        }];
}

- (void)setupAnimationView:(NSString *)filePath {
#if __has_include(<lottie-ios/Lottie/Lottie.h>)
    self.animationView = [LOTAnimationView animationWithFilePath:filePath];
#else
    CompatibleLOTAnimation *composition = [[CompatibleLOTAnimation alloc] initWithFilepath:filePath];
    self.animationView = [[CompatibleLOTAnimationView alloc] initWithCompatibleAnimation:composition];
#endif
    [self layoutAnimationView];
}

- (void)layoutAnimationView {
    self.animationView.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    [self addSubview:self.animationView];
}

- (void)__playAnimation {
    __weak typeof(self) wSelf = self;
    [self.animationView playWithCompletion:^(BOOL animationFinished) {
        HM_SafeRunBlockAtMainThread(wSelf.completionCallback,@[])
    }];
}

- (void)__cancelAnimation {
    [self.animationView stop];
}

- (void)__setLoop:(HMBaseValue *)jsLoop {
    self.loopAnimation = jsLoop.toBool;
    if (self.animationView) {
#if __has_include(<lottie-ios/Lottie/Lottie.h>)
        self.animationView.loopAnimation = self.loopAnimation;
#else
        self.animationView.loopAnimationCount = self.loopAnimation ? -1 : 1;
#endif
    }
}

- (void)__setOnCompletionCallback:(HMFuncCallback)jsCallback {
    self.completionCallback = jsCallback;
}

- (void)__setOnDataFailedCallback:(HMFuncCallback)jsCallback {
    self.failedCallback = jsCallback;
}

- (void)__setOnDataReadyCallback:(HMFuncCallback)jsCallback {
    self.readyCallback = jsCallback;
    if (self.animationView && self.readyCallback) {
        HM_SafeRunBlockAtMainThread(self.readyCallback,@[])
    }
}


- (void)hummerSetFrame:(CGRect)frame {
    [super hummerSetFrame:frame];
    CGFloat w = CGRectGetWidth(self.bounds);
    CGFloat h = CGRectGetHeight(self.bounds);
    if (self.animationView) {
        self.animationView.frame = CGRectMake(0, 0, w, h);
    }
}
@end
