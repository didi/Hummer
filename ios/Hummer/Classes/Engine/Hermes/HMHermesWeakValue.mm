//
//  HMHermesWeakValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/7/31.
//

#include <hermes/HermesCommon.h>

#import "HMHermesWeakValue.h"
#import "HMHermesExecutor+Private.h"
#include <hermes/VM/Runtime.h>

@implementation HMHermesWeakValue

- (instancetype)initWithHermesValue:(const hermes::vm::HermesValue &)hermesValue executor:(nullable HMBaseExecutor *)executor {
    if (!hermesValue.getRaw() || hermesValue.isNull() || hermesValue.isUndefined()) {
        return nil;
    }
    self = [super initWithExecutor:executor];
    hermes::vm::GCScope gcScope(((HMHermesExecutor *) executor).runtime);
    _hermesValueWeakRef = std::make_unique<hermes::vm::WeakRef<hermes::vm::HermesValue>>(&(((HMHermesExecutor *) executor).runtime->getHeap()), hermesValue);
    if (!((HMHermesExecutor *) executor).weakValueSet) {
        // NSHashTable count 计算不准确，会统计 nil，所以没法在 dealloc 清空
        ((HMHermesExecutor *) executor).weakValueSet = NSHashTable.weakObjectsHashTable;
    }
    
    [((HMHermesExecutor *) executor).weakValueSet addObject:self];

    return self;
}

- (BOOL)isValid {
    return self.executor && _hermesValueWeakRef->isValid();
}

- (hermes::vm::HermesValue)hermesValue {
    if (self.isValid) {
        // weakRef->get() 会分配 Handle
        auto gcScopeRef = (((HMHermesExecutor *) self.executor).runtime)->getTopGCScope();
        if (gcScopeRef) {
            auto marker = gcScopeRef->createMarker();
            hermes::vm::HermesValue val = _hermesValueWeakRef->get(((HMHermesExecutor *) self.executor).runtime).get();
            gcScopeRef->flushToMarker(marker);
            
            return val;
        } else {
            hermes::vm::GCScope gcScope((((HMHermesExecutor *) self.executor).runtime));
            
            return _hermesValueWeakRef->get(((HMHermesExecutor *) self.executor).runtime).get();
        }
    }
    
    return hermes::vm::Runtime::getUndefinedValue().get();
}

@end
