//
//  HMAttributesItem.m
//  Hummer
//
//  Created by didi on 2020/3/3.
//

#import "HMAttributesItem.h"
#import "HMConverter.h"
#import "HMUtility.h"

@implementation HMAttributesItem

#define IsEmptyString(str) (str.length <= 0 || [str stringByTrimmingCharactersInSet:NSCharacterSet.whitespaceAndNewlineCharacterSet].length <= 0)

+ (nullable instancetype)itemWithString:(NSString *)string {
    if (!string || string.length == 0) {
        return nil;
    }
    
    HMAttributesItem *item = [[HMAttributesItem alloc] init];
    item.text = string;
    return item;
}

+ (nullable instancetype)itemWithDictionary:(NSDictionary *)dictionary {
    if (!dictionary || dictionary.count == 0) {
        return nil;
    }
    
    HMAttributesItem *item = [[HMAttributesItem alloc] init];
    item.text = dictionary[@"text"];
    if (dictionary[@"color"]) {
        item.color = [HMConverter HMStringToColor:dictionary[@"color"]];
    }
    if (dictionary[@"backgroundColor"]) {
        item.backgroundColor = [HMConverter HMStringToColor:dictionary[@"backgroundColor"]];
    }
    
    // 由于 HMStringToTextDecoration: 方法总是返回非空的对象，所以要在这里做判断；
    // 空字典表示不添加这些属性；
    // nil表示跟随视图的style;
    if (dictionary[@"textDecoration"]) {
        item.textDecoration = [HMConverter HMStringToTextDecoration:dictionary[@"textDecoration"]];
    }
    
    if (dictionary[@"letterSpacing"]) {
        item.letterSpacing = [HMConverter HMNumberToLetterSpacing:dictionary[@"letterSpacing"]];
    }
    
    if (dictionary[@"lineSpacingMulti"]) {
        item.paragraphStyle = NSParagraphStyle.defaultParagraphStyle.mutableCopy;
        item.paragraphStyle.lineSpacing = [HMConverter HMStringToFloat:dictionary[@"lineSpacingMulti"]];
    }
    
    if (dictionary[@"fontSize"]) {
        item.fontSize = [HMConverter HMStringToFloat:dictionary[@"fontSize"]];
    }

    NSString *filteredName = hm_availableFontName(dictionary[@"fontFamily"]);
    item.fontFamily = filteredName;
    item.fontWeight = dictionary[@"fontWeight"];
    item.fontStyle = dictionary[@"fontStyle"];
    if (item.fontWeight) {
        item.fontTraits = item.fontTraits | [HMConverter HMStringToFontDescriptorSymbolicTraits:item.fontWeight];
    }
    if (item.fontStyle) {
        item.fontTraits = item.fontTraits | [HMConverter HMStringToFontDescriptorSymbolicTraits:item.fontStyle];
    }

    item.image = dictionary[@"image"];
    if (dictionary[@"imageWidth"]) {
        item.imageWidth = [HMConverter HMStringToFloat:dictionary[@"imageWidth"]];
    }
    if (dictionary[@"imageHeight"]) {
        item.imageHeight = [HMConverter HMStringToFloat:dictionary[@"imageHeight"]];
    }
    if (dictionary[@"imageAlign"]) {
        item.imageAlign = [dictionary[@"imageAlign"] isEqualToString:@"center"] ? HMAttributesImageAlignBaselineCenter : HMAttributesImageAlignBaseline;
    }
    item.href = dictionary[@"href"];
    if (dictionary[@"hrefColor"]) {
        item.hrefColor = [HMConverter HMStringToColor:dictionary[@"hrefColor"]];
    }
    
    if (item.text.length <= 0 && IsEmptyString(item.image) && IsEmptyString(item.href)) {
        return nil;
    }
    
    return item;
}

- (BOOL)isCustomizedFont {
    return self.fontFamily.length > 0 || self.fontSize > 0 || self.fontWeight > 0 || self.fontStyle;
}

- (BOOL)isCustomizedImageSize {
    return self.imageWidth > 0 || self.imageHeight > 0;
}

- (NSString *)characters {
    return self.text ? : (self.href ? : @"");
}

- (UIFont *)copiedFont:(UIFont *)font {
    UIFontDescriptor *fontDescriptor = font.fontDescriptor;
    if (self.fontStyle) {
        // 中文倾斜变换矩阵
        CGAffineTransform matrix = CGAffineTransformIdentity;
        UIFontDescriptorSymbolicTraits traits = fontDescriptor.symbolicTraits;
        if (self.fontTraits & UIFontDescriptorTraitItalic) {
            traits |= UIFontDescriptorTraitItalic;
            matrix = CGAffineTransformMake(1, 0, tanf(5 * (CGFloat)M_PI / 180), 1, 0, 0);
        } else {
            traits &= (~UIFontDescriptorTraitItalic);
            matrix = CGAffineTransformIdentity;
        }
        fontDescriptor = [fontDescriptor fontDescriptorWithSymbolicTraits:traits];
        fontDescriptor = [fontDescriptor fontDescriptorWithMatrix:matrix];
    }
    if (self.fontWeight) {
        UIFontDescriptorSymbolicTraits traits = fontDescriptor.symbolicTraits;
        if (self.fontTraits & UIFontDescriptorTraitBold) {
            traits |= UIFontDescriptorTraitBold;
        } else {
            traits &= (~UIFontDescriptorTraitBold);
        }
        fontDescriptor = [fontDescriptor fontDescriptorWithSymbolicTraits:traits];
    }
    if (self.fontFamily) {
        fontDescriptor = [fontDescriptor fontDescriptorWithFamily:self.fontFamily];
    }
    return [UIFont fontWithDescriptor:fontDescriptor size:self.fontSize];
}

#undef IsEmptyString

@end
