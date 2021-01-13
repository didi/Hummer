//
//  HMValueWrapper.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/6/29.
//

#import <JavaScriptCore/JavaScriptCore.h>

@protocol HMBaseExecutorProtocol;

NS_ASSUME_NONNULL_BEGIN

@protocol HMJSCValue

@property (nonatomic, assign, nullable, readonly) JSValueRef valueRef;

- (nullable instancetype)initWithValueRef:(nullable JSValueRef)valueRef executor:(nullable id <HMBaseExecutorProtocol>)executor;

@end

NS_ASSUME_NONNULL_END
