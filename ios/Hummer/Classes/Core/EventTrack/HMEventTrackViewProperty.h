//
//  HMEventTrackViewProperty.h
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import <Foundation/Foundation.h>


NS_ASSUME_NONNULL_BEGIN

static NSString * const HM_EVENT_PROPERTY_ELEMENT_CONTENT = @"view_content";
static NSString * const HM_EVENT_PROPERTY_ELEMENT_ID = @"view_id";
static NSString * const HM_EVENT_PROPERTY_ELEMENT_TYPE = @"view_name";
static NSString * const HM_EVENT_PROPERTY_TYPE = @"event_name";
static NSString * const HM_EVENT_PROPERTY_TIMESTAMP = @"timestamp";

@protocol HMEventTrackViewProperty <NSObject>

@property (nonatomic, copy, readonly, nonnull) NSString *hm_elementType;
@property (nonatomic, copy, readonly, nullable) NSString *hm_elementContent;
@property (nonatomic, copy, readonly, nullable) NSString *hm_elementId;
@end

@protocol HMEventTrackViewPathProperty <NSObject>

@end
NS_ASSUME_NONNULL_END
