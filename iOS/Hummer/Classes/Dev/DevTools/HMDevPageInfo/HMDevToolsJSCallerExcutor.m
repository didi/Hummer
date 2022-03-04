//
//  HMDevToolsJSCallerExcutor.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsJSCallerExcutor.h"
#import "HMInterceptor.h"
#import <Hummer/HMDebug.h>

@interface HMDevToolsJSCallerExcutor ()<HMJSCallerProtocol>
@end

@implementation HMDevToolsJSCallerExcutor

#ifdef HMDEBUG
HM_EXPORT_INTERCEPTOR(HMDevToolsJSCallerExcutor)
#endif


- (void)callNativeWithClassName:(NSString *)className functionName:(NSString *)functionName objRef:(NSString *)objRef args:(NSArray *)args namespace:(NSString *)namespace {
    NSString *argStr = args.count == 0 ? @"()":args.description;

    !self.callerNativeInfo?:self.callerNativeInfo(className, functionName, objRef, argStr);
}

- (void)callJSWithClassName:(NSString *)className functionName:(NSString *)functionName objRef:(NSString *)objRef args:(NSArray *)args namespace:(NSString *)namespace {

    
    functionName = functionName.length == 0 ? @"callWithArgs":functionName;
    NSString *argStr = args.count == 0 ? @"()":args.description;

    !self.callerJSInfo?:self.callerJSInfo(className, functionName, objRef, argStr);
}

@end
