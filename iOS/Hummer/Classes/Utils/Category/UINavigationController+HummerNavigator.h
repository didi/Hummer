//
//  UINavigationController+HummerNavigator.h
//  Hummer
//
//  Created by GY on 2025/6/24.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UINavigationController (HummerNavigator)

- (void)hummer_transitionAnimationCompletion:(void (^)(id<UIViewControllerTransitionCoordinatorContext> _Nullable context))completion;
- (void)hummer_pushViewController:(UIViewController *)vc animated:(BOOL)animated closeSelf:(BOOL)closeSelf;

@end

NS_ASSUME_NONNULL_END
