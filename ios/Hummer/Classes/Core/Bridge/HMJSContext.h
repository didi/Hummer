//
//  HMJSContext.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//


#import <JavaScriptCore/JavaScriptCore.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@class HMJSContext;
@protocol HMJSContextDelegate <NSObject>

@optional
- (void)context:(HMJSContext *)context didRenderPage:(JSValue *)page;

@end
@interface HMJSContext : NSObject


/// 设置自身业务线的命名空间；
/// 当Hummer查找插件时，或者Navigator模块查找注册的构造器时，会采用该命名空间作为唯一标示；
/// 当该值为空时，Hummer会忽略上下文，保持原先的处理逻辑；
@property (nonatomic, copy, nullable) NSString *nameSpace;

@property (nonatomic, nullable, copy) NSString *pageID;

/// `evaluateScript:fileName:` 方法会对该属性进行赋值
@property (nonatomic, nullable, copy) NSURL *url;

@property (nonatomic, weak) id<HMJSContextDelegate> delegate;
@property (nonatomic, weak, readonly) UIView *rootView;
@property (nonatomic, strong, readonly) JSContext *context;
@property (nonatomic, strong) JSManagedValue *notifyManagedValue;

- (instancetype)init NS_UNAVAILABLE;

- (instancetype)initWithPageID:(NSString *)pageID;

+ (instancetype)contextInRootView:(UIView *)rootView;

- (JSValue *)evaluateScript:(NSString *)jsScript fileName:(nullable NSString *)fileName;

+ (instancetype)contextInRootView:(UIView *)rootView
                           pageID:(NSString *)pageID;


/**
 * 强持JSValue，防止js对象被GC了
 * @param value JSValue
 */
- (void)retainedValue:(JSValue *)value;
- (void)addGlobalScript:(NSString *)script;
- (void)registerJSClasses;

- (void)removeValue:(JSValue *)value;
@end

NS_ASSUME_NONNULL_END
