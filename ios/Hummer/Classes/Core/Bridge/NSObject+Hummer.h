//
//  NSObject+Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMJSObject.h"
#import "HMExportManager.h"

@class HMBaseWeakValue;

NS_ASSUME_NONNULL_BEGIN

@interface NSObject (Hummer) <HMJSObject>

- (void)hm_recycle;

/**
 * 原生导出对象或者闭包才有，这个 property 限制了原生对象和闭包只能在一个 JSContext 中
 */
@property (nonatomic, strong, nullable) HMBaseWeakValue *hm_value;

@end

NS_ASSUME_NONNULL_END
