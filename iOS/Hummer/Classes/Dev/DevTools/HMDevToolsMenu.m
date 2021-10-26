//
//  HMDevToolsMenu.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsMenu.h"

@implementation HMDevToolsMenu {
    NSMutableArray<HMDevToolsMenuItem *> *_items;
    UIButton *_lastSelectedButton;
}

- (instancetype)init {
    if (self = [super init]) {
        _items = NSMutableArray.array;
        self.translatesAutoresizingMaskIntoConstraints = NO;
        self.axis = UILayoutConstraintAxisHorizontal;
        self.alignment = UIStackViewAlignmentFill;
        self.distribution = UIStackViewDistributionFillEqually;
        self.spacing = 0;
    }
    return self;
}

+ (instancetype)devToolsMenu {
    return [[self alloc] init];
}

- (void)addMenuItem:(HMDevToolsMenuItem *)menuItem {
    UIButton *menuItemButton = [UIButton buttonWithType:UIButtonTypeCustom];
    menuItemButton.titleLabel.font = [UIFont systemFontOfSize:16 weight:UIFontWeightSemibold];
    menuItemButton.tag = _items.count;
    [menuItemButton setTitle:menuItem.title forState:UIControlStateNormal];
    [menuItemButton setTitleColor:UIColor.lightGrayColor forState:UIControlStateNormal];
    [menuItemButton setTitleColor:UIColor.systemBlueColor forState:UIControlStateSelected];
    [menuItemButton addTarget:self action:@selector(onMenuItemClick:) forControlEvents:UIControlEventTouchUpInside];
    [self addArrangedSubview:menuItemButton];
    if (!_lastSelectedButton) {
        _lastSelectedButton = menuItemButton;
        menuItemButton.selected = YES;
    }
    [_items addObject:menuItem];
}

#pragma mark - Action

- (void)onMenuItemClick:(UIButton *)sender {
    sender.selected = YES;
    NSUInteger index = sender.tag;
    HMDevToolsMenuItem *item = _items[index];
    NSLog(@"tap index %ld", index);
    if (item.handler) {
        item.handler();
    }
    if (sender != _lastSelectedButton) {
        _lastSelectedButton.selected = NO;
        _lastSelectedButton = sender;
    }
    
    if (self.delegate && [self.delegate respondsToSelector:@selector(onClickWithItem:atIndex:)]) {
        [self.delegate onClickWithItem:item atIndex:index];
    }
}

@end
