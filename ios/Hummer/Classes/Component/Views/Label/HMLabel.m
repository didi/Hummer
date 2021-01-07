//
//  HMLabel.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMLabel.h"
#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"
#import "UIView+HMDom.h"
#import "HMAttributesBuilder.h"
#import "HMUtility.h"

@interface HMLabel() <HMAttributesBuilderDelegate>

@property (nonatomic, copy) NSDictionary *textDecoration;
@property (nonatomic, assign) bool textWrap;
@property (nonatomic, copy) NSString *fontFamily;
@property (nonatomic, assign) CGFloat fontSize;
@property (nonatomic, assign) UIFontWeight fontWeight;
@property (nonatomic, assign) UIFontDescriptorSymbolicTraits fontStyle;
@property (nonatomic, copy) NSDictionary *letterSpacing;
@property (nonatomic, assign) CGFloat lineSpacingMulti;
@property (nonatomic, strong) NSMutableParagraphStyle *paragraphStyle;

@property (nonatomic, copy) NSString *formattedText;
@property (nonatomic, strong) HMAttributesBuilder *builder;

@end

@implementation HMLabel

HM_EXPORT_CLASS(Text, HMLabel)

HM_EXPORT_PROPERTY(text, __text, __setText:)
HM_EXPORT_PROPERTY(formattedText, __formattedText, __setFormattedText:)
HM_EXPORT_PROPERTY(richText, __richText, __setRichText:)

HM_EXPORT_ATTRIBUTE(color, textColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(textAlign, textAlignment, HMStringToTextAlignment:)
HM_EXPORT_ATTRIBUTE(textDecoration, textDecoration, HMStringToTextDecoration:)
HM_EXPORT_ATTRIBUTE(fontFamily, fontFamily, HMStringOrigin:)
HM_EXPORT_ATTRIBUTE(fontSize, fontSize, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(fontWeight, fontWeight, HMStringToFontWeight:)
HM_EXPORT_ATTRIBUTE(fontStyle, fontStyle, HMStringToFontDescriptorSymbolicTraits:)
HM_EXPORT_ATTRIBUTE(textOverflow, lineBreakMode, HMStringToBreakMode:)
HM_EXPORT_ATTRIBUTE(textLineClamp, numberOfLines, HMNumberToNSInteger:)
HM_EXPORT_ATTRIBUTE(letterSpacing, letterSpacing, HMNumberToLetterSpacing:)
HM_EXPORT_ATTRIBUTE(lineSpacingMulti, lineSpacingMulti, HMStringToFloat:)

- (NSMutableParagraphStyle *)paragraphStyle
{
    if (!_paragraphStyle) {
        _paragraphStyle = [[NSMutableParagraphStyle alloc] init];
    }
    return _paragraphStyle;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.userInteractionEnabled = YES;
        self.numberOfLines = 0;
//        self.layer.masksToBounds = YES;
        _fontSize = 16;
        self.backgroundColor = [UIColor clearColor];
    }
    return self;
}

- (NSDictionary *)textAttributes {
    UIFont *font = self.font;
    UIColor *color = self.textColor;
    NSMutableDictionary *attributes = [@{NSFontAttributeName:font,
                                         NSForegroundColorAttributeName: color,
                                         } mutableCopy];
    if (self.textDecoration) {
        [attributes addEntriesFromDictionary:self.textDecoration];
    }
    if (self.letterSpacing) {
        [attributes addEntriesFromDictionary:self.letterSpacing];
    }
    if (_paragraphStyle) {
        [attributes addEntriesFromDictionary:@{
            NSParagraphStyleAttributeName: self.paragraphStyle,
        }];
    }
    return [attributes copy];
}

#pragma mark - Export Property

- (JSValue *)__text {
    return [JSValue valueWithObject:self.text inContext:self.hmContext];
}

- (void)__setText:(JSValue *)value {
    // do not support other kind of value
    if (!value.isString) {
        return;
    }
    
    [self removeBuilder];

    NSString *text = [value toString];
    if (self.textDecoration || self.letterSpacing || _paragraphStyle) {
        self.attributedText = [[NSMutableAttributedString alloc] initWithString:text ?: @""
                                                                     attributes:self.textAttributes];
    } else {
        self.text = text;
    }
    [self hm_markDirty];
}

- (JSValue *)__formattedText {
    return [JSValue valueWithObject:self.formattedText inContext:self.hmContext];
}

- (void)__setFormattedText:(JSValue *)value {
    [self removeBuilder];
    
    self.formattedText = [value toString];
    NSData *data = [self.formattedText dataUsingEncoding:NSUnicodeStringEncoding];
    NSDictionary *options = @{NSDocumentTypeDocumentAttribute:NSHTMLTextDocumentType};
    NSAttributedString *attrStr = [[NSAttributedString alloc] initWithData:data
                                                                   options:options
                                                        documentAttributes:nil
                                                                     error:nil];
    self.attributedText = attrStr;
    [self hm_markDirty];
}

- (JSValue *)__richText {
    return [JSValue valueWithObject:self.text inContext:self.hmContext];
}

- (void)__setRichText:(JSValue *)value {
    // do not support other kind of value
    if (!value.isArray && !value.isObject) {
        return;
    }
    if (!value.isArray && ![value.toObject isKindOfClass:NSDictionary.class]) {
        return;
    }

    [self removeBuilder];

    // rich text
    self.builder = [[HMAttributesBuilder alloc] initWithFont:self.font ? : [UIFont systemFontOfSize:self.fontSize]
                                              textDecoration:self.textDecoration
                                               letterSpacing:self.letterSpacing
                                              paragraphStyle:_paragraphStyle];
    self.builder.delegate = self;
    self.attributedText = [self.builder buildAttributedString:value.isArray ? value.toArray : @[value.toObject]];
    [self hm_markDirty];
}

#pragma mark - Export Attribute

- (void)setTextDecoration:(NSDictionary *)textDecoration {
    _textDecoration = [textDecoration copy];

    if (self.builder) {
        [self.builder updateTextDecoration:textDecoration];
        return;
    }
    
    NSString *string = self.text ?: @"";
    NSDictionary *attributes = [self textAttributes];
    self.attributedText = [[NSMutableAttributedString alloc] initWithString:string
                                                                 attributes:attributes];
}

- (void)setLetterSpacing:(NSDictionary *)letterSpacing
{
    _letterSpacing = [letterSpacing copy];
    
    if (self.builder) {
        [self.builder updateLetterSpacing:letterSpacing];
        return;
    }
    
    NSString *string = self.text ?: @"";
    NSDictionary *attributes = [self textAttributes];
    self.attributedText = [[NSMutableAttributedString alloc] initWithString:string
                                                                 attributes:attributes];
}

- (void)setLineSpacingMulti:(CGFloat)lineSpacingMulti
{
    _lineSpacingMulti = lineSpacingMulti;
    
    self.paragraphStyle.lineHeightMultiple = lineSpacingMulti;
    
    if (self.builder) {
        [self.builder updateParagraphStyle:self.paragraphStyle];
        return;
    }
    
    NSString *string = self.text ?: @"";
    NSDictionary *attributes = [self textAttributes];
    self.attributedText = [[NSMutableAttributedString alloc] initWithString:string
                                                                 attributes:attributes];
}

- (void)setFontFamily:(NSString *)fontFamily {
    NSString *filteredName = hm_availableFontName(fontFamily);
    _fontFamily = [filteredName copy];
    [self updateFont];
    
    if (self.builder) {
        [self.builder updateFont:self.font];
    }
}

- (void)setFontSize:(CGFloat)fontSize {
    _fontSize = fontSize;
    [self updateFont];
    
    if (self.builder) {
        [self.builder updateFont:self.font];
    }
}

- (void)setFontWeight:(UIFontWeight)fontWeight {
    _fontWeight = fontWeight;
    [self updateFont];
    
    if (self.builder) {
        [self.builder updateFont:self.font];
    }
}

- (void)setFontStyle:(UIFontDescriptorSymbolicTraits)fontStyle {
    _fontStyle = fontStyle;
    [self updateFont];
    
    if (self.builder) {
        [self.builder updateFont:self.font];
    }
}

- (void)setTextAlign:(NSTextAlignment)textAlign {
    self.textAlignment = textAlign;
}

- (void)updateFont {
    UIFontDescriptor *fontDescriptor = [[UIFontDescriptor alloc] init];
    if (_fontWeight) {
        fontDescriptor = [fontDescriptor fontDescriptorWithSymbolicTraits:fontDescriptor.symbolicTraits | UIFontDescriptorTraitBold];
    }
    if (_fontStyle) {
        fontDescriptor = [fontDescriptor fontDescriptorWithSymbolicTraits:fontDescriptor.symbolicTraits | _fontStyle];
        CGAffineTransform matrix = CGAffineTransformMake(1, 0, tanf(5 * (CGFloat)M_PI / 180), 1, 0, 0);
        fontDescriptor = [fontDescriptor fontDescriptorWithMatrix:matrix];
    }
    if (_fontFamily) {
        fontDescriptor = [fontDescriptor fontDescriptorByAddingAttributes:@{UIFontDescriptorNameAttribute:_fontFamily}];
    }
    UIFont *font = [UIFont fontWithDescriptor:fontDescriptor size:_fontSize];
    self.font = font;
}

// MARK: - Rich text

- (void)removeBuilder {
    if (self.builder) {
        [self.builder clear];
        _builder = nil;
        self.attributedText = nil;
    }
}

// MARK: - HMAttributesBuilderDelegate

- (void)attributesBuilder:(HMAttributesBuilder *)builder didUpdateAttributedString:(NSAttributedString *)string {
    self.attributedText = string;
    [self hm_markDirty];
}

// MARK: - Href

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    if (!self.builder) {
        [super touchesEnded:touches withEvent:event];
        return;
    }
    
    UITouch *touch = touches.anyObject;
    CGPoint location = [touch locationInView:self];
    CGSize size = self.bounds.size;
    NSLayoutManager *layoutManager = [[NSLayoutManager alloc] init];
    NSTextContainer *textContainer = [[NSTextContainer alloc] initWithSize:CGSizeZero];
    NSTextStorage *textStorage = [[NSTextStorage alloc] initWithAttributedString:self.attributedText];
    
    [layoutManager addTextContainer:textContainer];
    [textStorage addLayoutManager:layoutManager];
    
    textContainer.lineFragmentPadding = 0.0;
    textContainer.lineBreakMode = self.lineBreakMode;
    textContainer.maximumNumberOfLines = self.numberOfLines;
    textContainer.size = size;
    
    CGRect textBoundingBox = [layoutManager usedRectForTextContainer:textContainer];
//    CGPoint textContainerOffset = CGPointMake((size.width - textBoundingBox.size.width) * 0.5 - textBoundingBox.origin.x,
//                                              (size.height - textBoundingBox.size.height) * 0.5 - textBoundingBox.origin.y);
    
    CGPoint textContainerOffset;
    switch (self.textAlignment) {
        case NSTextAlignmentCenter:
            textContainerOffset = CGPointMake((size.width - textBoundingBox.size.width) * 0.5, (size.height - textBoundingBox.size.height) * 0.5);
            break;
            
        case NSTextAlignmentRight:
            textContainerOffset = CGPointMake(size.width - textBoundingBox.size.width, (size.height - textBoundingBox.size.height) * 0.5);
            break;
            
        default:
            textContainerOffset = CGPointMake(textBoundingBox.origin.x, (size.height - textBoundingBox.size.height) * 0.5);
            break;
    }
    
    CGPoint locationInTextContainer = CGPointMake(location.x - textContainerOffset.x,
                                                  location.y - textContainerOffset.y);
    
    // 由于该函数的副作用，导致点击空白处，会返回相邻最近的字符的索引。
    NSUInteger indexOfCharacter = [layoutManager characterIndexForPoint:locationInTextContainer
                                                        inTextContainer:textContainer
                               fractionOfDistanceBetweenInsertionPoints:nil];
    
    NSString *href = [self.builder linkAtIndex:indexOfCharacter];
    if (href) {
        NSURL *url = [[NSURL alloc] initWithString:href];
        if (url) {
            [UIApplication.sharedApplication openURL:url];
        }
    }
    
    [super touchesEnded:touches withEvent:event];
}

- (CGSize)sizeThatFits:(CGSize)size {
    CGSize superSize = [super sizeThatFits:size];
    
    // Adding epsilon value illuminates problems with converting values from
    // `double` to `float`, and then rounding them to pixel grid in Yoga.
    CGFloat epsilon = 0.001;
    
    superSize.width += epsilon;
    superSize.height += epsilon;
    
    return superSize;
}

@end
