//
//  HMViewPagerCell.h
//  Hummer
//
//  Created by didi on 2020/10/14.
//

#import <UIKit/UIKit.h>

@class HMBaseValue;

NS_ASSUME_NONNULL_BEGIN

@interface HMViewPagerCell : UICollectionViewCell

@property (nonatomic, nullable, strong) HMBaseValue *contentViewValue;

- (void)setImageURL:(NSString *)url;

- (void)setJSView:(UIView *)view;

@end

NS_ASSUME_NONNULL_END
