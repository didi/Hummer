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

+ (void)trackWithGesture:(UIGestureRecognizer *)gesture namespace:(NSString *)namespace;

@end

NS_ASSUME_NONNULL_END
