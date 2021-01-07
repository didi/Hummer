//
//  HMRecycleListViewListLayout.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListViewListLayout.h"

#import "HMListLayoutAttributes.h"

@interface HMRecycleListViewListLayout ()
@property (strong, nonatomic) NSMutableDictionary *preferredItemAttributes;
@property (strong, nonatomic) NSMutableDictionary *allItemAttributes;
@property (assign, nonatomic) CGFloat mainDimintion;
@property (assign, nonatomic) CGSize estimateSize;
@end

@implementation HMRecycleListViewListLayout

- (instancetype)init {
    self = [super init];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (instancetype)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (void)commonInit {
    if (UICollectionViewScrollDirectionVertical == self.scrollDirection) {
        CGFloat width = [UIScreen mainScreen].bounds.size.width;
        self.estimateSize = CGSizeMake(width, 44.0);
    } else {
        CGFloat height = [UIScreen mainScreen].bounds.size.height;
        self.estimateSize = CGSizeMake(44.0, height);
    }
    self.minimumLineSpacing = 0.0;
}

#pragma mark - hook layout process

- (void)prepareLayout {
    [super prepareLayout];
    [self calculateLayoutInfo];
}

- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect {
    NSMutableArray *layoutAttributesForElementsInRect = [NSMutableArray array];
    [self.allItemAttributes.allValues enumerateObjectsUsingBlock:^(HMListLayoutAttributes *layoutAttributes,
                                                                   NSUInteger idx,
                                                                   BOOL *stop) {
        if (CGRectIntersectsRect(rect, layoutAttributes.frame)) {
            [layoutAttributesForElementsInRect addObject:layoutAttributes];
        }
    }];
    return layoutAttributesForElementsInRect;
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath {
    return self.allItemAttributes[indexPath];
}

- (CGSize)collectionViewContentSize {
    CGSize contentSize = self.collectionView.bounds.size;
    if (self.scrollDirection == UICollectionViewScrollDirectionHorizontal) {
        contentSize.width = self.mainDimintion;
        contentSize.height = contentSize.height - self.sectionInset.top - self.sectionInset.bottom;
    }else {
        contentSize.width = contentSize.width - self.sectionInset.left -self.sectionInset.right;
        contentSize.height = self.mainDimintion;
    }
    return contentSize;
}

- (BOOL)shouldInvalidateLayoutForPreferredLayoutAttributes:(UICollectionViewLayoutAttributes *)preferredAttributes
                                    withOriginalAttributes:(UICollectionViewLayoutAttributes *)originalAttributes {
    if (CGSizeEqualToSize(preferredAttributes.size, originalAttributes.size)) {
        return NO;
    }
    if (preferredAttributes.representedElementCategory == UICollectionElementCategoryCell) {
        self.preferredItemAttributes[preferredAttributes.indexPath] = preferredAttributes;
    }
    return YES;
}

//- (UICollectionViewLayoutInvalidationContext *)invalidationContextForPreferredLayoutAttributes:(UICollectionViewLayoutAttributes *)preferredAttributes
//                                                                        withOriginalAttributes:(UICollectionViewLayoutAttributes *)originalAttributes {
//    UICollectionViewLayoutInvalidationContext *context = [super invalidationContextForPreferredLayoutAttributes:preferredAttributes withOriginalAttributes:originalAttributes];
//    [context invalidateEverything];
//    return context;
//}

- (BOOL)shouldInvalidateLayoutForBoundsChange:(CGRect)newBounds {
    return !(CGSizeEqualToSize(newBounds.size, self.collectionView.frame.size));
}

+ (Class)layoutAttributesClass {
    return [HMRecycleListViewListLayout class];
}

#pragma mark - Private
  
- (void)calculateLayoutInfo {
    BOOL isVertical = self.scrollDirection == UICollectionViewScrollDirectionVertical;
    CGFloat minimumLineSpacing = self.minimumLineSpacing;
    CGFloat leftInset = self.sectionInset.left;
    CGFloat rightInset = self.sectionInset.right;
    CGFloat topInset = self.sectionInset.top;
    CGFloat bottomInset = self.sectionInset.bottom;
    NSInteger itemCount = [self.collectionView numberOfItemsInSection:0];
    
    self.mainDimintion = 0.0;
    CGFloat xOffset = leftInset;
    CGFloat yOffset = topInset;
    CGFloat itemWidth = 0;
    CGFloat itemHeight = 0;
    
    [self.allItemAttributes removeAllObjects];
    for (NSUInteger item = 0; item < itemCount; item++) {
        NSIndexPath *indexPath = [NSIndexPath indexPathForItem:item inSection:0];
        if (self.preferredItemAttributes[indexPath]) {
            HMListLayoutAttributes *preferredAttributes = self.preferredItemAttributes[indexPath];
            itemWidth = preferredAttributes.size.width;
            itemHeight = preferredAttributes.size.height;
        }else {
            if (isVertical) {
                itemWidth = CGRectGetWidth(self.collectionView.frame) - (leftInset + rightInset);
                itemHeight = self.estimateSize.height;
            }else {
                itemWidth = self.estimateSize.width;
                itemHeight = CGRectGetHeight(self.collectionView.frame) - (topInset + bottomInset);
            }
        }
        if (item!=0) {
            if (isVertical) {
                yOffset += minimumLineSpacing;
            }else {
                xOffset += minimumLineSpacing;
            }
        }
        
        HMListLayoutAttributes *cellAttributes = [HMListLayoutAttributes layoutAttributesForCellWithIndexPath:indexPath];
        cellAttributes.scrollDirection = self.scrollDirection;
        cellAttributes.frame = CGRectMake(xOffset, yOffset, itemWidth, itemHeight);
        self.allItemAttributes[indexPath] = cellAttributes;
        
        if (isVertical) {
            yOffset += itemHeight;
        }else {
            xOffset += itemWidth;
        }
    }
    self.mainDimintion += isVertical ? bottomInset + yOffset : rightInset + xOffset;
}

- (NSMutableDictionary *)allItemAttributes {
    if (!_allItemAttributes) {
        _allItemAttributes = [NSMutableDictionary dictionary];
    }
    return _allItemAttributes;
}

- (NSMutableDictionary *)preferredItemAttributes {
    if (!_preferredItemAttributes) {
        _preferredItemAttributes = [NSMutableDictionary dictionary];
    }
    return _preferredItemAttributes;
}

@end
