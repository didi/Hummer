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
@property (nonatomic, copy) NSIndexPath *indexPath;

- (void)setImageURL:(NSString *)url;

@end

NS_ASSUME_NONNULL_END
