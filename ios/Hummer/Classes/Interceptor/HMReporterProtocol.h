//
//  HMReporterProtocol.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

static NSString * const HMExportClasses = @"hummer_load_class";
static NSString * const HMExportClassesCount = @"hummer_export_count";
static NSString * const HMContextInit = @"hummer_context_init";
static NSString * const HMInnerScriptExecute = @"hummer_inner_execute";

@class HMJSContext;

@protocol HMReporterProtocol <NSObject>
@optional

- (void)handleJSException:(NSDictionary *)exception;
- (void)handleJSException:(NSDictionary *)exception context:(HMJSContext *)context;
- (void)handleJSPerformanceWithKey:(NSString *)key info:(NSDictionary *)info;

@end

NS_ASSUME_NONNULL_END
