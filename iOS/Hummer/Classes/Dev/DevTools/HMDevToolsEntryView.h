//
//  HMDevToolsEntryView.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class HMJSContext;
@interface HMDevToolsEntryView : UIView

+ (instancetype)entryWindow;

+ (void)showWithContext:(HMJSContext *)context;

- (void)hide;

@end

NS_ASSUME_NONNULL_END
