//
//  HMJSCStrongValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2021/1/13.
//

#import <Hummer/HMBaseValue.h>
#import <Hummer/HMBaseExecutorProtocol.h>
#import <JavaScriptCore/JavaScriptCore.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMJSCStrongValue : HMBaseValue

@property (nonatomic, assign, nullable, readonly) JSValueRef valueRef;

+ (nullable instancetype)valueWithJSValueRef:(nullable JSValueRef)value inContext:(nullable id <HMBaseExecutorProtocol>)context;

- (nullable instancetype)initWithValueRef:(nullable JSValueRef)valueRef executor:(nullable id <HMBaseExecutorProtocol>)executor NS_DESIGNATED_INITIALIZER;

- (void)forceUnprotectWithGlobalContextRef:(nullable JSGlobalContextRef)globalContextRef;

@end

NS_ASSUME_NONNULL_END
