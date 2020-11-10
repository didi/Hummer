//
//  HMEventTrackUtils.h
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import <Foundation/Foundation.h>
#import "HMEventTrackViewProperty.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMEventTrackUtils : NSObject

+ (NSMutableDictionary<NSString *, NSString *> *)propertiesWithTrackObject:(id<HMEventTrackViewProperty>)object;
+ (long long)getCurrentTime;
@end

NS_ASSUME_NONNULL_END
