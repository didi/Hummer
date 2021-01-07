//
//  HMReporter.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMReporter.h"

#import <QuartzCore/QuartzCore.h>
#import "HMInterceptor.h"

@interface HMReporter ()

@property (nonatomic, assign) CFTimeInterval beginTime;
@property (nonatomic, assign) CFTimeInterval endTime;

@end

@implementation HMReporter

+ (void)reportPerformanceWithBlock:(void (^)(dispatch_block_t _Nonnull))excuteBlock
                            forKey:(NSString *)reportKey {
    if (!excuteBlock || reportKey.length == 0) { return; }
    CFTimeInterval beginTime = CACurrentMediaTime() * 1000;
    
    if (excuteBlock) {
        excuteBlock(^{
            CFTimeInterval endTime = CACurrentMediaTime() * 1000;
            
            CFTimeInterval diff = endTime - beginTime;
            if (diff > 0.f) {
                [HMInterceptor enumerateInterceptor:HMInterceptorTypeReporter
                                          withBlock:^(id <HMReporterProtocol> interceptor,
                                                      NSUInteger idx,
                                                      BOOL * _Nonnull stop) {
                    if ([interceptor respondsToSelector:@selector(handleJSPerformanceWithKey:info:)]) {
                        [interceptor handleJSPerformanceWithKey:reportKey
                                                           info:@{reportKey : @(diff)}];
                    }
                }];
            }
        });
    }
}

+ (void)reportValue:(id)value forKey:(NSString *)reportKey {
    [HMInterceptor enumerateInterceptor:HMInterceptorTypeReporter
                              withBlock:^(id <HMReporterProtocol> interceptor,
                                          NSUInteger idx,
                                          BOOL * _Nonnull stop) {
        if ([interceptor respondsToSelector:@selector(handleJSPerformanceWithKey:info:)]) {
            [interceptor handleJSPerformanceWithKey:reportKey
                                               info:@{reportKey : value}];
        }
    }];
}

@end
