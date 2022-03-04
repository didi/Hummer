//
//  HMInterceptor.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HMLogger.h"
#import "HMLoggerProtocol.h"
#import "HMNetworkProtocol.h"
#import "HMWebImageProtocol.h"
#import "HMReporterProtocol.h"
#import "HMRouterProtocol.h"
#import "HMImageProtocol.h"
#import "HMJSCallerProtocol.h"

#import "HMEventTrackProtocol.h"

NS_ASSUME_NONNULL_BEGIN

#define HM_EXPORT_INTERCEPTOR(name) \
__attribute__((used, section("__DATA , hm_interceptor"))) \
static char *__hm_export_interceptor_##name##__ = ""#name"";

typedef NS_ENUM(NSUInteger, HMInterceptorType) {
    HMInterceptorTypeLog,
    HMInterceptorTypeNetwork,
    HMInterceptorTypeWebImage,
    HMInterceptorTypeReporter,
    HMInterceptorTypeRouter,
    HMInterceptorTypeImage,
    HMInterceptorTypeEventTrack,
    HMInterceptorTypeJSLoad,
    HMInterceptorTypeJSCaller
};

DEPRECATED_MSG_ATTRIBUTE("HMInterceptor is deprecated. Use HMConfigEntryManager instead")
@interface HMInterceptor : NSObject

+ (void)loadExportInterceptor;

+ (nullable NSArray *)interceptors;

+ (nullable NSArray <__kindof id <NSObject>> *)interceptor:(HMInterceptorType)type;

+ (BOOL)hasInterceptor:(HMInterceptorType)type;

+ (void)enumerateInterceptor:(HMInterceptorType)type
                   withBlock:(void(^)(id interceptor,
                                      NSUInteger idx,
                                      BOOL * _Nonnull stop))block;

@end

NS_ASSUME_NONNULL_END
