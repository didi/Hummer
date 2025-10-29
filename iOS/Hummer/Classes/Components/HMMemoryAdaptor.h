//
//  HMMemoryAdaptor.h
//  Hummer
//
//  Created by GY on 2024/10/28.
//

#import <Foundation/Foundation.h>

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


NS_ASSUME_NONNULL_BEGIN

@interface HMMemoryAdaptor : NSObject

/**
 * 类似 HMStorageAdaptor 的设计。
 */
+ (id<HMMemoryComponent>)memoryWithNamespace:(nullable NSString *)namespace;

@end

/// 内存组件线程安全版本
@interface HMMemoryTS : NSObject<HMMemoryComponent>
@property (nonatomic, strong, readonly) NSString *namespace;

- (instancetype)initWithNamespace:(NSString *)namespace;
@end

NS_ASSUME_NONNULL_END
