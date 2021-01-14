//
//  HMJSObject.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class HMBaseValue;

@protocol HMJSObject

@required

/**
 * 初始化构造函数
 * TODO(唐佳诚): NSArray 改成 NSArray<HMBaseValue *> *
 * @param values NSArray<HMBaseValue *> *
 * @return OC 对象，可空
 */
- (nullable instancetype)initWithHMValues:(nullable NSArray<__kindof HMBaseValue *> *)values;

@end

NS_ASSUME_NONNULL_END
