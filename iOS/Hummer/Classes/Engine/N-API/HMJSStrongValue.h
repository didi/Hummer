#import <Hummer/HMBaseValue.h>
#import <napi/js_native_api.h>
#import <Hummer/HMJSValue.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSStrongValue : HMBaseValue <HMJSValue>

@property (nonatomic, assign, readonly) NAPIRef reference;

- (nullable instancetype)initWithValueRef:(nullable NAPIValue)valueRef executor:(nullable id <HMBaseExecutorProtocol>)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
