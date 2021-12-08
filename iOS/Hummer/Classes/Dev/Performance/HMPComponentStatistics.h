//
//  HMPComponentStatistics.h
//  Hummer
//
//  Created by didi on 2021/11/22.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 *
 * namesspace:{
 *             instanceCount:@0,
 *             typeCount:@0
 *             components:{
 *                  view:HMPComponentStatisticsInfo
 *             }
 * }
 *
 *
 */

@interface HMPComponentStatistics : NSObject

+ (void)createNewInstance:(id)instance namespace:(NSString *)namespace;
+ (void)resetStatistic:(NSString *)namespace;
+ (NSDictionary *)statisticsForNamespace:(NSString *)namespace;
+ (NSString *)formattedStatisticsForNamespace:(NSString *)namespace;
@end

NS_ASSUME_NONNULL_END
