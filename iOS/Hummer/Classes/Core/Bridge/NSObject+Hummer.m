//
//  NSObject+Hummer.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "NSObject+Hummer.h"

#import <objc/runtime.h>
#import "HMJSGlobal.h"
#import "HMBaseValue.h"
#import "HMJSCExecutor.h"
#import "HMJSCWeakValue.h"
#import "HMBaseWeakValueProtocol.h"

@implementation NSObject (Hummer)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    return [self init];
}

- (HMBaseValue *)hmValue {
    id <HMBaseWeakValueProtocol> weakValue = objc_getAssociatedObject(self, _cmd);
    // 不存在了
    if (!weakValue.value) {
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        
        return nil;
    }
    
    return weakValue.value;
}

- (void)setHmValue:(HMBaseValue *)value {
    if (!value.context) {
        return;
    }
    objc_setAssociatedObject(self, @selector(hm_value), [value.context createWeakValueWithStrongValue:value], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (id <HMBaseExecutorProtocol>)hmContext {
    return self.hmValue.context;
}

@end
