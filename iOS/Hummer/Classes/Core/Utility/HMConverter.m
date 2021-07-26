//
//  HMConverter.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMConverter.h"

#import "HMUtility.h"
#import "HMConfig.h"
#import "HMGradientColor.h"
#import "UIView+HMRenderObject.h"

UIAccessibilityTraits const HummerSwitchAccessibilityTrait = 0x20000000000001;

NSNumber *HMConvertEnumValue(const char *typeName, NSDictionary *mapping, NSNumber *defaultValue, id json) {
    if (!json) {
        return defaultValue;
    }
    if ([json isKindOfClass:[NSNumber class]]) {
        NSArray *allValues = mapping.allValues;
        if ([allValues containsObject:json] || [json isEqual:defaultValue]) {
            return json;
        }
        HMLogError(@"Invalid %s '%@'. should be one of: %@", typeName, json, allValues);
        
        return defaultValue;
    }
    if (![json isKindOfClass:[NSString class]]) {
        HMLogError(@"Expected NSNumber or NSString for %s, received %@: %@", typeName, [json classForCoder], json);
    }
    id value = mapping[json];
    if (!value && [json description].length > 0) {
        HMLogError(@"Invalid %s '%@'. should be one of: %@", typeName, json, [[mapping allKeys] sortedArrayUsingSelector:@selector(caseInsensitiveCompare:)]);
    }
    
    return value ?: defaultValue;
}

NSNumber *HMConvertMultiEnumValue(const char *typeName, NSDictionary *mapping, NSNumber *defaultValue, id json) {
    if ([json isKindOfClass:[NSArray class]]) {
        if ([json count] == 0) {
            return defaultValue;
        }
        long long result = 0;
        for (id arrayElement in json) {
            NSNumber *value = HMConvertEnumValue(typeName, mapping, defaultValue, arrayElement);
            result |= value.longLongValue;
        }
        
        return @(result);
    }
    
    return HMConvertEnumValue(typeName, mapping, defaultValue, json);
}

NS_ASSUME_NONNULL_BEGIN

static UIColor *HEXCOLOR(unsigned int c);

static UIColor *HEXCOLORRGB(unsigned int c);

NS_ASSUME_NONNULL_END

static UIColor *HEXCOLOR(unsigned int c) {
    return [UIColor        colorWithRed:((c >> 24) & 0xFF) / 255.0 green:((c >> 16) & 0xFF) / 255.0 blue:((c
            >> 8) & 0xFF) / 255.0 alpha:((c) & 0xFF) / 255.0];
}

static UIColor *HEXCOLORRGB(unsigned int c) {
    return [UIColor       colorWithRed:((c >> 16) & 0xFF) / 255.0 green:((c
            >> 8) & 0xFF) / 255.0 blue:((c) & 0xFF) / 255.0 alpha:1];
}

bool HMYGValueEqual(const YOGA_TYPE_WRAPPER(YGValue) a, const YOGA_TYPE_WRAPPER(YGValue) b) {
    if (a.unit != b.unit) {
        return false;
    }
    return a.value == b.value;
}

float HMResolveYGValue(const YOGA_TYPE_WRAPPER(YGValue) value, const float size) {
    if (value.unit == YOGA_TYPE_WRAPPER(YGUnitPoint)) {
        return value.value;
    }
    return value.value * size * 0.01;
}

@implementation HMConverter

HM_JSON_CONVERTER(NSDictionary)

HM_MULTI_ENUM_CONVERTER(
                        UIAccessibilityTraits,
                        (@{
                            @"none" : @(UIAccessibilityTraitNone),
                            @"button" : @(UIAccessibilityTraitButton),
                            @"link" : @(UIAccessibilityTraitLink),
                            @"header" : @(UIAccessibilityTraitHeader),
                            @"search" : @(UIAccessibilityTraitSearchField),
                            @"image" : @(UIAccessibilityTraitImage),
                            @"imagebutton" : @(UIAccessibilityTraitImage | UIAccessibilityTraitButton),
                            @"selected" : @(UIAccessibilityTraitSelected),
                            @"plays" : @(UIAccessibilityTraitPlaysSound),
                            @"key" : @(UIAccessibilityTraitKeyboardKey),
                            @"keyboardkey" : @(UIAccessibilityTraitKeyboardKey),
                            @"text" : @(UIAccessibilityTraitStaticText),
                            @"summary" : @(UIAccessibilityTraitSummaryElement),
                            @"disabled" : @(UIAccessibilityTraitNotEnabled),
                            @"frequentUpdates" : @(UIAccessibilityTraitUpdatesFrequently),
                            @"startsMedia" : @(UIAccessibilityTraitStartsMediaSession),
                            @"adjustable" : @(UIAccessibilityTraitAdjustable),
                            @"allowsDirectInteraction" : @(UIAccessibilityTraitAllowsDirectInteraction),
                            @"pageTurn" : @(UIAccessibilityTraitCausesPageTurn),
                            @"alert" : @(UIAccessibilityTraitNone),
                            @"checkbox" : @(UIAccessibilityTraitNone),
                            @"combobox" : @(UIAccessibilityTraitNone),
                            @"menu" : @(UIAccessibilityTraitNone),
                            @"menubar" : @(UIAccessibilityTraitNone),
                            @"menuitem" : @(UIAccessibilityTraitNone),
                            @"progressbar" : @(UIAccessibilityTraitNone),
                            @"radio" : @(UIAccessibilityTraitNone),
                            @"radiogroup" : @(UIAccessibilityTraitNone),
                            @"scrollbar" : @(UIAccessibilityTraitNone),
                            @"spinbutton" : @(UIAccessibilityTraitNone),
                            @"switch" : @(HummerSwitchAccessibilityTrait),
                            @"tab" : @(UIAccessibilityTraitNone),
                            @"tablist" : @(UIAccessibilityTraitNone),
                            @"timer" : @(UIAccessibilityTraitNone),
                            @"toolbar" : @(UIAccessibilityTraitNone),
                         }),
                        UIAccessibilityTraitNone,
                        unsignedLongLongValue)

#pragma mark - color

+ (UIColor *)HMStringToColor:(NSString *)string {
    // 1. #AA0000 RGB
    // 2. #AA000000 RGBA
    // 3. linear-gradient(90deg #FF000060 #00FF0060) linear-gradient(90 #FF000060 #00FF0060)
    if ([string hasPrefix:@"#"]) {
        NSString *hexStr = [[string stringByReplacingOccurrencesOfString:@"#" withString:@""] uppercaseString];
        NSScanner *scanner = [NSScanner scannerWithString:hexStr];
        uint32_t hexNum = 0;
        if ([scanner scanHexInt:&hexNum] && scanner.isAtEnd) {
            if (hexStr.length > 6) {
                return HEXCOLOR(hexNum);
            } else {
                return HEXCOLORRGB(hexNum);
            }
        } else {
            return nil;
        }
    }
    
    if ([string hasPrefix:@"linear-gradient"]) {
        NSRange begin = [string rangeOfString:@"("];
        NSRange end = [string rangeOfString:@")"];
        NSUInteger loc = begin.location + 1;
        NSUInteger len = end.location - begin.location - 1;
        NSRange colorInfoRange = NSMakeRange(loc, len);
        NSString *colorInfoString = [string substringWithRange:colorInfoRange];
        NSAssert(colorInfoString.length > 0, @"empty color");
        if (colorInfoString.length == 0) {
            return nil;
        }
        NSArray *colorInfo = [colorInfoString componentsSeparatedByString:@" "];
        NSAssert(colorInfo.count == 3, @"wrong color format");
        if (colorInfo.count != 3) {
            return nil;
        }
        
        HMGradientColor *color = [[HMGradientColor alloc] init];
        
        NSString *degreeString = colorInfo[0];
        NSUInteger degree = degreeString.integerValue;
        degree = degree%360;
        
        color.beginPoint = [self beginPointForDegree:degree];
        color.endPoint = [self endPointForDegree:degree];
        
        NSString *beginColorString = colorInfo[1];
        color.beginColor = [self HMStringToColor:beginColorString] ?: UIColor.blackColor;
        // 如果改成 clearColor，CAGradientLayer 会计算错误，导致显示有问题
//        if (CGColorGetAlpha(color.beginColor.CGColor) == 0.0) {//alpha = 0 case CAGradientLayer处理颜色可能出现非预期效果比如:[0 0.862745 0.196078 0] 这里强制透明色
//            color.beginColor = [UIColor clearColor];
//        }
        
        NSString *endColorString = colorInfo[2];
        color.endColor = [self HMStringToColor:endColorString] ?: UIColor.blackColor;
        
        return color;
    }
    
    return nil;
}

+ (NSString *)HMColorToString:(UIColor *)color {
    if (!color) {
        return nil;
    }
    
    const CGFloat *components = CGColorGetComponents(color.CGColor);
    
    CGFloat red = components[0];
    CGFloat green = components[1];
    CGFloat blue = components[2];
    
    return [NSString stringWithFormat:@"#%02lX%02lX%02lX",
            lroundf(red * 255),
            lroundf(green * 255),
            lroundf(blue * 255)];
}

+ (CGPoint)beginPointForDegree:(NSUInteger)degree {
    CGFloat radian = [self radianForDegree:90 + degree];
    CGFloat x = cosf(radian);
    CGFloat y = sinf(radian);
    CGPoint lineBegin = CGPointMake(0.5, 0.5);
    CGPoint lineEnd = CGPointMake(x + 0.5, y + 0.5);
    
    CGPoint beginPoint = [self intersectionPointInRectForLineBegin:lineBegin
                                                           lineEnd:lineEnd];
    return beginPoint;
}

+ (CGPoint)endPointForDegree:(NSUInteger)degree {
    CGFloat radian = [self radianForDegree:270 + degree];
    CGFloat x = cosf(radian);
    CGFloat y = sinf(radian);
    CGPoint lineBegin = CGPointMake(0.5, 0.5);
    CGPoint lineEnd = CGPointMake(x + 0.5, y + 0.5);
    
    CGPoint endPoint = [self intersectionPointInRectForLineBegin:lineBegin
                                                         lineEnd:lineEnd];
    return endPoint;
}

+ (CGPoint)intersectionPointInRectForLineBegin:(CGPoint)lineBegin
                                       lineEnd:(CGPoint)lineEnd {
    CGPoint leftTop = CGPointMake(0.0, 0.0);
    CGPoint rightTop = CGPointMake(1.0, 0.0);
    CGPoint leftBottom = CGPointMake(0.0, 1.0);
    CGPoint rightBottom = CGPointMake(1.0, 1.0);
    
    CGPoint point1 = intersectionPoint(lineBegin, lineEnd, leftTop, rightTop);
    if (!CGPointEqualToPoint(CGPointMake(INFINITY, INFINITY), point1)) {
        return point1;
    }
    CGPoint point2 = intersectionPoint(lineBegin, lineEnd, rightTop, rightBottom);
    if (!CGPointEqualToPoint(CGPointMake(INFINITY, INFINITY), point2)) {
          return point2;
    }
    CGPoint point3 = intersectionPoint(lineBegin, lineEnd, rightBottom, leftBottom);
    if (!CGPointEqualToPoint(CGPointMake(INFINITY, INFINITY), point3)) {
        return point3;
    }
    CGPoint point4 = intersectionPoint(lineBegin, lineEnd, leftBottom, leftTop);
    if (!CGPointEqualToPoint(CGPointMake(INFINITY, INFINITY), point4)) {
        return point4;
    }
    
    return CGPointMake(INFINITY, INFINITY);
}

#define MT_EPS      1e-4
#define MT_MIN(A,B)    ({ __typeof__(A) __a = (A); __typeof__(B) __b = (B); __a < __b ? __a : __b; })
#define MT_MAX(A,B)    ({ __typeof__(A) __a = (A); __typeof__(B) __b = (B); __a < __b ? __b : __a; })
#define MT_ABS(A)    ({ __typeof__(A) __a = (A); __a < 0 ? -__a : __a; })
CGPoint intersectionPoint(CGPoint firstLineBegin,
                          CGPoint firstLineEnd,
                          CGPoint secondLineBegin,
                          CGPoint secondLineEnd) {
    CGFloat mua,mub;
    CGFloat denom,numera,numerb;
    
    double x1 = firstLineBegin.x;
    double y1 = firstLineBegin.y;
    double x2 = firstLineEnd.x;
    double y2 = firstLineEnd.y;
    double x3 = secondLineBegin.x;
    double y3 = secondLineBegin.y;
    double x4 = secondLineEnd.x;
    double y4 = secondLineEnd.y;
    
    denom  = (y4-y3) * (x2-x1) - (x4-x3) * (y2-y1);
    numera = (x4-x3) * (y1-y3) - (y4-y3) * (x1-x3);
    numerb = (x2-x1) * (y1-y3) - (y2-y1) * (x1-x3);
    
    if (MT_ABS(numera) < MT_EPS && MT_ABS(numerb) < MT_EPS && MT_ABS(denom) < MT_EPS) {
        return CGPointMake( (x1 + x2) / 2.0 , (y1 + y2) / 2.0);
    }
    
    if (MT_ABS(denom) < MT_EPS) {
        return CGPointMake(INFINITY, INFINITY);
    }
    
    mua = numera / denom;
    mub = numerb / denom;
    if (mua < 0 || mua > 1 || mub < 0 || mub > 1) {
        return CGPointMake(INFINITY, INFINITY);
    }
    return CGPointMake(x1 + mua * (x2 - x1), y1 + mua * (y2 - y1));
}

+ (CGFloat)radianForDegree:(NSUInteger)degree {
    return (degree/180.0)*M_PI;
}

#pragma mark - yoga

+ (YOGA_TYPE_WRAPPER(YGValue))HMNumberToYGPoint:(NSObject *)number {
    if ([number isKindOfClass:NSNumber.class]) {
        CGFloat value = ((NSNumber *) number).floatValue;
        
        return HMPointValueMake(value);
    } else if ([number isKindOfClass:NSString.class]) {
        if ([((NSString *) number) containsString:@"%"]) {
            CGFloat value = ((NSNumber *) number).floatValue;
            
            return HMPercentValueMake(value);
        } else if([((NSString *) number) isEqualToString:@"auto"]) {
            return HMAutoValueMake();
        }else{
            return HMPointValueMake(HMPointWithString((NSString *) number));
        }
    } else {
        NSAssert(NO, @"number 必须为 NSNumber 或者 NSString");
        
        return HMPointValueMake(0);
    }
}

+ (YOGA_TYPE_WRAPPER(YGDirection))HMStringToYGDirection:(NSString *)string {
    YOGA_TYPE_WRAPPER(YGDirection) direction = YOGA_TYPE_WRAPPER(YGDirectionInherit);
    if (!string || [string isEqualToString:@""]) {
        return direction;
    }
    
    NSDictionary *map = @{
                          @"left": @(YOGA_TYPE_WRAPPER(YGDirectionLTR)),
                          @"right": @(YOGA_TYPE_WRAPPER(YGDirectionRTL)),
                          };
    if (map[string]) {
        direction = (YOGA_TYPE_WRAPPER(YGDirection))[map[string] integerValue];
    }
    return direction;
}

+ (YOGA_TYPE_WRAPPER(YGFlexDirection))HMStringToYGFlexDirection:(NSString *)string {
    YOGA_TYPE_WRAPPER(YGFlexDirection) direction = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
    if (!string || [string isEqualToString:@""]) {
        return direction;
    }
    
    NSDictionary *map = @{
                          @"row": @(YOGA_TYPE_WRAPPER(YGFlexDirectionRow)),
                          @"column": @(YOGA_TYPE_WRAPPER(YGFlexDirectionColumn)),
                          @"row-reverse": @(YOGA_TYPE_WRAPPER(YGFlexDirectionRowReverse)),
                          @"column-reverse": @(YOGA_TYPE_WRAPPER(YGFlexDirectionColumnReverse)),
                          };
    if (map[string]) {
        direction = (YOGA_TYPE_WRAPPER(YGFlexDirection))[map[string] integerValue];
    }
    return direction;
}

+ (YOGA_TYPE_WRAPPER(YGJustify))HMStringToYGJustify:(NSString *)string {
    YOGA_TYPE_WRAPPER(YGJustify) justify = YOGA_TYPE_WRAPPER(YGJustifyCenter);
    if (!string || [string isEqualToString:@""]) {
        return justify;
    }
    
    NSDictionary *map = @{
                          @"flex-start": @(YOGA_TYPE_WRAPPER(YGJustifyFlexStart)),
                          @"center": @(YOGA_TYPE_WRAPPER(YGJustifyCenter)),
                          @"flex-end": @(YOGA_TYPE_WRAPPER(YGJustifyFlexEnd)),
                          @"space-between": @(YOGA_TYPE_WRAPPER(YGJustifySpaceBetween)),
                          @"space-around": @(YOGA_TYPE_WRAPPER(YGJustifySpaceAround)),
                          @"space-evenly": @(YOGA_TYPE_WRAPPER(YGJustifySpaceEvenly)),
                         };
    if (map[string]) {
        justify = (YOGA_TYPE_WRAPPER(YGJustify))[map[string] integerValue];
    }
    return justify;
}

+ (YOGA_TYPE_WRAPPER(YGAlign))HMStringToYGAlign:(NSString *)string {
    YOGA_TYPE_WRAPPER(YGAlign) align = YOGA_TYPE_WRAPPER(YGAlignAuto);
    if (!string || [string isEqualToString:@""]) {
        return align;
    }
    
    NSDictionary *map = @{
                          @"auto": @(YOGA_TYPE_WRAPPER(YGAlignAuto)),
                          @"flex-start": @(YOGA_TYPE_WRAPPER(YGAlignFlexStart)),
                          @"center": @(YOGA_TYPE_WRAPPER(YGAlignCenter)),
                          @"flex-end": @(YOGA_TYPE_WRAPPER(YGAlignFlexEnd)),
                          @"stretch": @(YOGA_TYPE_WRAPPER(YGAlignStretch)),
                          @"baseline": @(YOGA_TYPE_WRAPPER(YGAlignBaseline)),
                          @"space-between": @(YOGA_TYPE_WRAPPER(YGAlignSpaceBetween)),
                          @"space-around": @(YOGA_TYPE_WRAPPER(YGAlignSpaceAround)),
                          };
    if (map[string]) {
        align = (YOGA_TYPE_WRAPPER(YGAlign))[map[string] integerValue];
    }
    return align;
}

+ (YOGA_TYPE_WRAPPER(YGPositionType))HMStringToYGPosition:(NSString *)string {
    return [string isEqualToString:@"absolute"] ? YOGA_TYPE_WRAPPER(YGPositionTypeAbsolute) : YOGA_TYPE_WRAPPER(YGPositionTypeRelative);
}

+ (YOGA_TYPE_WRAPPER(YGWrap))HMStringToYGFlexWrap:(NSString *)string {
    YOGA_TYPE_WRAPPER(YGWrap) wrap = YOGA_TYPE_WRAPPER(YGWrapNoWrap);
    if (!string || [string isEqualToString:@""]) {
        return wrap;
    }
    
    NSDictionary *map = @{
                          @"wrap": @(YOGA_TYPE_WRAPPER(YGWrapWrap)),
                          @"wrap-reverse": @(YOGA_TYPE_WRAPPER(YGWrapWrapReverse)),
                          @"no-wrap": @(YOGA_TYPE_WRAPPER(YGWrapNoWrap)),
                          };
    if (map[string]) {
        wrap = (YOGA_TYPE_WRAPPER(YGWrap))[map[string] integerValue];
    }
    return wrap;
}

+ (YOGA_TYPE_WRAPPER(YGOverflow))HMStringToYGOverflow:(NSString *)string {
    YOGA_TYPE_WRAPPER(YGOverflow) overflow = YOGA_TYPE_WRAPPER(YGOverflowHidden);
    if (!string || [string isEqualToString:@""]) {
        return overflow;
    }
    
    NSDictionary *map = @{
                          @"hidden": @(YOGA_TYPE_WRAPPER(YGOverflowHidden)),
                          @"visible": @(YOGA_TYPE_WRAPPER(YGOverflowVisible)),
                          };
    if (map[string]) {
        overflow = (YOGA_TYPE_WRAPPER(YGOverflow))[map[string] integerValue];
    }
    return overflow;
}

+ (YOGA_TYPE_WRAPPER(YGDisplay))HMStringToYGDisplay:(NSString *)string {
    return [string isEqualToString:@"none"] ? YOGA_TYPE_WRAPPER(YGDisplayNone) : YOGA_TYPE_WRAPPER(YGDisplayFlex);
}

#pragma mark - text

+ (NSTextAlignment)HMStringToTextAlignment:(NSString *)string {
    NSTextAlignment alignment = NSTextAlignmentLeft;
    if ([string isEqualToString:@"center"]) {
        alignment = NSTextAlignmentCenter;
    } else if ([string isEqualToString:@"right"]) {
        alignment = NSTextAlignmentRight;
    }
    
    return alignment;
}

/// HMAttributesTextVerticalAlign
+ (NSInteger)HMStringToTextVerticalAlignment:(NSString *)string {
    NSInteger verticalAlignment = 0;
    if ([string isEqualToString:@"top"]) {
        verticalAlignment = 1;
    } else if ([string isEqualToString:@"bottom"]) {
        verticalAlignment = 2;
    }
    return verticalAlignment;
}

+ (NSDictionary *)HMStringToTextDecoration:(NSString *)string {
    if ([string containsString:@"line-through"]) {
        return @{NSStrikethroughStyleAttributeName: @(NSUnderlineStyleSingle)};
    } else if ([string containsString:@"underline"]) {
        return @{NSUnderlineStyleAttributeName: @(NSUnderlineStyleSingle)};
    }
    
    return @{};
}

+ (NSLineBreakMode)HMStringToBreakMode:(NSString *)string {
    return [string isEqualToString:@"clip"] ? NSLineBreakByClipping : NSLineBreakByTruncatingTail;
}

#pragma mark - font

+ (UIFontWeight)HMStringToFontWeight:(NSString *)string {
    if (@available(iOS 8.2, *)) {
        UIFontWeight weight = UIFontWeightRegular;
        if ([string isEqualToString:@"bold"]) {
            weight = UIFontWeightBold;
        }
        return weight;
    }
    
    UIFontWeight weight = 0.0;
    if ([string isEqualToString:@"bold"]) {
        weight = 0.4;
    }
    return weight;
}

+ (UIFontDescriptorSymbolicTraits)HMStringToFontDescriptorSymbolicTraits:(NSString *)string {
    UIFontDescriptorSymbolicTraits traits = 0;
    if ([string containsString:@"italic"]) {
        traits = traits | UIFontDescriptorTraitItalic;
    }
    if ([string containsString:@"bold"]) {
        traits = traits | UIFontDescriptorTraitBold;
    }
    return traits;
}

+ (NSDictionary *)HMNumberToLetterSpacing:(NSNumber *)number
{
    NSNumber *value = @(0);
    if (number && [number isKindOfClass:NSNumber.class]) {
        value = number;
    } else if (number && [number isKindOfClass:NSString.class]) {
        value = @(number.doubleValue);
    }
    return @{NSKernAttributeName:value};
}

#pragma mark - keyboard

+ (UIReturnKeyType)HMStringToReturnKeyType:(NSString *)string {
    NSDictionary *map = @{@"done": @(UIReturnKeyDefault),
                          @"go": @(UIReturnKeyGo),
                          @"next": @(UIReturnKeyNext),
                          @"search": @(UIReturnKeySearch),
                          @"send": @(UIReturnKeySend),
                          };
    
    UIReturnKeyType type = UIReturnKeyDefault;
    if (map[string]) {
        type = [map[string] integerValue];
    }
    return type;
}

#pragma mark - basic

+ (CGFloat)HMNumberToCGFloat:(NSObject *)number {
    if ([number isKindOfClass:NSNumber.class]) {
        return ((NSNumber *) number).doubleValue;
    } else if ([number isKindOfClass:NSString.class]) {
        return ((NSString *) number).doubleValue;
    } else {
        NSAssert(NO, @"number 必须为 NSNumber 或者 NSString");
        
        return 0;
    }
}

+ (float)HMNumberToFloat:(NSObject *)number {
    if ([number isKindOfClass:NSNumber.class]) {
        return ((NSNumber *) number).floatValue;
    } else if ([number isKindOfClass:NSString.class]) {
        return ((NSString *) number).floatValue;
    } else {
        NSAssert(NO, @"number 必须为 NSNumber 或者 NSString");
        
        return 0;
    }
}

+ (NSInteger)HMNumberToNSInteger:(NSNumber *)number {
    return [number integerValue];
}

+ (CGFloat)HMStringToFloat:(NSObject *)string {
    if ([string isKindOfClass:[NSNumber class]]) {
        return ((NSNumber *) string).doubleValue;
    } else if ([string isKindOfClass:NSString.class]) {
        return HMPointWithString((NSString *) string);
    } else {
        NSAssert(NO, @"string 必须为 NSNumber 或者 NSString");

        return 0;
    }
}

+ (NSString *)HMStringOrigin:(NSString *)string {
    return string;
}

+ (CGPoint)HMDicToCGPoint:(NSDictionary *)dic {
    CGFloat x = [[HMConverter numberWithObject:dic[@"x"]] floatValue];
    CGFloat y = [[HMConverter numberWithObject:dic[@"y"]] floatValue];
    return CGPointMake(x, y);
}

+ (NSNumber *)numberWithString:(NSString *)string {
    return @(HMPointWithString(string));
}

+ (NSNumber *)numberWithObject:(id)object {
    if ([object isKindOfClass:[NSNumber class]]) {
        return object;
    }
    if ([object isKindOfClass:[NSString class]]) {
        return [self numberWithString:object];
    }
    return nil;
}

+ (NSArray<NSNumber *> *)HMStringToNumberArray:(NSObject *)string {
    if ([string isKindOfClass:NSNumber.class]) {
        return @[(NSNumber *) string];
    } else if ([string isKindOfClass:NSString.class]) {
        NSArray<NSString *> *components = [(NSString *) string componentsSeparatedByString:@" "];
        if (components.count == 0) {
            NSAssert(NO, @"component 不能为空");
            
            return @[@0];
        }
        NSMutableArray<NSNumber *> *returnValue = [NSMutableArray arrayWithCapacity:components.count];
        [components enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [returnValue addObject:@(HMPointWithString(obj))];
        }];
        
        return returnValue.copy;
    } else {
        NSAssert(NO, @"string 必须为 NSNumber 或者 NSString");

        return @[@0];
    }
}

#pragma mark - Border

+ (HMBorderStyle)HMStringToBorderStyle:(NSString *)string {
    string = string.lowercaseString;
    if ([string isEqualToString:@"dotted"]) {
        return HMBorderStyleDotted;
    } else if ([string isEqualToString:@"solid"]){
        return HMBorderStyleSolid;
    } else if ([string isEqualToString:@"dashed"]) {
        return HMBorderStyleDashed;
    } else {
        return HMBorderStyleNone;
    }
}

+ (NSArray<NSNumber *> *)HMStringToBorderStyleList:(NSString *)string {
    NSArray<NSString *> *componentArray = [string componentsSeparatedByString:@" "];
    if (componentArray.count == 0) {
        NSAssert(NO, @"string 必须为 none solid dashed dotted 集合");
        
        return @[@(HMBorderStyleNone)];
    }
    NSMutableArray<NSNumber *> *borderStyleArray = [NSMutableArray arrayWithCapacity:componentArray.count];
    [componentArray enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [borderStyleArray addObject:@([self HMStringToBorderStyle:obj])];
    }];
    
    return borderStyleArray.copy;
}

+ (NSArray<UIColor *> *)HMStringToBorderColorList:(NSString *)string {
   NSMutableArray * ret = [NSMutableArray array];
   NSArray * components = [string componentsSeparatedByString:@" "];
   for (NSString * pair in components) {
       if ([[pair stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]]  isEqual: @""]) {
           continue;
       }
       UIColor * color = [self HMStringToColor:pair];
       if (color) {
           [ret addObject: color];
       }
   }
   return ret;
}

+ (NSArray<NSValue *> *)HMStringToBorderRadiusList:(NSObject *)string {
    if ([string isKindOfClass:NSNumber.class]) {
        return @[[NSValue valueWithYGValue:[HMConverter HMNumberToYGPoint:string]]];
    } else if ([string isKindOfClass:NSString.class]) {
        NSArray<NSString *> *array = [((NSString *) string) componentsSeparatedByString:@" "];
        if (array.count == 0) {
            NSAssert(NO, @"传入的字符串为空串");

            return @[[NSValue valueWithYGValue:[HMConverter HMNumberToYGPoint:@(0)]]];
        }
        NSMutableArray<NSValue *> *returnValue = [NSMutableArray arrayWithCapacity:array.count];
        [array enumerateObjectsUsingBlock:^(NSString *_Nonnull obj, NSUInteger idx, BOOL *_Nonnull stop) {
            [returnValue addObject:[NSValue valueWithYGValue:[HMConverter HMNumberToYGPoint:obj]]];
        }];

        return returnValue.copy;
    } else {
        NSAssert(NO, @"参数必须为 NSNumber 或者 NSString");

        return @[[NSValue valueWithYGValue:[HMConverter HMNumberToYGPoint:@(0)]]];
    }
}

#pragma mark - shadow

+ (NSArray *)HMStringToShadowAttributes:(NSString *)string {
    NSArray<NSString *> *array = [string componentsSeparatedByString:@" "];
    if (array.count != 4) {
        return nil;
    }

    // 默认黑色
    NSArray *shadowAttributes = @[@([self HMStringToFloat:array[0]]),
            @([self HMStringToFloat:array[1]]),
            @([self HMStringToFloat:array[2]]),
            [self HMStringToColor:array[3]] ?: UIColor.blackColor];
    
    return shadowAttributes;
}

#pragma mark - view

+ (BOOL)HMStringToViewHidden:(NSString *)string {
    if ([string isEqualToString:@"hidden"]) {
        return YES;
    }
    return NO;
}

+ (BOOL)HMStringToClipSubviews:(NSString *)string {
    return [string isEqualToString:@"hidden"];
}

+ (UIViewContentMode)HMStringToContentMode:(NSString *)contentMode {
    NSDictionary<NSString *, NSNumber *> *contentMap = @{@"origin": @(UIViewContentModeCenter),
            @"contain": @(UIViewContentModeScaleAspectFit),
            @"cover": @(UIViewContentModeScaleAspectFill),
            @"stretch": @(UIViewContentModeScaleToFill)};

    return contentMap[contentMode] ? [contentMap[contentMode] integerValue] : UIViewContentModeCenter;
}

#pragma mark - collection view

+ (UICollectionViewScrollDirection)HMStringToDirection:(NSString *)string {
    UICollectionViewScrollDirection direction = UICollectionViewScrollDirectionVertical;
    
    if ([string isEqualToString:@"horizontal"]) {
        direction = UICollectionViewScrollDirectionHorizontal;
    }
    
    return direction;
}

#pragma mark - origin value

+ (id)HMValueOrigin:(id)value
{
    return value;
}

@end

@implementation NSValue (YGValue)

+ (instancetype)valueWithYGValue:(YOGA_TYPE_WRAPPER(YGValue))ygValue {
    return [self valueWithBytes:&ygValue objCType:@encode(YOGA_TYPE_WRAPPER(YGValue))];
}

- (YOGA_TYPE_WRAPPER(YGValue))ygValue {
    YOGA_TYPE_WRAPPER(YGValue) value;
    if (@available(iOS 11.0, *)) {
        [self getValue:&value size:sizeof(YOGA_TYPE_WRAPPER(YGValue))];
    } else {
        // Fallback on earlier versions
        [self getValue:&value];
    }

    return value;
}

@end
