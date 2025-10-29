//
//  HMBlockUtils.h
//  Hummer
//
//  Created by GY on 2024/11/28.
//

#import <Foundation/Foundation.h>

#define HM_SafeRunBlock(block,...)       ((block)?(block(__VA_ARGS__)):nil)

NS_ASSUME_NONNULL_BEGIN

@interface HMBlockUtils : NSObject

@end

NS_ASSUME_NONNULL_END
