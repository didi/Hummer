//
//  HMButton.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMButton.h"
#import "HMExportManager.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"
#import "UIView+HMEvent.h"
#import "HMTapEvent.h"
#import <objc/runtime.h>
#import <objc/message.h>
#import "UIView+HMDom.h"
#import "UIView+HMAttribute.h"
#import "HMUtility.h"

@interface HMButton()

@property (nonatomic, strong) JSValue *listener;
@property (nonatomic, assign) NSTextAlignment textAlign;

@property (nonatomic, copy) NSString *fontFamily;
@property (nonatomic, assign) CGFloat fontSize;

@property (nonatomic, strong) UIColor *normalBackgroundColor;
@property (nonatomic, strong) UIColor *normalTitleColor;
@property (nonatomic, strong) UIColor *disabledBackgroundColor;
@property (nonatomic, strong) UIColor *disabledTitleColor;
@property (nonatomic, strong) UIColor *pressBackgroundColor;
@property (nonatomic, strong) UIColor *pressTitleColor;

@end

@implementation HMButton

HM_EXPORT_CLASS(Button, HMButton)

HM_EXPORT_PROPERTY(text, __text, __setText:)
HM_EXPORT_PROPERTY(disabled, __disabled, __setDisabled:)
HM_EXPORT_PROPERTY(pressed, __pressed, __setPressed:)

HM_EXPORT_ATTRIBUTE(textAlign, textAlignment, HMStringToTextAlignment:)
HM_EXPORT_ATTRIBUTE(fontFamily, fontFamily, HMStringOrigin:)
HM_EXPORT_ATTRIBUTE(fontSize, fontSize, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(color, textColor, HMStringToColor:)

- (instancetype)init {
    self = [super init];
    if (self) {
        self.normalBackgroundColor = [UIColor whiteColor];
        self.fontSize = 16.0;
        self.normalTitleColor = [UIColor blackColor];
        self.titleLabel.lineBreakMode = NSLineBreakByTruncatingTail;
    }
    return self;
}

- (void)layoutSubviews {
    [self hm__setBackgroundColor:[self backgroundColorForState:self.state]];
    [super layoutSubviews];
}

- (UIColor *)backgroundColorForState:(UIControlState)state {
    UIColor *backgroundColor = self.normalBackgroundColor;
    if(state & UIControlStateHighlighted){
        backgroundColor = self.pressBackgroundColor?:self.normalBackgroundColor;
    } else if(state & UIControlStateDisabled){
        backgroundColor = self.disabledBackgroundColor?:self.normalBackgroundColor;
    }
    return backgroundColor;
}

- (void)setDisabledTitleColor:(UIColor *)disabledTitleColor {
    _disabledTitleColor = disabledTitleColor;
    [self setTitleColor:disabledTitleColor forState:UIControlStateDisabled];
}

- (void)setNormalTitleColor:(UIColor *)normalTitleColor {
    _normalTitleColor = normalTitleColor;
    [self setTitleColor:_normalTitleColor forState:UIControlStateNormal];
}

- (void)setPressTitleColor:(UIColor *)pressTitleColor {
    _pressTitleColor = pressTitleColor;
    [self setTitleColor:_pressTitleColor forState:UIControlStateHighlighted];
}

#pragma mark - Export Property

- (NSNumber *)hm_enabled{
    return @(self.enabled);
}

- (void)hm_setEnabled:(JSValue *)enabledValue {
    BOOL enabled = [enabledValue toBool];
    self.enabled = enabled;
}

- (void)__setText:(JSValue *)value {
    NSString *title = [value toString];
    [self setTitle:title forState:UIControlStateNormal];
    [self hm_markDirty];
}

- (JSValue *)__text {
    NSString *title = [self titleForState:UIControlStateNormal];
    return [JSValue valueWithObject:title inContext:self.hmContext];
}

- (JSValue *)__disabled {
    UIColor *bgColor = self.disabledBackgroundColor ?: self.normalBackgroundColor;
    UIColor *titleColor = self.disabledTitleColor ?: self.normalTitleColor;
    NSDictionary *dict = @{@"backgroundColor": [HMConverter HMColorToString:bgColor],
                           @"color": [HMConverter HMColorToString:titleColor]};
    return [JSValue valueWithObject:dict inContext:self.hmContext];
}

- (void)__setDisabled:(JSValue *)disabled {
    NSDictionary *dict = [disabled toObject];
    if(dict[@"backgroundColor"]){
        self.disabledBackgroundColor = [HMConverter HMStringToColor:dict[@"backgroundColor"]];
    }
    if(dict[@"color"]){
        self.disabledTitleColor = [HMConverter HMStringToColor:dict[@"color"]];
    }
}

- (JSValue *)__pressed {
    UIColor *bgColor = self.pressBackgroundColor?:self.normalBackgroundColor;
    UIColor *titleColor = self.pressTitleColor?:self.normalTitleColor;
    NSDictionary *dict = @{@"backgroundColor": [HMConverter HMColorToString:bgColor],
                           @"color":[HMConverter HMColorToString:titleColor]};
    return [JSValue valueWithObject:dict inContext:self.hmContext];
}

- (void)__setPressed:(JSValue *)pressed {
    NSDictionary *dict = [pressed toObject];
    if(dict[@"backgroundColor"]){
        self.pressBackgroundColor = [HMConverter HMStringToColor:dict[@"backgroundColor"]];
    }
    if(dict[@"color"]){
        self.pressTitleColor = [HMConverter HMStringToColor:dict[@"color"]];
    }
}

#pragma mark - Export Attribute

// 复写父类方法
- (void)set__backgroundColor:(UIColor *)backgroundColor {
    self.normalBackgroundColor = backgroundColor;
    [self hm__setBackgroundColor:backgroundColor];
}

- (void)setTextAlignment:(NSTextAlignment)textAlign {
    self.titleLabel.textAlignment = textAlign;
    if (textAlign == NSTextAlignmentLeft) {
        self.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
    } else if (textAlign == NSTextAlignmentRight) {
        self.contentHorizontalAlignment = UIControlContentHorizontalAlignmentRight;
    } else {
        self.contentHorizontalAlignment = UIControlContentHorizontalAlignmentCenter;
    }
}

- (void)setFontFamily:(NSString *)fontFamily {
    NSString *filteredName = hm_availableFontName(fontFamily);

    _fontFamily = [filteredName copy] ?: @"";
    UIFont *font = [UIFont fontWithName:_fontFamily size:_fontSize];
    NSAssert(font, @"cannot find font with name %@", fontFamily);
    font = font ?: [UIFont systemFontOfSize:_fontSize];
    self.titleLabel.font = [UIFont fontWithName:_fontFamily size:_fontSize];
}

- (void)setFontSize:(CGFloat)fontSize {
    _fontSize = fontSize;
    if (_fontFamily) {
        self.titleLabel.font = [UIFont fontWithName:_fontFamily size:_fontSize];
    } else {
        self.titleLabel.font = [UIFont systemFontOfSize:_fontSize];
    }
}

- (void)setTextColor:(UIColor *)color {
    self.normalTitleColor = color;
}

#pragma mark - 颜色处理

- (void)hm__setBackgroundColor :(UIColor *)backgroundColor {
    struct objc_super superInfo = {
        .receiver = self,
        .super_class = self.superclass
    };
    void (*msgSend)(struct objc_super *, SEL,UIColor * color) = (__typeof__(msgSend)) objc_msgSendSuper;
    msgSend(&superInfo,@selector(set__backgroundColor:),backgroundColor);
}

@end
