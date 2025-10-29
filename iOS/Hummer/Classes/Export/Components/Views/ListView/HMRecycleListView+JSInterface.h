//
//  HMRecycleListView+JSInterface.h
//  Hummer
//
//  Created by GY on 2025/9/30.
//

#import "HMRecycleListView.h"
#import <Hummer/HMBaseExecutorProtocol.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRecycleListView ()
@property (nonatomic, copy) HMFuncCallback cellTypeCallback;
@property (nonatomic, copy) HMFuncCallback didViewCreated;
@property (nonatomic, copy) HMFuncCallback didUpdate;

- (void)refresh:(HMBaseValue *)countValue;
- (void)scrollToIndex:(HMBaseValue *)value;
- (void)scrollToX:(HMBaseValue *)xValue Y:(HMBaseValue *)yValue;
- (void)scrollByX:(HMBaseValue *)xValue Y:(HMBaseValue *)yValue;
@end

NS_ASSUME_NONNULL_END
