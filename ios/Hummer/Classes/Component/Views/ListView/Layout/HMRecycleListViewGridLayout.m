//
//  HMRecycleListViewGridLayout.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListViewGridLayout.h"

@implementation HMRecycleListViewGridLayout

- (void)setNumberOfColumns:(NSUInteger)columnCount {
    if (_numberOfColumns != columnCount) {
        _numberOfColumns = columnCount;
        [self invalidateLayout];
    }
}

- (void)setMinimumInteritemSpacing:(CGFloat)minimumInteritemSpacing {
    if (self.minimumInteritemSpacing != minimumInteritemSpacing) {
        [super setMinimumInteritemSpacing:minimumInteritemSpacing];
        [self invalidateLayout];
    }
}

- (void)setMinimumLineSpacing:(CGFloat)minimumLineSpacing {
    if (self.minimumLineSpacing != minimumLineSpacing) {
        [super setMinimumLineSpacing:minimumLineSpacing];
        [self invalidateLayout];
    }
}

- (void)prepareLayout {
    [self calculateItemSize];
    [super prepareLayout];
}

- (void)calculateItemSize {
    CGFloat totalWidth = self.collectionView.bounds.size.width - self.sectionInset.left - self.sectionInset.right;
    CGFloat itemWidth = (totalWidth - self.minimumInteritemSpacing*(self.numberOfColumns-1))/self.numberOfColumns;
    itemWidth = floor(itemWidth);
    self.itemSize = CGSizeMake(itemWidth, itemWidth);
}

@end
