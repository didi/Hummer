//
//  HMDevToolsViewController.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@class HMJSContext;
@interface HMDevToolsViewController : UIViewController

@property (nonatomic, strong, readonly, class) HMDevToolsViewController *defaultDevTools;
@property (nonatomic, strong) HMJSContext *currentContext;

@end

NS_ASSUME_NONNULL_END
