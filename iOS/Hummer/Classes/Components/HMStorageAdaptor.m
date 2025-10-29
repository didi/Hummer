//
//  HMStorageAdaptor.m
//  Hummer
//
//  Created by GY on 2024/10/28.
//

#import "HMStorageAdaptor.h"
#import "NSString+Hummer.h"
#import "HMThreadUtils.h"
#import "HMFileManager.h"

@implementation HMStorageAdaptor
static NSMutableDictionary<NSString *, id<HMStorage>> *__HMStorageAdaptor_map;

+ (void)initialize {
    
    __HMStorageAdaptor_map = [NSMutableDictionary new];
}

+ (id<HMStorage>)storageWithNamespace:(NSString *)namespace {
    // 按业务线 分配实例。
    NSString *_namespace = [NSString hm_isValidString:namespace] ? namespace : @"namespace_hummer_default";
    id<HMStorage> storage = [__HMStorageAdaptor_map objectForKey:_namespace];
    if (!storage) {
        storage = [[HMStorageTS alloc] initWithPath:_namespace];
        [__HMStorageAdaptor_map setObject:storage forKey:_namespace];
    }
    return storage;
}

@end



@interface HMStorageTS()

@property (nonatomic, strong, readwrite) NSString *path;

@property (nonatomic, strong, readwrite) NSString *cachePath;

@end

@implementation HMStorageTS

- (instancetype)initWithPath:(NSString *)path {
    
    self = [super init];
    if (self) {
        
        _path = path;
        //Document/namespace/hm_storage/key.xxx
        _cachePath = [[HMFileManager sharedManager] createDirectoryAtHMDocumentRoot:[NSString stringWithFormat:@"%@/%@", path, HMStorageDirectoryDefaultKey]];
    }
    return self;;
}
#pragma mark - common

- (BOOL)existForKey:(NSString *)key {
    
    if (![NSString hm_isValidString:key]) {
        return NO;
    }
    NSString *fullPath = [self getFilePathWithKey:key];
    return [[NSFileManager defaultManager] fileExistsAtPath:fullPath];
}


- (BOOL)removeForKey:(NSString *)key {
    if (![self existForKey:key]) {
        return YES;
    }
    NSString * fullPath = [self getFilePathWithKey:key];
    NSError * error ;
    [[NSFileManager defaultManager] removeItemAtPath:fullPath error:&error];
    return error!=nil;
}

- (BOOL)removeAll {
    NSError * error ;
    [[NSFileManager defaultManager] removeItemAtPath:self.cachePath error:&error];
    return error!=nil;
}


- (BOOL)saveData:(id<NSCoding>)data forKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return YES;
    }
    BOOL ret = [NSKeyedArchiver archiveRootObject:data toFile:[self getFilePathWithKey:key]];
    return ret;
}

-(id<NSCoding>)ObjectForKey:(NSString *)key {
    if (![NSString hm_isValidString:key]) {
        return nil;
    }
    NSString *fullPath = [self getFilePathWithKey:key];
    return (id<NSCoding>)[NSKeyedUnarchiver unarchiveObjectWithFile:fullPath];
}

- (nonnull NSArray<NSString *> *)allKeys {

    NSArray<NSString *> *keys = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:self.cachePath error:nil];
    if (keys) {
     
        return keys;
    }
    return @[];
}

- (NSDictionary *)getAll {
    NSArray<NSString *> *keys = [self allKeys];
    if (keys) {
        NSMutableDictionary *res = [NSMutableDictionary new];
        [keys enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            id value = [self ObjectForKey:obj];
            if (value) {
                
                [res setObject:value forKey:obj];
            }
        }];
        return res;
    }
    return @{};
}

#pragma mark - Private

- (NSString *)getFilePathWithKey:(NSString *)key {
    NSAssert(key!=nil, @"hmStorage cache key can not be nil");
    NSString * filePath = [_cachePath stringByAppendingPathComponent:key];
    return filePath;
}



@end
