//
//  HMXViewPager.m
//  HummerX
//
//  Created by wzp on 2019/11/18.
//

#import "HMXViewPager.h"
#import <Hummer/HMBaseExecutorProtocol.h>
#import "HMExportManager.h"
#import "NSObject+Hummer.h"
#import "HMAttrManager.h"
#import "HMConverter.h"
#import "UIView+HMRenderObject.h"
#import "UIImageView+HMImageLoader.h"
#import "HMBaseValue.h"

#import <Hummer/UIView+HMInspector.h>

@interface HMXCycleScrollCell : UICollectionViewCell
@property(nonatomic, strong) UIImageView *imageView;
@property(nonatomic, strong) id dataSource;
@property(nonatomic, copy) void(^updateCallBack)(HMXCycleScrollCell *mCell);
@end

@implementation HMXCycleScrollCell

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self setup];
        self.clipsToBounds = YES;
        [self.contentView hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.flexDirection = YOGA_TYPE_WRAPPER(YGFlexDirectionColumn);
            layout.justifyContent= YOGA_TYPE_WRAPPER(YGJustifyCenter);
            layout.alignItems = YOGA_TYPE_WRAPPER(YGAlignStretch);
        }];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self.contentView hm_applyLayoutPreservingOrigin:NO affectedShadowViews:nil];
}

- (void)setup{
    self.imageView = [[UIImageView alloc]initWithFrame:self.bounds];
    [self.contentView addSubview:self.imageView];
}

- (void)setDataSource:(id)dataSource{
    if ([dataSource isKindOfClass:[NSString class]]) {
        self.imageView.hidden = NO;
        NSString *url = dataSource;
        if ([url containsString:@"http"]) {
            [self.imageView hm_setImageWithURL:[NSURL URLWithString:url]];
        }
    }else{
        self.imageView.hidden = YES;
        if (self.updateCallBack) {
            self.updateCallBack(self);
        }
    }
}

@end

@interface HMXViewPager () <UIScrollViewDelegate,UICollectionViewDataSource,UICollectionViewDelegate,HMViewInspectorDescription>
@property (nonatomic, strong) HMFuncCallback itemUpdatedCallback;
@property (nonatomic, strong) HMFuncCallback itemChangedCallback;
@property (nonatomic, strong) HMFuncCallback itemClickCallback;
/**item距离左右的间距*/
@property (nonatomic, assign) CGFloat mainInset;
@property (nonatomic, assign) CGFloat mainPadding;

/**自动轮播的时间间隔，单位ms（0时autoPlay失效）*/
@property(nonatomic, assign) CGFloat loopInterval;
/**是否可以无限循环*/
@property(nonatomic, assign) BOOL canLoop;
/**是否自动播放*/
@property(nonatomic, assign) BOOL autoPlay;
/**承载collection*/
@property(nonatomic, strong) UICollectionView *pageView;
/**数据list*/
@property(nonatomic, strong) NSMutableArray *dataList;
/**定时器*/
@property(nonatomic, strong) NSTimer *timer;
/**最新停止的位置*/
@property(nonatomic, assign) CGFloat lastX;

@property(nonatomic, strong) UICollectionViewFlowLayout *layout;
/**pageView每页移动距离*/
@property(nonatomic, assign) CGFloat defultMove;
/**承载手势scrollview,提供pagingEnabled*/
@property(nonatomic, strong) UIScrollView *dragScrollView;
@end


static NSString * const kCycleCellID = @"kCycleCellID";
@implementation HMXViewPager

HM_EXPORT_CLASS(ViewPagerOld, HMXViewPager)

- (instancetype)init {
    self = [super init];
    if(self) {
        self.autoPlay = NO;
        self.canLoop = NO;
        self.loopInterval = 0.0;
        [self setup];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    //此时才能获取正确的frame
    self.pageView.frame = self.bounds;
    self.dragScrollView.frame = self.bounds;
    
    _layout.sectionInset = UIEdgeInsetsMake(0, self.mainInset, 0, self.mainInset);
    _layout.minimumLineSpacing = self.mainPadding;
    _layout.itemSize = CGSizeMake(CGRectGetWidth(self.bounds) - self.mainInset * 2, CGRectGetHeight(self.bounds));
    
    self.defultMove = _layout.itemSize.width + _layout.minimumLineSpacing;
    //默认移动到中间一点的位置
    self.lastX = CGRectGetWidth(self.bounds) * (_canLoop?10*_dataList.count:0);
    self.dragScrollView.contentOffset = CGPointMake(_lastX, 0);
    self.pageView.contentOffset = CGPointMake(_defultMove * (_canLoop?10*_dataList.count:0), 0);
    
}

- (void)setup{
    self.layout = [[UICollectionViewFlowLayout alloc]init];
    _layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    
    self.pageView = [[UICollectionView alloc]initWithFrame:CGRectZero collectionViewLayout:_layout];
    self.pageView.backgroundColor = UIColor.whiteColor;
    self.pageView.dataSource = self;
    self.pageView.delegate = self;
    self.pageView.showsHorizontalScrollIndicator = NO;
    self.pageView.showsVerticalScrollIndicator = NO;
    [self addSubview:self.pageView];
    //注册cell
    [self.pageView registerClass:[HMXCycleScrollCell class] forCellWithReuseIdentifier:kCycleCellID];
    //用于拖拽手势的scorllView
    self.dragScrollView = [[UIScrollView alloc]initWithFrame:CGRectZero];
    self.dragScrollView.pagingEnabled = YES;
    self.dragScrollView.delegate = self;
    self.dragScrollView.showsHorizontalScrollIndicator = NO;
    self.dragScrollView.showsVerticalScrollIndicator = NO;
    [self addSubview:_dragScrollView];
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(scrollTouch:)];
    [self.dragScrollView addGestureRecognizer:tap];
    //默认隐藏
    self.dragScrollView.hidden = YES;
    self.pageView.pagingEnabled = YES;
}

//cell点击事件被dragScrollView遮挡，用添加的tap计算
- (void)scrollTouch:(UITapGestureRecognizer *)tap{
    if(!self.itemClickCallback || _dataList.count == 0) {
        return;
    }
    CGPoint point = [tap locationInView:self.dragScrollView];
    NSInteger m = point.x/CGRectGetWidth(self.bounds);
    CGFloat lastLength = point.x - m *CGRectGetWidth(self.bounds);
    if (lastLength <= self.mainInset - self.mainPadding) {
        self.itemClickCallback(@[@(m%_dataList.count), @(_dataList.count)]);
    }else if (lastLength > self.mainInset &&  lastLength < CGRectGetWidth(self.bounds) -  self.mainInset){
        self.itemClickCallback(@[@((m+1)%_dataList.count), @(_dataList.count)]);
    }else if(lastLength > CGRectGetWidth(self.bounds) - self.mainPadding){
        self.itemClickCallback(@[@((m+2)%_dataList.count), @(_dataList.count)]);
    }
//    NSLog(@"%@",NSStringFromCGPoint(point));
}

#pragma mark - Export Attribute

HM_EXPORT_ATTRIBUTE(itemSpacing, itemSpacing, HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(edgeSpacing, itemInsets,HMStringToFloat:)
HM_EXPORT_ATTRIBUTE(loopInterval,loopInterval , HMStringToFloat:);
HM_EXPORT_ATTRIBUTE(canLoop,canLoop, HMNumberToNSInteger:)
HM_EXPORT_ATTRIBUTE(autoPlay,autoPlay, HMNumberToNSInteger:)

- (void)setItemSpacing:(CGFloat )itemSpacing {
    self.mainPadding = itemSpacing;
    //非全屏需要dragScrollView提供paging效果，但是细致的点击会被dragScrollView拦截
    if (itemSpacing > 0) {
        self.dragScrollView.hidden = NO;
        self.pageView.pagingEnabled = NO;
    }
}

- (void)setItemInsets:(CGFloat)itemInsets{
    self.mainInset = itemInsets;
    if (itemInsets > 0) {
        self.dragScrollView.hidden = NO;
        self.pageView.pagingEnabled = NO;
    }
}

#pragma mark - Export Property

HM_EXPORT_PROPERTY(data, data, setData:)

- (HMBaseValue *)data {
    return [HMBaseValue valueWithObject:self.dataList inContext:self.hmValue.context];
}

- (void)setData:(HMBaseValue *)value {
    NSArray *ary = value.hm_toObjCObject;
    NSMutableArray * list = [NSMutableArray array];
    if(ary && [ary isKindOfClass:[NSArray class]]) {
        for (id item in ary) {
            [list addObject:item];
        }
        self.dataList = list;
        self.dragScrollView.contentSize = CGSizeMake(CGRectGetWidth(self.bounds)*(_canLoop?_dataList.count*1000000:_dataList.count), CGRectGetHeight(self.bounds));
        [self.pageView reloadData];
        [self setupTimer];
    }
}

#pragma mark - Export Method

HM_EXPORT_METHOD(onItemView, setOnItemViewCallback:)
HM_EXPORT_METHOD(onPageChange, setOnPageChangeCallback:)
HM_EXPORT_METHOD(onItemClick, setOnItemClickCallback:)
//设置默认位置
HM_EXPORT_METHOD(setCurrentItem, setCurrentItem:)

- (void)setOnItemViewCallback:(HMFuncCallback)value {
    self.itemUpdatedCallback  = value;
}

- (void)setOnPageChangeCallback:(HMFuncCallback )value {
    self.itemChangedCallback  = value;
}

- (void)setOnItemClickCallback:(HMFuncCallback )value {
    self.itemClickCallback  = value;
}

- (void)setCurrentItem:(NSInteger)position{
    NSAssert(_dataList.count > position,@"setCurrentItem postion 超出范围");
    [self.pageView scrollToItemAtIndexPath:[NSIndexPath indexPathForItem:position inSection:0] atScrollPosition:UICollectionViewScrollPositionLeft animated:YES];
}

#pragma mark - collectionView代理
- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView {
    return 1;
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return _canLoop?_dataList.count*1000000:_dataList.count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    if (self.dataList.count == 0) {
        return nil;
    }
    HMXCycleScrollCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:kCycleCellID forIndexPath:indexPath];
    __weak __typeof(self)weakSelf = self;
    cell.updateCallBack = ^(HMXCycleScrollCell *mCell) {
        __strong __typeof(weakSelf)strongSelf = weakSelf;
        HMBaseValue *cellJSValue = mCell.contentView.subviews.lastObject.hmValue;
        if (!cellJSValue) {
            HMBaseValue * value = strongSelf.itemUpdatedCallback(@[@(indexPath.item%_dataList.count)]);
            UIView * jsView = value.hm_toObjCObject;
            NSLog(@"jsView = %@",jsView);
            NSAssert([jsView isKindOfClass:[UIView class]], @"JSValue can't be turned to view");
            [mCell.contentView addSubview:jsView];
        }else {
            self.itemUpdatedCallback(@[@(indexPath.item%_dataList.count),cellJSValue]);
        }
        [mCell setNeedsLayout];
    };
    cell.dataSource = _dataList[indexPath.item%_dataList.count];
    return cell;
}

#pragma mark - scrollviewDelegate
- (void)scrollViewDidScroll:(UIScrollView *)scrollView{
    if (self.dragScrollView == scrollView) {
        self.pageView.contentOffset = CGPointMake( _defultMove/CGRectGetWidth(self.bounds) * scrollView.contentOffset.x, 0);
    }
}

- (void)scrollViewWillBeginDragging:(UIScrollView *)scrollView {
    if (self.autoPlay) {
        [self invalidateTimer];
    }
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView{
    //这个方法试手动滑动才会调用，所以不论拖动的是dragScrollView还是pageView只会触发一次
    //滑到第几个
    if (_autoPlay && !_timer) {
        [self setupTimer];
    }
    if (!self.itemChangedCallback || CGRectGetWidth(self.bounds) == 0) {
        return;
    }
    //记录手动滑后停止的位置
    _lastX = scrollView.contentOffset.x;
    NSInteger index = scrollView.contentOffset.x/CGRectGetWidth(self.bounds);
    self.itemChangedCallback(@[@(index), @(self.dataList.count)]);
}

- (void)invalidateTimer{
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
}

- (void)setupTimer{
    [self invalidateTimer]; // 创建定时器前先停止定时器，不然会出现僵尸定时器，导致轮播频率错误
    if (!_autoPlay || _loopInterval < 1000) {
        return;
    }
    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:self.loopInterval/1000 target:self selector:@selector(automaticScroll) userInfo:nil repeats:YES];
    _timer = timer;
    [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
}

- (void)automaticScroll{
    [self.dragScrollView setContentOffset:CGPointMake(_lastX + CGRectGetWidth(self.bounds), 0) animated:YES];
    _lastX += CGRectGetWidth(self.bounds);
}


#pragma mark - <HMViewInspectorDescription>


// 屏蔽 header/footer 原生视图
- (NSArray<id<HMViewInspectorDescription>> *)hm_displayJsChildren {
    
    return nil;
}


@end
