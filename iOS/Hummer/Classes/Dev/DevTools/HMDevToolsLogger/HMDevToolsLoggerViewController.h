//
//  HMDevToolsLoggerViewController.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>
#import "HMDevToolsViewControllerProtocol.h"

@class HMDevToolsLoggerVCModel;

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsLoggerViewController : UIViewController<HMDevToolsViewControllerProtocol>
@property (nonatomic, strong) HMDevToolsLoggerVCModel *vcModel;
- (void)reloadData;
@end

NS_ASSUME_NONNULL_END
