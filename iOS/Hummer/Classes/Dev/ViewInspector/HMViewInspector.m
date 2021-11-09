//
//  HMViewInspector.m
//  Expecta
//
//  Created by didi on 2021/8/5.
//

#import "HMViewInspector.h"


@interface HMInspectorHighlightView : UIView

@property (nonatomic, strong) UILabel *toastLab;

@property (nonatomic, strong) UIView *highlightView;
@end

@implementation HMInspectorHighlightView

- (instancetype)init {
    self = [super init];
    if (self) {
        
        _toastLab = [[UILabel alloc] init];
        _toastLab.text = @"视图调试中";
        _toastLab.textColor = [UIColor colorWithWhite:0 alpha:0.5];
        [self addSubview:_toastLab];
        [_toastLab sizeToFit];
        _toastLab.center = CGPointMake(60, 20);

         
        _highlightView = [[UIView alloc] init];
        _highlightView.layer.borderColor = [UIColor colorWithRed:255 green:0 blue:0 alpha:0.6].CGColor;
        _highlightView.layer.borderWidth = 4;
        [self addSubview:_highlightView];
    }
    return self;
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    
    [self hide];
}

- (void)hide {
    
    [self removeFromSuperview];
}

- (void)highlight:(UIView *)view {
    
    UIWindow *window = [HMInspectorHighlightView getKeyWindow];
    CGRect frame = [window convertRect:view.frame fromView:view.superview];
    self.highlightView.frame = frame;
    self.frame = window.bounds;
    [window addSubview:self];
}

+ (UIWindow *)getKeyWindow{
    UIWindow *keyWindow = nil;
    if ([[UIApplication sharedApplication].delegate respondsToSelector:@selector(window)]) {
        keyWindow = [[UIApplication sharedApplication].delegate window];
    }else{
        NSArray *windows = [UIApplication sharedApplication].windows;
        for (UIWindow *window in windows) {
            if (!window.hidden) {
                keyWindow = window;
                break;
            }
        }
    }
    return keyWindow;
}


@end

@implementation HMViewInspector
static HMInspectorHighlightView *_highlightView;

+ (void)highlightView:(nullable UIView *)view {

    if (!view) {
        [_highlightView hide];
    }
    if (!_highlightView) {
        _highlightView = [HMInspectorHighlightView new];
    }
    [_highlightView highlight:view];

}
@end
