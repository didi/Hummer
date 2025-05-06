//
//  HMNGJSContext.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/15.
//

#import <objc/runtime.h>
#if __has_include(<Hummer/HMJSExecutor.h>)
#import <Hummer/HMJSExecutor.h>
#endif
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
#import <HMDevTools/HMDevTools.h>
#endif
#endif
#import "HMJSCExecutor.h"
#import "HMJSContext.h"
#import "HMExportClass.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMInterceptor.h"
#import "HMBaseValue.h"
#import "HMExceptionModel.h"
#import "HMJSGlobal.h"
#import "HMConfigEntryManager.h"
#import "HMPluginManager.h"
#import "HMWebSocket.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"

#import <Hummer/HMDebug.h>
#import <Hummer/HMConfigEntryManager.h>
#import <Hummer/HMDevService.h>
#import "HMJSContext+PrivateVariables.h"
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

#ifdef HMDEBUG
API_AVAILABLE(ios(13.0))
#endif
@interface HMJSContext () 

@property (nonatomic, assign, readwrite) HMEngineType engineType;
@property (nonatomic, nullable, strong, readwrite) HMBaseValue *componentView;
@property (nonatomic, nullable, weak, readwrite) UIView *nativeComponentView;

@property (nonatomic, strong, readwrite) HMBaseValue *notifyCenter;
@property (nonatomic, weak, readwrite) HMNotifyCenter *nativeNotifyCenter;

@property (nonatomic, strong, readwrite) id <HMBaseExecutorProtocol>context;

@property (nonatomic, strong) NSMutableArray <dispatch_block_t>*destoryBlocks;

#ifdef HMDEBUG
@property (nonatomic, nullable, strong) HMDevLocalConnection *devConnection;


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

@implementation HMJSContext{
    struct timespec _createTimespec;
    struct timespec _firstEvalTimespec;
}

- (void)dealloc {
    
    [self.destoryBlocks enumerateObjectsUsingBlock:^(dispatch_block_t  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        obj();
    }];
    [self.nativeComponentView removeFromSuperview];
    HMLogDebug(@"HMJSContext 销毁");
#ifdef HMDEBUG
    [self.devConnection close];
#endif
    [self.webSocketSet enumerateObjectsUsingBlock:^(HMWebSocket * _Nonnull obj, BOOL * _Nonnull stop) {
        [obj close];
    }];
}
- (instancetype)initWithNamespace:(NSString *)namespace {
    return [self initWithEngineType:HMEngineTypeJSC namespace:namespace];
}
- (instancetype)initWithEngineType:(HMEngineType)engineType namespace:(NSString *)namespace {
    struct timespec createTimespec;
    HMClockGetTime(&createTimespec);
    self = [super init];
    if(self){
        _createTimespec = createTimespec;
        _engineType = engineType;
        _nameSpace = namespace;
        _destoryBlocks = [NSMutableArray new];
        if (_pageInfo == nil) {
            //兼容写法，自定义容器会把 pageInfo 注入到 HMJSGlobal 中。这里复制给 context。
            //把 pageInfo 和 context 绑定到一起。
            self.pageInfo = [[HMJSGlobal globalObject] pageInfo];
        }
        [self setup];
    }
    return self;
}

+ (instancetype)contextInRootView:(UIView *)rootView {
    HMJSContext *ctx = [[HMJSContext alloc] initWithEngineType:HMEngineTypeJSC namespace:nil];
    ctx.rootView = rootView;
    return ctx;
}

- (instancetype)init {
    return [[HMJSContext alloc] initWithEngineType:HMEngineTypeJSC namespace:nil];
}

#pragma mark <setup>
- (void)setup {
    [self setupExecutor];
    [[HMJSGlobal globalObject] weakReference:self];
    [self setupExecutorCallBack];
    [self injectBuiltInJS];
}
- (void)setupExecutor {
    if(self.engineType == HMEngineTypeNAPI){
        [self trySetupNAPIExecutor];
    }else{
        [self setupJSCExecutor];
    }
}
- (void)trySetupNAPIExecutor{
#if __has_include(<Hummer/HMJSExecutor.h>)
    _context = [[HMJSExecutor alloc] init];
#else
    [self setupJSCExecutor];
    HMLogDebug(@"启动 napi 引擎失败，请检查 pod 是否引入 napi subspec");
#endif
}

- (void)setupJSCExecutor{
    self.engineType = HMEngineTypeJSC;
    _context = [[HMJSCExecutor alloc] init];
}

- (void)injectBuiltInJS {
    NSBundle *frameworkBundle = [NSBundle bundleForClass:self.class];
    NSString *resourceBundlePath = [frameworkBundle pathForResource:@"Hummer" ofType:@"bundle"];
    NSAssert(resourceBundlePath.length > 0, @"Hummer.bundle 不存在");
    NSBundle *resourceBundle = [NSBundle bundleWithPath:resourceBundlePath];
    NSAssert(resourceBundle, @"Hummer.bundle 不存在");
    // TODO(唐佳诚): 修改文件名
    NSDataAsset *dataAsset = [[NSDataAsset alloc] initWithName:@"builtin" bundle:resourceBundle];
    NSAssert(dataAsset, @"builtin dataset 无法在 xcassets 中搜索到");
    NSString *jsString = [[NSString alloc] initWithData:dataAsset.data encoding:NSUTF8StringEncoding];
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
}
- (void)setupExecutorCallBack {
    __weak typeof(self) weakSelf = self;
    [_context addExceptionHandler:^(HMExceptionModel * _Nonnull exception) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (!strongSelf) {return;}
        [strongSelf handleException:exception];
    } key:self];
    
    
    [_context addConsoleHandler:^(NSString * _Nullable logString, HMLogLevel logLevel) {
        
        __strong typeof(weakSelf) strongSelf = weakSelf;
        [HMLoggerInterceptor handleJSLog:logString level:logLevel namespace:strongSelf.nameSpace];
        if (strongSelf.consoleHandler) {
            strongSelf.consoleHandler(logString, logLevel);
        }
#ifdef HMDEBUG
        [strongSelf handleConsoleToWS:logString level:logLevel];
#endif

    } key:self];
}

- (void)handleException:(HMExceptionModel *)exceptionModel {
    HMExceptionModel *exception = exceptionModel;
    NSDictionary<NSString *, NSObject *> *exceptionInfo = @{
        @"column": exception.column ?: @0,
        @"line": exception.line ?: @0,
        @"message": exception.message ?: @"",
        @"name": exception.name ?: @"",
        @"stack": exception.stack ?: @""
    };
#ifdef HMDEBUG
    //出现异常执行一次 console.error，抛给 vscode/hummer dev server
    HMBaseValue *console = self.context.globalObject[@"console"];
    NSString *errorString = _HMJSONStringWithObject(exceptionInfo);
    [console invokeMethod:@"error" withArguments:@[errorString?errorString:@"发生未知异常"]];
#endif
    HMLogError(@"%@", exceptionInfo);
    if (self.nameSpace) {
        // errorName -> message
        // errorcode -> type
        // errorMsg -> stack / type + message + stack
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackJavaScriptExceptionWithExceptionModel:exception pageUrl:self.hummerUrl ?: @""];
    }
    [HMReporterInterceptor handleJSException:exceptionInfo namespace:self.nameSpace];
    [HMReporterInterceptor handleJSException:exceptionInfo context:self namespace:self.nameSpace];
    if (self.exceptionHandler) {
        self.exceptionHandler(exception);
    }
}

#ifdef HMDEBUG
- (void)handleConsoleToWS:(NSString *)logString level:(HMLogLevel)logLevel {
    // 避免 "(null)" 情况
    NSString *jsonStr = _HMJSONStringWithObject(@{@"type":@"log",
                                        @"data":@{@"level":@(convertNativeLogLevel(logLevel)),
                                                  @"message":logString.length > 0 ? logString : @""}});
    if (jsonStr) {
        [self.devConnection sendMessage:jsonStr completionHandler:nil];
    }
}
#endif

#pragma mark <public>

- (HMBaseValue *)evaluateScript:(NSString *)javaScriptString fileName:(NSString *)fileName {
    return [self evaluateScript:javaScriptString fileName:fileName hummerUrl:fileName];
}

- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)javaScriptString fileName:(nullable NSString *)fileName hummerUrl:(nullable NSString *)hummerUrl {
    struct timespec beforeTimespec;
    HMClockGetTime(&beforeTimespec);
    
    if (!self.hummerUrl && hummerUrl.length > 0) {
        self.hummerUrl = hummerUrl;
        struct timespec timespec;
        HMClockGetTime(&timespec);
        _firstEvalTimespec = timespec;
        if (self.nameSpace) {
            [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPVWithPageUrl:hummerUrl ?: @""];
        }
    }
    
    // context 和 WebSocket 对应
    if (!self.url && fileName.length > 0) {
        self.url = [NSURL URLWithString:fileName];
#if __has_include(<Hummer/HMJSExecutor.h>)
        if ([self.context isKindOfClass:HMJSExecutor.class]) {
            [((HMJSExecutor *)self.context) enableDebuggerWithTitle:fileName];
        }
#endif
    }
#ifdef HMDEBUG
    self.devConnection = [[HMDevService sharedService] getLocalConnection:fileName];
    __weak typeof(self) weakSelf = self;
    self.devConnection.receiveHandler = ^(NSDictionary * _Nonnull msg) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        if (msg && [(NSString *)msg[@"type"] isEqualToString:@"ReloadBundle"]) {
            if (strongSelf.delegate && [strongSelf.delegate respondsToSelector:@selector(context:reloadBundle:)]) {
                [strongSelf.delegate context:strongSelf reloadBundle:msg[@"params"]];
            }
        }
        // reload
    };
#endif
    
    NSURL *url = nil;
    if (fileName.length > 0) {
        url = [NSURL URLWithString:fileName];
    }
    
    NSData *data = [javaScriptString dataUsingEncoding:NSUTF8StringEncoding];
    if (data && self.nameSpace) {
        // 不包括 \0
        // 单位 KB
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackJavaScriptBundleWithSize:@(data.length / 1024) pageUrl:self.hummerUrl ?: @""];
    }
    
    HMBaseValue *returnValue = [self.context evaluateScript:javaScriptString withSourceURL:url];
    
    BOOL isRenderSuccess = YES;
    // check did render
    if (!self.didCallRender) {
        isRenderSuccess = NO;
        NSError *err = [NSError errorWithDomain:HMJSContextErrorDomain code:HMJSContextErrorNotCallRender userInfo:@{NSLocalizedDescriptionKey : @"Hummer.render() function is not called"}];
        if ([self.delegate respondsToSelector:@selector(context:didRenderFailed:)]) {
            [self.delegate context:self didRenderFailed:err];
        }
    }else if(!self.componentView){
        isRenderSuccess = NO;
        NSError *err = [NSError errorWithDomain:HMJSContextErrorDomain code:HMJSContextErrorRenderWithInvalidArg userInfo:@{NSLocalizedDescriptionKey : @"Call Hummer.render() with invalid arg"}];
        if ([self.delegate respondsToSelector:@selector(context:didRenderFailed:)]) {
            [self.delegate context:self didRenderFailed:err];
        }
    }
    
    struct timespec afterTimespec;
    HMClockGetTime(&afterTimespec);
    struct timespec resultTimespec;
    HMDiffTime(&beforeTimespec, &afterTimespec, &resultTimespec);
    NSNumber *duration = @(resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000);
    if (self.nameSpace) {
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackEvaluationWithDuration:duration  pageUrl:self.hummerUrl ?: @""];
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPerformanceWithLabel:@"whiteScreenRate" localizableLabel:@"白屏率" numberValue:@(isRenderSuccess ? 0 : 100) unit:@"%" pageUrl:self.hummerUrl ?: @""];
        
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPerformanceJSEval:duration url:fileName pageUrl:self.hummerUrl ?: @""];
    }
    
    return returnValue;
}


#pragma mark <set>
- (void)setRootView:(UIView *)rootView {
    _rootView = rootView;
    rootView.hm_context = self;
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
    // 添加debug按钮
    // 尽早初始化 devtool，保证日志抓取时间。
    [HMDevTools showInContext:self];
#endif
#endif
}
- (void)setNameSpace:(NSString *)nameSpace {
    _nameSpace = nameSpace;
    [((HMNotifyCenter *)self.notifyCenter.toNativeObject) setNamespace:nameSpace];
}

#pragma mark <private>
- (void)_didRenderPage:(HMBaseValue *)page nativeView:(nonnull UIView *)view{
    
    self.componentView = page;
    [self.rootView addSubview:view];
    self.nativeComponentView = view;
    self.rootView.isHmLayoutEnabled = YES;
    [self.rootView hm_markDirty];
    if ([self.delegate respondsToSelector:@selector(context:didRenderPage:)]) {
        [self.delegate context:self didRenderPage:page];
    }
    if (self.renderCompletion) {
        self.renderCompletion();
    }
    [UIView hm_reSortFixedView:self];

    struct timespec renderTimespec;
    HMClockGetTime(&renderTimespec);
    struct timespec resultTimespec;
    HMDiffTime(&self->_createTimespec, &renderTimespec, &resultTimespec);
    if (self.nameSpace) {
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPageSuccessWithPageUrl:self.hummerUrl ?: @""];
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPageRenderCompletionWithDuration:@(resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000) pageUrl:self.hummerUrl ?: @""];
    }
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
    // 兼容部分以 controller.view 作为 rootView 的逻辑。如果后续存在 fixed，则不再考虑。
    // 推荐继承 HMViewConroller
    [HMDevTools showInContext:self];
#endif
#endif
}

+ (nullable NSString *)getCurrentNamespace {
    NSString *namespace = [[HMJSGlobal globalObject] currentContext:HMCurrentExecutor].nameSpace;
    return namespace;

}

/// 根据 上下文 获取当前namespace，如果 当前不在 JS 执行上下文，则返回默认 namespace
+ (NSString *)getCurrentNamespaceWithDefault {
    NSString *namespace = [self getCurrentNamespace];
    namespace = namespace ? namespace : HMDefaultNamespaceUnderline;
    return namespace;

}


- (void)_setNotifyCenter:(HMBaseValue *)notifyCenter nativeValue:(nonnull HMNotifyCenter *)nativeNotifyCenter{
    if(!self.notifyCenter){
        self.notifyCenter = notifyCenter;
        self.nativeNotifyCenter = nativeNotifyCenter;
    }
}

- (void)_addDestoryBlock:(dispatch_block_t)block {
    [self.destoryBlocks addObject:block];
}

+ (nullable HMJSContext *)getCurrentContext {
    return [[HMJSGlobal globalObject] currentContext:HMCurrentExecutor];
}

- (void)_postEvent:(NSString *)eventName data:(nullable NSDictionary *)eventData {
    
    if(eventName && [eventName isEqualToString:@"jsEvalFinished"]){
        struct timespec afterTimespec;
        HMClockGetTime(&afterTimespec);
        struct timespec resultTimespec;
        HMDiffTime(&self->_createTimespec, &afterTimespec, &resultTimespec);
        NSNumber *duration = @(resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000);
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPerformanceFCP:duration pageUrl:self.hummerUrl ?: @""];

        
        HMDiffTime(&self->_firstEvalTimespec, &afterTimespec, &resultTimespec);
        NSNumber *evalDuration = @(resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000);
        [HMConfigEntryManager.manager.configMap[self.nameSpace].trackEventPlugin trackPerformanceJSEvalTotal:evalDuration pageUrl:self.hummerUrl ?: @""];
    }
}

@end
