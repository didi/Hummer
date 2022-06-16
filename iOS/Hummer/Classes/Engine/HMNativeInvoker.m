//
//  HMNativeInvoker.m
//  Hummer
//
//  Created by didi on 2022/4/1.
//

#import "HMNativeInvoker.h"
#import "HMExportClass.h"
#import "HMLogger.h"
#import <objc/runtime.h>

@implementation HMNativeInvoker

/**
 *           if (isOfType<HummerBase>(this, '_private')) {
 return globalThis.hummerCall(this._private, jsClassName, methodPropertyModel.nameString, ...args)
} else {
 return globalThis.hummerCall(jsClassName, methodPropertyModel.nameString, ...args)
}
 */
+ (nullable HMBaseValue *)invoke:(HMNativeCallInfo)info {
    
    HMExportClass *export = info.exportCls;
    NSString *funcName = info.functionName;
    NSArray *args = info.args;
    id <HMBaseExecutorProtocol> executor = info.executor;
    id target = info.target;
    
    
    return nil;
}


+ (nullable HMBaseValue *)_invoke:(HMNativeCallInfo)info {
    
    HMExportClass *exportClass = info.exportCls;
    NSString *funcName = info.functionName;
    NSArray <HMBaseValue *> *args = info.args;
    id <HMBaseExecutorProtocol> executor = info.executor;
    id target = info.target;
    
    BOOL isClass = object_isClass(target);
//    NSInvocation *invoke = [NSInvocation invocationWithMethodSignature:nil];
    
    // parse method
    [exportClass methodOrPropertyWithName:funcName isClass:isClass];
    [args enumerateObjectsUsingBlock:^(HMBaseValue *arg, NSUInteger idx, BOOL * _Nonnull stop) {
        

    }];
    

    
    // call native
    
    // get return value
    
    return nil;
}

+ (nullable HMBaseValue *)_invokeOnMainThread:(HMNativeCallInfo)info {
    
    HMExportClass *exportClass = info.exportCls;
    NSString *funcName = info.functionName;
    NSArray *args = info.args;
    id target = info.target;
    id <HMBaseExecutorProtocol> executor = info.executor;

    BOOL isClass = object_isClass(target);

    
    
//    dispatch_block_t block = ^(){
//        id<HMExportMethodBase> methodBase = [exportClass methodOrPropertyWithName:funcName isClass:isClass];
//
//        NSInvocation *invoke = [NSInvocation invocationWithMethodSignature:nil];
//
//
//    };
    
//    dispatch_async(dispatch_get_main_queue(), block);
    
    return nil;
}
@end
