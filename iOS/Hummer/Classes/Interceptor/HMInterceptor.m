//
//  HMInterceptor.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMInterceptor.h"
#import <dlfcn.h>
#import <mach-o/getsect.h>

@interface HMInterceptor()

@property (nonatomic, strong) NSMutableDictionary *interceptorMap;
@property (nonatomic, copy) NSDictionary *protocolMap;

@end

@implementation HMInterceptor

- (instancetype)init {
    self = [super init];
    if (self) {
        self.protocolMap = @{
            @(HMInterceptorTypeLog)           : @protocol(HMLoggerProtocol),
            @(HMInterceptorTypeNetwork)       : @protocol(HMRequestProtocol),
            @(HMInterceptorTypeWebImage)      : @protocol(HMWebImageProtocol),
            @(HMInterceptorTypeReporter)      : @protocol(HMReporterProtocol),
            @(HMInterceptorTypeRouter)        : @protocol(HMRouterProtocol),
            @(HMInterceptorTypeImage)         : @protocol(HMImageProtocol),
            @(HMInterceptorTypeEventTrack)    : @protocol(HMEventTrackProtocol),
            @(HMInterceptorTypeJSCaller)      : @protocol(HMJSCallerProtocol),
        };
        self.interceptorMap = [self _initializeInterceptorMapWithType:_protocolMap.allKeys];
    }
    return self;
}

- (NSMutableDictionary *)_initializeInterceptorMapWithType:(NSArray *)types {
    NSMutableDictionary *__all = NSMutableDictionary.new;
    for (NSNumber *typeNumber in types) {
        HMInterceptorType type = [typeNumber integerValue];
        __all[@(type)] = NSMutableArray.new;
    }
    return __all;
}

static HMInterceptor *__interceptors;

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        __interceptors = [[HMInterceptor alloc] init];
    });
    return __interceptors;
}

+ (void)loadExportInterceptor {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Dl_info info;
        dladdr(&__interceptors, &info);
        
#ifndef __LP64__
        const struct mach_header *mhp = (struct mach_header*)info.dli_fbase;
        unsigned long size = 0;
        uint32_t *memory = (uint32_t*)getsectiondata(mhp, "__DATA", "hm_interceptor", & size);
#else /* defined(__LP64__) */
        const struct mach_header_64 *mhp = (struct mach_header_64*)info.dli_fbase;
        unsigned long size = 0;
        uint64_t *memory = (uint64_t*)getsectiondata(mhp, "__DATA", "hm_interceptor", & size);
#endif /* defined(__LP64__) */
        
        for(int idx = 0; idx < size/sizeof(void*); ++idx){
            char *string = (char*)memory[idx];
            NSString *str = [NSString stringWithUTF8String:string];
            [[HMInterceptor sharedInstance] _addLogInterceptorWithClass:NSClassFromString(str)];
        }
    });
}

- (void)_addLogInterceptorWithClass:(Class)cls {
    if (!cls) { return; }
    NSArray *protocolKeys = self.protocolMap.allKeys;
    for (NSNumber *typeNumber in protocolKeys) {
        Protocol *protocol = [self.protocolMap objectForKey:typeNumber];
        if ([cls conformsToProtocol:protocol]) {
            NSMutableArray *logInterceptors = self.interceptorMap[typeNumber];
            id instance = [[cls alloc] init];
            [logInterceptors addObject:instance];
        }
    }
}

+ (NSArray *)interceptors {
    NSArray *allKeys = [HMInterceptor sharedInstance].interceptorMap.allKeys;
    NSMutableArray *interceptorMap = NSMutableArray.new;
    for (NSString *key in allKeys) {
        NSArray *interceptors = [HMInterceptor sharedInstance].interceptorMap[key];
        [interceptorMap addObjectsFromArray:interceptors];
    }
    
    return interceptorMap.copy;
}

+ (nullable NSArray <id <NSObject>> *)interceptor:(HMInterceptorType)type {
    return [HMInterceptor sharedInstance].interceptorMap[@(type)];
}

+ (BOOL)hasInterceptor:(HMInterceptorType)type {
    NSArray *interceptors = [HMInterceptor interceptor:type];
    return (interceptors.count > 0);
}

+ (void)enumerateInterceptor:(HMInterceptorType)type
                   withBlock:(void(^)(id interceptor,
                                      NSUInteger idx,
                                      BOOL * _Nonnull stop))block {
    NSArray *interceptors = [HMInterceptor interceptor:type];
    if (interceptors.count > 0) {
        [interceptors enumerateObjectsUsingBlock:block];
    }
}

@end
