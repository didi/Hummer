//
//  HMDevToolsJSCallerExecutor.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsJSCallerExecutor.h"
#import <Hummer/HMDebug.h>
#import <Hummer/NSObject+HMDescription.h>

@interface HMDevToolsJSCallerExecutor ()
@end

@implementation HMDevToolsJSCallerExecutor


- (void)callNativeWithClassName:(NSString *)className functionName:(NSString *)functionName objRef:(NSString *)objRef args:(NSArray *)args  namespace:(NSString *)namespace {
    NSString *argStr = args.count == 0 ? @"()":[args hm_devDescription];
    !self.callerNativeInfo?:self.callerNativeInfo(className, functionName, objRef, argStr);
}

- (void)callJSWithClassName:(NSString *)className functionName:(NSString *)functionName objRef:(NSString *)objRef args:(NSArray *)args namespace:(NSString *)namespace {

    className = className.length == 0 ? @"anonymous":className;
    functionName = functionName.length == 0 ? @"":functionName;
    NSString *argStr = args.count == 0 ? @"()":[args hm_devDescription];

    !self.callerJSInfo?:self.callerJSInfo(className, functionName, objRef, argStr);
}

@end
