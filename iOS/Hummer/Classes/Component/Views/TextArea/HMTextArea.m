//
//  HMTextArea.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMTextArea.h"

#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMInputEvent.h"
#import "UIView+HMEvent.h"
#import "UIView+HMDom.h"
#import "HMJSGlobal.h"
#import "HMConfigEntryManager.h"
#import "UIView+HMDom.h"

#import <Hummer/UIView+HMInspector.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMTextArea() <UITextViewDelegate, HMViewInspectorDescription>

@property (nonatomic, strong, nullable) UILabel *placeholderLabel;

@property (nonatomic, assign) NSUInteger maxLength;

@property (nonatomic, nullable, copy) UIColor *placeholderColor;

@property (nonatomic, nullable, copy) NSString *placeholderText;

// 后续所有属性都是补充属性
@property (nonatomic, copy, nullable) NSString *keyboardTypeString;

@property (nonatomic, nullable, copy) UIColor *caretColor;

@property (nonatomic, nullable, copy) NSString *fontFamily;

@property (nonatomic, assign) CGFloat fontSize;

- (void)togglePlaceholder;

@end

NS_ASSUME_NONNULL_END

@implementation HMTextArea

HM_EXPORT_CLASS(TextArea, HMTextArea)

HM_EXPORT_PROPERTY(text, __text, __setText:)
HM_EXPORT_PROPERTY(placeholder, __placeholder, __setPlaceholder:)
HM_EXPORT_PROPERTY(focused, __focused, __setFocused:)

HM_EXPORT_ATTRIBUTE(type, keyboardTypeString, HMStringOrigin:)
HM_EXPORT_ATTRIBUTE(color, textColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(cursorColor, caretColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(textAlign, textAlignment, HMStringToTextAlignment:)
HM_EXPORT_ATTRIBUTE(fontFamily, fontFamily, HMStringOrigin:)
HM_EXPORT_ATTRIBUTE(fontSize, fontSize, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(placeholderColor, placeholderColor, HMStringToColor:)
// 重复
HM_EXPORT_ATTRIBUTE(placeholderFontSize, fontSize, HMStringToFloat:)
// TODO(唐佳诚): 需要截断
HM_EXPORT_ATTRIBUTE(maxLength, maxLength, HMNumberToNSInteger:)
HM_EXPORT_ATTRIBUTE(returnKeyType, returnKeyType, HMStringToReturnKeyType:)
HM_EXPORT_ATTRIBUTE(textLineClamp, numberOfLines, HMNumberToNSInteger:)

- (NSUInteger)numberOfLines {
    return self.textContainer.maximumNumberOfLines;
}

- (void)setNumberOfLines:(NSUInteger)numberOfLines {
    self.textContainer.maximumNumberOfLines = numberOfLines;
    self.placeholderLabel.numberOfLines = numberOfLines;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.delegate = self;
        // 默认 16 字体大小
        _fontSize = 16.0;
        _placeholderColor = [HMConverter HMStringToColor:@"#757575"];
        _maxLength = NSUIntegerMax;
        [self updateFont];
        self.textColor = UIColor.blackColor;
    }
    
    return self;
}

- (void)togglePlaceholder {
    if (self.text.length == 0 && (!self.markedTextRange || self.markedTextRange.isEmpty) && self.placeholderText.length > 0) {
        // 显示 placeholder
        if (!self.placeholderLabel) {
            self.placeholderLabel = [[UILabel alloc] initWithFrame:CGRectZero];
            [self addSubview:self.placeholderLabel];
        }
        self.placeholderLabel.font = self.font;
        self.placeholderLabel.textColor = self.placeholderColor;
        self.placeholderLabel.numberOfLines = self.textContainer.maximumNumberOfLines;
        self.placeholderLabel.lineBreakMode = NSLineBreakByWordWrapping;
        self.placeholderLabel.text = self.placeholderText;
        [self setNeedsLayout];
    } else {
        [self.placeholderLabel removeFromSuperview];
        self.placeholderLabel = nil;
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    if (self.placeholderLabel) {
        CGRect frame = self.bounds;
        if (self.selectedTextRange) {
            CGRect caretFrame = [self caretRectForPosition:self.selectedTextRange.start];
            frame = CGRectMake(caretFrame.origin.x, caretFrame.origin.y, frame.size.width - caretFrame.origin.x * 2, frame.size.height - caretFrame.origin.y * 2);
        }
            
        frame.size = [self.placeholderLabel sizeThatFits:frame.size];
        self.placeholderLabel.frame = frame;
    }
    [self hm_layoutBackgroundColorImageBorderShadowCornerRadius];
}

- (CGSize)sizeThatFits:(CGSize)size {
    if (!self.placeholderLabel) {
        return [super sizeThatFits:size];
    }
    CGRect caretFrame = CGRectZero;
    if (self.selectedTextRange) {
        caretFrame = [self caretRectForPosition:self.selectedTextRange.start];
    }
    CGSize placeholderSize = [self.placeholderLabel sizeThatFits:CGSizeMake(size.width - caretFrame.origin.x * 2, size.height - caretFrame.origin.y * 2)];
    
    return CGSizeMake(placeholderSize.width + caretFrame.origin.x * 2, placeholderSize.height + caretFrame.origin.y * 2);
}

#pragma mark - Export Property

- (HMBaseValue *)__text {
    return [HMBaseValue valueWithObject:self.text inContext:self.hmContext];
}

- (void)__setText:(HMBaseValue *)text {
    self.text = text.toString;
    [self togglePlaceholder];
    [self hm_markDirty];
}

- (HMBaseValue *)__placeholder {
    return [HMBaseValue valueWithObject:self.placeholderText inContext:self.hmContext];
}

- (void)__setPlaceholder:(HMBaseValue *)placeholder {
    self.placeholderText = placeholder.toString;
    [self togglePlaceholder];
    [self hm_markDirty];
}

- (HMBaseValue *)__focused {
    return [HMBaseValue valueWithBool:self.isFirstResponder inContext:self.hmContext];
}

- (void)__setFocused:(BOOL)focused {
    if (focused) {
        [self becomeFirstResponder];
    } else {
        [self resignFirstResponder];
    }
}
- (void)setFontFamily:(NSString *)fontFamily {
    NSString *filteredName = hm_availableFontName(fontFamily);
    if (filteredName.length == 0) {
        return;
    }    
    [self togglePlaceholder];
    _fontFamily = fontFamily;
    [self updateFont];
}

- (void)setFontSize:(CGFloat)fontSize {
    [self togglePlaceholder];
    _fontSize = fontSize;
    [self updateFont];
}

- (void)updateFont {
    UIFont *font;
    NSString *fontFamily = _fontFamily ? _fontFamily : [HMFontAdaptor fontWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace].defaultFontFamily;
    if (fontFamily) {
        font = [UIFont fontWithName:self.fontFamily size:self.fontSize];
    } else {
        font = [UIFont systemFontOfSize:self.fontSize];
    }
    self.font = font;
}

#pragma mark - Export Attribute

- (void)setKeyboardTypeString:(NSString *)string {
    _keyboardTypeString = string;
    NSDictionary *map = @{@"default": @(UIKeyboardTypeDefault),
                          @"number": @(UIKeyboardTypeDecimalPad),
                          @"tel": @(UIKeyboardTypePhonePad),
                          @"email": @(UIKeyboardTypeEmailAddress),
                          };
    string = string ?: @"";
    UIKeyboardType type = UIKeyboardTypeDefault;
    if (map[string]) {
        type = [map[string] integerValue];
        self.secureTextEntry = NO;
    } else {
        self.secureTextEntry = [string isEqualToString:@"password"];
    }
    
    self.keyboardType = type;
}

- (void)setCaretColor:(UIColor *)caretColor {
    _caretColor = caretColor;
    self.tintColor = caretColor;
}

- (void)setTextAlignment:(NSTextAlignment)textAlignment {
    [super setTextAlignment:textAlignment];
    self.placeholderLabel.textAlignment = textAlignment;
}

- (void)setPlaceholderColor:(UIColor *)placeholderColor {
    _placeholderColor = placeholderColor;
    [self togglePlaceholder];
}

#pragma mark - UITextViewDelegate

- (void)textViewDidBeginEditing:(__unused UITextView *)textView {
    HMInputEvent *inputEvent = [[HMInputEvent alloc] init];
    NSDictionary *dict = @{kHMInputType:@"input",kHMInputState:@(HMInputEventBegan), kHMInputText:self.text?:@""};
    [self hm_notifyEvent:HMInputEventName withValue:inputEvent withArgument:dict];
}

- (void)textViewDidEndEditing:(__unused UITextView *)textView {
    HMInputEvent *inputEvent = [[HMInputEvent alloc] init];
    NSDictionary *dict = @{kHMInputType:@"input",kHMInputState:@(HMInputEventEnded), kHMInputText:self.text?:@""};
    [self hm_notifyEvent:HMInputEventName withValue:inputEvent withArgument:dict];
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
    if (self.markedTextRange) {
        return YES;
    }
    NSString *newString = [textView.text stringByReplacingCharactersInRange:range withString:text];
    if (newString.length <= self.maxLength) {
        return YES;
    } else {
        // 超长截断，比如复制粘贴
        if (self.text.length < self.maxLength) {
            self.text = [newString substringWithRange:NSMakeRange(0, self.maxLength)];
            [self togglePlaceholder];
            // 特殊情况手动发通知
            NSDictionary *dict = @{
                kHMInputType: @"input",
                kHMInputState: @(HMInputEventChanged),
                kHMInputText: self.text ?: @""};
            [self hm_notifyWithEventName:HMInputEventName argument:dict];
        }
        
        return NO;
    }
}

- (void)textViewDidChange:(UITextView *)textView {
    if (!self.markedTextRange) {
        // 一次性输入两个字的超长度截断
        if (self.text.length > self.maxLength) {
            NSString *text = [self.text substringWithRange:NSMakeRange(0, self.maxLength)];
            self.text = text;
            NSDictionary *dict = @{
                kHMInputType: @"input",
                kHMInputState: @(HMInputEventChanged),
                kHMInputText: text ? : @""};
            [self hm_notifyWithEventName:HMInputEventName argument:dict];
        } else {
            // 其他正常情况
            NSDictionary *dict = @{
                kHMInputType: @"input",
                kHMInputState: @(HMInputEventChanged),
                kHMInputText: self.text ?: @""};
            [self hm_notifyWithEventName:HMInputEventName argument:dict];
        }
    }
    [self togglePlaceholder];
}
- (void)deleteBackward {
    BOOL shouldDismiss = [self.text length] == 0;
    [super deleteBackward];
    if (shouldDismiss) {
        [self textViewDidChange:self];
    }
}

#pragma mark - <HMDescription>
- (NSString *)hm_content {
    
    return self.text;
}

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    return nil;
}

@end
