//
//  HMJSCWeakValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMJSCWeakValue.h"
#import "HMJSCExecutor+Private.h"
#import "HMJSCStrongValue.h"
#import "HMJSCValue.h"
#import "HMBaseExecutorProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCWeakValue ()

@property (nonatomic, nullable, strong) JSManagedValue *managedValue;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCWeakValue

- (instancetype)initWithValue:(id<HMBaseValueProtocol>)value {
    if (!value || ![value isKindOfClass:HMJSCStrongValue.class]) {
        return nil;
    }
    HMJSCStrongValue *strongValue = (HMJSCStrongValue *) value;
    if (!strongValue.executor || ![strongValue.executor isKindOfClass:HMJSCExecutor.class]) {
        return nil;
    }
    HMJSCExecutor *jscExecutor = strongValue.executor;
    self = [super init];
    _managedValue = [JSManagedValue managedValueWithValue:[JSValue valueWithJSValueRef:strongValue.valueRef inContext:[JSContext contextWithJSGlobalContextRef:jscExecutor.contextRef]]];
    
    return self;
}

+ (id<HMBaseWeakValueProtocol>)managedValueWithValue:(id<HMBaseValueProtocol>)value {
    return [[HMJSCWeakValue alloc] initWithValue:value];
}

- (id<HMBaseValueProtocol>)value {
    if (!self.managedValue.value.JSValueRef || !self.managedValue.value.context.JSGlobalContextRef) {
        return nil;
    }
    id <HMBaseExecutorProtocol> executor = [HMExecutorMap objectForKey:[NSValue valueWithPointer:self.managedValue.value.context.JSGlobalContextRef]];
    
    return [[HMJSCStrongValue alloc] initWithValueRef:self.managedValue.value.JSValueRef executor:executor];
}

@end
