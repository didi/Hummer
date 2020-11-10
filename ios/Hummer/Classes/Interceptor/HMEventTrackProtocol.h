//
//  HMEventTrackProtocol.h
//  AFDownloadRequestOperation
//
//  Created by didi on 2020/8/13.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol HMEventTrackProtocol <NSObject>
@optional
- (void)asyncHandleTrackEvent:(NSDictionary *)event;
@end

NS_ASSUME_NONNULL_END
