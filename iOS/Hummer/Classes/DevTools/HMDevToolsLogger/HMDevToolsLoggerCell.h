//
//  HMDevToolsLoggerCell.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>
#import "HMDevToolsLogger.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsLoggerCell : UITableViewCell

- (void)renderCellWithLogger:(HMDevToolsLogger *)logger;

@end

NS_ASSUME_NONNULL_END
