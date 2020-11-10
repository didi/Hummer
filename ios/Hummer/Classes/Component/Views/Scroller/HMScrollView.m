//
//  HMScrollView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMScrollView.h"
#import "HMExportManager.h"
#import "HMUtility.h"
#import "NSObject+Hummer.h"
#import "UIView+HMRenderObject.h"
#import "HMScrollEvent.h"
#import "UIView+HMEvent.h"
#import "HMJSGlobal.h"
#import "UIView+HMDom.h"
#import "HMBaseValue.h"

@interface HMScrollView ()<UIScrollViewDelegate>
@property(nonatomic,copy) HMClosureType onScrollToTopLisener;
@property(nonatomic,copy) HMClosureType onScrollToBottomLisener;
@property(nonatomic,assign) CGPoint lastContentOffset;
@end

@implementation HMScrollView
HM_EXPORT_CLASS(BaseScroller, HMScrollView)
#pragma mark - Init

- (void)addSubview:(UIView *)view {
    if (!view.isHmLayoutEnabled) {
        [view hm_disableIncludedInLayout];
    }
    [super addSubview:view];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    [self updateContentSize];
}

- (instancetype)initWithFrame:(CGRect)frame {
    if ([super initWithFrame:frame]) {
        self.showsVerticalScrollIndicator = YES;
        self.showsHorizontalScrollIndicator = YES;
        if (@available(iOS 11.0, *)) {
            self.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        } else {
            // Fallback on earlier versions
        }
        self.delegate = self;
        self.bounces = YES;
        self.keyboardDismissMode = UIScrollViewKeyboardDismissModeOnDrag;
    }
    return self;
}

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    //FIXME 第一个参数应该是viewid
    if(self = [super initWithHMValues:values]) {
        HMBaseValue * value = values.firstObject;
        if (value) {
            NSDictionary * dict = [value toDictionary];
            self.pagingEnabled = [dict[@"pagingEnabled"] integerValue] > 0;
            self.scrollDirection = [dict[@"horizontalScroll"] integerValue] ;
        }
        [self hm_configureLayoutWithBlock:^(id<HMLayoutStyleProtocol>  _Nonnull layout) {
            layout.overflow = YGOverflowScroll;
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

    NSDictionary * dic = value.toDictionary;
    if (!dic) {return;}
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
    if (self.scrollDirection == HMScrollDirectionHorizontal) {
        self.contentSize = [self hm_sizeThatFitsMinimumSize:CGSizeZero maximumSize:CGSizeMake(CGFLOAT_MAX, self.bounds.size.height)];
    } else {
        self.contentSize = [self hm_sizeThatFitsMinimumSize:CGSizeZero maximumSize:CGSizeMake(self.bounds.size.width, CGFLOAT_MAX)];
    }
}

#pragma mark - Export

HM_EXPORT_METHOD(setOnScrollToTopListener, onScrollToTop:)

- (void)onScrollToTop:(HMClosureType)callback {
    self.onScrollToTopLisener = callback;
}

HM_EXPORT_METHOD(setOnScrollToBottomListener, onScrollToBottom:)

- (void)onScrollToBottom:(HMClosureType)callback {
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
    [self setContentOffset:offset animated:YES];
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
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventBegan),
                               kHMScrollDeltaX:@(0),
                               kHMScrollDeltaY:@(0),
                               kHMScrollOffsetX:@(0),
                               kHMScrollOffsetY:@(0)};
        [self hm_notifyWithEventName:HMScrollEventName argument:args];
    });
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    HMExecOnMainQueue(^{
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventScroll),
                               kHMScrollDeltaX:@(deltaX),
                               kHMScrollDeltaY:@(deltaY),
                               kHMScrollOffsetX:@(contentOffset.x),
                               kHMScrollOffsetY:@(contentOffset.y)};
        [self hm_notifyWithEventName:HMScrollEventName argument:args];
    });
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate {
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat deltaX = contentOffset.x - self.lastContentOffset.x;
    CGFloat deltaY = contentOffset.y - self.lastContentOffset.y;
    self.lastContentOffset = contentOffset;
    HMExecOnMainQueue(^{
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventEndedDragging),
                               kHMScrollDeltaX:@(deltaX),
                               kHMScrollDeltaY:@(deltaY),
                               kHMScrollOffsetX:@(contentOffset.x),
                               kHMScrollOffsetY:@(contentOffset.y)};
        [self hm_notifyWithEventName:HMScrollEventName argument:args];
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
        NSDictionary *args = @{kHMScrollState:@(HMScrollEventEndedDecelerating),
                               kHMScrollDeltaX:@(deltaX),
                               kHMScrollDeltaY:@(deltaY),
                               kHMScrollOffsetX:@(contentOffset.x),
                               kHMScrollOffsetY:@(contentOffset.y)};
        [self hm_notifyWithEventName:HMScrollEventName argument:args];
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

@end

@interface HMVerticalScrollView : HMScrollView
@end

@implementation HMVerticalScrollView

HM_EXPORT_CLASS(Scroller, HMVerticalScrollView)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    if (self = [super initWithHMValues:values]) {
        self.scrollDirection = HMScrollDirectionVertical;
        self.alwaysBounceVertical = YES;
    }
    return self;
}

@end

@interface HMHorizontalScrollView : HMScrollView
@end

@implementation HMHorizontalScrollView

HM_EXPORT_CLASS(HorizontalScroller, HMHorizontalScrollView)

- (instancetype)initWithHMValues:(NSArray<__kindof HMBaseValue *> *)values {
    if (self = [super initWithHMValues:values]) {
        self.scrollDirection = HMScrollDirectionHorizontal;
        self.alwaysBounceHorizontal = YES;
    }
    return self;
}

@end
