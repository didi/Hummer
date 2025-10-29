//
//  HMRefreshBaseView.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRefreshBaseView.h"
#import "UIView+HMRenderObject.h"
#import "UIView+HMDom.h"
#import <Hummer/UIView+HMInspector.h>

#define HMDefaultRefreshHeight 44
#define HMDefaultLoadhHeight 44

@interface HMRefreshBaseView () <UIScrollViewDelegate, HMViewInspectorDescription>

@property (nonatomic, strong) UIView * contentView;

@property (nonatomic, weak) UIScrollView *scrollView;

@end

@implementation HMRefreshBaseView

/// Call from dealloc of super view
- (void)removeObserver {
    if ([self.superview isKindOfClass:[UIScrollView class]]) {
        [self.superview removeObserver:self forKeyPath:@"contentOffset"];
        [self.superview removeObserver:self forKeyPath:@"contentSize"];
    }
}

- (instancetype)initWithScrollView:(UIScrollView *)scrollView
                          callback:(__unused __kindof id)callback {

    if (self = [super init]) {
        self.autoresizingMask = UIViewAutoresizingFlexibleWidth;
        self.backgroundColor = [UIColor clearColor];
        self.isHmLayoutEnabled = NO;
        self.clipsToBounds = YES;
        
        self.contentView = [[UIView alloc]initWithFrame:CGRectZero];
        self.contentView.backgroundColor = [UIColor clearColor];
        [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.justifyContent = YOGA_TYPE_WRAPPER(YGJustifyCenter);
            layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignCenter);
        }];
        [self addSubview:self.contentView];
        
        if ([scrollView isKindOfClass:[UIScrollView class]]) {
            self.scrollView = (UIScrollView *)scrollView;
            self.scrollView.alwaysBounceVertical = YES;
            NSKeyValueObservingOptions options = NSKeyValueObservingOptionNew |
                                                 NSKeyValueObservingOptionOld;
            [self.scrollView addObserver:self
                              forKeyPath:@"contentOffset"
                                 options:options
                                 context:nil];
            [self.scrollView addObserver:self
                              forKeyPath:@"contentSize"
                                 options:options
                                 context:nil];
        }
    }
    return self;
}

- (void)layoutContentView {
    if (self.contentView.hm_renderObject.isDirty) {
        [self.contentView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
    }
}

#pragma mark - KVO

- (void)observeValueForKeyPath:(NSString *)keyPath
                      ofObject:(id)object
                        change:(NSDictionary *)change
                       context:(void *)context {
    if ([keyPath isEqualToString:@"contentOffset"]) {
        [self _contentOffsetChanged:change];
    } else if ([keyPath isEqualToString:@"contentSize"]) {
        [self _contentSizeChanged:change];
    }
}

- (void)_contentOffsetChanged:(__unused NSDictionary *)change {
    
}

- (void)_contentSizeChanged:(__unused NSDictionary *)change {
    
}

#pragma mark - Setter

- (void)setInsets:(UIEdgeInsets)insets {
    _insets = insets;
    [self setNeedsLayout];
}

#pragma mark - <HMViewInspectorDescription>

- (nullable NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    UIView *view = (UIView *)[self.contentViewValue toNativeObject];
    return [view hm_displayJsChildren];
}

- (HMBaseValue *)hm_displayJsElement {
    return self.contentViewValue;
}

- (NSString *)hm_displayID {
    UIView *view = (UIView *)[self.contentViewValue toNativeObject];
    return [view hm_ID];
}

- (id)hm_displayContent {
    
    UIView *view = (UIView *)[self.contentViewValue toNativeObject];
    return [view hm_displayContent];
}

- (NSString *)hm_displayTagName {
    
    UIView *view = (UIView *)[self.contentViewValue toNativeObject];
    return [view hm_displayTagName];
}

@end

@interface HMRefreshHeaderView ()
@property (nonatomic, assign) HMRefreshType state;     // 刷新状态
@property (nonatomic, assign) BOOL refreshHasCompleted; // 刷新是否完成
@property (nonatomic, assign) CGFloat freshHeight;
@property (nonatomic, copy) HMStateRefreshChangedBlock stateChangedBlock;
@end

@implementation HMRefreshHeaderView

- (instancetype)initWithScrollView:(UIScrollView *)scrollView
                          callback:(nonnull HMStateRefreshChangedBlock)callback {
    if (self = [super initWithScrollView:scrollView callback:callback]) {
        _freshHeight = HMDefaultRefreshHeight;
        self.refreshHasCompleted = YES;
        self.stateChangedBlock = callback;
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    if (CGRectGetWidth(self.superview.bounds) == 0 || CGRectGetHeight(self.superview.frame) == 0) {
        return;
    }
    self.frame = CGRectMake(self.insets.left, -self.freshHeight, CGRectGetWidth(self.superview.bounds)-self.insets.left-self.insets.right, self.freshHeight);
    self.contentView.frame=self.bounds;
    [self.contentView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
}

- (void)setFreshHeight:(CGFloat)freshHeight {
    _freshHeight = freshHeight;
    [self setNeedsLayout];
    [self layoutIfNeeded];
}

- (void)_contentOffsetChanged:(__unused NSDictionary *)change {
    HMRefreshType oldType = self.state;
    
    // 正在刷新，不处理任何事件
    if (oldType == HMRefreshTypeRefreshing ||
        !self.refreshHasCompleted) {
        return;
    }
    // 防止修改contentInset后对contentOffset的影响
    self.refreshHasCompleted = NO;
    
    CGFloat offsetY = -self.scrollView.contentInset.top - self.scrollView.contentOffset.y;
    HMRefreshType tempType = HMRefreshTypeNormal;
    
    BOOL triggerEvent = offsetY > self.freshHeight;
    if (self.scrollView.dragging) {
        // 只有正常状态和将要刷新状态
        if (triggerEvent) {
            tempType = HMRefreshTypeWillRefresh;
        }
    } else {
        // 只有正常状态和刷新状态
        if (oldType == HMRefreshTypeWillRefresh && triggerEvent) {
            tempType = HMRefreshTypeRefreshing;
        }
    }
    
    if (oldType != tempType) {
        [self _updateWithType:tempType];
    }
    _refreshHasCompleted = YES;
}

- (void)endRefresh {
    [UIView animateWithDuration:0.25 animations:^{
        UIEdgeInsets inset = self.scrollView.contentInset;
        inset.top = 0;
        self.scrollView.contentInset = inset;
    }];
    if (self.state != HMRefreshTypeNormal) {
        self.state = HMRefreshTypeNormal;
        if (self.stateChangedBlock) {
            self.stateChangedBlock(HMRefreshTypeNormal);
        }
    }
    [self layoutContentView];
}

- (void)beginRefresh {
    UIEdgeInsets insets = self.scrollView.contentInset;
    insets.top = self.freshHeight;
    [UIView animateWithDuration:.4f animations:^{
        self.scrollView.contentInset = insets;
    }];
    
    self.state = HMRefreshTypeRefreshing;
    if (self.stateChangedBlock) {
        self.stateChangedBlock(HMRefreshTypeRefreshing);
    }
    [self layoutContentView];
}

- (void)willRefresh {
    self.state = HMRefreshTypeWillRefresh;
    if (self.stateChangedBlock) {
        self.stateChangedBlock(HMRefreshTypeWillRefresh);
    }
    [self layoutContentView];
}

- (void)_updateWithType:(HMRefreshType)type {
    if (type == HMRefreshTypeNormal) {
        [self endRefresh];
    } else if (type == HMRefreshTypeWillRefresh) {
        [self willRefresh];
    } else if (type == HMRefreshTypeRefreshing) {
        [self beginRefresh];
    }
}

#pragma mark - <HMViewInspectorDescription>

- (NSString *)hm_displayAlias {
    
    return @"Header";
}

@end

@interface HMLoadFooterView ()

@property (nonatomic, assign) HMLoadType state;

@property (nonatomic, assign) CGFloat loadHeight;
@property (nonatomic, assign) BOOL showBottom;

@property (nonatomic, copy) HMStateLoadChangedBlock stateChangedBlock;

@property (nonatomic, assign) BOOL isAnimated;

@end

@implementation HMLoadFooterView

- (instancetype)initWithScrollView:(UIScrollView *)scrollView
                          callback:(nonnull HMStateLoadChangedBlock)callback {
    if (self = [super initWithScrollView:scrollView callback:callback]) {
        _loadHeight = HMDefaultLoadhHeight;
        self.stateChangedBlock = callback;
    }
    return self;
}

- (void)reset {
    self.state = HMLoadTypeNormal;
    [self setNeedsLayout];
}

- (void)setLoadHeight:(CGFloat)height {
    _loadHeight = height;
    [self setNeedsLayout];
    [self layoutIfNeeded];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    if (NO == CGRectEqualToRect(self.scrollView.frame, CGRectZero)) {
        CGFloat offsetY = MAX(CGRectGetHeight(self.scrollView.frame),self.scrollView.contentSize.height)+ self.scrollView.contentInset.bottom;
        if (self.state == HMLoadTypeRefreshing) {
            offsetY -= self.loadHeight;
        }
        self.frame = CGRectMake(self.insets.left,
                                offsetY,
                                self.scrollView.bounds.size.width-self.insets.left -self.insets.right,
                                self.loadHeight);
        self.contentView.frame = self.bounds;
        [self.contentView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
    }
}

- (void)_contentSizeChanged:(NSDictionary *)change {
    // 防止连续调用
    CGSize old = [change[@"old"] CGSizeValue];
    CGSize new = [change[@"new"] CGSizeValue];
    if (CGSizeEqualToSize(old, new)) {
        return;
    }
    [self setNeedsLayout];
    [self layoutIfNeeded];
}

- (void)_contentOffsetChanged:(NSDictionary *)change {
    HMLoadType state = self.state;
    if (state == HMLoadTypeRefreshing) {
        return;
    }
    
    // 防止手松开时连续调用
    CGPoint old = [change[@"old"] CGPointValue];
    CGPoint new = [change[@"new"] CGPointValue];
    if (CGPointEqualToPoint(old, new)) {
        return;
    }
    
    // 内容小于一个屏幕时不触发
    CGFloat totalContentHeight = self.scrollView.contentInset.bottom + self.scrollView.contentSize.height ;
    if (totalContentHeight < CGRectGetHeight(self.scrollView.frame)) {
        return;
    }

    /// 滚动到底部时：contentSize+bottom - frame.size.height = contentOffset
    CGFloat totalHeight = self.scrollView.contentSize.height+self.scrollView.contentInset.bottom - CGRectGetHeight(self.scrollView.frame);
    if (self.scrollView.contentOffset.y - totalHeight >= self.loadHeight) {
        [self beginLoad];
    }
}

/// 前提是已经展示完UI后才能触发
- (void)beginLoad {
    if (self.state != HMLoadTypeNormal || self.isAnimated) {
        return;
    }
    
    self.state = HMLoadTypeRefreshing;
    if (self.stateChangedBlock) {
        self.stateChangedBlock(HMLoadTypeRefreshing);
    }
    
    CGPoint offset = self.scrollView.contentOffset;
    UIEdgeInsets insets = self.scrollView.contentInset;
    insets.bottom += self.loadHeight;
    self.scrollView.contentInset = insets;
    self.scrollView.contentOffset = offset;
    [self setNeedsLayout];
    [self layoutIfNeeded];
}
/**
 * 设置上拉加载控件
 * @param enable 下次能否继续触发加载更多
 * 已经处在对应状态，仍会触发 state changed callback。
 */
- (void)endLoad:(BOOL)enabled
{

    void(^doAnimation)(void) = ^(void){
        self.isAnimated = YES;
        UIEdgeInsets insets = self.scrollView.contentInset;
        insets.bottom -= self.loadHeight;
        [UIView animateWithDuration:0.25 animations:^{
            self.scrollView.contentInset = insets;
        } completion:^(BOOL finished) {
            CGPoint offset = self.scrollView.contentOffset;
            [self.scrollView setContentOffset:offset animated:NO];
            self.isAnimated = NO;
        }];
    };
    
    if (!self.isAnimated) {
        doAnimation();
    }

    HMLoadType state = enabled ? HMLoadTypeNormal : HMLoadTypeNoMoreData;
    self.state = state;
    if (self.stateChangedBlock) {
        self.stateChangedBlock(state);
    }
    [self setNeedsLayout];
    [self layoutIfNeeded];
}


#pragma mark - <HMViewInspectorDescription>

- (NSString *)hm_displayAlias {
    
    return @"Footer";
}
@end
