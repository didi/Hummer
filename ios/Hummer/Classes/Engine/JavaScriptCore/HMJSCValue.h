//
//  HMValueWrapper.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/6/29.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

NS_ASSUME_NONNULL_BEGIN

@class HMBaseExecutor;

@protocol HMJSCValue <NSObject>

@property (nonatomic, assign, nullable, readonly) JSValueRef valueRef;

- (nullable instancetype)initWithValueRef:(JSValueRef)valueRef executor:(HMBaseExecutor *)executor;

@end

NS_ASSUME_NONNULL_END
