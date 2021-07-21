//
//  HMDevToolsJSCallerExcutor.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsJSCallerExcutor.h"
#import "HMInterceptor.h"
#import <Hummer/HMDebug.h>

@interface HMDevToolsJSCallerExcutor ()<HMJSCallerIterceptor>

@end

@implementation HMDevToolsJSCallerExcutor

#ifdef HMDEBUG
HM_EXPORT_INTERCEPTOR(HMDevToolsJSCallerExcutor)
#endif

- (void)callWithTarget:(id)target selector:(SEL)selector {
    if (self.callerNativeInfo) {
        self.callerNativeInfo(target, selector);
    }
}

- (void)callWithJSClassName:(NSString *)className functionName:(NSString *)functionName {
    if (self.callerInfo) {
        self.callerInfo(className, functionName);
    }
}

@end
