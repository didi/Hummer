//
//  HMJSWeakValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2021/8/9.
//

#import "HMJSWeakValue.h"
#import <Hummer/HMJSStrongValue.h>

static NSString *const CREATE_WEAK_REFERENCE_ERROR = @"napi_create_reference() initialRefCount: 0 error";

NS_ASSUME_NONNULL_BEGIN

@interface HMJSWeakValue ()

@property (nonatomic, weak) HMJSExecutor *executor;

@property (nonatomic, assign) NAPIRef reference;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSWeakValue

- (void)dealloc {
    __weak HMJSExecutor *executor = self.executor;
    NAPIRef ref = self.reference;
    HMSafeMainThread(^{
        if (executor) {
            if (napi_delete_reference(executor.env, ref) != NAPIExceptionOK) {
                NAPIClearLastException(executor.env);
            }
        }
    });
}

- (instancetype)initWithValueRef:(NAPIValue)valueRef executor:(nullable HMJSExecutor *)executor {
    HMAssertMainQueue();
    if (!valueRef || !executor) {
        return nil;
    }
    self = [super init];
    _executor = executor;
    if ([_executor popExceptionWithStatus:napi_create_reference(_executor.env, valueRef, 0, &self->_reference)]) {
        NSAssert(NO, CREATE_WEAK_REFERENCE_ERROR);

        return nil;
    }

    return self;
}

- (NAPIValue)valueRef {
    HMAssertMainQueue();
    NAPIValue resultValue;
    if (napi_get_reference_value(self.executor.env, self.reference, &resultValue) != NAPIErrorOK) {
        NSAssert(NO, @"napi_get_reference_value() error");

        return nil;
    }

    return resultValue;
}

- (HMBaseValue *)value {
    HMAssertMainQueue();
    NAPIHandleScope handleScope;
    if (napi_open_handle_scope(self.executor.env, &handleScope) != NAPIErrorOK) {
        NSAssert(NO, @"napi_open_handle_scope() error");

        return nil;
    }
    HMJSStrongValue *strongValue = [[HMJSStrongValue alloc] initWithValueRef:self.valueRef executor:self.executor];
    napi_close_handle_scope(self.executor.env, handleScope);

    return strongValue;
}

@end
