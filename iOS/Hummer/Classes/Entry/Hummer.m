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

+ (void)startEngine:(void (^)(id<HMConfigBuilder>))builder {
    [HMInterceptor loadExportInterceptor];
    
    [HMReporter reportPerformanceWithBlock:^(dispatch_block_t  _Nonnull finishBlock) {
        [[HMExportManager sharedInstance] loadExportClasses];
        if (finishBlock) { finishBlock(); }
        
        NSUInteger jsClassCount = [[HMExportManager sharedInstance] allExportJSClasses].count;
        [HMReporter reportValue:@(jsClassCount) forKey:HMExportClassesCount];
    } forKey:HMExportClasses];
    
    if (builder) {
        HMConfig *config = [HMConfig sharedInstance];
        builder(config);
    }
}

+ (void)addGlobalEnvironment:(NSDictionary *)params {
    [[HMJSGlobal globalObject] addGlobalEnviroment:params];
}

+ (void)addGlobalScript:(NSString *)script
             inRootView:(nonnull UIView *)rootView {
    HMJSContext *context = [HMJSContext contextInRootView:rootView];
    [context addGlobalScript:script];
}

+ (void)evaluateScript:(NSString *)jsScript
              fileName:(NSString *)fileName
            inRootView:(UIView *)rootView {
    HMJSContext *context = [HMJSContext contextInRootView:rootView];
    [context evaluateScript:jsScript fileName:fileName];
}

+ (void)evaluateScript:(NSString *)jsScript
              fileName:(NSString *)fileName
                pageID:(NSString *)pageID
            inRootView:(UIView *)rootView {
    
    HMJSContext *context = [HMJSContext contextInRootView:rootView
                                                   pageID:pageID];
    [context evaluateScript:jsScript
                   fileName:fileName];
}

@end
