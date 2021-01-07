//
//  HMLayoutCompatibleProtocol.h
//  DoubleConversion
//
//  Created by didi on 2020/9/28.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMYogaUtility.h>

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
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) top;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) left;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) bottom;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) right;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) start;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) end;

@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) width;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) height;

@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) minWidth;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) maxWidth;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) minHeight;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) maxHeight;

/**
 * Border. Defaults to { 0, 0, 0, 0 }.
 */
@property (nonatomic, assign) float borderWidth;
@property (nonatomic, assign) float borderTopWidth;
@property (nonatomic, assign) float borderLeftWidth;
@property (nonatomic, assign) float borderBottomWidth;
@property (nonatomic, assign) float borderRightWidth;
@property (nonatomic, assign) float borderStartWidth;
@property (nonatomic, assign) float borderEndWidth;

/**
 * Margin. Defaults to { 0, 0, 0, 0 }.
 */
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) margin;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginVertical;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginHorizontal;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginTop;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginLeft;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginBottom;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginRight;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginStart;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) marginEnd;

/**
 * Padding. Defaults to { 0, 0, 0, 0 }.
 */
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) padding;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingVertical;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingHorizontal;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingTop;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingLeft;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingBottom;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingRight;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingStart;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) paddingEnd;

/**
 * Flexbox properties. All zero/disabled by default
 */
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGFlexDirection) flexDirection;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGJustify) justifyContent;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGAlign) alignSelf;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGAlign) alignItems;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGAlign) alignContent;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGPositionType) position;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGWrap) flexWrap;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGDisplay) display;

@property (nonatomic, assign) float flex;
@property (nonatomic, assign) float flexGrow;
@property (nonatomic, assign) float flexShrink;
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) flexBasis;

@property (nonatomic, assign) float aspectRatio;

/**
 * Interface direction (LTR or RTL)
 */
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGDirection) direction;

/**
 * Clipping properties
 */
@property (nonatomic, assign) YOGA_TYPE_WRAPPER(YGOverflow) overflow;

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
 * 未来会被干掉，因此不要依赖此功能
 */
@property (nonatomic, weak, readonly) UIView *view;

/**
 * @brief 只有叶子节点才能标记为脏并且向上冒泡
 */
- (void)markDirty;

@end

NS_ASSUME_NONNULL_END
