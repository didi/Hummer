//
//  HMRecycleListViewWaterfallLayout.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListViewWaterfallLayout.h"

#import "HMWaterfallLayoutAttributes.h"

@interface HMRecycleListViewWaterfallLayout ()

@property (strong, nonatomic) NSMutableArray *columnHeights;
@property (assign, nonatomic) CGFloat estimateHeight;
@property (strong, nonatomic) NSMutableDictionary *preferredItemAttributes;
@property (strong, nonatomic) NSMutableDictionary *allItemAttributes;

@end

@implementation HMRecycleListViewWaterfallLayout

- (instancetype)init {
    self = [super init];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (id)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (void)commonInit {
    _numberOfColumns = 2;
    self.estimateHeight = 100;
    self.minimumInteritemSpacing = 8.0;
    self.minimumLineSpacing = 8.0;
}

#pragma mark - Layout  Flow

- (void)prepareLayout {
    [super prepareLayout];
    [self resetColumnHeights];
    [self calculateLayoutInfo];
}

- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect {
    NSMutableArray *layoutAttributesForElementsInRect = [NSMutableArray array];
    
    [self.allItemAttributes.allValues enumerateObjectsUsingBlock:^(HMWaterfallLayoutAttributes *layoutAttributes,
                                                                   NSUInteger idx,
                                                                   BOOL *stop) {
        if (CGRectIntersectsRect(rect, layoutAttributes.frame)) {
            [layoutAttributesForElementsInRect addObject:layoutAttributes];
        }
    }];
    
    [layoutAttributesForElementsInRect enumerateObjectsUsingBlock:^(HMWaterfallLayoutAttributes * _Nonnull layoutAttributes,
                                                                    NSUInteger idx,
                                                                    BOOL * _Nonnull stop) {
        layoutAttributes.rowWidth = [self rowWidth];
        layoutAttributes.columnWidth = [self columnWidth];
    }];
    
    return layoutAttributesForElementsInRect;
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath {
    return self.allItemAttributes[indexPath];
}

- (CGSize)collectionViewContentSize {
    CGSize contentSize = self.collectionView.bounds.size;
    contentSize.width = contentSize.width - self.sectionInset.left - self.sectionInset.right;
    contentSize.height = [[self largestColumnHeight] floatValue];
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
    return [HMWaterfallLayoutAttributes class];
}

#pragma mark Private - Reset & Pre Caculate layout info

- (void)resetColumnHeights {
    [@[self.allItemAttributes, self.columnHeights] enumerateObjectsUsingBlock:^(id obj,
                                                                                NSUInteger idx,
                                                                                BOOL *stop) {
        [obj removeAllObjects];
    }];
    
    NSUInteger numberOfColumns = self.numberOfColumns;
    NSMutableArray *columnHeights = [NSMutableArray arrayWithCapacity:numberOfColumns];
    
    for (NSUInteger column = 0; column < numberOfColumns; column++) {
        [columnHeights addObject:@(0)];
    }
    
    self.columnHeights = columnHeights;
}

- (void)calculateLayoutInfo {
    NSUInteger numberOfColumns = self.numberOfColumns;
    
    CGFloat topInset = self.sectionInset.top;
    for (NSUInteger column = 0; column < numberOfColumns; column++) {
        [self appendHeight:topInset toColumn:column];
    }
    
    CGFloat leftInset = self.sectionInset.left;
    CGFloat rightInset = self.sectionInset.right;
    CGFloat cellContentAreaWidth = CGRectGetWidth(self.collectionView.frame) - (leftInset + rightInset);
    CGFloat numberOfGutters = numberOfColumns - 1;
    CGFloat singleGutterWidth = self.minimumInteritemSpacing;
    CGFloat totalGutterWidth = singleGutterWidth*numberOfGutters;
    CGFloat minimumLineSpacing = self.minimumLineSpacing;
    NSInteger itemCount = [self.collectionView numberOfItemsInSection:0];
    
    CGFloat columnWidth = (cellContentAreaWidth - totalGutterWidth)/numberOfColumns;
    
    CGFloat xOffset;
    CGFloat yOffset;
    CGFloat itemWidth;
    CGFloat itemHeight;
    
    for (NSUInteger item = 0; item < itemCount; item++) {
        NSIndexPath *indexPath = [NSIndexPath indexPathForItem:item inSection:0];
        if (self.preferredItemAttributes[indexPath]) {
            HMWaterfallLayoutAttributes *preferredAttributes = self.preferredItemAttributes[indexPath];
            itemWidth = preferredAttributes.size.width;
            itemHeight = preferredAttributes.size.height;
            NSUInteger shortestColumnIndex = [self shortestColumnIndex];
            NSAssert(shortestColumnIndex != NSNotFound, @"can't find shortestColumnIndex");
            xOffset = leftInset + ((itemWidth + singleGutterWidth)*shortestColumnIndex);
            yOffset = [self shortestColumnHeight].floatValue;
            CGFloat height = itemHeight + minimumLineSpacing;
            [self appendHeight:height
                      toColumn:shortestColumnIndex];
        } else {
            itemWidth = columnWidth;
            itemHeight = self.estimateHeight;
            NSUInteger shortestColumnIndex = [self shortestColumnIndex];
            NSAssert(shortestColumnIndex != NSNotFound, @"can't find shortestColumnIndex");
            xOffset = leftInset + ((columnWidth + singleGutterWidth)*shortestColumnIndex);
            yOffset = [self shortestColumnHeight].floatValue;
            CGFloat height = itemHeight + minimumLineSpacing;
            [self appendHeight:height
                      toColumn:shortestColumnIndex];
        }
        
        HMWaterfallLayoutAttributes *cellAttributes = [HMWaterfallLayoutAttributes layoutAttributesForCellWithIndexPath:indexPath];
        cellAttributes.frame = CGRectMake(xOffset, yOffset, itemWidth, itemHeight);
        cellAttributes.rowWidth = cellContentAreaWidth;
        cellAttributes.columnWidth = columnWidth;
        [self.allItemAttributes setObject:cellAttributes forKey:indexPath];
    }
    
    CGFloat bottomInset = self.sectionInset.bottom;
    for (NSUInteger column = 0; column < numberOfColumns; column++) {
        [self appendHeight:bottomInset toColumn:column];
    }
}

- (void)appendHeight:(CGFloat)height
            toColumn:(NSUInteger)column {
    NSAssert(column < self.columnHeights.count, @"invalid column");
    CGFloat existing = [self.columnHeights[column] floatValue];
    CGFloat updated = existing + height;
    self.columnHeights[column] = @(updated);
}

#pragma mark Private Getter & Setter

- (void)setNumberOfColumns:(NSUInteger)columnCount {
    NSAssert(columnCount > 0, @"column count can't be less than 1");
    if (_numberOfColumns != columnCount) {
        _numberOfColumns = columnCount;
        [self invalidateLayout];
    }
}

- (NSMutableArray *)columnHeights {
    if (!_columnHeights) {
        _columnHeights = [NSMutableArray array];
    }
    return _columnHeights;
}

- (NSNumber *)shortestColumnHeight {
    return [self.columnHeights valueForKeyPath:@"@min.self"];
}

- (NSUInteger)shortestColumnIndex {
    NSNumber *shortestColumnHeight = [self shortestColumnHeight];
    return [self.columnHeights indexOfObject:shortestColumnHeight];
}

- (NSNumber *)largestColumnHeight {
    return [self.columnHeights valueForKeyPath:@"@max.self"];
}

- (CGFloat)columnWidth {
    NSUInteger numberOfColumns = self.numberOfColumns;
    CGFloat numberOfGutters = numberOfColumns - 1;
    CGFloat singleGutterWidth = self.minimumInteritemSpacing;
    CGFloat totalGutterWidth = singleGutterWidth*numberOfGutters;
    CGFloat columnWidth = ceilf((self.rowWidth - totalGutterWidth)/numberOfColumns);
    return columnWidth;
}

- (CGFloat)rowWidth {
    CGFloat rowWidth = CGRectGetWidth(self.collectionView.frame) - (self.sectionInset.left + self.sectionInset.right);
    return rowWidth;
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
