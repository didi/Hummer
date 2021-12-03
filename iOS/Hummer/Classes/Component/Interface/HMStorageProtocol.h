//
//  HMStorage.h
//  Expecta
//
//  Created by didi on 2021/7/6.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMStorage <NSObject>


- (BOOL)saveData:(id<NSCoding>)data forKey:(NSString *)key;
- (id<NSCoding>)ObjectForKey:(NSString *)key;
- (BOOL)existForKey:(NSString *)key;
- (BOOL)removeForKey:(NSString *)key;

- (NSArray <NSString *> *)allKeys;

- (NSDictionary *)getAll;


- (BOOL)removeAll;
@end

NS_ASSUME_NONNULL_END
