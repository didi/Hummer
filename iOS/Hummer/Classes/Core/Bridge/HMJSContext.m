//
//  HMNGJSContext.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/15.
//

#import <objc/runtime.h>
#if __has_include("HMHermesExecutor.h")
#import "HMHermesExecutor.h"
#endif
#import "HMJSCExecutor.h"
#import "HMJSContext.h"
#import "HMExportClass.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMInterceptor.h"
#import "HMBaseValue.h"
#import "HMExceptionModel.h"
#import "HMBaseValue.h"
#import "HMJSGlobal.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMCLILogLevel) {
    HMCLILogLevelLog = 0,
    HMCLILogLevelDebug,
    HMCLILogLevelInfo,
    HMCLILogLevelWarn,
    HMCLILogLevelError
};

static inline HMCLILogLevel convertNativeLogLevel(HMLogLevel logLevel) {
    // T I W E F
    switch (logLevel) {
        case HMLogLevelTrace:
            return HMCLILogLevelDebug;
        case HMLogLevelInfo:
            return HMCLILogLevelLog;
        case HMLogLevelWarning:
            return HMCLILogLevelWarn;
        case HMLogLevelError:
            return HMCLILogLevelError;
            
        default:
            // 正常不会传递
            return HMCLILogLevelError;
    }
}

@interface UIView (HMJSContext)

@property (nonatomic, nullable, strong) HMJSContext *hm_context;

@end

#if defined(DEBUG)
API_AVAILABLE(ios(13.0))
#endif
@interface HMJSContext () // <NSURLSessionWebSocketDelegate>

@property (nonatomic, weak, nullable) UIView *rootView;

#if defined(DEBUG)
@property (nonatomic, nullable, strong) NSURLSessionWebSocketTask *webSocketTask;

- (void)handleWebSocket;

#endif

@end

NS_ASSUME_NONNULL_END

@implementation UIView (HMJSContext)
- (HMJSContext *)hm_context {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setHm_context:(HMJSContext *)hmContext {
    objc_setAssociatedObject(self, @selector(hm_context), hmContext, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end

@implementation HMJSContext

- (void)dealloc {
    NSObject *componentViewObject = self.componentView.toNativeObject;
    if ([componentViewObject isKindOfClass:UIView.class]) {
        [((UIView *) componentViewObject) removeFromSuperview];
    }
    HMLogDebug(@"HMJSContext 销毁");
#if defined(DEBUG)
    self.context.consoleHandler = nil;
    [self.webSocketTask cancel];
#endif
}

+ (instancetype)contextInRootView:(UIView *)rootView {
    rootView.hm_context = [[HMJSContext alloc] init];
    rootView.hm_context.rootView = rootView;
    return rootView.hm_context;
}

- (instancetype)init {
    self = [super init];
    NSBundle *frameworkBundle = [NSBundle bundleForClass:self.class];
    NSString *resourceBundlePath = [frameworkBundle pathForResource:@"Hummer" ofType:@"bundle"];
    NSAssert(resourceBundlePath.length > 0, @"Hummer.bundle 不存在");
    NSBundle *resourceBundle = [NSBundle bundleWithPath:resourceBundlePath];
    NSAssert(resourceBundle, @"Hummer.bundle 不存在");
    // TODO(唐佳诚): 修改文件名
    NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:@"builtin" bundle:resourceBundle];
    NSAssert(dataAsset, @"builtin dataset 无法在 xcassets 中搜索到");
    NSString *jsString = [[NSString alloc] initWithData:dataAsset.data encoding:NSUTF8StringEncoding];
    
//    _context = [[HMHermesExecutor alloc] init];
    _context = [[HMJSCExecutor alloc] init];
    [[HMJSGlobal globalObject] weakReference:self];
    __weak typeof(self) weakSelf = self;
    _context.exceptionHandler = ^(HMExceptionModel *exception) {
        NSArray<id<HMReporterProtocol>> *interceptors = [HMInterceptor interceptor:HMInterceptorTypeReporter];
        if (interceptors.count <= 0) {
            return;
        }
        NSDictionary<NSString *, NSObject *> *exceptionInfo = @{
                @"column": exception.column ?: @0,
                @"line": exception.line ?: @0,
                @"message": exception.message ?: @"",
                @"name": exception.name ?: @"",
                @"stack": exception.stack ?: @""
        };
        HMLogError(@"%@", exceptionInfo);
        [interceptors enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
            if ([obj respondsToSelector:@selector(handleJSException:)]) {
                [obj handleJSException:exceptionInfo];
                
                return;
            }
            typeof(weakSelf) strongSelf = weakSelf;
            if ([obj respondsToSelector:@selector(handleJSException:context:)]) {
                [obj handleJSException:exceptionInfo context:strongSelf];
            }
        }];
    };
    [_context evaluateScript:jsString withSourceURL:[NSURL URLWithString:@"https://www.didi.com/hummer/builtin.js"]];

    NSMutableDictionary *classes = [NSMutableDictionary new];
    // 可以使用模型替代字典，转 JSON，做缓存
    [HMExportManager.sharedInstance.jsClasses enumerateKeysAndObjectsUsingBlock:^(NSString *_Nonnull key, HMExportClass *_Nonnull obj, BOOL *_Nonnull stop) {
        NSMutableArray *methodPropertyArray = [NSMutableArray arrayWithCapacity:obj.classMethodPropertyList.count + obj.instanceMethodPropertyList.count];
        [obj.classMethodPropertyList enumerateKeysAndObjectsUsingBlock:^(NSString *_Nonnull key, HMExportBaseClass *_Nonnull obj, BOOL *_Nonnull stop) {
            [methodPropertyArray addObject:@{
                    @"nameString": obj.jsFieldName,
                    @"isClass": @YES,
                    @"isMethod": @([obj isKindOfClass:HMExportMethod.class])
            }];
        }];
        [obj.instanceMethodPropertyList enumerateKeysAndObjectsUsingBlock:^(NSString *_Nonnull key, HMExportBaseClass *_Nonnull obj, BOOL *_Nonnull stop) {
            [methodPropertyArray addObject:@{
                    @"nameString": obj.jsFieldName,
                    @"isClass": @NO,
                    @"isMethod": @([obj isKindOfClass:HMExportMethod.class])
            }];
        }];
        NSDictionary *class = @{
                @"methodPropertyList": methodPropertyArray,
                @"superClassName": obj.superClassReference.jsClass ?: @""
        };
        [classes setObject:class forKey:obj.jsClass];
    }];
    NSData *data = [NSJSONSerialization dataWithJSONObject:classes options:0 error:nil];
    NSString *classesStr = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    [_context evaluateScript:[NSString stringWithFormat:@"(function(){hummerLoadClass(%@)})()", classesStr] withSourceURL:[NSURL URLWithString:@"https://www.didi.com/hummer/classModelMap.js"]];

    return self;
}

#if defined(DEBUG)
- (void)handleWebSocket {
    if (@available(iOS 13, *)) {
        if (self.webSocketTask.state == NSURLSessionTaskStateCanceling || self.webSocketTask.state == NSURLSessionTaskStateCompleted) {
            self.context.consoleHandler = nil;
            self.webSocketTask = nil;
        }
    }
}
#endif

- (HMBaseValue *)evaluateScript:(NSString *)javaScriptString fileName:(NSString *)fileName {
    // context 和 WebSocket 对应
    BOOL needEnableDebugger = NO;
    if (!self.url && fileName.length > 0) {
        needEnableDebugger = YES;
        self.url = [NSURL URLWithString:fileName];
    }
    
#if defined(DEBUG)
    if (@available(iOS 13, *)) {
        if (!self.webSocketTask && fileName.length > 0) {
            NSURLComponents *urlComponents = [NSURLComponents componentsWithString:fileName];
            if ([urlComponents.scheme isEqualToString:@"http"]) {
                urlComponents.scheme = @"ws";
                urlComponents.user = nil;
                urlComponents.password = nil;
                urlComponents.path = nil;
                urlComponents.query = nil;
                urlComponents.fragment = nil;
                if (urlComponents.URL) {
                    self.webSocketTask = [NSURLSession.sharedSession webSocketTaskWithURL:urlComponents.URL];
                    // 启动
                    [self.webSocketTask resume];
                    __weak typeof(self) weakSelf = self;
                    self.context.consoleHandler = ^(NSString * _Nullable logString, HMLogLevel logLevel) {
                        typeof(weakSelf) strongSelf = weakSelf;
                        // 避免 "(null)" 情况
                        NSURLSessionWebSocketMessage *webSocketMessage = [[NSURLSessionWebSocketMessage alloc] initWithString:[NSString stringWithFormat:@"{type:\"log\",data:{level:%lu,message:\"%@\"}}", convertNativeLogLevel(logLevel), logString.length > 0 ? logString : @""]];
                        // 忽略错误
                        [strongSelf.webSocketTask sendMessage:webSocketMessage completionHandler:^(NSError * _Nullable error) {
                            typeof(weakSelf) strongSelf = weakSelf;
                            if (error) {
                                [strongSelf handleWebSocket];
                            }
                        }];
                    };
                    // 判断是否连通
                    [self.webSocketTask sendPingWithPongReceiveHandler:^(NSError * _Nullable error) {
                        typeof(weakSelf) strongSelf = weakSelf;
                        if (error) {
                            [strongSelf handleWebSocket];
                        }
                    }];
                }
            }
        }
    }
#endif

    NSURL *url = nil;
    if (fileName.length > 0) {
        url = [NSURL URLWithString:fileName];
    }
    return [self.context evaluateScript:javaScriptString withSourceURL:url];
}

@end
