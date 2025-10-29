//
//  HMNotificationCenter.m
//  Hummer
//
//  Created by didi on 2023/3/27.
//

#import "HMNotificationCenter.h"
#import "HMThreadUtils.h"

@interface HMNotificationCenter()

@property (nonatomic, copy, readwrite) NSString *nameSpace;

@property (nonatomic, strong, readwrite) NSNotificationCenter *notifyCenter;
@end

@implementation HMNotificationCenter

static NSMutableDictionary *__HMNotificationCenter_notifyCenterMap = nil;

+ (void)initialize {
    __HMNotificationCenter_notifyCenterMap = [NSMutableDictionary new];
}

+ (nullable HMNotificationCenter *)namespaceCenter:(NSString *)nameSpace {
    
    if(nameSpace == nil){return nil;}
    HMAssertMainQueue();
    HMNotificationCenter *notifyCenter = [__HMNotificationCenter_notifyCenterMap objectForKey:nameSpace];
    if(!notifyCenter){
        notifyCenter =  [[HMNotificationCenter alloc] initWithNamespace:nameSpace];
        [__HMNotificationCenter_notifyCenterMap setObject:notifyCenter forKey:nameSpace];
    }
    return notifyCenter;
}

+ (HMNotificationCenter *)systemDefaultCenter {
    static HMNotificationCenter *defaultCenter = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultCenter = [[HMNotificationCenter alloc] init];
        defaultCenter.notifyCenter = [NSNotificationCenter defaultCenter];
    });
    return defaultCenter;
}

- (instancetype)initWithNamespace:(NSString *)nameSpace {
    self = [super init];
    if(self){
        _nameSpace = nameSpace;
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
