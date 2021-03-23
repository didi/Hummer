//
//  HMScrollView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMScrollView.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMUtility.h"
#import "NSObject+Hummer.h"
#import "HMScrollEvent.h"
#import "UIView+HMEvent.h"
#import "HMJSGlobal.h"
#import "UIView+HMDom.h"
#import "UIView+HMRenderObject.h"
#import "HMRefreshBaseView.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMScrollContentView : UIView

@end

NS_ASSUME_NONNULL_END

@interface HMScrollView ()<UIScrollViewDelegate>
@property(nonatomic,copy) HMFuncCallback onScrollToTopLisener;
@property(nonatomic,copy) HMFuncCallback onScrollToBottomLisener;
@property(nonatomic,assign) CGPoint lastContentOffset;

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, nullable, strong) HMScrollContentView *contentView;

@property (nonatomic, assign) BOOL showScrollBar;

@property (nonatomic, assign) BOOL hummerBounces;

- (CGPoint)calculateOffsetForContentSize:(CGSize)newContentSize;

- (void)updateIfNeeded;

NS_ASSUME_NONNULL_END

@end

@implementation HMScrollView

#pragma mark - 视图层级管理

- (void)addSubview:(UIView *)view {
    if (view.isHmLayoutEnabled) {
        [self.contentView addSubview:view];
    } else {
        [super addSubview:view];
    }
}

- (void)insertSubview:(UIView *)view atIndex:(NSInteger)index {
    if (view.isHmLayoutEnabled) {
        [self.contentView insertSubview:view atIndex:index];
    } else {
        [super insertSubview:view atIndex:index];
    }
}

- (void)insertSubview:(UIView *)view aboveSubview:(UIView *)siblingSubview {
    if (view.isHmLayoutEnabled) {
        [self.contentView insertSubview:view aboveSubview:siblingSubview];
    } else {
        [super insertSubview:view aboveSubview:siblingSubview];
    }
}

- (void)insertSubview:(UIView *)view belowSubview:(UIView *)siblingSubview {
    if (view.isHmLayoutEnabled) {
        [self.contentView insertSubview:view belowSubview:siblingSubview];
    } else {
        [super insertSubview:view belowSubview:siblingSubview];
    }
}

HM_EXPORT_CLASS(HMScrollView, HMScrollView)

HM_EXPORT_PROPERTY(showScrollBar, showScrollBar, setShowScrollBar:)

- (BOOL)showScrollBar {
    return self.showsVerticalScrollIndicator || self.showsHorizontalScrollIndicator;
}

- (void)setShowScrollBar:(BOOL)showScrollBar {
    self.showsVerticalScrollIndicator = showScrollBar;
    self.showsHorizontalScrollIndicator = showScrollBar;
}

HM_EXPORT_PROPERTY(bounces, hummerBounces, setHummerBounces:)

- (BOOL)hummerBounces {
    return self.alwaysBounceVertical || self.alwaysBounceHorizontal;
}

- (void)setHummerBounces:(BOOL)hummerBounces {
    self.alwaysBounceHorizontal = hummerBounces;
    self.alwaysBounceVertical = hummerBounces;
}

#pragma mark - Init

- (void)layoutSubviews {
    [super layoutSubviews];
    [self hm_layoutBackgroundColorImageBorderShadowCornerRadius];
}

- (instancetype)initWithFrame:(CGRect)frame {
    if ([super initWithFrame:frame]) {
        self.showsVerticalScrollIndicator = NO;
        self.showsHorizontalScrollIndicator = NO;
        if (@available(iOS 11.0, *)) {
            self.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        } else {
            // Fallback on earlier versions
        }
        _contentView = [[HMScrollContentView alloc] initWithFrame:CGRectZero];
        [self addSubview:_contentView];
        _contentView.isHmLayoutEnabled = YES;
        self.delegate = self;
        self.bounces = YES;
        self.keyboardDismissMode = UIScrollViewKeyboardDismissModeOnDrag;
    }
    return self;
}

- (instancetype)initWithHMValues:(NSArray *)values {
    if(self = [super initWithHMValues:values]) {
        HMBaseValue * value = values.firstObject;
        if(value && value.isObject){
            NSDictionary * dict = value.toDictionary;
            self.pagingEnabled = [dict[@"pagingEnabled"] integerValue] > 0;
            self.scrollDirection = [dict[@"horizontalScroll"] integerValue] ;
        }
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.overflow = YOGA_TYPE_WRAPPER(YGOverflowScroll);
        }];
    }
    return self;
}

#pragma mark - Export inset

HM_EXPORT_PROPERTY(inset, __contentInset, __setContentInset:)

- (NSDictionary *)__contentInset {
    return @{@"top":@(self.contentInset.top),@"left":@(self.contentInset.left),@"bottom":@(self.contentInset.bottom),@"right":@(self.contentInset.right)};
}

- (void)__setContentInset:(HMBaseValue *) value {
    if(!value.isObject){
        return;
    }
    NSDictionary * dic = value.toDictionary;
    float top = [dic[@"top"] floatValue];
    float left = [dic[@"left"] floatValue];
    float bottom = [dic[@"bottom"] floatValue];
    float right = [dic[@"right"] floatValue];
    HMExecOnMainQueue(^{
        self.contentInset = UIEdgeInsetsMake(top, left, bottom, right);
        if(self.scrollDirection == HMScrollDirectionHorizontal){
            self.contentOffset = CGPointMake(-left, 0);
        } else {
            self.contentOffset = CGPointMake(-top, 0);
        }
    });
}

#pragma mark - Export updateContentSize

HM_EXPORT_METHOD(updateContentSize, updateContentSize)

- (void)updateContentSize {
    // interface compatible
}

#pragma mark - Export

HM_EXPORT_METHOD(setOnScrollToTopListener, onScrollToTop:)

- (void)onScrollToTop:(HMFuncCallback)callback {
    self.onScrollToTopLisener = callback;
}

HM_EXPORT_METHOD(setOnScrollToBottomListener, onScrollToBottom:)

- (void)onScrollToBottom:(HMFuncCallback)callback {
    self.onScrollToBottomLisener = callback;
}

HM_EXPORT_METHOD(scrollTo, scrollToX:Y:)

- (void)scrollToX:(HMBaseValue *)xValue Y:(HMBaseValue *)yValue {
    CGFloat offsetX = HMPointWithString(xValue.toString);
    CGFloat offsetY = HMPointWithString(yValue.toString);
    CGFloat x = MIN(MAX(0, offsetX), self.contentSize.width - self.frame.size.width);
    CGFloat y = MIN(MAX(0, offsetY), self.contentSize.height - self.frame.size.height);
    CGPoint offset = CGPointMake(x, y);
    [self setContentOffset:offset animated:YES];
}

HM_EXPORT_METHOD(scrollBy, scrollByX:Y:)

- (void)scrollByX:(HMBaseValue *)xValue Y:(HMBaseValue *)yValue {
    CGFloat offsetX = HMPointWithString(xValue.toString);
    CGFloat offsetY = HMPointWithString(yValue.toString);
    
    CGPoint offset = self.contentOffset;
    offset = CGPointMake(offset.x + offsetX, offset.y + offsetY);
    CGFloat x = MIN(MAX(0, offset.x), self.contentSize.width - self.frame.size.width);
    CGFloat y = MIN(MAX(0, offset.y), self.contentSize.height - self.frame.size.height);
    [self setContentOffset:CGPointMake(x, y) animated:YES];
}

HM_EXPORT_METHOD(scrollToTop, scrollToTop)

- (void)scrollToTop {
    CGPoint point = CGPointZero ;
    if (self.scrollDirection == HMScrollDirectionVertical) {
        point = CGPointMake(0, -self.contentInset.top);
    }else {
        point = CGPointMake(-self.contentInset.left, 0);
    }
    [self setContentOffset:point animated:YES];
}

HM_EXPORT_METHOD(scrollToBottom, scrollToBottom)

- (void)scrollToBottom {
    CGPoint point = CGPointZero;
    if (self.scrollDirection == HMScrollDirectionVertical) {
        CGFloat offset = self.contentSize.height-CGRectGetHeight(self.frame) ;
        if (offset < 0) {
            return;
        }
        point = CGPointMake(0, offset);
    }else {
        CGFloat offset = self.contentSize.width - CGRectGetWidth(self.frame) ;
        if (offset < 0) {
            return;
        }
        point = CGPointMake(offset,0);
    }
    [self setContentOffset:point animated:YES];
}

#pragma mark - UIScrollViewDelegate

- (void)scrollViewWillBeginDragging:(__unused UIScrollView *)scrollView {
    HMExecOnMainQueue(^{
        HMScrollEvent *scrollEvent = [[HMScrollEvent alloc] init];
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventBegan),
                               kHMScrollDeltaX:@(0),
                               kHMScrollDeltaY:@(0),
                               kHMScrollOffsetX:@(0),
                               kHMScrollOffsetY:@(0)};
        [self hm_notifyEvent:HMScrollEventName withValue:scrollEvent withArgument:args];
    });
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    HMExecOnMainQueue(^{
        HMScrollEvent *scrollEvent = [[HMScrollEvent alloc] init];

        NSDictionary *args = @{kHMScrollState:@(HMScrollEventScroll),
                               kHMScrollDeltaX:@(deltaX),
                               kHMScrollDeltaY:@(deltaY),
                               kHMScrollOffsetX:@(contentOffset.x),
                               kHMScrollOffsetY:@(contentOffset.y)};
        [self hm_notifyEvent:HMScrollEventName withValue:scrollEvent withArgument:args];
    });
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    HMExecOnMainQueue(^{
        HMScrollEvent *scrollEvent = [[HMScrollEvent alloc] init];
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventEndedDragging),
                               kHMScrollDeltaX:@(deltaX),
                               kHMScrollDeltaY:@(deltaY),
                               kHMScrollOffsetX:@(contentOffset.x),
                               kHMScrollOffsetY:@(contentOffset.y)};
        [self hm_notifyEvent:HMScrollEventName withValue:scrollEvent withArgument:args];
        [self checkIFTopOrBottom];
    });
    if (!decelerate) {
        [self checkIFTopOrBottom];
    }
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    HMExecOnMainQueue(^{
        HMScrollEvent *scrollEvent = [[HMScrollEvent alloc] init];
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventEndedDecelerating),
                               kHMScrollDeltaX:@(deltaX),
                               kHMScrollDeltaY:@(deltaY),
                               kHMScrollOffsetX:@(contentOffset.x),
                               kHMScrollOffsetY:@(contentOffset.y)};
        [self hm_notifyEvent:HMScrollEventName withValue:scrollEvent withArgument:args];
        [self checkIFTopOrBottom];
    });
}

- (void)checkIFTopOrBottom {
    if (self.scrollDirection == HMScrollDirectionHorizontal && CGRectGetWidth(self.bounds) > self.contentSize.width) {
        return;
    }
    if (self.scrollDirection == HMScrollDirectionVertical && CGRectGetHeight(self.bounds) > self.contentSize.height) {
        return;
    }
    CGFloat mainOffset = self.scrollDirection == HMScrollDirectionHorizontal ? self.contentOffset.x : self.contentOffset.y;
    CGFloat mainInsetLeading = self.scrollDirection == HMScrollDirectionHorizontal ? self.contentInset.left : self.contentInset.top;
    CGFloat mainOffsetThreshold = self.scrollDirection == HMScrollDirectionHorizontal ? self.contentSize.width - CGRectGetWidth(self.bounds) : self.contentSize.height-CGRectGetHeight(self.bounds);
    
    __block BOOL isNotifying ;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        isNotifying = NO;
    });
    //滚动到顶部
    if (fabs(mainOffset) <= mainInsetLeading) {
        if (!isNotifying) {
            isNotifying = YES;
            HMExecOnMainQueue(^{
                HM_SafeRunBlock(self.onScrollToTopLisener,@[]);
                isNotifying = NO;
            });
        }
    }
    //滚动到底部了
    if (fabs(mainOffset)>=mainOffsetThreshold) {
        if (!isNotifying) {
            isNotifying = YES;
            HMExecOnMainQueue(^{
                HM_SafeRunBlock(self.onScrollToBottomLisener,@[]);
                isNotifying = NO;
            });
        }
    }
}

- (CGPoint)calculateOffsetForContentSize:(CGSize)newContentSize {
    CGPoint oldOffset = self.contentOffset;
    CGPoint newOffset = oldOffset;
    
    CGSize oldContentSize = self.contentSize;
    // TODO(唐佳诚): 考虑 UINavigationBar SafeArea 的调整
    CGSize viewportSize = self.bounds.size;
    
    // 在 Y 轴是否需要适配计算。
    BOOL fitsinViewportY = oldContentSize.height <= viewportSize.height && newContentSize.height <= viewportSize.height;
    // 新老的 contentsize 都没有超过当前 view 的高度，则不需要进行计算。
    if (newContentSize.height < oldContentSize.height && !fitsinViewportY) {
        // 当 newContentSize < oldContentSize 时需要计算 offset
        CGFloat offsetHeight = oldOffset.y + viewportSize.height;
        if (oldOffset.y < 0) {
            // overscrolled on top, leave offset alone
        } else if (offsetHeight > oldContentSize.height) {
            // overscrolled on the bottom, preserve overscroll amount
            newOffset.y = MAX(0, oldOffset.y - (oldContentSize.height - newContentSize.height));
        } else if (offsetHeight > newContentSize.height) {
            // offset falls outside of bounds, scroll back to end of list
            newOffset.y = MAX(0, newContentSize.height - viewportSize.height);
        }
    }
    
    BOOL fitsinViewportX = oldContentSize.width <= viewportSize.width && newContentSize.width <= viewportSize.width;
    if (newContentSize.width < oldContentSize.width && !fitsinViewportX) {
        CGFloat offsetHeight = oldOffset.x + viewportSize.width;
        if (oldOffset.x < 0) {
            // overscrolled at the beginning, leave offset alone
        } else if (offsetHeight > oldContentSize.width && newContentSize.width > viewportSize.width) {
            // overscrolled at the end, preserve overscroll amount as much as possible
            newOffset.x = MAX(0, oldOffset.x - (oldContentSize.width - newContentSize.width));
        } else if (offsetHeight > newContentSize.width) {
            // offset falls outside of bounds, scroll back to end
            newOffset.x = MAX(0, newContentSize.width - viewportSize.width);
        }
    }
    
    // all other cases, offset doesn't change
    return newOffset;
}

#pragma mark <override>

- (void)updateIfNeeded {
    CGSize contentSize = self.contentView.bounds.size;
    if (!CGSizeEqualToSize(self.contentSize, contentSize)) {
      // When contentSize is set manually, ScrollView internals will reset
      // contentOffset to  {0, 0}. Since we potentially set contentSize whenever
      // anything in the ScrollView updates, we workaround this issue by manually
      // adjusting contentOffset whenever this happens
      CGPoint newOffset = [self calculateOffsetForContentSize:contentSize];
      self.contentSize = contentSize;
      self.contentOffset = newOffset;
    }
}

- (void)setFrame:(CGRect)frame {
    // 由 hummerSetFrame -> self.bounds = bounds; 触发
    // Preserving and revalidating `contentOffset`.
    CGPoint originalOffset = self.contentOffset;
    
    [super setFrame:frame];
    
    UIEdgeInsets contentInset = self.contentInset;
    CGSize contentSize = self.contentSize;
    
    // If contentSize has not been measured yet we can't check bounds.
    if (CGSizeEqualToSize(contentSize, CGSizeZero)) {
        self.contentOffset = originalOffset;
    } else {
        if (@available(iOS 11.0, *)) {
            if (!UIEdgeInsetsEqualToEdgeInsets(UIEdgeInsetsZero, self.adjustedContentInset)) {
                contentInset = self.adjustedContentInset;
            }
        }
        CGSize boundsSize = self.bounds.size;
        CGFloat xMaxOffset = contentSize.width - boundsSize.width + contentInset.right;
        CGFloat yMaxOffset = contentSize.height - boundsSize.height + contentInset.bottom;
        // Make sure offset doesn't exceed bounds. This can happen on screen rotation.
        if ((originalOffset.x >= -contentInset.left) && (originalOffset.x <= xMaxOffset) &&
            (originalOffset.y >= -contentInset.top) && (originalOffset.y <= yMaxOffset)) {
            return;
        }
        self.contentOffset = CGPointMake(MAX(-contentInset.left, MIN(xMaxOffset, originalOffset.x)), MAX(-contentInset.top, MIN(yMaxOffset, originalOffset.y)));
    }
}

/*
- (void)hummerSetFrame:(CGRect)frame {
    CGRect currentFrame = CGRectMake(self.center.x - self.bounds.size.width / 2, self.center.y - self.bounds.size.height / 2, self.bounds.size.width, self.bounds.size.height);
    if (!CGRectEqualToRect(frame, currentFrame)) {
        // 备份 bounds.origin
        CGPoint oldBoundsOrigin = self.bounds.origin;
        // 必定会修改 bounds.origin
        [super hummerSetFrame:frame];
        // 还原 bounds.origin
        CGRect bounds = self.bounds;
        bounds.origin = oldBoundsOrigin;
        self.bounds = bounds;
    }
    self.contentOffset = [self calculateOffsetForContentSize:self.contentSize];
}
 */

@end

@interface HMVerticalScrollView : HMScrollView
@property (nonatomic, strong) HMRefreshHeaderView *refreshView;
@property (nonatomic, strong) HMLoadFooterView *loadView;

@property (nonatomic, copy) HMFuncCallback refreshCallback;
@property (nonatomic, copy) HMFuncCallback loadMoreCallback;
@end

@implementation HMVerticalScrollView

HM_EXPORT_CLASS(Scroller, HMVerticalScrollView)
// 结束下拉刷新
HM_EXPORT_METHOD(stopPullRefresh, endRefresh)
// 结束上拉加载更多
HM_EXPORT_METHOD(stopLoadMore, endLoad:)
// 下拉刷新展示的view
HM_EXPORT_PROPERTY(refreshView, __refreshView, __setRefreshView:)
// 下拉刷新触发的回调
HM_EXPORT_PROPERTY(onRefresh, refreshCallback, setRefreshCallback:)
// 上拉加载更多展示的view
HM_EXPORT_PROPERTY(loadMoreView, __loadMoreView, __setLoadMoreView:)
// 上拉加载更多触发的回调
HM_EXPORT_PROPERTY(onLoadMore, loadMoreCallback, setLoadMoreCallback:)

- (instancetype)initWithHMValues:(NSArray *)values {
    if (self = [super initWithHMValues:values]) {
        self.scrollDirection = HMScrollDirectionVertical;
        self.alwaysBounceVertical = YES;
        [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
        }];
    }
    return self;
}


#pragma mark - Export Property (Refresh | LoadMore)
- (void)endRefresh {
    [self.refreshView endRefresh];
    [self.loadView reset];
}

- (void)endLoad:(HMBaseValue *)nextLoadEnabled {
    BOOL enabled = nextLoadEnabled.toBool;
    [self.loadView endLoad:enabled];
}


- (HMBaseValue *)__refreshView {
    UIView *refreshView = self.refreshView.contentView.subviews.firstObject;
    return refreshView.hmValue;
}

- (void)__setRefreshView:(HMBaseValue *)value {
    
    UIView *subView = value.hm_toObjCObject;
    BOOL isValueKindOfView = [subView isKindOfClass:[UIView class]];
    NSAssert(isValueKindOfView, @"JSValue can't be turned to view");
    if (!isValueKindOfView) {
        return;
    }
    
    // 1. 移除之前的贴在 refreshView 上的 view
    UIView *preSubView = self.refreshView.contentView.subviews.firstObject;
    if (preSubView) { [preSubView removeFromSuperview]; }
    
    // 2. 保证 refreshView 示例不为空
    if (!self.refreshView) {
        __weak typeof(self) weakSelf = self;
        self.refreshView = [[HMRefreshHeaderView alloc] initWithScrollView:self
                                                                  callback:^(HMRefreshType state) {
            if (weakSelf.refreshCallback) {
                weakSelf.refreshCallback(@[@(state)]);
            }
        }];
        [self insertSubview:self.refreshView atIndex:0];
    }
    
    // 3. 将通过 JS 创建的 view 贴在 refreshView 上
    [self.refreshView.contentView addSubview:subView];
    
    // 4. 根据 JS 创建的 View 的大小更新 refreshView 的大小
    CGSize size = [subView hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
    [subView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
    //    self.refreshView.insets =self.sectionInsets;
    [self.refreshView setFreshHeight:ceil(size.height)];
}

- (HMBaseValue *)__loadMoreView {
    UIView *loadMoreView = self.loadView.contentView.subviews.firstObject;
    return loadMoreView.hmValue;
}

- (void)__setLoadMoreView:(HMBaseValue *)value {
    
    UIView *subView = value.hm_toObjCObject;
    BOOL isValueKindOfView = [subView isKindOfClass:[UIView class]];
    NSAssert(isValueKindOfView, @"JSValue can't be turned to view");
    if (!isValueKindOfView) {
        return;
    }
    
    // 1. 移除之前的贴在 loadView 上的 view
    UIView *preSubView = self.loadView.contentView.subviews.firstObject;
    if (preSubView) { [preSubView removeFromSuperview]; }
    
    // 2. 保证 refreshView 示例不为空
    if (!self.loadView) {
        __weak typeof(self) weakSelf = self;
        self.loadView = [[HMLoadFooterView alloc] initWithScrollView:self
                                                            callback:^(HMLoadType state) {
            if (weakSelf.loadMoreCallback) {
                weakSelf.loadMoreCallback(@[@(state)]);
            }
        }];
        [self insertSubview:self.loadView atIndex:0];
    }
    
    // 3. 将通过 JS 创建的 view 贴在 refreshView 上
    [self.loadView.contentView addSubview:subView];
    
    // 4. 根据 JS 创建的 View 的大小更新 refreshView 的大小
    CGSize size = [subView hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
    [subView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
    //    self.loadView.insets = self.sectionInsets;
    [self.loadView setLoadHeight:ceil(size.height)];
}

- (BOOL)hummerBounces {
    return self.alwaysBounceVertical;
}

- (void)setHummerBounces:(BOOL)hummerBounces {
    self.alwaysBounceVertical = hummerBounces;
}

@end

@interface HMHorizontalScrollView : HMScrollView
@end

@implementation HMHorizontalScrollView

HM_EXPORT_CLASS(HorizontalScroller, HMHorizontalScrollView)

- (instancetype)initWithHMValues:(NSArray *)values {
    if (self = [super initWithHMValues:values]) {
        self.scrollDirection = HMScrollDirectionHorizontal;
        self.alwaysBounceHorizontal = YES;
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionRow);
        }];
        [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionRow);
        }];
    }
    return self;
}

- (BOOL)hummerBounces {
    return self.alwaysBounceHorizontal;
}

- (void)setHummerBounces:(BOOL)hummerBounces {
    self.alwaysBounceHorizontal = hummerBounces;
}

@end

@implementation HMScrollContentView

- (void)hummerSetFrame:(CGRect)frame {
    [super hummerSetFrame:frame];
    HMScrollView *scrollView = (HMScrollView *) self.superview;

    if (!scrollView) {
      return;
    }

    NSAssert([scrollView isKindOfClass:HMScrollView.class], @"Unexpected view hierarchy of HMScrollView component.");

    [scrollView updateIfNeeded];
}

@end
