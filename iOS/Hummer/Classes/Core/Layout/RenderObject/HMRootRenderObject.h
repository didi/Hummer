//
//  HMRootRenderObject.h
//  Hummer
//
//  Created by 唐佳诚 on 2020/10/29.
//

#import <Hummer/HMRenderObject.h>
#import <Hummer/HMYogaUtility.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * 每一个 HMRenderObject 都有可能成为根对象
 * 需要运行时根据 view 结构，动态确定根。
 */
@interface HMRootRenderObject : NSObject

@property (nonatomic, nullable, strong) HMRenderObject *renderObject;

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
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGDirection) baseDirection;

- (void)layoutWithAffectedShadowViews:(NSHashTable<HMRenderObject *> *)affectedShadowViews;

@end

NS_ASSUME_NONNULL_END
