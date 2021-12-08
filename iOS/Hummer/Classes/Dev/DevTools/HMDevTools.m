//
//  HMDevTools.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevTools.h"
#import "HMDevToolsEntryView.h"

@implementation HMDevTools

+ (void)showInContext:(HMJSContext *)context {
    HMDevToolsEntryView *window = HMDevToolsEntryView.entryWindow;
    [window showWithContext:context];
}

@end
