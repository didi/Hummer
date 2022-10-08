//
//  HMInput.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMInput.h"

#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "NSObject+Hummer.h"
#import "HMUtility.h"
#import "HMInputEvent.h"
#import "UIView+HMEvent.h"
#import "UIView+HMDom.h"
#import "HMBaseValue.h"
#import "HMConfigEntryManager.h"
#import "HMJSGlobal.h"
#import <Hummer/UIView+HMInspector.h>

@interface HMInput() <UITextFieldDelegate, HMViewInspectorDescription>

@property (nonatomic, strong) UIColor *caretColor;

@property (nonatomic, assign) CGFloat fontSize;
@property (nonatomic, copy) NSString *fontFamily;

@property (nonatomic, strong) NSMutableDictionary *placeholderAttributes;
@property (nonatomic, strong) UIColor *placeholderColor;
@property (nonatomic, assign) CGFloat placeholderFontSize;

@property (nonatomic, assign) NSInteger maxLength;

@property (nonatomic, copy) NSString *keyboardTypeString;

NS_ASSUME_NONNULL_BEGIN

- (void)textFieldDidChange:(id)sender;

NS_ASSUME_NONNULL_END

@end

@implementation HMInput

HM_EXPORT_CLASS(Input, HMInput)

HM_EXPORT_PROPERTY(text, __text, __setText:)
HM_EXPORT_PROPERTY(placeholder, placeholder, __setPlaceholder:)
HM_EXPORT_PROPERTY(focused, __focused, __setFocused:)

HM_EXPORT_ATTRIBUTE(type, keyboardTypeString, HMStringOrigin:)
HM_EXPORT_ATTRIBUTE(color, textColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(cursorColor, caretColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(textAlign, textAlignment, HMStringToTextAlignment:)
HM_EXPORT_ATTRIBUTE(fontFamily, fontFamily, HMStringOrigin:)
HM_EXPORT_ATTRIBUTE(placeholderColor, placeholderColor, HMStringToColor:)
HM_EXPORT_ATTRIBUTE(fontSize, fontSize, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(placeholderFontSize, placeholderFontSize, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(maxLength, maxLength, HMNumberToNSInteger:)
HM_EXPORT_ATTRIBUTE(returnKeyType, returnKeyType, HMStringToReturnKeyType:)

- (void)textFieldDidChange:(id)sender {
    if (!self.markedTextRange) {
        // 中文一次性输入两个字的超长度截断
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
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        _fontSize = 16.0;
        _placeholderFontSize = 16.0;
        _placeholderColor = [HMConverter HMStringToColor:@"#999999"];
        _placeholderAttributes = [[NSMutableDictionary alloc] init];
        _maxLength = NSUIntegerMax;
        [self updateFont];
        [self addTarget:self action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
        self.delegate = self;
    }
    return self;
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

- (void)updatePlaceholderFont {
    self.attributedPlaceholder = [[NSAttributedString alloc] initWithString:self.placeholder ?: @""
                                                                 attributes:self.placeholderAttributes];
}

- (void)setPlaceholder:(NSString *)placeholder {
    if (self.placeholderAttributes) {
        self.attributedPlaceholder = [[NSAttributedString alloc] initWithString:placeholder
                                                                     attributes:self.placeholderAttributes];
    } else {
        [super setPlaceholder:placeholder];
    }
    [self hm_markDirty];
}

#pragma mark - Export Property

- (NSString *)__text {
    return self.text;
}

- (void)__setText:(HMBaseValue *)text {
    [self setText:[text toString]];
    [self hm_markDirty];
}

- (void)__setPlaceholder:(HMBaseValue *)placeholder {
    [self setPlaceholder:[placeholder toString]];
}

- (BOOL )__focused {
    return self.isFirstResponder;
}

- (void)__setFocused:(HMBaseValue *)focused {
    NSNumber *num_focused = [focused toNumber];
    if (!num_focused) {return;}
    BOOL theFocused = [num_focused boolValue];
    if (theFocused) {
        [self becomeFirstResponder];
    } else {
        [self resignFirstResponder];
    }
}

#pragma mark - Export Attribute

- (void)setKeyboardTypeString:(NSString *)string {
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

- (void)setFontSize:(CGFloat)fontSize {
    _fontSize = fontSize;
    [self updateFont];
}

- (void)setFontFamily:(NSString *)fontFamily {
    NSString *filteredName = hm_availableFontName(fontFamily);
    _fontFamily = [filteredName copy];
    [self updateFont];
}

- (void)setPlaceholderColor:(UIColor *)placeholderColor {
    _placeholderColor = placeholderColor;
    self.placeholderAttributes[NSForegroundColorAttributeName] = placeholderColor;
    [self updatePlaceholderFont];
}

- (void)setPlaceholderFontSize:(CGFloat)placeholderFontSize {
    _placeholderFontSize = placeholderFontSize;
    UIFont *font;
    if (self.fontFamily) {
        font = [UIFont fontWithName:self.fontFamily size:placeholderFontSize];
    } else {
        font = [UIFont systemFontOfSize:placeholderFontSize];
    }
    self.placeholderAttributes[NSFontAttributeName] = font;
    [self updatePlaceholderFont];
}

#pragma mark - UITextFieldDelegate

- (void)textFieldDidBeginEditing:(__unused UITextField *)textField {
    NSDictionary *dict = @{kHMInputType:HMInputEventName,
                           kHMInputState:@(HMInputEventBegan),
                           kHMInputText:self.text?:@"",};
    [self hm_notifyWithEventName:HMInputEventName argument:dict];
}

- (void)textFieldDidEndEditing:(__unused UITextField *)textField {
    // send `Input Event End` event
    NSDictionary *dict = @{kHMInputType:HMInputEventName,
                           kHMInputState:@(HMInputEventEnded),
                           kHMInputText:self.text?:@""};
    [self hm_notifyWithEventName:HMInputEventName argument:dict];
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    if (self.markedTextRange) {
        // 高亮标记不做长度检查
        return YES;
    }
    NSString *newString = [textField.text stringByReplacingCharactersInRange:range withString:string];
    
    // 非中文的超长检测
    if (newString.length <= self.maxLength) {
        return YES;
    } else {
        // 非中文超长截断，比如复制粘贴
        if (self.text.length < self.maxLength) {
            self.text = [newString substringWithRange:NSMakeRange(0, self.maxLength)];
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

- (void)deleteBackward {
    BOOL shouldDismiss = [self.text length] == 0;
    [super deleteBackward];
    if (shouldDismiss) {
        [self textFieldDidChange:self];
    }
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    [self resignFirstResponder];
    NSDictionary *dict = @{kHMInputType:@"input",
                           kHMInputState:@(HMInputEventConfirmed),
                           kHMInputText:self.text?:@""};
    [self hm_notifyWithEventName:HMInputEventName argument:dict];
    return YES;
}

#pragma mark - <HMDescription>
- (NSString *)hm_content {
    
    return self.text;
}

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    return nil;
}

@end
