//
//  HMImageCache.m
//  Hummer
//
//  Created by didi on 2020/11/19.
//

#import <Foundation/Foundation.h>
#import "HMImageCache.h"

@interface HMStorageExpiration ()

@property(nonatomic, assign) NSInteger type;    //0:never, 1:interval(second), 2:interval(day)
@property(nonatomic, assign) NSInteger interval;

@end
@implementation HMStorageExpiration

+ (HMStorageExpiration *)never{
    HMStorageExpiration *expiration = [HMStorageExpiration new];
    expiration.type = 0;
    return expiration;
}

+ (HMStorageExpiration *)seconds:(NSTimeInterval)seconds{
    HMStorageExpiration *expiration = [HMStorageExpiration new];
    expiration.type = 1;
    expiration.interval = seconds;
    return expiration;
}

+ (HMStorageExpiration *)days:(NSInteger)day{
    NSTimeInterval duration = 86400 * day;
    HMStorageExpiration *expiration = [self seconds:duration];
    expiration.type = 2;
    return expiration;
}

- (NSDate *)estimatedExpirationSinceNow {
    if (self.type == 0) {
        return [NSDate distantFuture];
    }
    return [[NSDate date] dateByAddingTimeInterval:self.interval];
}

- (BOOL)isExpired {
    return NO;
}



@end
