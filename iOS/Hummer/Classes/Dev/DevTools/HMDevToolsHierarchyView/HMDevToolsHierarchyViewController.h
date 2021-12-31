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

// 为了延迟视图树获取逻辑，必须手动调用触发逻辑
- (void)refresh;
@end

NS_ASSUME_NONNULL_END
