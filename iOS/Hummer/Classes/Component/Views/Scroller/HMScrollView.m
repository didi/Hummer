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
#import <Hummer/HMDescription.h>
#import <Hummer/UIView+HMDescription.h>

@interface HMScrollView ()<UIScrollViewDelegate>
@property(nonatomic,copy) HMFuncCallback onScrollToTopLisener;
@property(nonatomic,copy) HMFuncCallback onScrollToBottomLisener;
@property(nonatomic,assign) CGPoint lastContentOffset;

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, assign) BOOL showScrollBar;

@property (nonatomic, assign) BOOL hummerBounces;

- (void)commonInit;

- (CGSize)getNewContentSize;

- (CGPoint)calculateOffsetForContentSize:(CGSize)newContentSize;

NS_ASSUME_NONNULL_END

@end

@implementation HMScrollView

HM_EXPORT_CLASS(HMScrollView, HMScrollView)

HM_EXPORT_PROPERTY(showScrollBar, showScrollBar, setShowScrollBar:)

- (BOOL)showScrollBar {
    return self.showsVerticalScrollIndicator || self.showsHorizontalScrollIndicator;
}

- (void)setShowScrollBar:(BOOL)showScrollBar {
    self.showsVerticalScrollIndicator = showScrollBar;
    self.showsHorizontalScrollIndicator = showScrollBar;
}

HM_EXPORT_PROPERTY(bounces, bounces, setBounces:)

#pragma mark - Init

- (void)layoutSubviews {
    [super layoutSubviews];
    [self hm_layoutBackgroundColorImageBorderShadowCornerRadius];
}

- (void)commonInit {
    _lastContentOffset = CGPointZero;
    self.showsVerticalScrollIndicator = NO;
    self.showsHorizontalScrollIndicator = NO;
    if (@available(iOS 11.0, *)) {
        self.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    } else {
        // Fallback on earlier versions
    }
    self.delegate = self;
    self.bounces = YES;
    self.keyboardDismissMode = UIScrollViewKeyboardDismissModeOnDrag;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super initWithCoder:coder];
    if (self) {
        [self commonInit];
    }
    
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    [self commonInit];
    
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

// 分两种情况
// beginDragging -> didScroll -> willEndDragging(决定减速停到哪个位置) -> didEndDragging(参数为 0 表示立刻停止)
// beginDragging -> didScroll -> willEndDragging -> didEndDragging(参数 为 1 表示手指离开屏幕后继续滚动，但是发生减速) -> beginDecelerating -> didScroll -> didEndDecelerating

- (void)scrollViewWillBeginDragging:(__unused UIScrollView *)scrollView {
    self.lastContentOffset = scrollView.contentOffset;
    [self hm_notifyWithEventName:HMScrollEventName argument:@{
        kHMScrollState: @(HMScrollEventBegan),
        kHMScrollDeltaX: @(0),
        kHMScrollDeltaY: @(0),
        // TODO(ChasonTang): 这里的逻辑是错误的，应该是返回当前的 contentOffset
        kHMScrollOffsetX: @(0),
        kHMScrollOffsetY: @(0)
    }];
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    [self hm_notifyWithEventName:HMScrollEventName argument:@{
        kHMScrollState: @(HMScrollEventScroll),
        kHMScrollDeltaX: @(deltaX),
        kHMScrollDeltaY: @(deltaY),
        kHMScrollOffsetX: @(contentOffset.x),
        kHMScrollOffsetY: @(contentOffset.y)
    }];
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    if (!decelerate) {
        // 结束
        [self hm_notifyWithEventName:HMScrollEventName argument:@{
            kHMScrollState: @(HMScrollEventEndedDecelerating),
            kHMScrollDeltaX: @(deltaX),
            kHMScrollDeltaY: @(deltaY),
            kHMScrollOffsetX: @(contentOffset.x),
            kHMScrollOffsetY: @(contentOffset.y)
        }];
        [self checkIFTopOrBottom];
    } else {
        // 手指抬起继续滚动
        [self hm_notifyWithEventName:HMScrollEventName argument:@{
            kHMScrollState: @(HMScrollEventEndedDragging),
            kHMScrollDeltaX: @(deltaX),
            kHMScrollDeltaY: @(deltaY),
            kHMScrollOffsetX: @(contentOffset.x),
            kHMScrollOffsetY: @(contentOffset.y)
        }];
    }
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    [self hm_notifyWithEventName:HMScrollEventName argument:@{
        kHMScrollState: @(HMScrollEventEndedDecelerating),
        kHMScrollDeltaX: @(deltaX),
        kHMScrollDeltaY: @(deltaY),
        kHMScrollOffsetX: @(contentOffset.x),
        kHMScrollOffsetY: @(contentOffset.y)
    }];
    [self checkIFTopOrBottom];
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

#pragma mark <private>

- (CGSize)getNewContentSize {
    CGSize newContentSize = CGSizeZero;
    if (self.scrollDirection == HMScrollDirectionHorizontal) {
        YOGA_TYPE_WRAPPER(YGValue) minWidth = self.hm_renderObject.minWidth;
        YOGA_TYPE_WRAPPER(YGValue) width = self.hm_renderObject.width;
        YOGA_TYPE_WRAPPER(YGValue) maxWidth = self.hm_renderObject.maxWidth;
        
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.minWidth = YOGA_TYPE_WRAPPER(YGValueUndefined);
            layout.width = YOGA_TYPE_WRAPPER(YGValueAuto);
            layout.maxWidth = YOGA_TYPE_WRAPPER(YGValueUndefined);
        }];
        newContentSize = [self hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, self.bounds.size.height)];
        newContentSize.height = MAX(self.bounds.size.height, newContentSize.height);
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.minWidth = minWidth;
            layout.width = width;
            layout.maxWidth = maxWidth;
        }];
    } else {
        YOGA_TYPE_WRAPPER(YGValue) minHeight = self.hm_renderObject.minHeight;
        YOGA_TYPE_WRAPPER(YGValue) height = self.hm_renderObject.height;
        YOGA_TYPE_WRAPPER(YGValue) maxHeight = self.hm_renderObject.maxHeight;
        
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.minHeight = YOGA_TYPE_WRAPPER(YGValueUndefined);
            layout.height = YOGA_TYPE_WRAPPER(YGValueAuto);
            layout.maxHeight = YOGA_TYPE_WRAPPER(YGValueUndefined);
        }];
        newContentSize = [self hm_sizeThatFits:CGSizeMake(self.bounds.size.width, CGFLOAT_MAX)];
        newContentSize.width = MAX(self.bounds.size.width, newContentSize.width);
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.minHeight = minHeight;
            layout.height = height;
            layout.maxHeight = maxHeight;
        }];
    }
    return newContentSize;
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
    CGSize newContentSize = [self getNewContentSize];
    if (!CGSizeEqualToSize(newContentSize, self.contentSize)) {
        // When contentSize is set manually, ScrollView internals will reset
        // contentOffset to  {0, 0}. Since we potentially set contentSize whenever
        // anything in the ScrollView updates, we workaround this issue by manually
        // adjusting contentOffset whenever this happens
        CGPoint newOffset = [self calculateOffsetForContentSize:newContentSize];
        self.contentSize = newContentSize;
        self.contentOffset = newOffset;
    }
}

#pragma mark - <HMDescription>


@end

@interface HMVerticalScrollView()<HMViewInspectorDescription>
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
    self.refreshView.contentViewValue = value;
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
    self.loadView.contentViewValue = value;
    // 4. 根据 JS 创建的 View 的大小更新 refreshView 的大小
    CGSize size = [subView hm_sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
    [subView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
    //    self.loadView.insets = self.sectionInsets;
    [self.loadView setLoadHeight:ceil(size.height)];
}


#pragma mark - <HMViewInspectorDescription>
// 屏蔽 header/footer 原生视图
- (NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    NSMutableArray *res = [NSMutableArray new];
    if (self.refreshView.contentViewValue) {
        [res addObject:self.refreshView];
    }
    NSArray *children = [self hm_jsChildren];
    if (children) {
        [res addObjectsFromArray:children];
    }
    if (self.loadView.contentViewValue) {
        [res addObject:self.loadView];
    }
    return res.copy;
}

@end

@interface HMHorizontalScrollView ()
@end

@implementation HMHorizontalScrollView

HM_EXPORT_CLASS(HorizontalScroller, HMHorizontalScrollView)

- (instancetype)initWithHMValues:(NSArray *)values {
    if (self = [super initWithHMValues:values]) {
        self.scrollDirection = HMScrollDirectionHorizontal;
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionRow);
        }];
    }
    return self;
}

@end
