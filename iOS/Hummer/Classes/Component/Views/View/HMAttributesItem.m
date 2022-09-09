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
    
    CGFloat fontSize = _fontSize>0?_fontSize:[font.fontDescriptor.fontAttributes[@"NSFontSizeAttribute"] floatValue];

    UIFontDescriptor *fontDescriptor = font.fontDescriptor;
    UIFontDescriptorSymbolicTraits traits = fontDescriptor.symbolicTraits;
    if (_fontFamily) {
        //优先使用自定义字体
        // 自定义字体可能不支持 加粗等样式，因此使用 fontDescriptor 保持样式。针对 style 设置不支持的样式，在richtext中设置 normal 仍可以生效的问题。
        fontDescriptor = [UIFontDescriptor fontDescriptorWithName:_fontFamily size:fontSize];
    }

    if (self.fontStyle) {
        // 中文倾斜变换矩阵
        if (self.fontTraits & UIFontDescriptorTraitItalic) {
            traits |= UIFontDescriptorTraitItalic;
        } else {
            traits &= (~UIFontDescriptorTraitItalic);
        }

    }
    if (self.fontWeight) {
        if (self.fontTraits & UIFontDescriptorTraitBold) {
            traits |= UIFontDescriptorTraitBold;
        } else {
            traits &= (~UIFontDescriptorTraitBold);
        }
    }
    UIFontDescriptor *tempFontDescriptor = [fontDescriptor fontDescriptorWithSymbolicTraits:traits];
    if (tempFontDescriptor) {
        fontDescriptor = tempFontDescriptor;
    } else if (traits & UIFontDescriptorTraitItalic) {
        fontDescriptor = [fontDescriptor fontDescriptorWithMatrix:CGAffineTransformMake(1, 0, tan(M_PI_4 / 3), 1, 0, 0)];
    }
    
    return [UIFont fontWithDescriptor:fontDescriptor size:fontSize];
}

#undef IsEmptyString

@end
