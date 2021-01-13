//
//  HMBaseValue.m
//  Hummer
//
//  Created by 唐佳诚 on 2020/8/3.
//

#import "HMBaseValue.h"
#import "HMLogger.h"

static NSString *const KeyIsNotString = @"HMBaseValue - setObject:forKeyedSubscript:/objectForKeyedSubscript: key is not string";
NS_ASSUME_NONNULL_BEGIN

@interface HMBaseValue ()

@property (nonatomic, weak, nullable) id <HMBaseExecutorProtocol> executor;

@end

NS_ASSUME_NONNULL_END

@implementation HMBaseValue

- (BOOL)isUndefined {
    return [self.executor valueIsNullOrUndefined:self];
}

- (BOOL)isNull {
    return [self.executor valueIsNullOrUndefined:self];
}

- (BOOL)isBoolean {
    return [self.executor valueIsBoolean:self];
}

- (BOOL)isNumber {
    return [self.executor valueIsNumber:self];
}

- (BOOL)isString {
    return [self.executor valueIsString:self];
}

- (BOOL)isObject {
    return [self.executor valueIsObject:self];
}

- (BOOL)isArray {
    return [self.executor valueIsArray:self];
}

+ (nullable id <HMBaseValueProtocol>)valueWithObject:(id)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithObject:value];
}

+ (nullable id <HMBaseValueProtocol>)valueWithBool:(BOOL)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

+ (nullable id <HMBaseValueProtocol>)valueWithDouble:(double)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

+ (nullable id <HMBaseValueProtocol>)valueWithInt32:(int32_t)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

+ (nullable id <HMBaseValueProtocol>)valueWithUInt32:(uint32_t)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

- (BOOL)isDictionary {
    return [self.executor valueIsDictionary:self];
}

- (BOOL)isNativeObject {
    return [self.executor valueIsNativeObject:self];
}

- (BOOL)isFunction {
    return [self.executor valueIsFunction:self];
}

+ (nullable id <HMBaseValueProtocol>)valueWithNullInContext:(id)context {
    return nil;
}

+ (nullable id <HMBaseValueProtocol>)valueWithUndefinedInContext:(id)context {
    return nil;
}

- (nullable id)toObject {
    return [self.executor convertToObjectWithValue:self isPortableConvert:NO];
}

- (BOOL)toBool {
    return self.toNumber.boolValue;
}

- (double)toDouble {
    return self.toNumber.doubleValue;
}

- (int32_t)toInt32 {
    return self.toNumber.intValue;
}

- (uint32_t)toUInt32 {
    return self.toNumber.unsignedIntValue;
}

- (nullable NSNumber *)toNumber {
    return [self.executor convertToNumberWithValue:self];
}

- (nullable NSString *)toString {
    return [self.executor convertToStringWithValue:self];
}

- (nullable NSArray *)toArray {
    return [self.executor convertToArrayWithValue:self isPortableConvert:NO];
}

- (nullable NSDictionary<NSString *, id> *)toDictionary {
    return [self.executor convertToDictionaryWithValue:self isPortableConvert:NO];
}

- (nullable id)toPortableObject {
    return [self.executor convertToObjectWithValue:self isPortableConvert:YES];
}

- (nullable NSDictionary<NSString *, NSObject *> *)toPortableDictionary {
    return [self.executor convertToDictionaryWithValue:self isPortableConvert:YES];
}

- (nullable NSArray<NSObject *> *)toPortableArray {
    return [self.executor convertToArrayWithValue:self isPortableConvert:YES];
}

- (nullable NSObject *)toNativeObject {
    return [self.executor convertToNativeObjectWithValue:self];
}

- (BOOL)hm_isArray {
    return self.isArray;
}

- (nullable NSArray *)hm_toObjcArray {
    return self.toArray;
}

- (nullable id)hm_toObjCObject {
    id object = self.toNativeObject;
    if (!object) {
        object = self.toObject;
    }

    return object;
}

- (nullable HMFunctionType)toFunction {
    return [self.executor convertToFunctionWithValue:self];
}

- (BOOL)isEqualToObject:(id)other {
    return [self.executor compareWithValue:self anotherValue:other];
}

- (nullable id <HMBaseValueProtocol>)callWithArguments:(NSArray *)arguments {
    return [self.executor callWithValue:self arguments:arguments];
}

- (nullable id <HMBaseValueProtocol>)invokeMethod:(NSString *)method withArguments:(NSArray *)arguments {
    return [self.executor invokeMethodWithValue:self method:method withArguments:arguments];
}

- (nullable id <HMBaseValueProtocol>)objectForKeyedSubscript:(id)key {
    if (![key isKindOfClass:NSString.class]) {
        HMLogError(KeyIsNotString);

        return nil;
    }

    return [self.executor getWithValue:self propertyName:key];
}

- (void)setObject:(id)object forKeyedSubscript:(id)key {
    if (![key isKindOfClass:NSString.class]) {
        HMLogError(KeyIsNotString);

        return;
    }

    [self.executor setWithValue:self propertyName:key propertyObject:object];
}

- (instancetype)initWithExecutor:(id)executor {
    if (!executor) {
        return nil;
    }
    self = [super init];
    _executor = executor;

    return self;
}

@end
