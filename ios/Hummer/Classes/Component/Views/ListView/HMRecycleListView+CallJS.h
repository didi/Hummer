//
//  HMRecycleListView+CallJS.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "HMRecycleListView.h"
#import "HMExportManager.h"
#import <Hummer/HMJSCExecutor.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRecycleListView (CallJS)

@property (nonatomic, copy, getter=getCellTypeCallback, setter=setCellTypeCallback:) HMClosureType cellTypeCallback;
@property (nonatomic, copy, getter=getDidViewCreated, setter=setDidViewCreated:) HMClosureType didViewCreated;
@property (nonatomic, copy, getter=getDidUpadte, setter=setDidUpadte:) HMClosureType didUpdate;

@end

NS_ASSUME_NONNULL_END
