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
#import "HMImageLoaderManager.h"

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
@property (nonatomic, assign) BOOL autoPlay;
@property (nonatomic, assign) BOOL isPlaying;
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

HM_EXPORT_PROPERTY(autoPlay, __autoPlay, __setAutoPlay:)
HM_EXPORT_PROPERTY(src, __src, __setSrc:)
HM_EXPORT_METHOD(playAnimation, __playAnimation)
HM_EXPORT_METHOD(pauseAnimation, __pauseAnimation)
HM_EXPORT_METHOD(resumeAnimation, __resumeAnimation)
HM_EXPORT_METHOD(playToProgress, __playToProgress:)
HM_EXPORT_METHOD(cancelAnimation, __cancelAnimation)
HM_EXPORT_METHOD(setLoop, __setLoop:)
HM_EXPORT_METHOD(setOnCompletionCallback, __setOnCompletionCallback:)
HM_EXPORT_METHOD(setOnDataFailedCallback, __setOnDataFailedCallback:)
HM_EXPORT_METHOD(setOnDataReadyCallback, __setOnDataReadyCallback:)

- (instancetype)init {
    self = [super init];
    if(self){
        _autoPlay = YES;
        _loopAnimation = NO;
    }
    return self;
}

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
    // 开启内存优化
    self.combinedOperation = nil;
    __block id<HMImageLoaderOperation> combinedOperationTmp = [self hm_setLottieWithSrc:src inJSBundleSource:bundle context:context completion:^(NSString * _Nonnull filePath, HMImageCacheType cacheType, NSError * _Nullable error) {
        HM_SafeRunBlockAtMainThread(^{
            if (!wSelf) return;
            if (combinedOperationTmp && wSelf.combinedOperation == combinedOperationTmp) {
                wSelf.combinedOperation = nil;
            }
        });
        if(filePath){
            [wSelf.cacheKeyMapper setObject:filePath forKey:src];
            [wSelf setupAnimationView:filePath];
            HM_SafeRunBlockAtMainThread(wSelf.readyCallback,@[]);
        }else{
            HM_SafeRunBlockAtMainThread(wSelf.failedCallback,@[]);
        }
    }];
    self.combinedOperation = combinedOperationTmp;
}

- (void)setupAnimationView:(NSString *)filePath {
#if __has_include(<lottie-ios/Lottie/Lottie.h>)
    self.animationView = [LOTAnimationView animationWithFilePath:filePath];
#else
    CompatibleLOTAnimation *composition = [[CompatibleLOTAnimation alloc] initWithFilepath:filePath];
    self.animationView = [[CompatibleLOTAnimationView alloc] initWithCompatibleAnimation:composition];
#endif
    [self setupLoop];
    [self layoutAnimationView];
    [self setupAutoPlay];
}
- (void)setupLoop{
    if (self.animationView) {
#if __has_include(<lottie-ios/Lottie/Lottie.h>)
        self.animationView.loopAnimation = self.loopAnimation;
#else
        self.animationView.loopAnimationCount = self.loopAnimation ? -1 : 1;
#endif
    }
}

- (void)setupAutoPlay{
    if (self.animationView && self.autoPlay && !self.isPlaying) {
        [self __playAnimation];
    }
}

- (void)layoutAnimationView {
    self.animationView.frame = CGRectMake(0, 0, self.frame.size.width, self.frame.size.height);
    [self addSubview:self.animationView];
}

- (void)__playAnimation {
    __weak typeof(self) wSelf = self;
    self.isPlaying = YES;
    [self.animationView playWithCompletion:^(BOOL animationFinished) {
        wSelf.isPlaying = NO;
        HM_SafeRunBlockAtMainThread(wSelf.completionCallback,@[])
    }];
}

///暂停播放，调用 playAnimation 可恢复播放
- (void)__pauseAnimation {
    [self.animationView pause];
}

- (void)__resumeAnimation {
    [self __playAnimation];
}

- (void)__cancelAnimation {
    [self.animationView stop];
    self.isPlaying = NO;
}

- (void)__setLoop:(HMBaseValue *)jsLoop {
    self.loopAnimation = jsLoop.toBool;
    [self setupLoop];
}

- (void)__setOnCompletionCallback:(HMFuncCallback)jsCallback {
    self.completionCallback = jsCallback;
}

- (void)__setOnDataFailedCallback:(HMFuncCallback)jsCallback {
    self.failedCallback = jsCallback;
}

- (void)__setOnDataReadyCallback:(HMFuncCallback)jsCallback {
    self.readyCallback = jsCallback;
}

- (BOOL)__autoPlay {
    return self.autoPlay;
}

- (void)__setAutoPlay:(BOOL)autoPlay{
    self.autoPlay = autoPlay;
}

///播放到指定进度（0-1）
- (void)__playToProgress:(HMBaseValue *)jsProgress {
    //解析 progress 参数，默认1
    CGFloat progress = 1;
    if (jsProgress && jsProgress.isNumber) {
        progress = [jsProgress.toNumber floatValue];
    }
    progress = MAX(0, progress);
    
    __weak typeof(self) wSelf = self;
    self.isPlaying = YES;
    [self.animationView playToProgress:progress withCompletion:^(BOOL animationFinished) {
        wSelf.isPlaying = NO;
        HM_SafeRunBlockAtMainThread(wSelf.completionCallback,@[])
    }];
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
