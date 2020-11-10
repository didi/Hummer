//
//  HMLayoutProtocol.h
//  DoubleConversion
//
//  Created by didi on 2020/9/28.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMLayoutStyleProtocol.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^HMLayoutConfigurationBlock)(id<HMLayoutStyleProtocol> layout);

@protocol HMLayoutProtocol <NSObject>

@required

- (void)hm_configureLayoutWithBlock:(HMLayoutConfigurationBlock)block;

/**
 * 只做计算，不做布局
 * @param minimumSize 最小大小约束，可以使用 CGSizeZero
 * @param maximumSize 最大大小约束，使用 CGFloat_MAX 表示无约束，也可以用 YGUndefined
 * @return CGSize
 */
- (CGSize)hm_sizeThatFitsMinimumSize:(CGSize)minimumSize maximumSize:(CGSize)maximumSize;

- (CGSize)hm_sizeThatFits:(CGSize)size;

- (void)hm_applyLayoutPreservingOrigin:(BOOL)preserveOrigin;

@end

NS_ASSUME_NONNULL_END
