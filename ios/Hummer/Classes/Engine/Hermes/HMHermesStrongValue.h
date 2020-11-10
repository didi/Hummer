//
//  HMHermesStrongValue.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/4.
//

#import <Hummer/HMBaseStrongValue.h>
#include <Hummer/HMHermesValue.h>

NS_ASSUME_NONNULL_BEGIN

// ivar 不能放在 Category
@interface HMHermesStrongValue : HMBaseStrongValue <HMHermesValue> {
@public
    // operator= 只有 PinnedHermesValue 才有
    hermes::vm::PinnedHermesValue _pinnedHermesValue;
}

- (instancetype)initWithExecutor:(HMBaseExecutor *)executor NS_UNAVAILABLE;

- (nullable instancetype)initWithHermesValue:(const hermes::vm::HermesValue &)hermesValue executor:(nullable HMBaseExecutor *)executor NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
