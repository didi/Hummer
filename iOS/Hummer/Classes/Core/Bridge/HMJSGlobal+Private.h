//
//  HMJSGlobal+Private.h
//  Hummer
//
//  Created by didi on 2021/4/6.
//

#import "HMJSGlobal.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSGlobal (Private)
/// 必须在 js 上下文中执行
+ (HMExceptionModel *)_evaluateString:(nonnull NSString *)jsString fileName:(nullable NSString *)fileName;
+ (HMExceptionModel *)_evaluateString:(nonnull NSString *)jsString fileName:(nullable NSString *)fileName inContext:(HMJSContext *)context;

@end

NS_ASSUME_NONNULL_END
