//
//  HMUpgradeManager.h
//  Expecta
//
//  Created by didi on 2021/7/8.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMUpgradeManager : NSObject
+ (void)upgrageStorageForNamespace:(NSString *)namespace;
+ (void)upgrageStorageForDefaultNamespace;
@end

NS_ASSUME_NONNULL_END
