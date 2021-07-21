//
//  HMDevToolsHierarchyViewController.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>
#import "HMDevToolsViewControllerProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsHierarchyViewController : UITableViewController<HMDevToolsViewControllerProtocol>

+ (instancetype)hierarchyViewWithRootView:(UIView *)rootView;

@end

NS_ASSUME_NONNULL_END
