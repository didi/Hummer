//
//  HMScrollView.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HMViewLayoutPass.h"
typedef NS_ENUM(NSUInteger, HMScrollDirection) {
    HMScrollDirectionVertical,
    HMScrollDirectionHorizontal
};
@interface HMScrollView : UIScrollView<HMViewLayoutPass>

@property (nonatomic,assign) HMScrollDirection scrollDirection;
@end

