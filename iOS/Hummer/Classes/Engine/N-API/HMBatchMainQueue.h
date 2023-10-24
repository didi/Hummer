//
//  HMBatchMainQueue.h
//  Hummer
//
//  Created by didi on 2023/4/6.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMBatchMainQueue : NSObject

+ (void)run:(dispatch_block_t)block;

@end

NS_ASSUME_NONNULL_END
