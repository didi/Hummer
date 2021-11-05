//
//  HMViewPagerLayout.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMViewPagerLayout.h"
#import "HMViewPagerLayoutAttributes.h"

@interface HMViewPagerLayout ()

@property (nonatomic) CGSize contentSize;
@property (nonatomic) CGFloat itemSpacing;
@property (nonatomic) BOOL needsReprepare;
@property (nonatomic) BOOL needsReprepare2;
@property (nonatomic) CGSize collectionViewSize;
@property (nonatomic) NSUInteger numberOfSections;
@property (nonatomic) NSUInteger numberOfItems;
@property (nonatomic) CGFloat actualInteritemSpacing;
@property (nonatomic) CGSize actualItemSize;

@end

@implementation HMViewPagerLayout

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder
{
    self = [super initWithCoder:coder];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (void)commonInit
{
    _contentSize = CGSizeZero;
    _leadingSpacing = 0;
    _itemSpacing = 0;
    _needsReprepare = YES;
    self.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    _collectionViewSize = CGSizeZero;
    _numberOfItems = 0;
    _numberOfSections = 1;
    _actualInteritemSpacing = 0;
    _actualItemSize = CGSizeZero;
}

+ (Class)layoutAttributesClass
{
    return HMViewPagerLayoutAttributes.class;
}

- (void)prepareLayout
{
    if (!self.collectionView || CGSizeEqualToSize(CGSizeZero, self.collectionView.frame.size) || !self.provider) {
        return;
    }
    if (!self.needsReprepare2) {
        if (!self.needsReprepare || CGSizeEqualToSize(self.collectionViewSize, self.collectionView.frame.size)) {
            return;
        }
    }
    BOOL shouldAdjustBounds = !CGSizeEqualToSize(self.collectionViewSize, self.collectionView.frame.size);
    self.needsReprepare = NO;
    self.needsReprepare2 = NO;
    self.collectionViewSize = self.collectionView.frame.size;
    
    self.numberOfSections = [self.provider numberOfSections:self];
    self.numberOfItems = [self.provider numberOfItemsInSection:0 layout:self];
    if (self.numberOfSections <= 0 || self.numberOfItems <= 0) {
        return;
    }
    self.actualItemSize = CGSizeMake(self.collectionView.frame.size.width - self.leadingSpacing * 2, self.collectionView.frame.size.height);
    
//    CGFloat proposedInteritemSpacing = [self.animator proposedInteritemSpacing:self.leadingSpacing == 0 ? CGSizeZero : self.actualItemSize];

    self.actualInteritemSpacing = self.minimumInteritemSpacing;
    self.itemSpacing = self.actualItemSize.width + self.actualInteritemSpacing;
    
    CGFloat numberOfItems = (CGFloat)(self.numberOfItems * self.numberOfSections);
    CGFloat contentSizeWidth = self.leadingSpacing * 2;
    contentSizeWidth += (numberOfItems - 1) * self.actualInteritemSpacing;
    contentSizeWidth += numberOfItems * self.actualItemSize.width;
    self.contentSize = CGSizeMake(contentSizeWidth, self.collectionView.frame.size.height);
    
    if (shouldAdjustBounds) {
        [self adjustCollectionViewBounds];
        dispatch_async(dispatch_get_main_queue(), ^{
            [self scrollToCurrentIndex:NO];
        });
    }
}

- (BOOL)shouldInvalidateLayoutForBoundsChange:(CGRect)newBounds
{
    return YES;
}

- (CGSize)collectionViewContentSize
{
    return self.contentSize;
}

- (NSArray<__kindof UICollectionViewLayoutAttributes *> *)layoutAttributesForElementsInRect:(CGRect)rect
{
    NSMutableArray *layoutAttributes = [NSMutableArray array];
    if (self.itemSpacing <= 0 || CGRectIsEmpty(rect)) {
        return layoutAttributes;
    }
    CGRect newRect = CGRectIntersection(rect, CGRectMake(0, 0, self.contentSize.width, self.contentSize.height));
    if (CGRectIsEmpty(newRect)) {
        return layoutAttributes;
    }
    NSUInteger numberOfItemsBefore = MAX((NSInteger)((CGRectGetMinX(newRect) - self.leadingSpacing) / self.itemSpacing), 0);
    CGFloat startPosition = self.leadingSpacing + (CGFloat)numberOfItemsBefore * self.itemSpacing;
    NSUInteger startIndex = numberOfItemsBefore;
    NSUInteger itemIndex = startIndex;
    CGFloat origin = startPosition;
    CGFloat maxPosition = MIN(CGRectGetMaxX(newRect), self.contentSize.width - self.actualItemSize.width - self.leadingSpacing);
    while (origin - maxPosition <= MAX(100.0 * (FLT_EPSILON) * ABS(origin + maxPosition), FLT_MIN)) {
        NSIndexPath *newIndexPath = [NSIndexPath indexPathForItem:itemIndex % self.numberOfItems inSection:itemIndex / self.numberOfItems];
        HMViewPagerLayoutAttributes *attributes = (HMViewPagerLayoutAttributes *)[self layoutAttributesForItemAtIndexPath:newIndexPath];
        [self applyTransformTo:attributes animator:self.animator];
        [layoutAttributes addObject:attributes];
        itemIndex += 1;
        origin += self.itemSpacing;
    }
    return layoutAttributes;
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath
{
    HMViewPagerLayoutAttributes *attributes = [HMViewPagerLayoutAttributes layoutAttributesForCellWithIndexPath:indexPath];
    attributes.indexPath = indexPath;
    CGRect frame = [self frameForIndexPath:indexPath];
    CGPoint center = CGPointMake(CGRectGetMidX(frame), CGRectGetMidY(frame));
    attributes.center = center;
    attributes.size = self.actualItemSize;
    return attributes;
}

- (CGPoint)targetContentOffsetForProposedContentOffset:(CGPoint)proposedContentOffset withScrollingVelocity:(CGPoint)velocity
{
    if (!self.collectionView) {
        return proposedContentOffset;
    }
    CGPoint result = proposedContentOffset;
    
    CGFloat(^calculateTargetOffset)(CGFloat proposedOffset, CGFloat boundedOffset) = ^(CGFloat proposedOffset, CGFloat boundedOffset) {
        CGFloat targetOffset = 0;
        if (ABS(velocity.x) >= 0.6) {
            CGFloat vector = velocity.x >= 0 ? 1.0 : -1.0;
            targetOffset = round(proposedOffset / self.itemSpacing + 0.35 * vector) * self.itemSpacing;
        } else {
            targetOffset = round(proposedOffset / self.itemSpacing) * self.itemSpacing;
        }
        targetOffset = MAX(0, targetOffset);
        targetOffset = MIN(boundedOffset, targetOffset);
        return targetOffset;
    };
    
    CGFloat boundedOffset = self.collectionView.contentSize.width - self.actualItemSize.width;
    CGFloat proposedContentOffsetX = calculateTargetOffset(proposedContentOffset.x, boundedOffset);
    CGFloat proposedContentOffsetY = proposedContentOffset.y;
    result = CGPointMake(proposedContentOffsetX, proposedContentOffsetY);
    return result;
}

// MARK: - public

- (void)forceInvalidate
{
    self.needsReprepare = YES;
    self.needsReprepare2 = YES;
    [self invalidateLayout];
}

- (CGPoint)contentOffsetForIndexPath:(NSIndexPath *)indexPath
{
    CGPoint origin = [self frameForIndexPath:indexPath].origin;
    if (!self.collectionView) {
        return origin;
    }
    CGFloat contentOffsetX = origin.x - self.leadingSpacing; // (self.collectionView.frame.size.width * 0.5 - self.actualItemSize.width * 0.5);
//    CGFloat contentOffsetX = origin.x - (self.collectionView.frame.size.width * 0.5 - self.actualItemSize.width * 0.5);

    CGFloat contentOffsetY = 0;
    return CGPointMake(contentOffsetX, contentOffsetY);
}

// MARK: - helper

- (NSIndexPath *)indexPathForItem:(NSUInteger)item
{
    return [NSIndexPath indexPathForItem:item inSection:self.provider.isInfinite ? self.numberOfSections / 2 : 0];
}

- (CGRect)frameForIndexPath:(NSIndexPath *)indexPath
{
    NSUInteger numberOfItems = self.numberOfItems * indexPath.section + indexPath.item;
    CGFloat originX = self.leadingSpacing + (CGFloat)numberOfItems * self.itemSpacing;
    CGFloat originY = (self.collectionView.frame.size.height - self.actualItemSize.height) * 0.5;
    return CGRectMake(originX, originY, self.actualItemSize.width, self.actualItemSize.height);
}

- (void)adjustCollectionViewBounds
{
    if (!self.collectionView || !self.provider) {
        return;
    }
    NSUInteger currentIndex = [self.provider currentIndexForLayout:self];
    NSIndexPath *newIndexPath = [self indexPathForItem:currentIndex];
    CGPoint contentOffset = [self contentOffsetForIndexPath:newIndexPath];
    CGRect newBounds = CGRectMake(contentOffset.x, contentOffset.y, self.collectionView.frame.size.width, self.collectionView.frame.size.height);
    self.collectionView.bounds = newBounds;
}

- (void)scrollToCurrentIndex:(BOOL)animated
{
    if (!self.collectionView || !self.provider) {
        return;
    }
    NSUInteger currentIndex = [self.provider currentIndexForLayout:self];
    NSIndexPath *newIndexPath = [self indexPathForItem:currentIndex];
    CGPoint contentOffset = [self contentOffsetForIndexPath:newIndexPath];
    [self.collectionView setContentOffset:contentOffset animated:animated];
}


- (void)applyTransformTo:(HMViewPagerLayoutAttributes *)attributes animator:(id<HMViewPagerLayoutAnimator>)animator
{
    if (!self.collectionView || !self.animator) {
        return;
    }
    CGFloat ruler = CGRectGetMidX(self.collectionView.bounds);
    attributes.position = (attributes.center.x - ruler) / self.itemSpacing;
    attributes.zIndex = (NSInteger)(self.numberOfSections - (NSUInteger)attributes.position);
    [self.animator animate:self.collectionView attributes:attributes];
}

@end
