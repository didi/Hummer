//
//  HMEventTrackManager.h
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import <Foundation/Foundation.h>
#import "HMEventTrackViewProperty.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMEventTrackManager : NSObject

+ (void)trackWithEventName:(NSString *)eventName view:(UIView *)view params:(NSDictionary *)params namespace:(NSString *)namespace;

@end

NS_ASSUME_NONNULL_END
