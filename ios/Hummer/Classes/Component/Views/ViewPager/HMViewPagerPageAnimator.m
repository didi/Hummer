//
//  HMViewPagerPageAnimator.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMViewPagerPageAnimator.h"
#import "HMViewPagerLayoutAttributes.h"

@implementation HMViewPagerPageAnimator

- (instancetype)init
{
    self = [super init];
    if (self) {
        _scaleRate = 0.7;
        _minAlpha = 0.4;
        _itemSpacing = 0.4;
    }
    return self;
}

- (void)animate:(UICollectionView *)collectionView attributes:(HMViewPagerLayoutAttributes *)attributes
{
    CGFloat position = attributes.middleOffset;
    CGFloat scaleFactor = self.scaleRate - 0.1 * ABS(position);
    CGAffineTransform scaleTransform = CGAffineTransformMakeScale(scaleFactor, scaleFactor);
    CGFloat width = collectionView.frame.size.width;
    CGFloat translateX = -(width * self.itemSpacing * position);
    CGAffineTransform translationTransform = CGAffineTransformMakeTranslation(translateX, 0);

    attributes.transform = CGAffineTransformConcat(translationTransform, scaleTransform);
    attributes.alpha = 1.0 - ABS(position) + self.minAlpha;
}

- (CGFloat)proposedInteritemSpacing:(CGSize)itemSize
{
    return 0;
}

@end
