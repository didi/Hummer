//
//  HMRecycleListView.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListView.h"
#import "HMJSContext.h"
#import "HMAttrManager.h"
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "UIView+HMDom.h"
#import "HMConverter.h"
#import "HMRecycleListView+CallJS.h"
#import "UIView+HMEvent.h"
#import "HMRefreshBaseView.h"
#import "HMRecycleListViewListLayout.h"
#import "HMRecycleListViewWaterfallLayout.h"
#import "HMRecycleListViewGridLayout.h"
#import "HMScrollEvent.h"
#import "HMExportClass.h"
#import "HMUtility.h"
#import "HMListLayoutAttributes.h"
#import "HMWaterfallLayoutAttributes.h"
#import "UIView+HMRenderObject.h"

#import <Hummer/UIView+HMInspector.h>

static NSString * const HMRecycleListViewListCellDefaultIdentifier = @"-1";

typedef NS_ENUM(NSUInteger, HMScrollDirection) {
    HMScrollDirectionVertical = 0,
    HMScrollDirectionHorizontal,
};

NS_ASSUME_NONNULL_BEGIN

@interface HMRecycleListInnerCell : UICollectionViewCell<HMViewInspectorDescription>

@property (nonatomic, nullable, strong) HMBaseValue *contentViewValue;

@property (nonatomic, copy) NSIndexPath *indexPath;

- (void)commonInit;

@end

NS_ASSUME_NONNULL_END

@implementation HMRecycleListInnerCell

- (void)commonInit {
    self.clipsToBounds = YES;
    self.isHmLayoutEnabled = NO;
    [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
        layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
        layout.justifyContent= YOGA_TYPE_WRAPPER(YGJustifyCenter);
        layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignStretch);
    }];
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    [self commonInit];
    
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super initWithCoder:coder];
    if (self) {
        [self commonInit];
    }
    
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    NSHashTable<id<HMLayoutStyleProtocol>> *affectedShadowViews = NSHashTable.weakObjectsHashTable;
    [self.contentView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:affectedShadowViews];
    if (affectedShadowViews.count > 0) {
        NSEnumerator<id<HMLayoutStyleProtocol>> *enumerator = affectedShadowViews.objectEnumerator;
        id<HMLayoutStyleProtocol> value = nil;
        while ((value = enumerator.nextObject)) {
            [value.view hm_layoutBackgroundColorImageBorderShadowCornerRadius];
        }
    }
}

- (UICollectionViewLayoutAttributes *)preferredLayoutAttributesFittingAttributes:(UICollectionViewLayoutAttributes *)layoutAttributes {
    // 本方法将会
    // 在 'collectionView:cellForItemAtIndexPath:' 之后，
    // 在 cell 展示之前被调用，可以修正 cell 的大小
    UICollectionViewLayoutAttributes *attributes = [super preferredLayoutAttributesFittingAttributes:layoutAttributes];
    CGSize containerSize = attributes.size;
    
    UIView *jsContentView = self.contentView.subviews.lastObject;
    CGSize jsContentViewSize =[jsContentView hm_sizeThatFits:CGSizeMake(containerSize.width, CGFLOAT_MAX)];
//    jsContentViewSize.height = ceilf(((int)(jsContentViewSize.height*10))/10.0);
//    jsContentViewSize.width = ceilf(((int)(jsContentViewSize.width*10))/10.0);
    
    if ([attributes isKindOfClass:[HMListLayoutAttributes class]]) {
        HMListLayoutAttributes *listAttributes = (HMListLayoutAttributes *)attributes;
        if (listAttributes.scrollDirection == UICollectionViewScrollDirectionVertical) {
            containerSize.height = jsContentViewSize.height;
        } else {
            containerSize.width = jsContentViewSize.width;
        }
    } else if ([attributes isKindOfClass:[HMWaterfallLayoutAttributes class]]) {
        containerSize.height = jsContentViewSize.height;
    }

    attributes.size = containerSize;

    return attributes;
}

#pragma mark <HMViewInspectorDescription>

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


- (NSString *)hm_displayAlias {
    return [NSString stringWithFormat:@"%ld",self.indexPath.row];
}


@end

@interface HMRecycleListView () <UICollectionViewDataSource,
                                 UICollectionViewDelegateFlowLayout,
                                 HMViewInspectorDescription>

@property (nonatomic, copy) NSString *mode;
@property (nonatomic, assign) UICollectionViewScrollDirection direction;
@property (nonatomic, assign) NSUInteger column;
@property (nonatomic, assign) NSInteger cellCount;
@property (nonatomic, assign) CGFloat lineSpacing;
@property (nonatomic, assign) CGFloat itemSpacing;
@property (nonatomic, assign) UIEdgeInsets sectionInsets;
@property (nonatomic, strong) NSMutableSet <NSString *> *reuseIdentifiers;
@property (nonatomic, strong) HMRefreshHeaderView *refreshView;
@property (nonatomic, strong) HMLoadFooterView *loadView;
@property (nonatomic, assign) CGPoint lastContentOffset;

@property (nonatomic, copy) HMFuncCallback refreshCallback;
@property (nonatomic, copy) HMFuncCallback loadMoreCallback;

NS_ASSUME_NONNULL_BEGIN

@property (nonatomic, assign) BOOL showScrollBar;

@property (nonatomic, assign) BOOL hummerBounces;

- (void)commonInit;

NS_ASSUME_NONNULL_END

@end

@implementation HMRecycleListView

HM_EXPORT_PROPERTY(showScrollBar, showScrollBar, setShowScrollBar:)

- (BOOL)showScrollBar {
    return self.showsHorizontalScrollIndicator || self.showsHorizontalScrollIndicator;
}

- (void)setShowScrollBar:(BOOL)showScrollBar {
    self.showsVerticalScrollIndicator = showScrollBar;
    self.showsHorizontalScrollIndicator = showScrollBar;
}

HM_EXPORT_PROPERTY(bounces, bounces, setBounces:)

// 列表
HM_EXPORT_CLASS(List, HMRecycleListView)

// 设置模式
HM_EXPORT_ATTRIBUTE(mode, mode, HMStringOrigin:)
// 设置方向
HM_EXPORT_ATTRIBUTE(scrollDirection, direction, HMStringToDirection:)
// 设置列数
HM_EXPORT_ATTRIBUTE(column, column, HMNumberToNSInteger:)
// 行间距
HM_EXPORT_ATTRIBUTE(lineSpacing, lineSpacing, HMStringToFloat:)
// 列间距
HM_EXPORT_ATTRIBUTE(itemSpacing, itemSpacing, HMStringToFloat:)
// 列表最左边缘间距
HM_EXPORT_ATTRIBUTE(leftSpacing, leftSpacing, HMStringToFloat:)
// 列表右边缘间距
HM_EXPORT_ATTRIBUTE(rightSpacing, rightSpacing, HMStringToFloat:)
// 列表最顶部边缘间距
HM_EXPORT_ATTRIBUTE(topSpacing, topSpacing, HMStringToFloat:)
// 列表最底部边缘间距
HM_EXPORT_ATTRIBUTE(bottomSpacing, bottomSpacing, HMStringToFloat:)

// 刷新列表
HM_EXPORT_METHOD(refresh, refresh:)
// 滚动到指定Index
HM_EXPORT_METHOD(scrollToPosition, scrollToIndex:)
// 滚动到指定的位置
HM_EXPORT_METHOD(scrollTo, scrollToX:Y:)
// 滚动指定的距离
HM_EXPORT_METHOD(scrollBy, scrollByX:Y:)
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


HMBaseValue *(^__executeBlock)(HMFuncCallback, NSArray *) = ^(HMFuncCallback callback,
                                                          NSArray *params) {
    HMBaseValue *result;
    if (callback) { result = callback(params.copy); }
    return result;
};

- (void)layoutSubviews {
    [super layoutSubviews];
    [self hm_layoutBackgroundColorImageBorderShadowCornerRadius];
}

- (void)commonInit {
    self.backgroundColor = [UIColor whiteColor];
    
    self.dataSource = self;
    self.delegate = self;
    
    self.showsHorizontalScrollIndicator = NO;
    self.showsVerticalScrollIndicator = NO;
        
    _reuseIdentifiers = NSMutableSet.set;
    [_reuseIdentifiers addObject:HMRecycleListViewListCellDefaultIdentifier];
    [self registerClass:HMRecycleListInnerCell.class forCellWithReuseIdentifier:HMRecycleListViewListCellDefaultIdentifier];
    if (@available(iOS 11.0, *)) {
        self.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    }
    [self addObserver:self forKeyPath:@"contentSize" options:NSKeyValueObservingOptionNew|NSKeyValueObservingOptionOld context:nil];
    _column = 2;
    _mode = @"list";
    _lastContentOffset = CGPointZero;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
    if ([keyPath isEqualToString:@"contentSize"]) {
        CGSize old = [[change objectForKey:NSKeyValueChangeOldKey] CGSizeValue];
        CGSize new = [[change objectForKey:NSKeyValueChangeNewKey] CGSizeValue];
        if (CGSizeEqualToSize(old, new) == false) {
            [self hm_markDirty];
        }
    }
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super initWithCoder:coder];
    if (self) {
        [self commonInit];
    }
    
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame collectionViewLayout:(UICollectionViewLayout *)layout {
    self = [self initWithFrame:frame];
    // 应该是没有动画的
    self.collectionViewLayout = layout;
    
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame collectionViewLayout:[[HMRecycleListViewListLayout alloc] init]];
    [self commonInit];
    
    return self;
}

- (void)dealloc {
    [self.refreshView removeObserver];
    [self.loadView removeObserver];
    [self removeObserver:self forKeyPath:@"contentSize"];
}

- (void)updateLayout {
    NSString *mode = self.mode;
    NSDictionary *map = @{@"list": HMRecycleListViewListLayout.class,
                          @"grid": HMRecycleListViewGridLayout.class,
                          @"waterfall": HMRecycleListViewWaterfallLayout.class};
    
    Class layoutClass = map[mode] ?: HMRecycleListViewListLayout.class;
    UICollectionViewLayout *layout = [[layoutClass alloc] init];
    self.collectionViewLayout = layout;
    
    [self updateDirection];
    [self updateColumn];
    [self updateLineSpacing];
    [self updateItemSpacing];
    [self updateSectionInset];
}

- (CGSize)sizeThatFits:(CGSize)size {
    return self.contentSize;
}

- (void)updateDirection {
    BOOL isListMode = [self.mode isEqualToString:@"list"];
    if (!isListMode) {
        return;
    }
    
    UICollectionViewScrollDirection direction = self.direction;
    // 水平滚动允许翻页
//    self.pagingEnabled = (direction == UICollectionViewScrollDirectionHorizontal);
    
    // 更新 layout
    if ([self.collectionViewLayout respondsToSelector:@selector(setScrollDirection:)] ) {
        [self.collectionViewLayout setValue:@(self.direction) forKey:@"scrollDirection"];
    }
    
    // 在水平滚动的情况下，去除 refreshView 和 loadMoreView
    if (direction == UICollectionViewScrollDirectionHorizontal) {
        UIView *refreshView = self.refreshView.subviews.firstObject;
        if (refreshView) { [refreshView removeFromSuperview]; }
        
        UIView *loadMoreView = self.loadView.subviews.firstObject;
        if (loadMoreView) { [loadMoreView removeFromSuperview]; }
    }
}

- (void)updateColumn {
    if (![self.collectionViewLayout respondsToSelector:@selector(setNumberOfColumns:)]) {
        return;
    }
    [self.collectionViewLayout setValue:@(self.column) forKey:@"numberOfColumns"];
}

- (void)updateLineSpacing {
    if (![self.collectionViewLayout respondsToSelector:@selector(setMinimumLineSpacing:)]) {
        return;
    }
    [self.collectionViewLayout setValue:@(self.lineSpacing) forKey:@"minimumLineSpacing"];
}

- (void)updateItemSpacing {
    if (![self.collectionViewLayout respondsToSelector:@selector(setMinimumInteritemSpacing:)]) {
        return;
    }
    [self.collectionViewLayout setValue:@(self.itemSpacing) forKey:@"minimumInteritemSpacing"];
}

- (void)updateSectionInset {
    if (![self.collectionViewLayout respondsToSelector:@selector(setSectionInset:)]) {
        return;
    }
    [self.collectionViewLayout setValue:[NSValue valueWithUIEdgeInsets:self.sectionInsets] forKey:@"sectionInset"];
    [self.collectionViewLayout invalidateLayout];
    self.refreshView.insets = self.sectionInsets;
    self.loadView.insets = self.loadView.insets;
}

#pragma mark - Export Property (Refresh | LoadMore)

- (HMBaseValue *)__refreshView {
    UIView *refreshView = self.refreshView.contentView.subviews.firstObject;
    return refreshView.hmValue;
}

- (void)__setRefreshView:(HMBaseValue *)value {
    BOOL isVertical = HMScrollDirectionVertical == self.direction;
    NSAssert(isVertical, @"Can't set refresh view when direction is not vertical");
    if (!isVertical) { return; }
    
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
    self.refreshView.insets =self.sectionInsets;
    [self.refreshView setFreshHeight:ceil(size.height)];
}

- (HMBaseValue *)__loadMoreView {
    UIView *loadMoreView = self.loadView.contentView.subviews.firstObject;
    return loadMoreView.hmValue;
}

- (void)__setLoadMoreView:(HMBaseValue *)value {
    BOOL isVertical = HMScrollDirectionVertical == self.direction;
    NSAssert(isVertical, @"Can't set load view when direction is not vertical");
    if (!isVertical) { return; }
    
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
    self.loadView.insets = self.sectionInsets;
    [self.loadView setLoadHeight:ceil(size.height)];
}

#pragma mark - Export Attribute

- (void)setMode:(NSString *)mode {
    NSString *lastMode = _mode;
    _mode = mode;
    
    if (![_mode isEqualToString:lastMode]) {
        [self updateLayout];
    }
}

- (void)setDirection:(UICollectionViewScrollDirection)direction {
    _direction = direction;
    
    [self updateDirection];
}

- (void)setColumn:(NSUInteger)column {
    _column = column;
    
    [self updateColumn];
}

- (void)setLineSpacing:(CGFloat)lineSpacing {
    _lineSpacing = lineSpacing;
    
    [self updateLineSpacing];
}

- (void)setItemSpacing:(CGFloat)itemSpacing {
    _itemSpacing = itemSpacing;
    
    [self updateItemSpacing];
}

- (void)setLeftSpacing:(CGFloat)leftSpacing {
    UIEdgeInsets insets =  self.sectionInsets;
    insets.left = leftSpacing;
    self.sectionInsets = insets;
    [self updateSectionInset];
}

- (void)setRightSpacing:(CGFloat)rightSpacing {
    UIEdgeInsets insets =  self.sectionInsets;
    insets.right = rightSpacing;
    self.sectionInsets = insets;
    [self updateSectionInset];
}

- (void)setTopSpacing:(CGFloat)topSpacing {
    UIEdgeInsets insets =  self.sectionInsets;
    insets.top = topSpacing;
    self.sectionInsets = insets;
    [self updateSectionInset];
}

- (void)setBottomSpacing:(CGFloat)bottomSpacing {
    UIEdgeInsets insets =  self.sectionInsets;
    insets.bottom = bottomSpacing;
    self.sectionInsets = insets;
    [self updateSectionInset];
}

#pragma mark - Exported Method

- (void)endRefresh {
    [self.refreshView endRefresh];
    
    [self.loadView reset];
}

- (void)endLoad:(HMBaseValue *)nextLoadEnabled {
    BOOL enabled = nextLoadEnabled.toBool;
    [self.loadView endLoad:enabled];
}

- (void)refresh:(HMBaseValue *)countValue {
    NSInteger count = countValue.toNumber.integerValue;
    self.cellCount = count;
    
    //fix: 偶现白屏
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.collectionViewLayout invalidateLayout];
        [self reloadData];
    });
}

- (void)scrollToIndex:(HMBaseValue *)value {
    NSInteger row = value.toNumber.integerValue;
    
    BOOL isRowValid = row < self.cellCount;
    NSAssert(isRowValid, @"invalid row");
    if (!isRowValid) {
        return;
    }
    
    NSIndexPath *indexPath = [NSIndexPath indexPathForRow:row inSection:0];
    //根据UICollectionViewScrollDirection设置不同的UICollectionViewScrollPosition
    if(_direction == UICollectionViewScrollDirectionHorizontal){
        [self scrollToItemAtIndexPath:indexPath
                     atScrollPosition:UICollectionViewScrollPositionLeft
                             animated:YES];
    }else{
        [self scrollToItemAtIndexPath:indexPath
                     atScrollPosition:UICollectionViewScrollPositionTop
                             animated:YES];
    }
}

- (void)scrollToX:(HMBaseValue *)xValue Y:(HMBaseValue *)yValue {
    CGFloat offsetX = HMPointWithString(xValue.toString);
    CGFloat offsetY = HMPointWithString(yValue.toString);
    
    CGPoint offset = CGPointMake(offsetX, offsetY);
    [self setContentOffset:offset animated:YES];
}

- (void)scrollByX:(HMBaseValue *)xValue Y:(HMBaseValue *)yValue {
    CGFloat offsetX = HMPointWithString(xValue.toString);
    CGFloat offsetY = HMPointWithString(yValue.toString);
    
    CGPoint offset = self.contentOffset;
    offset = CGPointMake(offset.x + offsetX, offset.y + offsetY);
    [self setContentOffset:offset animated:YES];
}

#pragma mark - UICollectionViewDelegateFlowLayout

- (CGSize)collectionView:(UICollectionView *)collectionView
                  layout:(__unused UICollectionViewLayout *)collectionViewLayout
  sizeForItemAtIndexPath:(__unused NSIndexPath *)indexPath {
    // 本方法用于修复 collectionView 在 iOS 12.2 下 reloadData 向上滑动会 crash 的 bug
    // 需要保证本方法返回的 size 比 cell 真实展示的 size 要大
    UICollectionViewFlowLayout *layout = (UICollectionViewFlowLayout *)self.collectionViewLayout;
    if ([layout isKindOfClass:[HMRecycleListViewGridLayout class]]) {
        return layout.itemSize;
    }
    
    if (layout.scrollDirection == HMScrollDirectionVertical) {
        CGFloat width = collectionView.bounds.size.width
                        - self.sectionInsets.left
                        - self.sectionInsets.right;
        CGFloat height = collectionView.bounds.size.height;
        return CGSizeMake(width, height);
    }
    
    CGFloat width = collectionView.bounds.size.width;
    CGFloat height = collectionView.bounds.size.height
                     - self.sectionInsets.top
                     - self.sectionInsets.bottom;
    return CGSizeMake(width, height);
}

#pragma mark - UIScrollViewDelegate

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
}

#pragma mark - UICollectionViewDataSource

- (NSInteger)numberOfSectionsInCollectionView:(__unused UICollectionView *)collectionView {
    return 1;
}

- (NSInteger)collectionView:(__unused UICollectionView *)collectionView
     numberOfItemsInSection:(__unused NSInteger)section {
    return self.cellCount;
}

- (__kindof UICollectionViewCell *)collectionView:(UICollectionView *)collectionView
                           cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    NSInteger row = indexPath.row;
    NSString *identifier = HMRecycleListViewListCellDefaultIdentifier;
    
    // 1. 获取 cell 的重用标识
    if (self.cellTypeCallback) {
        HMBaseValue *value = __executeBlock(self.cellTypeCallback, @[@(row)]);
        NSNumber *identifierNumber = value.hm_toObjCObject;
        
        BOOL isValueNumber = [identifierNumber isKindOfClass:[NSNumber class]];
        NSAssert(isValueNumber, @"value is not a number");
        
        if (isValueNumber) {
            NSString *cellIdentifier = [NSString stringWithFormat:@"%ld", (long)[identifierNumber integerValue]];
            if (![self.reuseIdentifiers containsObject:cellIdentifier]) {
                [collectionView registerClass:[HMRecycleListInnerCell class]
                   forCellWithReuseIdentifier:cellIdentifier];
                [self.reuseIdentifiers addObject:cellIdentifier];
            }
            
            identifier = cellIdentifier;
        }
    }
    
    // 2. 获取在客户端环境创建的重用 cell
    HMRecycleListInnerCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:identifier
                                                                               forIndexPath:indexPath];
    cell.indexPath = indexPath;
    // 3. 获取在 JS 环境中创建的实际展示的 view 对应的 jsValue
    HMBaseValue *cellJSValue = cell.contentView.subviews.lastObject.hmValue;
    
    // 4. 如果 value 为空，则在 JS 环境中进行创建
    if (!cellJSValue) {
        NSAssert(identifier, @"empty identifier");
        identifier = identifier ?: @"";
        NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
        formatter.numberStyle = NSNumberFormatterDecimalStyle;
        NSNumber *identifierNumber = [formatter numberFromString:identifier];
        identifierNumber = identifierNumber ?: @(-1);
        
        cellJSValue = __executeBlock(self.didViewCreated, @[identifierNumber]);
        
        UIView *jsContentView = cellJSValue.hm_toObjCObject;
        BOOL isValueKindOfView = [jsContentView isKindOfClass:[UIView class]];
        NSAssert(isValueKindOfView, @"JSValue can't be turned to view");
        
        if (isValueKindOfView) {
            if (cell.contentViewValue) {
                id contentViewObject = cell.contentViewValue.toNativeObject;
                if ([contentViewObject isKindOfClass:UIView.class]) {
                    [((UIView *) contentViewObject) removeFromSuperview];
                }
            }
            cell.contentViewValue = cellJSValue;
            [cell.contentView addSubview:jsContentView];
        }
    }
    
    // 5. 在 JS 环境中对实际展示的 view 进行更新
    if (cellJSValue) {
        __executeBlock(self.didUpdate, @[@(indexPath.row), cellJSValue]);
    }
    [cell setNeedsLayout];
    
    return cell;
}

#pragma mark - <HMViewInspectorDescription>

// 屏蔽 header/footer 原生视图
- (NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    NSMutableArray *res = [NSMutableArray new];
    if (self.refreshView.contentViewValue) {
        [res addObject:self.refreshView];
    }

    NSArray <HMRecycleListInnerCell *>*children = self.visibleCells;
    children = [children sortedArrayUsingComparator:^NSComparisonResult(HMRecycleListInnerCell  *obj1, HMRecycleListInnerCell  *obj2) {
     
        if (obj1.indexPath.row < obj2.indexPath.row) {
            return NSOrderedAscending;
        }else if (obj1.indexPath.row > obj2.indexPath.row) {
            return NSOrderedDescending;
        }
        return NSOrderedSame;
    }];
    if (children) {
        [res addObjectsFromArray:children];
    }
    if (self.loadView.contentViewValue) {
        [res addObject:self.loadView];
    }
    return res.copy;
}


@end
