//
//  HMDevTools.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class HMJSContext;
@interface HMDevTools : NSObject

+ (void)showInContext:(HMJSContext *)context;
@end

NS_ASSUME_NONNULL_END
