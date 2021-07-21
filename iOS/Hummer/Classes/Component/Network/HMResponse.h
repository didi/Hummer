//
//  HMResponse.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

UIKIT_EXTERN API_DEPRECATED("HMResponse is deprecated. Use NSDictionary or NSMutableDictionary instead", ios(2.0, 9.0)) API_UNAVAILABLE(tvos)
@interface HMResponse : NSObject

@property (nonatomic, assign) NSInteger status;
@property (nonatomic, strong) NSDictionary *header;
@property (nonatomic, strong) NSDictionary *data;
@property (nonatomic, strong) NSError *error;

@end

NS_ASSUME_NONNULL_END
