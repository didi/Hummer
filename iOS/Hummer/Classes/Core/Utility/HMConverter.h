//
//  HMConverter.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMBorderModel.h"
#import "HMYogaUtility.h"

NS_ASSUME_NONNULL_BEGIN

extern const UIAccessibilityTraits HummerSwitchAccessibilityTrait;

/**
 * This macro is used for logging conversion errors. This is just used to
 * avoid repeating the same boilerplate for every error message.
 */
#define HMLogConvertError(json, typeName) HMLogError(@"JSON value '%@' of type %@ cannot be converted to %@", json, [json classForCoder], typeName)

/**
 * This macro is used for creating converter functions for directly
 * representable json values that require no conversion.
 */
#define HM_JSON_CONVERTER(type) \
+ (type *)type:(id)json { \
    if ([json isKindOfClass:[type class]]) { \
      return json; \
    } else if (json) { \
      HMLogConvertError(json, @#type); \
    } \
\
    return nil; \
}

#define HM_JSON_CONVERTER_DECLARATION(type) \
+ (nullable type *)type:(nullable id)json;

/**
 * This macro is used for creating converters for enum types for
 * multiple enum values combined with | operator
 */
#define HM_MULTI_ENUM_CONVERTER(type, values, default, getter) \
+ (type)type:(id)json { \
    static NSDictionary *mapping; \
    static dispatch_once_t onceToken; \
    dispatch_once(&onceToken, ^{ \
        mapping = values; \
    }); \
\
    return [HMConvertMultiEnumValue(#type, mapping, @(default), json) getter]; \
}

#define HM_MULTI_ENUM_CONVERTER_DECLARATION(type) \
+ (type)type:(nullable id)json;

NSNumber *_Nullable HMConvertEnumValue(const char *_Nullable typeName, NSDictionary *_Nullable mapping, NSNumber *_Nullable defaultValue, id _Nullable json);

NSNumber *_Nullable HMConvertMultiEnumValue(const char *_Nullable typeName, NSDictionary *_Nullable mapping, NSNumber *_Nullable defaultValue, id _Nullable json);

NS_ASSUME_NONNULL_END

@interface HMConverter : NSObject

NS_ASSUME_NONNULL_BEGIN

HM_MULTI_ENUM_CONVERTER_DECLARATION(UIAccessibilityTraits)

HM_JSON_CONVERTER_DECLARATION(NSDictionary)

NS_ASSUME_NONNULL_END

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

+ (YOGA_TYPE_WRAPPER(YGDirection))HMStringToYGDirection:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGFlexDirection))HMStringToYGFlexDirection:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGJustify))HMStringToYGJustify:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGAlign))HMStringToYGAlign:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGPositionType))HMStringToYGPosition:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGWrap))HMStringToYGFlexWrap:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGOverflow))HMStringToYGOverflow:(NSString *)string;

+ (YOGA_TYPE_WRAPPER(YGDisplay))HMStringToYGDisplay:(NSString *)string;

NS_ASSUME_NONNULL_BEGIN

+ (YOGA_TYPE_WRAPPER(YGValue))HMNumberToYGPoint:(NSObject *)number;

NS_ASSUME_NONNULL_END

#pragma mark - text

+ (NSTextAlignment)HMStringToTextAlignment:(NSString *)string;

/// HMAttributesTextVerticalAlign
+ (NSInteger)HMStringToTextVerticalAlignment:(NSString *)string;

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

+ (float)HMNumberToFloat:(nullable NSObject *)number;

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

#pragma mark - origin value

+ (id)HMValueOrigin:(id)value;

@end

NS_ASSUME_NONNULL_BEGIN

@interface NSValue (YGValue)

+ (instancetype)valueWithYGValue:(YOGA_TYPE_WRAPPER(YGValue))ygValue;

@property (readonly, nonatomic, assign) YOGA_TYPE_WRAPPER(YGValue) ygValue;

@end

NS_ASSUME_NONNULL_END
