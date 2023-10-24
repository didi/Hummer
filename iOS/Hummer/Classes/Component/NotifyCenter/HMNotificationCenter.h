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
@property (nonatomic, copy, readonly) NSString *namespace;
@property (nonatomic, strong, readonly) NSNotificationCenter *notifyCenter;

+ (nullable HMNotificationCenter *)namespaceCenter:(NSString *)namespace;



- (void)addObserver:(id)observer selector:(SEL)aSelector name:(nullable NSNotificationName)aName object:(nullable id)anObject;

- (void)postNotificationName:(NSNotificationName)aName object:(nullable id)anObject;
- (void)postNotificationName:(NSNotificationName)aName object:(nullable id)anObject userInfo:(nullable NSDictionary *)aUserInfo;

- (void)removeObserver:(id)observer;
- (void)removeObserver:(id)observer name:(nullable NSNotificationName)aName object:(nullable id)anObject;

@end

NS_ASSUME_NONNULL_END
