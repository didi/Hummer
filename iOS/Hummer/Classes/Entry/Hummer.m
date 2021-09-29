//
//  Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSGlobal.h"
#import "HMConfig.h"
#import "HMReporter.h"

@implementation Hummer



+ (void)startEngine:(void (^)(HMConfigEntry *))builder {
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
