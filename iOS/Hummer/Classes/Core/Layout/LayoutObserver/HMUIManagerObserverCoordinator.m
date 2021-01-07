//
//  HMUIManagerObserverCoordinator.m
//  Expecta
//
//  Created by didi on 2020/12/17.
//

#import "HMUIManagerObserverCoordinator.h"

@implementation HMUIManagerObserverCoordinator {
    
    NSHashTable<id<HMUIManagerObserver>> *_observers;
}

- (instancetype)init {
    if (self = [super init]) {
        
        _observers = [[NSHashTable alloc] initWithOptions:NSHashTableWeakMemory capacity:0];
    }
    
    return self;
}

- (void)addObserver:(id<HMUIManagerObserver>)observer {
    
    [self->_observers addObject:observer];
}

- (void)removeObserver:(id<HMUIManagerObserver>)observer {
    
    [self->_observers removeObject:observer];
}

#pragma mark - HMUIManagerObserver

- (void)uiManagerWillPerformLayout:(HMUIManager *)manager {
    
    for (id<HMUIManagerObserver> observer in _observers) {
        if ([observer respondsToSelector:@selector(uiManagerWillPerformLayout:)]) {
            [observer uiManagerWillPerformLayout:manager];
        }
    }
}

- (void)uiManagerDidPerformLayout:(HMUIManager *)manager {
    
    for (id<HMUIManagerObserver> observer in _observers) {
        if ([observer respondsToSelector:@selector(uiManagerDidPerformLayout:)]) {
            [observer uiManagerDidPerformLayout:manager];
        }
    }
}

- (void)uiManagerWillPerformMounting:(HMUIManager *)manager {
    
    for (id<HMUIManagerObserver> observer in _observers) {
        if ([observer respondsToSelector:@selector(uiManagerWillPerformMounting:)]) {
            [observer uiManagerWillPerformMounting:manager];
        }
    }
}



- (void)uiManagerDidPerformMounting:(HMUIManager *)manager{
    
    for (id<HMUIManagerObserver> observer in _observers) {
        if ([observer respondsToSelector:@selector(uiManagerDidPerformMounting:)]) {
            [observer uiManagerDidPerformMounting:manager];
        }
    }
}

@end
