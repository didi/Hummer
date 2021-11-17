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
    HMBaseValue *value = weakValue.value;
    if (!value) {
        // 不存在了
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        
        return nil;
    }

    return value;
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

- (void)hm_setWeakValue:(id<HMBaseWeakValueProtocol>)weakValue {
    objc_setAssociatedObject(self, @selector(hmValue), weakValue, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end
