//
//  NSObject+Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "NSObject+Hummer.h"

#import <objc/runtime.h>
#import "HMJSGlobal.h"

@implementation NSObject (Hummer)

@dynamic hmValue, hmContext;

HM_EXPORT_METHOD(retained, retainedValue:finalizeCallback:)

- (instancetype)initWithHMValues:(__unused NSArray *)values {
    self = [self init];
    return self;
}

- (void)hm_callJSFinalize {
    if ([self respondsToSelector:@selector(callFinialize)]) {
        [self callFinialize];
    }
    HMFuncCallback finalize = [self finalizeCallBack];
    if (finalize) { finalize(nil); }
}

- (void)hm_retainedJSValue {
    if ([self isKindOfClass:[JSValue class]]) {
        [[[HMJSGlobal globalObject] currentContext:((JSValue*)self).context] retainedValue:self];
    }
}
#pragma mark - Getter & Setter

- (JSValue *)hmValue {
    id (^block)(void) = objc_getAssociatedObject(self, _cmd);
    JSValue *value = block ? block() : nil;
    return value;
}

- (void)setHmValue:(JSValue *)value {
    __weak typeof(value) weakValue = value;
    id (^block)(void) = ^(){ return weakValue;};
    objc_setAssociatedObject(self,
                             @selector(hmValue),
                             block,
                             OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (HMFuncCallback)finalizeCallBack {
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setFinalizeCallback:(HMFuncCallback)finalize {
    objc_setAssociatedObject(self,
                             @selector(finalizeCallBack),
                             finalize,
                             OBJC_ASSOCIATION_COPY_NONATOMIC);
}

- (JSContext *)hmContext {
    return self.hmValue.context;
}

#pragma mark - Export Method

- (void)retainedValue:(JSValue *)value
     finalizeCallback:(HMFuncCallback)finalize {
    if (!value || !finalize) { return; }
    self.hmValue = value; [self setFinalizeCallback:finalize];
    HMJSContext *context = [[HMJSGlobal globalObject] currentContext:value.context];
    [context retainedValue:value];
}

@end
