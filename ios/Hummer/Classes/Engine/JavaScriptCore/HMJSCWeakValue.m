//
//  HMJSCWeakValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/21.
//

#import "HMJSCWeakValue.h"
#import "HMJSCExecutor+Private.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCWeakValue ()

@property (nonatomic, nullable, strong) JSManagedValue *managedValue;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCWeakValue

- (instancetype)initWithValueRef:(JSValueRef)valueRef executor:(HMBaseExecutor *)executor {
    if (JSValueIsUndefined(((HMJSCExecutor *) self.executor).contextRef, valueRef) || JSValueIsNull(((HMJSCExecutor *) self.executor).contextRef, valueRef)) {
        return nil;
    }
    self = [super initWithExecutor:executor];
    _managedValue = [JSManagedValue managedValueWithValue:[JSValue valueWithJSValueRef:valueRef inContext:[JSContext contextWithJSGlobalContextRef:((HMJSCExecutor *) executor).contextRef]]];

    return self;
}

- (BOOL)isValid {
    return (BOOL) self.valueRef;
}

- (JSValueRef)valueRef {
    if (!self.executor) {
        return NULL;
    }
    
    return self.managedValue.value.JSValueRef;
}

@end
