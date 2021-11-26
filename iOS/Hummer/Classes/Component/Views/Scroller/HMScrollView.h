//
//  HMScrollView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSUInteger, HMScrollDirection) {
    HMScrollDirectionVertical,
    HMScrollDirectionHorizontal
};

@interface HMScrollView : UIScrollView

@property (nonatomic,assign) HMScrollDirection scrollDirection;

@end

@interface HMVerticalScrollView : HMScrollView

@end

@interface HMHorizontalScrollView : HMScrollView

@end
