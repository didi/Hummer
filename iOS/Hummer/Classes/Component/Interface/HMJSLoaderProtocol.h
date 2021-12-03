//
//  HMJSLoaderProtocol.h
//  Hummer
//
//  Created by didi on 2021/7/6.
//

#import <Foundation/Foundation.h>
#import <Hummer/HMURLConvertible.h>

NS_ASSUME_NONNULL_BEGIN
typedef void (^HMJSLoaderCompleteBlock)(NSError * _Nullable error, NSString *_Nullable script);

@protocol HMJSLoader <NSObject>

/**
 * 由JS侧调用，自带namespace。
 * 在native侧主动被调用时，需要使用 HMNamespaceScope 传递 namespace。原因如下：
 * 目前很多组件(拦截器)的方法参数没有传递 namespace。要兼容老代码，需要借助 HMNamespaceScope 。
 */

+ (BOOL)loadWithSource:(id<HMURLConvertible>)source inJSBundleSource:(id<HMURLConvertible>)bundleSource  completion:(HMJSLoaderCompleteBlock)completion;

@end

NS_ASSUME_NONNULL_END
