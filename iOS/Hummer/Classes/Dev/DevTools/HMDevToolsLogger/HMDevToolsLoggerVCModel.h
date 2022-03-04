//
//  HMDevToolsLoggerVCModel.h
//  Hummer
//
//  Created by didi on 2022/2/7.
//

#import <Foundation/Foundation.h>
#import "HMDevToolsLoggerViewController.h"
#import "HMDevToolsLogger.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMDevToolsLoggerVCModel : NSObject
@property (nonatomic, weak) HMDevToolsLoggerViewController *vc;

@property (nonatomic, strong) NSMutableArray<HMDevToolsLogger *> *dataArray;

- (instancetype)initWithVC:(HMDevToolsLoggerViewController *)vc;
- (void)reset;
@end

@interface HMDevToolsCallTreeVCModel : HMDevToolsLoggerVCModel
@end

NS_ASSUME_NONNULL_END
