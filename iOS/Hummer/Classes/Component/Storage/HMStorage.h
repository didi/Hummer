//
//  HMStorage.h
//  Hummer
//
//  Created by UJOY on 2020/2/6.
//  Copyright © 2020 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMStorage : NSObject

+ (BOOL)saveData:(id<NSCoding>)data forKey:(NSString *)key;
+(id<NSCoding>)ObjectForKey:(NSString *)key;
+ (BOOL)removeForKey:(NSString *)key;
+ (BOOL)existForKey:(NSString *)key;

@end

NS_ASSUME_NONNULL_END
