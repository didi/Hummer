//
//  HMNavigatorSchemes.m
//  Hummer
//
//  Created by didi on 2020/7/13.
//

#import "HMNavigatorSchemes.h"
#import "HMLogger.h"

@implementation HMNavigatorSchemes

static HMNavigatorNamespace const HMNavigatorNamespaceDefault = @"HMNavigatorNamespaceDefault";

- (instancetype)init
{
    self = [super init];
    if (self) {
        _mapper = [NSMutableDictionary dictionary];
    }
    return self;
}

- (void)addScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace builder:(HMPageBuilder)builder;
{
    if (!scheme || !builder) {
        HMLogDebug(@"参数为nil scheme:%@, nameSpace:%@, builder:%@", scheme, nameSpace, builder);
        return;
    }
    NSString *ns = nameSpace ? : HMNavigatorNamespaceDefault;
    NSMutableSet<HMNavigatorSchemePair> *schemes = self.mapper[ns];
    if (!schemes) {
        schemes = [NSMutableSet set];
        self.mapper[ns] = schemes;
    }
    HMNavigatorSchemePair pair = [schemes objectsPassingTest:^BOOL(HMNavigatorSchemePair obj, BOOL *stop) {
        return [obj.allKeys.firstObject isEqualToString:scheme];
    }].anyObject;
    if (pair) {
        [schemes removeObject:pair];
    }
    [schemes addObject:@{ scheme : builder }];
}

- (HMPageBuilder)builderForScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace
{
    if (!scheme) {
        HMLogDebug(@"参数为nil scheme:%@, nameSpace:%@", scheme, nameSpace);
        return nil;
    }
    
    NSString *ns = nameSpace ? : HMNavigatorNamespaceDefault;
    NSMutableSet<HMNavigatorSchemePair> *schemes = self.mapper[ns];
    if (!schemes || schemes.count <= 0) {
        return nil;
    }
    
    HMNavigatorSchemePair pair = [schemes objectsPassingTest:^BOOL(HMNavigatorSchemePair obj, BOOL *stop) {
        return [obj.allKeys.firstObject isEqualToString:scheme];
    }].anyObject;
    if (!pair) {
        return nil;
    }
    
    return pair[scheme];
}

- (void)removeScheme:(NSString *)scheme nameSpace:(nullable NSString *)nameSpace
{
    if (!scheme) {
        HMLogDebug(@"参数为nil scheme:%@, nameSpace:%@", scheme, nameSpace);
        return;
    }
    
    NSString *ns = nameSpace ? : HMNavigatorNamespaceDefault;
    NSMutableSet<HMNavigatorSchemePair> *schemes = self.mapper[ns];
    if (!schemes || schemes.count <= 0) {
        return;
    }
    HMNavigatorSchemePair pair = [schemes objectsPassingTest:^BOOL(HMNavigatorSchemePair obj, BOOL *stop) {
        return [obj.allKeys.firstObject isEqualToString:scheme];
    }].anyObject;
    if (pair) {
        [schemes removeObject:pair];
    }
}

@end
