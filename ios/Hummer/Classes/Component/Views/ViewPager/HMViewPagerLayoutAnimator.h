//
//  HMViewPagerLayoutAnimator.h
//  Pods
//
//  Created by didi on 2020/10/14.
//

#ifndef HMViewPagerLayoutAnimator_h
#define HMViewPagerLayoutAnimator_h

#import <UIKit/UIKit.h>
#import "HMViewPagerLayoutAttributes.h"

@protocol HMViewPagerLayoutAnimator <NSObject>

- (void)animate:(UICollectionView *)collectionView attributes:(HMViewPagerLayoutAttributes *)attributes;

- (CGFloat)proposedInteritemSpacing:(CGSize)itemSize;

@end


#endif /* HMViewPagerLayoutAnimator_h */
