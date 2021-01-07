//
//  HummerWeakProxy.h
//  Expecta
//
//  Created by didi on 2020/11/30.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HummerWeakProxy : NSProxy
+ (instancetype)weakProxyForObject:(id)targetObject;

@end

NS_ASSUME_NONNULL_END
