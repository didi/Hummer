//
//  HMJSGlobal.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSGlobal.h"

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>

#import "HMExportManager.h"
#import "HMExportClass.h"
#import "HMExportMethod.h"

#import "JSValue+Hummer.h"
#import "HMInvocation.h"
#import "HMUtility.h"
#import "HMJSObject.h"
#import "NSObject+Hummer.h"
#import "HMConfig.h"
#import "UIView+HMDom.h"
#import "UIView+HMRenderObject.h"
#import "HMAnimationManager.h"


@interface HMJSGlobal ()

@property (nonatomic, strong) NSMapTable *contextGraph;
@property (nonatomic, strong) NSMutableDictionary *envParams;

@end

@implementation HMJSGlobal

@synthesize env = _env;
@synthesize notifyCenter = _notifyCenter;

- (instancetype)init {
    self = [super init];
    if (self) {
        NSPointerFunctionsOptions weakOption = NSPointerFunctionsWeakMemory |
                                               NSPointerFunctionsObjectPersonality;
        _contextGraph = [[NSMapTable alloc] initWithKeyOptions:weakOption
                                                  valueOptions:weakOption
                                                      capacity:0];
    }
    return self;
}

static HMJSGlobal *__globalObject = nil;

+ (instancetype)globalObject {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (__globalObject == nil) {
            __globalObject = [[self alloc] init];
        }
    });
    return __globalObject;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    @synchronized(self) {
        if (__globalObject == nil) {
            __globalObject = [super allocWithZone:zone];
        }
    }
    return __globalObject;
}

- (NSMutableDictionary *)envParams {
    if (!_envParams) {
        _envParams = [NSMutableDictionary dictionary];
        [_envParams addEntriesFromDictionary:[self getEnvironmentInfo]];
    }
    return _envParams;
}

- (NSDictionary *)getEnvironmentInfo {
    NSString *platform = @"iOS";
    NSString *sysVersion = [[UIDevice currentDevice] systemVersion] ?: @"";
    NSString *appVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: @"";
    NSString *appName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"] ?: @"";
    
    CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
    CGFloat screenHeight = [UIScreen mainScreen].bounds.size.height;
    
    CGFloat deviceWidth = MIN(screenWidth, screenHeight);
    NSString *widthString = [NSString stringWithFormat:@"%.0f", deviceWidth];
    CGFloat deviceHeight = MAX(screenWidth, screenHeight);
    NSString *heightString = [NSString stringWithFormat:@"%.0f", deviceHeight];
    CGFloat statusBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
    NSString *statusBarHeightString = [NSString stringWithFormat:@"%.0f", statusBarHeight];
    NSString *availableHeightString = [NSString stringWithFormat:@"%.0f", deviceHeight-statusBarHeight];
    CGFloat safeAreaBottom = 0.0;
    if (@available(iOS 11.0,*)) {
        safeAreaBottom = [[[UIApplication sharedApplication] delegate] window].safeAreaInsets.bottom > 0.0 ? 34.0 : 0.0;
    }
    NSString * safeAreaBottomString = [NSString stringWithFormat:@"%.0f", safeAreaBottom];
    CGFloat scale = [[UIScreen mainScreen] scale];
    return @{@"platform": platform,
             @"osVersion": sysVersion,
             @"appName": appName,
             @"appVersion": appVersion,
             @"deviceWidth": widthString,
             @"deviceHeight": heightString,
             @"availableWidth": widthString,
             @"availableHeight": availableHeightString,
             @"statusBarHeight":statusBarHeightString,
             @"safeAreaBottom":safeAreaBottomString,
             @"scale": @(scale)};
}

- (void)weakReference:(HMJSContext *)context {
    if (!context) { return; }
    [[HMJSGlobal globalObject].contextGraph setObject:context
                                               forKey:context.context];
}

- (HMJSContext *)currentContext:(JSContext *)context {
    if (!context) { return nil; }
    return [[HMJSGlobal globalObject].contextGraph objectForKey:context];
}

- (void)addGlobalEnviroment:(NSDictionary *)params {
    if (!params) return;
    
    [self.envParams addEntriesFromDictionary:params];
}

#pragma mark - HMGlobalExport

- (void)setNotifyCenter:(JSValue *)notifyCenter {
    HMJSContext *context = [self currentContext:notifyCenter.context];
    if (!context.notifyManagedValue) {
        context.notifyManagedValue = [JSManagedValue managedValueWithValue:notifyCenter];
    }
}

- (JSValue *)getNofityCenter {
    HMJSContext *context = [self currentContext:[JSContext currentContext]];
    return context.notifyManagedValue.value;
}

- (JSValue *)render:(JSValue *)page {
    UIView *view = [page hm_toObjCObject];
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:page.context];
    [context.rootView addSubview:view];
    [context.rootView hm_configureLayoutWithBlock:nil];
    [context.rootView hm_markDirty];
    if ([context.delegate respondsToSelector:@selector(context:didRenderPage:)]) {
        [context.delegate context:context didRenderPage:page];
    }
    return page;
}

- (void)setBasicWidth:(JSValue *)basicWidth {
    NSString *widthString = basicWidth.toString;
    CGFloat width = [widthString floatValue];
    [HMConfig sharedInstance].pixel = width;
}

- (JSValue *)callFunc:(JSValue *)cls
               method:(JSValue *)method
            arguments:(JSValue *)arguments {
    NSString *jsClass = [cls hm_toObjCObject];
    NSString *funcName = [method hm_toObjCObject];
    HMExportClass *exportClass = [[HMExportManager sharedInstance] exportClassForJS:jsClass];
    Class target = NSClassFromString(exportClass.className);
    HMExportMethod *exportMethod = [exportClass methodForFuncName:funcName];
    if (!target || !exportMethod.selector) {
        HMLogError(@"Objective-c class [%@] can't response sel [%@]", target,exportMethod.selector);
        return nil;
    }
    JSContext *context= cls.context;
    NSUInteger argsCount = [arguments toArray].count;
    NSMutableArray *mArgs = NSMutableArray.new;
    for (NSUInteger index = 0; index < argsCount; index++) {
        [mArgs addObject:[arguments valueAtIndex:index]];
    }
    HMInvocation *executor = [[HMInvocation alloc] initWithTarget:target];
    [executor setSelecor:exportMethod.selector];
    [executor setArguments:mArgs.copy];
    id retValue = [executor invokeAndReturn];
    if ([retValue isKindOfClass:[JSValue class]]) { return (JSValue *)retValue; }
    return [JSValue valueWithObject:retValue inContext:context];
}

- (NSDictionary *)env {
    return self.envParams;
}

@end
