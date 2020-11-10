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

@implementation NSObject (Hummer)

HM_EXPORT_METHOD(recycle, hm_recycle)

#pragma mark - Getter & Setter

- (void)hm_recycle {
}

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    return [self init];
}

- (HMBaseWeakValue *)hm_value {
    HMBaseWeakValue *weakValue = objc_getAssociatedObject(self, _cmd);
    // 不存在了
    if (![weakValue isValid]) {
        objc_setAssociatedObject(self, _cmd, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        
        return nil;
    }
    
    return weakValue;
}

- (void)setHm_value:(HMBaseWeakValue *)hm_value {
    objc_setAssociatedObject(self,
            @selector(hm_value),
            hm_value,
            OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end
