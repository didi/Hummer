//
//  HMDialog.h
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, HMDialogType) {
    HMDialogTypeCustomDefault = 0,          //自定义选择项
    HMDialogTypeCustomDestructiveLeft,      //自定义选择项（左边着重）
    HMDialogTypeCustomDestructiveRight,     //自定义选择项（右边着重）
    HMDialogTypeCustomOneSure,              //自定义选择项（只显示一个）
    HMDialogTypeCustomDestructiveCenter     //自定义选择项（一个也着重）
};


typedef NS_ENUM(NSUInteger, HMDialogStyle) {
    HMDialogStyleAlert,
    HMDialogStyleConfirm,
    HMDialogStyleLoading,
    HMDialogStyleCustom
};;

@interface HMDialog : UIAlertController

/// @brief 是否使用当前 Hummer 容器视图所在的 window 作为对话框显示层，目前只针对 custom 方法有效
@property (nonatomic, assign) BOOL isLowLayer;

@property (nonatomic, assign, getter=isCancelabled) BOOL cancelable;

@property (nonatomic, assign, readonly) HMDialogStyle dStyle;

- (void)customView:(UIView *)view;

- (void)dismiss;

@end

NS_ASSUME_NONNULL_END
