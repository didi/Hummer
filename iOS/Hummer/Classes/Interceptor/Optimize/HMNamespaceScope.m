//
//  HMNamespaceScope.m
//  Hummer
//
//  Created by didi on 2021/7/5.
//

#import "HMNamespaceScope.h"

@implementation HMNamespaceTemporary

@end

@interface HMNamespace ()

@property (nonatomic, weak) HMNamespaceTemporary *temporary;
@end

@implementation HMNamespace
static HMNamespace *__namespace = nil;

+ (void)initialize {
    __namespace = [HMNamespace new];
}

+ (void)openScope:(HMNamespaceTemporary *)namepace {
    __namespace.temporary = namepace;
}

+ (NSString *)namespace{
    return __namespace.temporary.name;
}
@end
