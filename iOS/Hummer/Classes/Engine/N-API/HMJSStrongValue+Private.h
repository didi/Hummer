//
//  HMJSStrongValue+Private.h
//  Pods
//
//  Created by 唐佳诚 on 2021/8/11.
//

#import <Hummer/HMJSStrongValue.h>

#import <napi/js_native_api.h>

@interface HMJSStrongValue (Private)

@property (nonatomic, assign, readonly) NAPIRef reference;

- (nullable instancetype)initWithValueRef:(nullable NAPIValue)valueRef executor:(nullable id <HMBaseExecutorProtocol>)executor NS_DESIGNATED_INITIALIZER;

@end
