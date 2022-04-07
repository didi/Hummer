//
//  HMJSContext+HMDevTools.m
//  Hummer
//
//  Created by didi on 2022/3/7.
//

#import "HMJSContext+HMDevTools.h"
#import <objc/runtime.h>
@implementation HMJSContext (HMDevTools)

- (void)setHm_jsCallerInterceptor:(HMDevToolsJSCallerExecutor *)hm_jsCallerInterceptor {
    
    objc_setAssociatedObject(self, @selector(hm_jsCallerInterceptor), hm_jsCallerInterceptor, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (HMDevToolsJSCallerExecutor *)hm_jsCallerInterceptor {
    return objc_getAssociatedObject(self, _cmd);
}
@end
