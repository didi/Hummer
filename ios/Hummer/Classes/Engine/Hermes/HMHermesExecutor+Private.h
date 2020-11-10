//
//  HMHermesExecutor+Private.h
//  Pods
//
//  Created by 唐佳诚 on 2020/8/10.
//

#import <Hummer/HMHermesExecutor.h>
#include <hermes/VM/Runtime.h>

NS_ASSUME_NONNULL_BEGIN

#define HM_AUTOMARKER(gcScopeRef,CODE) \
auto marker = gcScopeRef->createMarker();\
CODE \
gcScopeRef->flushToMarker(marker); \

@class HMHermesStrongValue, HMHermesWeakValue;

@interface HMHermesExecutor (Private)

@property (nonatomic, assign) hermes::vm::Runtime *runtime;

@property (nonatomic, nullable, copy) NSHashTable<HMHermesStrongValue *> *strongValueSet;

@property (nonatomic, nullable, copy) NSHashTable<HMHermesWeakValue *> *weakValueSet;

@end

NS_ASSUME_NONNULL_END
