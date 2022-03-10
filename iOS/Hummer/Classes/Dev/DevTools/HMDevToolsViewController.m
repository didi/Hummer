//
//  HMDevToolsViewController.m
//  Hummer
//
//  Created by ryan on 2021/6/2.
//

#import "HMDevToolsViewController.h"
#import "HMDevToolsViewControllerProtocol.h"
#import "HMDevToolsMenu.h"
#import "HMJSContext.h"
#import "HMJSCExecutor.h"
#import "HMLogger.h"
#import "HMDevToolsLoggerViewController.h"
#import "HMDevToolsLoggerVCModel.h"
#import "HMDevPageInfoViewController.h"
#import "HMDevToolsHierarchyViewController.h"

@interface HMDevToolsViewController ()<HMDevToolsMenuDelegate>

@property (nonatomic, strong) NSMutableArray<UIViewController<HMDevToolsViewControllerProtocol> *> *containers;
@property (nonatomic, strong) HMDevToolsMenu *menu;

@end

@implementation HMDevToolsViewController

+ (HMDevToolsViewController *)defaultDevTools {
    static HMDevToolsViewController *instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    
    return instance;
}

- (instancetype)init {
    if (self = [super init]) {
        _containers = NSMutableArray.array;
    }
    return self;
}

- (void)setCurrentContext:(HMJSContext *)currentContext {
    _currentContext = currentContext;
    [_containers enumerateObjectsUsingBlock:^(UIViewController<HMDevToolsViewControllerProtocol> * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([obj respondsToSelector:@selector(setContext:)]) {
            obj.context = currentContext;
        }
    }];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // menu
    self.menu = [HMDevToolsMenu devToolsMenu];
    self.menu.delegate = self;
    self.menu.backgroundColor = [UIColor colorWithRed:0.106 green:0.0706 blue:0.2 alpha:1];
    
    NSArray<HMDevToolsMenuItem *> *menuItems = @[
        [HMDevToolsMenuItem menuItemWithTitle:@"日志" container:^UIViewController * _Nonnull(HMJSContext * _Nonnull context) {
            HMDevToolsLoggerViewController *loggerVC = HMDevToolsLoggerViewController.new;
            loggerVC.vcModel = [[HMDevToolsLoggerVCModel alloc] initWithVC:loggerVC];
            loggerVC.context = context;
            return loggerVC;
        }],
        [HMDevToolsMenuItem menuItemWithTitle:@"页面参数" container:^UIViewController * _Nonnull(HMJSContext * _Nonnull context) {
            HMDevPageInfoViewController *pageVC = HMDevPageInfoViewController.new;
            pageVC.context = context;
            pageVC.textType = HMDevToolsTextTypePageInfo;
            return pageVC;
        }],
        [HMDevToolsMenuItem menuItemWithTitle:@"视图树" container:^UIViewController * _Nonnull(HMJSContext * _Nonnull context) {
            HMDevToolsHierarchyViewController *hierarchyVC = [HMDevToolsHierarchyViewController hierarchyViewWithRootView:context.rootView];
            return hierarchyVC;
        }],
        
        [HMDevToolsMenuItem menuItemWithTitle:@"函数树" container:^UIViewController * _Nonnull(HMJSContext * _Nonnull context) {
            HMDevToolsLoggerViewController *loggerVC = HMDevToolsLoggerViewController.new;
            loggerVC.vcModel = [[HMDevToolsCallTreeVCModel alloc] initWithVC:loggerVC];
            loggerVC.context = context;
            return loggerVC;
        }],
        [HMDevToolsMenuItem menuItemWithTitle:@"性能" container:^UIViewController * _Nonnull(HMJSContext * _Nonnull context) {
            return UIViewController.new;
        }],
    ];
    
    [menuItems enumerateObjectsUsingBlock:^(HMDevToolsMenuItem * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        [self.menu addMenuItem:obj];
        UIViewController<HMDevToolsViewControllerProtocol> *vc = obj.container(self.currentContext);
        vc.view.hidden = idx != 0;
        [self.containers addObject:vc];
    }];
    [self.view addSubview:self.menu];
    
    if (@available(iOS 11.0, *)) {
        UILayoutGuide *guide = self.view.safeAreaLayoutGuide;
        [NSLayoutConstraint activateConstraints:@[
            [self.menu.leadingAnchor constraintEqualToAnchor:guide.leadingAnchor],
            [self.menu.trailingAnchor constraintEqualToAnchor:guide.trailingAnchor],
            [self.menu.bottomAnchor constraintEqualToAnchor:self.view.bottomAnchor],
            [self.menu.heightAnchor constraintEqualToConstant:50],
        ]];
    }
    
    [self makeConstrants];
}

- (void)makeConstrants {
    if (@available(iOS 11.0, *)) {
        UILayoutGuide *guide = self.view.safeAreaLayoutGuide;
        [self.containers enumerateObjectsUsingBlock:^(UIViewController * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            obj.view.translatesAutoresizingMaskIntoConstraints = NO;
            [self.view addSubview:obj.view];
            [self addChildViewController:obj];
            
            [NSLayoutConstraint activateConstraints:@[
                [obj.view.leadingAnchor constraintEqualToAnchor:guide.leadingAnchor],
                [obj.view.trailingAnchor constraintEqualToAnchor:guide.trailingAnchor],
                [obj.view.topAnchor constraintEqualToAnchor:guide.topAnchor],
                [obj.view.bottomAnchor constraintEqualToAnchor:self.menu.topAnchor],
            ]];
        }];
    }
}

#pragma mark - HMDevToolsMenuDelegate

- (void)onClickWithItem:(HMDevToolsMenuItem *)item atIndex:(NSUInteger)index {
    UIViewController<HMDevToolsViewControllerProtocol> *vc = self.containers[index];
    [self.containers enumerateObjectsUsingBlock:^(UIViewController<HMDevToolsViewControllerProtocol> * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if (obj.view.hidden == NO) {
            obj.view.hidden = YES;
        }
    }];
    vc.view.hidden = NO;
    if ([vc respondsToSelector:@selector(refresh)]) {
        [vc refresh];
    }
    
}

@end
