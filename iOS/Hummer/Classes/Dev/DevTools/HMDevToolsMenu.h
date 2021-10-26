//
//  HMDevToolsMenu.h
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import <UIKit/UIKit.h>
#import "HMDevToolsMenuItem.h"

NS_ASSUME_NONNULL_BEGIN

@protocol HMDevToolsMenuDelegate <NSObject>

- (void)onClickWithItem:(HMDevToolsMenuItem *)item atIndex:(NSUInteger)index;

@end

@interface HMDevToolsMenu : UIStackView

@property (nonatomic, weak) id<HMDevToolsMenuDelegate> delegate;

+ (instancetype)devToolsMenu;

- (void)addMenuItem:(HMDevToolsMenuItem *)menuItem;

@end

NS_ASSUME_NONNULL_END
