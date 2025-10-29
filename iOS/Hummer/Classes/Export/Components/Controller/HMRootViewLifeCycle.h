//
//  HMJSComponentLifeCycle.h
//  Hummer
//
//  Created by didi on 2021/12/13.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMBaseValue.h>

NS_ASSUME_NONNULL_BEGIN

@interface HMRootViewLifeCycle : NSObject

- (instancetype)init NS_UNAVAILABLE;

+ (HMRootViewLifeCycle *)create;

- (void)onAppear;
- (void)onDisappear;
- (void)onDestroy;

- (void)setJSValue:(HMBaseValue *)value;
@end

NS_ASSUME_NONNULL_END
