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

@property (nonatomic, assign)BOOL isFinish;
@end

NS_ASSUME_NONNULL_END
