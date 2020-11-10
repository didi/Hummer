//
//  HMBaseValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import "HMBaseValue.h"

@implementation HMBaseValue

- (BOOL)isValid {
    return NO;
}

- (instancetype)initWithExecutor:(HMBaseExecutor *)executor {
    self = [super init];
    if (self) {
        _executor = executor;
    }

    return self;
}

- (nullable id)toObject {
    return [self.executor convertValueToObject:self];
}

- (BOOL)toBool {
    return [[self.executor convertValueToNumber:self] boolValue];
}

- (nullable NSString *)toString {
    return [self.executor convertValueToString:self];
}

- (nullable NSNumber *)toNumber {
    return [self.executor convertValueToNumber:self];
}

- (nullable NSArray *)toArray {
    return [self.executor convertValueToArray:self];
}

- (nullable NSDictionary<NSString *, id> *)toDictionary {
    return [self.executor convertValueToDictionary:self];
}

- (nullable NSObject *)toNativeObject {
    return [self.executor convertValueToNativeObject:self];
}

- (nullable NSObject *)hm_toObjCObject {
    return [self toNativeObject];
}

- (HMClosureType)toClosure {
    return [self.executor convertValueToClosure:self];
}

- (BOOL)isNull {
    return [self isNullOrUndefined];
}

- (BOOL)isUndefined {
    return [self isNullOrUndefined];
}

- (BOOL)isNullOrUndefined {
    return [self.executor valueIsNullOrUndefined:self];
}

- (BOOL)isBoolean {
    return [self.executor valueIsBoolean:self];
};

- (BOOL)isNumber {
    return [self.executor valueIsNumber:self];
}

- (BOOL)isString {
    return [self.executor valueIsString:self];
}

- (BOOL)isArray {
    return [self.executor valueIsArray:self];
}

- (BOOL)isNativeObject {
    return [self.executor valueIsNativeObject:self];
}

- (BOOL)isDictionary {
    return [self.executor valueIsDictionary:self];
}

- (BOOL)isEqualToValue:(HMBaseValue *)value {
    if (self.executor != value.executor) {
        return NO;
    }
    
    return [self.executor compareValue:self value:value];
}

- (HMBaseStrongValue *)callWithFunctionName:(NSString *)functionName arguments:(NSArray *)arguments {
    return [self.executor executeCallWithTarget:self functionName:functionName arguments:arguments];
}

- (BOOL)setValue:(id)value forProperty:(NSString *)property {
    return [self.executor setPropertyWithObject:self value:value property:property];
}

@end
