//
//  Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSGlobal.h"
#import "HMConfig.h"
#import "HMReporter.h"
#import <Hummer/HMPluginManager.h>

@implementation Hummer



+ (void)startEngine:(void (^)(HMConfigEntry *))builder {
    struct timespec beforeTimespec;
    HMClockGetTime(&beforeTimespec);

    // 兼容代码
    [HMInterceptor loadExportInterceptor];
    
    HMConfigEntry *entry = nil;
    if (builder) {
        entry = [HMConfigEntry new];
        builder(entry);
        [[HMConfigEntryManager manager] addConfig:entry];
    }
    
    [HMReporter reportPerformanceWithBlock:^(dispatch_block_t  _Nonnull finishBlock) {
        [HMExportManager.sharedInstance loadAllExportedComponent];
        finishBlock ? finishBlock() : nil;
        NSUInteger jsClassCount = HMExportManager.sharedInstance.jsClasses.count;
        [HMReporter reportValue:@(jsClassCount) forKey:HMExportClassesCount namespace:entry.namespace];
    } forKey:HMExportClasses namespace:entry.namespace];
    
    struct timespec afterTimespec;
    HMClockGetTime(&afterTimespec);
    struct timespec resultTimespec;
    HMDiffTime(&beforeTimespec, &afterTimespec, &resultTimespec);

    [entry.trackEventPlugin trackEngineInitializationWithDuration:@(resultTimespec.tv_sec * 1000 + resultTimespec.tv_nsec / 1000000)];
}

+ (void)addGlobalEnvironment:(NSDictionary *)params {
    [[HMJSGlobal globalObject] addGlobalEnviroment:params];
}

+ (void)evaluateScript:(NSString *)jsScript
              fileName:(NSString *)fileName
            inRootView:(UIView *)rootView {
    HMJSContext *context = [HMJSContext contextInRootView:rootView];
    [context evaluateScript:jsScript fileName:fileName];
}

@end
