//
//  HMDevTools.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevTools.h"
#import "HMDevToolsEntryView.h"
#import "HMUtility.h"
#import "HMJSContext.h"
@implementation HMDevTools

+ (void)showInContext:(HMJSContext *)context {
    [HMDevToolsEntryView showWithContext:context];
}

@end
