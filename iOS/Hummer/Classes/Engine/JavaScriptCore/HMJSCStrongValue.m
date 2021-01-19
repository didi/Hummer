//
//  HMJSCStrongValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import "HMJSCStrongValue.h"
#import "HMJSCExecutor+Private.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCStrongValue ()

@property (nonatomic, assign) JSValueRef valueRef;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSCStrongValue

- (instancetype)initWithExecutor:(id <HMBaseExecutorProtocol>)executor {
    return [self initWithValueRef:NULL executor:executor];
}

- (instancetype)initWithValueRef:(JSValueRef)valueRef executor:(id <HMBaseExecutorProtocol>)executor {
    HMAssertMainQueue();
    if (![executor isKindOfClass:HMJSCExecutor.class]) {
        return nil;
    }
    HMJSCExecutor *jscExecutor = executor;
    if (!valueRef || !executor || JSValueIsUndefined(jscExecutor.contextRef, valueRef) || JSValueIsNull(jscExecutor.contextRef, valueRef)) {
        return nil;
    }
    self = [super initWithExecutor:executor];
    if (!self) {
        return nil;
    }
    // 如果为字符串或者对象必须要放到强引用池
    if (JSValueIsString(jscExecutor.contextRef, valueRef) || JSValueIsObject(jscExecutor.contextRef, valueRef)) {
        if (!jscExecutor.strongValueReleasePool) {
            jscExecutor.strongValueReleasePool = NSHashTable.weakObjectsHashTable;
        }
        [jscExecutor.strongValueReleasePool addObject:self];
        JSValueProtect(jscExecutor.contextRef, valueRef);
    }
    _valueRef = valueRef;

    return self;
}

- (void)dealloc {
    if (!self.context) {
        return;
    }
    JSValueRef valueRef = _valueRef;
    __weak HMJSCExecutor *jscExecutor = self.context;
    HMSafeMainThread(^{
        if (!jscExecutor) {
            return;
        }
        JSValueUnprotect(jscExecutor.contextRef, valueRef);
    });
}

- (void)forceUnprotectWithGlobalContextRef:(JSGlobalContextRef)globalContextRef {
    HMAssertMainQueue();
    JSValueUnprotect(globalContextRef, _valueRef);
}

+ (instancetype)valueWithJSValueRef:(JSValueRef)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [[self alloc] initWithValueRef:value executor:context];
}

@end
