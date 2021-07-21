//
//  HMDevPageInfoViewController.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>
#import "HMDevToolsViewControllerProtocol.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, HMDevToolsTextType) {
    HMDevToolsTextTypePageInfo,
    HMDevToolsTextTypeViewTree,
    HMDevToolsTextTypeCallerTree,
};

@interface HMDevPageInfoViewController : UIViewController<HMDevToolsViewControllerProtocol>

@property (nonatomic, assign) HMDevToolsTextType textType;

@end

NS_ASSUME_NONNULL_END
