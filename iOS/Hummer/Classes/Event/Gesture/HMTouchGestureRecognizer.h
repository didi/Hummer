//
//  HMTouchGestureRecognizer.h
//  Hummer
//
//  Created by didi on 2023/3/10.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@class HMEventHandler;

@interface HMTouchGestureRecognizer : UIGestureRecognizer
- (instancetype)initWithHandler:(HMEventHandler *)eventHandler;
@end

NS_ASSUME_NONNULL_END
