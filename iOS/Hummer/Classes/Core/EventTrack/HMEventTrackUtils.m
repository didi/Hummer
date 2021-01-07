//
//  HMEventTrackUtils.m
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import "HMEventTrackUtils.h"

@implementation HMEventTrackUtils
+ (NSMutableDictionary<NSString *, NSString *> *)propertiesWithTrackObject:(id<HMEventTrackViewProperty>)object {
    
    NSMutableDictionary *dic = [NSMutableDictionary new];
    [dic setValue:object.hm_elementContent forKey:HM_EVENT_PROPERTY_ELEMENT_CONTENT];
    [dic setValue:object.hm_elementId forKey:HM_EVENT_PROPERTY_ELEMENT_ID];
    [dic setValue:object.hm_elementType forKey:HM_EVENT_PROPERTY_ELEMENT_TYPE];
    return dic;
}

+ (long long)getCurrentTime {
    return [[NSDate date] timeIntervalSince1970] * 1000;
}
@end
