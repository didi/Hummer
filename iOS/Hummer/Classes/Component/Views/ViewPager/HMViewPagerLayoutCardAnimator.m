//
//  HMViewPagerLayoutCardAnimator.m
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import "HMViewPagerLayoutCardAnimator.h"

@implementation HMViewPagerLayoutCardAnimator

- (instancetype)init
{
    self = [super init];
    if (self) {
        _minScale = 0.65;
        _minAlpha = 0.6;
    }
    return self;
}

- (void)animate:(UICollectionView *)collectionView attributes:(HMViewPagerLayoutAttributes *)attributes
{
    if (!collectionView) {
        return;
    }
    CGFloat position = attributes.position;
    CGFloat scale = MAX(1 - (1-self.minScale) * ABS(position), self.minScale);
    CGAffineTransform transform = CGAffineTransformMakeScale(scale, scale);
    CGFloat alpha = (self.minAlpha + (1 - ABS(position)) * (1 - self.minAlpha));
    CGFloat zIndex = (1-ABS(position)) * 10;
    attributes.transform = transform;
    attributes.alpha = alpha;
    attributes.zIndex = (NSInteger)zIndex;
}

- (CGFloat)proposedInteritemSpacing:(CGSize)itemSize
{
    if (CGSizeEqualToSize(CGSizeZero, itemSize)) {
        return 0;
    }
    return itemSize.width * -self.minScale * 0.2;
}

@end
