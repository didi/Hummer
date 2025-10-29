//
//  HMCAAnimation+Internal.h
//  Hummer
//
//  Created by didi on 2021/3/2.
//

#import "HMCAAnimation.h"
#import "HMBaseExecutorProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMCAAnimation ()

@property (nonatomic, copy) HMFuncCallback startBlock;
@property (nonatomic, copy) HMFuncCallback stopBlock;


@property (nonatomic, strong)NSMutableArray <id<HMCAAnimationInfo>> *infos;
@property (nonatomic, strong)NSMutableArray <CAAnimation *> *animations;

/// 是否完整播完，在被打断是：isStop = YES, isFinish = NO;
@property (nonatomic, assign)BOOL isFinish;

/// 是否停止
@property (nonatomic, assign)BOOL isStop;

@end

NS_ASSUME_NONNULL_END
