//
//  HMJSCManagedValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/7.
//

#import "HMJSCStrongValue.h"
#import "HMJSCExecutor+Private.h"
#import "HMBaseValue.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import <Hummer/HMUtility.h>
#import "HMJSCStrongValue+Private.h"
#import "HMBaseExecutor.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCStrongValue ()

@property (nonatomic, assign, nullable) JSValueRef valueRef;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCStrongValue

- (instancetype)initWithValueRef:(JSValueRef)valueRef executor:(HMBaseExecutor *)executor {
    HMAssertMainThread();
    if (JSValueIsUndefined(((HMJSCExecutor *) self.executor).contextRef, valueRef) || JSValueIsNull(((HMJSCExecutor *) self.executor).contextRef, valueRef)) {
        return nil;
    }
    self = [super initWithExecutor:executor];
    [((HMJSCExecutor *) executor).strongValueReleasePool addObject:self];
    JSValueProtect(((HMJSCExecutor *) executor).contextRef, valueRef);
    _valueRef = valueRef;

    return self;
}

- (void)dealloc {
    HMAssertMainThread();
    JSValueRef valueRef = self.valueRef;
    if (valueRef) {
        JSValueUnprotect(((HMJSCExecutor *) self.executor).contextRef, valueRef);
    }
}

- (JSValueRef)valueRef {
    if (!self.executor) {
        return NULL;
    }

    return _valueRef;
}

- (void)forceUnProtectWithGlobalContextRef:(JSGlobalContextRef)globalContextRef {
    HMAssertMainThread();
    JSValueUnprotect(globalContextRef, _valueRef);
}

@end
