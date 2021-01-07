//
//  HMMemCache.h
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface HMMemCache : NSObject

+ (void)removeForKey:(NSString *)key;

+ (void)setValue:(id)value forKey:(NSString *)key;

+ (id)getValueForKey:(NSString *)key;

+ (float)getFloatForKey:(NSString *)key;

+ (NSUInteger)getIntegerForKey:(NSString *)key;

+ (NSString *)getStringValueForForKey:(NSString *)key;

+ (NSArray *)getArrayForForKey:(NSString *)key;

+ (NSDictionary *)getDictionaryForForKey:(NSString *)key;

@end
