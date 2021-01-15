//
//  HMRecycleListView+CallJS.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListView.h"
#import "HMExportManager.h"
#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRecycleListView (CallJS)

@property (nonatomic, copy, getter=getCellTypeCallback, setter=setCellTypeCallback:) HMFuncCallback cellTypeCallback;
@property (nonatomic, copy, getter=getDidViewCreated, setter=setDidViewCreated:) HMFuncCallback didViewCreated;
@property (nonatomic, copy, getter=getDidUpadte, setter=setDidUpadte:) HMFuncCallback didUpdate;

@end

NS_ASSUME_NONNULL_END
