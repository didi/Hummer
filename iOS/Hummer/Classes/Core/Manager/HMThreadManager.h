//
//  HMThreadManager.h
//  Hummer
//
//  Created by didi on 2022/6/8.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMThreadManager : NSObject

+ (void)setupJSThread:(dispatch_block_t)task;
+ (void)runOnJSThread:(dispatch_block_t)task;
@end

NS_ASSUME_NONNULL_END
