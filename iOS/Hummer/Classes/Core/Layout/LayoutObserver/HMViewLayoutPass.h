//
//  HMViewLayoutPass.h
//  Hummer
//
//  Created by didi on 2020/12/17.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * view 布局函数。
 * 布局周期函数内不要做复杂行为，否则会 block 到主线程。
 * view 子类使用时，请调用super
 */
@protocol HMViewLayoutPass <NSObject>


@optional
// yoga 计算布局结束，应用布局之前
- (void)hm_willPerformLayout;

// 设置 frame 之后。
- (void)hm_didPerformLayout;
@end

NS_ASSUME_NONNULL_END
