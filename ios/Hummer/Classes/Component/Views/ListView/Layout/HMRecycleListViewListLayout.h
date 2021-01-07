//
//  HMRecycleListViewListLayout.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRecycleListViewListLayout : UICollectionViewLayout

//默认垂直
@property (nonatomic) UICollectionViewScrollDirection scrollDirection;

// 默认 0.0
@property (nonatomic, assign) CGFloat minimumInteritemSpacing;

// 默认 0.0
@property (nonatomic, assign) CGFloat minimumLineSpacing;

// 内边距
@property (nonatomic, assign) UIEdgeInsets sectionInset;

@end

NS_ASSUME_NONNULL_END
