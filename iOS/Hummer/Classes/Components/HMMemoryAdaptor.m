//
//  HMMemoryAdaptor.m
//  Hummer
//
//  Created by GY on 2024/10/28.
//

#import "HMMemoryAdaptor.h"
#import "NSString+Hummer.h"
#import "HMThreadUtils.h"

@implementation HMMemoryAdaptor
static NSMutableDictionary<NSString *, id<HMMemoryComponent>> *__HMMemoryAdaptor_map;

+ (void)initialize {
    
    __HMMemoryAdaptor_map = [NSMutableDictionary new];
}

+ (id<HMMemoryComponent>)memoryWithNamespace:(NSString *)namespace {
    // 按业务线 分配实例。
    HMAssertMainQueue();
    NSString *_namespace = [NSString hm_isValidString:namespace] ? namespace : @"namespace_hummer_default";
    id<HMMemoryComponent> _memory = [__HMMemoryAdaptor_map objectForKey:_namespace];
    if (!_memory) {
        _memory = [[HMMemoryTS alloc] initWithNamespace:_namespace];
        [__HMMemoryAdaptor_map setObject:_memory forKey:_namespace];
    }
    return _memory;
}
@end


@interface HMMemoryTS()
@property (nonatomic, strong, readwrite) NSString *namespace;
@property (nonatomic, strong, readwrite) NSMutableDictionary *cache;

@property (nonatomic, strong) NSLock *lock;
@end

@implementation HMMemoryTS

- (instancetype)initWithNamespace:(NSString *)namespace {
    self = [super init];
    if (self) {
        _namespace = namespace;
        _cache = [NSMutableDictionary new];
        _lock = [[NSLock alloc] init];
    }
    return self;
}

- (nullable NSArray *)getArrayForForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSArray class]]) {
        return (NSArray *)data;
    }
    return nil;
}

- (nullable NSDictionary *)getDictionaryForForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSDictionary class]]) {
        return (NSDictionary *)data;
    }
    return nil;
}

- (float)getFloatForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *)data).floatValue;
    }
    return 0.0;
}

- (NSUInteger)getIntegerForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *)data).integerValue;
    }
    return 0.0;
}

- (nullable NSString *)getStringValueForForKey:(nonnull NSString *)key {
    id data = [self.cache objectForKey:key];
    if ([data isKindOfClass:[NSString class]]) {
        return (NSString *)data;
    }
    return nil;
}

- (nullable id)getValueForKey:(nonnull NSString *)key {
    [_lock lock];
    id value = [self.cache objectForKey:key];
    [_lock unlock];
    return value;
}

- (void)removeForKey:(nonnull NSString *)key {
    
    if (!key) {
        return;
    }
    [_lock lock];
    [self.cache removeObjectForKey:key];
    [_lock unlock];
}

- (void)setValue:(nonnull id)value forKey:(nonnull NSString *)key {
    if(value == nil){
        [self removeForKey:key];
        return;
    }
    [_lock lock];
    [self.cache setObject:value forKey:key];
    [_lock unlock];
}

- (nonnull NSArray<NSString *> *)allKeys {
    
    //A new array containing the dictionary’s keys, or an empty array if the dictionary has no entries.
    return [self.cache allKeys];
}


- (nonnull NSDictionary *)getAll {
    
    NSDictionary *dic = self.cache.copy;
    if (dic) {
        return dic;
    }
    return @{};
}


@end
