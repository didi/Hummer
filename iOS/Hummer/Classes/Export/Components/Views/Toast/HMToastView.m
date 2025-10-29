//
//  HMToastView.m
//  Pods
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMToastView.h"
#import "HMConverter.h"
#import "HMUtility.h"
#import "UIView+HMDom.h"
#import "UIView+HMRenderObject.h"
#import "HMJSGlobal.h"
#import "HMConfigEntryManager.h"

@interface HMToastView ()

/** 文字label */
@property (nonatomic, strong) UILabel *textLabel;
/** toast所在的父view */
@property (nonatomic, weak) UIView *parentView;

@end

@implementation HMToastView

- (void)dealloc
{
#ifdef DEBUG
    NSLog(@"[dealloc] %@ ...", self.class);
#endif
}

- (instancetype)initWithView:(UIView *)view
{
    NSAssert(view, @"view不能为空");
    
    self = [super initWithFrame:view.bounds];
    if (self) {
        _insets = UIEdgeInsetsMake(10, 10, 10, 10);
        _parentView = view;
    }
    return self;
}

- (UILabel *)textLabel
{
    if (!_textLabel) {
        _textLabel = [[UILabel alloc] init];
        _textLabel.backgroundColor = [UIColor clearColor];
        _textLabel.textAlignment = NSTextAlignmentCenter;
        _textLabel.textColor = [UIColor whiteColor];
        NSString *fontFamily = [HMFontAdaptor fontWithNamespace:[HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace].defaultFontFamily;
        _textLabel.font = fontFamily ? [UIFont fontWithName:fontFamily size:14] : [UIFont systemFontOfSize:14.0f];
        _textLabel.numberOfLines = 0;
        [self addSubview:_textLabel];
    }
    return _textLabel;
}

- (void)updateWithText:(NSString *)text
{
    self.backgroundColor = [HMConverter HMStringToColor:@"#3a3b42"];
    self.layer.cornerRadius = 2;
//    self.layer.masksToBounds = YES;
    self.textLabel.text = text;
    
    CGFloat contentWidth = CGRectGetWidth(self.parentView.bounds);
    CGFloat contentHeight = CGRectGetHeight(self.parentView.bounds);
    
    CGFloat limitWidth = contentWidth - self.insets.left - self.insets.right;
    CGFloat limitHeight = contentHeight - self.insets.top - self.insets.bottom;
    CGSize limitSize = CGSizeMake(limitWidth, limitHeight);
    CGSize textSize = [self.textLabel sizeThatFits:limitSize];
    
    self.textLabel.frame = CGRectMake(self.insets.left, self.insets.top, textSize.width, textSize.height);
    self.frame = CGRectMake(self.insets.left, self.insets.top, textSize.width + self.insets.left + self.insets.right, textSize.height + self.insets.top + self.insets.bottom);
}

- (void)updateWithView:(UIView *)view
{
    self.backgroundColor = UIColor.clearColor;
    
    if (_textLabel) {
        self.textLabel.text = nil;
    }
    
    [self addSubview:view];
    [self hm_markDirty];

    CGSize viewSize = [view hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];

    view.frame = CGRectMake(self.insets.left,
                            self.insets.top,
                            viewSize.width,
                            viewSize.height);
    
    self.frame = CGRectMake(self.insets.left,
                            self.insets.top,
                            viewSize.width + self.insets.left + self.insets.right,
                            viewSize.height + self.insets.top + self.insets.bottom);
}

- (void)showWithDuration:(NSTimeInterval)duration
{
    [self performSelector:@selector(hideDelayed:) withObject:[NSNumber numberWithBool:YES] afterDelay:duration];
}

- (void)hideDelayed:(NSNumber *)animated
{
    [self hide:[animated boolValue]];
}

- (void)hide:(BOOL)animated
{
    if (animated) {
        [UIView animateWithDuration:0.3 animations:^{
            self.alpha = 0;
        } completion:^(BOOL finished) {
            [self dismiss];
        }];
    } else {
        [self dismiss];
    }
}

- (void)dismiss
{
    if ([self.delegate respondsToSelector:@selector(hm_didToastViewHide)]) {
        [self.delegate hm_didToastViewHide];
    } else {
        [self removeFromSuperview];
    }
}

@end
