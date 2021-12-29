//
//  HMDevToolsMenuItem.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <Foundation/Foundation.h>
#import "HMDevToolsViewControllerProtocol.h"

NS_ASSUME_NONNULL_BEGIN

@class HMJSContext;

typedef UIViewController<HMDevToolsViewControllerProtocol> * _Nonnull (^HMDevToolsMenuViewControler)(HMJSContext *context);

@interface HMDevToolsMenuItem : NSObject

@property (nonatomic, copy, readonly) NSString *title;
@property (nonatomic, copy, readonly) dispatch_block_t handler;
@property (nonatomic, copy, readonly) HMDevToolsMenuViewControler container;

+ (instancetype)menuItemWithTitle:(NSString *)title container:(HMDevToolsMenuViewControler)container;
+ (instancetype)menuItemWithTitle:(NSString *)title container:(HMDevToolsMenuViewControler)container handler:(dispatch_block_t)handler;

@end

NS_ASSUME_NONNULL_END
