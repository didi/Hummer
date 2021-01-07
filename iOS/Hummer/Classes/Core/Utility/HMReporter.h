//
//  HMReporter.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMReporter : NSObject

+ (void)reportPerformanceWithBlock:(void (^)(dispatch_block_t finishBlock))excuteBlock
                            forKey:(NSString *)reportKey;

+ (void)reportValue:(id)value forKey:(NSString *)reportKey;

@end

NS_ASSUME_NONNULL_END
