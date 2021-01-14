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

@property (nonatomic, weak, nullable) id <HMBaseExecutorProtocol> context;

@end

NS_ASSUME_NONNULL_END

@implementation HMBaseValue

- (BOOL)isUndefined {
    return [self.context valueIsNullOrUndefined:self];
}

- (BOOL)isNull {
    return [self.context valueIsNullOrUndefined:self];
}

- (BOOL)isBoolean {
    return [self.context valueIsBoolean:self];
}

- (BOOL)isNumber {
    return [self.context valueIsNumber:self];
}

- (BOOL)isString {
    return [self.context valueIsString:self];
}

- (BOOL)isObject {
    return [self.context valueIsObject:self];
}

- (BOOL)isArray {
    return [self.context valueIsArray:self];
}

+ (nullable HMBaseValue *)valueWithObject:(id)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithObject:value];
}

+ (nullable HMBaseValue *)valueWithBool:(BOOL)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

+ (nullable HMBaseValue *)valueWithDouble:(double)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

+ (nullable HMBaseValue *)valueWithInt32:(int32_t)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

+ (nullable HMBaseValue *)valueWithUInt32:(uint32_t)value inContext:(id <HMBaseExecutorProtocol>)context {
    return [context convertToValueWithNumber:@(value)];
}

- (BOOL)isDictionary {
    return [self.context valueIsDictionary:self];
}

- (BOOL)isNativeObject {
    return [self.context valueIsNativeObject:self];
}

- (BOOL)isFunction {
    return [self.context valueIsFunction:self];
}

+ (nullable HMBaseValue *)valueWithNullInContext:(id)context {
    return nil;
}

+ (nullable HMBaseValue *)valueWithUndefinedInContext:(id)context {
    return nil;
}

- (nullable id)toObject {
    return [self.context convertToObjectWithValue:self isPortableConvert:NO];
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
    return [self.context convertToNumberWithValue:self];
}

- (nullable NSString *)toString {
    return [self.context convertToStringWithValue:self];
}

- (nullable NSArray *)toArray {
    return [self.context convertToArrayWithValue:self isPortableConvert:NO];
}

- (nullable NSDictionary<NSString *, id> *)toDictionary {
    return [self.context convertToDictionaryWithValue:self isPortableConvert:NO];
}

- (nullable id)toPortableObject {
    return [self.context convertToObjectWithValue:self isPortableConvert:YES];
}

- (nullable NSDictionary<NSString *, NSObject *> *)toPortableDictionary {
    return [self.context convertToDictionaryWithValue:self isPortableConvert:YES];
}

- (nullable NSArray<NSObject *> *)toPortableArray {
    return [self.context convertToArrayWithValue:self isPortableConvert:YES];
}

- (nullable NSObject *)toNativeObject {
    return [self.context convertToNativeObjectWithValue:self];
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
    return [self.context convertToFunctionWithValue:self];
}

- (BOOL)isEqualToObject:(id)other {
    return [self.context compareWithValue:self anotherValue:other];
}

- (nullable HMBaseValue *)callWithArguments:(NSArray *)arguments {
    return [self.context callWithValue:self arguments:arguments];
}

- (nullable HMBaseValue *)invokeMethod:(NSString *)method withArguments:(NSArray *)arguments {
    return [self.context invokeMethodWithValue:self method:method withArguments:arguments];
}

- (nullable HMBaseValue *)objectForKeyedSubscript:(id)key {
    if (![key isKindOfClass:NSString.class]) {
        HMLogError(KeyIsNotString);

        return nil;
    }

    return [self.context getWithValue:self propertyName:key];
}

- (void)setObject:(id)object forKeyedSubscript:(id)key {
    if (![key isKindOfClass:NSString.class]) {
        HMLogError(KeyIsNotString);

        return;
    }

    [self.context setWithValue:self propertyName:key propertyObject:object];
}

- (instancetype)initWithExecutor:(id)executor {
    if (!executor) {
        return nil;
    }
    self = [super init];
    _context = executor;

    return self;
}

- (BOOL)hasProperty:(NSString *)propertyString {
    HMBaseValue *value = self.context[propertyString];

    return !value.isUndefined && !value.isNull;
}

@end
