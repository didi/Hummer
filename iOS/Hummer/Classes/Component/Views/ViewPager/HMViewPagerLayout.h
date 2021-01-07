//
//  HMViewPagerLayout.h
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import <UIKit/UIKit.h>
#import "HMViewPagerLayoutAnimator.h"

NS_ASSUME_NONNULL_BEGIN

@class HMViewPagerLayout;

@protocol HMViewPagerLayoutProvider <NSObject>

- (NSUInteger)numberOfSections:(HMViewPagerLayout *)layout;

- (NSUInteger)numberOfItemsInSection:(NSUInteger)section layout:(HMViewPagerLayout *)layout;

- (NSUInteger)currentIndexForLayout:(HMViewPagerLayout *)layout;

- (BOOL)isInfinite;

@end

@interface HMViewPagerLayout : UICollectionViewFlowLayout

@property (nonatomic, strong) id<HMViewPagerLayoutAnimator> animator;

@property (nonatomic, weak) id<HMViewPagerLayoutProvider> provider;

@property (nonatomic) CGFloat leadingSpacing;

@property (nonatomic, readonly) CGFloat itemSpacing;

- (void)forceInvalidate;

- (NSIndexPath *)indexPathForItem:(NSUInteger)item;

- (CGPoint)contentOffsetForIndexPath:(NSIndexPath *)indexPath;

- (void)scrollToCurrentIndex:(BOOL)animated;

@end

NS_ASSUME_NONNULL_END
