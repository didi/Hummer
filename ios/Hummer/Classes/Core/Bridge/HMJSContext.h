//
//  HMNGJSContext.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/15.
//

#import <Foundation/Foundation.h>

@class HMBaseValue, HMBaseExecutor;

NS_ASSUME_NONNULL_BEGIN

@interface HMJSContext : NSObject

/**
 * 设置自身业务线的命名空间
 * 当 Hummer 查找插件时，或者 Navigator 模块查找注册的构造器时，会采用该命名空间作为唯一标示
 * 当该值为空时，Hummer 会忽略上下文，保持原先的处理逻辑
 */
@property (nonatomic, copy, nullable) NSString *nameSpace;

/**
 * 只读
 */
@property (nonatomic, nullable, copy) NSURL *url;

@property (nonatomic, nullable, strong) HMBaseValue *componentView;

@property (nonatomic, nullable, copy) void(^renderCompletion)(void);

@property (nonatomic, weak, readonly, nullable) UIView *rootView;

@property (nonatomic, strong) HMBaseExecutor *executor;

@property (nonatomic, strong, nullable) HMBaseValue *notifyManagedValue;

+ (instancetype)contextInRootView:(UIView *)rootView;

/**
 * 只能调用一次
 * @param javaScriptString 脚本字符串
 * @param fileName 文件名
 * @return JSValue
 */
- (nullable HMBaseValue *)evaluateScript:(nullable NSString *)javaScriptString fileName:(nullable NSString *)fileName;

NS_ASSUME_NONNULL_END

@end
