//
//  HMMemoryComponent.h
//  Hummer
//
//  Created by didi on 2021/7/13.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMMemoryComponent <NSObject>

- (void)removeForKey:(NSString *)key;

- (void)setValue:(id)value forKey:(NSString *)key;

- (nullable id)getValueForKey:(NSString *)key;

- (float)getFloatForKey:(NSString *)key;

- (NSUInteger)getIntegerForKey:(NSString *)key;

- (nullable NSString *)getStringValueForForKey:(NSString *)key;

- (nullable NSArray *)getArrayForForKey:(NSString *)key;

- (nullable NSDictionary *)getDictionaryForForKey:(NSString *)key;


- (NSArray <NSString *> *)allKeys;

- (NSDictionary *)getAll;

@end

NS_ASSUME_NONNULL_END
