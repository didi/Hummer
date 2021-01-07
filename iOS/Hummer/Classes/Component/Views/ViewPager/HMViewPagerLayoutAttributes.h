//
//  HMViewPagerLayoutAttributes.h
//  HummerX
//
//  Created by didi on 2020/10/14.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMViewPagerLayoutAttributes : UICollectionViewLayoutAttributes

@property (nonatomic, strong, nullable) UIView *contentView;

@property (nonatomic) UICollectionViewScrollDirection scrollDirection;

@property (nonatomic) CGFloat startOffset;

@property (nonatomic) CGFloat middleOffset;

@property (nonatomic) CGFloat endOffset;

@property (nonatomic) CGFloat position;

@end

NS_ASSUME_NONNULL_END
