//
//  HMNavigatorPageInfo.h
//  Hummer
//
//  Created by didi on 2020/7/13.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/// Page information while transitioning
///
@interface HMNavigatorPageInfo : NSObject

@property (nonatomic, copy, nullable) NSString *nameSpace;
@property (nonatomic, copy, nullable) NSString *pageId;
@property (nonatomic, copy, nullable) NSString *url;
@property (nonatomic, copy, nullable) NSDictionary *params;

/// default value - YES;
///
@property (nonatomic, getter=isAnimated) BOOL animated;

/// @note this block will be triggered after this page disappeared.
///
@property (nonatomic, copy, nullable) void(^callback)(id _Nullable userInfo);

@end

NS_ASSUME_NONNULL_END
