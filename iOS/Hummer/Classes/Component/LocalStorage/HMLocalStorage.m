//
//  HMLocalStorage.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMLocalStorage.h"
#import "HMBaseValue.h"
#import "HMExportManager.h"

@implementation HMLocalStorage

HM_EXPORT_CLASS(LocalStorage, HMLocalStorage)

HM_EXPORT_METHOD(setItem, setItem:value:)
HM_EXPORT_METHOD(getItem, getItem:)
HM_EXPORT_METHOD(removeItem, removeItem:)

- (NSNumber *)setItem:(HMBaseValue *)key
                value:(HMBaseValue *)value {
    NSString *keyString = [key toString];
    NSDictionary *valueObject = [value toDictionary];
    if (!keyString ||
        [keyString isEqualToString:@""] ||
        !valueObject) {
        return @(NO);
    }
    
    NSString *path = [self pathForItem:keyString];
    BOOL succeed = [NSKeyedArchiver archiveRootObject:valueObject toFile:path];
    return @(succeed);
}

- (NSDictionary *)getItem:(HMBaseValue *)key {
    NSString *keyString = [key toString];
    
    NSString *path = [self pathForItem:keyString];
    NSDictionary *object = [NSKeyedUnarchiver unarchiveObjectWithFile:path];
    return object;
}

- (NSNumber *)removeItem:(HMBaseValue *)key {
    NSString *keyString = [key toString];
    
    NSString *path = [self pathForItem:keyString];
    NSError *error = nil;
    [[NSFileManager defaultManager] removeItemAtPath:path error:&error];
    return error ? @(NO) : @(YES);
}

- (NSString *)pathForItem:(NSString *)item {
    NSString *path = [self documentPath];
    NSString *component = [NSString stringWithFormat:@"%@.plist", item];
    path = [path stringByAppendingPathComponent:component];
    return path;
}

- (NSString *)documentPath {
    NSArray *documents = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                             NSUserDomainMask,
                                                             YES);
    NSString *documentPath = documents[0];
    return documentPath;
}

@end
