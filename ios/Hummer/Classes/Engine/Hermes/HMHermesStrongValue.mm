//
//  HMHermesStrongValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/4.
//

#include <hermes/HermesCommon.h>

#import "HMHermesStrongValue.h"
#include <hermes/VM/Runtime.h>
#import "HMHermesExecutor+Private.h"

@implementation HMHermesStrongValue

- (instancetype)initWithHermesValue:(const hermes::vm::HermesValue &)hermesValue executor:(nullable HMBaseExecutor *)executor {
    if (!hermesValue.getRaw() || hermesValue.isNull() || hermesValue.isUndefined()) {
        return nil;
    }
    self = [super initWithExecutor:executor];
    _pinnedHermesValue = hermesValue;
    if (!((HMHermesExecutor *) executor).strongValueSet) {
        ((HMHermesExecutor *) executor).strongValueSet = NSHashTable.weakObjectsHashTable;
    }
    [((HMHermesExecutor *) executor).strongValueSet addObject:self];

    return self;
}

- (hermes::vm::HermesValue)hermesValue {
    // 和 JavaScriptCore 不一样，这里应当尽量保证返回的值不是 0 而是 undefined
    if (self.executor && _pinnedHermesValue.getRaw()) {
        return _pinnedHermesValue;
    }

    return hermes::vm::Runtime::getUndefinedValue().get();
}

@end
