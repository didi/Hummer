//
//  HMDevToolsMenuItem.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsMenuItem.h"

@implementation HMDevToolsMenuItem

- (instancetype)initWithMenuItemWithTitle:(NSString *)title container:(nonnull HMDevToolsMenuViewControler)container handler:(dispatch_block_t)handler {
    if (self = [super init]) {
        _title = title;
        _container = container;
        _handler = handler;
    }
    return self;
}

+ (instancetype)menuItemWithTitle:(NSString *)title container:(nonnull HMDevToolsMenuViewControler)container {
    return [[self alloc] initWithMenuItemWithTitle:title container:container handler:NULL];
}

+ (instancetype)menuItemWithTitle:(NSString *)title container:(HMDevToolsMenuViewControler)container handler:(dispatch_block_t)handler {
    return [[self alloc] initWithMenuItemWithTitle:title container:container handler:handler];
}

@end
