//
//  HMRecycleListViewListLayout.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRecycleListViewWaterfallLayout : UICollectionViewLayout

// 默认 2 列
@property (nonatomic, assign) NSUInteger numberOfColumns;

// 默认 8.0
@property (nonatomic, assign) CGFloat minimumInteritemSpacing;

// 默认 8.0
@property (nonatomic, assign) CGFloat minimumLineSpacing;

// 内边距
@property (nonatomic, assign) UIEdgeInsets sectionInset;

@end

NS_ASSUME_NONNULL_END
