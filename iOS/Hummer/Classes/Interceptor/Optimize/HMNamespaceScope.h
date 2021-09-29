//
//  HMNamespaceScope.h
//  Hummer
//
//  Created by didi on 2021/7/5.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN


@interface HMNamespaceTemporary : NSObject

@property (nonatomic, strong) NSString *name;
@end

@interface HMNamespace : NSObject

+ (void)openScope:(HMNamespaceTemporary *)namepace;
+ (NSString *)namespace;
@end

/**
 * 通常 Namespace 由 js(currentExecutor) 传递。
 * 但某些场景下，由native出发的调用也需要 namespace 区分。
 * 不支持嵌套
 */

#define HMNamespaceScopeInJSContext(code) HMNamespaceScope([HMJSGlobal.globalObject currentContext:HMCurrentExecutor].nameSpace, code)

#define HMNamespaceScope(namespace, code) {\
HMNamespaceTemporary *temp = [HMNamespaceTemporary new];\
temp.name = namespace;\
[HMNamespace openScope:temp];\
code\
}

NS_ASSUME_NONNULL_END
