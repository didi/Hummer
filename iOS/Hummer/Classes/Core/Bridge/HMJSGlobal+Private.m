//
//  HMJSGlobal+Private.m
//  Hummer
//
//  Created by didi on 2021/4/6.
//

#import "HMJSGlobal+Private.h"

@implementation HMJSGlobal (Private)
+ (HMExceptionModel *)_evaluateString:(nonnull NSString *)jsString fileName:(nullable NSString *)fileName inContext:(HMJSContext *)context {
    HMExceptionHandler orignalHandle = context.context.exceptionHandler;
    __block HMExceptionModel *_exception = nil;
    context.context.exceptionHandler = ^(HMExceptionModel * _Nonnull exception) {
        _exception = exception;
    };
    [context evaluateScript:jsString fileName:fileName];
    context.context.exceptionHandler = orignalHandle;
    return _exception;
}


+ (HMExceptionModel *)_evaluateString:(NSString *)jsString fileName:(NSString *)fileName {

    HMJSContext *context = [HMJSGlobal.globalObject currentContext:HMCurrentExecutor];
    return [self _evaluateString:jsString fileName:fileName inContext:context];
}
@end
