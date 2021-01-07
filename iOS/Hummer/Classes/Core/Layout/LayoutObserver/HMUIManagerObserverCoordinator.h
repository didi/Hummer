//
//  HMUIManagerObserverCoordinator.h
//  Expecta
//
//  Created by didi on 2020/12/17.
//

#import <Foundation/Foundation.h>
#import "HMUIManagerObserver.h"
NS_ASSUME_NONNULL_BEGIN

@interface HMUIManagerObserverCoordinator : NSObject<HMUIManagerObserver>


- (void)addObserver:(id<HMUIManagerObserver>)observer;


- (void)removeObserver:(id<HMUIManagerObserver>)observer;
@end

NS_ASSUME_NONNULL_END
