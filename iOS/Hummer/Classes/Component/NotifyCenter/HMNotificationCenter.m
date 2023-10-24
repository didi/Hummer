//
//  HMNotificationCenter.m
//  Hummer
//
//  Created by didi on 2023/3/27.
//

#import "HMNotificationCenter.h"

@interface HMNotificationCenter()

@property (nonatomic, copy, readwrite) NSString *namespace;

@property (nonatomic, strong, readwrite) NSNotificationCenter *notifyCenter;
@end

@implementation HMNotificationCenter

static NSMutableDictionary *__HMNotificationCenter_notifyCenterMap = nil;
+ (nullable HMNotificationCenter *)namespaceCenter:(NSString *)namespace {
    
    if(__HMNotificationCenter_notifyCenterMap == nil){
        __HMNotificationCenter_notifyCenterMap = [NSMutableDictionary new];
    }
    if(namespace == nil){return nil;}
    HMNotificationCenter *notifyCenter = [__HMNotificationCenter_notifyCenterMap objectForKey:namespace];
    if(notifyCenter){
        return notifyCenter;
    }
    notifyCenter = [[HMNotificationCenter alloc] initWithNamespace:namespace];
    [__HMNotificationCenter_notifyCenterMap setObject:notifyCenter forKey:namespace];
    return notifyCenter;
}

- (instancetype)initWithNamespace:(NSString *)namespace {
    self = [super init];
    if(self){
        _namespace = namespace;
        _notifyCenter = [NSNotificationCenter new];
    }
    return self;
}

- (void)addObserver:(id)observer selector:(SEL)aSelector name:(nullable NSNotificationName)aName object:(nullable id)anObject {
    [self.notifyCenter addObserver:observer selector:aSelector name:aName object:anObject];
}

- (void)postNotificationName:(NSNotificationName)aName object:(nullable id)anObject {
    [self.notifyCenter postNotificationName:aName object:anObject];
}
- (void)postNotificationName:(NSNotificationName)aName object:(nullable id)anObject userInfo:(nullable NSDictionary *)aUserInfo {
    [self.notifyCenter postNotificationName:aName object:anObject userInfo:aUserInfo];
}

- (void)removeObserver:(id)observer {
    [self.notifyCenter removeObserver:observer];
}
- (void)removeObserver:(id)observer name:(nullable NSNotificationName)aName object:(nullable id)anObject {
    [self.notifyCenter removeObserver:observer name:aName object:anObject];

}
@end
