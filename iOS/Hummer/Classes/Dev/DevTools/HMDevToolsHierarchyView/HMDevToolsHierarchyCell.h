//
//  HMDevToolsHierarchyCell.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsHierarchyCell : UITableViewCell

@property (nonatomic) NSInteger viewDepth;
@property (nonatomic) UIColor *randomColorTag;
@property (nonatomic) UIColor *indicatedViewColor;

@end

NS_ASSUME_NONNULL_END
