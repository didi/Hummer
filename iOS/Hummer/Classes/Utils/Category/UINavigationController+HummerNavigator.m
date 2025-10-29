//
//  UINavigationController+HummerNavigator.m
//  Hummer
//
//  Created by GY on 2025/6/24.
//

#import "UINavigationController+HummerNavigator.h"

@implementation UINavigationController (HummerNavigator)

///转场完成，已经didiappear
- (void)hummer_transitionAnimationCompletion:(void (^)(id<UIViewControllerTransitionCoordinatorContext> _Nullable context))completion {
    if (!self.transitionCoordinator) {
        !completion ?: completion(nil);
    } else {
        if (self.transitionCoordinator.isInteractive) {
            ///侧滑手势
            [self.transitionCoordinator notifyWhenInteractionEndsUsingBlock:^(id<UIViewControllerTransitionCoordinatorContext> _Nonnull context) {
                if (![context isCancelled]) {
                    !completion ?: completion(context);
                }
            }];
        } else {
            [self.transitionCoordinator animateAlongsideTransition:nil completion:^(id<UIViewControllerTransitionCoordinatorContext> _Nonnull context) {
                if (![context isCancelled]) {
                    !completion ?: completion(context);
                }
            }];
        }
    }
}

- (void)hummer_pushViewController:(UIViewController *)vc animated:(BOOL)animated closeSelf:(BOOL)closeSelf {
    
    [self pushViewController:vc animated:animated];
    if (closeSelf) {
        __weak typeof(self) wSelf = self;
        [self hummer_transitionAnimationCompletion:^(id<UIViewControllerTransitionCoordinatorContext>  _Nullable context) {
            
            __strong typeof(wSelf) sSelf = wSelf;
            if (!sSelf) {return;}
            NSMutableArray *tempArr = [sSelf.childViewControllers mutableCopy];
            if (tempArr.count >= 2) {
                //无法做校验 倒数第二个vc == closeSelf VC，因此直接移除前一个
                [tempArr removeObjectAtIndex:tempArr.count-2];
                [sSelf setViewControllers:tempArr animated:NO];
            }
        }];
    }
}
@end
