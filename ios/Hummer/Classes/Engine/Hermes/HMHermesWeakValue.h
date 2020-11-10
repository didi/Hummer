//
//  HMHermesWeakValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/31.
//

#import <Hummer/HMBaseWeakValue.h>
#import <Hummer/HMHermesValue.h>
#include <hermes/VM/WeakRef.h>

@class HMHermesExecutor;

NS_ASSUME_NONNULL_BEGIN

@interface HMHermesWeakValue : HMBaseWeakValue <HMHermesValue> {
@public
    std::unique_ptr<hermes::vm::WeakRef<hermes::vm::HermesValue>> _hermesValueWeakRef;
}

- (instancetype)initWithExecutor:(HMBaseExecutor *)executor NS_UNAVAILABLE;

- (nullable instancetype)initWithHermesValue:(const hermes::vm::HermesValue &)hermesValue executor:(nullable HMBaseExecutor *)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
