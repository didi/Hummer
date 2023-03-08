//
//  HMViewPager.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMViewPager.h"
// MARK: -
#import <Hummer/HMBaseExecutorProtocol.h>
// MARK: -
#import "HMExportManager.h"
#import "UIView+HMDom.h"
#import "NSObject+Hummer.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
// MARK: -
#import "HMViewPagerCell.h"
#import "HMViewPagerLayout.h"
#import "HMViewPagerLayoutCardAnimator.h"

#import <Hummer/UIView+HMInspector.h>

@interface HMViewPagerItem : NSObject
@property (nonatomic, copy) NSString *identifier;
@property (nonatomic, strong, nullable) id data;
@end

@implementation HMViewPagerItem
@end

@interface HMViewPager () <UICollectionViewDataSource, UICollectionViewDelegate, HMViewPagerLayoutProvider, UIScrollViewDelegate, HMViewInspectorDescription>

// MARK: Native

@property (nonatomic, copy) NSString *identifier;
@property (nonatomic, strong) NSMutableSet *registeredIDs;
@property (nonatomic, strong) HMViewPagerLayoutCardAnimator *animator;
@property (nonatomic, strong) HMViewPagerLayout *layout;
@property (nonatomic, strong) UICollectionView *pageView;
@property (nonatomic, strong) NSMutableArray *dataList;
@property (nonatomic) NSUInteger count;
@property (nonatomic) NSInteger currentIndex;
@property (nonatomic) NSUInteger expandCount;
@property (nonatomic) NSInteger currentExpandIndex;
@property (nonatomic) NSUInteger startDragIndex;
@property (nonatomic) CGPoint startDragOffset;
@property (nonatomic) NSUInteger targetDragIndex;
@property (nonatomic) CGPoint targetDragOffset;
@property (nonatomic) BOOL isDragging;
@property (nonatomic) BOOL isScrollingWithoutDrag;//非人为拖拽滚动：松手之后，自动滚动到某个index。

@property (nonatomic) BOOL isAdjusting;
@property (nonatomic, strong) NSTimer *timer;

// MARK: JS

@property (nonatomic, strong) HMFuncCallback itemUpdatedCallback;
@property (nonatomic, strong) HMFuncCallback itemChangedCallback;
@property (nonatomic, strong) HMFuncCallback itemClickCallback;
@property (nonatomic, strong) HMFuncCallback itemScrollCallback;
@property (nonatomic, strong) HMFuncCallback itemScrollStateChangeCallback;

@property(nonatomic, assign) CGFloat loopInterval; /// 自动轮播的时间间隔，单位ms
@property(nonatomic, assign) BOOL canLoop; /// 是否可以无限循环
@property(nonatomic, assign) BOOL autoPlay; /// 是否自动播放
@property (nonatomic) CGFloat itemSpacing; /// item之间的距离
@property (nonatomic) CGFloat edgeSpacing; /// item距离容器左右的间距
@property (nonatomic) CGFloat scaleFactor;
@property (nonatomic) CGFloat alphaFactor;


@end

@implementation HMViewPager

HM_EXPORT_CLASS(ViewPager, HMViewPager)

#pragma mark - Export Property

HM_EXPORT_PROPERTY(data, data, setData:)

#pragma mark - Export Attribute

HM_EXPORT_ATTRIBUTE(itemSpacing, itemSpacing, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(edgeSpacing, edgeSpacing, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(scaleFactor, scaleFactor, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(alphaFactor, alphaFactor, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(loopInterval,loopInterval, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(canLoop, canLoop, HMNumberToNSInteger:)
HM_EXPORT_ATTRIBUTE(autoPlay, autoPlay, HMNumberToNSInteger:)

#pragma mark - Export Method

HM_EXPORT_METHOD(setCurrentItem, setCurrentItem:)
HM_EXPORT_METHOD(onItemView, setOnItemViewCallback:)
HM_EXPORT_METHOD(onPageChange, setOnPageChangeCallback:)
HM_EXPORT_METHOD(onItemClick, setOnItemClickCallback:)
HM_EXPORT_METHOD(onPageScroll, setOnItemScrollCallback:)
/**
 * 0 停止状态
 * 1 开始手动拖拽
 * 2 手松开或滚动过程中
 */
HM_EXPORT_METHOD(onPageScrollStateChange, setOnItemScrollStateChangeCallback:)

- (void)dealloc
{
    NSLog(@"%s", __func__);
    [self invalidateTimer];
    self.pageView.dataSource = nil;
    self.pageView.delegate = nil;
    self.layout.provider = nil;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.identifier = [[NSUUID UUID] UUIDString];
        self.dataList = [NSMutableArray array];
        self.count = 0;
        self.currentIndex = NSNotFound;
        self.autoPlay = NO;
        self.canLoop = NO;
        self.loopInterval = 0.0;
        self.isDragging = NO;
        
        self.animator = [[HMViewPagerLayoutCardAnimator alloc] init];
        HMViewPagerLayout *layout = [[HMViewPagerLayout alloc] init];
        layout.animator = self.animator;
        layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
        layout.provider = self;
        self.layout = layout;
        
        self.pageView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:self.layout];
        self.pageView.backgroundColor = UIColor.clearColor;
        self.pageView.dataSource = self;
        self.pageView.delegate = self;
        self.pageView.showsHorizontalScrollIndicator = NO;
        self.pageView.showsVerticalScrollIndicator = NO;
        self.pageView.alwaysBounceHorizontal = YES;
        self.pageView.pagingEnabled = NO;
        self.pageView.decelerationRate = UIScrollViewDecelerationRateFast;
        if (@available(iOS 13.0, *)) {
            self.pageView.automaticallyAdjustsScrollIndicatorInsets = NO;
        }
        [self addSubview:self.pageView];
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    if (!CGRectEqualToRect(self.pageView.frame, self.bounds)) {
        [self.layout forceInvalidate];
    }
    self.pageView.frame = self.bounds;
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
    [super willMoveToWindow:newWindow];
    
    if (newWindow) {
        [self setupTimer];
    } else {
        [self invalidateTimer];
    }
}

// MARK: - export

- (void)setOnItemViewCallback:(HMFuncCallback)value
{
    self.itemUpdatedCallback = value;
}

- (void)setOnPageChangeCallback:(HMFuncCallback)value
{
    self.itemChangedCallback = value;
}

- (void)setOnItemClickCallback:(HMFuncCallback)value
{
    self.itemClickCallback = value;
}

- (void)setOnItemScrollCallback:(HMFuncCallback)value
{
    self.itemScrollCallback = value;
}

- (void)setOnItemScrollStateChangeCallback:(HMFuncCallback)value
{
    self.itemScrollStateChangeCallback = value;
}

- (void)setItemSpacing:(CGFloat)itemSpacing
{
    _itemSpacing = itemSpacing;
    self.layout.minimumInteritemSpacing = itemSpacing;
    [self.layout forceInvalidate];
}

- (void)setEdgeSpacing:(CGFloat)edgeSpacing
{
    _edgeSpacing = edgeSpacing;
    self.layout.leadingSpacing = edgeSpacing;
    [self.layout forceInvalidate];
}

- (void)setScaleFactor:(CGFloat)scaleFactor
{
    _scaleFactor = scaleFactor;
    self.animator.minScale = MAX(0, MIN(1, scaleFactor));
    [self.layout forceInvalidate];
}

- (void)setAlphaFactor:(CGFloat)alphaFactor
{
    _alphaFactor = alphaFactor;
    self.animator.minAlpha = MAX(0, MIN(1, alphaFactor));
    [self.layout forceInvalidate];
}


- (void)setCurrentItem:(NSInteger)position
{
    if (position < 0) {
        return;
    }
    NSUInteger dc = self.dataList.count;
    if (dc <= 0) {
        return;
    }
    if (position >= dc) {
        position = dc - 1;
    }
    if (self.currentIndex == NSNotFound) {
        return;
    }
    // update current index
    NSUInteger currentLocation = self.currentIndex - (self.currentIndex % dc);
    NSUInteger targetIndex = currentLocation + position;
    self.currentIndex = targetIndex;
    [self setupStartDragOffset];
    [self scrollToIndex:self.currentIndex animated:YES];
    [self triggerItemChangedCallback];
    NSLog(@"HMMMMM set current index -> itemChangedCallback");
}

- (HMBaseValue *)data
{
    return [HMBaseValue valueWithObject:self.dataList inContext:self.hmValue.context];
}

- (void)setData:(HMBaseValue *)value
{
    if (!value) {
        NSLog(@"%s Invalid value type.", __func__);
        return;
    }
    id ary = value.hm_toObjCObject;
    if (!ary) {
        NSLog(@"%s Can't parse value.", __func__);
        return;
    }
    if (![ary isKindOfClass:NSArray.class] && ![ary isKindOfClass:NSDictionary.class]) {
        NSLog(@"%s Value must be an Array or a Map instance.", __func__);
        return;
    }
    if ([ary isKindOfClass:NSArray.class]) {
        NSArray *theAry = ary;
        if (theAry.count < 1) {
            NSLog(@"%s Value is Empty.", __func__);
            return;
        }
    }
    if ([ary isKindOfClass:NSDictionary.class]) {
        NSArray *theAry = [(NSDictionary *)ary allValues];
        if (theAry.count < 1) {
            NSLog(@"%s Value is Empty.", __func__);
            return;
        }
        ary = theAry;
    }
    
    [self invalidateTimer];
    [self updateData:ary];
    [self updateView];
    [self setupTimer];
}

- (void)setCanLoop:(BOOL)canLoop
{
    if (_canLoop == canLoop) {
        return;
    }
    _canLoop = canLoop;
    
    if (self.dataList.count < 1) {
        return;
    }
    [self invalidateTimer];
    [self updateData:[self.dataList copy]];
    [self updateView];
    [self setupTimer];
}

- (void)updateData:(NSArray *)ary
{
    // update data
    [self.dataList removeAllObjects];
    // update uuid
    NSString *uuidstring = self.identifier;
    for (NSUInteger i = 0; i < ary.count; i++) {
        // create uuid for each item
        // NSString *itemID = [NSString stringWithFormat:@"%@-%@", uuidstring, @(i)];
        HMViewPagerItem *item = [[HMViewPagerItem alloc] init];
        item.data = ary[i];
        item.identifier = uuidstring;
        [self.dataList addObject:item];
    }
    if (self.canLoop) {
        self.count = self.dataList.count * 1000;
        self.currentIndex = self.dataList.count * (1000 / 2 - 1);
    } else {
        self.count = self.dataList.count;
        self.currentIndex = 0;
    }
}

- (void)updateView
{
    for (HMViewPagerItem *item in self.dataList) {
        // register to collection view
        if ([self.registeredIDs containsObject:item.identifier]) {
            continue;
        }
        [self.registeredIDs addObject:item.identifier];
        [self.pageView registerClass:HMViewPagerCell.class forCellWithReuseIdentifier:item.identifier];
    }
    [self.pageView reloadData];
    [self.layout forceInvalidate];
    // [self.pageView reloadData];
    
    [self scrollToIndex:self.currentIndex animated:NO];
}

// MARK: - callback

- (void)triggerItemChangedCallback
{
    NSUInteger dc = self.dataList.count;
    if (dc <= 0) {
        return;
    }
    if (self.itemChangedCallback) {
        self.itemChangedCallback(@[@(self.currentIndex % dc), @(dc)]);
    }
}
// setConentOffset & 松手时自动分页滚动
- (void)triggerItemScrollStateChangeCallback:(NSNumber *)state
{
    if (self.itemScrollStateChangeCallback) {
        self.itemScrollStateChangeCallback(@[state]);
    }
}
// MARK: - helper

- (CGFloat)scrollOffset
{
    CGFloat scrollOffset = self.pageView.contentOffset.x / self.layout.itemSpacing;
    return fmod(scrollOffset, (double)self.count);
}

- (void)scrollToIndex:(NSInteger)index animated:(BOOL)isAnimated
{
    if (index >= self.count) {
        return;
    }
    NSIndexPath *indexPath = [NSIndexPath indexPathForItem:index inSection:0];
    CGPoint contentOffset = [self.layout contentOffsetForIndexPath:indexPath];
    if (!CGPointEqualToPoint(contentOffset, self.pageView.contentOffset)) {
        [self triggerItemScrollStateChangeCallback:@2];
    }
    [self.pageView setContentOffset:contentOffset animated:isAnimated];
}

- (void)setupStartDragOffset
{
    self.startDragIndex = self.currentIndex;
    NSIndexPath *indexPath = [self.layout indexPathForItem:self.currentIndex];
    self.startDragOffset = [self.layout contentOffsetForIndexPath:indexPath];
}

// MARK: - Timer

- (void)invalidateTimer
{
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
}

- (void)setupTimer
{
    [self invalidateTimer];
    if (self.count <= 0) {
        return;
    }
    if (!self.autoPlay || self.loopInterval < 1000) {
        return;
    }
    NSTimer *timer = [NSTimer timerWithTimeInterval:self.loopInterval / 1000
                                             target:self
                                           selector:@selector(onTimerFire:)
                                           userInfo:nil
                                            repeats:YES];
    _timer = timer;
    [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
}

- (void)onTimerFire:(id)sender
{
    if (!self.superview) {
        [self invalidateTimer];
        return;
    }
    if (self.count <= 0) {
        return;
    }
    if (self.currentIndex == NSNotFound) {
        return;
    }
    self.currentIndex = (self.currentIndex + 1) % self.count;
    [self setupStartDragOffset];
    [self scrollToIndex:self.currentIndex animated:self.currentIndex > 0];
    [self triggerItemChangedCallback];
}

// MARK: - UIScrollViewDelegate

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView
{
    self.isDragging = YES;
    
    if (self.autoPlay) {
        [self invalidateTimer];
    }
    
    [self setupStartDragOffset];
    
    [self triggerItemScrollStateChangeCallback:@1];
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
//    scrollView.userInteractionEnabled = NO;
//    if (!self.isDragging) {
//        return;
//    }
    if (CGRectGetWidth(self.bounds) < 0.001 || self.count <= 0) {
        return;
    }
    NSUInteger index = lround([self scrollOffset]) % self.count;
    CGFloat progress;
    if (scrollView.contentOffset.x > self.startDragOffset.x) {
        // forwarding（👈）
        progress = (scrollView.contentOffset.x - self.startDragOffset.x) / self.layout.itemSpacing;
        progress = MAX(0, MIN(1, progress));
    } else {
        // backwarding (👉)
        progress = 1.0 + (scrollView.contentOffset.x - self.startDragOffset.x) / self.layout.itemSpacing;
        progress = MAX(0.0, MIN(1.0, progress));
    }
    
    
    if (self.itemScrollCallback) {
        self.itemScrollCallback(@[@(index % self.dataList.count), @(progress)]);
    }
    
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
//    scrollView.userInteractionEnabled = YES;

    if (!decelerate && !self.isScrollingWithoutDrag) {
        [self scrollViewDidEnd:scrollView];
    }
    self.isScrollingWithoutDrag = NO;
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    [self scrollViewDidEnd:scrollView];
}

- (void)scrollViewDidEndScrollingAnimation:(UIScrollView *)scrollView
{

    [self scrollViewDidEnd:scrollView];
}



- (void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset
{
    CGPoint _targetContentOffset = *targetContentOffset;
    //即将停止拖拽，如果停止 targetContentOffset 就是当前位置，则不需要触发滚动
    if (!CGPointEqualToPoint(self.pageView.contentOffset, _targetContentOffset)) {
        self.isScrollingWithoutDrag = YES;
        [self triggerItemScrollStateChangeCallback:@2];
    }

    *targetContentOffset = scrollView.contentOffset;
    [self.pageView setContentOffset:_targetContentOffset animated:YES];
}

- (void)scrollViewDidEnd:(UIScrollView *)scrollView
{
//    scrollView.userInteractionEnabled = YES;
    
    self.isDragging = NO;
    self.isScrollingWithoutDrag = NO;
    if (self.autoPlay && !self.timer) {
        [self setupTimer];
    }
    if (CGRectGetWidth(self.bounds) < 0.001 || self.count <= 0) {
        return;
    }
    NSUInteger index = lround(self.scrollOffset) % self.count;
    if (index == self.currentIndex) {
        [self triggerItemScrollStateChangeCallback:@0];
    } else {
        self.currentIndex = index;
        [self triggerItemChangedCallback];
        [self triggerItemScrollStateChangeCallback:@0];
    }
    NSLog(@"HMMMMM end itemChangedCallback");
}

// MARK: - UICollectionViewDataSource

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
{
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return self.count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    NSUInteger index = (indexPath.item % self.dataList.count) % self.count;
    HMViewPagerItem *item = self.dataList[index];
    HMViewPagerCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:item.identifier forIndexPath:indexPath];
    
    // return a cell for displaying image
    if ([item.data isKindOfClass:NSString.class] && [item.data hasPrefix:@"http"]) {
        cell.contentViewValue = nil;
        [cell setImageURL:item.data];
        return cell;
    }
    
    if (!self.itemUpdatedCallback) {
        return cell;
    }
    
    HMBaseValue *cellJSValue = cell.contentView.subviews.lastObject.hmValue;
    
    // update existing view
    if (cellJSValue) {
        self.itemUpdatedCallback(@[@(index), cellJSValue]);
        
        return cell;
    }
    
    // append new view
    cellJSValue = self.itemUpdatedCallback(@[@(index)]);
    UIView *jsView = cellJSValue.toNativeObject;
    if (jsView && [jsView isKindOfClass:UIView.class]) {
        if (jsView.superview) {
            NSLog(@"Bad case occured.");
            // jsView has been added to a super view,
            // simply remove it from its supre view and append to content view maybe cause Yoga crash.
            // Here, we just return the cell.
            //
            // [jsView removeFromSuperview];
            // [jsView.superview hm_markDirty];
            return cell;
        }
        if (cell.contentViewValue) {
            id contentViewObject = cell.contentViewValue.toNativeObject;
            if ([contentViewObject isKindOfClass:UIView.class]) {
                [((UIView *) contentViewObject) removeFromSuperview];
            }
        }
        cell.contentViewValue = cellJSValue;        
        return cell;
    }
    
    return cell;
}

// MARK: - HMViewPagerLayoutProvider

- (NSUInteger)numberOfSections:(HMViewPagerLayout *)layout
{
    return 1;
}

- (NSUInteger)numberOfItemsInSection:(NSUInteger)section layout:(HMViewPagerLayout *)layout
{
    return self.count;
}

- (NSUInteger)currentIndexForLayout:(HMViewPagerLayout *)layout
{
    return self.currentIndex;
}

- (BOOL)isInfinite
{
    return NO;
}

// MARK: - UICollectionViewDelegate

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
    if (self.count <= 0 || self.currentIndex == NSNotFound) {
        return;
    }
    
    // select current item
    NSUInteger index = indexPath.item % self.count;
    if (index == self.currentIndex) {
        if (self.itemClickCallback) {
            self.itemClickCallback(@[@(index % self.dataList.count), @(self.dataList.count)]);
        }
        return;
    }
    if (index < self.currentIndex) {
        // select previous item
        self.currentIndex -= 1;
    } else {
        // select next item
        self.currentIndex += 1;
    }
    self.currentIndex %= self.count;
    [self setupStartDragOffset];
    NSLog(@"HMMMMM itemChangedCallback");
    
    collectionView.userInteractionEnabled = NO;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.25 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        collectionView.userInteractionEnabled = YES;
    });
    [self scrollToIndex:self.currentIndex animated:YES];
    [self triggerItemChangedCallback];
}

#pragma mark - <HMViewInspectorDescription>


// 屏蔽 header/footer 原生视图
- (NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    NSMutableArray *res = [NSMutableArray new];

    NSArray *children = self.pageView.visibleCells;
    if (children) {
        [res addObjectsFromArray:children];
    }
    return res.copy;
}

@end
