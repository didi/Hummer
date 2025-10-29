//
//  HMAssertUtils.h
//  Hummer
//
//  Created by GY on 2024/10/29.
//

#import <Foundation/Foundation.h>

void _HMAssert(NSString * _Nonnull func,
               NSString * _Nonnull file,
               int lineNum,
               NSString * _Nonnull format, ...);

NS_ASSUME_NONNULL_BEGIN

@interface HMAssertUtils : NSObject

@end

NS_ASSUME_NONNULL_END
