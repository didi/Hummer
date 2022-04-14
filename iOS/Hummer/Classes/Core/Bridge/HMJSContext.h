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
@interface HMJSContext : NSObject {
@public
    struct timespec _createTimespec;
}

@property (nonatomic, weak) id <HMJSContextDelegate> delegate;

@property (nonatomic, nullable, copy) NSSet<HMWebSocket *> *webSocketSet;

/**
 * 设置自身业务线的命名空间
 * 当 Hummer 查找插件时，或者 Navigator 模块查找注册的构造器时，会采用该命名空间作为唯一标示
 * 当该值为空时，Hummer 会忽略上下文，保持原先的处理逻辑
 */
@property (nonatomic, copy, nullable) NSString *nameSpace;

@property (nonatomic, nullable, copy) NSString *pageId;

@property (nonatomic, nullable, strong) NSDictionary *pageInfo;
/**
 * 只读
 */
@property (nonatomic, nullable, copy) NSURL *url;

@property (nonatomic, nullable, copy) NSString *hummerUrl;

@property (nonatomic, nullable, strong) HMNotifyCenter *notifyCenter;

@property (nonatomic, strong, readonly) id <HMBaseExecutorProtocol>context;

@property (nonatomic, weak, readonly, nullable) UIView *rootView;

@property (nonatomic, nullable, strong) HMBaseValue *componentView;

@property (nonatomic, nullable, copy) void(^renderCompletion)(void);


/**
 * executor call back
 */
@property (nonatomic, copy, nullable) void (^exceptionHandler)(HMExceptionModel *exception);

@property (nonatomic, copy, nullable) void (^consoleHandler)(NSString *_Nullable logString, HMLogLevel logLevel);

+ (instancetype)contextInRootView:(nullable UIView *)rootView;

/**
 * 只能调用一次
 * @param javaScriptString 脚本字符串
 * @param fileName 文件名
 * @return JSValue
 */
- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)javaScriptString fileName:(nullable NSString *)fileName;

- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)javaScriptString fileName:(nullable NSString *)fileName hummerUrl:(nullable NSString *)hummerUrl;

NS_ASSUME_NONNULL_END

@end
