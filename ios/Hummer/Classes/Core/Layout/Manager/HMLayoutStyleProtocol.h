//
//  HMLayoutCompatibleProtocol.h
//  DoubleConversion
//
//  Created by didi on 2020/9/28.
//

#import <Foundation/Foundation.h>
#if __has_include(<yoga/Yoga.h>)
#import <yoga/Yoga.h>
#elif __has_include(<YogaKit/Yoga.h>)
#import <YogaKit/Yoga.h>
#endif

NS_ASSUME_NONNULL_BEGIN

/**
 * 对标 YGLayout RCTShadowView
 */
@protocol HMLayoutStyleProtocol <NSObject>

#pragma mark - RCTShadowView 必需属性

@required

/**
 * Position and dimensions.
 * Defaults to { 0, 0, NAN, NAN }.
 */
@property (nonatomic, assign) YGValue top;
@property (nonatomic, assign) YGValue left;
@property (nonatomic, assign) YGValue bottom;
@property (nonatomic, assign) YGValue right;
@property (nonatomic, assign) YGValue start;
@property (nonatomic, assign) YGValue end;

@property (nonatomic, assign) YGValue width;
@property (nonatomic, assign) YGValue height;

@property (nonatomic, assign) YGValue minWidth;
@property (nonatomic, assign) YGValue maxWidth;
@property (nonatomic, assign) YGValue minHeight;
@property (nonatomic, assign) YGValue maxHeight;

// 为了兼容 YGLayout，从 float 改成 CGFloat
/**
 * Border. Defaults to { 0, 0, 0, 0 }.
 */
@property (nonatomic, assign) CGFloat borderWidth;
@property (nonatomic, assign) CGFloat borderTopWidth;
@property (nonatomic, assign) CGFloat borderLeftWidth;
@property (nonatomic, assign) CGFloat borderBottomWidth;
@property (nonatomic, assign) CGFloat borderRightWidth;
@property (nonatomic, assign) CGFloat borderStartWidth;
@property (nonatomic, assign) CGFloat borderEndWidth;

/**
 * Margin. Defaults to { 0, 0, 0, 0 }.
 */
@property (nonatomic, assign) YGValue margin;
@property (nonatomic, assign) YGValue marginVertical;
@property (nonatomic, assign) YGValue marginHorizontal;
@property (nonatomic, assign) YGValue marginTop;
@property (nonatomic, assign) YGValue marginLeft;
@property (nonatomic, assign) YGValue marginBottom;
@property (nonatomic, assign) YGValue marginRight;
@property (nonatomic, assign) YGValue marginStart;
@property (nonatomic, assign) YGValue marginEnd;

/**
 * Padding. Defaults to { 0, 0, 0, 0 }.
 */
@property (nonatomic, assign) YGValue padding;
@property (nonatomic, assign) YGValue paddingVertical;
@property (nonatomic, assign) YGValue paddingHorizontal;
@property (nonatomic, assign) YGValue paddingTop;
@property (nonatomic, assign) YGValue paddingLeft;
@property (nonatomic, assign) YGValue paddingBottom;
@property (nonatomic, assign) YGValue paddingRight;
@property (nonatomic, assign) YGValue paddingStart;
@property (nonatomic, assign) YGValue paddingEnd;

/**
 * Flexbox properties. All zero/disabled by default
 */
@property (nonatomic, assign) YGFlexDirection flexDirection;
@property (nonatomic, assign) YGJustify justifyContent;
@property (nonatomic, assign) YGAlign alignSelf;
@property (nonatomic, assign) YGAlign alignItems;
@property (nonatomic, assign) YGAlign alignContent;
@property (nonatomic, assign) YGPositionType position;
@property (nonatomic, assign) YGWrap flexWrap;
@property (nonatomic, assign) YGDisplay display;

// 为了兼容 YGLayout，从 float 改成 CGFloat
@property (nonatomic, assign) CGFloat flex;
@property (nonatomic, assign) CGFloat flexGrow;
@property (nonatomic, assign) CGFloat flexShrink;
@property (nonatomic, assign) YGValue flexBasis;

// 为了兼容 YGLayout，从 float 改成 CGFloat
@property (nonatomic, assign) CGFloat aspectRatio;

/**
 * Interface direction (LTR or RTL)
 */
@property (nonatomic, assign) YGDirection direction;

/**
 * Clipping properties
 */
@property (nonatomic, assign) YGOverflow overflow;

#pragma mark - Hummer 目前需要的属性

/**
 * 直接获取 YGNodeRef 存储的子节点，应当在布局后判断
 */
@property (nonatomic, readonly, assign) NSUInteger numberOfChildren;

@property (nonatomic, readonly, assign) BOOL isDirty;

/**
 * 会遍历 subviews 因此需要注意性能问题，属于 YogaKit 兼容需要，未来会废弃
 */
@property (nonatomic, readonly, assign) BOOL isLeaf;

/**
 * @brief 只有叶子节点才能标记为脏并且向上冒泡
 */
- (void)markDirty;

@end

NS_ASSUME_NONNULL_END
