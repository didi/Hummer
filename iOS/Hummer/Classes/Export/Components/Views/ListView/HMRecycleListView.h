//
//  HMRecycleListView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
typedef void(^HMListScrollEvent)(NSString *event, NSDictionary *params);
@interface HMRecycleListView : UICollectionView

- (instancetype)initWithFrame:(CGRect)frame NS_DESIGNATED_INITIALIZER;

- (nullable instancetype)initWithCoder:(NSCoder *)coder NS_DESIGNATED_INITIALIZER;

@property (nonatomic, copy) HMListScrollEvent scrollEvent;
@end
NS_ASSUME_NONNULL_END
