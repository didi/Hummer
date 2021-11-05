//
//  NSObject+Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "NSObject+Hummer.h"

#import <objc/runtime.h>
#import "HMBaseValue.h"
#import <Hummer/HMBaseWeakValueProtocol.h>

@implementation NSObject (Hummer)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    return [self init];
}

- (HMBaseValue *)hmValue {
    id <HMBaseWeakValueProtocol> weakValue = objc_getAssociatedObject(self, _cmd);
    
    if (!weakValue) {
        return self.hmWeakValue.value;
    }
    
    HMBaseValue *value = weakValue.value;
    if (!value) {
        // 不存在了
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        return nil;
    }

    return value;
}

- (id <HMBaseWeakValueProtocol>)hmWeakValue {
    return objc_getAssociatedObject(self, @selector(hmValue));
}

- (void)setHmWeakValue:(id <HMBaseWeakValueProtocol>)hmWeakValue {
    objc_setAssociatedObject(self, @selector(hmValue), hmWeakValue, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)setHmValue:(HMBaseValue *)value {
    if (!value.context) {
        return;
    }
    objc_setAssociatedObject(self, @selector(hmValue), [value.context createWeakValueWithStrongValue:value], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (id <HMBaseExecutorProtocol>)hmContext {
    return self.hmValue.context;
}

@end
