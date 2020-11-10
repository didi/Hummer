//
//  HMJSCExecutor+Private.h
//  Pods
//
//  Created by 唐佳诚 on 2020/8/7.
//

#import <Hummer/HMJSCExecutor.h>
#import <JavaScriptCore/JavaScriptCore.h>

NS_ASSUME_NONNULL_BEGIN

@class HMJSCStrongValue;

@interface HMJSCExecutor (Private)

@property (nonatomic, assign) JSGlobalContextRef contextRef;

@property (nonatomic, nullable, copy) NSHashTable<HMJSCStrongValue *> *strongValueReleasePool;

@end

NS_ASSUME_NONNULL_END
