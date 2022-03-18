#import <Foundation/Foundation.h>

@class HMExceptionModel;

//#define _CONCAT(a, b) a##b
//
//#define CONCAT(a, b) _CONCAT(a, b)
//
//#define UNUSED_UNIQUE_ID CONCAT(unused, __COUNTER__)

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXTERN const char *const HUMMER_CLOCK_GET_TIME_ERROR;

static inline void HMClockGetTime(struct timespec *timespec) {
    if (@available(iOS 10.0, *)) {
        int status = clock_gettime(CLOCK_UPTIME_RAW, timespec);
        assert(!status && HUMMER_CLOCK_GET_TIME_ERROR);
    } else {
        timespec->tv_sec = 0;
        timespec->tv_nsec = 0;
    }
}

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

static inline void HMDiffTime(const struct timespec *beforeTimespec, const struct timespec *afterTimespec, struct timespec *resultTimeSpec) {
    resultTimeSpec->tv_sec = afterTimespec->tv_sec - beforeTimespec->tv_sec;
    resultTimeSpec->tv_nsec = afterTimespec->tv_nsec - beforeTimespec->tv_nsec;
    if (resultTimeSpec->tv_nsec < 0) {
        --resultTimeSpec->tv_sec;
        resultTimeSpec->tv_nsec += 1000000000;
    }
}

NS_ASSUME_NONNULL_END
