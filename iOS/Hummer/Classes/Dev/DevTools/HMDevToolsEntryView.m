//
//  HMDevToolsEntryView.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsEntryView.h"
#import "HMDevToolsViewController.h"
#import "HMJSGlobal.h"
#import "HMUtility.h"

static const CGFloat HMDevToolsWindowEntryViewSize = 50.f;
static const NSInteger HMDevToolsWindowEntryTag = 34649;


@interface HMDevToolsEntryView ()

@property (nonatomic, strong) UIButton *entry;
@property (nonatomic, weak) HMJSContext *currentContext;
@property (nonatomic, assign) BOOL showDebugView;
@property (nonatomic, strong) HMDevToolsViewController *toolsVC;

@end

@implementation HMDevToolsEntryView

+ (instancetype)entryWindow {
    CGRect origin = CGRectMake(0, CGRectGetHeight(UIScreen.mainScreen.bounds) / 3, HMDevToolsWindowEntryViewSize, HMDevToolsWindowEntryViewSize);
    return [[self alloc] initWithFrame:origin];
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        _showDebugView = NO;
        self.tag = HMDevToolsWindowEntryTag;
        _toolsVC = HMDevToolsViewController.new;
        self.backgroundColor = [UIColor clearColor];
        [self addSubview:self.entry];
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(pan:)];
        [self addGestureRecognizer:pan];
    }
    return self;
}
+ (void)showWithContext:(HMJSContext *)context {
    UIViewController *currentVC = HMCurrentViewController(context.rootView);
    UIView *devToolView = [currentVC.view viewWithTag:HMDevToolsWindowEntryTag];
    if (devToolView) {
        [currentVC.view bringSubviewToFront:devToolView];
        return;
    }
    HMDevToolsEntryView *window = HMDevToolsEntryView.entryWindow;
    [window _showWithContext:context controller:currentVC];
}

- (void)_showWithContext:(HMJSContext *)context controller:(UIViewController *)currentVC{
    self.currentContext = context;
    self.toolsVC.currentContext = context;
   
    // add controller
    [currentVC addChildViewController:self.toolsVC];
    [currentVC.view addSubview:self.toolsVC.view];
    self.toolsVC.view.frame = currentVC.view.bounds;
    
    // add view
    CGRect tagetFrame = currentVC.view.frame;
    self.frame = CGRectMake(CGRectGetMaxX(tagetFrame) - HMDevToolsWindowEntryViewSize, CGRectGetHeight(tagetFrame) / 3, HMDevToolsWindowEntryViewSize, HMDevToolsWindowEntryViewSize);
    [currentVC.view addSubview:self];
    
    self.toolsVC.view.hidden = YES;
    self.hidden = NO;
}

- (void)hide {
    self.hidden = YES;
}

#pragma mark - Actions

- (void)entryClick:(UIButton *)sender {
    _showDebugView = !_showDebugView;
    self.toolsVC.view.hidden = !_showDebugView;
}

- (void)pan:(UIPanGestureRecognizer *)panGestureRecognizer {
    UIView *panView = panGestureRecognizer.view;
    switch (panGestureRecognizer.state) {
        case UIGestureRecognizerStateBegan:
        case UIGestureRecognizerStateChanged: {
            CGPoint translation = [panGestureRecognizer translationInView:panView];
            [panGestureRecognizer setTranslation:CGPointZero inView:panView];
            panView.center = CGPointMake(panView.center.x + translation.x, panView.center.y + translation.y);
        }
            break;
        case UIGestureRecognizerStateEnded:
        case UIGestureRecognizerStateCancelled: {
            CGPoint location = panView.center;
            CGFloat centerX;
            CGFloat safeBottom = 0;
            if (@available(iOS 11.0, *)) {
               safeBottom = self.safeAreaInsets.bottom;
            }
            CGFloat centerY = MAX(
                MIN(
                    location.y,
                    CGRectGetMaxY(UIScreen.mainScreen.bounds) - safeBottom
                ),
                CGRectGetHeight(UIApplication.sharedApplication.statusBarFrame)
            );
            if (location.x > CGRectGetWidth([UIScreen mainScreen].bounds)/2.f) {
                centerX = CGRectGetWidth(UIScreen.mainScreen.bounds) - HMDevToolsWindowEntryViewSize / 2;
            } else {
                centerX = HMDevToolsWindowEntryViewSize / 2;
            }
            [UIView animateWithDuration:0.3 animations:^{
                panView.center = CGPointMake(centerX, centerY);
            }];
        }
        default:
            break;
    }
}


#pragma mark - Getter

- (UIButton *)entry {
    if (!_entry) {
        _entry = [[UIButton alloc] initWithFrame:self.bounds];
        _entry.backgroundColor = UIColor.systemBlueColor;
        _entry.tintColor = UIColor.whiteColor;
        if (@available(iOS 13.0, *)) {
            [_entry setImage:[UIImage systemImageNamed:@"hammer"] forState:UIControlStateNormal];
        } else {
            [_entry setTitle:@"打开调试" forState:UIControlStateNormal];
        }
        _entry.layer.cornerRadius = 25.;
        [_entry addTarget:self action:@selector(entryClick:) forControlEvents:UIControlEventTouchUpInside];
    }

    return _entry;
}

@end
