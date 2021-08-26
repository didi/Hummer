#import "HMJSStrongValue.h"
#import <Hummer/HMJSExecutor+Private.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSStrongValue ()

@property (nonatomic, assign) NAPIRef reference;

@end

NS_ASSUME_NONNULL_END

@implementation HMJSStrongValue

- (void)dealloc {
    __weak HMJSExecutor *executor = self.context;
    NAPIRef ref = self.reference;
    HMSafeMainThread(^{
        if (executor) {
            if (napi_delete_reference(executor.env, ref) != NAPIExceptionOK) {
                NAPIClearLastException(executor.env);
            }
        }
    });
}

- (instancetype)initWithExecutor:(id <HMBaseExecutorProtocol>)executor {
    HMAssertMainQueue();
    return [self initWithValueRef:nil executor:nil];
}

- (instancetype)initWithValueRef:(NAPIValue)valueRef executor:(id <HMBaseExecutorProtocol>)executor {
    HMAssertMainQueue();
    if (!valueRef) {
        return nil;
    }
    self = [super initWithExecutor:executor];
    if (self) {
        if ([((HMJSExecutor *)executor) popExceptionWithStatus:napi_create_reference(((HMJSExecutor *) executor).env, valueRef, 1, &self->_reference)]) {
            NSAssert(NO, @"napi_create_reference() initialRefCount: 1 error");
            NAPIClearLastException(((HMJSExecutor *) executor).env);
            
            return nil;
        }
    }
    
    return self;
}

- (NAPIValue)valueRef {
    HMAssertMainQueue();
    NAPIValue valueRef;
    if (napi_get_reference_value(((HMJSExecutor *)self.context).env, self.reference, &valueRef) != NAPIErrorOK) {
        NSAssert(NO, @"napi_get_reference_value() error");
        
        return nil;
    }
    
    return valueRef;
}

@end
