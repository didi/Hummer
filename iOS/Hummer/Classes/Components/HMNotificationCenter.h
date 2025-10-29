//
//  HMNotificationCenter.h
//  Hummer
//
//  Created by didi on 2023/3/27.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// HMNotifyCenter 底层通知原生实现，实际为 namespace 隔离的 NSNotificationCenter。
@interface HMNotificationCenter : NSObject
/// 当使用系统默认通知时（[NSNotificationCenter defaultCenter]）namespace 为空
@property (nonatomic, copy, nullable, readonly) NSString *nameSpace;
@property (nonatomic, strong, readonly) NSNotificationCenter *notifyCenter;


/// 只能在主线线程访问， 内部为 NSNotificationCenter，线程安全
+ (nullable HMNotificationCenter *)namespaceCenter:(NSString *)nameSpace;

+ (HMNotificationCenter *)systemDefaultCenter;

- (void)addObserver:(id)observer selector:(SEL)aSelector name:(nullable NSNotificationName)aName object:(nullable id)anObject;

- (void)postNotificationName:(NSNotificationName)aName object:(nullable id)anObject;
- (void)postNotificationName:(NSNotificationName)aName object:(nullable id)anObject userInfo:(nullable NSDictionary *)aUserInfo;

- (void)removeObserver:(id)observer;
- (void)removeObserver:(id)observer name:(nullable NSNotificationName)aName object:(nullable id)anObject;

@end

NS_ASSUME_NONNULL_END
