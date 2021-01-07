//
//  Hummer.h
//  Hummer
//
//  Copyright © 2019年 didi. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "HMUtility.h"
#import "HMJSContext.h"
#import "HMExportManager.h"
#import "HMJavaScriptLoader.h"
#import "HMInterceptor.h"
#import "HMJSObject.h"
#import "JSValue+Hummer.h"
#import "NSObject+Hummer.h"

NS_ASSUME_NONNULL_BEGIN

@protocol HMConfigBuilder <NSObject>

@property (nonatomic, assign) CGFloat pixel;
@property (nonatomic, assign) CGFloat scale;
@property (nonatomic, copy) NSArray * resourcePathList;

@end

@interface Hummer : NSObject

+ (void)startEngine:(void(^ _Nullable)(id<HMConfigBuilder>))builder;

+ (void)addGlobalEnvironment:(NSDictionary *)params;

+ (void)addGlobalScript:(NSString *)script inRootView:(UIView *)rootView;

+ (void)evaluateScript:(NSString *)jsScript
              fileName:(NSString *)fileName
            inRootView:(UIView *)rootView;

+ (void)evaluateScript:(NSString *)jsScript
              fileName:(NSString *)fileName
                pageID:(NSString *)pageID
            inRootView:(UIView *)rootView;

@end

NS_ASSUME_NONNULL_END
