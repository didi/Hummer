//
//  HMDevToolsMenuItem.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsMenuItem.h"

@implementation HMDevToolsMenuItem

- (instancetype)initWithMenuItemWithTitle:(NSString *)title container:(nonnull HMDevToolsMenuViewControler)container {
    if (self = [super init]) {
        _title = title;
        _container = container;
    }
    return self;
}

+ (instancetype)menuItemWithTitle:(NSString *)title container:(nonnull HMDevToolsMenuViewControler)container {
    return [[self alloc] initWithMenuItemWithTitle:title container:container];
}

@end
