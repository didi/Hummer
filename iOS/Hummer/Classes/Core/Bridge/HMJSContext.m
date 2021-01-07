//
//  HMJSContext.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//


#import <JavaScriptCore/JavaScriptCore.h>

#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMExportClass.h"
#import "HMUtility.h"
#import "HMClassManager.h"
#import "HMExportMethod.h"
#import "HMJSClass.h"
#import "HMJSBuiltin.h"
#import "HMJSObject.h"
#import "HMJSGlobal.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"
#import <objc/runtime.h>
#import "HMInterceptor.h"
#import "HMReporter.h"
#import "HMTimer.h"

#if DEBUG
JS_EXPORT void JSSynchronousGarbageCollectForDebugging(JSContextRef ctx);
#endif

@interface UIView (RootView)

- (HMJSContext *)hm_getContext;
- (void)hm_setContext:(HMJSContext *)context;

@end

@implementation UIView (RootView)

- (HMJSContext *)hm_getContext {
    return objc_getAssociatedObject(self, @selector(hm_setContext:));
}

- (void)hm_setContext:(HMJSContext *)context {
    objc_setAssociatedObject(self,
                             @selector(hm_setContext:),
                             context,
                             OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end

@interface HMJSContext()

@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) NSMutableArray <JSValue *> *ownedJSValues;
@property (nonatomic, weak, readwrite) UIView *rootView;
@property (nonatomic, strong) NSMutableString *globalScript;

@end

@implementation HMJSContext

- (void)dealloc {
    /// JSGarbageCollect should not synchronously call collectAllGarbage(). Instead, it should notify the GCActivityCallback
    /// that it has abandoned an object graph, which will set the timer to run at some point in the future that JSC can decide
    /// according to its own policies.
    [self releaseAllValues];
    
#if DEBUG
    JSSynchronousGarbageCollectForDebugging(self.context.JSGlobalContextRef);
#endif
    
    JSGarbageCollect(self.context.JSGlobalContextRef);
    HMLogDebug(@"----- >>> HMJSContext [%@] dealloc", self);
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _context = [[JSContext alloc] init];
        [[HMJSGlobal globalObject] weakReference:self];
        _ownedJSValues = [[NSMutableArray alloc] init];
        [self setupJSContext];
    }
    return self;
}

- (instancetype)initWithPageID:(NSString *)pageID {
    self = [super init];
    if (self) {
        _context = [[JSContext alloc] init];
        [[HMJSGlobal globalObject] weakReference:self];
        _ownedJSValues = [[NSMutableArray alloc] init];
        self.pageID = pageID;
        [self setupJSContext];
    }
    return self;
}

+ (instancetype)contextInRootView:(UIView *)rootView {
    if (!rootView || ![rootView isKindOfClass:[UIView class]]) { return nil; }
    HMJSContext *context = HMJSContext.new; [rootView hm_setContext:context];
    context.rootView = rootView;
    return context;
}

+ (instancetype)contextInRootView:(UIView *)rootView
                           pageID:(NSString *)pageID {
    if (!rootView || ![rootView isKindOfClass:[UIView class]]) { return nil; }
    HMJSContext *context = [[HMJSContext alloc] initWithPageID:pageID];
    [rootView hm_setContext:context];
    context.rootView = rootView;
    return context;
}

- (void)registerJSClasses {
    HMExportManager *manager = [HMExportManager sharedInstance];
    NSArray *jsClasses = [manager allExportJSClasses];
    
    [self registerJSContext:jsClasses];
    
    __weak typeof(self)weakSelf = self;
    [HMReporter reportPerformanceWithBlock:^(dispatch_block_t  _Nonnull finishBlock) {
        [weakSelf registerJSScript:jsClasses];
        if (finishBlock) { finishBlock(); }
    } forKey:HMInnerScriptExecute];
}

- (void)registerJSContext:(NSArray *)jsClasses {
    if (!jsClasses || jsClasses.count <= 0) return;
    
    for (NSString *jsClass in jsClasses) {
        __weak typeof(self) weakSelf = self;
        self.context[OBJC_JSClass(jsClass)] = ^() {
            return [weakSelf JSObjectForClass:jsClass
                                   forContext:[JSContext currentContext]];
        };
    }
    
    self.context[@"Hummer"] = [HMJSGlobal globalObject];
}

- (void)registerJSScript:(NSArray *)jsClasses {
    NSMutableString *jsScript = [NSMutableString string];
    [jsScript appendFormat:@"%@\n", HMBuiltinBaseJSScript];
    
    NSMutableDictionary *classMethods = [self allClassesMethods:jsClasses];
    NSString *jsonString = HMJSONEncode(classMethods);
    [jsScript appendFormat:@"HMJSUtility.initGlobalEnv(%@);\n", jsonString];
    
    [self addGlobalScript:@"Hummer.notifyCenter = new NotifyCenter();"];
    
    [self addGlobalScript:HMBuiltinMemoryJSScript];
    
    if (self.globalScript.length > 0) {
        [jsScript appendString:self.globalScript];
    }
    [self evaluateScript:jsScript fileName:@"hummer.js"];
}

- (NSMutableDictionary *)allClassesMethods:(NSArray *)jsClasses {
    NSMutableDictionary *classMethods = [NSMutableDictionary dictionary];
    for (NSString *jsClass in jsClasses) {
        NSMutableArray *staticMethods = classMethods[jsClass];
        if (!staticMethods) {
            staticMethods = [NSMutableArray array];
            classMethods[jsClass] = staticMethods;
        }
        HMExportClass *export = [[HMExportManager sharedInstance] exportClassForJS:jsClass];
        NSArray *methods = [export allExportMethodList];
        for (NSString *methodName in methods) {
            HMExportMethod *method = [export methodForFuncName:methodName];
            if (method.methodType == HMClassMethod) {
                [staticMethods addObject:method.funcName];
            }
        }
    }
    return classMethods;
}

- (void)setupJSContext {
    [self setupJSLogger];
    [self setupTimer];
    __weak typeof(self) weakSelf = self;
    self.context.exceptionHandler = ^(JSContext *context, JSValue *exception) {
        HMLogError(@"%@", [exception description]);
        [weakSelf reportException:exception context:context];
    };

    [HMReporter reportPerformanceWithBlock:^(dispatch_block_t  _Nonnull finishBlock) {
        [weakSelf registerJSClasses];
        if (finishBlock) { finishBlock(); }
    } forKey:HMContextInit];
}

- (NSDictionary *)exceptionInfoForException:(JSValue *)exception {
    // @reference:
    // Error objects are thrown when runtime errors occur.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    //
    NSString *stackString = [[exception objectForKeyedSubscript:@"stack"] toString] ? : @"null stack";
    NSString *name = [[exception objectForKeyedSubscript:@"name"] toString] ? : @"unknown";
    NSNumber *line = [[exception objectForKeyedSubscript:@"line"] toNumber] ? : @(-1);
    NSNumber *column = [[exception objectForKeyedSubscript:@"column"] toNumber] ? : @(-1);
    NSString *description = [exception description] ? : @"null message";

    NSString *pageId = self.pageID ? self.pageID : @"";
    if (0 == pageId.length) {
        pageId = self.url.path.lastPathComponent ? self.url.path.lastPathComponent : @"";
    }
    
    NSDictionary *exceptionInfo = @{@"stack": stackString,
                                    @"name": name,
                                    @"line": line,
                                    @"column": column,
                                    @"description": description,
                                    @"pageId": pageId
                                    };
    return exceptionInfo;
}

- (void)reportException:(JSValue *)exception context:(JSContext *)context {
    HMJSContext *ctx = [HMJSGlobal.globalObject currentContext:context];
    NSDictionary *exceptionInfo = [self exceptionInfoForException:exception];
    NSArray *interceptors = [HMInterceptor interceptor:HMInterceptorTypeReporter];
    if (interceptors.count <= 0) {
        return;
    }
    for (id <HMReporterProtocol> interceptor in interceptors) {
        if ([interceptor respondsToSelector:@selector(handleJSException:)]) {
            [interceptor handleJSException:exceptionInfo];
        }
        if ([interceptor respondsToSelector:@selector(handleJSException:context:)]) {
            [interceptor handleJSException:exceptionInfo context:ctx];
        }
    }
}

- (void)setupTimer {
    self.context[@"setInterval"] = ^(JSValue * callFn,CFTimeInterval interval) {
        [[[HMJSGlobal globalObject] currentContext:callFn.context] retainedValue:callFn];
        __weak typeof(callFn) weakCallFn = callFn;
        HMTimer * timer = [HMTimer new];
        [timer setCallback:^id(NSArray *args) {
            JSValue * value = [weakCallFn callWithArguments:args];
            return value.isUndefined ? nil : value;
        } interval:interval];
        return [JSValue valueWithObject:timer inContext:callFn.context];
    };
    self.context[@"clearInterval"] = ^(JSValue * timer){
        if (!timer) {
            return ;
        }
        id t = [timer toObject];
        if ([t isKindOfClass:HMTimer.class]) {
            [((HMTimer *) t) clearInterval];
        }
    };
    self.context[@"setTimeout"] = ^(JSValue * callFn,CFTimeInterval timeout){
        [[[HMJSGlobal globalObject] currentContext:callFn.context] retainedValue:callFn];
        __weak typeof(callFn) weakCallFn = callFn;
        HMTimer * timer = [HMTimer new];
        [timer setCallback:^id(NSArray *args) {
            JSValue * value = [weakCallFn callWithArguments:args];
            [[[HMJSGlobal globalObject]currentContext:weakCallFn.context] removeValue:weakCallFn];
            return value.isUndefined ? nil : value;
        } timeout:timeout];
        return [JSValue valueWithObject:timer inContext:callFn.context];
    };
    self.context[@"clearTimeout"] = ^(JSValue * timer){
        if (!timer || timer.isNull) {
            return ;
        }
        HMTimer * t = (HMTimer *)[timer toObject];
        if (t && [t isKindOfClass:HMTimer.class]) {
            [t clearTimeout];
        }
    };
}

- (void)setupJSLogger {
    NSDictionary *info = @{@(HMLogLevelDebug)   : @"log",
                           @(HMLogLevelInfo)    : @"info",
                           @(HMLogLevelWarning) : @"warn",
                           @(HMLogLevelError)   : @"error",
                           @(HMLogLevelTrace)   : @"trace"};
    for (NSNumber *level in info.allKeys) {
        self.context[@"console"][info[level]] = ^(){
            NSArray *args = [JSContext currentArguments];
            NSMutableString *string = [NSMutableString string];
            for (JSValue *value in args) {
                [string appendString:[value toString]];
            }
            [HMLogger printJSLog:string level:[level integerValue]];
        };
    }
}

- (NSMutableString *)globalScript {
    if (!_globalScript) {
        _globalScript = [NSMutableString new];
    }
    return _globalScript;
}

- (JSValue *)JSObjectForClass:(NSString *)className
                   forContext:(JSContext *)context {
    if (!className || !context) return nil;

    JSContextRef contextRef = [[JSContext currentContext] JSGlobalContextRef];
    
    HMExportClass *exportClass = [[HMExportManager sharedInstance] exportClassForJS:className];
    HMJSClass *jsClass = [[HMClassManager defaultManager] createJSClass:className];
    
    Class clazz = NSClassFromString(exportClass.className);
    if (!clazz || ![clazz conformsToProtocol:@protocol(HMJSObject)]) {
        HMLogError(@"Export class [%@] can not be found", exportClass.className);
        return [JSValue valueWithJSValueRef:JSValueMakeUndefined(contextRef) inContext:context];
    }
    
    NSObject *OCObject = [[clazz alloc] initWithHMValues:[JSContext currentArguments]];
    JSObjectRef objectRef = JSObjectMake(contextRef, [jsClass classRef], (__bridge void *)(OCObject));
        
    return [JSValue valueWithJSValueRef:objectRef inContext:context];
}

- (JSValue *)evaluateScript:(NSString *)jsScript fileName:(NSString *)fileName {
    jsScript = [jsScript stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
    if (!jsScript) return nil;
    if (!fileName) {
        static NSInteger fileIndex = 0; fileIndex++;
        fileName = [NSMutableString stringWithFormat:@"Hummer%ld", (long)fileIndex];
    }
    NSURL *sourceURL = [[NSURL alloc] initWithString:fileName];
    if (sourceURL.scheme.length > 0) {
        self.url = sourceURL;
    }
    return [self.context evaluateScript:jsScript withSourceURL:sourceURL];
}

- (void)retainedValue:(JSValue *)value {
    if (value && ![self.ownedJSValues containsObject:value]) {
        [self.ownedJSValues addObject:value];
    }
}

- (void)removeValue:(JSValue *)value {
    if (value && [self.ownedJSValues containsObject:value]) {
        [self.ownedJSValues removeObject:value];
    }
}

- (void)releaseAllValues {
    @autoreleasepool {
        NSArray *allValues = [self allValues];
        for (NSInteger index = 0; index < allValues.count; index++) {
            [[allValues[index] hm_toObjCObject] hm_callJSFinalize];
        }
        [self.ownedJSValues removeAllObjects];
    }
}

- (NSArray <JSValue *> *)allValues {
    return self.ownedJSValues.copy;
}

- (void)addGlobalScript:(NSString *)script {
    if (script.length > 0) {
        [self.globalScript appendFormat:@"\n%@", script];
    }
}

@end
