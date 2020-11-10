//
//  AppDelegate.m
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import "AppDelegate.h"
#import "HMExportManager.h"
#import "ViewController.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import <Hummer/Hummer.h>
#import <Hummer/HMNavigator.h>
#import <Hummer/HMUIManager.h>

NS_ASSUME_NONNULL_BEGIN

@interface AppDelegate ()

@end

NS_ASSUME_NONNULL_END

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [Hummer startEngine:nil];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor = [UIColor whiteColor];
    
    ViewController *vc = [[ViewController alloc] init];
    UINavigationController * nav = [[UINavigationController alloc] initWithRootViewController:vc];
    nav.navigationBar.translucent = NO;
    self.window.rootViewController = nav;
    [self.window makeKeyAndVisible];
    [HMNavigator registerScheme:@"hummer" pageBuilder:^UIViewController * _Nullable(NSString * _Nonnull url, NSDictionary * _Nullable parameterDictionary, NSString * _Nullable pageId, HMVoidIDBlock  _Nullable callback) {
        HMViewController *testController = [[HMViewController alloc] initWithURL:url params:nil];
        testController.hm_pageID = @(testController.hash).stringValue;

        return testController;
    }];
    
    return YES;
}

@end
