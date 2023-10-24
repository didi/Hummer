//
//  HMNGJSContext.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/15.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseExecutorProtocol.h>
#import <Hummer/HMJSContextDefines.h>

@class HMBaseValue, HMNotifyCenter, HMExceptionModel;

@protocol HMBaseExecutorProtocol;

NS_ASSUME_NONNULL_BEGIN

@class HMJSContext;
@class HMWebSocket;

@interface UIView (HMJSContext)

@property (nonatomic, nullable, strong) HMJSContext *hm_context;

@end

@protocol HMJSContextDelegate <NSObject>
@optional

- (void)context:(HMJSContext *)context didRenderFailed:(NSError *)error;
- (void)context:(HMJSContext *)context didRenderPage:(HMBaseValue *)page;
- (void)context:(HMJSContext *)context reloadBundle:(NSDictionary *)bundleInfo;

@end
@interface HMJSContext : NSObject

@property (nonatomic, weak) id <HMJSContextDelegate> delegate;

@property (nonatomic, nullable, copy) NSSet<HMWebSocket *> *webSocketSet;

/**
 * 设置自身业务线的命名空间
 * 当 Hummer 查找插件时，或者 Navigator 模块查找注册的构造器时，会采用该命名空间作为唯一标示
 * 当该值为空时，Hummer 会忽略上下文，保持原先的处理逻辑
 */
@property (nonatomic, copy, nullable) NSString *nameSpace;//后续应变为 readonly

/// 用于埋点展示的页面url，如：异常、性能埋点
@property (nonatomic, nullable, copy) NSString *hummerUrl;

#pragma mark <readonly>

@property (nonatomic, assign, readonly) HMEngineType engineType;

@property (nonatomic, nullable, copy, readonly) NSURL *url;

/// 注意不要在 delloc 方法内访问该属性，如需访问请使用 nativeNotifyCenter
@property (nonatomic, strong, readonly) HMBaseValue *notifyCenter;
@property (nonatomic, weak, readonly) HMNotifyCenter *nativeNotifyCenter;


@property (nonatomic, strong, readonly) id <HMBaseExecutorProtocol>context;

/// 注意不要在 delloc 方法内访问该属性，如需访问请使用 nativeComponentView
@property (nonatomic, nullable, strong, readonly) HMBaseValue *componentView;
@property (nonatomic, nullable, weak, readonly) UIView *nativeComponentView;

/**
 * 页面配置
 */
@property (nonatomic, nullable, copy) NSString *pageId;

@property (nonatomic, nullable, strong) NSDictionary *pageInfo;

@property (nonatomic, nullable, weak) UIView *rootView;

/**
 * executor call back
 */
@property (nonatomic, nullable, copy) void(^renderCompletion)(void);

@property (nonatomic, copy, nullable) void (^exceptionHandler)(HMExceptionModel *exception);

@property (nonatomic, copy, nullable) void (^consoleHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

+ (instancetype)contextInRootView:(nullable UIView *)rootView DEPRECATED_MSG_ATTRIBUTE("initWithNamespace:代替");

- (instancetype)initWithNamespace:(NSString *)namespace;

/// 灰度使用，后面可能移除，请使用 initWithNamespace:
- (instancetype)initWithEngineType:(HMEngineType)engineType namespace:(NSString *)namespace;

/**
 * 只能调用一次
 * @param javaScriptString 脚本字符串
 * @param fileName 文件名
 * @return JSValue
 */
- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)javaScriptString fileName:(nullable NSString *)fileName;


/**
 * 只能调用一次
 * @param javaScriptString 脚本字符串
 * @param fileName 文件名
 * @param hummerUrl 用于埋点，默认取值 fileName
 * @return JSValue
 */
- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)javaScriptString fileName:(nullable NSString *)fileName hummerUrl:(nullable NSString *)hummerUrl;


/// 根据 上下文 获取当前namespace，如果 当前不在 JS 执行上下文，或未设置 namespace，返回nil
+ (nullable NSString *)getCurrentNamespace;

/// 根据 上下文 获取当前namespace，如果 当前不在 JS 执行上下文，则返回默认 namespace
+ (NSString *)getCurrentNamespaceWithDefault;
NS_ASSUME_NONNULL_END

@end
