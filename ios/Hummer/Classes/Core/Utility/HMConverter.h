//
//  HMConverter.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <YogaKit/UIView+Yoga.h>
#import <YogaKit/YGLayout.h>
#import "HMBorderModel.h"

FOUNDATION_EXPORT bool  HMYGValueEqual(const YGValue a, const YGValue b);
FOUNDATION_EXPORT float HMResolveYGValue(const YGValue a, const float size);

@interface HMConverter : NSObject

#pragma mark - color

/*
 * only support color in RGB space,
 * so color like '[UIColor blackColor]' is not supported
 */
+ (NSString *)HMColorToString:(UIColor *)color;

NS_ASSUME_NONNULL_BEGIN

+ (nullable UIColor *)HMStringToColor:(NSString *)string;

NS_ASSUME_NONNULL_END

#pragma mark - yoga

+ (YGDirection)HMStringToYGDirection:(NSString *)string;

+ (YGFlexDirection)HMStringToYGFlexDirection:(NSString *)string;

+ (YGJustify)HMStringToYGJustify:(NSString *)string;

+ (YGAlign)HMStringToYGAlign:(NSString *)string;

+ (YGPositionType)HMStringToYGPosition:(NSString *)string;

+ (YGWrap)HMStringToYGFlexWrap:(NSString *)string;

+ (YGOverflow)HMStringToYGOverflow:(NSString *)string;

+ (YGDisplay)HMStringToYGDisplay:(NSString *)string;

NS_ASSUME_NONNULL_BEGIN

+ (YGValue)HMNumberToYGPoint:(NSObject *)number;

NS_ASSUME_NONNULL_END

#pragma mark - text

+ (NSTextAlignment)HMStringToTextAlignment:(NSString *)string;

+ (NSDictionary *)HMStringToTextDecoration:(NSString *)string;

+ (NSLineBreakMode)HMStringToBreakMode:(NSString *)string;

+ (NSDictionary *)HMNumberToLetterSpacing:(NSNumber *)number;

#pragma mark - font

+ (UIFontWeight)HMStringToFontWeight:(NSString *)string;

+ (UIFontDescriptorSymbolicTraits)HMStringToFontDescriptorSymbolicTraits:(NSString *)string;

#pragma mark - keyboard

+ (UIReturnKeyType)HMStringToReturnKeyType:(NSString *)string;

#pragma mark - basic

NS_ASSUME_NONNULL_BEGIN

+ (CGFloat)HMNumberToCGFloat:(NSObject *)number;

NS_ASSUME_NONNULL_END

+ (NSInteger)HMNumberToNSInteger:(NSNumber *)number;

NS_ASSUME_NONNULL_BEGIN

+ (CGFloat)HMStringToFloat:(NSObject *)string;

NS_ASSUME_NONNULL_END

+ (NSString *)HMStringOrigin:(NSString *)string;

+ (CGPoint)HMDicToCGPoint:(NSDictionary *)dic;

NS_ASSUME_NONNULL_BEGIN

+ (NSArray<NSNumber *> *)HMStringToNumberArray:(NSObject *)string;

NS_ASSUME_NONNULL_END

#pragma mark - border

+ (HMBorderStyle)HMStringToBorderStyle:(NSString *)string;

+ (NSArray<NSNumber *> *)HMStringToBorderStyleList:(NSString *)string;

+ (NSArray<UIColor *> *)HMStringToBorderColorList:(NSString *)string;

NS_ASSUME_NONNULL_BEGIN

+ (NSArray<NSValue *> *)HMStringToBorderRadiusList:(NSObject *)string;

NS_ASSUME_NONNULL_END

#pragma mark - shadow

NS_ASSUME_NONNULL_BEGIN

+ (nullable NSArray<NSObject *> *)HMStringToShadowAttributes:(NSString *)string;

NS_ASSUME_NONNULL_END

#pragma mark - view

+ (BOOL)HMStringToViewHidden:(NSString *)string;

+ (BOOL)HMStringToClipSubviews:(NSString *)string;

+ (UIViewContentMode)HMStringToContentMode:(NSString *)contentMode;

#pragma mark - collection view

+ (UICollectionViewScrollDirection)HMStringToDirection:(NSString *)string;

@end

NS_ASSUME_NONNULL_BEGIN

@interface NSValue (YGValue)

+ (instancetype)valueWithYGValue:(YGValue)ygValue;

@property (readonly, nonatomic, assign) YGValue ygValue;

@end

NS_ASSUME_NONNULL_END
