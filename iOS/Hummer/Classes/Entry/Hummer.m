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
        [HMExportManager.sharedInstance loadAllExportedComponent];
        finishBlock ? finishBlock() : nil;
        NSUInteger jsClassCount = HMExportManager.sharedInstance.jsClasses.count;
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

+ (void)evaluateScript:(NSString *)jsScript
              fileName:(NSString *)fileName
            inRootView:(UIView *)rootView {
    HMJSContext *context = [HMJSContext contextInRootView:rootView];
    [context evaluateScript:jsScript fileName:fileName];
}

@end
