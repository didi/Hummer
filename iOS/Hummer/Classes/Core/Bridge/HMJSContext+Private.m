//
//  HMJSContext+Private.m
//  Hummer
//
//  Created by GY on 2025/4/17.
//

#import "HMJSContext+Private.h"
#import "UIView+HMDom.h"
#import "UIView+HMRenderObject.h"
#import "HMJSGlobal.h"
#import <Hummer/HMConfigEntryManager.h>
#ifdef DEBUG
#if __has_include(<HMDevTools/HMDevTools.h>)
#import <HMDevTools/HMDevTools.h>
#endif
#endif

@implementation HMJSContext (Private)

+ (NSString *)getNamespace {
    return [self getCurrentNamespaceWithDefault];
}
@end
