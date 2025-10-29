//
//  HMThreadUtils.h
//  Hummer
//
//  Created by GY on 2024/10/29.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

FOUNDATION_EXPORT void HMAssertMainQueue(void);

FOUNDATION_EXPORT void HMSafeMainThread(dispatch_block_t _Nullable block);

FOUNDATION_EXPORT void HMSafeMainThreadNextTick(dispatch_block_t _Nullable block);

#define HM_SafeRunBlockAtMainThread(block,...)   \
        if(block){  \
            HMSafeMainThread(^{ \
                block(__VA_ARGS__); \
            }); \
        }

@interface HMThreadUtils : NSObject

@end

NS_ASSUME_NONNULL_END
