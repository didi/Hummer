//
//  HMJSCWeakValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMJSCWeakValue.h"
#import "HMJSCExecutor+Private.h"
#import "HMJSCStrongValue.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCWeakValue ()

@property (nonatomic, nullable, strong) JSManagedValue *managedValue;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCWeakValue

- (instancetype)initWithValue:(HMBaseValue *)value {
    if (!value || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return nil;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    if (!strongValue.context || ![strongValue.context isKindOfClass:HMJSCExecutor.class]) {
        return nil;
    }
    HMJSCExecutor *jscExecutor = strongValue.context;
    self = [super init];
    _managedValue = [JSManagedValue managedValueWithValue:[JSValue valueWithJSValueRef:strongValue.valueRef inContext:[JSContext contextWithJSGlobalContextRef:jscExecutor.contextRef]]];

    return self;
}

+ (id <HMBaseWeakValueProtocol>)managedValueWithValue:(HMBaseValue *)value {
    return [[HMJSCWeakValue alloc] initWithValue:value];
}

- (HMBaseValue *)value {
    if (!self.managedValue.value.JSValueRef || !self.managedValue.value.context.JSGlobalContextRef) {
        return nil;
    }
    id <HMBaseExecutorProtocol> executor = [HMExecutorMap objectForKey:[NSValue valueWithPointer:self.managedValue.value.context.JSGlobalContextRef]];

    return [[HMJSCStrongValue alloc] initWithValueRef:self.managedValue.value.JSValueRef executor:executor];
}

@end
