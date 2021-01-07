//
//  HMNavigatorSchemes.h
//  Hummer
//
//  Created by didi on 2020/7/13.
//

#import <Foundation/Foundation.h>
#import "HMPageBuilder.h"

NS_ASSUME_NONNULL_BEGIN

typedef NSString * HMNavigatorScheme;
typedef NSString * HMNavigatorNamespace;
typedef NSDictionary<HMNavigatorScheme, HMPageBuilder> * HMNavigatorSchemePair;

@interface HMNavigatorSchemes : NSObject

@property (nullable, copy, nonatomic) NSMutableDictionary<HMNavigatorNamespace, NSMutableSet<HMNavigatorSchemePair> *> *mapper;

- (void)addScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace builder:(HMPageBuilder)builder;

- (HMPageBuilder)builderForScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace;

- (void)removeScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace;

@end

NS_ASSUME_NONNULL_END
