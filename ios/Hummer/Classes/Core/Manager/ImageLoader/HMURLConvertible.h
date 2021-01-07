//
//  HMURLConvertible.h
//  Hummer
//
//  Created by didi on 2020/11/16.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMURLConvertible <NSObject>
- (nullable NSURL *)hm_asUrl;
- (nullable NSURL *)hm_asFileUrl;
- (nullable NSString *)hm_asString;

@end

NS_ASSUME_NONNULL_END
