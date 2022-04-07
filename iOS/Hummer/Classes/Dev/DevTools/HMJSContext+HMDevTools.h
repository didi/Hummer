//
//  HMJSContext+HMDevTools.h
//  Hummer
//
//  Created by didi on 2022/3/7.
//

#import <Hummer/Hummer.h>
#import <Hummer/HMDevToolsJSCallerExecutor.h>
NS_ASSUME_NONNULL_BEGIN

@interface HMJSContext (HMDevTools)

@property (nonatomic, strong) HMDevToolsJSCallerExecutor *hm_jsCallerInterceptor;
@end

NS_ASSUME_NONNULL_END
