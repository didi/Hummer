//
//  HMClassManager.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMClassManager.h"
#import "HMJSClass.h"
#import "HMUtility.h"

@interface HMClassManager ()

@property (nonatomic, strong) NSMutableDictionary *jsClasses;
@property (nonatomic, strong) NSLock *jsClassLock;

@end

@implementation HMClassManager

static HMClassManager *__sharedManager = nil;

+ (instancetype)defaultManager {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (__sharedManager == nil) {
            __sharedManager = [[self alloc] init];
        }
    });
    return __sharedManager;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone {
    @synchronized(self) {
        if (__sharedManager == nil) {
            __sharedManager = [super allocWithZone:zone];
        }
    }
    return __sharedManager;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _jsClasses = [NSMutableDictionary dictionary];
        _jsClassLock = [NSLock new];
    }
    return self;
}

- (HMJSClass *)createJSClass:(NSString *)className {
    if (!className) {
        HMLogError(@"JS class name can not be null!");
        return nil;
    }
    
    HMJSClass *jsClass = [self jsClassWithName:className];
    if (jsClass) return jsClass;
    
    jsClass = [[HMJSClass alloc] initWithJSClass:className];
    if (jsClass && className) {
        [self setJSClass:jsClass withName:className];
    }
    [jsClass registerJSClassRef];
    
    return jsClass;
}

- (void)jsClassLockWithBlock:(dispatch_block_t)block {
    [self.jsClassLock lock];
    if (block) block();
    [self.jsClassLock unlock];
}

- (HMJSClass *)jsClassWithName:(NSString *)className {
    if (!className) return nil;
    
    __block HMJSClass *jsClass = nil;
    __weak typeof(self) weakSelf = self;
    [self jsClassLockWithBlock:^{
        jsClass = weakSelf.jsClasses[className];
    }];
    
    return jsClass;
}

- (void)setJSClass:(HMJSClass *)jsClass withName:(NSString *)className {
    if (!jsClass || !className) return;
    
    __weak typeof(self) weakSelf = self;
    [self jsClassLockWithBlock:^{
        weakSelf.jsClasses[className] = jsClass;
    }];
}

@end
