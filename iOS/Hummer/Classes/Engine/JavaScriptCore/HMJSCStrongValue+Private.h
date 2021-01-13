//
//  HMJSCStrongValue+Private.h
//  Pods
//
//  Created by 唐佳诚 on 2020/9/27.
//

#import <Hummer/HMJSCStrongValue.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface HMJSCStrongValue (Private)

- (void)forceUnprotectWithGlobalContextRef:(nullable JSGlobalContextRef)globalContextRef;

@end

