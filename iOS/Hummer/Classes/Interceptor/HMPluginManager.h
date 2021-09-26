#import <Foundation/Foundation.h>

#define _CONCAT(a, b) a##b

#define CONCAT(a, b) _CONCAT(a, b)

#define UNUSED_UNIQUE_ID CONCAT(unused, __COUNTER__)

NS_ASSUME_NONNULL_BEGIN

// 注意：正常情况下，以 sizeof(void *) 为长度存储，但是如果开启 ASan，会导致长度以 32/64/128 的长度划分红区，可以通过 attribute no_sanitize 关闭插桩

typedef struct {
    const char *const objcClass;
    const char *const _Nullable nameSpace;
} HMPluginDeclaration;

#define HM_EXPORT_GLOBAL_PLUGIN(objcClass) __attribute__((used, section("__DATA, __hummer_plugin"))) static const HMPluginDeclaration UNUSED_UNIQUE_ID = { #objcClass, NULL };

#define HM_EXPORT_LOCAL_PLUGIN(objcClass, nameSpace) __attribute__((used, section("__DATA, __hummer_plugin"))) static const HMPluginDeclaration UNUSED_UNIQUE_ID = { #objcClass, #nameSpace };

@protocol HMPluginProtocol <NSObject>
@end

@protocol HMTrackEventPluginProtocol <HMPluginProtocol>

//@optional

@end

typedef NS_ENUM(NSUInteger, HMPluginType) {
    HMPluginTypeTrackEvent = 0
};

@interface HMPluginManager : NSObject

+ (instancetype)sharedInstance;

/// @breif 遍历对应类型插件
/// @param pluginType 插件类型
/// @param nameSpace 可选命名空间
/// @param block 遍历闭包
- (void)enumeratePluginWithPluginType:(HMPluginType)pluginType nameSpace:(nullable NSString *)nameSpace usingBlock:(void (^)(id <HMPluginProtocol> obj))block;

@end

NS_ASSUME_NONNULL_END
