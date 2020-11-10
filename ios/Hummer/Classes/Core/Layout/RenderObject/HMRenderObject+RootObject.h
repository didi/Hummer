//
//  HMRenderObject+RootObject.h
//  Hummer
//
//  Created by didi on 2020/9/27.
//

#import <Hummer/HMRenderObject.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * 每一个 HMRenderObject 都有可能成为根对象
 * 需要运行时根据 view 结构，动态确定根。
 */
@interface HMRenderObject (RootObject)

/**
 * Minimum size to layout all views.
 * Defaults to CGSizeZero
 */
@property (nonatomic, assign) CGSize minimumSize;

/**
 * Available size to layout all views.
 * Defaults to {INFINITY, INFINITY}
 */
@property (nonatomic, assign) CGSize availableSize;

/**
 * Layout direction (LTR or RTL) inherited from native environment and
 * is using as a base direction value in layout engine.
 * Defaults to value inferred from current locale.
 */
@property (nonatomic, assign) YGDirection baseDirection;

- (void)layoutWithAffectedShadowViews:(NSHashTable<HMRenderObject *> *)affectedShadowViews;

@end

NS_ASSUME_NONNULL_END
