#import <Foundation/Foundation.h>
#import <Hummer/HMTimeUtils.h>
@class HMExceptionModel;

//#define _CONCAT(a, b) a##b
//
//#define CONCAT(a, b) _CONCAT(a, b)
//
//#define UNUSED_UNIQUE_ID CONCAT(unused, __COUNTER__)

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN const char *const HUMMER_CLOCK_GET_TIME_ERROR;

// 注意：正常情况下，以 sizeof(void *) 为长度存储，但是如果开启 ASan，会导致长度以 32/64/128 的长度划分红区，可以通过 attribute no_sanitize 关闭插桩

//typedef struct {
//    const char *const objcClass;
//    const char *const _Nullable nameSpace;
//} HMPluginDeclaration;

//#define HM_EXPORT_GLOBAL_PLUGIN(objcClass) __attribute__((used, section("__DATA, __hummer_plugin"))) static const HMPluginDeclaration UNUSED_UNIQUE_ID = { #objcClass, NULL };
//
//#define HM_EXPORT_LOCAL_PLUGIN(objcClass, nameSpace) __attribute__((used, section("__DATA, __hummer_plugin"))) static const HMPluginDeclaration UNUSED_UNIQUE_ID = { #objcClass, #nameSpace };

//@protocol HMPluginProtocol <NSObject>
//@end

typedef enum : NSUInteger {
    HMPageLifeCycleOnCreate,
    HMPageLifeCycleOnAppear,
    HMPageLifeCycleOnDisappear,
    HMPageLifeCycleOnDestroy,
} HMPageLifeCycle;

@protocol HMTrackEventPluginProtocol

@required

- (void)trackEngineInitializationWithDuration:(NSNumber *)duration;

- (void)trackJavaScriptBundleWithSize:(NSNumber *)size pageUrl:(NSString *)pageUrl;

- (void)trackPageRenderCompletionWithDuration:(NSNumber *)duration pageUrl:(NSString *)pageUrl;

- (void)trackEvaluationWithDuration:(NSNumber *)duration pageUrl:(NSString *)pageUrl;

- (void)trackPerformanceWithLabel:(NSString *)label localizableLabel:(NSString *)localizableLabel stringValue:(NSString *)stringValue unit:(NSString *)unit pageUrl:(NSString *)pageUrl;

- (void)trackPerformanceWithLabel:(NSString *)label localizableLabel:(NSString *)localizableLabel numberValue:(NSNumber *)numberValue unit:(NSString *)unit pageUrl:(NSString *)pageUrl;

- (void)trackJavaScriptExceptionWithExceptionModel:(HMExceptionModel *)exceptionModel pageUrl:(NSString *)pageUrl;

- (void)trackPVWithPageUrl:(NSString *)pageUrl;

- (void)trackPageSuccessWithPageUrl:(NSString *)pageUrl;

// 单个js加载时间
- (void)trackPerformanceJSLoad:(NSNumber *)duration url:(NSString *)url pageUrl:(NSString *)pageUrl;

// 单个js执行时间
- (void)trackPerformanceJSEval:(NSNumber *)duration url:(NSString *)url pageUrl:(NSString *)pageUrl;

// js执行总时间
- (void)trackPerformanceJSEvalTotal:(NSNumber *)duration pageUrl:(NSString *)pageUrl;

// 页面生命耗时
- (void)trackPerformanceLifeCycle:(HMPageLifeCycle)LifeCycle duration:(NSNumber *)duration pageUrl:(NSString *)pageUrl;

// 最大内容绘制耗时（近似LCP）
- (void)trackPerformanceLCP:(NSNumber *)duration pageUrl:(NSString *)pageUrl;

// 首帧渲染耗时（近似FCP）
- (void)trackPerformanceFCP:(NSNumber *)duration pageUrl:(NSString *)pageUrl;

// Hummer容器创建耗时, 从 容器 viewDidload , 到定义bridge注册完成，即将为加载/执行js
- (void)trackPerformanceContainerInitialization:(NSNumber *)duration pageUrl:(NSString *)pageUrl;


/**
 * 保存bundle包信息
 *
 * @param pageUrl
 * @param moduleName
 * @param moduleVersion
 */
@optional
- (void)storeBundleInfoWithPageUrl:(NSString *)pageUrl moduleName:(NSString *)moduleName moduleVersion:(NSString *)moduleVersion;
- (void)removeBundleInfoWithPageUrl:(NSString *)pageUrl;
- (void)clearBundleInfo;
@end

//typedef NS_ENUM(NSUInteger, HMPluginType) {
//    HMPluginTypeTrackEvent = 0 // 暂时不使用
//};

//@interface HMPluginManager : NSObject
//
//+ (instancetype)sharedInstance;
//
///// @breif 遍历对应类型插件
///// @param pluginType 插件类型
///// @param nameSpace 可选命名空间，如果传空，会遍历全局+局部所有的插件
///// @param block 遍历闭包
//- (void)enumeratePluginWithPluginType:(HMPluginType)pluginType nameSpace:(nullable NSString *)nameSpace usingBlock:(void (^)(id <HMPluginProtocol> obj))block;
//
//@end

NS_ASSUME_NONNULL_END
