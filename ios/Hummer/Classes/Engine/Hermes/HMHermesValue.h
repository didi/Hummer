//
//  HMHermesValue.h
//  Pods
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import <Foundation/Foundation.h>
// 考虑前置声明
#include <hermes/VM/HermesValue.h>

NS_ASSUME_NONNULL_BEGIN

@class HMBaseExecutor;

@protocol HMHermesValue <NSObject>

/**
 * 只能用于复制读取，不能用于 GC 内存管理
 */
- (hermes::vm::HermesValue)hermesValue;

- (nullable instancetype)initWithHermesValue:(const hermes::vm::HermesValue &)hermesValue executor:(nullable HMBaseExecutor *)executor;

@end

NS_ASSUME_NONNULL_END
