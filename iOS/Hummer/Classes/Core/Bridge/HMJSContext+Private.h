//
//  HMJSContext+Private.h
//  Hummer
//
//  Created by GY on 2025/4/17.
//

#import "HMJSContext.h"

NS_ASSUME_NONNULL_BEGIN

@interface HMJSContext (Private)

+ (NSString *)getNamespace DEPRECATED_MSG_ATTRIBUTE("使用 getCurrentNamespaceWithDefault :代替");
@end

NS_ASSUME_NONNULL_END
